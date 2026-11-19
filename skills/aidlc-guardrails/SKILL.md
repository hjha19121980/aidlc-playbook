---
name: aidlc-guardrails
description: Turn human approval gates and policies into deterministic checks (git hooks, required CI checks, branch rules, protected paths, assistant hooks, permissions). Use when a rule must hold every time, for everyone.
---

# AIDLC: Guardrails and approval gates

Skills are advisory. Guardrails are the deterministic layer behind them. Gates can allow, ask (wait for a named person), or block, and a block must explain itself and name the route to approval.

Prerequisite: a written list of the approvals your change process requires.

## Steps
1. With change management and compliance, **list the gates that must survive**: change sign-off, release authorization, edits to protected paths, edits to migrations and infrastructure without a change ticket, test-file edits during a fix task, secrets in a diff.
2. **Express each gate** in the strongest place available, in this order:
   1. **Branch protection and required checks** (code owner approval, protected branches, no direct push by agents).
   2. **CI checks** from `docs/aidlc/templates/ci/` (protected paths, evals, plan present for the change).
   3. **Local git hooks** (formatter, linter, secret scan) for fast feedback.
   4. **Assistant-level hooks and permissions** where your assistant supports them: deny reads of secret files, block network egress tools, allow only safe commands, require approval for production commands.
3. **Scope build-time hooks** to the file that changed and keep them fast; heavy checks belong at commit or PR. Approvals that pause for a person belong at the deploy gate, not during parallel build sessions.
4. **Non-negotiable controls** live in centrally managed configuration that engineers cannot switch off; team conventions live in the repo.
5. Start from `docs/aidlc/guards/protected-paths.sh`; edit `docs/aidlc/guards/protected-paths.txt` to list protected paths.
6. Log allow and block decisions with a timestamp and the verdict.

## Measure
- Leading: time spent waiting on each approval gate.
- Lagging: gate violations reaching production before and after the guard.
