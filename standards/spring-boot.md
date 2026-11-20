# Spring Boot coding standard

**Applies to:** `@SpringBootApplication`, `spring-boot-starter-*` in `pom.xml` or `build.gradle`.
**Also read:** `java.md`, `kotlin.md`, `sql.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `SPR-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** Spring Boot Actuator, Flyway or Liquibase, Testcontainers, Spring Security.

## Structure

- **SPR-001** (Important) Use constructor injection with final fields; no field injection.
- **SPR-002** (Important) Keep layers separate: controllers handle HTTP only, services hold business logic and transactions, repositories handle persistence. Do not expose entities in API responses; use DTOs or records.
- **SPR-003** (Nit) Package by feature; remove unused starters and avoid component-scan sprawl.

## Web and API

- **SPR-004** (Important) Validate input with Bean Validation (`@Valid`) and return one consistent error body from a `@ControllerAdvice` (for example `ProblemDetail`).
- **SPR-005** (Important) Use correct HTTP status codes and keep PUT and DELETE idempotent; version public APIs.

## Data

- **SPR-006** (Important) Put `@Transactional` on service methods with the right scope; none in controllers; `readOnly` for queries; beware self-invocation.
- **SPR-007** (Important) Avoid N+1 queries and lazy loading outside transactions; disable open-in-view; paginate list endpoints.
- **SPR-008** (Important) Schema changes go through Flyway or Liquibase migrations. Never use `ddl-auto=update` in production.

## Configuration and security

- **SPR-009** (Important) Bind configuration with `@ConfigurationProperties` and validate it; use profiles per environment; no secrets in committed property files.
- **SPR-010** (Important) Spring Security is deny-by-default with method-level authorization; passwords use a delegating encoder; no unauthenticated actuator endpoints beyond health.

## Resilience and operations

- **SPR-011** (Important) Configure timeouts on every outbound client; add retries and circuit breakers only where calls are idempotent.
- **SPR-012** (Important) Expose health and readiness; use structured logs with correlation IDs and no personal data.
- **SPR-013** (Important) Scheduled and async tasks use bounded pools, are idempotent, and shut down cleanly; guard against multi-instance duplicates.

## Testing

- **SPR-014** (Important) Prefer slice tests (`@WebMvcTest`, `@DataJpaTest`); use `@SpringBootTest` sparingly; use Testcontainers for real databases; no shared state between tests.
- **SPR-015** (Important) Manage dependency versions through the platform BOM and keep Boot patch-current.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `SPR-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
