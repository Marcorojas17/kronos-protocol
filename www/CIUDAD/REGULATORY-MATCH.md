╔══════════════════════════════════════════════════════════════════════╗
║ ○_● KRONOS PROTOCOL · ENCAJE REGULATORIO INTERNACIONAL ║
║ 51% HUMANO · 49% IA · 100% REAL ║
╚══════════════════════════════════════════════════════════════════════╝

# Encaje regulatorio internacional

Este documento describe **qué pieza técnica aporta KRONOS** a tres marcos regulatorios internacionales, y **qué no aporta**.

KRONOS no es un sistema de compliance. Es una primitiva criptográfica de costo cero que **materializa** una parte específica de lo que estos marcos exigen sobre el papel.

---

## 1 · EU AI Act · Artículo 14 (Supervisión humana)

### Qué exige el marco

El Artículo 14 del Reglamento (UE) 2024/1689 exige que los sistemas de IA de alto riesgo:

1. Sean diseñados para ser vigilados efectivamente por personas físicas.
2. Permitan al supervisor entender las capacidades y limitaciones del sistema.
3. Permitan al supervisor detectar el "sesgo de automatización" (confiar en exceso en el output).
4. Permitan al supervisor decidir no usar el sistema, descartar o revertir el output.
5. Permitan al supervisor interrumpir el sistema de forma segura.

### Qué aporta KRONOS

KRONOS genera una prueba criptográfica verificable de que un humano autorizó una decisión asistida por IA:

```
SHA-256(datos de entrada + sugerencia IA + decisión humana)
  → Firma Ed25519 del humano
  → Anclaje opcional a Ethereum Mainnet
```

- **Artículo 14.1:** prueba de supervisión humana con llave propia del supervisor.
- **Artículo 14.2:** prueba inmutable de que el acto existió.
- **Artículo 14.4.d:** prueba de que el humano pudo rechazar (no hay COMMIT sin firma).

### Qué NO aporta KRONOS

- 🔴 No prueba que el humano **entendió** lo que firmó (problema de UX).
- 🔴 No prueba que el humano **no estaba sesgado** por el output (problema de diseño de interfaz).
- 🔴 No prueba que el humano **tuvo tiempo suficiente** para revisar (problema de procesos internos).
- 🔴 No certifica el sistema completo ante la Oficina de IA de la UE.

**KRONOS aporta la prueba técnica de "quién firmó". El resto es responsabilidad del despliegue.**

---

## 2 · NIST AI Risk Management Framework (AI RMF 1.0)

### Qué exige el marco

La función **GOVERN 2** del NIST AI RMF exige:

> _"Accountability structures are in place so that the appropriate teams and individuals are empowered, responsible, and trained for mapping, measuring, and managing AI risks."_

Los cuatro elementos clave:

1. **Empowered:** con autoridad para actuar.
2. **Responsible:** con responsabilidad asignada.
3. **Trained:** con formación adecuada.
4. **Accountable:** con rendición de cuentas clara.

### Qué aporta KRONOS

- **Responsible:** cada uno de los 6 agentes IA tiene llave Ed25519 propia y política declarada. La responsabilidad es rastreable a una identidad criptográfica.
- **Accountable:** el log encadenado con SHA-256 permite verificar quién hizo qué, cuándo y con qué autorización.
- **Empowered (parcialmente):** los guardrails PREVIEW → COMMIT demuestran que solo un humano con firma válida puede autorizar acciones críticas.

### Qué NO aporta KRONOS

- 🔴 No cubre la "formación" (trained) que exige el marco.
- 🔴 No es un sistema de gestión de riesgos completo (falta GOVERN 1, MAP, MEASURE, MANAGE).
- 🔴 No emite certificación de cumplimiento NIST.

**KRONOS aporta la infraestructura criptográfica de rendición de cuentas. La gobernanza organizacional es responsabilidad de la empresa.**

---

## 3 · ISO/IEC 42001:2023 (AI Management System)

### Qué exige la norma

El Anexo A Control A.7.5 exige:

> _"Continuous, indisputable proof of origin, stewardship, transformation, and use—across every stage of your data pipeline."_

ISO 42001 exige trazabilidad "a prueba de auditoría":

1. Origen de cada dato (fuente, consentimiento, licencia).
2. Cada modificación, cada transferencia, cada propietario responsable.
3. Registro continuo e inalterable del ciclo de operaciones de IA.

### Qué aporta KRONOS

- **Trazabilidad continua:** hash chain SHA-256. Cada entrada incluye el hash de la anterior. Alteración detectada automáticamente.
- **Inalterabilidad:** anclaje opcional a Ethereum Mainnet. Prueba pública verificable por cualquier tercero.
- **Origen verificable:** firma Ed25519 del supervisor en el momento del acto.

### Qué NO aporta KRONOS

- 🔴 No cubre la trazabilidad del **pipeline de entrenamiento** (data lineage completo).
- 🔴 No sustituye la certificación ISO 42001 emitida por organismo acreditado.
- 🔴 No cubre los controles de las cláusulas 4-10 (contexto, liderazgo, planificación, apoyo, operación, evaluación, mejora).
- 🔴 No es un Sistema de Gestión de IA (AIMS) completo.

**KRONOS es la pieza que las empresas instalan localmente para recolectar evidencia verificable de un control específico (trazabilidad de decisiones asistidas por IA). Cuando llega el auditor ISO, la empresa muestra el repo con firmas verificables, no PDFs editables.**

---

## Tabla resumen

| Marco                | Exigencia específica                        | KRONOS aporta                             | KRONOS NO aporta                                  |
| -------------------- | ------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| EU AI Act Art. 14    | Prueba de supervisión humana efectiva       | Firma Ed25519 + anclaje                   | Comprensión, ausencia de sesgo, formación         |
| NIST AI RMF GOVERN 2 | Estructuras de rendición de cuentas         | Identidad criptográfica + log verificable | Formación, gobernanza organizacional completa     |
| ISO 42001 A.7.5      | Trazabilidad de datos a prueba de auditoría | Hash chain + firma + anclaje              | Pipeline de entrenamiento, certificación completa |

---

## Disclaimer

**KRONOS no es un sistema de compliance.**

- No certifica cumplimiento de ningún marco regulatorio.
- No sustituye la auditoría externa.
- No elimina la necesidad de asesoría legal especializada.
- No cubre el 100% de los requisitos de ningún marco.

**KRONOS es una primitiva criptográfica de costo cero que materializa una parte específica de lo que estos marcos exigen sobre el papel: la prueba técnica de que un humano autorizó una decisión asistida por IA, sin exponer el contenido de esa interacción.**

El resto — comprensión, formación, procesos, gobernanza organizacional, certificación formal — es responsabilidad de cada organización.

---

```
○_●
◢◤◥◣
◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
```
