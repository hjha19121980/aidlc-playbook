---
name: runbook-authoring
description: Write clear operational runbooks (symptoms, checks, steps, rollback, escalation) that an on-call engineer can follow under pressure. Use for every service.
---

# Runbook authoring

Stage: Maintain. Produces: `docs/aidlc/runbooks/<service>-<scenario>.md`.

## Steps
1. Name the scenario, the alert that triggers it, and the user impact.
2. List quick checks with exact commands and the output that means healthy or not.
3. Write numbered recovery steps; mark steps that change production and need authorization.
4. Add rollback, verification, and escalation by role.
5. Test the runbook in a drill and record the date and gaps.

## Rules
- Keep credentials out; point to the secret store.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
