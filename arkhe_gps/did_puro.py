#!/usr/bin/env python3
# did_puro.py · DID Ed25519 sin dependencias externas
import subprocess, base64, sys

# Base58btc (alfabeto Bitcoin, sin 0 O I l)
ALFABETO = b"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

def base58_encode(datos: bytes) -> str:
    n = int.from_bytes(datos, "big")
    resultado = []
    while n > 0:
        n, r = divmod(n, 58)
        resultado.append(ALFABETO[r:r+1])
    # Relleno de ceros iniciales
    for b in datos:
        if b == 0:
            resultado.append(ALFABETO[0:1])
        else:
            break
    return b"".join(reversed(resultado)).decode()

def clave_publica_raw(archivo_llave: str) -> bytes:
    # ssh-keygen -y devuelve "ssh-ed25519 AAAA... comentario"
    raw = subprocess.check_output(["ssh-keygen", "-y", "-f", archivo_llave]).decode().strip()
    partes = raw.split()
    if len(partes) < 2 or partes[0] != "ssh-ed25519":
        sys.exit("La llave no es Ed25519 o el archivo es invalido.")
    blob = base64.b64decode(partes[1])
    # Blob OpenSSH: [4 bytes len="ssh-ed25519"][11 bytes tipo][4 bytes len=32][32 bytes clave]
    # La clave Ed25519 siempre está en los últimos 32 bytes
    return blob[-32:]

def did_key_ed25519(pub_raw: bytes) -> str:
    # Prefijo multicodec Ed25519-pub = 0xed 0x01
    multicodec = b"\xed\x01" + pub_raw
    # did:key usa "z" + base58btc(multicodec)
    return "did:key:z" + base58_encode(multicodec)

if __name__ == "__main__":
    llave = ".agent/agent_identity"
    print("🜂 Leyendo llave publica del agente...")
    pub = clave_publica_raw(llave)
    print(f"✓ Clave publica (hex): {pub.hex()}")
    did = did_key_ed25519(pub)
    print(f"✓ DID del agente: {did}")
    print()
    print("Este DID es matematicamente equivalente a la clave publica.")
    print("Cualquier verificador W3C puede resolverlo sin servidores.")
