// ◯_● ARKHÉ ZERO · Barra de Navegación Universal
(function() {
  // Evitar inyectar dos veces
  if (document.getElementById('arkhe-nav')) return;

  const style = document.createElement('style');
  style.textContent = `
    #arkhe-nav {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: rgba(5, 5, 8, 0.95);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(212, 175, 55, 0.4);
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 8px 0;
      z-index: 9999;
      box-shadow: 0 -5px 20px rgba(0,0,0,0.8);
      font-family: 'Courier New', monospace;
    }
    #arkhe-nav a, #arkhe-nav button {
      background: transparent;
      border: none;
      color: #D4AF37;
      font-size: 10px;
      letter-spacing: 1px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 6px 12px;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'Courier New', monospace;
    }
    #arkhe-nav a:hover, #arkhe-nav button:hover {
      color: #FFF3A0;
      text-shadow: 0 0 10px #D4AF37;
    }
    #arkhe-nav a:active, #arkhe-nav button:active {
      transform: scale(0.95);
    }
    #arkhe-nav .icon {
      font-size: 18px;
      line-height: 1;
    }
    #arkhe-nav .label {
      font-size: 8px;
      color: #6a8f6a;
    }
    #arkhe-nav a:hover .label, #arkhe-nav button:hover .label {
      color: #D4AF37;
    }
    #arkhe-nav .home {
      color: #FFF3A0;
      font-weight: bold;
    }
    #arkhe-nav .home .icon {
      font-size: 20px;
      text-shadow: 0 0 10px #D4AF37;
    }
    body {
      padding-bottom: 80px !important;
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.id = 'arkhe-nav';
  
  // Botón Atrás
  const btnBack = document.createElement('button');
  btnBack.innerHTML = '<span class="icon">←</span><span class="label">Atrás</span>';
  btnBack.onclick = () => window.history.back();
  nav.appendChild(btnBack);

  // Botón Inicio
  const linkHome = document.createElement('a');
  linkHome.href = '/kronos-protocol/index.html';
  linkHome.className = 'home';
  linkHome.innerHTML = '<span class="icon">◯_●</span><span class="label">HUB</span>';
  nav.appendChild(linkHome);

  // Botón Adelante
  const btnForward = document.createElement('button');
  btnForward.innerHTML = '<span class="icon">→</span><span class="label">Adelante</span>';
  btnForward.onclick = () => window.history.forward();
  nav.appendChild(btnForward);

  // Botón Menú (Scroll al Top)
  const btnMenu = document.createElement('button');
  btnMenu.innerHTML = '<span class="icon">↑</span><span class="label">Arriba</span>';
  btnMenu.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  nav.appendChild(btnMenu);

  document.body.appendChild(nav);
})();
