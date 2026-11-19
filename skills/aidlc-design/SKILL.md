---
name: aidlc-design
description: AIDLC Stage 2, Design. Use to turn an accepted intent.md into a requirements-and-design spec.md in one session, constrained by the organization's policy skills, with concerns flagged for the product owner.
---

# AIDLC Stage 2: Design, requirements and design in one session

Prerequisite: `intent.md` with status `accepted`, and policy skills (brand, security, compliance, UX) available. Use the `spec-author` agent if available.

## Steps
1. Read `intent.md`. Carry its open questions forward until answered.
2. Load the organization's policy skills (see `aidlc-policy-skill`) and read the project context file `AGENTS.md`.
3. Produce `spec.md` from `docs/aidlc/templates/spec.md`: requirements (`R-n`, testable), design (components, data, interfaces, error handling), policy conformance (one line per policy skill applied), acceptance criteria, out of scope.
4. **Flag concerns** in a dedicated section: anywhere policies contradict, anything unverifiable, risks, and decisions that need a named owner. State clearly what you could not satisfy.
5. Product owner reviews against the idea: does it solve the stated problem; are open questions answered or carried forward?
6. Resolve flagged concerns with the policy owners before engineering sees the spec.
7. Commit `spec.md` next to `intent.md`. The pair records what was asked and what was decided.
8. A person decides whether to progress to Build, consulting a tech lead for higher-risk changes. Accepting the spec starts the plan step in Stage 3.

## Automation (optional, later)
Once stable, make "intent accepted" the trigger for a non-interactive job that drafts `spec.md` and opens a pull request for review. The product owner's first involvement is then the review.

## Governance
- Policy is applied while the spec is written, not discovered in review weeks later.
- Log the spec, the prompt, and the policy skill versions in force. Flagged concerns go to named policy owners.

## Measure
- Leading: time between `intent.md` and `spec.md` commits.
- Lagging: requirements rework after build starts (`spec.md` commits after the first `plan.md` commit).
