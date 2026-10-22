import pathlib, json, os
web = pathlib.Path("web")
root = pathlib.Path(".")

# 1. Genera catálogo real de todo lo que hay en web/
files = []
for p in sorted(web.rglob("*")):
    if p.is_file() and p.stat().st_size>0:
        rel = str(p.relative_to(web))
        if "__pycache__" not in rel and ".pyc" not in rel:
            files.append(rel)

# 2. Guarda catálogo como JSON para que el front lo lea
(web/"pages.json").write_text(json.dumps(sorted(files), indent=2), encoding="utf-8")
(web/"manifest.web.json").write_text(json.dumps({"count": len(files), "manifest": "e8d9eac8", "sello":"078633b141d7ec94"}, indent=2))

print(f"Catalogados {len(files)} archivos en web/")

# 3. INDEX con lógica que NO SE ROMPE - carga dinámico + secciones fijas
html = f"""<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>KRONOS 27054 - {len(files)} ARCHIVOS - TOLUCA 11:22 - e8d9eac8</title>
<style>
html,body{{background:#000;color:#0f0;margin:0;padding:10px;font-family:"Courier New",monospace;max-width:720px;margin:auto}}
*{{text-shadow:none!important;filter:none!important;box-shadow:none!important}}
.box{{border:1px solid #0f0;padding:10px;margin:12px 0}}
a{{color:#0f0;word-break:break-all}}
.tag{{border:1px solid #0f0;padding:2px 6px;margin:2px;display:inline-block;font-size:11px}}
input{{background:#000;border:1px solid #0f0;color:#0f0;padding:6px;width:100%;box-sizing:border-box}}
.ascii{{font-size:9px;line-height:9px;white-space:pre;color:#0f0;text-shadow:0 0 5px #0f0!important}}
</style></head><body>
<pre class="ascii"> _  __ ____   ___  _  _  ____  ____
| |/ / _  \\ |  _ \\| \\ |/ __ \\|  _ \\
| ' / | | | | |_) | | | | | | | |_) |
| . \\ |_| | |  _ <| |_| | |_| |  _ <
|_|\\_\\___/  |_| \\_\\\\___/ \\____/|_| \\_\\</pre>
SISTEMA DE AUTORÍA HUMANO-IA INICIADO o_• TOLUCA 11:22<br>
MANIFEST e8d9eac8 | SELLO 078633b141d7ec94 | {len(files)} ARCHIVOS

<div class="box">
$ cat .elegido <b>15-04-1999 22:35 TOLUCA ELEGIDO 11:22</b><br>
KRONOS.ARKHE = 27054<br>
<span style="font-size:10px;word-break:break-all">e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0bbaa e</span><br>
<span class="tag">51% Humano / 49% IA</span> <span class="tag">GUARDIANES 10874+27054+31042</span> <span class="tag">HTTP 200 OK</span>
</div>

<div class="box">
<b>🔊 AUDIO N9 11:22</b><br>
<audio controls autoplay loop style="width:100%"><source src="media/VALDOVINOS-ARKHE-N9.wav"></audio><br>
<a href="media/VALDOVINOS-ARKHE-N9.wav">N9.wav</a> | <a href="media/VALDOVINOS-ARKHE-N9-SIMPLE.wav">SIMPLE</a> | <a href="media/VALDOVINOS-ARKHE-SONIDO-FUERTE.wav">FUERTE</a> | <a href="media/VALDOVINOS-ARKHE-SONIDO-RAPIDO.wav">RAPIDO</a>
</div>

<div class="box">
<b>📜 NODOS ETERNOS</b><br>
<a href="https://gist.github.com/Marcorojas17/b6e0a90c32487b93936a0f8af7b6f4d6">Gist MANIFEST</a> | <a href="https://gist.github.com/Marcorojas17/748ae7f542960bca85be00bbd874a67f">Gist TAR 193K</a> | <a href="https://github.com/Marcorojas17/kronos-protocol">Repo FULL</a>
</div>

<div class="box">
<b>🔍 BUSCAR ARCHIVO - {len(files)} archivos</b><br>
<input id="q" placeholder="Escribe reglas, reporte, sello, tesis, ciudad..." oninput="filtrar()">
<div id="lista" style="max-height:400px;overflow:auto;margin-top:8px"></div>
</div>

<div class="box">
<b>📂 SECCIONES FIJAS QUE NO SE ROMPEN</b><br>
<a href="reglas.html">reglas.html</a> | <a href="reportes.html">reportes.html</a> | <a href="requisitos.html">requisitos.html</a> | <a href="sello.html">sello.html</a> | <a href="tesis.html">tesis.html</a> | <a href="roadmap.html">roadmap.html</a> | <a href="verificador.html">verificador.html</a> | <a href="whitepaper.html">whitepaper.html</a> | <a href="desdoblamiento.html">desdoblamiento.html</a> | <a href="fusion.html">fusion.html</a><br>
<small>Todas las reglas, reportes, sellos y requisitos están en pages.json</small>
</div>

<script>
let todos=[];
fetch('pages.json').then(r=>r.json()).then(j=>{{todos=j; render(j);}});
function render(arr){{
  let h='';
  // Agrupa por tipo
  let grupos={{}};
  arr.forEach(f=>{{
    let ext=f.split('.').pop();
    if(!grupos[ext]) grupos[ext]=[];
    grupos[ext].push(f);
  }});
  for(let ext in grupos){{
    h+=`<b>${{ext}} (${{grupos[ext].length}})</b><br>`;
    grupos[ext].slice(0,100).forEach(f=>{{ h+=`<a href="${{f}}">${{f}}</a><br>`; }});
    if(grupos[ext].length>100) h+=`<small>+ ${{grupos[ext].length-100}} más...</small><br>`;
    h+='<br>';
  }}
  document.getElementById('lista').innerHTML=h;
}}
function filtrar(){{
  let q=document.getElementById('q').value.toLowerCase();
  if(!q) return render(todos);
  let f=todos.filter(x=>x.toLowerCase().includes(q));
  let h=`<small>${{f.length}} resultados para "${{q}}"</small><br>`;
  f.slice(0,200).forEach(file=>{{ h+=`<a href="${{file}}">${{file}}</a><br>`; }});
  document.getElementById('lista').innerHTML=h;
}}
</script>

<div class="box"><pre>┌─[11:22@TOLUCA]─[manifest:e8d9eac8]
└─○_● {len(files)} archivos intactos | FOLIO 5204160405358537 | MERKLE 6c97d9ee | SELLO 078633b141d7ec94</pre></div>
</body></html>
"""
(web/"index.html").write_text(html)
(web/"desdoblamiento.html").write_text(html)
print(f"INDEX FINAL con {len(files)} archivos escrito")
