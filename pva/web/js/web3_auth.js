/**
 * PVA Web3Auth - KRONOS 360
 * Folio: 5204160405358537
 * Perito: kronosproyecto@hotmail.com
 * Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
 * Norma: ISO 27001 A5.17 + NOM-151 Art.10 + eIDAS
 */

const PVA_AUTH_CONFIG = {
  FOLIO: "5204160405358537",
  PERITO: "kronosproyecto@hotmail.com",
  GENESIS: "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3",
  SELLO: "KRONOS-TRACE-PVA-5204160405358537",
  CHAIN_ID_SEPOLIA: "0xaa36a7", // 11155111
  CHAIN_ID_MAINNET: "0x1",
  RPC_SEPOLIA: "https://sepolia.infura.io/v3/TU_INFURA_KEY",
  CONTRACT_ADDRESS: localStorage.getItem("pva_contract") || "",
};

// Estado global auth
let pvaProvider = null;
let pvaSigner = null;
let pvaAccount = null;

function logAuth(msg) {
  const entry = `[${new Date().toISOString()}] [AUTH:${PVA_AUTH_CONFIG.FOLIO}] ${msg}`;
  console.log(entry);
  const logs = JSON.parse(localStorage.getItem("pva_logs") || "[]");
  logs.push(entry);
  localStorage.setItem("pva_logs", JSON.stringify(logs.slice(-100)));
}

// Detecta wallet
function hasWallet() {
  return typeof window.ethereum!== "undefined";
}

// Conecta MetaMask / WalletConnect
async function connectWallet() {
  if (!hasWallet()) {
    alert("Instala MetaMask para autenticar como perito.\nhttps://metamask.io");
    logAuth("Wallet no detectada");
    window.open("https://metamask.io/download/", "_blank");
    return null;
  }

  try {
    logAuth("Solicitando conexión wallet...");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    pvaAccount = accounts[0];

    // Cambia a Sepolia automáticamente
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: PVA_AUTH_CONFIG.CHAIN_ID_SEPOLIA }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: PVA_AUTH_CONFIG.CHAIN_ID_SEPOLIA,
            chainName: "Sepolia",
            rpcUrls: [PVA_AUTH_CONFIG.RPC_SEPOLIA],
            nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
            blockExplorerUrls: ["https://sepolia.etherscan.io"]
          }]
        });
      }
    }

    pvaProvider = window.ethereum;
    logAuth(`Wallet conectada ${pvaAccount}`);

    // Guarda sesión
    localStorage.setItem("pva_account", pvaAccount);
    localStorage.setItem("pva_perito", PVA_AUTH_CONFIG.PERITO);
    localStorage.setItem("pva_folio", PVA_AUTH_CONFIG.FOLIO);

    updateUIConnected();
    return pvaAccount;

  } catch (err) {
    logAuth(`Error connect ${err.message}`);
    throw err;
  }
}

// Firma sello - prueba de perito (eIDAS avanzado)
async function signSello() {
  if (!pvaAccount) await connectWallet();

  const message = `FOLIO:${PVA_AUTH_CONFIG.FOLIO}|PERITO:${PVA_AUTH_CONFIG.PERITO}|GENESIS:${PVA_AUTH_CONFIG.GENESIS}|SELLO:${PVA_AUTH_CONFIG.SELLO}|TIMESTAMP:${Date.now()}`;

  try {
    logAuth(`Firmando sello ${PVA_AUTH_CONFIG.SELLO}`);
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, pvaAccount],
    });

    localStorage.setItem("pva_signature", signature);
    localStorage.setItem("pva_signed_message", message);
    logAuth(`Sello firmado sig:${signature.slice(0,20)}...`);

    return { message, signature, account: pvaAccount, folio: PVA_AUTH_CONFIG.FOLIO };

  } catch (err) {
    logAuth(`Error firma ${err.message}`);
    throw err;
  }
}

// Login completo perito - usado por app.js
async function login() {
  const account = await connectWallet();
  if (!account) return null;

  // Verifica que el perito es el titular (opcional en dev)
  // En prod compara con lista blanca peritos
  const isPeritoValido = account; // Aquí puedes validar contra backend

  const signed = await signSello();

  const user = {
    email: PVA_AUTH_CONFIG.PERITO,
    folio: PVA_AUTH_CONFIG.FOLIO,
    account: account,
    sello: PVA_AUTH_CONFIG.SELLO,
    genesis: PVA_AUTH_CONFIG.GENESIS,
    signature: signed.signature,
    isPerito: true,
    chainId: PVA_AUTH_CONFIG.CHAIN_ID_SEPOLIA
  };

  // Guarda user para app.js
  localStorage.setItem("pva_user", JSON.stringify(user));
  logAuth(`Login OK perito ${PVA_AUTH_CONFIG.PERITO} account ${account}`);

  return user;
}

function logout() {
  pvaProvider = null;
  pvaSigner = null;
  pvaAccount = null;
  localStorage.removeItem("pva_account");
  localStorage.removeItem("pva_signature");
  localStorage.removeItem("pva_user");
  logAuth("Logout perito");
  updateUIDisconnected();
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("pva_user") || "null");
  } catch { return null; }
}

function isAuthenticated() {
  return!!localStorage.getItem("pva_account");
}

function updateUIConnected() {
  const btn = document.getElementById("btn-login");
  const info = document.getElementById("user-info");
  if (btn) btn.textContent = `✓ ${pvaAccount.slice(0,6)}...${pvaAccount.slice(-4)}`;
  if (info) info.textContent = `Perito: ${PVA_AUTH_CONFIG.PERITO} | ${pvaAccount}`;
}

function updateUIDisconnected() {
  const btn = document.getElementById("btn-login");
  const info = document.getElementById("user-info");
  if (btn) btn.textContent = "Login Perito";
  if (info) info.textContent = "";
}

// Listeners wallet
if (typeof window!== "undefined" && window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts) => {
    logAuth(`accountsChanged ${accounts[0]}`);
    if (accounts.length === 0) logout();
    else {
      pvaAccount = accounts[0];
      localStorage.setItem("pva_account", pvaAccount);
      updateUIConnected();
    }
  });
  window.ethereum.on("chainChanged", () => {
    logAuth("chainChanged reload");
    window.location.reload();
  });
}

// Exponer global para app.js
window.PVAWeb3Auth = {
  config: PVA_AUTH_CONFIG,
  connectWallet,
  signSello,
  login,
  logout,
  getUser,
  isAuthenticated,
  hasWallet
};

console.log(`PVA Web3Auth cargado | Folio ${PVA_AUTH_CONFIG.FOLIO} | Sello ${PVA_AUTH_CONFIG.SELLO}`);
