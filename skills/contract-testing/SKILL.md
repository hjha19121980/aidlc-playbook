---
name: contract-testing
description: Write consumer-driven or schema-based contract tests so services and clients can change independently without breaking each other. Use for APIs, events, and message integrations.
---

# Contract testing

Stage: Test. Produces: contract tests and `docs/aidlc/changes/<id>/contracts.md`.

## Steps
1. List providers, consumers, and each interface (REST, GraphQL, event, message) from api-design or integration-design.
2. Choose the approach per interface: consumer-driven contracts, schema validation against OpenAPI or AsyncAPI, or recorded examples.
3. Write consumer tests that state only the fields and behaviors the consumer relies on.
4. Write provider verification that replays those contracts against the provider in CI.
5. Define the compatibility rule (backward and forward) and how breaking changes are versioned and announced.
6. Wire the checks into CI as required status checks and publish contracts to a shared location.

## Rules
- Test the contract, not the internal logic of the provider.
- Use synthetic data only (test-data-generation); never real personal data.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
