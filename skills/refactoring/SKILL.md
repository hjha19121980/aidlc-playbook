---
name: refactoring
description: Refactor code in small, behavior-preserving steps protected by tests. Use when the plan calls for restructuring.
---

# Safe refactoring

Stage: Build. Produces: the diff and `plan.md` updates.

## Steps
1. Confirm the goal and that tests cover the behavior; add characterization tests first where they are missing.
2. Make one small change at a time: rename, extract, inline, move; run the tests after each.
3. Keep refactoring commits separate from behavior changes.
4. Stop if tests fail for an unclear reason; revert the step and report.
5. Summarize what changed, what did not, and the check output.

## Rules
- Never change behavior and structure in the same commit.
- Do not edit protected paths without the recorded approval.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
