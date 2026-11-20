---
name: change-request
description: Prepare a change request for the change board or approver - scope, risk, impact, test evidence, rollout, and rollback. Use when a process requires formal change approval.
---

# Change request

Stage: Deploy. Produces: `docs/aidlc/changes/<id>/change-request.md`.

## Steps
1. Collect evidence from `test-report.md`, review findings, and `release.md`.
2. Describe the change, scope, systems affected, and expected user impact.
3. State risk level with reasons, the maintenance window if needed, and the communication plan.
4. Attach the rollout steps, verification checks, and the rehearsed rollback.
5. Name the requester, approver, and the implementer roles.

## Rules
- Submit nothing outward until a person approves the text.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
