/* ============================================================
   KRONOS PROTOCOL · registrar.js v6
   5 acciones: Black Card · Prisma · SCDR · TXT · JSON raw
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

        <div class="acciones-cert">
          <button class="btn btn-certificado btn--sm" id="btn-black-pdf" type="button">🎴 Black Card PDF</button>
          <button class="btn btn-certificado btn--sm" id="btn-prisma-pdf" type="button">🔮 Prisma PDF</button>
          <button class="btn btn-certificado btn--sm" id="btn-scdr-pdf" type="button">🏛 SCDR Génesis PDF</button>
          <button class="btn btn-recibo btn--sm" id="btn-txt-ascii" type="button">📜 TXT ASCII</button>
          <button class="btn btn-recibo btn--sm" id="btn-json-raw" type="button">💾 JSON raw</button>
        </div>

        <div class="nota-final">
          <strong>Black Card PDF</strong> · tarjeta oscura dorada con QR.<br>
          <strong>Prisma PDF</strong> · cristal hexagonal de 6 universos con brillo creativo.<br>
          <strong>SCDR Génesis PDF</strong> · certificado formal con emblema, artículos, firmas y sello dorado.<br>
          <strong>TXT ASCII</strong> · documento premium con payload canónico.<br>
          <strong>JSON raw</strong> · datos puros para automatización.
        </div>
      `;

      /* Helper para descargas */
      async function conBoton(botonId, fn, msgOk) {
        const b = document.getElementById(botonId);
        b.addEventListener('click', async function () {
          const o = b.textContent;
          b.disabled = true;
          b.textContent = '⏳ Generando…';
          try {
            const res = await fn();
            if (res && res.ok) Kronos.toast(msgOk || 'Descargado', 'ok');
          } catch (err) {
            console.error(err);
            Kronos.toast('Error: ' + err.message, 'error');
          } finally {
            b.disabled = false;
            b.textContent = o;
          }
        });
      }

      /* 1. Black Card PDF */
      await conBoton('btn-black-pdf', () => KronosCertificate.descargarPDFOficial(registro), 'Black Card PDF descargado');

      /* 2. Prisma PDF */
      await conBoton('btn-prisma-pdf', () => KronosCertificate.descargarPDFPrisma(registro), 'Prisma PDF descargado');

      /* 3. SCDR Génesis PDF */
      await conBoton('btn-scdr-pdf', () => KronosCertificate.descargarPDFSCDR(registro), 'SCDR Génesis PDF descargado');

      /* 4. TXT ASCII */
      await conBoton('btn-txt-ascii', async () => {
        return await KronosCrypto.descargarCertificado(registro);
      }, 'TXT ASCII descargado');

      /* 5. JSON raw */
      await conBoton('btn-json-raw', async () => {
        return await KronosCrypto.descargarReciboJSON(registro);
      }, 'JSON raw descargado');

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