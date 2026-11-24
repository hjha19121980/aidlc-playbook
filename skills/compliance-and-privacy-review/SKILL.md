---
name: compliance-and-privacy-review
description: Screen an intent or spec for regulated data and privacy obligations (GDPR, HIPAA, PCI-DSS, data residency) and route open questions to the right internal experts. Use at Plan, before design starts.
---

# Compliance and privacy review

Stage: Plan. Produces: `docs/aidlc/changes/<id>/compliance.md`.

## Steps
1. Read the intent and any stories; list every data element the change collects, stores, moves, or exposes.
2. Classify each element (public, internal, confidential, personal, special-category, payment, health) and note its source, purpose, location, and retention.
3. Flag where regulated data appears and which regimes could apply; do not conclude that a regime does or does not apply.
4. List cross-border transfers, third-party processors, and AI or analytics uses of the data.
5. Write the open questions for each expert: Legal, Compliance, Data Privacy Officer, Security. Name an owner role and a needed-by gate.
6. Recommend privacy-by-design controls for the spec: minimization, masking, encryption, access, retention, audit logging.
7. Propose which items block the Plan gate.

## Rules
- Do not provide legal, financial, or regulatory advice; the output is a screening list for the Data Privacy Officer and Legal.
- Never copy real personal data into the artifact; use field names and classes only.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
