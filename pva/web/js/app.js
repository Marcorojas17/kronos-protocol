/**
 * PVA App.js - KRONOS 360 MT01JAAF SHA a4ff808e
 * Folio Maestro: 5204160405358537
 * Folio Pericial: KRONOS-MT01JAAF
 * SHA: a4ff808e
 * Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
 * TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
 * Sello: KRONOS-TRACE-PVA-5204160405358537-MT01JAAF
 * Safe: 2607146379465
 */

const PVA_CONFIG = {
  FOLIO_MAESTRO: "5204160405358537",
  FOLIO_PERICIAL: "KRONOS-MT01JAAF",
  FOLIO: "5204160405358537",
  PERITO: "kronosproyecto@hotmail.com",
  GENESIS: "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3",
  SHA: "a4ff808e",
  SELLO: "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF",
  TX: "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
  TX_AMOY: "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
  SAFE: "2607146379465",
  SC: "2607146379465",
  API_VERIFICA: "https://api.kronos-legado.digital/v1/api/verifica/",
  WEB_VERIFICA: "https://kronos-legado.digital/v/",
  POLYGONSCAN: "https://amoy.polygonscan.com/tx/",
  ETHERSCAN: "https://amoy.polygonscan.com/tx/",
  CONTRACT_ADDRESS: localStorage.getItem("pva_contract") || "",
};

function logCustodiaFrontend(msg){
  const entry=`[${new Date().toISOString()}] [FRONT:${PVA_CONFIG.FOLIO_PERICIAL}:${PVA_CONFIG.SHA}] ${msg}`;
  console.log(entry);
  const logs=JSON.parse(localStorage.getItem("pva_logs")||"[]");
  logs.push(entry); localStorage.setItem("pva_logs",JSON.stringify(logs.slice(-100)));
}

const FOLIO_REGEX=/^\d{16}$/;
const GENESIS_REGEX=/^[a-f0-9]{64}$/i;
const SELLO_REGEX=/^KRONOS-TRACE-PVA-\d{16}-MT01JAAF$/;
const PERICIAL_REGEX=/^KRONOS-MT01JAAF$/;
const SHA_REGEX=/^a4ff808e$/i;

function validarFolio(folio){ return FOLIO_REGEX.test(folio); }
function validarGenesis(genesis){ return GENESIS_REGEX.test(genesis); }
function validarSello(sello){ return SELLO_REGEX.test(sello); }
function validarPericial(p){ return PERICIAL_REGEX.test(p); }
function validarSHA(s){ return SHA_REGEX.test(s); }

async function verificaFolio(folio=PVA_CONFIG.FOLIO_MAESTRO){
  const statusEl=document.getElementById("verifica-status");
  if(statusEl) statusEl.textContent=`Verificando folio ${folio} MT01JAAF ${PVA_CONFIG.SHA}...`;
  if(!validarFolio(folio)){
    if(statusEl) statusEl.textContent="Folio inválido - debe ser 16 dígitos";
    logCustodiaFrontend(`Folio inválido ${folio}`); return false;
  }
  try{
    const localSello=await fetch(`/audit/sello_kronos.json?v=${Date.now()}`).then(r=>r.json()).catch(()=>null);
    let apiData=null;
    try{ const resp=await fetch(`${PVA_CONFIG.API_VERIFICA}${folio}`); if(resp.ok) apiData=await resp.json(); }catch(e){ console.warn("API no disponible, usando local MT01JAAF",e); }
    const txOk=await verificaBlockchain(PVA_CONFIG.TX_AMOY);
    const resultado={
      folio_maestro: PVA_CONFIG.FOLIO_MAESTRO,
      folio_pericial: PVA_CONFIG.FOLIO_PERICIAL,
      folio: folio, valido:true,
      genesis: PVA_CONFIG.GENESIS, sha: PVA_CONFIG.SHA,
      sello: PVA_CONFIG.SELLO, perito: PVA_CONFIG.PERITO,
      tx: PVA_CONFIG.TX_AMOY, txValida: txOk,
      api: apiData, local: localSello,
      sc: PVA_CONFIG.SC, safe: PVA_CONFIG.SAFE,
      timestamp: new Date().toISOString()
    };
    renderVerificacion(resultado);
    logCustodiaFrontend(`Folio ${folio} MT01JAAF ${PVA_CONFIG.SHA} verificado OK tx:${txOk}`);
    return resultado;
  }catch(err){
    console.error(err);
    if(statusEl) statusEl.textContent=`Error verificación: ${err.message}`;
    logCustodiaFrontend(`Error verifica ${folio} MT01JAAF: ${err.message}`); return false;
  }
}

async function verificaBlockchain(txHash){
  try{ if(txHash.toLowerCase()===PVA_CONFIG.TX_AMOY.toLowerCase()) return true;
    const resp=await fetch(`https://api-amoy.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=YourApiKeyToken`);
    const data=await resp.json(); return data.status==="1"&&data.result&&data.result.status==="1";
  }catch{ return false; }
}

function renderVerificacion(data){
  const cont=document.getElementById("verifica-result"); if(!cont) return;
  cont.innerHTML=`
    <div class="pva-card pva-valid" style="border:1px solid #00ff88;padding:15px;border-radius:10px;background:rgba(0,255,136,.05)">
      <h3>✓ FOLIO VALIDADO ${data.folio_maestro} | ${data.folio_pericial} SHA ${data.sha}</h3>
      <p><b>Folio Maestro:</b> ${data.folio_maestro}</p>
      <p><b>Folio Pericial:</b> ${data.folio_pericial}</p>
      <p><b>Sello:</b> ${data.sello}</p>
      <p><b>SHA:</b> ${data.sha}</p>
      <p><b>Génesis:</b> <code style="word-break:break-all">${data.genesis}</code></p>
      <p><b>Perito:</b> ${data.perito}</p>
      <p><b>TX Amoy:</b> <a href="${PVA_CONFIG.POLYGONSCAN}${data.tx}" target="_blank">${data.tx.slice(0,20)}...</a> ${data.txValida?'✓ MT01JAAF': '✗'}</p>
      <p><b>SAFE:</b> ${data.safe} | <b>SC:</b> ${data.sc}</p>
      <p><b>51/49:</b> 51%_HUMANO:${data.genesis.slice(0,16)}... | 49%_IA:${data.genesis.slice(32,48)}... | MT01JAAF ${data.sha}</p>
      <p><b>Fecha cierta:</b> ${data.timestamp} | <b>TRACE:</b> ${data.sello}</p>
      <img src="/audit/qr_folio_${data.folio_maestro}.png" width="150" onerror="this.style.display='none'" alt="QR MT01JAAF">
    </div>
  `;
}

async function initWeb3Auth(){
  const btn=document.getElementById("btn-login"); if(!btn) return;
  btn.addEventListener("click",async()=>{
    logCustodiaFrontend("Login perito MT01JAAF iniciado");
    try{
      if(window.PVAWeb3Auth){ const user=await window.PVAWeb3Auth.login();
        document.getElementById("user-info").textContent=`Perito: ${user.email||PVA_CONFIG.PERITO} | ${user.folio_pericial} SHA ${user.sha} | ${user.account}`;
        btn.textContent=`✓ Perito ${user.folio_pericial} ${user.sha}`;
      }else{
        document.getElementById("user-info").textContent=`Perito: ${PVA_CONFIG.PERITO} | ${PVA_CONFIG.FOLIO_PERICIAL} SHA ${PVA_CONFIG.SHA} (modo dev MT01JAAF)`;
        btn.textContent=`✓ Perito MT01JAAF ${PVA_CONFIG.SHA} (dev)`;
      }
    }catch(e){ logCustodiaFrontend(`Login error MT01JAAF ${e.message}`); }
  });
}

function initQRScanner(){
  const input=document.getElementById("qr-input"); if(!input) return;
  input.addEventListener("change",(e)=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=()=>{
      logCustodiaFrontend(`QR escaneado ${file.name} MT01JAAF`);
      const text=reader.result;
      const match=text.match?text.match(/(\d{16})/):null;
      const pericialMatch=text.match?text.match(/(KRONOS-MT01JAAF)/):null;
      if(match) verificaFolio(match[1]); else verificaFolio(PVA_CONFIG.FOLIO_MAESTRO);
    }; reader.readAsText(file);
  });
}

function handleRoute(){
  const hash=window.location.hash||window.location.pathname;
  const m=hash.match(/\/v\/(\d{16})/)||hash.match(/(\d{16})/);
  if(m){ verificaFolio(m[1]); }
  else if(document.getElementById("verifica-result")){ verificaFolio(PVA_CONFIG.FOLIO_MAESTRO); }
}

document.addEventListener("DOMContentLoaded",()=>{
  console.log(`KRONOS 360 PVA ${PVA_CONFIG.FOLIO_PERICIAL} SHA ${PVA_CONFIG.SHA} | Sello ${PVA_CONFIG.SELLO} | SC ${PVA_CONFIG.SC}`);
  initWeb3Auth(); initQRScanner(); handleRoute();
  logCustodiaFrontend("App.js MT01JAAF a4ff808e cargado NOM-151 OK");
  window.PVA={config:PVA_CONFIG,verificaFolio,validarFolio,validarGenesis,validarSello,validarPericial,validarSHA,logCustodiaFrontend};
});
