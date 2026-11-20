---
name: incident-response
description: Coordinate an incident - triage, severity, communication, mitigation options, and a timeline, with human authorization for production actions. Use when something is broken in production.
---

# Incident response

Stage: Maintain. Produces: `docs/aidlc/incidents/<yyyymmdd>-<slug>.md`.

## Steps
1. Record detection time, symptoms, and affected users and systems; set severity.
2. Start a timeline; assign roles (incident lead, communications, operations) by role.
3. Form hypotheses from metrics, recent deploys, and logs; test the cheapest first.
4. Propose mitigations (rollback, flag off, scale, failover) with risk; a named human authorizes any production action.
5. Send status updates at an agreed cadence and confirm recovery against the metric.
6. Hand over to root-cause-analysis when stable.

## Rules
- Never take a production action without a recorded authorization.
- Keep customer data out of the incident record.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
