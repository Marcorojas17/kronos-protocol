// ────────────────────────────────────────────────────────────
// GUARDRAILS · Legado Humano–IA · v1.0
// Patrón PREVIEW → COMMIT para acciones críticas de la IA
// ────────────────────────────────────────────────────────────

export class Guardrails {
  constructor(politica, log) {
    this.politica = politica;
    this.log = log;
    this.previewActual = null;

    this.accionesPermitidas = [
      'calcular_hash',
      'verificar_certificado',
      'leer_documento',
      'proponer_anclaje',
      'registrar_log',
      'exportar_certificado'
    ];

    this.accionesCriticas = [
      'anclar_ethereum',
      'firmar_transaccion',
      'modificar_politica',
      'crear_identidad',
      'exportar_legado'
    ];
  }

  async preview(accion, datos) {
    if (!this.accionesPermitidas.includes(accion)) {
      return {
        ok: false,
        razon: `Acción no permitida por la política: ${accion}`,
        tipo: 'bloqueada'
      };
    }

    const esCritica = this.accionesCriticas.includes(accion);
    const timestamp = new Date().toISOString();

    this.previewActual = {
      accion,
      datos,
      esCritica,
      timestamp,
      requiereAprobacion: esCritica,
      idPreview: await this._hashPreview(accion, datos, timestamp)
    };

    return {
      ok: true,
      preview: this.previewActual,
      mensaje: esCritica
        ? '⚠️ Acción crítica: requiere aprobación humana explícita'
        : '✓ Acción permitida: lista para ejecutar'
    };
  }

  async commit(aprobadoPor = null) {
    if (!this.previewActual) {
      return { ok: false, razon: 'No hay preview pendiente' };
    }

    const preview = this.previewActual;

    if (preview.requiereAprobacion && !aprobadoPor) {
      return {
        ok: false,
        razon: 'Acción crítica requiere aprobación del fundador',
        preview
      };
    }

    await this.log.registrar('accion_ejecutada', {
      accion: preview.accion,
      datos: preview.datos,
      esCritica: preview.esCritica,
      aprobadoPor: aprobadoPor || 'automatico',
      idPreview: preview.idPreview
    });

    const resultado = {
      ok: true,
      accion: preview.accion,
      ejecutada: true,
      aprobadaPor: aprobadoPor,
      timestamp: new Date().toISOString()
    };

    this.previewActual = null;
    return resultado;
  }

  async rechazar(razon = 'Sin razón especificada') {
    if (!this.previewActual) return { ok: false };
    await this.log.registrar('accion_rechazada', {
      accion: this.previewActual.accion,
      razon
    });
    this.previewActual = null;
    return { ok: true, rechazada: true };
  }

  async _hashPreview(accion, datos, timestamp) {
    const texto = `${accion}|${JSON.stringify(datos)}|${timestamp}`;
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
