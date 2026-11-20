---
name: risk-assessment
description: Identify and rate delivery, technical, security, compliance, and operational risks with mitigations and owners. Use during Plan and refresh at each gate.
---

# Risk assessment

Stage: Plan. Produces: `docs/aidlc/changes/<id>/risks.md`.

## Steps
1. Read the intent, stories, and plan; list risks by category.
2. Rate likelihood and impact (low, medium, high) and compute a priority.
3. For each risk write a mitigation, a trigger that shows it is happening, an owner role, and a decision date.
4. Flag regulated data (GDPR, HIPAA, PCI-DSS) and refer it to the Data Privacy Officer and Compliance.
5. Propose which risks need a gate decision before work continues.

## Rules
- Do not provide legal or regulatory advice; route it to Legal or Compliance.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
