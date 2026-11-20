---
name: nfr-capacity-planning
description: Define measurable non-functional requirements (performance, availability, scalability, security, accessibility) and a capacity estimate. Use when a design must meet service levels.
---

# Non-functional requirements and capacity

Stage: Design. Produces: `docs/aidlc/changes/<id>/nfr.md`.

## Steps
1. List the quality attributes that matter for this change and who cares about each.
2. Write each as a measurable target with a method (for example p95 latency under 300 ms at 200 requests per second).
3. Estimate load, data growth, and peak patterns from the best available data; state the assumptions.
4. Identify scaling approach, bottlenecks, and cost implications.
5. Define how each target will be verified in Test and monitored in Maintain.

## Rules
- Targets without a measurement method are not requirements; mark them as open.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
