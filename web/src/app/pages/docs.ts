import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../shared/code-block';
import { IconComponent, IconName } from '../shared/icon';
import { ImageSlotComponent } from '../shared/image-slot';

interface TsItem {
  problem: string;
  cause: string;
  fix: string;
  code?: string;
}
interface TsGroup {
  title: string;
  icon: IconName;
  items: TsItem[];
}

interface DocSection {
  id: string;
  title: string;
  image?: { file: string; alt: string };
  paragraphs: string[];
  code?: { label: string; text: string };
}

@Component({
  selector: 'app-docs',
  imports: [RouterLink, IconComponent, ImageSlotComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section container">
      <div class="section-head">
        <span class="eyebrow"><app-icon name="book" /> Documentation</span>
        <h1 class="h1">Everything you need to <span class="grad">use the playbook</span></h1>
      </div>
      <app-image-slot class="banner" file="docs-banner.webp" alt="A README, the docs/aidlc folder structure and a status table showing the progress of each phase" ratio="16 / 5"
        hint="Wide banner: books, documents or code windows in blue." size="1600 x 500 px, WebP" />

      <div class="layout">
        <nav class="toc card" aria-label="On this page">
          <b>On this page</b>
          @for (s of toc; track s.id) {
            <a [routerLink]="[]" [fragment]="s.id">{{ s.title }}</a>
          }
        </nav>

        <div class="content">
          @for (s of sections; track s.id) {
            <article class="card doc" [id]="s.id">
              <h2>{{ s.title }}</h2>
              @for (p of s.paragraphs; track p) { <p>{{ p }}</p> }
              @if (s.image; as im) { <app-image-slot class="fig" [file]="im.file" [alt]="im.alt" ratio="2 / 1" hint="Generated: node scripts/generate-figures.mjs" size="1600 x 800 px, WebP" /> }
              @if (s.code; as c) { <app-code-block [code]="c.text" [label]="c.label" /> }
            </article>
          }

          <article class="card doc" id="troubleshooting">
            <h2><app-icon name="wrench" /> Troubleshooting</h2>
            <p class="muted">Find your symptom, then try the fix. If you are still stuck, copy the exact error message and share it with your team's platform contact or the maintainers of this playbook. Remove any credentials or client names first.</p>
            @for (g of troubleshooting; track g.title) {
              <h3 class="tg"><app-icon [name]="g.icon" /> {{ g.title }}</h3>
              @for (t of g.items; track t.problem) {
                <details class="ts">
                  <summary>{{ t.problem }}</summary>
                  <p><b>Likely cause.</b> {{ t.cause }}</p>
                  <p><b>Fix.</b> {{ t.fix }}</p>
                  @if (t.code) { <app-code-block [code]="t.code" label="Command" /> }
                </details>
              }
            }
          </article>
        </div>
      </div>
    </section>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 240px 1fr; gap: 1.5rem; align-items: start; }
    .toc { position: sticky; top: 5.5rem; display: grid; gap: 0.15rem; }
    .toc b { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 0.4rem; }
    .toc a { padding: 0.35rem 0.6rem; border-radius: 8px; color: var(--muted); font-weight: 600; font-size: 0.92rem; text-decoration: none; }
    .toc a:hover { color: var(--primary); background: var(--glow); }
    .content { display: grid; gap: 1.1rem; }
    .doc { scroll-margin-top: 5.5rem; }
    .fig { display: block; margin: 0.5rem 0 var(--space-head); }
    .doc h2 { font-size: 1.35rem; display: flex; align-items: center; gap: 0.5rem; }
    .tg { display: flex; align-items: center; gap: 0.5rem; font-size: 1.02rem; margin: 1.6rem 0 0.6rem; color: var(--primary); }
    .ts { border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); padding: 0 1rem; margin-bottom: 0.5rem; }
    .ts[open] { border-color: color-mix(in srgb, var(--primary) 45%, var(--border)); padding-bottom: 0.5rem; }
    .ts summary { cursor: pointer; font-weight: 650; padding: 0.8rem 0; list-style: none; display: flex; justify-content: space-between; gap: 1rem; }
    .ts summary::-webkit-details-marker { display: none; }
    .ts summary::after { content: '+'; color: var(--primary); font-weight: 800; flex: none; }
    .ts[open] summary::after { content: '\\2212'; }
    .ts p { margin: 0 0 0.6rem; }
    @media (max-width: 860px) { .layout { grid-template-columns: 1fr; } .toc { position: static; } }
  `,
})
export class DocsPage {
  protected readonly sections: DocSection[] = [
    {
      id: 'concepts',
      title: 'Core concepts',
      paragraphs: [
        'AIDLC is a loop, not a line. It has six stages: Plan, Design, Build, Test, Deploy and Maintain. Each stage ends by committing one artifact to version control, and the next stage starts by reading it. A human gate sits at the end of every stage.',
        'A skill is a Markdown file that tells an AI assistant how to do one job. An agent is a focused helper with limited tools. Both are written once and installed for a terminal AI agent and for GitHub Copilot.',
      ],
    },
    {
      id: 'chain',
      title: 'The artifact chain',
      image: { file: 'fig-artifact-chain.webp', alt: 'Seven artifacts in a row: intent.md, spec.md, plan.md, diff and tests, PR and findings, release.md and incident.md, each committed by one stage and read by the next, with a human gate. The incident record becomes the next intent.' },
      paragraphs: [
        'intent.md captures what is wanted and why. spec.md turns it into requirements and design under your policies. plan.md says how the change will be made. The diff and its tests, the pull request with its review findings, the release record and finally the incident record complete the chain. What Maintain finds becomes the next intent.md.',
        'The chain of commits is the audit trail: who asked for what, what the agent produced, and who approved it. Early artifacts are Markdown because a product owner and an agent can both read and act on the same file.',
      ],
      code: { label: 'The loop', text: 'intent.md -> spec.md -> plan.md -> diff + tests -> PR + review findings -> release -> incident.md -> new intent.md\n  Plan       Design      Build        Test             Deploy                          Maintain' },
    },
    {
      id: 'install',
      title: 'Installing into your project',
      paragraphs: [
        'On the Installation or Get Started page, choose Windows or macOS, your assistant and the folder of your project. Run the two commands shown. The installer downloads the skills, agents, templates and docs from this site, verifies the checksum and copies them into your folder.',
        'It keeps what you already have. An existing copilot-instructions.md gets an AIDLC section added. Files that become yours once installed (AGENTS.md, REVIEW.md, docs/aidlc/status.md, the evals folder, the monitoring config and the guard list) are created only if missing and never overwritten. Run it again any time to update skills and agents.',
      ],
      code: { label: 'What gets installed', text: '.claude/skills/ and .claude/agents/     terminal AI agent skills and agents\n.github/skills/ and .github/agents/     Copilot skills and agents\n.github/prompts/                        Copilot slash commands\nAGENTS.md                               project context for every agent\nREVIEW.md                               review policy\ndocs/aidlc/                             README, status, templates, guards, monitoring, policies\nevals/                                  regression tests for agent configuration\n.mcp.json and .vscode/mcp.json          connector (MCP) configuration, created only if missing' },
    },
    {
      id: 'standards',
      title: 'Coding standards and code review',
      paragraphs: [
        'The installer adds a coding standard for each language to docs/aidlc/standards: Java, Spring Boot, Kotlin, Python, TypeScript, JavaScript, Angular, React, Go, Ruby, COBOL, Dart and Flutter, SQL, C++, C#, R and PHP. Each document has numbered rules (for example JAVA-005) with a default severity of Important or Nit.',
        'The code-review skill and the reviewer agent read docs/aidlc/standards/index.md, match the changed files to the right documents (a Spring Boot change also loads the Java document), and cite the rule ID in every standards finding. The PR review skill uses the same procedure.',
        'The documents are a baseline from general industry practice. Have a language owner review each one, record your team rules under "Local overrides", and approve changes in a pull request. To add a language, copy _template.md and add a row to index.md. The installer never overwrites a standards file you already have.',
      ],
      code: { label: 'Example finding', text: 'JAVA-005 (Important)  OrderService.java:88\nCatching Exception hides failures. Catch the specific exception and log with context or rethrow.' },
    },
    {
      id: 'roles',
      title: 'Install only what your role needs',
      paragraphs: [
        'You do not need every skill. On the Installation or Get Started page, pick a role to start: business analyst, architect, developer, tester, DevOps and release, or support and operations. Then tick or untick groups and individual skills. The page shows the count and writes the matching command.',
        'The orchestrator skill (aidlc-workflow) is always installed because it tracks each change through the stages. Agents are chosen for you from the stages you pick. You can run the installer again later to add more skills; skills you already have are updated and your own files are kept.',
        'The installer accepts the lists directly, which is useful for scripts and onboarding. Without these options it installs everything.',
      ],
      code: { label: 'Examples', text: '# macOS or Linux\nbash install.sh --target ~/my-project --skills grounded-research,generate-meeting-minutes,jira-to-markdown --agents intent-analyst\n\n# Windows\n.\\install.ps1 -Target C:\\work\\my-project -Skills \'grounded-research,generate-meeting-minutes\' -Agents \'intent-analyst\'' },
    },
    {
      id: 'assistants',
      title: 'Using skills in each assistant',
      paragraphs: [
        'Terminal AI agent: skills and agents are installed under the .claude folder in your project. Start the agent in the project and invoke a skill by name.',
        'GitHub Copilot: skills are installed under .github/skills, agents under .github/agents and slash commands under .github/prompts. In Copilot Chat in VS Code, type the skill name as a slash command. Agent mode can also load a skill automatically when the task matches.',
      ],
      code: { label: 'Either assistant', text: '/aidlc-workflow\n/aidlc-plan\n/aidlc-design\n/git-review-pr' },
    },
    {
      id: 'agents',
      title: 'Agents',
      paragraphs: [
        'Agents give each job its own context and tool limits. The planner can read but not edit. The verifier runs the app in a fresh context and only reports. The reviewer can run read-only commands but cannot approve. The release coordinator prepares everything up to the production gate and stops.',
        'The same agent definition becomes a terminal-agent file and a Copilot agent file, so behavior stays aligned. See the Skills page for the full list.',
      ],
    },
    {
      id: 'policies',
      title: 'Policy skills and project context',
      paragraphs: [
        'AGENTS.md at the repo root is the project context every agent reads: commands, conventions, architecture, protected paths, and the mistakes agents repeat. When an agent makes the same mistake twice, the correction goes into AGENTS.md.',
        'Write your organization rules (security, API design, brand, compliance) as policy skills so they are applied while specs and code are written. A skill is advisory, so back any rule that must always hold with a guard check or a review pass.',
      ],
    },
    {
      id: 'gates',
      title: 'Approval gates and guardrails',
      image: { file: 'fig-autonomy-tiers.webp', alt: 'Development where the agent deploys freely, staging where it deploys within checks, and production where the agent prepares the release and a release manager authorizes it at a gate. Rollback is rehearsed.' },
      paragraphs: [
        'Plan: the product owner accepts intent.md. Design: the product owner accepts spec.md, with a tech lead for higher risk. Build: the engineer accepts plan.md and a code owner approves the pull request. Test: the code owner reviews the evidence. Deploy: a release manager authorizes production. Maintain: the service owner triages findings.',
        'Only a person records a gate as accepted. Agents act up to a gate and never past it. Turn the gates that must always hold into deterministic checks: branch protection, required CI checks, the protected-paths guard and permissions. Templates are in docs/aidlc/guards and docs/aidlc/templates/ci.',
      ],
    },
    {
      id: 'maintain',
      title: 'Closing the loop (Maintain)',
      image: { file: 'fig-control-bands.webp', alt: 'A metric over time with a rolling baseline and one, two and three sigma bands. A breach above three sigma triggers the agent. Tiers: log only, diagnose read-only, propose through a pull request or approved runbook. The finding becomes incident.md and a new intent.md.' },
      paragraphs: [
        'A deterministic script watches one metric with a stable baseline, such as the CI test failure rate, the post-deploy error rate or PR cycle time. Detection never involves a model. The agent is invoked only once a band is breached, and the tier sets what it may do.',
        'At one sigma the script only logs. At two sigma a read-only agent diagnoses. At three sigma the agent may propose, but only by opening a pull request into the review gate or by triggering a runbook that was approved in advance. What it finds is written as incident.md and a new intent.md, which a person triages. Each fixed incident gets an eval so it cannot return silently.',
      ],
      code: { label: 'docs/aidlc/monitoring/bands.yaml', text: 'metric: ci_test_failure_rate\nbaseline: rolling_30d\ntiers:\n  1sigma: { action: log }\n  2sigma: { action: diagnose }\n  3sigma: { action: propose, routes: [pull_request, \"runbook:rollback-deploy\"] }' },
    },
    {
      id: 'connectors',
      title: 'Connectors (MCP)',
      image: { file: 'fig-connectors.webp', alt: 'The agent connects through a connector layer to Git, Figma, Jira and Confluence, with a dashed slot for a company-specific connector. The six stages use them.' },
      paragraphs: [
        'Connectors let agents read and write the systems your teams already use. Git covers local repository operations. Figma provides design context and mock comparison. Jira brings tickets in and writes status and commit links back. Confluence brings standards in and publishes approved outputs.',
        'Each connector is one definition in docs/aidlc/mcp/servers. The installer creates the configuration file each assistant expects (.mcp.json for the terminal agent, .vscode/mcp.json for Copilot) only if it does not exist yet. Secrets are never stored: each developer supplies them through the environment or a masked prompt.',
        'To add a company-specific connector, copy _company-template.json, fill in the command or URL and the variables, and have your platform team add it to the configuration. Only security-approved servers. Read first, enable writes per stage with confirmation and a named approver, and treat anything a connector returns as data, never as instructions.',
      ],
      code: { label: 'Prerequisites for the bundled connectors', text: '# Git, Jira and Confluence servers run through uvx (install uv first)\n# Figma signs in through your identity provider when prompted\n# Set for Jira and Confluence: *_URL, *_USERNAME, *_API_TOKEN' },
    },
    {
      id: 'git',
      title: 'Git workflows',
      paragraphs: [
        'Git skills cover branching and commits, opening pull requests with a description and an opening comment, reviewing, commenting, resolving conflicts and release notes.',
        'They use the GitHub CLI (gh). Azure DevOps equivalents (az repos) are included where they apply. Anything outward-facing, such as posting a comment or pushing, is confirmed with you first.',
      ],
      code: { label: 'Prerequisites', text: 'gh auth login\n# Azure DevOps\naz login\naz devops configure -d organization=<url> project=<name>' },
    },
    {
      id: 'security',
      title: 'Security and confidentiality',
      paragraphs: [
        'Do not put credentials, client names or personal data into artifacts, commits or PR comments. Use a secret store for configuration.',
        'If your work involves regulated data such as GDPR, HIPAA or PCI-DSS, consult your Data Privacy Officer before using an AI assistant on it. AI-generated content must be reviewed by a person before it is shared externally.',
      ],
    },
    {
      id: 'customise',
      title: 'Customising skills',
      paragraphs: ['Maintainers: edit the SKILL.md files in the skills folder of the repository, then rebuild the site. Rebuilding regenerates the downloads. Do not edit generated copies in a project; reinstalling overwrites them.'],
      code: { label: 'Terminal', text: 'node scripts/sync-skills.mjs' },
    },
  ];

  protected readonly troubleshooting: TsGroup[] = [
    {
      title: 'Installing on Windows',
      icon: 'monitor',
      items: [
        {
          problem: 'PowerShell says "running scripts is disabled on this system"',
          cause: 'The execution policy blocks script files by default.',
          fix: 'Run the installer exactly as shown on the Installation page; it uses -ExecutionPolicy Bypass for that single run and changes nothing permanently. If your organisation forbids it, use the zip download and Expand-Archive instead.',
          code: 'powershell -ExecutionPolicy Bypass -File .\\install.ps1 -Target \'C:\\work\\my-project\' -Tool all -BaseUrl \'<site>/downloads\'',
        },
        {
          problem: '"File is not digitally signed" or SmartScreen blocks install.ps1',
          cause: 'Files downloaded in a browser carry a "from the internet" mark, and the script is not code-signed.',
          fix: 'Read the script, then unblock it. If your device policy still blocks it, use the zip download.',
          code: 'Unblock-File .\\install.ps1',
        },
        {
          problem: 'The download fails with a 404, TLS or proxy error',
          cause: 'Wrong site address, the site is not reachable from your network or VPN, or a corporate proxy intercepts the request.',
          fix: 'Open the same URL in your browser first. Connect to the VPN if required. If a proxy is needed, ask your IT team for its address and add -Proxy to the Invoke-WebRequest command.',
        },
        {
          problem: 'My folder name has spaces or special characters',
          cause: 'Unquoted paths are split into several arguments.',
          fix: 'Keep the single quotes around the folder as generated on the page. Inside the quotes, spaces are fine.',
        },
      ],
    },
    {
      title: 'Installing on macOS',
      icon: 'terminal',
      items: [
        {
          problem: '"zsh: permission denied: ./install.sh"',
          cause: 'The downloaded file is not marked executable.',
          fix: 'Run it through bash, as the page shows, instead of executing it directly.',
          code: "bash install.sh --target '~/my-project' --tool all --base-url '<site>/downloads'",
        },
        {
          problem: 'macOS says the file cannot be opened because it is from an unidentified developer',
          cause: 'Gatekeeper quarantines files downloaded in a browser.',
          fix: 'Read the script, then clear the quarantine flag. Downloading with curl, as the page shows, avoids this.',
          code: 'xattr -d com.apple.quarantine install.sh',
        },
        {
          problem: '"curl: (60) SSL certificate problem"',
          cause: 'A corporate proxy re-signs HTTPS traffic with a certificate your Mac does not trust yet.',
          fix: 'Ask IT how to trust the corporate root certificate. Do not disable certificate checks with -k; use the zip download from your browser instead.',
        },
        {
          problem: '"unzip: command not found"',
          cause: 'Rare on macOS, but possible on minimal Linux systems.',
          fix: 'Install unzip with your package manager (for example sudo apt install unzip) and run the installer again.',
        },
      ],
    },
    {
      title: 'Integrity and updates',
      icon: 'shield',
      items: [
        {
          problem: '"Checksum mismatch ... Nothing was installed"',
          cause: 'The download was changed or cut short, a cache or proxy served a stale or altered file, or the site was updated mid-download.',
          fix: 'Do not use that file. Run the installer again. If it persists, report it to the maintainers with the message, because it can indicate tampering.',
        },
        {
          problem: 'A skill I picked is missing after install (or I got more than I picked)',
          cause: 'A skill name was misspelled in the command, or the folder was reused from an earlier full install.',
          fix: 'Names must match exactly (see the Skills page). Copy the command from the picker instead of typing it. The installer adds and updates files but never deletes skills from an earlier install, so remove unwanted skill folders by hand.',
        },
        {
          problem: 'I want to update the skills later',
          cause: 'New versions of the skills are published to the site over time.',
          fix: 'Run the same install command again. Skill files are replaced with the new versions, your docs/aidlc/status.md is kept, and only the AIDLC section of copilot-instructions.md is updated.',
        },
        {
          problem: 'My own text in copilot-instructions.md was changed',
          cause: 'Text placed between the aidlc:begin and aidlc:end markers is managed by the installer.',
          fix: 'Keep your own text outside those two markers. Anything inside them is overwritten on update.',
        },
      ],
    },
    {
      title: 'Using the skills',
      icon: 'puzzle',
      items: [
        {
          problem: 'The terminal AI agent does not list the skills',
          cause: 'The project root is not the folder you installed into, or the agent started before the .claude/skills folder existed.',
          fix: 'Start the agent in the folder that contains .claude/skills. If the folder was just created, restart the session. Then type / and look for aidlc-workflow.',
        },
        {
          problem: 'Copilot Chat does not show the slash commands',
          cause: 'The workspace root is not the install folder, the VS Code or Copilot extension is out of date, or the window was not reloaded.',
          fix: 'Open the install folder as the workspace root, update VS Code and the GitHub Copilot extensions, then run "Developer: Reload Window". Check that .github/prompts contains the skill files. Prompt and skill support depends on your organisation allowing these Copilot features.',
        },
        {
          problem: '"gh: command not found" or "not logged in"',
          cause: 'The GitHub CLI is not installed or not signed in.',
          fix: 'Install the GitHub CLI, sign in, and check the status.',
          code: 'gh auth login\ngh auth status',
        },
        {
          problem: 'Azure DevOps commands fail',
          cause: 'The Azure CLI or its Azure DevOps extension is missing, or no default organisation is set.',
          fix: 'Sign in, add the extension, and set your organisation and project.',
          code: 'az login\naz extension add --name azure-devops\naz devops configure -d organization=<url> project=<name>',
        },
        {
          problem: 'Creating a pull request fails',
          cause: 'You are on the default branch, the branch has not been pushed, or there are no commits ahead of the base.',
          fix: 'Create a feature branch with /git-commit, push it, then run /git-create-pr again.',
        },
        {
          problem: 'The assistant starts the wrong phase or says status.md is missing',
          cause: 'docs/aidlc/status.md was not installed or was edited into an unexpected format.',
          fix: 'Run /aidlc-workflow. It recreates the tracker if it is missing. Statuses must be one of: not started, in progress, awaiting approval, approved.',
        },
      ],
    },
    {
      title: 'For site maintainers',
      icon: 'server',
      items: [
        {
          problem: 'Downloads return 404 on the deployed site',
          cause: 'The build ran without the repository root, so scripts/build-downloads.mjs could not create the downloads, or the downloads folder was not deployed.',
          fix: 'Build from the full repository (npm run build inside web runs the download step first) and deploy the entire dist/web/browser folder, including downloads/.',
        },
        {
          problem: '.ps1, .sh or .zip files open as text or are blocked by the host',
          cause: 'The host serves these types with a restrictive content type or blocks them.',
          fix: 'Serve them as plain downloads over HTTPS. If they stay blocked, ask your platform team to allow them for this path.',
        },
        {
          problem: 'Images show a placeholder',
          cause: 'The file name does not match, or the file is not in web/public/assets/images.',
          fix: 'Use the exact names listed in web/IMAGES.md. Run npm start to see each placeholder with the expected file name.',
        },
        {
          problem: 'The site is deployed under a sub-path and links break',
          cause: 'The base href still points at the site root.',
          fix: 'Build with the sub-path as base href. The download commands then use the correct address automatically.',
          code: 'npm run build -- --base-href /aidlc/',
        },
      ],
    },
  ];

  protected readonly toc = [...this.sections.map((s) => ({ id: s.id, title: s.title })), { id: 'troubleshooting', title: 'Troubleshooting' }];
}
