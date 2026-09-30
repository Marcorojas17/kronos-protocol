"""Firmas digitales con domain separation.

Cada firma incluye un prefijo de dominio que liga el mensaje al protocolo,
version y algoritmo. Esto evita que una firma valida para un contexto
se reutilice en otro (ataque de sustitucion/stripping).
"""
from __future__ import annotations

from typing import Protocol

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import (
    Ed25519PrivateKey,
    Ed25519PublicKey,
)
from dilithium_py.ml_dsa import ML_DSA_65

# Prefijo de dominio. NUNCA cambiar sin migrar todos los registros.
DOMAIN_SEPARATOR = b"KRONOS-v1:sign:hybrid"


def build_signed_message(hash_registro: str, alg_id: str) -> bytes:
    """Construye el mensaje canonico que se firma.

    Formato: DOMAIN_SEPARATOR || '|' || alg_id || '|' || hash_registro
    """
    return (
        DOMAIN_SEPARATOR
        + b"|"
        + alg_id.encode("ascii")
        + b"|"
        + hash_registro.encode("ascii")
    )


class Signer(Protocol):
    signer_id: str
    algorithm: str

    def public_key_hex(self) -> str: ...
    def sign(self, message: bytes) -> bytes: ...


class Ed25519Signer:
    algorithm = "Ed25519"

    def __init__(self, signer_id: str, private_key: Ed25519PrivateKey | None = None) -> None:
        self.signer_id = signer_id
        self._private = private_key or Ed25519PrivateKey.generate()
        self._public = self._private.public_key()

    @classmethod
    def from_private_bytes(cls, signer_id: str, private_bytes: bytes) -> "Ed25519Signer":
        return cls(signer_id, Ed25519PrivateKey.from_private_bytes(private_bytes))

    def private_bytes(self) -> bytes:
        return self._private.private_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PrivateFormat.Raw,
            encryption_algorithm=serialization.NoEncryption(),
        )

    def public_key_hex(self) -> str:
        raw = self._public.public_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PublicFormat.Raw,
        )
        return raw.hex()

    def sign(self, message: bytes) -> bytes:
        return self._private.sign(message)


class MLDSA65Signer:
    algorithm = "ML-DSA-65"

    def __init__(
        self,
        signer_id: str,
        public_key: bytes | None = None,
        private_key: bytes | None = None,
    ) -> None:
        self.signer_id = signer_id
        if public_key is None or private_key is None:
            public_key, private_key = ML_DSA_65.keygen()
        self._public = public_key
        self._private = private_key

    def public_key_hex(self) -> str:
        return self._public.hex()

    def private_key_bytes(self) -> bytes:
        return self._private

    def sign(self, message: bytes) -> bytes:
        return ML_DSA_65.sign(self._private, message)


def verify_signature(
    algorithm: str,
    public_key_hex: str,
    signature_hex: str,
    message: bytes,
) -> bool:
    """Verifica una firma. Devuelve False ante cualquier error."""
    try:
        public_key = bytes.fromhex(public_key_hex)
        signature = bytes.fromhex(signature_hex)
    except ValueError:
        return False

    try:
        if algorithm == "Ed25519":
            key = Ed25519PublicKey.from_public_bytes(public_key)
            key.verify(signature, message)
            return True

        if algorithm == "ML-DSA-65":
            return bool(ML_DSA_65.verify(public_key, message, signature))

        return False
    except (InvalidSignature, ValueError, TypeError):
        return False