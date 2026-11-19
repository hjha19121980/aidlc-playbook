import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const C = (cx: number, cy: number, r: number) => `M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0-${r * 2} 0`;

/** Inline SVG icon set (24x24, stroke based). Add new icons here. */
export const ICONS = {
  sparkles: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 3v4M21 5h-4', 'M5 17v4M7 19H3'],
  compass: [C(12, 12, 9), 'M15.5 8.5l-2 5-5 2 2-5z'],
  download: ['M12 4v11', 'M7 11l5 5 5-5', 'M4 20h16'],
  puzzle: ['M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4h2a2 2 0 1 0 0-4H6V6h4z'],
  book: ['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z', 'M4 19V5', 'M8 7h7'],
  rocket: ['M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5', 'M12 15l-3-3a22 22 0 0 1 2-4 12 12 0 0 1 9-5c0 3-1 7-5 11a22 22 0 0 1-3 1z', 'M9 12H4s.5-3 2-4c1.5-.5 3 0 3 0', 'M12 15v5s3-.5 4-2c.5-1.5 0-3 0-3'],
  sun: [C(12, 12, 4), 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'],
  moon: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'],
  check: ['M5 12l5 5 9-10'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  copy: ['M9 9h11v11H9z', 'M5 15V4h11'],
  terminal: ['M4 5h16v14H4z', 'M7 10l3 2-3 2', 'M13 15h4'],
  'git-pull-request': [C(6, 5, 2), C(6, 19, 2), C(18, 18, 2), 'M6 7v10', 'M18 16V9a3 3 0 0 0-3-3h-3', 'M13 4l-2 2 2 2'],
  'git-branch': [C(6, 5, 2), C(6, 19, 2), C(18, 7, 2), 'M6 7v10', 'M18 9a8 8 0 0 1-8 8'],
  'git-merge': [C(6, 5, 2), C(6, 19, 2), C(18, 13, 2), 'M6 7v10', 'M6 9c0 3 4 4 10 4'],
  message: ['M4 5h16v11H9l-5 4z'],
  tag: ['M3 12V3h9l9 9-9 9z', 'M7.5 7.5h.01'],
  layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
  clipboard: ['M8 4h8v3H8z', 'M6 5H5v16h14V5h-1', 'M9 12h6M9 16h4'],
  pencil: ['M4 20l1-5L16 4l4 4L9 19z', 'M14 6l4 4'],
  code: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  flask: ['M9 3h6', 'M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3', 'M7 15h10'],
  'cloud-upload': ['M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18', 'M12 11v8', 'M9 14l3-3 3 3'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  box: ['M12 3l8 4v10l-8 4-8-4V7z', 'M4 7l8 4 8-4', 'M12 11v10'],
  server: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M8 7h.01M8 17h.01'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
  search: [C(11, 11, 7), 'M21 21l-5-5'],
  monitor: ['M3 4h18v12H3z', 'M8 20h8', 'M12 16v4'],
  globe: [C(12, 12, 9), 'M3 12h18', 'M12 3c3 3 3 15 0 18c-3-3-3-15 0-18'],
  zap: ['M13 2L4 14h7l-1 8 9-12h-7z'],
  file: ['M6 3h8l5 5v13H6z', 'M14 3v5h5', 'M9 13h6M9 17h6'],
  image: ['M4 5h16v14H4z', C(9, 10, 1.5), 'M4 17l5-5 4 4 3-3 4 4'],
  users: [C(9, 8, 3), 'M3 20a6 6 0 0 1 12 0', C(17, 9, 2.5), 'M16 14a5 5 0 0 1 5 5'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  x: ['M6 6l12 12M18 6L6 18'],
} satisfies Record<string, string[]>;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    @for (d of paths(); track $index) { <path [attr.d]="d" /> }
  </svg>`,
  styles: [':host{display:inline-flex;width:1.25em;height:1.25em;flex:none} svg{width:100%;height:100%}'],
})
export class IconComponent {
  readonly name = input.required<IconName>();
  protected readonly paths = computed(() => ICONS[this.name()] ?? []);
}
