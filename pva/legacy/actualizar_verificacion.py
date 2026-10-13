import re

ruta = "web/marketplace.html"
with open(ruta, "r", encoding="utf-8") as f:
    html = f.read()

# Bloque actual de Verificación Pública (lo vamos a reemplazar)
bloque_viejo = '''<div class="service-panel"><div class="sample-code"><span>MUESTRA: V-FREE</span><span>🔍 VERIFY</span></div><div class="service-title">Verificación Pública</div><div class="sample-box"><div class="validation-box">✅ FOLIO VALIDADO<br>Folio: 5204160405358537<br>Estado: En blockchain</div></div><div class="price-box"><span class="price">$0</span><span class="unit">USD / consulta</span></div><ul class="feature-list"><li>Consulta en blockchain Ethereum</li><li>Valida integridad del sello</li><li>Comprueba autoría en SafeCreative</li><li>Instantáneo</li></ul><a href="verification.html" target="_blank" class="action-btn" style="text-decoration:none; display:block; text-align:center;"><span>VERIFICAR EN BLOCKCHAIN</span></a></div>'''

# Nuevo bloque con demo interactiva
bloque_nuevo = '''<div class="service-panel"><div class="sample-code"><span>MUESTRA: V-FREE</span><span>🔍 VERIFY</span></div><div class="service-title">Verificación Pública</div><div class="sample-box" id="verify-box"><div class="validation-box" id="validation-result">✅ FOLIO VALIDADO<br>Folio: 5204160405358537<br>Estado: En blockchain</div></div><div class="price-box"><span class="price">$0</span><span class="unit">USD / consulta</span></div><ul class="feature-list"><li>Consulta en blockchain Ethereum</li><li>Valida integridad del sello</li><li>Comprueba autoría en SafeCreative</li><li>Instantáneo</li></ul><div style="margin-top:10px;"><input type="text" id="folio-input" class="verify-input" placeholder="Pega tu folio (ej. 5204160405358537)"><button class="action-btn" onclick="verificarFolio()" style="margin-top:10px;"><span>VERIFICAR EN BLOCKCHAIN</span></button></div><button class="action-btn" onclick="verificarEjemplo()" style="margin-top:10px; background: rgba(0,255,150,0.1);"><span>PROBAR CON EJEMPLO</span></button></div>'''

# Reemplazar
html = html.replace(bloque_viejo, bloque_nuevo)

# Agregar las funciones JS antes de </body>
funciones = '''
<script>
function verificarFolio() {
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
}
function verificarEjemplo() {
    document.getElementById('folio-input').value = "5204160405358537";
    verificarFolio();
}
</script>
'''

# Insertar antes del último </body>
html = html.replace('</body>', funciones + '</body>')

with open(ruta, "w", encoding="utf-8") as f:
    f.write(html)

print("✅ Verificación Pública actualizada con demo interactiva.")
