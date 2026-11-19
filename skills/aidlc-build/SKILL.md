---
name: aidlc-build
description: AIDLC Stage 3, Build. Use to turn an accepted spec.md into an approved plan.md, then implement it in small steps with self-checks, subagents, and pull requests. Nothing is implemented without an accepted plan.
---

# AIDLC Stage 3: Build, plan first, then implement

Prerequisites: `spec.md` accepted; project context file `AGENTS.md` (see `aidlc-project-context`) helps.

## A. Plan mode (read-only)
1. Start in plan mode: read the codebase, change nothing. Use the `planner` agent if available.
2. Give it `intent.md` and `spec.md`. Ask for a plan naming files that change, order of work, risks, and the tests that prove it. Let it interview the engineer.
3. Interrogate the plan: what could this break, which step is riskiest, which alternatives were rejected.
4. Iterate until an engineer who never saw the conversation could implement from the plan alone.
5. Commit the approved plan as `plan.md` (`docs/aidlc/templates/plan.md`). Later stages check the diff against it. The engineer accepts routine plans; higher-risk changes go to a tech lead or architect.

## B. Implement
1. Work on a branch (git-commit skill). One task at a time, smallest change that satisfies the plan.
2. Verify as you go (see `aidlc-test`): build, tests, lint. Show the output; never claim success unrun.
3. If implementation departs from the plan, update `plan.md` in the same commit.
4. Do not edit protected paths (generated code, frozen packages, migrations, infra) without the recorded approval.
5. Raise a pull request (git-create-pr skill) that links `intent.md`, `spec.md`, `plan.md`.

## C. Scale out
- **Parallel sessions:** split work that touches different files; run each in its own git worktree and branch. Tasks sharing files run sequentially. Start with two or three streams; add only while review keeps up.
- **Subagents** for recurring jobs: `researcher` (explore without flooding context), `code-simplifier` (strip needless complexity at the end), `verifier` (run the app in a fresh context and report).
- Auto-accept edits only after the plan is accepted and guardrails exist: tuned project context, policy skills, guard checks, and tests the agent can run.

## Legacy systems
Name one source of truth per artifact (see `aidlc-workflow`). Link ticket IDs and commit SHAs both ways.

## Governance
Design review happens before code, when changing course is editing a document. Plan and acceptance are logged. Guardrails come from repository configuration so they apply to every session.

## Measure
- Leading: share of changes merging from the first pass; time from plan approval to merged PR.
- Lagging: rework cycles per change; how often the merged diff still matches `plan.md`.
