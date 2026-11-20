---
name: aidlc-maintain
description: AIDLC Stage 6, Maintain. Use to close the loop - watch metrics against control bands, diagnose breaches, write findings as a new intent.md, run incident reviews, and keep a lessons file. Detection stays deterministic.
---

# AIDLC Stage 6: Maintain, close the loop

A trigger (control-band breach, ticket, channel message, schedule) invokes the agent with no person in the invocation path. The agent diagnoses, acts only through gated routes, and writes what it finds as `intent.md`. People triage and review; they no longer have to start the work.

Prerequisites: `intent.md` format (Stage 1), PR review and gates (Stage 5), a rollback path, a metrics store the detection script can query.

## Steps
1. **Pick one metric** with a stable rolling baseline (CI test failure rate, post-deploy error rate, PR cycle time).
2. **Detection script:** deterministic, version-controlled, unit tested (mean and standard deviation over a rolling window with drift rules). No model in detection.
3. **Tiers in config** (`docs/aidlc/monitoring/bands.yaml`):
   - 1 sigma: log only.
   - 2 sigma: invoke the `incident-diagnostician` agent read-only to diagnose.
   - 3 sigma: the agent may propose, only by opening a PR into the review gate or triggering a pre-approved runbook.
4. **Trigger layer:** scheduled workflow, monitoring webhook, or scheduler inside the network. Runs are stateless and non-interactive, sandboxed, without production credentials.
5. **Write the finding** as `intent.md` (anomaly and evidence, proposed outcome, affected systems, open questions) plus `incident.md` (`docs/aidlc/templates/incident.md`) for timeline and cause. It then flows through the stages like any change.
6. **Confidence gate:** between headless stages an independent check (deterministic script or the `confidence-gate` adversarial reviewer) decides whether output continues or escalates to a human.
7. **Triage:** the service owner or on-call engineer routes findings: fix now, schedule, or dismiss. Route product-facing items to the product owner. Dismissals tune the bands.
8. **After a fix ships:** add an eval for the incident (`aidlc-evals`) and write lessons to `docs/aidlc/lessons/<yyyy-mm>-<slug>.md` for future investigations.
9. **Channel incidents:** an agent in the incident channel under its own identity can act as first responder, but any rollback or production action still needs a named human to authorize in the thread. Small bounded fixes arrive as PRs; larger work becomes `intent.md`.

## Examples
- Test failure rate breaches 3 sigma: quarantine the flaky test or open a revert PR; the review gate decides.
- Error rate breaches 3 sigma with a deploy in the window: trigger the existing rollback pipeline (pre-approved runbook).
- PR cycle time trips a drift rule: write a report for engineering leadership.

## Governance
Tier boundaries come from version-controlled config; permissions deny production access; invocations, findings, and triage decisions are logged with timestamps; resulting changes pass the normal review gate; runbooks the agent may trigger were approved in advance.

## Measure
- Leading: time from band breach to an `intent.md` in the triage queue.
- Lagging: share of findings that become merged fixes; repeat incidents of the same class.
