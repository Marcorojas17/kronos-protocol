"""Registro de auditoría estructurado en JSONL.

Reglas de seguridad:
    - Nunca se registra el contenido del mensaje firmado.
    - Nunca se registra la llave privada.
    - Nunca se registra la firma.
    - La llave pública se registra solo hasheada (16 hex).

Creado por: Marco Antonio Rojas Valdovinos (#000)
"""
from __future__ import annotations

import hashlib
import json
import os
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

SCHEMA_VERSION = 1
PUBLIC_KEY_HASH_CHARS = 16


@dataclass(frozen=True)
class AuditEvent:
    schema: int
    timestamp: str
    operation: str
    signer_id: str
    public_key_hash: str
    result: str
    error: str | None = None


def _public_key_hash(public_key_hex: str) -> str:
    raw = bytes.fromhex(public_key_hex) if public_key_hex else b""
    return hashlib.sha256(raw).hexdigest()[:PUBLIC_KEY_HASH_CHARS]


def _now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


class AuditLogger:
    def __init__(self, path: Path, max_bytes: int | None = 10 * 1024 * 1024):
        self._path = Path(path)
        self._max_bytes = max_bytes
        self._path.parent.mkdir(parents=True, exist_ok=True)

    @property
    def path(self) -> Path:
        return self._path

    def _rotate_if_needed(self) -> None:
        if not self._max_bytes:
            return
        if not self._path.exists():
            return
        if self._path.stat().st_size < self._max_bytes:
            return

        for i in range(9, 0, -1):
            older = Path(str(self._path) + f".{i}")
            newer = Path(str(self._path) + f".{i + 1}") if i < 9 else self._path
            if older.exists() and not newer.exists():
                os.replace(older, newer)
        os.replace(self._path, Path(str(self._path) + ".1"))

    def _write(self, event: AuditEvent) -> None:
        self._rotate_if_needed()
        line = json.dumps(asdict(event), ensure_ascii=False)
        with self._path.open("a", encoding="utf-8") as f:
            f.write(line + "\n")

    def log_sign(
        self,
        signer_id: str,
        public_key_hex: str,
        result: str,
        error: str | None = None,
    ) -> AuditEvent:
        event = AuditEvent(
            schema=SCHEMA_VERSION,
            timestamp=_now_iso(),
            operation="sign",
            signer_id=signer_id,
            public_key_hash=_public_key_hash(public_key_hex),
            result=result,
            error=error,
        )
        self._write(event)
        return event

    def log_verify(
        self,
        algorithm: str,
        public_key_hex: str,
        result: str,
        error: str | None = None,
    ) -> AuditEvent:
        event = AuditEvent(
            schema=SCHEMA_VERSION,
            timestamp=_now_iso(),
            operation=f"verify:{algorithm}",
            signer_id="",
            public_key_hash=_public_key_hash(public_key_hex),
            result=result,
            error=error,
        )
        self._write(event)
        return event

    def read_all(self) -> list[dict]:
        if not self._path.exists():
            return []
        events = []
        with self._path.open("r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    events.append(json.loads(line))
        return events
