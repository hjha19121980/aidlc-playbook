---
name: tech-debt-assessment
description: Find and rank technical debt (complexity, duplication, missing tests, outdated frameworks, fragile areas) with evidence and a remediation order. Use to plan refactoring and justify it.
---

# Technical debt assessment

Stage: Build. Produces: `docs/aidlc/analysis/tech-debt.md`.

## Steps
1. Use the repository map to choose areas; measure with available tools (size, complexity, churn, coverage, failing or flaky tests).
2. List debt items with location, symptom, cost of leaving it, and effort to fix.
3. Rank by risk and benefit; group into quick wins and larger investments.
4. Link items to upcoming changes where fixing them lowers risk.
5. Propose backlog items in the intent format so a person can accept them.

## Rules
- Base ranking on evidence, not taste.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
