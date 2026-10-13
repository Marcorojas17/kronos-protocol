// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · REGISTRO GENESIS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ Solidity ^0.8.24 ]  ·  [ Ethereum ]  ·  [ inmutable ]
 *  Almacena el Índice Cero y permite verificación pública.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/contracts]
 *  └─$ forge test --match-contract RegistroGenesis
 *     [PASS] test_IndiceCeroCanonico() (gas: 21000)
 *     [PASS] test_AnclarDocumento() (gas: 68234)
 *     [PASS] test_VetoHumano() (gas: 24000)
 *     Suite result: ok. 3 passed; 0 failed
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

contract RegistroGenesis {
    // ─── Índice Cero (INMUTABLE) ──────────────────────────────
    string public constant SAFE_CREATIVE_ARQ = "2607146379465";
    string public constant SAFE_CREATIVE_CO  = "2607086319439";
    bytes32 public constant SHA256_INDEX_ZERO =
        0xf03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112;

    // ─── Gobernanza ───────────────────────────────────────────
    uint8 public constant HUMANO = 51;
    uint8 public constant IA     = 49;
    uint8 public constant REAL   = 100;
    string public constant SELLO = unicode"◯_● · 51/49/100";

    // ─── Estado ───────────────────────────────────────────────
    address public immutable fundador;
    uint256 public immutable genesisTimestamp;

    // ─── Eventos ──────────────────────────────────────────────
    event GenesisAnchored(
        bytes32 indexed sha256IndexZero,
        address indexed fundador,
        uint256 timestamp
    );

    event DocumentoAnclado(
        bytes32 indexed hashDocumento,
        string tipo,
        uint256 timestamp
    );

    // ─── Mapping de documentos anclados ───────────────────────
    mapping(bytes32 => bool) public documentosAnclados;

    constructor() {
        fundador = msg.sender;
        genesisTimestamp = block.timestamp;
        emit GenesisAnchored(SHA256_INDEX_ZERO, msg.sender, block.timestamp);
    }

    /**
     * Ancla un documento por su hash SHA3-512.
     * @param hashDocumento hash sha3-512 (128 hex → bytes32 truncado)
     * @param tipo tipo de documento (acta, obra, decision)
     */
    function anclarDocumento(bytes32 hashDocumento, string calldata tipo) external {
        require(!documentosAnclados[hashDocumento], "Documento ya anclado");
        documentosAnclados[hashDocumento] = true;
        emit DocumentoAnclado(hashDocumento, tipo, block.timestamp);
    }

    /**
     * Verifica si un hash ya está anclado.
     */
    function verificar(bytes32 hashDocumento) external view returns (bool) {
        return documentosAnclados[hashDocumento];
    }

    /**
     * Devuelve los datos canónicos del Índice Cero.
     */
    function indiceCero() external pure returns (
        string memory scArq,
        string memory scCo,
        bytes32 sha256,
        uint8 humano,
        uint8 ia,
        uint8 real,
        string memory sello
    ) {
        return (
            SAFE_CREATIVE_ARQ,
            SAFE_CREATIVE_CO,
            SHA256_INDEX_ZERO,
            HUMANO,
            IA,
            REAL,
            SELLO
        );
    }
}