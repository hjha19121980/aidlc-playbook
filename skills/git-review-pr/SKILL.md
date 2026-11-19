---
name: git-review-pr
description: Review a pull request for correctness, security, tests, and requirement coverage, then optionally submit the review. Use when asked to review a PR by number, URL, or branch.
---

# Git: Review a Pull Request

## Steps
1. Fetch context: `gh pr view <n> --json title,body,author,baseRefName,files,reviews` and `gh pr diff <n>`. For checks: `gh pr checks <n>`.
2. Read the review policy `REVIEW.md` if present (passes, what counts as Important versus Nit, caps, exclusions) and follow it. Read the linked change folder (`docs/aidlc/changes/<id>/`: `intent.md`, `spec.md`, `plan.md`) and confirm the diff does what the plan intended and nothing outside it. Note when the change makes `AGENTS.md` outdated.
3. If there is no `REVIEW.md`, review in this order, citing `file:line` for each finding:
   1. **Correctness:** logic errors, edge cases, error handling, concurrency.
   2. **Security and privacy:** injection, authz, secrets, unsafe deserialization, personal or regulated data.
   3. **Tests:** coverage of new behavior and failure paths.
   4. **Design and maintainability:** naming, duplication, scope creep.
   5. **Docs and operability:** README, config, logging, migrations.
4. Tag each finding with its pass and classify it as `Important` (breaks behavior, leaks data, breaches policy) or `Nit`. Only report issues you can justify; no speculation. Findings never approve or block on their own.
5. Present a summary to the user: verdict (approve / request changes / comment), then findings ranked by severity.
6. **Only after user confirmation**, submit:
   - `gh pr review <n> --approve --body "<text>"`
   - `gh pr review <n> --request-changes --body-file <file>`
   - `gh pr review <n> --comment --body-file <file>`
   For inline comments use `gh api repos/{owner}/{repo}/pulls/<n>/comments` with `path`, `line`, `commit_id`, `body`.

## Azure DevOps equivalents
- Context: `az repos pr show --id <n>`, changed files via `az repos pr list` / the PR iterations API, diff via `git diff origin/<target>...origin/<source>` after `git fetch`.
- Policies and checks: `az repos pr policy list --id <n>`.
- Vote: `az repos pr set-vote --id <n> --vote approve|approve-with-suggestions|wait-for-author|reject`.
- Comments: see the git-pr-comment skill.

## Rules
- Be specific and kind; explain why and offer a fix.
- Never approve a PR with failing required checks or unaddressed blockers.
- Mark the review as AI-assisted so the human reviewer takes ownership.
