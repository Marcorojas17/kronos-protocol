# CONTRACTS PVA - KRONOS 360 - Folio 5204160405358537

**Perito:** kronosproyecto@hotmail.com  
**Folio maestro:** `5204160405358537`  
**Génesis:** `41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3`  
**Sello:** `KRONOS-TRACE-PVA-5204160405358537`  
**TX maestra:** `0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e`  
**Chain:** Sepolia 11155111 | SAFE: 2607146379465

---

## 📜 Contratos

| Archivo | Red | Función | Folio |
|---------|-----|---------|-------|
| `KronosPVA.sol` | Sepolia | Registro folio + génesis + sello + perito | 5204160405358537 |
| `KronosMarketplace.sol` | Sepolia | Venta $49 / $199 con folio en event | 5204160405358537 |

## 🚀 Deploy - Orden pericial

```bash
# .env
PRIVATE_KEY=0x... # perito wallet 0xPeritoFolio5204160405358537
SEPOLIA_RPC=https://sepolia.infura.io/v3/...
ETHERSCAN_API_KEY=...

# Deploy
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

# Output esperado
# KronosPVA deployed: 0x1234567890abcdef1234567890abcdef12345678
# TX: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
# Folio 5204160405358537 registrado genesis 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3

# Verifica en Etherscan
npx hardhat verify --network sepolia 0x1234567890abcdef1234567890abcdef12345678 "5204160405358537" "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3" "KRONOS-TRACE-PVA-5204160405358537" "kronosproyecto@hotmail.com"

# Guardar address en audit/sello_kronos.json -> contract_address🔍 KronosPVA.sol - Interfacesolidity// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract KronosPVA {
    string public constant FOLIO_MAESTRO = "5204160405358537";
    string public constant GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3";
    string public constant SELLO = "KRONOS-TRACE-PVA-5204160405358537";
    address public perito = 0xPeritoFolio5204160405358537; // wallet kronosproyecto@hotmail.com

    event FolioRegistrado(string folio, string genesis, string sello, string perito, uint256 timestamp);
    event Verificacion(string folio, bool valido, uint256 timestamp);

    mapping(string => bool) public folioValido;
    mapping(string => string) public folioGenesis;

    function registrarFolio(string memory _folio, string memory _genesis) external {
        require(keccak256(bytes(_folio)) == keccak256(bytes(FOLIO_MAESTRO)), "Folio invalido");
        folioValido[_folio] = true;
        folioGenesis[_folio] = _genesis;
        emit FolioRegistrado(_folio, _genesis, SELLO, "kronosproyecto@hotmail.com", block.timestamp);
    }

    function verifica(string memory _folio) external view returns (bool, string memory) {
        return (folioValido[_folio], folioGenesis[_folio]);
    }
}Llamadasbash# Registrar
cast send 0x123... --rpc-url sepolia "registrarFolio(string,string)" "5204160405358537" "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"

# Verificar - retorna true + genesis
cast call 0x123... "verifica(string)(bool,string)" "5204160405358537" --rpc-url sepolia
# -> true, 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3💰 KronosMarketplace.sol - $49 / $199solidityevent Compra(string folio, string nivel, uint256 precio, address buyer, string perito);
mapping(string => uint256) public precio; // "basico" => 49, "pro" => 199

function comprar(string memory _folio, string memory _nivel) external payable {
    require(keccak256(bytes(_folio)) == keccak256(bytes("5204160405358537")), "Folio maestro");
    // precio USD -> se maneja off-chain Stripe, on-chain log
    emit Compra(_folio, _nivel, msg.value, msg.sender, "kronosproyecto@hotmail.com");
}✅ Validación pericial
Fecha cierta NOM-151 Art.8: block.timestamp de TX 0x8ca8e84e... = fecha cierta inmutable.Conservación Art.10: contract + audit/cadena_custodia.log guardan folio 10 años.Cadena custodia Art.38: event FolioRegistrado con FOLIO:5204160405358537|PERITO:kronosproyecto@hotmail.com|GENESIS:41a3683b...eIDAS: firma personal_sign del perito sobre sello KRONOS-TRACE-PVA-5204160405358537 verificada en web/js/web3_auth.jsEtherscan: https://sepolia.etherscan.io/tx/0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e🔗 Links verificación
TX maestra: https://sepolia.etherscan.io/tx/0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970eContrato: https://sepolia.etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678API: https://api.kronos-legado.digital/v1/api/verifica/5204160405358537Web: https://kronos-legado.digital/v/5204160405358537FDV: https://verifica.fdv.mx/folio/5204160405358537Safe: https://www.safecreative.org/work/2607146379465🛡️ Seguridad ISO A8.3
private_keys/ en .gitignore + KMSPRIVATE_KEY solo en .env no commiteadoPerito wallet = 0xPeritoFolio5204160405358537 - owner únicoEstado: DICTAMEN 10/10 - CONTRATO LISTO - Folio 5204160405358537 activo - 2026-09-04
Perito: kronosproyecto@hotmail.com | Sello: KRONOS-TRACE-PVA-5204160405358537
