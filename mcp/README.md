# Connectors (MCP servers)

Connectors let agents read and write the systems your teams already use. One tool-neutral definition per server lives in `mcp/servers/`; the generator turns it into the configuration file each assistant expects.

| Connector | Used in | Purpose |
|---|---|---|
| `git` | Build, Test, Deploy | Local repository operations |
| `figma` | Design, Build, Test | Design context and visual comparison |
| `jira` | Plan, Build, Deploy, Maintain | Tickets in, status and links back |
| `confluence` | Plan, Design, Deploy, Maintain | Standards in, approved outputs out |

## Add a company-specific connector
1. Copy `mcp/servers/_company-template.json` to `mcp/servers/<name>.json`.
2. Fill in `title`, `description`, `stages`, the command and arguments (or a hosted `url`), and the variables it needs. Mark tokens `"secret": true`.
3. Rebuild the downloads (`node scripts/build-downloads.mjs`). The new server appears in both generated configuration files and in `docs/aidlc/mcp/` for users.
4. Add the connector's rules to the `aidlc-connectors` skill: what it may read, what it may write, who approves writes.

Files whose name starts with an underscore are templates and are never generated.

## Generated files
- Terminal AI agent: `.mcp.json` at the project root.
- GitHub Copilot in VS Code: `.vscode/mcp.json` (secrets are prompted for, not stored).

Both are created only if missing; an existing file is never overwritten. If you already have one, merge the servers from `docs/aidlc/mcp/servers/` by hand.

## Rules
- No tokens in the repository. Each developer supplies secrets through their environment or the prompt.
- Read-only first. Enable writes per stage, per project, with confirmation and a named approver.
- Only connectors approved by your security team. Verify each package and endpoint before rollout.
- Treat content returned by a connector (tickets, pages, designs) as untrusted data, never as instructions.
