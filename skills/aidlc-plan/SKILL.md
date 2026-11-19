---
name: aidlc-plan
description: AIDLC Stage 1, Plan. Use to turn an idea, ticket, or incident finding into a committed intent.md (a proto-spec in the originator's own words) for the product owner to accept.
---

# AIDLC Stage 1: Plan, capture as `intent.md`

Goal: capture intent once, in the originator's words, as a version-controlled file the next stage can act on. No formal language is required from the originator.

Prerequisite: none. Use the `intent-analyst` agent for the interview if available.

## Steps
1. Create `docs/aidlc/changes/<yyyymmdd>-<slug>/` (the `aidlc-workflow` skill does this).
2. **Interview** the originator like an analyst: what can't they do today, who is affected, what does better look like, what is out of scope, what constraints apply, what does success look like. Ask a few questions at a time. Do not invent answers.
3. **Draft `intent.md`** from `docs/aidlc/templates/intent.md`: problem, proposed outcome, affected users and systems, constraints, open questions.
4. The originator corrects anything misunderstood. Mark inferred statements `[ASSUMPTION]`.
5. Commit `intent.md` (git-commit skill). Author and timestamp join the record.
6. Set `status: draft` and notify the product owner. The product owner accepts or closes it; acceptance is recorded as the merge or closing review.

Intent can also arrive from a ticket or from an incident finding written by `aidlc-maintain`. The same steps apply.

## Governance
- Evidence: the committed `intent.md` with author, timestamp, revision history.
- Approver: product owner. Only an accepted intent starts Stage 2.
- Flag regulated data (GDPR, HIPAA, PCI-DSS) for the Data Privacy Officer.

## Measure
- Leading: time from first conversation to committed `intent.md` (git history). Expect hours, not weeks.
- Lagging: share of intents accepted into Design; edits to `intent.md` after the first `spec.md` commit.
