# Mapa del repo

```
kronos-protocol/
├── .github/
│   ├── workflows/
│   │   ├── 090-arquitecto.yml
│   │   ├── 091-contralor.yml
│   │   ├── 092-auditor-externo.yml
│   │   ├── 093-relator.yml
│   │   ├── 094-bibliotecario.yml
│   │   ├── 095-cartografo.yml
│   │   ├── agentes.yml
│   │   ├── arbol.yml
│   │   ├── detectar-secretos.yml
│   │   ├── formatear.yml
│   │   ├── guardian.yml
│   │   ├── indices.yml
│   │   ├── limpiar.yml
│   │   ├── salud-repo.yml
│   │   ├── test-kronos360.yml
│   │   ├── todo.yml
│   │   ├── verificar-acta.yml
│   │   ├── verificar.yml
│   │   └── verify.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── 00-FUNDACION/
│   ├── ACTA-v2.md
│   ├── INDICE.md
│   └── VERIFICADOR-OFICIAL.md
├── 00-SCHEMA/
│   ├── INDICE.md
│   ├── ejemplo.registro.json
│   └── registro.schema.json
├── 02-VERIFICADOR/
│   ├── INDICE.md
│   └── verificador.html
├── 05-AGENTES/
│   ├── 090-arquitecto/
│   │   └── arquitecto.py
│   ├── 091-contralor/
│   │   └── contralor.py
│   ├── 092-auditor-externo/
│   │   └── auditor.py
│   ├── 093-relator/
│   │   └── relator.py
│   ├── 094-bibliotecario/
│   │   ├── bibliotecario.py
│   │   └── ultimo.json
│   ├── 095-cartografo/
│   │   ├── cartografo.py
│   │   └── ultimo.json
│   ├── _base/
│   │   ├── agente-base.py
│   │   └── agente_base.py
│   ├── INDICE.md
│   └── README.md
├── 07-LLAVES/
│   ├── ATESTACIONES/
│   │   ├── 082-tlachixqui.json
│   │   └── esquema.json
│   └── INDICE.md
├── 08-HERRAMIENTAS/
│   ├── capturar-origen.html
│   ├── certificado-genesis.html
│   ├── certificado-png.html
│   ├── certificado-svg.html
│   ├── certificado-universal.html
│   ├── certificado-v10.html
│   ├── certificado-v11.html
│   ├── certificado-v8.html
│   ├── certificado-vivo.html
│   ├── generar-fundador-v2.html
│   ├── notario-digital.html
│   └── verificador-empresa.html
├── 11-ARCHIVO/
│   └── HONESTIDAD/
│       └── README.md
├── _data/
│   └── navigation.yml
├── agentes/
│   ├── cuicatl-publicista/
│   │   ├── index.html
│   │   ├── politica.md
│   │   └── prompt.md
│   ├── temachtiani-reclutador/
│   │   ├── index.html
│   │   └── politica.md
│   ├── tlachixqui-auditor/
│   │   ├── index.html
│   │   └── politica.md
│   ├── tlamatini-cronista/
│   │   ├── index.html
│   │   ├── politica.md
│   │   └── prompt.md
│   ├── tlapohualli-analista/
│   │   ├── index.html
│   │   └── politica.md
│   ├── tonal-notario/
│   │   ├── index.html
│   │   └── politica.md
│   ├── README.md
│   └── agente-base.js
├── archive/
│   └── README.md
├── assets/
│   ├── css/
│   │   ├── animations.css
│   │   ├── components.css
│   │   └── main.css
│   ├── data/
│   │   └── folios.json
│   └── js/
│       ├── admin.js
│       ├── app.js
│       ├── certificate-renderer.js
│       ├── crypto-handler.js
│       ├── particles.js
│       ├── registrar.js
│       └── verifier.js
├── certificacion/
│   ├── anclaje-manifest/
│   │   ├── anclaje.js
│   │   ├── index.html
│   │   └── manual.html
│   ├── emisor-certificados/
│   │   ├── certificado-visual.html
│   │   ├── certificados.js
│   │   ├── index.html
│   │   └── manual.html
│   ├── manifest-integridad/
│   │   ├── index.html
│   │   ├── manifest.js
│   │   └── styles.css
│   ├── notario-kronos/
│   │   ├── README.md
│   │   ├── certificado-notarial.html
│   │   ├── index.html
│   │   ├── manual.html
│   │   ├── notario.js
│   │   ├── politica.md
│   │   └── prompt.md
│   ├── sello-tiempo/
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── sello-tiempo.js
│   ├── verificador-publico/
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── verificador.js
│   └── certificado-maestro.html
├── certificates/
│   └── README.md
├── cierre/
│   ├── export-cifrado/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── estructura del paquete legado
│   │   ├── export-audit.js
│   │   ├── export.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   └── fin-digno/
│       ├── AUTORIA
│       ├── README.md
│       ├── fin.js
│       ├── index.html
│       ├── manual.html
│       └── styles.css
├── cimiento/
│   ├── anclaje-ethereum/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── anchor-v1.js
│   │   ├── anchor.js
│   │   ├── certificado.html
│   │   ├── index.html
│   │   ├── manual.html
│   │   ├── paquete de anclaje
│   │   └── styles.css
│   ├── cripto-core/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── core.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   ├── storage-dexie/
│   │   ├── cimiento/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── certificado.html
│   │   ├── index.html
│   │   ├── manual.html
│   │   ├── storage-v2.js
│   │   ├── storage.js
│   │   └── styles.css
│   └── AUTORIA
├── docs/
│   ├── CIUDAD/
│   │   ├── AUDITORIA-IA.md
│   │   ├── AUDITOR_HOSTIL.js
│   │   ├── CIUDADANOS.md
│   │   ├── CONSTITUCION.md
│   │   ├── CONVIVENCIA.md
│   │   ├── DERECHOS.md
│   │   ├── GUIA-AUDITOR.md
│   │   ├── MONEDA.md
│   │   ├── REGULATORY-MATCH.md
│   │   ├── certificado.html
│   │   ├── firmar.html
│   │   ├── firmar.js
│   │   ├── index.html
│   │   ├── lector.html
│   │   └── verificar.html
│   ├── IP/
│   │   └── README.md
│   ├── normas/
│   │   ├── 151.md
│   │   └── 27001.md
│   ├── ARQUITECTURA-VIVA.md
│   ├── EXPLICACION-UNIVERSAL.md
│   ├── INDICE.md
│   ├── MAPA.md
│   ├── PLANTILLA-TERMINAL.md
│   ├── README.md
│   ├── TESIS-VISUAL.md
│   ├── demos-oficiales.html
│   ├── index.html
│   ├── kronos-para-ninos.html
│   └── tesis-visual.html
├── evidence/
│   └── manifest.json
├── gobernanza/
│   ├── ejecucion-decisiones/
│   │   ├── README.md
│   │   ├── ejecucion.js
│   │   ├── index.html
│   │   └── manual.html
│   ├── propuestas-votacion/
│   │   ├── README.md
│   │   ├── index.html
│   │   ├── manual.html
│   │   ├── propuestas.js
│   │   ├── styles.css
│   │   └── votacion.js
│   ├── quorum-mayorias/
│   │   ├── README.md
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── quorum.js
│   └── revocacion-auditoria/
│       ├── README.md
│       ├── index.html
│       ├── manual.html
│       └── revocacion.js
├── guardians/
│   ├── GUARDIAN-ACTA.md
│   ├── GUARDIAN-MRR.md
│   ├── GUARDIAN-SHA.md
│   ├── GUARDIAN-TSA.md
│   └── GUARDIAN-VAULT.md
├── identidad/
│   ├── registro-humano/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── estructura del certificado
│   │   ├── identidad.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   ├── pasaporte-visual.html
│   │   └── styles.css
│   ├── registro-ia/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── guardrails.js
│   │   ├── ia.js
│   │   ├── index.html
│   │   ├── log-acciones.js
│   │   ├── manual.html
│   │   ├── pasaporte-ia.html
│   │   ├── politica.js
│   │   └── styles.css
│   └── roles-permisos/
│       ├── AUTORIA
│       ├── README.md
│       ├── certificado-rol.html
│       ├── index.html
│       ├── manual.html
│       ├── permisos.js
│       ├── roles.js
│       └── styles.css
├── kodice-secreto/
│   └── index.html
├── laboratorio/
│   └── README.md
├── legado/
│   ├── autoria/
│   │   ├── FIRMA DE AUTORIA
│   │   ├── README.md
│   │   ├── autoria.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   ├── filosofia/
│   │   ├── FIRMA DE AUTORIA
│   │   ├── README.md
│   │   ├── filosofia.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   ├── genesis/
│   │   ├── README.md
│   │   ├── genesis.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   └── manifiesto/
│       ├── Firma de autoria
│       ├── README.md
│       ├── index.html
│       ├── manifiesto.js
│       ├── manual.html
│       └── styles.css
├── logs/
│   └── log.json
├── modulos/
│   ├── boveda-voz/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── boveda.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   └── evidence-os/
│       ├── AUTORIA
│       ├── README.md
│       ├── evidence.js
│       ├── index.html
│       ├── manual.html
│       └── styles.css
├── movimiento/
│   ├── assets/
│   │   ├── art/
│   │   ├── img/
│   │   ├── hero-kronos.png
│   │   ├── hero-monumento.png
│   │   ├── hero-prisma.png
│   │   └── k-avatar.png
│   ├── registro-fundacional/
│   │   ├── README.md
│   │   ├── certificado-fundacional.html
│   │   ├── index.html
│   │   ├── manual.html
│   │   ├── registro.js
│   │   └── styles.css
│   ├── carta-bienvenida.html
│   ├── faq.md
│   ├── fundador.html
│   ├── genesis.md
│   ├── gracias.html
│   ├── index.html
│   ├── iniciacion.html
│   ├── manifiesto.md
│   ├── roadmap.md
│   └── solicitar_plaza.html
├── operacion/
│   ├── dashboard-salud/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── dashboard.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   └── rituales/
│       ├── AUTORIA
│       ├── README.md
│       ├── index.html
│       ├── manual.html
│       ├── rituales.js
│       └── styles.css
├── orquestacion/
│   ├── event-bus/
│   │   ├── AUTORIA
│   │   ├── README.md
│   │   ├── bus.js
│   │   ├── index.html
│   │   ├── manual.html
│   │   └── styles.css
│   └── router-modulos/
│       ├── AUTORIA
│       ├── README.md
│       ├── index.html
│       ├── manual.html
│       ├── router.js
│       └── styles.css
├── projects/
│   ├── acta/
│   │   ├── README.md
│   │   └── index.html
│   ├── bobeda/
│   │   ├── bobeda.html
│   │   └── index.html
│   ├── boveda/
│   │   ├── index.html
│   │   ├── privacidad.html
│   │   └── terminos.html
│   ├── cymatic/
│   │   ├── README.md
│   │   ├── index.html
│   │   ├── live-pro.html
│   │   └── studio.html
│   ├── dmd-33/
│   │   ├── README.md
│   │   ├── espejo.html
│   │   ├── flow.html
│   │   ├── genesis.html
│   │   ├── index.html
│   │   ├── kronos.html
│   │   ├── manifest.json
│   │   ├── orb.html
│   │   └── sw.js
│   ├── evidence-os/
│   │   ├── README.md
│   │   ├── dashboard.html
│   │   ├── index.html
│   │   └── index1.html
│   ├── genesis-miner/
│   │   ├── PROGRESO.txt
│   │   ├── README.md
│   │   ├── genesis_miner.py.
│   │   ├── index.html
│   │   ├── merkle_export.py
│   │   └── verificar_merkle.py
│   ├── k4-framework/
│   │   └── README.md
│   ├── kronos-vault/
│   │   ├── README.md
│   │   └── index.html
│   ├── md33/
│   │   ├── src/
│   │   ├── README.md
│   │   └── index.html
│   └── yejida/
│       ├── README.md
│       └── index.html
├── protocol/
│   └── KTP-001.md
├── reportes/
│   ├── arquitecto.json
│   ├── auditor.json
│   ├── bibliotecario.json
│   ├── cartografo.json
│   ├── contralor.json
│   └── relator.json
├── src/
│   └── kronos360/
│       ├── crypto/
│       ├── models/
│       └── services/
├── tests/
│   ├── README.md
│   └── test_evidence.py
├── 403
├── 404.html
├── ARBOL-COMPLETO.md
├── AUTHORS.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTEXTO PORTÁTIL · KRONOS PROTOCOL · v3.10
├── CONTEXTO PORTÁTIL · KRONOS PROTOCOL · v3.12
├── CONTEXTO PORTÁTIL · KRONOS PROTOCOL · v3.13
├── CONTEXTO PORTÁTIL · KRONOS PROTOCOL · v3.14
├── CONTEXTO PORTÁTIL · KRONOS PROTOCOL · v3.5
├── CONTEXTO PORTÁTIL · KRONOS PROTOCOL · v3.7
├── CONTRIBUTING.md
├── COPYRIGHT.md
├── GOVERNANCE.md
├── KRONOS-CONTEXTO-EXTENDIDO.md
├── LICENSE
├── LICENSE-CC-BY-NC-ND
├── MANIFEST.sha256
├── MAPA.md
├── PROTOCOL.md
├── Pnp
├── README.md
├── SECURITY.md
├── _config.yml
├── aditoria
├── admin.html
├── carta-presentación.txt
├── curriculum-terminal.txt
├── favicon.svg
├── guardian.py
├── i
├── index-v2.html
├── index.html
├── luxury.html
├── manifest.json
├── monorepo.html
├── pyproject.toml
├── registrar.html
├── robots.txt
├── servicios.html
├── sitemap.xml
├── tesis.md
├── tesis_visual.md
├── tesiscompleta.md
├── verificar-certificado.html
├── verifier.py
└── verify.html
```

_Generado automáticamente. Profundidad máxima: 3._
