# Ruby coding standard

**Applies to:** `*.rb`, `Gemfile`, `Rakefile`.
**Also read:** `sql.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `RB-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** RuboCop, RSpec or Minitest, bundler-audit, Brakeman for Rails.

## Style

- **RB-001** (Nit) Follow the community Ruby style guide; RuboCop is clean; snake_case methods and CamelCase classes.
- **RB-002** (Nit) Prefer guard clauses over deep nesting; use `frozen_string_literal`; avoid global variables.
- **RB-003** (Important) Keep methods and classes small. Metaprogramming is documented and justified.

## Errors

- **RB-004** (Important) Rescue specific exceptions; never bare `rescue` or `rescue Exception`; re-raise with context.

## Rails and data

- **RB-005** (Important) Avoid N+1 queries (`includes` or `preload`) and index lookup columns.
- **RB-006** (Important) Use strong parameters; never trust `params`; use ActiveRecord parameter binding, not string interpolation in SQL.
- **RB-007** (Important) Migrations are reversible, do not mix schema and data changes, and are safe for zero-downtime deploys.
- **RB-008** (Important) Background jobs are idempotent and retry safely.

## Security

- **RB-009** (Important) No `send`, `eval`, or `constantize` on user input; do not call `html_safe` or `raw` on untrusted content.
- **RB-010** (Important) Secrets come from credentials or the environment; filter sensitive parameters from logs.

## Testing and dependencies

- **RB-011** (Important) Tests do not depend on order or the real clock (use `travel_to`) and make no real network calls; keep factories small.
- **RB-012** (Important) Commit `Gemfile.lock`; keep bundler-audit clean.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `RB-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
