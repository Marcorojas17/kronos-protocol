#!/usr/bin/env python3
"""
PVA Contract Deploy - KRONOS 360
Folio: 5204160405358537
Perito: kronosproyecto@hotmail.com
Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
TX Previa: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
Contrato: contracts/PVAContract.sol - Solidity 0.8.20
"""

import os
import json
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

FOLIO = "5204160405358537"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO = f"KRONOS-TRACE-PVA-{FOLIO}"

ROOT = Path(__file__).parent.parent
CONTRACT_PATH = ROOT / "contracts" / "PVAContract.sol"
AUDIT_DIR = ROOT / "audit"
LOG_PATH = AUDIT_DIR / "cadena_custodia.log"
DEPLOY_INFO = AUDIT_DIR / "deploy_info.json"

# Config desde .env - nunca hardcodear private key
RPC_URL_SEPOLIA = os.getenv(
    "RPC_URL_SEPOLIA",
    os.getenv("SEPOLIA_RPC_URL", "https://sepolia.infura.io/v3/TU_KEY"),
)
RPC_URL_MAINNET = os.getenv("RPC_URL_MAINNET", "")
PRIVATE_KEY = os.getenv("PRIVATE_KEY", os.getenv("PVA_PRIVATE_KEY", ""))
ETHERSCAN_API_KEY = os.getenv("ETHERSCAN_API_KEY", "")


def log_custodia(msg: str):
    AUDIT_DIR.mkdir(exist_ok=True)
    ts = datetime.utcnow().isoformat() + "Z"
    entry = f"[{ts}] [DEPLOY:{FOLIO}] {msg}"
    print(entry)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def deploy():
    try:
        from web3 import Web3
        from solcx import compile_source, install_solc
    except ImportError:
        print("[!] Instalando web3 y py-solc-x...")
        os.system("pip install web3 py-solc-x python-dotenv --quiet")
        from web3 import Web3
        from solcx import compile_source, install_solc

    if not PRIVATE_KEY:
        print("[ERROR] PRIVATE_KEY no está en .env")
        print("Crea .env con: PRIVATE_KEY=0x... + RPC_URL_SEPOLIA=https://...")
        print("Usa scripts/setup_vault.py para generar .env seguro")
        log_custodia("ERROR: PRIVATE_KEY faltante - deploy abortado")
        return

    network = os.getenv("PVA_NETWORK", "sepolia")
    rpc_url = RPC_URL_SEPOLIA if network == "sepolia" else RPC_URL_MAINNET

    print(f"""
╔════════════════════════════════════════════╗
║ PVA CONTRACT DEPLOY - KRONOS 360 ║
║ Folio: {FOLIO} ║
║ Genesis: {GENESIS[:16]}... ║
║ Network: {network} ║
║ Contract: PVAContract.sol 0.8.20 ║
╚════════════════════════════════════════════╝
""")

    w3 = Web3(Web3.HTTPProvider(rpc_url))
    if not w3.is_connected():
        print(f"[ERROR] No conecta RPC {rpc_url}")
        log_custodia(f"ERROR RPC no conecta {rpc_url}")
        return

    account = w3.eth.account.from_key(PRIVATE_KEY)
    print(f"[*] Deployer: {account.address}")
    print(
        f"[*] Balance: {w3.from_wei(w3.eth.get_balance(account.address), 'ether')} ETH"
    )
    log_custodia(f"Deployer {account.address} balance check OK")

    # Compilar
    print(f"[*] Compilando {CONTRACT_PATH}...")
    try:
        install_solc("0.8.20")
    except:
        pass

    source = CONTRACT_PATH.read_text(encoding="utf-8")
    compiled = compile_source(
        source, output_values=["abi", "bin"], solc_version="0.8.20"
    )
    contract_id, contract_interface = compiled.popitem()
    abi = contract_interface["abi"]
    bytecode = contract_interface["bin"]

    print(f"[OK] Compilado {contract_id} - bytecode {len(bytecode)} chars")

    # Deploy
    PVA = w3.eth.contract(abi=abi, bytecode=bytecode)

    # Constructor de PVAContract: constructor(string memory _folioMaestro, string memory _perito)
    constructor_args = [FOLIO, PERITO]

    print(f"[*] Deploy con args: {constructor_args}")
    tx = PVA.constructor(*constructor_args).build_transaction(
        {
            "from": account.address,
            "nonce": w3.eth.get_transaction_count(account.address),
            "gas": 1500000,
            "gasPrice": w3.eth.gas_price,
            "chainId": 11155111 if network == "sepolia" else 1,
        }
    )

    signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    print(f"[*] TX enviada: {tx_hash.hex()}")
    log_custodia(f"Deploy TX enviada {tx_hash.hex()} en {network}")

    print("[*] Esperando confirmación...")
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)

    contract_address = receipt.contractAddress
    print(f"""
[OK] CONTRATO DESPLEGADO
Address: {contract_address}
TX: {tx_hash.hex()}
Block: {receipt.blockNumber}
Gas usado: {receipt.gasUsed}
Etherscan: https://{network}.etherscan.io/address/{contract_address}
""")

    # Guardar info deploy
    deploy_data = {
        "folio": FOLIO,
        "perito": PERITO,
        "genesis_hash": GENESIS,
        "sello": SELLO,
        "contract_address": contract_address,
        "tx_hash": tx_hash.hex(),
        "tx_previa": "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
        "network": network,
        "deployer": account.address,
        "blockNumber": receipt.blockNumber,
        "abi": abi,
        "deployed_at": datetime.utcnow().isoformat() + "Z",
    }

    AUDIT_DIR.mkdir(exist_ok=True)
    with open(DEPLOY_INFO, "w", encoding="utf-8") as f:
        json.dump(deploy_data, f, indent=2, ensure_ascii=False)

    # Actualiza sello_kronos.json
    sello_path = AUDIT_DIR / "sello_kronos.json"
    if sello_path.exists():
        sello_data = json.loads(sello_path.read_text(encoding="utf-8"))
    else:
        sello_data = {}
    sello_data.update(
        {"contract_address": contract_address, "last_deploy_tx": tx_hash.hex()}
    )
    with open(sello_path, "w", encoding="utf-8") as f:
        json.dump(sello_data, f, indent=2, ensure_ascii=False)

    log_custodia(
        f"Contrato desplegado {contract_address} TX {tx_hash.hex()} bloque {receipt.blockNumber}"
    )
    print(f"[FIN] deploy_info.json guardado en {DEPLOY_INFO}")

    if ETHERSCAN_API_KEY:
        print(
            f'[*] Verifica con: npx hardhat verify --network {network} {contract_address} "{FOLIO}" "{PERITO}"'
        )


if __name__ == "__main__":
    deploy()
