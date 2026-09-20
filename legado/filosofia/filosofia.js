// ────────────────────────────────────────────────────────────
// FILOSOFÍA · Legado Humano–IA · v1.0.2
// Persistencia en localStorage + IndexedDB + descarga JSON
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

// ── Generar checkboxes desde las tesis ──────────────────────
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

// ── Al cargar: restaurar último certificado ─────────────────
(async function initLimpio() {
  try {
    const raw = localStorage.getItem('legado_filosofia_last');
    if (raw) {
      const cert = JSON.parse(raw);
      if (cert && cert.payload_hash) {
        if (hashOut) hashOut.textContent = cert.payload_hash;
        if (firmaOut) firmaOut.textContent = cert.firma_ed25519;
        if (pubOut) pubOut.textContent = cert.clave_publica;
        if (resultado) resultado.hidden = false;
        certificadoActual = cert;
      }
    }
  } catch (e) { /* silencio */ }
})();

// ── Submit: firmar postura ──────────────────────────────────
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

      // Persistencia 1: localStorage
      try {
        localStorage.setItem('legado_filosofia_last', JSON.stringify(certificadoActual));
      } catch (e) {}

      // Persistencia 2: IndexedDB
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
      feedback.innerHTML = '<strong>✓ Postura firmada.</strong> Guardada en localStorage + IndexedDB. Descarga el certificado.';
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

// ── Descargar certificado ───────────────────────────────────
if (descargar) {
  descargar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!certificadoActual) return;
    const blob = new Blob([JSON.stringify(certificadoActual, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legado-filosofia-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}