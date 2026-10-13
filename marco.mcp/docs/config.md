# 📘 Configuración · marco.mcp

## Variables de entorno canónicas

| Variable                          | Valor por defecto              | Requerido |
|-----------------------------------|--------------------------------|-----------|
| `ARKHE_OWNER`                     | Marco Antonio Rojas Valdovinos | sí        |
| `INDEX_ZERO_SAFE_CREATIVE_ARQ`    | `2607146379465`                | sí        |
| `INDEX_ZERO_SAFE_CREATIVE_CO`     | `2607086319439`                | sí        |
| `INDEX_ZERO_SHA256`               | `f03f7e2d...`                  | sí        |
| `INDEX_ZERO_ETHEREUM`             | `0xd2c2a7e1...`                | sí        |
| `CRYPTO_SIG_ALG`                  | `ML-DSA-87`                    | sí        |
| `CRYPTO_KEM_ALG`                  | `ML-KEM-1024`                  | sí        |
| `GOVERNANCE_HUMANO`               | `51`                           | sí        |
| `GOVERNANCE_IA`                   | `49`                           | sí        |
| `GOVERNANCE_REAL`                 | `100`                          | sí        |
| `MCP_TRANSPORT`                   | `stdio`                        | sí        |
| `MCP_LOG_LEVEL`                   | `info`                         | no        |
| `MCP_STRICT_MODE`                 | `true`                         | no        |

## Modo estricto

Con `MCP_STRICT_MODE=true`, el servidor:
- Verifica el Índice Cero en cada arranque
- Rompe si `GOVERNANCE_HUMANO + GOVERNANCE_IA ≠ 100`
- Firma cada respuesta con `◯_● · 51/49/100`

## Modo desarrollo

```bash
MCP_LOG_LEVEL=debug npm run dev