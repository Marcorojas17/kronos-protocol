#!/usr/bin/env python3
"""
KRONOS GUARDIAN
───────────────
Implementación ejecutable de los 6 principios del Protocolo Kronos.

Recibe una decisión, aplica la regla del principio correspondiente,
la hashea, la encadena con la anterior y la publica en el log.

Sin dependencias externas. Python 3.8+.

Uso:
    python guardian.py "verificar_integridad" "documento X" "verificar autoría"
    python guardian.py --auto
    python guardian.py --verify
"""

import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

# ─── Configuración ────────────────────────────────────────────────
AUTOR = "Marco Antonio Rojas Valdovinos"
ANIO = "2026"
RAIZ = Path(__file__).parent
LOG_PATH = RAIZ / "logs" / "log.json"

# ─── Los 6 principios como acciones ejecutables ───────────────────
ACCIONES = {
    "verificar_integridad": {
        "principio": 1,
        "nombre": "Integridad",
        "descripcion": "Confirma que un elemento no fue alterado.",
    },
    "registrar_trazabilidad": {
        "principio": 2,
        "nombre": "Trazabilidad",
        "descripcion": "Registra una interacción con fecha, origen y propósito.",
    },
    "bloquear_comercial": {
        "principio": 3,
        "nombre": "No Comercialización",
        "descripcion": "Bloquea una operación con fines de lucro no autorizada.",
    },
    "bloquear_entrenamiento_ia": {
        "principio": 4,
        "nombre": "No Entrenamiento IA",
        "descripcion": "Marca una operación como prohibida para entrenamiento.",
    },
    "marcar_citacion": {
        "principio": 5,
        "nombre": "Citación Obligatoria",
        "descripcion": "Marca una entrada con la firma obligatoria del autor.",
    },
    "alertar_violacion": {
        "principio": 6,
        "nombre": "Defensa Activa",
        "descripcion": "Emite alerta pública ante una violación detectada.",
    },
}


# ─── Utilidades ───────────────────────────────────────────────────
def ahora_iso():
    """Timestamp ISO 8601 con milisegundos, UTC."""
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.") + \
           f"{datetime.now(timezone.utc).microsecond // 1000:03d}Z"


def hash_sha256(texto):
    """Hash SHA-256 hex de un string."""
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def cargar_log():
    """Carga el log existente o devuelve lista vacía."""
    if not LOG_PATH.exists():
        return []
    try:
        return json.loads(LOG_PATH.read_text(encoding="utf-8"))
    except Exception:
        return []


def guardar_log(entradas):
    """Guarda el log con formato legible."""
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    LOG_PATH.write_text(
        json.dumps(entradas, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )


# ─── Núcleo: registrar una decisión ───────────────────────────────
def registrar(accion, entrada, proposito, forzar_autor=None):
    """
    Registra una decisión del guardián.
    Aplica la regla del principio correspondiente.
    Devuelve la entrada creada.
    """
    if accion not in ACCIONES:
        raise ValueError(f"Acción desconocida: {accion}")

    regla = ACCIONES[accion]
    log = cargar_log()

    # Regla 2 · Trazabilidad: campos obligatorios
    if not entrada or not proposito:
        raise ValueError("Falta entrada o propósito. Principio 2 rechaza.")

    # Preparar campos base
    numero = len(log) + 1
    cuando = ahora_iso()
    hash_previo = log[-1]["hash"] if log else None
    autor = forzar_autor or AUTOR

    # Contenido a hashear: incluye TODO lo verificable
    contenido = "|".join([
        str(numero),
        cuando,
        accion,
        str(regla["principio"]),
        entrada,
        proposito,
        autor,
        ANIO,
        hash_previo or "GENESIS",
    ])

    hash_actual = hash_sha256(contenido)

    entrada_log = {
        "n": numero,
        "cuando": cuando,
        "accion": accion,
        "principio": regla["principio"],
        "principio_nombre": regla["nombre"],
        "entrada": entrada,
        "proposito": proposito,
        "autor": autor,
        "anio": ANIO,
        "noai": True,
        "hash_previo": hash_previo,
        "hash": hash_actual,
    }

    log.append(entrada_log)
    guardar_log(log)
    return entrada_log


# ─── Modo automático: toca los 6 principios ───────────────────────
def modo_auto():
    """Ejecuta un ciclo del guardián: una entrada por principio."""
    print("KRONOS GUARDIAN · Ciclo completo")
    print("─" * 60)

    ciclo = [
        ("verificar_integridad",      "documento-acta-2026",       "confirmar autoría"),
        ("registrar_trazabilidad",    "interacción-usuario-001",   "dejar constancia"),
        ("bloquear_comercial",        "operación-lucro-tercero",   "proteger principio 3"),
        ("bloquear_entrenamiento_ia", "scraping-ia-externo",       "proteger principio 4"),
        ("marcar_citacion",           "cita-incompleta-detectada", "exigir atribución"),
        ("alertar_violacion",         "cadena-inconsistente",      "defensa activa"),
    ]

    for accion, entrada, proposito in ciclo:
        e = registrar(accion, entrada, proposito)
        print(f"  #{e['n']:03d} · {accion}")
        print(f"       principio {e['principio']} · {e['principio_nombre']}")
        print(f"       hash: {e['hash'][:16]}…")

    print("─" * 60)
    print(f"Log actualizado: {LOG_PATH}")
    print(f"Entradas totales: {len(cargar_log())}")


# ─── Verificación pública ─────────────────────────────────────────
def verificar():
    """Recalcula toda la cadena y devuelve si es íntegra."""
    log = cargar_log()
    if not log:
        print("Log vacío.")
        return True

    print(f"Verificando {len(log)} entradas…")
    hash_previo_esperado = None
    integro = True

    for i, e in enumerate(log):
        # Verificar encadenamiento
        if e["hash_previo"] != hash_previo_esperado:
            print(f"  ✗ #{e['n']}: hash_previo no coincide")
            integro = False

        # Recalcular hash
        contenido = "|".join([
            str(e["n"]),
            e["cuando"],
            e["accion"],
            str(e["principio"]),
            e["entrada"],
            e["proposito"],
            e["autor"],
            e["anio"],
            e["hash_previo"] or "GENESIS",
        ])
        hash_recalculado = hash_sha256(contenido)

        if hash_recalculado != e["hash"]:
            print(f"  ✗ #{e['n']}: hash no coincide")
            integro = False
        else:
            print(f"  ✓ #{e['n']} · {e['accion']}")

        hash_previo_esperado = e["hash"]

    print("─" * 60)
    if integro:
        print("RESULTADO: CADENA ÍNTEGRA")
    else:
        print("RESULTADO: CADENA ALTERADA")
    return integro


# ─── CLI ──────────────────────────────────────────────────────────
def main():
    args = sys.argv[1:]

    if not args:
        print(__doc__)
        print("Acciones disponibles:")
        for k, v in ACCIONES.items():
            print(f"  {k:28s} · principio {v['principio']} · {v['nombre']}")
        return

    if args[0] == "--auto":
        modo_auto()
        return

    if args[0] == "--verify":
        verificar()
        return

    if len(args) < 3:
        print("Uso: python guardian.py ACCION ENTRADA PROPÓSITO")
        return

    accion, entrada, proposito = args[0], args[1], args[2]
    try:
        e = registrar(accion, entrada, proposito)
        print(json.dumps(e, indent=2, ensure_ascii=False))
    except ValueError as err:
        print(f"Error: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()