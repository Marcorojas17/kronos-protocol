// ────────────────────────────────────────────────────────────
// QUÓRUM Y MAYORÍAS · Legado Humano–IA · v1.0
// Define umbrales de decisión según tipo de propuesta
// ────────────────────────────────────────────────────────────

export class QuorumMayorias {
  constructor() {
    this.version = '1.0';

    // Reglas declaradas por tipo de propuesta
    // quorum: % mínimo de participación sobre total de ciudadanos activos
    // mayoria: tipo de mayoría requerida para aprobar
    this.reglas = {
      'Cambio menor': {
        quorum: 20,        // 20% de ciudadanos deben votar
        mayoria: 'simple', // >50% de los votos emitidos
        descripcion: 'Cambios de documentación, typos, mejoras menores.'
      },
      'Cambio estructural': {
        quorum: 50,
        mayoria: 'absoluta', // >50% del total de ciudadanos
        descripcion: 'Cambios en arquitectura, módulos, gobernanza.'
      },
      'Cambio criptográfico': {
        quorum: 66,
        mayoria: 'calificada', // ≥66% del total de ciudadanos
        descripcion: 'Cambios en algoritmos, parámetros, derivación de claves.'
      },
      'Adopción': {
        quorum: 50,
        mayoria: 'absoluta',
        descripcion: 'Adopción de estándares, licencias, protocolos externos.'
      },
      'Recurso': {
        quorum: 33,
        mayoria: 'simple',
        descripcion: 'Asignación de recursos, tiempo o esfuerzo.'
      }
    };
  }

  // ── Obtener la regla aplicable a un tipo ───────────────────
  reglaDe(tipo) {
    return this.reglas[tipo] || this.reglas['Cambio estructural'];
  }

  // ── Calcular quórum alcanzado ──────────────────────────────
  calcularQuorum(votosEmitidos, ciudadanosActivos, tipo) {
    const regla = this.reglaDe(tipo);
    const participacion = ciudadanosActivos > 0
      ? (votosEmitidos / ciudadanosActivos) * 100
      : 0;
    const alcanzado = participacion >= regla.quorum;

    return {
      tipo,
      regla,
      votos_emitidos: votosEmitidos,
      ciudadanos_activos: ciudadanosActivos,
      participacion: Math.round(participacion * 10) / 10,
      quorum_requerido: regla.quorum,
      quorum_alcanzado: alcanzado,
      faltan: alcanzado ? 0 : Math.max(0, Math.ceil((regla.quorum * ciudadanosActivos / 100) - votosEmitidos))
    };
  }

  // ── Calcular mayoría según regla ───────────────────────────
  calcularMayoria(votosOpcionGanadora, votosEmitidos, ciudadanosActivos, tipo) {
    const regla = this.reglaDe(tipo);
    let mayoriaAlcanzada = false;
    let umbral = 0;

    if (regla.mayoria === 'simple') {
      umbral = Math.floor(votosEmitidos / 2) + 1;
      mayoriaAlcanzada = votosOpcionGanadora >= umbral;
    } else if (regla.mayoria === 'absoluta') {
      umbral = Math.floor(ciudadanosActivos / 2) + 1;
      mayoriaAlcanzada = votosOpcionGanadora >= umbral;
    } else if (regla.mayoria === 'calificada') {
      umbral = Math.ceil(ciudadanosActivos * 0.66);
      mayoriaAlcanzada = votosOpcionGanadora >= umbral;
    }

    return {
      tipo_mayoria: regla.mayoria,
      votos_ganadora: votosOpcionGanadora,
      votos_emitidos: votosEmitidos,
      ciudadanos_activos: ciudadanosActivos,
      umbral_requerido: umbral,
      mayoria_alcanzada: mayoriaAlcanzada,
      faltan: mayoriaAlcanzada ? 0 : Math.max(0, umbral - votosOpcionGanadora)
    };
  }

  // ── Veredicto final de una propuesta ───────────────────────
  veredicto(resultados, ciudadanosActivos, tipo, estadoPropuesta) {
    const q = this.calcularQuorum(resultados.total_votos, ciudadanosActivos, tipo);
    const ganadora = resultados.ganadora;
    const votosGanadora = ganadora ? resultados.conteo[ganadora] : 0;
    const m = this.calcularMayoria(votosGanadora, resultados.total_votos, ciudadanosActivos, tipo);

    let verdicto = 'pendiente';
    let razon = '';

    if (estadoPropuesta === 'cerrada') {
      if (!q.quorum_alcanzado) {
        verdicto = 'sin_quorum';
        razon = `No se alcanzó el quórum de ${q.quorum_requerido}%. Faltaron ${q.faltan} votos.`;
      } else if (!m.mayoria_alcanzada) {
        verdicto = 'rechazada';
        razon = `Se alcanzó quórum pero la opción ganadora no obtuvo mayoría ${m.tipo_mayoria}. Faltaron ${m.faltan} votos.`;
      } else {
        verdicto = 'aprobada';
        razon = `Quórum alcanzado (${q.participacion}%) y mayoría ${m.tipo_mayoria} lograda.`;
      }
    } else {
      if (q.quorum_alcanzado && m.mayoria_alcanzada) {
        verdicto = 'lista_para_cerrar';
        razon = 'Quórum y mayoría alcanzados. La propuesta puede cerrarse y ejecutarse.';
      } else {
        verdicto = 'en_curso';
        razon = `En curso. Quórum: ${q.participacion}% (${q.quorum_alcanzado ? 'alcanzado' : 'faltan ' + q.faltan}). Mayoría: ${m.mayoria_alcanzada ? 'alcanzada' : 'faltan ' + m.faltan}.`;
      }
    }

    return {
      verdicto,
      razon,
      quorum: q,
      mayoria: m
    };
  }

  // ── Listar todas las reglas ────────────────────────────────
  listarReglas() {
    return Object.entries(this.reglas).map(([tipo, r]) => ({
      tipo,
      ...r
    }));
  }

  // ── Hash de las reglas (para incluir en propuestas) ────────
  async hash() {
    const texto = JSON.stringify(this.reglas);
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
}