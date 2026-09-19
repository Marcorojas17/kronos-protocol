/* ============================================================
   KRONOS PROTOCOL · certificate-renderer.js
   Genera certificados visuales:
     · Black Card (estilo dictamen oficial)
     · Prisma Cosmic (estilo Prisma Genesis 2026)
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
    return 'https://marcorojas17.github.io/kronos-protocol/verificar-certificado.html?folio=' + encodeURIComponent(registro.folio);
  }

  /* ============================================================
     CERTIFICADO OFICIAL · Black Card (para el botón JSON)
     ============================================================ */
  function renderCertificadoOficial(registro) {
    const f = fmtFecha(registro.timestamp);
    const qr = qrUrl(registro.folio, 220);
    const verifyUrl = urlVerificacion(registro);

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado ${escapeHtml(registro.folio)} · KRONOS</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Cinzel:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    background:#000;color:#fff;font-family:'Inter',sans-serif;
    min-height:100vh;display:flex;justify-content:center;align-items:center;
    padding:24px;
    background-image:
      radial-gradient(circle at 10% 20%, rgba(189,0,255,.08) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(0,242,255,.08) 0%, transparent 50%);
  }
  .card{
    width:400px;max-width:100%;
    background:linear-gradient(145deg,#1a1a1a,#050505);
    border:1px solid rgba(212,175,55,.35);
    border-radius:18px;padding:34px 30px;
    box-shadow:0 0 80px rgba(0,0,0,1),inset 0 0 30px rgba(212,175,55,.05);
    position:relative;overflow:hidden;
  }
  .card::before{
    content:'OFICIAL';position:absolute;top:22px;right:-34px;
    background:linear-gradient(90deg,#d4af37,#f3e5ab);
    color:#000;font-size:10px;font-weight:700;padding:5px 44px;
    transform:rotate(45deg);letter-spacing:3px;
  }
  .card::after{
    content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(circle at 50% 0%, rgba(212,175,55,.06) 0%, transparent 60%);
  }
  .head{border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:16px;margin-bottom:22px}
  .logo{color:#d4af37;font-family:'Cinzel',serif;font-size:22px;font-weight:900;letter-spacing:6px}
  .sub{font-size:8px;color:#d4af37;opacity:.6;letter-spacing:2px;margin-top:4px}
  .status{
    font-family:'Cinzel',serif;font-size:20px;font-weight:700;color:#10B981;
    text-shadow:0 0 20px rgba(16,185,129,.6);margin:12px 0 20px;
    display:flex;align-items:center;gap:14px;
  }
  .pulse{
    width:10px;height:10px;background:#10B981;border-radius:50%;
    box-shadow:0 0 0 0 rgba(16,185,129,.7);animation:pulse 2s infinite;flex-shrink:0;
  }
  @keyframes pulse{
    0%{box-shadow:0 0 0 0 rgba(16,185,129,.7)}
    70%{box-shadow:0 0 0 12px rgba(16,185,129,0)}
    100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}
  }
  .lbl{font-size:9px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:2px;margin-top:14px;margin-bottom:4px}
  .val{font-family:'JetBrains Mono',monospace;font-size:13px;color:#00f2ff;word-break:break-all;line-height:1.5}
  .val.gold{color:#f3e5ab}
  .val.small{font-size:10px}
  .qr{width:120px;height:120px;background:#fff;padding:6px;border-radius:6px;margin:22px auto 0;display:block}
  .btn-print{
    display:block;width:100%;margin-top:22px;background:transparent;
    border:1px solid #d4af37;color:#d4af37;padding:13px;
    text-transform:uppercase;font-size:11px;letter-spacing:3px;
    cursor:pointer;font-family:'Inter',sans-serif;transition:.3s;border-radius:4px;
  }
  .btn-print:hover{background:#d4af37;color:#000}
  .footer{
    border-top:1px solid rgba(255,255,255,.08);margin-top:22px;padding-top:14px;
    font-size:8px;color:rgba(255,255,255,.35);letter-spacing:1px;
    text-align:center;word-break:break-all;line-height:1.7;
  }
  .footer strong{color:#d4af37;font-weight:500}
  @media print{
    body{background:#fff;padding:0}
    .btn-print{display:none}
    .card{
      box-shadow:none;border-color:#c9a44c;background:#0a0a0a;
      page-break-inside:avoid;width:100%;border-radius:0;
    }
  }
</style>
</head>
<body>
<div class="card">
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

  <img class="qr" src="${qr}" alt="QR de verificación">

  <div class="lbl">Nivel de autenticidad</div>
  <div class="val gold">PRIMUS · SHA-256 · eIDAS</div>

  <button class="btn-print" onclick="window.print()">🖨 Guardar como PDF</button>

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
     CERTIFICADO PRISMA · Cosmic (para el botón TXT → PDF)
     ============================================================ */
  function renderCertificadoPrisma(registro) {
    const f = fmtFecha(registro.timestamp);
    const qr = qrUrl(registro.folio, 260);
    const verifyUrl = urlVerificacion(registro);

    const universos = [
      { letra: 'S', nombre: 'SINGRO',   color: '#a855f7' },
      { letra: 'K', nombre: 'KINÉTICA', color: '#ef4444' },
      { letra: 'R', nombre: 'REALIDAD', color: '#f59e0b' },
      { letra: 'O', nombre: 'ORDEN',    color: '#d4af37' },
      { letra: 'N', nombre: 'NATURALEZA', color: '#10B981' },
      { letra: 'O', nombre: 'ORIGEN',   color: '#3b82f6' }
    ];

    const prismPanels = universos.map(u => `
      <div class="panel" style="--c:${u.color}">
        <div class="panel-inner">
          <span class="letra">${u.letra}</span>
          <span class="nombre">${u.nombre}</span>
        </div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificado Prisma · ${escapeHtml(registro.folio)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Cinzel:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:#000;color:#fff;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{
    min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:24px;
    background:
      radial-gradient(circle at 50% 20%, rgba(212,175,55,.10) 0%, transparent 45%),
      radial-gradient(circle at 15% 80%, rgba(168,85,247,.08) 0%, transparent 50%),
      radial-gradient(circle at 85% 70%, rgba(59,130,246,.08) 0%, transparent 50%),
      #000;
    background-attachment:fixed;
  }
  .doc{
    width:820px;max-width:100%;
    background:linear-gradient(180deg,#0a0a0a 0%,#050505 100%);
    border:2px solid #d4af37;
    border-radius:6px;
    padding:0;
    position:relative;
    overflow:hidden;
    box-shadow:0 0 100px rgba(212,175,55,.15),inset 0 0 60px rgba(212,175,55,.03);
  }
  /* Marco ornamentado */
  .doc::before{
    content:'';position:absolute;inset:8px;
    border:1px solid rgba(212,175,55,.35);
    border-radius:3px;pointer-events:none;
  }
  .doc::after{
    content:'';position:absolute;inset:14px;
    border:1px dashed rgba(212,175,55,.18);
    border-radius:2px;pointer-events:none;
  }

  /* Estrellas de fondo */
  .stars{
    position:absolute;inset:0;pointer-events:none;
    background-image:
      radial-gradient(1px 1px at 12% 22%, #fff, transparent),
      radial-gradient(1px 1px at 78% 14%, #fff, transparent),
      radial-gradient(1px 1px at 34% 78%, #fff, transparent),
      radial-gradient(1px 1px at 88% 62%, #fff, transparent),
      radial-gradient(1px 1px at 22% 88%, #fff, transparent),
      radial-gradient(1px 1px at 66% 42%, #fff, transparent),
      radial-gradient(1px 1px at 45% 8%, #fff, transparent),
      radial-gradient(1px 1px at 92% 88%, #fff, transparent);
    opacity:.55;
  }

  /* Header */
  .header{
    padding:36px 40px 12px;text-align:center;position:relative;z-index:2;
  }
  .collection{
    font-size:9px;letter-spacing:6px;color:#d4af37;opacity:.75;
    text-transform:uppercase;margin-bottom:14px;
  }
  .title{
    font-family:'Cinzel',serif;font-weight:900;
    font-size:34px;letter-spacing:8px;
    background:linear-gradient(180deg,#fff8e0 0%,#f3e5ab 40%,#d4af37 70%,#8a6f2c 100%);
    -webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;color:transparent;
    margin-bottom:6px;
  }
  .subtitle{
    font-size:9px;letter-spacing:4px;color:rgba(255,255,255,.55);
    text-transform:uppercase;
  }

  /* Prisma */
  .prisma-wrap{
    padding:18px 40px 4px;
    display:flex;justify-content:center;
    position:relative;z-index:2;
  }
  .prisma{
    width:480px;max-width:100%;
    display:flex;
    height:280px;
    position:relative;
    filter:drop-shadow(0 0 40px rgba(212,175,55,.35)) drop-shadow(0 0 80px rgba(168,85,247,.15));
  }
  .prisma::before{
    /* Halo superior */
    content:'';position:absolute;top:-30px;left:50%;transform:translateX(-50%);
    width:80%;height:60px;
    background:radial-gradient(ellipse at center, rgba(255,255,255,.35) 0%, transparent 70%);
    pointer-events:none;
  }
  .panel{
    flex:1;
    background:linear-gradient(180deg,
      color-mix(in srgb, var(--c) 65%, white) 0%,
      var(--c) 45%,
      color-mix(in srgb, var(--c) 40%, black) 100%);
    position:relative;
    display:flex;align-items:center;justify-content:center;
    border-right:1px solid rgba(255,255,255,.15);
    box-shadow:inset 0 0 30px rgba(255,255,255,.08);
  }
  .panel:first-child{
    border-top-left-radius:6px;
    border-bottom-left-radius:6px;
    border-top:1px solid rgba(255,255,255,.25);
  }
  .panel:last-child{
    border-right:0;
    border-top-right-radius:6px;
    border-bottom-right-radius:6px;
    border-top:1px solid rgba(255,255,255,.25);
  }
  .panel::before{
    content:'';position:absolute;inset:0;
    background:
      radial-gradient(circle at 30% 20%, rgba(255,255,255,.35), transparent 40%),
      radial-gradient(circle at 70% 80%, rgba(255,255,255,.15), transparent 40%);
    pointer-events:none;
  }
  .panel-inner{
    display:flex;flex-direction:column;align-items:center;gap:8px;
    position:relative;z-index:2;color:#fff;
    text-shadow:0 2px 8px rgba(0,0,0,.7),0 0 20px rgba(0,0,0,.5);
  }
  .letra{
    font-family:'Cinzel',serif;font-size:38px;font-weight:900;
    line-height:1;letter-spacing:2px;
  }
  .nombre{
    font-family:'Cinzel',serif;font-size:8px;letter-spacing:2px;
    text-transform:uppercase;opacity:.95;
  }

  /* Base ornamentada */
  .base{
    margin:0 auto;
    width:70%;max-width:520px;
    padding:14px 20px;
    background:linear-gradient(180deg,#d4af37 0%,#8a6f2c 60%,#5a4518 100%);
    border-radius:6px;
    border:1px solid #f3e5ab;
    box-shadow:0 0 40px rgba(212,175,55,.5),inset 0 1px 0 rgba(255,255,255,.4);
    text-align:center;
    position:relative;z-index:2;
    margin-top:-8px;
  }
  .base-titulo{
    font-family:'Cinzel',serif;font-size:13px;font-weight:900;
    letter-spacing:4px;color:#1a1204;
    text-shadow:0 1px 0 rgba(255,255,255,.35);
  }
  .base-sub{
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;
    letter-spacing:3px;color:#2a1f08;margin-top:4px;
  }

  /* Datos del certificado */
  .datos{
    padding:32px 50px 12px;
    position:relative;z-index:2;
  }
  .datos-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px 32px;
    border-top:1px solid rgba(212,175,55,.25);
    border-bottom:1px solid rgba(212,175,55,.25);
    padding:22px 0;
  }
  .dato{display:flex;flex-direction:column;gap:4px}
  .dato .k{
    font-size:8px;letter-spacing:3px;text-transform:uppercase;
    color:rgba(212,175,55,.75);font-weight:500;
  }
  .dato .v{
    font-family:'JetBrains Mono',monospace;
    font-size:12px;color:#f3e5ab;
    word-break:break-all;line-height:1.45;
  }
  .dato.full{grid-column:1 / -1}
  .dato.full .v{font-size:11px}

  /* Sello + QR */
  .sello{
    display:flex;align-items:center;justify-content:space-between;
    gap:24px;padding:24px 50px 32px;position:relative;z-index:2;
  }
  .sello-texto{flex:1}
  .sello-texto .titulo-sello{
    font-family:'Cinzel',serif;font-size:14px;font-weight:700;
    letter-spacing:3px;color:#d4af37;margin-bottom:10px;
  }
  .sello-texto .linea{
    font-size:10px;color:rgba(255,255,255,.55);
    line-height:1.8;letter-spacing:1px;
  }
  .sello-texto .linea strong{color:#f3e5ab;font-weight:500}
  .sello-qr{
    width:120px;height:120px;flex-shrink:0;
    padding:8px;background:#fff;border-radius:4px;
    border:2px solid #d4af37;
    box-shadow:0 0 30px rgba(212,175,55,.35);
  }
  .sello-qr img{width:100%;height:100%;display:block}

  /* Footer */
  .doc-footer{
    text-align:center;padding:0 40px 30px;
    font-size:8px;letter-spacing:2px;
    color:rgba(255,255,255,.4);text-transform:uppercase;
    line-height:1.9;position:relative;z-index:2;
  }
  .doc-footer .sig{
    font-family:'Cinzel',serif;color:#d4af37;font-size:10px;letter-spacing:4px;
    display:block;margin-bottom:8px;
  }

  /* Botón imprimir */
  .btn-print{
    display:block;margin:24px auto 0;
    background:linear-gradient(180deg,#f3e5ab 0%,#d4af37 100%);
    color:#1a1204;border:0;
    padding:14px 44px;border-radius:3px;
    font-size:11px;font-weight:700;letter-spacing:3px;
    text-transform:uppercase;cursor:pointer;
    font-family:'Inter',sans-serif;
    box-shadow:0 8px 30px rgba(212,175,55,.35);
    transition:.3s;
  }
  .btn-print:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(212,175,55,.5)}

  /* Impresión */
  @media print{
    @page{size:A4 portrait;margin:0}
    body{background:#000;padding:0}
    .btn-print{display:none}
    .doc{
      width:100%;min-height:100vh;border-radius:0;
      page-break-inside:avoid;
    }
  }

  /* Mobile */
  @media (max-width:640px){
    .doc{width:100%}
    .prisma{height:220px}
    .letra{font-size:26px}
    .nombre{font-size:6px}
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
<div class="doc">
  <div class="stars"></div>

  <div class="header">
    <div class="collection">Prisma Genesis 2026 Collection</div>
    <div class="title">KRONOS</div>
    <div class="subtitle">Certificado de integridad soberana</div>
  </div>

  <div class="prisma-wrap">
    <div class="prisma">
      ${prismPanels}
    </div>
  </div>

  <div class="base">
    <div class="base-titulo">PRISMA INFALSIFICABLE</div>
    <div class="base-sub">6 UNIVERSOS · 6 PRINCIPIOS · KRONOS</div>
  </div>

  <div class="datos">
    <div class="datos-grid">
      <div class="dato">
        <span class="k">Folio del protocolo</span>
        <span class="v">${escapeHtml(registro.folio)}</span>
      </div>
      <div class="dato">
        <span class="k">Fecha de emisión</span>
        <span class="v">${escapeHtml(f.full)}</span>
      </div>
      <div class="dato full">
        <span class="k">Título de la obra</span>
        <span class="v">${escapeHtml(registro.titulo)}</span>
      </div>
      <div class="dato">
        <span class="k">Autor</span>
        <span class="v">${escapeHtml(registro.autor)}</span>
      </div>
      <div class="dato">
        <span class="k">Tipo · Licencia</span>
        <span class="v">${escapeHtml(registro.tipo)} · ${escapeHtml(registro.licencia)}</span>
      </div>
      <div class="dato full">
        <span class="k">Huella criptográfica SHA-256</span>
        <span class="v">${escapeHtml(registro.hash)}</span>
      </div>
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
    <div class="sello-qr">
      <img src="${qr}" alt="QR de verificación">
    </div>
  </div>

  <div class="doc-footer">
    <span class="sig">KRONOS PROTOCOL · ○_● · MMXXVI</span>
    La integridad es el único legado que la eternidad no puede corromper.<br>
    © 2026 Marco Antonio Rojas Valdovinos · Todos los derechos reservados
  </div>

  <button class="btn-print" onclick="window.print()">🖨 Guardar como PDF</button>
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
    renderCertificadoOficial,
    renderCertificadoPrisma,
    abrirEnVentana,
    descargarHTML,

    // Métodos de alto nivel
    abrirOficial(registro) {
      const html = renderCertificadoOficial(registro);
      return abrirEnVentana(html, 'Certificado ' + registro.folio);
    },
    abrirPrisma(registro) {
      const html = renderCertificadoPrisma(registro);
      return abrirEnVentana(html, 'Certificado Prisma ' + registro.folio);
    },
    descargarOficialHTML(registro) {
      descargarHTML(renderCertificadoOficial(registro), 'KRONOS-CERT-' + registro.folio + '.html');
    },
    descargarPrismaHTML(registro) {
      descargarHTML(renderCertificadoPrisma(registro), 'KRONOS-PRISMA-' + registro.folio + '.html');
    }
  };

  console.log('[Kronos] certificate-renderer.js cargado');
})(window);