#!/data/data/com.termux/files/usr/bin/bash
# anclar.sh — Ancla hashes SHA-256 de todos los .md de docs/ a crypto/anclajes.log

set -eu

echo "🔨 Anclando archivos…"
mkdir -p crypto

LOG="crypto/anclajes.log"
: > "$LOG"

for file in $(find docs -name '*.md' | sort); do
    HASH=$(sha256sum "$file" | awk '{print $1}')
    STAMP=$(date -u +%Y%m%dT%H%M%SZ)
    printf '%s  %s  %s\n' "$STAMP" "$HASH" "$file" | tee -a "$LOG"
done

echo "✅ Anclaje completado en $LOG"
echo "   Total archivos: $(wc -l < "$LOG")"
