---
name: test-strategy
description: Define a risk-based test strategy (levels, scope, environments, data, entry and exit criteria) for a change. Use at the start of Test or during planning.
---

# Test strategy

Stage: Test. Produces: `docs/aidlc/changes/<id>/test-strategy.md`.

## Steps
1. Read the spec, risks, and threat model; list what must not break.
2. Choose levels (unit, integration, contract, end-to-end, performance, security, accessibility) by risk, not by habit.
3. Define environments, data sources (synthetic only), tools, and who runs what.
4. Write entry criteria and exit criteria with measurable thresholds.
5. Map each requirement to the test levels that will prove it.

## Rules
- Never use production or personal data in tests.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
