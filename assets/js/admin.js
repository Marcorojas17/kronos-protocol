/* ============================================================
   KRONOS PROTOCOL · admin.js
   Login + dashboard + CRUD de folios
   ============================================================ */
(function () {
  'use strict';

  const CRED = { user: 'marco', pass: 'kronos2026' }; // ⚠️ CAMBIA ANTES DE PUBLICAR
  const SESSION_KEY = 'kronos_session';

  const loginScreen = document.getElementById('login-screen');
  const dashboard   = document.getElementById('dashboard');
  const loginForm   = document.getElementById('login-form');
  const loginError  = document.getElementById('login-error');
  const logoutBtn   = document.getElementById('logout-btn');

  function isLogged() { return localStorage.getItem(SESSION_KEY) === '1'; }
  function setLogged(v) {
    if (v) localStorage.setItem(SESSION_KEY, '1');
    else localStorage.removeItem(SESSION_KEY);
  }

  function showDashboard() {
    loginScreen.hidden = true;
    dashboard.hidden = false;
    renderAll();
  }
  function showLogin() {
    loginScreen.hidden = false;
    dashboard.hidden = true;
    loginForm.reset();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('user').value.trim();
    const p = document.getElementById('pass').value;
    if (u === CRED.user && p === CRED.pass) {
      setLogged(true);
      loginError.hidden = true;
      showDashboard();
    } else {
      loginError.hidden = false;
    }
  });

  logoutBtn.addEventListener('click', () => {
    setLogged(false);
    showLogin();
  });

  // Navegación interna
  const navItems = document.querySelectorAll('.sidebar__nav a');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      const view = item.dataset.view;
      document.querySelectorAll('.view').forEach(v => v.hidden = true);
      document.getElementById('view-' + view).hidden = false;
      document.getElementById('view-title').textContent = item.textContent.replace(/^[^\s]+\s/, '');
      if (view === 'folios') renderFoliosTable();
      if (view === 'overview') renderKPIs();
    });
  });

  function renderKPIs() {
    const folios = KronosCrypto.getFolios();
    const verif = folios.reduce((a, f) => a + (f.verificaciones || 0), 0);
    const usadas = parseInt(localStorage.getItem('kronos_plazas_usadas') || '0', 10);
    document.getElementById('kpi-total').textContent = folios.length;
    document.getElementById('kpi-verif').textContent = verif;
    document.getElementById('kpi-plazas').textContent = Math.max(0, 100 - usadas);
  }

  function renderFoliosTable() {
    const tbody = document.getElementById('folios-tbody');
    const folios = KronosCrypto.getFolios();
    tbody.innerHTML = '';
    if (!folios.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px">Sin folios registrados</td></tr>';
      return;
    }
    folios.forEach(f => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${f.folio}</td>
        <td>${f.titulo}</td>
        <td>${f.tipo}</td>
        <td>${Kronos.formatDate(f.timestamp)}</td>
        <td><button class="btn btn--ghost btn--sm" data-del="${f.folio}">Eliminar</button></td>
      `;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('¿Eliminar este folio?')) return;
        const list = KronosCrypto.getFolios().filter(x => x.folio !== btn.dataset.del);
        localStorage.setItem('kronos_folios_v1', JSON.stringify(list));
        renderFoliosTable();
        renderKPIs();
      });
    });
  }

  // Nuevo folio
  const newForm = document.getElementById('admin-new-form');
  if (newForm) {
    newForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const titulo = document.getElementById('a-titulo').value.trim();
      const tipo = document.getElementById('a-tipo').value.trim();
      const desc = document.getElementById('a-desc').value.trim();
      if (!titulo || !tipo) return;
      await KronosCrypto.crearRegistro({
        titulo, tipo, descripcion: desc,
        autor: 'Marco Antonio Rojas Valdovinos',
        licencia: 'CC BY-NC-ND 4.0',
        contenido: ''
      });
      e.target.reset();
      renderKPIs();
      Kronos.toast('Folio añadido', 'ok');
    });
  }

  // Exportar
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => KronosCrypto.exportarJSON());
  }

  function renderAll() {
    renderKPIs();
    renderFoliosTable();
  }

  if (isLogged()) showDashboard();
  else showLogin();
})();