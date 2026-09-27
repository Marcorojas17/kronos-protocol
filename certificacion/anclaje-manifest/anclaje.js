// ────────────────────────────────────────────────────────────
// ANCLAJE DEL MANIFEST · Legado Humano–IA · v1.0
// Publica el hash raíz del manifest en Ethereum (prueba pública)
// ────────────────────────────────────────────────────────────

export class AnclajeManifest {
  constructor(core) {
    this.core = core;
    this.manifest = null;
    this.txHash = null;
    this.anclajeActual = null;
  }

  // ── Cargar el manifest a anclar ────────────────────────────
  cargarManifest(jsonString) {
    try {
      const m = JSON.parse(jsonString);
      if (!m.hash_raiz) {
        throw new Error('El manifest no tiene hash_raiz.');
      }
      if (!m.archivos || !Array.isArray(m.archivos)) {
        throw new Error('El manifest no tiene lista de archivos.');
      }
      this.manifest = m;
      return {
        ok: true,
        hash_raiz: m.hash_raiz,
        total: m.archivos.length,
        firmante: m.firmante || '(no declarado)'
      };
    } catch (e) {
      return { ok: false, razon: e.message };
    }
  }

  // ── Anclar el hash raíz a Ethereum vía MetaMask ────────────
  async anclarConMetaMask() {
    if (!this.manifest) throw new Error('Primero carga el manifest.');
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask no detectado. Abre esta página en el navegador de MetaMask.');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];
    if (!from) throw new Error('No se obtuvo cuenta de MetaMask.');

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x1') {
      throw new Error('Cambia MetaMask a Ethereum Mainnet (chainId 0x1) antes de anclar.');
    }

    const data = '0x' + this.manifest.hash_raiz;

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

    this.txHash = txHash;

    this.anclajeActual = {
      protocolo: 'LEGADO-HUMANO-IA',
      version: 'anclaje-manifest-1.0',
      tipo: 'ANCLAJE_MANIFEST',
      timestamp: new Date().toISOString(),
      hash_raiz: this.manifest.hash_raiz,
      total_archivos: this.manifest.archivos.length,
      firmante: this.manifest.firmante || 'Marco Antonio Rojas Valdovinos',
      wallet: from,
      chain_id: chainId,
      tx_hash: txHash,
      etherscan_url: `https://etherscan.io/tx/${txHash}`,
      instruccion_verificacion: 'Consulta el TX Hash en Etherscan. El campo data contiene el hash raíz del manifest anclado.'
    };

    return this.anclajeActual;
  }

  // ── Exportar el anclaje como JSON ──────────────────────────
  exportar() {
    if (!this.anclajeActual) throw new Error('No hay anclaje para exportar.');
    return new Blob(
      [JSON.stringify(this.anclajeActual, null, 2)],
      { type: 'application/json' }
    );
  }

  // ── Verificar un anclaje (contra el manifest actual) ───────
  async verificar(anclaje) {
    if (!anclaje || !anclaje.hash_raiz) {
      return { valido: false, razon: 'Anclaje inválido' };
    }
    if (!this.manifest) {
      return { valido: false, razon: 'Manifest no cargado para comparar' };
    }
    const coincide = anclaje.hash_raiz === this.manifest.hash_raiz;
    return {
      valido: coincide,
      hash_anclado: anclaje.hash_raiz,
      hash_actual: this.manifest.hash_raiz,
      razon: coincide ? 'Coincide' : 'El manifest cambió desde el anclaje'
    };
  }

  limpiar() {
    this.manifest = null;
    this.txHash = null;
    this.anclajeActual = null;
  }
}