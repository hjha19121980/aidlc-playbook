---
name: slo-definition
description: Define service level indicators, objectives, and error budgets with the stakeholders, and the actions when the budget is spent. Use when committing to reliability.
---

# SLO definition

Stage: Maintain. Produces: `docs/aidlc/observability/<service>-slo.md`.

## Steps
1. Pick indicators that reflect user experience (availability, latency, correctness, freshness).
2. Set targets with the product owner from data and business need; define the window.
3. Compute the error budget and agree the policy when it is exhausted (freeze features, prioritize reliability).
4. Specify the measurement query and the source of truth.
5. Review quarterly against actual behavior.

## Rules
- Targets must be measurable and agreed, not aspirational.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
