# Dart and Flutter coding standard

**Applies to:** `*.dart`, `pubspec.yaml`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `DRT-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** `dart format`, `dart analyze` with flutter_lints, `flutter test`.

## Language

- **DRT-001** (Nit) `dart format` and `dart analyze` are clean; lowerCamelCase members, UpperCamelCase types, snake_case file names.
- **DRT-002** (Important) Use sound null safety; avoid `!` unless proven; use `late` carefully.
- **DRT-003** (Nit) Prefer `final` and `const`; use `const` constructors for widgets; document public APIs with `///`.

## Async

- **DRT-004** (Important) Every `Future` is awaited or deliberately handled (`unawaited_futures`); catch specific exceptions with `on` clauses.
- **DRT-005** (Important) Cancel stream subscriptions and close controllers in `dispose`.

## Flutter

- **DRT-006** (Important) Dispose controllers, focus nodes, and animations; check `mounted` before using a `BuildContext` after `await`.
- **DRT-007** (Important) Keep `build` methods pure and cheap; split widgets; use keys correctly; `ListView.builder` for long lists.
- **DRT-008** (Important) Use one state-management approach consistently; no business logic in widgets.

## Security and accessibility

- **DRT-009** (Important) No secrets in code; store tokens with secure storage; HTTPS only; validate platform channel inputs.
- **DRT-010** (Important) Support `Semantics`, text scaling, contrast, and minimum tap targets.

## Testing and dependencies

- **DRT-011** (Important) Unit, widget, and integration tests; golden tests only where stable; no real network.
- **DRT-012** (Important) Commit `pubspec.lock` for apps and review plugin permissions.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `DRT-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
