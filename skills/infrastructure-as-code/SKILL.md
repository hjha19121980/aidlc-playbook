---
name: infrastructure-as-code
description: Write and review infrastructure as code (modules, variables, state, policies) with least privilege, reproducibility, and a plan review. Use for environments and cloud resources.
---

# Infrastructure as code

Stage: Deploy. Produces: infrastructure files in the diff.

## Steps
1. Read the architecture and environment needs.
2. Write modular, parameterized definitions; keep state remote and locked.
3. Apply least-privilege roles, network restrictions, encryption, tagging, and cost controls.
4. Run the plan and review every change; never apply to production without the recorded approval.
5. Add policy checks (for example tag, encryption, public access) to the pipeline.

## Rules
- Infrastructure paths are protected paths. Never include credentials or state in the repository.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
