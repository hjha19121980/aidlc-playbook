import type { IconName } from '../shared/icon';

export interface Phase {
  id: string;
  title: string;
  icon: IconName;
  skill: string;
  goal: string;
  reads: string;
  commits: string;
  outputs: string[];
  gate: string;
}

/** The six stages. Each reads the previous artifact, commits its own, and ends in a human gate. */
export const PHASES: Phase[] = [
  { id: 'plan', title: 'Plan', icon: 'compass', skill: 'aidlc-plan', goal: 'Capture the idea once, in the originator\'s own words.', reads: 'An idea, a ticket or an incident finding', commits: 'intent.md', outputs: ['intent.md: problem, outcome, constraints, open questions', 'Interview with the intent-analyst agent', 'Clear owner and status in the tracker'], gate: 'Product owner accepts the intent' },
  { id: 'design', title: 'Design', icon: 'pencil', skill: 'aidlc-design', goal: 'Requirements and design in one session, with policy applied as the spec is written.', reads: 'intent.md and your policy skills', commits: 'spec.md', outputs: ['spec.md: testable requirements and design', 'Policy conformance, one line per policy', 'Flagged concerns for named owners'], gate: 'Product owner accepts the spec' },
  { id: 'build', title: 'Build', icon: 'code', skill: 'aidlc-build', goal: 'Nothing is implemented without an accepted plan.', reads: 'spec.md and AGENTS.md', commits: 'plan.md, diff and tests', outputs: ['plan.md from a read-only planner', 'Small pull requests linked to the chain', 'Parallel sessions and helper agents'], gate: 'Engineer accepts the plan; code owner approves the PR' },
  { id: 'test', title: 'Test', icon: 'flask', skill: 'aidlc-test', goal: 'Every session checks its own work before a human sees it.', reads: 'plan.md and the diff', commits: 'test-report.md and evals', outputs: ['Feedback loop: tests, build, visual check', 'Failing test first for bug fixes', 'Fresh-context verification and evals'], gate: 'Code owner reviews the evidence' },
  { id: 'deploy', title: 'Deploy', icon: 'cloud-upload', skill: 'aidlc-deploy', goal: 'Review runs both ways. The agent acts up to the production gate and never past it.', reads: 'Merged PR, REVIEW.md, spec.md, plan.md', commits: 'review-findings.md and release.md', outputs: ['Layered AI review with ranked findings', 'Approval gates as deterministic checks', 'Tiered autonomy and a rehearsed rollback'], gate: 'Release manager authorizes production' },
  { id: 'maintain', title: 'Maintain', icon: 'wrench', skill: 'aidlc-maintain', goal: 'Close the loop: what the agent finds becomes the next intent.', reads: 'Metrics, incidents and tickets', commits: 'incident.md and a new intent.md', outputs: ['Control bands with response tiers', 'Incident record and lessons file', 'New intent.md that restarts the loop'], gate: 'Service owner triages findings' },
];

export type SkillGroup = 'aidlc' | 'practice' | 'git';
export interface Skill {
  name: string;
  group: SkillGroup;
  icon: IconName;
  description: string;
}

export const SKILLS: Skill[] = [
  { name: 'aidlc-workflow', group: 'aidlc', icon: 'layers', description: 'Orchestrator. Tracks every change, finds its stage and gate, and recommends the next skill.' },
  { name: 'aidlc-plan', group: 'aidlc', icon: 'compass', description: 'Stage 1. Capture an idea, ticket or incident finding as intent.md.' },
  { name: 'aidlc-design', group: 'aidlc', icon: 'pencil', description: 'Stage 2. Turn an accepted intent into spec.md, constrained by policy skills.' },
  { name: 'aidlc-build', group: 'aidlc', icon: 'code', description: 'Stage 3. Plan first (plan.md), then implement in small steps with subagents.' },
  { name: 'aidlc-test', group: 'aidlc', icon: 'flask', description: 'Stage 4. Feedback loop, test-first fixes and test-report.md evidence.' },
  { name: 'aidlc-deploy', group: 'aidlc', icon: 'cloud-upload', description: 'Stage 5. Layered PR review, approval gates and tiered CI/CD.' },
  { name: 'aidlc-maintain', group: 'aidlc', icon: 'wrench', description: 'Stage 6. Control bands, incident diagnosis and a new intent.md to restart the loop.' },
  { name: 'aidlc-project-context', group: 'practice', icon: 'file', description: 'Create and maintain AGENTS.md, the context every agent reads.' },
  { name: 'aidlc-policy-skill', group: 'practice', icon: 'shield', description: 'Write an organization policy as a skill so rules are applied consistently.' },
  { name: 'aidlc-review-policy', group: 'practice', icon: 'search', description: 'Write and tune REVIEW.md: passes, severity, caps and exclusions.' },
  { name: 'aidlc-guardrails', group: 'practice', icon: 'shield', description: 'Turn approval gates and policies into deterministic checks.' },
  { name: 'aidlc-evals', group: 'practice', icon: 'flask', description: 'Regression-test agent configuration with continuous evals.' },
  { name: 'aidlc-metrics', group: 'practice', icon: 'zap', description: 'Leading and lagging indicators read from git history and CI.' },
  { name: 'aidlc-connectors', group: 'practice', icon: 'puzzle', description: 'Use Git, Figma, Jira, Confluence and company connectors (MCP) safely at each stage.' },
  { name: 'git-commit', group: 'git', icon: 'git-branch', description: 'Create a branch and Conventional Commit messages safely.' },
  { name: 'git-create-pr', group: 'git', icon: 'git-pull-request', description: 'Open a PR with a template description and an opening comment (GitHub and Azure DevOps).' },
  { name: 'git-review-pr', group: 'git', icon: 'search', description: 'Review a PR under REVIEW.md and against the spec and plan, then submit.' },
  { name: 'git-pr-comment', group: 'git', icon: 'message', description: 'General and inline comments, replies and addressing reviewer feedback.' },
  { name: 'git-resolve-pr-conflicts', group: 'git', icon: 'git-merge', description: 'Sync a branch with its base and resolve merge conflicts on GitHub or Azure DevOps PRs.' },
  { name: 'git-release-notes', group: 'git', icon: 'tag', description: 'Changelog, release notes, semver suggestion, tag and release.' },
];

export interface Agent {
  name: string;
  stage: string;
  icon: IconName;
  access: string;
  description: string;
}

/** Focused helpers with limited tools. Installed for both assistants from one definition. */
export const AGENTS: Agent[] = [
  { name: 'intent-analyst', stage: 'Plan', icon: 'compass', access: 'read, search, edit', description: 'Interviews the originator and drafts intent.md.' },
  { name: 'spec-author', stage: 'Design', icon: 'pencil', access: 'read, search, edit', description: 'Drafts spec.md under your policy skills and flags concerns.' },
  { name: 'planner', stage: 'Build', icon: 'clipboard', access: 'read, search', description: 'Read-only. Proposes plan.md before any code is written.' },
  { name: 'researcher', stage: 'Build', icon: 'search', access: 'read, search', description: 'Explores the codebase and reports back without flooding context.' },
  { name: 'code-simplifier', stage: 'Build', icon: 'code', access: 'read, search, edit, execute', description: 'Strips needless complexity from a finished change.' },
  { name: 'verifier', stage: 'Test', icon: 'flask', access: 'read, execute', description: 'Runs the app and checks in a fresh context. Reports only.' },
  { name: 'reviewer', stage: 'Deploy', icon: 'shield', access: 'read, search, execute', description: 'Layered review under REVIEW.md. Cannot edit or approve.' },
  { name: 'release-coordinator', stage: 'Deploy', icon: 'cloud-upload', access: 'read, search, edit, execute', description: 'Prepares the release up to the production gate, never past it.' },
  { name: 'incident-diagnostician', stage: 'Maintain', icon: 'wrench', access: 'read, search, execute', description: 'Diagnoses a breach and writes incident.md and a new intent.md.' },
  { name: 'confidence-gate', stage: 'Maintain', icon: 'check', access: 'read, search, execute', description: 'Adversarial independent check between headless stages.' },
];

export type InstallStatus = 'available' | 'planned';
export interface InstallOption {
  id: string;
  icon: IconName;
  title: string;
  audience: string;
  status: InstallStatus;
  needs: string;
  command: string;
  label: string;
  note: string;
}

export const INSTALL_OPTIONS: InstallOption[] = [
  { id: 'skills', icon: 'download', title: 'Skill sync script (from source)', audience: 'Contributors with Node 18+', status: 'available', needs: 'Node.js and this repository', label: 'Terminal', command: 'node scripts/sync-skills.mjs --target <your-project>', note: 'Generates the skills straight from the repository. Most users should use the download above instead.' },
  { id: 'npx', icon: 'terminal', title: 'npx (Node)', audience: 'Node developers', status: 'planned', needs: 'Node.js 18+', label: 'Terminal', command: 'npx aidlc-playbook', note: 'Zero install. Starts the local web app and the skill installer.' },
  { id: 'pipx', icon: 'layers', title: 'pipx / pip (Python)', audience: 'Python developers', status: 'planned', needs: 'Python 3.10+', label: 'Terminal', command: 'pipx run aidlc-playbook\n# or\npip install aidlc-playbook && aidlc-playbook', note: 'The wheel bundles the built UI, so no Node is needed.' },
  { id: 'script', icon: 'zap', title: 'Installer script', audience: 'Windows, macOS, Linux', status: 'planned', needs: 'PowerShell or bash', label: 'PowerShell / bash', command: '.\\install.ps1      # Windows\n./install.sh       # macOS, Linux', note: 'Detects Node or Python and sets everything up. Read the script before running it.' },
  { id: 'binary', icon: 'box', title: 'Standalone executable', audience: 'No runtime installed', status: 'planned', needs: 'Nothing', label: 'Package managers', command: 'winget install aidlc-playbook\nscoop install aidlc-playbook\nbrew install aidlc-playbook', note: 'A single file with the server and UI inside.' },
  { id: 'desktop', icon: 'monitor', title: 'Desktop installer', audience: 'Non-technical users', status: 'planned', needs: 'Windows or macOS', label: 'Download', command: 'AIDLC-Playbook-Setup.msi', note: 'A signed installer that opens the app in its own window.' },
  { id: 'docker', icon: 'server', title: 'Docker', audience: 'Teams with containers', status: 'planned', needs: 'Docker Desktop', label: 'Terminal', command: 'docker run -p 4200:4200 aidlc-playbook', note: 'Isolated, repeatable and good for shared team servers.' },
  { id: 'hosted', icon: 'globe', title: 'Hosted web app', audience: 'Whole organisation', status: 'planned', needs: 'A browser', label: 'URL', command: 'https://<your-internal-host>/aidlc', note: 'Needs hosting, SSO and a data-privacy review before use with client work.' },
];
