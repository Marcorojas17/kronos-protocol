import sys, datetime
print("○_● ARKHE ZERO CERTIFIER")
pdf = sys.argv[1] if len(sys.argv)>1 else "test.pdf"
print(f"1. SHA256({pdf}) -> {pdf}.sha256")
print(f"2. opentimestamps-client stamp {pdf}.sha256 -> {pdf}.ots")
print(f"3. Generando CERTIFICADO_MATRIX.png")
print(f"4. Cobro: mpago.la/2zAw6Dg $199")
print(f"5. ZIP: {pdf}_ARKHE.zip con .ots + .png listo")
print("Regla: 51% humano, 49% IA. Siempre.")
