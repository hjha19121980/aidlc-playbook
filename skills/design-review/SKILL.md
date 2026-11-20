---
name: design-review
description: Review a spec or architecture against requirements, policies, and good practice, and return ranked findings. Use before a spec is accepted.
---

# Design review

Stage: Design. Produces: `docs/aidlc/changes/<id>/design-review.md`.

## Steps
1. Read `intent.md`, `spec.md`, and the architecture and API artifacts.
2. Check coverage: every requirement maps to a component and a test idea; list unmapped items.
3. Check quality: security, privacy, resilience, operability, cost, simplicity, accessibility.
4. Check policy conformance against the loaded policy skills.
5. Return findings ranked Important or Nit with the evidence and a suggested fix; note decisions needing a named owner.

## Rules
- Findings do not accept or reject the spec; the product owner and tech lead decide.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
