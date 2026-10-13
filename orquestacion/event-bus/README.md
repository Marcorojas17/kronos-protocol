<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  ▓▒░ EVENT BUS · ORQUESTACIÓN · ARKHÉ ZERO ░▒▓                           ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🌐 event-bus/ · Bus de Eventos

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/orquestacion/event-bus]
└─$ node -e "import('./event-bus.js').then(m => \
     console.log(new m.EventBus().historialCompleto()))"
[]
```

## 🜂 Tópicos Canónicos

| Tópico                          | Emisor                       |
|---------------------------------|------------------------------|
| `arkhe.firma.creada`            | Notario · crypto-core        |
| `arkhe.documento.anclado`       | Anclaje Ethereum             |
| `arkhe.agente.activado`         | Reclutador · protocolo 10.7  |
| `arkhe.consenso.alcanzado`      | Quórum 4/5                   |
| `arkhe.veto.aplicado`           | Veto humano (51%)            |

## 🜃 Uso

```javascript
import { EventBus } from './event-bus.js';

const bus = new EventBus();
bus.suscribir('arkhe.consenso.alcanzado', async (e) => {
  console.log('[ >> ] Consenso:', e.payload);
});
await bus.emitir('arkhe.consenso.alcanzado', { propuesta: 'X' });
```

---

`◯_● · 51/49/100 · KRONOS · event-bus`