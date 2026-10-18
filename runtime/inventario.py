#!/usr/bin/env python3
import os
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
EXCLUDE = {'.git', 'venv', 'node_modules', 'modelos', '.arkhe-private'}
EXT_MAP = {
    '.py': 'Python (Motores/Agentes)',
    '.html': 'HTML (Web/Certificados)',
    '.md': 'Markdown (Documentación/Constitución)',
    '.sol': 'Solidity (Smart Contracts)',
    '.json': 'JSON (Configuración/Estados)',
    '.sh': 'Bash (Scripts de Arranque)',
    '.sig': 'Firmas Criptográficas',
    '.ots': 'Sellos Bitcoin (OTS)',
    '.pub': 'Llaves Públicas'
}

inventario = {v: [] for v in EXT_MAP.values()}
otros = []
total_bytes = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in EXCLUDE]
    for f in files:
        path = Path(root) / f
        size = path.stat().st_size
        total_bytes += size
        ext = path.suffix.lower()
        
        if ext in EXT_MAP:
            inventario[EXT_MAP[ext]].append(str(path.relative_to(BASE)))
        else:
            otros.append(str(path.relative_to(BASE)))

# Generar reporte Markdown
reporte = "# ◯_● INVENTARIO ARKHÉ ZERO\n\n"
reporte += f"**Tamaño Total:** {total_bytes / 1024 / 1024:.2f} MB\n\n"

for categoria, archivos in inventario.items():
    if archivos:
        reporte += f"## {categoria} ({len(archivos)})\n"
        for a in sorted(archivos):
            reporte += f"- `{a}`\n"
        reporte += "\n"

# Escribir archivo
out = BASE / "docs" / "INVENTARIO.md"
out.write_text(reporte, encoding='utf-8')

# Imprimir resumen en consola
print(f"📦 Tamaño Total: {total_bytes / 1024 / 1024:.2f} MB")
print("─" * 40)
for cat, archivos in inventario.items():
    if archivos:
        print(f"✅ {cat}: {len(archivos)} archivos")
print("─" * 40)
print(f"📄 Reporte completo guardado en: docs/INVENTARIO.md")
