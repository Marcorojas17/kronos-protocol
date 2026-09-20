// ────────────────────────────────────────────────────────────
// RITUALES · Legado Humano–IA · v1.0
// Rituales periódicos firmados con Ed25519
// ────────────────────────────────────────────────────────────

const RITUALES = [
  {
    id: 'diario',
    nombre: 'Revisión diaria',
    descripcion: 'Revisa el dashboard, confirma integridad de cadena y verifica que ningún evento esté pendiente. 5 minutos.',
    frecuencia_ms: 24 * 60 * 60 * 1000
  },
  {
    id: 'semanal',
    nombre: 'Backup semanal',
    descripcion: 'Exporta toda la base cifrada, guarda copia externa y verifica que la clave pública siga intacta. 15 minutos.',
    frecuencia_ms: 7 * 24 * 60 * 60 * 1000
  },
  {
    id: 'mensual',
    nombre: 'Anclaje mensual',
    descripcion: 'Calcula la raíz Merkle de la cadena completa, ancla a Ethereum y guarda el txHash con la firma del mes. 30 minutos.',
    frecuencia_ms: 30 * 24 * 60 * 60 * 1000
  }
];

export class Rituales {
  constructor(core, storage, bus) {
    this.core = core;
    this.storage = storage;
    this.bus = bus;
    this.RITUALES = RITUALES;
  }

  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Estado actual de los rituales ─────────────────────────
  async estado(humano) {
    const historial = await this.historial();
    const rituales = RITUALES.map(r => {
      const ejecs = historial.filter(h => h.ritual_id === r.id);
      const ultima = ejecs[0]; // historial ordenado desc
      const proxima = ultima
        ? new Date(new Date(ultima.timestamp).getTime() + r.frecuencia_ms).toISOString()
        : null;
      const vencido = !ultima || new Date(proxima).getTime() < Date.now();
      return {
        ...r,
        ejecuciones: ejecs.length,
        ultima_fecha: ultima ? ultima.timestamp : null,
        proxima_fecha: proxima,
        vencido
      };
    });
    return { rituales, historial };
  }

  // ── Ejecutar y firmar un ritual ───────────────────────────
  async ejecutar(ritualId, notas, estado, humano) {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    if (!humano) throw new Error('Identidad humana requerida.');

    const ritual = RITUALES.find(r => r.id === ritualId);
    if (!ritual) throw new Error('Ritual no encontrado: ' + ritualId);

    const timestamp = new Date().toISOString();

    const payload = [
      'LEGADO-HUMANO-IA · RITUAL v1.0',
      `Ritual: ${ritual.nombre} (${ritual.id})`,
      `Timestamp: ${timestamp}`,
      `Estado: ${estado}`,
      `Notas: ${notas}`,
      `Humano: ${humano.nombre} (${humano.alias})`,
      `Huella: ${humano.huella}`
    ].join('\n');

    const hash = await Rituales._sha256Hex(payload);

    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(hash)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    const registro = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'ritual-1.0',
      tipo: 'ejecucion-ritual',
      ritual_id: ritual.id,
      ritual_nombre: ritual.nombre,
      timestamp,
      estado,
      notas,
      payload_hash: hash,
      firma_ed25519: firma,
      firmante_nombre: humano.nombre,
      firmante_huella: humano.huella,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519'
    };

    await this.storage.guardar('ritual-ejecucion', registro);

    // Emitir evento al bus si está disponible
    try {
      await this.bus.emit('legado:ritual', 'ritual.ejecutado', {
        ritual_id: ritual.id,
        ritual_nombre: ritual.nombre,
        estado,
        timestamp
      });
    } catch (e) { /* bus opcional */ }

    return registro;
  }

  // ── Historial completo (más reciente primero) ─────────────
  async historial() {
    if (!this.storage.inicializado) throw new Error('Storage Dexie no inicializado.');
    const items = await this.storage.listarPorTipo('ritual-ejecucion');
    return items
      .map(i => i.payload)
      .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
  }

  // ── Verificar firma de una ejecución ──────────────────────
  async verificar(registro) {
    const payload = [
      'LEGADO-HUMANO-IA · RITUAL v1.0',
      `Ritual: ${registro.ritual_nombre} (${registro.ritual_id})`,
      `Timestamp: ${registro.timestamp}`,
      `Estado: ${registro.estado}`,
      `Notas: ${registro.notas}`,
      `Humano: ${registro.firmante_nombre}`,
      `Huella: ${registro.firmante_huella}`
    ].join('\n');

    const hashCalc = await Rituales._sha256Hex(payload);
    if (hashCalc !== registro.payload_hash) return false;

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
      new TextEncoder().encode(registro.payload_hash)
    );
  }

  // ── Exportar historial ────────────────────────────────────
  async exportar() {
    const historial = await this.historial();
    const payload = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'rituales-export-1.0',
      exportado: new Date().toISOString(),
      total: historial.length,
      historial
    };
    return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  }
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}