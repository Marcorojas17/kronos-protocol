"""Hash primario del sistema: SHA3-512."""
from __future__ import annotations

import hashlib


def sha3_512_hex(payload: bytes) -> str:
    """Devuelve el SHA3-512 de payload en hexadecimal minusculas."""
    return hashlib.sha3_512(payload).hexdigest()