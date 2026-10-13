#!/usr/bin/env python3
"""
SHOR'S ALGORITHM · Simulación clásica
ARKHÉ ZERO · KRONOS 360 · Anexo J
Demuestra cómo se factorizaría RSA en un cuántico real.
"""
import math, random, sys

def gcd(a, b):
    while b: a, b = b, a % b
    return a

def periodo_clasico(a, N):
    """Encuentra el período r tal que a^r ≡ 1 mod N.
    En un cuántico real esto se hace con QFT exponencial."""
    x = a % N
    r = 1
    while x != 1:
        x = (x * a) % N
        r += 1
        if r > N: return None
    return r

def shor(N):
    """Factoriza N usando Shor (simulado)."""
    if N % 2 == 0: return 2, N // 2
    # Verificar N = a^b
    for b in range(2, int(math.log2(N)) + 1):
        a = round(N ** (1/b))
        if a ** b == N: return a, a ** (b-1)
    
    for intento in range(20):
        a = random.randint(2, N - 2)
        g = gcd(a, N)
        if g != 1: return g, N // g
        
        r = periodo_clasico(a, N)
        if r is None or r % 2 != 0: continue
        
        x = pow(a, r // 2, N)
        if x == N - 1 or x == 1: continue
        
        p = gcd(x - 1, N)
        q = gcd(x + 1, N)
        if p * q == N and p != 1 and q != 1:
            return p, q
    
    return None

if __name__ == "__main__":
    print("")
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║  ⚛  SHOR'S ALGORITHM · SIMULACIÓN CLÁSICA                    ║")
    print("║  ARKHÉ ZERO · KRONOS 360 · Anexo J                           ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print("")
    
    objetivos = [15, 21, 35, 91, 143, 221, 323, 437, 667, 899]
    if len(sys.argv) > 1:
        objetivos = [int(sys.argv[1])]
    
    for N in objetivos:
        r = shor(N)
        if r:
            print(f"  N = {N:5d}  →  factores: {r[0]} × {r[1]}")
        else:
            print(f"  N = {N:5d}  →  falló")
    
    print("")
    print("  ⚠️  Esta es una SIMULACIÓN clásica.")
    print("  Shor real en cuántico factoriza RSA-2048 en horas.")
    print("  Por eso ARKHÉ ZERO usa SHA3 + Dilithium (Anexo J).")
    print("")
