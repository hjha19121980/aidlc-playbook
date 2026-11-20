---
name: defect-triage
description: Reproduce, classify, and prioritize defects, write clear reports with steps and evidence, and link them to requirements. Use during and after testing.
---

# Defect triage

Stage: Test. Produces: `docs/aidlc/changes/<id>/defects.md`.

## Steps
1. Reproduce the defect and record exact steps, expected result, actual result, and environment.
2. Classify by severity and priority, and by type (functional, performance, security, usability).
3. Find the likely cause and the affected requirement or story.
4. Check for duplicates and for a related incident or eval.
5. Propose the owner and next step; for fixes use test-first (see aidlc-test).

## Rules
- Do not close a defect without evidence that it is fixed.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
