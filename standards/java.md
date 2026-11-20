# Java coding standard

**Applies to:** `*.java`, `pom.xml`, `build.gradle`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `JAVA-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** Team formatter, Checkstyle or PMD, SpotBugs, JUnit 5, SLF4J logging.

## Naming and structure

- **JAVA-001** (Nit) Classes use PascalCase, methods and variables camelCase, constants UPPER_SNAKE_CASE, packages lowercase.
- **JAVA-002** (Nit) One top-level type per file. Keep classes cohesive; keep methods short enough to read without scrolling.
- **JAVA-003** (Important) Prefer composition over inheritance and program to interfaces. No public mutable fields.

## Correctness

- **JAVA-004** (Important) Use try-with-resources for every AutoCloseable.
- **JAVA-005** (Important) Never compare strings or boxed values with `==`; use `equals` or `Objects.equals` for nullable values.
- **JAVA-006** (Important) Override `equals` and `hashCode` together; make value types immutable (records where available).
- **JAVA-007** (Important) Do not return null for collections; return empty collections. Use `Optional` only as a return type.
- **JAVA-008** (Important) Do not ignore return values of operations that signal failure.

## Error handling

- **JAVA-009** (Important) Never catch `Exception` or `Throwable` broadly and never leave an empty catch block; log with context or rethrow.
- **JAVA-010** (Important) Preserve the cause when wrapping exceptions; use unchecked exceptions for programming errors.
- **JAVA-011** (Nit) Do not use exceptions for normal control flow.

## Concurrency

- **JAVA-012** (Important) Shared mutable state must be synchronized or use `java.util.concurrent`; prefer immutable objects.
- **JAVA-013** (Important) Do not start raw threads; use an `ExecutorService` with bounded queues and named threads, and shut it down cleanly.

## Security

- **JAVA-014** (Important) Use parameterized queries; never build SQL, commands, or file paths from unvalidated input.
- **JAVA-015** (Important) No credentials in source. Do not log secrets or personal data.
- **JAVA-016** (Important) Validate and bound all external input. Do not deserialize untrusted data with Java serialization.

## Performance

- **JAVA-017** (Nit) Use `StringBuilder` in loops, avoid autoboxing in hot paths, choose collections by access pattern.

## Testing

- **JAVA-018** (Important) Every public behavior has a unit test. Tests are deterministic and independent of order and wall-clock time (inject a `Clock`).

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `JAVA-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
