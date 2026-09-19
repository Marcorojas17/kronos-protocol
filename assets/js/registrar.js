/* ============================================================
   KRONOS PROTOCOL · registrar.js v4
   Feedback visual en cada descarga (toast + método usado)
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

        <div style="margin-top:22px;display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-certificado btn--sm" id="dl-cert" type="button">⬇ Descargar certificado (.txt)</button>
          <button class="btn btn-recibo btn--sm" id="dl-json" type="button">⬇ Recibo offline (.json)</button>
          <a class="btn btn--ghost btn--sm" href="verificar-certificado.html">Verificar sin descargar</a>
        </div>

        <p style="margin-top:16px;font-size:11px;color:var(--text-dim);line-height:1.6;letter-spacing:1px">
          El certificado incluye el <strong style="color:var(--gold)">payload canónico</strong>
          y el <strong style="color:var(--gold)">hash SHA-256</strong> en formato ASCII premium.
          Verifícalo arrastrándolo en
          <a href="verificar-certificado.html" style="color:var(--gold)">verificar-certificado.html</a>.
        </p>
      `;

      /* ---- Descarga del certificado TXT ---- */
      document.getElementById('dl-cert').addEventListener('click', async function () {
        const b = this;
        b.disabled = true;
        const orig = b.textContent;
        b.textContent = 'Preparando…';
        try {
          const res = await KronosCrypto.descargarCertificado(registro);
          if (res.ok) {
            Kronos.toast('Certificado .txt descargado (' + res.metodo + ')', 'ok');
          } else {
            Kronos.toast('Error al descargar el certificado', 'error');
          }
        } catch (err) {
          console.error(err);
          Kronos.toast('Error: ' + err.message, 'error');
        } finally {
          b.disabled = false;
          b.textContent = orig;
        }
      });

      /* ---- Descarga del recibo JSON ---- */
      document.getElementById('dl-json').addEventListener('click', async function () {
        const b = this;
        b.disabled = true;
        const orig = b.textContent;
        b.textContent = 'Preparando…';
        try {
          const res = await KronosCrypto.descargarReciboJSON(registro);
          if (res.ok) {
            Kronos.toast('Recibo .json descargado (' + res.metodo + ')', 'ok');
          } else {
            Kronos.toast('Error al descargar el recibo', 'error');
          }
        } catch (err) {
          console.error(err);
          Kronos.toast('Error: ' + err.message, 'error');
        } finally {
          b.disabled = false;
          b.textContent = orig;
        }
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