// Génesis · KRONOS Protocol
// Fondo líquido + firma criptográfica local-first

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

let certificadoActual = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sellando…';
  feedback.className = 'feedback';
  feedback.textContent = '';

  try {
    const nombre = document.getElementById('nombre').value.trim();
    const intencion = document.getElementById('intencion').value.trim();
    const coautoria = document.getElementById('coautoria').value;

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

    hashOut.textContent = hash;
    firmaOut.textContent = firma;
    pubOut.textContent = pub;
    resultado.hidden = false;

    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Génesis sellado.</strong> Tu certificado está listo. Descárgalo y guárdalo en un lugar seguro.';

    badge.classList.add('sellado');
    badge.querySelector('.txt').textContent = 'Sellado · ' + new Date().toLocaleString('es-MX');
    estadoCount.textContent = 'Génesis activo';

    try { localStorage.setItem('legado_genesis_draft', JSON.stringify({ nombre, intencion, coautoria })); } catch(e){}

  } catch (err) {
    feedback.className = 'feedback error';
    feedback.innerHTML = '<strong>✗ No se pudo sellar.</strong> Tu navegador podría no soportar Web Crypto. Intenta en Chrome/Edge/Safari actualizado.';
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Sellar génesis';
  }
});

descargar.addEventListener('click', (e) => {
  e.preventDefault();
  if (!certificadoActual) return;
  const blob = new Blob([JSON.stringify(certificadoActual, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `legado-genesis-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// Cargar borrador
try {
  const raw = localStorage.getItem('legado_genesis_draft');
  if (raw) {
    const d = JSON.parse(raw);
    if (d.nombre) document.getElementById('nombre').value = d.nombre;
    if (d.intencion) document.getElementById('intencion').value = d.intencion;
    if (d.coautoria) document.getElementById('coautoria').value = d.coautoria;
  }
} catch(e){}