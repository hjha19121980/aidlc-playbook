---
name: aidlc-metrics
description: Measure whether AIDLC is working using leading and lagging indicators read from git history, PR metadata, and CI, for example time from intent to spec, rework after build, first-pass CI success, and repeat incidents.
---

# AIDLC: Metrics

Every stage has one leading and one lagging indicator, readable from artifacts already in version control. Report facts first, then interpretation, and label opinion as opinion.

## Steps
1. Read `docs/aidlc/changes/*` and the git history for the artifact files.
2. Compute per change and in aggregate (median and spread, not only averages):

| Stage | Leading | Lagging |
|---|---|---|
| Plan | time from first commit to accepted `intent.md` | share of intents accepted into Design; `intent.md` edits after first `spec.md` |
| Design | time from `intent.md` to `spec.md` commit | `spec.md` commits after first `plan.md` commit |
| Build | share merged from first pass; plan approval to merged PR | rework cycles per change; diff still matches `plan.md` |
| Test | first-pass CI success for agent-written changes | review time per PR; change failure rate |
| Deploy | time to first review; comments resolved without human touch | defects caught before merge versus escaping |
| Maintain | breach to `intent.md` in triage queue | findings that become merged fixes; repeat incidents |

3. Output a short report with a table, the three biggest movements since last period, and suggested actions. Save to `docs/aidlc/metrics/<yyyy-mm>.md`.
4. State data gaps explicitly (for example a metric the tooling does not capture) instead of estimating.

## Rules
Do not rank individuals. Use metrics to improve the process.
