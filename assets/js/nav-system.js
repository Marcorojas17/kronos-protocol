/* ═══════════════════════════════════════════════════════════════
   ARKHÉ ZERO · NAV SYSTEM
   Back · Forward · Home · Índice · Theme
   Atajos: Alt+← · Alt+→ · Alt+H · Alt+I · Alt+T
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Índice maestro de páginas ────────────────────────────────
  const PAGES = [
    { num: '00', name: 'Identidad',      path: 'apps/index.html' },
    { num: '01', name: 'Legal',          path: 'apps/legal.html' },
    { num: '02', name: 'Configuración',  path: 'apps/config.html' },
    { num: '03', name: 'Web',            path: 'apps/web.html' },
    { num: '04', name: 'GitHub',         path: 'apps/github.html' },
    { num: '05', name: 'Repertorio',     path: 'docs/index.html' },
    { num: '06', name: 'Criptografía',   path: 'apps/crypto.html' },
    { num: '07', name: 'Provenance',     path: 'apps/provenance.html' },
    { num: '08', name: 'Registro',       path: 'apps/registro.html' },
    { num: '09', name: 'Agentes IA',     path: 'agentes/index.html' },
    { num: '10', name: 'Gobernanza',     path: 'gobernanza/index.html' },
    { num: '11', name: 'Identidad',      path: 'identidad/index.html' },
    { num: '12', name: 'API & SDK',      path: 'apps/api.html' },
    { num: '13', name: 'Contracts',      path: 'apps/contracts.html' },
    { num: '14', name: 'Infraestructura',path: 'apps/infra.html' },
    { num: '15', name: 'Scripts',        path: 'apps/scripts.html' },
    { num: '16', name: 'Tests',          path: 'apps/tests.html' },
    { num: '17', name: 'Movimiento',     path: 'movimiento/index.html' },
    { num: '18', name: 'Ciclo de Vida',  path: 'cierre/index.html' },
    { num: '19', name: 'Portfolio',      path: 'projects/index.html' },
    { num: '20', name: 'Archivo',        path: 'archive/index.html' },
    { num: '21', name: 'Atracción',      path: 'atraccion/index.html' },
    { num: '22', name: 'Narrativa',      path: 'narrativa/index.html' },
    { num: '23', name: 'Métricas',       path: 'metrics/index.html' },
    { num: '24', name: 'Growth',         path: 'growth/index.html' },
  ];

  // ── Detecta ruta base para navegación consistente ────────────
  function getBasePath() {
    const path = window.location.pathname;
    // Si estamos en apps/, docs/, movimiento/, etc., subimos uno
    const segments = path.split('/').filter(Boolean);
    const lastIsFile = segments[segments.length - 1]?.includes('.');
    const depth = lastIsFile ? segments.length - 1 : segments.length;
    return depth > 0 ? '../'.repeat(depth) : './';
  }

  const BASE = getBasePath();

  // ── Detección de página actual ───────────────────────────────
  function getCurrentPageNum() {
    const body = document.body;
    const pageAttr = body.dataset.page;
    if (pageAttr && /^\d+$/.test(pageAttr)) return pageAttr.padStart(2, '0');

    const path = window.location.pathname;
    for (const p of PAGES) {
      if (path.includes(p.path.replace('.html', ''))) return p.num;
    }
    return null;
  }

  // ── Acción: atrás ────────────────────────────────────────────
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = BASE + 'index.html';
    }
  }

  // ── Acción: adelante ─────────────────────────────────────────
  function goForward() {
    window.history.forward();
  }

  // ── Acción: home ─────────────────────────────────────────────
  function goHome() {
    window.location.href = BASE + 'index.html';
  }

  // ── Acción: índice (overlay) ─────────────────────────────────
  function openIndex() {
    const overlay = document.querySelector('[data-nav="overlay"]');
    if (!overlay) return;
    overlay.classList.add('on');
    overlay.setAttribute('aria-hidden', 'false');
    buildOverlayGrid();
  }

  function closeIndex() {
    const overlay = document.querySelector('[data-nav="overlay"]');
    if (!overlay) return;
    overlay.classList.remove('on');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function buildOverlayGrid() {
    const grid = document.getElementById('overlay-grid');
    if (!grid || grid.dataset.built === '1') return;

    grid.innerHTML = PAGES.map(p => `
      <a href="${BASE}${p.path}" class="overlay-item">
        <span class="overlay-item-num">${p.num}</span>
        <span class="overlay-item-name">${p.name}</span>
        <span class="overlay-item-path">${p.path}</span>
      </a>
    `).join('');

    grid.dataset.built = '1';
  }

  // ── Acción: tema ─────────────────────────────────────────────
  const THEMES = [
    'kintsugi', 'lex-prima', 'pacto', 'lgu', 'guardianes',
    'indice-cero', 'memoria', 'coautoria', 'fiscalidad',
    'jurisdiccion', 'agentes', 'movimiento', 'atraccion'
  ];

  function cycleTheme() {
    const current = document.body.dataset.theme || 'kintsugi';
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    document.body.dataset.theme = next;
    try { localStorage.setItem('arkhe-theme', next); } catch (e) {}
    showToast(`Tema: ${next}`);
  }

  // ── Toast ────────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('on'), 2000);
  }

  // ── Bind de controles ────────────────────────────────────────
  function bindControls() {
    document.querySelectorAll('[data-nav-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        const action = btn.dataset.navAction;
        switch (action) {
          case 'back':           goBack(); break;
          case 'forward':        goForward(); break;
          case 'home':           goHome(); break;
          case 'index':          openIndex(); break;
          case 'close-overlay':  closeIndex(); break;
          case 'theme':          cycleTheme(); break;
        }
      });
    });

    // Cerrar overlay con click fuera
    const overlay = document.querySelector('[data-nav="overlay"]');
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeIndex();
      });
    }
  }

  // ── Atajos de teclado ────────────────────────────────────────
  function bindKeyboard() {
    document.addEventListener('keydown', e => {
      if (!e.altKey) return;
      switch (e.key.toLowerCase()) {
        case 'arrowleft':  e.preventDefault(); goBack(); break;
        case 'arrowright': e.preventDefault(); goForward(); break;
        case 'h':          e.preventDefault(); goHome(); break;
        case 'i':          e.preventDefault(); openIndex(); break;
        case 't':          e.preventDefault(); cycleTheme(); break;
        case 'escape':     e.preventDefault(); closeIndex(); break;
      }
    });
  }

  // ── Scroll indicator ─────────────────────────────────────────
  function bindScroll() {
    const navTop = document.querySelector('.nav-top');
    if (!navTop) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        navTop.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
    }, { passive: true });
  }

  // ── Restaurar tema guardado ──────────────────────────────────
  function restoreTheme() {
    try {
      const saved = localStorage.getItem('arkhe-theme');
      if (saved && THEMES.includes(saved)) {
        document.body.dataset.theme = saved;
      }
    } catch (e) {}
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    restoreTheme();
    bindControls();
    bindKeyboard();
    bindScroll();

    // Marcar botón activo
    const current = getCurrentPageNum();
    if (current) {
      const indexBtn = document.querySelector('[data-nav-action="index"]');
      if (indexBtn) indexBtn.classList.add('active');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer API para otras páginas
  window.ARKHE_NAV = {
    goBack, goForward, goHome,
    openIndex, closeIndex,
    cycleTheme, showToast,
    PAGES, BASE
  };
})();