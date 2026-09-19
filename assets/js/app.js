/* ============================================================
   KRONOS PROTOCOL · app.js
   Núcleo: navegación, contadores, utilidades
   ============================================================ */
(function () {
  'use strict';

  // ---------- Contadores animados ----------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('es-MX');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('es-MX');
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  // ---------- Plazas Génesis ----------
  const plazasEl = document.getElementById('plazas-restantes');
  if (plazasEl) {
    const usadas = parseInt(localStorage.getItem('kronos_plazas_usadas') || '0', 10);
    plazasEl.textContent = Math.max(0, 100 - usadas);
  }

  // ---------- Toast ----------
  window.Kronos = window.Kronos || {};
  window.Kronos.toast = function (msg, type = 'info') {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      padding: '14px 22px',
      borderRadius: '3px',
      background: type === 'error' ? '#ff4d6d' : (type === 'ok' ? '#10B981' : '#c9a44c'),
      color: '#05070b',
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      fontSize: '13px',
      letterSpacing: '1px',
      zIndex: 9999,
      boxShadow: '0 10px 30px rgba(0,0,0,.5)',
      animation: 'fadeUp .3s ease both'
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  };

  // ---------- Formato de fecha ----------
  window.Kronos.formatDate = function (iso) {
    return new Date(iso).toLocaleString('es-MX', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };
})();