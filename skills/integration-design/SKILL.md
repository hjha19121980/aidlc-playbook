---
name: integration-design
description: Design asynchronous and system-to-system integrations - events, queues, file transfers, contracts, retries, idempotency, ordering, and failure handling. Use when two or more systems must exchange data.
---

# Integration design

Stage: Design. Produces: `docs/aidlc/changes/<id>/integration.md`.

## Steps
1. List the systems, owners, and the business event or data each integration carries.
2. Pick the style per flow (event, message queue, batch file, webhook, synchronous call) and justify it by volume, latency, and coupling.
3. Define each contract: schema, versioning rule, required and optional fields, and the owner who approves changes.
4. Specify delivery semantics: at-least-once or exactly-once effect, idempotency keys, ordering, deduplication.
5. Define failure handling: retries with backoff, dead-letter queue, poison messages, replay, and reconciliation.
6. Define security, throughput, monitoring, and alert signals; add a sequence diagram per flow.
7. Record decisions as ADRs (architecture-decision-record) and list contract tests needed (contract-testing).

## Rules
- Prefer a stable, versioned contract over shared database access.
- Do not invent endpoints or schemas; mark unknowns [ASSUMPTION].
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
