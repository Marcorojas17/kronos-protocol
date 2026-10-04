"""Tests del logger de auditoría."""
import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from kronos360.crypto.audit_log import SCHEMA_VERSION, AuditLogger
from kronos360.crypto.signatures import Ed25519Signer


def test_log_sign_writes_jsonl(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl")
    signer = Ed25519Signer(signer_id="agente-001")

    logger.log_sign(
        signer_id="agente-001",
        public_key_hex=signer.public_key_hex(),
        result="ok",
    )

    lines = logger.path.read_text(encoding="utf-8").strip().split("\n")
    assert len(lines) == 1
    data = json.loads(lines[0])
    assert data["schema"] == SCHEMA_VERSION
    assert data["operation"] == "sign"
    assert data["signer_id"] == "agente-001"
    assert data["result"] == "ok"


def test_timestamp_format(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl")
    event = logger.log_sign(signer_id="x", public_key_hex="00" * 32, result="ok")
    assert event.timestamp.endswith("Z")
    assert "T" in event.timestamp


def test_public_key_hashed_not_stored(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl")
    signer = Ed25519Signer(signer_id="agente-002")

    logger.log_sign(
        signer_id="agente-002",
        public_key_hex=signer.public_key_hex(),
        result="ok",
    )

    contenido = logger.path.read_text(encoding="utf-8")
    assert signer.public_key_hex() not in contenido
    event = logger.read_all()[0]
    assert len(event["public_key_hash"]) == 16


def test_no_private_key_logged(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl")
    signer = Ed25519Signer(signer_id="agente-004")

    logger.log_sign(
        signer_id="agente-004",
        public_key_hex=signer.public_key_hex(),
        result="ok",
    )

    contenido = logger.path.read_text(encoding="utf-8")
    privada_hex = signer.private_bytes().hex()
    assert privada_hex not in contenido
    assert privada_hex.upper() not in contenido


def test_error_recorded(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl")
    logger.log_verify(
        algorithm="Ed25519",
        public_key_hex="ab" * 32,
        result="fail",
        error="firma inválida",
    )
    event = logger.read_all()[0]
    assert event["result"] == "fail"
    assert event["error"] == "firma inválida"
    assert event["operation"] == "verify:Ed25519"


def test_multiple_events_append(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl")
    signer = Ed25519Signer(signer_id="agente-005")
    for i in range(5):
        logger.log_sign(
            signer_id=f"agente-{i:03d}",
            public_key_hex=signer.public_key_hex(),
            result="ok",
        )
    events = logger.read_all()
    assert len(events) == 5
    assert events[0]["signer_id"] == "agente-000"
    assert events[4]["signer_id"] == "agente-004"


def test_rotation(tmp_path):
    logger = AuditLogger(tmp_path / "audit.jsonl", max_bytes=200)
    signer = Ed25519Signer(signer_id="agente-006")
    for _ in range(20):
        logger.log_sign(
            signer_id="agente-006",
            public_key_hex=signer.public_key_hex(),
            result="ok",
        )
    rotated = tmp_path / "audit.jsonl.1"
    assert rotated.exists()


def test_read_all_empty_when_no_file(tmp_path):
    logger = AuditLogger(tmp_path / "no-existe.jsonl")
    assert logger.read_all() == []


def test_event_is_frozen(tmp_path):
    logger = AuditLogger(tmp_path / "x.jsonl")
    event = logger.log_sign(signer_id="x", public_key_hex="00" * 32, result="ok")
    with pytest.raises(Exception):
        event.result = "alterado"  # type: ignore
