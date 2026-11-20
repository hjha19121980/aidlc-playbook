---
name: solution-architecture
description: Produce a solution architecture (context, containers, components) with Mermaid diagrams, technology choices, and quality attributes for an accepted intent. Use in Design.
---

# Solution architecture

Stage: Design. Produces: `docs/aidlc/changes/<id>/architecture.md`.

## Steps
1. Read `intent.md`, stories, existing architecture notes, and the knowledge index if present.
2. Draw the context view (users, external systems) and container view (deployables, data stores) as Mermaid diagrams; add a component view for the main container.
3. State technology choices with the reason and the alternatives rejected.
4. Map quality attributes (performance, availability, security, cost, operability) to design decisions.
5. List risks, assumptions, and open decisions with an owner.
6. Reference or create ADRs with the architecture-decision-record skill.

## Rules
- Prefer the simplest design that meets the requirements; justify added complexity.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
