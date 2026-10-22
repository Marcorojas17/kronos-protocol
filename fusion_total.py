import pathlib, json, shutil, glob
root = pathlib.Path(".")
web = pathlib.Path("web")
web.mkdir(exist_ok=True)
(web / "CIUDAD").mkdir(exist_ok=True)
(web / "APPS").mkdir(exist_ok=True)
(web / "media").mkdir(exist_ok=True)

for f in ["README.md","CERTIFICADO-FINAL.json","CERTIFICADO-ARKHE.json","CERTIFICADO-ARKHE-1122.html","PITCH_WHATSAPP.txt","city.json","kronos.manifest.json","genesis-K28-merkle.json","MANIFESTO","CIUDAD-FINAL.txt"]:
    if (root/f).exists():
        (web/f).write_bytes((root/f).read_bytes())

apps = ["app_operador.py","app_certifier.py","app_certifier_real.py","gen_png_sin_pillow.py","arkhe.py"]
for a in apps:
    found = list(root.rglob(a))
    if found:
        (web/"APPS"/a).write_bytes(found[0].read_bytes())

for wav in glob.glob("/sdcard/Download/VALDOVINOS-ARKHE-*.wav"):
    shutil.copy(wav, web/"media"/pathlib.Path(wav).name)

manifest = {"SELLO_V2_DOBLE":"078633b141d7ec94","MERKLE":"6c97d9ee","MANIFEST":"e8d9eac8","FOLIO":"5204160405358537"}
try:
    manifest = json.loads((root/"kronos.manifest.json").read_text())
except: pass

html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>FUSION 289 - e8d9eac8</title>
<style>html,body{{background:#000;color:#0f0;margin:0;padding:10px;font-family:monospace}}*{{text-shadow:none!important;filter:none!important}}
.box{{border:1px solid #0f0;padding:10px;margin:12px 0;max-width:520px}}a{{color:#0f0}}pre{{white-space:pre-wrap;word-break:break-all}}</style></head><body>
<h2>◯_● ARKHE FUSIÓN - 289 ARCHIVOS - {manifest.get('MANIFEST','e8d9eac8')}</h2>
<div class="box"><b>📄 RAIZ</b><br>
README.md | CERTIFICADO-FINAL.json | CERTIFICADO-ARKHE.json | MANIFESTO | CIUDAD-FINAL.txt<br>
kronos.manifest.json - SELLO {manifest.get('SELLO_V2_DOBLE','078633b141d7ec94')} | genesis-K28-merkle.json - 6c97d9ee
</div>
<div class="box"><b>🏙️ CIUDAD</b><br>city.json | manifest.city.json | CERTIFICADO-CIUDAD | PITCH_WHATSAPP | VICTORIA.txt | /CIUDAD/ Constitución</div>
<div class="box"><b>🤖 APPS</b><br>app_operador.py | app_certifier.py | app_certifier_real.py | gen_png_sin_pillow.py | arkhe.py</div>
<div class="box"><b>🔊 AUDIOS</b><br><audio controls style="width:100%"><source src="media/VALDOVINOS-ARKHE-N9.wav"></audio><br>
5 wavs 3.2M en web/media/</div>
<div class="box"><b>💾 BACKUPS</b><br>ARKHE-GLOBAL-e8d9eac8.b64 260K | PART aa/ad 80K | TAR 193K | Gist 748ae7f5 + b6e0a90c</div>
<div class="box"><pre>┌─[11:22@TOLUCA:~/kronos-protocol]─[manifest:e8d9eac8]
└─○_● 289 archivos intactos
FOLIO 5204160405358537 | MERKLE 6c97d9ee | SELLO 078633b141d7ec94
KRONOS.ARKHE = 27054 = 11:22</pre>
<a href="desdoblamiento.html">DESDOBLAMIENTO MATRIZ</a> | <a href="index.html">INDEX 10 RAMAS</a> | <a href="inventario.html">INVENTARIO</a></div>
</body></html>
"""
(web/"fusion.html").write_text(html)
(web/"inventario.html").write_text(html)
print("OK fusion 289")

# repara index.html si no existe
if not (web/"index.html").exists() or (web/"index.html").stat().st_size < 100:
    (web/"index.html").write_text(html)

