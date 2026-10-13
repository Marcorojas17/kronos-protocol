# 📊 Data Flow · ARKHÉ ZERO

```bash
┌─(kali㉿arkhe-zero)-[~/docs/architecture]
└─$ ./architecture --data-flow

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%
```

## 🜂 Flujo principal

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                    DATA FLOW · DOCUMENTO → LEGADO                        ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   [ Documento ]                                                          ║
║         │                                                                ║
║         ▼                                                                ║
║   [ SHA3-512 ] ────────────▶ hash f03f7e2d...                            ║
║         │                                                                ║
║         ▼                                                                ║
║   [ Firma ML-DSA-87 ] ─────▶ firma criptográfica                         ║
║         │                                                                ║
║         ▼                                                                ║
║   [ Firma Ed25519 ] ───────▶ firma clásica (híbrido)                     ║
║         │                                                                ║
║         ▼                                                                ║
║   [ TSA RFC 3161 ] ────────▶ sello Firmaprofesional QTSA                 ║
║         │                                                                ║
║         ▼                                                                ║
║   [ Merkle root ] ─────────▶ agrupa N documentos                         ║
║         │                                                                ║
║         ▼                                                                ║
║   [ Anclaje Ethereum ] ────▶ tx 0xd2c2a7e1...fb895774c                   ║
║         │                                                                ║
║         ▼                                                                ║
║   [ Certificado VC 2.0 ] ──▶ credencial verificable                      ║
║         │                                                                ║
║         ▼                                                                ║
║   [ Verificación Pública ]                                                ║
║                                                                          ║
║   ◯_● · 51/49/100                                                        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜃 Puntos de control

| Paso | Verifica | Falla si |
|------|----------|----------|
| SHA3-512 | Integridad | Hash mismatch |
| ML-DSA-87 | Autoría PQC | Firma inválida |
| Ed25519 | Autoría clásica | Firma inválida |
| TSA RFC 3161 | Temporalidad | Sello inválido |
| Merkle root | Agregación | Árbol corrupto |
| Ethereum | Inmutabilidad | Anclaje fallido |

## 🜄 Flujo inverso (verificación)

```text
[ Hash ] → [ Buscar en IPFS/Arweave ] → [ Verificar Ethereum ]
    → [ Validar TSA ] → [ Validar firmas ] → [ ✓ Veredicto ]
```

---

`◯_● · 51/49/100 · ARCH · Data Flow`