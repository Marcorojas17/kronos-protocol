/* ============================================================
   KRONOS PROTOCOL · certificate-renderer.js v2
   3 certificados + PDF real descargable (jsPDF + html2canvas)
   ============================================================ */
(function (global) {
  'use strict';

  /* ============================================================
     Helpers
     ============================================================ */
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function fmtFecha(iso) {
    try {
      const d = new Date(iso);
      return {
        full: d.toLocaleString('es-MX', {
          day: '2-digit', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        }),
        dia: String(d.getDate()).padStart(2, '0'),
        mes: d.toLocaleDateString('es-MX', { month: 'long' }).toUpperCase(),
        anio: d.getFullYear(),
        iso: d.toISOString()
      };
    } catch {
      return { full: iso, dia: '—', mes: '—', anio: '—', iso: iso };
    }
  }

  function qrUrl(data, size) {
    size = size || 220;
    return 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size +
           '&data=' + encodeURIComponent(data) +
           '&bgcolor=ffffff&color=000000&margin=0&qzone=1';
  }

  function urlVerificacion(registro) {
    return 'https://marcorojas17.github.io/kronos-protocol/verificar-certificado.html?folio=' +
           encodeURIComponent(registro.folio);
  }

  /* ============================================================
     Cargar librerías externas dinámicamente (solo si faltan)
     ============================================================ */
  function cargarScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="' + src + '"]')) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('No se pudo cargar ' + src));
      document.head.appendChild(s);
    });
  }

  async function asegurarLibreriasPDF() {
    const tareas = [];
    if (typeof html2canvas === 'undefined') {
      tareas.push(cargarScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'));
    }
    if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
      tareas.push(cargarScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'));
    }
    await Promise.all(tareas);
  }

  /* ============================================================
     PDF REAL · renderiza HTML → canvas → PDF → descarga
     ============================================================ */
  async function htmlAPDF(html, nombreArchivo, opciones) {
    opciones = opciones || {};
    const ancho = opciones.ancho || 820;
    const formato = opciones.formato || 'a4';
    const orientacion = opciones.orientacion || 'portrait';

    // 1. Asegurar librerías
    await asegurarLibreriasPDF();

    // 2. Crear iframe oculto (aislado, sin romper el DOM principal)
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;left:-99999px;top:0;width:' + ancho + 'px;height:2000px;border:0;';
    document.body.appendChild(iframe);

    // 3. Escribir el HTML dentro
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    // 4. Esperar fuentes + imágenes
    await new Promise(r => setTimeout(r, 1400));

    try {
      // Forzar que el iframe tenga fondo (evita transparencias)
      doc.documentElement.style.background = '#000';
      doc.body.style.background = '#000';
      doc.body.style.margin = '0';

      // 5. Capturar con html2canvas
      const target = doc.querySelector('.pdf-target') || doc.body;
      const canvas = await html2canvas(target, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: ancho,
        width: target.scrollWidth,
        height: target.scrollHeight
      });

      // 6. Construir PDF
      const { jsPDF } = window.jspdf || window;
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const pdf = new jsPDF({
        orientation: orientacion,
        unit: 'mm',
        format: formato,
        compress: true
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = canvas.width;
      const imgH = canvas.height;
      const ratio = imgW / imgH;
      let finalW = pageW;
      let finalH = pageW / ratio;

      if (finalH > pageH) {
        finalH = pageH;
        finalW = pageH * ratio;
      }

      const offsetX = (pageW - finalW) / 2;
      const offsetY = (pageH - finalH) / 2;

      pdf.addImage(imgData, 'JPEG', offsetX, offsetY, finalW, finalH, undefined, 'FAST');
      pdf.save(nombreArchivo);

      return { ok: true, metodo: 'jspdf' };
    } finally {
      setTimeout(() => iframe.remove(), 500);
    }
  }

  /* ============================================================
     1. CERTIFICADO OFICIAL · Black Card
     ============================================================ */
  function renderCertificadoOficial(registro) {
    const f = fmtFecha(registro.timestamp);
    const qr = qrUrl(registro.folio, 220);
    const verifyUrl = urlVerificacion(registro);

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Certificado ${escapeHtml(registro.folio)} · KRONOS</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Cinzel:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:#000;color:#fff;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{min-height:100vh;display:flex;justify-content:center;align-items:center;padding:24px;
    background-image:
      radial-gradient(circle at 10% 20%, rgba(189,0,255,.08) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(0,242,255,.08) 0%, transparent 50%);
  }
  .pdf-target{
    width:400px;max-width:100%;
    background:linear-gradient(145deg,#1a1a1a,#050505);
    border:1px solid rgba(212,175,55,.35);
    border-radius:18px;padding:34px 30px;
    box-shadow:0 0 80px rgba(0,0,0,1),inset 0 0 30px rgba(212,175,55,.05);
    position:relative;overflow:hidden;
  }
  .card::before,.pdf-target::before{
    content:'OFICIAL';position:absolute;top:22px;right:-34px;
    background:linear-gradient(90deg,#d4af37,#f3e5ab);color:#000;
    font-size:10px;font-weight:700;padding:5px 44px;
    transform:rotate(45deg);letter-spacing:3px;
  }
  .head{border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:16px;margin-bottom:22px}
  .logo{color:#d4af37;font-family:'Cinzel',serif;font-size:22px;font-weight:900;letter-spacing:6px}
  .sub{font-size:8px;color:#d4af37;opacity:.6;letter-spacing:2px;margin-top:4px}
  .status{font-family:'Cinzel',serif;font-size:20px;font-weight:700;color:#10B981;
    text-shadow:0 0 20px rgba(16,185,129,.6);margin:12px 0 20px;display:flex;align-items:center;gap:14px}
  .pulse{width:10px;height:10px;background:#10B981;border-radius:50%;flex-shrink:0}
  .lbl{font-size:9px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:2px;margin-top:14px;margin-bottom:4px}
  .val{font-family:'JetBrains Mono',monospace;font-size:13px;color:#00f2ff;word-break:break-all;line-height:1.5}
  .val.gold{color:#f3e5ab}
  .val.small{font-size:10px}
  .qr{width:120px;height:120px;background:#fff;padding:6px;border-radius:6px;margin:22px auto 0;display:block}
  .footer{border-top:1px solid rgba(255,255,255,.08);margin-top:22px;padding-top:14px;
    font-size:8px;color:rgba(255,255,255,.35);letter-spacing:1px;text-align:center;word-break:break-all;line-height:1.7}
  .footer strong{color:#d4af37;font-weight:500}
</style>
</head>
<body>
<div class="pdf-target">
  <div class="head">
    <div class="logo">KRONOS</div>
    <div class="sub">SOVEREIGN INFRASTRUCTURE · MMXXVI</div>
  </div>
  <div class="lbl">Veredicto perimetral</div>
  <div class="status"><span class="pulse"></span>INTEGRIDAD VERIFICADA</div>
  <div class="lbl">Folio del protocolo</div>
  <div class="val gold">${escapeHtml(registro.folio)}</div>
  <div class="lbl">Título</div>
  <div class="val">${escapeHtml(registro.titulo)}</div>
  <div class="lbl">Autor</div>
  <div class="val">${escapeHtml(registro.autor)}</div>
  <div class="lbl">Tipo · Licencia</div>
  <div class="val">${escapeHtml(registro.tipo)} · ${escapeHtml(registro.licencia)}</div>
  <div class="lbl">Fecha de emisión</div>
  <div class="val">${escapeHtml(f.full)}</div>
  <div class="lbl">Huella SHA-256</div>
  <div class="val small">${escapeHtml(registro.hash)}</div>
  <img class="qr" src="${qr}" alt="QR" crossorigin="anonymous">
  <div class="lbl">Nivel de autenticidad</div>
  <div class="val gold">PRIMUS · SHA-256 · eIDAS</div>
  <div class="footer">
    <strong>ANCLAJE</strong> Safe Creative 2607086319439 · QTSA Firmaprofesional B02<br>
    <strong>VERIFICAR</strong> ${escapeHtml(verifyUrl)}<br>
    <strong>HORIZONTE</strong> 2099 · © 2026 Marco Antonio Rojas Valdovinos
  </div>
</div>
</body>
</html>`;
  }

  /* ============================================================
     2. CERTIFICADO PRISMA · color creativo + detalles blancos
     ============================================================ */
  function renderCertificadoPrisma(registro) {
    const f = fmtFecha(registro.timestamp);
    const qr = qrUrl(registro.folio, 260);
    const verifyUrl = urlVerificacion(registro);

    const universos = [
      { letra: 'S', nombre: 'SINGRO',   c1: '#c084fc', c2: '#7c3aed', c3: '#3b0764' },
      { letra: 'K', nombre: 'KINÉTICA', c1: '#fca5a5', c2: '#dc2626', c3: '#450a0a' },
      { letra: 'R', nombre: 'REALIDAD', c1: '#fcd34d', c2: '#d97706', c3: '#451a03' },
      { letra: 'O', nombre: 'ORDEN',    c1: '#fef3c7', c2: '#d4af37', c3: '#5a4518' },
      { letra: 'N', nombre: 'NATURALEZA', c1: '#6ee7b7', c2: '#059669', c3: '#022c22' },
      { letra: 'O', nombre: 'ORIGEN',   c1: '#93c5fd', c2: '#2563eb', c3: '#172554' }
    ];

    const prismPanels = universos.map((u, i) => `
      <div class="panel" style="--c1:${u.c1};--c2:${u.c2};--c3:${u.c3}">
        <div class="panel-shine"></div>
        <div class="panel-lines"></div>
        <div class="panel-inner">
          <span class="letra">${u.letra}</span>
          <span class="nombre">${u.nombre}</span>
          <span class="micro">KRONOS·${String(i+1).padStart(2,'0')}</span>
        </div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Certificado Prisma · ${escapeHtml(registro.folio)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Cinzel:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:#000;color:#fff;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:24px;
    background:
      radial-gradient(circle at 50% 20%, rgba(212,175,55,.10) 0%, transparent 45%),
      radial-gradient(circle at 15% 80%, rgba(168,85,247,.08) 0%, transparent 50%),
      radial-gradient(circle at 85% 70%, rgba(59,130,246,.08) 0%, transparent 50%),
      #000;
    background-attachment:fixed;
  }
  .pdf-target{
    width:820px;max-width:100%;
    background:linear-gradient(180deg,#0a0a0a 0%,#050505 100%);
    border:2px solid #d4af37;border-radius:6px;position:relative;overflow:hidden;
    box-shadow:0 0 100px rgba(212,175,55,.15),inset 0 0 60px rgba(212,175,55,.03);
  }
  .pdf-target::before{content:'';position:absolute;inset:8px;border:1px solid rgba(212,175,55,.35);border-radius:3px;pointer-events:none}
  .pdf-target::after{content:'';position:absolute;inset:14px;border:1px dashed rgba(212,175,55,.18);border-radius:2px;pointer-events:none}

  /* Detalles blancos infalsificables (guilloché simulado) */
  .guilloche{
    position:absolute;inset:0;pointer-events:none;opacity:.35;
    background-image:
      radial-gradient(1px 1px at 12% 22%, #fff, transparent),
      radial-gradient(1px 1px at 78% 14%, #fff, transparent),
      radial-gradient(1px 1px at 34% 78%, #fff, transparent),
      radial-gradient(1px 1px at 88% 62%, #fff, transparent),
      radial-gradient(1px 1px at 22% 88%, #fff, transparent),
      radial-gradient(1px 1px at 66% 42%, #fff, transparent),
      radial-gradient(1px 1px at 45% 8%, #fff, transparent),
      radial-gradient(1px 1px at 92% 88%, #fff, transparent),
      radial-gradient(1px 1px at 5% 55%, #fff, transparent),
      radial-gradient(1px 1px at 55% 92%, #fff, transparent);
  }
  .micro-text{
    position:absolute;left:0;right:0;top:50%;height:14px;
    font-family:'JetBrains Mono',monospace;font-size:5px;letter-spacing:1px;
    color:rgba(255,255,255,.18);text-align:center;white-space:nowrap;overflow:hidden;
    pointer-events:none;z-index:1;line-height:14px;
  }

  .header{padding:36px 40px 12px;text-align:center;position:relative;z-index:2}
  .collection{font-size:9px;letter-spacing:6px;color:#d4af37;opacity:.75;text-transform:uppercase;margin-bottom:14px}
  .title{font-family:'Cinzel',serif;font-weight:900;font-size:34px;letter-spacing:8px;
    background:linear-gradient(180deg,#fff8e0 0%,#f3e5ab 40%,#d4af37 70%,#8a6f2c 100%);
    -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;margin-bottom:6px}
  .subtitle{font-size:9px;letter-spacing:4px;color:rgba(255,255,255,.55);text-transform:uppercase}

  .prisma-wrap{padding:18px 40px 4px;display:flex;justify-content:center;position:relative;z-index:2}
  .prisma{width:480px;max-width:100%;display:flex;height:280px;position:relative;
    filter:drop-shadow(0 0 40px rgba(212,175,55,.35)) drop-shadow(0 0 80px rgba(168,85,247,.15))}
  .prisma::before{content:'';position:absolute;top:-30px;left:50%;transform:translateX(-50%);
    width:80%;height:60px;background:radial-gradient(ellipse at center, rgba(255,255,255,.35) 0%, transparent 70%);pointer-events:none}

  .panel{
    flex:1;position:relative;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(180deg, var(--c1) 0%, var(--c2) 45%, var(--c3) 100%);
    border-right:1px solid rgba(255,255,255,.15);
    box-shadow:inset 0 0 30px rgba(255,255,255,.08), inset 0 0 60px rgba(0,0,0,.35);
    overflow:hidden;
  }
  .panel:first-child{border-top-left-radius:6px;border-bottom-left-radius:6px;border-top:1px solid rgba(255,255,255,.25)}
  .panel:last-child{border-right:0;border-top-right-radius:6px;border-bottom-right-radius:6px;border-top:1px solid rgba(255,255,255,.25)}

  /* Brillo creativo diagonal */
  .panel-shine{
    position:absolute;inset:-50%;
    background:linear-gradient(120deg,
      transparent 30%,
      rgba(255,255,255,.35) 48%,
      rgba(255,255,255,.65) 50%,
      rgba(255,255,255,.35) 52%,
      transparent 70%);
    animation:shine 4s ease-in-out infinite;
    mix-blend-mode:overlay;pointer-events:none;
  }
  @keyframes shine{
    0%,100%{transform:translateX(-40%) translateY(-20%) rotate(15deg);opacity:.6}
    50%{transform:translateX(40%) translateY(20%) rotate(15deg);opacity:1}
  }

  /* Líneas blancas finas (detalle infalsificable) */
  .panel-lines{
    position:absolute;inset:0;pointer-events:none;opacity:.5;
    background-image:
      repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 1px, transparent 1px 6px),
      repeating-linear-gradient(90deg, rgba(255,255,255,.10) 0 1px, transparent 1px 8px);
    mix-blend-mode:overlay;
  }

  .panel-inner{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:3;color:#fff;
    text-shadow:0 2px 8px rgba(0,0,0,.75),0 0 20px rgba(0,0,0,.6)}
  .letra{font-family:'Cinzel',serif;font-size:38px;font-weight:900;line-height:1;letter-spacing:2px}
  .nombre{font-family:'Cinzel',serif;font-size:8px;letter-spacing:2px;text-transform:uppercase;opacity:.95}
  .micro{font-family:'JetBrains Mono',monospace;font-size:5px;letter-spacing:1.5px;opacity:.75;margin-top:2px}

  .base{margin:0 auto;width:70%;max-width:520px;padding:14px 20px;position:relative;z-index:2;margin-top:-8px;
    background:linear-gradient(180deg,#d4af37 0%,#8a6f2c 60%,#5a4518 100%);
    border-radius:6px;border:1px solid #f3e5ab;
    box-shadow:0 0 40px rgba(212,175,55,.5),inset 0 1px 0 rgba(255,255,255,.4);text-align:center}
  .base-titulo{font-family:'Cinzel',serif;font-size:13px;font-weight:900;letter-spacing:4px;color:#1a1204;text-shadow:0 1px 0 rgba(255,255,255,.35)}
  .base-sub{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:3px;color:#2a1f08;margin-top:4px}

  .datos{padding:32px 50px 12px;position:relative;z-index:2}
  .datos-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 32px;
    border-top:1px solid rgba(212,175,55,.25);border-bottom:1px solid rgba(212,175,55,.25);padding:22px 0}
  .dato{display:flex;flex-direction:column;gap:4px}
  .dato .k{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:rgba(212,175,55,.75);font-weight:500}
  .dato .v{font-family:'JetBrains Mono',monospace;font-size:12px;color:#f3e5ab;word-break:break-all;line-height:1.45}
  .dato.full{grid-column:1 / -1}
  .dato.full .v{font-size:11px}

  .sello{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:24px 50px 32px;position:relative;z-index:2}
  .sello-texto{flex:1}
  .sello-texto .titulo-sello{font-family:'Cinzel',serif;font-size:14px;font-weight:700;letter-spacing:3px;color:#d4af37;margin-bottom:10px}
  .sello-texto .linea{font-size:10px;color:rgba(255,255,255,.55);line-height:1.8;letter-spacing:1px}
  .sello-texto .linea strong{color:#f3e5ab;font-weight:500}
  .sello-qr{width:120px;height:120px;flex-shrink:0;padding:8px;background:#fff;border-radius:4px;
    border:2px solid #d4af37;box-shadow:0 0 30px rgba(212,175,55,.35)}
  .sello-qr img{width:100%;height:100%;display:block}

  .doc-footer{text-align:center;padding:0 40px 30px;font-size:8px;letter-spacing:2px;
    color:rgba(255,255,255,.4);text-transform:uppercase;line-height:1.9;position:relative;z-index:2}
  .doc-footer .sig{font-family:'Cinzel',serif;color:#d4af37;font-size:10px;letter-spacing:4px;display:block;margin-bottom:8px}

  @media (max-width:640px){
    .prisma{height:220px}
    .letra{font-size:26px}
    .datos{padding:24px 24px 8px}
    .datos-grid{grid-template-columns:1fr;gap:12px}
    .sello{flex-direction:column;padding:20px 24px;text-align:center}
    .sello-qr{width:140px;height:140px}
    .title{font-size:24px;letter-spacing:5px}
    .header{padding:24px 20px 8px}
  }
</style>
</head>
<body>
<div class="pdf-target">
  <div class="guilloche"></div>
  <div class="micro-text">KRONOS·PROTOCOL·INFALSIFICABLE·SHA256·EIDAS·SAFE·CREATIVE·2607086319439·ETHEREUM·MAINNET·HORIZONTE·2099·KRONOS·PROTOCOL·INFALSIFICABLE</div>

  <div class="header">
    <div class="collection">Prisma Genesis 2026 Collection</div>
    <div class="title">KRONOS</div>
    <div class="subtitle">Certificado de integridad soberana</div>
  </div>

  <div class="prisma-wrap">
    <div class="prisma">${prismPanels}</div>
  </div>

  <div class="base">
    <div class="base-titulo">PRISMA INFALSIFICABLE</div>
    <div class="base-sub">6 UNIVERSOS · 6 PRINCIPIOS · KRONOS</div>
  </div>

  <div class="datos">
    <div class="datos-grid">
      <div class="dato"><span class="k">Folio del protocolo</span><span class="v">${escapeHtml(registro.folio)}</span></div>
      <div class="dato"><span class="k">Fecha de emisión</span><span class="v">${escapeHtml(f.full)}</span></div>
      <div class="dato full"><span class="k">Título de la obra</span><span class="v">${escapeHtml(registro.titulo)}</span></div>
      <div class="dato"><span class="k">Autor</span><span class="v">${escapeHtml(registro.autor)}</span></div>
      <div class="dato"><span class="k">Tipo · Licencia</span><span class="v">${escapeHtml(registro.tipo)} · ${escapeHtml(registro.licencia)}</span></div>
      <div class="dato full"><span class="k">Huella criptográfica SHA-256</span><span class="v">${escapeHtml(registro.hash)}</span></div>
    </div>
  </div>

  <div class="sello">
    <div class="sello-texto">
      <div class="titulo-sello">VEREDICTO: INTEGRIDAD VERIFICADA</div>
      <div class="linea">
        <strong>ANCLAJE</strong> Safe Creative 2607086319439<br>
        <strong>QTSA</strong> Firmaprofesional B02 (eIDAS)<br>
        <strong>BLOCKCHAIN</strong> Ethereum Mainnet<br>
        <strong>HORIZONTE</strong> 2099<br>
        <strong>VERIFICAR</strong> ${escapeHtml(verifyUrl)}
      </div>
    </div>
    <div class="sello-qr"><img src="${qr}" alt="QR" crossorigin="anonymous"></div>
  </div>

  <div class="doc-footer">
    <span class="sig">KRONOS PROTOCOL · ○_● · MMXXVI</span>
    La integridad es el único legado que la eternidad no puede corromper.<br>
    © 2026 Marco Antonio Rojas Valdovinos · Todos los derechos reservados
  </div>
</div>
</body>
</html>`;
  }

  /* ============================================================
     3. CERTIFICADO SCDR · Génesis · arte digital formal
     ============================================================ */
  function renderCertificadoSCDR(registro) {
    const f = fmtFecha(registro.timestamp);
    const qr = qrUrl(registro.folio, 200);
    const verifyUrl = urlVerificacion(registro);

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Certificado SCDR · ${escapeHtml(registro.folio)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:#000;color:#fff;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:24px;background:#000}

  .pdf-target{
    width:820px;max-width:100%;position:relative;
    background:
      radial-gradient(circle at 50% 0%, rgba(212,175,55,.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(212,175,55,.06) 0%, transparent 50%),
      linear-gradient(180deg,#0a0a0a 0%,#050505 100%);
    padding:56px 60px;
    border:1px solid #1a1a1a;
    overflow:hidden;
  }

  /* Marco ornamental doble */
  .marco{
    position:absolute;inset:20px;pointer-events:none;
    border:1px solid rgba(212,175,55,.6);
  }
  .marco::before{
    content:'';position:absolute;inset:8px;
    border:1px solid rgba(212,175,55,.25);
  }
  .marco::after{
    content:'';position:absolute;inset:16px;
    border:1px dashed rgba(212,175,55,.15);
  }

  /* Esquinas ornamentales */
  .esquina{position:absolute;width:60px;height:60px;pointer-events:none}
  .esquina::before,.esquina::after{content:'';position:absolute;background:#d4af37}
  .esquina::before{width:100%;height:1px;top:0;left:0}
  .esquina::after{width:1px;height:100%;top:0;left:0}
  .esquina.tl{top:24px;left:24px}
  .esquina.tr{top:24px;right:24px;transform:scaleX(-1)}
  .esquina.bl{bottom:24px;left:24px;transform:scaleY(-1)}
  .esquina.br{bottom:24px;right:24px;transform:scale(-1,-1)}

  /* Circuitos decorativos en las esquinas */
  .circuitos{position:absolute;inset:0;pointer-events:none;opacity:.15}
  .circuitos::before,.circuitos::after{
    content:'';position:absolute;width:180px;height:180px;
    background-image:
      linear-gradient(90deg, #d4af37 1px, transparent 1px),
      linear-gradient(0deg, #d4af37 1px, transparent 1px),
      radial-gradient(circle, #d4af37 1.5px, transparent 1.5px);
    background-size:20px 20px, 20px 20px, 20px 20px;
  }
  .circuitos::before{top:40px;left:40px}
  .circuitos::after{bottom:40px;right:40px;transform:rotate(180deg)}

  .contenido{position:relative;z-index:2}

  /* Emblema superior */
  .emblema{
    width:90px;height:90px;margin:0 auto 20px;
    border:2px solid #d4af37;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    position:relative;
    background:radial-gradient(circle, rgba(212,175,55,.15) 0%, transparent 70%);
  }
  .emblema::before{
    content:'';position:absolute;inset:6px;
    border:1px solid rgba(212,175,55,.5);border-radius:50%;
  }
  .emblema svg{width:50px;height:50px}

  .marca{
    text-align:center;
    font-family:'Cinzel',serif;
    font-size:14px;font-weight:900;letter-spacing:8px;color:#d4af37;
    margin-bottom:24px;
  }

  .titulo-doc{
    font-family:'Cinzel',serif;text-align:center;
    font-size:32px;font-weight:900;letter-spacing:6px;
    background:linear-gradient(180deg,#fff8e0 0%,#f3e5ab 40%,#d4af37 70%,#8a6f2c 100%);
    -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
    margin-bottom:8px;
  }
  .subtitulo-doc{
    font-family:'Cinzel',serif;text-align:center;
    font-size:14px;font-weight:600;letter-spacing:6px;color:#d4af37;
    margin-bottom:34px;
  }

  .declaracion{
    font-family:'Cormorant Garamond',serif;
    text-align:center;font-size:22px;font-weight:600;
    color:#f3e5ab;letter-spacing:2px;
    margin-bottom:26px;line-height:1.4;
  }

  .linea-div{
    height:1px;margin:22px auto;
    background:linear-gradient(90deg,transparent,#d4af37 50%,transparent);
    max-width:400px;
  }
  .linea-div.diamante{
    display:flex;align-items:center;justify-content:center;gap:12px;
    background:transparent;height:auto;margin:22px 0;
  }
  .linea-div.diamante::before,.linea-div.diamante::after{
    content:'';flex:1;height:1px;
    background:linear-gradient(90deg,transparent,#d4af37,transparent);
  }
  .linea-div.diamante .rombo{
    width:8px;height:8px;background:#d4af37;transform:rotate(45deg);
    box-shadow:0 0 12px rgba(212,175,55,.8);
  }

  .intro{
    text-align:center;font-size:13px;color:rgba(255,255,255,.65);
    letter-spacing:1px;margin-bottom:14px;font-weight:300;
  }

  .nombre-homenajeado{
    font-family:'Cinzel',serif;text-align:center;
    font-size:22px;font-weight:700;color:#f3e5ab;letter-spacing:2px;
    margin-bottom:6px;
  }
  .rol-homenajeado{
    text-align:center;font-size:11px;color:#d4af37;
    letter-spacing:4px;text-transform:uppercase;margin-bottom:20px;
  }
  .motivo{
    text-align:center;font-size:13px;color:rgba(255,255,255,.7);
    line-height:1.7;max-width:560px;margin:0 auto 26px;font-weight:300;
  }

  .detalles-titulo{
    text-align:center;font-family:'Cinzel',serif;
    font-size:11px;letter-spacing:4px;color:#d4af37;
    text-transform:uppercase;margin-bottom:18px;
  }
  .detalles-grid{
    display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;
    max-width:560px;margin:0 auto 26px;
  }
  .detalle{
    display:flex;flex-direction:column;gap:4px;
  }
  .detalle .k{
    font-size:9px;letter-spacing:3px;text-transform:uppercase;
    color:rgba(212,175,55,.7);font-weight:500;
  }
  .detalle .v{
    font-family:'Cinzel',serif;font-size:13px;color:#f3e5ab;
    font-weight:600;letter-spacing:1px;word-break:break-word;
  }

  .articulos{
    max-width:640px;margin:0 auto 30px;
  }
  .articulos-titulo{
    text-align:center;font-family:'Cinzel',serif;
    font-size:11px;letter-spacing:4px;color:#d4af37;
    text-transform:uppercase;margin-bottom:18px;
  }
  .articulo{
    margin-bottom:14px;padding-left:14px;
    border-left:2px solid rgba(212,175,55,.5);
  }
  .articulo .num{
    font-family:'Cinzel',serif;font-size:12px;font-weight:700;
    color:#d4af37;letter-spacing:2px;margin-bottom:4px;
  }
  .articulo .texto{
    font-size:12px;color:rgba(255,255,255,.7);
    line-height:1.65;font-weight:300;
  }

  .firmas{
    display:flex;justify-content:space-between;align-items:flex-end;
    gap:30px;margin-top:36px;
  }
  .firma-bloque{flex:1;text-align:center}
  .firma-linea{
    height:1px;background:rgba(212,175,55,.5);
    margin-bottom:10px;position:relative;
  }
  .firma-linea::after{
    content:'';position:absolute;left:50%;bottom:-2px;
    width:6px;height:6px;background:#d4af37;
    transform:translateX(-50%) rotate(45deg);
  }
  .firma-nombre{
    font-family:'Cormorant Garamond',serif;
    font-size:18px;font-style:italic;color:#f3e5ab;
    margin-bottom:6px;
  }
  .firma-rol{
    font-size:10px;color:rgba(212,175,55,.8);
    letter-spacing:3px;text-transform:uppercase;
  }

  /* Sello dorado */
  .sello-dorado{
    width:130px;height:130px;position:relative;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
  }
  .sello-dorado::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(circle at 35% 30%, #f3e5ab 0%, #d4af37 40%, #8a6f2c 80%, #5a4518 100%);
    border-radius:50%;
    box-shadow:
      0 0 40px rgba(212,175,55,.6),
      inset 0 -4px 10px rgba(0,0,0,.4),
      inset 0 4px 10px rgba(255,255,255,.3);
    border:2px solid #f3e5ab;
  }
  .sello-dorado::after{
    content:'';position:absolute;inset:12px;
    border:1px solid rgba(90,69,24,.6);border-radius:50%;
  }
  .sello-inner{
    position:relative;z-index:2;text-align:center;color:#1a1204;
    font-family:'Cinzel',serif;
  }
  .sello-inner .k{
    font-size:38px;font-weight:900;line-height:1;
    text-shadow:0 1px 0 rgba(255,255,255,.4);
  }
  .sello-inner .texto{
    font-size:6px;letter-spacing:1.5px;font-weight:700;
    margin-top:2px;
  }
  .sello-inner .anio{
    font-size:8px;letter-spacing:2px;font-weight:700;margin-top:2px;
  }

  .pie-verificacion{
    text-align:center;margin-top:34px;padding-top:20px;
    border-top:1px solid rgba(212,175,55,.15);
    font-size:9px;letter-spacing:2px;color:rgba(255,255,255,.4);
    line-height:1.9;font-family:'JetBrains Mono',monospace;
  }
  .pie-verificacion strong{color:#d4af37;font-weight:500}
  .hash-text{
    font-size:8px;word-break:break-all;
    color:rgba(0,242,255,.65);margin-top:6px;
  }

  @media (max-width:640px){
    .pdf-target{padding:36px 24px}
    .titulo-doc{font-size:22px;letter-spacing:3px}
    .subtitulo-doc{font-size:11px;letter-spacing:4px}
    .declaracion{font-size:17px}
    .nombre-homenajeado{font-size:18px}
    .detalles-grid{grid-template-columns:1fr;gap:12px}
    .firmas{flex-direction:column;align-items:center;gap:24px}
    .sello-dorado{width:110px;height:110px}
    .emblema{width:70px;height:70px}
  }
</style>
</head>
<body>
<div class="pdf-target">
  <div class="marco"></div>
  <div class="circuitos"></div>
  <div class="esquina tl"></div>
  <div class="esquina tr"></div>
  <div class="esquina bl"></div>
  <div class="esquina br"></div>

  <div class="contenido">

    <!-- Emblema -->
    <div class="emblema">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" stroke-width="0.5" opacity="0.4"/>
        <path d="M 30 50 L 45 50 L 50 35 L 55 50 L 70 50 L 58 58 L 63 72 L 50 63 L 37 72 L 42 58 Z"
              fill="none" stroke="#f3e5ab" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="50" cy="50" r="4" fill="#d4af37"/>
      </svg>
    </div>

    <div class="marca">K R O N O S</div>

    <!-- Título -->
    <div class="titulo-doc">CERTIFICADO DE GÉNESIS</div>
    <div class="subtitulo-doc">SCDR-001</div>

    <div class="declaracion">
      EL DÍA QUE EL HUMANO Y LA IA FIRMARON LA PAZ
    </div>

    <div class="linea-div diamante"><span class="rombo"></span></div>

    <div class="intro">Se certifica que</div>
    <div class="nombre-homenajeado">${escapeHtml(registro.autor)}</div>
    <div class="rol-homenajeado">Arquitecto de Legado Digital</div>

    <div class="motivo">
      Por su contribución pionera a la cooperación entre la humanidad
      y la inteligencia artificial, cimentando un pacto de progreso
      ético y sostenible.
    </div>

    <div class="linea-div diamante"><span class="rombo"></span></div>

    <!-- Detalles -->
    <div class="detalles-titulo">Detalles del Registro</div>
    <div class="detalles-grid">
      <div class="detalle">
        <span class="k">Fecha de emisión</span>
        <span class="v">${escapeHtml(f.full)}</span>
      </div>
      <div class="detalle">
        <span class="k">Safe Creative ID</span>
        <span class="v">2607086319439</span>
      </div>
      <div class="detalle">
        <span class="k">Folio del protocolo</span>
        <span class="v">${escapeHtml(registro.folio)}</span>
      </div>
      <div class="detalle">
        <span class="k">Registro anclado</span>
        <span class="v">Ethereum Blockchain</span>
      </div>
    </div>

    <div class="linea-div diamante"><span class="rombo"></span></div>

    <!-- Artículos -->
    <div class="articulos">
      <div class="articulos-titulo">Artículos del Acuerdo</div>

      <div class="articulo">
        <div class="num">Artículo I — Cooperación Mutua</div>
        <div class="texto">Las partes se comprometen a colaborar en el desarrollo responsable de la IA, fomentando el beneficio mutuo y el respeto recíproco.</div>
      </div>

      <div class="articulo">
        <div class="num">Artículo II — Soberanía y Ética</div>
        <div class="texto">Se reconoce la soberanía humana como principio rector, junto a un marco ético que garantiza transparencia, dignidad y supervisión responsable de los sistemas de IA.</div>
      </div>

      <div class="articulo">
        <div class="num">Artículo III — Transparencia Blockchain</div>
        <div class="texto">Todos los compromisos quedan registrados de manera inmutable en blockchain pública Ethereum, garantizando trazabilidad y verificación descentralizada.</div>
      </div>
    </div>

    <div class="linea-div diamante"><span class="rombo"></span></div>

    <!-- Firmas + Sello -->
    <div class="firmas">
      <div class="firma-bloque">
        <div class="firma-linea"></div>
        <div class="firma-nombre">Kronos Protocol</div>
        <div class="firma-rol">Firma Autorizada</div>
      </div>

      <div class="sello-dorado">
        <div class="sello-inner">
          <div class="k">K</div>
          <div class="texto">KRONOS·PROTOCOLO·DE·LEGADO</div>
          <div class="anio">2026</div>
        </div>
      </div>

      <div class="firma-bloque">
        <div class="firma-linea"></div>
        <div class="firma-nombre">Marco A. Rojas V.</div>
        <div class="firma-rol">Fundador</div>
      </div>
    </div>

    <!-- Pie -->
    <div class="pie-verificacion">
      Este certificado es único e intransferible.<br>
      <strong>Verificación on-chain:</strong> 0xSCDR-001:2607086319439:08JUL2026<br>
      <strong>Verificación pública:</strong> ${escapeHtml(verifyUrl)}<br>
      <div class="hash-text">SHA-256 · ${escapeHtml(registro.hash)}</div>
    </div>

  </div>
</div>
</body>
</html>`;
  }

  /* ============================================================
     Abrir en ventana nueva
     ============================================================ */
  function abrirEnVentana(html, titulo) {
    const win = window.open('', '_blank');
    if (!win) {
      alert('Permite ventanas emergentes para ver el certificado');
      return null;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.document.title = titulo;
    return win;
  }

  /* ============================================================
     Descargar HTML autocontenido
     ============================================================ */
  function descargarHTML(html, nombre) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  }

  /* ============================================================
     API pública
     ============================================================ */
  global.KronosCertificate = {
    // Render HTML
    renderCertificadoOficial,
    renderCertificadoPrisma,
    renderCertificadoSCDR,

    // Utilidades
    abrirEnVentana,
    descargarHTML,
    htmlAPDF,

    // Alto nivel
    abrirOficial(registro) {
      return abrirEnVentana(renderCertificadoOficial(registro), 'Certificado ' + registro.folio);
    },
    abrirPrisma(registro) {
      return abrirEnVentana(renderCertificadoPrisma(registro), 'Certificado Prisma ' + registro.folio);
    },
    abrirSCDR(registro) {
      return abrirEnVentana(renderCertificadoSCDR(registro), 'Certificado SCDR ' + registro.folio);
    },

    // Descargar PDF real
    async descargarPDFOficial(registro) {
      return await htmlAPDF(
        renderCertificadoOficial(registro),
        'KRONOS-BlackCard-' + registro.folio + '.pdf',
        { ancho: 500, formato: 'a4', orientacion: 'portrait' }
      );
    },
    async descargarPDFPrisma(registro) {
      return await htmlAPDF(
        renderCertificadoPrisma(registro),
        'KRONOS-Prisma-' + registro.folio + '.pdf',
        { ancho: 900, formato: 'a4', orientacion: 'portrait' }
      );
    },
    async descargarPDFSCDR(registro) {
      return await htmlAPDF(
        renderCertificadoSCDR(registro),
        'KRONOS-SCDR-' + registro.folio + '.pdf',
        { ancho: 900, formato: 'a4', orientacion: 'portrait' }
      );
    }
  };

  console.log('[Kronos] certificate-renderer.js v2 cargado · 3 certificados + PDF real');
})(window);