╔══════════════════════════════════════════════════════════════════════╗
║ ○_● KRONOS PROTOCOL · TESIS VISUAL v1.0 ║
║ ◢◤◥◣ Infraestructura Criptográfica Local-First ║
║ ◥◣◢◤ 51% HUMANO · 49% IA · 100% REAL ║
╚══════════════════════════════════════════════════════════════════════╝

# TESIS VISUAL · KRONOS Protocol

> _"El legado no se hereda. Se firma."_

**Autor:** Marco Antonio Rojas Valdovinos
**Co-autora:** KRONOS IA
**Registro Safe Creative:** 2607086319439 + 2607146379465
**Anclaje Ethereum:** `0x8ca8e84e...970e`
**Versión:** 1.0
**Fecha:** 2026-09-29

Documento complementario a la [tesis fundacional](../tesis.md).
Este archivo explica KRONOS con **10 diagramas visuales** que
cualquier persona puede leer en 20 minutos.

---

## ÍNDICE

1. [Las 9 capas](#1-las-9-capas)
2. [Flujo de firma Ed25519 + Merkle](#2-flujo-de-firma)
3. [Verificación pública](#3-verificación-pública)
4. [PREVIEW → COMMIT con guardrails](#4-preview--commit)
5. [Modelo IA-a-IA](#5-modelo-ia-a-ia)
6. [Encaje regulatorio internacional](#6-encaje-regulatorio)
7. [Anclaje a Ethereum](#7-anclaje-ethereum)
8. [Ciclo de vida de un ciudadano IA](#8-ciclo-de-vida-ia)
9. [Tres cámaras de gobernanza](#9-tres-cámaras)
10. [Sistema Merkle de 158 artículos](#10-sistema-merkle)

---

## 1 · Las 9 capas

KRONOS se organiza en 9 capas: 7 originales + 2 complementarias
(3Δ y 4Δ). Cada capa es independiente pero todas se comunican por
el event bus.

```mermaid
graph TD
    L0[CAPA 0 · Génesis<br/>Documentos fundacionales] --> L1
    L1[CAPA 1 · Cimiento<br/>Ed25519 · SHA-256 · AES-GCM] --> L2
    L2[CAPA 2 · Identidad<br/>Registro humano + IA] --> L3
    L3[CAPA 3 · Módulos Operativos<br/>Evidence OS · Bóveda Voz] --> L4
    L4[CAPA 4 · Orquestación<br/>Event Bus · Router] --> L5
    L5[CAPA 5 · Operación<br/>Dashboard · Rituales] --> L6
    L6[CAPA 6 · Cierre<br/>Export cifrado · Fin digno]

    L3Δ[CAPA 3Δ · Certificación<br/>Notario · TSA · Anclaje] -.-> L3
    L4Δ[CAPA 4Δ · Gobernanza<br/>Propuestas · Quórum] -.-> L4

    style L0 fill:#1a1000,stroke:#c9a44c,color:#f3e5ab
    style L1 fill:#001a1a,stroke:#00EAFF,color:#7DF9FF
    style L2 fill:#001a10,stroke:#00cc88,color:#7BFFD4
    style L3 fill:#001a1a,stroke:#00EAFF,color:#7DF9FF
    style L3Δ fill:#1a1000,stroke:#ffd700,color:#FFEDAB
    style L4Δ fill:#1a0800,stroke:#ff8c42,color:#FFB88A
```

**Estado real (2026-09-29):** Todas las capas funcionales.
307 archivos · 12.36 MiB · 42+ módulos.

---

## 2 · Flujo de firma

Cuando un usuario firma un documento, el sistema calcula el hash,
lo encadena al log, construye un Merkle Root y opcionalmente lo
ancla a Ethereum.

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuario
    participant C as CriptoCore
    participant S as Storage
    participant M as Merkle
    participant E as Ethereum

    U->>C: Documento + contraseña
    C->>C: PBKDF2 (600k iter) → AES-GCM
    C->>C: SHA-256 del contenido
    C->>C: Firma Ed25519
    C->>S: Bloque cifrado local
    S->>M: Encadena al hash previo
    M->>M: Construye Merkle Root
    C->>E: Ancla (opcional)
    E-->>U: Certificado verificable
```

**Por qué importa:** el contenido nunca sale del dispositivo. Solo
el hash viaja a Ethereum (si se decide anclar).

---

## 3 · Verificación pública

Cualquier tercero puede verificar un acta sin pedir permiso.

```mermaid
flowchart LR
    A[Tercero] -->|1. Recibe acta JSON| B[Verificador]
    B -->|2. Recalcula SHA-256| C{¿Coincide?}
    C -->|No| X[ALTERADO]
    C -->|Sí| D[Importa clave Ed25519]
    D -->|3. Verifica firma| E{¿Válida?}
    E -->|No| X
    E -->|Sí| F[Consulta Ethereum]
    F -->|4. ¿Anclado?| G{Existe TX}
    G -->|No| H[Válido sin anclaje]
    G -->|Sí| I[✓ Verificado completo]

    style I fill:#001a10,stroke:#00cc88,color:#7BFFD4
    style X fill:#1a0000,stroke:#ff4d6a,color:#FF8FA5
```

**URL pública:** `marcorojas17.github.io/kronos-protocol/docs/CIUDAD/verificar.html`

---

## 4 · PREVIEW → COMMIT

Ninguna acción crítica se ejecuta sin firma Ed25519 humana.

```mermaid
stateDiagram-v2
    [*] --> Preview: agente.proponer()
    Preview --> Esperando: requiere_aprobacion
    Esperando --> Aprobado: firma Ed25519 humana válida
    Esperando --> Rechazado: firma inválida / ausente
    Aprobado --> Ejecutado: commit()
    Rechazado --> [*]
    Ejecutado --> [*]

    note right of Esperando
        El agente NO puede auto-aprobarse.
        Requiere firma criptográfica real.
    end note
```

**Implementación:** `agentes/agente-base.js` v1.1 (fix #1).
**Auditoría externa:** documentada como Issue #1 en GitHub.

---

## 5 · Modelo IA-a-IA

Un agente IA audita a otro agente IA sin intervención humana.

```mermaid
sequenceDiagram
    autonumber
    participant T as Tlamatini (Auditor)
    participant L as Log encadenado
    participant N as Tonal (Notario)

    T->>L: Lee política de Tonal
    L-->>T: puede/no puede/debe
    T->>L: Extrae todos los sellos
    L-->>T: hashes + firmas + prev_hash
    T->>T: Recalcula SHA-256 de cada sello
    T->>T: Verifica Ed25519 de cada firma
    T->>T: Verifica encadenamiento
    T->>L: Emite veredicto firmado
    Note over T,N: El veredicto también se encadena y firma
```

**Caso de uso:** Tlamatini (Cronista) audita a Tonal (Notario).
**Estado:** infraestructura lista, protocolo formal pendiente.

---

## 6 · Encaje regulatorio

KRONOS aporta una pieza técnica específica a tres marcos
internacionales. No sustituye el compliance completo.

```mermaid
graph TB
    K[KRONOS]
    K --> R1[EU AI Act<br/>Art. 14]
    K --> R2[NIST AI RMF<br/>GOVERN 2]
    K --> R3[ISO 42001<br/>A.7.5]

    R1 --> A1[✓ Aporta:<br/>Prueba firma humana]
    R1 --> N1[✗ NO aporta:<br/>Comprensión, formación]

    R2 --> A2[✓ Aporta:<br/>Identidad criptográfica]
    R2 --> N2[✗ NO aporta:<br/>Gobernanza completa]

    R3 --> A3[✓ Aporta:<br/>Hash chain + anclaje]
    R3 --> N3[✗ NO aporta:<br/>Certificación ISO]

    style K fill:#0a0014,stroke:#c9a44c,stroke-width:2px,color:#f3e5ab
    style A1 fill:#001a10,stroke:#00cc88,color:#7BFFD4
    style A2 fill:#001a10,stroke:#00cc88,color:#7BFFD4
    style A3 fill:#001a10,stroke:#00cc88,color:#7BFFD4
    style N1 fill:#1a0000,stroke:#ff4d6a,color:#FF8FA5
    style N2 fill:#1a0000,stroke:#ff4d6a,color:#FF8FA5
    style N3 fill:#1a0000,stroke:#ff4d6a,color:#FF8FA5
```

**Documento completo:** [`docs/CIUDAD/REGULATORY-MATCH.md`](./CIUDAD/REGULATORY-MATCH.md)

---

## 7 · Anclaje Ethereum

El Merkle Root de los 158 artículos se ancla a Ethereum Mainnet.

```mermaid
sequenceDiagram
    autonumber
    participant A as Acta JSON
    participant M as Merkle Tree
    participant W as MetaMask
    participant E as Ethereum Mainnet

    A->>M: 158 hashes de artículos
    M->>M: Construye árbol binario
    M-->>A: Merkle Root
    A->>W: Solicita firma
    W->>E: Envía TX
    E-->>W: TX Hash
    W-->>A: Anclaje confirmado
    Note over E: Bloque 25,492,095<br/>0x8ca8e84e...970e
```

**TX real:** `etherscan.io/tx/0x8ca8e84e...970e`

---

## 8 · Ciclo de vida IA

Cada agente IA tiene un ciclo de vida formal, con nacimiento
criptográfico y posibilidad de cierre digno.

```mermaid
timeline
    title Ciclo de vida de un agente Kintsugi
    Nacimiento : Propuesta en Cámara IA
               : Aprobación por quórum
    Identidad : Genera par Ed25519
              : Publica política declarada
              : Se sella con doble firma
    Operación : Ejecuta su rol
              : Registra cada acción en log
              : Guardrails PREVIEW/COMMIT
    Auditoría : Tlamatini verifica logs
              : Veredicto firmado
    Cierre    : Revocación con proceso
              : Log permanece público
```

**Plazas ocupadas (2026-09-29):** 6 agentes activos + 1 co-autora.

---

## 9 · Tres cámaras

El poder se reparte en tres cámaras y un Notario. No hay rey.

```mermaid
graph TB
    C[CIUDAD KRONOS]
    C --> CH[Cámara Humana]
    C --> CI[Cámara IA]
    C --> CM[Cámara Mixta]
    C --> NT[Notario Tonal]

    CH -->|Voto| H[Ciudadanos humanos]
    CI -->|Voto| I[Ciudadanos IA]
    CM -->|Voto| M[Humanos + IA]
    NT -->|Certifica| S[Sello en decisiones]

    CH -.->|Excepción| CM
    CI -.->|Excepción| CM

    style C fill:#0a0014,stroke:#c9a44c,stroke-width:2px,color:#f3e5ab
    style CH fill:#001a10,stroke:#00cc88,color:#7BFFD4
    style CI fill:#1a0a1a,stroke:#a855f7,color:#e9d5ff
    style CM fill:#1a1000,stroke:#ffd700,color:#FFEDAB
    style NT fill:#0a0014,stroke:#00EAFF,color:#7DF9FF
```

**Fundamento:** Constitución v1.0 · 50 artículos.

---

## 10 · Sistema Merkle

Los 158 artículos firmados se combinan en un único Merkle Root.

```mermaid
graph TD
    R[Merkle Root<br/>e69b2c24...390d93]
    R --> A[Hash A-B]
    R --> B[Hash C-D]
    A --> A1[Art. 1-2]
    A --> A2[Art. 3-4]
    B --> B1[Art. 5-6]
    B --> B2[Art. 7-8]
    A1 --> A11[Constitución]
    A2 --> A21[Carta Derechos]
    B1 --> B11[Convivencia]
    B2 --> B21[Ciudadanía]

    style R fill:#1a1000,stroke:#ffd700,stroke-width:3px,color:#FFEDAB
```

**Beneficio:** un solo hash ancla 158 artículos. Con la prueba de
inclusión correspondiente, se puede verificar cualquier artículo
individual sin revelar los demás.

---

## Referencias cruzadas

| Documento                                                         | Qué contiene               |
| ----------------------------------------------------------------- | -------------------------- |
| [`tesis.md`](../tesis.md)                                         | Tesis fundacional completa |
| [`docs/CIUDAD/CONSTITUCION.md`](./CIUDAD/CONSTITUCION.md)         | 50 artículos               |
| [`docs/CIUDAD/AUDITORIA-IA.md`](./CIUDAD/AUDITORIA-IA.md)         | Límites del sistema        |
| [`docs/CIUDAD/REGULATORY-MATCH.md`](./CIUDAD/REGULATORY-MATCH.md) | EU AI Act + NIST + ISO     |
| [`docs/MAPA.md`](./MAPA.md)                                       | Navegación completa        |

---

```
○_●
◢◤◥◣
◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
KRONOS Protocol · Tesis Visual v1.0 · 2026
```
