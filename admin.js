// Admin logic (Google Sheet + auth)
let adminStockLoaded = false;
let adminOrdersAll = [];
let adminFilterState = {mode:'all',date:'',month:'',sort:'date_desc'};
let adminFilterDraft = {mode:'all',date:'',month:'',sort:'date_desc'};
let adminStockSnapshot = {};
let pendingStockChanges = {};
let stockSearchKeyword = '';
const DEBUG_LOGIN_FLOW = (location.hostname==='127.0.0.1' || location.hostname==='localhost' || location.hostname==='::1');

function debugLoginLog(step, data){
  if(!DEBUG_LOGIN_FLOW) return;
  try{
    console.log(`[PKB-LOGIN] ${step}`, data||'');
  }catch(_err){}
}

function getAdminToken(){
  const fromSession=(sessionStorage.getItem(ADMIN_TOKEN_KEY)||'').trim();
  const raw=fromSession;
  if(!raw)return'';
  return /^[A-Za-z0-9._-]{20,}$/.test(raw)?raw:'';
}
function isAdminLoggedIn(){return !!getAdminToken()}
function setAdminLoginState(token){
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem('penak_admin_login');
  localStorage.removeItem('penak_admin_login');
  const safe=String(token||'').trim();
  if(safe){
    sessionStorage.setItem(ADMIN_TOKEN_KEY,safe);
    debugLoginLog('token_saved',{key:ADMIN_TOKEN_KEY,length:safe.length,stored:!!sessionStorage.getItem(ADMIN_TOKEN_KEY)});
  }else{
    debugLoginLog('token_cleared',{key:ADMIN_TOKEN_KEY});
  }
}
function updateAdminAuthButton(){
  const b=document.getElementById('adminAuthBtn');
  if(!b)return;
  b.innerHTML=isAdminLoggedIn()?'<i class="fas fa-right-from-bracket"></i><span>Admin Logout</span>':'<i class="fas fa-user-shield"></i><span>Admin Login</span>';
  updateInvoiceDbButton();
}
function updateInvoiceDbButton(){
  ['btnDbEntryD','btnDbEntryMobBar','btnDbEntryM'].forEach(id=>{
    const btn=document.getElementById(id);
    if(!btn)return;
    btn.style.display=isAdminLoggedIn()?'inline-flex':'none';
    btn.disabled=false;
    if(!btn.innerHTML.includes('Masuk Database')){
      btn.innerHTML='<i class="fas fa-database"></i> Masuk Database';
    }
  });
}
function showAdminPanel(show){
  const panel=document.getElementById('adminPanel');
  if(!panel)return;
  panel.classList.toggle('show',!!show);
}
function isAuthTokenExpiredMessage(message){
  const txt=String(message||'').toLowerCase();
  if(!txt)return false;
  if(txt.includes('unauthorized'))return true;
  if(!txt.includes('token'))return false;
  return txt.includes('expired')
    || txt.includes('kadaluarsa')
    || txt.includes('tidak valid')
    || txt.includes('invalid')
    || txt.includes('silakan login ulang')
    || txt.includes('akses ditolak');
}
function handleSessionExpired(message){
  if(!isAuthTokenExpiredMessage(message))return false;
  setAdminLoginState('');
  updateAdminAuthButton();
  showAdminPanel(false);
  toast('Sesi admin habis. Silakan login ulang.');
  return true;
}
function openAdminLoginModal(){document.getElementById('modalAdminLogin').classList.add('show')}
function closeAdminLoginModal(){document.getElementById('modalAdminLogin').classList.remove('show')}
async function handleAdminAuth(){
  if(isAdminLoggedIn()){
    try{
      await adminLogoutRequest();
    }catch(_err){}
    setAdminLoginState('');
    updateAdminAuthButton();
    showAdminPanel(false);
    toast('Logout admin berhasil');
    return;
  }
  openAdminLoginModal();
}
async function submitAdminLogin(){
  const u=(document.getElementById('adminUsername').value||'').trim();
  const p=document.getElementById('adminPassword').value||'';
  debugLoginLog('submit_clicked',{username:u,passwordLength:p.length,url:getActiveGasUrl()||GAS_WEB_APP_URL,candidates:getGasUrlCandidates()});
  if(!u || !p){
    toast('Username / password wajib diisi');
    return;
  }
  try{
    const res=await adminLoginRequest(u,p);
    debugLoginLog('login_response',res);
    if(!res || !res.success || !res.token){
      throw new Error(normalizeApiMessage((res && res.message) ? res.message : 'Login gagal'));
    }
    setAdminLoginState(res.token);
    debugLoginLog('post_login_state',{isAdminLoggedIn:isAdminLoggedIn(),tokenLen:getAdminToken().length});
    document.getElementById('adminPassword').value='';
    updateAdminAuthButton();
    closeAdminLoginModal();
    showAdminPanel(true);
    resetAdminForm();
    loadStockMapFromServer();
    loadOrdersFromSheet();
    toast('Login admin berhasil');
    return;
  }catch(err){
    debugLoginLog('login_error',{message:err && err.message ? err.message : String(err)});
    toast(normalizeApiMessage(err.message||'Username / password admin salah'));
  }
}
window.submitAdminLogin = submitAdminLogin;
// Backward compatibility for cached HTML/JS that still calls old login handler names.
function loginAdminIn_(){
  return submitAdminLogin();
}
function loginAdminIn(){
  return submitAdminLogin();
}
function loginAdmin(){
  return submitAdminLogin();
}
window.loginAdminIn_ = loginAdminIn_;
window.loginAdminIn = loginAdminIn;
window.loginAdmin = loginAdmin;
window.loginAdminin_ = loginAdminIn_;
window.loginAdminin = loginAdminIn;
function randomSuffix(len=4){return String(Math.floor(Math.random()*Math.pow(10,len))).padStart(len,'0')}
function generateAdminOrderNum(){
  const now=new Date();
  const yy=String(now.getFullYear()).slice(-2);
  const mm=String(now.getMonth()+1).padStart(2,'0');
  const dd=String(now.getDate()).padStart(2,'0');
  return `ADM-${yy}${mm}${dd}-${randomSuffix()}`;
}
function resetAdminForm(){
  const today=toISODate(new Date());
  document.getElementById('admNama').value='';
  document.getElementById('admWA').value='';
  document.getElementById('admJaminan').value='';
  document.getElementById('admTglAmbil').value=today;
  document.getElementById('admDurasi').value=1;
  document.getElementById('admTglKembali').value=getTanggalKembaliISO(today,1);
  document.getElementById('admDaftarItem').value='';
  document.getElementById('admCatatan').value='';
  document.getElementById('admTotal').value=0;
  document.getElementById('admStatus').value='Baru';
}
function toggleAdminForm(){
  const w=document.getElementById('adminFormWrap');
  const show=w.style.display!=='block';
  w.style.display=show?'block':'none';
  if(show)resetAdminForm();
}
function hitungAdminKembali(){
  const tgl=document.getElementById('admTglAmbil').value;
  const dur=document.getElementById('admDurasi').value||1;
  document.getElementById('admTglKembali').value=getTanggalKembaliISO(tgl,dur);
}
function setAdminMeta(text){document.getElementById('adminMeta').innerText=text}
function normalizeOrderRow(row){
  return {
    noPesanan: row.noPesanan||row['Kode Pesanan']||row['ID Internal']||row['No Pesanan']||'',
    nama: row.nama||row['Nama']||'',
    whatsapp: row.whatsapp||row['WhatsApp']||'',
    jaminan: row.jaminan||row['Jaminan']||'',
    tanggalAmbil: row.tanggalAmbil||row['Tanggal Ambil']||'',
    tanggalKembali: row.tanggalKembali||row['Tanggal Kembali']||'',
    durasi: row.durasi||row['Durasi']||'',
    daftarItem: row.daftarItem||row['Daftar Item']||'',
    catatan: row.catatan||row['Catatan']||'',
    total: Number(row.total||row['Total']||0)||0,
    waktuOrder: row.waktuOrder||row['Waktu Order']||'',
    status: row.status||row['Status']||'Baru'
  };
}
function normalizeOrderDateKey(value){
  if(value===null || typeof value==='undefined')return'';
  const raw=String(value).trim();
  if(!raw)return'';
  if(/^\d{4}-\d{2}-\d{2}$/.test(raw))return raw;
  if(/^\d{4}-\d{2}-\d{2}T/.test(raw)){
    const d=new Date(raw);
    if(!Number.isNaN(d.getTime()))return toISODate(d);
  }
  if(/^\d{2}\/\d{2}\/\d{4}$/.test(raw)){
    const p=raw.split('/');
    return `${p[2]}-${p[1]}-${p[0]}`;
  }
  const d2=new Date(raw);
  if(!Number.isNaN(d2.getTime()))return toISODate(d2);
  return '';
}
function parseWaktuOrderMs(value){
  if(value===null || typeof value==='undefined')return 0;
  const raw=String(value).trim();
  if(!raw)return 0;
  const idLike=raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,\s*|\s+)?(\d{1,2})?[.:]?(\d{1,2})?[.:]?(\d{1,2})?$/);
  if(idLike){
    const day=Number(idLike[1]);
    const month=Number(idLike[2]);
    const year=Number(idLike[3]);
    const hour=Number(idLike[4]||0);
    const min=Number(idLike[5]||0);
    const sec=Number(idLike[6]||0);
    const d=new Date(year,month-1,day,hour,min,sec);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  if(/^\d{4}-\d{2}-\d{2}$/.test(raw)){
    const dIso=new Date(`${raw}T00:00:00`);
    return Number.isNaN(dIso.getTime()) ? 0 : dIso.getTime();
  }
  const parsed=new Date(raw);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}
function dateKeyToMs(key){
  if(!key)return 0;
  const d=new Date(`${key}T00:00:00`);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}
function getOrderSortKey(order){
  const ambilKey=normalizeOrderDateKey(order.tanggalAmbil||'');
  const kembaliKey=normalizeOrderDateKey(order.tanggalKembali||'');
  return {
    ambilMs: dateKeyToMs(ambilKey),
    kembaliMs: dateKeyToMs(kembaliKey),
    waktuMs: parseWaktuOrderMs(order.waktuOrder||'')
  };
}
function compareOrderRows(a,b){
  const aKey=getOrderSortKey(a);
  const bKey=getOrderSortKey(b);
  const dir=adminFilterState.sort==='date_asc' ? 1 : -1;
  if(aKey.ambilMs!==bKey.ambilMs)return dir*(aKey.ambilMs-bKey.ambilMs);
  if(aKey.kembaliMs!==bKey.kembaliMs)return dir*(aKey.kembaliMs-bKey.kembaliMs);
  if(aKey.waktuMs!==bKey.waktuMs)return dir*(aKey.waktuMs-bKey.waktuMs);
  return dir*String(a.noPesanan||'').localeCompare(String(b.noPesanan||''));
}
function hasOrderFilter(stateObj){
  const s=stateObj||adminFilterState;
  if((s.mode||'all')==='all')return false;
  if((s.mode||'date')==='month')return !!s.month;
  return !!s.date;
}
function hasAnyAdminFilter(stateObj){return hasOrderFilter(stateObj);}
function setAdminFilterMode(mode){
  if(mode==='month'){
    adminFilterDraft.mode='month';
  }else if(mode==='all'){
    adminFilterDraft.mode='all';
  }else{
    adminFilterDraft.mode='date';
  }
  if(adminFilterDraft.mode==='date'){
    adminFilterDraft.month='';
  }else if(adminFilterDraft.mode==='month'){
    adminFilterDraft.date='';
  }else{
    adminFilterDraft.date='';
    adminFilterDraft.month='';
  }
  syncAdminFilterInputs();
}
function setAdminFilterDateInput(v){
  adminFilterDraft.date=(v||'').trim();
}
function setAdminFilterMonthInput(v){
  adminFilterDraft.month=(v||'').trim();
}
function setAdminSortMode(v){
  adminFilterDraft.sort=(v==='date_asc')?'date_asc':'date_desc';
}
function syncAdminFilterInputs(){
  const modeEl=document.getElementById('adminFilterMode');
  const fDate=document.getElementById('adminFilterDate');
  const fMonth=document.getElementById('adminFilterMonth');
  const sortEl=document.getElementById('adminSortMode');
  const timeLbl=document.getElementById('adminFilterTimeLabel');
  if(modeEl)modeEl.value=adminFilterDraft.mode;
  if(fDate){
    fDate.value=adminFilterDraft.date||'';
    fDate.disabled=adminFilterDraft.mode!=='date';
    fDate.style.display=adminFilterDraft.mode==='date'?'block':'none';
  }
  if(fMonth){
    fMonth.value=adminFilterDraft.month||'';
    fMonth.disabled=adminFilterDraft.mode!=='month';
    fMonth.style.display=adminFilterDraft.mode==='month'?'block':'none';
  }
  if(sortEl)sortEl.value=adminFilterDraft.sort;
  if(timeLbl){
    if(adminFilterDraft.mode==='month')timeLbl.innerText='Filter Bulan';
    else if(adminFilterDraft.mode==='all')timeLbl.innerText='Tanpa Filter Waktu';
    else timeLbl.innerText='Filter Tanggal';
  }
}
function applyAdminFilters(){
  adminFilterState={...adminFilterDraft};
  refreshAdminOrderView();
}
function applyAdminOrderFilters(rows){
  let list = Array.isArray(rows) ? [...rows] : [];
  if(hasOrderFilter(adminFilterState)){
    if(adminFilterState.mode==='month'){
      list=list.filter(r=>normalizeOrderDateKey(r.tanggalAmbil||'').startsWith(`${adminFilterState.month}-`));
    }else{
      list=list.filter(r=>normalizeOrderDateKey(r.tanggalAmbil||'')===adminFilterState.date);
    }
  }
  list.sort(compareOrderRows);
  return list;
}
function renderAdminPeriodMeta(filtered,total){
  const el=document.getElementById('adminPeriodMeta');
  if(!el)return;
  const omzet=(filtered||[]).reduce((sum,r)=>sum+(Number(r.total)||0),0);
  if(!hasAnyAdminFilter(adminFilterState)){
    el.innerText=`Menampilkan semua data order. Order: ${total||0}, Omzet: ${fmt(omzet)}.`;
    return;
  }
  if(adminFilterState.mode==='month'){
    const monthLabel=/^\d{4}-\d{2}$/.test(adminFilterState.month)
      ? new Date(Number(adminFilterState.month.slice(0,4)),Number(adminFilterState.month.slice(5,7))-1,1).toLocaleDateString('id-ID',{month:'long',year:'numeric'})
      : adminFilterState.month;
    el.innerText=`Filter per bulan ${monthLabel}. Ditampilkan ${filtered.length} order, omzet ${fmt(omzet)}.`;
    return;
  }
  el.innerText=`Filter per tanggal ${formatDbDate(adminFilterState.date)}. Ditampilkan ${filtered.length} order, omzet ${fmt(omzet)}.`;
}
function refreshAdminOrderView(){
  const filtered=applyAdminOrderFilters(adminOrdersAll);
  renderAdminOrders(filtered);
  renderAdminPeriodMeta(filtered,adminOrdersAll.length);
  updateAdminRecap(filtered);
}
function resetAdminFilters(){
  adminFilterState={mode:'all',date:'',month:'',sort:'date_desc'};
  adminFilterDraft={mode:'all',date:'',month:'',sort:'date_desc'};
  syncAdminFilterInputs();
  refreshAdminOrderView();
}
function lihatSemuaOrder(){
  adminFilterDraft.mode='all';
  adminFilterDraft.date='';
  adminFilterDraft.month='';
  applyAdminFilters();
}
function updateAdminRecap(filteredRows){
  const orderLabel=document.getElementById('recapOrderLabel');
  const omzetLabel=document.getElementById('recapOmzetLabel');
  let sourceRows=adminOrdersAll||[];
  let totalOrder=0;
  let totalOmzet=0;

  if(hasAnyAdminFilter(adminFilterState)){
    sourceRows=filteredRows||[];
    totalOrder=sourceRows.length;
    totalOmzet=sourceRows.reduce((sum,r)=>sum+(Number(r.total)||0),0);
    if(adminFilterState.mode==='month'){
      const labelMonth=/^\d{4}-\d{2}$/.test(adminFilterState.month)
        ? new Date(Number(adminFilterState.month.slice(0,4)),Number(adminFilterState.month.slice(5,7))-1,1).toLocaleDateString('id-ID',{month:'short',year:'numeric'})
        : adminFilterState.month;
      if(orderLabel)orderLabel.innerText=`Order ${labelMonth}`;
      if(omzetLabel)omzetLabel.innerText=`Omzet ${labelMonth}`;
    }else{
      const labelDate=formatDbDate(adminFilterState.date);
      if(orderLabel)orderLabel.innerText=`Order ${labelDate}`;
      if(omzetLabel)omzetLabel.innerText=`Omzet ${labelDate}`;
    }
  }else{
    const todayIso=toISODate(new Date());
    const rowToday=(adminOrdersAll||[]).filter(r=>{
      const wMs=parseWaktuOrderMs(r.waktuOrder||'');
      if(wMs>0)return toISODate(new Date(wMs))===todayIso;
      return normalizeOrderDateKey(r.tanggalAmbil||'')===todayIso;
    });
    sourceRows=adminOrdersAll||[];
    totalOrder=rowToday.length;
    totalOmzet=rowToday.reduce((sum,r)=>sum+(Number(r.total)||0),0);
    if(orderLabel)orderLabel.innerText='Order Hari Ini';
    if(omzetLabel)omzetLabel.innerText='Omzet Hari Ini';
  }

  const activeCount = sourceRows.filter(r=>{
    const s=String(r.status||'').toLowerCase();
    return s!=='selesai' && s!=='cancel';
  }).length;
  const doneCount = sourceRows.filter(r=>String(r.status||'').toLowerCase()==='selesai').length;
  document.getElementById('recapOrderToday').innerText=String(totalOrder);
  document.getElementById('recapOmzetToday').innerText=fmt(totalOmzet);
  document.getElementById('recapOrderActive').innerText=String(activeCount);
  document.getElementById('recapOrderDone').innerText=String(doneCount);
}
function formatDbDate(value){
  if(value===null || typeof value==='undefined') return '-';
  const raw=String(value).trim();
  if(!raw) return '-';

  const isoDateOnly=/^\d{4}-\d{2}-\d{2}$/;
  const isoLike=/^\d{4}-\d{2}-\d{2}T/;
  let parsed=null;

  if(isoDateOnly.test(raw)){
    parsed=new Date(`${raw}T00:00:00`);
  }else if(isoLike.test(raw)){
    parsed=new Date(raw);
  }

  if(parsed && !Number.isNaN(parsed.getTime())){
    return parsed.toLocaleDateString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric'});
  }
  return raw;
}
function getAdminTokenRequired(){
  const token=getAdminToken();
  if(!token){
    throw new Error('Token admin tidak valid. Silakan login ulang.');
  }
  return token;
}
function isLegacyActionError(message){
  const txt=String(message||'').toLowerCase();
  return txt.includes('unknown action') && txt.includes('list/create/update/delete') && !txt.includes('login');
}
function isDoGetDoPostMissingError(message){
  const txt=String(message||'').toLowerCase();
  return txt.includes('fungsi skrip tidak ditemukan: doget') || txt.includes('fungsi skrip tidak ditemukan: dopost');
}
function looksLikeHtmlResponse(text){
  const raw=String(text||'').trim().toLowerCase();
  return raw.startsWith('<!doctype html') || raw.startsWith('<html') || raw.includes('<body');
}
function getGasUrlCandidates(preferredUrl){
  const out=[];
  const add=(value)=>{
    const normalized=(typeof normalizeGasEndpointUrl==='function')
      ? normalizeGasEndpointUrl(value)
      : String(value||'').trim();
    if(normalized && !out.includes(normalized)) out.push(normalized);
  };
  add(preferredUrl);
  add(window.__PKB_ACTIVE_GAS_URL||'');
  add(typeof GAS_WEB_APP_URL!=='undefined'?GAS_WEB_APP_URL:'');
  try{
    const key=(typeof GAS_WEB_APP_URL_KEY!=='undefined')?GAS_WEB_APP_URL_KEY:'PKB_GAS_WEB_APP_URL';
    add(localStorage.getItem(key)||'');
  }catch(_err){}
  add(typeof GAS_WEB_APP_URL_DEFAULT!=='undefined'?GAS_WEB_APP_URL_DEFAULT:'');
  return out;
}
function setWorkingGasUrl(url){
  const normalized=(typeof normalizeGasEndpointUrl==='function')
    ? normalizeGasEndpointUrl(url)
    : String(url||'').trim();
  if(!normalized)return;
  window.__PKB_ACTIVE_GAS_URL=normalized;
  try{
    const key=(typeof GAS_WEB_APP_URL_KEY!=='undefined')?GAS_WEB_APP_URL_KEY:'PKB_GAS_WEB_APP_URL';
    localStorage.setItem(key,normalized);
  }catch(_err){}
}
function clearStoredGasUrlIfBroken(url,message){
  const msg=String(message||'').toLowerCase();
  if(!(msg.includes('fungsi skrip tidak ditemukan') || msg.includes('gagal terhubung') || msg.includes('timeout koneksi') || msg.includes('bukan json') || msg.includes('unexpected token'))){
    return;
  }
  try{
    const key=(typeof GAS_WEB_APP_URL_KEY!=='undefined')?GAS_WEB_APP_URL_KEY:'PKB_GAS_WEB_APP_URL';
    const saved=(typeof normalizeGasEndpointUrl==='function')
      ? normalizeGasEndpointUrl(localStorage.getItem(key)||'')
      : String(localStorage.getItem(key)||'').trim();
    const target=(typeof normalizeGasEndpointUrl==='function')
      ? normalizeGasEndpointUrl(url||'')
      : String(url||'').trim();
    if(saved && target && saved===target){
      localStorage.removeItem(key);
    }
  }catch(_err){}
}
function getActiveGasUrl(){
  const active=(typeof normalizeGasEndpointUrl==='function')
    ? normalizeGasEndpointUrl(window.__PKB_ACTIVE_GAS_URL||'')
    : String(window.__PKB_ACTIVE_GAS_URL||'').trim();
  if(active)return active;
  return String(typeof GAS_WEB_APP_URL!=='undefined'?GAS_WEB_APP_URL:'').trim();
}
function shouldTryNextEndpoint(message){
  const txt=String(message||'').toLowerCase();
  if(!txt)return false;
  return txt.includes('unknown action')
    || txt.includes('versi lama')
    || txt.includes('belum support login token')
    || txt.includes('gagal terhubung')
    || txt.includes('timeout koneksi')
    || txt.includes('respons web app tidak valid')
    || txt.includes('bukan json')
    || txt.includes('unexpected token')
    || txt.includes('fungsi skrip tidak ditemukan')
    || txt.includes('http ');
}
async function runAcrossGasEndpoints(executor){
  const urls=getGasUrlCandidates();
  if(!urls.length) throw new Error('URL Google Apps Script belum diisi');
  let lastError=null;
  for(let i=0;i<urls.length;i++){
    const endpoint=urls[i];
    try{
      const data=await executor(endpoint,i,urls.length);
      setWorkingGasUrl(endpoint);
      return data;
    }catch(err){
      const message=normalizeApiMessage((err && err.message) ? err.message : String(err));
      lastError=new Error(message||'Gagal terhubung ke Google Sheet');
      clearStoredGasUrlIfBroken(endpoint,message);
      debugLoginLog('endpoint_failed',{endpoint,index:i,total:urls.length,message});
      if(i===urls.length-1 || !shouldTryNextEndpoint(message)){
        throw lastError;
      }
    }
  }
  throw lastError || new Error('Gagal terhubung ke Google Sheet');
}
function normalizeApiMessage(message){
  const raw=String(message||'').trim();
  if(!raw) return '';
  if(isDoGetDoPostMissingError(raw)){
    return 'Endpoint Google Apps Script ini belum berisi doGet/doPost. Deploy ulang Web App dari project Apps Script yang benar, lalu pakai URL /exec terbaru.';
  }
  if(looksLikeHtmlResponse(raw)){
    return 'Endpoint Google Apps Script mengembalikan HTML, bukan JSON API. Pastikan URL yang dipakai adalah Web App /exec.';
  }
  if(isLegacyActionError(raw)){
    return 'Endpoint Web App masih versi lama (belum support login token). Deploy ulang Google Apps Script versi terbaru lalu update URL /exec di GAS_WEB_APP_URL.';
  }
  return raw;
}
function ensureApiSuccess(resp,fallbackMessage){
  if(!resp || resp.success===false){
    const msg=normalizeApiMessage((resp && resp.message) || fallbackMessage || 'Permintaan gagal.');
    handleSessionExpired(msg);
    throw new Error(msg);
  }
  return resp;
}
function jsonpRequest(params, endpointUrl){
  return new Promise((resolve,reject)=>{
    if(!isGasConfigured()){reject(new Error('URL Google Apps Script belum diisi'));return}
    const targetUrl=(endpointUrl || getActiveGasUrl()).trim();
    if(!targetUrl){reject(new Error('URL Google Apps Script belum diisi'));return}
    const cb='cb_'+Date.now()+'_'+Math.floor(Math.random()*9999);
    const script=document.createElement('script');
    const url=new URL(targetUrl);
    Object.keys(params||{}).forEach(k=>url.searchParams.set(k,params[k]));
    url.searchParams.set('callback',cb);
    const timeout=setTimeout(()=>{cleanup();reject(new Error('Timeout koneksi Google Sheet'));},15000);
    function cleanup(){clearTimeout(timeout);delete window[cb];if(script.parentNode)script.parentNode.removeChild(script)}
    window[cb]=(resp)=>{cleanup();setWorkingGasUrl(targetUrl);resolve(resp||{})};
    script.onerror=()=>{cleanup();reject(new Error(`Gagal terhubung ke Google Sheet (${targetUrl})`))};
    script.src=url.toString();
    document.body.appendChild(script);
  });
}
async function adminLoginRequest(username,password){
  if(!isGasConfigured()) throw new Error('URL Google Apps Script belum diisi');
  const body=new URLSearchParams({action:'login',username,password});
  return runAcrossGasEndpoints(async(endpoint)=>{
    const tryFetch=async()=>{
      debugLoginLog('fetch_login_request',{method:'POST',url:endpoint,body:body.toString()});
      const res=await fetch(endpoint,{method:'POST',body});
      const text=await res.text();
      debugLoginLog('fetch_login_raw',{status:res.status,ok:res.ok,text});
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      if(isDoGetDoPostMissingError(text) || looksLikeHtmlResponse(text)){
        throw new Error(text);
      }
      let data=null;
      try{data=JSON.parse(text)}catch(_err){
        throw new Error('Respons login tidak valid (bukan JSON).');
      }
      if(!data || typeof data.success==='undefined') throw new Error('Respons login tidak valid');
      if(data.success===false && isLegacyActionError(data.message||'')){
        throw new Error(String(data.message||'Unknown action'));
      }
      return data;
    };
    try{
      return await tryFetch();
    }catch(fetchErr){
      debugLoginLog('fetch_login_failed',{url:endpoint,message:fetchErr && fetchErr.message ? fetchErr.message : String(fetchErr)});
      debugLoginLog('jsonp_login_request',{url:endpoint,action:'login',username});
      const data=await jsonpRequest({action:'login',username,password},endpoint);
      debugLoginLog('jsonp_login_response',data);
      if(!data || typeof data.success==='undefined') throw new Error('Respons login tidak valid');
      if(data.success===false && isLegacyActionError(data.message||'')){
        throw new Error(String(data.message||'Unknown action'));
      }
      return data;
    }
  });
}
async function adminLogoutRequest(){
  const token=getAdminToken();
  if(!token || !isGasConfigured())return {success:true};
  try{
    return await jsonpRequest({action:'logout',token});
  }catch(_err){
    return {success:false};
  }
}
async function createOrderToSheet(orderData){
  if(!isGasConfigured()) return {success:false,message:'URL Google Apps Script belum diisi'};
  const token=getAdminTokenRequired();
  const payload=JSON.stringify(orderData);
  const tryFetch = async () => {
    const endpoint=getActiveGasUrl();
    const res=await fetch(endpoint,{method:'POST',body:new URLSearchParams({action:'create',payload,token})});
    const body=await res.text();
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    if(isDoGetDoPostMissingError(body) || looksLikeHtmlResponse(body)){
      throw new Error(body);
    }
    let data=null;
    try{data=JSON.parse(body)}catch(_){ }
    if(!data || typeof data.success==='undefined'){
      throw new Error('Respons Web App tidak valid (bukan JSON).');
    }
    return ensureApiSuccess(data,'Akses ditolak.');
  };

  try{
    return await tryFetch();
  }catch(fetchErr){
    try{
      const data=await jsonpRequest({action:'create',payload,token});
      if(!data || typeof data.success==='undefined'){
        throw new Error('Respons JSONP tidak valid.');
      }
      return ensureApiSuccess(data,'Akses ditolak.');
    }catch(jsonpErr){
      const detail=normalizeApiMessage((jsonpErr && jsonpErr.message) || (fetchErr && fetchErr.message) || 'unknown error');
      throw new Error(`Gagal koneksi ke Google Sheet. Pastikan Web App aksesnya "Anyone". Detail: ${detail}`);
    }
  }
}
async function loadOrdersFromSheet(){
  if(!isAdminLoggedIn())return;
  syncAdminFilterInputs();
  if(!isGasConfigured()){
    adminOrdersAll=[];
    setAdminMeta('Isi URL Google Apps Script di variabel GAS_WEB_APP_URL.');
    refreshAdminOrderView();
    return;
  }
  setAdminMeta('Memuat data order...');
  try{
    const resp=await jsonpRequest({action:'list'});
    const rows=(resp.data||[]).map(normalizeOrderRow);
    ordersCache=rows;
    adminOrdersAll=rows;
    refreshAdminOrderView();
    setAdminMeta(`Total ${rows.length} order - update ${new Date().toLocaleString('id-ID')}`);
    if(!adminStockLoaded)loadStockMapFromServer();
  }catch(err){
    adminOrdersAll=[];
    refreshAdminOrderView();
    setAdminMeta(`Gagal memuat data: ${err.message}`);
    toast('Gagal memuat database order');
  }
}
function renderAdminOrders(rows){
  const body=document.getElementById('adminOrdersBody');
  const mobileWrap=document.getElementById('adminOrdersMobile');
  if(!rows || rows.length===0){
    body.innerHTML='<tr><td colspan="8" class="admin-empty">Belum ada data order.</td></tr>';
    if(mobileWrap){
      mobileWrap.innerHTML='<div class="admin-mobile-empty">Belum ada data order.</div>';
    }
    return;
  }
  body.innerHTML=rows.map((r)=>{
    const opts=ORDER_STATUS.map(s=>`<option value="${s}"${s===r.status?' selected':''}>${s}</option>`).join('');
    const noEnc=encodeURIComponent(r.noPesanan||'');
    return `<tr>
      <td data-label="Nama">${escapeHtml(r.nama)}</td>
      <td data-label="WhatsApp">${escapeHtml(r.whatsapp)}</td>
      <td data-label="Tgl Ambil">${escapeHtml(formatDbDate(r.tanggalAmbil))}</td>
      <td data-label="Durasi">${escapeHtml(r.durasi)} hari</td>
      <td data-label="Item" class="admin-item-cell">${escapeHtml(r.daftarItem)}</td>
      <td data-label="Total">${fmt(Number(r.total)||0)}</td>
      <td data-label="Status">
        <select class="admin-status" onchange="updateOrderStatus(decodeURIComponent('${noEnc}'),this.value)">${opts}</select>
      </td>
      <td data-label="Aksi">
        <div class="admin-row-actions">
          <button class="admin-mini-btn danger" onclick="deleteOrder(decodeURIComponent('${noEnc}'))">Hapus</button>
        </div>
      </td>
    </tr>`;
  }).join('');
  if(mobileWrap){
    mobileWrap.innerHTML=rows.map((r)=>{
      const opts=ORDER_STATUS.map(s=>`<option value="${s}"${s===r.status?' selected':''}>${s}</option>`).join('');
      const noEnc=encodeURIComponent(r.noPesanan||'');
      return `<div class="admin-mobile-card">
        <div class="admin-mobile-top">
          <div class="admin-mobile-name">${escapeHtml(r.nama||'-')}</div>
          <div class="admin-mobile-total">${fmt(Number(r.total)||0)}</div>
        </div>
        <div class="admin-mobile-meta">
          <span>${escapeHtml(formatDbDate(r.tanggalAmbil))}</span>
          <span>${escapeHtml(r.durasi)} hari</span>
          <span>${escapeHtml(r.whatsapp||'-')}</span>
        </div>
        <details class="admin-mobile-detail">
          <summary>Lihat Detail</summary>
          <div class="admin-mobile-item"><b>Item:</b> ${escapeHtml(r.daftarItem||'-')}</div>
          <div class="admin-mobile-item"><b>Catatan:</b> ${escapeHtml(r.catatan||'-')}</div>
        </details>
        <div class="admin-mobile-actions">
          <select class="admin-status" onchange="updateOrderStatus(decodeURIComponent('${noEnc}'),this.value)">${opts}</select>
          <button class="admin-mini-btn danger" onclick="deleteOrder(decodeURIComponent('${noEnc}'))">Hapus</button>
        </div>
      </div>`;
    }).join('');
  }
}
async function updateOrderStatus(noPesanan,status){
  try{
    const token=getAdminTokenRequired();
    const resp=await jsonpRequest({action:'update',id:noPesanan,status,token});
    ensureApiSuccess(resp,'Gagal update status.');
    toast('Status order diperbarui');
    loadOrdersFromSheet();
  }catch(err){
    const msg=normalizeApiMessage(err.message);
    if(handleSessionExpired(msg))return;
    toast(`Gagal update status: ${msg}`);
  }
}
async function deleteOrder(noPesanan){
  if(!confirm('Hapus / cancel order ini?'))return;
  try{
    const token=getAdminTokenRequired();
    const resp=await jsonpRequest({action:'delete',id:noPesanan,token});
    ensureApiSuccess(resp,'Gagal hapus order.');
    toast('Order berhasil dihapus');
    loadOrdersFromSheet();
  }catch(err){
    const msg=normalizeApiMessage(err.message);
    if(handleSessionExpired(msg))return;
    toast(`Gagal hapus order: ${msg}`);
  }
}
async function addManualOrder(){
  const nama=(document.getElementById('admNama').value||'').trim();
  if(!nama){toast('Nama wajib diisi');return}
  const payload={
    noPesanan:'',
    nama,
    whatsapp:(document.getElementById('admWA').value||'').trim(),
    jaminan:document.getElementById('admJaminan').value||'',
    tanggalAmbil:formatDateForDb(document.getElementById('admTglAmbil').value||''),
    tanggalKembali:formatDateForDb(document.getElementById('admTglKembali').value||''),
    durasi:parseInt(document.getElementById('admDurasi').value)||1,
    daftarItem:(document.getElementById('admDaftarItem').value||'').trim(),
    catatan:(document.getElementById('admCatatan').value||'').trim(),
    total:parseInt(document.getElementById('admTotal').value)||0,
    waktuOrder:new Date().toLocaleDateString('id-ID'),
    status:document.getElementById('admStatus').value||'Baru'
  };
  try{
    await createOrderToSheet(payload);
    toast('Order manual tersimpan');
    resetAdminForm();
    loadOrdersFromSheet();
  }catch(err){
    const msg=normalizeApiMessage(err.message);
    if(handleSessionExpired(msg))return;
    toast(`Gagal simpan order: ${msg}`);
  }
}
async function pushCurrentOrderToSheet(orderData){
  if(!isGasConfigured())return;
  const res=await createOrderToSheet(orderData);
  if(res && res.success===false)throw new Error(res.message||'Sync gagal');
  return res;
}

async function masukDatabaseOrder(){
  if(!isAdminLoggedIn()){toast('Login admin dulu untuk masuk database');return}
  if(!isGasConfigured()){toast('URL Google Apps Script belum diisi');return}
  if(!getNamaPemesan()){toast('Nama pemesan wajib diisi');return}
  if(cart.length===0){toast('Pilih minimal 1 item terlebih dahulu');return}

  lastInvoicePayload=buildCurrentOrderPayload();
  const buttons=['btnDbEntryD','btnDbEntryMobBar','btnDbEntryM']
    .map(id=>document.getElementById(id))
    .filter(Boolean);
  const oldLabels=buttons.map(btn=>btn.innerHTML);
  buttons.forEach(btn=>{
    btn.disabled=true;
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
  });
  try{
    const res=await createOrderToSheet(lastInvoicePayload);
    if(res && res.success===false) throw new Error(res.message||'Gagal simpan');
    toast(res && res.duplicate ? 'Order sudah ada, data diperbarui' : 'Order masuk database');
    showAdminPanel(true);
    loadOrdersFromSheet();
  }catch(err){
    const msg=normalizeApiMessage(err.message);
    if(handleSessionExpired(msg))return;
    toast(`Gagal masuk database: ${msg}`);
  }finally{
    buttons.forEach((btn,idx)=>{
      btn.disabled=false;
      btn.innerHTML=oldLabels[idx]||'<i class="fas fa-database"></i> Masuk Database';
    });
  }
}

function toggleStockPanel(){
  if(!isAdminLoggedIn()){toast('Login admin dulu');return}
  const panel=document.getElementById('adminStockWrap');
  if(!panel)return;
  const show=panel.style.display!=='block';
  panel.style.display=show?'block':'none';
  if(show){
    loadStockMapFromServer();
  }else{
    pendingStockChanges={};
    updateSaveStockButtonState();
  }
}

async function loadStockMapFromServer(){
  if(!isGasConfigured())return;
  try{
    const resp=await jsonpRequest({action:'stockList'});
    ensureApiSuccess(resp,'Gagal memuat data stok.');
    const map=(resp && resp.data) ? resp.data : {};
    adminStockSnapshot={...map};
    pendingStockChanges={};
    applyStockMap(adminStockSnapshot);
    adminStockLoaded=true;
    if(isAdminLoggedIn()){
      renderStockRows(adminStockSnapshot);
    }
    updateSaveStockButtonState();
  }catch(_err){
    if(isAdminLoggedIn()){
      adminStockSnapshot={...itemStockMap};
      renderStockRows(adminStockSnapshot);
      updateSaveStockButtonState();
    }
  }
}

function renderStockRows(currentMap){
  const body=document.getElementById('adminStockBody');
  if(!body)return;
  const statusPriority={habis:0,maintenance:1,tersedia:2};
  const merged=[...ITEMS_SATUAN,...ITEMS_PAKET,...ITEMS_PIKNIK];
  const itemMap=new Map();
  merged.forEach(item=>{
    if(!item || !item.id)return;
    if(!itemMap.has(item.id)){
      itemMap.set(item.id,{...item});
    }
  });
  const all=[...itemMap.values()];
  const keyword=(stockSearchKeyword||'').toLowerCase().trim();
  let visible=all.filter(item=>{
    if(!keyword)return true;
    return String(item.name||'').toLowerCase().includes(keyword) || String(item.cat||'').toLowerCase().includes(keyword);
  });
  visible=visible.sort((a,b)=>{
    const statusA=(pendingStockChanges[a.id]?.status || currentMap?.[a.id] || 'tersedia').toLowerCase();
    const statusB=(pendingStockChanges[b.id]?.status || currentMap?.[b.id] || 'tersedia').toLowerCase();
    const rankA=(statusA in statusPriority)?statusPriority[statusA]:9;
    const rankB=(statusB in statusPriority)?statusPriority[statusB]:9;
    if(rankA!==rankB)return rankA-rankB;
    return String(a.name||'').localeCompare(String(b.name||''),'id',{sensitivity:'base'});
  });
  if(visible.length===0){
    body.innerHTML='<tr><td colspan="3" class="admin-empty">Item tidak ditemukan.</td></tr>';
    return;
  }
  body.innerHTML=visible.map(item=>{
    const base=(currentMap && currentMap[item.id]) ? String(currentMap[item.id]).toLowerCase() : 'tersedia';
    const pending=pendingStockChanges[item.id];
    const status=pending ? pending.status : base;
    const dirty=pending ? ' dirty' : '';
    return `<tr>
      <td>${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.cat)}</td>
      <td>
        <select class="stock-select${dirty}" onchange="queueStockStatus('${item.id}','${encodeURIComponent(item.name)}',this.value,this)">
          <option value="tersedia"${status==='tersedia'?' selected':''}>tersedia</option>
          <option value="habis"${status==='habis'?' selected':''}>habis</option>
          <option value="maintenance"${status==='maintenance'?' selected':''}>maintenance</option>
        </select>
      </td>
    </tr>`;
  }).join('');
}

function filterStockRows(keyword){
  stockSearchKeyword=String(keyword||'');
  renderStockRows(adminStockSnapshot);
}

function queueStockStatus(itemId,itemNameEnc,status,selectEl){
  if(!isAdminLoggedIn()){toast('Login admin dulu');return}
  const base=(adminStockSnapshot[itemId]||'tersedia').toLowerCase();
  if(status===base){
    delete pendingStockChanges[itemId];
    if(selectEl)selectEl.classList.remove('dirty');
  }else{
    pendingStockChanges[itemId]={status,itemName:decodeURIComponent(itemNameEnc||'')};
    if(selectEl)selectEl.classList.add('dirty');
  }
  updateSaveStockButtonState();
}

function updateSaveStockButtonState(){
  const btn=document.getElementById('btnSaveStockChanges');
  if(!btn)return;
  const count=Object.keys(pendingStockChanges).length;
  btn.disabled=count===0;
  btn.innerText=count===0?'Simpan Perubahan':`Simpan Perubahan (${count})`;
}

async function saveStockChanges(){
  if(!isAdminLoggedIn()){toast('Login admin dulu');return}
  const entries=Object.entries(pendingStockChanges);
  if(entries.length===0){toast('Tidak ada perubahan stok');return}

  const btn=document.getElementById('btnSaveStockChanges');
  const oldText=btn?btn.innerText:'Simpan Perubahan';
  if(btn){
    btn.disabled=true;
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
  }

  let ok=0;
  try{
    const token=getAdminTokenRequired();
    for(const [itemId,payload] of entries){
      const resp=await jsonpRequest({action:'stockUpdate',itemId,itemName:payload.itemName,status:payload.status,token});
      ensureApiSuccess(resp,'Gagal menyimpan perubahan stok.');
      adminStockSnapshot[itemId]=payload.status;
      ok++;
    }
    pendingStockChanges={};
    applyStockMap(adminStockSnapshot);
    renderStockRows(adminStockSnapshot);
    updateSaveStockButtonState();
    toast(`Berhasil simpan ${ok} perubahan stok`);
  }catch(err){
    const msg=normalizeApiMessage(err.message);
    if(handleSessionExpired(msg))return;
    toast(`Gagal simpan stok: ${msg}`);
  }finally{
    if(btn){
      btn.innerText=oldText;
      updateSaveStockButtonState();
    }
  }
}
