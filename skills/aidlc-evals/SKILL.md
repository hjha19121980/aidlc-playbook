---
name: aidlc-evals
description: Build and run continuous evals, the AIDLC equivalent of stage-gate QA, so changes to agent configuration (project context, skills, agents, guard rules) or to the underlying model are regression-tested like code.
---

# AIDLC: Continuous evals

The configuration that steers an agent deserves the regression testing code gets. When a model is swapped or a skill is rewritten, the suite says whether the agent still does the work to the same standard. Keep the suite live: as models improve, cases stop discriminating, so add new ones from monitoring.

Prerequisite: project context and a feedback loop (`aidlc-project-context`, `aidlc-test`); CI that can run the agent non-interactively, with budget for runs.

## Steps
1. The platform engineer collects **20 to 50 real tasks** from recent work, each with its accepted outcome.
2. Write each as an eval file in `evals/` (`evals/example.json`): the prompt plus the checks that define acceptable (tests pass, lint clean, behavior unchanged, policy followed).
3. Add a runner script `evals/check.sh` that runs a check list and exits non-zero on failure.
4. Run the suite **non-interactively in CI** on a schedule and on any change to project context, skills, agents, or guard rules (`docs/aidlc/templates/ci/agent-evals.github.yml` is a starting point; substitute your agent command).
5. **Gate configuration changes** on the results: a change that drops the pass rate is reviewed before it merges.
6. **Each production incident gets an eval**, written by the team that owned it, kept as a regression test.
7. Some teams run evals offline on a cadence instead of every change; both are valid.

## Governance
The pass-rate threshold is a merge check; runs are logged for comparison over time; the team that owns the configuration change approves it.

## Measure
- Leading: eval pass rate over time; how long an incident takes to become a permanent eval.
- Lagging: regressions caught in CI versus found in production.
