"""Tests del pipeline de firma Ed25519."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from kronos360.crypto.signatures import (
    Ed25519Signer,
    build_signed_message,
    verify_signature,
)


def test_round_trip():
    """Firmar y verificar el mismo mensaje debe pasar."""
    signer = Ed25519Signer(signer_id="test-001")
    msg = build_signed_message(hash_registro="abc123", alg_id="Ed25519")
    sig = signer.sign(msg)
    ok = verify_signature(
        algorithm="Ed25519",
        public_key_hex=signer.public_key_hex(),
        signature_hex=sig.hex(),
        message=msg,
    )
    assert ok is True


def test_wrong_message_fails():
    """Verificar con otro mensaje debe fallar."""
    signer = Ed25519Signer(signer_id="test-002")
    msg = build_signed_message(hash_registro="abc123", alg_id="Ed25519")
    sig = signer.sign(msg)
    ok = verify_signature(
        algorithm="Ed25519",
        public_key_hex=signer.public_key_hex(),
        signature_hex=sig.hex(),
        message=b"mensaje distinto",
    )
    assert ok is False


def test_tampered_signature_fails():
    """Modificar un byte de la firma debe invalidarla."""
    signer = Ed25519Signer(signer_id="test-003")
    msg = build_signed_message(hash_registro="abc123", alg_id="Ed25519")
    sig = signer.sign(msg)

    tampered = bytearray(sig)
    tampered[0] ^= 0x01

    ok = verify_signature(
        algorithm="Ed25519",
        public_key_hex=signer.public_key_hex(),
        signature_hex=bytes(tampered).hex(),
        message=msg,
    )
    assert ok is False


def test_wrong_public_key_fails():
    """Firmar con A, verificar con B: debe fallar."""
    signer_a = Ed25519Signer(signer_id="test-A")
    signer_b = Ed25519Signer(signer_id="test-B")
    msg = build_signed_message(hash_registro="abc123", alg_id="Ed25519")
    sig = signer_a.sign(msg)

    ok = verify_signature(
        algorithm="Ed25519",
        public_key_hex=signer_b.public_key_hex(),
        signature_hex=sig.hex(),
        message=msg,
    )
    assert ok is False


def test_invalid_hex_fails_gracefully():
    """Hex corrupto devuelve False, no excepción."""
    signer = Ed25519Signer(signer_id="test-004")
    ok = verify_signature(
        algorithm="Ed25519",
        public_key_hex="no es hex",
        signature_hex="tampoco",
        message=b"x",
    )
    assert ok is False


def test_unknown_algorithm_fails():
    """Algoritmo desconocido: False, no excepción."""
    signer = Ed25519Signer(signer_id="test-005")
    msg = b"x"
    sig = signer.sign(msg)
    ok = verify_signature(
        algorithm="MD5-rot13",
        public_key_hex=signer.public_key_hex(),
        signature_hex=sig.hex(),
        message=msg,
    )
    assert ok is False
