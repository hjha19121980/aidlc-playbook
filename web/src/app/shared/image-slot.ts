import { ChangeDetectionStrategy, Component, input, isDevMode, signal } from '@angular/core';
import { IconComponent } from './icon';

/**
 * Shows /assets/images/<file>. If the file is missing, a styled placeholder is shown
 * (with the expected filename and what to put there while running `ng serve`).
 * Drop the real file into web/public/assets/images/ and it appears automatically.
 */
@Component({
  selector: 'app-image-slot',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="slot" [style.aspect-ratio]="ratio()">
      @if (!failed()) {
        <img [src]="'assets/images/' + file()" [alt]="alt()" loading="lazy" (error)="failed.set(true)" />
      } @else {
        <div class="ph" role="img" [attr.aria-label]="alt() || 'Image placeholder'">
          <app-icon name="image" />
          @if (dev) {
            <span class="file mono">assets/images/{{ file() }}</span>
            @if (hint()) { <span class="hint">{{ hint() }}</span> }
            <span class="size">{{ size() }}</span>
          }
        </div>
      }
    </figure>
  `,
  styles: `
    .slot { margin: 0; width: 100%; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); background: var(--surface-2); box-shadow: var(--shadow); }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ph {
      width: 100%; height: 100%; display: grid; place-content: center; justify-items: center; gap: 0.4rem; text-align: center; padding: 1rem;
      color: var(--muted); font-size: 2rem;
      background:
        linear-gradient(135deg, color-mix(in srgb, var(--primary) 14%, transparent), color-mix(in srgb, var(--primary-2) 10%, transparent)),
        repeating-linear-gradient(45deg, transparent 0 14px, color-mix(in srgb, var(--primary) 6%, transparent) 14px 15px);
    }
    .file { font-size: 0.8rem; color: var(--primary); font-weight: 700; }
    .hint { font-size: 0.8rem; max-width: 42ch; }
    .size { font-size: 0.72rem; opacity: 0.8; }
  `,
})
export class ImageSlotComponent {
  readonly file = input.required<string>();
  readonly alt = input('');
  readonly ratio = input('16 / 9');
  readonly hint = input('');
  readonly size = input('');
  protected readonly failed = signal(false);
  protected readonly dev = isDevMode();
}
