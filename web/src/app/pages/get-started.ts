import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../shared/code-block';
import { IconComponent } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';
import { SkillsDownloaderComponent } from '../shared/skills-downloader';

@Component({
  selector: 'app-get-started',
  imports: [RouterLink, IconComponent, ImageSlotComponent, CodeBlockComponent, SkillsDownloaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section container hero">
      <div>
        <span class="eyebrow"><app-icon name="rocket" /> Get Started</span>
        <h1 class="h1">From zero to your first phase <span class="grad">in four steps</span></h1>
        <p class="lead">You need Git and an AI coding assistant: a terminal AI agent or GitHub Copilot in VS Code. Windows and macOS are supported.</p>
        <div class="btn-row">
          <a class="btn btn-ghost" routerLink="/installation"><app-icon name="download" /> Other install options</a>
          <a class="btn btn-ghost" routerLink="/docs"><app-icon name="book" /> Read the docs</a>
          <a class="btn btn-ghost" routerLink="/docs" fragment="troubleshooting"><app-icon name="wrench" /> Troubleshooting</a>
        </div>
      </div>
      <app-image-slot file="getstarted-hero.webp" alt="Four steps leading to a rocket: download the skills, sign in to Git, run aidlc-workflow, then plan, review and approve" ratio="4 / 3"
        hint="Launch, rocket or forward-motion visual in blue." size="1200 x 900 px, WebP" />
    </section>

    <section class="container steps">
      <article class="card step">
        <span class="num">1</span>
        <div>
          <h2>Download the skills and docs into your project</h2>
          <p class="muted">Choose your computer and project folder, then run the two commands. No Node or Python needed.</p>
          <app-skills-downloader />
        </div>
      </article>

      <article class="card step">
        <span class="num">2</span>
        <div>
          <h2>Sign in to GitHub (or Azure DevOps)</h2>
          <p class="muted">The Git skills use the command-line tools to open and review pull requests.</p>
          <app-code-block label="Terminal" code="gh auth login" />
        </div>
      </article>

      <article class="card step">
        <span class="num">3</span>
        <div>
          <h2>Open your assistant and start the workflow</h2>
          <p class="muted">Open the project in your terminal AI agent or in VS Code with Copilot Chat, then run:</p>
          <app-code-block label="Terminal agent or Copilot Chat" code="/aidlc-workflow" />
          <p class="muted">It creates <code>docs/aidlc/status.md</code> and points you to the first phase, Plan.</p>
        </div>
      </article>

      <article class="card step">
        <span class="num">4</span>
        <div>
          <h2>Plan, review, approve, repeat</h2>
          <p class="muted">Run <code>/aidlc-plan</code>, review the drafted requirements, edit what is wrong, then approve. Move on to Design.</p>
          <ul class="ticks">
            <li>Commit artifacts with <code>/git-commit</code></li>
            <li>Open a pull request with <code>/git-create-pr</code></li>
            <li>Ask a colleague, or <code>/git-review-pr</code>, to review it</li>
          </ul>
        </div>
      </article>
    </section>

    <section class="section container">
      <div class="card checklist">
        <h2>Before you share anything externally</h2>
        <ul class="ticks">
          <li>No credentials, client names or personal data in artifacts or comments</li>
          <li>AI-generated content reviewed and validated by a person</li>
          <li>Regulated data (GDPR, HIPAA, PCI-DSS) discussed with your Data Privacy Officer</li>
        </ul>
      </div>
    </section>
  `,
  styles: `
    .hero { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(1.5rem, 4vw, 3.5rem); align-items: center; }
    .steps { display: grid; gap: 1.1rem; }
    .step { display: grid; grid-template-columns: 3rem minmax(0, 1fr); gap: 1.1rem; }
    .step h2 { font-size: 1.2rem; }
    .num { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 14px; font-weight: 800; font-size: 1.2rem; color: var(--primary-ink); background: linear-gradient(135deg, var(--primary), var(--primary-2)); }
    .checklist h2 { font-size: 1.2rem; }
    @media (max-width: 860px) { .hero { grid-template-columns: 1fr; } }
  `,
})
export class GetStartedPage {}
