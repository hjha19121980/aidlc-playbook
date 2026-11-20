---
name: e2e-test-authoring
description: Author stable end-to-end tests for the critical user journeys, with resilient selectors, test data setup, and clear failure output. Use for UI and full-flow checks.
---

# End-to-end test authoring

Stage: Test. Produces: test files in the diff.

## Steps
1. Pick the journeys from the stories that matter most; keep the suite small.
2. Set up and clean up data through APIs, not through the UI.
3. Use accessible, stable selectors and explicit waits for state, not fixed delays.
4. Capture screenshots and traces on failure; compare screenshots with the design where specified.
5. Run repeatedly to detect flakiness; fix or quarantine with an owner and a ticket.

## Rules
- Do not run against production.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
