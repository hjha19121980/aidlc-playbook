# Go coding standard

**Applies to:** `*.go`, `go.mod`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `GO-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** gofmt, goimports, go vet, staticcheck or golangci-lint, `go test -race`, govulncheck.

## Style

- **GO-001** (Nit) Code is gofmt and goimports formatted; vet and the linter are clean.
- **GO-002** (Nit) Short lowercase package names; exported identifiers documented; MixedCaps; no stutter (`user.UserService`).
- **GO-003** (Nit) Accept interfaces, return concrete types; keep interfaces small and defined by the consumer. Avoid `init()` side effects and global mutable state.

## Errors

- **GO-004** (Important) Check every error; never ignore with `_` without a reason; wrap with `%w` and context.
- **GO-005** (Important) Do not panic for expected errors; recover only at boundaries.

## Concurrency

- **GO-006** (Important) `context.Context` is the first parameter, propagated, and honored; do not store it in structs.
- **GO-007** (Important) Know how every goroutine ends; avoid leaks; use `errgroup` or `WaitGroup`; protect shared data with a mutex or channels; run tests with `-race`.
- **GO-008** (Important) `defer` resource closes right after a successful open; beware `defer` in loops.

## Network and security

- **GO-009** (Important) HTTP clients and servers set timeouts; response bodies are closed.
- **GO-010** (Important) Use parameterized queries and validate input; use `crypto/rand` for secrets; no hard-coded credentials.

## Testing and modules

- **GO-011** (Important) Table-driven tests with `t.Helper`; `t.Parallel` where safe; no sleeps.
- **GO-012** (Important) `go.mod` is tidy with pinned versions; run `govulncheck`.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `GO-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
