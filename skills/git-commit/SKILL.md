---
name: git-commit
description: Create a branch and well-formed commits. Use when asked to commit changes, create a feature branch, or write a commit message following Conventional Commits.
---

# Git: Branch and Commit

## Steps
1. Run `git status` and `git diff` to see exactly what changed.
2. If on the default branch (`main`/`master`), create a branch: `git switch -c <type>/<short-kebab-summary>` (types: feat, fix, docs, refactor, test, chore).
3. Stage specific files (`git add <paths>`), not `git add -A`, unless every change belongs together.
4. **Never commit** secrets or credentials (`.env`, keys, tokens), large binaries, or generated output. Warn the user if asked to.
5. Commit with a Conventional Commit message:
   ```
   <type>(<scope>): <imperative summary, max 72 chars>

   <why this change, wrapped at 72 cols>
   ```
6. Run `git log -1 --stat` to confirm.

## Rules
- Commit only when the user asks. Do not push or force-push without being asked.
- Do not skip hooks (`--no-verify`); fix the underlying failure.
- Prefer a new commit over `--amend` unless asked.
