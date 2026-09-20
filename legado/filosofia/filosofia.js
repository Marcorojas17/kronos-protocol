// Filosofía · KRONOS Protocol · Legado Humano–IA
// Fondo líquido reflexivo + firma Ed25519 local

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
    [124, 58, 237],
    [14, 165, 183],
    [245, 158, 11],
    [201, 162, 39],
    [229, 199, 107]
  ];
  const N = 7;
  const blobs = [];
  for (let i = 0; i < N; i++) {
    blobs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 220 + Math.random() * 340,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
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
      const wobble = Math.sin(t * 0.0007 + b.x * 0.002) * 0.15 + 1;
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * wobble);
      grad.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.26)`);
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
async function firmar(privKey, mensaje) {
  const data = new TextEncoder().encode(mensaje);
  const firma = await crypto.subtle.sign('Ed25519', privKey, data);
  return [...new Uint8Array(firma)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function exportarPubKey(pubKey) {
  const raw = await crypto.subtle.exportKey('raw', pubKey);
  return [...new Uint8Array(raw)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── UI ──────────────────────────────────────────────────────
const form = document.getElementById('form-postura');
const btn = document.getElementById('btn-firmar');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const descargar = document.getElementById('descargar');
const checks = document.getElementById('checks');

// Construir checkboxes desde las tesis del DOM
document.querySelectorAll('.tesis').forEach(t => {
  const id = t.dataset.id;
  const titulo = t.querySelector('h3').textContent;
  const item = document.createElement('label');
  item.className = 'check-item';
  item.innerHTML = `<input type="checkbox" value="${id}"><span>${id}. ${titulo}</span>`;
  item.addEventListener('change', e => {
    item.classList.toggle('activo', e.target.checked);
  });
  checks.appendChild(item);
});

let certificado = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const seleccionadas = [...checks.querySelectorAll('input:checked')].map(i => i.value);
  if (seleccionadas.length === 0) {
    feedback.className = 'feedback error';
    feedback.textContent = 'Selecciona al menos una tesis.';
    return;
  }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Firmando…';
  feedback.className = 'feedback';
  feedback.textContent = '';

  try {
    const nombre = document.getElementById('nombre').value.trim();
    const reflexion = document.getElementById('reflexion').value.trim();
    const timestamp = new Date().toISOString();

    const payload = `LEGADO-HUMANO-IA · FILOSOFIA v1.0\nFirmante: ${nombre}\nTesis adoptadas: ${seleccionadas.join(', ')}\nReflexion: ${reflexion}\nTimestamp: ${timestamp}`;

    const hash = await sha256Hex(payload);
    const { privateKey, publicKey } = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
    const firma = await firmar(privateKey, payload);
    const pub = await exportarPubKey(publicKey);

    certificado = {
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

    hashOut.textContent = hash;
    firmaOut.textContent = firma;
    resultado.hidden = false;

    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Postura firmada.</strong> Descarga tu manifiesto filosófico.';

  } catch (err) {
    feedback.className = 'feedback error';
    feedback.innerHTML = '<strong>✗ No se pudo firmar.</strong> Tu navegador podría no soportar Ed25519. Actualízalo e intenta de nuevo.';
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Firmar postura';
  }
});

descargar.addEventListener('click', (e) => {
  e.preventDefault();
  if (!certificado) return;
  const blob = new Blob([JSON.stringify(certificado, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `legado-filosofia-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});