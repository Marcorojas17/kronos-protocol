"""Tests del endpoint HTTP."""
import base64
import os
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

os.environ["KRONOS_ADMIN_KEY"] = "test-key-12345"
os.environ["KRONOS_RATE_CAPACITY"] = "100"
os.environ["KRONOS_AUDIT_PATH"] = "/tmp/kronos-test-audit.jsonl"

Path("/tmp/kronos-test-audit.jsonl").unlink(missing_ok=True)

from apps.api.main import app
from kronos360.crypto.signatures import Ed25519Signer, build_signed_message


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()


@pytest.fixture
def signed_payload():
    signer = Ed25519Signer(signer_id="fixture-001")
    msg = build_signed_message(hash_registro="hash-de-prueba", alg_id="Ed25519")
    sig = signer.sign(msg)
    return {
        "algorithm": "Ed25519",
        "public_key": signer.public_key_hex(),
        "signature": sig.hex(),
        "message": base64.b64encode(msg).decode("ascii"),
    }


def test_health_ok(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.get_json()["status"] == "ok"


def test_verify_valid_signature(client, signed_payload):
    r = client.post("/verify", json=signed_payload)
    assert r.status_code == 200
    assert r.get_json()["status"] == "VERIFICADO"


def test_verify_wrong_message(client, signed_payload):
    bad = dict(signed_payload)
    bad["message"] = base64.b64encode(b"otro mensaje").decode("ascii")
    r = client.post("/verify", json=bad)
    assert r.status_code == 200
    assert r.get_json()["status"] == "NO_AUTORIZADO"


def test_verify_tampered_signature(client, signed_payload):
    bad = dict(signed_payload)
    sig = bytearray(bytes.fromhex(bad["signature"]))
    sig[0] ^= 0x01
    bad["signature"] = bytes(sig).hex()
    r = client.post("/verify", json=bad)
    assert r.status_code == 200
    assert r.get_json()["status"] == "NO_AUTORIZADO"


def test_verify_missing_field(client, signed_payload):
    bad = dict(signed_payload)
    del bad["signature"]
    r = client.post("/verify", json=bad)
    assert r.status_code == 400


def test_verify_invalid_hex(client, signed_payload):
    bad = dict(signed_payload)
    bad["public_key"] = "no es hex"
    r = client.post("/verify", json=bad)
    assert r.status_code == 400


def test_verify_wrong_hex_length(client, signed_payload):
    bad = dict(signed_payload)
    bad["public_key"] = "ab" * 16
    r = client.post("/verify", json=bad)
    assert r.status_code == 400


def test_verify_unknown_algorithm(client, signed_payload):
    bad = dict(signed_payload)
    bad["algorithm"] = "MD5-rot13"
    r = client.post("/verify", json=bad)
    assert r.status_code == 400


def test_verify_invalid_base64(client, signed_payload):
    bad = dict(signed_payload)
    bad["message"] = "esto no es base64!!!"
    r = client.post("/verify", json=bad)
    assert r.status_code == 400


def test_verify_message_too_large(client, signed_payload):
    bad = dict(signed_payload)
    bad["message"] = base64.b64encode(b"x" * 5000).decode("ascii")
    r = client.post("/verify", json=bad)
    assert r.status_code == 400


def test_verify_body_not_json(client):
    r = client.post("/verify", data="no soy json", content_type="text/plain")
    assert r.status_code == 400


def test_verify_no_stack_trace(client, signed_payload):
    bad = dict(signed_payload)
    bad["public_key"] = "zz"
    r = client.post("/verify", json=bad)
    body = r.get_data(as_text=True)
    assert "Traceback" not in body


def test_sign_without_key(client):
    r = client.post("/sign", json={"hash_registro": "abc"})
    assert r.status_code == 401


def test_sign_with_wrong_key(client):
    r = client.post(
        "/sign",
        json={"hash_registro": "abc"},
        headers={"X-Admin-Key": "llave-mala"},
    )
    assert r.status_code == 401


def test_sign_ok(client):
    r = client.post(
        "/sign",
        json={"hash_registro": "hash-de-prueba"},
        headers={"X-Admin-Key": "test-key-12345"},
    )
    assert r.status_code == 200
    data = r.get_json()
    assert data["status"] == "OK"
    assert data["algorithm"] == "Ed25519"
    assert len(data["public_key"]) == 64
    assert len(data["signature"]) == 128


def test_sign_missing_hash(client):
    r = client.post(
        "/sign",
        json={},
        headers={"X-Admin-Key": "test-key-12345"},
    )
    assert r.status_code == 400


def test_unknown_endpoint_returns_json(client):
    r = client.get("/no-existe")
    assert r.status_code == 404
    assert r.get_json()["status"] == "ERROR"
