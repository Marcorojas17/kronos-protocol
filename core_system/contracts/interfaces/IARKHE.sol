// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · INTERFACE IARKHE · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

interface IARKHE {
    function indiceCero() external view returns (
        string memory scArq,
        string memory scCo,
        bytes32 sha256,
        uint8 humano,
        uint8 ia,
        uint8 real,
        string memory sello
    );

    function anclarDocumento(bytes32 hashDocumento, string calldata tipo) external;

    function verificar(bytes32 hashDocumento) external view returns (bool);
}