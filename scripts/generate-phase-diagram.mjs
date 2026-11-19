#!/usr/bin/env node
// Generates web/public/assets/images/aidlc-phases.svg: a 4:3 infographic of the six AIDLC phases.
// No dependencies. Convert to WebP with any tool (e.g. https://squoosh.app).
// Usage: node scripts/generate-phase-diagram.mjs [output.svg]
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2] ? resolve(process.argv[2]) : join(root, 'web', 'public', 'assets', 'images', 'aidlc-phases.svg');

const W = 1200, H = 900, CW = 300, CH = 200;
const cols = [100, 460, 820];
const rows = [170, 500];

// Icon paths use the same 24x24 set as the web app.
const circle = (cx, cy, r) => `M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0-${r * 2} 0`;
const phases = [
  { n: 1, title: 'Plan', goal: 'Agree what to build and why', skill: 'aidlc-plan', gate: 'Requirements approved', col: 0, row: 0, icon: [circle(12, 12, 9), 'M15.5 8.5l-2 5-5 2 2-5z'] },
  { n: 2, title: 'Design', goal: 'Decide how it will work', skill: 'aidlc-design', gate: 'Design and tasks approved', col: 1, row: 0, icon: ['M4 20l1-5L16 4l4 4L9 19z', 'M14 6l4 4'] },
  { n: 3, title: 'Build', goal: 'Implement in small steps', skill: 'aidlc-build', gate: 'All tasks merged', col: 2, row: 0, icon: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'] },
  { n: 4, title: 'Test', goal: 'Prove it meets the requirements', skill: 'aidlc-test', gate: 'Test report approved', col: 2, row: 1, icon: ['M9 3h6', 'M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3', 'M7 15h10'] },
  { n: 5, title: 'Deploy', goal: 'Release safely, with a way back', skill: 'aidlc-deploy', gate: 'Production approval', col: 1, row: 1, icon: ['M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18', 'M12 11v8', 'M9 14l3-3 3 3'] },
  { n: 6, title: 'Maintain', goal: 'Keep it healthy and learn', skill: 'aidlc-maintain', gate: 'Feeds the next Plan', col: 0, row: 1, icon: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'] },
];

const stroke = (d, extra = '') => `<path d="${d}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

const card = (p) => {
  const x = cols[p.col], y = rows[p.row];
  return `
  <g>
    <rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="22" fill="url(#card)" stroke="#24407e" stroke-width="1.5"/>
    <rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="22" fill="none" stroke="url(#edge)" stroke-width="1.5" opacity="0.55"/>
    <circle cx="${x + 36}" cy="${y + 38}" r="17" fill="url(#brand)"/>
    <text x="${x + 36}" y="${y + 44}" text-anchor="middle" font-size="17" font-weight="800" fill="#04112b">${p.n}</text>
    <text x="${x + 64}" y="${y + 48}" font-size="29" font-weight="750" fill="#e8f0ff" letter-spacing="-0.5">${p.title}</text>
    <rect x="${x + 232}" y="${y + 18}" width="52" height="52" rx="15" fill="url(#brand)"/>
    <g transform="translate(${x + 240} ${y + 26}) scale(1.5)" stroke="#04112b" stroke-width="1.8">${p.icon.map((d) => stroke(d)).join('')}</g>
    <text x="${x + 24}" y="${y + 100}" font-size="16.5" fill="#93a8d1">${p.goal}</text>
    <rect x="${x + 24}" y="${y + 116}" width="${p.skill.length * 9 + 34}" height="30" rx="15" fill="#5b9bff" fill-opacity="0.14" stroke="#5b9bff" stroke-opacity="0.45"/>
    <text x="${x + 41}" y="${y + 136}" font-size="14" font-family="Cascadia Code, Consolas, monospace" fill="#8ec1ff">/${p.skill}</text>
    <g transform="translate(${x + 22} ${y + 158}) scale(0.9)" stroke="#3ddc97" stroke-width="2">${stroke('M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z')}${stroke('M9 12l2 2 4-4')}</g>
    <text x="${x + 50}" y="${y + 176}" font-size="14.5" font-weight="650" fill="#3ddc97">Gate: ${p.gate}</text>
  </g>`;
};

// A dashed, animated arrow drawn in the direction of flow (x1,y1) -> (x2,y2), with a head at the end.
const arrow = (x1, y1, x2, y2, cls = 'flow') => {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 13, hw = 8;
  const bx = x2 - Math.cos(a) * hl, by = y2 - Math.sin(a) * hl;
  const px = -Math.sin(a) * hw, py = Math.cos(a) * hw;
  return `<path class="${cls}" d="M${x1} ${y1} L${bx.toFixed(1)} ${by.toFixed(1)}" fill="none"/>
    <path d="M${x2} ${y2} L${(bx + px).toFixed(1)} ${(by + py).toFixed(1)} L${(bx - px).toFixed(1)} ${(by - py).toFixed(1)} Z" fill="${cls === 'flow' ? '#5b9bff' : '#2ad4ff'}"/>`;
};

const midY0 = rows[0] + CH / 2, midY1 = rows[1] + CH / 2;
const arrows = [
  arrow(cols[0] + CW + 8, midY0, cols[1] - 8, midY0),
  arrow(cols[1] + CW + 8, midY0, cols[2] - 8, midY0),
  arrow(cols[2] + CW / 2, rows[0] + CH + 8, cols[2] + CW / 2, rows[1] - 8),
  arrow(cols[2] - 8, midY1, cols[1] + CW + 8, midY1),
  arrow(cols[1] - 8, midY1, cols[0] + CW + 8, midY1),
].join('\n  ');

// Loop-back from Maintain (bottom-left) up to Plan (top-left).
const loopX = 52;
const loop = `<path class="flow back" d="M${cols[0] - 8} ${midY1} H${loopX} V${midY0} H${cols[0] - 24}" fill="none"/>
    <path d="M${cols[0] - 8} ${midY0} L${cols[0] - 21} ${midY0 - 8} L${cols[0] - 21} ${midY0 + 8} Z" fill="#2ad4ff"/>
    <text transform="translate(34 ${(midY0 + midY1) / 2}) rotate(-90)" text-anchor="middle" font-size="15" font-weight="650" fill="#8ec1ff">Feedback returns to the next Plan</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d" font-family="'Segoe UI Variable', 'Segoe UI', Inter, Roboto, Arial, sans-serif">
  <title id="t">AI-Driven Development Life Cycle</title>
  <desc id="d">Six phases in a cycle: Plan, Design, Build, Test, Deploy and Maintain. Each ends with a human approval gate, and Maintain feeds the next Plan.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050c1d"/><stop offset="1" stop-color="#0a1a3d"/></linearGradient>
    <radialGradient id="g1" cx="0.88" cy="0.05" r="0.6"><stop offset="0" stop-color="#5b9bff" stop-opacity="0.28"/><stop offset="1" stop-color="#5b9bff" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.05" cy="0.95" r="0.55"><stop offset="0" stop-color="#2ad4ff" stop-opacity="0.2"/><stop offset="1" stop-color="#2ad4ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1d40"/><stop offset="1" stop-color="#0b1733"/></linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2ad4ff"/><stop offset="1" stop-color="#5b9bff"/></linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2ad4ff"/><stop offset="1" stop-color="#1f5eff"/></linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8ec1ff"/><stop offset="1" stop-color="#2ad4ff"/></linearGradient>
    <style>
      .flow { stroke: #5b9bff; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 8 8; animation: dash 0.9s linear infinite; }
      .flow.back { stroke: #2ad4ff; }
      @keyframes dash { to { stroke-dashoffset: -16; } }
      @media (prefers-reduced-motion: reduce) { .flow { animation: none; } }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>

  <text x="${W / 2}" y="78" text-anchor="middle" font-size="46" font-weight="800" fill="url(#title)" letter-spacing="-1">AI-Driven Development Life Cycle</text>
  <text x="${W / 2}" y="118" text-anchor="middle" font-size="21" fill="#93a8d1">Six phases. A human approval gate at the end of each one.</text>

  ${arrows}
  ${loop}
  ${phases.map(card).join('')}

  <text x="${W / 2}" y="785" text-anchor="middle" font-size="19" font-weight="650" fill="#e8f0ff">Run <tspan font-family="Cascadia Code, Consolas, monospace" fill="#8ec1ff">/aidlc-workflow</tspan> to find your current phase</text>
  <text x="${W / 2}" y="818" text-anchor="middle" font-size="16" fill="#93a8d1">Skills and agents for AI coding assistants</text>
</svg>
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, svg);
console.log(`Wrote ${out}`);
