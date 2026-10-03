# 📋 EVIDENCE-SPEC-AI · Especificación de Evidencia Forense de IA

**Proyecto:** KRONOS PROTOCOL  
**Autor:** Marco Antonio Rojas Valdovinos (#000)  
**Versión:** 1.0  
**Estado:** Borrador · Sin implementar  
**Licencia:** CC BY-NC-ND 4.0  
**Fecha:** 2026-10-03

---

## 1. Propósito

Definir el formato de evidencia forense para inferencias de sistemas de IA que sea:

- **Local-first** (no requiere servidor)
- **Verificable offline** (cualquiera puede auditar sin nosotros)
- **Trazable** (quién, cuándo, qué modelo, qué input, qué output)
- **Forensic-grade** (admisible como prueba técnica)

**Cumple con:**
- EU AI Act Art. 13 (transparencia y documentación)
- ISO/IEC 42001 (gestión de sistemas de IA)
- NIST AI RMF 1.0 (Govern, Map, Measure, Manage)
- NOM-151 (integridad de mensajes de datos, México)

---

## 2. Problema que resuelve

Los sistemas de IA actuales **no dejan evidencia verificable** de:

1. Qué modelo generó qué output
2. Con qué input exacto
3. En qué momento preciso
4. Bajo qué configuración
5. Firmado por quién

Los logs de OpenAI, Anthropic, Google o modelos locales **no son forenses**. Son comerciales. No hay sello de tiempo certificado. No hay firma criptográfica del operador. No hay cadena de custodia verificable por terceros.

**KRONOS resuelve esto.**

---

## 3. Estructura de una Evidencia Forense de IA

Cada inferencia se registra como un **artefacto firmado**. Estructura:

```json
{
  "kronos_version": "1.0",
  "artifact_type": "ai_inference_evidence",
  "artifact_id": "sha256_hash_del_artefacto_sin_este_campo",
  
  "inference": {
    "timestamp_utc": "2026-10-03T15:32:11.234Z",
    "timestamp_rfc3161": "base64_del_sello_TSA",
    
    "model": {
      "provider": "openai | anthropic | google | meta | local",
      "name": "gpt-4-turbo-2024-04-09",
      "version": "2024-04-09",
      "parameters_fingerprint": "sha256_de_params",
      "context_window": 128000,
      "temperature": 0.2,
      "top_p": 0.9
    },
    
    "input": {
      "prompt_hash": "sha256_del_prompt",
      "prompt_ciphertext": "opcional · sólo si el operador consiente",
      "system_prompt_hash": "sha256_del_system_prompt",
      "documents_attached": [
        { "name": "ejemplo.pdf", "hash": "sha256" }
      ]
    },
    
    "output": {
      "response_hash": "sha256_de_la_respuesta",
      "response_ciphertext": "opcional",
      "tokens_in": 1247,
      "tokens_out": 382,
      "latency_ms": 1843
    },
    
    "operator": {
      "kronos_id": "KRONOS-AGENT-XXXX",
      "public_key_ed25519": "hex_64_caracteres",
      "jurisdiction": "MX | US | EU | OTRO",
      "declared_role": "operador | auditor | investigador | usuario_final"
    },
    
    "declaration_51_49": {
      "human_direction_pct": 51,
      "ai_generation_pct": 49,
      "human_review_hash": "sha256_de_notas_revision",
      "method": "asistido | directo | revisado"
    }
  },
  
  "signature": {
    "algorithm": "Ed25519",
    "public_key_hex": "64_chars",
    "signature_hex": "128_chars",
    "hash_signed": "sha256_del_bloque_inference_canonicalizado"
  },
  
  "verification": {
    "chain_previous_artifact": "sha256_del_artefacto_anterior",
    "chain_hash": "sha256(prev + current)",
    "status": "VERIFIED | ALTERED | NO_AUTORIZADO | FUERA_PERIODO"
  }
}
```

---

## 4. Reglas de Canonicalización

**RFC 8785 JSON Canonicalization Scheme** obligatorio antes de firmar:

1. Ordenar claves alfabéticamente (recursivo)
2. Sin espacios en blanco
3. Unicode NFC
4. Números sin notación exponencial
5. Fechas en ISO 8601 UTC

**Por qué:** si el orden cambia, el hash cambia. Si el hash cambia, la firma no verifica. La canonicalización es lo que hace que la firma sea reproducible.

---

## 5. Cadena de Custodia

Cada evidencia referencia la anterior. Se forma una **cadena de hashes**:

```
E1.hash = sha256(canonical(E1))
E2.hash = sha256(canonical(E2) + E1.hash)
E3.hash = sha256(canonical(E3) + E2.hash)
...
En.hash = sha256(canonical(En) + E(n-1).hash)
```

**Consecuencia:** si alguien altera E1, todas las firmas posteriores dejan de verificar. La alteración es detectable sin servidor.

**Anclaje periódico:** cada 144 evidencias (número simbólico, arbitrario) se ancla el hash acumulado en Ethereum o Bitcoin vía OpenTimestamps. Costo: $0 (OpenTimestamps es gratis).

---

## 6. Los 4 Estados de Verificación

| Estado | Significado |
|:--|:--|
| ✓ VERIFICADO | Hash + firma + cadena + timestamp coinciden |
| ✗ ALTERADO | Algún hash o firma no coincide |
| ⚠ NO AUTORIZADO | El operador no está en el registro de operadores autorizados |
| ⚠ FUERA PERIODO | El timestamp está fuera del periodo declarado del operador |

---

## 7. Lo que la evidencia NO contiene

**Por diseño de privacidad:**

- No contiene el prompt en claro (sólo hash)
- No contiene la respuesta en claro (sólo hash)
- No contiene datos del usuario final
- No contiene PII de terceros
- No contiene credenciales del operador

**El operador puede, opcionalmente, adjuntar el contenido cifrado** para que sólo él pueda descifrarlo con su llave privada. KRONOS nunca lo ve.

---

## 8. Mapa contra regulaciones

| Regulación | Requisito | Cómo lo cumple KRONOS |
|:--|:--|:--|
| EU AI Act Art. 13 | Documentación técnica del sistema | `artifact_type` + `model` declarados |
| EU AI Act Art. 50 | Transparencia de contenido IA | `declaration_51_49` explícita |
| ISO 42001 · 7.5 | Información documentada | Cadena de custodia + firma |
| NIST AI RMF · MAP 1.5 | Origen de datos documentado | `input.prompt_hash` + documentos adjuntos |
| NOM-151 · 5.1 | Integridad de mensajes | SHA-256 + RFC 3161 |
| NOM-151 · 5.4 | Estampado de tiempo | `timestamp_rfc3161` |

---

## 9. Estado Actual

- [x] Especificación redactada (este documento)
- [ ] Schema JSON v1.0 (pendiente · `00-SCHEMA/ai-evidence.schema.json`)
- [ ] Implementación de captura (pendiente · `08-HERRAMIENTAS/capturar-inferencia-ia.html`)
- [ ] Implementación de verificación (pendiente · `02-VERIFICADOR/verificador-ia.html`)
- [ ] Anclaje OpenTimestamps (pendiente)
- [ ] Caso de uso real (pendiente)
- [ ] Auditoría externa (pendiente)

**Nada de esto existe todavía en código.** Este documento es la tesis. Lo que sigue es la implementación.

---

## 10. Aplicabilidad inmediata

**Caso 1 · Empresa que usa ChatGPT**  
Necesita probar a un cliente o regulador que un output específico fue generado por GPT-4 en fecha X. Hoy no puede. Con KRONOS sí.

**Caso 2 · Investigador académico**  
Necesita citar outputs de IA con trazabilidad verificable. Hoy no puede. Con KRONOS sí.

**Caso 3 · Estudio legal que usa IA para redactar**  
Necesita probar que un documento fue asistido por IA en porcentaje X, firmado por humano. Hoy no puede. Con KRONOS sí.

**Caso 4 · Desarrollador de agentes autónomos**  
Necesita auditar la cadena de decisiones de su agente. Hoy no puede. Con KRONOS sí.

---

**Firmado:**  
Marco Antonio Rojas Valdovinos  
Fundador #000 · KRONOS PROTOCOL  
`○_●` · "El legado no se hereda. Se firma."