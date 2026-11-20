# R coding standard

**Applies to:** `*.R`, `*.Rmd`, `DESCRIPTION`, `renv.lock`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `R-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** lintr, styler, testthat, renv.

## Style

- **R-001** (Nit) Follow the tidyverse style guide; lintr and styler are clean; snake_case; use `TRUE` and `FALSE`, never `T` and `F`.
- **R-002** (Nit) Document functions with roxygen2 and keep a README that explains how to reproduce results.

## Reproducibility

- **R-003** (Important) Set seeds where randomness matters; record package versions (renv lockfile); no `setwd()` or absolute paths (use project-relative paths).
- **R-004** (Important) Declare dependencies in `DESCRIPTION`; use `pkg::fn`; no `library()` inside functions.

## Correctness

- **R-005** (Important) Vectorize; do not grow objects in loops (preallocate); validate arguments and fail early with informative messages.
- **R-006** (Important) No `attach()`, no `<<-`, and no modification of global state from functions.
- **R-007** (Important) Validate schema and types when reading data (for example `col_types`); handle `NA` explicitly; never drop rows silently; document units and assumptions.

## Statistics and models

- **R-008** (Important) Document model assumptions, check diagnostics, report effect sizes and uncertainty, and split training and test data without leakage.

## Security

- **R-009** (Important) No credentials in scripts (use environment variables); do not commit sensitive data; build SQL with parameters (`DBI`, `glue_sql`), never `paste`.

## Testing and Shiny

- **R-010** (Important) Tests with testthat are deterministic and cover `NA`, empty, and zero-row cases.
- **R-011** (Important) Shiny apps validate inputs (`req()`), avoid heavy reactive recomputation, escape user text, and authenticate when data is sensitive.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `R-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
