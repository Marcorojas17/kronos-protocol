/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ ORQUESTACIÓN · ROUTER MÓDULOS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Enruta operaciones entre módulos del sistema (crypto, cimiento,
 *  certificacion, gobernanza, evidence, …) sin acoplarlos.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/orquestacion/router-modulos]
 *  └─$ node -e "import('./router.js').then(m => \
 *       console.log(m.RUTAS_REGISTRADAS))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const RUTAS_REGISTRADAS = Object.freeze({
  'sign':         'crypto/operations/sign.js',
  'verify':       'crypto/operations/verify.js',
  'sha3_512':     'crypto/primitives/sha3-512.js',
  'anclar':       'cimiento/anclaje-ethereum/anchor.js',
  'persistir':    'cimiento/storage-dexie/storage.js',
  'certificar':   'certificacion/manifest-integridad/manifest.js',
  'notarizar':    'certificacion/notario-kronos/notario.js',
  'proponer':     'gobernanza/propuestas-votacion/proponer.js',
  'votar':        'gobernanza/propuestas-votacion/votar.js',
  'quorum':       'gobernanza/quorum-mayorias/quorum.js',
});

export class Router {
  constructor() {
    this.cache = new Map();
  }

  async ejecutar(accion, args) {
    const ruta = RUTAS_REGISTRADAS[accion];
    if (!ruta) throw new Error(`[ XX ] Acción no registrada: ${accion}`);

    let modulo = this.cache.get(ruta);
    if (!modulo) {
      modulo = await import(`../../${ruta}`);
      this.cache.set(ruta, modulo);
    }

    const fn = modulo[accion] || modulo.default?.[accion];
    if (typeof fn !== 'function') {
      throw new Error(`[ XX ] Función no exportada: ${accion}`);
    }

    return await fn(args);
  }
}

export const meta = {
  rol: 'router-modulos',
  rutas: RUTAS_REGISTRADAS,
  seal: SEAL,
};