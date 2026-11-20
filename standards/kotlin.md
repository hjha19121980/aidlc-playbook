# Kotlin coding standard

**Applies to:** `*.kt`, `*.kts`.
**Also read:** `java.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `KT-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** ktlint, detekt, JUnit 5 or Kotest, coroutine test utilities.

## Style and safety

- **KT-001** (Nit) Follow the official Kotlin coding conventions; ktlint and detekt are clean.
- **KT-002** (Important) Prefer `val` over `var` and immutable data classes. Avoid `!!`; use safe calls, elvis, or `requireNotNull` with a message.
- **KT-003** (Important) Treat platform types from Java interop explicitly; annotate nullability at the boundary.
- **KT-004** (Important) Use sealed types with exhaustive `when` for states and results; do not use exceptions for expected failures.

## Coroutines

- **KT-005** (Important) Use structured concurrency. No `GlobalScope`; inject dispatchers; never block inside suspend functions; rethrow `CancellationException`.
- **KT-006** (Important) Collect `Flow` in an appropriate scope and avoid leaking collectors.

## Design

- **KT-007** (Nit) Use scope functions sparingly and readably; keep extension functions close to where they are used.
- **KT-008** (Important) Prefer constructor injection over `lateinit`; do not abuse companion objects.
- **KT-009** (Important) Be careful with data class `copy`, `equals`, and `hashCode` when fields are mutable.

## Security and testing

- **KT-010** (Important) Same rules as Java: parameterized queries, no secrets in code, no personal data in logs.
- **KT-011** (Important) Test with JUnit 5 or Kotest; use `runTest` for coroutines; prefer fakes over heavy mocking.
- **KT-012** (Important) Android code: collect flows lifecycle-aware and avoid leaking `Context`.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `KT-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
