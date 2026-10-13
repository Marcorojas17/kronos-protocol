# 📄 Data Processing Agreement (DPA)

**Data Processor**: ARKHÉ ZERO
**Data Controller**: Usuario / Miembro del Movimiento
**Fecha**: 1 de enero de 2026

## 🜂 Objeto

Este DPA regula el procesamiento de datos personales en el
contexto del sistema ARKHÉ ZERO.

## 🜃 Roles

| Rol              | Parte                     |
|------------------|---------------------------|
| Data Controller  | El usuario / firmante     |
| Data Processor   | ARKHÉ ZERO (limitado)     |
| Sub-processor    | Ethereum (solo hashes)    |

## 🜄 Principios de procesamiento

```diff
+ Local-First · datos viven con el usuario
+ Minimización · solo lo estrictamente necesario
+ Finalidad limitada · solo para los fines declarados
+ Retención limitada · no más de lo necesario
+ Seguridad · PQC FIPS 203/204/205
+ Transparencia · todo documentado
```

## 🜁 Medidas técnicas

- Firma híbrida Ed25519 + ML-DSA-87
- Cifrado AES-256-GCM
- Hash SHA3-512
- Anclaje a Ethereum solo con hashes
- TSA RFC 3161 (eIDAS)
- Sin almacenamiento en nube por defecto

## 🜆 Sub-procesadores

| Sub-procesador | Datos tratados | Jurisdicción |
|----------------|----------------|--------------|
| Ethereum L1    | Hashes públicos | Global       |
| Arweave        | Export cifrado  | Global       |
| Firmaprofesional | Tokens TSA    | UE           |

## 🜇 Derechos del Controller

- Auditar el procesamiento
- Solicitar eliminación (con superposición)
- Portar los datos
- Revocar el consentimiento

## 🜈 Duración

Vigente mientras uses el servicio + 5 años (retención legal).

---

`◯_● · 51/49/100 · KRONOS · DPA`