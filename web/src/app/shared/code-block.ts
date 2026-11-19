import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { IconComponent } from './icon';

@Component({
  selector: 'app-code-block',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cb">
      <div class="bar">
        <span class="label">{{ label() }}</span>
        <button type="button" (click)="copy()" [attr.aria-label]="'Copy ' + label()">
          <app-icon [name]="copied() ? 'check' : 'copy'" />
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <pre><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: `
    .cb { border-radius: 14px; overflow: hidden; border: 1px solid var(--border); background: var(--code-bg); margin: 0.6rem 0; }
    .bar { display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.8rem; background: color-mix(in srgb, var(--primary) 12%, var(--code-bg)); color: var(--code-text); font-size: 0.78rem; }
    .label { opacity: 0.8; font-weight: 600; }
    button { display: inline-flex; align-items: center; gap: 0.35rem; background: transparent; color: var(--code-text); border: 1px solid color-mix(in srgb, var(--code-text) 25%, transparent); border-radius: 8px; padding: 0.2rem 0.55rem; font: inherit; cursor: pointer; }
    button:hover { border-color: var(--primary-2); }
    pre { margin: 0; padding: 0.9rem 1rem; overflow-x: auto; color: var(--code-text); font-family: 'Cascadia Code', 'JetBrains Mono', Consolas, monospace; font-size: 0.86rem; line-height: 1.55; }
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly label = input('Terminal');
  protected readonly copied = signal(false);

  async copy() {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* clipboard unavailable: ignore */
    }
  }
}
