/**
 * PVA Web3Auth - KRONOS 360 MT01JAAF
 * Folio Maestro: 5204160405358537
 * Folio Pericial: KRONOS-MT01JAAF
 * SHA Genesis: a4ff808e
 * Hash Completo: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
 * Norma: ISO 27001 A5.17 + NOM-151 Art.10 + eIDAS
 * Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
 * SafeCreative: 2607146379465
 */

const PVA_AUTH_CONFIG = {
  FOLIO_MAESTRO: "5204160405358537",
  FOLIO_PERICIAL: "KRONOS-MT01JAAF",
  FOLIO: "5204160405358537", // alias compat
  PERITO: "kronosproyecto@hotmail.com",
  GENESIS: "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3",
  SHA: "a4ff808e",
  SELLO: "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF",
  SC: "2607146379465",
  CHAIN_ID_AMOY: "0x13882", // 80002 Polygon Amoy
  CHAIN_ID_SEPOLIA: "0xaa36a7", // 11155111 fallback
  CHAIN_ID_MAINNET: "0x1",
  RPC_AMOY: "https://rpc-amoy.polygon.technology",
  RPC_SEPOLIA: "https://sepolia.infura.io/v3/TU_INFURA_KEY",
  CONTRACT_ADDRESS: localStorage.getItem("pva_contract") || "",
};

let pvaProvider = null;
let pvaAccount = null;

function logAuth(msg) {
  const entry = `[${new Date().toISOString()}] [AUTH:${PVA_AUTH_CONFIG.FOLIO_PERICIAL}:${PVA_AUTH_CONFIG.SHA}] ${msg}`;
  console.log(entry);
  const logs = JSON.parse(localStorage.getItem("pva_logs") || "[]");
  logs.push(entry);
  localStorage.setItem("pva_logs", JSON.stringify(logs.slice(-100)));
}

function hasWallet() { return typeof window.ethereum!== "undefined"; }

async function connectWallet() {
  if (!hasWallet()) {
    alert("Instala MetaMask para autenticar como perito MT01JAAF.\nhttps://metamask.io");
    logAuth("Wallet no detectada"); window.open("https://metamask.io/download/", "_blank"); return null;
  }
  try {
    logAuth("Solicitando conexión wallet MT01JAAF...");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    pvaAccount = accounts[0];
    // Intenta Amoy primero (tu red oficial)
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: PVA_AUTH_CONFIG.CHAIN_ID_AMOY }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: PVA_AUTH_CONFIG.CHAIN_ID_AMOY,
            chainName: "Polygon Amoy",
            rpcUrls: [PVA_AUTH_CONFIG.RPC_AMOY],
            nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
            blockExplorerUrls: ["https://amoy.polygonscan.com"]
          }]
        });
      } else {
        // Fallback Sepolia si Amoy no disponible
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: PVA_AUTH_CONFIG.CHAIN_ID_SEPOLIA }],
        });
      }
    }
    pvaProvider = window.ethereum;
    logAuth(`Wallet conectada ${pvaAccount} MT01JAAF`);
    localStorage.setItem("pva_account", pvaAccount);
    localStorage.setItem("pva_perito", PVA_AUTH_CONFIG.PERITO);
    localStorage.setItem("pva_folio", PVA_AUTH_CONFIG.FOLIO_PERICIAL);
    localStorage.setItem("kronos_trace", PVA_AUTH_CONFIG.SELLO);
    updateUIConnected();
    return pvaAccount;
  } catch (err) { logAuth(`Error connect ${err.message}`); throw err; }
}

async function signSello() {
  if (!pvaAccount) await connectWallet();
  const message = `FOLIO_MAESTRO:${PVA_AUTH_CONFIG.FOLIO_MAESTRO}|FOLIO_PERICIAL:${PVA_AUTH_CONFIG.FOLIO_PERICIAL}|SHA:${PVA_AUTH_CONFIG.SHA}|PERITO:${PVA_AUTH_CONFIG.PERITO}|GENESIS:${PVA_AUTH_CONFIG.GENESIS}|SELLO:${PVA_AUTH_CONFIG.SELLO}|SC:${PVA_AUTH_CONFIG.SC}|TIMESTAMP:${Date.now()}|ISO27037|NOM151`;
  try {
    logAuth(`Firmando sello ${PVA_AUTH_CONFIG.SELLO}`);
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, pvaAccount],
    });
    localStorage.setItem("pva_signature", signature);
    localStorage.setItem("pva_signed_message", message);
    logAuth(`Sello firmado sig:${signature.slice(0,20)}... MT01JAAF`);
    return { message, signature, account: pvaAccount, folio: PVA_AUTH_CONFIG.FOLIO_PERICIAL, sello: PVA_AUTH_CONFIG.SELLO };
  } catch (err) { logAuth(`Error firma ${err.message}`); throw err; }
}

async function login() {
  const account = await connectWallet(); if (!account) return null;
  const signed = await signSello();
  const user = {
    email: PVA_AUTH_CONFIG.PERITO,
    folio_maestro: PVA_AUTH_CONFIG.FOLIO_MAESTRO,
    folio_pericial: PVA_AUTH_CONFIG.FOLIO_PERICIAL,
    folio: PVA_AUTH_CONFIG.FOLIO_PERICIAL,
    account: account, sello: PVA_AUTH_CONFIG.SELLO,
    genesis: PVA_AUTH_CONFIG.GENESIS, sha: PVA_AUTH_CONFIG.SHA,
    hash: PVA_AUTH_CONFIG.GENESIS, sc: PVA_AUTH_CONFIG.SC,
    signature: signed.signature, isPerito: true,
    chainId: PVA_AUTH_CONFIG.CHAIN_ID_AMOY
  };
  localStorage.setItem("pva_user", JSON.stringify(user));
  logAuth(`Login OK perito ${PVA_AUTH_CONFIG.PERITO} ${account} MT01JAAF ${PVA_AUTH_CONFIG.SHA}`);
  return user;
}

function logout() {
  pvaAccount=null; localStorage.removeItem("pva_account");
  localStorage.removeItem("pva_signature"); localStorage.removeItem("pva_user");
  logAuth("Logout perito MT01JAAF"); updateUIDisconnected();
}
function getUser(){ try{return JSON.parse(localStorage.getItem("pva_user")||"null");}catch{return null;} }
function isAuthenticated(){ return!!localStorage.getItem("pva_account"); }
function updateUIConnected(){
  const btn=document.getElementById("btn-login");
  const info=document.getElementById("user-info");
  if(btn) btn.textContent=`✓ ${pvaAccount.slice(0,6)}...${pvaAccount.slice(-4)} MT01JAAF`;
  if(info) info.textContent=`Perito: ${PVA_AUTH_CONFIG.PERITO} | ${pvaAccount} | ${PVA_AUTH_CONFIG.SELLO}`;
}
function updateUIDisconnected(){
  const btn=document.getElementById("btn-login");
  const info=document.getElementById("user-info");
  if(btn) btn.textContent="Login Perito MT01JAAF";
  if(info) info.textContent="";
}
if(typeof window!=="undefined" && window.ethereum){
  window.ethereum.on("accountsChanged",(accounts)=>{
    logAuth(`accountsChanged ${accounts[0]}`); if(accounts.length===0) logout();
    else { pvaAccount=accounts[0]; localStorage.setItem("pva_account",pvaAccount); updateUIConnected(); }
  });
  window.ethereum.on("chainChanged",()=>{ logAuth("chainChanged reload MT01JAAF"); window.location.reload(); });
}
window.PVAWeb3Auth={config:PVA_AUTH_CONFIG,connectWallet,signSello,login,logout,getUser,isAuthenticated,hasWallet};
console.log(`PVA Web3Auth MT01JAAF cargado | Folio ${PVA_AUTH_CONFIG.FOLIO_PERICIAL} | SHA ${PVA_AUTH_CONFIG.SHA} | Sello ${PVA_AUTH_CONFIG.SELLO} | SC ${PVA_AUTH_CONFIG.SC}`);
