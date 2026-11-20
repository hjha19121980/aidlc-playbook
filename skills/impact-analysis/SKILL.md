---
name: impact-analysis
description: Determine what a proposed change affects - code, data, interfaces, consumers, tests, documentation, and operations, with a risk rating. Use before writing plan.md for brownfield work.
---

# Impact analysis

Stage: Build. Produces: `docs/aidlc/changes/<id>/impact-analysis.md`.

## Steps
1. State the proposed change from `spec.md` in one paragraph.
2. Find direct usages (callers, importers, configuration references, schema uses) with search, and follow them to indirect dependents.
3. List affected: modules, public interfaces and consumers, data and migrations, jobs and integrations, tests, documentation, monitoring, and deployment.
4. Rate each impact (low, medium, high) with the evidence; list what you could not verify.
5. Recommend test scope and a safe rollout order; feed the result into `plan.md`.

## Rules
- Distinguish confirmed impacts from suspected ones.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
