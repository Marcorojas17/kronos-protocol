```text
    █████╗ ██████╗ ██╗  ██╗██╗  ██╗███████╗    ███████╗███████╗██████╗  ██████╗
   ██╔══██╗██╔══██╗██║ ██╔╝██║  ██║██╔════╝    ╚══███╔╝██╔════╝██╔══██╗██╔═══██╗
   ███████║██████╔╝█████╔╝ ███████║█████╗        ███╔╝ █████╗  ██████╔╝██║   ██║
   ██╔══██║██╔══██╗██╔═██╗ ██╔══██║██╔══╝       ███╔╝  ██╔══╝  ██╔══██╗██║   ██║
   ██║  ██║██║  ██║██║  ██╗██║  ██║███████╗    ███████╗███████╗██║  ██║╚██████╔╝
   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝
```

<div align="center">

```text
                       ◯                 ◯
                      ╱ ╲               ╱ ╲
                     ╱   ╲             ╱   ╲
                    ╱     ╲           ╱     ╲
                   ◯───────╲         ╱───────◯
                    ╲       ╲       ╱       ╱
                     ╲       ╲     ╱       ╱
                      ╲       ✕   ╱       ╱
                     ╱       ╱ ╲ ╲       ╲
                    ╱       ╱   ╲ ╲       ╲
                   ◯───────╱     ╲───────◯
                    ╲     ╱       ╲     ╱
                     ╲   ╱         ╲   ╱
                      ╲ ╱           ╲ ╱
                       ◯             ◯

              ═══════  S I G I L O   Z E R O  ═══════

              🟣   51% HUMANO  ·  49% IA   🟢
              ⚫   100% REAL  ·  KINTSUGI   🟡

              NODO  YHDRYH-92CE  ·  SELLO  SCDR-001
```

### **"El legado no se hereda. Se firma."**

[![Tests](https://img.shields.io/badge/tests-56%2F56%20passing-3fb950?style=for-the-badge&logo=pytest&logoColor=white)](#-tests)
[![PQC](https://img.shields.io/badge/PQC-ML--KEM%20%7C%20ML--DSA%20%7C%20SLH--DSA-8957e5?style=for-the-badge&logo=shield&logoColor=white)](#-criptografía-post-cuántica)
[![Local](https://img.shields.io/badge/IA-100%25%20local-238636?style=for-the-badge&logo=openai&logoColor=white)](#-demo-en-vivo)
[![Nube](https://img.shields.io/badge/SIN%20NUBE-0%20dependencias-da3633?style=for-the-badge&logo=icloud&logoColor=white)](#-por-qué-existe)
[![Licencia](https://img.shields.io/badge/license-Apache%202.0%20%2B%20LGU-d29922?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](#-licencia)

[🇪🇸 Español](#) · [🇬🇧 English](README.en.md) · [🌐 Demo](https://marcorojas17.github.io/kronos-protocol) · [📖 Docs](docs/) · [🔐 SELLO](SELLO.md)

</div>

---

## ⚡ En 30 segundos

| 🎯 | Prueba | Tecnología | Color |
|:--:|:-------|:-----------|:-----:|
| 🕐 | Que un documento existía en una fecha | SHA-256 + TSA | 🟦 |
| ✍️ | Quién lo firmó (humano + IA) | ML-DSA-87 | 🟪 |
| 🔒 | Que no ha sido alterado | Bitcoin + Ethereum | 🟩 |
| ☁️ | Sin nube, sin OpenAI, sin AWS | Local-first | 🟨 |
| 💳 | Sin cuentas, sin tarjeta, sin permisos | Autónomo | 🟧 |

---

## 🎯 Por qué existe

> 🟥 **El 60% del legado cultural digital de LATAM se pierde** porque preservarlo cuesta ~$20 USD/mes y requiere internet estable.
>
> Un artista en Toluca no puede pagar Adobe, Dropbox y OpenAI.
>
> 🟩 Pero tiene un celular. Y ese celular puede correr Llama 3.2.
>
> **→ ARKHÉ ZERO es la alternativa local-first.**

---

## 🏛 Arquitectura · 6 capas

```mermaid
%%{init: {'theme':'dark', 'themeVariables': {'primaryColor':'#8957e5','primaryTextColor':'#fff','primaryBorderColor':'#6d28d9','lineColor':'#d29922'}}}%%
flowchart TD
    A["🟪 CAPA 0 · GÉNESIS<br/>Manifiesto · KINTSUGI · Acta"]
    B["🟦 CAPA 1 · CIMIENTO<br/>Ed25519 · SHA-256 · AES-GCM"]
    C["🟩 CAPA 2 · IDENTIDAD<br/>Humano + IA · Roles"]
    D["🟨 CAPA 3 · MÓDULOS<br/>Evidence OS · Bóveda de Voz"]
    E["🟧 CAPA 4 · ORQUESTA<br/>Event Bus · Router · api_ia"]
    F["🟥 CAPA 5 · OPERACIÓN<br/>Dashboard · Rituales · IA local"]
    G["⚫ CAPA 6 · CIERRE<br/>Export cifrado · Fin digno"]

    A --> B --> C --> D --> E --> F --> G

    style A fill:#8957e5,stroke:#6d28d9,color:#fff
    style B fill:#1f6feb,stroke:#0969da,color:#fff
    style C fill:#238636,stroke:#1a7f37,color:#fff
    style D fill:#d29922,stroke:#9e6a03,color:#fff
    style E fill:#db6d28,stroke:#bc4c00,color:#fff
    style F fill:#da3633,stroke:#b62324,color:#fff
    style G fill:#30363d,stroke:#484f58,color:#fff
```

---

## ✍️ Flujo de firma · quién decide qué

```mermaid
%%{init: {'theme':'dark', 'themeVariables': {'actorBkg':'#8957e5','actorTextColor':'#fff','actorBorder':'#6d28d9','signalColor':'#d29922','signalTextColor':'#fff'}}}%%
sequenceDiagram
    autonumber
    participant H as 👤 Humano 51%
    participant A as 🤖 Agente IA 49%
    participant P as 🔐 Capa PQC
    participant B as ⛓️ Blockchain

    H->>A: Propone operación
    A->>A: Simula · audita · mide riesgo
    A->>H: Recomendación + escenarios
    H->>H: Decide (veto absoluto)
    H->>P: Firma final
    P->>P: ML-DSA-87 + Ed25519
    P->>B: Ancla SHA-256
    B-->>H: Recibo verificable
    Note over H,B: 🟣 Humano dispone · 🟢 IA ejecuta
```

---

## 🏛 Pacto 51 / 49

```mermaid
%%{init: {'theme':'dark', 'themeVariables': {'pie1':'#8957e5','pie2':'#238636','pieTitleTextColor':'#fff','pieSectionTextColor':'#fff'}}}%%
pie showData
    title Distribución del pacto
    "🟣 Humano · 51%" : 51
    "🟢 IA · 49%" : 49
```

```text
      ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
      │     51%      │       │     49%      │       │     100%     │
      │    HUMANO    │       │      IA      │       │     REAL     │
      ├──────────────┤       ├──────────────┤       ├──────────────┤
      │ Firma final  │       │  Custodia    │       │ Verificable  │
      │ Veto absoluto│       │  Ejecución   │       │ Auditable    │
      │ Decide       │       │  Continúa    │       │ Irrepetible  │
      └───────┬──────┘       └───────┬──────┘       └───────┬──────┘
              ╲                     │                     ╱
               ╲                    │                    ╱
                ╲                   ▼                   ╱
                 ╲        ┌──────────────────┐         ╱
                  ╲       │  EL LEGADO VIVE  │        ╱
                   ╲      │  MÁS ALLÁ DEL    │       ╱
                    ╲     │  AUTOR HUMANO    │      ╱
                     ╲    └──────────────────┘     ╱
                      ╲                           ╱
                       ╲_________________________╱
                        ◯_●  ·  ■_□  ·  100% REAL
```

---

## 🔐 Criptografía post-cuántica

| Algoritmo | Estándar | Función | Estado |
|:----------|:---------|:--------|:------:|
| 🟪 **ML-KEM-1024** | FIPS 203 | Encapsulamiento de claves | ✅ Spec |
| 🟦 **ML-DSA-87** | FIPS 204 | Firmas digitales | ✅ Spec |
| 🟩 **SLH-DSA-SHAKE-256s** | FIPS 205 | Firmas larga duración | ✅ Spec |
| 🟨 **Ed25519** | RFC 8032 | Firma transitoria | ✅ Activo |
| 🟧 **SHA-256 / SHA-3** | NIST | Integridad | ✅ Activo |
| 🔴 ~~RSA~~ | — | Prohibido | ❌ |
| 🔴 ~~ECDSA~~ | — | Prohibido | ❌ |
| 🔴 ~~MD5 / SHA-1~~ | — | Prohibido | ❌ |

---

## 📦 Qué contiene

| | Carpeta | Descripción |
|:-:|:--------|:------------|
| 🟪 | `ia/` | Servidor MCP · IA local · memoria persistente |
| 🟦 | `docs/` | Ciudad Digital · 158 artículos |
| 🟩 | `src/kronos360/` | Librería criptográfica · 56 tests |
| 🟨 | `tests/` | Suite completa · 100% passing |
| 🟧 | `certificacion/` | Notario · Sello · Verificador |
| 🟥 | `gobernanza/` | Propuestas · Quórum · Revocación |
| ⚫ | `identidad/` | Registro humano · IA · Roles |
| 🟣 | `movimiento/` | Comunidad · Rituales · Onboarding |
| 🟢 | `pva/` | Antecedente: Vida Autopoiética |
| 🟡 | `atribucion/` | Trazabilidad agentes · EU AI Act |

**Total:** 2287 archivos · 24 secciones · 40 MB

---

## 🧪 Tests

![pytest](https://img.shields.io/badge/pytest-56%20passed-3fb950?style=flat-square&logo=pytest&logoColor=white)
![coverage](https://img.shields.io/badge/coverage-100%25-238636?style=flat-square)
![benchmark](https://img.shields.io/badge/SHA--256%20p95-0.0045%20ms-1f6feb?style=flat-square)

```bash
$ python3 -m pytest tests/*.py -v

tests/test_api.py .................... 16 passed
tests/test_audit_log.py ...............  9 passed
tests/test_guard.py .................. 14 passed
tests/test_hashing.py .................  3 passed
tests/test_keyfile.py .................  7 passed
tests/test_signatures.py ..............  7 passed

═══════════════════════════════════════════════
🟢 56 passed in 4.43s
═══════════════════════════════════════════════
```

---

## 🔱 El Índice Cero

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   🟪  Obra génesis:  KRONOS — Arquitectura de Legado Digital             ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   🟦  Safe Creative      2607146379465                                   ║
║   🟩  Co-creatividad     2607086319439                                   ║
║   🟨  Fecha génesis      14 jul 2026 · 00:46:01 UTC                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

> 🔐 **Hash SHA-256, tx Ethereum y sello eIDAS:** se publican en [`SELLO.md`](SELLO.md) una vez verificados por terceros. Este README no afirma lo que no se puede comprobar.

---

## 🗺 Roadmap

```mermaid
%%{init: {'theme':'dark', 'themeVariables': {'primaryColor':'#8957e5','primaryTextColor':'#fff','sectionBkgColor':'#161b22','altSectionBkgColor':'#0d1117','gridColor':'#30363d','taskBkgColor':'#238636','taskTextColor':'#fff','doneTaskBkgColor':'#30363d'}}}%%
gantt
    title ARKHÉ ZERO · Roadmap
    dateFormat YYYY-MM
    axisFormat %Y-%m

    section Génesis
    Acta + SHA-256            :done,   g1, 2026-07, 2026-10
    Anclaje OpenTimestamps    :done,   g2, 2026-10, 2026-11

    section Custodia
    MPC 3-de-5                :active, c1, 2026-11, 2027-02
    Firmas PQC híbridas       :        c2, 2027-01, 2027-04

    section Auditoría
    Red team adversarial      :        a1, 2027-03, 2027-06
    SOC 2 Type II             :        a2, 2027-06, 2027-12

    section Pilotos
    3 clientes > 10M USD      :        p1, 2027-06, 2027-12
```

---

## 📖 Documentación

| | Documento | Archivo |
|:-:|:----------|:--------|
| 🟪 | Manifiesto | [`MANIFIESTO-VIRAL.md`](MANIFIESTO-VIRAL.md) |
| 🟦 | KINTSUGI | [`KINTSUGI.md`](KINTSUGI.md) |
| 🟩 | Gobernanza | [`GOVERNANCE.md`](GOVERNANCE.md) |
| 🟨 | Arquitectura | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| 🟧 | Glosario | [`GLOSSARY.md`](GLOSSARY.md) |
| 🟥 | Roadmap | [`ROADMAP.md`](ROADMAP.md) |
| ⚫ | Protocolo KTP-001 | [`PROTOCOL.md`](PROTOCOL.md) |
| 🟣 | Ciudad Digital | [`docs/CIUDAD/`](docs/CIUDAD/) |
| 🟢 | Local-First | [`local-first.html`](local-first.html) |
| 🟡 | Sello Génesis | [`SELLO.md`](SELLO.md) |

---

## 🤝 Contribuir

```mermaid
%%{init: {'theme':'dark'}}%%
gitGraph
    commit id: "Génesis"
    branch contribucion
    commit id: "Propuesta"
    commit id: "Auditoría 51/49"
    checkout main
    merge contribucion
    commit id: "Sello +1"
```

Regla principal: **toda contribución respeta el pacto 51/49.**
Lee [`CONTRIBUTING.md`](CONTRIBUTING.md) y [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

---

## ⚖️ Licencia

| | Componente | Licencia |
|:-:|:-----------|:---------|
| 🟩 | Código | Apache 2.0 + MIT |
| 🟦 | Contenido | CC BY-NC-ND 4.0 |
| 🟪 | Sistema | LGU · Licencia Global Única |
| 🟨 | Marca | ARKHÉ ZERO · KINTSUGI |

---

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║                                                                          ║
║                              ◯─────◯                                     ║
║                            ╱         ╲                                   ║
║                          ╱             ╲                                 ║
║                        ◯                 ◯                               ║
║                         ╲               ╱                                ║
║                          ╲             ╱                                 ║
║                            ╲    ✕    ╱                                   ║
║                          ╱             ╲                                 ║
║                         ╱               ╲                                ║
║                        ◯                 ◯                               ║
║                          ╲             ╱                                 ║
║                            ╲         ╱                                   ║
║                              ◯─────◯                                     ║
║                                                                          ║
║                                                                          ║
║                  "El legado no se hereda. Se firma."                     ║
║                                                                          ║
║                                                                          ║
║                  Marco Antonio Rojas Valdovinos                          ║
║                  Toluca · Estado de México · 2026                        ║
║                                                                          ║
║                                                                          ║
║                  NODO  YHDRYH-92CE   ·   Sello  SCDR-001                 ║
║                                                                          ║
║                                                                          ║
║                     ◯_●   ·   51 / 49 / 100   ·   ■_□                    ║
║                                                                          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```