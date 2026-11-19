---
name: aidlc-project-context
description: Create and maintain AGENTS.md, the project context file that gives every agent the knowledge a new joiner needs (commands, conventions, architecture, common mistakes). Use when setting up a repo for AIDLC or when an agent repeats a mistake.
---

# AIDLC: Project context (`AGENTS.md`)

Knowledge that lived in people's heads and wikis becomes a file the agent reads at the start of every session, maintained by the whole team.

Prerequisite: a repo and one engineer who knows the codebase well.

## Steps
1. If `AGENTS.md` is missing, start from `docs/aidlc/templates/AGENTS.md`, or let the agent draft it from what it finds in the repo.
2. **Cut it down** to what a new joiner needs on day one: build, test, and lint commands with a sample healthy output; conventions that matter; architecture in a few lines; the mistakes the agent keeps making; protected paths.
3. Include a **Verifying your work** block: the commands to run before reporting done, and "if a test fails, fix the code, not the test".
4. Check it into the repo root. Changes are reviewed like code; code owners approve.
5. **Working rule:** when the agent makes the same mistake twice, the correction goes into `AGENTS.md`.
6. Keep it under about a page. Stale lines cost context and add no value; prune during review.

## Governance
Version-controlled, so the instructions agents work to are reviewable and auditable; edits are visible in git history and approved in PR review.

## Measure
- Leading: how often the agent repeats a mistake the file should have caught (track corrections in git history).
- Lagging: time to first merged PR for a new team member.
