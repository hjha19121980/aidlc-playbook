import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AGENTS, PHASES, SKILLS } from '../data/content';
import { IconComponent, IconName } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink, IconComponent, ImageSlotComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow"><app-icon name="sparkles" /> AI-Driven Development Life Cycle</span>
          <h1 class="h1">Ship software with AI, <span class="grad">with humans in charge.</span></h1>
          <p class="lead">
            AIDLC is a loop, not a line. Each stage commits one artifact the next stage reads, from intent to spec to plan to
            tested code to a release, and each ends in a human approval gate. Ready-made skills and agents work in a terminal
            AI agent and in GitHub Copilot.
          </p>
          <div class="btn-row">
            <a class="btn btn-primary" routerLink="/get-started">Get Started <app-icon name="arrow-right" /></a>
            <a class="btn btn-ghost" routerLink="/journey"><app-icon name="compass" /> See the journey</a>
          </div>
        </div>
        <app-image-slot file="aidlc-phases.webp" alt="AI-Driven Development Life Cycle: Plan, Design, Build, Test, Deploy and Maintain in a loop, each ending with a human approval gate" ratio="4 / 3"
          hint="Run: node scripts/generate-phase-diagram.mjs, then convert aidlc-phases.svg to WebP." size="1200 x 900 px, WebP" />
      </div>
    </section>

    <section class="section container stats" aria-label="At a glance">
      @for (s of stats; track s.label) {
        <div class="card stat"><b class="grad">{{ s.value }}</b><span class="muted">{{ s.label }}</span></div>
      }
    </section>

    <section class="section container">
      <div class="section-head">
        <span class="eyebrow">Why AIDLC</span>
        <h2 class="h2">A structured way to work with AI assistants</h2>
        <p class="lead">Less improvising, more repeatable outcomes. Every phase produces artifacts a reviewer can read.</p>
      </div>
      <div class="grid cols-4">
        @for (f of features; track f.title) {
          <article class="card">
            <span class="icon-tile"><app-icon [name]="f.icon" /></span>
            <h3>{{ f.title }}</h3>
            <p class="muted">{{ f.text }}</p>
          </article>
        }
      </div>
    </section>

    <section class="section container" id="sdlc-vs-aidlc">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="layers" /> SDLC vs AIDLC</span>
        <h2 class="h2">What changes when AI joins the life cycle</h2>
        <p class="lead">AIDLC does not replace your SDLC or agile practice. It keeps the familiar stages and changes who drafts the work, how fast loops run, and how decisions are recorded.</p>
      </div>

      <app-image-slot class="fig" file="fig-line-vs-loop.svg" alt="Left, the traditional line of six stages with one slow loop back as a new release cycle. Right, the AIDLC loop of six stages with humans above the loop directing and governing." ratio="2 / 1"
        hint="Generated: node scripts/generate-figures.mjs" size="1600 x 800 px, WebP" />

      <div class="cmp" role="table" aria-label="Comparison of SDLC and AIDLC">
        <div class="cmp-row head" role="row">
          <span role="columnheader">Aspect</span>
          <span role="columnheader">Traditional SDLC</span>
          <span role="columnheader" class="us">AIDLC (this playbook)</span>
        </div>
        @for (r of comparison; track r.topic) {
          <div class="cmp-row" role="row">
            <span class="topic" role="rowheader"><app-icon [name]="r.icon" /> {{ r.topic }}</span>
            <span role="cell" data-label="Traditional SDLC">{{ r.sdlc }}</span>
            <span role="cell" class="us" data-label="AIDLC">{{ r.aidlc }}</span>
          </div>
        }
      </div>
      <app-image-slot class="fig below" file="fig-bottleneck.webp" alt="Two rows of six stages. Before agents every stage is equally long. With agents the build stage shrinks and the human-speed stages around it set the pace." ratio="2 / 1"
        hint="Generated: node scripts/generate-figures.mjs" size="1600 x 800 px, WebP" />
      <p class="muted note">
        Illustrative comparison. Real SDLCs (waterfall, agile, DevOps) vary by team, and AIDLC results depend on how rigorously the human gates are applied.
        Treat any speed or quality benefit as a hypothesis to measure in your own project.
      </p>
    </section>

    <section class="section container two">
      <app-image-slot file="intro-overview.webp" alt="A loop showing you running a skill, the AI assistant drafting, the result saved in your repository, and you reviewing and approving, with requested changes going back to you" ratio="3 / 2"
        hint="Team or developer working with a laptop, blue tones. A photo or an illustration both work." size="1200 x 800 px, WebP" />
      <div>
        <span class="eyebrow">How it works</span>
        <h2 class="h2">Skills do the heavy lifting. You make the decisions.</h2>
        <ul class="ticks">
          <li>Pick a phase and run its skill from your assistant, for example <code>/aidlc-plan</code>.</li>
          <li>The assistant drafts the artifact (<code>intent.md</code>, then <code>spec.md</code>, <code>plan.md</code> and so on) into <code>docs/aidlc/changes/</code> in your repository.</li>
          <li>You review, edit and approve. Only then does the next stage read that artifact and begin.</li>
          <li>Git skills open pull requests, review code and resolve conflicts the same way.</li>
        </ul>
        <div class="btn-row"><a class="btn btn-ghost" routerLink="/skills">Browse the skills <app-icon name="arrow-right" /></a></div>
      </div>
    </section>
  `,
  styles: `
    .hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(1.5rem, 4vw, 3.5rem); align-items: center; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
    .stat { text-align: center; display: grid; gap: 0.1rem; }
    .stat b { font-size: 2.2rem; line-height: 1.1; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 4vw, 3.5rem); align-items: center; }
    .cmp { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface); box-shadow: var(--shadow); }
    .cmp-row { display: grid; grid-template-columns: 1fr 1.3fr 1.3fr; gap: 1rem; padding: 0.95rem 1.2rem; border-top: 1px solid var(--border); align-items: start; }
    .cmp-row:first-child { border-top: 0; }
    .cmp-row.head { background: var(--surface-2); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
    .cmp-row .us { color: var(--text); }
    .cmp-row.head .us { color: var(--primary); }
    .cmp-row:not(.head) .us { background: color-mix(in srgb, var(--primary) 7%, transparent); margin: -0.95rem 0; padding: 0.95rem 0.9rem; border-left: 2px solid var(--primary); }
    .topic { display: inline-flex; align-items: flex-start; gap: 0.5rem; font-weight: 700; }
    .topic app-icon { color: var(--primary); margin-top: 0.15rem; }
    .note { font-size: 0.88rem; margin-top: 1rem; max-width: 80ch; }
    .fig { display: block; margin: 0 0 var(--space-block); }
    .fig.below { margin: var(--space-block) 0 0; }
    @media (max-width: 860px) {
      .hero-grid, .two { grid-template-columns: 1fr; }
      .cmp-row.head { display: none; }
      .cmp-row { grid-template-columns: 1fr; gap: 0.5rem; }
      .cmp-row [data-label]::before { content: attr(data-label); display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
      .cmp-row:not(.head) .us { margin: 0; border-radius: 10px; }
    }
  `,
})
export class IntroductionPage {
  protected readonly stats = [
    { value: String(PHASES.length), label: 'Life cycle phases' },
    { value: String(SKILLS.length), label: 'Ready-made skills' },
    { value: String(AGENTS.length), label: 'Focused agents' },
    { value: String(PHASES.length), label: 'Human approval gates' },
  ];
  protected readonly comparison: { topic: string; icon: IconName; sdlc: string; aidlc: string }[] = [
    { topic: 'Who leads the work', icon: 'users', sdlc: 'People do the work. Tools assist at the edges.', aidlc: 'AI drafts and proposes. People direct, review and decide.' },
    { topic: 'Cycle rhythm', icon: 'zap', sdlc: 'Sprints or releases, usually measured in weeks.', aidlc: 'Short loops. AI drafts artifacts in minutes, so human review becomes the step to plan for.' },
    { topic: 'Artifacts', icon: 'file', sdlc: 'Written by hand and often lag behind the code.', aidlc: 'Produced inside every phase as Markdown in the repository and reviewed in pull requests.' },
    { topic: 'Traceability', icon: 'git-branch', sdlc: 'Requirement-to-test links kept manually, if at all.', aidlc: 'Skills map requirement, story, task and test, and list gaps.' },
    { topic: 'Quality gates', icon: 'shield', sdlc: 'Reviews and QA sign-off at agreed points.', aidlc: 'An explicit approval gate at the end of every phase, recorded in status.md.' },
    { topic: 'Human role', icon: 'pencil', sdlc: 'Author and builder.', aidlc: 'Product owner, reviewer and approver of AI output.' },
    { topic: 'New risks', icon: 'search', sdlc: 'Familiar delivery risks.', aidlc: 'Adds AI risks: wrong or invented content and data leakage. Controls: mandatory review, no secrets or client data, approved tools only.' },
  ];
  protected readonly features: { icon: IconName; title: string; text: string }[] = [
    { icon: 'shield', title: 'Human in the loop', text: 'Every phase ends with an approval gate. Nothing ships without a person saying yes.' },
    { icon: 'users', title: 'Two assistants, one source', text: 'Skills and agents are written once and installed for a terminal AI agent and for GitHub Copilot.' },
    { icon: 'git-pull-request', title: 'Git built in', text: 'Create PRs, review, comment and resolve conflicts on GitHub or Azure DevOps.' },
    { icon: 'layers', title: 'Local first', text: 'Artifacts are Markdown in your repo. No data leaves your machine unless you decide.' },
  ];
}
