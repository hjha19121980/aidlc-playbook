---
name: analyze-repository
description: Analyze an unfamiliar repository - structure, languages, build and test commands, entry points, conventions, and risks, and write a concise map. Use before changing a codebase you do not know.
---

# Analyze repository

Stage: Build. Produces: `docs/aidlc/analysis/repository.md`.

## Steps
1. List the top-level structure and identify languages, frameworks, and package managers from manifests.
2. Find how to build, test, lint, and run; verify by running them if allowed and record the literal results.
3. Locate entry points, configuration, data access, external integrations, and the main domain modules.
4. Note conventions (naming, layering, error handling), test style and coverage, CI configuration, and protected or generated paths.
5. Record risks: dead code, large files, missing tests, outdated dependencies, secrets in the tree (report location only, never the value).
6. Write `repository.md` with a one-screen overview first, then details. Offer to seed `AGENTS.md` from it (see aidlc-project-context).

## Rules
- Read-only: change nothing while analyzing.
- Never print secret values you find; report the file and line.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
