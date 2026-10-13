#!/usr/bin/env python3
"""
KRONOS V18 100/10 - Actualiza marketplace.html con enlaces MP desde web/links_pago.json
FOLIO: KRONOS-MT01JAAF - SHA: a4ff808e - MAESTRO: 5204160405358537
"""
import json, pathlib, re

ruta_html = pathlib.Path("web/marketplace.html")
ruta_links = pathlib.Path("web/links_pago.json")

if not ruta_links.exists():
    print("❌ web/links_pago.json no existe - ejecuta primero: python scripts/generar_links.py")
    exit(1)

if not ruta_html.exists():
    print(f"❌ {ruta_html} no existe - crea web/marketplace.html primero")
    exit(1)

links = json.loads(ruta_links.read_text(encoding="utf-8"))
print(f"KRONOS 100/10 - Actualizando marketplace - FOLIO KRONOS-MT01JAAF\n")

html = ruta_html.read_text(encoding="utf-8")

actualizados = 0
for nivel in [1,2,3]:
    data = links.get(str(nivel)) or links.get(nivel)
    if not data or "init_point" not in data:
        print(f"⚠ Nivel {nivel} sin init_point en links_pago.json")
        continue
    
    url = data["init_point"]
    ext_ref = data.get("external_reference", f"5204160405358537-N{nivel}-KRONOS-MT01JAAF")
    
    # 100/10: reemplaza tanto <button onclick alert> como <a> viejos
    patrones = [
        rf'<button[^>]*onclick="[^"]*nivel {nivel}[^"]*"[^>]*>.*?</button>',
        rf'<a[^>]*>.*?COMPRAR NIVEL {nivel}.*?</a>',
    ]
    
    reemplazo = f'<a href="{url}" target="_blank" class="action-btn" data-external-ref="{ext_ref}" style="text-decoration:none; display:block; text-align:center;"><span>COMPRAR NIVEL {nivel} - {ext_ref}</span></a>'
    
    for pat in patrones:
        if re.search(pat, html, re.IGNORECASE | re.DOTALL):
            html = re.sub(pat, reemplazo, html, flags=re.IGNORECASE | re.DOTALL)
            actualizados += 1
            print(f"✅ Nivel {nivel} -> {url[:60]}... Ref:{ext_ref}")
            break
    else:
        # Si no encontró patrón, busca placeholder LINK_NIVEL
        if f"LINK_NIVEL{nivel}" in html:
            html = html.replace(f"LINK_NIVEL{nivel}_AQUI", url)
            html = html.replace(f"LINK_NIVEL{nivel}", url)
            actualizados += 1
            print(f"✅ Nivel {nivel} placeholder reemplazado -> {url[:60]}...")

ruta_html.write_text(html, encoding="utf-8")
print(f"\n📄 {ruta_html} actualizado - {actualizados}/3 botones")
print("✅ Marketplace 100/10 - LUZ PRENDIDA OFFLINE")
