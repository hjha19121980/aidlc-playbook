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

// Skills and agents come from the generated catalog (built from the skills and agents folders).
export { CATALOG_AGENTS as AGENTS, CATALOG_SKILLS as SKILLS, CATALOG_STAGES as STAGES, CATALOG_ROLES as ROLES, CATALOG_CORE as CORE_SKILLS } from './catalog.generated';
export type { CatalogAgent as Agent, CatalogSkill as Skill, CatalogStage as Stage, CatalogRole as Role } from './catalog.generated';

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
