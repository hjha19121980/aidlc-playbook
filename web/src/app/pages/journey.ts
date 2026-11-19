import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHASES } from '../data/content';
import { IconComponent } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';
import { PhaseFlowComponent } from '../shared/phase-flow';

@Component({
  selector: 'app-journey',
  imports: [RouterLink, IconComponent, ImageSlotComponent, PhaseFlowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section container">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="compass" /> The journey</span>
        <h1 class="h1">Six phases, one <span class="grad">continuous loop</span></h1>
        <p class="lead">Follow the path from idea to production and back again. Each phase has a skill, concrete outputs and a gate.</p>
      </div>
      <app-image-slot class="banner" file="journey-banner.webp" alt="A winding path through the six AIDLC phases: Plan, Design, Build, Test, Deploy and Maintain, with feedback returning to the next Plan" ratio="16 / 5"
        hint="Wide banner: path, roadmap or flowing lines in blue." size="1600 x 500 px, WebP" />

      <div class="section-head flow-head">
        <h2 class="h2">How the phases flow</h2>
        <p class="lead">Each stage reads the artifact the previous one committed, commits its own, and stops at a human gate. Select a stage to jump to its details.</p>
      </div>
      <app-phase-flow />

      <ol class="timeline">
        @for (p of phases; track p.id; let i = $index) {
          <li class="step" [id]="p.id">
            <div class="marker"><span>{{ i + 1 }}</span></div>
            <article class="card">
              <header>
                <span class="icon-tile"><app-icon [name]="p.icon" /></span>
                <div>
                  <h2>{{ p.title }}</h2>
                  <p class="muted goal">{{ p.goal }}</p>
                </div>
              </header>
              <p class="chain"><span class="chip">Reads: {{ p.reads }}</span><span class="chip hl">Commits: {{ p.commits }}</span></p>
              <h3 class="sub">Outputs</h3>
              <ul class="ticks">@for (o of p.outputs; track o) { <li>{{ o }}</li> }</ul>
              <footer>
                <span class="chip"><app-icon name="terminal" /> /{{ p.skill }}</span>
                <span class="badge ok"><app-icon name="shield" /> Gate: {{ p.gate }}</span>
              </footer>
            </article>
          </li>
        }
      </ol>

      <div class="card loop">
        <app-icon name="zap" />
        <p><b>Then the loop closes.</b> What Maintain finds is written back as a new <code>intent.md</code>, which starts the next Plan. The chain of commits is the audit trail: who asked for what, what the agent produced, and who approved it.</p>
        <a class="btn btn-primary" routerLink="/get-started">Start your first cycle <app-icon name="arrow-right" /></a>
      </div>
    </section>
  `,
  styles: `
    .chain { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0 0 0.4rem; }
    .chip.hl { color: var(--primary); border-color: color-mix(in srgb, var(--primary) 45%, var(--border)); }
    .flow-head { margin: 0 0 var(--space-head); }
    .flow-head .h2 { font-size: clamp(1.4rem, 3vw, 2rem); }
    .timeline { list-style: none; margin: 0 0 var(--space-block); padding: 0; position: relative; display: grid; gap: 1.25rem; }
    .timeline::before { content: ''; position: absolute; left: 1.35rem; top: 1rem; bottom: 1rem; width: 2px; background: linear-gradient(var(--primary), var(--primary-2)); opacity: 0.45; }
    .step { display: grid; grid-template-columns: 2.8rem 1fr; gap: 1rem; scroll-margin-top: 5rem; }
    .marker span { position: relative; z-index: 1; display: grid; place-items: center; width: 2.8rem; height: 2.8rem; border-radius: 50%; font-weight: 800; color: var(--primary-ink); background: linear-gradient(135deg, var(--primary), var(--primary-2)); box-shadow: 0 0 0 6px var(--bg); }
    header { display: flex; gap: 0.9rem; align-items: center; margin-bottom: 0.8rem; }
    header .icon-tile { margin: 0; }
    h2 { font-size: 1.35rem; margin: 0; }
    .goal { margin: 0; }
    .sub { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 0.5rem 0; }
    footer { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.1rem; }
    .loop { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; font-size: 1.5rem; color: var(--primary); }
    .loop p { flex: 1 1 280px; margin: 0; font-size: 1rem; color: var(--text); }
  `,
})
export class JourneyPage {
  protected readonly phases = PHASES;
}
