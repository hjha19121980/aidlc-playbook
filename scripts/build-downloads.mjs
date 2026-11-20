#!/usr/bin/env node
// Builds the downloadable bundles served by the web app:
//   web/public/downloads/aidlc-skills-{all,agent,copilot}.zip
//   web/public/downloads/install.ps1, install.sh
//   web/public/downloads/manifest.json (SHA-256 of every file, used by the installers)
// No dependencies: includes a tiny zip writer.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'web', 'public', 'downloads');
const tools = ['all', 'agent', 'copilot'];
// Files the installer creates only when they do not exist yet (they belong to the project once installed).
const SEED = [
  'AGENTS.md', 'REVIEW.md', 'docs/aidlc/status.md', 'docs/aidlc/monitoring/bands.yaml',
  'docs/aidlc/guards/protected-paths.txt', 'docs/aidlc/policies/README.md',
  'docs/aidlc/changes/.gitkeep', 'docs/aidlc/lessons/.gitkeep',
  'evals/README.md', 'evals/example.json', 'evals/check.sh',
  '.mcp.json', '.vscode/mcp.json',
];

// ---------- minimal zip writer (deterministic: fixed timestamps, sorted entries) ----------
const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;

function listFiles(dir) {
  const files = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else files.push(p);
    }
  };
  walk(dir);
  return files.map((p) => relative(dir, p).split(sep).join('/')).sort();
}

function zipDir(dir) {
  const parts = [];
  const central = [];
  let offset = 0;
  for (const name of listFiles(dir)) {
    const data = readFileSync(join(dir, ...name.split('/')));
    const comp = deflateRawSync(data, { level: 9 });
    const nameBuf = Buffer.from(name, 'utf8');
    const crc = crc32(data);

    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0x0800, 6); // UTF-8 names
    lh.writeUInt16LE(8, 8); // deflate
    lh.writeUInt16LE(0, 10);
    lh.writeUInt16LE(DOS_DATE, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(comp.length, 18);
    lh.writeUInt32LE(data.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    parts.push(lh, nameBuf, comp);

    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);
    ch.writeUInt16LE((3 << 8) | 20, 4); // made by Unix, v2.0
    ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(8, 10);
    ch.writeUInt16LE(0, 12);
    ch.writeUInt16LE(DOS_DATE, 14);
    ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(comp.length, 20);
    ch.writeUInt32LE(data.length, 24);
    ch.writeUInt16LE(nameBuf.length, 28);
    ch.writeUInt32LE((0o100644 << 16) >>> 0, 38); // regular file, 0644
    ch.writeUInt32LE(offset, 42);
    central.push(ch, nameBuf);

    offset += lh.length + nameBuf.length + comp.length;
  }
  const cd = Buffer.concat(central);
  const count = central.length / 2;
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(count, 8);
  eocd.writeUInt16LE(count, 10);
  eocd.writeUInt32LE(cd.length, 12);
  eocd.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, cd, eocd]);
}

// ---------- skills reference doc generated from skills/*/SKILL.md ----------
function skillsReference() {
  const desc = (p) => {
    const m = readFileSync(p, 'utf8').match(/^description:\s*(.+)$/m);
    return (m ? m[1] : '').replace(/\|/g, '\\|');
  };
  const sdir = join(root, 'skills');
  const skillRows = readdirSync(sdir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(sdir, d.name, 'SKILL.md')))
    .map((d) => `| \`/${d.name}\` | ${desc(join(sdir, d.name, 'SKILL.md'))} |`);
  const adir = join(root, 'agents');
  const agentRows = readdirSync(adir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => `| \`${f.replace(/\.md$/, '')}\` | ${desc(join(adir, f))} |`);
  return [
    '# Skills and agents reference',
    '',
    'Run a skill by typing its name as a slash command in your AI assistant. Agents are focused helpers with limited tools; your assistant lists and invokes them.',
    '',
    '## Skills',
    '',
    '| Skill | What it does |',
    '|---|---|',
    ...skillRows,
    '',
    '## Agents',
    '',
    '| Agent | What it does |',
    '|---|---|',
    ...agentRows,
    '',
  ].join('\n');
}

// ---------- catalog: validate against the real skills and agents, then generate the web data ----------
function buildCatalog() {
  const cat = JSON.parse(readFileSync(join(root, 'catalog', 'catalog.json'), 'utf8'));
  const desc = (p) => (readFileSync(p, 'utf8').match(/^description:\s*(.+)$/m) || [, ''])[1].trim();
  const skillNames = readdirSync(join(root, 'skills'), { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(root, 'skills', d.name, 'SKILL.md'))).map((d) => d.name).sort();
  const agentNames = readdirSync(join(root, 'agents')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort();
  const stageIds = new Set(cat.stages.map((s) => s.id));
  const problems = [];
  for (const n of skillNames) if (!cat.skills[n]) problems.push(`skill "${n}" is missing from catalog/catalog.json`);
  for (const n of Object.keys(cat.skills)) if (!skillNames.includes(n)) problems.push(`catalog lists unknown skill "${n}"`);
  for (const n of agentNames) if (!cat.agents[n]) problems.push(`agent "${n}" is missing from catalog/catalog.json`);
  for (const [n, v] of Object.entries({ ...cat.skills, ...cat.agents })) if (!stageIds.has(v.stage)) problems.push(`"${n}" has unknown stage "${v.stage}"`);
  for (const r of cat.roles) for (const n of r.extra) if (!cat.skills[n]) problems.push(`role "${r.id}" lists unknown skill "${n}"`);
  if (problems.length) throw new Error('Catalog problems:\n - ' + problems.join('\n - '));

  const defIcon = Object.fromEntries(cat.stages.map((s) => [s.id, s.icon]));
  const skills = skillNames.map((n) => ({ name: n, stage: cat.skills[n].stage, icon: cat.skills[n].icon || defIcon[cat.skills[n].stage], description: desc(join(root, 'skills', n, 'SKILL.md')) }));
  const agents = agentNames.map((n) => ({ name: n, stage: cat.agents[n].stage, icon: cat.agents[n].icon, description: desc(join(root, 'agents', `${n}.md`)) }));
  const body = `// GENERATED by scripts/build-downloads.mjs from catalog/catalog.json and the skills and agents folders. Do not edit.\nimport type { IconName } from '../shared/icon';\n\n` +
    `export interface CatalogStage { id: string; label: string; icon: IconName }\nexport interface CatalogRole { id: string; label: string; description: string; stages: string[]; extra: string[] }\nexport interface CatalogSkill { name: string; stage: string; icon: IconName; description: string }\nexport interface CatalogAgent { name: string; stage: string; icon: IconName; description: string }\n\n` +
    `export const CATALOG_STAGES: CatalogStage[] = ${JSON.stringify(cat.stages, null, 2)};\nexport const CATALOG_CORE: string[] = ${JSON.stringify(cat.core)};\nexport const CATALOG_ROLES: CatalogRole[] = ${JSON.stringify(cat.roles, null, 2)};\nexport const CATALOG_SKILLS: CatalogSkill[] = ${JSON.stringify(skills, null, 2)};\nexport const CATALOG_AGENTS: CatalogAgent[] = ${JSON.stringify(agents, null, 2)};\n`;
  writeFileSync(join(root, 'web', 'src', 'app', 'data', 'catalog.generated.ts'), body);
  console.log(`Catalog: ${skills.length} skills, ${agents.length} agents, ${cat.stages.length} groups`);
}
buildCatalog();

// ---------- build ----------
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'aidlc-build-'));
const manifest = {};

try {
  for (const tool of tools) {
    const stage = join(work, tool);
    mkdirSync(stage, { recursive: true });
    execFileSync(process.execPath, [join(root, 'scripts', 'sync-skills.mjs'), '--target', stage, '--tool', tool], { stdio: 'pipe' });

    // Keep the Copilot block separate so installers can merge it instead of overwriting a user's file.
    const ci = join(stage, '.github', 'copilot-instructions.md');
    if (existsSync(ci)) {
      writeFileSync(join(stage, '.github', 'copilot-instructions.aidlc.md'), readFileSync(ci));
      rmSync(ci);
    }
    cpSync(join(root, 'templates'), stage, { recursive: true });
    // Connector definitions and rules, for reference and for adding company-specific servers.
    cpSync(join(root, 'mcp'), join(stage, 'docs', 'aidlc', 'mcp'), { recursive: true });
    // Coding standards: one document per language. They belong to the project once installed (teams add local overrides).
    cpSync(join(root, 'standards'), join(stage, 'docs', 'aidlc', 'standards'), { recursive: true });
    writeFileSync(join(stage, 'docs', 'aidlc', 'skills-reference.md'), skillsReference());
    const standardFiles = readdirSync(join(root, 'standards')).filter((f) => f.endsWith('.md')).map((f) => `docs/aidlc/standards/${f}`);
    writeFileSync(join(stage, '.aidlc-seed.txt'), [...SEED, ...standardFiles].join('\n') + '\n');

    const file = `aidlc-skills-${tool}.zip`;
    const buf = zipDir(stage);
    writeFileSync(join(out, file), buf);
    manifest[file] = { sha256: createHash('sha256').update(buf).digest('hex'), bytes: buf.length };
  }
  for (const f of ['install.ps1', 'install.sh']) {
    const buf = readFileSync(join(root, 'installers', f));
    writeFileSync(join(out, f), buf);
    manifest[f] = { sha256: createHash('sha256').update(buf).digest('hex'), bytes: buf.length };
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

// One entry per line so the shell installer can read it with sed (no jq needed).
const lines = Object.entries(manifest).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify({ sha256: v.sha256, bytes: v.bytes })}`);
writeFileSync(join(out, 'manifest.json'), `{\n  "files": {\n${lines.join(',\n')}\n  }\n}\n`);

for (const [k, v] of Object.entries(manifest)) console.log(`${k.padEnd(28)} ${String(v.bytes).padStart(7)} bytes  ${v.sha256.slice(0, 12)}`);
console.log(`Wrote downloads to ${relative(root, out)}`);
