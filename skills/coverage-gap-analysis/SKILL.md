---
name: coverage-gap-analysis
description: Compare tests to requirements and code to find untested behavior and risky untested paths. Use to decide where to add tests.
---

# Coverage gap analysis

Stage: Test. Produces: `docs/aidlc/changes/<id>/coverage-gaps.md`.

## Steps
1. Build a matrix of requirements and acceptance criteria against existing tests.
2. Read coverage data where available; look beyond line coverage to branches and error paths.
3. List untested but risky areas (security checks, money, data deletion, concurrency).
4. Rank gaps by risk and propose the cheapest effective test for each.
5. Report coverage honestly, including what the metric cannot show.

## Rules
- Do not chase a coverage number at the expense of meaningful tests.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
