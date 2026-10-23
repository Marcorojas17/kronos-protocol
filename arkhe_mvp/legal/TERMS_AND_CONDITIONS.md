# TÉRMINOS Y CONDICIONES DE USO DE LA PLATAFORMA Y API KRONOS PROTOCOL

**PROPIEDAD DE MARCO ANTONIO ROJAS VALDOVINOS** (Registro Safe Creative No. 2608096674952)

Los presentes Términos y Condiciones regulan el acceso, conexión y uso de la infraestructura tecnológica, APIs y servicios de validación digital operados bajo la arquitectura KRONOS PROTOCOL, KRONOS ID y FDV ORIGINAL SYSTEM.

## 1. DESCRIPCIÓN DEL SERVICIO Y ARQUITECTURA
KRONOS PROTOCOL provee una infraestructura de Capa de Confianza Legal (Legal Trust Layer) diseñada para la validación de folios de autenticidad mediante la arquitectura técnica FVD-(MARCA)-00001 utilizando endpoints bajo protocolo API REST. El sistema opera bajo principios de Zero-Knowledge: no almacena ni duplica archivos físicos, únicamente procesa firmas hash criptográficas SHA-256 e inyecta estampas de tiempo inmutables.

## 2. RESERVA DE PROPIEDAD INTELECTUAL
La totalidad del software, código ejecutable, código fuente, scripts de despliegue, algoritmos y marcas registradas (KRONOS ID, KRONOS PROTOCOL) son propiedad exclusiva de Marco Antonio Rojas Valdovinos, bajo el registro madre de Safe Creative No. 2608096674952. Queda prohibida la extracción de metadatos, hacking o uso comercial sin contrato previo.

## 3. SOBERANÍA Y PROPIEDAD DE LOS DATOS DEL USUARIO
El usuario retiene el 100% de la propiedad intelectual sobre los activos. Al generar un hash SHA-256 irreversible, la plataforma actúa como testigo matemático e inmutable del documento.

## 4. POLÍTICA DE ESTADO BINARIO CRIPTOGRÁFICO E INMUTABILIDAD DEL ESTADO ROJO 1
El núcleo lógico se rige por dos estados:
- **Estado [VERDE 0]:** Folio activo, verificado e íntegro.
- **Estado [ROJO 1]:** Folio revocado. El uso del endpoint `/revoke` genera un cambio de bit permanente y destructivo. Una vez en ROJO 1, se bloquea matemáticamente el retorno a VERDE 0.

## 5. RESPONSABILIDAD LIMITADA
La plataforma certifica criptográficamente que la huella digital existía en una fecha y hora determinada. No valida la veracidad intrínseca, legalidad o moralidad del contenido original.

## 6. LEGISLACIÓN APLICABLE
Se rige por las leyes mercantiles de la República Mexicana. Controversias resueltas en tribunales de Toluca, Estado de México.
