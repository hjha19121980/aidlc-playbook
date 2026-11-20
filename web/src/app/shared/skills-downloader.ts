import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AGENTS, CORE_SKILLS, ROLES, SKILLS, STAGES } from '../data/content';
import { CodeBlockComponent } from './code-block';
import { IconComponent } from './icon';

type Os = 'windows' | 'mac';
type Tool = 'all' | 'agent' | 'copilot';

const psq = (s: string) => `'${s.replace(/'/g, "''")}'`; // PowerShell single-quote
const shq = (s: string) => `'${s.replace(/'/g, `'\\''`)}'`; // POSIX single-quote

/**
 * Builds copy-paste install commands for the deployed site. The URLs are derived from where the
 * app is hosted, so the same build works on any host or sub-path. Everything is a static file:
 * the installer downloads one bundle and keeps only the skills and agents you picked.
 */
@Component({
  selector: 'app-skills-downloader',
  imports: [IconComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dl card">
      <div class="row">
        <div class="field">
          <span class="lbl">Your computer</span>
          <div class="seg" role="radiogroup" aria-label="Operating system">
            <button type="button" role="radio" [attr.aria-checked]="os() === 'windows'" [class.on]="os() === 'windows'" (click)="os.set('windows')"><app-icon name="monitor" /> Windows</button>
            <button type="button" role="radio" [attr.aria-checked]="os() === 'mac'" [class.on]="os() === 'mac'" (click)="os.set('mac')"><app-icon name="terminal" /> macOS</button>
          </div>
        </div>
        <div class="field">
          <span class="lbl">For</span>
          <div class="seg" role="radiogroup" aria-label="AI assistant">
            @for (t of tools; track t.id) {
              <button type="button" role="radio" [attr.aria-checked]="tool() === t.id" [class.on]="tool() === t.id" (click)="tool.set(t.id)">{{ t.label }}</button>
            }
          </div>
        </div>
      </div>

      <label class="field">
        <span class="lbl">Install into this folder (your project)</span>
        <input type="text" [value]="folder()" (input)="folder.set($any($event.target).value)" [placeholder]="placeholder()" spellcheck="false" autocomplete="off" />
        <small class="muted">The folder is created if it does not exist. Existing files are kept, except the skill files themselves, which are updated.</small>
      </label>

      <div class="pick">
        <div class="pick-head">
          <span class="lbl">What do you need?</span>
          <span class="count" aria-live="polite"><b>{{ selectedSkills().length }}</b> of {{ totalSkills }} skills, <b>{{ selectedAgents().length }}</b> of {{ totalAgents }} agents</span>
        </div>
        <div class="roles" role="group" aria-label="Pick a role">
          @for (r of roles; track r.id) {
            <button type="button" class="chip" [class.active]="role() === r.id" [title]="r.description" (click)="applyRole(r.id)">{{ r.label }}</button>
          }
        </div>
        <p class="muted small">Pick a role to start, then fine-tune below. Everything is optional except the orchestrator, which tracks your stages.</p>

        <div class="groups">
          @for (g of groups; track g.stage.id) {
            <details class="grp">
              <summary>
                <input type="checkbox" class="cb" [checked]="groupAll(g.stage.id)" [indeterminate]="groupSome(g.stage.id)"
                  (click)="$event.stopPropagation()" (change)="toggleGroup(g.stage.id)" [attr.aria-label]="'Select all ' + g.stage.label + ' skills'" />
                <app-icon [name]="g.stage.icon" />
                <b>{{ g.stage.label }}</b>
                <span class="muted n">{{ groupCount(g.stage.id) }} / {{ g.skills.length }}</span>
              </summary>
              <ul class="items">
                @for (s of g.skills; track s.name) {
                  <li>
                    <label>
                      <input type="checkbox" class="cb" [checked]="selected().has(s.name)" [disabled]="isCore(s.name)" (change)="toggle(s.name)" />
                      <span class="nm mono">{{ s.name }}</span>
                      <span class="ds muted">{{ s.description }}</span>
                    </label>
                  </li>
                }
              </ul>
            </details>
          }
        </div>
      </div>

      <h3><span class="n1">1</span> Download the installer</h3>
      <app-code-block [label]="os() === 'windows' ? 'PowerShell' : 'Terminal'" [code]="step1()" />
      <p class="muted small">
        Or
        <a [href]="'downloads/' + installer()" download>download {{ installer() }}</a>
        in your browser and read it first.
        @if (os() === 'windows') { If Windows blocks a browser-downloaded script, run <code>Unblock-File .\\install.ps1</code>. }
      </p>

      <h3><span class="n1">2</span> Run it</h3>
      <app-code-block [label]="os() === 'windows' ? 'PowerShell' : 'Terminal'" [code]="step2()" />
      <p class="muted small">It downloads the bundle from this site, verifies its SHA-256 checksum, and installs only the {{ selectedSkills().length }} skills and {{ selectedAgents().length }} agents you picked, plus the docs and templates.</p>

      <details class="alt">
        <summary>Prefer to do it by hand? Download the zip</summary>
        <div class="zips">
          @for (t of tools; track t.id) {
            <a class="btn btn-ghost" [href]="'downloads/aidlc-skills-' + t.id + '.zip'" download>
              <app-icon name="download" /> {{ t.label }} (.zip)
            </a>
          }
        </div>
        <app-code-block [label]="os() === 'windows' ? 'PowerShell' : 'Terminal'" [code]="manual()" />
        <p class="muted small">
          The zip contains every skill. Delete the ones you do not need, or use the installer above to install only your selection.
          If you already have a <code>.github/copilot-instructions.md</code>, append the contents of
          <code>.github/copilot-instructions.aidlc.md</code> to it and delete the extra file. The installer does this for you.
        </p>
      </details>
    </div>
  `,
  styles: `
    .dl { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.5rem; }
    .row { display: flex; flex-wrap: wrap; gap: 1.25rem; }
    .field { display: grid; gap: 0.35rem; }
    .lbl { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
    .seg { display: inline-flex; padding: 0.2rem; gap: 0.2rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); flex-wrap: wrap; }
    .seg button { display: inline-flex; align-items: center; gap: 0.4rem; border: 0; background: transparent; color: var(--muted); font: inherit; font-weight: 650; font-size: 0.9rem; padding: 0.45rem 0.8rem; border-radius: 9px; cursor: pointer; }
    .seg button.on { color: var(--primary-ink); background: linear-gradient(135deg, var(--primary), var(--primary-2)); }
    input[type='text'] { font: inherit; font-family: 'Cascadia Code', Consolas, monospace; font-size: 0.9rem; padding: 0.7rem 0.9rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); width: 100%; }
    input[type='text']:focus { outline: 0; border-color: var(--primary); }

    .pick { margin-top: 0.6rem; padding: 1rem; border: 1px solid var(--border); border-radius: 14px; background: var(--surface-2); display: grid; gap: 0.6rem; }
    .pick-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem; align-items: baseline; }
    .count { font-size: 0.9rem; color: var(--muted); }
    .count b { color: var(--primary); }
    .roles { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .groups { display: grid; gap: 0.4rem; }
    .grp { border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }
    .grp > summary { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.8rem; cursor: pointer; list-style: none; }
    .grp > summary::-webkit-details-marker { display: none; }
    .grp > summary::after { content: '+'; margin-left: auto; color: var(--primary); font-weight: 800; }
    .grp[open] > summary::after { content: '\\2212'; }
    .grp > summary app-icon { color: var(--primary); }
    .n { font-size: 0.82rem; }
    .cb { width: 1.05rem; height: 1.05rem; accent-color: var(--primary); flex: none; cursor: pointer; }
    .items { list-style: none; margin: 0; padding: 0 0.8rem 0.7rem; display: grid; gap: 0.15rem; max-height: 22rem; overflow: auto; }
    .items label { display: grid; grid-template-columns: auto minmax(0, 15rem) minmax(0, 1fr); gap: 0.2rem 0.7rem; align-items: start; padding: 0.35rem 0.2rem; border-radius: 8px; cursor: pointer; }
    .items label:hover { background: var(--glow); }
    .nm { font-weight: 650; overflow-wrap: anywhere; }
    .ds { font-size: 0.84rem; }
    @media (max-width: 760px) { .items label { grid-template-columns: auto minmax(0, 1fr); } .ds { grid-column: 2; } }

    h3 { display: flex; align-items: center; gap: 0.6rem; font-size: 1.02rem; margin: 0.9rem 0 0; }
    .n1 { display: inline-grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 8px; font-size: 0.85rem; font-weight: 800; color: var(--primary-ink); background: linear-gradient(135deg, var(--primary), var(--primary-2)); }
    .small { font-size: 0.88rem; margin: 0; }
    details.alt { margin-top: 0.9rem; border-top: 1px solid var(--border); padding-top: 0.8rem; }
    details.alt > summary { cursor: pointer; font-weight: 650; color: var(--primary); }
    .zips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.8rem 0 0.2rem; }
  `,
})
export class SkillsDownloaderComponent {
  protected readonly tools: { id: Tool; label: string }[] = [
    { id: 'all', label: 'Both assistants' },
    { id: 'agent', label: 'Terminal AI agent' },
    { id: 'copilot', label: 'GitHub Copilot' },
  ];
  protected readonly roles = ROLES;
  protected readonly groups = STAGES.map((stage) => ({ stage, skills: SKILLS.filter((s) => s.stage === stage.id) }));
  protected readonly totalSkills = SKILLS.length;
  protected readonly totalAgents = AGENTS.length;

  protected readonly os = signal<Os>(/mac|iphone|ipad/i.test(navigator.userAgent) ? 'mac' : 'windows');
  protected readonly tool = signal<Tool>('all');
  protected readonly folder = signal('');
  protected readonly role = signal<string>('everything');
  protected readonly selected = signal<ReadonlySet<string>>(new Set(SKILLS.map((s) => s.name)));

  protected isCore = (name: string) => CORE_SKILLS.includes(name);

  protected readonly selectedSkills = computed(() => SKILLS.filter((s) => this.selected().has(s.name)).map((s) => s.name));
  /** An agent is installed when at least one skill of its stage is selected. */
  protected readonly selectedAgents = computed(() => {
    const stages = new Set(SKILLS.filter((s) => this.selected().has(s.name)).map((s) => s.stage));
    return AGENTS.filter((a) => stages.has(a.stage)).map((a) => a.name);
  });
  private readonly everything = computed(() => this.selectedSkills().length === SKILLS.length);

  protected applyRole(id: string) {
    const r = ROLES.find((x) => x.id === id);
    if (!r) return;
    const next = new Set<string>(CORE_SKILLS);
    for (const s of SKILLS) if (r.stages.includes(s.stage)) next.add(s.name);
    for (const n of r.extra) next.add(n);
    this.selected.set(next);
    this.role.set(id);
  }
  protected toggle(name: string) {
    if (this.isCore(name)) return;
    const next = new Set(this.selected());
    next.has(name) ? next.delete(name) : next.add(name);
    this.selected.set(next);
    this.role.set('');
  }
  protected groupItems(stage: string) { return SKILLS.filter((s) => s.stage === stage); }
  protected groupCount(stage: string) { return this.groupItems(stage).filter((s) => this.selected().has(s.name)).length; }
  protected groupAll(stage: string) { const g = this.groupItems(stage); return g.length > 0 && this.groupCount(stage) === g.length; }
  protected groupSome(stage: string) { const c = this.groupCount(stage); return c > 0 && c < this.groupItems(stage).length; }
  protected toggleGroup(stage: string) {
    const all = this.groupAll(stage);
    const next = new Set(this.selected());
    for (const s of this.groupItems(stage)) {
      if (all) { if (!this.isCore(s.name)) next.delete(s.name); } else next.add(s.name);
    }
    this.selected.set(next);
    this.role.set('');
  }

  /** Where this app is hosted, e.g. https://host/aidlc/downloads */
  private readonly base = new URL('downloads/', document.baseURI).href.replace(/\/$/, '');

  protected readonly placeholder = computed(() => (this.os() === 'windows' ? '%USERPROFILE%\\my-project' : '~/my-project'));
  protected readonly installer = computed(() => (this.os() === 'windows' ? 'install.ps1' : 'install.sh'));
  private readonly dir = computed(() => this.folder().trim() || this.placeholder());

  protected readonly step1 = computed(() =>
    this.os() === 'windows'
      ? `Invoke-WebRequest "${this.base}/install.ps1" -OutFile install.ps1`
      : `curl -fsSLO "${this.base}/install.sh"`,
  );

  protected readonly step2 = computed(() => {
    const subset = !this.everything();
    const skills = this.selectedSkills().join(',');
    const agents = this.selectedAgents().join(',') || 'none';
    if (this.os() === 'windows') {
      const sel = subset ? ` -Skills ${psq(skills)} -Agents ${psq(agents)}` : '';
      return `powershell -ExecutionPolicy Bypass -File .\\install.ps1 -Target ${psq(this.dir())} -Tool ${this.tool()} -BaseUrl ${psq(this.base)}${sel}`;
    }
    const sel = subset ? ` --skills ${shq(skills)} --agents ${shq(agents)}` : '';
    return `bash install.sh --target ${shq(this.dir())} --tool ${this.tool()} --base-url ${shq(this.base)}${sel}`;
  });

  protected readonly manual = computed(() => {
    const zip = `aidlc-skills-${this.tool()}.zip`;
    if (this.os() === 'windows') {
      return `Expand-Archive -Path .\\${zip} -DestinationPath ([Environment]::ExpandEnvironmentVariables(${psq(this.dir())})) -Force`;
    }
    const d = this.dir();
    const path = d === '~' || d.startsWith('~/') ? `"$HOME"${shq(d.slice(1))}` : shq(d); // keep ~ working inside quotes
    return `mkdir -p ${path} && unzip -o ${zip} -d ${path}`;
  });
}
