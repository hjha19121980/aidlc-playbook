#!/usr/bin/env bash
# Installs the AIDLC skills, agents, templates and docs into a project folder.
# Works on macOS (bash 3.2+) and Linux. Needs: curl (unless --zip is used), unzip.
#
# Usage:
#   bash install.sh --target ~/work/my-project --tool all --base-url https://host/downloads
#   bash install.sh --target ~/work/my-project --zip ./aidlc-skills-all.zip
#
# Options:
#   --target <dir>     Folder to install into (created if missing). Default: current folder.
#   --tool <name>      all (default), agent (terminal AI agent) or copilot (GitHub Copilot).
#   --base-url <url>   URL of the downloads folder of the deployed AIDLC Playbook.
#   --zip <file>       Install from a zip you already downloaded.
#   --skills <a,b,c>   Install only these skills (aidlc-workflow is always included). Default: all.
#   --agents <a,b,c>   Install only these agents, or "none". Default: all, or none if --skills is given.
set -euo pipefail

target="$PWD"
tool="all"
base_url=""
zip_path=""
skills_arg=""   # comma-separated skill names; empty means all
agents_arg=""   # comma-separated agent names, or "none"; empty means all (or none when --skills is given)

usage() { sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'; }

while [ $# -gt 0 ]; do
  case "$1" in
    --target)   target="${2:-}"; shift 2 ;;
    --tool)     tool="${2:-}"; shift 2 ;;
    --base-url) base_url="${2:-}"; shift 2 ;;
    --zip)      zip_path="${2:-}"; shift 2 ;;
    --skills)   skills_arg="${2:-}"; shift 2 ;;
    --agents)   agents_arg="${2:-}"; shift 2 ;;
    -h|--help)  usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
done

case "$tool" in all|agent|copilot) ;; *) echo "--tool must be all, agent or copilot" >&2; exit 2 ;; esac
if [ -z "$base_url" ] && [ -z "$zip_path" ]; then
  echo "Provide --base-url <url of the downloads folder> or --zip <local zip>." >&2; exit 2
fi
command -v unzip >/dev/null 2>&1 || { echo "unzip is required." >&2; exit 1; }

# Expand a leading ~ in the target.
case "$target" in
  "~"|"~/"*) target="$HOME${target#\~}" ;;
esac
mkdir -p "$target"
target="$(cd "$target" && pwd)"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

sha256() {
  if command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1" | cut -d' ' -f1
  else sha256sum "$1" | cut -d' ' -f1; fi
}

name="aidlc-skills-$tool.zip"
if [ -n "$zip_path" ]; then
  zip_file="$zip_path"
else
  base="${base_url%/}"
  zip_file="$tmp/$name"
  echo "Downloading $base/$name"
  curl -fsSL "$base/$name" -o "$zip_file"
  expected=""
  if curl -fsSL "$base/manifest.json" -o "$tmp/manifest.json" 2>/dev/null; then
    expected="$(sed -n "s/.*\"$name\": *{\"sha256\": *\"\([0-9a-f]*\)\".*/\1/p" "$tmp/manifest.json" | head -n1)"
  fi
  if [ -n "$expected" ]; then
    actual="$(sha256 "$zip_file")"
    if [ "$expected" != "$actual" ]; then
      echo "Checksum mismatch for $name. Expected $expected but got $actual. Nothing was installed." >&2
      exit 1
    fi
    echo "Checksum verified (SHA-256)."
  else
    echo "Warning: could not verify the checksum (manifest.json unavailable). Continuing." >&2
  fi
fi

stage="$tmp/stage"
mkdir -p "$stage"
unzip -q -o "$zip_file" -d "$stage"

# Keep only the requested skills and agents (the bundle contains everything).
has() { case ",$1," in *",$2,"*) return 0 ;; esac; return 1; }
if [ -n "$skills_arg" ]; then
  keep_skills="aidlc-workflow,${skills_arg// /}"
  [ -n "$agents_arg" ] || agents_arg="none"
  for d in "$stage"/.claude/skills/* "$stage"/.github/skills/*; do
    [ -d "$d" ] || continue
    n="${d%/}"; n="${n##*/}"
    has "$keep_skills" "$n" || rm -rf "$d"
  done
  for f in "$stage"/.github/prompts/*.prompt.md; do
    [ -f "$f" ] || continue
    n="${f##*/}"; n="${n%.prompt.md}"
    has "$keep_skills" "$n" || rm -f "$f"
  done
fi
if [ -n "$agents_arg" ]; then
  keep_agents="${agents_arg// /}"
  for f in "$stage"/.claude/agents/*.md; do
    [ -f "$f" ] || continue
    n="${f##*/}"; n="${n%.md}"
    has "$keep_agents" "$n" || rm -f "$f"
  done
  for f in "$stage"/.github/agents/*.agent.md; do
    [ -f "$f" ] || continue
    n="${f##*/}"; n="${n%.agent.md}"
    has "$keep_agents" "$n" || rm -f "$f"
  done
fi

begin='<!-- aidlc:begin -->'
end='<!-- aidlc:end -->'

merge_block() {
  local file="$1" block_file="$2" block cur pre post
  block="$(cat "$block_file")"
  if [ -f "$file" ]; then
    cur="$(cat "$file")"
    if [[ "$cur" == *"$begin"* && "$cur" == *"$end"* ]]; then
      pre="${cur%%"$begin"*}"
      post="${cur#*"$end"}"
      printf '%s%s%s\n' "$pre" "$block" "$post" > "$file"
    else
      printf '%s\n\n%s\n' "$cur" "$block" > "$file"
    fi
  else
    printf '%s\n' "$block" > "$file"
  fi
}

kept=""

# 1) The Copilot guidance block is merged, not copied.
block_rel=".github/copilot-instructions.aidlc.md"
if [ -f "$stage/$block_rel" ]; then
  mkdir -p "$target/.github"
  merge_block "$target/.github/copilot-instructions.md" "$stage/$block_rel"
  rm -f "$stage/$block_rel"
fi

# 2) Seed files belong to the project once installed: keep any that already exist.
if [ -f "$stage/.aidlc-seed.txt" ]; then
  while IFS= read -r rel; do
    [ -n "$rel" ] || continue
    if [ -e "$target/$rel" ] && [ -e "$stage/$rel" ]; then
      kept="$kept $rel"
      rm -f "$stage/$rel"
    fi
  done < "$stage/.aidlc-seed.txt"
  rm -f "$stage/.aidlc-seed.txt"
fi

# 3) Everything else is copied in one operation (fast, even with many files).
installed=$(find "$stage" -type f | wc -l | tr -d " ")
cp -R "$stage"/. "$target"/

echo
echo "Installed $installed files into $target"
for k in $kept; do echo "Kept your existing $k"; done
echo
echo "Next steps:"
echo "  1. Open $target in your AI coding assistant (terminal agent or VS Code with Copilot Chat)."
echo "  2. Run /aidlc-workflow"
echo "  3. Read docs/aidlc/README.md"
