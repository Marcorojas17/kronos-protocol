// ────────────────────────────────────────────────────────────
// ROUTER DE MÓDULOS · Legado Humano–IA · v1.0
// Registro dinámico + enrutamiento firmado vía Event Bus
// ────────────────────────────────────────────────────────────

const MODULOS_BASE = [
  {
    id_modulo: 'genesis',
    nombre: 'Génesis',
    version: '0.1',
    canal: 'legado:identidad',
    capacidades: ['firmar', 'sellar', 'exportar']
  },
  {
    id_modulo: 'filosofia',
    nombre: 'Filosofía',
    version: '0.2',
    canal: 'legado:identidad',
    capacidades: ['leer', 'firmar-tesis']
  },
  {
    id_modulo: 'autoria',
    nombre: 'Autoría',
    version: '0.3',
    canal: 'legado:identidad',
    capacidades: ['firmar', 'reconocer']
  },
  {
    id_modulo: 'manifiesto',
    nombre: 'Manifiesto',
    version: '0.4',
    canal: 'legado:identidad',
    capacidades: ['leer', 'exportar']
  },
  {
    id_modulo: 'cripto-core',
    nombre: 'Cripto Core',
    version: '1.1',
    canal: 'legado:identidad',
    capacidades: ['hash', 'firmar', 'cifrar', 'descifrar']
  },
  {
    id_modulo: 'storage-dexie',
    nombre: 'Storage Dexie',
    version: '1.2',
    canal: 'legado:identidad',
    capacidades: ['persistir', 'consultar', 'migrar']
  },
  {
    id_modulo: 'anclaje-ethereum',
    nombre: 'Anclaje Ethereum',
    version: '1.3',
    canal: 'legado:anclaje',
    capacidades: ['merkle', 'anclar', 'verificar']
  },
  {
    id_modulo: 'registro-humano',
    nombre: 'Registro Humano',
    version: '2.1',
    canal: 'legado:identidad',
    capacidades: ['sellar-identidad', 'huella']
  },
  {
    id_modulo: 'registro-ia',
    nombre: 'Registro IA',
    version: '2.2',
    canal: 'legado:identidad',
    capacidades: ['pacto-simbiotico', 'vincular']
  },
  {
    id_modulo: 'roles-permisos',
    nombre: 'Roles y Permisos',
    version: '2.3',
    canal: 'legado:gobernanza',
    capacidades: ['matriz', 'permisos', 'gobernanza']
  },
  {
    id_modulo: 'evidence-os',
    nombre: 'Evidence OS',
    version: '3.1',
    canal: 'legado:evidencia',
    capacidades: ['sellar', 'verificar', 'exportar']
  },
  {
    id_modulo: 'boveda-voz',
    nombre: 'Bóveda de Voz',
    version: '3.2',
    canal: 'legado:boveda',
    capacidades: ['grabar', 'cimatico', 'sellar']
  },
  {
    id_modulo: 'event-bus',
    nombre: 'Event Bus',
    version: '4.1',
    canal: 'legado:event-bus',
    capacidades: ['emitir', 'suscribir', 'log']
  },
  {
    id_modulo: 'router-modulos',
    nombre: 'Router de Módulos',
    version: '4.2',
    canal: 'legado:router',
    capacidades: ['registrar', 'enrutar', 'grafo']
  }
];

// Colores por módulo (para el grafo)
const COLORES = {
  'genesis': '#C9A227',
  'filosofia': '#7C3AED',
  'autoria': '#F59E0B',
  'manifiesto': '#E5C76B',
  'cripto-core': '#0EA5B7',
  'storage-dexie': '#F59E0B',
  'anclaje-ethereum': '#627EEA',
  'registro-humano': '#10B981',
  'registro-ia': '#7C3AED',
  'roles-permisos': '#D97706',
  'evidence-os': '#0D9488',
  'boveda-voz': '#EC4899',
  'event-bus': '#2563EB',
  'router-modulos': '#10B981'
};

export class RouterModulos {
  constructor(core, storage, bus) {
    this.core = core;
    this.storage = storage;
    this.bus = bus;
    this.modulos = [];
    this.inicializado = false;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Inicializar registro firmado ──────────────────────────
  async inicializar(humano) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!humano) throw new Error('Identidad humana requerida.');

    const timestamp = new Date().toISOString();

    // Añadir colores a cada módulo
    const modulos = MODULOS_BASE.map(m => ({
      ...m,
      color: COLORES[m.id_modulo] || '#10B981'
    }));

    // Payload canónico del registro completo
    const payload = [
      'LEGADO-HUMANO-IA · ROUTER DE MODULOS v1.0',
      `Timestamp: ${timestamp}`,
      `Humano: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`,
      `Total modulos: ${modulos.length}`,
      ...modulos.map(m => `· ${m.id_modulo} · ${m.version} · ${m.canal} · ${m.capacidades.join(',')}`)
    ].join('\n');

    const hashRegistro = await RouterModulos._sha256Hex(payload);

    // Firma Ed25519 del registro
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashRegistro)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const registro = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'router-1.0',
      tipo: 'registro-modulos',
      timestamp,
      firmante_nombre: humano.nombre,
      firmante_huella: humano.huella,
      total_modulos: modulos.length,
      modulos,
      hash_registro: hashRegistro,
      firma_ed25519: firma,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    await this.storage.guardar('router-registro', registro);

    this.modulos = modulos;
    this.inicializado = true;

    // Emitir evento de registro al bus
    try {
      await this.bus.emit('legado:router', 'router.inicializado', {
        total: modulos.length,
        hash: hashRegistro,
        timestamp
      });
    } catch (e) { /* silencio si bus no está listo */ }

    return modulos;
  }

  // ── Listar módulos del registro persistido ────────────────
  async listar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const registros = await this.storage.listarPorTipo('router-registro');
    if (registros.length === 0) return [];
    const ultimo = registros[0].payload;
    this.modulos = ultimo.modulos || [];
    return this.modulos;
  }

  // ── Enrutar llamada a un módulo destino ───────────────────
  async enrutar(idModuloDestino, tipo, payload) {
    if (!this.bus.inicializado) throw new Error('Event Bus no inicializado.');

    // Si no hay módulos en memoria, cargar
    if (this.modulos.length === 0) {
      await this.listar();
    }

    const destino = this.modulos.find(m => m.id_modulo === idModuloDestino);
    if (!destino) throw new Error('Módulo destino no encontrado: ' + idModuloDestino);

    // Validar que el tipo sea razonable
    if (!tipo || tipo.length < 3) throw new Error('Tipo de evento inválido.');

    // Enrutar vía bus al canal del módulo destino
    const evento = await this.bus.emit(destino.canal, tipo, {
      ...payload,
      _router: {
        destino: idModuloDestino,
        origen: 'router-modulos',
        timestamp: new Date().toISOString()
      }
    });

    return { evento, destino };
  }

  // ── Verificar integridad del registro ─────────────────────
  async verificar(registro, humano) {
    const payload = [
      'LEGADO-HUMANO-IA · ROUTER DE MODULOS v1.0',
      `Timestamp: ${registro.timestamp}`,
      `Humano: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`,
      `Total modulos: ${registro.total_modulos}`,
      ...registro.modulos.map(m => `· ${m.id_modulo} · ${m.version} · ${m.canal} · ${m.capacidades.join(',')}`)
    ].join('\n');

    const hashCalc = await RouterModulos._sha256Hex(payload);
    if (hashCalc !== registro.hash_registro) return false;

    const pubKey = await crypto.subtle.importKey(
      'raw',
      hexToBytes(registro.clave_publica),
      { name: 'Ed25519' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify(
      'Ed25519',
      pubKey,
      hexToBytes(registro.firma_ed25519),
      new TextEncoder().encode(registro.hash_registro)
    );
  }

  // ── Exportar registro como Blob ───────────────────────────
  async exportar() {
    const registros = await this.storage.listarPorTipo('router-registro');
    const ultimo = registros[0]?.payload || null;
    const payload = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'router-export-1.0',
      exportado: new Date().toISOString(),
      total: this.modulos.length,
      registro: ultimo
    };
    return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}