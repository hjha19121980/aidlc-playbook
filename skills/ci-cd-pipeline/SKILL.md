---
name: ci-cd-pipeline
description: Design or improve a CI/CD pipeline (build, test, scan, package, deploy) for the platform in use, with gates and no secrets in the repository. Use when setting up or changing delivery.
---

# CI/CD pipeline

Stage: Deploy. Produces: pipeline files and `release.md` notes.

## Steps
1. Identify the platform and the current pipeline; list stages and their duration.
2. Define stages: build, unit tests, lint, security scans, packaging, deploy to each environment.
3. Add the gates from `aidlc-guardrails`: required checks, approvals, protected branches.
4. Use short-lived credentials from a secret store; cache dependencies; fail fast.
5. Produce build provenance and keep artifacts immutable and versioned.
6. Document how to run and debug the pipeline locally where possible.

## Rules
- No secrets in pipeline files. Agents write pipeline changes as a pull request only.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
