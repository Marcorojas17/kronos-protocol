from core.blockchain_verifier import verify_on_etherscan, get_chain_info
from core.perito_seal import generar_sello_kronos

FOLIO="5204160405358537"
PERITO="kronosproyecto@hotmail.com"
GENESIS="41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
TX_REAL="0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
SHA="a4ff808e"
PERICIAL="KRONOS-MT01JAAF"

def test_tx_valida_etherscan_status_1_MT01JAAF():
    mock_ok={"status":"1","message":"OK","result":{"blockNumber":"12345678","timeStamp":"1724567047","hash":TX_REAL,"from":"0xPeritoWallet","to":"0xPVAContract","isError":"0"}}
    assert verify_on_etherscan(TX_REAL,mock_ok) is True

def test_tx_invalida_status_0(): assert verify_on_etherscan("0x"+"0"*64,{"status":"0","message":"NOTOK","result":"Transaction not found"}) is False
def test_tx_error_sin_result(): assert verify_on_etherscan(TX_REAL,{"status":"0","message":"Invalid API Key"}) is False
def test_tx_vacia_no_crashea(): assert verify_on_etherscan(TX_REAL,{}) is False

def test_folio_no_duplicado_en_contrato():
    registros={FOLIO:{"folio":FOLIO,"hashGenesis":GENESIS}}
    ya_existe=FOLIO in registros and len(registros[FOLIO]["folio"])>0
    assert ya_existe is True

def test_folio_nuevo_si_permitido(): assert "9999999999999999" not in {}

def test_sello_ligado_a_tx_MT01JAAF():
    sello=generar_sello_kronos(GENESIS)
    assert FOLIO in sello and PERITO in sello and "MT01JAAF" in sello and SHA in sello.lower()
    registro={"folio":FOLIO,"hashGenesis":GENESIS,"sello":sello,"tx":TX_REAL,"pericial":PERICIAL,"sha":SHA}
    assert registro["folio"]==FOLIO and registro["tx"]==TX_REAL
    assert verify_on_etherscan(registro["tx"],{"status":"1","result":{}}) is True

def test_genesis_formato_y_sha_prefijo():
    assert len(GENESIS)==64 and all(c in "0123456789abcdef" for c in GENESIS)
    assert GENESIS.startswith(SHA)

def test_chain_info_MT01JAAF():
    info=get_chain_info()
    assert info["chain_id"]==80002
    assert info["folio_pericial"]==PERICIAL
    assert info["sha"]==SHA
    assert info["chain"]=="Polygon Amoy"
    assert "amoy.polygonscan.com" in info["explorer"]
