# Genera un PNG válido sin librerías externas
import struct, zlib
def make_png(path, w=800, h=400, color=(20,20,35)):
    def chunk(t, d):
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t+d) & 0xffffffff)
    # crea imagen solida
    raw = b''.join([b'\x00' + bytes(color)*w for _ in range(h)])
    # IHDR
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    with open(path, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(chunk(b'IHDR', ihdr))
        f.write(chunk(b'IDAT', zlib.compress(raw)))
        f.write(chunk(b'IEND', b''))
    print(f"PNG creado: {path} {w}x{h}")

make_png("city/CERTIFICADO_MATRIX_OFFLINE.png")
