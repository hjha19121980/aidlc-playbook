#!/usr/bin/env node
// Generates themed SVG illustrations for the web app tabs (same visual language as aidlc-phases.svg):
//   journey-banner.svg, installation-banner.svg, skills-banner.svg, docs-banner.svg (1600x500)
//   getstarted-hero.svg (1200x900)
// No dependencies. Convert the SVGs to WebP (e.g. https://squoosh.app) before shipping.
//   intro-overview.svg (1200x800)
// Usage: node scripts/generate-tab-images.mjs [outputDir]
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'web', 'public', 'assets', 'images');
mkdirSync(outDir, { recursive: true });

const FONT = "'Segoe UI Variable', 'Segoe UI', Inter, Roboto, Arial, sans-serif";
const MONO = "'Cascadia Code', Consolas, 'SF Mono', monospace";
const circle = (cx, cy, r) => `M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0-${r * 2} 0`;
const ic = {
  compass: [circle(12, 12, 9), 'M15.5 8.5l-2 5-5 2 2-5z'],
  pencil: ['M4 20l1-5L16 4l4 4L9 19z', 'M14 6l4 4'],
  code: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  flask: ['M9 3h6', 'M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3', 'M7 15h10'],
  upload: ['M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18', 'M12 11v8', 'M9 14l3-3 3 3'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5', 'M3 17l9 5 9-5'],
  branch: [circle(6, 5, 2), circle(6, 19, 2), circle(18, 7, 2), 'M6 7v10', 'M18 9a8 8 0 0 1-8 8'],
  pr: [circle(6, 5, 2), circle(6, 19, 2), circle(18, 18, 2), 'M6 7v10', 'M18 16V9a3 3 0 0 0-3-3h-3', 'M13 4l-2 2 2 2'],
  search: [circle(11, 11, 7), 'M21 21l-5-5'],
  message: ['M4 5h16v11H9l-5 4z'],
  merge: [circle(6, 5, 2), circle(6, 19, 2), circle(18, 13, 2), 'M6 7v10', 'M6 9c0 3 4 4 10 4'],
  tag: ['M3 12V3h9l9 9-9 9z', 'M7.5 7.5h.01'],
  folder: ['M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  monitor: ['M3 4h18v12H3z', 'M8 20h8', 'M12 16v4'],
  terminal: ['M4 5h16v14H4z', 'M7 10l3 2-3 2', 'M13 15h4'],
  download: ['M12 4v11', 'M7 11l5 5 5-5', 'M4 20h16'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
  check: ['M5 12l5 5 9-10'],
  file: ['M6 3h8l5 5v13H6z', 'M14 3v5h5', 'M9 13h6M9 17h6'],
  rocket: ['M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5', 'M12 15l-3-3a22 22 0 0 1 2-4 12 12 0 0 1 9-5c0 3-1 7-5 11a22 22 0 0 1-3 1z', 'M9 12H4s.5-3 2-4c1.5-.5 3 0 3 0', 'M12 15v5s3-.5 4-2c.5-1.5 0-3 0-3'],
  user: [circle(12, 8, 4), 'M4 21a8 8 0 0 1 16 0'],
  sparkles: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 3v4M21 5h-4', 'M5 17v4M7 19H3'],
  key: [circle(8, 15, 4), 'M11 12l9-9', 'M16 7l3 3'],
};
const icon = (name, x, y, s, color = '#04112b', sw = 1.8) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ic[name].map((d) => `<path d="${d}"/>`).join('')}</g>`;

const open = (w, h, title, desc) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${FONT}">
  <title id="t">${title}</title>
  <desc id="d">${desc}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050c1d"/><stop offset="1" stop-color="#0a1a3d"/></linearGradient>
    <radialGradient id="g1" cx="0.9" cy="0.0" r="0.7"><stop offset="0" stop-color="#5b9bff" stop-opacity="0.28"/><stop offset="1" stop-color="#5b9bff" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.05" cy="1" r="0.6"><stop offset="0" stop-color="#2ad4ff" stop-opacity="0.2"/><stop offset="1" stop-color="#2ad4ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1d40"/><stop offset="1" stop-color="#0b1733"/></linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2ad4ff"/><stop offset="1" stop-color="#5b9bff"/></linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#5b9bff" fill-opacity="0.16"/></pattern>
    <style>
      .flow { fill: none; stroke: #5b9bff; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 8 8; animation: dash 0.9s linear infinite; }
      .flow.cy { stroke: #2ad4ff; }
      @keyframes dash { to { stroke-dashoffset: -16; } }
      @media (prefers-reduced-motion: reduce) { .flow { animation: none; } }
    </style>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  <rect width="${w}" height="${h}" fill="url(#g1)"/>
  <rect width="${w}" height="${h}" fill="url(#g2)"/>
`;
const close = '</svg>\n';
const card = (x, y, w, h, r = 22) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#card)" stroke="#24407e" stroke-width="1.5"/>`;
const head = (x, y, label) => `<circle cx="${x + 26}" cy="${y + 26}" r="6" fill="#ff6b6b" fill-opacity=".75"/><circle cx="${x + 46}" cy="${y + 26}" r="6" fill="#ffd166" fill-opacity=".75"/><circle cx="${x + 66}" cy="${y + 26}" r="6" fill="#3ddc97" fill-opacity=".75"/><text x="${x + 92}" y="${y + 31}" font-size="14" fill="#93a8d1">${label}</text>`;
const arrowHead = (x, y, dir, fill = '#5b9bff') => {
  const p = { r: `${x} ${y} ${x - 13} ${y - 8} ${x - 13} ${y + 8}`, l: `${x} ${y} ${x + 13} ${y - 8} ${x + 13} ${y + 8}`, u: `${x} ${y} ${x - 8} ${y + 13} ${x + 8} ${y + 13}`, d: `${x} ${y} ${x - 8} ${y - 13} ${x + 8} ${y - 13}` }[dir];
  return `<polygon points="${p}" fill="${fill}"/>`;
};
const write = (name, svg) => { writeFileSync(join(outDir, name), svg); console.log('wrote', name); };

// ---------------------------------------------------------------- Journey (1600x500)
{
  const phases = [['Plan', 'compass'], ['Design', 'pencil'], ['Build', 'code'], ['Test', 'flask'], ['Deploy', 'upload'], ['Maintain', 'wrench']];
  const pts = phases.map((_, i) => [160 + i * 256, i % 2 ? 210 : 310]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], dx = (x1 - x0) / 2;
    d += ` C${x0 + dx} ${y0} ${x1 - dx} ${y1} ${x1} ${y1}`;
  }
  const [lx, ly] = pts[5], [px, py] = pts[0];
  const loop = `M${lx} ${ly - 56} C${lx} 40 ${px} 40 ${px} ${py - 62}`;
  let s = open(1600, 500, 'The AIDLC journey', 'Six phases along a winding path: Plan, Design, Build, Test, Deploy and Maintain, with feedback returning to the next Plan.');
  s += `<path d="${d}" fill="none" stroke="#5b9bff" stroke-opacity="0.18" stroke-width="16" stroke-linecap="round"/>
  <path class="flow" d="${d}"/>
  <path class="flow cy" d="${loop}"/>${arrowHead(px, py - 58, 'd', '#2ad4ff')}
  <rect x="${(lx + px) / 2 - 190}" y="62" width="380" height="34" rx="17" fill="#0b1733" stroke="#24407e"/>
  <text x="${(lx + px) / 2}" y="85" text-anchor="middle" font-size="16" font-weight="650" fill="#8ec1ff">Feedback returns to the next Plan</text>`;
  phases.forEach(([name, ico], i) => {
    const [x, y] = pts[i];
    s += `<circle cx="${x}" cy="${y}" r="52" fill="#5b9bff" fill-opacity="0.12"/>
    <circle cx="${x}" cy="${y}" r="42" fill="url(#brand)"/>
    ${icon(ico, x - 18, y - 18, 1.5)}
    <circle cx="${x + 36}" cy="${y - 34}" r="14" fill="#0b1733" stroke="#2ad4ff" stroke-width="1.5"/>
    <text x="${x + 36}" y="${y - 28.5}" text-anchor="middle" font-size="15" font-weight="800" fill="#8ec1ff">${i + 1}</text>
    <text x="${x}" y="${y + 84}" text-anchor="middle" font-size="26" font-weight="750" fill="#e8f0ff">${name}</text>
    <text x="${x}" y="${y + 110}" text-anchor="middle" font-size="15" font-family="${MONO}" fill="#8ec1ff">/aidlc-${name.toLowerCase()}</text>`;
  });
  write('journey-banner.svg', s + close);
}

// ---------------------------------------------------------------- Installation (1600x500)
{
  let s = open(1600, 500, 'Installing the AIDLC skills', 'A terminal running the installer on the left, an arrow, and the installed project folders on the right for Windows and macOS.');
  s += `${card(80, 80, 640, 340)}${head(80, 80, 'Terminal')}
  <text font-family="${MONO}" font-size="19">
    <tspan x="112" y="168" fill="#93a8d1">$</tspan><tspan dx="12" fill="#e8f0ff">curl -fsSLO &lt;site&gt;/downloads/install.sh</tspan>
    <tspan x="112" y="206" fill="#93a8d1">$</tspan><tspan dx="12" fill="#e8f0ff">bash install.sh --target ~/my-project</tspan>
    <tspan x="112" y="258" fill="#3ddc97">Checksum verified (SHA-256).</tspan>
    <tspan x="112" y="294" fill="#3ddc97">Installed 42 files into ~/my-project</tspan>
    <tspan x="112" y="346" fill="#93a8d1">$</tspan><tspan dx="12" fill="#8ec1ff">/aidlc-workflow</tspan>
  </text>
  <rect x="362" y="330" width="11" height="22" fill="#2ad4ff"/>
  <path class="flow" d="M740 250 H842"/>${arrowHead(856, 250, 'r')}
  ${card(880, 80, 640, 340)}
  ${icon('folder', 912, 106, 1.5, '#8ec1ff')}
  <text x="958" y="136" font-size="24" font-weight="750" fill="#e8f0ff">my-project</text>`;
  [['.claude/skills/', 'Terminal agent skills'], ['.github/skills/', 'Copilot skills'], ['.github/agents/', 'Copilot agents'], ['docs/aidlc/', 'Docs and status tracker']].forEach(([p, note], i) => {
    const y = 190 + i * 52;
    s += `${icon('check', 914, y - 16, 1.1, '#3ddc97', 2.4)}
    <text x="948" y="${y}" font-size="20" font-family="${MONO}" fill="#e8f0ff">${p}</text>
    <text x="1180" y="${y}" font-size="16" fill="#93a8d1">${note}</text>`;
  });
  s += `<rect x="912" y="372" width="140" height="32" rx="16" fill="#5b9bff" fill-opacity=".14" stroke="#5b9bff" stroke-opacity=".5"/>${icon('monitor', 924, 376, 1, '#8ec1ff')}<text x="954" y="394" font-size="15" font-weight="650" fill="#8ec1ff">Windows</text>
  <rect x="1068" y="372" width="120" height="32" rx="16" fill="#5b9bff" fill-opacity=".14" stroke="#5b9bff" stroke-opacity=".5"/>${icon('terminal', 1080, 376, 1, '#8ec1ff')}<text x="1110" y="394" font-size="15" font-weight="650" fill="#8ec1ff">macOS</text>`;
  write('installation-banner.svg', s + close);
}

// ---------------------------------------------------------------- Skills (1600x500)
{
  const left = [['aidlc-plan', 'compass'], ['aidlc-design', 'pencil'], ['aidlc-build', 'code'], ['aidlc-test', 'flask'], ['aidlc-deploy', 'upload'], ['aidlc-maintain', 'wrench']];
  const right = [['git-commit', 'branch'], ['git-create-pr', 'pr'], ['git-review-pr', 'search'], ['git-pr-comment', 'message'], ['git-resolve-pr-conflicts', 'merge'], ['git-release-notes', 'tag']];
  const rowY = [130, 224, 318], PW = 262, PH = 52;
  let s = open(1600, 500, 'The AIDLC skills', 'A hub labelled aidlc-workflow connected to six AIDLC phase skills on the left and six Git operation skills on the right.');
  s += `<text x="60" y="102" font-size="15" font-weight="700" letter-spacing="2" fill="#8ec1ff">AIDLC PHASES</text><text x="1540" y="102" text-anchor="end" font-size="15" font-weight="700" letter-spacing="2" fill="#2ad4ff">GIT OPERATIONS</text>`;
  const pill = (x, y, name, ico, col) => `<rect x="${x}" y="${y}" width="${PW}" height="${PH}" rx="26" fill="url(#card)" stroke="${col}" stroke-opacity=".6" stroke-width="1.5"/>
    <circle cx="${x + 26}" cy="${y + 26}" r="17" fill="${col}" fill-opacity=".2"/>${icon(ico, x + 16, y + 16, 0.83, col, 2)}
    <text x="${x + 54}" y="${y + 32}" font-size="${name.length > 20 ? 14 : 16}" font-family="${MONO}" fill="#e8f0ff">${name}</text>`;
  const hubX = 800, hubY = 250;
  [[60, 350, left, '#8ec1ff', -1], [988, 1278, right, '#2ad4ff', 1]].forEach(([c1, c2, items, col, side]) => {
    items.forEach(([name, ico], i) => {
      const col_ = i % 2, row = Math.floor(i / 2), x = col_ ? c2 : c1, y = rowY[row];
      const near = side < 0 ? c2 + PW : c1; // edge nearest the hub
      if (col_ === 1 && side < 0 || col_ === 0 && side > 0) {
        const ex = near, ey = y + PH / 2;
        s += `<path class="flow ${side > 0 ? 'cy' : ''}" d="M${side < 0 ? hubX - 64 : hubX + 64} ${hubY} C${(hubX + ex) / 2} ${hubY} ${(hubX + ex) / 2} ${ey} ${ex} ${ey}"/>`;
      } else {
        const a = side < 0 ? c1 + PW : c2, b = side < 0 ? c2 : c1 + PW;
        s += `<path d="M${a} ${y + PH / 2} H${b}" stroke="${col}" stroke-opacity=".4" stroke-width="2" stroke-dasharray="3 6" fill="none"/>`;
      }
      s += pill(x, y, name, ico, col);
    });
  });
  s += `<circle cx="${hubX}" cy="${hubY}" r="86" fill="#5b9bff" fill-opacity=".1"/><circle cx="${hubX}" cy="${hubY}" r="64" fill="url(#brand)"/>${icon('layers', hubX - 22, hubY - 22, 1.85)}
  <text x="${hubX}" y="${hubY + 112}" text-anchor="middle" font-size="20" font-family="${MONO}" font-weight="700" fill="#e8f0ff">/aidlc-workflow</text>
  <text x="${hubX}" y="${hubY + 138}" text-anchor="middle" font-size="15" fill="#93a8d1">finds your phase and next step</text>`;
  write('skills-banner.svg', s + close);
}

// ---------------------------------------------------------------- Docs (1600x500)
{
  let s = open(1600, 500, 'AIDLC documentation', 'Three cards: a README document, the docs/aidlc folder structure, and a status table showing each phase.');
  // README card
  s += `${card(70, 60, 440, 380)}${icon('file', 98, 88, 1.3, '#8ec1ff')}<text x="140" y="112" font-size="22" font-weight="750" fill="#e8f0ff">README.md</text>
  <rect x="98" y="146" width="250" height="14" rx="7" fill="url(#brand)"/>`;
  [380, 340, 360, 300].forEach((w, i) => (s += `<rect x="98" y="${180 + i * 26}" width="${w}" height="9" rx="4.5" fill="#93a8d1" fill-opacity=".35"/>`));
  s += `<rect x="98" y="300" width="384" height="70" rx="12" fill="#030a1a" stroke="#24407e"/><text x="116" y="332" font-size="16" font-family="${MONO}" fill="#8ec1ff">/aidlc-workflow</text><text x="116" y="355" font-size="14" font-family="${MONO}" fill="#93a8d1">gh auth login</text>
  ${icon('shield', 98, 388, 1.1, '#3ddc97', 2)}<text x="132" y="408" font-size="15" font-weight="650" fill="#3ddc97">Human approval at every gate</text>`;
  // Tree card
  s += `${card(580, 60, 440, 380)}${icon('folder', 608, 88, 1.3, '#8ec1ff')}<text x="650" y="112" font-size="22" font-family="${MONO}" font-weight="700" fill="#e8f0ff">docs/aidlc/</text>`;
  ['status.md', 'README.md', 'skills-reference.md', '01-plan/', '02-design/', '03-build/', '04-test/', '05-deploy/', '06-maintain/'].forEach((n, i) => {
    const y = 160 + i * 30, dir = n.endsWith('/');
    s += `${icon(dir ? 'folder' : 'file', 612, y - 15, 0.85, dir ? '#2ad4ff' : '#93a8d1', 2)}<text x="642" y="${y}" font-size="17" font-family="${MONO}" fill="${dir ? '#e8f0ff' : '#b7c6e6'}">${n}</text>`;
  });
  // Status card
  s += `${card(1090, 60, 440, 380)}${icon('check', 1118, 88, 1.3, '#3ddc97', 2.2)}<text x="1160" y="112" font-size="22" font-weight="750" fill="#e8f0ff">status.md</text>`;
  [['Plan', 'approved', '#3ddc97'], ['Design', 'approved', '#3ddc97'], ['Build', 'in progress', '#2ad4ff'], ['Test', 'awaiting approval', '#8ec1ff'], ['Deploy', 'not started', '#93a8d1'], ['Maintain', 'not started', '#93a8d1']].forEach(([n, st, c], i) => {
    const y = 150 + i * 46, w = st.length * 9 + 28;
    s += `<text x="1118" y="${y + 24}" font-size="19" font-weight="650" fill="#e8f0ff">${n}</text>
    <rect x="${1500 - w}" y="${y + 4}" width="${w}" height="28" rx="14" fill="${c}" fill-opacity=".16" stroke="${c}" stroke-opacity=".6"/>
    <text x="${1500 - w / 2}" y="${y + 23}" text-anchor="middle" font-size="14" font-weight="650" fill="${c}">${st}</text>
    <path d="M1118 ${y + 40} H1500" stroke="#24407e" stroke-opacity=".6"/>`;
  });
  write('docs-banner.svg', s + close);
}

// ---------------------------------------------------------------- Get Started (1200x900)
{
  const steps = [
    ['Download the skills', 'Windows or macOS, your folder', 'download'],
    ['Sign in to Git', 'gh auth login  or  az login', 'key'],
    ['Run /aidlc-workflow', 'Find your current phase', 'terminal'],
    ['Plan, review, approve', 'Then move on to Design', 'compass'],
  ];
  const X = (i) => 40 + i * 170, Y = (i) => 700 - i * 170, W = 400, H = 130;
  let s = open(1200, 900, 'Get started in four steps', 'A staircase of four steps rising to a rocket: download the skills, sign in to Git, run aidlc-workflow, then plan, review and approve.');
  s += `<text x="40" y="96" font-size="44" font-weight="800" fill="#e8f0ff" letter-spacing="-1">Get started in <tspan fill="#2ad4ff">four steps</tspan></text>
  <text x="40" y="136" font-size="21" fill="#93a8d1">From zero to your first approved phase</text>`;
  steps.forEach(([t, sub, ico], i) => {
    const x = X(i), y = Y(i);
    if (i < 3) s += `<path class="flow" d="M${x + 300} ${y - 4} V${y - 26}"/>${arrowHead(x + 300, y - 40, 'u')}`;
    s += `${card(x, y, W, H, 20)}
    <rect x="${x + 22}" y="${y + 24}" width="52" height="52" rx="15" fill="url(#brand)"/>${icon(ico, x + 32, y + 34, 1.4)}
    <text x="${x + 92}" y="${y + 48}" font-size="14" font-weight="800" letter-spacing="1.5" fill="#2ad4ff">STEP ${i + 1}</text>
    <text x="${x + 92}" y="${y + 76}" font-size="25" font-weight="750" fill="#e8f0ff">${t}</text>
    <text x="${x + 92}" y="${y + 106}" font-size="16" fill="#93a8d1">${sub}</text>`;
  });
  s += `<circle cx="1060" cy="260" r="92" fill="#5b9bff" fill-opacity=".12"/><circle cx="1060" cy="260" r="70" fill="url(#brand)"/>${icon('rocket', 1010, 210, 4.2, '#04112b', 1.5)}
  <path class="flow cy" d="M${X(3) + W + 6} ${Y(3) + 65} H980"/>${arrowHead(986, Y(3) + 65, 'r', '#2ad4ff')}`;
  write('getstarted-hero.svg', s + close);
}

// ---------------------------------------------------------------- Introduction overview (1200x800)
{
  const cards = [
    { x: 70, y: 190, n: 1, ico: 'user', t: 'You', sub: 'Run /aidlc-plan' },
    { x: 690, y: 190, n: 2, ico: 'sparkles', t: 'AI assistant', sub: 'Drafts requirements and stories' },
    { x: 690, y: 500, n: 3, ico: 'file', t: 'Your repository', sub: 'docs/aidlc/01-plan/' },
    { x: 70, y: 500, n: 4, ico: 'shield', t: 'You review', sub: 'Edit, then approve the gate' },
  ];
  const CW = 440, CH = 200;
  let s = open(1200, 800, 'People and AI working together', 'A loop: you run a skill, the AI assistant drafts, the result lands in your repository, and you review and approve. Requested changes go back to you.');
  s += `<text x="600" y="84" text-anchor="middle" font-size="40" font-weight="800" fill="#e8f0ff" letter-spacing="-1">People direct. <tspan fill="#2ad4ff">AI drafts.</tspan></text>
  <text x="600" y="126" text-anchor="middle" font-size="21" fill="#93a8d1">Nothing moves on until a person approves it.</text>
  <path class="flow" d="M${70 + CW + 8} 290 H664"/>${arrowHead(682, 290, 'r')}
  <path class="flow" d="M910 ${190 + CH + 8} V478"/>${arrowHead(910, 492, 'd')}
  <path class="flow" d="M682 600 H${70 + CW + 26}"/>${arrowHead(70 + CW + 8, 600, 'l')}
  <path class="flow cy" d="M290 492 V${190 + CH + 26}"/>${arrowHead(290, 190 + CH + 8, 'u', '#2ad4ff')}
  <text x="306" y="450" font-size="14" font-weight="650" fill="#8ec1ff">Request changes</text>`;
  cards.forEach((c) => {
    s += `${card(c.x, c.y, CW, CH)}
    <rect x="${c.x + 26}" y="${c.y + 30}" width="64" height="64" rx="18" fill="url(#brand)"/>${icon(c.ico, c.x + 40, c.y + 44, 1.5)}
    <circle cx="${c.x + CW - 40}" cy="${c.y + 44}" r="17" fill="#0b1733" stroke="#2ad4ff" stroke-width="1.5"/>
    <text x="${c.x + CW - 40}" y="${c.y + 50}" text-anchor="middle" font-size="17" font-weight="800" fill="#8ec1ff">${c.n}</text>
    <text x="${c.x + 26}" y="${c.y + 142}" font-size="30" font-weight="750" fill="#e8f0ff">${c.t}</text>
    <text x="${c.x + 26}" y="${c.y + 176}" font-size="18" fill="#93a8d1">${c.sub}</text>`;
  });
  s += `<circle cx="600" cy="445" r="78" fill="#5b9bff" fill-opacity=".1"/><circle cx="600" cy="445" r="58" fill="url(#brand)"/>${icon('shield', 582, 399, 1.5, '#04112b', 1.8)}
  <text x="600" y="456" text-anchor="middle" font-size="14" font-weight="800" fill="#04112b">HUMAN IN</text><text x="600" y="474" text-anchor="middle" font-size="14" font-weight="800" fill="#04112b">THE LOOP</text>`;
  write('intro-overview.svg', s + close);
}
