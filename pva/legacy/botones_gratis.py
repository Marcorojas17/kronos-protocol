import re

ruta = "web/marketplace.html"
with open(ruta, "r", encoding="utf-8") as f:
    html = f.read()

# Reemplazar botones dinámicos (pagarNivel) por botones de contacto
html = re.sub(
    r'<button class="action-btn" onclick="pagarNivel\((\d+)\)"><span>COMPRAR NIVEL (\d+)</span></button>',
    r'<a href="mailto:kronosproyecto@hotmail.com?subject=Muestra%20gratis%20KRONOS&body=Hola%20perito%2C%20quiero%20la%20muestra%20gratis%20del%20Nivel%20\2" class="action-btn" style="text-decoration:none; display:block; text-align:center;"><span>SOLICITAR MUESTRA GRATIS</span></a>',
    html
)

# Reemplazar los enlaces estáticos de Mercado Pago (por si quedaron)
html = re.sub(
    r'<a href="https://www\.mercadopago\.com\.mx/checkout/v1/redirect\?pref_id=[^"]*" target="_blank" class="action-btn" style="text-decoration:none; display:block; text-align:center;"><span>COMPRAR NIVEL (\d+)</span></a>',
    r'<a href="mailto:kronosproyecto@hotmail.com?subject=Muestra%20gratis%20KRONOS&body=Hola%20perito%2C%20quiero%20la%20muestra%20gratis%20del%20Nivel%20\1" class="action-btn" style="text-decoration:none; display:block; text-align:center;"><span>SOLICITAR MUESTRA GRATIS</span></a>',
    html
)

# Eliminar la función pagarNivel (para que no haya errores en consola)
html = re.sub(
    r'<script>\s*async function pagarNivel.*?</script>',
    '',
    html,
    flags=re.DOTALL
)

with open(ruta, "w", encoding="utf-8") as f:
    f.write(html)

print("✅ Botones cambiados a SOLICITAR MUESTRA GRATIS (sin pago).")
