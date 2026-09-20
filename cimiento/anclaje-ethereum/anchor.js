// ────────────────────────────────────────────────────────────
// ANCLAJE ETHEREUM · Legado Humano–IA · v1.0
// Cálculo Merkle + firma Ed25519 + anclaje MetaMask opcional
// ────────────────────────────────────────────────────────────

export class AnchorEthereum {
  constructor(core, storage) {
    this.core = core;
    this.storage = storage;
    this.paqueteActual = null;
  }

  // ── Utilidades SHA-256 ────────────────────────────────────
  static async _sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static _sha256PairHex(a, b) {
    // Concatenación binaria de dos hashes hex
    const bytes = new Uint8Array([...hexToBytes(a), ...hexToBytes(b)]);
    return crypto.subtle.digest('SHA-256', bytes).then(buf =>
      [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('')
    );
  }

  // ── Calcular raíz Merkle de la cadena ─────────────────────
  async calcular() {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    const bloques = this.core.cadena;
    if (bloques.length === 0) throw new Error('La cadena está vacía. Guarda al menos un registro.');

    let nivel = bloques.map(b => b.hash);
    const niveles = [nivel.slice()];

    while (nivel.length > 1) {
      const siguiente = [];
      if (nivel.length % 2 === 1) nivel.push(nivel[nivel.length - 1]);
      for (let i = 0; i < nivel.length; i += 2) {
        siguiente.push(await AnchorEthereum._sha256PairHex(nivel[i], nivel[i + 1]));
      }
      niveles.push(siguiente.slice());
      nivel = siguiente;
    }

    const merkleRoot = nivel[0];
    const timestamp = new Date().toISOString();

    // Firma Ed25519 del payload merkle
    const payload = `LEGADO-HUMANO-IA · ANCLAJE v1.0\nMerkle: ${merkleRoot}\nBloques: ${bloques.length}\nTimestamp: ${timestamp}`;
    const firmaBuf = await crypto.subtle.sign(
      'Ed25519',
      this.core.clavePrivEd,
      new TextEncoder().encode(payload)
    );
    const firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');

    this.paqueteActual = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'anclaje-1.0',
      timestamp,
      fundador: 'Marco Antonio Rojas Valdovinos',
      coautora_ia: 'KRONOS IA',
      merkle_root: merkleRoot,
      total_bloques: bloques.length,
      firma_ed25519: firma,
      clave_publica: this.core.clavePublicaHex,
      algoritmo_hash: 'SHA-256',
      algoritmo_firma: 'Ed25519',
      instruccion_anclaje: 'Enviar 0 ETH con merkle_root en el campo data a tu propia wallet para prueba de existencia.',
      niveles_merkle: niveles.map(n => n.length) // solo conteo, no hashes completos
    };

    return this.paqueteActual;
  }

  // ── Exportar paquete como Blob descargable ────────────────
  exportarPaquete() {
    if (!this.paqueteActual) throw new Error('No hay paquete calculado.');
    return new Blob([JSON.stringify(this.paqueteActual, null, 2)], { type: 'application/json' });
  }

  // ── Anclar con MetaMask ───────────────────────────────────
  async anclarConMetaMask() {
    if (!this.paqueteActual) throw new Error('Calcula primero la raíz Merkle.');
    if (typeof window.ethereum === 'undefined') throw new Error('MetaMask no detectado.');

    // Conectar wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];
    if (!from) throw new Error('No se obtuvo cuenta de MetaMask.');

    // Verificar red (mainnet = 0x1)
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x1') {
      throw new Error('Cambia MetaMask a Ethereum Mainnet (chainId 0x1) antes de anclar.');
    }

    // Construir data = merkle_root
    const data = '0x' + this.paqueteActual.merkle_root;

    // Enviar transacción 0 ETH a la propia wallet con data
    const txParams = {
      from,
      to: from,
      value: '0x0',
      data
    };

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams]
    });

    this.paqueteActual.tx_hash = txHash;
    this.paqueteActual.anclado = true;
    this.paqueteActual.anclado_en = new Date().toISOString();

    return { txHash };
  }
}

// ── Helper ──────────────────────────────────────────────────
function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}