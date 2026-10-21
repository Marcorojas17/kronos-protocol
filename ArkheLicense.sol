// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArkheLicense {
    address public owner;
    uint256 public licenseFee = 0.001 ether; // Aprox $0.30 USD
    mapping(address => bool) public hasLicense;

    event LicensePurchased(address indexed user);

    constructor() {
        owner = msg.sender;
    }

    // Las empresas llaman a esta función desde sus agentes IA
    function buyLicense() external payable {
        require(msg.value >= licenseFee, "Pago insuficiente para ARKHE ZERO");
        hasLicense[msg.sender] = true;
        emit LicensePurchased(msg.sender);
    }

    // Retirar fondos
    function withdraw() external {
        require(msg.sender == owner, "Solo el creador puede retirar");
        payable(owner).transfer(address(this).balance);
    }
}
