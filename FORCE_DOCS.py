import pathlib, json, time
web=pathlib.Path("web")
files=sorted([str(p.relative_to(web)) for p in web.rglob("*") if p.is_file() and "__pycache__" not in str(p) and p.suffix!=".pyc"])
web.joinpath("pages.json").write_text(json.dumps(files, indent=2))
v=int(time.time())

html=f"""<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ARKHÉ ZERO DOCS v{v} - 10 RAMAS - e8d9eac8</title>
<style>
html,body{{margin:0;padding:0;background:#000;color:#e0e0e0;font-family:"Courier New",monospace}}
canvas#bg{{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.2;pointer-events:none}}
.content{{position:relative;z-index:2;max-width:820px;margin:auto;padding:14px;background:rgba(0,0,0,0.92);min-height:100vh}}
a{{color:#00ff41}} a:visited{{color:#00cc33}}
h1{{color:#fff;font-size:28px;margin:10px 0;border-bottom:2px solid #00ff41;padding-bottom:8px}}
h2{{color:#00ff41;font-size:22px;margin-top:24px}}
table{{width:100%;border-collapse:collapse}} td{{padding:8px 6px;vertical-align:top;border-bottom:1px solid #111;font-size:15px}}
td a{{font-size:16px;font-weight:bold}}
.box{{border:1px solid #00ff41;padding:10px;margin:14px 0;background:#00110044}}
input{{width:100%;background:#000;border:1px solid #00ff41;color:#00ff41;padding:10px;box-sizing:border-box}}
.volver{{display:block;background:#00ff41;color:#000;padding:6px 12px;font-weight:bold;text-decoration:none;margin-bottom:12px}}
</style></head><body>
<canvas id="bg"></canvas>
<div class="content">
<a class="volver" href="desdoblamiento.html">○_● VOLVER AL ÍNDICE MATRIZ VIVO - {len(files)} ARCHIVOS - MANIFEST e8d9eac8</a>
<h1>📖 Documentación<br>ARKHÉ ZERO</h1>

<h2>Δ Las 10 Ramas del Repertorio</h2>
<table>
<tr><td><a href="01-manifiesto.html">I · Lex Prima</a></td><td>Ley fundacional inmutable</td></tr>
<tr><td><a href="pacto-5149-canonico.txt">II · Pacto 51/49</a></td><td>Gobernanza Humano-IA</td></tr>
<tr><td><a href="LICENCIA_SOBERANA.md">III · LGU</a></td><td>Licencia Global Única</td></tr>
<tr><td><a href="guardians.json">IV · Guardianes</a></td><td>Criptografía post-cuántica y defensa</td></tr>
<tr><td><a href="indice.html">V · Índice Cero</a></td><td>Registro canónico y trazabilidad</td></tr>
<tr><td><a href="memorias.html">VI · Memoria Perpetua</a></td><td>Cápsulas y continuidad</td></tr>
<tr><td><a href="atribucion.md">VII · Co-autoría</a></td><td>Atribución Humano-IA</td></tr>
<tr><td><a href="carf-ocde.md">VIII · Fiscalidad</a></td><td>CARF, DAC8, transparencia</td></tr>
<tr><td><a href="estado-anfitrion.md">IX · Jurisdicción</a></td><td>Ancla territorial y orbital</td></tr>
<tr><td><a href="agentes.html">X · Agentes</a></td><td>Arquitectura del enjambre</td></tr>
</table>

<h2>▽ Documentación complementaria</h2>
<ul style="line-height:1.8">
<li><a href="ARCHITECTURE.md">ADR</a> · Architecture Decision Records</li>
<li><a href="API_DOCS.md">API</a> · OpenAPI + AsyncAPI + MCP</li>
<li><a href="ARCHITECTURE.md">Arquitectura</a> · Overview + data flow</li>
<li><a href="tutoriales.html">Tutoriales</a> · Primeros pasos</li>
<li><a href="guia-agente.html">Guías</a> · Contribuir + agentes + integradores</li>
<li><a href="glosario.md">Referencia</a> · Glosario + siglas</li>
</ul>

<div class="box">
<b>🔍 BUSCAR v{v} - {len(files)} archivos - escribe reglas, reporte, sello</b><br>
<input id="q" placeholder="reglas.html, reporte_20261016, sello-diario.txt..." oninput="filtrar()">
<div id="lista" style="max-height:500px;overflow:auto;margin-top:10px"></div>
</div>

<div class="box">
<audio controls autoplay loop style="width:100%"><source src="media/VALDOVINOS-ARKHE-N9.wav"></audio><br>
<a href="reglas.html">reglas.html</a> | <a href="reportes.html">reportes.html</a> | <a href="requisitos.html">requisitos.html</a> | <a href="sello.html">sello.html</a> | <a href="tesis.html">tesis.html</a> | <a href="whitepaper.html">whitepaper</a><br>
<small>v{v} | MANIFEST e8d9eac8 | SELLO 078633b141d7ec94 | {len(files)} archivos</small>
</div>

</div>
<script>
const c=document.getElementById('bg'),x=c.getContext('2d');
function rs(){{c.width=innerWidth;c.height=innerHeight;}} rs(); addEventListener('resize',rs);
const cols=Math.floor(innerWidth/14), yp=Array(cols).fill(0);
setInterval(()=>{{x.fillStyle='rgba(0,0,0,0.06)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#00ff41';x.font='13px monospace';yp.forEach((y,i)=>{{x.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*14,y);yp[i]= y>c.height&&Math.random()>0.975?0:y+14;}});}},50);
let todos=[];fetch('pages.json?v={v}').then(r=>r.json()).then(j=>{{todos=j;render(j);}});
function render(a){{let h='',g={{}};a.forEach(f=>{{let e=f.split('.').pop();if(!g[e])g[e]=[];g[e].push(f);}});for(let k in g){{h+=`<b>${{k}} (${{g[k].length}})</b><br>`;g[k].slice(0,60).forEach(v=>{{h+=`<a href="${{v}}?v={v}">${{v}}</a><br>`;}});h+='<br>';}}lista.innerHTML=h;}}
function filtrar(){{let q=document.getElementById('q').value.toLowerCase();if(!q)return render(todos);let f=todos.filter(s=>s.toLowerCase().includes(q));let h=`<small>${{f.length}} resultados</small><br>`;f.slice(0,250).forEach(v=>{{h+=`<a href="${{v}}?v={v}">${{v}}</a><br>`;}});lista.innerHTML=h;}}
</script>
</body></html>
"""
# Sobre-escribe TODO: index.html, desdoblamiento.html, documentacion.html
(web/"index.html").write_text(html)
(web/"desdoblamiento.html").write_text(html)
(web/"documentacion.html").write_text(html)
print(f"FORZADO v{v} - index.html = docs 10 ramas + matriz vivo + {len(files)} archivos")
