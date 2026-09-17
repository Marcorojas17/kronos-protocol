<!-- ═══════════════════════════════════════════════════════════════════════ -->
<!-- MD-33 · README · v1.0 · 16 Septiembre 2026                             -->
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ███╗   ███╗██████╗        ██████╗ ██████╗                             ▓ ║
║ ▓   ████╗ ████║██╔══██╗      ██╔════╝ ╚════██╗                            ▓ ║
║ ▓   ██╔████╔██║██║  ██║█████╗███████╗  █████╔╝                            ▓ ║
║ ▓   ██║╚██╔╝██║██║  ██║╚════╝╚════██║  ╚═══██╗                            ▓ ║
║ ▓   ██║ ╚═╝ ██║██████╔╝      ██████╔╝ ██████╔╝                            ▓ ║
║ ▓   ╚═╝     ╚═╝╚═════╝       ╚═════╝  ╚═════╝                             ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓   F R A M E W O R K   F O R E N S E                                       ║
║ ▓   c a d e n a   d e   c u s t o d i a   d i g i t a l                     ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Framework de verificación forense de evidencia digital conforme a ISO/IEC 27037 e ISO/IEC 17025.**

```text
[ DOC  ]  ISO 27037               [ CRIPTO ]  ISO 17025
[ TIME ]  RFC 3161                [ CHAIN  ]  EIP-191
[ SCRIPT ] verifica_estandar.py   [ PLANT  ]  acta_perito_vacia.md
```

---

```text
┌─[ 01 ]────────────────────────────────────── QUÉ ES ─┐
│                                                        │
└────────────────────────────────────────────────────────┘
```

MD-33 es **dos cosas separadas en el mismo repo**:

```text
┌────────────────────────────────────┬────────────────────────────────────┐
│  🎭 NARRATIVA (ficción)            │  ⚙️ FRAMEWORK (real)               │
├────────────────────────────────────┼────────────────────────────────────┤
│  Caso demostrativo con lore,       │  Protocolo de verificación         │
│  actas y evidencia ficcional       │  forense ISO + RFC + blockchain    │
├────────────────────────────────────┼────────────────────────────────────┤
│  Sirve como banco de pruebas       │  Sirve como herramienta real       │
│  del framework                     │  para peritos y auditores          │
└────────────────────────────────────┴────────────────────────────────────┘
```

**La ficción es el vehículo. El framework es la carga útil.**

---

```text
┌─[ 02 ]───────────────────────────────── QUÉ INCLUYE ─┐
│                                                        │
└────────────────────────────────────────────────────────┘
```

| Componente | Detalle |
|------------|---------|
| 🐍 **Script verificador** | `src/verifica_estandar.py` — genérico, acepta cualquier documento |
| 📄 **Plantilla de acta** | `plantillas/acta_perito_vacia.md` — bilingüe ES/EN |
| 📘 **Manual** | `MANUAL_PERITO_INTERNACIONAL_MD33.md` — protocolo forense v1.0 |
| 🔗 **Modelo de cadena de custodia** | hash + firma + timestamp + anclaje |
| ⚖️ **Tabla de cumplimiento** | México · USA · UE · Israel |

---

```text
┌─[ 03 ]───────────────────────────────── LÍMITES ─┐
│                                                    │
└────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────┬────────────────────────────────────┐
│  ✅ ESTE FRAMEWORK SÍ              │  ❌ ESTE FRAMEWORK NO              │
├────────────────────────────────────┼────────────────────────────────────┤
│  Aplica protocolo de verificación  │  No certifica autoría ni           │
│  conforme a ISO 27037.             │  titularidad.                      │
├────────────────────────────────────┼────────────────────────────────────┤
│  Provee comandos universales       │  No garantiza admisibilidad        │
│  (sha256sum, openssl, ots, cast).  │  judicial automática.              │
├────────────────────────────────────┼────────────────────────────────────┤
│  Ofrece plantilla de acta          │  No sustituye al perito,           │
│  bilingüe ES/EN.                   │  notario ni juez.                  │
├────────────────────────────────────┼────────────────────────────────────┤
│  Documenta cadena de custodia      │  No es una certificación ISO       │
│  digital.                          │  obtenida por auditor externo.     │
└────────────────────────────────────┴────────────────────────────────────┘
```

```text
> CAUTION: "Conforme a ISO 27037" significa que el protocolo sigue las
> guías de esa norma. NO implica certificación externa ni respaldo oficial.
```

---

```text
┌─[ 04 ]───────────────────────────────────── STACK ─┐
│                                                     │
└─────────────────────────────────────────────────────┘
```

| Capa | Tecnología |
|------|-----------|
| **Script** | Python 3 (verifica_estandar.py) |
| **Hashing** | SHA-256 vía `hashlib` o `sha256sum` |
| **Firma** | OpenSSL / ECDSA |
| **Timestamp** | OpenTimestamps (`.ots`) o RFC 3161 |
| **Anclaje blockchain** | Ethereum vía `cast` (Foundry) o ethers.js |
| **Documentación** | Markdown bilingüe |
| **Sitio** | Jekyll (GitHub Pages) |

---

```text
┌─[ 05 ]────────────────────────────── CÓMO USAR ─┐
│                                                   │
└───────────────────────────────────────────────────┘
```

### Verificar un documento

```bash
# Solo calcular hash
python src/verifica_estandar.py mi_documento.pdf

# Comparar contra hash esperado
python src/verifica_estandar.py mi_documento.pdf --hash-esperado abc123...

# Verificar firma ECDSA
python src/verifica_estandar.py mi_documento.pdf --firma firma.sig --pubkey pub.pem

# Salida JSON (integración con otros sistemas)
python src/verifica_estandar.py mi_documento.pdf --json
```

### Comandos manuales universales

```bash
sha256sum mi_documento.pdf              # hash SHA-256
openssl dgst -sha256 -verify pub.pem \
        -signature firma.sig mi.pdf     # verificar firma
ots verify mi_documento.pdf.ots         # verificar anclaje OpenTimestamps
cast tx <hash> --rpc-url <url>          # verificar anclaje Ethereum
```

### Usar la plantilla de acta

Copiá `plantillas/acta_perito_vacia.md`, llená los campos, aplicá el protocolo. Bilingüe ES/EN. Cumple formato de cadena de custodia para MX, USA, UE e Israel.

---

```text
┌─[ 06 ]─────────────────────────────── CAPAS ─┐
│                                                │
└────────────────────────────────────────────────┘
```

| Capa | Estándar | Verificable por |
|------|----------|-----------------|
| Documental | ISO 27037 | Cualquier perito |
| Criptográfica | ISO 17025 | Cualquiera con clave pública |
| Temporal | RFC 3161 | TSA autorizada |
| Blockchain | EIP-191 | Cualquier nodo Ethereum |
| Cultural (opcional) | Gematría + Atbash | Perito con conocimiento de cábala |

---

```text
┌─[ 07 ]───────────────────── CUMPLIMIENTO POR PAÍS ─┐
│                                                      │
└──────────────────────────────────────────────────────┘
```

| País | Ley aplicable | Autoridad | Registro |
|:---:|:---|:---|:---|
| 🇲🇽 México | LFDA · CNPP Art. 227 | INDAUTOR · Fiscalía | Oficio + sello digital |
| 🇺🇸 USA | FRE 902(13)-(14) | NIST · FBI | Hash + cadena de custodia |
| 🇪🇺 UE | eIDAS 910/2014 | ENISA | Firma cualificada |
| 🇮🇱 Israel | Evidence Ordinance | Ministry of Justice | Certificado digital |

---

```text
┌─[ 08 ]─────────────────────────────── ESTRUCTURA ─┐
│                                                     │
└─────────────────────────────────────────────────────┘
```

```text
md-33/
├── README.md                              ← este archivo
├── LICENSE
├── MANUAL_PERITO_INTERNACIONAL_MD33.md    ← protocolo forense v1.0
│
├── plantillas/
│   └── acta_perito_vacia.md               ← plantilla bilingüe
│
├── src/
│   └── verifica_estandar.py               ← verificador genérico
│
├── manual/                                ← caso demostrativo (ficción)
├── actas/                                 ← caso demostrativo (ficción)
└── evidencia/                             ← caso demostrativo (ficción)
```

---

```text
┌─[ 09 ]──────────────────────────── ESTADO ─┐
│                                              │
└──────────────────────────────────────────────┘
```

```text
  Script verificador ........... ████████████████████ 100%
  Plantilla de acta ............ ████████████████████ 100%
  Manual forense v1.0 .......... ████████████████████ 100%
  Tabla legal por país ......... ████████████████████ 100%
  Caso demostrativo ............ ████████████████████ 100%
  Casos reales aplicados ....... ░░░░░░░░░░░░░░░░░░░░   0%
```

**Estado:** framework usable · pendiente de aplicación a un caso real documentado.

---

```text
┌─[ 10 ]──────────────────────────── LICENCIA ─┐
│                                                │
└────────────────────────────────────────────────┘
```

```text
  Framework + documentación  ──▶  CC0 1.0 Universal
  Uso comercial              ──▶  Permitido
  Atribución                 ──▶  No requerida (pero apreciada)
```

---

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   [ MD-33 · FRAMEWORK FORENSE · v1.0 ]                                  ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ▸ Script Python genérico                                              ▓ ║
║ ▸ Plantilla bilingüe ES/EN                                                ▓ ║
║ ▓   ▸ 4 capas de verificación                                             ▓ ║
║ ▓   ▸ 4 jurisdicciones mapeadas                                           ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@md33:~# ./verify --framework                                      ▓ ║
║ ▓   [████████████████████████████████████████] READY                     ▓ ║
║ ▓   ✓ Protocolo declarado                                                 ▓ ║
║ ▓   ✓ Plantilla usable                                                    ▓ ║
║ ▓   ✓ Límites explícitos                                                  ▓ ║
║ ▓   ⚠ Pendiente: caso real aplicado                                       ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@md33:~# _                                                         ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

<!-- FIN DEL DOCUMENTO · MD-33 · v1.0 -->