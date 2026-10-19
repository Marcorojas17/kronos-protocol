# --- VERSIÓN MAINNET (BLOCKCHAIN) ---
from web3 import Web3
import os

# Conexión a un nodo de Ethereum (Infura o Alchemy)
w3 = Web3(Web3.HTTPProvider(os.environ["ETH_RPC_URL"]))

def anchor_hash_to_ethereum(manifest_hash: str):
    account = w3.eth.account.from_key(os.environ["PRIVATE_KEY"])
    
    transaction = {
        'to': '0x0000000000000000000000000000000000000000',
        'value': 0,
        'gas': 2000000,
        'gasPrice': w3.eth.gas_price,
        'nonce': w3.eth.get_transaction_count(account.address),
        'data': w3.to_hex(text=manifest_hash)
    }

    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=account.key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    return w3.to_hex(tx_hash)
