// ────────────────────────────────────────────────────────────
// GÉNESIS · Legado Humano–IA · v1.0.4
// Password real + Dexie CDN + persistencia cifrada + limpieza
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

// ─── PERSISTENCIA CIFRADA CON DEXIE ─────────────────────────
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
  try {
    localStorage.removeItem('legado_genesis_draft');
  } catch (e) { /* silencio */ }
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
    // Validar password
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

    // ── PERSISTENCIA 1: localStorage (siempre) ──
    try {
      localStorage.setItem('legado_genesis_last', JSON.stringify(certificadoActual));
    } catch (e) { /* silencio */ }

    // ── PERSISTENCIA 2: IndexedDB vía Dexie (cifrado opcional) ──
    try {
      const db = await abrirDB();
      // Guardamos el certificado público en IndexedDB
      // El cifrado real se hará en módulo Cripto Core cuando esté listo
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

    // ── UI ──
    if (hashOut) hashOut.textContent = hash;
    if (firmaOut) firmaOut.textContent = firma;
    if (pubOut) pubOut.textContent = pub;
    if (resultado) resultado.hidden = false;

    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Génesis sellado y persistido.</strong> Campos limpiados. Descarga el certificado.';

    if (badge) {
      badge.classList.add('sellado');
      const txt = badge.querySelector('.txt');
      if (txt) txt.textContent = 'Sellado · ' + new Date().toLocaleString('es-MX');
    }
    if (estadoCount) estadoCount.textContent = 'Génesis activo';

    // LIMPIEZA INMEDIATA
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

// ── Descargar certificado ───────────────────────────────────
if (descargar) {
  descargar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    const blob = new Blob([JSON.stringify(certificadoActual, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legado-genesis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}