---
name: secrets-and-config-management
description: Find hard-coded secrets and design how secrets and configuration are stored, injected, rotated, and audited. Use when code or pipelines handle credentials, keys, or environment configuration.
---

# Secrets and config management

Stage: Build. Produces: `docs/aidlc/changes/<id>/secrets-config.md`.

## Steps
1. Scan the diff and configuration for credentials, tokens, keys, connection strings, and private URLs; report locations only, never the values.
2. Separate configuration (safe to commit, varies by environment) from secrets (never committed).
3. Choose the store and injection path (vault, cloud secret manager, CI secret store, environment variables) following company policy.
4. Define access per service identity, least privilege, and an audit trail.
5. Define rotation, expiry, and revocation, including emergency rotation after exposure.
6. Add guards: pre-commit secret scanning, CI scan, and an entry in the protected-paths list for config files.
7. If a secret was exposed, recommend immediate revocation and rotation, and a history clean-up decided with Security.

## Rules
- Never print, log, or copy a secret value into any artifact or reply; remind the user not to paste credentials into chat.
- Treat anything that looks like a live credential as compromised.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
