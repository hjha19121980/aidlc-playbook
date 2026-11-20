---
name: knowledge-index
description: Build and maintain a searchable index of the codebase and docs (modules, owners, entry points, glossary, where-to-find) so agents spend context on the right files. Use when a repository is large or new to the team.
---

# Knowledge index

Stage: Build. Produces: `docs/aidlc/knowledge/index.md`.

## Steps
1. Walk the repository and docs; list each module or service with purpose, path, entry points, owner role, and key docs.
2. Add a glossary of domain terms with the file where each is defined.
3. Add a "where to find" table for common questions (how is X configured, where is Y validated).
4. Keep entries short and link to paths; do not copy code.
5. Record the commit SHA and date indexed; re-run when structure changes and update only changed entries.
6. Reference the index from `AGENTS.md` so every session reads it first.

## Rules
- Never index secrets, credentials, or personal data.
- An out-of-date index is worse than none; keep the indexed SHA visible.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
