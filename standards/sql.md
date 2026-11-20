# SQL coding standard

**Applies to:** `*.sql`, migration folders, stored procedures.

**How reviewers use this document.** Cite the rule ID in every finding (for example `SQL-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** A SQL linter (for example sqlfluff), the engine's execution-plan tool, versioned migrations.

## Queries

- **SQL-001** (Important) Use explicit column lists; no `SELECT *` in application code or views. Qualify columns with aliases.
- **SQL-002** (Important) Always parameterize; never concatenate user input; applications use least-privilege accounts.
- **SQL-003** (Important) Use explicit `JOIN` syntax and treat `NULL` carefully (`COALESCE`; prefer `NOT EXISTS` over `NOT IN` with nullable columns).
- **SQL-004** (Important) Prefer set-based statements to row-by-row loops and cursors; avoid N+1 patterns.
- **SQL-005** (Important) Paginate with a deterministic `ORDER BY` (keyset for large sets).

## Safety

- **SQL-006** (Important) Every `UPDATE` and `DELETE` has a reviewed `WHERE`; test the predicate with a `SELECT` first and run in a transaction.
- **SQL-007** (Important) Keep transactions short, lock in a consistent order, and retry on deadlock.

## Schema and performance

- **SQL-008** (Important) Choose proper types (decimal for money, time zone aware timestamps) and enforce integrity with primary key, foreign key, `NOT NULL`, `CHECK`, and `UNIQUE` constraints.
- **SQL-009** (Important) Index filter, join, and sort columns and verify with the execution plan; avoid functions on indexed columns in `WHERE` and leading-wildcard `LIKE` on large tables.
- **SQL-010** (Important) Migrations are versioned, reversible, and backward compatible (expand then contract); batch large changes and avoid long locks.

## Data protection

- **SQL-011** (Important) Classify sensitive data and encrypt or mask it; no personal data in logs or test data.

## Style and portability

- **SQL-012** (Nit) Consistent keyword case, snake_case names, one clause per line, CTEs for readability, comments for non-obvious logic; consistent naming for indexes and constraints.
- **SQL-013** (Important) Document dialect-specific features and test on the target engine version.
- **SQL-014** (Important) Stored procedures handle errors, avoid unquoted dynamic SQL, and live in version control.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `SQL-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
