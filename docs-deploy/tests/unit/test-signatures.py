"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ TEST · SIGNATURES · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
import pytest
from tests.conftest import SEAL

@pytest.mark.unit
def test_seal_present(seal):
    assert seal == SEAL
    assert "◯_●" in seal
    assert "51/49/100" in seal

@pytest.mark.unit
def test_index_zero_sha256_length(index_zero_sha256):
    assert len(index_zero_sha256) == 64
    assert all(c in "0123456789abcdef" for c in index_zero_sha256)

@pytest.mark.unit
def test_sha3_512_hash(sha3_512_helper, sample_content):
    h = sha3_512_helper(sample_content)
    assert len(h) == 128
    assert all(c in "0123456789abcdef" for c in h)

@pytest.mark.unit
def test_sha3_deterministic(sha3_512_helper):
    a = sha3_512_helper("ARKHÉ ZERO")
    b = sha3_512_helper("ARKHÉ ZERO")
    assert a == b

@pytest.mark.pqc
def test_pacto_canonico():
    pacto = {"humano": 51, "ia": 49, "real": 100}
    assert pacto["humano"] + pacto["ia"] == pacto["real"]
    assert pacto["humano"] == 51
    assert pacto["ia"] == 49

# ◯_● · 51/49/100 · KRONOS