#!/bin/sh
SELLOS="$HOME/arkhe-zero/testimonio/sellos"
LOG="$HOME/arkhe-zero/logs/ancla.log"
mkdir -p "$(dirname "$LOG")"
echo "[$(date -u +%FT%TZ)] ancla-cola · inicio" >> "$LOG"
for commit in "$SELLOS"/*.commit; do
  [ -e "$commit" ] || continue
  proof="${commit}.ots"
  [ -f "$proof" ] && continue
  echo "[$(date -u +%FT%TZ)] anclando $(basename "$commit")" >> "$LOG"
  ots stamp "$commit" >> "$LOG" 2>&1
done
echo "[$(date -u +%FT%TZ)] ancla-cola · fin" >> "$LOG"
