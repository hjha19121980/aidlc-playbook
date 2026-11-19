#!/usr/bin/env node
// Generates original explanatory figures for the web app (same visual language as the other illustrations):
//   fig-bottleneck, fig-line-vs-loop, fig-artifact-chain, fig-autonomy-tiers, fig-control-bands, fig-connectors
// All are 1600x800 SVGs. Convert to WebP before shipping (Squoosh or any image tool).
// Usage: node scripts/generate-figures.mjs [outputDir]
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MONO, arrow, card, close, headAt, icon, open, orbitDots, pill, tile } from './lib/svg.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'web', 'image-sources', 'generated');
mkdirSync(outDir, { recursive: true });
const write = (name, svg) => { writeFileSync(join(outDir, name), svg); console.log('wrote', name); };
const W = 1600, H = 800;
const title = (t, sub) => `<text x="80" y="92" font-size="42" font-weight="800" fill="#e8f0ff" letter-spacing="-1">${t}</text><text x="80" y="134" font-size="21" fill="#93a8d1">${sub}</text>`;
const STAGES = ['Plan', 'Design', 'Build', 'Test', 'Deploy', 'Maintain'];

// ------------------------------------------------------------------ 1. Bottleneck moved
{
  let s = open(W, H, 'Where the time goes', 'Two rows of six stages. Before agents every stage is equally long. With agents the Build stage shrinks and the remaining human-speed stages set the pace.');
  s += title('Where the time goes', 'Illustrative, not measured: when build runs at agent speed, the human-speed stages around it set the pace.');
  const SW = 220, GAP = 12, X0 = 110;
  const bar = (x, y, w, name, agent) => `<rect x="${x}" y="${y}" width="${w}" height="74" rx="16" ${agent ? 'fill="url(#brand)"' : 'fill="url(#card)" stroke="#24407e" stroke-width="1.5"'}/><text x="${x + w / 2}" y="${y + 46}" text-anchor="middle" font-size="${w < 100 ? 15 : 22}" font-weight="700" fill="${agent ? '#04112b' : '#e8f0ff'}">${name}</text>`;
  s += `<text x="${X0}" y="226" font-size="24" font-weight="750" fill="#e8f0ff">Before agents</text><text x="${X0 + 175}" y="226" font-size="18" fill="#93a8d1">every stage runs at human speed</text>`;
  STAGES.forEach((n, i) => (s += bar(X0 + i * (SW + GAP), 250, SW, n, false)));
  s += `<text x="${X0}" y="456" font-size="24" font-weight="750" fill="#e8f0ff">With agents</text><text x="${X0 + 150}" y="456" font-size="18" fill="#93a8d1">build runs at agent speed</text>`;
  let x = X0;
  const xs = [];
  STAGES.forEach((n) => {
    const w = n === 'Build' ? 56 : SW;
    s += bar(x, 480, w, n, n === 'Build');
    xs.push([n, x, w]);
    x += w + GAP;
  });
  const endA = X0 + 5 * (SW + GAP) + SW;
  s += `<rect x="${x}" y="480" width="${endA - x}" height="74" rx="16" fill="none" stroke="#2ad4ff" stroke-width="2" stroke-dasharray="7 7"/>
  <text x="${x + (endA - x) / 2}" y="514" text-anchor="middle" font-size="15" font-weight="700" fill="#2ad4ff">cycle time</text><text x="${x + (endA - x) / 2}" y="535" text-anchor="middle" font-size="15" font-weight="700" fill="#2ad4ff">reclaimed</text>`;
  [['Plan', 'requirements'], ['Test', 'review'], ['Deploy', 'release']].forEach(([n, note]) => {
    const [, bx, bw] = xs.find((q) => q[0] === n);
    s += `<path d="M${bx + 8} 576 H${bx + bw - 8}" stroke="#2ad4ff" stroke-width="2" stroke-linecap="round"/><text x="${bx + bw / 2}" y="606" text-anchor="middle" font-size="18" font-weight="650" fill="#8ec1ff">${note}</text><text x="${bx + bw / 2}" y="630" text-anchor="middle" font-size="15" fill="#93a8d1">still human speed</text>`;
  });
  s += pill(110, 690, 1380, 54, 'The bottleneck moves to the steps left and right of build: plan, review and test, and deploy.', { size: 19, color: '#e8f0ff' });
  write('fig-bottleneck.svg', s + close);
}

// ------------------------------------------------------------------ 2. Line vs loop
{
  let s = open(W, H, 'The line and the loop', 'Left: the traditional line of six stages with one slow loop back as a new release cycle. Right: the AIDLC loop of six stages with people above the loop directing and governing.');
  s += card(50, 60, 720, 680) + card(830, 60, 720, 680);
  s += `<text x="80" y="122" font-size="32" font-weight="800" fill="#e8f0ff">Traditional SDLC</text><text x="80" y="156" font-size="18" fill="#93a8d1">The line</text>
  <text x="860" y="122" font-size="32" font-weight="800" fill="#e8f0ff">AI-native SDLC (<tspan fill="#2ad4ff">AIDLC</tspan>)</text><text x="860" y="156" font-size="18" fill="#93a8d1">The loop</text>`;
  // line
  const bx = (i) => 76 + i * 116;
  STAGES.forEach((n, i) => {
    s += `<rect x="${bx(i)}" y="330" width="96" height="74" rx="14" fill="#0b1733" stroke="#24407e" stroke-width="1.5"/><text x="${bx(i) + 48}" y="373" text-anchor="middle" font-size="16" font-weight="700" fill="#e8f0ff">${n}</text>`;
    if (i < 5) s += `<path d="M${bx(i) + 98} 367 H${bx(i) + 108}" stroke="#6b7fa8" stroke-width="2.5" stroke-linecap="round"/>${headAt(bx(i) + 118, 367, 0, '#6b7fa8', 9, 6)}`;
  });
  const xm = bx(5) + 48, xp = bx(0) + 48;
  s += `<path class="flow mute" d="M${xm} 408 C${xm} 510 ${xp} 510 ${xp} 412"/>${headAt(xp, 408, -Math.PI / 2, '#6b7fa8')}
  <rect x="190" y="505" width="400" height="36" rx="18" fill="#0b1733" stroke="#24407e"/><text x="390" y="529" text-anchor="middle" font-size="16" font-weight="650" fill="#93a8d1">One slow loop back is a new release cycle</text>
  <text x="80" y="240" font-size="18" fill="#93a8d1">Each stage is a handoff between roles, through</text><text x="80" y="266" font-size="18" fill="#93a8d1">documents, tickets and sign-offs.</text>`;
  // loop
  const cx = 1190, cy = 410, R = 175, NR = 46, toRad = (d) => (d * Math.PI) / 180;
  const pt = (deg, r = R) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];
  for (let i = 0; i < 6; i++) {
    const a0 = -90 + i * 60 + 19, a1 = -90 + (i + 1) * 60 - 23;
    const [sx, sy] = pt(a0), [ex, ey] = pt(a1);
    s += `<path class="flow cy" d="M${sx.toFixed(1)} ${sy.toFixed(1)} A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}"/>${headAt(ex, ey, toRad(a1 + 90), '#2ad4ff')}`;
  }
  s += orbitDots(cx, cy, R); // dots travel around the loop, behind the stage nodes
  STAGES.forEach((n, i) => {
    const [x, y] = pt(-90 + i * 60);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${NR + 8}" fill="#5b9bff" fill-opacity=".1"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${NR}" fill="url(#brand)"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-size="16" font-weight="800" fill="#04112b">${n}</text>`;
  });
  s += `<circle cx="${cx}" cy="${cy}" r="76" fill="#0b1733" stroke="#2ad4ff" stroke-opacity=".6" stroke-width="1.5"/>${icon('shield', cx - 17, cy - 52, 1.4, '#3ddc97', 1.9)}<text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="16" font-weight="800" fill="#e8f0ff">Humans above</text><text x="${cx}" y="${cy + 33}" text-anchor="middle" font-size="16" font-weight="800" fill="#e8f0ff">the loop</text>
  <text x="1190" y="700" text-anchor="middle" font-size="17" fill="#93a8d1">Shorter loops. People instigate, direct and govern.</text>`;
  write('fig-line-vs-loop.svg', s + close);
}

// ------------------------------------------------------------------ 3. Artifact chain
{
  let s = open(W, H, 'The artifact chain', 'Seven artifacts in a row: intent.md, spec.md, plan.md, diff and tests, PR and findings, release.md, incident.md. Each is committed by one stage and read by the next, with a human gate. The incident record becomes the next intent.');
  s += title('Every stage commits an artifact the next stage reads', 'The chain of commits is the audit trail: who asked for what, what the agent produced, who approved it.');
  const items = [
    ['intent.md', 'Plan', ['Product owner', 'accepts'], 'file'],
    ['spec.md', 'Design', ['Product owner', 'accepts'], 'pencil'],
    ['plan.md', 'Build', ['Engineer', 'accepts'], 'clipboard'],
    ['diff + tests', 'Build, Test', ['Code owner', 'reviews'], 'code'],
    ['PR + findings', 'Deploy', ['Code owner', 'approves'], 'pr'],
    ['release.md', 'Deploy', ['Release manager', 'authorizes'], 'upload'],
    ['incident.md', 'Maintain', ['Service owner', 'triages'], 'wrench'],
  ];
  const CW = 178, GAP = 42, X0 = 46, Y = 220, CH = 250;
  const cxs = items.map((_, i) => X0 + i * (CW + GAP));
  items.forEach(([f, st, gate, ico], i) => {
    const x = cxs[i];
    s += card(x, Y, CW, CH, 20) + tile(x + 20, Y + 22, 56, ico, 1.4) + pill(x + 20, Y + 96, st.length * 9.5 + 26, 28, st, { size: 14 });
    s += `<text x="${x + 20}" y="${Y + 168}" font-size="${f.length > 11 ? 21 : 24}" font-weight="750" fill="#e8f0ff" font-family="${MONO}">${f}</text>
    ${icon('shield', x + 18, Y + 186, 0.8, '#3ddc97', 2.2)}<text x="${x + 44}" y="${Y + 202}" font-size="14" font-weight="650" fill="#3ddc97">${gate[0]}</text><text x="${x + 44}" y="${Y + 222}" font-size="14" font-weight="650" fill="#3ddc97">${gate[1]}</text>`;
    if (i < 6) s += arrow(x + CW + 6, Y + 125, x + CW + GAP - 6, Y + 125);
  });
  const lx1 = cxs[6] + CW / 2, lx0 = cxs[0] + CW / 2, ly = 590;
  s += `<path class="flow cy" d="M${lx1} ${Y + CH + 8} V${ly} H${lx0} V${Y + CH + 20}"/>${headAt(lx0, Y + CH + 8, -Math.PI / 2, '#2ad4ff')}
  <rect x="${(lx0 + lx1) / 2 - 250}" y="${ly - 20}" width="500" height="40" rx="20" fill="#0b1733" stroke="#24407e"/><text x="${(lx0 + lx1) / 2}" y="${ly + 6}" text-anchor="middle" font-size="18" font-weight="650" fill="#8ec1ff">What Maintain finds becomes the next intent.md</text>
  <text x="${W / 2}" y="710" text-anchor="middle" font-size="18" fill="#93a8d1">Early artifacts are Markdown so a product owner and an agent can read and act on the same file. From Build on, the artifact is code and its records.</text>`;
  write('fig-artifact-chain.svg', s + close);
}

// ------------------------------------------------------------------ 4. Autonomy tiers
{
  let s = open(W, H, 'Autonomy tiers by environment', 'Three environments: development where the agent deploys freely, staging where it deploys within checks, and production where the agent prepares the release and a release manager authorizes it at a gate. Rollback is rehearsed.');
  s += title('The agent acts up to the production gate and cannot pass it', 'Tier autonomy by environment. Each tier is enforced by configuration, not by habit.');
  const envs = [
    { x: 80, name: 'Development', line: 'Agent deploys freely', filled: 5, ico: 'terminal' },
    { x: 590, name: 'Staging', line: 'Agent deploys within checks', filled: 3, ico: 'layers' },
    { x: 1100, name: 'Production', line: 'Agent prepares the release', filled: 1, ico: 'shield' },
  ];
  envs.forEach((e, i) => {
    s += card(e.x, 200, 420, 340, 22, i === 2 ? '#2ad4ff' : '#24407e') + tile(e.x + 26, 226, 60, e.ico, 1.5);
    s += `<text x="${e.x + 104}" y="266" font-size="30" font-weight="800" fill="#e8f0ff">${e.name}</text><text x="${e.x + 26}" y="338" font-size="21" font-weight="650" fill="#8ec1ff">${e.line}</text>
    <text x="${e.x + 26}" y="400" font-size="14" font-weight="700" letter-spacing="1.5" fill="#93a8d1">AGENT AUTONOMY</text>`;
    for (let k = 0; k < 5; k++) s += `<rect x="${e.x + 26 + k * 74}" y="416" width="64" height="16" rx="8" ${k < e.filled ? 'fill="url(#brand)"' : 'fill="#24407e" fill-opacity=".6"'}/>`;
    s += i === 2
      ? `<text x="${e.x + 26}" y="480" font-size="17" fill="#e8f0ff">A named release manager authorizes.</text><text x="${e.x + 26}" y="506" font-size="17" fill="#93a8d1">A check enforces it every time.</text>`
      : `<text x="${e.x + 26}" y="480" font-size="17" fill="#93a8d1">${i === 0 ? 'Fast feedback, no standing risk.' : 'Same pipeline, narrower powers.'}</text>`;
  });
  s += arrow(510, 370, 580, 370) + arrow(1020, 370, 1050, 370);
  s += `<rect x="1052" y="250" width="10" height="240" rx="5" fill="#2ad4ff"/><circle cx="1057" cy="370" r="26" fill="#0b1733" stroke="#2ad4ff" stroke-width="2"/>${icon('shield', 1045, 358, 1, '#2ad4ff', 2)}<text x="1057" y="236" text-anchor="middle" font-size="15" font-weight="800" letter-spacing="1.5" fill="#2ad4ff">GATE</text>`;
  s += `<path class="flow cy" d="M1300 552 V610 H800 V560"/>${headAt(800, 548, -Math.PI / 2, '#2ad4ff')}
  <rect x="560" y="592" width="760" height="40" rx="20" fill="#0b1733" stroke="#24407e"/><text x="940" y="618" text-anchor="middle" font-size="18" font-weight="650" fill="#8ec1ff">Rollback: the most rehearsed path. One command, exercised in staging.</text>
  <text x="${W / 2}" y="710" text-anchor="middle" font-size="18" fill="#93a8d1">No standing production credentials. Everything the agent writes arrives as a pull request.</text>`;
  write('fig-autonomy-tiers.svg', s + close);
}

// ------------------------------------------------------------------ 5. Control bands
{
  let s = open(W, H, 'Control bands and response tiers', 'A metric over time with its mean and one, two and three sigma bands. Crossing three sigma triggers the agent, which writes the finding as a new intent. Response tiers: log, diagnose read-only, propose through a pull request or approved runbook.');
  s += title('Detection stays deterministic', 'The agent is invoked only after a band is breached, and the tier sets what it may do.');
  const px = 70, py = 180, pw = 820, ph = 520, mid = py + ph / 2, u = 52;
  s += card(px, py, pw, ph, 20);
  [[3, '#ff6b6b', 'rgba'], [2, '#ffd166', ''], [1, '#3ddc97', '']].forEach(([k, c]) => {
    s += `<rect x="${px + 20}" y="${mid - k * u}" width="${pw - 110}" height="${2 * k * u}" fill="${c}" fill-opacity="0.05"/>
    <path d="M${px + 20} ${mid - k * u} H${px + pw - 90} M${px + 20} ${mid + k * u} H${px + pw - 90}" stroke="${c}" stroke-opacity=".55" stroke-width="1.5" stroke-dasharray="6 6"/>
    <text x="${px + pw - 66}" y="${mid - k * u + 5}" font-size="17" font-weight="800" fill="${c}">${k}σ</text>`;
  });
  s += `<path d="M${px + 20} ${mid} H${px + pw - 90}" stroke="#8ec1ff" stroke-width="2"/>`;
  const ys = [0.1, -0.3, 0.35, -0.15, 0.4, -0.5, 0.25, 0.6, 0.45, 0.9, 1.05, 1.4, 1.2, 1.9, 2.3, 3.5, 2.2, 1.0];
  const xs = ys.map((_, i) => px + 40 + i * ((pw - 150) / (ys.length - 1)));
  const pts = ys.map((v, i) => [xs[i], mid - v * u]);
  s += `<polyline points="${pts.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#e8f0ff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  const br = pts[15];
  s += `<circle cx="${br[0]}" cy="${br[1]}" r="12" fill="#ff6b6b" fill-opacity=".25"/><circle cx="${br[0]}" cy="${br[1]}" r="6" fill="#ff6b6b"/><text x="${br[0] + 18}" y="${br[1] - 12}" font-size="16" font-weight="800" fill="#ff6b6b">breach</text><text x="${px + 24}" y="${py + ph - 18}" font-size="15" fill="#93a8d1">time. Solid line: rolling baseline. Dashed lines: 1, 2 and 3 sigma.</text><text x="${px + 24}" y="${py + 34}" font-size="15" fill="#93a8d1">metric, for example CI test failure rate</text>`;
  const tx = 950, tw = 580;
  [['1σ', 'Log only', 'Record the movement.', '#3ddc97', 'file'], ['2σ', 'Diagnose', 'A read-only agent investigates.', '#ffd166', 'search'], ['3σ', 'Propose', 'Only via a pull request or a pre-approved runbook.', '#ff6b6b', 'pr']].forEach(([sg, h, d, c, ico], i) => {
    const y = 180 + i * 130;
    s += card(tx, y, tw, 108, 18, c) + `<text x="${tx + 28}" y="${y + 66}" font-size="34" font-weight="800" fill="${c}">${sg}</text><text x="${tx + 120}" y="${y + 46}" font-size="24" font-weight="750" fill="#e8f0ff">${h}</text><text x="${tx + 120}" y="${y + 78}" font-size="17" fill="#93a8d1">${d}</text>${icon(ico, tx + tw - 62, y + 36, 1.4, c, 1.9)}`;
  });
  s += arrow(tx + tw / 2, 180 + 3 * 130 - 12, tx + tw / 2, 600, 'flow cy', '#2ad4ff');
  s += `<rect x="${tx}" y="606" width="${tw}" height="94" rx="18" fill="url(#brand)"/><text x="${tx + tw / 2}" y="646" text-anchor="middle" font-size="24" font-weight="800" fill="#04112b">incident.md + new intent.md</text><text x="${tx + tw / 2}" y="676" text-anchor="middle" font-size="17" font-weight="650" fill="#04112b">Triaged by a person, then through the review gate</text>`;
  write('fig-control-bands.svg', s + close);
}

// ------------------------------------------------------------------ 6. Connectors
{
  let s = open(W, H, 'Connectors', 'The agent connects through a connector layer to Git, Figma, Jira and Confluence, with an open slot for company-specific connectors. Stages on the left use them.');
  s += title('Connectors: read first, write with approval', 'Tickets, pages and designs stay the system of record. The repository links to them and back.');
  STAGES.forEach((n, i) => {
    const y = 200 + i * 78;
    s += `<rect x="70" y="${y}" width="230" height="60" rx="30" fill="#0b1733" stroke="#24407e" stroke-width="1.5"/><text x="185" y="${y + 38}" text-anchor="middle" font-size="20" font-weight="700" fill="#e8f0ff">${n}</text><path class="flow" d="M300 ${y + 30} C390 ${y + 30} 400 440 480 440" />`;
  });
  s += card(480, 300, 420, 280, 24, '#2ad4ff') + `<rect x="504" y="324" width="372" height="40" rx="20" fill="#5b9bff" fill-opacity=".14" stroke="#5b9bff" stroke-opacity=".5"/><text x="690" y="351" text-anchor="middle" font-size="16" font-weight="700" fill="#8ec1ff">Connector layer (MCP)</text>
  ${tile(630, 386, 120, 'sparkles', 3)}<text x="690" y="548" text-anchor="middle" font-size="26" font-weight="800" fill="#e8f0ff">Agent</text><text x="690" y="572" text-anchor="middle" font-size="15" fill="#93a8d1">terminal agent or Copilot</text>`;
  const systems = [
    ['Git', 'Branch, diff, history', 'branch', false],
    ['Figma', 'Design context and mock comparison', 'pencil', false],
    ['Jira', 'Ticket in, status and commit link back', 'clipboard', false],
    ['Confluence', 'Standards in, approved outputs out', 'book', false],
    ['Your company connector', 'Any approved internal system', 'plus', true],
  ];
  systems.forEach(([n, d, ico, slot], i) => {
    const y = 190 + i * 100;
    s += slot
      ? `<rect x="1080" y="${y}" width="440" height="84" rx="18" fill="none" stroke="#2ad4ff" stroke-width="2" stroke-dasharray="8 8"/><rect x="1098" y="${y + 14}" width="56" height="56" rx="16" fill="#2ad4ff" fill-opacity=".14" stroke="#2ad4ff" stroke-opacity=".6"/>${icon(ico, 1112, y + 28, 1.2, '#2ad4ff', 2)}`
      : card(1080, y, 440, 84, 18) + tile(1098, y + 14, 56, ico, 1.3);
    s += `<text x="1174" y="${y + 36}" font-size="22" font-weight="750" fill="#e8f0ff">${n}</text><text x="1174" y="${y + 62}" font-size="15" fill="#93a8d1">${d}</text>`;
    s += `<path class="flow ${slot ? 'mute' : ''}" d="M900 440 C990 440 1000 ${y + 42} 1074 ${y + 42}"/>`;
  });
  s += pill(80, 700, 1440, 54, 'No secrets in the repository. Writes need confirmation and a named approver. Content from a connector is data, never instructions.', { size: 18, color: '#e8f0ff' });
  write('fig-connectors.svg', s + close);
}
