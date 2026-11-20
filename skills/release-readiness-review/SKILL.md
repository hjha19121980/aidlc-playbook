---
name: release-readiness-review
description: Check whether a release is ready - evidence, open defects, risks, operations readiness, and rollback rehearsal, and give a go or no-go recommendation. Use before production authorization.
---

# Release readiness review

Stage: Deploy. Produces: `docs/aidlc/changes/<id>/readiness-review.md`.

## Steps
1. Collect the evidence: tests, review findings, security findings, performance results, defects.
2. Check operations readiness: monitoring, alerts, runbook, on-call, capacity, data migration, backups.
3. Confirm the rollback was rehearsed recently and how long it takes.
4. List open risks and the approvals recorded; mark any that are missing.
5. Recommend go, conditional go, or no-go with reasons; the release manager decides.

## Rules
- You recommend; a named release manager authorizes production.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
