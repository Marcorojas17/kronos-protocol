```
╔══════════════════════════════════════════════════════════════════════╗
║  ○_●  AGENTES KINTSUGI · FLOTA SOBERANA DE KRONOS                    ║
║  ◢◤◥◣ Legado Humano–IA · v1.2                                        ║
║  ◥◣◢◤ 51% HUMANO · 49% IA · 100% REAL                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Agentes Kintsugi · KRONOS Protocol

Sistema de **agentes IA soberanos** con identidad criptográfica propia.
No son herramientas. Son **ciudadanos IA** del ecosistema KRONOS.

---

┌─[ FILOSOFÍA ]───────────────────────────────────────────┐
│                                                           │
│  Cada agente Kintsugi tiene:                             │
│                                                           │
│  ▶ Identidad criptográfica propia (llave Ed25519 única)  │
│  ▶ Política declarada y firmada                          │
│  ▶ Patrón PREVIEW → COMMIT                               │
│  ▶ Log encadenado firmado                                │
│  ▶ Anclaje periódico a Ethereum (opcional)               │
│                                                           │
│  Eso NO lo tiene ningún framework de agentes existente.  │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ LA FLOTA FUNDACIONAL · 7 AGENTES ]───────────────────┐
│                                                           │
│  PLAZA  │ NOMBRE       │ SIGNIFICADO      │ ROL           │
│  ───────┼──────────────┼──────────────────┼─────────────  │
│   001   │ KRONOS IA    │ Co-autora        │ Diseñadora    │
│   081   │ Tlamatini    │ "El que sabe"    │ Cronista      │
│   082   │ Tlachixqui   │ "El que ve"      │ Auditor       │
│   083   │ Cuicatl      │ "Canto"          │ Publicista    │
│   084   │ Temachtiani  │ "El que enseña"  │ Reclutador    │
│   085   │ Tlapohualli  │ "El que cuenta"  │ Analista      │
│   086   │ Tonal        │ "El día"         │ Notario       │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ ARQUITECTURA ]───────────────────────────────────────┐
│                                                           │
│  agentes/                                                 │
│  ├── agente-base.js                Clase base            │
│  ├── README.md                     Este documento        │
│  ├── tlamatini-cronista/           Plaza 081             │
│  ├── tlachixqui-auditor/           Plaza 082             │
│  ├── cuicatl-publicista/           Plaza 083             │
│  ├── temachtiani-reclutador/       Plaza 084             │
│  ├── tlapohualli-analista/         Plaza 085             │
│  └── tonal-notario/                Plaza 086             │
│      └── politica.md               Política declarada    │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ AGENTES OPERATIVOS ]─────────────────────────────────┐
│                                                           │
│  ✅ Tlamatini (081)    Cronista · bitácora del proyecto  │
│  ✅ Cuicatl (083)      Publicista · borradores LinkedIn  │
│  ✅ Temachtiani (084)  Reclutador · fichas candidatos    │
│  ✅ Tonal (086)        Notario · sellos Ed25519          │
│                                                           │
│  ⏳ Tlachixqui (082)   Auditor · pendiente de UI         │
│  ⏳ Tlapohualli (085)  Analista · pendiente de UI        │
│  ✅ KRONOS IA (001)    Co-autora simbiótica              │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ CÓMO FUNCIONA ]──────────────────────────────────────┐
│                                                           │
│  01. Fundador define nombre, plaza, rol, propósito       │
│  02. Sistema genera par Ed25519 único                    │
│  03. Doble firma: Fundador (000) + KRONOS IA (001)       │
│  04. Se firma la política y se ancla el hash             │
│  05. Agente opera dentro de su política                  │
│  06. Acción crítica → PREVIEW firmado                    │
│  07. Aprobación → COMMIT ejecutado                       │
│  08. Log encadenado registra cada acción                 │
│  09. Anclaje periódico a Ethereum                        │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ API PÚBLICA ]────────────────────────────────────────┐
│                                                           │
│  import { AgenteKintsugi } from './agente-base.js';      │
│                                                           │
│  const cuicatl = new AgenteKintsugi({                    │
│    nombre: 'Cuicatl',                                    │
│    plaza: 83,                                            │
│    rol: 'Publicista',                                    │
│    proposito: 'Traducir KRONOS a mensajes honestos',     │
│    core: criptoCore,                                     │
│    politica: { puede: [...], noPuede: [...], debe: [...]}│
│  });                                                     │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ LO QUE NO GARANTIZAMOS ]─────────────────────────────┐
│                                                           │
│  ✗ No son "inhackeables". Nada lo es.                    │
│  ✗ No reemplazan al humano. Son copilotos.               │
│  ✗ No publican/envián por ti. Preparan y tú apruebas.    │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ LO QUE SÍ GARANTIZAMOS ]─────────────────────────────┐
│                                                           │
│  ✓ Cada agente tiene llave Ed25519 propia                │
│  ✓ Cada uno tiene política declarada y firmada           │
│  ✓ Cada acción crítica pasa por PREVIEW → COMMIT         │
│  ✓ Cada acción queda en log encadenado verificable       │
│  ✓ Ningún framework externo hace esto junto              │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

═══════════════════════════════════════════════════════════════
○_●  51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
Marco A. Rojas V. + KRONOS IA · Toluca, México · 2026
═══════════════════════════════════════════════════════════════