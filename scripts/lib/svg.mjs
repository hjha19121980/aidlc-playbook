// Shared helpers for the SVG illustration generators (no dependencies).
export const FONT = "'Segoe UI Variable', 'Segoe UI', Inter, Roboto, Arial, sans-serif";
export const MONO = "'Cascadia Code', Consolas, 'SF Mono', monospace";
const circle = (cx, cy, r) => `M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0-${r * 2} 0`;

/** 24x24 stroke icons, same set as the web app. */
export const ic = {
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
  folder: ['M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  terminal: ['M4 5h16v14H4z', 'M7 10l3 2-3 2', 'M13 15h4'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
  check: ['M5 12l5 5 9-10'],
  file: ['M6 3h8l5 5v13H6z', 'M14 3v5h5', 'M9 13h6M9 17h6'],
  user: [circle(12, 8, 4), 'M4 21a8 8 0 0 1 16 0'],
  sparkles: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 3v4M21 5h-4', 'M5 17v4M7 19H3'],
  clipboard: ['M8 4h8v3H8z', 'M6 5H5v16h14V5h-1', 'M9 12h6M9 16h4'],
  book: ['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z', 'M4 19V5', 'M8 7h7'],
  plug: ['M9 2v6M15 2v6', 'M6 8h12v4a6 6 0 0 1-12 0z', 'M12 18v4'],
  zap: ['M13 2L4 14h7l-1 8 9-12h-7z'],
  rotate: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  plus: ['M12 5v14M5 12h14'],
};

export const icon = (name, x, y, s, color = '#04112b', sw = 1.8) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ic[name].map((d) => `<path d="${d}"/>`).join('')}</g>`;

export const open = (w, h, title, desc) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${FONT}">
  <title id="t">${title}</title>
  <desc id="d">${desc}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050c1d"/><stop offset="1" stop-color="#0a1a3d"/></linearGradient>
    <radialGradient id="g1" cx="0.9" cy="0.0" r="0.7"><stop offset="0" stop-color="#5b9bff" stop-opacity="0.28"/><stop offset="1" stop-color="#5b9bff" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.05" cy="1" r="0.6"><stop offset="0" stop-color="#2ad4ff" stop-opacity="0.2"/><stop offset="1" stop-color="#2ad4ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1d40"/><stop offset="1" stop-color="#0b1733"/></linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2ad4ff"/><stop offset="1" stop-color="#5b9bff"/></linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8ec1ff"/><stop offset="1" stop-color="#2ad4ff"/></linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#5b9bff" fill-opacity="0.16"/></pattern>
    <style>
      .flow { fill: none; stroke: #5b9bff; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 8 8; animation: dash 0.9s linear infinite; }
      .flow.cy { stroke: #2ad4ff; }
      .flow.mute { stroke: #6b7fa8; }
      @keyframes dash { to { stroke-dashoffset: -16; } }
      @media (prefers-reduced-motion: reduce) { .flow { animation: none; } .dot { display: none; } }
    </style>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  <rect width="${w}" height="${h}" fill="url(#g1)"/>
  <rect width="${w}" height="${h}" fill="url(#g2)"/>
`;
export const close = '</svg>\n';

export const card = (x, y, w, h, r = 22, stroke = '#24407e') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#card)" stroke="${stroke}" stroke-width="1.5"/>`;

/** Arrow head with its tip at (x, y), pointing along angle `ang` (radians, screen coordinates). */
export const headAt = (x, y, ang, fill = '#5b9bff', hl = 14, hw = 8) => {
  const bx = x - Math.cos(ang) * hl, by = y - Math.sin(ang) * hl;
  const px = -Math.sin(ang) * hw, py = Math.cos(ang) * hw;
  return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(bx + px).toFixed(1)},${(by + py).toFixed(1)} ${(bx - px).toFixed(1)},${(by - py).toFixed(1)}" fill="${fill}"/>`;
};

/** Straight animated arrow from (x1,y1) to (x2,y2), head at the end. */
export const arrow = (x1, y1, x2, y2, cls = 'flow', fill = '#5b9bff') => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - Math.cos(a) * 12, by = y2 - Math.sin(a) * 12;
  return `<path class="${cls}" d="M${x1} ${y1} L${bx.toFixed(1)} ${by.toFixed(1)}"/>${headAt(x2, y2, a, fill)}`;
};

export const pill = (x, y, w, h, text, { fill = '#5b9bff', stroke = '#5b9bff', color = '#8ec1ff', size = 14, mono = false, weight = 650 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" fill-opacity=".14" stroke="${stroke}" stroke-opacity=".55"/><text x="${x + w / 2}" y="${y + h / 2 + size * 0.35}" text-anchor="middle" font-size="${size}" font-weight="${weight}" fill="${color}"${mono ? ` font-family="${MONO}"` : ''}>${text}</text>`;

export const tile = (x, y, size, ico, scale) => `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.28}" fill="url(#brand)"/>${icon(ico, x + (size - 24 * scale) / 2, y + (size - 24 * scale) / 2, scale)}`;

/** Glowing dots that travel around a circle (clockwise from the top). SMIL, so they also move when the SVG is used as an image. */
export const orbitDots = (cx, cy, R, { count = 3, dur = 14, color = '#2ad4ff' } = {}) => {
  const path = `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx} ${cy + R} A${R} ${R} 0 1 1 ${cx} ${cy - R}`;
  return Array.from({ length: count }, (_, i) => `<g class="dot"><circle r="15" fill="${color}" fill-opacity=".22"/><circle r="6.5" fill="#ffffff"/><animateMotion dur="${dur}s" begin="-${((dur / count) * i).toFixed(2)}s" repeatCount="indefinite" path="${path}"/></g>`).join('');
};
