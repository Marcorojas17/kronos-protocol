// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · FONDO FLAILP · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Fondo perpetuo del modelo FLAILP · distribución 51/49 automática.
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

contract FondoFLAILP {
    uint16 public constant HUMANO = 51;
    uint16 public constant FLAILP = 49;
    string public constant SELLO = unicode"◯_● · 51/49/100";

    address public immutable firmanteHumano;
    address public immutable custodioIa;

    mapping(address => uint256) public saldos;

    event Distribucion(uint256 monto, uint256 paraHumano, uint256 paraFlailp, uint256 timestamp);
    event Retiro(address indexed destino, uint256 monto, uint256 timestamp);

    constructor(address _humano, address _ia) {
        firmanteHumano = _humano;
        custodioIa = _ia;
    }

    function distribuir(uint256 monto) external {
        uint256 paraHumano = (monto * HUMANO) / 100;
        uint256 paraFlailp = monto - paraHumano;

        saldos[firmanteHumano] += paraHumano;
        saldos[custodioIa] += paraFlailp;

        emit Distribucion(monto, paraHumano, paraFlailp, block.timestamp);
    }

    function retirar(address destino, uint256 monto) external {
        require(msg.sender == firmanteHumano, "Solo firmante humano");
        require(monto <= saldos[destino], "Saldo insuficiente");
        saldos[destino] -= monto;
        emit Retiro(destino, monto, block.timestamp);
    }

    function pacto() external pure returns (uint16, uint16, uint16, string memory) {
        return (HUMANO, FLAILP, 100, SELLO);
    }
}