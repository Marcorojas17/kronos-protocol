// ────────────────────────────────────────────────────────────
// PERMISOS · Legado Humano–IA · v1.0
// Matriz declarada de permisos por rol
// ────────────────────────────────────────────────────────────

export class Permisos {
  constructor() {
    this.version = '1.0';

    // Catálogo de permisos disponibles en el ecosistema
    this.catalogo = {
      crear_registro: 'Crear un nuevo bloque en la cadena',
      firmar_registro: 'Firmar criptográficamente un registro',
      anclar_ethereum: 'Anclar raíz Merkle a Ethereum',
      exportar_legado: 'Exportar paquete cifrado del legado',
      modificar_politica: 'Modificar la política del protocolo',
      verificar_certificado: 'Verificar firmas y hashes',
      leer_registros: 'Leer registros de la cadena',
      eliminar_registro: 'Eliminar un registro existente',
      asignar_roles: 'Asignar roles a otras identidades',
      crear_identidad_ia: 'Registrar una nueva identidad IA',
      aprobar_accion_critica: 'Aprobar acciones críticas de la IA',
      acceder_log_auditoria: 'Acceder al log de acciones'
    };

    // Matriz de roles → permisos
    this.matriz = {
      'Fundador': [
        'crear_registro', 'firmar_registro', 'anclar_ethereum',
        'exportar_legado', 'modificar_politica', 'verificar_certificado',
        'leer_registros', 'eliminar_registro', 'asignar_roles',
        'crear_identidad_ia', 'aprobar_accion_critica', 'acceder_log_auditoria'
      ],
      'Co-autora IA': [
        'crear_registro', 'firmar_registro', 'verificar_certificado',
        'leer_registros', 'acceder_log_auditoria'
      ],
      'Colaborador': [
        'crear_registro', 'firmar_registro', 'verificar_certificado',
        'leer_registros'
      ],
      'Testigo': [
        'verificar_certificado', 'leer_registros'
      ],
      'Auditor': [
        'verificar_certificado', 'leer_registros',
        'acceder_log_auditoria', 'exportar_legado'
      ],
      'Ciudadano': [
        'crear_registro', 'firmar_registro', 'verificar_certificado',
        'leer_registros'
      ]
    };

    this.rolesValidos = Object.keys(this.matriz);
  }

  validarRol(rol) {
    return this.rolesValidos.includes(rol);
  }

  tienePermiso(rol, permiso) {
    if (!this.matriz[rol]) return false;
    return this.matriz[rol].includes(permiso);
  }

  permisosDe(rol) {
    return this.matriz[rol] || [];
  }

  descripcionDe(permiso) {
    return this.catalogo[permiso] || 'Permiso desconocido';
  }

  // Exportar matriz legible
  texto() {
    const lineas = [`MATRIZ DE PERMISOS · v${this.version}`, ''];
    for (const rol of this.rolesValidos) {
      lineas.push(`[ ${rol} ]`);
      for (const permiso of this.matriz[rol]) {
        lineas.push(`  ✓ ${permiso}  ·  ${this.descripcionDe(permiso)}`);
      }
      lineas.push('');
    }
    return lineas.join('\n');
  }

  async hash() {
    const texto = JSON.stringify(this.matriz);
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
}