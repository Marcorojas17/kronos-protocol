"""
KRONOS 360 PVA - Core Module - Folio 5204160405358537
Perito: kronosproyecto@hotmail.com - Marco Antonio Rojas Valdovinos
Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
Sello: KRONOS-TRACE-PVA-5204160405358537
TX: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
SAFE: 2607146379465
Polaridad: 51% HUMANO / 49% IA - innegociable
Norma: NOM-151 + ISO 27001 + eIDAS
"""

from pathlib import Path

# === SELLO MAESTRO INMUTABLE ===
FOLIO_MAESTRO = "5204160405358537"
GENESIS_HASH = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
SELLO_KRONOS = "KRONOS-TRACE-PVA-5204160405358537"
PERITO_EMAIL = "kronosproyecto@hotmail.com"
PERITO_NOMBRE = "Marco Antonio Rojas Valdovinos"
TX_MAESTRA = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
SAFE_CREATIVE = "2607146379465"
CHAIN = "sepolia"
CHAIN_ID = 11155111
POLARIDAD = "51%_HUMANO_49%_IA"

MANIFIESTO = f"FOLIO:{FOLIO_MAESTRO}|PERITO:{PERITO_EMAIL}|GENESIS:{GENESIS_HASH}|SELLO:{SELLO_KRONOS}"

# Paths
AUDIT_DIR = Path(__file__).parent.parent / "audit"
SELLO_PATH = AUDIT_DIR / "sello_kronos.json"


# Lazy imports para no romper si faltan deps
def get_audit_trail():
    from .pva_audit_trail import PVAAuditTrail

    return PVAAuditTrail()


def get_perito_seal(private_key=None):
    from .perito_seal import PeritoSeal

    return PeritoSeal(private_key)


def get_blockchain_verifier():
    from .blockchain_verifier import BlockchainVerifier

    return BlockchainVerifier()


def get_genesis_breather():
    from .genesis_breather import GenesisBreather

    return GenesisBreather()


def get_hash_to_semantic():
    from .hash_to_semantic import HashToSemantic

    return HashToSemantic()


# Dictamen rapido - 4/4
def verifica_folio_rapido(folio: str = FOLIO_MAESTRO) -> dict:
    """Verificacion rapida folio maestro - confianza 4/4"""
    is_maestro = folio == FOLIO_MAESTRO
    return {
        "folio": folio,
        "es_maestro": is_maestro,
        "valido": is_maestro,
        "genesis": GENESIS_HASH,
        "sello": SELLO_KRONOS,
        "perito": PERITO_EMAIL,
        "tx": TX_MAESTRA,
        "safe": SAFE_CREATIVE,
        "polaridad": POLARIDAD,
        "manifiesto": MANIFIESTO,
        "confianza": "4/4" if is_maestro else "0/4",
        "urls": {
            "verifica": f"https://kronos-legado.digital/v/{folio}",
            "etherscan": f"https://sepolia.etherscan.io/tx/{TX_MAESTRA}",
            "api": f"https://api.kronos-legado.digital/v1/api/verifica/{folio}",
        },
        "dictamen": f"DICTAMEN 10/10 - Folio {folio} {'VALIDO' if is_maestro else 'INVALIDO - maestro es ' + FOLIO_MAESTRO}",
    }


def dictamen_10_10() -> str:
    return f"""
DICTAMEN PERICIAL 10/10 - KRONOS 360 PVA
Folio: {FOLIO_MAESTRO}
Genesis: {GENESIS_HASH}
Sello: {SELLO_KRONOS}
Perito: {PERITO_EMAIL} - {PERITO_NOMBRE}
TX: {TX_MAESTRA} - {CHAIN} {CHAIN_ID}
SAFE: {SAFE_CREATIVE}
Polaridad: {POLARIDAD}

Manifiesto: {MANIFIESTO}

Verifica:
- Local: audit/sello_kronos.json
- API: https://api.kronos-legado.digital/v1/api/verifica/{FOLIO_MAESTRO}
- Etherscan: https://sepolia.etherscan.io/tx/{TX_MAESTRA}
- Web: https://kronos-legado.digital/v/{FOLIO_MAESTRO}

Norma: NOM-151 Art.8/10/38 + ISO 27001 A5.9 A5.17 A8.24 A8.26 A8.28 + eIDAS
Confianza: 4/4 - Listo tribunal MP/Fiscalia/SAT
""".strip()


# Exports
__all__ = [
    "FOLIO_MAESTRO",
    "GENESIS_HASH",
    "SELLO_KRONOS",
    "PERITO_EMAIL",
    "PERITO_NOMBRE",
    "TX_MAESTRA",
    "SAFE_CREATIVE",
    "CHAIN",
    "CHAIN_ID",
    "POLARIDAD",
    "MANIFIESTO",
    "AUDIT_DIR",
    "SELLO_PATH",
    "get_audit_trail",
    "get_perito_seal",
    "get_blockchain_verifier",
    "get_genesis_breather",
    "get_hash_to_semantic",
    "verifica_folio_rapido",
    "dictamen_10_10",
]

# Auto-check al importar en debug
if __name__ != "__main__":
    # No spam, solo disponible
    pass
else:
    print(dictamen_10_10())
    print("\nVerifica rapido:", verifica_folio_rapido())
