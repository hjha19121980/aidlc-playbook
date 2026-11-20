#!/usr/bin/env node
// Generates tool-specific skill and agent files from the single, tool-neutral source in ./skills and ./agents.
//   --tool agent   : <target>/.claude/skills/<name>/SKILL.md and <target>/.claude/agents/<name>.md
//   --tool copilot : <target>/.github/skills/<name>/SKILL.md, <target>/.github/agents/<name>.agent.md,
//                    <target>/.github/prompts/<name>.prompt.md, and a managed block in
//                    <target>/.github/copilot-instructions.md
//   --tool all     : both
// Connectors (MCP) from ./mcp/servers become .mcp.json (agent) and .vscode/mcp.json (copilot), created only if missing.
// The adapter folder names are fixed by the assistants themselves; every authored file stays tool-neutral.
// Usage: node scripts/sync-skills.mjs [--target <dir>] [--tool agent|copilot|all]
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const target = resolve(opt('--target', root));
const tool = opt('--tool', 'all');
if (!['agent', 'copilot', 'all'].includes(tool)) throw new Error('--tool must be agent, copilot or all');

const parse = (text) => {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('Missing frontmatter');
  const meta = Object.fromEntries(m[1].split(/\r?\n/).filter((l) => l.includes(':')).map((l) => [l.slice(0, l.indexOf(':')).trim(), l.slice(l.indexOf(':') + 1).trim()]));
  return { meta, body: m[2].trim() };
};

// ---- skills (folder per skill) ----
const skillsDir = join(root, 'skills');
const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(skillsDir, d.name, 'SKILL.md')))
  .map((d) => ({ dir: d.name, ...parse(readFileSync(join(skillsDir, d.name, 'SKILL.md'), 'utf8')) }));

// ---- agents (one markdown file each) ----
const agentsDir = join(root, 'agents');
const agents = existsSync(agentsDir)
  ? readdirSync(agentsDir).filter((f) => f.endsWith('.md')).map((f) => parse(readFileSync(join(agentsDir, f), 'utf8')))
  : [];

// Neutral capabilities -> each assistant's tool names.
const AGENT_TOOLS = { read: ['Read', 'Grep', 'Glob'], search: ['Grep', 'Glob'], edit: ['Edit', 'Write'], execute: ['Bash'] };
const COPILOT_TOOLS = { read: ['read'], search: ['search'], edit: ['edit'], execute: ['execute'] };
const caps = (a) => (a.meta.capabilities || '').split(',').map((c) => c.trim()).filter(Boolean);
const uniq = (list) => [...new Set(list)];

// ---- connectors (MCP servers): one neutral JSON per server; files starting with "_" are templates ----
const mcpDir = join(root, 'mcp', 'servers');
const servers = existsSync(mcpDir)
  ? readdirSync(mcpDir).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort().map((f) => JSON.parse(readFileSync(join(mcpDir, f), 'utf8')))
  : [];
const inputId = (name) => name.toLowerCase();

// Terminal agent: .mcp.json (secrets and settings come from the developer's environment)
const agentMcp = () => ({
  mcpServers: Object.fromEntries(servers.map((s) => [
    s.name,
    s.transport === 'http'
      ? { type: 'http', url: s.url }
      : { command: s.command, args: s.args, ...(s.vars?.length ? { env: Object.fromEntries(s.vars.map((v) => [v.name, `\${${v.name}}`])) } : {}) },
  ])),
});

// GitHub Copilot in VS Code: .vscode/mcp.json (values are prompted for, secrets masked, nothing stored)
const copilotMcp = () => {
  const inputs = [];
  const seen = new Set();
  const cfg = {
    servers: Object.fromEntries(servers.map((s) => {
      for (const v of s.vars ?? []) {
        if (seen.has(v.name)) continue;
        seen.add(v.name);
        inputs.push({ type: 'promptString', id: inputId(v.name), description: v.description, password: !!v.secret });
      }
      return [
        s.name,
        s.transport === 'http'
          ? { type: 'http', url: s.url }
          : { type: 'stdio', command: s.command, args: s.args, ...(s.vars?.length ? { env: Object.fromEntries(s.vars.map((v) => [v.name, `\${input:${inputId(v.name)}}`])) } : {}) },
      ];
    })),
  };
  return { ...(inputs.length ? { inputs } : {}), ...cfg };
};

// Created only when missing: these files belong to the project once installed.
const writeIfMissing = (file, obj) => {
  if (existsSync(file)) {
    console.log(`Kept existing ${file}; merge servers from docs/aidlc/mcp/servers/ by hand.`);
    return;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
};

const copySkills = (dest) => {
  for (const s of skills) cpSync(join(skillsDir, s.dir), join(dest, s.dir), { recursive: true });
};

if (tool === 'agent' || tool === 'all') {
  copySkills(join(target, '.claude', 'skills'));
  const dest = join(target, '.claude', 'agents');
  mkdirSync(dest, { recursive: true });
  for (const a of agents) {
    const tools = uniq(caps(a).flatMap((c) => AGENT_TOOLS[c] ?? [])).join(', ');
    writeFileSync(join(dest, `${a.meta.name}.md`), `---\nname: ${a.meta.name}\ndescription: ${a.meta.description}\ntools: ${tools}\n---\n\n${a.body}\n`);
  }
  if (servers.length) writeIfMissing(join(target, '.mcp.json'), agentMcp());
}

if (tool === 'copilot' || tool === 'all') {
  copySkills(join(target, '.github', 'skills'));

  const agentDest = join(target, '.github', 'agents');
  mkdirSync(agentDest, { recursive: true });
  for (const a of agents) {
    const tools = uniq(caps(a).flatMap((c) => COPILOT_TOOLS[c] ?? [])).map((t) => `'${t}'`).join(', ');
    writeFileSync(join(agentDest, `${a.meta.name}.agent.md`), `---\nname: ${a.meta.name}\ndescription: ${a.meta.description}\ntools: [${tools}]\n---\n\n${a.body}\n`);
  }

  if (servers.length) writeIfMissing(join(target, '.vscode', 'mcp.json'), copilotMcp());

  const prompts = join(target, '.github', 'prompts');
  mkdirSync(prompts, { recursive: true });
  for (const s of skills) {
    writeFileSync(join(prompts, `${s.meta.name}.prompt.md`), `---\nmode: agent\ndescription: ${s.meta.description}\n---\n\n${s.body}\n`);
  }

  const file = join(target, '.github', 'copilot-instructions.md');
  const begin = '<!-- aidlc:begin -->';
  const end = '<!-- aidlc:end -->';
  const block = `${begin}\n## AIDLC workflow\nThis repo follows the AI-Driven Development Life Cycle: Plan, Design, Build, Test, Deploy, Maintain. Each stage commits an artifact (intent.md, spec.md, plan.md, test-report.md, review findings, incident.md) that the next stage reads, and ends with a human approval gate. Per-change artifacts are in \`docs/aidlc/changes/\`; project context is in \`AGENTS.md\`; review policy is in \`REVIEW.md\`.\nInstalled skills are in \`.github/skills/\` and agents in \`.github/agents/\`; run a skill as a prompt (for example \`/aidlc-workflow\`). The installed set may be a subset; see \`docs/aidlc/skills-reference.md\`.\n${end}`;
  let cur = existsSync(file) ? readFileSync(file, 'utf8') : '';
  cur = cur.includes(begin) ? cur.replace(new RegExp(`${begin}[\\s\\S]*?${end}`), block) : `${cur}${cur ? '\n\n' : ''}${block}\n`;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, cur);
}

console.log(`Synced ${skills.length} skills, ${agents.length} agents and ${servers.length} connectors to ${target} (${tool})`);
