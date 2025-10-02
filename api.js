function getApiUrl(){ return sessionStorage.getItem('API_URL') || ''; }
async function apiPost(action, payload, passApp, passWrite){
  const url = getApiUrl();
  if(!url) return {ok:false, error:'API_URL non impostato: scegli/modifica il modulo dalla home'};
  const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ action, payload, passApp, passWrite }) });
  return r.json();
}
async function apiPostProtected(action, payload, passApp, passWrite){
  if(!passWrite){ return {ok:false, error:'Operazione protetta: password mancante'}; }
  return apiPost(action, payload, passApp, passWrite);
}