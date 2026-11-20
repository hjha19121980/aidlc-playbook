---
name: api-design
description: Design an API contract-first (resources, operations, errors, versioning, security) and produce an OpenAPI or schema draft. Use before implementing services or integrations.
---

# API design

Stage: Design. Produces: `docs/aidlc/changes/<id>/api-spec.md`.

## Steps
1. List consumers and use cases from the stories.
2. Define resources, operations, request and response schemas, pagination, filtering, and idempotency.
3. Define the error model, status codes, rate limits, and versioning and deprecation approach.
4. Specify authentication, authorization scopes, and data classification per field; mark personal data.
5. Write the contract (OpenAPI or schema) and example requests; note backward-compatibility impact on existing consumers.

## Rules
- Follow the organization's API policy skill if one exists (see aidlc-policy-skill).
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
