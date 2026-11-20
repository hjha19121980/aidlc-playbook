---
name: code-documentation
description: Write and update developer documentation (README, module docs, API docs, inline comments for non-obvious why) from the code. Use when a change alters behavior or onboarding steps.
---

# Code documentation

Stage: Build. Produces: README and docs files in the diff.

## Steps
1. Find the docs affected by the change.
2. Update setup, configuration, usage examples, and API reference; verify each command by running it.
3. Comment the why, not the what; remove stale comments.
4. Keep docs next to the code and link from `AGENTS.md` where useful.
5. List documentation changes in the pull request description.

## Rules
- Do not document secrets; use placeholders.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
