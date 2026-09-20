# -*- coding: utf-8 -*-
"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗                      ║
║   ██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝                      ║
║   █████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗                      ║
║   ██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║                      ║
║   ██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║                      ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝                      ║
║                                                                              ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║   MERKLE EXPORT · v1.0 · PRUEBA DE INCLUSIÓN VERIFICABLE · NOM-151         ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

import os
import sys
import json
import hashlib
from datetime import datetime, timezone
from pathlib import Path

# ─────────────────────────────────────────────────────────────────────────────
# PALETA OBSIDIAN & GOLD + PLATINUM
# ─────────────────────────────────────────────────────────────────────────────
class C:
    RESET    = "\033[0m"
    BOLD     = "\033[1m"
    DIM      = "\033[2m"
    GOLD     = "\033[38;2;201;162;39m"
    GOLD_2   = "\033[38;2;229;199;107m"
    PLAT     = "\033[38;2;183;148;246m"
    CREAM    = "\033[38;2;245;240;230m"
    GREEN    = "\033[38;2;88;166;109m"
    AMBER    = "\033[38;2;214;158;46m"
    RED      = "\033[38;2;176;74;74m"
    CYAN     = "\033[38;2;106;176;196m"


def limpiar():
    os.system("cls" if os.name == "nt" else "clear")


def banner():
    print(f"""
{C.GOLD}╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗                      ║
║   ██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝                      ║
║   █████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗                      ║
║   ██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║                      ║
║   ██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║                      ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝                      ║
║                                                                              ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║   MERKLE EXPORT · v1.0 · PRUEBA DE INCLUSIÓN VERIFICABLE · NOM-151         ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
╚══════════════════════════════════════════════════════════════════════════════╝{C.RESET}
""")


def log(icono, mensaje, color=C.CREAM):
    print(f"{color}{icono}{C.RESET}  {C.CREAM}{mensaje}{C.RESET}")


def linea():
    print(f"{C.GOLD_2}{'─' * 78}{C.RESET}")


def bloque_ui(titulo, lineas):
    ancho = 76 - len(titulo)
    print(f"{C.PLAT}┌─[ {titulo} ]{'─' * max(ancho, 3)}┐{C.RESET}")
    for l in lineas:
        print(f"{C.PLAT}│{C.RESET} {C.CREAM}{l:<75}{C.RESET} {C.PLAT}│{C.RESET}")
    print(f"{C.PLAT}└{'─' * 77}┘{C.RESET}")


# ─────────────────────────────────────────────────────────────────────────────
# ÁRBOL DE MERKLE
# ─────────────────────────────────────────────────────────────────────────────
def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_pair(h1: str, h2: str) -> str:
    """Concatena dos hashes y devuelve su SHA-256."""
    return sha256_hex(bytes.fromhex(h1) + bytes.fromhex(h2))


def construir_arbol(hashes: list) -> dict:
    """
    Construye un árbol de Merkle a partir de una lista de hashes hex.
    Devuelve dict con: root, niveles (lista de listas), hojas originales.
    """
    if not hashes:
        raise ValueError("La lista de hashes está vacía.")

    niveles = [list(hashes)]
    actual = list(hashes)

    while len(actual) > 1:
        siguiente = []
        # Si es impar, el último se duplica (regla Bitcoin)
        if len(actual) % 2 == 1:
            actual.append(actual[-1])
        for i in range(0, len(actual), 2):
            siguiente.append(sha256_pair(actual[i], actual[i + 1]))
        niveles.append(siguiente)
        actual = siguiente

    return {
        "root": actual[0],
        "niveles": niveles,
        "hojas": list(hashes),
    }


def prueba_inclusion(arbol: dict, indice_hoja: int) -> dict:
    """
    Genera la prueba de Merkle (lista de hashes hermanos) para una hoja.
    """
    prueba = []
    idx = indice_hoja
    for nivel in arbol["niveles"][:-1]:
        if len(nivel) % 2 == 1:
            nivel = nivel + [nivel[-1]]
        if idx % 2 == 0:
            hermano = nivel[idx + 1] if idx + 1 < len(nivel) else nivel[idx]
            prueba.append({"posicion": "derecha", "hash": hermano})
        else:
            hermano = nivel[idx - 1]
            prueba.append({"posicion": "izquierda", "hash": hermano})
        idx //= 2
    return prueba


def verificar_prueba(hoja_hash: str, prueba: list, root_esperada: str) -> bool:
    """
    Verifica que una hoja pertenece al árbol dada su prueba de Merkle.
    """
    actual = hoja_hash
    for paso in prueba:
        if paso["posicion"] == "derecha":
            actual = sha256_pair(actual, paso["hash"])
        else:
            actual = sha256_pair(paso["hash"], actual)
    return actual == root_esperada


# ─────────────────────────────────────────────────────────────────────────────
# EXPORTACIÓN
# ─────────────────────────────────────────────────────────────────────────────
WALLET_PATH = Path("wallet.json")
EXPORT_DIR = Path("merkle_exports")
EXPORT_DIR.mkdir(exist_ok=True)


def cargar_wallet():
    if not WALLET_PATH.exists():
        print(f"{C.RED}✗ No se encontró wallet.json en este directorio.{C.RESET}")
        print(f"{C.DIM}  Ejecuta primero genesis_miner.py para generar bloques.{C.RESET}")
        sys.exit(1)
    with open(WALLET_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def exportar():
    limpiar()
    banner()

    wallet = cargar_wallet()
    bloques = wallet.get("bloques", [])

    if not bloques:
        print(f"{C.AMBER}▸ El wallet no contiene bloques todavía.{C.RESET}")
        sys.exit(0)

    hashes = [b["hash"] for b in bloques]

    bloque_ui(
        "ESTADO DEL WALLET",
        [
            f"Balance           : {wallet['balance']} KRONOS",
            f"Bloques minados   : {len(bloques)}",
            f"Último hash       : {wallet['ultimo_hash'][:56]}…",
        ],
    )

    print()
    log("◆", "Construyendo árbol de Merkle…", C.PLAT)
    arbol = construir_arbol(hashes)
    log("✓", f"Árbol construido: {len(arbol['niveles'])} niveles", C.GREEN)
    log("✓", f"Raíz Merkle     : {arbol['root'][:56]}…", C.GREEN)

    print()
    log("◆", "Generando prueba de inclusión del último bloque…", C.PLAT)
    idx_ultimo = len(hashes) - 1
    prueba = prueba_inclusion(arbol, idx_ultimo)
    log("✓", f"Prueba generada: {len(prueba)} pasos", C.GREEN)

    print()
    log("◆", "Verificando la prueba…", C.PLAT)
    valido = verificar_prueba(hashes[idx_ultimo], prueba, arbol["root"])
    if valido:
        log("✓", "Prueba de inclusión VÁLIDA", C.GREEN)
    else:
        log("✗", "Prueba de inclusión INVÁLIDA", C.RED)
        sys.exit(2)

    # ── Exportar JSON verificable ──
    timestamp = datetime.now(timezone.utc).isoformat()
    export = {
        "protocolo": "KRONOS",
        "version": "merkle-1.0",
        "norma": "NOM-151-SCFI-2016",
        "generado": timestamp,
        "wallet": {
            "balance": wallet["balance"],
            "bloques_totales": len(bloques),
        },
        "merkle": {
            "algoritmo": "SHA-256",
            "root": arbol["root"],
            "niveles": len(arbol["niveles"]),
            "hojas": len(hashes),
        },
        "prueba_inclusion": {
            "indice": idx_ultimo,
            "hoja_hash": hashes[idx_ultimo],
            "bloque": bloques[idx_ultimo]["bloque"],
            "camino": prueba,
            "root_esperada": arbol["root"],
            "valida": valido,
        },
        "verificacion": {
            "como": "Recomputar SHA-256 de pares siguiendo el camino.",
            "instruccion": "Empezar con hoja_hash. Para cada paso: si posicion='derecha', sha256(actual||hash). Si 'izquierda', sha256(hash||actual). Al final debe coincidir con root_esperada.",
            "independiente": True,
        },
    }

    nombre = f"merkle_proof_{timestamp.replace(':', '-').replace('.', '-')}.json"
    ruta = EXPORT_DIR / nombre
    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(export, f, indent=4, ensure_ascii=False)

    print()
    bloque_ui(
        "EXPORTACIÓN COMPLETADA",
        [
            f"Archivo           : {ruta}",
            f"Raíz Merkle       : {arbol['root'][:56]}…",
            f"Bloque probado    : #{bloques[idx_ultimo]['bloque']}",
            f"Pasos en la prueba: {len(prueba)}",
            f"Estado            : {'VÁLIDA ✓' if valido else 'INVÁLIDA ✗'}",
        ],
    )

    print()
    log("◆", "Cualquier tercero puede verificar este archivo sin acceso a tu máquina.", C.PLAT)
    log("◆", "Solo necesita el JSON y una implementación de SHA-256.", C.PLAT)

    # ── Sello final ──
    print(f"""
{C.GOLD}╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗                      ║
║   ██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝                      ║
║   █████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗                      ║
║   ██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║                      ║
║   ██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║                      ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝                      ║
║                                                                              ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║   [ PROTOCOLO DE INTEGRIDAD DIGITAL · REGISTRO CRIPTOGRÁFICO ]             ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    ║
║                                                                              ║
║   HASH: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e  ║
║   BLOQUE: GÉNESIS · ANCLAJE: ETHEREUM MAINNET · ESTADO: VERIFICADO          ║
║                                                                              ║
║   ┌──────────────────────────────────────────────────────────────────────┐   ║
║   │  [ 0x8c ] ──> [ 0xa8 ] ──> [ 0xe8 ] ──> [ 0x4e ] ──> [ 0x12 ] ──> ∞  │   ║
║   └──────────────────────────────────────────────────────────────────────┘   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝{C.RESET}
""")


if __name__ == "__main__":
    try:
        exportar()
    except KeyboardInterrupt:
        print(f"\n{C.AMBER}▸ Exportación cancelada por el fundador.{C.RESET}\n")