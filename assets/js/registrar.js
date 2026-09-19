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