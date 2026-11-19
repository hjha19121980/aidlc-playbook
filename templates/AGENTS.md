# <Project name>

Project context for every agent. Keep it under about a page. When an agent makes the same mistake twice, add the correction here.

## Commands
- Build: `<command>` (healthy output: "<sample>")
- Test: `<command>` (all green; never skip or delete a failing test)
- Lint: `<command>` (zero warnings)
- Run: `<command>`

## Conventions
- <Language and framework versions.>
- <Rules that matter, for example money is always decimal.>
- <Every endpoint needs an integration test in `<folder>`.>

## Architecture
- <Folder responsibilities in one line each.>
- <Where contracts and generated code live; never edit generated files.>

## Protected paths
- <Generated code, frozen packages, migrations, infrastructure: change only with a recorded approval.>

## Things agents get wrong
- <Do not bump dependency versions; the platform team owns them.>

## Verifying your work
Run build, test, and lint before reporting any task complete, and paste the output. If a test fails, fix the code, not the test.

## AIDLC
Artifacts for each change are in `docs/aidlc/changes/`. Read `intent.md`, `spec.md`, and `plan.md` before changing code. Update `plan.md` in the same commit if the work departs from it.
