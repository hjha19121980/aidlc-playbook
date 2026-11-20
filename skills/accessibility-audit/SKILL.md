---
name: accessibility-audit
description: Audit a UI against accessibility guidelines (WCAG) with automated and manual checks and list issues with fixes. Use for user-facing changes.
---

# Accessibility audit

Stage: Test. Produces: `docs/aidlc/changes/<id>/accessibility-report.md`.

## Steps
1. Run automated checks on the key pages and states.
2. Manually check keyboard navigation, focus order, labels, color contrast, zoom, reduced motion, and screen-reader names.
3. List issues with the guideline, the location, severity, and the fix.
4. Retest after fixes and record the result.
5. State the conformance level you can claim, and the limits of the audit.

## Rules
- Automated tools find only part of the issues; say so.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
