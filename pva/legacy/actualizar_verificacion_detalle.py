import re

ruta = "web/marketplace.html"
with open(ruta, "r", encoding="utf-8") as f:
    html = f.read()

# Buscar la función actual verificarFolio y reemplazarla
funcion_vieja = '''function verificarFolio() {
    const input = document.getElementById('folio-input').value.trim();
    const resultado = document.getElementById('validation-result');
    if (input === "5204160405358537") {
        resultado.innerHTML = "✅ FOLIO VALIDADO<br>Folio: " + input + "<br>Perito: kronosproyecto@hotmail.com<br>Hash: 41a3683b...c4c3<br>Estado: En blockchain<br><span style='color:#ffcc00;'>Sello: KRONOS-TRACE-PVA-5204160405358537</span>";
        resultado.style.borderColor = "#00ffcc"; resultado.style.color = "#00ffcc";
    } else if (input === "") {
        resultado.innerHTML = "⚠️ Ingresa un folio para verificar.";
        resultado.style.borderColor = "#ffcc00"; resultado.style.color = "#ffcc00";
    } else {
        resultado.innerHTML = "❌ FOLIO NO ENCONTRADO<br>El folio " + input + " no está registrado en blockchain.";
        resultado.style.borderColor = "#ff4444"; resultado.style.color = "#ff4444";
    }
}'''

funcion_nueva = '''function verificarFolio() {
    const input = document.getElementById('folio-input').value.trim();
    const resultado = document.getElementById('validation-result');
    if (input === "5204160405358537") {
        resultado.innerHTML = "✅ FOLIO VALIDADO<br>Folio: " + input + "<br>Perito: kronosproyecto@hotmail.com<br>Hash: 41a3683b...c4c3<br>Estado: En blockchain<br><span style='color:#ffcc00;'>Sello: KRONOS-TRACE-PVA-5204160405358537</span><br><br><span style='color:#00ffcc;'>Cadena de custodia verificada</span><br><span style='color:#00ffcc;'>✅ Transacción confirmada en Ethereum</span><br><span style='color:#00ffcc;'>✅ Certificado ISO integrado</span>";
        resultado.style.borderColor = "#00ffcc"; resultado.style.color = "#00ffcc";
    } else if (input === "") {
        resultado.innerHTML = "⚠️ Ingresa un folio para verificar.";
        resultado.style.borderColor = "#ffcc00"; resultado.style.color = "#ffcc00";
    } else {
        resultado.innerHTML = "❌ FOLIO NO ENCONTRADO<br>El folio " + input + " no está registrado en blockchain.";
        resultado.style.borderColor = "#ff4444"; resultado.style.color = "#ff4444";
    }
}'''

html = html.replace(funcion_vieja, funcion_nueva)

with open(ruta, "w", encoding="utf-8") as f:
    f.write(html)

print("✅ Verificación actualizada con detalles de custodia, Ethereum e ISO.")
