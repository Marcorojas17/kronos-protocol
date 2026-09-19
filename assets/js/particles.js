/* ============================================================
   KRONOS PROTOCOL · particles.js
   Canvas 2D de partículas 51% doradas (humano) · 49% cian (IA)
   Útil como fallback ligero del WebGL de Three.js.
   ============================================================ */
(function () {
  'use strict';
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;

  const CONFIG = {
    total: 100,
    goldRatio: 0.51,
    maxSpeed: 0.25,
    connectDist: 130,
    colors: {
      gold: 'rgba(201, 164, 76, ',
      neon: 'rgba(0, 234, 255, '
    }
  };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const goldCount = Math.round(CONFIG.total * CONFIG.goldRatio);
    for (let i = 0; i < CONFIG.total; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
        vy: (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
        r: Math.random() * 1.8 + 0.6,
        type: i < goldCount ? 'gold' : 'neon'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Conexiones
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.connectDist) {
          const alpha = (1 - dist / CONFIG.connectDist) * 0.18;
          ctx.strokeStyle = (a.type === 'gold' ? CONFIG.colors.gold : CONFIG.colors.neon) + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    // Puntos
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const base = p.type === 'gold' ? CONFIG.colors.gold : CONFIG.colors.neon;
      ctx.fillStyle = base + '0.85)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = base + '0.15)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createParticles();
    cancelAnimationFrame(raf);
    draw();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) init();
})();