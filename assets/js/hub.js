/* ═══════════════════════════════════════════════════════════════
   ARKHÉ ZERO · HUB LOGIC
   Interacciones específicas del index raíz
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Reveal on scroll ─────────────────────────────────────────
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.world, .capa-card, .portal-card')
        .forEach(el => el.classList.add('on'));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('on');
          io.unobserve(en.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.world, .capa-card, .portal-card')
      .forEach(el => io.observe(el));
  }

  // ── Stagger de cards ─────────────────────────────────────────
  function initStagger() {
    document.querySelectorAll('.capas-grid').forEach(grid => {
      grid.querySelectorAll('.capa-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 40}ms`;
      });
    });
  }

  // ── Intro ritual (primera visita) ────────────────────────────
  function initFirstVisit() {
    try {
      const visited = localStorage.getItem('arkhe-visited');
      if (!visited) {
        localStorage.setItem('arkhe-visited', '1');
        // Bienvenida silenciosa
        setTimeout(() => {
          if (window.ARKHE_NAV?.showToast) {
            window.ARKHE_NAV.showToast('Bienvenido al Índice Primigenio');
          }
        }, 1200);
      }
    } catch (e) {}
  }

  // ── Contador de visitas ──────────────────────────────────────
  function initVisitCounter() {
    try {
      const count = parseInt(localStorage.getItem('arkhe-visits') || '0', 10) + 1;
      localStorage.setItem('arkhe-visits', String(count));
    } catch (e) {}
  }

  // ── Animar el sello al hover ─────────────────────────────────
  function initSealHover() {
    const seal = document.querySelector('.hero-seal');
    if (!seal) return;

    seal.addEventListener('mouseenter', () => {
      seal.style.transform = 'scale(1.05)';
      seal.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    seal.addEventListener('mouseleave', () => {
      seal.style.transform = 'scale(1)';
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    initReveal();
    initStagger();
    initFirstVisit();
    initVisitCounter();
    initSealHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();