from core.perito_seal import generar_sello_kronos
from core.hash_to_semantic import generate_manifesto_from_hash

FOLIO = "5204160405358537"
PERITO = "kronosproyecto@hotmail.com"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SHA = "a4ff808e"

def test_sello_contiene_folio(): assert FOLIO in generar_sello_kronos(GENESIS)
def test_sello_contiene_mt01jaaf(): assert "MT01JAAF" in generar_sello_kronos(GENESIS)
def test_sello_contiene_sha(): assert SHA in generar_sello_kronos(GENESIS).lower()
def test_sello_contiene_perito(): assert PERITO in generar_sello_kronos(GENESIS)
def test_sello_contiene_genesis(): assert GENESIS in generar_sello_kronos(GENESIS)
def test_sello_formato_kronos():
    s=generar_sello_kronos(GENESIS)
    assert s.startswith("FOLIO:") and "|PERITO:" in s and "|GENESIS:" in s and "|SELLO:" in s
def test_sello_deterministico(): assert generar_sello_kronos(GENESIS)==generar_sello_kronos(GENESIS)
def test_sello_distintos(): assert generar_sello_kronos(GENESIS)!=generar_sello_kronos("a"*64)
def test_manifiesto_51_49():
    m=generate_manifesto_from_hash(GENESIS,51,49)
    assert "51%_HUMANO" in m and "49%_IA" in m and "MT01JAAF" in m and SHA in m.lower()
def test_perito_no_vacio(): assert "@" in PERITO
def test_folio_formato(): assert FOLIO.isdigit() and len(FOLIO)==16
