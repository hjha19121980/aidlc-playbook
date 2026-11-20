---
name: cobol-legacy-analysis
description: Analyze a COBOL, JCL, and copybook estate to document program flow, call graph, data and file usage, embedded SQL and transactions, and extract business rules for maintenance or modernization. Use before changing or migrating mainframe code.
---

# COBOL legacy analysis

Stage: Build. Produces: `docs/aidlc/analysis/cobol-<system>.md` and inputs for `knowledge-index` and `knowledge-graph`.

Read-only: change nothing while analyzing.

## Steps
1. **Inventory.** List programs, copybooks, JCL and PROCs, schedules, DB2 tables and views, files and datasets, CICS transactions and maps, and queues, with their paths or library names. Record the source snapshot (commit or library version).
2. **Call graph.** For each program record `CALL` targets (static and dynamic), `COPY` and `INCLUDE` members, and entry points (JCL steps, transaction codes). Draw the main flow as a Mermaid diagram.
3. **Data flow.** For each program list files and tables read and written, key fields, record layouts (from copybooks), and who else uses the same data.
4. **Control flow and rules.** Per program, outline the main paragraphs and extract business rules in plain language with the paragraph and line where each lives (for example "interest is rounded half up in `CALC-INTEREST`"). Mark rules you inferred.
5. **Batch view.** Map JCL job streams: order, dependencies, restart points, run frequency, inputs, outputs, and return code handling.
6. **Risks and debt.** Note dead code, `GO TO` and `ALTER` use, duplicated layouts, two-digit years, missing file-status checks, hard-coded dataset names, large programs, and missing tests.
7. **Data dictionary.** Produce a table of key data items: name, meaning, PIC and USAGE, valid values, source, owner role.
8. **Write the report.** One-page summary first, then inventory, call graph, data flow, rules, risks, and open questions for subject-matter experts. Feed the graph into `knowledge-graph` and the index into `knowledge-index`.
9. **Modernization notes (optional).** Separate business rules from I/O, list candidates for extraction or replacement, and the tests needed to prove equivalence.

## Rules
- State what is verified from source and what is inferred; list questions for people who know the business.
- Do not copy production data or personal data into the report.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
