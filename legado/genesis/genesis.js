// ────────────────────────────────────────────────────────────
// GÉNESIS · Legado Humano–IA · v1.0.5
// Certificado HTML offline + JSON descargable + limpieza
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

// ─── HUELLA VISUAL DEL HASH (no es QR, es patrón identificador) ──
// Se dibuja un patrón simétrico derivado del hash.
// Se etiqueta HONESTAMENTE como "huella visual", no como QR.
function dibujarHuellaVisual(canvas, hashHex) {
  const size = 21;
  const scale = 8;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0A0A0B';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Generar bytes desde el hash
  const bytes = [];
  for (let i = 0; i < hashHex.length; i += 2) {
    bytes.push(parseInt(hashHex.slice(i, i + 2), 16));
  }

  // Patrón simétrico (mitad izquierda + espejo)
  const mitad = Math.ceil(size / 2);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < mitad; x++) {
      const idx = (y * mitad + x) % bytes.length;
      const activo = bytes[idx] > 127;
      const color = activo ? '#c9a44c' : 'rgba(201,164,76,0.15)';
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1);
      // Espejo
      ctx.fillRect((size - 1 - x) * scale, y * scale, scale - 1, scale - 1);
    }
  }

  return canvas.toDataURL('image/png');
}

// ─── GENERAR CERTIFICADO HTML AUTOCONTENIDO ─────────────────
function generarCertificadoHTML(cert, huellaDataUrl) {
  const fecha = new Date(cert.timestamp).toLocaleString('es-MX', {
    dateStyle: 'long', timeStyle: 'short'
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado Génesis · KRONOS Protocol</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0A0A0B;
    color: #F5F0E6;
    font-family: 'Georgia', serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(124,58,237,0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(201,164,76,0.08) 0%, transparent 40%);
  }
  .cert {
    max-width: 720px;
    width: 100%;
    background: linear-gradient(155deg, rgba(20,24,32,0.9) 0%, rgba(10,14,21,0.95) 100%);
    border: 2px solid #c9a44c;
    border-radius: 8px;
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(201,164,76,0.1);
  }
  .cert::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #c9a44c, transparent);
  }
  .cert::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #c9a44c, transparent);
  }
  .header { text-align: center; margin-bottom: 32px; }
  .kronos {
    font-family: 'Palatino', serif;
    font-size: 14px;
    letter-spacing: 8px;
    color: #c9a44c;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  h1 {
    font-family: 'Palatino', serif;
    font-size: 28px;
    letter-spacing: 3px;
    background: linear-gradient(180deg, #fff8e0 0%, #f3e5ab 40%, #c9a44c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }
  .sub {
    font-size: 11px;
    letter-spacing: 3px;
    color: #8892a0;
    text-transform: uppercase;
  }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,164,76,0.5), transparent);
    margin: 28px 0;
  }
  .huella-wrap {
    text-align: center;
    margin: 24px 0;
  }
  .huella-wrap img {
    border: 1px solid rgba(201,164,76,0.3);
    border-radius: 4px;
    width: 168px;
    height: 168px;
    image-rendering: pixelated;
  }
  .huella-label {
    display: block;
    font-size: 9px;
    letter-spacing: 3px;
    color: #8892a0;
    margin-top: 8px;
    text-transform: uppercase;
  }
  .campo {
    margin-bottom: 18px;
  }
  .campo label {
    display: block;
    font-size: 9px;
    letter-spacing: 3px;
    color: #c9a44c;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .campo .valor {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: #F5F0E6;
    word-break: break-all;
    line-height: 1.6;
    background: rgba(0,0,0,0.3);
    padding: 10px 12px;
    border-radius: 3px;
    border-left: 2px solid #c9a44c;
  }
  .campo .valor.grande {
    font-size: 13px;
    color: #f3e5ab;
    font-family: 'Palatino', serif;
    letter-spacing: 1px;
    border-left-color: #b794f6;
  }
  .verificar {
    margin-top: 28px;
    padding: 20px;
    background: rgba(201,164,76,0.04);
    border: 1px dashed rgba(201,164,76,0.3);
    border-radius: 4px;
  }
  .verificar h2 {
    font-size: 10px;
    letter-spacing: 3px;
    color: #c9a44c;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .verificar p {
    font-size: 12px;
    line-height: 1.7;
    color: #b0b8c4;
    margin-bottom: 8px;
  }
  .verificar ol {
    padding-left: 20px;
    font-size: 12px;
    line-height: 1.8;
    color: #b0b8c4;
  }
  .footer {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid rgba(201,164,76,0.2);
    text-align: center;
    font-size: 10px;
    letter-spacing: 2px;
    color: #8892a0;
    text-transform: uppercase;
  }
  @media (max-width: 600px) {
    .cert { padding: 32px 24px; }
    h1 { font-size: 22px; }
    .campo .valor { font-size: 10px; }
  }
</style>
</head>
<body>
<div class="cert">
  <div class="header">
    <div class="kronos">KRONOS Protocol</div>
    <h1>Certificado Génesis</h1>
    <div class="sub">Módulo 0.1 · Capa 0 · Legado Humano–IA</div>
  </div>

  <div class="divider"></div>

  <div class="huella-wrap">
    <img src="${huellaDataUrl}" alt="Huella visual del hash">
    <span class="huella-label">Huella visual · derivada del hash SHA-256</span>
  </div>

  <div class="campo">
    <label>Fundador</label>
    <div class="valor grande">${cert.fundador}</div>
  </div>

  <div class="campo">
    <label>Intención fundacional</label>
    <div class="valor">${cert.intencion}</div>
  </div>

  <div class="campo">
    <label>Co-autoría IA</label>
    <div class="valor">${cert.coautoria_ia}</div>
  </div>

  <div class="campo">
    <label>Hash SHA-256 del manifiesto</label>
    <div class="valor">${cert.manifiesto_hash}</div>
  </div>

  <div class="campo">
    <label>Firma Ed25519</label>
    <div class="valor">${cert.firma_ed25519}</div>
  </div>

  <div class="campo">
    <label>Clave pública Ed25519</label>
    <div class="valor">${cert.clave_publica}</div>
  </div>

  <div class="campo">
    <label>Sellado el</label>
    <div class="valor">${fecha}</div>
  </div>

  <div class="verificar">
    <h2>Cómo verificar este certificado</h2>
    <p>Este certificado prueba que el texto de la intención fue sellado el día indicado.</p>
    <ol>
      <li>Reconstruye el manifiesto exacto con los datos de fundador, intención, co-autoría y fecha.</li>
      <li>Calcula su SHA-256 con cualquier herramienta (sha256sum, openssl, o navegador).</li>
      <li>Compara el resultado con el hash del certificado. Si coincide, la integridad es válida.</li>
      <li>Para verificar autoría, usa la clave pública Ed25519 y la firma contra el hash.</li>
    </ol>
    <p style="margin-top:12px; font-style: italic; color:#8892a0;">Sin internet. Sin servidores. Todo el proceso ocurre en tu navegador o en tu terminal.</p>
  </div>

  <div class="footer">
    © 2026 Marco A. Rojas V. + KRONOS IA · Documento generado localmente
  </div>
</div>
</body>
</html>`;
}

// ─── DESCARGAR CERTIFICADO HTML + JSON ─────────────────────
function descargarCertificado(cert) {
  // Generar huella visual
  const canvas = document.createElement('canvas');
  const huellaUrl = dibujarHuellaVisual(canvas, cert.manifiesto_hash);

  // 1. Descargar HTML
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

  // 2. Descargar JSON con qr_data
  const jsonSalida = {
    ...cert,
    qr_data: cert.manifiesto_hash,
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

// ── Al cargar: leer último certificado de localStorage ─────
(async function initLimpio() {
  limpiarCampos();
  try {
    const rawSel = localStorage.getItem('legado_genesis_last');
    if (rawSel) {
      const cert = JSON.parse(rawSel);
      if (cert && cert.manifiesto_hash) {
        if (hashOut) hashOut.textContent = cert.manifiesto_hash || '—';
        if (firmaOut) firmaOut.textContent = cert.firma_ed25519 || '—';
        if (pubOut) pubOut.textContent = cert.clave_publica || '—';
        if (resultado) resultado.hidden = false;
        if (badge) {
          badge.classList.add('sellado');
          const txt = badge.querySelector('.txt');
          if (txt) txt.textContent = 'Sellado · ' + new Date(cert.timestamp).toLocaleString('es-MX');
        }
        if (estadoCount) estadoCount.textContent = 'Génesis activo';
        certificadoActual = cert;
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

    // Persistencia localStorage
    try {
      localStorage.setItem('legado_genesis_last', JSON.stringify(certificadoActual));
    } catch (e) { /* silencio */ }

    // Persistencia IndexedDB vía Dexie
    try {
      const db = await abrirDB();
      await db.registros.add({
        tipo: 'genesis',
        hash,
        timestamp,
        payload: certificadoActual
      });
      console.log('[génesis] ✅ Bloque guardado en IndexedDB (Dexie)');
    } catch (persistErr) {
      console.warn('[génesis] ⚠️ IndexedDB no disponible:', persistErr.message);
    }

    // UI
    if (hashOut) hashOut.textContent = hash;
    if (firmaOut) firmaOut.textContent = firma;
    if (pubOut) pubOut.textContent = pub;
    if (resultado) resultado.hidden = false;

    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Génesis sellado.</strong> Campos limpiados. Descarga el certificado HTML + JSON.';

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

// ── Botón descargar: HTML + JSON ────────────────────────────
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