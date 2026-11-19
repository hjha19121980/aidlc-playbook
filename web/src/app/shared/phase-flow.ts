import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHASES } from '../data/content';
import { IconComponent } from './icon';

/**
 * Animated flow diagram of the six AIDLC phases. Arrows move to show direction, a soft highlight
 * sweeps phase by phase, and a loop-back arrow shows Maintain feeding the next Plan.
 * Animations are switched off globally under prefers-reduced-motion (see styles.scss).
 */
@Component({
  selector: 'app-phase-flow',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap card">
      <ol class="flow" aria-label="AIDLC flow: Plan, Design, Build, Test, Deploy, then Maintain, which feeds the next Plan">
        @for (p of phases; track p.id; let i = $index) {
          <li class="node" [style.animation-delay.s]="i * 1.2">
            <a [routerLink]="[]" [fragment]="p.id" [attr.aria-label]="p.title + ': ' + p.goal">
              <span class="num">{{ i + 1 }}</span>
              <span class="ico"><app-icon [name]="p.icon" /></span>
              <b>{{ p.title }}</b>
              <small class="mono">/{{ p.skill }}</small>
              <span class="gate"><app-icon name="shield" /> {{ p.gate }}</span>
            </a>
          </li>
          @if (!$last) {
            <li class="link" aria-hidden="true">
              <svg viewBox="0 0 48 12">
                <line class="dash" x1="0" y1="6" x2="38" y2="6" />
                <path class="head" d="M35 1l9 5-9 5z" />
              </svg>
            </li>
          }
        }
      </ol>

      <div class="loop" aria-hidden="true">
        <svg viewBox="0 0 100 24" preserveAspectRatio="none"><path class="dash back" d="M97 0V18H3V6" /></svg>
        <span class="tip"></span>
        <span class="lbl"><app-icon name="zap" /> Feedback and lessons return to the next Plan</span>
      </div>
    </div>
  `,
  styles: `
    .wrap { padding: 1.5rem 1.25rem 1rem; margin-bottom: var(--space-block); overflow: hidden; }
    .flow { list-style: none; margin: 0; padding: 0; display: flex; align-items: stretch; }
    .node { flex: 1 1 0; min-width: 0; border-radius: 16px; animation: sweep 7.2s ease-in-out infinite; }
    .node a {
      display: grid; justify-items: center; gap: 0.3rem; text-align: center; height: 100%;
      padding: 1rem 0.5rem; border-radius: 16px; border: 1px solid var(--border); background: var(--surface-2);
      color: var(--text); text-decoration: none !important; position: relative; transition: border-color 0.2s, transform 0.2s;
    }
    .node a:hover { border-color: var(--primary); transform: translateY(-2px); }
    .num { position: absolute; top: 0.45rem; left: 0.6rem; font-size: 0.7rem; font-weight: 800; color: var(--muted); }
    .ico { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 12px; font-size: 1.25rem; color: var(--primary-ink); background: linear-gradient(135deg, var(--primary), var(--primary-2)); }
    b { font-size: 1rem; }
    small { color: var(--muted); font-size: 0.7rem; word-break: break-all; }
    .gate { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.7rem; font-weight: 650; color: var(--ok); line-height: 1.25; }

    .link { flex: 0 0 3rem; display: grid; place-items: center; }
    .link svg { width: 100%; height: 0.8rem; overflow: visible; }
    .dash { stroke: var(--primary); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 5 5; animation: move 0.8s linear infinite; fill: none; }
    .head { fill: var(--primary); }

    .loop { position: relative; height: 3.2rem; margin: 0.6rem 7% 0; }
    .loop svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .loop .dash { vector-effect: non-scaling-stroke; stroke: var(--primary-2); animation-name: move-back; }
    .tip { position: absolute; left: 3%; top: 0.15rem; transform: translateX(-50%); border: 6px solid transparent; border-bottom: 9px solid var(--primary-2); border-top: 0; }
    .lbl { position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 50%); display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.8rem; border-radius: 999px; font-size: 0.8rem; font-weight: 650; background: var(--surface); border: 1px solid var(--border); color: var(--muted); white-space: nowrap; }
    .lbl app-icon { color: var(--primary); }

    @keyframes move { to { stroke-dashoffset: -10; } }
    @keyframes move-back { to { stroke-dashoffset: 10; } }
    @keyframes sweep {
      0%, 17%, 100% { box-shadow: 0 0 0 0 transparent; }
      3%, 13% { box-shadow: 0 0 0 3px var(--glow), 0 0 28px var(--glow); }
    }

    @media (max-width: 900px) {
      .flow { flex-direction: column; }
      .node a { grid-template-columns: auto 1fr; grid-template-areas: 'ico b' 'ico s' 'ico g'; justify-items: start; text-align: left; column-gap: 0.9rem; padding: 0.9rem 1rem 0.9rem 2rem; }
      .ico { grid-area: ico; }
      b { grid-area: b; align-self: end; }
      small { grid-area: s; }
      .gate { grid-area: g; }
      .link { flex: 0 0 2.6rem; }
      .link svg { width: 3rem; transform: rotate(90deg); }
      .loop { height: auto; margin: 0.8rem 0 0; display: grid; justify-items: center; }
      .loop svg, .tip { display: none; }
      .lbl { position: static; transform: none; white-space: normal; text-align: center; }
    }
  `,
})
export class PhaseFlowComponent {
  protected readonly phases = PHASES;
}
