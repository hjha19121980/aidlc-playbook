---
name: test-data-generation
description: Generate realistic but synthetic test data that respects constraints and covers edge cases, without personal or production data. Use when tests need data.
---

# Test data generation

Stage: Test. Produces: test fixtures in the diff.

## Steps
1. Read the schema, constraints, and the scenarios that need data.
2. Generate data with realistic distributions and boundaries (empty, long, unicode, dates, currencies).
3. Keep it deterministic: use a fixed seed and check the data into fixtures or a generator.
4. Include relationships and invalid cases for negative tests.
5. Verify no real names, emails, or identifiers appear.

## Rules
- Never copy production data, even masked, without Data Privacy Officer approval.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
