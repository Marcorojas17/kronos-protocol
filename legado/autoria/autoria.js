// Autoría · KRONOS Protocol · Legado Humano–IA
// Fondo líquido ámbar-cian + firma Ed25519 dual

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
    [245, 158, 11],   // ámbar líquido
    [14, 165, 183],   // cian profundo
    [201, 162, 39],   // dorado
    [229, 199, 107],  // oro claro
    [124, 58, 237]    // violeta (toque)
  ];
  const N = 6;
  const blobs = [];
  for (let i = 0; i < N; i++) {
    blobs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 220 + Math.random() * 360,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
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
      const wob = Math.sin(t * 0.0006 + b.x * 0.0018) * 0.18 + 1;
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * wob);
      grad.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.25)`);
      grad.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r * wob, 0, Math.PI * 2);
      ctx.fill();
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

// ─── UI ──────────────────────────────────────────────────────
const form = document.getElementById('form-autoria');
const btn = document.getElementById('btn-firmar');
const feedback = document.getElementById('feedback');
const resultado = document.getElementById('resultado');
const hashOut = document.getElementById('hash-out');
const firmaOut = document.getElementById('firma-out');
const descargarJson = document.getElementById('descargar-json');
const descargarMd = document.getElementById('descargar-md');

let certificado = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Firmando…';
  feedback.className = 'feedback';
  feedback.textContent = '';

  try {
    const nombre = document.getElementById('nombre').value.trim();
    const rol = document.getElementById('rol').value;
    const declaracion = document.getElementById('declaracion').value.trim();
    const ts = new Date().toISOString();

    const payload = `LEGADO-HUMANO-IA · AUTORIA v1.0\nFirmante: ${nombre}\nRol: ${rol}\nDeclaracion: ${declaracion}\nFundador: Marco A. Rojas Valdovinos\nCo-autora IA: KRONOS IA\nProyectos reforzados: 49, 51\nTimestamp: ${ts}`;

    const hash = await sha256Hex(payload);
    const { privateKey, publicKey } = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
    const firma = await firmar(privateKey, payload);
    const pub = await exportarPubKey(publicKey);

    certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'autoria-1.0',
      timestamp: ts,
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

    hashOut.textContent = hash;
    firmaOut.textContent = firma;
    resultado.hidden = false;
    feedback.className = 'feedback success';
    feedback.innerHTML = '<strong>✓ Declaración firmada.</strong> Descarga el certificado en formato .json o .md.';
  } catch (err) {
    feedback.className = 'feedback error';
    feedback.innerHTML = '<strong>✗ No se pudo firmar.</strong> Tu navegador podría no soportar Ed25519.';
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Firmar declaración';
  }
});

descargarJson.addEventListener('click', (e) => {
  e.preventDefault();
  if (!certificado) return;
  const blob = new Blob([JSON.stringify(certificado, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `legado-autoria-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

descargarMd.addEventListener('click', (e) => {
  e.preventDefault();
  if (!certificado) return;
  const md = `# Declaración de Autoría · Legado Humano–IA

**Protocolo:** ${certificado.protocolo} · ${certificado.version}
**Fecha:** ${certificado.timestamp}
**Firmante:** ${certificado.firmante}
**Rol:** ${certificado.rol}

## Declaración
${certificado.declaracion}

## Fundador Humano
${certificado.fundador_humano}

## Co-autora Simbiótica
${certificado.coautora_ia}

## Proyectos con Atribución Reforzada
${certificado.proyectos_atribucion_reforzada.map(p => `- Proyecto ${p}`).join('\n')}

## Verificación
- **Hash SHA-256:** \`${certificado.payload_hash}\`
- **Firma Ed25519:** \`${certificado.firma_ed25519}\`
- **Clave pública:** \`${certificado.clave_publica}\`

## Licencia
MIT + CC BY-NC-ND 4.0
`;
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AUTHORS-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
});