# Angular coding standard

**Applies to:** `angular.json`, `@angular/core` in `package.json`, `*.component.ts`.
**Also read:** `typescript.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `NG-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** Angular ESLint, strict TypeScript and strictTemplates, Karma or Jest, component harnesses.

## Components and state

- **NG-001** (Important) Use standalone components with OnPush change detection; use signals or the async pipe for state in templates.
- **NG-002** (Important) Strict mode is on (strict TypeScript and `strictTemplates`).
- **NG-003** (Important) No heavy work in templates: no function calls that compute on every cycle; use `computed` values or pure pipes.
- **NG-004** (Nit) Prefer the built-in control flow (`@if`, `@for`) in new code; keep components small and separate presentational from container components.

## Subscriptions and HTTP

- **NG-005** (Important) No leaked subscriptions: use the async pipe, `takeUntilDestroyed`, or `toSignal`.
- **NG-006** (Important) HTTP goes through services with typed responses; auth and error handling in interceptors; no hard-coded URLs.

## Forms, routing, performance

- **NG-007** (Important) Use typed reactive forms and validate on the server as well.
- **NG-008** (Important) Lazy-load feature routes; use `track` (or `trackBy`) in lists; avoid `any`.

## Security

- **NG-009** (Important) Never call `bypassSecurityTrust*` or bind untrusted HTML without a security review.
- **NG-010** (Important) Do not keep tokens in `localStorage` unless policy allows; no secrets in the bundle.

## Accessibility and testing

- **NG-011** (Important) Use semantic elements, labels, keyboard support, visible focus, and sufficient contrast; add ARIA only when needed.
- **NG-012** (Important) Test components and services with TestBed or component harnesses, not implementation details; cover critical flows end to end.
- **NG-013** (Nit) Use `inject()` or constructor injection consistently; `providedIn: root` only for true singletons.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `NG-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
