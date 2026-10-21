import random, time, os, sys

try:
    cols, rows = os.get_terminal_size()
except:
    cols, rows = 80, 24

# Texto certificado
cert = [
"  === CERTIFICADO DE SINCRONIZACIÓN ===",
"      SYNCRO VALDOVINOS",
"      ARKHE ZERO 100% SELLADO",
"----------------------------------------",
"MANIFEST: e8d9eac8",
"NODO:     ecatepec-01-1122",
"GENESIS:  11:22@TOLUCA",
"DECISION: MOLE 120",
"MESH:     8001 VIVO",
"----------------------------------------",
"PVA: 800b02b6...f2cffaa",
"COMMIT: 532e7aa",
"GITHUB: Marcorojas17/kronos-protocol",
"----------------------------------------",
"  ESTADO: INMORTAL OFFLINE + GITHUB",
]

# posiciones lluvia
drops = [random.randint(0, rows) for _ in range(cols)]
chars = "01アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺe8d9eac8"

os.system('clear')
for _ in range(400):  # 400 frames
    out = []
    for y in range(rows):
        line = ""
        for x in range(cols):
            if rows//2-8 <= y < rows//2-8+len(cert) and cols//2-20 <= x < cols//2+20:
                cy = y - (rows//2-8)
                cx = x - (cols//2-20)
                if cy < len(cert) and cx < len(cert[cy]):
                    line += f"\033[1;32m{cert[cy][cx]}\033[0m"
                else:
                    line += " "
            else:
                if drops[x] == y:
                    line += f"\033[32m{random.choice(chars)}\033[0m"
                else:
                    line += " "
        out.append(line)
    sys.stdout.write("\033[H" + "\n".join(out))
    # mover drops
    for i in range(cols):
        if random.random() > 0.95:
            drops[i] = 0
        else:
            drops[i] = (drops[i]+1) % rows
    time.sleep(0.06)
