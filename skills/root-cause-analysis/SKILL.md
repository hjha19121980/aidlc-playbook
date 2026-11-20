---
name: root-cause-analysis
description: Run a blameless root cause analysis - timeline, contributing factors, why-chains, and corrective actions with owners. Use after an incident or a significant defect.
---

# Root cause analysis

Stage: Maintain. Produces: `docs/aidlc/incidents/<yyyymmdd>-<slug>-rca.md`.

## Steps
1. Build the timeline from logs, deploys, alerts, and the incident record.
2. Ask why repeatedly, separating trigger, root causes, and contributing conditions (process, tooling, detection).
3. Check what worked: detection, response, communication.
4. Write corrective and preventive actions with owner role, date, and how success is verified; add an eval or test for the failure.
5. Write lessons to `docs/aidlc/lessons/` and a new `intent.md` for large fixes.

## Rules
- Blameless: describe systems and decisions, not individuals.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
