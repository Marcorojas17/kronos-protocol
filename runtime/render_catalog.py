import json, pathlib

BASE = pathlib.Path("/root/kronos-protocol")
data = json.loads((BASE / "catalogo.json").read_text())

# Agrupar por carpeta principal
groups = {}
for item in data:
    parts = item["path"].split("/")
    root = parts[0] if len(parts) > 1 else "Archivos Raíz"
    if root not in groups: groups[root] = []
    groups[root].append(item)

html = """<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>◯_● ARKHÉ ZERO · Librería Visual</title>
<link rel="manifest" href="../manifest.json">
<style>
body{background:#050508;color:#c8ffc8;font-family:'Courier New',monospace;padding:20px;padding-bottom:80px;}
h1{text-align:center;color:#D4AF37;font-size:20px;letter-spacing:2px;margin-bottom:5px;}
.sub{text-align:center;color:#00E5FF;font-size:10px;letter-spacing:3px;margin-bottom:25px;}
.search{width:100%;padding:14px;background:rgba(15,15,24,0.8);border:1px solid #D4AF37;color:#fff;font-family:inherit;font-size:12px;border-radius:4px;margin-bottom:20px;}
.folder{background:rgba(15,15,24,0.6);border-left:3px solid #D4AF37;margin-bottom:15px;border-radius:4px;overflow:hidden;}
.folder-header{padding:15px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:bold;color:#FFF3A0;font-size:13px;letter-spacing:1px;}
.folder-header span{color:#6a8f6a;font-size:10px;}
.folder-content{display:none;padding:0 15px 15px;grid-template-columns:1fr;gap:8px;}
.folder.open .folder-content{display:grid;}
.item{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:rgba(0,0,0,0.4);border:1px solid rgba(212,175,55,0.1);border-radius:2px;text-decoration:none;color:#c8ffc8;font-size:10px;transition:0.2s;}
.item:hover{background:rgba(212,175,55,0.1);border-color:#D4AF37;color:#fff;}
.item .path{word-break:break-all;margin-right:10px;}
.item .hash{color:#6a8f6a;font-size:9px;white-space:nowrap;}
</style></head><body>
<h1>◯_● ARKHÉ ZERO</h1>
<div class="sub">LIBRERÍA VISUAL · 1928 ARCHIVOS VERIFICABLES</div>
<input class="search" id="q" placeholder="Buscar archivo o carpeta..." onkeyup="filter()">
<div id="tree">
"""

for root_name in sorted(groups.keys()):
    items = groups[root_name]
    html += f"""
    <div class="folder">
      <div class="folder-header" onclick="this.parentElement.classList.toggle('open')">
        <div>📁 {root_name}</div>
        <span>{len(items)} archivos</span>
      </div>
      <div class="folder-content">
    """
    for it in items:
        html += f"""<a class="item" href="../{it['path']}" target="_blank"><span class="path">{it['path']}</span><span class="hash">{it['hash']}</span></a>"""
    html += "</div></div>"

html += """
</div>
<script>
function filter() {
  const q = document.getElementById('q').value.toLowerCase();
  document.querySelectorAll('.folder').forEach(f => {
    let visible = 0;
    f.querySelectorAll('.item').forEach(i => {
      const match = i.querySelector('.path').textContent.toLowerCase().includes(q);
      i.style.display = match ? 'flex' : 'none';
      if(match) visible++;
    });
    f.style.display = (visible > 0 || q === '') ? 'block' : 'none';
    if(q !== '') f.classList.add('open');
  });
}
</script>
<script src="/kronos-protocol/arkhe-nav.js"></script>
</body></html>"""

out = BASE / "docs" / "catalogo" / "index.html"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f"✅ Catálogo visual generado: {len(data)} archivos en {len(groups)} carpetas")
