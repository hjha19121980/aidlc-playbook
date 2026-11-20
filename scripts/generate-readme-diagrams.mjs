#!/usr/bin/env node
// Generates the two circular README diagrams (animated SVG, no dependencies):
//   docs/diagrams/aidlc-loop.svg          circular flow: six stages, artifacts, gates
//   docs/diagrams/aidlc-architecture.svg  concentric architecture: loop, artifacts, skills and agents, guardrails, connectors
// Dots travel around the loop. GitHub renders the animation when the SVG is shown as an image.
// Usage: node scripts/generate-readme-diagrams.mjs [outputDir]
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MONO, close, headAt, icon, open, orbitDots } from './lib/svg.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'docs', 'diagrams');
mkdirSync(outDir, { recursive: true });
const write = (name, svg) => { writeFileSync(join(outDir, name), svg); console.log('wrote', name); };
const rad = (d) => (d * Math.PI) / 180;
const SKILL_COUNT = readdirSync(join(root, 'skills'), { withFileTypes: true }).filter((d) => d.isDirectory()).length;
const STAGES = ['Plan', 'Design', 'Build', 'Test', 'Deploy', 'Maintain'];
const STAGE_ICONS = ['compass', 'pencil', 'code', 'flask', 'upload', 'wrench'];

/** Animated clockwise arcs between consecutive nodes on a circle. */
const loopArcs = (cx, cy, R, nodeR) => {
  const m = (nodeR + 7) / R;           // radians cleared around a node
  const mEnd = (nodeR + 20) / R;       // a little more room for the arrow head
  let out = '';
  for (let i = 0; i < 6; i++) {
    const a0 = rad(-90 + i * 60) + m, a1 = rad(-90 + (i + 1) * 60) - mEnd;
    const sx = cx + R * Math.cos(a0), sy = cy + R * Math.sin(a0), ex = cx + R * Math.cos(a1), ey = cy + R * Math.sin(a1);
    out += `<path class="flow cy" d="M${sx.toFixed(1)} ${sy.toFixed(1)} A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}"/>${headAt(ex, ey, a1 + Math.PI / 2, '#2ad4ff')}`;
  }
  return out;
};

// ------------------------------------------------------------------ 1. Circular flow
{
  const W = 1400, H = 1000, cx = 700, cy = 520, R = 290, NR = 62;
  let s = open(W, H, 'The AIDLC loop', 'A circular flow of six stages: Plan, Design, Build, Test, Deploy and Maintain. Each stage commits an artifact the next stage reads and ends at a human gate. What Maintain finds becomes the next intent.');
  s += `<text x="50" y="70" font-size="38" font-weight="800" fill="#e8f0ff" letter-spacing="-1">The <tspan fill="#2ad4ff">AIDLC</tspan> loop</text>
  <text x="50" y="104" font-size="18" fill="#93a8d1">Each stage commits an artifact the next one reads.</text>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 90}" fill="#5b9bff" fill-opacity=".05"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#24407e" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>`;
  s += loopArcs(cx, cy, R, NR) + orbitDots(cx, cy, R);
  const labels = [
    { art: 'intent.md', gate: ['Product owner accepts'], side: 'top' },
    { art: 'spec.md', gate: ['Product owner accepts'], side: 'right' },
    { art: 'plan.md, diff, tests', gate: ['Engineer accepts the plan', 'Code owner approves the PR'], side: 'right' },
    { art: 'test-report.md, evals', gate: ['Code owner reviews evidence'], side: 'bottom' },
    { art: 'review findings, release.md', gate: ['Release manager authorizes'], side: 'left' },
    { art: 'incident.md, new intent.md', gate: ['Service owner triages'], side: 'left' },
  ];
  STAGES.forEach((n, i) => {
    const a = rad(-90 + i * 60), x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${NR + 12}" fill="#5b9bff" fill-opacity=".1"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${NR}" fill="url(#brand)"/>
    ${icon(STAGE_ICONS[i], x - 15, y - 36, 1.25, '#04112b', 1.9)}<text x="${x.toFixed(1)}" y="${(y + 26).toFixed(1)}" text-anchor="middle" font-size="20" font-weight="800" fill="#04112b">${n}</text>
    <circle cx="${(x + 46).toFixed(1)}" cy="${(y - 46).toFixed(1)}" r="15" fill="#0b1733" stroke="#2ad4ff" stroke-width="1.5"/><text x="${(x + 46).toFixed(1)}" y="${(y - 40.5).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="800" fill="#8ec1ff">${i + 1}</text>`;
    const L = labels[i];
    const anchor = L.side === 'left' ? 'end' : L.side === 'right' ? 'start' : 'middle';
    const lx = L.side === 'left' ? x - NR - 28 : L.side === 'right' ? x + NR + 28 : x;
    const ly = L.side === 'top' ? y - NR - 50 : L.side === 'bottom' ? y + NR + 44 : y - 12;
    s += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" font-size="21" font-weight="700" font-family="${MONO}" fill="#e8f0ff">${L.art}</text>`;
    L.gate.forEach((g, k) => (s += `<text x="${lx.toFixed(1)}" y="${(ly + 28 + k * 22).toFixed(1)}" text-anchor="${anchor}" font-size="16" font-weight="650" fill="#3ddc97">${g}</text>`));
  });
  s += `<circle cx="${cx}" cy="${cy}" r="132" fill="#0b1733" stroke="#2ad4ff" stroke-opacity=".5" stroke-width="1.5"/>${icon('shield', cx - 22, cy - 92, 1.85, '#3ddc97', 1.8)}
  <text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="26" font-weight="800" fill="#e8f0ff">Agents act up to</text><text x="${cx}" y="${cy + 38}" text-anchor="middle" font-size="26" font-weight="800" fill="#e8f0ff">a gate.</text>
  <text x="${cx}" y="${cy + 78}" text-anchor="middle" font-size="19" font-weight="650" fill="#2ad4ff">People decide.</text>`;
  write('aidlc-loop.svg', s + close);
}

// ------------------------------------------------------------------ 2. Circular architecture
{
  const W = 1500, H = 1060, cx = 500, cy = 540;
  let s = open(W, H, 'AIDLC architecture', 'Concentric layers around the loop. From the center: people and gates, the six-stage loop, committed artifacts, skills and agents, guardrails, and connectors.');
  s += `<text x="50" y="70" font-size="38" font-weight="800" fill="#e8f0ff" letter-spacing="-1"><tspan fill="#2ad4ff">AIDLC</tspan> architecture</text>`;
  // rings, outermost first
  const rings = [
    { r: 440, fill: '#08142c', c: '#24407e' },
    { r: 380, fill: '#0b1b3b', c: '#24407e' },
    { r: 320, fill: '#0d2249', c: '#2a4a8c' },
    { r: 260, fill: '#10295a', c: '#2f539a' },
    { r: 200, fill: '#14316b', c: '#365ca8' },
  ];
  rings.forEach((g) => (s += `<circle cx="${cx}" cy="${cy}" r="${g.r}" fill="${g.fill}" stroke="${g.c}" stroke-width="1.5"/>`));
  const R1 = 140, NR = 40;
  s += `<circle cx="${cx}" cy="${cy}" r="${R1}" fill="none" stroke="#2ad4ff" stroke-opacity=".25" stroke-dasharray="2 9" stroke-linecap="round"/>`;
  s += loopArcs(cx, cy, R1, NR) + orbitDots(cx, cy, R1, { count: 3, dur: 12 });
  STAGES.forEach((n, i) => {
    const a = rad(-90 + i * 60), x = cx + R1 * Math.cos(a), y = cy + R1 * Math.sin(a);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${NR}" fill="url(#brand)"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="800" fill="#04112b">${n}</text>`;
  });
  s += `<circle cx="${cx}" cy="${cy}" r="62" fill="#0b1733" stroke="#3ddc97" stroke-opacity=".7" stroke-width="1.5"/>${icon('shield', cx - 14, cy - 36, 1.15, '#3ddc97', 1.9)}<text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="16" font-weight="800" fill="#e8f0ff">People</text><text x="${cx}" y="${cy + 33}" text-anchor="middle" font-size="12" fill="#93a8d1">gates</text>`;
  // icons spread along each ring
  const spread = (rMid, names, offset = 0) => names.map((nm, i) => {
    const a = rad(offset + (360 / names.length) * i), x = cx + rMid * Math.cos(a), y = cy + rMid * Math.sin(a);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="19" fill="#0b1733" stroke="#2ad4ff" stroke-opacity=".5"/>${icon(nm, x - 10, y - 10, 0.83, '#8ec1ff', 2)}`;
  }).join('');
  s += spread(230, ['file', 'file', 'clipboard', 'code', 'pr', 'upload', 'wrench'], -90 + 12);
  s += spread(290, ['layers', 'sparkles', 'layers', 'user', 'layers', 'sparkles', 'layers', 'user'], -61.5);
  s += spread(350, ['shield', 'search', 'shield', 'zap', 'shield', 'rotate'], -40);
  s += spread(410, ['branch', 'pencil', 'clipboard', 'book', 'plug'], -40);
  // Numbered markers on the rings (along the horizontal axis) match the numbered legend rows.
  const rows = [
    { n: '1', t: 'Connectors (MCP)', d: 'Git, Figma, Jira, Confluence and your company servers. Read first; writes need approval.', r: 410 },
    { n: '2', t: 'Guardrails', d: 'Branch protection, required CI checks, protected paths, evals and control bands.', r: 350 },
    { n: '3', t: 'Skills and agents', d: `${SKILL_COUNT} skills across every stage and 10 agents, written once and installed for both assistants, or only the ones a role needs.`, r: 290 },
    { n: '4', t: 'Artifacts', d: 'intent, spec, plan, test report, review findings, release, incident, plus AGENTS.md and REVIEW.md.', r: 230 },
    { n: '5', t: 'The loop', d: 'Plan, Design, Build, Test, Deploy and Maintain, with a human gate at each stage.', r: 140 },
    { n: '', t: 'People (center)', d: 'Product owner, tech lead, code owner, release manager and service owner decide at the gates.', r: 0 },
  ];
  const lx = 1030;
  const badge = (x, y, n) => `<circle cx="${x}" cy="${y}" r="15" fill="#0b1733" stroke="#2ad4ff" stroke-width="1.8"/><text x="${x}" y="${y + 5.5}" text-anchor="middle" font-size="15" font-weight="800" fill="#8ec1ff">${n}</text>`;
  rows.forEach((row, i) => {
    const y = 175 + i * 142;
    if (row.n) s += badge(cx + row.r, cy, row.n) + badge(lx - 6, y - 2, row.n);
    s += `<text x="${lx + 26}" y="${y + 6}" font-size="25" font-weight="800" fill="#e8f0ff">${row.t}</text>`;
    // wrap the description into short lines
    const words = row.d.split(' ');
    const lines = [];
    let cur = '';
    words.forEach((w) => { if ((cur + ' ' + w).trim().length > 50) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    lines.push(cur);
    lines.forEach((ln, k) => (s += `<text x="${lx + 26}" y="${y + 36 + k * 24}" font-size="17" fill="#93a8d1">${ln}</text>`));
  });
  s += `<text x="${lx}" y="${H - 62}" font-size="17" font-weight="650" fill="#8ec1ff">One source, installed for a terminal AI agent</text><text x="${lx}" y="${H - 38}" font-size="17" font-weight="650" fill="#8ec1ff">and for GitHub Copilot.</text>`;
  write('aidlc-architecture.svg', s + close);
}
