<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KRONOS · HONESTIDAD</title>
<style>
  :root {
    --bg: #06060a; --bg2: #0a0a12; --panel: #0f0f18; --panel2: #14141e;
    --gold: #D4AF37; --gold-light: #E5C76B; --gold-dim: rgba(212,175,55,0.3);
    --text: #E0E0E0; --dim: #888; --ok: #4ade80; --warn: #f59e0b; --bad: #ef4444;
    --border: #1a1a22;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: -apple-system, 'Segoe UI', system-ui, sans-serif; font-size: 15px; line-height: 1.6; overflow-x: hidden; }

#particles { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.particle { position: absolute; width: 3px; height: 3px; background: var(--gold); border-radius: 50%; box-shadow: 0 0 8px rgba(212,175,55,0.8); animation: float 12s infinite ease-in-out; }
@keyframes float { 0%,100% { transform: translateY(0); opacity: 0.2; } 50% { transform: translateY(-40px); opacity: 0.8; } }

.wrap { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; padding: 0 20px 60px; }

/* NAV */
nav.top { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: rgba(6,6,10,0.85); backdrop-filter: blur(10px); z-index: 50; }
nav.top .brand { font-family: Georgia, serif; font-size: 0.85rem; letter-spacing: 6px; color: var(--gold); font-weight: 700; }
nav.top a { color: var(--dim); text-decoration: none; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; transition: color 0.2s; }
nav.top a:hover { color: var(--gold); }

/* HERO */
.hero { text-align: center; padding: 60px 0 40px; }
.kicker { font-size: 0.7rem; letter-spacing: 5px; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; }
.hero h1 { font-family: Georgia, serif; font-size: 2.4rem; font-weight: 700; color: var(--gold-light); letter-spacing: 2px; margin-bottom: 14px; line-height: 1.1; text-shadow: 0 0 30px rgba(212,175,55,0.3); }
.hero .sub { font-family: Georgia, serif; font-style: italic; font-size: 1rem; color: var(--text); opacity: 0.85; max-width: 520px; margin: 0 auto; line-height: 1.6; }
.hero .stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 28px; font-size: 0.7rem; letter-spacing: 2px; color: var(--dim); }
.hero .stats span { color: var(--ok); }

/* SECTION */
section { margin-top: 50px; }
.sec-title { font-size: 0.7rem; letter-spacing: 5px; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--gold-dim); display: flex; align-items: center; gap: 10px; }
.sec-title::before { content: '▸'; color: var(--gold); }

/* TERMINAL PANEL */
.term { background: #000; border: 1px solid var(--border); border-radius: 6px; padding: 18px 20px; font-family: 'Fira Code', 'Courier New', monospace; font-size: 0.78rem; line-height: 1.7; color: var(--gold-light); overflow-x: auto; }
.term .line { display: block; }
.term .dim { color: var(--dim); }
.term .ok { color: var(--ok); }
.term .prompt { color: var(--ok); }

/* PROGRESS */
.prog { display: flex; flex-direction: column; gap: 14px; }
.prog-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center; }
.prog-row .label { font-size: 0.8rem; color: var(--text); }
.prog-row .label strong { color: var(--gold-light); font-weight: 500; }
.prog-row .pct { font-family: 'Courier New', monospace; font-size: 0.75rem; color: var(--dim); }
.bar { grid-column: 1 / -1; height: 8px; background: var(--panel2); border-radius: 4px; overflow: hidden; position: relative; }
.bar-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold-light)); border-radius: 4px; box-shadow: 0 0 12px rgba(212,175,55,0.5); }
.bar-fill.warn { background: linear-gradient(90deg, var(--warn), #fbbf24); box-shadow: 0 0 12px rgba(245,158,11,0.4); }
.bar-fill.bad { background: linear-gradient(90deg, var(--bad), #f87171); box-shadow: 0 0 12px rgba(239,68,68,0.4); }

/* CARDS */
.grid-2 { display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 600px) { .grid-2 { grid-template-columns: 1fr 1fr; } }
.card { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; padding: 18px; transition: border-color 0.2s; }
.card:hover { border-color: var(--gold-dim); }
.card h3 { color: var(--gold-light); font-family: Georgia, serif; font-size: 1rem; margin-bottom: 10px; letter-spacing: 0.5px; }
.card p { font-size: 0.85rem; color: var(--text); line-height: 1.6; }
.card .dim { color: var(--dim); font-size: 0.75rem; margin-top: 8px; display: block; }

/* CONCEPT MAP */
.map { display: flex; flex-direction: column; gap: 12px; align-items: center; }
.map-node { background: var(--panel); border: 1px solid var(--gold-dim); padding: 14px 20px; border-radius: 6px; text-align: center; font-size: 0.8rem; color: var(--gold-light); font-family: Georgia, serif; letter-spacing: 1px; min-width: 180px; }
.map-node.root { background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05)); border-color: var(--gold); font-weight: 700; }
.map-arrow { color: var(--gold); font-size: 1.2rem; }
.map-row { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.map-child { background: var(--panel2); border: 1px solid var(--border); padding: 10px 16px; border-radius: 4px; font-size: 0.75rem; color: var(--text); }

/* FLOW */
.flow { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center; padding: 20px; background: var(--panel); border: 1px solid var(--border); border-radius: 6px; }
.flow-step { background: var(--panel2); border: 1px solid var(--gold-dim); padding: 10px 14px; border-radius: 4px; font-size: 0.78rem; color: var(--text); }
.flow-step.pass { border-color: var(--ok); color: var(--ok); }
.flow-step.warn { border-color: var(--warn); color: var(--warn); }
.flow-step.bad { border-color: var(--bad); color: var(--bad); }
.flow-arrow { color: var(--gold); font-size: 1rem; }

/* DETAILS */
details { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; margin-bottom: 10px; overflow: hidden; transition: border-color 0.2s; }
details[open] { border-color: var(--gold-dim); }
details summary { padding: 14px 18px; cursor: pointer; color: var(--gold-light); font-size: 0.82rem; font-family: 'Courier New', monospace; letter-spacing: 1px; list-style: none; display: flex; align-items: center; gap: 10px; }
details summary::before { content: '▶'; color: var(--gold); font-size: 0.7rem; transition: transform 0.2s; }
details[open] summary::before { transform: rotate(90deg); }
details summary::-webkit-details-marker { display: none; }
details .body { padding: 0 18px 18px; font-size: 0.85rem; color: var(--text); line-height: 1.7; }
details .body .label { color: var(--gold); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; display: block; margin-top: 12px; margin-bottom: 6px; }
details .body code { background: #000; color: var(--gold-light); padding: 2px 6px; border-radius: 3px; font-size: 0.75rem; }
details .body pre { background: #000; border: 1px solid var(--border); padding: 12px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 0.72rem; color: var(--gold-light); overflow-x: auto; margin-top: 8px; line-height: 1.5; }
details .body ul { list-style: none; padding-left: 0; }
details .body li { padding-left: 16px; position: relative; margin-bottom: 4px; }
details .body li::before { content: '·'; color: var(--gold); position: absolute; left: 0; font-weight: bold; }

/* TABLE */
table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
th { color: var(--gold); text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--gold-dim); font-weight: 500; letter-spacing: 1px; font-size: 0.7rem; text-transform: uppercase; }
td { padding: 8px 10px; border-bottom: 1px solid var(--border); color: var(--text); }
td code { background: #000; color: var(--gold-light); padding: 2px 5px; border-radius: 3px; font-size: 0.72rem; }

/* ALERT */
.alert { padding: 14px 18px; border-radius: 6px; margin: 14px 0; font-size: 0.82rem; line-height: 1.6; display: flex; gap: 10px; align-items: flex-start; }
.alert.info { background: rgba(74,222,128,0.08); border-left: 3px solid var(--ok); color: var(--text); }
.alert.warn { background: rgba(245,158,11,0.08); border-left: 3px solid var(--warn); color: var(--text); }
.alert.bad { background: rgba(239,68,68,0.08); border-left: 3px solid var(--bad); color: var(--text); }
.alert .icon { font-size: 1rem; }

/* FOOTER */
footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid var(--border); text-align: center; font-size: 0.72rem; color: var(--dim); line-height: 2; letter-spacing: 1px; }
footer .seal { color: var(--gold); letter-spacing: 4px; margin-top: 10px; font-family: 'Courier New', monospace; }
</style>
</head>
<body>

<div id="particles"></div>

<nav class="top">
  <div class="brand">KRONOS</div>
  <a href="../index.html">← Inicio</a>
</nav>

<div class="wrap">

  <div class="hero">
    <div class="kicker">REGISTRO DE TRABAJO REAL</div>
    <h1>HONESTIDAD</h1>
    <p class="sub">Lo que se archiva, se recuerda.<br>Lo que se borra, miente.</p>
    <div class="stats">
      <span>○_●</span> 51% HUMANO · 49% IA · 100% REAL <span>◢◤◥◣</span>
    </div>
  </div>

  <section>
    <div class="sec-title">estado de iteraciones</div>
    <div class="prog">
      <div class="prog-row">
        <div class="label"><strong>certificados v1-v8</strong> · búsqueda estética</div>
        <div class="pct">100% ARCHIVADO</div>
        <div class="bar"><div class="bar-fill" style="width:100%"></div></div>
      </div>
      <div class="prog-row">
        <div class="label"><strong>index-v2 iframe</strong> · bug + fix</div>
        <div class="pct">100% ARCHIVADO</div>
        <div class="bar"><div class="bar-fill" style="width:100%"></div></div>
      </div>
      <div class="prog-row">
        <div class="label"><strong>fundador-v2.key</strong> · historia de seguridad</div>
        <div class="pct">100% ELIMINADO</div>
        <div class="bar"><div class="bar-fill" style="width:100%"></div></div>
      </div>
      <div class="prog-row">
        <div class="label"><strong>CONTEXTO v1-v3.16</strong> · evolución del protocolo</div>
        <div class="pct">100% ARCHIVADO</div>
        <div class="bar"><div class="bar-fill" style="width:100%"></div></div>
      </div>
      <div class="prog-row">
        <div class="label"><strong>duplicados</strong> · refactor</div>
        <div class="pct">100% ELIMINADO</div>
        <div class="bar"><div class="bar-fill" style="width:100%"></div></div>
      </div>
      <div class="prog-row">
        <div class="label"><strong>basura (i/Pnp/403/aditoria)</strong> · limpieza suave</div>
        <div class="pct">50% PENDIENTE</div>
        <div class="bar"><div class="bar-fill warn" style="width:50%"></div></div>
      </div>
    </div>
  </section>

  <section>
    <div class="sec-title">filosofía · mapa conceptual</div>
    <div class="map">
      <div class="map-node root">HONESTIDAD</div>
      <div class="map-arrow">▼</div>
      <div class="map-row">
        <div class="map-node">PRESERVAR</div>
        <div class="map-node">ARCHIVAR</div>
        <div class="map-node">DOCUMENTAR</div>
      </div>
      <div class="map-arrow">▼</div>
      <div class="map-row">
        <div class="map-child">commits antiguos</div>
        <div class="map-child">11-ARCHIVO/</div>
        <div class="map-child">README.md</div>
      </div>
      <div class="map-row">
        <div class="map-child">intentos fallidos</div>
        <div class="map-child">CONTEXTO previos</div>
        <div class="map-child">git comments</div>
      </div>
      <div class="map-row">
        <div class="map-child">bugs conocidos</div>
        <div class="map-child">certificados v1-v8</div>
        <div class="map-child">este archivo</div>
      </div>
    </div>
  </section>

  <section>
    <div class="sec-title">flujo de decisión · qué hacer con un archivo</div>
    <div class="flow">
      <div class="flow-step">Archivo</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">¿Funciona?</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step pass">MANTENER</div>
      <span class="flow-arrow">|</span>
      <div class="flow-step">¿Enseña?</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step warn">ARCHIVAR</div>
      <span class="flow-arrow">|</span>
      <div class="flow-step">¿Expone?</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step bad">ELIMINAR</div>
    </div>
  </section>

  <section>
    <div class="sec-title">procesos auditados</div>
    <table>
      <tr><th>pid</th><th>iteración</th><th>resultado</th><th>proof</th></tr>
      <tr><td><code>honest.01</code></td><td>certificados v1-v8</td><td style="color:var(--gold-light)">✅ ARCHIVADO</td><td>08-HERRAMIENTAS/</td></tr>
      <tr><td><code>honest.02</code></td><td>index-v2 iframe</td><td style="color:var(--gold-light)">✅ ARCHIVADO</td><td>git history</td></tr>
      <tr><td><code>honest.03</code></td><td>fundador-v2.key</td><td style="color:var(--bad)">✅ ELIMINADO</td><td>git log</td></tr>
      <tr><td><code>honest.04</code></td><td>CONTEXTO v1-v3.16</td><td style="color:var(--gold-light)">✅ ARCHIVADO</td><td>raíz</td></tr>
      <tr><td><code>honest.05</code></td><td>duplicados</td><td style="color:var(--bad)">✅ ELIMINADO</td><td>refactor</td></tr>
      <tr><td><code>honest.06</code></td><td>basura pendiente</td><td style="color:var(--warn)">🟡 PENDIENTE</td><td>sin clasificar</td></tr>
    </table>
  </section>

  <section>
    <div class="sec-title">evidencia pública</div>
    <table>
      <tr><th>key</th><th>valor</th></tr>
      <tr><td>merkle_docs</td><td><code>67180206595ec66d4d422b223f8d966961ecdf00cc2c32ed81133e83162ae813</code></td></tr>
      <tr><td>pubkey_founder</td><td><code>fd2fb1e9f198f5fa08ec6391b67730e3d997826c40cd7652dd5774aa5e744977</code></td></tr>
      <tr><td>eth_tx_2</td><td><a href="https://etherscan.io/tx/0xd2c2a7e128e6c81b689b3b0d9e1b31a4f6bf8df0391b7b6c05e7daa7fb895774c" target="_blank" style="color:var(--gold-light)">0xd2c2...774c</a></td></tr>
    </table>
  </section>

  <section>
    <div class="sec-title">detalle por iteración</div>

    <details>
      <summary>[honest.01] certificados v1-v8</summary>
      <div class="body">
        <span class="label">humano</span>
        8 certificados visuales descartados. Muestran la búsqueda estética del proyecto. No se borran, se archivan.
        <span class="label">máquina</span>
        <pre>$ ls 08-HERRAMIENTAS/*.png | head -n 10

$ git log --oneline -- 08-HERRAMIENTAS/certificados*</pre>
</div>
</details>

    <details>
      <summary>[honest.02] index-v2 iframe</summary>
      <div class="body">
        <span class="label">humano</span>
        Hubo un dashboard con iframe que rompía animaciones. Se reemplazó por cards. El bug y el fix están documentados.
        <span class="label">máquina</span>
        <pre>$ git log --oneline -- index-v2.html

$ git log --oneline -- index.html</pre>
</div>
</details>

    <details>
      <summary>[honest.03] fundador-v2.key</summary>
      <div class="body">
        <span class="label">humano</span>
        Hubo una llave privada expuesta. Se eliminó del repo. La historia queda en git log para trazabilidad.
        <span class="label">máquina</span>
        <pre>$ git log --all -- fundador-v2.key</pre>
      </div>
    </details>

    <details>
      <summary>[honest.04] CONTEXTO v1-v3.16</summary>
      <div class="body">
        <span class="label">humano</span>
        Los contextos portátiles previos muestran la evolución del protocolo. No se borran, se archivan.
        <span class="label">máquina</span>
        <pre>$ ls CONTEXTO* 2>/dev/null

$ git log --oneline -- CONTEXTO*</pre>
</div>
</details>

    <details>
      <summary>[honest.05] duplicados</summary>
      <div class="body">
        <span class="label">humano</span>
        Hubo carpetas y archivos duplicados. Se eliminaron pero quedan en el log.
        <span class="label">máquina</span>
        <pre>$ git log --oneline --all | grep -i "duplicad\|refactor"</pre>
      </div>
    </details>

    <details>
      <summary>[honest.06] basura pendiente</summary>
      <div class="body">
        <span class="label">humano</span>
        Quedan 4 archivos basura sin clasificar. Se limpian esta semana.
        <span class="label">máquina</span>
        <pre>$ ls -la i Pnp 403 aditoria 2>/dev/null</pre>
      </div>
    </details>

  </section>

  <section>
    <div class="sec-title">límites del sistema</div>
    <div class="alert bad">
      <span class="icon">⚠</span>
      <div><strong>KRONOS NO ES:</strong> respaldo de emergencia · almacén de llaves privadas · basurero sin reglas.</div>
    </div>
    <div class="alert info">
      <span class="icon">✓</span>
      <div><strong>KRONOS SÍ ES:</strong> prueba de trabajo real · trazable vía git log · reproducible por cualquiera.</div>
    </div>
  </section>

  <footer>
    <div>KRONOS PROTOCOL · HONESTIDAD</div>
    <div>© 2026 Marco Antonio Rojas Valdovinos · CC BY-NC-ND 4.0</div>
    <div class="seal">○_● · ◢◤◥◣ · ◥◣◢◤</div>
    <div class="seal">51% HUMANO · 49% IA · 100% REAL</div>
    <div class="seal">"Lo que se archiva, se recuerda. Lo que se borra, miente."</div>
  </footer>

</div>

<script>
(function() {
  const c = document.getElementById('particles');
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.animationDuration = (8 + Math.random() * 8) + 's';
    p.style.opacity = (0.15 + Math.random() * 0.4).toString();
    c.appendChild(p);
  }
})();
</script>
</body>
</html>
