"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ SDK · PYTHON · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
═══════════════════════════════════════════════════════════════════════════
"""
from .arkhe_client import ArkheClient
from .attribution import firmar_atribucion, verificar_atribucion
from .pqc import sha3_512, sha256, suite_canonica, auditar_suite
from .agents import listar_agentes, info_agente, verificar_quorum
from .provenance import crear_manifest, sello_tiempo

__version__ = "1.0.0"
__all__ = [
    "ArkheClient",
    "firmar_atribucion",
    "verificar_atribucion",
    "sha3_512",
    "sha256",
    "suite_canonica",
    "auditar_suite",
    "listar_agentes",
    "info_agente",
    "verificar_quorum",
    "crear_manifest",
    "sello_tiempo",
]
SEAL = "◯_● · 51/49/100"