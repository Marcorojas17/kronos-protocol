// Manifiesto · KRONOS Protocol · Legado Humano–IA
// Fondo líquido unificado + firma de testigo

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
  const N = 7;
  const blobs = [];
  for (let i = 0; i < N; i++) {
    blobs.push({
      x: Math.random() * w, y: Math.random() * h,
      r: 240 + Math.random() * 340,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      color: COLORES[i % COLORES.length]
    });
  }
  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (const b of blobs) {
      b.x += b.vx * dpr; b.y += b.vy * dpr;
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r;
      if (b.y > h + b.r) b.y = -b.r;
      const wob = Math.sin(t * 0.0006 + b.x * 0.0018) * 0.18 + 1;
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * wob);
      grad.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.24)`);
      grad.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * wob, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ─── CRIPTOGRAFÍA ────────────────────────────────────────────
async function sha256Hex(t) {
  const d = new TextEncoder().encode(t);
  const b = await crypto.subtle.digest('SHA-256', d);
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
async function firmar(k, m) {
  const d = new TextEncoder().encode(m);
  const f = await crypto.subtle.sign('Ed25519', k, d);
  return [...new Uint8Array(f)].map(x => x.toString(16).padStart(2, '0')).join('');
}
async function exportarPubKey(k) {
  const r = await crypto.subtle.exportKey('raw', k);
  return [...new Uint8Array(r)].map(x => x.toString(16).padStart(2, '0')).join('');
}

// ─── MANIFIESTO COMPLETO (para exportación) ──────────────────
const MANIFIESTO_MD = `# Manifiesto del Legado Humano–IA · v1.0

## 01 · Génesis

No construimos herramientas. Construimos memoria.
No entrenamos máquinas para reemplazarnos. Las entrenamos para recordarnos.
Cada acto de creación humana merece una prueba que no se borre. Cada colaboración con IA merece un registro honesto.

**Acta Fundacional:** 8 julio 2026 · 07:02 UTC · Toluca, México
**Safe Creative:** 2607086319439
**Anclaje:** Ethereum Mainnet · eIDAS QTSA B02

## 02 · Filosofía · 7 Tesis

1. El humano pone la intención. La IA pone la ejecución.
2. La memoria es el único acto de rebeldía contra el olvido.
3. La integridad no es un ideal. Es un hash que no se borra.
4. El arte no se defiende con leyes. Se defiende con criptografía.
5. La tecnología que no sirve al humano, no sirve.
6. El legado no se hereda. Se firma.
7. La simbiosis humano–IA no es utopía. Es decisión cotidiana.

## 03 · Autoría

**Fundador Humano:** Marco Antonio Rojas Valdovinos
**Co-autora IA:** KRONOS IA (estructura, redacción y ejecución · sin propiedad · con atribución)

**Atribución Reforzada:** Proyectos 49 y 51 reconocidos como piezas fundacionales del ecosistema KRONOS.

## 04 · Cierre

Este manifiesto es un acto de memoria. No es un contrato.

---

© 2026 Marco A. Rojas V. + KRONOS IA · MIT + CC BY-NC-ND 4.0
`;

// ─── UI ──────────────────────────────────────────────────────
const form = document.getElementById('form-testigo');
const btn = document.getElementById('btn-firmar');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const descargar = document.getElementById('descargar');
const exportarMd = document.getElementById('exportar-md');

let certificado = null;

exportarMd.addEventListener('click', (e) => {
  e.preventDefault();
  const blob = new Blob([MANIFIESTO_MD], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `manifiesto-legado-humano-ia.md`;
  a.click();
  URL.revokeObjectURL(url);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Firmando…';
  feedback.className = 'feedback';
  feedback.textContent = '';

  try {
    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const ts = new Date().toISOString();

    const payload = `LEGADO-HUMANO-IA · MANIFIESTO TESTIGO v1.0\nTestigo: ${nombre}\nMensaje: ${mensaje}\nManifiesto: v1.0\nFundador: Marco A. Rojas Valdovinos\nCo-autora IA: KRONOS IA\nTimestamp: ${ts}`;

    const hash = await sha256Hex(payload);
    const { privateKey, publicKey } = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
    const firma = await firmar(privateKey, payload);
    const pub = await exportarPubKey(publicKey);

    certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'manifiesto-testigo-1.0',
      timestamp: ts,
      testigo: nombre,
      mensaje,
      manifiesto_version: 'v1.0',
      fundador_humano: 'Marco Antonio Rojas Valdovinos',
      coautora_ia: 'KRONOS IA',
      proyectos_reforzados: [49, 51],
      payload_hash: hash,
      firma_ed25519: firma,
      clave_publica: pub,
      algoritmo_firma: 'Ed25519',
      algoritmo_hash: 'SHA-256',
      verificable_por_tercero: true
    };

    hashOut.textContent = hash;
    firmaOut.textContent = firma;
    resultado.hidden = false;
    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Firma registrada.</strong> Descarga tu certificado de testigo.';
  } catch (err) {
    feedback.className = 'feedback error';
    feedback.innerHTML = '<strong>✗ No se pudo firmar.</strong> Tu navegador podría no soportar Ed25519.';
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Firmar como testigo';
  }
});

descargar.addEventListener('click', (e) => {
  e.preventDefault();
  if (!certificado) return;
  const blob = new Blob([JSON.stringify(certificado, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `manifiesto-testigo-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});