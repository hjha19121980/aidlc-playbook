---
name: estimation-and-planning
description: Produce a range-based estimate and delivery plan (milestones, dependencies, risks, assumptions) from the stories. Use when committing to scope and dates.
---

# Estimation and delivery planning

Stage: Plan. Produces: `docs/aidlc/changes/<id>/delivery-plan.md`.

## Steps
1. Break the work into tasks from the stories; note size drivers and unknowns.
2. Estimate as ranges (best, likely, worst) per task, with the basis (similar past work, spike needed).
3. Sequence by dependencies; identify the critical path and parallel streams.
4. List assumptions, risks that could move the dates, and what a spike or prototype would resolve.
5. Output milestones with a date range and a confidence statement; never a single false-precision date.

## Rules
- Say plainly that estimates are forecasts; list what would invalidate them.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
