"""Cifrado de llaves privadas en reposo.

Formato de archivo (JSON):
    {
      "version": 1,
      "algorithm": "Ed25519",
      "signer_id": "...",
      "kdf": "PBKDF2-HMAC-SHA256",
      "iterations": 600000,
      "salt_hex": "...",
      "nonce_hex": "...",
      "ciphertext_hex": "..."
    }

Uso:
    from pathlib import Path
    from kronos360.crypto.signatures import Ed25519Signer
    from kronos360.crypto.keyfile import save_keyfile, load_keyfile

    signer = Ed25519Signer(signer_id="agente-001")
    save_keyfile(Path("agente-001.key"), signer, "agente-001", "contraseña")

    mismo = load_keyfile(Path("agente-001.key"), "contraseña")
    assert mismo.public_key_hex() == signer.public_key_hex()

Creado por: Marco Antonio Rojas Valdovinos (#000)
"""
from __future__ import annotations

import json
import os
from pathlib import Path

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

from .signatures import Ed25519Signer

KDF_ITERATIONS_DEFAULT = 600_000
SALT_BYTES = 16
NONCE_BYTES = 12
KEY_BYTES = 32
FILE_VERSION = 1


def _derive_key(password: str, salt: bytes, iterations: int) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=KEY_BYTES,
        salt=salt,
        iterations=iterations,
    )
    return kdf.derive(password.encode("utf-8"))


def save_keyfile(
    path: Path,
    signer: Ed25519Signer,
    signer_id: str,
    password: str,
    iterations: int = KDF_ITERATIONS_DEFAULT,
) -> None:
    """Guarda la llave privada cifrada con AES-256-GCM."""
    if not password:
        raise ValueError("Contraseña vacía no permitida")
    if not signer_id:
        raise ValueError("signer_id vacío no permitido")

    salt = os.urandom(SALT_BYTES)
    nonce = os.urandom(NONCE_BYTES)
    key = _derive_key(password, salt, iterations)

    plaintext = signer.private_bytes()
    ciphertext = AESGCM(key).encrypt(nonce, plaintext, associated_data=None)

    data = {
        "version": FILE_VERSION,
        "algorithm": "Ed25519",
        "signer_id": signer_id,
        "kdf": "PBKDF2-HMAC-SHA256",
        "iterations": iterations,
        "salt_hex": salt.hex(),
        "nonce_hex": nonce.hex(),
        "ciphertext_hex": ciphertext.hex(),
    }
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")


def load_keyfile(path: Path, password: str) -> Ed25519Signer:
    """Carga la llave privada cifrada."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        raise ValueError(f"Archivo ilegible: {e}") from e

    if data.get("version") != FILE_VERSION:
        raise ValueError(f"Versión no soportada: {data.get('version')}")
    if data.get("algorithm") != "Ed25519":
        raise ValueError(f"Algoritmo no soportado: {data.get('algorithm')}")
    if data.get("kdf") != "PBKDF2-HMAC-SHA256":
        raise ValueError(f"KDF no soportado: {data.get('kdf')}")

    try:
        salt = bytes.fromhex(data["salt_hex"])
        nonce = bytes.fromhex(data["nonce_hex"])
        ciphertext = bytes.fromhex(data["ciphertext_hex"])
        iterations = int(data["iterations"])
        signer_id = str(data["signer_id"])
    except (KeyError, ValueError, TypeError) as e:
        raise ValueError(f"Archivo malformado: {e}") from e

    key = _derive_key(password, salt, iterations)
    try:
        plaintext = AESGCM(key).decrypt(nonce, ciphertext, associated_data=None)
    except Exception as e:
        raise ValueError("Contraseña incorrecta o archivo alterado") from e

    return Ed25519Signer.from_private_bytes(
        signer_id=signer_id,
        private_bytes=plaintext,
    )
