import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AGENTS, SKILLS, SkillGroup } from '../data/content';
import { CodeBlockComponent } from '../shared/code-block';
import { IconComponent } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';

type Filter = 'all' | SkillGroup;

@Component({
  selector: 'app-skills',
  imports: [IconComponent, ImageSlotComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section container">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="puzzle" /> Skills and agents</span>
        <h1 class="h1">{{ total }} skills and {{ agentTotal }} agents, <span class="grad">two assistants</span></h1>
        <p class="lead">Each skill and agent is written once and installed for a terminal AI agent and for GitHub Copilot. Run a skill by name from either assistant. Agents are focused helpers with limited tools.</p>
      </div>
      <app-image-slot class="banner" file="skills-banner.webp" alt="The aidlc-workflow skill connected to AIDLC phase skills and Git operation skills" ratio="16 / 5"
        hint="Wide banner: skills hub in blue." size="1600 x 500 px, WebP" />

      <div class="toolbar">
        <div class="chips" role="group" aria-label="Filter skills">
          @for (f of filters; track f.id) {
            <button type="button" class="chip" [class.active]="filter() === f.id" (click)="filter.set(f.id)">{{ f.label }}</button>
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
            <span class="chip">{{ label(s.group) }}</span>
            <app-code-block [code]="'/' + s.name" label="Slash command" />
          </article>
        } @empty {
          <p class="muted">No skills match your search.</p>
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
        @for (a of agents; track a.name) {
          <article class="card">
            <span class="icon-tile"><app-icon [name]="a.icon" /></span>
            <h3 class="mono">{{ a.name }}</h3>
            <p class="muted">{{ a.description }}</p>
            <div class="tags"><span class="chip">{{ a.stage }}</span><span class="chip mono">{{ a.access }}</span></div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .toolbar { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .chips, .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .search { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.8rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--muted); min-width: min(100%, 260px); }
    .search:focus-within { border-color: var(--primary); }
    .search input { border: 0; outline: 0; background: transparent; color: var(--text); font: inherit; width: 100%; }
  `,
})
export class SkillsPage {
  protected readonly total = SKILLS.length;
  protected readonly agents = AGENTS;
  protected readonly agentTotal = AGENTS.length;
  protected readonly filter = signal<Filter>('all');
  protected readonly query = signal('');
  protected readonly filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'aidlc', label: 'AIDLC stages' },
    { id: 'practice', label: 'Practices' },
    { id: 'git', label: 'Git operations' },
  ];
  protected label(g: SkillGroup) {
    return g === 'aidlc' ? 'AIDLC stage' : g === 'practice' ? 'Practice' : 'Git operation';
  }
  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return SKILLS.filter((s) => (this.filter() === 'all' || s.group === this.filter()) && (!q || (s.name + ' ' + s.description).toLowerCase().includes(q)));
  });
}
