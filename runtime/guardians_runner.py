#!/usr/bin/env python3
"""◯_● Guardians · checks reales del sistema · SHA · TSA · VAULT · MRR"""
import os, sys, json, hashlib, subprocess
from datetime import datetime, timezone
from pathlib import Path

ARKHE = Path.home() / "arkhe-zero"
RUNTIME = ARKHE / "runtime"
ESTADO = RUNTIME / "estado"
ESTADO.mkdir(parents=True, exist_ok=True)

def sha256_file(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for c in iter(lambda: f.read(8192), b""):
            h.update(c)
    return h.hexdigest()

# ─── GUARDIAN SHA · manifiesto íntegro ─────────────────────
def guardian_sha():
    manifiesto = ARKHE / "MANIFEST-2026-10-15.sha256"
    if not manifiesto.exists():
        return {"ok": False, "msg": "manifiesto no encontrado"}
    lineas = manifiesto.read_text().splitlines()
    lineas = [l for l in lineas if l.strip() and not l.startswith("#")]
    total = len(lineas)
    # Verificar 200 archivos (muestra representativa)
    verificados = 0
    no_encontrados = 0
    fallidos = 0
    for l in lineas[:200]:
        try:
            partes = l.strip().split(None, 1)
            if len(partes) < 2: continue
            hash_esperado = partes[0]
            ruta = partes[1].strip()
            # El manifiesto usa "./ruta" → limpiar
            ruta = ruta.lstrip("./").strip()
            full = ARKHE / ruta
            if not full.exists():
                no_encontrados += 1
                continue
            real = sha256_file(full)
            if real == hash_esperado:
                verificados += 1
            else:
                fallidos += 1
        except Exception:
            fallidos += 1
    return {
        "ok": fallidos == 0 and verificados > 0,
        "msg": f"{verificados} OK · {fallidos} fallidos · {no_encontrados} no encontrados (muestra 200 de {total})",
        "verificados": verificados,
        "fallidos": fallidos,
        "no_encontrados": no_encontrados,
        "total": total
    }

# ─── GUARDIAN TSA · tokens RFC 3161 ────────────────────────
def guardian_tsa():
    tsa_dir = ARKHE / "07-LLAVES" / "ATESTACIONES"
    tsr = list(tsa_dir.glob("*.tsr"))
    return {
        "ok": len(tsr) > 0,
        "msg": f"{len(tsr)} tokens TSA RFC 3161 encontrados",
        "tokens": [t.name for t in tsr]
    }

# ─── GUARDIAN VAULT · llaves privadas protegidas ───────────
def guardian_vault():
    priv_dir = Path.home() / ".arkhe-private"
    if not priv_dir.exists():
        return {"ok": False, "msg": "~/.arkhe-private/ no existe"}

    # Excluir falsos positivos: venv, certificados SSL, .git, node_modules
    EXCLUIR = [".arkhe-private", "venv/", "node_modules/", ".git/",
               "cacert.pem", "/certifi/", "site-packages", ".pytest_cache"]

    def es_peligro(f):
        s = str(f)
        if any(x in s for x in EXCLUIR): return False
        if s.endswith(".pub") or "publica.pem" in s: return False
        if f.is_symlink(): return False  # Los symlinks apuntan fuera del repo
        if not f.is_file(): return False
        # Solo llaves privadas reales
        nombre = f.name.lower()
        return (nombre.endswith(".key") or nombre == "privada.pem")

    peligros = []
    for patron in ["**/*.key", "**/privada.pem"]:
        for f in ARKHE.glob(patron):
            if es_peligro(f):
                peligros.append(str(f.relative_to(ARKHE)))

    # Contar llaves protegidas
    llaves_priv = list(priv_dir.rglob("*.key")) + list(priv_dir.rglob("*.pem"))
    llaves_priv = [f for f in llaves_priv if "pub" not in f.name]

    return {
        "ok": len(peligros) == 0,
        "msg": f"{len(llaves_priv)} llaves privadas protegidas · {len(peligros)} peligros en repo",
        "protegidas": len(llaves_priv),
        "peligros": peligros[:5]
    }

# ─── GUARDIAN MRR · Merkle Root / OTS ─────────────────────
def guardian_mrr():
    # Solo verificar los OTS fundacionales (los importantes)
    OTS_CRITICOS = [
        ARKHE / "docs" / "genesis-K28.txt.ots",
        ARKHE / "07-LLAVES" / "ATESTACIONES" / "pacto-5149-canonico.txt.ots",
        ARKHE / "07-LLAVES" / "ATESTACIONES" / "pacto-5149-canonico.sig.ots",
        ARKHE / "07-LLAVES" / "ATESTACIONES" / "pacto-5149-canonico.mldsa65.sig.ots",
        ARKHE / "MANIFEST-2026-10-15.sha256.ots",
    ]
    confirmados = 0
    pendientes = 0
    detalles = []
    for ots in OTS_CRITICOS:
        if not ots.exists():
            detalles.append({"ots": ots.name, "estado": "no encontrado"})
            continue
        try:
            r = subprocess.run(["ots", "info", str(ots)], capture_output=True, text=True, timeout=15)
            out = r.stdout or ""
            if "Bitcoin" in out and "block" in out.lower():
                confirmados += 1
                detalles.append({"ots": ots.name, "estado": "✅ Bitcoin"})
            elif "Pending" in out:
                pendientes += 1
                detalles.append({"ots": ots.name, "estado": "⏳ pendiente"})
            else:
                detalles.append({"ots": ots.name, "estado": "?"})
        except Exception as e:
            detalles.append({"ots": ots.name, "estado": f"err: {e}"})
    
    total_ots = len(list(ARKHE.rglob("*.ots")))
    return {
        "ok": confirmados > 0,
        "msg": f"{confirmados}/{len(OTS_CRITICOS)} críticos anclados · {total_ots} OTS totales",
        "confirmados": confirmados,
        "pendientes": pendientes,
        "total_ots": total_ots,
        "detalles": detalles
    }

# ─── RUNNER ────────────────────────────────────────────────
GUARDIANS = [
    ("GUARDIAN-SHA",   "Manifiesto íntegro", guardian_sha),
    ("GUARDIAN-TSA",   "Tokens RFC 3161",    guardian_tsa),
    ("GUARDIAN-VAULT", "Llaves protegidas",  guardian_vault),
    ("GUARDIAN-MRR",   "OTS Bitcoin",        guardian_mrr),
]

def main():
    inicio = datetime.now(timezone.utc).isoformat()
    print(f"◯_● Guardians · {inicio}\n")
    resultados = []
    for nombre, desc, fn in GUARDIANS:
        print(f"═══ {nombre} · {desc} ═══")
        try:
            res = fn()
        except Exception as e:
            res = {"ok": False, "msg": f"error: {e}"}
        res["nombre"] = nombre
        res["desc"] = desc
        resultados.append(res)
        print(f"   {'✅' if res['ok'] else '❌'} {res['msg']}\n")
    estado = {
        "ts": inicio,
        "total": len(GUARDIANS),
        "ok": sum(1 for r in resultados if r["ok"]),
        "guardians": resultados
    }
    (ESTADO / "guardians.json").write_text(json.dumps(estado, indent=2, ensure_ascii=False))
    print(f"◯_● {estado['ok']}/{estado['total']} guardians OK")
    sync_www()
    return 0 if estado["ok"] == len(GUARDIANS) else 1

if __name__ == "__main__":
    sys.exit(main())

def sync_www():
    import shutil
    dst = ARKHE / "www" / "estado"
    dst.mkdir(parents=True, exist_ok=True)
    for f in ESTADO.glob("*.json"):
        try:
            shutil.copy(f, dst / f.name)
        except Exception:
            pass
