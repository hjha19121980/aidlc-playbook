---
name: rollback-and-disaster-recovery
description: Define rollback procedures and disaster recovery plans with RTO, RPO, backup, restore, and failover steps, and verify they work. Use before a release and when setting resilience targets.
---

# Rollback and disaster recovery

Stage: Deploy. Produces: `docs/aidlc/changes/<id>/rollback-dr.md`.

## Steps
1. List what the release changes: code, configuration, schema, data, infrastructure, feature flags.
2. Write the rollback for each, in order, with the trigger, the owner role, the expected duration, and how to confirm success.
3. Mark non-reversible steps (data migrations, external notifications) and the mitigation or approval each needs.
4. Set RTO and RPO per service from the business impact; compare with the current design.
5. Define backup scope, frequency, retention, encryption, and restore location.
6. Define failover and failback steps, communication plan, and decision authority.
7. Schedule a rehearsal; record the result and gaps. Feed gaps to release-readiness-review.

## Rules
- A plan that has never been rehearsed is marked [UNVERIFIED].
- Production execution stays with the release manager gate.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
