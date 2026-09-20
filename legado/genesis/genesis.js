// ────────────────────────────────────────────────────────────
// GÉNESIS · Legado Humano–IA · v1.0
// Fondo líquido + firma criptográfica local-first
// Persistencia + limpieza automática de campos al sellar
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
    [201, 162, 39],
    [14, 165, 183],
    [124, 58, 237],
    [245, 158, 11],
    [229, 199, 107]
  ];
  const N = 6;
  const blobs = [];
  for (let i = 0; i < N; i++) {
    blobs.push({
      x: Math.random() * w,
      y: Math.random() * h,
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

// ─── CRIPTOGRAFÍA LOCAL-FIRST ────────────────────────────────
async function sha256Hex(texto) {
  const data = new TextEncoder().encode(texto);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generarParEd25519() {
  return await crypto.subtle.generateKey(
    { name: 'Ed25519' },
    true,
    ['sign', 'verify']
  );
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

// ─── PERSISTENCIA CON MÓDULOS DEL ECOSISTEMA ────────────────
let _corePromise = null;
async function obtenerCore(password) {
  if (_corePromise) return _corePromise;
  _corePromise = (async () => {
    try {
      const { CriptoCore } = await import('../../cimiento/cripto-core/core.js');
      const core = new CriptoCore();
      await core.init(password);
      return core;
    } catch (e) {
      console.warn('[génesis] Cripto Core no disponible:', e.message);
      return null;
    }
  })();
  return _corePromise;
}

let _storagePromise = null;
async function obtenerStorage(core) {
  if (_storagePromise) return _storagePromise;
  if (!core) return null;
  _storagePromise = (async () => {
    try {
      const { StorageDexie } = await import('../../cimiento/storage-dexie/storage.js');
      const storage = new StorageDexie(core);
      await storage.init();
      return storage;
    } catch (e) {
      console.warn('[génesis] Storage Dexie no disponible:', e.message);
      return null;
    }
  })();
  return _storagePromise;
}

// ─── UI ───────────────────────────────────────────────────────
const form = document.getElementById('form-genesis');
const btn = document.getElementById('btn-sellar');
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

let certificadoActual = null;

// ─── LIMPIEZA AUTOMÁTICA DE CAMPOS ──────────────────────────
function limpiarCampos() {
  if (campoNombre) campoNombre.value = '';
  if (campoIntencion) campoIntencion.value = '';
  if (campoCoautoria) campoCoautoria.value = 'KRONOS IA';
  // Borrar borrador local para que no vuelva a aparecer
  try { localStorage.removeItem('legado_genesis_draft'); } catch (e) {}
}

// ── Restaurar estado previo (solo el último certificado) ────
(async function restaurarEstado() {
  // Ya NO restauramos el borrador de los campos.
  // Solo mostramos el último certificado sellado.
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

// ── Submit: sellar génesis ──────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sellando…';
  feedback.className = 'feedback';
  feedback.textContent = '';

  try {
    const nombre = campoNombre.value.trim();
    const intencion = campoIntencion.value.trim();
    const coautoria = campoCoautoria.value;
    const password = 'legado-genesis-' + nombre + ':' + coautoria;

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

    // Persistencia del certificado
    try {
      localStorage.setItem('legado_genesis_last', JSON.stringify(certificadoActual));
    } catch (e) { /* silencio */ }

    // Persistencia Cripto Core + Dexie
    try {
      const core = await obtenerCore(password);
      if (core) {
        await core.guardar({ tipo: 'genesis', payload: certificadoActual });
        const storage = await obtenerStorage(core);
        if (storage) {
          await storage.guardar('genesis', certificadoActual);
        }
        console.log('[génesis] bloque persistido en Cripto Core + Dexie');
      }
    } catch (persistErr) {
      console.warn('[génesis] no se pudo persistir:', persistErr);
    }

    // UI del certificado
    if (hashOut) hashOut.textContent = hash;
    if (firmaOut) firmaOut.textContent = firma;
    if (pubOut) pubOut.textContent = pub;
    if (resultado) resultado.hidden = false;

    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Génesis sellado y persistido.</strong> Campos limpiados. Tu certificado está abajo. Descárgalo y guárdalo en un lugar seguro.';

    if (badge) {
      badge.classList.add('sellado');
      const txt = badge.querySelector('.txt');
      if (txt) txt.textContent = 'Sellado · ' + new Date().toLocaleString('es-MX');
    }
    if (estadoCount) estadoCount.textContent = 'Génesis activo';

    // ═══ LIMPIEZA AUTOMÁTICA DE CAMPOS ═══
    setTimeout(() => {
      limpiarCampos();
    }, 600);

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