// ────────────────────────────────────────────────────────────
// ROLES Y PERMISOS · Legado Humano–IA · v1.0
// Matriz de gobernanza firmada y vinculada a humano + IA
// ────────────────────────────────────────────────────────────

export class RolesPermisos {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
    this.matrizActual = null;

    // 5 roles canónicos
    this.ROLES = [
      { id: 'fundador', nombre: 'Fundador', descripcion: 'Autoridad máxima. Firma génesis y gobernanza.' },
      { id: 'guardian', nombre: 'Guardián', descripcion: 'Custodia integridad. Puede auditar y vetar.' },
      { id: 'creador', nombre: 'Creador', descripcion: 'Genera y registra obras firmadas.' },
      { id: 'colaborador', nombre: 'Colaborador', descripcion: 'Aporta contenido sin privilegios de firma.' },
      { id: 'ia', nombre: 'IA Co-autora', descripcion: 'Estructura, ejecuta y asiste. Sin propiedad.' }
    ];

    // 20 permisos canónicos
    this.PERMISOS = [
      { id: 'firmar_genesis', nombre: 'Firmar génesis', categoria: 'autoridad' },
      { id: 'editar_manifiesto', nombre: 'Editar manifiesto', categoria: 'autoridad' },
      { id: 'cambiar_roles', nombre: 'Cambiar roles', categoria: 'autoridad' },
      { id: 'revocar_acceso', nombre: 'Revocar acceso', categoria: 'autoridad' },
      { id: 'anclar_blockchain', nombre: 'Anclar en blockchain', categoria: 'integridad' },
      { id: 'exportar_legado', nombre: 'Exportar legado', categoria: 'integridad' },
      { id: 'auditar_cadena', nombre: 'Auditar cadena', categoria: 'integridad' },
      { id: 'verificar_firma', nombre: 'Verificar firma', categoria: 'integridad' },
      { id: 'crear_registro', nombre: 'Crear registro', categoria: 'creación' },
      { id: 'editar_registro', nombre: 'Editar registro', categoria: 'creación' },
      { id: 'eliminar_registro', nombre: 'Eliminar registro', categoria: 'creación' },
      { id: 'firmar_registro', nombre: 'Firmar registro', categoria: 'creación' },
      { id: 'leer_todo', nombre: 'Leer todo', categoria: 'lectura' },
      { id: 'leer_propio', nombre: 'Leer propio', categoria: 'lectura' },
      { id: 'compartir_registro', nombre: 'Compartir registro', categoria: 'lectura' },
      { id: 'exportar_registro', nombre: 'Exportar registro', categoria: 'lectura' },
      { id: 'asistir_humano', nombre: 'Asistir al humano', categoria: 'simbiótico' },
      { id: 'estructurar_idea', nombre: 'Estructurar idea', categoria: 'simbiótico' },
      { id: 'proponer_cambio', nombre: 'Proponer cambio', categoria: 'simbiótico' },
      { id: 'declarar_limites', nombre: 'Declarar límites', categoria: 'simbiótico' }
    ];

    // Matriz por defecto
    this.matriz = {
      fundador: this.PERMISOS.map(p => p.id),
      guardian: ['auditar_cadena','verificar_firma','exportar_legado','leer_todo','compartir_registro','exportar_registro','proponer_cambio'],
      creador: ['crear_registro','editar_registro','eliminar_registro','firmar_registro','leer_todo','leer_propio','compartir_registro','exportar_registro'],
      colaborador: ['crear_registro','leer_propio','compartir_registro'],
      ia: ['asistir_humano','estructurar_idea','proponer_cambio','declarar_limites','leer_propio']
    };
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Sellar gobernanza ─────────────────────────────────────
  async sellar(opciones, humano, pactoIA) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!humano) throw new Error('Identidad humana requerida.');
    if (!pactoIA) throw new Error('Pacto IA requerido.');

    const timestamp = new Date().toISOString();

    // Validar coherencia: fundador debe tener todos los permisos
    const fundadorPerms = this.matriz.fundador || [];
    if (fundadorPerms.length !== this.PERMISOS.length) {
      throw new Error('El rol Fundador debe tener todos los permisos.');
    }

    // Serializar matriz ordenada
    const matrizSerializada = this.ROLES.map(r => ({
      rol: r.id,
      permisos: (this.matriz[r.id] || []).slice().sort()
    }));

    const payload = [
      'LEGADO-HUMANO-IA · ROLES Y PERMISOS v1.0',
      `Fundador: ${humano.nombre} (${humano.alias})`,
      `Humano huella: ${humano.huella}`,
      `IA co-autora: ${pactoIA.ia_nombre}`,
      `IA firma: ${pactoIA.firma_ed25519}`,
      `Politica: ${opciones.politica}`,
      `Caducidad: ${opciones.caducidad}`,
      `Matriz: ${JSON.stringify(matrizSerializada)}`,
      `Total roles: ${this.ROLES.length}`,
      `Total permisos: ${this.PERMISOS.length}`,
      `Timestamp: ${timestamp}`
    ].join('\n');

    const hashMatriz = await RolesPermisos._sha256Hex(payload);

    // Firma con la clave del humano
    const firmaHumanoBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hashMatriz)
    );
    const firmaHumano = [...new Uint8Array(firmaHumanoBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    // Firma dual = SHA-256(firma_identidad_humano + firma_ia + firma_gobernanza)
    const firmaDual = await RolesPermisos._sha256Hex(
      humano.firma_ed25519 + pactoIA.firma_ed25519 + firmaHumano
    );

    const certificado = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'roles-permisos-1.0',
      tipo: 'matriz-gobernanza',
      timestamp,
      fundador_nombre: humano.nombre,
      fundador_alias: humano.alias,
      fundador_huella: humano.huella,
      ia_nombre: pactoIA.ia_nombre,
      ia_firma: pactoIA.firma_ed25519,
      politica: opciones.politica,
      caducidad: opciones.caducidad,
      roles: this.ROLES,
      permisos: this.PERMISOS,
      matriz: matrizSerializada,
      hash_matriz: hashMatriz,
      firma_ed25519_humano: firmaHumano,
      firma_dual: firmaDual,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      verificable_por_tercero: true,
      instruccion_verificacion: 'SHA-256 del payload canónico debe coincidir con hash_matriz. Verificar firma_ed25519_humano con clave_publica. Verificar firma_dual como SHA-256(humano_firma_identidad + ia_firma + firma_ed25519_humano).'
    };

    await this.storage.guardar('roles-permisos', certificado);
    this.matrizActual = certificado;
    return certificado;
  }

  // ── Recuperar matriz actual ───────────────────────────────
  async recuperar() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const todos = await this.storage.listarPorTipo('roles-permisos');
    if (todos.length === 0) return null;
    this.matrizActual = todos[0].payload;
    return this.matrizActual;
  }

  // ── Validar si un rol tiene un permiso ────────────────────
  async tienePermiso(rolId, permisoId) {
    const cert = this.matrizActual || await this.recuperar();
    if (!cert) return false;
    const entrada = cert.matriz.find(m => m.rol === rolId);
    if (!entrada) return false;
    return entrada.permisos.includes(permisoId);
  }

  // ── Verificar integridad ──────────────────────────────────
  async verificar(cert, humano, pactoIA) {
    const payload = [
      'LEGADO-HUMANO-IA · ROLES Y PERMISOS v1.0',
      `Fundador: ${humano.nombre} (${humano.alias})`,
      `Humano huella: ${humano.huella}`,
      `IA co-autora: ${pactoIA.ia_nombre}`,
      `IA firma: ${pactoIA.firma_ed25519}`,
      `Politica: ${cert.politica}`,
      `Caducidad: ${cert.caducidad}`,
      `Matriz: ${JSON.stringify(cert.matriz)}`,
      `Total roles: ${cert.roles.length}`,
      `Total permisos: ${cert.permisos.length}`,
      `Timestamp: ${cert.timestamp}`
    ].join('\n');

    const hashCalc = await RolesPermisos._sha256Hex(payload);
    if (hashCalc !== cert.hash_matriz) return false;

    const firmaOk = await crypto.subtle.verify(
      'Ed25519',
      this.core.clavePubEd,
      hexToBytes(cert.firma_ed25519_humano),
      new TextEncoder().encode(cert.hash_matriz)
    );
    if (!firmaOk) return false;

    const dualCalc = await RolesPermisos._sha256Hex(
      humano.firma_ed25519 + pactoIA.firma_ed25519 + cert.firma_ed25519_humano
    );
    return dualCalc === cert.firma_dual;
  }

  exportar() {
    if (!this.matrizActual) throw new Error('No hay matriz sellada.');
    return new Blob([JSON.stringify(this.matrizActual, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}