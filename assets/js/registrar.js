/* ============================================================
   KRONOS PROTOCOL · registrar.js v5
   4 acciones: JSON visual + PDF Prisma + TXT ASCII + JSON raw
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
          <button class="btn btn-certificado btn--sm" id="btn-json-cert" type="button">
            🎴 Certificado visual (JSON)
          </button>
          <button class="btn btn-certificado btn--sm" id="btn-pdf-prisma" type="button">
            🔮 Certificado PDF (Prisma)
          </button>
          <button class="btn btn-recibo btn--sm" id="btn-txt-ascii" type="button">
            📜 TXT ASCII
          </button>
          <button class="btn btn-recibo btn--sm" id="btn-json-raw" type="button">
            💾 JSON raw
          </button>
        </div>

        <p style="margin-top:16px;font-size:11px;color:var(--text-dim);line-height:1.6;letter-spacing:1px">
          <strong style="color:var(--gold)">Certificado visual (JSON):</strong> se abre en ventana nueva con diseño black card + QR.<br>
          <strong style="color:var(--gold)">Certificado PDF (Prisma):</strong> se abre con diseño Prisma Genesis. Pulsa <em>Imprimir → Guardar como PDF</em>.<br>
          <strong style="color:var(--gold)">TXT ASCII:</strong> formato texto premium con payload canónico.<br>
          <strong style="color:var(--gold)">JSON raw:</strong> datos puros para automatización.
        </p>
      `;

      /* ── Certificado visual JSON (Black Card) ── */
      document.getElementById('btn-json-cert').addEventListener('click', function () {
        try {
          const win = KronosCertificate.abrirOficial(registro);
          if (win) Kronos.toast('Certificado visual abierto', 'ok');
        } catch (err) {
          Kronos.toast('Error: ' + err.message, 'error');
        }
      });

      /* ── Certificado PDF (Prisma) ── */
      document.getElementById('btn-pdf-prisma').addEventListener('click', function () {
        try {
          const win = KronosCertificate.abrirPrisma(registro);
          if (win) {
            Kronos.toast('Pulsa "Guardar como PDF" en la nueva pestaña', 'ok');
            // Auto-disparar diálogo de impresión después de cargar
            setTimeout(() => {
              try { win.focus(); win.print(); } catch (e) {}
            }, 1200);
          }
        } catch (err) {
          Kronos.toast('Error: ' + err.message, 'error');
        }
      });

      /* ── TXT ASCII ── */
      document.getElementById('btn-txt-ascii').addEventListener('click', async function () {
        const b = this;
        b.disabled = true;
        const o = b.textContent;
        b.textContent = 'Preparando…';
        try {
          const res = await KronosCrypto.descargarCertificado(registro);
          Kronos.toast(res.ok ? 'TXT descargado (' + res.metodo + ')' : 'Error al descargar', res.ok ? 'ok' : 'error');
        } catch (err) {
          Kronos.toast('Error: ' + err.message, 'error');
        } finally {
          b.disabled = false;
          b.textContent = o;
        }
      });

      /* ── JSON raw ── */
      document.getElementById('btn-json-raw').addEventListener('click', async function () {
        const b = this;
        b.disabled = true;
        const o = b.textContent;
        b.textContent = 'Preparando…';
        try {
          const res = await KronosCrypto.descargarReciboJSON(registro);
          Kronos.toast(res.ok ? 'JSON descargado (' + res.metodo + ')' : 'Error al descargar', res.ok ? 'ok' : 'error');
        } catch (err) {
          Kronos.toast('Error: ' + err.message, 'error');
        } finally {
          b.disabled = false;
          b.textContent = o;
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