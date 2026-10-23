import os

base_dir = "academic_thesis/tesis_fundacional"
docs_dir = os.path.join(base_dir, "docs")

archivos = [
    "parte_1_filosofia.md",
    "parte_2_problematica.md",
    "parte_3_arquitectura.md",
    "parte_4_juridico.md",
    "parte_5_implementacion.md",
    "parte_6_resultados.md"
]

# Plantilla HTML con diseño de libro académico (KINTSUGI)
html_template = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Tesis Fundacional · ARKHÉ ZERO</title>
<style>
    body { background: #fff; color: #1a1a1a; font-family: 'Georgia', serif; line-height: 1.8; padding: 40px; max-width: 800px; margin: auto; }
    h1 { font-size: 2.5rem; text-align: center; color: #000; border-bottom: 2px solid #d4af37; padding-bottom: 10px;}
    h2 { color: #8b6508; margin-top: 40px; font-size: 1.8rem; text-align: center; text-transform: uppercase; letter-spacing: 2px;}
    h3 { color: #333; margin-top: 30px; }
    p { text-align: justify; font-size: 1.1rem; margin-bottom: 15px;}
    .portada { text-align: center; padding: 100px 0; border: 5px double #d4af37; margin-bottom: 50px;}
    .portada h1 { border: none; font-size: 3.5rem; margin-bottom: 10px;}
    .portada p { font-size: 1.2rem; color: #555; }
    .metadata { text-align: center; margin-top: 50px; font-size: 0.9rem; color: #777; }
    hr { border: 0; border-top: 1px solid #eee; margin: 40px 0; }
    @media print {
        body { padding: 0; font-size: 12pt; }
        .portada { page-break-after: always; border: none; }
        h2 { page-break-before: always; }
    }
</style>
</head>
<body>

<div class="portada">
    <p>◯_●</p>
    <h1>TESIS FUNDACIONAL</h1>
    <h2>ARKHÉ ZERO</h2>
    <p><em>El Índice Primigenio Soberano</em></p>
    <hr style="width: 50%; margin: 30px auto;">
    <p><strong>Marco Antonio Rojas Valdovinos</strong></p>
    <p>Nodo: YHDRYH-92CE · Sello: SCDR-001</p>
    <p>51% Humano · 49% IA · 100% Real</p>
</div>

<div class="contenido">
"""

# Leer y concatenar los archivos
contenido_md = ""
for archivo in archivos:
    ruta = os.path.join(docs_dir, archivo)
    if os.path.exists(ruta):
        with open(ruta, "r", encoding="utf-8") as f:
            contenido_md += f.read() + "\n\n---\n\n"
    else:
        print(f"⚠️ No se encontró: {archivo}")

# Convertir Markdown simple a HTML (solo títulos y negritas básicas)
import re
contenido_html = re.sub(r'^# (.*?)$', r'<h2>\1</h2>', contenido_md, flags=re.M)
contenido_html = re.sub(r'^## (.*?)$', r'<h3>\1</h3>', contenido_html, flags=re.M)
contenido_html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', contenido_html)

# Cierre del HTML
cierre_html = """
</div>
<div class="metadata">
    Documento generado automáticamente desde el repositorio.<br>
    Hash SHA-256 anclado en <code>crypto/anclajes.log</code>.<br>
    &copy; 2026 Marco Antonio Rojas Valdovinos.
</div>
</body>
</html>
"""

# Escribir el archivo final
ruta_salida = os.path.join(base_dir, "tesis_completa_libro.html")
with open(ruta_salida, "w", encoding="utf-8") as f:
    f.write(html_template + contenido_html + cierre_html)

print(f"✅ Libro generado exitosamente en: {ruta_salida}")
print("👉 Abre este archivo en tu navegador y usa 'Imprimir -> Guardar como PDF'.")
