---
name: git-pr-comment
description: Add, reply to, and resolve comments on a pull request, including summary comments and inline code comments. Use when asked to comment on a PR, answer review feedback, or address reviewer comments.
---

# Git: PR Comments

## Add a general comment
`gh pr comment <n> --body-file <file>` (or `--body "<text>"` for short text).

## Add an inline comment
```
gh api repos/{owner}/{repo}/pulls/<n>/comments \
  -f body="<text>" -f commit_id="$(gh pr view <n> --json headRefOid -q .headRefOid)" \
  -f path="<file>" -F line=<line> -f side=RIGHT
```

## Read existing feedback
- `gh pr view <n> --comments`
- Review threads: `gh api repos/{owner}/{repo}/pulls/<n>/comments`

## Address reviewer feedback
1. List each comment and decide: fix, discuss, or decline (with reason).
2. Make the fixes, commit with the git-commit skill, push.
3. Reply to each thread: `gh api repos/{owner}/{repo}/pulls/<n>/comments/<comment_id>/replies -f body="Fixed in <sha>: <what changed>"`.
4. Post one summary comment listing what was addressed and what remains.

## Azure DevOps equivalents
Comments are "threads". Use the REST API through the CLI (`az devops configure -d organization=<url> project=<name>` first):
- General or inline thread: write `thread.json`, then
  `az devops invoke --area git --resource pullRequestThreads --route-parameters project=<p> repositoryId=<repo> pullRequestId=<n> --http-method POST --in-file thread.json --api-version 7.1`
  ```json
  { "comments": [{ "parentCommentId": 0, "content": "<text>", "commentType": 1 }],
    "status": 1,
    "threadContext": { "filePath": "/src/file.ts", "rightFileStart": {"line": 10, "offset": 1}, "rightFileEnd": {"line": 10, "offset": 1} } }
  ```
  Omit `threadContext` for a general comment.
- List threads: same command with `--http-method GET`.
- Reply: POST to resource `pullRequestThreadComments` with `threadId=<id>` and body `{ "content": "<text>", "parentCommentId": 1 }`.
- Resolve a thread: PATCH `pullRequestThreads` with `{ "status": 2 }` (fixed).

## Rules
- Show the user the text of any comment before posting; comments are public to everyone with repo access.
- No secrets, credentials, client-confidential or personal data in comments.
- Keep tone professional and factual.
