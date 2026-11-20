---
name: feature-flag-rollout
description: Plan and implement a progressive rollout with feature flags - audiences, stages, metrics, and a kill switch. Use to reduce release risk.
---

# Feature flag rollout

Stage: Deploy. Produces: `docs/aidlc/changes/<id>/rollout-plan.md`.

## Steps
1. Define the flag, its default, owner, and removal date.
2. Plan stages (internal, small percentage, wider, all) with the metrics and thresholds to advance or stop.
3. Ensure the flag is testable in both states and the off state is safe.
4. Define the kill switch and who may use it.
5. Remove the flag and dead code once fully rolled out.

## Rules
- Flags that outlive their purpose are debt; set a removal date.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
