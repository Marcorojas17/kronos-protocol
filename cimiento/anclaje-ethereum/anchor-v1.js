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

  static async _sha256Hex(bytes) {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static async _sha256PairHex(a, b) {
    const bytesA = hexToBytes(a);
    const bytesB = hexToBytes(b);
    const combined = new Uint8Array(bytesA.length + bytesB.length);
    combined.set(bytesA, 0);
    combined.set(bytesB, bytesA.length);
    return await AnchorEthereum._sha256Hex(combined);
  }

  async calcular() {
    if (!this.core.inicializado) throw new Error('Cripto Core no inicializado.');
    const bloques = this.core.cadena || [];
    if (bloques.length === 0) {
      throw new Error('La cadena está vacía. Guarda al menos un registro.');
    }

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

    const payload = `LEGADO-HUMANO-IA · ANCLAJE v1.0\nMerkle: ${merkleRoot}\nBloques: ${bloques.length}\nTimestamp: ${timestamp}`;

    let firma = '';
    if (this.core.clavePrivEd) {
      const firmaBuf = await crypto.subtle.sign(
        'Ed25519',
        this.core.clavePrivEd,
        new TextEncoder().encode(payload)
      );
      firma = [...new Uint8Array(firmaBuf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }

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
      niveles_merkle: niveles.map(n => n.length)
    };

    return this.paqueteActual;
  }

  exportarPaquete() {
    if (!this.paqueteActual) throw new Error('No hay paquete calculado.');
    return new Blob([JSON.stringify(this.paqueteActual, null, 2)], { type: 'application/json' });
  }

  async anclarConMetaMask() {
    if (!this.paqueteActual) throw new Error('Calcula primero la raíz Merkle.');
    if (typeof window.ethereum === 'undefined') throw new Error('MetaMask no detectado.');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];
    if (!from) throw new Error('No se obtuvo cuenta de MetaMask.');

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x1') {
      throw new Error('Cambia MetaMask a Ethereum Mainnet (chainId 0x1) antes de anclar.');
    }

    const data = '0x' + this.paqueteActual.merkle_root;

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

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}