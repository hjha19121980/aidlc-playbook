---
name: dependency-upgrade
description: Upgrade a dependency or framework safely - read release notes, change in small steps, run tests, and report breaking changes. Use when the plan includes an upgrade.
---

# Dependency upgrade

Stage: Build. Produces: the diff and a short upgrade note.

## Steps
1. Read release notes and migration guides between the current and target version; list breaking changes that apply.
2. Upgrade one dependency (or one coherent group) per change.
3. Fix compile, test, and lint failures; avoid unrelated edits.
4. Run the full test suite and the dependency audit; record results.
5. Note rollback steps and anything that needs a runtime check in staging.

## Rules
- Respect the dependency owner's policy; do not bypass approved registries.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
