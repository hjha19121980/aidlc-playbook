# C# coding standard

**Applies to:** `*.cs`, `*.csproj`, `*.sln`.
**Also read:** `sql.md`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `CS-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** dotnet format, Roslyn analyzers with nullable enabled, xUnit or NUnit, ILogger.

## Style and types

- **CS-001** (Nit) Use .NET naming (PascalCase public members, camelCase locals, `_camelCase` private fields, `I` prefix on interfaces); analyzers are clean.
- **CS-002** (Important) Nullable reference types are enabled; do not suppress with `!` without a reason.
- **CS-003** (Important) Use records or immutable types for DTOs; no public setters on domain entities; validate inputs.
- **CS-004** (Nit) Use pattern matching and switch expressions where clearer.

## Async and resources

- **CS-005** (Important) Use async/await all the way; no `.Result` or `.Wait()`; pass `CancellationToken`; no `async void` except event handlers.
- **CS-006** (Important) Dispose `IDisposable` with `using` and implement disposal correctly.
- **CS-007** (Important) Lock only on private objects (never `this` or `typeof`); use `SemaphoreSlim` or concurrent collections for async code.

## Errors

- **CS-008** (Important) Catch specific exceptions; never swallow; use `throw;` (not `throw ex;`) to preserve the stack.

## Data

- **CS-009** (Important) Use parameterized queries or EF; no string-built SQL; `AsNoTracking` for reads; avoid N+1 (`Include`); filter before `ToList()`.
- **CS-010** (Important) LINQ stays readable; avoid multiple enumeration; use `StringBuilder` in loops.

## ASP.NET, security, operations

- **CS-011** (Important) Dependency injection with correct lifetimes (no scoped service in a singleton); constructor injection.
- **CS-012** (Important) Authorization is deny-by-default, model validation is on, anti-forgery is used with cookies, and CORS is restricted.
- **CS-013** (Important) Secrets come from user-secrets, a vault, or the environment, never committed settings files.
- **CS-014** (Important) Log with `ILogger` structured templates (no string interpolation) and no personal data.

## Testing

- **CS-015** (Important) xUnit or NUnit tests have no `Thread.Sleep`, use fakes, and take time from `TimeProvider`.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `CS-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
