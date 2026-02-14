#!/usr/bin/env bash
set -euo pipefail

SEARCH_PATHS=(apps/web/src apps/api/src)
TS_GLOBS=(-g '*.ts' -g '*.tsx' -g '*.mts' -g '*.cts')

# Pull exported shared contract names so app code cannot redefine them, even under future additions.
SHARED_NAMES=()
while IFS= read -r name; do
  SHARED_NAMES+=("$name")
done < <(
  rg -No --replace '$1' 'export\s+(?:type|interface)\s+([A-Za-z_][A-Za-z0-9_]*)\b' \
    packages/shared/src/contracts "${TS_GLOBS[@]}" 2>/dev/null || true
)

SHARED_RE='^$'
if ((${#SHARED_NAMES[@]} > 0)); then
  SHARED_RE="$(printf '%s\n' "${SHARED_NAMES[@]}" | sort -u | paste -sd'|' -)"
fi

# Block drift-prone API contract aliases from app code.
# Response/Error shapes should be imported from @acme/shared, not declared locally.
DRIFT_RE='(type|interface)\s+[A-Za-z_][A-Za-z0-9_]*(Response|Error)\b'
REDECLARED_SHARED_RE="(type|interface)\s+(${SHARED_RE})\b"

if rg -n "${DRIFT_RE}|${REDECLARED_SHARED_RE}" "${SEARCH_PATHS[@]}" "${TS_GLOBS[@]}" 2>/dev/null; then
  echo "Contract guard failed: found local contract type definitions in app code."
  echo "Use imports from @acme/shared instead of defining Response/Error or shared contract types locally."
  exit 1
fi

echo "Contract guard: OK"
