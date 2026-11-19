import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INSTALL_OPTIONS } from '../data/content';
import { CodeBlockComponent } from '../shared/code-block';
import { IconComponent } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';
import { SkillsDownloaderComponent } from '../shared/skills-downloader';

@Component({
  selector: 'app-installation',
  imports: [RouterLink, IconComponent, ImageSlotComponent, CodeBlockComponent, SkillsDownloaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section container">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="download" /> Installation</span>
        <h1 class="h1">Install it <span class="grad">your way</span></h1>
        <p class="lead">Pick the option that fits your machine and your organisation. Options marked <em>Planned</em> are on the roadmap; the skill sync script works today.</p>
      </div>
      <app-image-slot class="banner" file="installation-banner.webp" alt="A terminal running the installer next to the installed project folders for skills, agents and docs" ratio="16 / 5"
        hint="Wide banner: laptop, terminal or package visuals in blue." size="1600 x 500 px, WebP" />

      <div class="section-head dl-head" id="download">
        <h2 class="h2">Download the skills and docs</h2>
        <p class="lead">Pick your computer and the folder of your project. Copy the two commands and you are done. Works on Windows and macOS.</p>
      </div>
      <app-skills-downloader />

      <div class="section-head dl-head">
        <h2 class="h2">All install options</h2>
      </div>
      <div class="grid cols-2">
        @for (o of options; track o.id) {
          <article class="card opt">
            <header>
              <span class="icon-tile"><app-icon [name]="o.icon" /></span>
              <div>
                <h2>{{ o.title }}</h2>
                <span class="muted">{{ o.audience }}</span>
              </div>
              <span class="badge" [class.ok]="o.status === 'available'" [class.soon]="o.status === 'planned'">
                {{ o.status === 'available' ? 'Available' : 'Planned' }}
              </span>
            </header>
            <p class="muted">{{ o.note }}</p>
            <app-code-block [code]="o.command" [label]="o.label" />
            <span class="chip">Requires: {{ o.needs }}</span>
          </article>
        }
      </div>

      <div class="card help">
        <app-icon name="shield" />
        <p>Not sure which to choose? Start with the <b>skill sync script</b>, then follow <a routerLink="/get-started">Get Started</a>. Something not working? See <a routerLink="/docs" fragment="troubleshooting">Troubleshooting</a>.</p>
      </div>
    </section>
  `,
  styles: `
    .opt header { display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.6rem; }
    .opt header .icon-tile { margin: 0; }
    .opt header > div { flex: 1; min-width: 0; }
    h2 { font-size: 1.1rem; margin: 0; }
    .dl-head { margin: var(--space-block) 0 var(--space-head); scroll-margin-top: 5rem; }
    .dl-head .h2 { font-size: clamp(1.4rem, 3vw, 2rem); }
    .help { display: flex; gap: 1rem; align-items: center; margin-top: var(--space-block); font-size: 1.4rem; color: var(--primary); }
    .help p { margin: 0; font-size: 1rem; color: var(--text); }
  `,
})
export class InstallationPage {
  protected readonly options = INSTALL_OPTIONS;
}
