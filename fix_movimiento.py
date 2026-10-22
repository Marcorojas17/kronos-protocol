import pathlib, json
web = pathlib.Path("web")
files = sorted([str(p.relative_to(web)) for p in web.rglob("*") if p.is_file() and "__pycache__" not in str(p) and ".pyc" not in str(p)])
(web/"pages.json").write_text(json.dumps(files, indent=2))
print(f"{len(files)} archivos")

html = f"""<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>KRONOS 27054 - {len(files)} ARCHIVOS - FONDO VIVO - e8d9eac8</title>
<style>
html,body{{margin:0;padding:0;background:#000;color:#0f0;font-family:"Courier New",monospace;overflow-x:hidden}}
canvas#matrix{{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;opacity:.25}}
.content{{position:relative;z-index:1;max-width:720px;margin:auto;padding:10px;background:rgba(0,0,0,.85);min-height:100vh}}
.box{{border:1px solid #0f0;padding:10px;margin:12px 0;background:rgba(0,0,0,.9)}}
a{{color:#0f0;word-break:break-all}} input{{background:#000;border:1px solid #0f0;color:#0f0;padding:8px;width:100%;box-sizing:border-box}}
.tag{{border:1px solid #0f0;padding:2px 6px;margin:2px;display:inline-block;font-size:11px}}
.ascii{{font-size:9px;line-height:9px;white-space:pre;text-shadow:0 0 8px #0f0}}
</style></head><body>
<canvas id="matrix"></canvas>
<div class="content">
<pre class="ascii"> _  __ ____   ___  _  _  ____  ____
| |/ / _  \\ |  _ \\| \\ |/ __ \\|  _ \\
| ' / | | | | |_) | | | | | | | |_) |
| . \\ |_| | |  _ <| |_| | |_| |  _ <
|_|\\_\\___/  |_| \\_\\\\___/ \\____/|_| \\_\\</pre>
SISTEMA DE AUTORÍA HUMANO-IA INICIADO o_• TOLUCA 11:22<br>
MANIFEST e8d9eac8 | {len(files)} ARCHIVOS | FONDO MATRIZ VIVO

<div class="box">
$ cat .elegido <b>15-04-1999 22:35 TOLUCA ELEGIDO</b><br>
KRONOS.ARKHE = 27054 = 11:22<br>
<span style="font-size:9px;word-break:break-all">e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0bbaa e</span><br>
<span class="tag">51% Humano / 49% IA</span> <span class="tag">GUARDIANES 10874+27054+31042</span>
</div>

<div class="box">
<b>🔊 AUDIO N9 11:22 AUTOPLAY</b><br>
<audio controls autoplay loop style="width:100%"><source src="media/VALDOVINOS-ARKHE-N9.wav"></audio>
</div>

<div class="box">
<b>🔍 BUSCAR - escribe reglas, reporte, sello, tesis, requisitos</b><br>
<input id="q" placeholder="reglas.html, reporte_20261016, sello-diario, tesis..." oninput="filtrar()">
<div id="lista" style="max-height:500px;overflow:auto;margin-top:8px"></div>
</div>

<div class="box"><b>📂 FIJOS QUE NO FALLAN</b><br>
<a href="reglas.html">reglas.html</a> | <a href="reglas.md">reglas.md</a> | <a href="reportes.html">reportes.html</a> | <a href="requisitos.html">requisitos.html</a> | <a href="sello.html">sello.html</a> | <a href="sello-diario.txt">sello-diario.txt</a> | <a href="tesis.html">tesis.html</a> | <a href="whitepaper.html">whitepaper.html</a> | <a href="verificador.html">verificador.html</a>
</div>

<div class="box"><pre>┌─[11:22@TOLUCA]─[manifest:e8d9eac8]
└─○_● {len(files)} archivos | FOLIO 5204160405358537 | MERKLE 6c97d9ee | SELLO 078633b141d7ec94</pre></div>
</div>

<script>
// FONDO MATRIZ EN MOVIMIENTO
const c=document.getElementById('matrix'),ctx=c.getContext('2d');
function resize(){{c.width=window.innerWidth;c.height=window.innerHeight;}}
resize();window.onresize=resize;
const cols=Math.floor(c.width/14); const ypos=Array(cols).fill(0);
function matrix(){{
 ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,c.width,c.height);
 ctx.fillStyle='#0f0';ctx.font='12px monospace';
 ypos.forEach((y,ind)=>{{
  const text=String.fromCharCode(0x30A0+Math.random()*96);
  ctx.fillText(text,ind*14,y);
  if(y>c.height && Math.random()>0.975) ypos[ind]=0; else ypos[ind]=y+14;
 }});
}}
setInterval(matrix,50);

// BUSCADOR
let todos=[];
fetch('pages.json').then(r=>r.json()).then(j=>{{todos=j; render(j);}});
function render(arr){{
 let h=''; let grupos={{}};
 arr.forEach(f=>{{let k=f.split('/')[0]; if(f.includes('.')) k=f.split('.').pop(); if(!grupos[k]) grupos[k]=[]; grupos[k].push(f);}});
 for(let g in grupos){{
  h+=`<b>${{g}} (${{grupos[g].length}})</b><br>`;
  grupos[g].slice(0,80).forEach(file=>{{h+=`<a href="${{file}}">${{file}}</a><br>`;}});
  h+='<br>';
 }}
 document.getElementById('lista').innerHTML=h;
}}
function filtrar(){{
 let q=document.getElementById('q').value.toLowerCase();
 if(!q) return render(todos);
 let f=todos.filter(x=>x.toLowerCase().includes(q));
 let h=`<small>${{f.length}} resultados</small><br>`;
 f.slice(0,300).forEach(file=>{{h+=`<a href="${{file}}">${{file}}</a><br>`;}});
 document.getElementById('lista').innerHTML=h;
}}
</script>
</body></html>
"""
(web/"index.html").write_text(html)
(web/"desdoblamiento.html").write_text(html)
print(f"INDEX FONDO VIVO {len(files)} escrito")
