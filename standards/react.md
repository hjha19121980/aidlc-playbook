# React coding standard

**Applies to:** `react` in `package.json`, `*.jsx`, `*.tsx`.
**Also read:** `typescript.md`, `javascript.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `RCT-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** ESLint with the react-hooks plugin, Prettier, React Testing Library.

## Components and hooks

- **RCT-001** (Important) Use function components and hooks; call hooks only at the top level of components and custom hooks.
- **RCT-002** (Important) Effects have correct dependency arrays and clean up subscriptions, timers, and listeners.
- **RCT-003** (Important) Keep state minimal and local; do not store values that can be derived. Never mutate state or props.
- **RCT-004** (Important) Use stable, unique `key`s; do not use array index for dynamic lists.
- **RCT-005** (Nit) PascalCase components, one per file; type all props.

## Data and resilience

- **RCT-006** (Important) Handle loading, empty, and error states for async data; add error boundaries around risky subtrees.
- **RCT-007** (Important) Use one consistent data-fetching approach and cancel or ignore stale requests.
- **RCT-008** (Important) Split large components and code-split routes (`lazy`, `Suspense`).

## Performance

- **RCT-009** (Nit) Use `useMemo`, `useCallback`, and `memo` only after measuring; avoid creating new objects inline in hot paths.

## Security and accessibility

- **RCT-010** (Important) Avoid `dangerouslySetInnerHTML`; sanitize if unavoidable.
- **RCT-011** (Important) No secrets in the client bundle; public environment variables are public.
- **RCT-012** (Important) Use semantic elements, labels, alt text, keyboard focus, and contrast.

## Testing

- **RCT-013** (Important) Test behavior with React Testing Library; no snapshot-only tests.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `RCT-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
