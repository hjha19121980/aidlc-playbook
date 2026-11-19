---
name: git-release-notes
description: Generate release notes and a changelog entry from commits and merged PRs, and optionally tag and publish a release. Use when asked for release notes, a changelog, or to cut a release.
---

# Git: Release Notes

## Steps
1. Find the range: `git describe --tags --abbrev=0` for the last tag.
2. Collect changes: `git log <last-tag>..HEAD --pretty=format:'%h %s'` and `gh pr list --state merged --search "merged:>=<date>" --json number,title,labels`.
3. Group by Conventional Commit type: Features, Fixes, Performance, Docs, Breaking Changes (call these out first), Internal.
4. Write a user-facing entry in `CHANGELOG.md` (Keep a Changelog format) with PR links; rewrite terse commit text into plain language.
5. Suggest a semver bump: breaking = major, feat = minor, otherwise patch.
6. **Only on user approval:** `git tag -a vX.Y.Z -m "<msg>"`, `git push origin vX.Y.Z`, `gh release create vX.Y.Z --notes-file <file>`.

## Rules
- Tagging and publishing are outward-facing; confirm first.
- Remind the user to review AI-generated notes before sharing externally.
