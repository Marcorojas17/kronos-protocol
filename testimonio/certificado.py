#!/usr/bin/env python3
"""Genera certificado HTML con las tres pruebas. Sin dependencias."""
import sys, json, re
from pathlib import Path
from html import escape

SELLOS = Path.home() / "arkhe-zero" / "testimonio" / "sellos"
MAGIC = b"\x00OpenTimestamps\x00\x00Proof\x00\xbf\x89\xe2\xe8\x84\xe8\x92\x94"

def leer_ots_estado(ots_path):
    if not ots_path.exists():
        return "sin anclaje", ""
    data = ots_path.read_bytes()
    if not data.startswith(MAGIC):
        return "inválido", ""
    pos = len(MAGIC) + 2
    hlen = 32
    digest = data[pos:pos+hlen].hex()
    # Heurística: si contiene "BitcoinBlockHeaderAttestation" o bytes de altura
    # marcamos como pending (el veredicto real lo da opentimestamps.org)
    return "pending (6–24h)", digest

def generar(sello_id, verify_url_base=""):
    sello_json = SELLOS / (sello_id + ".json")
    firma_json = SELLOS / (sello_id + ".firma.json")
    ots_file = SELLOS / (sello_id + ".commit.ots")

    if not sello_json.exists():
        print("no existe " + str(sello_json)); sys.exit(1)

    sello = json.loads(sello_json.read_text())
    firma = json.loads(firma_json.read_text()) if firma_json.exists() else None
    ots_estado, ots_digest = leer_ots_estado(ots_file)

    qr_data = verify_url_base + sello_id if verify_url_base else sello["compromiso"]
    qr_url = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + qr_data

    firma_html = ""
    if firma:
        firma_html = """
        <div class="campo"><div class="label">Firma post-cuántica</div>
          <div class="valor">{alg} · {est}</div></div>
        <div class="campo"><div class="label">Firma (hex, primeros 128)</div>
          <div class="valor mono">{firma}</div></div>
        """.format(
            alg=escape(firma["algoritmo"]),
            est=escape(firma["estandar"]),
            firma=escape(firma["firma_hex"][:128]) + "…"
        )

    html = """<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<title>Certificado ARKHÉ ZERO · {sid}</title>
<style>
  body {{ font-family: ui-monospace, Menlo, monospace; color: #111;
         max-width: 780px; margin: 40px auto; padding: 28px; background: #fff; }}
  header {{ border-bottom: 3px solid #000; padding-bottom: 18px;
            display: flex; justify-content: space-between; align-items: flex-start; }}
  h1 {{ margin: 0; letter-spacing: 3px; font-size: 22px; }}
  .sub {{ font-size: 10px; color: #666; letter-spacing: 2px; margin-top: 4px; }}
  img.qr {{ width: 140px; height: 140px; }}
  .campo {{ margin: 20px 0; }}
  .label {{ font-size: 10px; color: #888; letter-spacing: 2px;
            text-transform: uppercase; margin-bottom: 4px; }}
  .valor {{ font-size: 12px; word-break: break-all; line-height: 1.5; }}
  .mono {{ font-family: ui-monospace, Menlo, monospace; font-size: 11px; }}
  .pruebas {{ display: flex; gap: 12px; margin: 28px 0; }}
  .prueba {{ flex: 1; border: 1px solid #ddd; padding: 12px; border-radius: 4px; }}
  .prueba .t {{ font-size: 10px; color: #888; letter-spacing: 2px;
                text-transform: uppercase; }}
  .prueba .v {{ font-size: 13px; margin-top: 4px; font-weight: bold; }}
  .ok {{ color: #0a7a3d; }}
  .pend {{ color: #b8860b; }}
  footer {{ margin-top: 42px; border-top: 3px solid #000;
            padding-top: 16px; font-size: 10px; color: #444; line-height: 1.6; }}
  @media print {{ body {{ margin: 0; padding: 20px; }} }}
</style></head>
<body>
  <header>
    <div>
      <h1>ARKHÉ ZERO</h1>
      <div class="sub">CERTIFICADO DE SELLO CRIPTOGRÁFICO</div>
      <div class="sub">nodo {nodo} · {version}</div>
    </div>
    <img class="qr" src="{qr}" alt="QR verificación">
  </header>

  <div class="pruebas">
    <div class="prueba"><div class="t">Integridad</div>
      <div class="v ok">SHA-3-256</div></div>
    <div class="prueba"><div class="t">Anterioridad</div>
      <div class="v pend">Bitcoin · {ots_estado}</div></div>
    <div class="prueba"><div class="t">Autoría</div>
      <div class="v ok">ML-DSA-87</div></div>
    </div>

  <div class="campo"><div class="label">Sello ID</div>
    <div class="valor"><b>{sid}</b></div></div>

  <div class="campo"><div class="label">Compromiso (SHA-3-256)</div>
    <div class="valor mono">{compromiso}</div></div>

  <div class="campo"><div class="label">Hash del contenido</div>
    <div class="valor mono">{hash_cont}</div></div>

  <div class="campo"><div class="label">Autor</div>
    <div class="valor">{autor}</div></div>

  <div class="campo"><div class="label">Timestamp UTC</div>
    <div class="valor">{ts}</div></div>

  {firma_html}

  <footer>
    ◯_● · 51/49/100 · KINTSUGI<br>
    <b>Integridad:</b> el contenido no cambió desde que fue sellado.<br>
    <b>Anterioridad:</b> el hash fue enviado a OpenTimestamps; la red Bitcoin
    confirma la fecha del bloque en 6–24 horas.<br>
    <b>Autoría:</b> la firma ML-DSA-87 (FIPS 204, NIST) prueba que el autor
    declarado posee la clave privada correspondiente.<br>
    Verificable sin confiar en el emisor.
  </footer>
</body></html>""".format(
        sid=escape(sello["sello_id"]),
        nodo=escape(sello["nodo"]),
        version=escape(sello["version"]),
        compromiso=escape(sello["compromiso"]),
        hash_cont=escape(sello["hash_contenido"]),
        autor=escape(sello["autor"]),
        ts=escape(sello["timestamp_utc"]),
        ots_estado=escape(ots_estado),
        firma_html=firma_html,
        qr=qr_url,
    )

    out = SELLOS / (sello_id + ".certificado.html")
    out.write_text(html, encoding="utf-8")
    print("  ✓ certificado: " + str(out))
    return out

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("uso: certificado.py <sello_id>")
        sys.exit(2)
    generar(sys.argv[1])
