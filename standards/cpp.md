# C++ coding standard

**Applies to:** `*.cpp`, `*.cc`, `*.hpp`, `*.h`, `CMakeLists.txt`.

**How reviewers use this document.** Cite the rule ID in every finding (for example `CPP-001`). The severity shown is the default: **Important** means it would break behavior, leak data, or breach a policy, or it is a defect pattern the team has agreed to block; **Nit** is a style or preference point and is capped by `REVIEW.md`. Review only changed code unless the change makes an old problem worse. If the project's own conventions in `AGENTS.md` conflict with a rule, follow the project and say so.

**Tooling baseline.** clang-format, clang-tidy, warnings as errors, AddressSanitizer, UBSan, ThreadSanitizer, GoogleTest or Catch2.

## Resources and ownership

- **CPP-001** (Important) Use RAII for every resource; no raw `new` or `delete`. Use `std::unique_ptr` and `make_unique`; `shared_ptr` only for genuinely shared ownership.
- **CPP-002** (Important) Follow the rule of zero or five; base classes have virtual destructors; mark overrides with `override`.
- **CPP-003** (Important) Be const-correct; pass by const reference or by value with move; use `noexcept` only where true.

## Safety

- **CPP-004** (Important) No undefined behavior: bounds-check access, no dangling references or iterators, no use after move, initialize every variable. Run sanitizers in CI.
- **CPP-005** (Important) Use `std::string`, `std::vector`, `std::array`, and `std::string_view` instead of C arrays and `char*`. No unsafe C functions (`strcpy`, `sprintf`, `gets`).
- **CPP-006** (Important) Validate input sizes, guard integer overflow, avoid format-string vulnerabilities, and build with warnings as errors and hardening flags.

## Language use

- **CPP-007** (Important) Prefer `enum class`, `constexpr`, and `nullptr`; avoid macros and C-style casts; justify any `reinterpret_cast`.
- **CPP-008** (Important) Define an exception policy; do not let exceptions cross ABI boundaries; catch by const reference; never `catch (...)` and swallow.
- **CPP-009** (Nit) Prefer standard algorithms (or ranges) over raw loops; follow the C++ Core Guidelines.

## Concurrency

- **CPP-010** (Important) Protect shared data with `std::mutex` and `std::scoped_lock` or atomics; no data races; do not detach threads.

## Structure and testing

- **CPP-011** (Important) Headers have include guards or `#pragma once`, include only what they need, and never contain `using namespace`.
- **CPP-012** (Important) Tests (GoogleTest or Catch2) are deterministic and run under the sanitizers.
- **CPP-013** (Nit) clang-format and clang-tidy are clean.

## Local overrides

Add your team's additions and exceptions here. Give each a new ID such as `CPP-L01`, and say which rule it replaces. Reviewers treat this section as authoritative.

<!-- Baseline reviewed against general industry practice. Have a language owner confirm it before it is enforced. -->
