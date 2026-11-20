import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AGENTS, SKILLS, STAGES } from '../data/content';
import { CodeBlockComponent } from '../shared/code-block';
import { IconComponent } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';

@Component({
  selector: 'app-skills',
  imports: [RouterLink, IconComponent, ImageSlotComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section container">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="puzzle" /> Skills and agents</span>
        <h1 class="h1">{{ total }} skills and {{ agentTotal }} agents, <span class="grad">for every stage</span></h1>
        <p class="lead">Each skill and agent is written once and installed for a terminal AI agent and for GitHub Copilot. Filter by stage, then install only what your role needs.</p>
        <div class="btn-row"><a class="btn btn-primary" routerLink="/installation" fragment="download"><app-icon name="download" /> Choose what to install</a></div>
      </div>
      <app-image-slot class="banner" file="skills-banner.webp" alt="The aidlc-workflow skill connected to AIDLC phase skills and Git operation skills" ratio="16 / 5"
        hint="Wide banner: skills hub in blue." size="1600 x 500 px, WebP" />

      <div class="toolbar">
        <div class="chips" role="group" aria-label="Filter by stage">
          <button type="button" class="chip" [class.active]="filter() === 'all'" (click)="filter.set('all')">All <span class="cnt">{{ total }}</span></button>
          @for (f of filters; track f.id) {
            <button type="button" class="chip" [class.active]="filter() === f.id" (click)="filter.set(f.id)">
              <app-icon [name]="f.icon" /> {{ f.label }} <span class="cnt">{{ f.count }}</span>
            </button>
          }
        </div>
        <label class="search">
          <app-icon name="search" />
          <input type="search" placeholder="Search skills" [value]="query()" (input)="query.set($any($event.target).value)" aria-label="Search skills" />
        </label>
      </div>

      <div class="grid cols-3">
        @for (s of visible(); track s.name) {
          <article class="card">
            <span class="icon-tile"><app-icon [name]="s.icon" /></span>
            <h3 class="mono">{{ s.name }}</h3>
            <p class="muted">{{ s.description }}</p>
            <span class="chip">{{ stageLabel(s.stage) }}</span>
            <app-code-block [code]="'/' + s.name" label="Slash command" />
          </article>
        } @empty {
          <p class="muted">No skills match your filter.</p>
        }
      </div>
    </section>

    <section class="section container" id="agents">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="users" /> Agents</span>
        <h2 class="h2">Focused helpers with limited tools</h2>
        <p class="lead">Each agent has one job and only the tools it needs. A planner can read but not edit. A reviewer can run read-only commands but cannot approve. The same definitions are installed for both assistants.</p>
      </div>
      <div class="grid cols-3">
        @for (a of visibleAgents(); track a.name) {
          <article class="card">
            <span class="icon-tile"><app-icon [name]="a.icon" /></span>
            <h3 class="mono">{{ a.name }}</h3>
            <p class="muted">{{ a.description }}</p>
            <div class="tags"><span class="chip">{{ stageLabel(a.stage) }}</span></div>
          </article>
        } @empty {
          <p class="muted">No agents for this filter.</p>
        }
      </div>
    </section>
  `,
  styles: `
    .toolbar { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; margin-bottom: var(--space-head); }
    .chips, .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .chips .chip app-icon { font-size: 1em; }
    .cnt { opacity: 0.75; font-weight: 700; }
    .search { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.8rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--muted); min-width: min(100%, 260px); }
    .search:focus-within { border-color: var(--primary); }
    .search input { border: 0; outline: 0; background: transparent; color: var(--text); font: inherit; width: 100%; }
  `,
})
export class SkillsPage {
  protected readonly total = SKILLS.length;
  protected readonly agentTotal = AGENTS.length;
  protected readonly filter = signal<string>('all');
  protected readonly query = signal('');
  protected readonly filters = STAGES.map((s) => ({ ...s, count: SKILLS.filter((k) => k.stage === s.id).length }));
  protected stageLabel(id: string) { return STAGES.find((s) => s.id === id)?.label ?? id; }
  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return SKILLS.filter((s) => (this.filter() === 'all' || s.stage === this.filter()) && (!q || (s.name + ' ' + s.description).toLowerCase().includes(q)));
  });
  protected readonly visibleAgents = computed(() => AGENTS.filter((a) => this.filter() === 'all' || a.stage === this.filter()));
}
