import pathlib, sys
ROOT = pathlib.Path(".")
SEAL = "◯_●"
EXCLUDE = {"README.md","KINTSUGI.md","GOVERNANCE.md","PRIVACY.md","TERMS.md","node_modules",".git","docs/catalogo","docs/verificar","docs/comprar"}
ok=0; total=0; warns=[]
for p in ROOT.rglob("*.md"):
  if any(e in str(p) for e in EXCLUDE): continue
  total+=1
  txt=p.read_text(errors="ignore")
  if SEAL in txt:
    ok+=1
  else:
    warns.append(str(p))
print(f"[ >> ] {ok}/{total} archivos .md contienen el sello")
if warns:
  for w in warns[:20]: print(f"[WARN] {w} · sin sello")
if ok/total < 0.5:
  print("[ XX ] VERIFICACIÓN FALLIDA")
  sys.exit(1)
else:
  print(f"[ OK ] {ok}/{total} ok - umbral 50%")
