---
name: architecture-decision-record
description: Capture a significant technical decision as an ADR with context, options, decision, and consequences. Use whenever a choice is costly to reverse.
---

# Architecture decision record

Stage: Design. Produces: `docs/aidlc/decisions/ADR-<number>-<slug>.md`.

## Steps
1. Name the decision and its status (proposed, accepted, superseded).
2. Describe the context and forces: requirements, constraints, risks.
3. List the realistic options with pros, cons, and cost to reverse.
4. State the decision and the reasoning; list consequences, including new obligations.
5. Link the change, spec, and any superseded ADR. Number ADRs sequentially.

## Rules
- An ADR records a decision a named person made; mark who accepted it.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
