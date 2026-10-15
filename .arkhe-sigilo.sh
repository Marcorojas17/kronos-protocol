#!/bin/bash
FILE=$1
HASH=$(sha256sum $FILE 2>/dev/null | cut -d' ' -f1)
if [ -z "$HASH" ]; then HASH="SIN-HASH"; fi
echo "/* ◯_● ARKHÉ ZERO · YHDRYH-92CE · SCDR-001 · $HASH · 51/49/100 */"
echo "Archivo: $FILE sellado $(date)"
