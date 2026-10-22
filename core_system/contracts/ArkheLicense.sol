// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArkheLicense
 * @dev Smart Contract para la monetización y licenciamiento del protocolo ARKHÉ ZERO (PVA).
 * Permite a agentes de IA o empresas pagar por el uso de la API de certificación.
 */
contract ArkheLicense {
    address public owner;
    uint256 public licenseFee;

    // Mapeo para saber qué direcciones (empresas/IAs) ya pagaron su licencia
    mapping(address => bool) public hasLicense;

    // Evento que queda registrado en la blockchain cuando alguien compra
    event LicensePurchased(address indexed buyer, uint256 amount);

    constructor() {
        owner = msg.sender;
        // Precio inicial: 0.001 ETH (aprox $0.30 USD, como dicta la tesis)
        licenseFee = 0.001 ether; 
    }

    /**
     * @dev Función que las IAs o empresas llaman para comprar acceso.
     */
    function buyLicense() external payable {
        require(msg.value >= licenseFee, "ARKHE ZERO: Pago insuficiente para licencia");
        hasLicense[msg.sender] = true;
        emit LicensePurchased(msg.sender, msg.value);
    }

    /**
     * @dev Permite al dueño (tú) actualizar el precio de la licencia.
     */
    function setLicenseFee(uint256 _newFee) external {
        require(msg.sender == owner, "ARKHE ZERO: Solo el creador puede cambiar la tarifa");
        licenseFee = _newFee;
    }

    /**
     * @dev Extrae los fondos recaudados al monedero del creador.
     */
    function withdraw() external {
        require(msg.sender == owner, "ARKHE ZERO: Solo el creador puede retirar");
        uint256 balance = address(this).balance;
        require(balance > 0, "ARKHE ZERO: No hay fondos para retirar");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "ARKHE ZERO: Transferencia fallida");
    }
}
