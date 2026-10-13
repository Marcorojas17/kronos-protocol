import pytest
from core.perito_seal import generar_sello_kronos
from core.hash_to_semantic import generate_manifesto_from_hash

# Datos maestros del expediente PVA
FOLIO = "5204160405358537"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO_ESPERADO_PREFIX = "KRONOS-TRACE-PVA-"


def test_sello_contiene_folio():
    sello = generar_sello_kronos(GENESIS)
    assert FOLIO in sello, f"Sello debe contener folio {FOLIO}"


def test_sello_contiene_perito():
    sello = generar_sello_kronos(GENESIS)
    assert PERITO in sello, f"Sello debe contener perito {PERITO}"


def test_sello_contiene_genesis():
    sello = generar_sello_kronos(GENESIS)
    assert GENESIS in sello, "Sello debe contener hash genesis"


def test_sello_formato_kronos():
    sello = generar_sello_kronos(GENESIS)
    # Formato exigido: FOLIO:xxx|PERITO:xxx|GENESIS:xxx
    assert sello.startswith("FOLIO:")
    assert "|PERITO:" in sello
    assert "|GENESIS:" in sello
    parts = sello.split("|")
    assert len(parts) == 3


def test_sello_deterministico():
    """Mismo genesis = mismo sello, siempre (NOM-151 integridad)"""
    s1 = generar_sello_kronos(GENESIS)
    s2 = generar_sello_kronos(GENESIS)
    assert s1 == s2


def test_sello_genesis_distintos_sellos_distintos():
    s1 = generar_sello_kronos(GENESIS)
    s2 = generar_sello_kronos("a" * 64)
    assert s1 != s2


def test_manifiesto_51_49_respeta_polaridad():
    manifiesto = generate_manifesto_from_hash(GENESIS, 51, 49)
    assert "51%_HUMANO" in manifiesto
    assert "49%_IA" in manifiesto
    assert GENESIS[:32] in manifiesto or manifiesto.count(":") >= 1


def test_perito_no_vacio():
    assert len(PERITO) > 5
    assert "@" in PERITO
    assert PERITO == "kronosproyecto@hotmail.com"


def test_folio_formato_numerico_16_digitos():
    assert FOLIO.isdigit()
    assert len(FOLIO) == 16
    assert FOLIO == "5204160405358537"
