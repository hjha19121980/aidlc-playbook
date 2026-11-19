# Review instructions

## Passes
Run three passes and tag each finding with its pass:
- **Bugs:** logic errors, broken edge cases, subtle regressions.
- **Security:** injection risks, authentication gaps, secrets or personal data in logs.
- **Compliance:** the change matches `spec.md`, `plan.md`, and our design principles, and does nothing outside the plan.

## What Important means here
Reserve Important for findings that would break behavior, leak data, or breach a policy. Style and naming are Nits.

## Cap the nits
Report at most five Nits per review; summarize the rest as a count.

## Do not report
Generated files (list the paths here) and anything CI already enforces.

## Human threshold
Findings do not approve or block a pull request on their own. A code owner approves. Mention when a change makes `AGENTS.md` outdated.
