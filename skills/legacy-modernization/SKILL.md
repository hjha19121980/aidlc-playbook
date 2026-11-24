---
name: legacy-modernization
description: Plan the modernization of a legacy application or mainframe workload - disposition per component (retain, rehost, replatform, refactor, replace, retire), sequencing, coexistence, and risk. Use after legacy analysis.
---

# Legacy modernization

Stage: Build. Produces: `docs/aidlc/changes/<id>/modernization.md`.

## Steps
1. Read the existing analysis (cobol-legacy-analysis, analyze-repository, knowledge-graph) and list components, interfaces, and data stores.
2. Assign each component a disposition and justify it by business value, technical health, risk, and cost.
3. Choose the migration pattern per slice (strangler fig, parallel run, big bang, data-first) and the seams where old and new coexist.
4. Plan data migration and synchronization (database-migration), including cutover and reconciliation.
5. Define the behavior-preservation tests: characterization tests, golden outputs, and parallel-run comparisons.
6. Sequence slices into small releases, each with rollback (rollback-and-disaster-recovery).
7. Record risks and skill or knowledge dependencies (risk-assessment, tech-debt-assessment).

## Rules
- Do not propose a full rewrite without evidence that incremental paths fail.
- Business rules extracted from code must be confirmed by a business owner before they are treated as requirements.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
