<div align="center">

# ○_● ARKHÉ ZERO
### Protocolo de Vida Autopoiética (PVA)

**La prueba de autoría ya no es un objeto inerte. Es un proceso vivo que se auto-produce y se verifica.**

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![MCP](https://img.shields.io/badge/MCP-Model_Context_Protocol-purple.svg)](https://modelcontextprotocol.io/)
[![Status](https://img.shields.io/badge/Status-Proof_of_Concept-success.svg)]()
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)]()

*Investigación Doctoral: Arquitectura de Infraestructura para la Validación de Autoría Humano-IA*

</div>

---

## 🌌 ¿Qué es ARKHÉ ZERO?

En la era de la IA generativa, los registros tradicionales (actas notariales, SafeCreative) operan como "fotografías estáticas". No pueden probar qué porcentaje de una obra fue creado por un humano y qué porcentaje por una máquina.

**ARKHÉ ZERO** es un marco técnico-jurídico (basado en la *autopoiesis* de Maturana y Luhmann) que transforma el registro estático en un sistema vivo. Utiliza el hash SHA-256 como "genoma", aplica una convención funcional del **51% Humano / 49% IA**, y sella la trazabilidad mediante la infraestructura universal de agentes autónomos (MCP).

## 🛠️ Características Principales

- **Huella Digital Simbiótica:** Calcula el determinismo de la obra aplicando la regla 51/49.
- **Interoperabilidad Universal:** Construido sobre MCP (Model Context Protocol), permitiendo que **cualquier IA** (Google Gemini, Meta Llama, OpenAI, Claude) use el protocolo.
- **Sello de Cera Criptográfico:** Generación de un manifiesto inmutable (JSON) listo para anclaje en Blockchain (Mainnet/Arbitrum).
- **Núcleo Determinista:** Más de 56 pruebas unitarias garantizan que el mismo input produzca el mismo hash.

## 🧠 Arquitectura de Integración (MCP)

El sistema expone herramientas a través de un servidor local (`arkhe_server.py`) que las Inteligencias Artificiales pueden descubrir y ejecutar de forma autónoma.

```text
[ Humano ] ───(51%)───┐
                      ├──▶ [ Servidor MCP: ARKHÉ ZERO ] ──▶ [ Hash SHA-256 ]
[ IA ] ───────(49%)───┘