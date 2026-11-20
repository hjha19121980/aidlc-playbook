---
name: knowledge-graph
description: Build a graph of modules, services, data stores, APIs, teams, and their dependencies from code and configuration, as JSON plus a Mermaid view. Use for architecture comprehension, impact analysis, and onboarding.
---

# Knowledge graph

Stage: Build. Produces: `docs/aidlc/knowledge/graph.json and graph.md`.

## Steps
1. Define node types (module, service, API, data store, queue, team) and edge types (imports, calls, reads, writes, publishes, owned-by).
2. Extract nodes and edges from imports, configuration, API specs, infrastructure files, and ownership files; keep only what you can evidence.
3. Write `graph.json` as nodes and edges with a source path for each, and `graph.md` with a Mermaid diagram of the main structure.
4. Report hubs (many dependents), cycles, orphans, and cross-team edges.
5. Record the commit SHA; regenerate on structural change. The impact-analysis skill should query this graph first.

## Rules
- Every edge needs evidence (a path). Mark inferred edges as such.
- Mark inferred statements [ASSUMPTION]; keep credentials, client names, and personal data out of every artifact.
