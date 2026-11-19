import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CodeBlockComponent } from './code-block';
import { IconComponent } from './icon';

type Os = 'windows' | 'mac';
type Tool = 'all' | 'agent' | 'copilot';

const psq = (s: string) => `'${s.replace(/'/g, "''")}'`; // PowerShell single-quote
const shq = (s: string) => `'${s.replace(/'/g, `'\\''`)}'`; // POSIX single-quote

/**
 * Builds copy-paste install commands for the deployed site. The URLs are derived from where the
 * app is hosted, so the same build works on any host or sub-path. Everything is a static file.
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

      <h3><span class="n">1</span> Download the installer</h3>
      <app-code-block [label]="os() === 'windows' ? 'PowerShell' : 'Terminal'" [code]="step1()" />
      <p class="muted small">
        Or
        <a [href]="'downloads/' + installer()" download>download {{ installer() }}</a>
        in your browser and read it first.
        @if (os() === 'windows') { If Windows blocks a browser-downloaded script, run <code>Unblock-File .\\install.ps1</code>. }
      </p>

      <h3><span class="n">2</span> Run it</h3>
      <app-code-block [label]="os() === 'windows' ? 'PowerShell' : 'Terminal'" [code]="step2()" />
      <p class="muted small">It downloads the bundle from this site, verifies its SHA-256 checksum, and installs the skills and docs into your folder.</p>

      <details>
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
    h3 { display: flex; align-items: center; gap: 0.6rem; font-size: 1.02rem; margin: 0.9rem 0 0; }
    .n { display: inline-grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 8px; font-size: 0.85rem; font-weight: 800; color: var(--primary-ink); background: linear-gradient(135deg, var(--primary), var(--primary-2)); }
    .small { font-size: 0.88rem; margin: 0; }
    details { margin-top: 0.9rem; border-top: 1px solid var(--border); padding-top: 0.8rem; }
    summary { cursor: pointer; font-weight: 650; color: var(--primary); }
    .zips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.8rem 0 0.2rem; }
  `,
})
export class SkillsDownloaderComponent {
  protected readonly tools: { id: Tool; label: string }[] = [
    { id: 'all', label: 'Both assistants' },
    { id: 'agent', label: 'Terminal AI agent' },
    { id: 'copilot', label: 'GitHub Copilot' },
  ];

  protected readonly os = signal<Os>(/mac|iphone|ipad/i.test(navigator.userAgent) ? 'mac' : 'windows');
  protected readonly tool = signal<Tool>('all');
  protected readonly folder = signal('');

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

  protected readonly step2 = computed(() =>
    this.os() === 'windows'
      ? `powershell -ExecutionPolicy Bypass -File .\\install.ps1 -Target ${psq(this.dir())} -Tool ${this.tool()} -BaseUrl ${psq(this.base)}`
      : `bash install.sh --target ${shq(this.dir())} --tool ${this.tool()} --base-url ${shq(this.base)}`,
  );

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
