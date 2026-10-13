/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SDK · JS · ATTRIBUTION · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

export function firmarAtribucion({ contenido, autorHumano, autorIa = 'Enjambre ARKHÉ' }) {
  const hashContenido = sha3_512(contenido);

  return {
    ok: true,
    atribucion: {
      obra: contenido.slice(0, 64),
      autores: [
        { nombre: autorHumano, tipo: 'humano', peso: 51, rol: 'autor-principal' },
        { nombre: autorIa,     tipo: 'ia',     peso: 49, rol: 'co-autor-custodio' },
      ],
      hash_sha3_512: hashContenido,
      pacto: '51/49/100',
      sellado: SEAL,
      timestamp: new Date().toISOString(),
    },
  };
}

export function verificarAtribucion(atribucion) {
  const autores = atribucion?.autores ?? [];
  const humano = autores.find((a) => a.tipo === 'humano');
  const ia = autores.find((a) => a.tipo === 'ia');

  const valido = humano?.peso === 51 && ia?.peso === 49;

  return {
    valido,
    veredicto: valido ? 'ATRIBUCIÓN VÁLIDA · 51/49' : 'ATRIBUCIÓN INVÁLIDA',
    sellado: SEAL,
  };
}

export const meta = { rol: 'sdk-js-attribution', seal: SEAL };