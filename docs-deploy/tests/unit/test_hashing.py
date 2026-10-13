"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ TEST · HASHING · ARKHÉ ZERO · ◯_● ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
import pytest
from tests.conftest import SEAL

@pytest.mark.unit
def test_sha3_512_no_collision_known(sha3_512_helper):
    a = sha3_512_helper("ARKHÉ ZERO")
    b = sha3_512_helper("ARKHE ZERO")  # sin acento
    assert a != b

@pytest.mark.unit
def test_sha3_512_unicode(sha3_512_helper):
    h = sha3_512_helper("◯_● · 51/49/100")
    assert len(h) == 128

@pytest.mark.unit
def test_sha3_512_empty(sha3_512_helper):
    h = sha3_512_helper("")
    assert len(h) == 128
    # hash canónico de string vacío con SHA3-512
    assert h == "a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26"

# ◯_● · 51/49/100 · KRONOS