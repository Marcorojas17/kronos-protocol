# EVIDENCE-SPEC-AI

**Proyecto:** KRONOS PROTOCOL  
**Autor:** Marco Antonio Rojas Valdovinos  
**Versión:** 0.1 · borrador  
**Estado:** NO IMPLEMENTADO · sólo especificación  
**Licencia:** CC BY-NC-ND 4.0  
**Fecha del sistema:** (automática del commit)  
**Fecha del mundo narrativo:** 2026-10-03

> **Nota de estado.** Este documento describe un formato. No describe software funcionando. Ninguna función aquí descrita ha sido probada contra un sistema real de IA a la fecha de este commit.

---

## 1. Propósito

Definir el formato de evidencia forense para inferencias de sistemas de IA, verificable sin servidor, sin autoridad central, y admisible como prueba técnica ante terceros.

## 2. Estructura del artefacto

Cada inferencia se registra como un objeto JSON. Los campos sin valor se escriben como `null`, nunca como el string `"Pendiente"` (rompe validaciones silenciosamente).

```json
{
  "kronos_version": "0.1",
  "artifact_type": "ai_inference_evidence",
  "artifact_id": null,

  "inference": {
    "timestamp_utc": null,
    "timestamp_rfc3161": null,

    "model": {
      "provider": null,
      "name": null,
      "version": null,
      "parameters_fingerprint": null,
      "context_window": null,
      "temperature": null,
      "top_p": null
    },

    "input": {
      "prompt_hash": null,
      "system_prompt_hash": null,
      "documents_attached": []
    },

    "output": {
      "response_hash": null,
      "tokens_in": null,
      "tokens_out": null,
      "latency_ms": null
    },

    "operator": {
      "kronos_id": null,
      "public_key_ed25519": null,
      "jurisdiction": null,
      "declared_role": null
    }
  },

  "optional_metadata": {
    "declaration_51_49": null,
    "notes": null
  },

  "signature": {
    "algorithm": "Ed25519",
    "public_key_hex": null,
    "signature_hex": null,
    "hash_signed": null
  },

  "verification": {
    "chain_previous_artifact": null,
    "chain_hash": null,
    "status": null
  }
}
```

**Campos marcados como `null`** son requeridos pero no calculados aún. Al emitir un artefacto real, todos deben tener valor o el artefacto se rechaza.

**`optional_metadata.declaration_51_49`** es opcional. Pertenece al discurso público de KRONOS, no al protocolo técnico. Un auditor externo puede ignorarlo sin invalidar la evidencia.

## 3. Canonicalización

Antes de firmar, el bloque `inference` se canonicaliza según **RFC 8785 (JCS)**:

1. Claves ordenadas alfabéticamente, recursivamente.
2. Sin espacios en blanco.
3. Unicode NFC.
4. Números sin notación exponencial.
5. Fechas en ISO 8601 UTC.

Sin canonicalización determinista, el hash no es reproducible y la firma no verifica.

## 4. Cadena de custodia

Cada artefacto referencia el hash del anterior:

```
E1.hash = sha256(canonical(E1.inference))
E2.hash = sha256(canonical(E2.inference) + E1.hash)
En.hash = sha256(canonical(En.inference) + E(n-1).hash)
```

Alterar cualquier artefacto previo invalida todos los posteriores. La alteración es detectable sin servidor.

**Anclaje periódico:** el hash acumulado se publica en OpenTimestamps (Bitcoin) en intervalos que se definirán empíricamente. El intervalo no está fijado en este documento — no existe justificación técnica para un número específico todavía.

## 5. Estados de verificación

| Estado | Condición |
|:--|:--|
| `VERIFIED` | Hash + firma + cadena + timestamp coinciden |
| `ALTERED` | Hash o firma no coinciden |
| `NOT_AUTHORIZED` | `operator.public_key_ed25519` no está en registro de operadores |
| `OUT_OF_PERIOD` | `timestamp_utc` fuera del periodo declarado del operador |

Nombres en inglés porque el campo es dato de máquina, no de humano.

## 6. Lo que la evidencia NO contiene

Por diseño de privacidad:

- El prompt en claro (sólo hash).
- La respuesta en claro (sólo hash).
- Datos personales del usuario final.
- Credenciales del operador.
- PII de terceros.

Si el operador quiere adjuntar contenido, lo cifra con su propia llave antes de incluirlo. KRONOS nunca descifra.

## 7. Mapa contra regulaciones

| Regulación | Requisito | Cómo lo aborda el formato |
|:--|:--|:--|
| EU AI Act Art. 13 | Documentación técnica del sistema | `inference.model` declarado |
| EU AI Act Art. 50 | Transparencia de contenido IA | `optional_metadata.declaration_51_49` |
| ISO/IEC 42001 §7.5 | Información documentada | Firma + cadena de custodia |
| NIST AI RMF · MAP 1.5 | Origen de datos documentado | `inference.input.prompt_hash` |
| NOM-151 §5.1 | Integridad de mensajes | SHA-256 + Ed25519 |
| NOM-151 §5.4 | Estampado de tiempo | `inference.timestamp_rfc3161` |

**Advertencia:** este mapeo es propuesta, no certificación. Un auditor externo debe validarlo antes de declararlo cumplimiento.

## 8. Caso 0 · RFC hasheado

Antes de auditar IA, el protocolo debe demostrar que resuelve un caso mínimo: probar que un identificador es válido sin exponerlo.

```
1. Usuario calcula sha256(rfc + salt_personal)
2. Publica el hash en un registro público (OpenTimestamps)
3. Tercero quiere verificar → pide al usuario que le mande el RFC por canal privado
4. Tercero calcula sha256(rfc_recibido + salt_privado) 
5. Compara con el hash público
6. Coincide → el RFC es válido y no fue alterado
```

El RFC nunca viaja por canal público. La prueba es matemática, no testimonial.

**Estado:** documentado, no implementado.

## 9. Casos de uso

- **Empresa que usa APIs de LLM** y necesita probar a un cliente o regulador que un output específico fue generado por un modelo específico en una fecha específica.
- **Investigador académico** que cita outputs de IA y necesita trazabilidad verificable.
- **Estudio legal** que documenta uso de asistencia de IA con porcentaje declarado.
- **Desarrollador de agentes** que audita la cadena de decisiones de su agente autónomo.

## 10. Estado actual

### [REAL HOY]

- Ninguno. Este documento es especificación.

### [PLAN · ordenado por dependencia]

1. `00-SCHEMA/ai-evidence.schema.json` — esquema JSON validable con `ajv`.
2. `08-HERRAMIENTAS/capturar-inferencia-ia.html` — capturador local.
3. `02-VERIFICADOR/verificador-ia.html` — verificador offline.
4. Caso 0 (RFC hasheado) implementado y probado.
5. Caso de uso real con un usuario externo.
6. Anclaje OpenTimestamps.
7. Auditoría legal externa.

### [BLOQUEADO]

Nada se implementa antes de tener un caso de uso confirmado con un usuario real. Ver Regla 38 del contexto operativo.

## 11. Referencias

- RFC 8785 — JSON Canonicalization Scheme.
- RFC 8032 — EdDSA (Ed25519).
- FIPS 180-4 — SHA-256.
- RFC 3161 — Time-Stamp Protocol.
- EU AI Act (Reglamento UE 2024/1689).
- ISO/IEC 42001:2023.
- NIST AI RMF 1.0.
- NOM-151-SCFI-2016.

---

**Fin del documento técnico.**