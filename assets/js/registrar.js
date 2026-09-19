/* ============================================================
   KRONOS PROTOCOL · registrar.js v3
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

      const usadas = parseInt(localStorage.getItem('kronos_plazas_usadas') || '0', 10);
      localStorage.setItem('kronos_plazas_usadas', String(usadas + 1));

      // Guardar temporalmente para que verificar-certificado.html lo pueda cargar por URL
      sessionStorage.setItem('kronos_ultimo_certificado', JSON.stringify(registro));

      const v = await KronosCrypto.verificarRegistroOffline(registro);

      result.hidden = false;
      result.className = 'result result--success';
      result.innerHTML = `
        <h3 class="result__title">✓ Folio generado correctamente</h3>
        <div class="result__row"><span>Folio</span><span>${registro.folio}</span></div>
        <div class="result__row"><span>Hash</span><span>${registro.hash}</span></div>
        <div class="result__row"><span>Fecha</span><span>${Kronos.formatDate(registro.timestamp)}</span></div>
        <div class="result__row"><span>Verificación local</span><span style="color:${v.ok ? '#10B981' : '#ff4d6d'}">${v.ok ? '✓ OK' : '✗ FALLO'}</span></div>

        <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-certificado btn--sm" id="dl-cert">⬇ Descargar certificado (.txt)</button>
          <button class="btn btn-recibo btn--sm" id="dl-json">⬇ Recibo offline (.json)</button>
          <a class="btn btn--ghost btn--sm" href="verificar-certificado.html">Verificar sin descargar</a>
        </div>

        <p style="margin-top:16px;font-size:11px;color:var(--text-dim);line-height:1.6;letter-spacing:1px">
          Para verificar el certificado, abre
          <a href="verificar-certificado.html" style="color:var(--gold)">verificar-certificado.html</a>
          y arrastra el archivo descargado. <strong style="color:var(--gold)">Sin terminal, sin consola, sin internet.</strong>
        </p>
      `;

      document.getElementById('dl-cert').addEventListener('click', () => {
        KronosCrypto.descargarCertificado(registro);
        Kronos.toast('Certificado .txt descargado', 'ok');
      });

      document.getElementById('dl-json').addEventListener('click', () => {
        KronosCrypto.descargarReciboJSON(registro);
        Kronos.toast('Recibo .json descargado', 'ok');
      });

      Kronos.toast('Folio registrado y verificado', 'ok');
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