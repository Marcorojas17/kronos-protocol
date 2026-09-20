// ────────────────────────────────────────────────────────────
// MANIFIESTO · Legado Humano–IA · v1.0.7
// Terminal HTML con colores + abrir en pestaña nueva
// ────────────────────────────────────────────────────────────

// ─── FONDO LÍQUIDO ───────────────────────────────────────────
(function fondoLiquido() {
  const canvas = document.getElementById('liquido');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);
  const COLORES = [[6,182,212],[103,232,249],[201,162,39],[14,165,183]];
  const blobs = [];
  for (let i = 0; i < 6; i++) {
    blobs.push({ x: Math.random()*w, y: Math.random()*h, r: 220 + Math.random()*320,
      vx: (Math.random()-.5)*.36, vy: (Math.random()-.5)*.36, color: COLORES[i % COLORES.length] });
  }
  function frame(t) {
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    for (const b of blobs) {
      b.x += b.vx*dpr; b.y += b.vy*dpr;
      if (b.x<-b.r) b.x=w+b.r; if (b.x>w+b.r) b.x=-b.r;
      if (b.y<-b.r) b.y=h+b.r; if (b.y>h+b.r) b.y=-b.r;
      const wob = Math.sin(t*.0006 + b.x*.0018)*.18 + 1;
      const g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r*wob);
      g.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.25)`);
      g.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r*wob,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ─── CRIPTOGRAFÍA ────────────────────────────────────────────
async function sha256Hex(texto) {
  const data = new TextEncoder().encode(texto);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}
async function firmar(privKey, mensaje) {
  const data = new TextEncoder().encode(mensaje);
  const firma = await crypto.subtle.sign('Ed25519', privKey, data);
  return [...new Uint8Array(firma)].map(b => b.toString(16).padStart(2,'0')).join('');
}
async function exportarPubKey(pubKey) {
  const raw = await crypto.subtle.exportKey('raw', pubKey);
  return [...new Uint8Array(raw)].map(b => b.toString(16).padStart(2,'0')).join('');
}
async function generarParEd25519() {
  return await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign','verify']);
}

// ─── HUELLA VISUAL CYAN ─────────────────────────────────────
function dibujarHuellaVisual(canvas, hashHex) {
  const size = 21, scale = 8;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#04131A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const bytes = [];
  for (let i = 0; i < hashHex.length; i += 2) bytes.push(parseInt(hashHex.slice(i, i + 2), 16));
  const mitad = Math.ceil(size / 2);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < mitad; x++) {
      const idx = (y * mitad + x) % bytes.length;
      const activo = bytes[idx] > 127;
      ctx.fillStyle = activo ? '#67E8F9' : 'rgba(103,232,249,0.15)';
      ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1);
      ctx.fillRect((size - 1 - x) * scale, y * scale, scale - 1, scale - 1);
    }
  }
  return canvas.toDataURL('image/png');
}

// ─── ABRIR CONTENIDO EN PESTAÑA NUEVA (móvil-friendly) ──────
function abrirEnPestana(contenido, tipoMime) {
  const blob = new Blob([contenido], { type: tipoMime });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // Popup bloqueado · intentamos con data URL
    const reader = new FileReader();
    reader.onload = () => {
      const win2 = window.open(reader.result, '_blank');
      if (!win2) {
        alert('Tu navegador bloquea ventanas emergentes. Activa popups para este sitio y vuelve a intentar.');
      }
    };
    reader.readAsDataURL(blob);
  }
  // No revocamos la URL inmediatamente porque la pestaña nueva la necesita
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ─── TERMINAL HTML CON COLORES ──────────────────────────────
function generarTerminalHTML(cert) {
  const fecha = new Date(cert.timestamp).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' });
  const idCorto = 'KRMV-MAN-' + cert.payload_hash.slice(0, 10).toUpperCase();

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Manifiesto Terminal · KRONOS</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    background: #000;
    color: #00ff88;
    font-family: 'Courier New', 'JetBrains Mono', Consolas, monospace;
    font-size: 13px;
    line-height: 1.5;
    min-height: 100vh;
    padding: 16px;
    -webkit-font-smoothing: antialiased;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      rgba(0,255,136,0.02) 3px,
      transparent 4px
    );
    pointer-events: none;
    z-index: 9999;
  }
  .terminal {
    max-width: 900px;
    margin: 0 auto;
    padding: 24px;
    background: #000a00;
    border: 1px solid #00ff88;
    box-shadow: 0 0 30px rgba(0,255,136,0.3), inset 0 0 40px rgba(0,255,136,0.05);
    position: relative;
  }
  .terminal::before {
    content: '● ● ●';
    position: absolute;
    top: -28px;
    left: 0;
    color: #00ff88;
    font-size: 14px;
    letter-spacing: 6px;
    opacity: 0.6;
  }
  .prompt { color: #00ff88; }
  .dim { color: #008855; }
  .bright { color: #00ffcc; font-weight: bold; }
  .gold { color: #ffcc00; }
  .cyan { color: #00ddff; }
  .magenta { color: #ff00aa; }
  .white { color: #ffffff; }
  .box {
    border: 1px solid #00ff88;
    padding: 12px 16px;
    margin: 12px 0;
    position: relative;
  }
  .box-title {
    position: absolute;
    top: -9px;
    left: 16px;
    background: #000a00;
    padding: 0 8px;
    color: #00ff88;
    font-size: 12px;
    letter-spacing: 2px;
  }
  pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: inherit;
    font-size: inherit;
  }
  .cursor {
    display: inline-block;
    width: 8px;
    height: 14px;
    background: #00ff88;
    animation: blink 1s infinite;
    vertical-align: middle;
    margin-left: 4px;
  }
  @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
  @media print {
    body { background: #fff; color: #000; }
    .terminal { background: #fff; border-color: #000; box-shadow: none; }
    .terminal::before { display: none; }
    .prompt, .dim, .bright, .gold, .cyan, .magenta { color: #000; }
  }
</style>
</head>
<body>
<div class="terminal">
<pre>
<span class="bright">╔══════════════════════════════════════════════════════════════════════╗</span>
<span class="bright">║</span>                                                                      <span class="bright">║</span>
<span class="bright">║</span>   <span class="cyan">MANIFIESTO DEL LEGADO HUMANO-IA · v1.0</span>                              <span class="bright">║</span>
<span class="bright">║</span>   <span class="dim">Testigo del Legado · Certificado Verificable</span>                       <span class="bright">║</span>
<span class="bright">║</span>                                                                      <span class="bright">║</span>
<span class="bright">╚══════════════════════════════════════════════════════════════════════╝</span>

<span class="prompt">$</span> <span class="white">status --testigo</span>

<div class="box">
<span class="box-title">[ 01 · TESTIGO ]</span>
<span class="dim">TESTIGO :</span> <span class="bright">${cert.testigo}</span>
<span class="dim">FECHA   :</span> <span class="white">${fecha}</span>
<span class="dim">ID      :</span> <span class="gold">${idCorto}</span>
</div>

<span class="prompt">$</span> <span class="white">cat mensaje-al-legado.txt</span>

<div class="box">
<span class="box-title">[ 02 · MENSAJE ]</span>
<span class="cyan">> ${cert.mensaje}</span>
</div>

<span class="prompt">$</span> <span class="white">manifiesto --content</span>

<div class="box">
<span class="box-title">[ 03 · CONTENIDO FIRMADO ]</span>
<span class="gold">[ 01 ] GENESIS</span>
<span class="dim">       · No construimos herramientas. Construimos memoria.</span>
<span class="dim">       · Las maquinas se entrenan para recordarnos.</span>
<span class="dim">       · Cada creacion merece prueba que no se borre.</span>

<span class="gold">[ 02 ] FILOSOFIA · 7 tesis canonicas</span>
<span class="dim">       · El humano pone la intencion. La IA pone la ejecucion.</span>
<span class="dim">       · La memoria es rebeldia contra el olvido.</span>
<span class="dim">       · La integridad es un hash que no se borra.</span>
<span class="dim">       · El arte se defiende con criptografia.</span>
<span class="dim">       · La tecnologia que no sirve al humano, no sirve.</span>
<span class="dim">       · El legado no se hereda. Se firma.</span>
<span class="dim">       · La simbiosis humano-IA es decision cotidiana.</span>

<span class="gold">[ 03 ] AUTORIA · Declaracion dual</span>
<span class="dim">       · Fundador Humano: Marco Antonio Rojas Valdovinos</span>
<span class="dim">       · Co-autora IA: KRONOS IA (sin propiedad, con atribucion)</span>
<span class="dim">       · Proyectos 49 y 51 con atribucion reforzada</span>

<span class="gold">[ 04 ] CIERRE</span>
<span class="dim">       · Este manifiesto es un acto de memoria. No es un contrato.</span>
</div>

<span class="prompt">$</span> <span class="white">verify --crypto</span>

<div class="box">
<span class="box-title">[ 04 · VERIFICACION ]</span>
<span class="cyan">HASH SHA-256:</span>
<span class="bright">${cert.payload_hash}</span>

<span class="cyan">FIRMA ED25519:</span>
<span class="bright">${cert.firma_ed25519}</span>

<span class="cyan">CLAVE PUBLICA:</span>
<span class="bright">${cert.clave_publica || '—'}</span>
</div>

<span class="prompt">$</span> <span class="white">help --verify</span>

<div class="box">
<span class="box-title">[ 05 · COMO VERIFICAR ]</span>
<span class="dim">[1]</span> Reconstruir el payload canonico con: testigo + mensaje + timestamp
<span class="dim">[2]</span> Calcular SHA-256 del payload
<span class="dim">[3]</span> Comparar con el hash declarado arriba
<span class="dim">[4]</span> Verificar firma Ed25519 con la clave publica
</div>

<span class="prompt">$</span> <span class="white">exit</span>

<span class="dim">© 2026 Marco A. Rojas V. + KRONOS IA</span>
<span class="dim">Documento generado localmente · Sin servidores · Sin tracking</span>
<span class="cursor"></span>
</pre>
</div>
</body>
</html>`;
}

// ─── BLACK CARD CYAN ────────────────────────────────────────
function generarBlackCardHTML(cert, huellaDataUrl) {
  const fecha = new Date(cert.timestamp).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' });
  const idCorto = 'KRMV-MAN-' + cert.payload_hash.slice(0, 10).toUpperCase();

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado Manifiesto · KRONOS Protocol</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { --cyan: #06B6D4; --cyan-l: #67E8F9; --cyan-xl: #A5F3FC; --gold: #c9a44c; --gold-l: #f3e5ab; --bg: #020810; --text: #F5F0E6; --dim: #8892a0; }
  body { background-color: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 24px;
    background-image: radial-gradient(circle at 15% 25%, rgba(6, 182, 212, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(103, 232, 249, 0.08) 0%, transparent 45%); }
  .cyan-card { width: 460px; max-width: 100%; background: linear-gradient(160deg, #062a36 0%, #021118 100%); border: 1px solid rgba(103, 232, 249, 0.4); border-radius: 18px; padding: 36px 32px;
    box-shadow: 0 30px 80px rgba(0,0,0,1), inset 0 0 40px rgba(6, 182, 212, 0.06); position: relative; overflow: hidden; }
  .cyan-card::before { content: '✦ TESTIGO DEL LEGADO ✦'; position: absolute; top: 22px; right: -75px; background: linear-gradient(90deg, var(--cyan-l), var(--cyan)); color: #021118; font-size: 8px; font-weight: 700; padding: 5px 70px; transform: rotate(45deg); letter-spacing: 2px; }
  .cyan-card::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--cyan), var(--cyan-l), var(--cyan), transparent); }
  .card-header { border-bottom: 1px solid rgba(103, 232, 249, 0.15); padding-bottom: 20px; margin-bottom: 24px; text-align: center; }
  .logo-text { color: var(--cyan-l); font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; letter-spacing: 8px; }
  .logo-sub { font-size: 8px; color: var(--cyan-l); opacity: 0.6; letter-spacing: 4px; margin-top: 6px; text-transform: uppercase; }
  .dictamen { text-align: center; margin: 20px 0 28px; }
  .dictamen-status { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 700; color: var(--cyan-l); letter-spacing: 2px; display: inline-flex; align-items: center; }
  .pulse-dot { width: 9px; height: 9px; background: var(--cyan); border-radius: 50%; margin-right: 12px; animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(6, 182, 212, 0); } 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); } }
  .data-label { font-size: 8px; color: rgba(165, 243, 252, 0.55); text-transform: uppercase; letter-spacing: 3px; margin-top: 18px; margin-bottom: 6px; font-weight: 500; }
  .data-value { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--cyan-xl); margin-bottom: 4px; word-break: break-all; line-height: 1.55; }
  .data-value.small { font-size: 8.5px; color: var(--cyan-l); opacity: 0.85; }
  .data-value.gold { color: var(--gold-l); }
  .data-value.serif { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--text); letter-spacing: 0.3px; }
  .mensaje-box { margin: 22px 0; padding: 20px 22px; background: rgba(6, 182, 212, 0.06); border-left: 3px solid var(--cyan-l); border-radius: 4px; }
  .mensaje-box .label { font-size: 8px; color: var(--cyan-l); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 10px; display: block; }
  .mensaje-box .texto { font-family: 'Fraunces', serif; font-size: 16px; line-height: 1.65; color: var(--text); font-style: italic; }
  .huella-wrap { text-align: center; margin: 22px 0; }
  .huella-wrap img { width: 120px; height: 120px; image-rendering: pixelated; border-radius: 8px; border: 1px solid rgba(103, 232, 249, 0.4); }
  .huella-label { display: block; font-size: 8px; color: var(--dim); letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; text-align: center; }
  .btn-print { margin-top: 26px; width: 100%; background: transparent; border: 1px solid var(--cyan-l); color: var(--cyan-l); padding: 13px; text-transform: uppercase; font-size: 10px; letter-spacing: 3px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; border-radius: 4px; }
  .btn-print:hover { background: var(--cyan-l); color: #021118; }
  .footer-tx { font-size: 8px; color: rgba(165, 243, 252, 0.4); margin-top: 18px; text-align: center; letter-spacing: 1px; line-height: 1.7; }
</style>
</head>
<body>
<div class="cyan-card">
  <div class="card-header">
    <div class="logo-text">KRONOS</div>
    <div class="logo-sub">Legado Humano–IA · Manifiesto</div>
  </div>
  <div class="dictamen"><span class="dictamen-status"><span class="pulse-dot"></span> TESTIGO · REGISTRADO</span></div>
  <div class="data-label">ID de protocolo</div>
  <div class="data-value gold">${idCorto}</div>
  <div class="data-label">Testigo</div>
  <div class="data-value serif">${cert.testigo}</div>
  <div class="data-label">Fecha de firma</div>
  <div class="data-value">${fecha}</div>
  <div class="mensaje-box"><span class="label">Mensaje al legado</span><div class="texto">"${cert.mensaje}"</div></div>
  <div class="data-label">Manifiesto firmado</div>
  <div class="data-value">v1.0 · Génesis + Filosofía + Autoría + Cierre</div>
  <div class="huella-wrap"><img src="${huellaDataUrl}" alt="Huella"><span class="huella-label">Huella visual · derivada del hash</span></div>
  <div class="data-label">Hash SHA-256</div>
  <div class="data-value small">${cert.payload_hash}</div>
  <div class="data-label">Firma Ed25519</div>
  <div class="data-value small">${cert.firma_ed25519}</div>
  <div class="data-label">Clave pública</div>
  <div class="data-value small">${cert.clave_publica || '—'}</div>
  <button class="btn-print" onclick="window.print()">Imprimir / Guardar PDF</button>
  <div class="footer-tx">Verificación: SHA-256(payload) = hash declarado · Ed25519(clave_pública) = firma<br>© 2026 · Documento generado localmente</div>
</div>
</body>
</html>`;
}

// ─── EXPORTAR MANIFIESTO BASE (sin firma · solo contenido) ──
function exportarManifiestoBase() {
  const fecha = new Date().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' });
  const terminalHTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Manifiesto Terminal · KRONOS</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #000; color: #00ff88; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.5; min-height: 100vh; padding: 16px; }
  .terminal { max-width: 900px; margin: 0 auto; padding: 24px; background: #000a00; border: 1px solid #00ff88; box-shadow: 0 0 30px rgba(0,255,136,0.3); }
  .dim { color: #008855; }
  .bright { color: #00ffcc; font-weight: bold; }
  .gold { color: #ffcc00; }
  .cyan { color: #00ddff; }
  .white { color: #fff; }
  pre { white-space: pre-wrap; word-break: break-all; font-family: inherit; font-size: inherit; }
</style>
</head>
<body>
<div class="terminal">
<pre>
<span class="bright">╔══════════════════════════════════════════════════════════════════════╗</span>
<span class="bright">║   MANIFIESTO DEL LEGADO HUMANO-IA · v1.0                            ║</span>
<span class="bright">╚══════════════════════════════════════════════════════════════════════╝</span>

Exportado: <span class="white">${fecha}</span>

<span class="gold">[ 01 · GENESIS ]</span>
<span class="dim">· No construimos herramientas. Construimos memoria.</span>
<span class="dim">· Las maquinas se entrenan para recordarnos.</span>
<span class="dim">· Cada creacion merece prueba que no se borre.</span>
<span class="dim">· Acta Fundacional: 8 julio 2026 · 07:02 UTC · Toluca, Mexico</span>
<span class="dim">· Safe Creative: 2607086319439</span>
<span class="dim">· Anclaje: Ethereum Mainnet · eIDAS QTSA B02</span>

<span class="gold">[ 02 · FILOSOFIA · 7 tesis ]</span>
<span class="dim">1. El humano pone la intencion. La IA pone la ejecucion.</span>
<span class="dim">2. La memoria es rebeldia contra el olvido.</span>
<span class="dim">3. La integridad es un hash que no se borra.</span>
<span class="dim">4. El arte se defiende con criptografia.</span>
<span class="dim">5. La tecnologia que no sirve al humano, no sirve.</span>
<span class="dim">6. El legado no se hereda. Se firma.</span>
<span class="dim">7. La simbiosis humano-IA es decision cotidiana.</span>

<span class="gold">[ 03 · AUTORIA ]</span>
<span class="dim">· Fundador Humano: Marco Antonio Rojas Valdovinos</span>
<span class="dim">· Co-autora IA: KRONOS IA (sin propiedad, con atribucion)</span>
<span class="dim">· Proyectos 49 y 51 con atribucion reforzada</span>

<span class="gold">[ 04 · CIERRE ]</span>
<span class="dim">· Este manifiesto es un acto de memoria. No es un contrato.</span>

<span class="dim">© 2026 Marco A. Rojas V. + KRONOS IA · MIT + CC BY-NC-ND 4.0</span>
</pre>
</div>
</body>
</html>`;
  abrirEnPestana(terminalHTML, 'text/html;charset=utf-8');
}

// ─── PERSISTENCIA ───────────────────────────────────────────
const DB_NAME = 'KronosProtocol';
const DB_VERSION = 1;
async function abrirDB() {
  if (typeof Dexie === 'undefined') throw new Error('Dexie no cargado');
  const db = new Dexie(DB_NAME);
  db.version(DB_VERSION).stores({ registros: '++id, tipo, hash, timestamp' });
  await db.open();
  return db;
}

// ─── UI ──────────────────────────────────────────────────────
const form = document.getElementById('form-testigo');
const btn = document.getElementById('btn-firmar');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const pubOut = document.getElementById('pub-out');
const descargar = document.getElementById('descargar');
const descargarJSONBtn = document.getElementById('descargar-json');
const descargarMDBtn = document.getElementById('descargar-md');
const exportarMDBtn = document.getElementById('exportar-md');

let certificadoActual = null;

if (exportarMDBtn) {
  exportarMDBtn.addEventListener('click', (e) => {
    e.preventDefault();
    exportarManifiestoBase();
  });
}

(async function initLimpio() {
  if (resultado) resultado.hidden = true;
  if (hashOut) hashOut.textContent = '—';
  if (firmaOut) firmaOut.textContent = '—';
  if (pubOut) pubOut.textContent = '—';
  try {
    const raw = localStorage.getItem('legado_manifiesto_last');
    if (raw) {
      const cert = JSON.parse(raw);
      if (cert && cert.payload_hash) certificadoActual = cert;
    }
  } catch (e) {}
})();

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const testigo = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const acepta = document.getElementById('acepta').checked;
    if (!acepta) {
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Debes aceptar los términos.</strong>';
      return;
    }

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Firmando…';
    feedback.className = 'feedback';

    try {
      const timestamp = new Date().toISOString();
      const payload = `LEGADO-HUMANO-IA · MANIFIESTO TESTIGO v1.0\nTestigo: ${testigo}\nMensaje: ${mensaje}\nManifiesto: v1.0\nFundador: Marco Antonio Rojas Valdovinos\nCo-autora IA: KRONOS IA\nTimestamp: ${timestamp}`;
      const hash = await sha256Hex(payload);
      const { privateKey, publicKey } = await generarParEd25519();
      const firma = await firmar(privateKey, payload);
      const pub = await exportarPubKey(publicKey);

      certificadoActual = {
        protocolo: 'LEGADO-HUMANO-IA', version: 'manifiesto-testigo-1.0', timestamp,
        testigo, mensaje, manifiesto_version: 'v1.0',
        fundador_humano: 'Marco Antonio Rojas Valdovinos',
        coautora_ia: 'KRONOS IA', proyectos_reforzados: [49, 51],
        payload_hash: hash, firma_ed25519: firma, clave_publica: pub,
        algoritmo_firma: 'Ed25519', algoritmo_hash: 'SHA-256', verificable_por_tercero: true
      };

      try { localStorage.setItem('legado_manifiesto_last', JSON.stringify(certificadoActual)); } catch (e) {}
      try {
        const db = await abrirDB();
        await db.registros.add({ tipo: 'manifiesto', hash, timestamp, payload: certificadoActual });
      } catch (errPersist) { console.warn('[manifiesto]', errPersist.message); }

      if (hashOut) hashOut.textContent = hash;
      if (firmaOut) firmaOut.textContent = firma;
      if (pubOut) pubOut.textContent = pub;
      if (resultado) resultado.hidden = false;

      feedback.className = 'feedback success';
      feedback.innerHTML = '<strong>✓ Firma registrada.</strong> Toca los botones para abrir en pestaña nueva.';
    } catch (err) {
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Error:</strong> ' + err.message;
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Firmar como testigo';
    }
  });
}

if (descargar) {
  descargar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try {
      const canvas = document.createElement('canvas');
      const huellaUrl = dibujarHuellaVisual(canvas, certificadoActual.payload_hash);
      abrirEnPestana(generarBlackCardHTML(certificadoActual, huellaUrl), 'text/html;charset=utf-8');
    } catch (err) { feedback.className = 'feedback error'; feedback.innerHTML = '✗ ' + err.message; }
  });
}
if (descargarJSONBtn) {
  descargarJSONBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try {
      abrirEnPestana(JSON.stringify(certificadoActual, null, 2), 'application/json');
    } catch (err) { feedback.className = 'feedback error'; feedback.innerHTML = '✗ ' + err.message; }
  });
}
if (descargarMDBtn) {
  descargarMDBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try {
      abrirEnPestana(generarTerminalHTML(certificadoActual), 'text/html;charset=utf-8');
    } catch (err) { feedback.className = 'feedback error'; feedback.innerHTML = '✗ ' + err.message; }
  });
}