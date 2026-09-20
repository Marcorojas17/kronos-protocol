// ────────────────────────────────────────────────────────────
// DASHBOARD SALUD · Legado Humano–IA · v1.0
// Métricas del ecosistema + integridad de cadena
// ────────────────────────────────────────────────────────────

const MODULOS_DIMENSION = [
  { ids: ['cripto-core', 'storage-dexie', 'anclaje-ethereum'], nombre: 'Infraestructura', color: '#93C5FD' },
  { ids: ['registro-humano', 'registro-ia', 'roles-permisos', 'genesis', 'filosofia', 'autoria', 'manifiesto'], nombre: 'Identidad', color: '#6EE7B7' },
  { ids: ['evidence-os', 'boveda-voz'], nombre: 'Evidencia', color: '#F9A8D4' },
  { ids: ['event-bus', 'router-modulos'], nombre: 'Orquestación', color: '#A78BFA' },
  { ids: ['gobernanza-teorica'], nombre: 'Gobernanza', color: '#FCD34D' }
];

export class DashboardSalud {
  constructor(core, storage, bus, router) {
    this.core = core;
    this.storage = storage;
    this.bus = bus;
    this.router = router;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Generar reporte completo ──────────────────────────────
  async generar(humano) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');

    // 1. Cargar registro de módulos del router
    let modulosRouter = [];
    try {
      modulosRouter = await this.router.listar();
    } catch (e) { /* router vacío */ }

    // 2. Contar registros por tipo en Storage Dexie
    const tipos = [
      'identidad-humana', 'identidad-ia', 'roles-permisos',
      'evidence', 'event-bus', 'router-registro',
      'genesis', 'filosofia', 'autoria', 'manifiesto'
    ];
    const conteos = {};
    let total = 0;
    for (const t of tipos) {
      try {
        const items = await this.storage.listarPorTipo(t);
        conteos[t] = items.length;
        total += items.length;
      } catch (e) { conteos[t] = 0; }
    }

    // 3. Verificar integridad de la cadena del Cripto Core
    let integridad = { ok: true, total: 0, mensaje: 'Sin cadena' };
    try {
      const cadena = this.core.cadena || [];
      integridad.total = cadena.length;
      if (cadena.length > 0) {
        const ok = await this.core.verificarCadena();
        integridad.ok = ok;
        integridad.mensaje = ok ? 'Cadena íntegra' : 'Cadena alterada';
      } else {
        integridad.mensaje = 'Sin bloques en cadena todavía';
      }
    } catch (e) {
      integridad.ok = false;
      integridad.mensaje = 'Error al verificar: ' + e.message;
    }

    // 4. Métricas por módulo (aproximadas por canal)
    const modulos = (modulosRouter.length > 0 ? modulosRouter : []).map(m => {
      const mapa = {
        'evidence-os': 'evidence',
        'boveda-voz': 'evidence',
        'event-bus': 'event-bus',
        'router-modulos': 'router-registro',
        'registro-humano': 'identidad-humana',
        'registro-ia': 'identidad-ia',
        'roles-permisos': 'roles-permisos',
        'genesis': 'genesis',
        'filosofia': 'filosofia',
        'autoria': 'autoria',
        'manifiesto': 'manifiesto'
      };
      const tipo = mapa[m.id_modulo];
      const registros = tipo ? (conteos[tipo] || 0) : 0;
      return {
        ...m,
        registros,
        firmas: registros,
        activo: registros >= 0
      };
    });

    // 5. Dimensiones del radar
    const dimensiones = MODULOS_DIMENSION.map(d => {
      const modsDim = modulos.filter(m => d.ids.includes(m.id_modulo));
      const totalRegs = modsDim.reduce((s, m) => s + m.registros, 0);
      // Puntuación: 60 base + 40 proporcional al número de módulos activos
      const modsActivos = modsDim.filter(m => m.registros > 0).length;
      const valor = modsDim.length === 0
        ? 30
        : Math.min(100, Math.round(50 + (modsActivos / modsDim.length) * 50));
      return {
        nombre: d.nombre,
        valor,
        color: d.color,
        modulos: modsDim.length,
        registros: totalRegs
      };
    });

    // 6. Salud global
    const saludGlobal = Math.round(
      dimensiones.reduce((s, d) => s + d.valor, 0) / dimensiones.length
    );

    const reporte = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'dashboard-1.0',
      timestamp: new Date().toISOString(),
      firmante: humano.nombre + ' (' + humano.alias + ')',
      huella: humano.huella,
      metricas: {
        modulos_total: modulos.length,
        modulos_activos: modulos.filter(m => m.registros > 0).length,
        modulos_inactivos: modulos.filter(m => m.registros === 0).length,
        registros_total: total,
        eventos_total: conteos['event-bus'] || 0,
        evidencias_total: conteos['evidence'] || 0
      },
      integridad,
      dimensiones,
      modulos,
      conteos_por_tipo: conteos,
      salud_global: saludGlobal
    };

    return reporte;
  }
}