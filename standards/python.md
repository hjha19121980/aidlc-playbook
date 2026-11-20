# Python coding standard

**Applies to:** `*.py`, `pyproject.toml`, `requirements.txt`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `PY-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** ruff or flake8 and black, mypy or pyright, pytest, pip-audit.

## Style and structure

- **PY-001** (Nit) Follow PEP 8: snake_case functions and variables, PascalCase classes, UPPER_SNAKE constants. Formatter and linter are clean.
- **PY-002** (Nit) Prefer `pathlib`, f-strings, and clear comprehensions; no wildcard imports; docstrings for public modules, classes, and functions.
- **PY-003** (Important) Type-hint public functions and keep type checking clean for new code.
- **PY-004** (Important) Do not shadow builtins. Importing a module has no side effects. Avoid global mutable state.

## Correctness

- **PY-005** (Important) No mutable default arguments.
- **PY-006** (Important) Use context managers (`with`) for files, locks, and connections.
- **PY-007** (Important) Never use bare `except`; catch specific exceptions and use `raise ... from`.
- **PY-008** (Important) Do not use `assert` for runtime validation.

## Security

- **PY-009** (Important) No `eval` or `exec` on untrusted input; do not unpickle or unsafe-load untrusted data.
- **PY-010** (Important) Use parameterized queries. Call `subprocess` with a list of arguments, never `shell=True` with user input.
- **PY-011** (Important) Secrets come from the environment or a secret store, never from code.

## Operations

- **PY-012** (Important) Use `logging` (not `print`) with lazy formatting and no secrets in logs.
- **PY-013** (Important) Pin dependencies with a lock file and use virtual environments; keep the audit tool clean.
- **PY-014** (Important) Async code never blocks the event loop, awaits every coroutine, and handles cancellation.

## Testing

- **PY-015** (Important) Tests use pytest, are deterministic, use fixtures, and do no real network calls in unit tests.
- **PY-016** (Nit) Use dataclasses or a validation library for structured data.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `PY-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
