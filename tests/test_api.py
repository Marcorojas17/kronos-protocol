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
