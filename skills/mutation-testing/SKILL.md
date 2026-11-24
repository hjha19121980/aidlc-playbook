---
name: mutation-testing
description: Measure how well tests detect defects by mutating code and checking the suite fails, then strengthen weak tests. Use to validate AI-generated or high-risk tests.
---

# Mutation testing

Stage: Test. Produces: `docs/aidlc/changes/<id>/mutation-report.md`.

## Steps
1. Pick the scope: changed files or a critical module; confirm tests pass first.
2. Select the language tool (for example PIT, Stryker, mutmut, Infection) and run it on the scope.
3. Record the mutation score and list surviving mutants by file and line.
4. Classify survivors: missing assertion, missing case, equivalent mutant, or dead code.
5. Add or strengthen tests for real gaps; mark equivalent mutants with a reason.
6. Re-run and record the new score; propose a threshold for CI on changed code.

## Rules
- Do not weaken production code to raise the score.
- Report the score as measured; do not estimate it.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
