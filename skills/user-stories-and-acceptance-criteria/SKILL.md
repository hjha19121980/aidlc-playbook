---
name: user-stories-and-acceptance-criteria
description: Write user stories with testable Given/When/Then acceptance criteria from intent.md or a ticket, sliced small enough to build in a few days. Use when refining the backlog.
---

# User stories and acceptance criteria

Stage: Plan. Produces: `docs/aidlc/changes/<id>/stories.md`.

## Steps
1. Read `intent.md` and identify user roles and goals.
2. Write stories as: As a <role> I want <capability> so that <benefit>.
3. Add acceptance criteria in Given/When/Then form, including at least one failure or edge case per story.
4. Slice stories vertically so each delivers value alone; split anything larger than about three days.
5. Mark dependencies, open questions, and non-functional needs (performance, accessibility, security) per story.
6. Number the stories so `spec.md` requirements and tests can reference them.

## Rules
- Avoid vague words (fast, easy, intuitive) without a measurable target.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
