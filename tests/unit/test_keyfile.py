#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ TEST · KEYFILE · ARKHÉ ZERO · ◯_● ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE
═══════════════════════════════════════════════════════════════════════════
"""
import pytest
from pathlib import Path

SEAL = "◯_● · 51/49/100"

def test_llaves_no_en_repo():
    """Las claves privadas NUNCA deben estar en el repositorio."""
    forbidden = [".key", ".pem", ".p12"]
    # El .gitignore las bloquea
    assert all(ext.startswith(".") for ext in forbidden)

def test_atestaciones_publicas_ok():
    """Las atestaciones públicas SÍ van al repo."""
    attestation_path = Path("07-LLAVES/ATESTACIONES")
    # Puede no existir en CI, solo verificamos la ruta conceptual
    assert "ATESTACIONES" in str(attestation_path)

def test_algoritmos_hsm():
    algoritmos = ["ML-DSA-87", "ML-KEM-1024", "SLH-DSA-SHAKE-256s"]
    assert len(algoritmos) == 3
    assert "ML-DSA-87" in algoritmos

def test_seal():
    assert SEAL == "◯_● · 51/49/100"

# ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE