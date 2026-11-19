---
name: git-create-pr
description: Raise a pull request with a clear title, description, and an initial comment. Use when asked to create, open, or raise a PR (GitHub via gh CLI; Azure DevOps via az repos).
---

# Git: Create a Pull Request

## Steps
1. Verify state: `git status`, `git branch --show-current`. Refuse to open a PR from the default branch.
2. Review what will be included: `git log <base>..HEAD --oneline` and `git diff <base>...HEAD --stat`.
3. Push the branch: `git push -u origin HEAD` (ask first if the user has not authorized pushing).
4. Draft the PR body in a temp file using this template:
   ```
   ## Summary
   <what and why, 2-4 bullets>

   ## Changes
   - <notable change>

   ## How to test
   - <steps / commands>

   ## Risks and rollback
   - <impact, how to revert>

   ## Checklist
   - [ ] Tests added/updated and passing
   - [ ] No secrets or client-confidential data
   - [ ] Docs updated
   - [ ] AI-assisted content reviewed by a human
   ```
5. Create it:
   - **GitHub:** `gh pr create --base <base> --title "<conventional title>" --body-file <file> [--draft] [--reviewer a,b] [--label x]`
   - **Azure DevOps:** `az repos pr create --source-branch <branch> --target-branch <base> --title "<t>" --description "<d>"`
6. **Add the opening comment** (context for reviewers: where to focus, known gaps, linked issue): `gh pr comment <number> --body-file <file>`.
7. Return the PR URL.

## Rules
- Show the user the title and body for confirmation before creating, since a PR is outward-facing.
- Link the related issue (`Closes #123`) when one exists.
- Do not include credentials, client names, or personal data in the title, body, or comments.
