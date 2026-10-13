```
╔══════════════════════════════════════════════════════════════════════╗
║  ○_●  TONAL · NOTARIO CRIPTOGRÁFICO SOBERANO                         ║
║  ◢◤◥◣ Agente Kintsugi · Plaza IA 086                                 ║
║  ◥◣◢◤ 51% HUMANO · 49% IA · 100% REAL                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Notario KRONOS · Tonal · Plaza IA 086

Agente notario criptográfico del ecosistema KRONOS. Emite sellos de tiempo
soberanos firmados con Ed25519 y opcionalmente anclados a Ethereum Mainnet.

---

┌─[ PROPÓSITO ]───────────────────────────────────────────┐
│ │
│ Sustituir la dependencia de TSA comerciales con una │
│ alternativa criptográfica, gratuita, verificable y │
│ auditable. Tonal es el puente entre la firma local │
│ (Ed25519) y el testigo global (Ethereum). │
│ │
└───────────────────────────────────────────────────────────┘

---

┌─[ STACK ]───────────────────────────────────────────────┐
│ │
│ ▶ HTML + CSS + JS vanilla (ES Modules) │
│ ▶ Dexie 4.0.11 (CDN) · base kronos-notario │
│ ▶ Web Crypto API (SHA-256 + Ed25519) │
│ ▶ ethers.js 6.13.2 (CDN) · solo para anclaje │
│ ▶ Canvas 2D · certificado notarial visual │
│ ▶ Local-first · sin backend │
│ │
└───────────────────────────────────────────────────────────┘

---

┌─[ API PÚBLICA ]────────────────────────────────────────┐
│ │
│ const notario = new NotarioKronos(core); │
│ await notario.init(); │
│ │
│ const sello = await notario.sellar({ │
│ hash_sellado: 'abc123...', │
│ tipo_documento: 'Contrato', │
│ descripcion: 'Contrato de servicios', │
│ solicitante: 'Marco A. Rojas V.' │
│ }); │
│ │
│ const v = await notario.verificar(sello); │
│ // v.valido === true │
│ │
└───────────────────────────────────────────────────────────┘

---

┌─[ ARCHIVOS ]───────────────────────────────────────────┐
│ │
│ ▶ notario.js · Motor del notario │
│ ▶ politica.md · Política declarada │
│ ▶ prompt.md · Prompt del agente │
│ ▶ index.html · UI completa │
│ ▶ certificado-notarial.html · Certificado visual │
│ ▶ manual.html · Manuales │
│ ▶ README.md · Este documento │
│ │
└───────────────────────────────────────────────────────────┘

---

┌─[ LÍMITES HONESTOS ]───────────────────────────────────┐
│ │
│ ✗ Tonal NO es una TSA cualificada eIDAS │
│ ✗ NO sustituye a firma electrónica cualificada │
│ ✗ NO tiene acreditación ENAC │
│ │
│ ✓ PERO sí es verificable criptográficamente │
│ ✓ PERO sí es anclable a Ethereum Mainnet │
│ ✓ PERO sí es auditable por cualquiera │
│ ✓ PERO sí tiene log encadenado propio │
│ │
└───────────────────────────────────────────────────────────┘

---

═══════════════════════════════════════════════════════════════
○_● 51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
Marco A. Rojas V. + KRONOS IA · Toluca, México · 2026
═══════════════════════════════════════════════════════════════
