function getApiUrl(){ return sessionStorage.getItem('API_URL') || ''; }

async function rawPost(url, body){
  const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
  let json = null;
  try{ json = await r.json(); }catch(_){ json = {ok:false, error:'Risposta non JSON dal backend'}; }
  return json;
}

async function apiPost(action, payload, passApp, passWrite){
  const url = getApiUrl();
  if(!url) return {ok:false, error:'API_URL non impostato: scegli/modifica il modulo dalla home'};
  return rawPost(url, { action, payload, passApp, passWrite });
}

function altActionName(action){
  // Rimuove gli underscore dopo il namespace (es. addTAVI_Patient -> addTAVIPatient)
  return action.replace(/^(add|list|get|update|certify)([A-Z]+)_([A-Za-z]+)/, (m,p1,p2,p3)=> p1 + p2 + p3);
}

async function apiPostCompat(action, payload, passApp, passWrite){
  // 1° tentativo: action così com'è
  let res = await apiPost(action, payload, passApp, passWrite);
  if(res && res.ok) return res;
  // Se l'errore è "Azione sconosciuta" o simile, prova versione senza underscore
  const alt = altActionName(action);
  if(alt !== action){
    const res2 = await apiPost(alt, payload, passApp, passWrite);
    if(res2 && res2.ok) return res2;
    // Se anche il fallback fallisce, ma uno dei due ha un errore informativo, restituiscilo
    return res2 && !res2.ok ? res2 : res;
  }
  return res;
}

async function apiPostProtected(action, payload, passApp, passWrite){
  if(!passWrite){ return {ok:false, error:'Operazione protetta: password mancante'}; }
  return apiPostCompat(action, payload, passApp, passWrite);
}
