#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════
 ▓▒░ GENERATE SITEMAP · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
 ─────────────────────────────────────────────────────────────────────────
 NODO: YHDRYH-92CE · Genera sitemap.xml desde archivos HTML
═══════════════════════════════════════════════════════════════════════════
"""
from __future__ import annotations
from pathlib import Path

SEAL = "◯_● · 51/49/100"
NODO = "YHDRYH-92CE"
BASE = "https://arkhe.zero"

BANNER = f"""
╔══════════════════════════════════════════════════════════════════════════╗
║   ▓▒░ GENERATE SITEMAP · {SEAL}                      ░▒▓
║   NODO: {NODO}                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
"""

def main() -> int:
    print(BANNER)
    print()

    root = Path(".")
    urls = []
    for p in sorted(root.rglob("*.html")):
        if any(s in str(p) for s in [".git", "node_modules", "dist", "archive"]):
            continue
        url = BASE + "/" + str(p).lstrip("./")
        urls.append(url)

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<!-- ◯_● · 51/49/100 · KRONOS · Nodo YHDRYH-92CE -->',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        lines.append(f"  <url><loc>{u}</loc></url>")
    lines.append("</urlset>")

    out = Path("apps/sitemap.xml")
    out.write_text("\n".join(lines), encoding="utf-8")

    print(f"[ OK ] {len(urls)} URLs → {out}")
    print(f"\n[ ✓✓ ] {SEAL}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())