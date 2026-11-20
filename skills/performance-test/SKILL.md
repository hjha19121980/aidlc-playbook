---
name: performance-test
description: Design and analyze load, stress, and endurance tests against the non-functional targets, and report bottlenecks. Use when targets are defined.
---

# Performance testing

Stage: Test. Produces: `docs/aidlc/changes/<id>/performance-report.md`.

## Steps
1. Read the NFR targets and the expected load model.
2. Define scenarios, ramp profiles, data, and success thresholds; use a production-like environment.
3. Run the tests and capture latency percentiles, throughput, error rate, and resource use.
4. Identify bottlenecks with evidence (profiles, traces, queries) and propose fixes.
5. Report pass or fail per target and the confidence in the result.

## Rules
- Do not load-test shared or third-party systems without approval.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
