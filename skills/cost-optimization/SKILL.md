---
name: cost-optimization
description: Analyze run costs and propose savings (right-sizing, scheduling, storage tiers, waste) without hurting reliability. Use in periodic reviews.
---

# Cost optimization

Stage: Maintain. Produces: `docs/aidlc/operations/cost-review-<yyyymmdd>.md`.

## Steps
1. Collect cost data by service, environment, and tag.
2. Find waste: idle resources, oversized instances, unattached storage, over-retention, chatty services.
3. Estimate savings and risk for each proposal; protect SLOs.
4. Rank by saving per effort; propose small, reversible changes.
5. Track realized savings next period.

## Rules
- Do not change production resources without a change approval.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
