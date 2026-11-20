---
name: security-scan-review
description: Run and triage static analysis, dependency, secret, and container scans; separate real findings from noise and propose fixes. Use before release.
---

# Security scan review

Stage: Test. Produces: `docs/aidlc/changes/<id>/security-findings.md`.

## Steps
1. Run the approved scanners and record the literal output.
2. Triage each finding: true positive, false positive, or needs review; record the reason.
3. Rate true positives by exploitability and impact; map to the threat model.
4. Propose a fix or compensating control and an owner; escalate critical items to the security team.
5. Summarize counts by severity and the gate recommendation.

## Rules
- Never paste live secrets into a report; reference location only.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
