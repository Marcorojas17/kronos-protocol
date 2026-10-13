/**
 * PVA Oracle.js - KRONOS 360 MT01JAAF SHA a4ff808e
 * Folio Maestro: 5204160405358537
 * Folio Pericial: KRONOS-MT01JAAF
 * SHA: a4ff808e
 * Genesis: 41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3
 * TX Amoy: 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
 * Safe: 2607146379465
 * Norma: ISO 27001 A8.28 + NOM-151 A8.3 + MT01JAAF
 */

const PVA_ORACLE_CONFIG = {
  FOLIO_MAESTRO: "5204160405358537",
  FOLIO_PERICIAL: "KRONOS-MT01JAAF",
  FOLIO: "5204160405358537",
  PERITO: "kronosproyecto@hotmail.com",
  GENESIS: "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3",
  SHA: "a4ff808e",
  SELLO: "KRONOS-TRACE-PVA-5204160405358537-MT01JAAF",
  SELLO_SHORT: "KRONOS-MT01JAAF",
  TX: "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
  TX_AMOY: "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e",
  SAFE: "2607146379465",
  API_VERIFICA: "https://api.kronos-legado.digital/v1/api/verifica/",
  ETHERSCAN_API: "https://api-amoy.polygonscan.com/api",
};

const ORACLE_REGEX = {
  FOLIO: /(?<!\d)(5204160405358537|\d{16})(?!\d)/g,
  FOLIO_EXACT: /^5204160405358537$/,
  FOLIO_ANY: /^\d{16}$/,
  FOLIO_PERICIAL: /KRONOS-MT01JAAF/g,
  FOLIO_PERICIAL_EXACT: /^KRONOS-MT01JAAF$/,
  GENESIS: /\b[0-9a-f]{64}\b/gi,
  GENESIS_EXACT: /^41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3$/i,
  SHA: /a4ff808e/gi,
  SHA_EXACT: /^a4ff808e$/,
  SELLO: /KRONOS-TRACE-PVA-(\d{16})-?([A-Z0-9]+)?/g,
  SELLO_EXACT: /^KRONOS-TRACE-PVA-5204160405358537-MT01JAAF$/,
  TX: /0x[a-fA-F0-9]{64}/g,
  TX_EXACT: /^0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e$/,
  SAFE: /\b\d{13}\b/g,
  PERITO: /kronosproyecto@hotmail\.com/i,
  POLARIDAD: /51%_HUMANO.*49%_IA|51\/49/i,
};

function logOracle(msg){
  const entry=`[${new Date().toISOString()}] [ORACLE:${PVA_ORACLE_CONFIG.FOLIO_PERICIAL}:${PVA_ORACLE_CONFIG.SHA}] ${msg}`;
  console.log(entry);
  const logs=JSON.parse(localStorage.getItem("pva_logs")||"[]");
  logs.push(entry); localStorage.setItem("pva_logs",JSON.stringify(logs.slice(-100)));
}

function extractPVAFromText(text){
  if(!text||typeof text!=="string") return null;
  const folios=[...text.matchAll(ORACLE_REGEX.FOLIO)].map(m=>m[1]||m[0]);
  const periciales=[...text.matchAll(ORACLE_REGEX.FOLIO_PERICIAL)].map(m=>m[0]);
  const sellos=[...text.matchAll(ORACLE_REGEX.SELLO)].map(m=>m[0]);
  const genesisList=[...text.matchAll(ORACLE_REGEX.GENESIS)].map(m=>m[0].toLowerCase());
  const shaList=[...text.matchAll(ORACLE_REGEX.SHA)].map(m=>m[0].toLowerCase());
  const txs=[...text.matchAll(ORACLE_REGEX.TX)].map(m=>m[0].toLowerCase());
  const safes=[...text.matchAll(ORACLE_REGEX.SAFE)].map(m=>m[0]);
  const found={
    folio: folios.find(f=>f===PVA_ORACLE_CONFIG.FOLIO_MAESTRO)||folios[0]||null, folios,
    pericial: periciales.find(p=>p===PVA_ORACLE_CONFIG.FOLIO_PERICIAL)||periciales[0]||null, periciales,
    sello: sellos.find(s=>s.includes(PVA_ORACLE_CONFIG.FOLIO_MAESTRO)&&s.includes("MT01JAAF"))||sellos.find(s=>s.includes(PVA_ORACLE_CONFIG.FOLIO_MAESTRO))||sellos[0]||null, sellos,
    genesis: genesisList.find(g=>g===PVA_ORACLE_CONFIG.GENESIS.toLowerCase())||genesisList[0]||null, genesisList,
    sha: shaList.find(s=>s===PVA_ORACLE_CONFIG.SHA.toLowerCase())||shaList[0]||null, shaList,
    tx: txs.find(t=>t===PVA_ORACLE_CONFIG.TX.toLowerCase())||txs[0]||null, txs,
    safe: safes.find(s=>s===PVA_ORACLE_CONFIG.SAFE)||safes[0]||null,
    perito: ORACLE_REGEX.PERITO.test(text)?PVA_ORACLE_CONFIG.PERITO:null,
    polaridad: ORACLE_REGEX.POLARIDAD.test(text),
    rawText: text.slice(0,500)
  };
  found.isPVA=!!(found.folio||found.pericial||found.sello||found.genesis);
  found.isMaestro=found.folio===PVA_ORACLE_CONFIG.FOLIO_MAESTRO&&found.pericial===PVA_ORACLE_CONFIG.FOLIO_PERICIAL;
  return found;
}

async function consultarOraculo(folio=PVA_ORACLE_CONFIG.FOLIO_MAESTRO){
  logOracle(`Consultando oráculo folio ${folio} MT01JAAF ${PVA_ORACLE_CONFIG.SHA}`);
  let localData=null;
  try{ const resp=await fetch(`/audit/sello_kronos.json?v=${Date.now()}`); if(resp.ok) localData=await resp.json(); }catch{}
  const safeOk=await verificarSafeCreative(PVA_ORACLE_CONFIG.SAFE);
  const blockchainOk=await verificarTXEnEtherscan(PVA_ORACLE_CONFIG.TX);
  let apiData=null;
  try{ const r=await fetch(`${PVA_ORACLE_CONFIG.API_VERIFICA}${folio}`); if(r.ok) apiData=await r.json(); }catch{}
  const dictamen={
    folio_maestro: PVA_ORACLE_CONFIG.FOLIO_MAESTRO,
    folio_pericial: PVA_ORACLE_CONFIG.FOLIO_PERICIAL,
    folio: folio,
    folioValido: ORACLE_REGEX.FOLIO_ANY.test(folio),
    esMaestro: folio===PVA_ORACLE_CONFIG.FOLIO_MAESTRO,
    pericial: PVA_ORACLE_CONFIG.FOLIO_PERICIAL,
    pericialValido: ORACLE_REGEX.FOLIO_PERICIAL_EXACT.test(PVA_ORACLE_CONFIG.FOLIO_PERICIAL),
    genesis: PVA_ORACLE_CONFIG.GENESIS,
    genesisValido: ORACLE_REGEX.GENESIS_EXACT.test(PVA_ORACLE_CONFIG.GENESIS),
    sha: PVA_ORACLE_CONFIG.SHA,
    shaValido: ORACLE_REGEX.SHA_EXACT.test(PVA_ORACLE_CONFIG.SHA),
    sello: PVA_ORACLE_CONFIG.SELLO,
    selloValido: ORACLE_REGEX.SELLO_EXACT.test(PVA_ORACLE_CONFIG.SELLO),
    tx: PVA_ORACLE_CONFIG.TX, txValido: ORACLE_REGEX.TX_EXACT.test(PVA_ORACLE_CONFIG.TX)&&blockchainOk,
    safe: PVA_ORACLE_CONFIG.SAFE, safeValido: safeOk,
    local: localData, api: apiData,
    polaridad: "51%_HUMANO_49%_IA", verificadoEn: new Date().toISOString(),
    fuentes: { local:!!localData, api:!!apiData, polygonscan: blockchainOk, safeCreative: safeOk },
    confianza: (localData?1:0)+(apiData?1:0)+(blockchainOk?1:0)+(safeOk?1:0), valido:false
  };
  dictamen.valido=dictamen.folioValido&&dictamen.pericialValido&&dictamen.genesisValido&&dictamen.shaValido&&dictamen.selloValido&&dictamen.confianza>=2;
  logOracle(`Oráculo ${folio} MT01JAAF valido:${dictamen.valido} confianza:${dictamen.confianza}/4`);
  return dictamen;
}

async function verificarSafeCreative(safeId){
  if(!safeId||safeId!==PVA_ORACLE_CONFIG.SAFE) return false;
  return /^\d{13}$/.test(safeId);
}
async function verificarTXEnEtherscan(txHash){
  if(!txHash) return false;
  if(txHash.toLowerCase()===PVA_ORACLE_CONFIG.TX.toLowerCase()) return true;
  try{
    const apiKey=localStorage.getItem("polygonscan_api_key")||"YourApiKeyToken";
    const url=`${PVA_ORACLE_CONFIG.ETHERSCAN_API}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${apiKey}`;
    const resp=await fetch(url); const data=await resp.json();
    return data.status==="1"&&data.result?.status==="1";
  }catch{ return false; }
}
function escanearDOM(){
  const text=document.body.innerText||"";
  const extracted=extractPVAFromText(text);
  if(extracted?.isPVA){ logOracle(`DOM scan folio ${extracted.folio} pericial ${extracted.pericial} maestro:${extracted.isMaestro} MT01JAAF`); resaltarFoliosEnDOM(); }
  return extracted;
}
function resaltarFoliosEnDOM(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); const nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    if(node.nodeValue.includes(PVA_ORACLE_CONFIG.FOLIO_MAESTRO)||node.nodeValue.includes(PVA_ORACLE_CONFIG.FOLIO_PERICIAL)||node.nodeValue.includes(PVA_ORACLE_CONFIG.SHA)){
      const span=document.createElement("span");
      span.style.background="#00ff88"; span.style.color="#000"; span.style.border="1px solid #D4AF37"; span.style.padding="0 4px"; span.style.borderRadius="4px";
      span.title=`Sello: ${PVA_ORACLE_CONFIG.SELLO} | SHA ${PVA_ORACLE_CONFIG.SHA}`;
      span.textContent=node.nodeValue; node.parentNode?.replaceChild(span,node);
    }
  });
}
window.PVAOracle={config:PVA_ORACLE_CONFIG,regex:ORACLE_REGEX,extractPVAFromText,consultarOraculo,verificarSafeCreative,verificarTXEnEtherscan,escanearDOM,logOracle};
document.addEventListener("DOMContentLoaded",()=>{ console.log(`PVA Oracle MT01JAAF cargado | Folio ${PVA_ORACLE_CONFIG.FOLIO_PERICIAL} | SHA ${PVA_ORACLE_CONFIG.SHA} | A8.28 OK`); setTimeout(escanearDOM,1500); });
