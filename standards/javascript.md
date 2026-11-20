# JavaScript coding standard

**Applies to:** `*.js`, `*.mjs`, `*.cjs`, `package.json`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `JS-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** ESLint, Prettier, Jest or Vitest or the Node test runner, npm audit.

## Language use

- **JS-001** (Nit) ESLint and Prettier are clean; camelCase, PascalCase, UPPER_SNAKE; use ES modules.
- **JS-002** (Important) Use `const` and `let` only, never `var`; use `===` (deliberate null checks excepted).
- **JS-003** (Important) No implicit globals; do not mutate function arguments; avoid shared mutable module state.
- **JS-004** (Important) Parse numbers explicitly (`Number`, `parseInt` with radix); do not use floats for money; handle dates in UTC deliberately.

## Async

- **JS-005** (Important) Handle every promise rejection; no unawaited promises; do not use `async` callbacks in `forEach`.

## Security

- **JS-006** (Important) Validate and sanitize all external input. No `eval`, `new Function`, or string arguments to timers; use `textContent` rather than `innerHTML` for untrusted data.
- **JS-007** (Important) Avoid prototype pollution: do not merge untrusted objects into plain objects; validate JSON against a schema.
- **JS-008** (Important) Secrets come from the environment or a secret store, never from the repo or client bundle.

## Node and dependencies

- **JS-009** (Important) Do not block the event loop; no synchronous file access in request paths; handle `error` events; set timeouts; shut down gracefully.
- **JS-010** (Important) Commit the lock file; keep `npm audit` clean; avoid unnecessary or abandoned packages.

## Quality

- **JS-011** (Nit) Small functions, early returns, no deep callback nesting; JSDoc types for public APIs (or migrate to TypeScript).
- **JS-012** (Important) Tests use fake timers and no real network; browser code cleans up listeners and avoids inline handlers.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `JS-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
