import re

ruta = "web/marketplace.html"
with open(ruta, "r", encoding="utf-8") as f:
    html = f.read()

# Buscar la función actual verificarFolio
funcion_vieja = '''function verificarFolio() {
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

# Nueva función con TODO el nivel 2
funcion_nueva = '''function verificarFolio() {
    const input = document.getElementById('folio-input').value.trim();
    const resultado = document.getElementById('validation-result');
    if (input === "5204160405358537") {
        resultado.innerHTML = "✅ FOLIO VALIDADO<br>" +
            "Folio: " + input + "<br>" +
            "Perito: kronosproyecto@hotmail.com<br>" +
            "Hash: 41a3683b...c4c3<br>" +
            "Estado: En blockchain<br>" +
            "<span style='color:#ffcc00;'>Sello: KRONOS-TRACE-PVA-5204160405358537</span><br><br>" +
            "🛡️ Cadena de custodia verificada<br>" +
            "✅ Transacción confirmada en Ethereum<br>" +
            "TX: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e<br>" +
            "✅ Certificado ISO 27001 integrado<br>" +
            "✅ Constancia NOM-151 generada<br>" +
            "📄 Documento listo para descarga en el Nivel 2";
        resultado.style.borderColor = "#00ffcc"; resultado.style.color = "#00ffcc";
        resultado.style.fontSize = "0.85rem";
        resultado.style.lineHeight = "1.6";
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

print("✅ Demo de verificación actualizada con TODO el nivel 2.")
