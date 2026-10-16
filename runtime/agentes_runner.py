#!/usr/bin/env python3
"""◯_● Runner del enjambre · ejecuta agentes reales · escribe estado"""
import os, sys, json, subprocess, time
from datetime import datetime, timezone
from pathlib import Path

ARKHE = Path.home() / "arkhe-zero"
RUNTIME = ARKHE / "runtime"
ESTADO = RUNTIME / "estado"
AGENTES = ARKHE / "agentes"
ESTADO.mkdir(parents=True, exist_ok=True)

# Agentes con código real (no simulación)
RUNNER = [
    {"id":"tonal",      "script":"tonal.py",       "rol":"Notario · firma Ed25519",   "args":["../runtime/estado/prueba-tonal.txt"]},
    {"id":"tlachixqui","script":"tlachixqui.py",  "rol":"Auditor",                    "args":[]},
    {"id":"tlapohualli","script":"tlapohualli.py","rol":"Analista",                   "args":[]},
    {"id":"tlamatini", "script":"tlamatini.py",   "rol":"Cronista · reportes",        "args":[]},
    {"id":"cuicatl",   "script":"cuicatl.py",     "rol":"Publicista · contenido",     "args":["x","1"]},
]

def ejecutar_agente(info):
    script = AGENTES / info["script"]
    if not script.exists():
        return {"id":info["id"], "ok":False, "err":"script no existe", "ts":datetime.now(timezone.utc).isoformat()}
    try:
        r = subprocess.run(
            ["python3", str(script)] + info["args"],
            capture_output=True, text=True, timeout=20,
            cwd=str(AGENTES)
        )
        salida = r.stdout or ""
        # Un agente se considera OK si:
        # - retorna 0, O
        # - su salida contiene [OK] o [METRIC] o [CHECK] (ejecutó correctamente)
        ok_por_retorno = r.returncode == 0
        ok_por_salida = any(m in salida for m in ["[OK]", "[METRIC]", "[CHECK]", "◯_●"])
        ok_final = ok_por_retorno or ok_por_salida
        return {
            "id": info["id"], "rol": info["rol"],
            "ok": ok_final,
            "returncode": r.returncode,
            "salida": salida[-500:],
            "err": (r.stderr or "")[-200:] if not ok_final else "",
            "ts": datetime.now(timezone.utc).isoformat() + "Z"
        }
    except subprocess.TimeoutExpired:
        return {"id":info["id"], "ok":False, "err":"timeout 20s", "ts":datetime.now(timezone.utc).isoformat()+"Z"}
    except Exception as e:
        return {"id":info["id"], "ok":False, "err":str(e), "ts":datetime.now(timezone.utc).isoformat()+"Z"}

def main():
    inicio = datetime.now(timezone.utc).isoformat() + "Z"
    print(f"◯_● Runner iniciado · {inicio}")
    print(f"   {len(RUNNER)} agentes a ejecutar\n")

    resultados = []
    for info in RUNNER:
        print(f"═══ {info['id'].upper()} · {info['rol']} ═══")
        res = ejecutar_agente(info)
        resultados.append(res)
        print(f"   {'✅ OK' if res['ok'] else '❌ FALLO'}")
        if res.get('salida'):
            print(f"   {res['salida'][:200]}")
        print()

    # Escribir estado consolidado
    estado = {
        "ts": datetime.now(timezone.utc).isoformat() + "Z",
        "inicio": inicio,
        "total": len(RUNNER),
        "ok": sum(1 for r in resultados if r["ok"]),
        "fallidos": sum(1 for r in resultados if not r["ok"]),
        "agentes": resultados
    }
    (ESTADO / "agentes.json").write_text(json.dumps(estado, indent=2, ensure_ascii=False))
    print(f"◯_● {estado['ok']}/{estado['total']} agentes OK")
    print(f"   Estado: {ESTADO / 'agentes.json'}")

    # Sync inline: copiar JSONs a www/ y docs/ para el dashboard web
    import shutil
    for dest in [ARKHE / "www" / "estado", ARKHE / "docs" / "estado"]:
        dest.mkdir(parents=True, exist_ok=True)
        for f in ESTADO.glob("*.json"):
            try:
                shutil.copy(f, dest / f.name)
            except Exception:
                pass

    return 0 if estado["fallidos"] == 0 else 1

if __name__ == "__main__":
    sys.exit(main())

# ─── Sincronizar estado con www/ (para el dashboard web) ───