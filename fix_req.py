reqs = """cryptography>=42.0.0
pynacl>=1.5.0
web3>=6.15.0
rfc3161ng>=2.1.3
pymerkle>=6.0.0
eth-abi
eth-account
flask>=3.0.0
dilithium-py>=1.0.0
pytest>=8.0.0
"""
with open("core_system/requirements.txt", "w", encoding="utf-8") as f:
    f.write(reqs)
print("✅ requirements.txt reescrito correctamente.")
