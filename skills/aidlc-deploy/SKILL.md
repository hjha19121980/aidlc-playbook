---
name: aidlc-deploy
description: AIDLC Stage 5, Deploy. Use for layered AI review of pull requests, addressing review comments, approval gates, and CI/CD with tiered autonomy per environment. The agent acts up to the production gate and never past it.
---

# AIDLC Stage 5: Deploy, review both ways, gates enforced

## A. PR review loop
Prerequisites: project context `AGENTS.md`, a review policy `REVIEW.md` (see `aidlc-review-policy`), branch protection requiring a code owner.
1. Every PR gets the same review passes, run by the `reviewer` agent: bugs, security, and compliance against `spec.md`, `plan.md`, and design principles. Findings are tagged by pass and ranked Important or Nit.
2. Write `review-findings.md` or post the findings on the PR (git-review-pr skill). Findings never approve or block on their own; branch protection still needs a human code owner.
3. **Receiving reviews:** when a reviewer or author requests a fix on a comment, address it and push; the thread records both. A sweep routine can loop over unresolved comments and failing checks until the PR is green and waiting only on the code owner.
4. **Feed back:** when a review flags the same mistake twice, add the correction to `AGENTS.md` in that review. Review also flags when a change makes `AGENTS.md` outdated.
5. Monthly, the tech lead rates findings and caps Nit volume in `REVIEW.md`.
Separation of duties: the agent that wrote the code cannot approve it.

## B. Approval gates
Prerequisite: a written list of approvals the change process requires. Use `aidlc-guardrails` to express each gate as a deterministic check (git hook, required CI check, branch rule, or the assistant's hook feature). A block must explain itself and name the route to approval.

## C. CI/CD
1. Start with read-only judgment steps in the pipeline: triage a failed build, summarize a flaky test, draft the changelog (git-release-notes skill).
2. Add write steps behind existing gates (fix lint, update generated docs, address comments). Everything the agent writes arrives as a PR; it has no route to the main branch.
3. Run agent jobs sandboxed with short-lived scoped tokens and no standing production credentials; the pipeline log separates agent actions from the triggering engineer's.
4. Expose deploy, status, and rollback as scoped tools per environment, an allowlist rather than a script with credentials.
5. **Tier autonomy:** development, the agent deploys freely; staging, partially; production, the agent prepares the release and the release manager authorizes it, enforced by a gate.
6. **Rollback is the most rehearsed path.** One command, exercised regularly in staging.
7. Use the `release-coordinator` agent to prepare `docs/aidlc/changes/<id>/release.md` (checklist, rollout, rollback, links to evidence).

## Governance
Branch protection, a production gate with a named release manager, per-environment permission tiers, and findings, fixes, ratings, and approvals logged in PR history: the PR is the audit record.

## Measure
- Leading: time to first review; share of review comments resolved without a human touching the branch; share of pipeline failures triaged without paging.
- Lagging: defects caught before merge versus escaping; DORA measures.
