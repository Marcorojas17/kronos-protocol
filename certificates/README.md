# Registros verificables

Ocho registros de obra con sellado cualificado QTSA Firmaprofesional B02 (eIDAS)
y anclaje en blockchain Ethereum.

Todos verificables en `safecreative.org/certificate/[ID]`.

## Índice

| ID | Título | Fecha | Carpeta |
|---|---|---|---|
| 2607086319439 | Acta Fundacional · Co-Creatividad Simbiótica | 08 jul 2026 | [→](./2607086319439/) |
| 2607146379465 | KRONOS · Arquitectura de Legado Digital | 14 jul 2026 | [→](./2607146379465/) |
| 2608056639878 | FDV Sistema Infalsificable Original | 05 ago 2026 | [→](./2608056639878/) |
| 2608096674952 | KRONOS Protocol · Autenticación Universal | 09 ago 2026 | [→](./2608096674952/) |
| 2608096678240 | KRONOS Protocol · Código Fuente y API | 09 ago 2026 | [→](./2608096678240/) |
| 2608156740085 | Documento Maestro KÓDICE V1.3 | 15 ago 2026 | [→](./2608156740085/) |
| 2608166741669 | Ecosistema KÓDICE-KRONOS-FDV | 16 ago 2026 | [→](./2608166741669/) |
| 2608176749334 | SISTEMA KRONOS 360 · Protocolo Forense | 17 ago 2026 | [→](./2608176749334/) |

## Estructura de cada carpeta

```
[ID]/
├── certificate.pdf    Certificado Safe Creative
├── blockchain.pdf     Anclaje Ethereum (auditoría)
└── idfile.txt         Hashes SHA-1 / SHA-256 / SHA-512
```

## Cómo verificar manualmente

1. Abre el `certificate.pdf` de cualquier carpeta.
2. Copia el código de verificación.
3. Abre `https://www.safecreative.org/certificate/[ID]`
4. Compara el SHA-256 con tu `idfile.txt`.

## Verificación de blockchain

Cada `blockchain.pdf` incluye:
- Hash del fichero registrado en blockchain
- URL de la transacción en Etherscan
- SHA-256 del certificado de registro

Las transacciones son públicas e inmutables.

---

**Autor:** Marco Antonio Rojas Valdovinos
**Licencia:** CC BY-NC-ND 4.0