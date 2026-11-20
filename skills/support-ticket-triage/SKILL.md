---
name: support-ticket-triage
description: Classify and route support tickets, identify duplicates and known issues, suggest answers from the knowledge base, and escalate real defects as intents. Use for support and on-call queues.
---

# Support ticket triage

Stage: Maintain. Produces: triage notes in the ticket tool and `intent.md` for confirmed defects.

## Steps
1. Read the ticket through the connector; classify type, severity, product area, and user impact.
2. Search known issues and the knowledge base for a matching answer; check for duplicates.
3. Draft a reply for human approval; do not send anything to a customer yourself.
4. For a confirmed defect or request, draft an `intent.md` and link the ticket.
5. Record patterns monthly to feed backlog prioritization.

## Rules
- Customer data stays in the ticket tool; do not copy it into the repository.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
