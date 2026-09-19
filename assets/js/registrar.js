/* ============================================================
   KRONOS PROTOCOL · registrar.js
   Formulario de registro de folios
   ============================================================ */
(function () {
  'use strict';

  const form = document.getElementById('register-form');
  if (!form) return;
  const result = document.getElementById('register-result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    const orig = btn.textContent;
    btn.textContent = 'Generando hash…';

    try {
      const registro = await KronosCrypto.crearRegistro({
        titulo:      document.getElementById('titulo').value.trim(),
        autor:       document.getElementById('autor').value.trim(),
        tipo:        document.getElementById('tipo').value,
        licencia:    document.getElementById('licencia').value,
        descripcion: document.getElementById('descripcion').value.trim(),
        contenido:   document.getElementById('contenido').value.trim()
      });

      // Incrementar plazas usadas
      const usadas = parseInt(localStorage.getItem('kronos_plazas_usadas') || '0', 10);
      localStorage.setItem('kronos_plazas_usadas', String(usadas + 1));

      result.hidden = false;
      result.className = 'result result--success';
      result.innerHTML = `
        <h3 class="result__title">✓ Folio generado correctamente</h3>
        <div class="result__row"><span>Folio</span><span>${registro.folio}</span></div>
        <div class="result__row"><span>Hash</span><span>${registro.hash}</span></div>
        <div class="result__row"><span>Fecha</span><span>${Kronos.formatDate(registro.timestamp)}</span></div>
        <div style="margin-top:16px;display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn--primary btn--sm" id="dl-cert">⬇ Descargar certificado</button>
          <a class="btn btn--ghost btn--sm" href="verify.html?folio=${registro.folio}">Verificar ahora</a>
        </div>
      `;

      document.getElementById('dl-cert').addEventListener('click', () => {
        KronosCrypto.descargarCertificado(registro);
      });

      Kronos.toast('Folio registrado y anclado localmente', 'ok');
      form.reset();
    } catch (err) {
      console.error(err);
      result.hidden = false;
      result.className = 'result result--error';
      result.innerHTML = `<h3 class="result__title">✗ Error al registrar</h3><p>${err.message}</p>`;
    } finally {
      btn.disabled = false;
      btn.textContent = orig;
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════ */
/* BOTÓN CERTIFICADO · Pulsación multicolor                         */
/* ═══════════════════════════════════════════════════════════════ */
.btn-certificado {
  position: relative;
  background: linear-gradient(90deg, #c9a44c 0%, #00eaff 33%, #10B981 66%, #c9a44c 100%);
  background-size: 300% 100%;
  color: #05070b !important;
  font-weight: 700;
  letter-spacing: 3px;
  overflow: hidden;
  border: 0;
  animation:
    cert-rainbow  4s linear infinite,
    cert-pulse    2.4s ease-in-out infinite;
}

@keyframes cert-rainbow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

@keyframes cert-pulse {
  0%, 100% {
    box-shadow:
      0 0 20px rgba(201,164,76,0.55),
      0 0 40px rgba(201,164,76,0.25);
    transform: scale(1);
  }
  33% {
    box-shadow:
      0 0 30px rgba(0,234,255,0.75),
      0 0 60px rgba(0,234,255,0.35);
    transform: scale(1.018);
  }
  66% {
    box-shadow:
      0 0 30px rgba(16,185,129,0.75),
      0 0 60px rgba(16,185,129,0.35);
    transform: scale(1.018);
  }
}

/* Destello que barre el botón */
.btn-certificado::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
  animation: cert-shine 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes cert-shine {
  0%   { left: -100%; }
  50%  { left: 100%; }
  100% { left: 100%; }
}

/* Variante secundaria (JSON recibo) */
.btn-recibo {
  background: rgba(0,234,255,0.08);
  border: 1px solid rgba(0,234,255,0.4);
  color: #00eaff;
  font-weight: 600;
}
.btn-recibo:hover {
  background: rgba(0,234,255,0.15);
  box-shadow: 0 0 25px rgba(0,234,255,0.4);
}