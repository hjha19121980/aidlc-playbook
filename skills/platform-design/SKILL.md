---
name: platform-design
description: Design the cloud or on-premises platform a solution runs on - landing zone, network, identity, environments, shared services, and guardrails. Use when a change needs new or changed platform foundations.
---

# Platform design

Stage: Design. Produces: `docs/aidlc/changes/<id>/platform.md`.

## Steps
1. Read the spec and NFRs (nfr-capacity-planning); list workload types, environments, and regions.
2. Define the account or subscription structure, naming, tagging, and ownership.
3. Define network layout: segments, ingress and egress, private connectivity, DNS, and firewall rules.
4. Define identity and access: roles, least-privilege model, service identities, and break-glass access.
5. Define shared services: logging, monitoring, secrets (secrets-and-config-management), backup, and key management.
6. Define policy guardrails and cost controls (budgets, quotas, cost-optimization).
7. Add resilience targets (availability zones, regions, RTO and RPO; see rollback-and-disaster-recovery).
8. List what infrastructure-as-code will create and what remains manual.

## Rules
- Keep the design provider-neutral unless the client has fixed a provider; state the choice and reason.
- Data residency and regulated workloads go to compliance-and-privacy-review.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
