---
name: api-implementation
description: Implement an endpoint or integration from an approved API spec, with validation, error handling, authorization, and tests. Use in Build after plan.md is accepted.
---

# API implementation

Stage: Build. Produces: the diff.

## Steps
1. Read the API spec and the matching plan tasks.
2. Implement validation, authorization, business logic, and the error model exactly as specified.
3. Add unit and integration tests for success, validation errors, authorization failures, and edge cases.
4. Update the contract or docs if the implementation needed a justified deviation, and update `plan.md` in the same commit.
5. Run build, tests, and lint and show the output.

## Rules
- Never log personal data or secrets.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
