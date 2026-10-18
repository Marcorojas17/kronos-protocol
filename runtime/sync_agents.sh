#!/bin/bash
# 1. Ejecutar el runner de agentes
python3 "$(dirname "$0")/agentes_runner.py"

# 2. Copiar el estado generado a la carpeta web
cp "$(dirname "$0")/estado/agentes.json" "$(dirname "$0")/../docs/estado/agentes.json"

# 3. Hacer commit y push (usando el token que ya guardaste)
cd "$(dirname "$0")/.."
git add docs/estado/agentes.json
git commit -m "🤖 estado agentes actualizado automáticamente [$(date +%H:%M)]"
git push origin main
