// ────────────────────────────────────────────────────────────
// FILOSOFÍA · Legado Humano–IA · v1.0.4
// Black Card Amatista + Opción B (vista limpia al recargar)
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

  const COLORES = [[124,58,237],[14,165,183],[245,158,11],[201,162,39],[229,199,107]];
  const blobs = [];
  for (let i = 0; i < 7; i++) {
    blobs.push({
      x: Math.random()*w, y: Math.random()*h,
      r: 220 + Math.random()*340,
      vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
      color: COLORES[i % COLORES.length]
    });
  }
  function frame(t) {
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    for (const b of blobs) {
      b.x += b.vx*dpr; b.y += b.vy*dpr;
      if (b.x<-b.r) b.x=w+b.r; if (b.x>w+b.r) b.x=-b.r;
      if (b.y<-b.r) b.y=h+b.r; if (b.y>h+b.r) b.y=-b.r;
      const wob = Math.sin(t*.0007 + b.x*.002)*.15 + 1;
      const g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r*wob);
      g.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.26)`);
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

// ─── HUELLA VISUAL (violeta/amatista) ───────────────────────
function dibujarHuellaVisual(canvas, hashHex) {
  const size = 21;
  const scale = 8;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0A0514';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const bytes = [];
  for (let i = 0; i < hashHex.length; i += 2) {
    bytes.push(parseInt(hashHex.slice(i, i + 2), 16));
  }

  const mitad = Math.ceil(size / 2);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < mitad; x++) {
      const idx = (y * mitad + x) % bytes.length;
      const activo = bytes[idx] > 127;
      ctx.fillStyle = activo ? '#a78bfa' : 'rgba(167,139,250,0.15)';
      ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1);
      ctx.fillRect((size - 1 - x) * scale, y * scale, scale - 1, scale - 1);
    }
  }
  return canvas.toDataURL('image/png');
}

// ─── BLACK CARD AMATISTA ────────────────────────────────────
function generarCertificadoHTML(cert, huellaDataUrl) {
  const fecha = new Date(cert.timestamp).toLocaleString('es-MX', {
    dateStyle: 'long', timeStyle: 'short'
  });
  const idCorto = 'KRMV-FIL-' + cert.payload_hash.slice(0, 10).toUpperCase();
  const tesisTexto = (cert.tesis_adoptadas || []).join(', ');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado Filosofía · KRONOS Protocol</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --violeta: #7C3AED;
    --violeta-l: #C4B5FD;
    --violeta-xl: #DDD6FE;
    --gold: #c9a44c;
    --gold-l: #f3e5ab;
    --bg: #050208;
    --text: #F5F0E6;
    --dim: #8892a0;
  }
  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    background-image:
      radial-gradient(circle at 15% 25%, rgba(124, 58, 237, 0.15) 0%, transparent 45%),
      radial-gradient(circle at 85% 75%, rgba(196, 181, 253, 0.08) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(201, 164, 76, 0.05) 0%, transparent 60%);
  }
  .filosofia-card {
    width: 460px;
    max-width: 100%;
    background: linear-gradient(160deg, #1a0f2e 0%, #0d0518 100%);
    border: 1px solid rgba(167, 139, 250, 0.4);
    border-radius: 18px;
    padding: 36px 32px;
    box-shadow:
      0 30px 80px rgba(0,0,0,1),
      inset 0 0 40px rgba(124, 58, 237, 0.08),
      0 0 60px rgba(124, 58, 237, 0.1);
    position: relative;
    overflow: hidden;
  }
  .filosofia-card::before {
    content: '✦ POSTURA FIRMADA ✦';
    position: absolute;
    top: 22px;
    right: -70px;
    background: linear-gradient(90deg, var(--violeta-l), var(--violeta));
    color: #0d0518;
    font-size: 8px;
    font-weight: 700;
    padding: 5px 70px;
    transform: rotate(45deg);
    letter-spacing: 2px;
  }
  .filosofia-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, var(--violeta), var(--violeta-l), var(--violeta), transparent);
  }
  .card-header {
    border-bottom: 1px solid rgba(167, 139, 250, 0.15);
    padding-bottom: 20px;
    margin-bottom: 24px;
    text-align: center;
  }
  .logo-text {
    color: var(--violeta-l);
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 8px;
    text-shadow: 0 0 20px rgba(167, 139, 250, 0.4);
  }
  .logo-sub {
    font-size: 8px;
    color: var(--violeta-l);
    opacity: 0.6;
    letter-spacing: 4px;
    margin-top: 6px;
    text-transform: uppercase;
  }
  .dictamen {
    text-align: center;
    margin: 20px 0 28px;
  }
  .dictamen-status {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 700;
    color: #10B981;
    text-shadow: 0 0 14px rgba(16, 185, 129, 0.5);
    letter-spacing: 2px;
    display: inline-flex;
    align-items: center;
  }
  .pulse-dot {
    width: 9px; height: 9px;
    background: #10B981;
    border-radius: 50%;
    margin-right: 12px;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70%  { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
  .data-label {
    font-size: 8px;
    color: rgba(196, 181, 253, 0.55);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-top: 18px;
    margin-bottom: 6px;
    font-weight: 500;
  }
  .data-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--violeta-xl);
    margin-bottom: 4px;
    word-break: break-all;
    line-height: 1.55;
  }
  .data-value.small { font-size: 8.5px; color: var(--violeta-l); opacity: 0.85; }
  .data-value.gold { color: var(--gold-l); }
  .data-value.serif {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.5px;
    font-style: italic;
  }
  .tesis-adoptadas {
    margin: 20px 0;
    padding: 16px 20px;
    background: rgba(124, 58, 237, 0.06);
    border-left: 3px solid var(--violeta-l);
    border-radius: 4px;
  }
  .tesis-adoptadas .label {
    font-size: 8px;
    color: var(--violeta-l);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
  }
  .tesis-adoptadas .lista {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--violeta-xl);
    letter-spacing: 0.5px;
  }
  .reflexion-box {
    margin: 22px 0;
    padding: 20px 22px;
    background: rgba(201, 164, 76, 0.04);
    border: 1px solid rgba(201, 164, 76, 0.25);
    border-radius: 6px;
    position: relative;
  }
  .reflexion-box::before {
    content: '"';
    position: absolute;
    top: -14px;
    left: 14px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    color: var(--gold);
    opacity: 0.5;
    line-height: 1;
  }
  .reflexion-box .label {
    font-size: 8px;
    color: var(--gold);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }
  .reflexion-box .texto {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-style: italic;
    line-height: 1.6;
    color: var(--text);
    text-align: left;
  }
  .huella-wrap {
    text-align: center;
    margin: 22px 0;
  }
  .huella-wrap img {
    width: 120px;
    height: 120px;
    image-rendering: pixelated;
    border-radius: 8px;
    border: 1px solid rgba(167, 139, 250, 0.4);
    box-shadow: 0 0 30px rgba(124, 58, 237, 0.2);
  }
  .huella-label {
    display: block;
    font-size: 8px;
    color: var(--dim);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 10px;
    text-align: center;
  }
  .btn-print {
    margin-top: 26px;
    width: 100%;
    background: transparent;
    border: 1px solid var(--violeta-l);
    color: var(--violeta-l);
    padding: 13px;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 3px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
    border-radius: 4px;
  }
  .btn-print:hover { background: var(--violeta-l); color: #0d0518; }
  .footer-tx {
    font-size: 8px;
    color: rgba(196, 181, 253, 0.4);
    margin-top: 18px;
    text-align: center;
    letter-spacing: 1px;
    line-height: 1.7;
  }
  @media print {
    body { background: #fff; padding: 0; }
    .btn-print { display: none; }
    .filosofia-card { box-shadow: none; border-color: #7C3AED; background: #fff; color: #000; }
    .filosofia-card::before { display: none; }
    .logo-text { color: #7C3AED; }
    .data-value { color: #333; }
    .data-value.serif, .reflexion-box .texto { color: #000; }
    .tesis-adoptadas .lista { color: #333; }
  }
  @media (max-width: 500px) {
    .filosofia-card { padding: 28px 22px; }
    .logo-text { font-size: 20px; letter-spacing: 6px; }
    .data-value.serif { font-size: 18px; }
    .reflexion-box .texto { font-size: 15px; }
  }
</style>
</head>
<body>
<div class="filosofia-card">
  <div class="card-header">
    <div class="logo-text">KRONOS</div>
    <div class="logo-sub">Legado Humano–IA · Filosofía</div>
  </div>
  <div class="dictamen">
    <span class="dictamen-status">
      <span class="pulse-dot"></span> POSTURA FIRMADA · VÁLIDA
    </span>
  </div>
  <div class="data-label">ID de protocolo</div>
  <div class="data-value gold">${idCorto}</div>
  <div class="data-label">Firmante</div>
  <div class="data-value serif">${cert.firmante}</div>
  <div class="data-label">Co-autoría IA</div>
  <div class="data-value">${cert.coautoria_ia}</div>
  <div class="data-label">Fecha de firma</div>
  <div class="data-value">${fecha}</div>
  <div class="tesis-adoptadas">
    <span class="label">Tesis adoptadas</span>
    <div class="lista">${tesisTexto}</div>
  </div>
  <div class="reflexion-box">
    <span class="label">Reflexión personal</span>
    <div class="texto">${cert.reflexion}</div>
  </div>
  <div class="huella-wrap">
    <img src="${huellaDataUrl}" alt="Huella visual del hash">
    <span class="huella-label">Huella visual · derivada del hash</span>
  </div>
  <div class="data-label">Hash SHA-256</div>
  <div class="data-value small">${cert.payload_hash}</div>
  <div class="data-label">Firma Ed25519</div>
  <div class="data-value small">${cert.firma_ed25519}</div>
  <div class="data-label">Clave pública</div>
  <div class="data-value small">${cert.clave_publica}</div>
  <button class="btn-print" onclick="window.print()">Imprimir / Guardar PDF</button>
  <div class="footer-tx">
    Verificación: SHA-256(payload) = hash declarado · Ed25519(clave_pública) = firma<br>
    © 2026 ${cert.firmante} + ${cert.coautoria_ia} · Documento generado localmente
  </div>
</div>
</body>
</html>`;
}

// ─── DESCARGAR: HTML + JSON ─────────────────────────────────
function descargarCertificado(cert) {
  const canvas = document.createElement('canvas');
  const huellaUrl = dibujarHuellaVisual(canvas, cert.payload_hash);

  const htmlContenido = generarCertificadoHTML(cert, huellaUrl);
  const blobHTML = new Blob([htmlContenido], { type: 'text/html;charset=utf-8' });
  const urlHTML = URL.createObjectURL(blobHTML);
  const aHTML = document.createElement('a');
  aHTML.href = urlHTML;
  aHTML.download = `kronos-filosofia-${cert.payload_hash.slice(0, 8)}.html`;
  document.body.appendChild(aHTML);
  aHTML.click();
  document.body.removeChild(aHTML);
  setTimeout(() => URL.revokeObjectURL(urlHTML), 2000);

  const jsonSalida = {
    ...cert,
    huella_visual: 'Patrón derivado del hash · no es QR escaneable',
    certificado_html_descargado: true,
    notas: 'El archivo .html contiene el certificado completo autocontenido.'
  };
  const blobJSON = new Blob([JSON.stringify(jsonSalida, null, 2)], { type: 'application/json' });
  const urlJSON = URL.createObjectURL(blobJSON);
  const aJSON = document.createElement('a');
  aJSON.href = urlJSON;
  aJSON.download = `kronos-filosofia-${cert.payload_hash.slice(0, 8)}.json`;
  document.body.appendChild(aJSON);
  aJSON.click();
  document.body.removeChild(aJSON);
  setTimeout(() => URL.revokeObjectURL(urlJSON), 2000);
}

// ─── PERSISTENCIA DEXIE ─────────────────────────────────────
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
const form = document.getElementById('form-postura');
const btn = document.getElementById('btn-firmar');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const pubOut = document.getElementById('pub-out');
const descargar = document.getElementById('descargar');
const checks = document.getElementById('checks');

let certificadoActual = null;

// ── Generar checkboxes ──────────────────────────────────────
if (checks) {
  checks.innerHTML = '';
  document.querySelectorAll('.tesis').forEach(t => {
    const id = t.dataset.id;
    const titulo = t.querySelector('h3')?.textContent || `Tesis ${id}`;
    const item = document.createElement('label');
    item.className = 'check-item';
    item.innerHTML = `<input type="checkbox" value="${id}"><span>${id}. ${titulo}</span>`;
    item.addEventListener('change', e => {
      item.classList.toggle('activo', e.target.checked);
    });
    checks.appendChild(item);
  });
  console.log('[filosofía] checkboxes generados:', checks.children.length);
}

// ═════════════════════════════════════════════════════════════
// OPCIÓN B · Al cargar: NO restaurar vista. Página limpia.
// El certificado se guarda en memoria para poder descargarlo,
// pero NO se muestra en pantalla al recargar.
// ═════════════════════════════════════════════════════════════
(async function initLimpio() {
  // Ocultar resultado
  if (resultado) resultado.hidden = true;
  if (hashOut) hashOut.textContent = '—';
  if (firmaOut) firmaOut.textContent = '—';
  if (pubOut) pubOut.textContent = '—';

  // Cargar certificado previo SOLO en memoria (no mostrar)
  try {
    const raw = localStorage.getItem('legado_filosofia_last');
    if (raw) {
      const cert = JSON.parse(raw);
      if (cert && cert.payload_hash) {
        certificadoActual = cert;
        console.log('[filosofía] certificado previo detectado (no mostrado en pantalla)');
      }
    }
  } catch (e) { /* silencio */ }
})();

// ── Submit ──────────────────────────────────────────────────
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const nombre = document.getElementById('nombre').value.trim();
    const reflexion = document.getElementById('reflexion').value.trim();
    const seleccionadas = [...checks.querySelectorAll('input:checked')].map(i => i.value);

    if (seleccionadas.length === 0) {
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Selecciona al menos una tesis.</strong>';
      return;
    }

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Firmando…';
    feedback.className = 'feedback';

    try {
      const timestamp = new Date().toISOString();
      const payload = `LEGADO-HUMANO-IA · FILOSOFIA v1.0\nFirmante: ${nombre}\nTesis adoptadas: ${seleccionadas.join(', ')}\nReflexion: ${reflexion}\nTimestamp: ${timestamp}`;

      const hash = await sha256Hex(payload);
      const { privateKey, publicKey } = await generarParEd25519();
      const firma = await firmar(privateKey, payload);
      const pub = await exportarPubKey(publicKey);

      certificadoActual = {
        protocolo: 'LEGADO-HUMANO-IA',
        version: 'filosofia-1.0',
        timestamp,
        firmante: nombre,
        tesis_adoptadas: seleccionadas,
        reflexion,
        payload_hash: hash,
        firma_ed25519: firma,
        clave_publica: pub,
        algoritmo_firma: 'Ed25519',
        algoritmo_hash: 'SHA-256',
        coautoria_ia: 'KRONOS IA',
        verificable_por_tercero: true
      };

      try {
        localStorage.setItem('legado_filosofia_last', JSON.stringify(certificadoActual));
      } catch (e) {}

      try {
        const db = await abrirDB();
        await db.registros.add({
          tipo: 'filosofia',
          hash,
          timestamp,
          payload: certificadoActual
        });
        console.log('[filosofía] ✅ guardado en IndexedDB');
      } catch (errPersist) {
        console.warn('[filosofía] IndexedDB no disponible:', errPersist.message);
      }

      hashOut.textContent = hash;
      firmaOut.textContent = firma;
      pubOut.textContent = pub;
      resultado.hidden = false;

      feedback.className = 'feedback success';
      feedback.innerHTML = '<strong>✓ Postura firmada.</strong> Descarga el certificado Black Card + JSON. Al recargar, la página se limpiará.';
    } catch (err) {
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Error:</strong> ' + err.message;
      console.error(err);
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Firmar postura';
    }
  });
}

// ── Descargar: HTML + JSON ─────────────────────────────────
if (descargar) {
  descargar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try {
      descargarCertificado(certificadoActual);
    } catch (err) {
      console.error('[filosofía] error al descargar:', err);
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Error al descargar:</strong> ' + err.message;
    }
  });
}