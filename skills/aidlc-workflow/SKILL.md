---
name: aidlc-workflow
description: AIDLC orchestrator. Use to start a change, see which stage each change is in, find the next gate, or decide which stage skill to run (plan, design, build, test, deploy, maintain).
---

# AIDLC: Workflow orchestrator

AIDLC is a loop, not a line. Every stage ends by committing one artifact; the next stage starts by reading it. The commit chain is the audit trail: who asked for what, what the agent produced, who approved it.

| Stage | Skill | Reads | Commits | Gate (human) |
|---|---|---|---|---|
| 1 Plan | aidlc-plan | idea, ticket, incident finding | `intent.md` | Product owner accepts intent |
| 2 Design | aidlc-design | `intent.md`, policy skills | `spec.md` | Product owner accepts spec (tech lead if higher risk) |
| 3 Build | aidlc-build | `spec.md`, project context | `plan.md`, diff, tests | Engineer accepts plan; code owner approves PR |
| 4 Test | aidlc-test | plan, diff | `test-report.md`, evals | Code owner reviews evidence |
| 5 Deploy | aidlc-deploy | merged PR, `review-findings.md` | release record | Release manager authorizes production |
| 6 Maintain | aidlc-maintain | metrics, incidents | `incident.md`, new `intent.md` | Service owner triages |

Each change lives in `docs/aidlc/changes/<yyyymmdd>-<slug>/`.

## Steps
1. Read `docs/aidlc/status.md`. If it is missing, create it from `docs/aidlc/templates/status.md`.
2. **Start a change:** ask for a one-line summary, create the folder, add a row to `status.md`, then run `aidlc-plan`.
3. **Report:** for every open change show its stage, status (`draft`, `awaiting approval`, `accepted`, `blocked`), the artifact it is waiting on, and the human who must act.
4. **Advance** a change only when its gate is recorded as accepted by a person. Never mark a gate accepted yourself.
5. Recommend the next skill and offer to run it. If the user wants to jump ahead, record the override and the reason in `status.md`.

## Source of truth
For each artifact, one system is the source of truth and the others hold a copy or link.
- **Repo is the record:** the markdown files are authoritative; the ticket tool links to the commit.
- **Ticket tool is the record:** markdown files are working copies; write the outcome back to the ticket.
- **Linkage minimum:** every artifact notes the ticket ID and every ticket notes the commit SHA.
Ask which applies and record it at the top of `status.md`. Use the `aidlc-connectors` skill to read from and write back to the ticket, wiki, and design tools.

## Rules
- Agents act up to a gate and never past it. Approval is always a named person.
- Anything touching production, regulated data, or protected paths needs explicit human approval.
- Keep credentials, client names, and personal data out of every artifact.
