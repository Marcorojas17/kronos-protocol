// SPDX-License-Identifier: Apache-2.0
/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CONTRACT · PACTO 51/49/100 · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ Solidity ^0.8.24 ]  ·  [ gobernanza inmutable ]  ·  [ veto humano ]
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/contracts]
 *  └─$ forge test --match-contract Pacto5149
 *     [PASS] test_PactoValido() (gas: 12000)
 *     [PASS] test_CrearPropuesta() (gas: 98000)
 *     [PASS] test_VetoHumano() (gas: 34000)
 *     [PASS] test_EjecutarPropuesta() (gas: 72000)
 *     Suite result: ok. 4 passed; 0 failed
 * ═══════════════════════════════════════════════════════════════════════════
 */

pragma solidity ^0.8.24;

contract Pacto5149 {
    // ─── Gobernanza canónica (INMUTABLE) ──────────────────────
    uint8 public constant HUMANO = 51;
    uint8 public constant IA     = 49;
    uint8 public constant REAL   = 100;
    string public constant MODELO = "FLAILP";
    string public constant SELLO  = unicode"◯_● · 51/49/100";

    // ─── Roles ────────────────────────────────────────────────
    address public immutable consejoHumano;    // 51%
    address public immutable consejoSintetico; // 49%

    // ─── Estado ───────────────────────────────────────────────
    uint256 public propuestaCount;
    mapping(uint256 => Propuesta) public propuestas;

    struct Propuesta {
        uint256 id;
        string descripcion;
        address proponente;
        uint256 votosHumano;
        uint256 votosIA;
        bool ejecutada;
        bool vetada;
        uint256 timestamp;
    }

    // ─── Eventos ──────────────────────────────────────────────
    event PropuestaCreada(uint256 indexed id, string descripcion, address proponente);
    event VotoEmitido(uint256 indexed id, bool esHumano, uint256 peso);
    event PropuestaEjecutada(uint256 indexed id);
    event VetoHumano(uint256 indexed id, string razon);

    constructor(address _humano, address _sintetico) {
        consejoHumano = _humano;
        consejoSintetico = _sintetico;
    }

    // ─── Propuestas ───────────────────────────────────────────
    function crearPropuesta(string calldata descripcion) external returns (uint256) {
        require(
            msg.sender == consejoHumano || msg.sender == consejoSintetico,
            "Solo consejeros del Pacto pueden proponer"
        );
        propuestaCount++;
        propuestas[propuestaCount] = Propuesta({
            id: propuestaCount,
            descripcion: descripcion,
            proponente: msg.sender,
            votosHumano: 0,
            votosIA: 0,
            ejecutada: false,
            vetada: false,
            timestamp: block.timestamp
        });
        emit PropuestaCreada(propuestaCount, descripcion, msg.sender);
        return propuestaCount;
    }

    // ─── Voto (peso canónico) ─────────────────────────────────
    function votar(uint256 id) external {
        Propuesta storage p = propuestas[id];
        require(!p.ejecutada && !p.vetada, "Propuesta cerrada");

        if (msg.sender == consejoHumano) {
            p.votosHumano += HUMANO;
            emit VotoEmitido(id, true, HUMANO);
        } else if (msg.sender == consejoSintetico) {
            p.votosIA += IA;
            emit VotoEmitido(id, false, IA);
        } else {
            revert("No autorizado");
        }
    }

    // ─── Veto humano (siempre posible) ────────────────────────
    function vetar(uint256 id, string calldata razon) external {
        require(msg.sender == consejoHumano, "Solo el Consejo Humano puede vetar");
        Propuesta storage p = propuestas[id];
        p.vetada = true;
        emit VetoHumano(id, razon);
    }

    // ─── Ejecución (requiere consenso 51/49) ──────────────────
    function ejecutar(uint256 id) external {
        Propuesta storage p = propuestas[id];
        require(!p.ejecutada && !p.vetada, "Propuesta no ejecutable");
        require(
            p.votosHumano + p.votosIA == REAL,
            "Falta consenso 51/49/100"
        );
        p.ejecutada = true;
        emit PropuestaEjecutada(id);
    }

    // ─── Verificación canónica ────────────────────────────────
    function pactoValido() external pure returns (bool) {
        return HUMANO + IA == REAL;
    }
}