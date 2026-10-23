import os

# Nos aseguramos de estar en la carpeta correcta
base_dir = "academic_thesis/tesis_fundacional"
os.makedirs(f"{base_dir}/docs", exist_ok=True)
os.makedirs(f"{base_dir}/crypto", exist_ok=True)
os.makedirs(f"{base_dir}/scripts", exist_ok=True)

# 1. Crear el script de anclaje
script_content = """#!/data/data/com.termux/files/usr/bin/bash
set -eu
cd "$(dirname "$0")/.."
echo "🔨 Anclando archivos..."
mkdir -p crypto
LOG=crypto/anclajes.log
: > "$LOG"
for file in $(find docs -name '*.md' | sort); do
    HASH=$(sha256sum "$file" | awk '{print $1}')
    STAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
    printf '%s  %s  %s\\n' "$STAMP" "$HASH" "$file" | tee -a "$LOG"
done
echo "✅ Anclaje completado en $LOG"
"""

with open(f"{base_dir}/anclar_tesis.sh", "w", encoding="utf-8") as f:
    f.write(script_content)
os.chmod(f"{base_dir}/anclar_tesis.sh", 0o755)

# 2. Crear el HTML KINTSUGI
html_content = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ARKHÉ ZERO — Tesis Fundacional</title>
<style>
body { background:#0b0b0b; color:#e8e8e8; font-family:Georgia,serif; text-align:center; padding:3rem 1rem; line-height:1.7; }
h1   { font-size:3rem; letter-spacing:0.3em; margin:0.5rem 0; }
h2   { color:#d4af37; margin-top:3rem; letter-spacing:0.15em; }
.seal{ color:#d4af37; font-family:monospace; font-size:0.9rem; }
ul   { list-style:none; padding:0; max-width:640px; margin:1rem auto; text-align:left; }
li   { margin:0.4rem 0; }
hr   { border:0; border-top:1px solid #333; margin:2rem auto; max-width:480px; }
footer{ margin-top:4rem; color:#888; font-size:0.85rem; }
</style>
</head>
<body>
<h1>ARKHÉ ZERO</h1>
<p class="seal">51 · 49 · 100 · KINTSUGI · SCDR-001 · YHDRYH-92CE</p>
<p><em>"El legado no se hereda. Se firma."</em></p>
<hr>

<h2>PARTE I · FILOSOFÍA Y FUNDAMENTOS</h2>
<ul>
<li>Cap 01 · KINTSUGI — la metáfora fundacional</li>
<li>Cap 02 · El villano — a qué nos enfrentamos</li>
<li>Cap 03 · El héroe — a quién servimos</li>
<li>Cap 04 · La misión — por qué existimos</li>
<li>Cap 05 · El pacto 51/49 — la gobernanza</li>
</ul>

<h2>PARTE II · PROBLEMÁTICA Y ESTADO DEL ARTE</h2>
<ul>
<li>Cap 06 · La amnesia de la IA</li>
<li>Cap 07 · Los TOS que nunca firmaste</li>
<li>Cap 08 · La fragilidad de la memoria digital</li>
<li>Cap 09 · La burocracia fragmentada</li>
<li>Cap 10 · La muerte sin sucesión</li>
</ul>

<h2>PARTE III · ARQUITECTURA TÉCNICA</h2>
<ul>
<li>Cap 11 · Las 6 capas del sistema</li>
<li>Cap 12 · Criptografía poscuántica</li>
<li>Cap 13 · El Índice Cero</li>
<li>Cap 14 · Provenance y atribución</li>
<li>Cap 15 · El enjambre ARKHÉ</li>
</ul>
<hr>
<footer>
Marco Antonio Rojas Valdovinos · Toluca · 2026<br>
<span class="seal">◯_●</span>
</footer>
</body>
</html>
"""

with open(f"{base_dir}/index_kintsugi.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("✅ Archivos generados y reparados exitosamente en academic_thesis/tesis_fundacional/")
