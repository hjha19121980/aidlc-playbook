# AIDLC in this project

AIDLC is a loop: **Plan, Design, Build, Test, Deploy, Maintain**. Each stage ends by committing one artifact the next stage reads, and each has a human gate. The commit chain is the audit trail: who asked for what, what the agent produced, who approved it.

```
intent.md  ->  spec.md  ->  plan.md  ->  diff + tests  ->  PR + review findings  ->  release  ->  incident.md + new intent.md
  Plan        Design        Build           Test               Deploy                 Maintain          (loop)
```

## How to use
1. Open the project in your AI coding assistant (the terminal agent or VS Code with Copilot Chat).
2. Run `/aidlc-workflow`. It reads `docs/aidlc/status.md` and tells you the stage of each change.
3. Run the stage skill (`/aidlc-plan`, then `/aidlc-design`, and so on). Review what the agent drafts, edit it, and record your approval.
4. Use the Git skills for commits, pull requests, reviews, comments, and conflicts.

Skills and agents are available in both assistants; the same definitions are installed for each. Agents are focused helpers with limited tools (planner, verifier, reviewer, and others); your assistant lists them.

## Where things are
| What | Location |
|---|---|
| Per-change artifacts | `docs/aidlc/changes/<yyyymmdd>-<slug>/` (`intent.md`, `spec.md`, `plan.md`, `test-report.md`, `review-findings.md`, `release.md`, `incident.md`) |
| Templates | `docs/aidlc/templates/` |
| Status tracker | `docs/aidlc/status.md` |
| Project context for agents | `AGENTS.md` (repo root) |
| Review policy | `REVIEW.md` (repo root) |
| Coding standards (one per language) | `docs/aidlc/standards/` (start at `index.md`); the `code-review` skill and `reviewer` agent read them |
| Policy skills (your rules) | `skills/<policy>/` in the assistant's skills folder; see `docs/aidlc/policies/README.md` |
| Guard checks and CI templates | `docs/aidlc/guards/`, `docs/aidlc/templates/ci/` |
| Monitoring tiers | `docs/aidlc/monitoring/bands.yaml` |
| Evals | `evals/` |
| Lessons from incidents | `docs/aidlc/lessons/` |
| Skill and agent list | `docs/aidlc/skills-reference.md` |

## Gates (who must accept)
| Stage | Gate |
|---|---|
| Plan | Product owner accepts `intent.md` |
| Design | Product owner accepts `spec.md`; tech lead for higher risk |
| Build | Engineer accepts `plan.md`; code owner approves the PR |
| Test | Code owner reviews the evidence |
| Deploy | Release manager authorizes production |
| Maintain | Service owner triages findings |

## Ground rules
- Agents act up to a gate and never past it. Approval is always a named person.
- No credentials, client names, or personal data in artifacts, commits, or PR comments.
- Review and validate AI-generated content before sharing it externally.
- Regulated data (GDPR, HIPAA, PCI-DSS): consult your Data Privacy Officer first.
- Do not edit installed skill and agent copies by hand; reinstall to update them.

## Prerequisites for the Git skills
```
gh auth login
az login
az devops configure -d organization=<url> project=<name>
```
