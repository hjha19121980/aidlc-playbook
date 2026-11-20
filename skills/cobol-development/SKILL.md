---
name: cobol-development
description: Write, change, and verify COBOL programs, copybooks, and JCL for mainframe batch and online systems following docs/aidlc/standards/cobol.md, with careful data handling, file status checks, and regression comparison. Use for mainframe development tasks.
---

# COBOL development (mainframe)

Stage: Build. Produces: the source and JCL changes, `plan.md` updates, and test evidence.

Prerequisites: an accepted `plan.md` and the standards in `docs/aidlc/standards/cobol.md` (and `sql.md` for embedded SQL). Source comes from your source control or change manager; this skill edits source and prepares changes but does not submit production jobs.

## Steps
1. **Understand before changing.** Read the program, its copybooks, called programs, and the JCL that runs it. Use the `cobol-legacy-analysis` skill for unfamiliar systems and `impact-analysis` for copybook or interface changes: list every program that uses a changed layout.
2. **Plan the smallest change.** State the paragraphs to change, the data items affected (PIC, USAGE, sign, scale), the files and tables touched, and the test data needed. Record it in `plan.md`.
3. **Implement to the standard.** Keep the shop layout; use scope terminators and `EVALUATE`; no `GO TO` or `ALTER`; initialize working storage; validate numerics before arithmetic; use fixed decimal for money with `ROUNDED` and `ON SIZE ERROR`; check `FILE STATUS` and `SQLCODE` after every I/O and SQL statement; set a meaningful `RETURN-CODE`.
4. **Copybooks.** Change a copybook only with an impact list. Keep layouts backward compatible where programs are not recompiled together; plan the recompile order.
5. **JCL.** One purpose per step, correct `DISP` including abnormal end, restart logic with `IF/THEN` or `COND`, symbolic parameters instead of hard-coded environment dataset names. Never put credentials in JCL.
6. **Compile and fix.** Compile with the shop options and warnings enabled; fix warnings rather than suppressing them. Record the compile listing summary.
7. **Test.** Unit-test paragraphs with a framework or driver where possible; run regression on representative data; cover zero, maximum, negative, and invalid numeric values, end of file, and error statuses. Compare batch output with the baseline exactly and explain every difference.
8. **Document.** Update the source header change log with the ticket reference and the plan, and note restart and rerun instructions for batch.
9. **Review.** Run the `code-review` skill against `cobol.md`, then raise the pull request or change request (`git-create-pr`, `change-request`).

## Rules
- No production data in tests unless approved by the Data Privacy Officer; mask or generate data.
- Anything that runs in production goes through the organization's change and promotion process with a named approver. Do not submit or schedule production jobs.
- Never print or log personal or card data.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
