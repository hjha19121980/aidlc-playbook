---
name: aidlc-test
description: AIDLC Stage 4, Test. Use to give the agent a feedback loop so it verifies its own work (tests, build, visual check), to fix bugs test-first, and to produce test-report.md evidence before a human reviews.
---

# AIDLC Stage 4: Test, a feedback loop that runs through the whole task

The loop runs as many times as the work. It is not the same as the `verifier` agent, which is a final check in a fresh context so the verdict is not colored by the assumptions that produced the code.

Prerequisite: a build and a test suite that each run locally with one command and exit non-zero on failure.

## Steps
1. **Wrap checks** into single commands (for example `make test`, `npm test`) and list them with a sample healthy output in `AGENTS.md`.
2. **State quantifiable targets** before coding: "all tests in `test_status` pass", "the endpoint returns 200 with the new field", "the screenshot matches the mock".
3. **Bug fixes, test first:** reproduce the bug as a test, run it, confirm it fails for the expected reason, commit that test. Only then fix the code without editing the test.
4. **UI work:** give the agent a way to see the result (browser tool or screenshot utility) and the mock. Implement, screenshot, compare, adjust; two or three rounds is normal.
5. **Make verification part of done:** run build, tests, and lint before reporting completion and paste the literal output.
6. **Protect the loop:** an agent fixing code must not weaken the check on that code. Block edits to test files during a fix task (guard check, see `aidlc-guardrails`) or reject any test change in review.
7. Run the `verifier` agent for the fresh-context final check.
8. Write `test-report.md` (`docs/aidlc/templates/test-report.md`): commands, literal output, coverage of each `R-n`, known gaps, and defects found. Attach the same evidence to the PR check run.
9. For regression protection of the agent configuration itself, see `aidlc-evals`.

## Governance
- Enforced: verification before done; no test edits during fixes.
- Evidence: toolchain output, build log, screenshot diff, not the agent's prose.
- Approver: the code owner reviewing the PR, who can focus on intent and risk because mechanical evidence is attached.

## Measure
- Leading: first-pass CI success rate for agent-written changes.
- Lagging: review time per PR; change failure rate.
