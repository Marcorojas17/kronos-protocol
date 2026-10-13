"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ TESTS · CONFTEST · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
import pytest
import hashlib
from pathlib import Path

SEAL = "◯_● · 51/49/100"
INDEX_ZERO_SHA256 = "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112"

@pytest.fixture(scope="session")
def seal() -> str:
    return SEAL

@pytest.fixture(scope="session")
def index_zero_sha256() -> str:
    return INDEX_ZERO_SHA256

@pytest.fixture
def sample_content() -> str:
    return "Acta fundacional ARKHÉ ZERO · 2026"

@pytest.fixture
def project_root() -> Path:
    return Path(__file__).parent.parent.resolve()

@pytest.fixture
def sha3_512_helper():
    def _hash(text: str) -> str:
        return hashlib.sha3_512(text.encode("utf-8")).hexdigest()
    return _hash

# ◯_● · 51/49/100 · KRONOS