```markdown
# 🔌 AI-MCP-SERVER · Substrato Cognitivo Personal

[![License](https://img.shields.io/badge/License-Apache%202.0-blue)]()
[![Node](https://img.shields.io/badge/Node-%3E%3D20-green)]()
[![MCP](https://img.shields.io/badge/Protocol-MCP-purple)]()
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()
[![Visibility](https://img.shields.io/badge/Visibility-Private-red)]()

🔒 Repositorio privado · © 2026 Marco Antonio Rojas Valdovinos

## 🧠 ¿Qué es `marco.mcp`?
Es un servidor local que expone tu identidad, proyectos, decisiones
y voz a cualquier IA compatible con **Model Context Protocol**.

### Flujo de Atribución API
```text
┌──────────────────────────────────────────────────────┐
│                 TU AGENTE IA                         │
│        (Codex, Claude, GPT, Gemini, local...)        │
└──────────────────────┬───────────────────────────────┘
                       │ POST /v1/agents/
                       ▼
┌──────────────────────────────────────────────────────┐
│                ATRIBUCIÓN API                        │
│ 1. Verifica firma híbrida (ECDSA + ML-DSA)           │
│ 2. Valida contra Contrato de Atribución              │
│ 3. Emite credencial verificable (VC 2.0)             │
│ 4. Ancla Merkle root a Ethereum                      │
│ 5. Sella con TSA (RFC 3161)                          │
│ 6. Registra para auditoría                           │
└──────────────────────┬───────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────┐
│         CERTIFICADO + PRUEBA CRIPTOGRÁFICA           │
│ - verificable por cualquiera                         │
│ - permanente (Ethereum + Arweave)                    │
│ - reconocido legalmente (eIDAS, NOM-151)             │
└──────────────────────────────────────────────────────┘
```

🛠️ Herramientas del Servidor

Herramienta Descripción
marco.firmar Firma contenido con ML-DSA-87
marco.verificar Verifica una firma contra el Índice Cero
marco.contextualizar Genera contexto para IA
marco.recordar Guarda una decisión en MEMORY.md
marco.consultar Consulta el Índice Cero (Safe Creative + Ethereum)

🔐 Códigos de Acceso al Núcleo (Android/Deep)

Metáfora de los códigos secretos de Android como llaves maestras del sistema:

· *#*#4636#*#* → Información del teléfono (Telemetría)
· *#*#8255#*#* → GTalk Monitoring (Sincronización de agentes)
· *#*#7780#*#* → Factory Reset (Cierre Digno)

```