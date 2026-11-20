---
name: generate-meeting-minutes
description: Turn a transcript, recording notes, or chat log into structured meeting minutes with decisions, action items (owner and due date), risks, and open questions. Use after workshops, refinement sessions, and stakeholder meetings.
---

# Generate meeting minutes

Stage: Plan. Produces: `docs/aidlc/changes/<id>/minutes/<yyyymmdd>-<topic>.md`.

## Steps
1. Collect the raw notes or transcript and the meeting purpose, date, and attendees by role.
2. Extract **Decisions** (what was decided, by whom), **Action items** (task, owner, due date), **Risks and blockers**, and **Open questions**.
3. Write a summary of at most five sentences, then the sections above. Keep quotes short and only where wording matters.
4. Flag anything ambiguous (unclear owner, missing date, conflicting statements) in a **To confirm** list rather than guessing.
5. Offer to draft follow-up items for `intent.md` open questions or tickets, and to send nothing until a person approves.

## Rules
- Do not attribute statements to a person unless the notes say so.
- Do not include personal, health, or HR details; ask before sharing minutes outside the attendee list.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
