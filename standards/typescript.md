# TypeScript coding standard

**Applies to:** `*.ts`, `*.tsx`, `tsconfig.json`.
**Also read:** `javascript.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `TS-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** typescript-eslint, Prettier, Jest or Vitest, schema validation at boundaries.

## Type safety

- **TS-001** (Important) `strict` mode is on (`noImplicitAny`, `strictNullChecks`). No `any`; use `unknown` and narrow it.
- **TS-002** (Important) No `@ts-ignore`; `@ts-expect-error` only with a reason. No non-null assertions (`!`) or casts (`as`) used to silence errors.
- **TS-003** (Important) Validate external data at boundaries with a schema (for example zod) instead of casting.
- **TS-004** (Important) Model states with discriminated unions and exhaustive `switch` (`never` check); use `readonly` where possible.

## Async and errors

- **TS-005** (Important) No floating promises: every promise is awaited, returned, or handled.
- **TS-006** (Important) Throw `Error` subclasses, never strings; type caught values as `unknown`.
- **TS-007** (Important) Use `AbortController` and timeouts for network calls.

## Structure

- **TS-008** (Nit) ESLint and Prettier are clean; PascalCase types, camelCase values.
- **TS-009** (Important) No circular imports; use barrel files sparingly.
- **TS-010** (Nit) Prefer `const`; explicit return types on exported functions; avoid default exports in libraries; use `??` rather than `||` for defaults.

## Security and testing

- **TS-011** (Important) No `eval`, no dynamic `Function`; no `innerHTML` with untrusted data; keep dependency audit clean.
- **TS-012** (Important) Do not leak secrets in bundles or logs; validate typed environment variables at startup.
- **TS-013** (Important) Tests (Jest or Vitest) share no mutable state and mock only at boundaries; public APIs have type tests where useful.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `TS-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
