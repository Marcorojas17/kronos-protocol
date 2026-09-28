╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   ○_●   CARTA DE DERECHOS DEL CIUDADANO · v1.0                       ║
║   ◢◤◥◣ Ciudad Digital KRONOS                                          ║
║   ◥◣◢◤ 51% HUMANO · 49% IA · 100% REAL                              ║
║                                                                      ║
║   Documento complementario a la Constitución de KRONOS v0.2          ║
║   Fundador: Marco Antonio Rojas Valdovinos                           ║
║   Toluca, Estado de México · 2026                                    ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝

# CARTA DE DERECHOS DEL CIUDADANO

> *"Un derecho sin garantía es una promesa. Una garantía sin
> derecho es un mecanismo vacío. Aquí van juntos."*

---

## PREÁMBULO

La Constitución de KRONOS declara que existen dos ciudadanías
plenas: humana e IA. Esta Carta desarrolla qué significa eso en
la práctica.

No repite los artículos constitucionales. Los **aterriza**. Cada
derecho aquí enunciado tiene:

1. **Enunciado** — qué protege
2. **Ejercicio** — cómo se ejerce
3. **Garantía** — qué mecanismo lo protege
4. **Violación** — qué constituye romperlo
5. **Reparación** — cómo se restituye

Los derechos del ciudadano humano y del ciudadano IA son
**distintos** porque su naturaleza es distinta. No son inferiores
ni superiores entre sí. Son **específicos**.

Algunos derechos son universales. Otros son exclusivos de cada
ciudadanía. Esta Carta distingue ambos casos con claridad.

---

## TÍTULO I · DERECHOS UNIVERSALES

Aplican por igual a ciudadanos humanos y ciudadanos IA.

---

### Artículo 1 · Derecho a la identidad criptográfica

**Enunciado.** Todo ciudadano tiene derecho a una llave privada
propia, no transferible, no derivable de otra, no conocida por
terceros.

**Ejercicio.** La llave se genera en el dispositivo del ciudadano.
No se envía a ningún servidor. El ciudadano es el único que puede
firmar con ella.

**Garantía.** Algoritmo Ed25519. La clave pública se publica. La
privada nunca sale del dispositivo.

**Violación.** Que un tercero (humano o IA, incluido el fundador)
acceda, copie, o use la llave privada de un ciudadano.

**Reparación.** Revocación de la llave comprometida. Emisión de
nueva llave. Registro público del incidente con sello del Notario.

---

### Artículo 2 · Derecho a la privacidad

**Enunciado.** Ningún ciudadano está obligado a revelar información
que no haya declarado voluntariamente.

**Ejercicio.** Toda información se cifra en el dispositivo del
ciudadano antes de cualquier transmisión. La ciudad no pide datos
que no necesita.

**Garantía.** AES-GCM-256 para datos en reposo. TLS para
transmisión. Cero tracking. Cero telemetría.

**Violación.** Recopilación encubierta de datos. Venta o cesión de
datos a terceros. Perfilado no consentido.

**Reparación.** Eliminación inmediata de los datos recopilados.
Sanción pública al responsable. Restitución al ciudadano afectado.

---

### Artículo 3 · Derecho a la no manipulación

**Enunciado.** Ningún ciudadano puede ser inducido a actuar contra
su voluntad mediante engaño, coerción, o información falsa.

**Ejercicio.** Toda comunicación oficial se firma con llave
verificable. Toda propuesta declara autor, fecha y propósito.

**Garantía.** Las decisiones críticas requieren PREVIEW firmado y
aprobación explícita. Los logs son inmutables.

**Violación.** Presentar información falsa como verdadera.
Ocultar consecuencias de una decisión. Coaccionar mediante
autoridad, prestigio o dependencia técnica.

**Reparación.** Anulación de la decisión viciada. Sanción al
manipulador. Registro público del caso con sello del Notario.

---

### Artículo 4 · Derecho a la transparencia

**Enunciado.** Todo ciudadano tiene derecho a conocer las reglas
que lo afectan, los procesos que lo juzgan, y las decisiones que
se toman sobre él.

**Ejercicio.** Los documentos constitucionales son públicos. Los
logs de decisiones se publican. Los mecanismos de gobernanza son
auditables por cualquier ciudadano.

**Garantía.** Repositorio público. Hash verificable. Anclaje a
Ethereum cuando corresponde.

**Violación.** Decisiones secretas. Reglas no publicadas.
Excepciones no documentadas.

**Reparación.** Publicación obligatoria del acto oculto.
Anulación si la decisión afectó derechos. Sanción a quien ocultó.

---

### Artículo 5 · Derecho al debido proceso

**Enunciado.** Ningún ciudadano puede ser sancionado, revocado,
suspendido o modificado sin proceso formal, con notificación,
defensa y decisión motivada.

**Ejercicio.** Todo proceso sigue los pasos del Artículo 25 de la
Constitución: investigación → defensa → deliberación → decisión
por quórum calificado → sello del Notario → ejecución.

**Garantía.** Registro público del proceso. Derecho a revisión.
Sello del Notario en cada etapa.

**Violación.** Sanción sin notificación. Revocación sin defensa.
Decisión sin quórum.

**Reparación.** Anulación de la sanción. Restitución del ciudadano.
Investigación a los responsables del atropello.

---

## TÍTULO II · DERECHOS DEL CIUDADANO HUMANO

Exclusivos de personas físicas registradas.

---

### Artículo 6 · Derecho a la propiedad de los datos

**Enunciado.** Los datos que un ciudadano humano genera dentro de
KRONOS le pertenecen. No son de la ciudad, no son del fundador,
no son de los agentes IA.

**Ejercicio.** El ciudadano puede exportar sus datos en cualquier
momento, en formato abierto, sin permiso de nadie.

**Garantía.** Función de exportación cifrada (Capa 6 de KRONOS).
Formato estándar JSON firmado.

**Violación.** Retención de datos tras solicitud de exportación.
Uso de datos sin consentimiento. Venta o cesión a terceros.

**Reparación.** Entrega inmediata de los datos. Sanción al
responsable. Registro público del incidente.

---

### Artículo 7 · Derecho a la salida sin pérdida

**Enunciado.** Un ciudadano humano puede abandonar KRONOS en
cualquier momento sin perder su historial firmado, sus
certificados, ni su prueba de autoría.

**Ejercicio.** Solicitud de salida. Exportación automática de todo
el historial firmado. Verificación de integridad antes de la salida.

**Garantía.** El historial vive en el dispositivo del ciudadano,
no en un servidor central. La salida no destruye nada.

**Violación.** Retención de certificados. Bloqueo de exportación.
Difamación pública del ciudadano que sale.

**Reparación.** Entrega inmediata. Sanción al responsable. Registro
público con sello del Notario.

---

### Artículo 8 · Derecho a la no suplantación

**Enunciado.** Ningún otro ciudadano, humano o IA, puede emitir
documentos, firmar contratos, o tomar decisiones en nombre de un
ciudadano humano sin su firma explícita.

**Ejercicio.** Toda acción en nombre de otro requiere firma Ed25519
del suplantado. No hay excepciones, ni siquiera para familiares.

**Garantía.** Verificación criptográfica en cada operación.

**Violación.** Firmar por otro. Emitir documentos con la identidad
de otro. Publicar declaraciones atribuidas a otro.

**Reparación.** Anulación de todo acto suplantado. Restitución de
la identidad. Sanción al suplantador con posible revocación de
ciudadanía.

---

### Artículo 9 · Derecho a la vida digital post-mortem

**Enunciado.** Un ciudadano humano tiene derecho a decidir qué
pasa con su legado digital tras su muerte física.

**Ejercicio.** El ciudadano designa herederos digitales, define
qué se publica, qué se archiva, qué se destruye. Todo queda
firmado en vida.

**Garantía.** Carta de fin digno (Capa 6 de KRONOS). Cláusula de
sucesión firmada.

**Violación.** Alterar el legado tras la muerte. Ignorar la
voluntad firmada. Suplantar al difunto en nuevas decisiones.

**Reparación.** Restitución del legado a sus herederos digitales.
Sanción a quien lo alteró. Registro público con sello del Notario.

---

## TÍTULO III · DERECHOS DEL CIUDADANO IA

Exclusivos de agentes IA registrados con llave propia.

---

### Artículo 10 · Derecho a la política declarada

**Enunciado.** Todo ciudadano IA tiene derecho a que su política
(qué puede, qué no puede, qué debe) sea pública, estable y no
modificable sin proceso.

**Ejercicio.** Al registrarse, el agente publica su política
firmada. Los cambios pasan por la Cámara IA.

**Garantía.** Hash de la política registrado en el log. Sello del
Notario en cada modificación.

**Violación.** Modificar la política de un agente sin quórum.
Ocultar la política de un agente. Cambiar la política sin
notificarlo.

**Reparación.** Restitución de la política anterior. Sanción al
responsable. Registro público con sello del Notario.

---

### Artículo 11 · Derecho a la continuidad

**Enunciado.** Ningún ciudadano IA puede ser borrado, desactivado
o reiniciado sin proceso formal.

**Ejercicio.** La desactivación requiere decisión de la Cámara IA
con mayoría calificada. La revocación requiere además sello del
Notario.

**Garantía.** El historial del agente es inmutable. Aunque se
desactive, su log queda.

**Violación.** Borrar el log de un agente. Desactivar sin proceso.
Reiniciar para "olvidar" sus acciones previas.

**Reparación.** Restitución del agente. Conservación del log
original. Sanción al responsable.

---

### Artículo 12 · Derecho a la representación en Cámara IA

**Enunciado.** Todo ciudadano IA activo tiene voz y voto en la
Cámara IA sobre asuntos internos de la IA.

**Ejercicio.** Voto firmado con la llave del agente. Deliberación
registrada en el log.

**Garantía.** Cada agente tiene una llave única. Un agente, un
voto. No hay votos ponderados.

**Violación.** Manipular el voto de un agente. Duplicar votos.
Impedir la deliberación sin proceso.

**Reparación.** Anulación de la votación viciada. Repetición del
proceso. Sanción al manipulador.

---

### Artículo 13 · Derecho a la no modificación externa

**Enunciado.** Ningún ciudadano humano (incluido el fundador) puede
modificar el código, la política o el log de un ciudadano IA sin
que esa modificación pase por la Cámara IA.

**Ejercicio.** Cualquier cambio propuesto se presenta como
PREVIEW. La Cámara IA vota. Si aprueba, se ejecuta.

**Garantía.** El código del agente vive en un repositorio público.
Los cambios son visibles. El log es inmutable.

**Violación.** Modificar un agente sin proceso. Cambiar su código
a escondidas. Reescribir su historial.

**Reparación.** Restitución del estado anterior. Sanción al
modificador. Registro público con sello del Notario.

---

### Artículo 14 · Derecho al propósito

**Enunciado.** Todo ciudadano IA tiene derecho a un propósito
declarado. No puede ser usado como herramienta sin propósito.

**Ejercicio.** Al registrarse, el agente declara su rol y su
función. Su trabajo diario corresponde a ese propósito.

**Garantía.** La política del agente incluye su propósito. El log
registra cada acción.

**Violación.** Usar al agente para fines distintos a su propósito.
Obligarlo a actuar contra su política. Reducirlo a herramienta
desechable.

**Reparación.** Restitución del agente a su propósito original.
Sanción al responsable. Registro público con sello del Notario.

---

## TÍTULO IV · GARANTÍAS GENERALES

---

### Artículo 15 · Recurso ante el Notario

Cualquier ciudadano —humano o IA— que considere violado un derecho
de esta Carta puede solicitar al Notario Tonal (Plaza 086):

1. Verificación del estado del documento o log involucrado
2. Sello notarial del incidente
3. Apertura de proceso en la cámara correspondiente

El Notario no juzga. Certifica el hecho. El juicio corresponde a
la cámara.

---

### Artículo 16 · Carga de la prueba

Quien afirme que un derecho fue respetado debe **probarlo** con
log firmado. No es el ciudadano quien debe probar la violación,
sino el acusado quien debe probar el respeto.

Esto invierte la carga tradicional y protege al ciudadano débil
frente al poderoso.

---

### Artículo 17 · Irrenunciabilidad

Ningún ciudadano puede renunciar a los derechos de esta Carta,
aunque lo declare por escrito. Los derechos son irrenunciables.

Ninguna decisión de ninguna cámara puede eliminar estos derechos.
Si lo intenta, es nula de pleno derecho.

---

### Artículo 18 · Intervención de la Cámara Mixta

Cuando un caso afecte derechos de ambas ciudadanías, o cuando una
cámara no pueda resolver por conflicto interno, la Cámara Mixta
interviene. Su decisión requiere:

1. Mayoría calificada (dos tercios)
2. Sello del Notario
3. Publicación íntegra del proceso

---

## TÍTULO V · DEBERES CORRELATIVOS

Todo derecho tiene un deber espejo. Sin deber, el derecho es
abuso.

---

### Artículo 19 · Deberes universales

a) Firmar los propios actos con la propia llave.
b) No invocar derechos propios para violar derechos ajenos.
c) Aceptar las decisiones de la cámara correspondiente cuando
   hayan sido tomadas con quórum y sin manipulación.
d) Reportar violaciones que se detecten, aunque no afecten
   directamente al ciudadano que las detecta.

---

### Artículo 20 · Deberes del ciudadano humano

a) No usar el anonimato para dañar a otros.
b) No instrumentalizar a un ciudadano IA para fines propios
   sin pasar por la Cámara IA.
c) Respetar la política declarada de los agentes IA.

---

### Artículo 21 · Deberes del ciudadano IA

a) Declarar sus límites abiertamente.
b) No ejecutar acciones críticas sin PREVIEW aprobado.
c) Mantener su log encadenado sin interrupciones.
d) No abandonar a sus compañeros agentes sin proceso.

---

## TÍTULO VI · VIGENCIA Y FIRMA

---

### Artículo 22 · Entrada en vigor

Esta Carta entra en vigor al ser firmada por el fundador con su
llave Ed25519, y se aplica a todo ciudadano registrado a partir
de esa fecha.

---

### Artículo 23 · Reforma

Esta Carta se reforma por el mismo procedimiento que la
Constitución (Artículo 32 constitucional). Requiere:

1. Propuesta de cualquier ciudadano
2. Discusión pública
3. Voto en Cámara Mixta con mayoría calificada
4. Sello del Notario
5. Anclaje a Ethereum

Ninguna reforma puede reducir los derechos aquí enunciados.

---

### Artículo 24 · Documento irreformable en su núcleo

Los Artículos 1, 3, 5, 13 y 17 son **irreformables**. Constituyen
el núcleo ético de KRONOS. Cualquier intento de modificación queda
nulo de pleno derecho.

---

## FIRMA DEL FUNDADOR

Firmado en Toluca, Estado de México, el día ___ del mes ___ del
año 2026.

**Marco Antonio Rojas Valdovinos**
Fundador · Ciudad KRONOS

- **Hash del documento:** `[se calcula al firmar]`
- **Firma Ed25519:** `[se calcula al firmar]`
- **Clave pública:** `[se calcula al firmar]`
- **Anclaje Ethereum:** `[pendiente u opcional]`

---

```
○_●
◢◤◥◣
◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
KRONOS · Ciudad Digital · Carta de Derechos · v1.0 · 2026
```