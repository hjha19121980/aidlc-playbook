---
name: postmortem-and-lessons-learned
description: Run a blameless postmortem after an incident, failed release, or missed milestone and turn lessons into actions, evals, and updates to AGENTS.md and REVIEW.md. Use at the end of Maintain to close the loop.
---

# Postmortem and lessons learned

Stage: Maintain. Produces: `docs/aidlc/lessons/<yyyy-mm>-<slug>.md` and follow-up `intent.md` items.

## Steps
1. Gather the timeline from incident.md, commits, alerts, and chat exports; keep facts separate from interpretation.
2. Describe impact: who, how long, what data or money, using measured values.
3. Find contributing causes with root-cause-analysis; describe system and process causes, not people.
4. Record what worked, what failed, and where luck helped.
5. Write actions, each with an owner role, a due date, and a verification: new eval, alert, test, runbook, or standard.
6. Propose updates to AGENTS.md, REVIEW.md, runbooks, and coding standards; present them as pull requests for owners to approve.
7. Write the actions that need product work as a new intent.md.

## Rules
- Blameless: name roles and systems, not individuals.
- Share externally only after review by the service owner.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
