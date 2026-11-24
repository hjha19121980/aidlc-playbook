---
name: framework-upgrade
description: Upgrade a language runtime or framework across major versions (for example Java, .NET, Angular, Node, Python) in safe, testable steps. Use when the change is bigger than a dependency bump.
---

# Framework upgrade

Stage: Build. Produces: `docs/aidlc/changes/<id>/upgrade-plan.md` and a series of small pull requests.

## Steps
1. Identify current and target versions, support end dates, and the vendor migration guide.
2. Run impact-analysis and dependency-analysis; list breaking changes, removed APIs, and incompatible libraries.
3. Confirm a green baseline; add characterization tests where coverage is thin (coverage-gap-analysis).
4. Plan the path in the smallest safe hops, one major version at a time where the vendor advises it.
5. Apply mechanical changes first (codemods, build config), then behavioral changes, in separate commits.
6. After each hop run build, tests, and the security scan; record failures and fixes.
7. Update CI images, container bases, and documentation; plan rollback for each hop.

## Rules
- Never mix upgrade and feature changes in one pull request.
- Use only APIs documented for the target version; mark unverified claims [ASSUMPTION].
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
