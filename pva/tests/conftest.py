import pathlib, sys
# MT01JAAF 100/10 - root es parent de tests
ROOT = pathlib.Path(__file__).parent.parent.resolve()
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# Datos maestros MT01JAAF para todos los tests
FOLIO_MAESTRO = "5204160405358537"
FOLIO_PERICIAL = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SC = "2607146379465"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
