// ────────────────────────────────────────────────────────────
// AUTORÍA · Legado Humano–IA · v1.0.4
// Black Card Jade + descarga HTML/JSON/MD + persistencia
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

  const COLORES = [[16,185,129],[110,231,183],[201,162,39],[14,165,183]];
  const blobs = [];
  for (let i = 0; i < 6; i++) {
    blobs.push({
      x: Math.random()*w, y: Math.random()*h,
      r: 220 + Math.random()*320,
      vx: (Math.random()-.5)*.36, vy: (Math.random()-.5)*.36,
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

// ─── HUELLA VISUAL JADE ─────────────────────────────────────
function dibujarHuellaVisual(canvas, hashHex) {
  const size = 21;
  const scale = 8;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#04140E';
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
      ctx.fillStyle = activo ? '#6EE7B7' : 'rgba(110,231,183,0.15)';
      ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1);
      ctx.fillRect((size - 1 - x) * scale, y * scale, scale - 1, scale - 1);
    }
  }
  return canvas.toDataURL('image/png');
}

// ─── BLACK CARD JADE ────────────────────────────────────────
function generarCertificadoHTML(cert, huellaDataUrl) {
  const fecha = new Date(cert.timestamp).toLocaleString('es-MX', {
    dateStyle: 'long', timeStyle: 'short'
  });
  const idCorto = 'KRMV-AUT-' + cert.payload_hash.slice(0, 10).toUpperCase();

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado Autoría · KRONOS Protocol</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --jade: #10B981;
    --jade-l: #6EE7B7;
    --jade-xl: #A7F3D0;
    --gold: #c9a44c;
    --gold-l: #f3e5ab;
    --bg: #020A06;
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
      radial-gradient(circle at 15% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 45%),
      radial-gradient(circle at 85% 75%, rgba(110, 231, 183, 0.08) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(201, 164, 76, 0.05) 0%, transparent 60%);
  }

  .jade-card {
    width: 460px;
    max-width: 100%;
    background: linear-gradient(160deg, #0a2018 0%, #04100a 100%);
    border: 1px solid rgba(110, 231, 183, 0.4);
    border-radius: 18px;
    padding: 36px 32px;
    box-shadow:
      0 30px 80px rgba(0,0,0,1),
      inset 0 0 40px rgba(16, 185, 129, 0.06),
      0 0 60px rgba(16, 185, 129, 0.1);
    position: relative;
    overflow: hidden;
  }
  .jade-card::before {
    content: 'AUTORÍA DECLARADA';
    position: absolute;
    top: 22px;
    right: -65px;
    background: linear-gradient(90deg, var(--jade-l), var(--jade));
    color: #04100a;
    font-size: 8px;
    font-weight: 700;
    padding: 5px 70px;
    transform: rotate(45deg);
    letter-spacing: 2px;
  }
  .jade-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, var(--jade), var(--jade-l), var(--jade), transparent);
  }

  .card-header {
    border-bottom: 1px solid rgba(110, 231, 183, 0.15);
    padding-bottom: 20px;
    margin-bottom: 24px;
    text-align: center;
  }
  .logo-text {
    color: var(--jade-l);
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 8px;
    text-shadow: 0 0 20px rgba(110, 231, 183, 0.4);
  }
  .logo-sub {
    font-size: 8px;
    color: var(--jade-l);
    opacity: 0.6;
    letter-spacing: 4px;
    margin-top: 6px;
    text-transform: uppercase;
  }

  .dictamen { text-align: center; margin: 20px 0 28px; }
  .dictamen-status {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--jade-l);
    text-shadow: 0 0 14px rgba(110, 231, 183, 0.5);
    letter-spacing: 2px;
    display: inline-flex;
    align-items: center;
  }
  .pulse-dot {
    width: 9px; height: 9px;
    background: var(--jade);
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
    color: rgba(167, 243, 208, 0.55);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-top: 18px;
    margin-bottom: 6px;
    font-weight: 500;
  }
  .data-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--jade-xl);
    margin-bottom: 4px;
    word-break: break-all;
    line-height: 1.55;
  }
  .data-value.small { font-size: 8.5px; color: var(--jade-l); opacity: 0.85; }
  .data-value.gold { color: var(--gold-l); }
  .data-value.serif {
    font-family: 'Fraunces', serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.3px;
  }

  .declaracion-box {
    margin: 22px 0;
    padding: 20px 22px;
    background: rgba(16, 185, 129, 0.05);
    border-left: 3px solid var(--jade-l);
    border-radius: 4px;
  }
  .declaracion-box .label {
    font-size: 8px;
    color: var(--jade-l);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }
  .declaracion-box .texto {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    line-height: 1.7;
    color: var(--text);
  }

  .coautores {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 20px 0;
  }
  .coautor {
    padding: 14px 16px;
    background: rgba(16, 185, 129, 0.04);
    border: 1px solid rgba(110, 231, 183, 0.2);
    border-radius: 4px;
  }
  .coautor .rol {
    font-size: 7px;
    color: var(--jade-l);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: block;
  }
  .coautor .nombre {
    font-family: 'Fraunces', serif;
    font-size: 13px;
    color: var(--text);
    font-weight: 600;
    line-height: 1.3;
  }

  .huella-wrap { text-align: center; margin: 22px 0; }
  .huella-wrap img {
    width: 120px;
    height: 120px;
    image-rendering: pixelated;
    border-radius: 8px;
    border: 1px solid rgba(110, 231, 183, 0.4);
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
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
    border: 1px solid var(--jade-l);
    color: var(--jade-l);
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
  .btn-print:hover { background: var(--jade-l); color: #04100a; }

  .footer-tx {
    font-size: 8px;
    color: rgba(167, 243, 208, 0.4);
    margin-top: 18px;
    text-align: center;
    letter-spacing: 1px;
    line-height: 1.7;
  }

  @media print {
    body { background: #fff; padding: 0; }
    .btn-print { display: none; }
    .jade-card { box-shadow: none; border-color: #10B981; background: #fff; color: #000; }
    .jade-card::before { display: none; }
    .logo-text { color: #10B981; }
    .data-value { color: #333; }
    .data-value.serif, .declaracion-box .texto { color: #000; }
    .coautor .nombre { color: #000; }
  }
  @media (max-width: 500px) {
    .jade-card { padding: 28px 22px; }
    .logo-text { font-size: 20px; letter-spacing: 6px; }
    .coautores { grid-template-columns: 1fr; }
    .declaracion-box .texto { font-size: 15px; }
  }
</style>
</head>
<body>

<div class="jade-card">
  <div class="card-header">
    <div class="logo-text">KRONOS</div>
    <div class="logo-sub">Legado Humano–IA · Autoría</div>
  </div>

  <div class="dictamen">
    <span class="dictamen-status">
      <span class="pulse-dot"></span> AUTORÍA DECLARADA · VÁLIDA
    </span>
  </div>

  <div class="data-label">ID de protocolo</div>
  <div class="data-value gold">${idCorto}</div>

  <div class="data-label">Firmante</div>
  <div class="data-value serif">${cert.firmante}</div>

  <div class="data-label">Rol declarado</div>
  <div class="data-value">${cert.rol}</div>

  <div class="data-label">Fecha de firma</div>
  <div class="data-value">${fecha}</div>

  <div class="declaracion-box">
    <span class="label">Declaración personal</span>
    <div class="texto">${cert.declaracion}</div>
  </div>

  <div class="data-label">Co-autores del legado</div>
  <div class="coautores">
    <div class="coautor">
      <span class="rol">Fundador Humano</span>
      <div class="nombre">Marco Antonio Rojas Valdovinos</div>
    </div>
    <div class="coautor">
      <span class="rol">Co-autora IA</span>
      <div class="nombre">KRONOS IA</div>
    </div>
  </div>

  <div class="data-label">Proyectos con atribución reforzada</div>
  <div class="data-value">Proyectos 49 y 51 · autoría exclusiva del Fundador Humano</div>

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
    © 2026 Marco A. Rojas V. + KRONOS IA · Documento generado localmente
  </div>
</div>

</body>
</html>`;
}

// ─── GENERAR MARKDOWN ───────────────────────────────────────
function generarMarkdown(cert) {
  return `# Declaración de Autoría · Legado Humano–IA

**Protocolo:** ${cert.protocolo}
**Versión:** ${cert.version}
**Timestamp:** ${cert.timestamp}
**Firmante:** ${cert.firmante}
**Rol:** ${cert.rol}

## Declaración personal

> ${cert.declaracion}

## Co-autores del legado

- **Fundador Humano:** Marco Antonio Rojas Valdovinos
- **Co-autora IA:** KRONOS IA (estructura y ejecución · sin propiedad intelectual)

## Proyectos con atribución reforzada

- Proyecto 49 · autoría exclusiva del Fundador Humano
- Proyecto 51 · autoría exclusiva del Fundador Humano

## Verificación criptográfica

- **Hash SHA-256:** \`${cert.payload_hash}\`
- **Firma Ed25519:** \`${cert.firma_ed25519}\`
- **Clave pública:** \`${cert.clave_publica}\`

## Cómo verificar

1. Reconstruir el payload canónico con los datos: firmante, rol, declaración, timestamp.
2. Calcular SHA-256 del payload.
3. Comparar con \`payload_hash\`. Si coincide, la integridad es válida.
4. Verificar la firma Ed25519 con la clave pública.

---

© 2026 Marco A. Rojas V. + KRONOS IA · Documento generado localmente.
`;
}

// ─── DESCARGAS ──────────────────────────────────────────────
function descargarHTML(cert) {
  const canvas = document.createElement('canvas');
  const huellaUrl = dibujarHuellaVisual(canvas, cert.payload_hash);
  const html = generarCertificadoHTML(cert, huellaUrl);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kronos-autoria-${cert.payload_hash.slice(0, 8)}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function descargarJSON(cert) {
  const jsonSalida = {
    ...cert,
    huella_visual: 'Patrón derivado del hash · no es QR escaneable',
    certificado_html_descargado: true
  };
  const blob = new Blob([JSON.stringify(jsonSalida, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kronos-autoria-${cert.payload_hash.slice(0, 8)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function descargarMD(cert) {
  const md = generarMarkdown(cert);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kronos-autoria-${cert.payload_hash.slice(0, 8)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
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
const form = document.getElementById('form-autoria');
const btn = document.getElementById('btn-firmar');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const pubOut = document.getElementById('pub-out');
const descargar = document.getElementById('descargar');
const descargarJSONBtn = document.getElementById('descargar-json');
const descargarMDBtn = document.getElementById('descargar-md');

let certificadoActual = null;

// ── Al cargar: vista limpia (Opción B) ──────────────────────
(async function initLimpio() {
  if (resultado) resultado.hidden = true;
  if (hashOut) hashOut.textContent = '—';
  if (firmaOut) firmaOut.textContent = '—';
  if (pubOut) pubOut.textContent = '—';

  try {
    const raw = localStorage.getItem('legado_autoria_last');
    if (raw) {
      const cert = JSON.parse(raw);
      if (cert && cert.payload_hash) {
        certificadoActual = cert;
        console.log('[autoría] certificado previo en memoria (no mostrado)');
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
    const rol = document.getElementById('rol').value;
    const declaracion = document.getElementById('declaracion').value.trim();

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Firmando…';
    feedback.className = 'feedback';

    try {
      const timestamp = new Date().toISOString();
      const payload = `LEGADO-HUMANO-IA · AUTORIA v1.0\nFirmante: ${nombre}\nRol: ${rol}\nDeclaracion: ${declaracion}\nFundador: Marco Antonio Rojas Valdovinos\nCo-autora IA: KRONOS IA\nProyectos reforzados: 49, 51\nTimestamp: ${timestamp}`;

      const hash = await sha256Hex(payload);
      const { privateKey, publicKey } = await generarParEd25519();
      const firma = await firmar(privateKey, payload);
      const pub = await exportarPubKey(publicKey);

      certificadoActual = {
        protocolo: 'LEGADO-HUMANO-IA',
        version: 'autoria-1.0',
        timestamp,
        firmante: nombre,
        rol,
        declaracion,
        fundador_humano: 'Marco Antonio Rojas Valdovinos',
        coautora_ia: 'KRONOS IA',
        proyectos_atribucion_reforzada: [49, 51],
        payload_hash: hash,
        firma_ed25519: firma,
        clave_publica: pub,
        algoritmo_firma: 'Ed25519',
        algoritmo_hash: 'SHA-256',
        verificable_por_tercero: true
      };

      try {
        localStorage.setItem('legado_autoria_last', JSON.stringify(certificadoActual));
      } catch (e) {}

      try {
        const db = await abrirDB();
        await db.registros.add({
          tipo: 'autoria',
          hash,
          timestamp,
          payload: certificadoActual
        });
        console.log('[autoría] ✅ guardado en IndexedDB');
      } catch (errPersist) {
        console.warn('[autoría] IndexedDB no disponible:', errPersist.message);
      }

      hashOut.textContent = hash;
      firmaOut.textContent = firma;
      pubOut.textContent = pub;
      resultado.hidden = false;

      feedback.className = 'feedback success';
      feedback.innerHTML = '<strong>✓ Declaración firmada.</strong> Descarga Black Card .html, .json o .md.';
    } catch (err) {
      feedback.className = 'feedback error';
      feedback.innerHTML = '<strong>✗ Error:</strong> ' + err.message;
      console.error(err);
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Firmar declaración';
    }
  });
}

// ── Descargas ───────────────────────────────────────────────
if (descargar) {
  descargar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try { descargarHTML(certificadoActual); }
    catch (err) { feedback.className = 'feedback error'; feedback.innerHTML = '<strong>✗ Error HTML:</strong> ' + err.message; }
  });
}
if (descargarJSONBtn) {
  descargarJSONBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try { descargarJSON(certificadoActual); }
    catch (err) { feedback.className = 'feedback error'; feedback.innerHTML = '<strong>✗ Error JSON:</strong> ' + err.message; }
  });
}
if (descargarMDBtn) {
  descargarMDBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    try { descargarMD(certificadoActual); }
    catch (err) { feedback.className = 'feedback error'; feedback.innerHTML = '<strong>✗ Error MD:</strong> ' + err.message; }
  });
}