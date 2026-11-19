---
name: aidlc-policy-skill
description: Write an organization policy as a skill (security standard, API convention, brand rule, compliance control) so agents apply institutional knowledge consistently. Use when a rule is enforced inconsistently today.
---

# AIDLC: Policy skills as institutional knowledge

Rule of thumb: write a skill for knowledge that must be applied consistently. Do not write a skill for something that belongs in `AGENTS.md` or a one-off prompt.

Prerequisite: one policy with a named owner and a written source of truth.

## Steps
1. Pick one piece of knowledge enforced inconsistently today (security standard, API design convention, brand rule, UX standard, compliance control).
2. Create a folder `skills/<policy-name>/` with `SKILL.md`. The frontmatter says **when it triggers** (be specific, include the verbs and objects people will use); the body says **what to do**: numbered, testable rules, and any script to run with its expected output.
3. Start from `docs/aidlc/templates/policy-skill.md`.
4. Ship it with the code, or distribute it organization-wide through your internal package or marketplace.
5. **Test that it triggers:** ask for the relevant task in several different ways and confirm the skill loads each time.
6. When policy changes, change the skill and have the policy owner sign off the change in the PR.
7. Add the skill to the list that `aidlc-design` loads.

## Important
A skill is an **advisory** control: it makes the agent likely to apply the policy, but nothing forces it. A policy that must always hold needs a deterministic backstop: a guard check that blocks the action, or a review pass that re-checks the policy at the PR (see `aidlc-guardrails`). The skill makes violations rare; the guard makes them close to impossible.

## Measure
- Leading: time from the policy owner approving a change to the updated skill merging.
- Lagging: PR review findings that cite the policy; they should fall toward zero. If they do not, the skill is not triggering or its text drifted from the policy.
