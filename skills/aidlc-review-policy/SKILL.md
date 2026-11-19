---
name: aidlc-review-policy
description: Write and tune REVIEW.md, the review policy that every AI review pass follows (passes, what counts as Important versus Nit, caps, exclusions). Use when setting up PR review or when review noise is high.
---

# AIDLC: Review policy (`REVIEW.md`)

Prerequisite: the tech lead who owns review standards.

## Steps
1. If `REVIEW.md` is missing, start from `docs/aidlc/templates/REVIEW.md` at the repo root.
2. Define the **passes** the organization cares about and tag every finding with its pass: bugs and logic errors; security and vulnerabilities; compliance with `spec.md`, `plan.md`, and design principles.
3. Define **Important** (would break behavior, leak data, or breach a policy) versus **Nit** (style, naming).
4. **Cap Nits** (for example five per review; summarize the rest as a count).
5. List what **not to report**: generated paths and anything CI already enforces.
6. **Set the human threshold:** findings do not approve or block alone; branch protection requires a code owner. A platform engineer may gate merges on severity counts published as a machine-readable tally by the check.
7. **Monthly tune:** rate findings, adjust the caps, and move repeated mistakes into `AGENTS.md`.

## Governance
The same policy applies to every PR. Findings, fixes, ratings, and approvals live in PR history. The agent that wrote the code cannot approve it.
