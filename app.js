if ('serviceWorker' in navigator) window.addEventListener('load', ()=> navigator.serviceWorker.register('./sw.js'));
const loginForm=document.getElementById('loginForm'); const passApp=document.getElementById('passApp'); const loginMsg=document.getElementById('loginMsg'); const moduleCard=document.getElementById('moduleCard'); const loginCard=document.getElementById('loginCard'); const passWrite=document.getElementById('passWrite'); const btnSetWrite=document.getElementById('btnSetWrite'); const writeState=document.getElementById('writeState');
function setLoggedIn(inState){ if(!moduleCard||!loginCard) return; if(inState){ moduleCard.classList.remove('hidden'); loginCard.classList.add('hidden'); prefillURLs(); } else { moduleCard.classList.add('hidden'); loginCard.classList.remove('hidden'); } }
function prefillURLs(){ ['TAVI','TEER','LAAC'].forEach(k=>{ const el=document.getElementById('url'+k); if(!el) return; const stored=localStorage.getItem('URL_'+k) || window.API_DEFAULTS[k] || ''; el.value=stored; }); }
function setModule(k){ sessionStorage.setItem('MODULE', k); const url = localStorage.getItem('URL_'+k) || window.API_DEFAULTS[k] || ''; sessionStorage.setItem('API_URL', url); }
function saveURL(k){ const el=document.getElementById('url'+k); if(!el) return; localStorage.setItem('URL_'+k, el.value.trim()); alert('URL '+k+' salvato'); }
// Auto-login if already stored
(()=>{ const p=sessionStorage.getItem('PASS_APP'); if(p){ setLoggedIn(true); } })();
// NEW: store password locally without ping (backend will be validated on first API call inside module pages)
loginForm?.addEventListener('submit', async (e)=>{ e.preventDefault(); const p=passApp.value.trim(); if(!p){ loginMsg.textContent='Inserisci la password'; return; } sessionStorage.setItem('PASS_APP', p); setLoggedIn(true); loginMsg.textContent='OK'; });
// Write unlock still validates against backend of currently selected module (if any)

// Sblocco scrittura: verifica locale (senza ping al backend)
btnSetWrite?.addEventListener('click', ()=>{
  const pw = (passWrite.value || '').trim();
  if(!pw){
    alert('Inserisci la password di scrittura (strutturale).');
    return;
  }
  if(pw === 'strutturale'){
    sessionStorage.setItem('PASS_WRITE', pw);
    writeState.textContent='SBLOCCATE';
    writeState.classList.remove('warn'); writeState.classList.add('ok');
    alert('Operazioni protette sbloccate ✅');
  } else {
    sessionStorage.removeItem('PASS_WRITE');
    writeState.textContent='BLOCCATE';
    writeState.classList.add('warn');
    alert('Password di scrittura non corretta.');
  }
});
