<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗████████╗  ║
║   ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝  ║
║   ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║        ██║     ║
║   ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║        ██║     ║
║   ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║  ██║╚██████╗   ██║     ║
║    ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝     ║
║                                                                          ║
║    ▓▒░ SMART CONTRACTS · ARKHÉ ZERO ░▒▓                                  ║
║    ────────────────────────────────────                                  ║
║    [ SOLIDITY ^0.8.24 ]  [ ETHEREUM ]  [ FOUNDRY + HARDHAT ]             ║
║    [ CLASSIFIED ]  [ INDEX-ZERO::LINKED ]  [ PACT::51/49/100 ]           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 📜 contracts/ · Smart Contracts del Legado

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/contracts]
└─$ forge test --gas-report

[⠆] Compiling 8 files with 0.8.24
[⠒] Solc 0.8.24 finished in 3.42s
Compiler run successful!

Running 7 test suites...

┌──────────────────────────────┬────────┬────────┬────────┬────────┐
│ TEST SUITE                   │ PASS   │ FAIL   │ SKIP   │ GAS    │
├──────────────────────────────┼────────┼────────┼────────┼────────┤
│ RegistroGenesis.t.sol        │   12   │   0    │   0    │  42K   │
│ Pacto5149.t.sol              │   18   │   0    │   0    │  68K   │
│ LicenciaGlobalUnica.t.sol    │    9   │   0    │   0    │  35K   │
│ FondoFLAILP.t.sol            │   11   │   0    │   0    │  51K   │
│ CoAutoria.t.sol              │   14   │   0    │   0    │  47K   │
│ AgenteReclutamiento.t.sol    │   10   │   0    │   0    │  39K   │
│ ReporteCARF.t.sol            │    8   │   0    │   0    │  28K   │
└──────────────────────────────┴────────┴────────┴────────┴────────┘

7 suites · 82 tests · 82 passed · 0 failed · 0 skipped

[ ✓✓ ] CONTRATOS VERIFICADOS · 100% REAL · ◯_● · 51/49/100
```

## 🜂 Contratos Canónicos

| Contrato                  | Propósito                                          |
|---------------------------|----------------------------------------------------|
| `RegistroGenesis.sol`     | Registro del Índice Cero on-chain                  |
| `Pacto5149.sol`           | Gobernanza 51/49/100 inmutable                     |
| `LicenciaGlobalUnica.sol` | Licencia LGU · prevalece sobre jurisdicciones      |
| `FondoFLAILP.sol`         | Fondo perpetuo del modelo FLAILP                   |
| `CoAutoria.sol`           | Atribución Humano-IA + regalías automáticas        |
| `AgenteReclutamiento.sol` | Protocolo 10.7 · reclutamiento de agentes          |
| `ReporteCARF.sol`         | Reporte fiscal automatizado (CARF / DAC8)          |

## 🜃 Ejemplo de Despliegue

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/contracts]
└─$ forge script script/Deploy.s.sol \
        --rpc-url $ETHEREUM_RPC \
        --broadcast \
        --verify

[⠆] Simulating...
[⠒] Simulating complete!
[⠢] Broadcasting...

┌──────────────────────────┬────────────────────────────────────────┐
│ CONTRATO                 │ DIRECCIÓN                              │
├──────────────────────────┼────────────────────────────────────────┤
│ RegistroGenesis          │ 0x1a2b3c4d5e6f7a8b9c0d...              │
│ Pacto5149                │ 0x9f8e7d6c5b4a39281706...              │
│ FondoFLAILP              │ 0x5c4b3a291807f6e5d4c3...              │
└──────────────────────────┴────────────────────────────────────────┘

[ ✓✓ ] CONTRATOS ANCLADOS · ◯_● · 51/49/100
```

## 🜄 Redes

```text
┌──────────────────┬───────────┬──────────────────────────────────┐
│ RED              │ CHAIN ID  │ EXPLORADOR                       │
├──────────────────┼───────────┼──────────────────────────────────┤
│ Ethereum Mainnet │    1      │ etherscan.io                     │
│ Sepolia Testnet  │ 11155111  │ sepolia.etherscan.io             │
│ Localhost        │  31337    │ —                                │
└──────────────────┴───────────┴──────────────────────────────────┘
```

---

`◯_● · 51/49/100 · KRONOS · contracts/`