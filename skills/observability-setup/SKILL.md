---
name: observability-setup
description: Define logs, metrics, traces, dashboards, and alerts for a service, tied to user impact and SLOs. Use when a service goes live or an incident revealed a blind spot.
---

# Observability setup

Stage: Maintain. Produces: `docs/aidlc/observability/<service>.md`.

## Steps
1. List the user journeys and the signals that show they work (rate, errors, duration, saturation).
2. Define structured logging fields, trace propagation, and metric names; keep personal data out of logs.
3. Design dashboards for the on-call view first.
4. Define alerts on symptoms, not causes, with thresholds, owners, and runbook links.
5. Review alert noise monthly and remove or tune alerts nobody acts on.

## Rules
- Never log secrets or personal data.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
