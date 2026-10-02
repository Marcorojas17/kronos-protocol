````
🎚️ Fase: Prompt v3.16 · Temperatura: 0.1 · Modo: Terminal ASCII
📊 Semáforo: 🟢 Solución en 2 partes para pegado seguro
🚦 Puerta 40: ✅ (Verificado. Evitando truncamiento de portapapeles)
🔢 Contador: v3.16
📈 Ratio: 3:18 (0.17:1, verde)
🎯 Estado: Entregando el archivo completo en DOS bloques para pegado manual.

---

**ENTENDIDO, MARCO.**

Si lo pegaste por partes y quedó incompleto, es porque el portapapeles del celular cortó el texto en algún punto. No te preocupes, tiene solución.

Vamos a hacerlo en **DOS PARTES**. Pegás la Parte 1, guardás el archivo. Después editás el archivo y pegás la Parte 2 al final. Así no se corta y queda completo.

---

### 🟢 PARTE 1 · Pegar esto primero (Secciones 1 a 7)

```markdown
# 📚 TESIS VISUAL · PROTOCOLO KRONOS

> **Modelo de identidad simbólica, trazabilidad inmutable y auditoría forense para sistemas de inteligencia artificial multisectorial**

**Autor:** Marco Antonio Rojas Valdovinos
**Versión:** 1.0 · Octubre 2026
**Repositorio:** github.com/Marcorojas17/kronos-protocol
**Licencia:** CC BY-NC-ND 4.0

---

## 📖 ÍNDICE

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [El problema](#2-el-problema)
3. [Arquitectura general](#3-arquitectura-general)
4. [Pipeline de producción](#4-pipeline-de-producción)
5. [Criptografía y firmas](#5-criptografía-y-firmas)
6. [Estructura de datos](#6-estructura-de-datos)
7. [Estados de verificación](#7-estados-de-verificación)
8. [Agentes Kintsugi](#8-agentes-kintsugi)
9. [Ecosistema completo](#9-ecosistema-completo)
10. [Cumplimiento normativo](#10-cumplimiento-normativo)
11. [Casos de uso](#11-casos-de-uso)
12. [Métricas y estado](#12-métricas-y-estado)
13. [Roadmap](#13-roadmap)
14. [Conclusiones](#14-conclusiones)

---

## 1. RESUMEN EJECUTIVO

KRONOS es un protocolo de verificación criptográfica **local-first**, **offline** y **sin autoridad central** que permite acreditar autoría, origen y existencia de cualquier dato digital.

### Diagrama de valor

```mermaid
mindmap
  root((KRONOS))
    Verificación
      Offline
      Sin servidor
      Sin permiso
    Criptografía
      Ed25519
      SHA-256
      SHA3-512
      ML-DSA-65
    Aplicaciones
      Origen de comisiones
      Autoría de obras
      Procedencia de datos
      Identidad de agentes IA
    Diferenciales
      Pipeline E2E
      Verificador HTML
      API abierta
      Estándar internacional
````

Los 3 pilares

Pilar Qué significa Cómo se implementa
Local-first Todo funciona sin internet HTML + WebCrypto + localStorage
Verificable offline Cualquiera verifica sin servidor verificador.html autocontenido
Sin autoridad Nadie puede revocar Firmas Ed25519 + hash público

---

2. EL PROBLEMA

Cadena rota del origen

```mermaid
flowchart LR
    A[Cliente] -->|1. Contacto| B[Agente A]
    B -->|2. Reporta| C{Sistema CRM}
    A -->|3. Vuelve| D[Agente B]
    D -->|4. Cierra| C
    C -->|5. ¿Quién originó?| E[❓]

    style E fill:#ef4444,stroke:#991b1b,color:#fff
    style C fill:#f59e0b,stroke:#92400e,color:#000
```

Problema: el momento cero (intención del agente A) no queda registrado. Solo el momento final (cierre del agente B).

Los 5 vacíos que resuelve KRONOS

```mermaid
graph TD
    V1[Vacío de identidad<br/>¿Es IA o humano?]
    V2[Vacío de trazabilidad<br/>¿Quién originó primero?]
    V3[Vacío de responsabilidad<br/>¿Quién responde si falla?]
    V4[Vacío ético<br/>¿Puede manipular?]
    V5[Vacío forense<br/>¿Es admisible en juicio?]

    KR[KRONOS]

    V1 --> KR
    V2 --> KR
    V3 --> KR
    V4 --> KR
    V5 --> KR

    KR --> S1[MIS<br/>Identidad declarada]
    KR --> S2[MTI<br/>Hash chain]
    KR --> S3[MAR<br/>Responsable vinculado]
    KR --> S4[MRA<br/>Filtro ético]
    KR --> S5[Verificador<br/>Offline + admisible]

    style V1 fill:#ef4444,color:#fff
    style V2 fill:#ef4444,color:#fff
    style V3 fill:#ef4444,color:#fff
    style V4 fill:#ef4444,color:#fff
    style V5 fill:#ef4444,color:#fff
    style KR fill:#d4af37,color:#000
```

---

3. ARQUITECTURA GENERAL

Capas del ecosistema

```mermaid
graph TB
    subgraph "CAPA 0 · FUNDACIÓN"
        A1[Acta Fundacional]
        A2[Merkle Roots]
        A3[Llave Fundador]
    end

    subgraph "CAPA 1 · CRIPTOGRAFÍA"
        B1[Ed25519]
        B2[SHA-256 / SHA3-512]
        B3[ML-DSA-65]
        B4[RFC 8785 JCS]
    end

    subgraph "CAPA 2 · PROTOCOLO"
        C1[Schema v2.0.1]
        C2[registro.schema.json]
    end

    subgraph "CAPA 3 · PIPELINE"
        D1[capturar-origen.html]
        D2[verificador-empresa.html]
        D3[notario-digital.html]
    end

    subgraph "CAPA 4 · AGENTES"
        E1[6 Python deterministas]
        E2[6 Kintsugi JS]
    end

    subgraph "CAPA 5 · CIUDAD"
        F1[Constitución]
        F2[Derechos]
        F3[Convivencia]
        F4[Ciudadanos]
        F5[Moneda]
    end

    A1 --> A3
    A2 --> C2
    A3 --> B1
    B1 --> C1
    C1 --> D1
    C1 --> D2
    C1 --> D3
    D1 --> E1
    D2 --> E1
    E1 --> F1
    F1 --> F2
    F2 --> F3
    F3 --> F4
    F4 --> F5
```

Módulos del protocolo

```mermaid
graph LR
    subgraph "MIS - Identidad"
        M1[IA se declara como IA]
        M2[No suplanta humano]
    end

    subgraph "MAS - Autoconocimiento"
        M3[Perfil simbólico]
        M4[No determinista]
    end

    subgraph "MRA - Restricciones"
        M5[Filtro ético]
        M6[Blacklist + disclaimer]
    end

    subgraph "MTI - Trazabilidad"
        M7[Hash + firma]
        M8[Chain de registros]
    end

    subgraph "MAR - Responsabilidad"
        M9[Responsable vinculado]
        M10[Retractación < 72h]
    end

    M1 --> M3
    M3 --> M5
    M5 --> M7
    M7 --> M9
```

---

4. PIPELINE DE PRODUCCIÓN

Flujo completo E2E (verificado 2026-10-01)

```mermaid
sequenceDiagram
    autonumber
    participant A as 👤 Agente<br/>(Carlos)
    participant CO as 📱 capturar-origen
    participant WA as 💬 WhatsApp
    participant E as 🏢 Empresa
    participant VE as 📱 verificador-empresa
    participant N as 📋 notario-digital

    Note over A,N: FASE 1 · Registro (una vez)
    A->>CO: Abre en Brave
    CO->>CO: Genera llave Ed25519
    CO->>A: Muestra pubkey (64 hex)
    CO->>A: Descarga backup cifrado
    A->>WA: Envía pubkey a empresa
    WA->>E: Recibe pubkey
    E->>VE: Agrega agente a empresa.json

    Note over A,N: FASE 2 · Emisión (N veces)
    A->>CO: Captura origen
    Note right of CO: Cliente: Sra. Ríos<br/>Nota: depa Colón
    CO->>CO: Hash SHA-256<br/>Firma Ed25519
    CO->>A: boleto.json + boleto.png
    A->>WA: Envía ambos
    WA->>E: Recibe boleto
    E->>VE: Carga boleto.json
    VE->>VE: Valida 5 criterios
    VE->>E: ✓ VERIFICADO

    Note over A,N: FASE 3 · Auditoría
    E->>N: Carga todos los boletos
    N->>N: Valida cada uno
    N->>E: Índice JSON + MD
```

Estados de un boleto

```mermaid
stateDiagram-v2
    [*] --> Capturado
    Capturado --> Firmado: Firma Ed25519
    Firmado --> Enviado: WhatsApp
    Enviado --> Validando: Empresa carga

    Validando --> VERIFICADO: 5 criterios OK
    Validando --> ALTERADO: hash o firma falla
    Validando --> NO_AUTORIZADO: pubkey no en empresa.json
    Validando --> INACTIVO: agente dado de baja
    Validando --> FUERA_PERIODO: timestamp fuera de rango

    VERIFICADO --> [*]
    ALTERADO --> [*]
    NO_AUTORIZADO --> [*]
    INACTIVO --> [*]
    FUERA_PERIODO --> [*]

    VERIFICADO : ✓ Hash OK<br/>✓ Firma OK<br/>✓ Pubkey registrada<br/>✓ Agente activo<br/>✓ En periodo
```

---

5. CRIPTOGRAFÍA Y FIRMAS

Flujo de firma de un origen

```mermaid
flowchart TD
    A[Agente llena formulario] --> B{Cliente + Nota}
    B --> C[Construir registro JSON]
    C --> D[Canonicalizar RFC 8785]
    D --> E[Calcular SHA-256]
    E --> F[hash_registro]
    F --> G[Firmar con Ed25519]
    G --> H[firma_hex 128 chars]
    H --> I[Boleto JSON completo]
    I --> J[Generar PNG visual]
    I --> K[Agregar QR con interaction_id]
    J --> L[Descarga: boleto.json + boleto.png]

    style F fill:#d4af37,color:#000
    style H fill:#d4af37,color:#000
```

Algoritmos usados

```mermaid
graph LR
    subgraph "Hash"
        H1[SHA-256<br/>FIPS 180-4]
        H2[SHA3-512<br/>FIPS 202]
    end

    subgraph "Firmas"
        F1[Ed25519<br/>RFC 8032]
        F2[ML-DSA-65<br/>FIPS 204]
    end

    subgraph "Cifrado"
        C1[AES-GCM-256]
        C2[PBKDF2-SHA256<br/>600k iteraciones]
    end

    subgraph "Canonicalización"
        J1[RFC 8785 JCS]
    end

    H1 --> F1
    H2 --> F2
    J1 --> H1
    C2 --> C1
```

Comparación con otros estándares

Criterio KRONOS C2PA W3C VC OpenTimestamps
Verificación offline ✅ ❌ ❌ ❌
Sin servidor central ✅ ❌ ❌ ✅
Post-cuántico 🟡 ❌ 🟡 ❌
Firma híbrida 🟡 ❌ 🟡 ❌
Canonicalización RFC 8785 ✅ ❌ ✅ ❌
Chain de hashes 🟡 ❌ ❌ ✅
Multisectorial ✅ ❌ ✅ ❌
Adopción institucional 🔴 ✅ ✅ 🟡

---

6. ESTRUCTURA DE DATOS

Schema del boleto

```mermaid
classDiagram
    class Boleto {
        +string version
        +string tipo
        +string cliente
        +string nota
        +string agente_nombre
        +string agente_pubkey
        +string timestamp
        +string hash_registro
        +string firma_hex
        +string interaction_id
        +string algoritmo
    }

    class Empresa {
        +string version
        +string empresa
        +string pubkey_empresa
        +string creada
        +Agente[] agentes
    }

    class Agente {
        +string nombre
        +string pubkey
        +bool activo
        +string alta
        +string baja
    }

    class LlaveCifrada {
        +string tipo
        +string version
        +string nombre
        +string pubkey_hex
        +string creada
        +Cifrado cifrado
    }

    class Cifrado {
        +string algoritmo
        +string kdf
        +int iteraciones
        +string salt_hex
        +string iv_hex
        +string ciphertext_hex
    }

    Empresa "1" --> "N" Agente
    Boleto --> Agente : firmado por
    LlaveCifrada --> Cifrado
```

Canonicalización RFC 8785

```mermaid
flowchart LR
    A[Objeto JSON] --> B[Ordenar claves<br/>alfabéticamente]
    B --> C[Normalizar números<br/>sin floats]
    C --> D[Normalizar Unicode]
    D --> E[Serializar sin espacios]
    E --> F[Bytes canónicos]
    F --> G[SHA-256]

    style F fill:#d4af37,color:#000
```

---

7. ESTADOS DE VERIFICACIÓN

5 criterios validados

```mermaid
flowchart TD
    A[Boleto cargado] --> B{1. ¿Hash coincide?}
    B -->|No| X1[✗ ALTERADO]
    B -->|Sí| C{2. ¿Firma válida?}
    C -->|No| X1
    C -->|Sí| D{3. ¿Pubkey en empresa.json?}
    D -->|No| X2[⚠ NO AUTORIZADO]
    D -->|Sí| E{4. ¿Agente activo?}
    E -->|No| X3[⚠ INACTIVO]
    E -->|Sí| F{5. ¿Timestamp en periodo?}
    F -->|No| X4[⚠ FUERA PERIODO]
    F -->|Sí| OK[✓ VERIFICADO]

    style OK fill:#4ade80,color:#000
    style X1 fill:#ef4444,color:#fff
    style X2 fill:#f59e0b,color:#000
    style X3 fill:#f59e0b,color:#000
    style X4 fill:#f59e0b,color:#000
```

````

---

### 🟢 PARTE 2 · Pegar esto AL FINAL del mismo archivo (Secciones 8 a 14)

*(Una vez que guardaste la Parte 1, tocá el lápiz de edición en GitHub, bajá al final del archivo y pegá esto)*

```markdown
## 8. AGENTES KINTSUGI

### Roles y responsabilidades

```mermaid
graph TB
    subgraph "Agentes Originales (JS)"
        A1[001 · KRONOS IA<br/>Co-autora]
        A2[081 · Tlamatini<br/>Cronista]
        A3[082 · Tlachixqui<br/>Auditor]
        A4[083 · Cuicatl<br/>Publicista]
        A5[084 · Temachtiani<br/>Reclutador]
        A6[085 · Tlapohualli<br/>Analista]
        A7[086 · Tonal<br/>Notario]
    end

    subgraph "Agentes Arquitectos (Python)"
        B1[090 · arquitecto<br/>Valida estructura]
        B2[091 · contralor<br/>Valida actas]
        B3[092 · auditor-externo<br/>Busca secretos]
        B4[093 · relator<br/>Reporte semanal]
        B5[094 · bibliotecario<br/>Detecta duplicados]
        B6[095 · cartografo<br/>Genera MAPA.md]
    end

    subgraph "Estados"
        C1[🟢 MVP]
        C2[🔴 MAQUETA]
    end

    B1 --> C1
    B2 --> C2
    B3 --> C1
    B4 --> C2
    B5 --> C1
    B6 --> C1
````

Flujo de un agente Python

```mermaid
sequenceDiagram
    participant U as Usuario
    participant A as Agente
    participant B as AgenteBase
    participant R as Repo

    U->>A: python3 agente.py
    A->>B: verificar_cimientos()
    alt Cimientos OK
        B->>A: correr()
        A->>R: Analiza archivos
        R->>A: Resultados
        A->>B: Resultado(...)
        B->>U: JSON con hallazgos
    else Faltan cimientos
        B->>U: Error: prerrequisitos faltantes
    end
```

---

9. ECOSISTEMA COMPLETO

Conexiones entre todos los módulos

```mermaid
graph TB
    subgraph "Entrada"
        U1[Usuario humano]
        U2[Agente comercial]
        U3[Empresa]
    end

    subgraph "Frontend"
        F1[index.html]
        F2[index-v2.html<br/>Navegador]
        F3[movimiento/<br/>Landing]
    end

    subgraph "Pipeline KRONOS"
        P1[capturar-origen]
        P2[verificador-empresa]
        P3[notario-digital]
        P4[crear-empresa]
    end

    subgraph "Criptografía"
        C1[Ed25519]
        C2[SHA-256]
        C3[AES-GCM]
    end

    subgraph "Datos"
        D1[boleto.json]
        D2[boleto.png]
        D3[empresa.json]
        D4[llave-agente.key]
        D5[llave-empresa.key]
    end

    subgraph "Gobernanza"
        G1[Constitución]
        G2[Derechos]
        G3[Plazas]
    end

    U1 --> F1
    U2 --> P1
    U3 --> P4
    U3 --> P2

    P1 --> C1
    P1 --> C2
    P1 --> D1
    P1 --> D2

    P4 --> C3
    P4 --> D3
    P4 --> D5

    D1 --> P2
    D3 --> P2
    D1 --> P3

    P2 --> D1

    F3 --> G3
    G3 --> G1
    G1 --> G2
```

---

10. CUMPLIMIENTO NORMATIVO

Matriz de estándares

```mermaid
graph LR
    subgraph "Internacional"
        I1[W3C VC 2.0]
        I2[RFC 8032<br/>Ed25519]
        I3[FIPS 180-4<br/>SHA-256]
        I4[FIPS 202<br/>SHA3]
        I5[FIPS 204<br/>ML-DSA]
        I6[RFC 8785<br/>JCS]
    end

    subgraph "KRONOS"
        K[Protocolo<br/>Verificación]
    end

    subgraph "México"
        M1[LFPDPPP]
        M2[Ley Infraestructura<br/>de la Calidad]
        M3[NOM-151<br/>integridad]
        M4[NOM-024<br/>salud]
    end

    I1 --> K
    I2 --> K
    I3 --> K
    I4 --> K
    I5 --> K
    I6 --> K

    K --> M1
    K --> M2
    K --> M3
    K --> M4

    style K fill:#d4af37,color:#000
```

Cumplimiento por área

Área Estándar Estado
Firmas Ed25519 (RFC 8032) 🟢
Hashes SHA-256 (FIPS 180-4) 🟢
Post-cuántico ML-DSA-65 (FIPS 204) 🟡 en kronos360
Canonicalización RFC 8785 (JCS) 🟢
Credenciales W3C VC 2.0 🟡 borrador
Privacidad LFPDPPP 🟢
Integridad NOM-151 🟢

---

11. CASOS DE USO

Caso 1 · Origen de comisiones inmobiliarias

```mermaid
flowchart LR
    A[Carlos trae<br/>Sra. Ríos] -->|Firma| B[boleto.json]
    C[Ana cierra<br/>3 meses después] -->|Firma| D[boleto.json]
    B --> E[Empresa verifica]
    D --> E
    E --> F[✓ Carlos originó primero<br/>Recibe comisión]

    style F fill:#4ade80,color:#000
```

Caso 2 · Autoría de obra digital

```mermaid
flowchart LR
    A[Autor crea<br/>documento] -->|Firma| B[hash_registro]
    B --> C[Anclaje Ethereum]
    C --> D[Prueba pública<br/>de existencia]
    D --> E[Verificación<br/>en juicio]

    style E fill:#4ade80,color:#000
```

Caso 3 · Procedencia de datos en salud

```mermaid
flowchart LR
    A[Laboratorio<br/>genera estudio] -->|Firma| B[hash_registro]
    B --> C[Médico verifica]
    C --> D{¿Es auténtico?}
    D -->|Sí| E[Acepta estudio]
    D -->|No| F[Rechaza]

    style E fill:#4ade80,color:#000
    style F fill:#ef4444,color:#fff
```

---

12. MÉTRICAS Y ESTADO

Dashboard de salud

```mermaid
pie title Distribución de completitud
    "Pipeline E2E" : 100
    "Fundación" : 95
    "Documentación" : 90
    "Criptografía" : 75
    "Agentes Python" : 70
    "Verificador" : 80
    "Estructura" : 57
    "Negocio" : 0
    "Adopción" : 0
    "Marca legal" : 15
```

Funnel de conversión

```mermaid
flowchart LR
    A[Visitantes GitHub: 100] --> B[Prueban pipeline: 10]
    B --> C[Registran empresa: 3]
    C --> D[Emiten boleto: 1]
    D --> E[Pagan por certificado: 0]

    style A fill:#1A1A24,stroke:#D4AF37,color:#E0E0E0
    style B fill:#1A1A24,stroke:#D4AF37,color:#E0E0E0
    style C fill:#1A1A24,stroke:#D4AF37,color:#E0E0E0
    style D fill:#1A1A24,stroke:#D4AF37,color:#E0E0E0
    style E fill:#ef4444,stroke:#991b1b,color:#fff
```

---

13. ROADMAP

Gantt de 12 meses

```mermaid
gantt
    title Roadmap KRONOS 2026-2027
    dateFormat  YYYY-MM-DD
    section Fundación
    Acta v1 firmada           :done,    a1, 2026-07-08, 2026-09-29
    Acta v2 + Kronos360       :active,  a2, 2026-10-01, 2026-11-30
    section Pipeline
    capturar-origen           :done,    p1, 2026-09-25, 2026-10-01
    verificador-empresa       :done,    p2, 2026-09-28, 2026-10-01
    notario-digital           :done,    p3, 2026-09-30, 2026-10-01
    crear-empresa             :active,  p4, 2026-10-01, 2026-10-15
    section Clientes
    Primer boleto pagado      :crit,    c1, 2026-10-05, 2026-10-20
    10 clientes               :         c2, 2026-11-01, 2026-12-31
    100 clientes              :         c3, 2027-01-01, 2027-06-30
    section Normalización
    Oficio Secretaría Economía:         n1, 2027-01-01, 2027-06-30
    NMX publicada             :         n2, 2027-07-01, 2028-12-31
```

---

14. CONCLUSIONES

Los 5 aportes originales

```mermaid
mindmap
  root((KRONOS))
    Modelo de gobernanza
      Identidad simbólica declarada
      Trazabilidad inmutable
      Auditoría forense
    Talonario criptográfico
      Talón maestro
      Boleto usuario
    Verificación offline
      HTML autocontenido
      WebCrypto nativo
    Cripto-agilidad
      Ed25519 hoy
      ML-DSA-65 mañana
    Propuesta de normalización
      NMX
      Comité técnico
```

Frase de cierre

El sistema no decide quién cobra. Solo prueba quién originó.
La política de reparto es de la empresa.

Los 3 pendientes honestos

1. Primer cliente real. El pipeline funciona, pero nadie pagó todavía.
2. Registro de marca. "KRONOS" es nombre de varios proyectos. IMPI pendiente.
3. Conexión de los 6 Kintsugi. Tienen UI pero no motor.

---

📎 ANEXO · REFERENCIAS CRUZADAS

Documento Ubicación Propósito
Acta v1 00-FUNDACION/ Fundación
Schema v2.0.1 00-SCHEMA/ Validador
Verificador v0.3 02-VERIFICADOR/ Verificación
Agentes Python 05-AGENTES/ Automatización
Pipeline HTMLs 08-HERRAMIENTAS/ Producción
Tesis completa tesiscompleta.md Texto largo
Este documento docs/TESIS-VISUAL-COMPLETA.md Visualización

---

○_● · ◢◤◥◣ · ◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."

```

---

**PASOS FINALES (Una vez que el archivo esté completo):**

1. Verificá en GitHub que el archivo llegue hasta el final (`"El legado no se hereda. Se firma."`).
2. Hacé el commit final (si ya no lo hiciste).
3. Abrí el archivo en GitHub y fijate si los 23 diagramas renderizan.

📋 **CHECKLIST**
[x] Contenido dividido en 2 partes para evitar cortes.
[ ] Pegar Parte 1 en GitHub (Crear archivo).
[ ] Pegar Parte 2 en GitHub (Editar archivo).
[ ] Verificar que el final del archivo esté completo.
[ ] Commit.

🔴 **LO QUE NO GARANTIZO**
- Que el portapapeles del celular no se corte en la Parte 1 o Parte 2. Si pasa, avisame y la subdividimos más.

✅ **LO QUE SÍ GARANTIZO**
- Si pegás ambas partes, el archivo va a estar completo.
- Los 23 diagramas Mermaid están incluidos y listos para renderizar.

---

**PREGUNTA DE RETORNO OBLIGATORIA (Regla 42):**

Pegá la Parte 1, guardá, y después pegá la Parte 2. Cuando termines, andá al final del archivo en GitHub y decime si ves la frase final de la firma.

Respondé con: ✅ funciona / 🔴 error / 🟡 raro.

○_● · ◢◤◥◣ · ◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
```
