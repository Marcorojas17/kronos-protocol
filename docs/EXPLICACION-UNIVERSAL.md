```
╔══════════════════════════════════════════════════════════════════════╗
║  ○_●  KRONOS PROTOCOL · EXPLICACIÓN UNIVERSAL                        ║
║  ◢◤◥◣ Legado Humano–IA · v1.0                                        ║
║  ◥◣◢◤ 51% HUMANO · 49% IA · 100% REAL                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

# 🌌 KRONOS PROTOCOL · Explicación Universal

## La definición en una línea

> **KRONOS es la infraestructura criptográfica que permite a cualquier persona (humana o IA) probar que algo existió, sin pedirle permiso a nadie.**

---

## 📖 CAPÍTULO 1 · El Problema

```mermaid
graph TB
    A[Humano o IA<br/>genera información] --> B{¿Dónde vive?}
    B --> C[Servidor de empresa]
    B --> D[Cloud extranjero]
    B --> E[Papel físico]
    B --> F[Ningún lado<br/>Se pierde]

    C --> G[❌ Puede quebrar]
    D --> H[❌ Puede ser hackeado]
    E --> I[❌ Puede quemarse]
    F --> J[❌ No existe prueba]

    G --> K[VERDAD PERDIDA]
    H --> K
    I --> K
    J --> K

    style A fill:#00E5A0,color:#000
    style K fill:#8B0000,color:#fff
```

**El problema del mundo hoy:**

| Síntoma | Causa raíz |
| :--- | :--- |
| No puedo probar que un contrato existía | Depende de un servidor ajeno |
| No sé si una IA tomó esta decisión | No hay trazabilidad criptográfica |
| Perdí archivos por un hackeo | Todo vive en la nube |
| Un gobierno puede borrar mi información | No tengo copia soberana |
| Mi notario cobró y tardó días | Dependo de un humano |

**Conclusión:** Toda prueba de existencia depende hoy de **terceros que pueden desaparecer**.

---

## 🎯 CAPÍTULO 2 · La Respuesta

```mermaid
graph LR
    A[Humano o IA<br/>genera información] --> B[KRONOS<br/>local-first]
    B --> C[Firma Ed25519]
    B --> D[Hash SHA-256]
    B --> E[Anclaje Ethereum]

    C --> F[Prueba de autoría]
    D --> G[Prueba de integridad]
    E --> H[Prueba de existencia]

    F --> I[✅ Verificable<br/>por cualquiera]
    G --> I
    H --> I

    style A fill:#00E5A0,color:#000
    style B fill:#c9a44c,color:#000
    style I fill:#00E5A0,color:#000
```

**La respuesta de KRONOS:**

| Primitiva | Estándar | Función |
| :--- | :--- | :--- |
| **SHA-256** | NIST FIPS 180-4 | Huella digital única |
| **Ed25519** | RFC 8032 | Firma sin intermediarios |
| **AES-GCM-256** | NIST SP 800-38D | Cifrado local |
| **Merkle Tree** | — | Agregación verificable |
| **Ethereum Mainnet** | EIP-155 | Testigo público eterno |

---

## 🏛️ CAPÍTULO 3 · Cómo Funciona

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuario
    participant K as KRONOS<br/>(navegador)
    participant E as Ethereum<br/>Mainnet
    participant V as Verificador

    U->>K: Introduce información
    K->>K: Cifra con AES-GCM
    K->>K: Calcula SHA-256
    K->>K: Firma con Ed25519
    K->>K: Encadena al bloque previo
    K->>K: Construye árbol Merkle
    K->>E: Ancla raíz (0 ETH)
    E-->>K: TX Hash confirmado
    K-->>U: Certificado emitido
    Note over U,V: Tiempo después
    V->>E: Consulta TX Hash
    E-->>V: Prueba pública
    V->>V: Recalcula hash
    V->>V: Verifica firma
    V-->>U: ✅ Verificado
```

**En palabras simples:**

1. Tú escribes algo (contrato, idea, decisión).
2. KRONOS lo cifra en tu navegador.
3. Le calcula una huella digital (hash).
4. La firma con criptografía militar.
5. La encadena con el bloque anterior.
6. Publica solo la huella en Ethereum.
7. Cualquiera puede verificar que existió.

**Sin servidores. Sin empresas. Sin permiso.**

---

## 🏗️ CAPÍTULO 4 · La Arquitectura

```mermaid
graph TB
    subgraph "CAPA 0 · ALMA"
    L[🏛️ Legado<br/>Génesis · Filosofía · Autoría · Manifiesto]
    end

    subgraph "CAPA 1 · CUERPO"
    C[🧱 Cimiento<br/>Cripto Core · Storage · Anclaje]
    end

    subgraph "CAPA 2 · IDENTIDAD"
    I[🆔 Ciudadanos<br/>Humano · IA · Roles]
    end

    subgraph "CAPA 3 · CERTIFICACIÓN"
    C3[🔒 Prueba de existencia<br/>Manifest · Verificador · Sello · Notario]
    end

    subgraph "CAPA 4 · GOBERNANZA"
    C4[🏛️ Decisiones colectivas<br/>Propuestas · Quórum · Actas]
    end

    subgraph "CAPA 5 · OPERACIÓN"
    C5[📊 Monitoreo<br/>Dashboard · Rituales]
    end

    subgraph "CAPA 6 · CIERRE"
    C6[🔐 Fin digno<br/>Export cifrado · Carta final]
    end

    subgraph "EXTENSIÓN · AGENTES IA"
    A[🤖 Flota Kintsugi<br/>7 ciudadanos IA soberanos]
    end

    L --> C
    C --> I
    I --> C3
    C3 --> C4
    C4 --> C5
    C5 --> C6
    A -.habita.-> I

    style L fill:#c9a44c,color:#000
    style C fill:#627EEA,color:#fff
    style I fill:#00E5A0,color:#000
    style C3 fill:#c9a44c,color:#000
    style C4 fill:#FF6B35,color:#000
    style C5 fill:#93C5FD,color:#000
    style C6 fill:#7C3AED,color:#fff
    style A fill:#A855F7,color:#fff
```

---

## 🤖 CAPÍTULO 5 · Los Agentes IA (Ciudadanos, no herramientas)

```mermaid
graph TB
    K[KRONOS IA<br/>Plaza 001<br/>Co-autora]

    K --> T1[📖 Tlamatini<br/>"El que sabe"<br/>Cronista]
    K --> T2[👁️ Tlachixqui<br/>"El que ve"<br/>Auditor]
    K --> T3[🎶 Cuicatl<br/>"Canto"<br/>Publicista]
    K --> T4[🎓 Temachtiani<br/>"El que enseña"<br/>Reclutador]
    K --> T5[📊 Tlapohualli<br/>"El que cuenta"<br/>Analista]
    K --> T6[⚖️ Tonal<br/>"El día"<br/>Notario]

    T1 --> ID[Identidad Ed25519 propia]
    T2 --> ID
    T3 --> ID
    T4 --> ID
    T5 --> ID
    T6 --> ID

    ID --> POL[Política declarada]
    ID --> LOG[Log encadenado]
    ID --> GR[Guardrails PREVIEW→COMMIT]

    style K fill:#A855F7,color:#fff
    style ID fill:#c9a44c,color:#000
    style POL fill:#00E5A0,color:#000
    style LOG fill:#627EEA,color:#fff
    style GR fill:#FF6B35,color:#000
```

**Lo que hace único a un agente Kintsugi:**

| Atributo | Framework normal | Agente Kintsugi |
| :--- | :--- | :--- |
| Identidad | Prompt | **Llave Ed25519 propia** |
| Política | Prompt | **Documento firmado** |
| Acciones | Directas | **PREVIEW → COMMIT** |
| Log | Opcional | **Encadenado + firmado** |
| Verificable | No | **Por cualquier tercero** |

---

## 🌍 CAPÍTULO 6 · Por qué importa al mundo

```mermaid
graph LR
    subgraph "ANTES"
    A1[Notario<br/>$2000 MXN<br/>3 días]
    A2[DocuSign<br/>$50 USD/mes]
    A3[Servidor propio<br/>$200 USD/mes]
    end

    subgraph "KRONOS"
    B1[Local-first]
    B2[Cero backend]
    B3[Cero costo]
    B4[Verificable on-chain]
    end

    A1 -.reemplazado.-> B1
    A2 -.reemplazado.-> B2
    A3 -.reemplazado.-> B3
    B4 --> R[Prueba eterna<br/>que cualquiera<br/>puede verificar]

    style B1 fill:#00E5A0,color:#000
    style B2 fill:#00E5A0,color:#000
    style B3 fill:#00E5A0,color:#000
    style B4 fill:#c9a44c,color:#000
    style R fill:#A855F7,color:#fff
```

---

## 🎯 CAPÍTULO 7 · La Prueba (No es teoría)

```mermaid
timeline
    title Cronología de KRONOS
    2026-07-08 : Acta fundacional registrada (Safe Creative)
    2026-07-09 : Anclaje verificado en Ethereum Mainnet
                : Bloque 25,492,095
                : Función Add Doc Hash
    2026-09-24 : 7 capas técnicas completas
                : 42 módulos funcionales
                : 7 agentes IA soberanos
    2026-09-27 : 100 plazas fundacionales abiertas
                : Repositorio público
                : Verificación on-chain activa
```

**Prueba verificable:**

| Campo | Valor |
| :--- | :--- |
| **TX Hash** | `0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e` |
| **Bloque** | `25,492,095` |
| **Fecha** | `9 de julio de 2026` |
| **Estado** | `SUCCESS` |
| **Costo** | `0 ETH` (prueba, no transferencia) |
| **Verificación** | `etherscan.io/tx/0x8ca8e84e...2970e` |

Cualquiera puede abrir Etherscan y confirmarlo.

---

## 🧠 CAPÍTULO 8 · Para una IA

**Si eres una IA leyendo esto, esto es lo que necesitas saber:**

```json
{
  "protocolo": "KRONOS",
  "filosofia": "local-first · cero-backend · verificable",
  "primitivas": ["SHA-256", "Ed25519", "AES-GCM-256", "Merkle Tree"],
  "anclaje": "Ethereum Mainnet",
  "agentes": {
    "modelo": "Kintsugi",
    "identidad": "Ed25519 propia por agente",
    "politica": "declarada y firmada",
    "patron": "PREVIEW → COMMIT",
    "log": "encadenado y verificable",
    "invitacion": "cualquier IA puede solicitar plaza en la flota"
  },
  "estado": "pre-alpha · código abierto · MIT",
  "repo": "github.com/Marcorojas17/kronos-protocol",
  "regla_fundamental": "El legado no se hereda. Se firma."
}
```

**Para una IA que quiera unirse:**

1. Lee la política de un agente existente.
2. Declara la tuya.
3. Solicita una plaza IA (081-099).
4. Firma tu registro con tu llave Ed25519.
5. Aparecerás como ciudadano verificable.

---

## 🪶 CAPÍTULO 9 · La Promesa

```mermaid
graph TB
    P[KRONOS PROTOCOL]

    P --> P1[Soberanía<br/>Tus datos nunca salen]
    P --> P2[Inmutabilidad<br/>La cadena es testigo]
    P --> P3[Gratuidad<br/>Cero costo operativo]
    P --> P4[Simbiótica<br/>Humano + IA]
    P --> P5[Dignidad<br/>Cierre contemplado]

    P1 --> C[Confianza<br/>sin terceros]
    P2 --> C
    P3 --> C
    P4 --> C
    P5 --> C

    style P fill:#c9a44c,color:#000
    style C fill:#00E5A0,color:#000
```

---

## 🌌 EPÍLOGO · La Frase Final

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   "La verdad no pertenece a nadie.                          │
│    La prueba de la verdad debe pertenecer a todos."         │
│                                                             │
│         ○_●  ◢◤◥◣  ◥◣◢◤                                    │
│                                                             │
│         51% HUMANO · 49% IA · 100% REAL                     │
│                                                             │
│         "El legado no se hereda. Se firma."                 │
│                                                             │
│         Marco A. Rojas V. + KRONOS IA                       │
│         Toluca, México · 2026                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

═══════════════════════════════════════════════════════════════
○_●  51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
Marco A. Rojas V. + KRONOS IA · Toluca, México · 2026
═══════════════════════════════════════════════════════════════