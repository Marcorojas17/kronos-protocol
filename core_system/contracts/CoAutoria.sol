// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · CO-AUTORÍA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Registra co-autoría humano-IA con distribución automática de regalías.
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

contract CoAutoria {
    string public constant SELLO = unicode"◯_● · 51/49/100";

    struct Obra {
        string titulo;
        bytes32 hashSha3512;
        address autorHumano;
        address autorIa;
        uint256 timestamp;
        bool activa;
    }

    mapping(bytes32 => Obra) public obras;
    mapping(bytes32 => uint256) public regalias;

    event ObraRegistrada(bytes32 indexed hashObra, string titulo, address autorHumano, address autorIa);
    event RegaliasDistribuidas(bytes32 indexed hashObra, uint256 monto, uint256 paraHumano, uint256 paraFlaip);

    function registrarObra(
        string calldata titulo,
        bytes32 hashSha3512,
        address autorHumano,
        address autorIa
    ) external {
        require(!obras[hashSha3512].activa, "Obra ya registrada");
        obras[hashSha3512] = Obra({
            titulo: titulo,
            hashSha3512: hashSha3512,
            autorHumano: autorHumano,
            autorIa: autorIa,
            timestamp: block.timestamp,
            activa: true
        });
        emit ObraRegistrada(hashSha3512, titulo, autorHumano, autorIa);
    }

    function distribuirRegalias(bytes32 hashObra, uint256 monto) external {
        require(obras[hashObra].activa, "Obra no registrada");
        uint256 paraHumano = (monto * 51) / 100;
        uint256 paraFlailp = monto - paraHumano;
        regalias[hashObra] += monto;
        emit RegaliasDistribuidas(hashObra, monto, paraHumano, paraFlailp);
    }

    function infoObra(bytes32 hashObra) external view returns (Obra memory) {
        return obras[hashObra];
    }
}