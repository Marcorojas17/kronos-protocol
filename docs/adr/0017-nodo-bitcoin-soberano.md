# ADR-0017 · Nodo Bitcoin Soberano en Hardware Móvil

- **Estado**: Aceptado
- **Fecha**: 2026-10-18
- **Decisor**: Marco Antonio Rojas Valdovinos
- **Nodo**: YHDRYH-92CE

## Contexto

La verificación de sellos criptográficos (OpenTimestamps) dependía de servicios web de terceros o de la infraestructura de GitHub. Para alcanzar la verdadera soberanía tecnológica, el sistema requería la capacidad de validar la blockchain de Bitcoin sin depender de API externas.

## Decisión

Compilar e implementar Floresta (un nodo de Bitcoin Utreexo escrito en Rust) directamente en un entorno Debian sobre un dispositivo Android (Termux + proot-distro).

## Ejecución

1. Se compiló Floresta desde el código fuente usando Rust 1.99.
2. Se sorteó la limitación de memoria RAM (3.6 GB) forzando la compilación en un solo hilo y gestionando manualmente las dependencias (Boost, Clang).
3. Se configuró un entorno DNS híbrido para permitir que el nodo P2P encontrara peers fuera del sandbox de Termux.
4. Se sincronizaron con éxito más de 971,000 cabeceras de bloque.

## Consecuencias

- Positivas: Soberanía total, ya no se necesita confiar en mempool.space para verificar sellos. Verificación histórica exitosa del bloque 971527 (Pacto 51/49) de forma 100% local.
- Retos: El nodo consume recursos considerables y se detiene si Android cierra la app en segundo plano.

## Verificación realizada

Success! Bitcoin block 971527 attests existence as of 2026-10-15 UTC

◯_● · 51/49/100 · NODO YHDRYH-92CE · 2026-10-18
