---
name: threat-modeling
description: Identify threats to a design with a structured method (for example STRIDE), rate them, and propose mitigations and tests. Use before building anything that handles data, identity, or external input.
---

# Threat modeling

Stage: Design. Produces: `docs/aidlc/changes/<id>/threat-model.md`.

## Steps
1. Draw or read the data flow: actors, trust boundaries, processes, data stores, flows.
2. For each element and flow apply the threat categories (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege).
3. Rate each threat (likelihood and impact) and list the existing control.
4. Propose mitigations and map them to requirements and tests.
5. List accepted risks with a named approver and flag items for the security team.

## Rules
- Do not give exploit details beyond what is needed to justify the mitigation.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
