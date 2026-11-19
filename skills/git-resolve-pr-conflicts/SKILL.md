---
name: git-resolve-pr-conflicts
description: Sync a branch with its base and resolve merge or rebase conflicts, including conflicts on a GitHub or Azure DevOps pull request. Use when a branch is behind, a PR says it has conflicts or cannot be merged, or the user asks to rebase, merge, sync, or fix merge conflicts.
---

# Git: Sync Branch and Resolve Conflicts

Covers a local branch that is behind its base and a PR flagged as conflicting, on GitHub (`gh`) or Azure DevOps (`az repos`).

## Steps
1. **Identify the situation.**
   - GitHub PR: `gh pr view <n> --json mergeable,mergeStateStatus,baseRefName,headRefName,isCrossRepository`. Conflicts when `mergeable` is `CONFLICTING`. For a fork PR, check that maintainers can push to it.
   - Azure DevOps PR: `az repos pr show --id <n> --query "{status:mergeStatus,source:sourceRefName,target:targetRefName}"`. Conflicts when `mergeStatus` is `conflicts`.
   - Local only: `git fetch origin` then `git log --oneline HEAD..origin/<base>` to see what is missing.
2. **Check out the branch.** GitHub: `gh pr checkout <n>`. Azure DevOps: `az repos pr checkout --id <n>`. Then confirm `git status` is clean; if not, ask whether to commit or `git stash`.
3. **Choose the strategy.**
   - **Merge** (`git merge origin/<base>`) for any branch already pushed, shared, or under review. No force-push is needed and reviewers keep their context.
   - **Rebase** (`git rebase origin/<base>`) only for unpublished or solo branches, or when the user asks. A rebased branch that was already pushed needs `git push --force-with-lease`, with user approval.
4. **List conflicts.** `git diff --name-only --diff-filter=U`, then inspect each file's markers (`<<<<<<<`, `=======`, `>>>>>>>`).
5. **Resolve each file by intent, not by side.**
   - Read both versions: `git log --merge -p -- <file>` and `git show origin/<base>:<file>`.
   - Keep both changes where they are compatible; rewrite where they overlap.
   - Lockfiles and generated files: do not hand-edit. Take the base version, then regenerate (`npm install`, `poetry lock`, etc.).
   - Remove every marker; verify with `git grep -nE '^(<<<<<<<|=======|>>>>>>>)'`.
6. **Verify.** Run the build, linter, and tests. Report failures with their output.
7. **Complete.** `git add <files>`, then `git commit` for a merge or `git rebase --continue` for a rebase.
8. **Show the user** a per-file summary (what was kept and why) and get approval before pushing.
9. **Push.** `git push` (or `--force-with-lease` after an approved rebase). Re-check status: `gh pr view <n> --json mergeable,mergeStateStatus` or `az repos pr show --id <n> --query mergeStatus`.
10. **Comment on the PR** using the git-pr-comment skill: files that conflicted, how each was resolved, what was tested.

## Web editors for small conflicts
GitHub: the PR page's **Resolve conflicts** button. Azure DevOps: PR **Overview**, then **Conflicts** tab. Use the CLI flow for code logic, lockfiles, or many files.

## Rules
- If you are unsure of the intent behind either side, stop and ask the file's author; do not guess on business logic.
- Never use `git checkout --ours/--theirs` on a whole file without confirming it is intended.
- Escape hatch: `git merge --abort` or `git rebase --abort` restores the pre-sync state.
- No `reset --hard`, `checkout --`, force-push, or branch deletion without explicit approval; prefer `git stash` and aborting.
- Do not paste secrets, client names, or personal data into comments or commit messages.
