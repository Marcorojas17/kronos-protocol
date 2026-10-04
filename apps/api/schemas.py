"""Validación de payloads HTTP sin dependencias externas."""
from __future__ import annotations

import base64
import binascii

MAX_MESSAGE_BYTES = 4096

ALGORITHM_SIZES = {
    "Ed25519": {"public_key": 32, "signature": 64},
    "ML-DSA-65": {"public_key": 1952, "signature": 3309},
}


class ValidationError(ValueError):
    pass


def _require_str(data: dict, key: str) -> str:
    if key not in data:
        raise ValidationError(f"campo requerido: {key}")
    value = data[key]
    if not isinstance(value, str):
        raise ValidationError(f"{key} debe ser string")
    if not value:
        raise ValidationError(f"{key} no puede estar vacío")
    return value


def _check_hex(value: str, expected_bytes, field: str) -> bytes:
    if len(value) % 2 != 0:
        raise ValidationError(f"{field} debe tener longitud par")
    try:
        raw = bytes.fromhex(value)
    except ValueError as e:
        raise ValidationError(f"{field} no es hex válido") from e
    if expected_bytes is not None and len(raw) != expected_bytes:
        raise ValidationError(
            f"{field} debe ser {expected_bytes} bytes "
            f"({expected_bytes * 2} hex), recibido {len(raw)} bytes"
        )
    return raw


def _check_base64(value: str, field: str) -> bytes:
    try:
        raw = base64.b64decode(value, validate=True)
    except (binascii.Error, ValueError) as e:
        raise ValidationError(f"{field} no es base64 válido") from e
    if len(raw) > MAX_MESSAGE_BYTES:
        raise ValidationError(
            f"{field} excede {MAX_MESSAGE_BYTES} bytes (recibido {len(raw)})"
        )
    return raw


def validate_verify_request(data: object) -> dict:
    if not isinstance(data, dict):
        raise ValidationError("body debe ser objeto JSON")

    algorithm = _require_str(data, "algorithm")
    if algorithm not in ALGORITHM_SIZES:
        raise ValidationError(
            f"algorithm no soportado: {algorithm}. "
            f"Válidos: {', '.join(ALGORITHM_SIZES)}"
        )

    sizes = ALGORITHM_SIZES[algorithm]
    public_key_hex = _require_str(data, "public_key")
    signature_hex = _require_str(data, "signature")
    message_b64 = _require_str(data, "message")

    _check_hex(public_key_hex, sizes["public_key"], "public_key")
    _check_hex(signature_hex, sizes["signature"], "signature")
    message = _check_base64(message_b64, "message")

    return {
        "algorithm": algorithm,
        "public_key_hex": public_key_hex,
        "signature_hex": signature_hex,
        "message": message,
    }
