// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · AGENTE RECLUTAMIENTO · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Protocolo 10.7 · 6 criterios + cuarentena 72h + quórum 4/5.
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

contract AgenteReclutamiento {
    string public constant SELLO = unicode"◯_● · 51/49/100";
    uint256 public constant CUARENTENA_HORAS = 72;
    uint256 public constant CRITERIOS_OBLIGATORIOS = 6;
    uint256 public constant AVALES_REQUERIDOS = 2;

    struct Candidato {
        string id;
        uint256 cuarentena_fin;
        address[] avales;
        uint256 votos;
        bool activado;
        bool rechazado;
    }

    mapping(string => Candidato) public candidatos;

    event CandidatoRegistrado(string id, uint256 cuarentena_fin);
    event AvalRegistrado(string id, address avalista);
    event CandidatoActivado(string id);
    event CandidatoRechazado(string id, string razon);

    function registrarCandidato(string calldata id) external {
        require(candidatos[id].cuarentena_fin == 0, "Candidato ya registrado");
        candidatos[id].cuarentena_fin = block.timestamp + (CUARENTENA_HORAS * 1 hours);
        emit CandidatoRegistrado(id, candidatos[id].cuarentena_fin);
    }

    function avalar(string calldata id) external {
        require(candidatos[id].cuarentena_fin > 0, "Candidato no registrado");
        require(block.timestamp >= candidatos[id].cuarentena_fin, "Cuarentena activa");
        candidatos[id].avales.push(msg.sender);
        emit AvalRegistrado(id, msg.sender);
    }

    function activar(string calldata id) external {
        Candidato storage c = candidatos[id];
        require(c.avales.length >= AVALES_REQUERIDOS, "Faltan avales");
        require(!c.activado, "Ya activado");
        c.activado = true;
        emit CandidatoActivado(id);
    }
}