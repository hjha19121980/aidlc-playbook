---
name: database-migration
description: Write and verify schema and data migrations that are reversible, safe under load, and tested on realistic data. Use when the data model changes.
---

# Database migration

Stage: Build. Produces: migration files and `plan.md` updates.

## Steps
1. Read the data-model design and the migration plan.
2. Write forward and backward migrations; prefer additive, expand-then-contract steps.
3. Test on a copy with realistic volume; record duration and locks.
4. Define the rollback and the checks that confirm success.
5. Do not apply to shared or production environments without the recorded approval.

## Rules
- Migrations are protected paths: they need an approval before merging.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
