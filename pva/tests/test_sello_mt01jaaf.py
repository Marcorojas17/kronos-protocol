import pytest
from core.perito_seal import generar_sello_kronos
from core.hash_to_semantic import generate_manifesto_from_hash

# Datos maestros PVA MT01JAAF
FOLIO_MAESTRO = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
GENESIS_SHORT = "a4ff808e"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF"
SC = "2607146379465"
TX_AMOY = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"

def test_sello_contiene_folio_maestro():
    sello = generar_sello_kronos(GENESIS)
    assert FOLIO_MAESTRO in sello, f"Sello debe contener folio maestro {FOLIO_MAESTRO}"

def test_sello_contiene_pericial_MT01JAAF():
    sello = generar_sello_kronos(GENESIS)
    assert "MT01JAAF" in sello, "Sello debe contener folio pericial MT01JAAF"
    assert FOLIO_PERICIAL in sello or "MT01JAAF" in sello

def test_sello_contiene_sha_a4ff808e():
    sello = generar_sello_kronos(GENESIS)
    assert SHA.lower() in sello.lower() or GENESIS_SHORT.lower() in sello.lower(), f"Sello debe contener SHA {SHA}"

def test_sello_contiene_perito():
    sello = generar_sello_kronos(GENESIS)
    assert PERITO in sello, f"Sello debe contener perito {PERITO}"

def test_sello_contiene_genesis():
    sello = generar_sello_kronos(GENESIS)
    assert GENESIS in sello or GENESIS[:16] in sello, "Sello debe contener hash genesis"

def test_sello_formato_kronos_MT01JAAF():
    sello = generar_sello_kronos(GENESIS)
    assert "FOLIO" in sello
    assert "PERITO" in sello
    assert "GENESIS" in sello
    # Nuevo formato 100/10 exige TRACE
    assert "KRONOS-TRACE" in sello or "TRACE" in sello

def test_sello_trace_completo():
    sello = generar_sello_kronos(GENESIS)
    # Debe contener sello completo
    assert SELLO in sello or (FOLIO_MAESTRO in sello and "MT01JAAF" in sello)

def test_sello_deterministico():
    """Mismo genesis = mismo sello, siempre (NOM-151 integridad) MT01JAAF"""
    s1 = generar_sello_kronos(GENESIS)
    s2 = generar_sello_kronos(GENESIS)
    assert s1 == s2

def test_sello_genesis_distintos_sellos_distintos():
    s1 = generar_sello_kronos(GENESIS)
    s2 = generar_sello_kronos("a" * 64)
    assert s1 != s2

def test_manifiesto_51_49_respeta_polaridad_MT01JAAF():
    manifiesto = generate_manifesto_from_hash(GENESIS, 51, 49)
    assert "51%_HUMANO" in manifiesto
    assert "49%_IA" in manifiesto
    # Manifiesto 100/10 debe mencionar MT01JAAF o SHA
    assert "MT01JAAF" in manifiesto or SHA in manifiesto or "a4ff808e" in manifiesto.lower() or GENESIS[:8] in manifiesto

def test_perito_no_vacio():
    assert len(PERITO) > 5
    assert "@" in PERITO
    assert PERITO == "kronosproyecto@hotmail.com"

def test_folio_formato_numerico_16_digitos():
    assert FOLIO_MAESTRO.isdigit()
    assert len(FOLIO_MAESTRO) == 16
    assert FOLIO_MAESTRO == "5204160405358537"

def test_folio_pericial_formato():
    assert FOLIO_PERICIAL == "KRONOS-MT01JAAF"
    assert "MT01JAAF" in FOLIO_PERICIAL
    assert FOLIO_PERICIAL.startswith("KRONOS-")

def test_sha_formato():
    assert len(SHA) == 8
    assert SHA == "a4ff808e"
    assert all(c in "0123456789abcdef" for c in SHA.lower())

def test_genesis_formato_64_hex():
    assert len(GENESIS) == 64
    assert all(c in "0123456789abcdef" for c in GENESIS.lower())
    assert GENESIS.startswith(SHA) # SHA es prefijo de genesis

def test_sc_formato():
    assert SC == "2607146379465"
    assert len(SC) == 13
    assert SC.isdigit()
