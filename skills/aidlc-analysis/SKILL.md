---
name: aidlc-analysis
description: Run the full brownfield analysis before Plan or Build - repository map, knowledge index, knowledge graph, dependency and impact analysis, summarized in one analysis pack. Use when starting work on an existing system.
---

# AIDLC analysis pack

Stage: Build. Produces: `docs/aidlc/analysis/analysis-pack.md`.

## Steps
1. Confirm scope: the repository, the change or area of interest, and the depth needed.
2. Run analyze-repository, then knowledge-index and knowledge-graph; run dependency-analysis and tech-debt-assessment where relevant.
3. If a change is defined, run impact-analysis against the graph.
4. Combine into `analysis-pack.md`: one-page summary, architecture map, hotspots and risks, unknowns, and recommended next skill (plan, design, or build).
5. List every artifact produced with its path and the commit SHA analyzed.

## Rules
- Analysis is read-only. Report what is verified and what is inferred.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
