#!/usr/bin/env bash
# Guard: fail when a change touches protected paths without an approval.
# Works in CI and locally (bash 3.2+). Usage:
#   protected-paths.sh <base-ref> [approved]
# Pass "approved" (for example when a pull request carries the approval label) to allow the change.
set -euo pipefail

base="${1:-origin/main}"
approved="${2:-}"
list="$(dirname "$0")/protected-paths.txt"

[ -f "$list" ] || { echo "No protected-paths.txt found; nothing to check."; exit 0; }

changed="$(git diff --name-only "$base"...HEAD)"
hits=""
while IFS= read -r prefix; do
  case "$prefix" in ''|'#'*) continue ;; esac
  while IFS= read -r file; do
    case "$file" in "$prefix"*) hits="$hits$file"$'\n' ;; esac
  done <<< "$changed"
done < "$list"

if [ -z "$hits" ]; then
  echo "OK: no protected paths changed."
  exit 0
fi

echo "Protected paths changed:" >&2
printf '%s' "$hits" >&2
if [ "$approved" = "approved" ]; then
  echo "Approval recorded; allowing." >&2
  exit 0
fi
echo "BLOCKED: changes to protected paths need a recorded approval (see docs/aidlc/policies/README.md for the route)." >&2
exit 2
