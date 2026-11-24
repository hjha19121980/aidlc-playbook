---
name: sbom-and-license-compliance
description: Generate and review a software bill of materials and check third-party licenses against policy before release. Use for every release and when adding dependencies.
---

# SBOM and license compliance

Stage: Deploy. Produces: `docs/aidlc/security/sbom-<yyyymmdd>.md` plus the SBOM file (CycloneDX or SPDX).

## Steps
1. Generate the SBOM with the project tooling for every package manager and container image.
2. Record each component name, version, supplier, license, and source.
3. Compare licenses with the company allow, review, and deny lists; flag copyleft, unknown, and missing licenses.
4. Check for end-of-life or unmaintained components and link vulnerabilities to vulnerability-triage.
5. For each flagged item propose replace, upgrade, isolate, or request exception, with the approver role.
6. Attach the SBOM to the release record and note anything blocking release-readiness-review.

## Rules
- Do not give legal conclusions about license terms; route questions to Legal.
- Do not guess a license; mark it unknown.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
