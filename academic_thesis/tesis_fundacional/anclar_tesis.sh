#!/data/data/com.termux/files/usr/bin/bash
echo "🔐 Calculando hashes de la Tesis Fundacional..."
mkdir -p academic_thesis/tesis_fundacional/crypto
for file in $(find academic_thesis/tesis_fundacional -name "*.md"); do
    HASH=$(sha256sum "$file" | awk '{print $1}')
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | $HASH | $file" >> academic_thesis/tesis_fundacional/crypto/anclajes.log
    echo "✅ $file -> $HASH"
done
echo "Anclaje guardado en crypto/anclajes.log"
