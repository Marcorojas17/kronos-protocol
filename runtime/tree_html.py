import os
from pathlib import Path

BASE = Path(".").resolve()
EXCLUDE = {'.git', 'venv', 'node_modules', 'modelos', '.arkhe-private'}

html = """<!DOCTYPE html><html><head><meta charset="utf-8"><title>ARKHÉ ZERO · Inventario</title>
<style>body{background:#050508;color:#00E5FF;font-family:monospace;padding:20px;line-height:1.5}
.folder{color:#D4AF37;font-weight:bold;margin-top:10px}.file{margin-left:20px;color:#c8ffc8}
</style></head><body><h1>◯_● Inventario del Repositorio</h1><div>"""

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in EXCLUDE]
    level = root.replace(str(BASE), '').count(os.sep)
    indent = '│  ' * level
    if level > 0:
        html += f'<div class="folder">{indent}📁 {os.path.basename(root)}/</div>\n'
    for f in sorted(files):
        html += f'<div class="file">{indent}├── {f}</div>\n'

html += "</div></body></html>"
Path("docs/inventario_archivos.html").write_text(html, encoding='utf-8')
print("✅ Inventario creado en docs/inventario_archivos.html")
