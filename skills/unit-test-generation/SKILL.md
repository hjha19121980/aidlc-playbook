---
name: unit-test-generation
description: Generate meaningful unit tests for changed code covering behavior, edge cases, and failure paths, in the project's test style. Use alongside implementation.
---

# Unit test generation

Stage: Test. Produces: test files in the diff.

## Steps
1. Read the changed code and the existing tests to match style and tools.
2. List behaviors and edge cases (empty, null, boundaries, invalid input, errors, concurrency where relevant).
3. Write independent, deterministic tests with clear names; avoid testing implementation details.
4. Run the tests; verify each new test fails when the behavior is broken (mutate or revert a line).
5. Report coverage of the changed lines and remaining gaps.

## Rules
- Never weaken or delete an existing test to make a build pass.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
