---
name: code-review
description: Review code (a diff, branch, or files) against the language coding standards in docs/aidlc/standards and REVIEW.md, citing rule IDs and ranking findings. Use for any code review before or alongside a pull request review.
---

# Code review against coding standards

Stage: Deploy. Produces: a ranked findings report (and `review-findings.md` for a change).

The standards live in `docs/aidlc/standards/`: one document per language or framework, with rule IDs and default severities. `index.md` says which documents apply to which files.

## Steps
1. **Scope.** Confirm what to review: a pull request, a branch diff (`git diff <base>...HEAD`), or named files. Read `REVIEW.md` (passes, severity, caps, exclusions) and `AGENTS.md` (project conventions) if present, and the change's `spec.md` and `plan.md` if they exist.
2. **Detect languages.** List the changed files and match extensions and manifests with the table in `docs/aidlc/standards/index.md`. Example: a change touching `*.java` and a Spring Boot build file loads `java.md` and `spring-boot.md`; a SQL migration loads `sql.md`.
3. **Load the standards.** Read each matching document in full, plus every document it lists under **Also read** (for example Angular also loads TypeScript). If the repository edited a document, its **Local overrides** section wins over the baseline.
4. **Review changed code only.** Check each change against the rules, then against the review passes from `REVIEW.md` (bugs, security, compliance with spec and plan). Do not report a rule on untouched code unless the change makes the problem worse.
5. **Cite rules.** Every finding names the rule ID (for example `JAVA-005`), the file and line, what is wrong, why it matters, and a concrete fix. Use the rule's default severity (**Important** or **Nit**). A finding without a rule ID must be a correctness or security issue you can justify from the code.
6. **Report.** Start with a summary (counts by severity, standards applied, standards not available), then **Important** findings, then **Nits** capped as `REVIEW.md` says, with the rest summarized as a count. List anything you could not check.
7. **Hand off.** Offer to post the review with the `git-review-pr` skill. The review informs a human code owner; it never approves or blocks by itself.

## Rules
- Use only rule IDs that exist in the documents. Never invent a rule or a citation.
- If a language has no standard, say so and apply general principles; suggest adding one from `_template.md`.
- If project conventions in `AGENTS.md` conflict with a standard rule, follow the project and note the difference.
- Skip generated files and anything CI already enforces (formatters, linters), as `REVIEW.md` says.
- Report secrets by location only, never by value.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
