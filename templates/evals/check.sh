#!/usr/bin/env bash
# Run one eval: invoke the agent with the eval prompt, then run each check. Exit non-zero on any failure.
# Usage: AGENT_CMD="<your agent non-interactive command>" bash evals/check.sh evals/example.json
set -euo pipefail

file="${1:?usage: check.sh <eval.json>}"
command -v jq >/dev/null 2>&1 || { echo "jq is required" >&2; exit 1; }
: "${AGENT_CMD:?Set AGENT_CMD to your agent's non-interactive command}"

name="$(jq -r '.name' "$file")"
prompt="$(jq -r '.prompt' "$file")"
echo "== eval: $name"

# The agent runs the task in the working tree.
$AGENT_CMD "$prompt" > "/tmp/eval-$name.log" 2>&1 || { echo "FAIL: agent run failed (see /tmp/eval-$name.log)"; exit 1; }

fail=0
while IFS= read -r check; do
  if bash -c "$check" >/dev/null 2>&1; then echo "  pass: $check"; else echo "  FAIL: $check"; fail=1; fi
done < <(jq -r '.checks[]' "$file")

exit $fail
