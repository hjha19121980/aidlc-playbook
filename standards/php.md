# PHP coding standard

**Applies to:** `*.php`, `composer.json`.
**Also read:** `sql.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `PHP-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** PHP_CodeSniffer or PHP-CS-Fixer, PHPStan or Psalm, PHPUnit or Pest, `composer audit`.

## Style and types

- **PHP-001** (Nit) Follow PSR-12 and PSR-4; style checker is clean.
- **PHP-002** (Important) Use `declare(strict_types=1)` and type declarations for parameters, returns, and properties; static analysis passes at the agreed level.
- **PHP-003** (Nit) Prefer `readonly`, enums, and constructor promotion (PHP 8+); avoid global functions and variables.
- **PHP-004** (Important) Compare with `===`; use `hash_equals` for secrets; beware loose comparison.

## Errors

- **PHP-005** (Important) Use exceptions; never suppress errors with `@`; log errors and keep `display_errors` off in production.

## Security

- **PHP-006** (Important) Use PDO prepared statements; never concatenate input into SQL; escape output for its context (`htmlspecialchars` or template auto-escape).
- **PHP-007** (Important) No `eval`, `extract`, or `unserialize` on untrusted data; never `include` a user-controlled path; validate uploads (type, size, stored outside the web root with random names).
- **PHP-008** (Important) Hash passwords with `password_hash`; use `random_bytes` or `random_int`; use CSRF tokens; harden sessions (httponly, secure, samesite, regenerate on login).
- **PHP-009** (Important) Configuration and secrets come from the environment; `.env` is not web-accessible.

## Dependencies and data

- **PHP-010** (Important) Commit `composer.lock`, keep `composer audit` clean, and keep dev dependencies out of production.
- **PHP-011** (Important) Avoid N+1 in the ORM, paginate, and plan cache invalidation.

## Frameworks and testing

- **PHP-012** (Important) Laravel or Symfony: follow framework conventions, use validation (form requests), authorize with policies, and protect against mass assignment (`$fillable`).
- **PHP-013** (Important) PHPUnit or Pest tests do not rely on global state or the real clock.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `PHP-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
