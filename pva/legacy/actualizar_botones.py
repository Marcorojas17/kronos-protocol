import re

ruta = "web/marketplace.html"
with open(ruta, "r", encoding="utf-8") as f:
    html = f.read()

# Reemplazar los enlaces estáticos por botones dinámicos
html = re.sub(
    r'<a href="https://www.mercadopago.com.mx/checkout/v1/redirect\?pref_id=[^"]*" target="_blank" class="action-btn" style="text-decoration:none; display:block; text-align:center;"><span>COMPRAR NIVEL (\d+)</span></a>',
    r'<button class="action-btn" onclick="pagarNivel(\1)"><span>COMPRAR NIVEL \1</span></button>',
    html
)

# Agregar la función pagarNivel antes de </body>
funcion_js = '''
<script>
async function pagarNivel(nivel) {
    // CAMBIA ESTA URL por la de tu backend (Codespaces o Railway)
    const url = "https://tu-codespace-8081.app.github.dev/api/create_preference";
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nivel: nivel, folio: "5204160405358537" })
    });
    const data = await res.json();
    if (data.init_point) {
        window.location.href = data.init_point;
    } else {
        alert("Error al generar el pago: " + JSON.stringify(data));
    }
}
</script>
'''

html = html.replace('</body>', funcion_js + '</body>')

with open(ruta, "w", encoding="utf-8") as f:
    f.write(html)

print("✅ Botones actualizados a dinámicos con pagarNivel(nivel).")
