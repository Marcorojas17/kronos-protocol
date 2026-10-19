(function () {
  const c = document.getElementById('arkhe-bg');
  if (!c) return;
  const x = c.getContext('2d');
  let W, H, DPR;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    c.width = W * DPR;
    c.height = H * DPR;
    c.style.width = W + 'px';
    c.style.height = H + 'px';
    x.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  const GOLD = [255, 215, 0],
    GREEN = [200, 255, 200];
  const N = Math.min(70, Math.floor((W * H) / 18000));
  const P = [];
  for (let i = 0; i < N; i++) {
    P.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
      c: Math.random() > 0.75 ? GREEN : GOLD,
      a: Math.random() * 0.5 + 0.3,
    });
  }
  let go = 0;
  const T = [];
  function trail(x, y) {
    T.push({ x, y, life: 1 });
    if (T.length > 25) T.shift();
  }
  window.addEventListener('mousemove', (e) => trail(e.clientX, e.clientY));
  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches[0]) trail(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true },
  );
  function frame() {
    x.clearRect(0, 0, W, H);
    const gs = 70;
    go = (go + 0.12) % gs;
    x.strokeStyle = 'rgba(255,215,0,0.025)';
    x.lineWidth = 1;
    for (let i = -gs + go; i < W; i += gs) {
      x.beginPath();
      x.moveTo(i, 0);
      x.lineTo(i, H);
      x.stroke();
    }
    for (let j = -gs + go; j < H; j += gs) {
      x.beginPath();
      x.moveTo(0, j);
      x.lineTo(W, j);
      x.stroke();
    }
    for (let i = 0; i < P.length; i++) {
      const p = P[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      for (let j = i + 1; j < P.length; j++) {
        const q = P[j];
        const dx = p.x - q.x,
          dy = p.y - q.y,
          d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const a = (1 - Math.sqrt(d2) / 130) * 0.12;
          x.strokeStyle = 'rgba(255,215,0,' + a + ')';
          x.lineWidth = 0.5;
          x.beginPath();
          x.moveTo(p.x, p.y);
          x.lineTo(q.x, q.y);
          x.stroke();
        }
      }
      const g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(
        0,
        'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + p.a + ')',
      );
      g.addColorStop(1, 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',0)');
      x.fillStyle = g;
      x.beginPath();
      x.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      x.fill();
      x.fillStyle = 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + p.a + ')';
      x.beginPath();
      x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      x.fill();
    }
    for (let i = 0; i < T.length; i++) {
      const t = T[i];
      t.life *= 0.93;
      if (t.life < 0.05) continue;
      const r = t.life * 10;
      const g = x.createRadialGradient(t.x, t.y, 0, t.x, t.y, r);
      g.addColorStop(0, 'rgba(255,215,0,' + t.life * 0.45 + ')');
      g.addColorStop(1, 'rgba(255,215,0,0)');
      x.fillStyle = g;
      x.beginPath();
      x.arc(t.x, t.y, r, 0, Math.PI * 2);
      x.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();
