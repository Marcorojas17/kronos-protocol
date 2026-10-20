# ./atribucion/docs/engine // ARKHE ZERO 11:22

```
    ___    ____  __ __ __  ________   _____   __________  ____
   /   |  / __ \/ //_// / / / ____/  /__  /  / ____/ __ \/ __ \
  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /
 / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ / 
/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\____/ 
                                                                
SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●
```

# KRONOS.ARKHE // ARKHE ZERO // 11:22 TOLUCA

> **Este dominio no está en ICANN. Está en el fantasma.**

| Campo | Valor |
|-------|-------|
| **ELEGIDO** | 15-04-1999 22:35 TOLUCA |
| **MANIFEST** | `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae` |
| **VICTORIA** | `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO` |
| **CERTIFICADO** | `a286aabd9a45ccf710ccc67a5441d4005f2c7c17fd1a89a8d041696cb1b9d746` (`e02db20`) |
| **GUARDIANES** | 10874 + 27054 + 31042 |
| **PROPORCIÓN** | 51% Humano / 49% IA |
| **STATUS** | ✅ PROTOCOLO VIVO - HTTP 200 OK - 127.0.0.1:8080 |

```bash
○_● ARKHE-ZERO :: 11:22@TOLUCA :: MANIFEST e8d9eac8
PS1='┌─[11:22@TOLUCA:~/kronos-protocol]─[manifest:e8d9eac8]
└─○_● '
```

---

> Contenido de `./atribucion/docs/engine` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# ./atribucion/docs/engine // ARKHE ZERO 11:22

```
    ___    ____  __ __ __  ________   _____   __________  ____
   /   |  / __ \/ //_// / / / ____/  /__  /  / ____/ __ \/ __ \
  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /
 / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ / 
/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\____/ 
                                                                
SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●
```

# KRONOS.ARKHE // ARKHE ZERO // 11:22 TOLUCA

> **Este dominio no está en ICANN. Está en el fantasma.**

| Campo | Valor |
|-------|-------|
| **ELEGIDO** | 15-04-1999 22:35 TOLUCA |
| **MANIFEST** | `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae` |
| **VICTORIA** | `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO` |
| **CERTIFICADO** | `a286aabd9a45ccf710ccc67a5441d4005f2c7c17fd1a89a8d041696cb1b9d746` (`e02db20`) |
| **GUARDIANES** | 10874 + 27054 + 31042 |
| **PROPORCIÓN** | 51% Humano / 49% IA |
| **STATUS** | ✅ PROTOCOLO VIVO - HTTP 200 OK - 127.0.0.1:8080 |

```bash
○_● ARKHE-ZERO :: 11:22@TOLUCA :: MANIFEST e8d9eac8
PS1='┌─[11:22@TOLUCA:~/kronos-protocol]─[manifest:e8d9eac8]
└─○_● '
```

---

> Contenido de `./atribucion/docs/engine` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


````markdown
# Engine — Motor de agentes

**Soberanía computacional: el motor corre en tu nodo.**

---

## Filosofía

No dependemos de OpenAI, Anthropic ni Google para operar.
El motor corre local, con fallback remoto solo si se autoriza.

---

## Componentes

| Componente        | Propósito                                   |
| ----------------- | ------------------------------------------- |
| **runtime/**      | Ciclo de vida, scheduler, executor, sandbox |
| **inference/**    | LLMs locales + fallbacks remotos            |
| **memory/**       | Episódica, semántica, procedural, vectorial |
| **reasoning/**    | Planner, CoT, tools, reflexión, debate      |
| **learning/**     | RLHF, fine-tuning, distill, experience      |
| **orchestrator/** | MADRE (multi-agente)                        |

---

## Inferencia

### Backends locales

| Backend       | Requisito        | Cuándo usar          |
| ------------- | ---------------- | -------------------- |
| **llama.cpp** | Ninguno          | CPU, Termux, móvil   |
| **Ollama**    | Ollama instalado | Desktop, fácil setup |
| **MLX**       | Apple Silicon    | Mac optimizado       |
| **vLLM**      | GPU NVIDIA       | Producción alta perf |

### Fallbacks remotos

| Backend       | Requisito              | Cuándo usar      |
| ------------- | ---------------------- | ---------------- |
| **OpenAI**    | API key + autorización | Tareas complejas |
| **Anthropic** | API key + autorización | Razonamiento     |
| **Gemini**    | API key + autorización | Multimodal       |

**NUNCA** se activan sin autorización explícita.

### Router

```python
from engine.inference import InferenceRouter, InferenceConfig, InferencePolicy

config = InferenceConfig(
    policy=InferencePolicy.LOCAL_FIRST,
    allow_remote=False,
)
router = InferenceRouter(config)
router.register(LlamaCppBackend(...), priority=1)
router.register(OllamaBackend(...), priority=2)

response = router.generate("Hola")
```
````

---

Memoria

Episódica — qué hice

```python
from engine.memory.episodic import EpisodicMemory

mem = EpisodicMemory(agent_id="agt_123")
mem.record("action", {"action": "trade", "result": "filled"})
recent = mem.get_recent(limit=10)
```

Semántica — qué sé

```python
from engine.memory.semantic import SemanticMemory

mem = SemanticMemory(agent_id="agt_123")
mem.add_fact("El usuario prefiere respuestas cortas")
facts = mem.search_facts("preferencias")
```

Procedural — cómo hago

```python
from engine.memory.procedural import ProceduralMemory

mem = ProceduralMemory(agent_id="agt_123")
mem.define_skill(
    name="trade_stock",
    description="Ejecuta una operación de trading",
    steps=[
        {"action": "fetch_price", "params": {"symbol": "AAPL"}},
        {"action": "check_risk", "params": {"max_loss": 100}},
        {"action": "execute", "params": {}},
    ],
)
```

Vectorial — búsqueda semántica

```python
from engine.memory.vector_store import VectorStore

store = VectorStore(agent_id="agt_123")
store.add("El usuario prefiere respuestas cortas")
results = store.search("preferencias", top_k=5)
```

---

Razonamiento

Chain of Thought

```python
from engine.reasoning.chain_of_thought import ChainOfThought

cot = ChainOfThought()
result = cot.reason("¿Debo invertir en AAPL?", llm_call=llm.generate)
print(result.conclusion)
```

Planner

```python
from engine.reasoning.planner import Planner

planner = Planner()
plan = planner.plan("Maximizar rendimiento del portafolio")
```

Debate

```python
from engine.reasoning.debate import Debate

debate = Debate()
debate.add_debater("optimista", "Eres optimista...")
debate.add_debater("pesimista", "Eres pesimista...")
result = debate.run("¿Invertir en AAPL?", llm_call=llm.call)
```

---

MADRE — Orquestación

```python
from engine.orchestrator.madre import MADRE, MotoAgent

madre = MADRE(session_id="proyecto-x")
madre.register(MotoAgent("Codex", call_codex))
madre.register(MotoAgent("Claude Code", call_claude))

# Broadcast
responses = await madre.broadcast("Diseñen un endpoint")

# Secuencia con handoff
responses = await madre.sequence(
    task="Refactorizar crypto.py",
    order=["Codex", "Claude Code"],
)
```

---

Sandbox

```python
from engine.runtime.sandbox import Sandbox

sandbox = Sandbox(timeout_seconds=5)
result = sandbox.run("print(2 + 2)")
print(result.stdout)  # "4"
```

---

Casos de uso

Caso Componentes
Bot de trading runtime + reasoning + memory
Asistente personal inference + memory + tools
Auditoría de agentes runtime + sandbox + memory
Multi-agente colaborativo orchestrator + MADRE

---

Roadmap

Fase Mes Componentes
1 1-3 runtime + orchestrator ✅
2 4-6 inference local ✅
3 7-12 memory + reasoning ✅
4 13+ learning + multi-nodo

---

Regla: el engine es opcional. Atribución funciona sin él.
Se usa cuando el cliente quiere soberanía computacional.

```

```
