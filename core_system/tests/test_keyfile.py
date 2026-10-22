"""Tests de cifrado de llaves privadas."""
import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from kronos360.crypto.keyfile import load_keyfile, save_keyfile
from kronos360.crypto.signatures import Ed25519Signer

TEST_ITER = 1000


def test_round_trip(tmp_path):
    original = Ed25519Signer(signer_id="agente-001")
    keyfile = tmp_path / "agente-001.key"
    save_keyfile(keyfile, original, "agente-001", "contraseña", iterations=TEST_ITER)
    loaded = load_keyfile(keyfile, "contraseña")
    assert loaded.public_key_hex() == original.public_key_hex()


def test_wrong_password_fails(tmp_path):
    signer = Ed25519Signer(signer_id="agente-002")
    keyfile = tmp_path / "agente-002.key"
    save_keyfile(keyfile, signer, "agente-002", "correcta", iterations=TEST_ITER)
    with pytest.raises(ValueError, match="Contraseña incorrecta"):
        load_keyfile(keyfile, "incorrecta")


def test_tampered_ciphertext_fails(tmp_path):
    signer = Ed25519Signer(signer_id="agente-003")
    keyfile = tmp_path / "agente-003.key"
    save_keyfile(keyfile, signer, "agente-003", "pw", iterations=TEST_ITER)

    data = json.loads(keyfile.read_text(encoding="utf-8"))
    cipher = bytearray(bytes.fromhex(data["ciphertext_hex"]))
    cipher[0] ^= 0x01
    data["ciphertext_hex"] = bytes(cipher).hex()
    keyfile.write_text(json.dumps(data), encoding="utf-8")

    with pytest.raises(ValueError):
        load_keyfile(keyfile, "pw")


def test_empty_password_rejected(tmp_path):
    signer = Ed25519Signer(signer_id="agente-004")
    with pytest.raises(ValueError, match="vacía"):
        save_keyfile(
            tmp_path / "x.key", signer, "agente-004", "", iterations=TEST_ITER
        )


def test_no_plaintext_leak(tmp_path):
    signer = Ed25519Signer(signer_id="agente-006")
    keyfile = tmp_path / "agente-006.key"
    save_keyfile(keyfile, signer, "agente-006", "pw", iterations=TEST_ITER)

    contenido = keyfile.read_text(encoding="utf-8")
    privada_hex = signer.private_bytes().hex()
    assert privada_hex not in contenido
    assert privada_hex.upper() not in contenido


def test_unsupported_version_fails(tmp_path):
    signer = Ed25519Signer(signer_id="agente-007")
    keyfile = tmp_path / "agente-007.key"
    save_keyfile(keyfile, signer, "agente-007", "pw", iterations=TEST_ITER)

    data = json.loads(keyfile.read_text(encoding="utf-8"))
    data["version"] = 99
    keyfile.write_text(json.dumps(data), encoding="utf-8")

    with pytest.raises(ValueError, match="Versión no soportada"):
        load_keyfile(keyfile, "pw")


def test_missing_file_fails(tmp_path):
    with pytest.raises(ValueError, match="ilegible"):
        load_keyfile(tmp_path / "no-existe.key", "pw")
