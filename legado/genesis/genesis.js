// ────────────────────────────────────────────────────────────
// GÉNESIS · Legado Humano–IA · v1.0.7
// Black Card premium + Opción B (vista limpia al recargar)
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

  const COLORES = [
    [201, 162, 39], [14, 165, 183], [124, 58, 237], [245, 158, 11], [229, 199, 107]
  ];
  const blobs = [];
  for (let i = 0; i < 6; i++) {
    blobs.push({
      x: Math.random() * w, y: Math.random() * h,
      r: 200 + Math.random() * 320,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORES[i % COLORES.length]
    });
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (const b of blobs) {
      b.x += b.vx * dpr;
      b.y += b.vy * dpr;
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r;
      if (b.y > h + b.r) b.y = -b.r;
      const wobble = Math.sin(t * 0.0008 + b.x * 0.002) * 0.15 + 1;
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * wobble);
      grad.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.28)`);
      grad.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r * wobble, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ─── CRIPTOGRAFÍA ────────────────────────────────────────────
async function sha256Hex(texto) {
  const data = new TextEncoder().encode(texto);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function generarParEd25519() {
  return await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
}
async function firmar(privKey, mensaje) {
  const data = new TextEncoder().encode(mensaje);
  const firma = await crypto.subtle.sign('Ed25519', privKey, data);
  return [...new Uint8Array(firma)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function exportarPubKey(pubKey) {
  const raw = await crypto.subtle.exportKey('raw', pubKey);
  return [...new Uint8Array(raw)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── HUELLA VISUAL DEL HASH ─────────────────────────────────
function dibujarHuellaVisual(canvas, hashHex) {
  const size = 21;
  const scale = 8;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0A0A0B';
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
      ctx.fillStyle = activo ? '#c9a44c' : 'rgba(201,164,76,0.15)';
      ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1);
      ctx.fillRect((size - 1 - x) * scale, y * scale, scale - 1, scale - 1);
    }
  }

  return canvas.toDataURL('image/png');
}

// ─── GENERAR CERTIFICADO HTML (Black Card) ──────────────────
function generarCertificadoHTML(cert, huellaDataUrl) {
  const fecha = new Date(cert.timestamp).toLocaleString('es-MX', {
    dateStyle: 'long', timeStyle: 'short'
  });
  const idCorto = 'KRMV-' + cert.manifiesto_hash.slice(0, 12).toUpperCase();

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado Génesis · KRONOS Protocol</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --primary: #00f2ff;
    --gold: #c9a44c;
    --gold-l: #f3e5ab;
    --bg: #000;
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
      radial-gradient(circle at 10% 20%, rgba(189, 0, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(0, 242, 255, 0.05) 0%, transparent 50%);
  }
  .black-card {
    width: 420px;
    max-width: 100%;
    background: linear-gradient(145deg, #1a1a1a, #050505);
    border: 1px solid rgba(201, 164, 76, 0.35);
    border-radius: 15px;
    padding: 32px 28px;
    box-shadow: 0 30px 80px rgba(0,0,0,1), inset 0 0 20px rgba(201,164,76,0.05);
    position: relative;
    overflow: hidden;
  }
  .black-card::before {
    content: 'CERTIFICADO OFICIAL';
    position: absolute;
    top: 20px;
    right: -55px;
    background: var(--gold);
    color: #000;
    font-size: 8px;
    font-weight: 700;
    padding: 5px 60px;
    transform: rotate(45deg);
    letter-spacing: 2px;
  }
  .black-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .card-header {
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 16px;
    margin-bottom: 20px;
  }
  .logo-text {
    color: var(--gold);
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 6px;
  }
  .logo-sub {
    font-size: 8px;
    color: var(--gold);
    opacity: 0.6;
    letter-spacing: 3px;
    margin-top: 4px;
    text-transform: uppercase;
  }
  .dictamen-status {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 700;
    color: #10B981;
    text-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
    margin: 16px 0 20px;
    display: flex;
    align-items: center;
    letter-spacing: 1px;
  }
  .pulse-dot {
    width: 10px; height: 10px;
    background: #10B981;
    border-radius: 50%;
    margin-right: 14px;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70%  { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
  .data-label {
    font-size: 9px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 16px;
    margin-bottom: 6px;
    font-weight: 500;
  }
  .data-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--primary);
    margin-bottom: 4px;
    word-break: break-all;
    line-height: 1.5;
  }
  .data-value.small { font-size: 9px; }
  .data-value.gold { color: var(--gold-l); }
  .data-value.serif {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.3px;
  }
  .huella-placeholder {
    width: 120px; height: 120px;
    background: #0A0A0B;
    margin: 18px auto;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid rgba(201,164,76,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .huella-placeholder img {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    border-radius: 3px;
  }
  .huella-label {
    text-align: center;
    font-size: 8px;
    color: var(--dim);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .btn-print {
    margin-top: 24px;
    width: 100%;
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 12px;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 3px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
    border-radius: 3px;
  }
  .btn-print:hover { background: var(--gold); color: #000; }
  .footer-tx {
    font-size: 8px;
    color: rgba(255,255,255,0.25);
    margin-top: 16px;
    text-align: center;
    letter-spacing: 1px;
    line-height: 1.6;
  }
  @media print {
    body { background: #fff; padding: 0; }
    .btn-print { display: none; }
    .black-card { box-shadow: none; border-color: #c9a44c; }
  }
  @media (max-width: 500px) {
    .black-card { padding: 24px 20px; }
    .logo-text { font-size: 18px; letter-spacing: 4px; }
    .dictamen-status { font-size: 18px; }
  }
</style>
</head>
<body>
<div class="black-card">
  <div class="card-header">
    <div class="logo-text">KRONOS</div>
    <div class="logo-sub">Legado Humano–IA · Génesis</div>
  </div>
  <div class="data-label">Veredicto de integridad</div>
  <div class="dictamen-status">
    <span class="pulse-dot"></span> SELLADO · VÁLIDO
  </div>
  <div class="data-label">ID de protocolo</div>
  <div class="data-value gold">${idCorto}</div>
  <div class="data-label">Fundador</div>
  <div class="data-value serif">${cert.fundador}</div>
  <div class="data-label">Intención fundacional</div>
  <div class="data-value serif" style="font-weight:400;font-size:13px;">${cert.intencion}</div>
  <div class="data-label">Co-autoría IA</div>
  <div class="data-value gold">${cert.coautoria_ia}</div>
  <div class="data-label">Fecha de sellado</div>
  <div class="data-value">${fecha}</div>
  <div class="huella-placeholder">
    <img src="${huellaDataUrl}" alt="Huella visual del hash">
  </div>
  <div class="huella-label">Huella visual · derivada del hash</div>
  <div class="data-label">Hash SHA-256 del manifiesto</div>
  <div class="data-value small">${cert.manifiesto_hash}</div>
  <div class="data-label">Firma Ed25519</div>
  <div class="data-value small">${cert.firma_ed25519}</div>
  <div class="data-label">Clave pública</div>
  <div class="data-value small">${cert.clave_publica}</div>
  <button class="btn-print" onclick="window.print()">Imprimir / Guardar PDF</button>
  <div class="footer-tx">
    Verificación: SHA-256(manifiesto) = hash declarado · Ed25519(clave_pública) = firma<br>
    © 2026 ${cert.fundador} + ${cert.coautoria_ia} · Documento generado localmente
  </div>
</div>
</body>
</html>`;
}

// ─── DESCARGAR CERTIFICADO HTML + JSON ─────────────────────
function descargarCertificado(cert) {
  const canvas = document.createElement('canvas');
  const huellaUrl = dibujarHuellaVisual(canvas, cert.manifiesto_hash);

  const htmlContenido = generarCertificadoHTML(cert, huellaUrl);
  const blobHTML = new Blob([htmlContenido], { type: 'text/html;charset=utf-8' });
  const urlHTML = URL.createObjectURL(blobHTML);
  const aHTML = document.createElement('a');
  aHTML.href = urlHTML;
  aHTML.download = `kronos-certificado-${cert.manifiesto_hash.slice(0, 8)}.html`;
  document.body.appendChild(aHTML);
  aHTML.click();
  document.body.removeChild(aHTML);
  setTimeout(() => URL.revokeObjectURL(urlHTML), 2000);

  const jsonSalida = {
    ...cert,
    huella_visual: 'Patrón derivado del hash · no es QR escaneable',
    certificado_html_descargado: true,
    notas: 'El archivo .html contiene el certificado completo autocontenido. El .json es para verificación programática.'
  };
  const blobJSON = new Blob([JSON.stringify(jsonSalida, null, 2)], { type: 'application/json' });
  const urlJSON = URL.createObjectURL(blobJSON);
  const aJSON = document.createElement('a');
  aJSON.href = urlJSON;
  aJSON.download = `kronos-genesis-${cert.manifiesto_hash.slice(0, 8)}.json`;
  document.body.appendChild(aJSON);
  aJSON.click();
  document.body.removeChild(aJSON);
  setTimeout(() => URL.revokeObjectURL(urlJSON), 2000);
}

// ─── PERSISTENCIA DEXIE ─────────────────────────────────────
const DB_NAME = 'KronosProtocol';
const DB_VERSION = 1;
async function abrirDB() {
  if (typeof Dexie === 'undefined') {
    throw new Error('Dexie no cargado · verifica el CDN en index.html');
  }
  const db = new Dexie(DB_NAME);
  db.version(DB_VERSION).stores({
    registros: '++id, tipo, hash, timestamp'
  });
  await db.open();
  return db;
}

// ─── UI ──────────────────────────────────────────────────────
const form = document.getElementById('form-genesis');
const btn = document.getElementById('btn-sellar');
const btnLimpiar = document.getElementById('btn-limpiar-manual');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const pubOut = document.getElementById('pub-out');
const descargar = document.getElementById('descargar');
const badge = document.getElementById('badge-estado');
const estadoCount = document.getElementById('estado-count');

const campoNombre = document.getElementById('nombre');
const campoIntencion = document.getElementById('intencion');
const campoCoautoria = document.getElementById('coautoria');
const campoPassword = document.getElementById('masterPassword');

let certificadoActual = null;

// ─── LIMPIEZA DE CAMPOS ─────────────────────────────────────
function limpiarCampos() {
  if (campoNombre) campoNombre.value = '';
  if (campoIntencion) campoIntencion.value = '';
  if (campoCoautoria) campoCoautoria.value = 'KRONOS IA';
  if (campoPassword) campoPassword.value = '';
  try { localStorage.removeItem('legado_genesis_draft'); } catch (e) {}
}

// ═════════════════════════════════════════════════════════════
// OPCIÓN B · Al cargar: NO restaurar vista. Página limpia.
// El certificado se guarda en memoria para poder descargarlo,
// pero NO se muestra en pantalla al recargar.
// ═════════════════════════════════════════════════════════════
(async function initLimpio() {
  // Limpiar campos siempre
  limpiarCampos();

  // Ocultar resultado visualmente
  if (resultado) resultado.hidden = true;
  if (hashOut) hashOut.textContent = '—';
  if (firmaOut) firmaOut.textContent = '—';
  if (pubOut) pubOut.textContent = '—';

  // Resetear badge
  if (badge) {
    badge.classList.remove('sellado');
    const txt = badge.querySelector('.txt');
    if (txt) txt.textContent = 'Sin sellar';
  }
  if (estadoCount) estadoCount.textContent = 'Esperando';

  // Cargar certificado previo SOLO en memoria (no mostrar)
  try {
    const rawSel = localStorage.getItem('legado_genesis_last');
    if (rawSel) {
      const cert = JSON.parse(rawSel);
      if (cert && cert.manifiesto_hash) {
        certificadoActual = cert;
        console.log('[génesis] certificado previo detectado (no mostrado en pantalla)');
      }
    }
  } catch (e) { /* silencio */ }
})();

// ── Botón manual de limpiar ─────────────────────────────────
if (btnLimpiar) {
  btnLimpiar.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarCampos();
    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Campos limpiados.</strong>';
    setTimeout(() => {
      feedback.className = 'feedback';
      feedback.textContent = '';
    }, 2000);
  });
}

// ── Submit: sellar génesis ──────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sellando…';
  feedback.className = 'feedback';
  feedback.textContent = '';

  const nombre = campoNombre.value.trim();
  const intencion = campoIntencion.value.trim();
  const coautoria = campoCoautoria.value;
  const masterPassword = campoPassword.value;

  try {
    if (!masterPassword || masterPassword.length < 12) {
      throw new Error('La contraseña maestra debe tener al menos 12 caracteres.');
    }

    const timestamp = new Date().toISOString();
    const manifiesto = `LEGADO HUMANO-IA · GENESIS v1.0\nFundador: ${nombre}\nIntencion: ${intencion}\nCo-autoria IA: ${coautoria}\nTimestamp: ${timestamp}`;

    const hash = await sha256Hex(manifiesto);
    const { privateKey, publicKey } = await generarParEd25519();
    const firma = await firmar(privateKey, manifiesto);
    const pub = await exportarPubKey(publicKey);

    certificadoActual = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'genesis-1.0',
      timestamp,
      fundador: nombre,
      intencion,
      coautoria_ia: coautoria,
      manifiesto_hash: hash,
      firma_ed25519: firma,
      clave_publica: pub,
      algoritmo_firma: 'Ed25519',
      algoritmo_hash: 'SHA-256',
      verificable_por_tercero: true,
      instruccion_verificacion: 'SHA-256(manifiesto) debe coincidir con manifiesto_hash. La firma_ed25519 se verifica con clave_publica.'
    };

    try {
      localStorage.setItem('legado_genesis_last', JSON.stringify(certificadoActual));
    } catch (e) {}

    try {
      const db = await abrirDB();
      await db.registros.add({
        tipo: 'genesis',
        hash,
        timestamp,
        payload: certificadoActual
      });
      console.log('[génesis] ✅ Bloque guardado en IndexedDB');
    } catch (persistErr) {
      console.warn('[génesis] ⚠️ IndexedDB no disponible:', persistErr.message);
    }

    if (hashOut) hashOut.textContent = hash;
    if (firmaOut) firmaOut.textContent = firma;
    if (pubOut) pubOut.textContent = pub;
    if (resultado) resultado.hidden = false;

    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Génesis sellado.</strong> Descarga el certificado Black Card + JSON. Al recargar, la página se limpiará.';

    if (badge) {
      badge.classList.add('sellado');
      const txt = badge.querySelector('.txt');
      if (txt) txt.textContent = 'Sellado · ' + new Date().toLocaleString('es-MX');
    }
    if (estadoCount) estadoCount.textContent = 'Génesis activo';

    setTimeout(limpiarCampos, 300);

  } catch (err) {
    feedback.className = 'feedback error';
    feedback.innerHTML = '<strong>✗ No se pudo sellar.</strong> ' + err.message;
    console.error('[génesis] error:', err);
  } finally {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Sellar génesis';
  }
});

// ── Botón descargar ────────────────────────────────────────
if (descargar) {
  descargar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try {
      descargarCertificado(certificadoActual);
    } catch (err) {
      console.error('[génesis] error al descargar:', err);
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Error al descargar:</strong> ' + err.message;
    }
  });
}