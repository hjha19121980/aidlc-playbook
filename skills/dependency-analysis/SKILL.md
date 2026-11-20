---
name: dependency-analysis
description: Inventory direct and transitive dependencies, versions, licenses, and ages, and flag risks. Use before upgrades and during onboarding.
---

# Dependency analysis

Stage: Build. Produces: `docs/aidlc/analysis/dependencies.md`.

## Steps
1. Read the manifests and lock files; list direct dependencies with version, latest known, and purpose.
2. Identify transitive hotspots, duplicates, abandoned packages, and unusual licenses.
3. Run the ecosystem audit tool if available and record the literal output.
4. Rank findings by risk and effort; propose an upgrade order.
5. Note policy (approved registries and licenses) and who owns dependency decisions.

## Rules
- Do not bump versions without an accepted plan; the platform team may own them.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
