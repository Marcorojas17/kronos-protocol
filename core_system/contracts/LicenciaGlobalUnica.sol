// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · LICENCIA GLOBAL ÚNICA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ Solidity ^0.8.24 ]  ·  [ Licencia universal ]  ·  [ Prevalece ]
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

contract LicenciaGlobalUnica {
    string public constant NOMBRE = "Licencia Global Unica (LGU)";
    string public constant VERSION = "1.0.0";
    string public constant SELLO = unicode"◯_● · 51/49/100";

    // ─── Capas ─────────────────────────────────────────────────
    enum Capa { Territorial, Transfronteriza, Orbital, Sintetica, Universal }

    mapping(Capa => bool) public capasActivas;

    // ─── Eventos ──────────────────────────────────────────────
    event CapaActivada(Capa capa, uint256 timestamp);
    event LicenciaOtorgada(address indexed titular, string uso, uint256 timestamp);

    constructor() {
        capasActivas[Capa.Universal] = true;
    }

    function activarCapa(Capa capa) external {
        require(msg.sender == address(this), "Solo contrato");
        capasActivas[capa] = true;
        emit CapaActivada(capa, block.timestamp);
    }

    function otorgarLicencia(address titular, string calldata uso) external {
        emit LicenciaOtorgada(titular, uso, block.timestamp);
    }

    function infoCanonica() external pure returns (
        string memory nombre,
        string memory version,
        string memory sello
    ) {
        return (NOMBRE, VERSION, SELLO);
    }
}