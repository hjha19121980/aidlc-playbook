# COBOL (mainframe) coding standard

**Applies to:** `*.cbl`, `*.cob`, `*.cpy`, JCL (`*.jcl`, `*.proc`).
**Also read:** `sql.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `COB-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** The shop compiler with warnings enabled, a unit-test framework or driver programs, your source control or change manager, and the security product on the platform.

## Structure and naming

- **COB-001** (Important) Follow the shop layout conventions (areas A and B, sequence numbers). One paragraph or section per logical function, each with a header comment.
- **COB-002** (Nit) Use meaningful data names with group prefixes (for example `WS-`, `LS-`, `FD-`). Never reuse one field for two purposes.
- **COB-003** (Important) Put shared record layouts and constants in copybooks; never copy-paste layouts. Analyze impact on every program that uses a changed copybook.
- **COB-004** (Important) Use structured programming: `PERFORM` with clear ranges, no `GO TO` except the documented exit pattern, no `ALTER`.
- **COB-005** (Important) Always use scope terminators (`END-IF`, `END-PERFORM`, `END-READ`, and so on); use `EVALUATE` instead of long nested `IF` chains.

## Data and arithmetic

- **COB-006** (Important) Use the right `PIC` and `USAGE`: packed or binary for arithmetic, signed fields declared `S`. Check sizes and use `ON SIZE ERROR` where truncation is possible.
- **COB-007** (Important) Initialize all working storage explicitly (`INITIALIZE` groups); never rely on defaults.
- **COB-008** (Important) Never use floating point for money; use fixed decimal with documented scale and `ROUNDED` behavior.
- **COB-009** (Important) Validate numeric data with `IF NUMERIC` before arithmetic to prevent data exceptions and abends.
- **COB-010** (Important) Use four-digit years and the shop date routines; no new two-digit-year windowing.
- **COB-011** (Important) Guard reference modification and table subscripts against out-of-bounds access.

## Files and database

- **COB-012** (Important) Check `FILE STATUS` after every file operation and `SQLCODE` after every SQL statement; handle each expected value and end with a clear message and return code on unexpected ones.
- **COB-013** (Important) Open and close every file explicitly, including on error paths.
- **COB-014** (Important) SQL uses host variables rather than literals, an explicit column list (no `SELECT *`), closed cursors, null indicators, and defined commit points; handle deadlock and timeout codes with a bounded retry.
- **COB-015** (Important) Keep units of work short; batch programs define checkpoint and restart.

## Control and calls

- **COB-016** (Important) Set a meaningful `RETURN-CODE` and log program id, paragraph, and key data (never sensitive data).
- **COB-017** (Important) `CALL` states `BY REFERENCE`, `BY CONTENT`, or `BY VALUE` explicitly, handles `ON EXCEPTION`, and the `LINKAGE` interface is documented.

## JCL

- **COB-018** (Important) Each step has one purpose; every DD has the correct `DISP` including abnormal termination; use `IF/THEN` or `COND` for restart; no hard-coded environment dataset names (use symbolics or PROCs); define `SYSOUT` classes.

## Security

- **COB-019** (Important) No credentials in source or JCL; use the platform security product; protect datasets; do not log personal or card data.
- **COB-020** (Important) Validate all input from files, queues, and terminals.

## Testing and maintenance

- **COB-021** (Important) Unit-test paragraphs where possible with a framework or driver program; run regression on representative data; test zero, maximum, negative, and invalid numeric values; compare batch output exactly.
- **COB-022** (Nit) Comments explain why, not what; remove dead code; keep a change log in the source header with the ticket reference.
- **COB-023** (Nit) Prefer indexed access and avoid redundant I/O and `SORT` where `MERGE` suffices; remove production `DISPLAY` debugging.
- **COB-024** (Nit) Keep business rules separate from I/O and mark platform-specific features to ease later migration.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `COB-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
