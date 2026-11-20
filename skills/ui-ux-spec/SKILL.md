---
name: ui-ux-spec
description: Specify screens, flows, states, content, and accessibility for a user-facing change, referencing designs from the design tool. Use for front-end work.
---

# UI and UX specification

Stage: Design. Produces: `docs/aidlc/changes/<id>/ux-spec.md`.

## Steps
1. Read the stories and any design frames (see aidlc-connectors for the design tool).
2. Describe each screen and flow: purpose, components, states (empty, loading, error, success), and copy.
3. Specify responsive behavior, keyboard and screen-reader behavior, color contrast, and localization needs.
4. List design tokens or components to reuse and any new component needed.
5. Define the visual check the Test stage will use to compare the result with the design.

## Rules
- Do not ship content that contains real personal data in examples.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
