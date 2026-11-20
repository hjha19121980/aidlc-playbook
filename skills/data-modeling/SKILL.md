---
name: data-modeling
description: Design the data model (entities, relationships, keys, constraints, retention, classification) and the migration approach. Use when a change adds or alters stored data.
---

# Data modeling

Stage: Design. Produces: `docs/aidlc/changes/<id>/data-model.md`.

## Steps
1. Identify entities and their relationships from the stories and glossary.
2. Draw an entity relationship diagram in Mermaid; define keys, constraints, indexes, and expected volumes.
3. Classify each field (public, internal, confidential, personal) and define retention and deletion.
4. Plan the migration: forward steps, backward compatibility, backfill, rollback, and expected downtime.
5. Note reporting, audit, and consistency requirements.

## Rules
- Flag personal and regulated data for the Data Privacy Officer.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
