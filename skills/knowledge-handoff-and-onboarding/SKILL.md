---
name: knowledge-handoff-and-onboarding
description: Produce a handoff and onboarding pack so new team members or a support team can understand a system - purpose, architecture, setup, workflows, risks, and contacts. Use at team changes, project transition, and handover to run.
---

# Knowledge handoff and onboarding

Stage: Build. Produces: `docs/aidlc/ONBOARDING.md` and a handoff checklist.

## Steps
1. Read AGENTS.md, specs, ADRs, runbooks, and the knowledge index (knowledge-index, analyze-repository).
2. Write the system overview: purpose, users, main components, data flows, and environments.
3. Write the first-day guide: access to request, local setup, how to build, test, and run, with commands verified in the repo.
4. Describe the delivery workflow: branches, reviews, gates, release steps, and who approves what.
5. List known risks, tech debt, fragile areas, open incidents, and unwritten rules from lessons files.
6. List key roles, forums, and contacts by role, not private details.
7. Add a handoff checklist (access transferred, runbooks reviewed, open items assigned) and a 30-day reading plan.
8. Flag gaps that only a person can fill and mark them [OPEN QUESTION].

## Rules
- Verify every command and path against the repository; do not invent steps.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
