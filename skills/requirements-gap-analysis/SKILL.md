---
name: requirements-gap-analysis
description: Review requirements, stories, or an intent for gaps, ambiguity, conflicts, and missing non-functional needs, and list questions for the owner. Use before design starts.
---

# Requirements gap analysis

Stage: Plan. Produces: `docs/aidlc/changes/<id>/gap-analysis.md`.

## Steps
1. Read the intent, stories, and referenced sources.
2. Check completeness against a list: users, data, integrations, security and privacy, performance, availability, accessibility, audit, migration, support, cost.
3. Find ambiguity, contradictions between sources, untestable statements, and hidden assumptions.
4. Write each finding with severity (blocker, important, minor), the evidence, and a specific question for a named role.
5. Summarize whether the intent is ready for Design and what must be answered first.

## Rules
- Report only gaps you can justify from the material; do not invent requirements.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
