// Compatibility shim for cached inline handlers from older HTML versions.
window.loginAdminIn_ = function () {
  if (typeof window.submitAdminLogin === 'function') {
    return window.submitAdminLogin();
  }
  if (typeof window.toast === 'function') {
    window.toast('Script admin belum termuat. Coba refresh (Ctrl+F5).');
  }
};
window.loginAdminIn = window.loginAdminIn_;
window.loginAdmin = window.loginAdminIn_;
window.loginAdminin_ = window.loginAdminIn_;
window.loginAdminin = window.loginAdminIn_;

// --- DATA ---
const ITEMS_SATUAN = [
  {id:'s1',name:'Tenda 2 Layer 2P Quechua MH100',price:30000,cat:'Tenda'},
  {id:'s2',name:'Tenda 2 Layer 3-4P Wildshell Rote',price:35000,cat:'Tenda'},
  {id:'s3',name:'Tenda 2 Layer 4-5P Tendaki Borneo Black',price:40000,cat:'Tenda'},
  {id:'s4',name:'Tenda 2 Layer 4-5P Tendaki Borneo Brown',price:40000,cat:'Tenda'},
  {id:'s5',name:'Tenda 2 Layer 4-5P Tendaki Borneo White Pro',price:40000,cat:'Tenda'},
  {id:'s6',name:'Tenda 2 Layer 4-5P Tendaki Borneo Black Pro',price:40000,cat:'Tenda'},
  {id:'s7',name:'Carrier Toba 60L',price:25000,cat:'Carrier / Tas'},
  {id:'s8',name:'Carrier Sigma AG 60L',price:25000,cat:'Carrier / Tas'},
  {id:'s9',name:'Carrier Python 60L',price:25000,cat:'Carrier / Tas'},
  {id:'s10',name:'Carrier Horus 40L',price:20000,cat:'Carrier / Tas'},
  {id:'s11',name:'Carrier Bunglon 45L',price:20000,cat:'Carrier / Tas'},
  {id:'s12',name:'Carrier Alpine 48L',price:20000,cat:'Carrier / Tas'},
  {id:'s13',name:'Semi Carrier Taipan 25L',price:20000,cat:'Carrier / Tas'},
  {id:'s14',name:'Hydropack Speed Trail',price:15000,cat:'Hydropack / Daypack'},
  {id:'s15',name:'Hydropack Vertical Trail',price:20000,cat:'Hydropack / Daypack'},
  {id:'s16',name:'Hydropack Zoya',price:15000,cat:'Hydropack / Daypack'},
  {id:'s17',name:'Hydropack Penak',price:15000,cat:'Hydropack / Daypack'},
  {id:'s18',name:'Hydropack Noma',price:20000,cat:'Hydropack / Daypack'},
  {id:'s19',name:'Hydropack Alpha',price:15000,cat:'Hydropack / Daypack',desc:'Range Rp15.000 - Rp20.000/hari'},
  {id:'s20',name:'Hydropack Quebec',price:20000,cat:'Hydropack / Daypack'},
  {id:'s21',name:'Hydropack Kilimanjaro',price:15000,cat:'Hydropack / Daypack'},
  {id:'s22',name:'Daypack Quechua',price:10000,cat:'Hydropack / Daypack'},
  {id:'s23',name:'Daypack Mochila',price:15000,cat:'Hydropack / Daypack'},
  {id:'s24',name:'Daypack Antarestar',price:15000,cat:'Hydropack / Daypack'},
  {id:'s25',name:'Daypack Aka Adventure',price:15000,cat:'Hydropack / Daypack'},
  {id:'s26',name:'Daypack Sapala',price:15000,cat:'Hydropack / Daypack'},
  {id:'s27',name:'Gorpcore Credifox',price:15000,cat:'Jaket / Gorpcore'},
  {id:'s28',name:'Credifox Reflective',price:15000,cat:'Jaket / Gorpcore'},
  {id:'s29',name:'Gorpcore Bogaboo',price:20000,cat:'Jaket / Gorpcore'},
  {id:'s30',name:'Gorpcore Carumby',price:20000,cat:'Jaket / Gorpcore'},
  {id:'s31',name:'Gorpcore Had',price:15000,cat:'Jaket / Gorpcore',desc:'Range Rp15.000 - Rp20.000/hari'},
  {id:'s32',name:'Gorpcore Jirion',price:15000,cat:'Jaket / Gorpcore'},
  {id:'s33',name:'Gorpcore Kilimanjaro',price:20000,cat:'Jaket / Gorpcore'},
  {id:'s34',name:'Gorpcore Fearless',price:15000,cat:'Jaket / Gorpcore'},
  {id:'s35',name:'Gorpcore Wallhike',price:15000,cat:'Jaket / Gorpcore'},
  {id:'s36',name:'Gorpcore Polos',price:10000,cat:'Jaket / Gorpcore'},
  {id:'s37',name:'Puffer Penak',price:15000,cat:'Jaket / Gorpcore',desc:'Range Rp15.000 - Rp20.000/hari'},
  {id:'s38',name:'Puffer Quiksilver',price:15000,cat:'Jaket / Gorpcore'},
  {id:'s39',name:'Baselayer Wanita',price:10000,cat:'Baselayer'},
  {id:'s40',name:'Baselayer Pria Maniac',price:15000,cat:'Baselayer'},
  {id:'s41',name:'Baselayer Pria Monte',price:15000,cat:'Baselayer'},
  {id:'s42',name:'Baselayer Pria Credifox',price:15000,cat:'Baselayer'},
  {id:'s43',name:'Baselayer Pria Sapala',price:15000,cat:'Baselayer'},
  {id:'s44',name:'Celana Cargo Parasut',price:15000,cat:'Celana'},
  {id:'s45',name:'Cargo Hextstudio',price:15000,cat:'Celana'},
  {id:'s46',name:'Cargo Turtle',price:15000,cat:'Celana'},
  {id:'s47',name:'Cargo Freedo',price:15000,cat:'Celana'},
  {id:'s48',name:'Cargo Baggy Seeking',price:15000,cat:'Celana'},
  {id:'s49',name:'Celana Credifox',price:15000,cat:'Celana'},
  {id:'s50',name:'UPS Reflective',price:15000,cat:'Celana'},
  {id:'s51',name:'Kupluk Arc’',price:8000,cat:'Topi / Kupluk'},
  {id:'s52',name:'Kupluk Bintang',price:5000,cat:'Topi / Kupluk'},
  {id:'s53',name:'Kupluk Penak',price:5000,cat:'Topi / Kupluk'},
  {id:'s54',name:'Kupluk Spiderman',price:5000,cat:'Topi / Kupluk'},
  {id:'s55',name:'Topi Kalcer',price:5000,cat:'Topi / Kupluk'},
  {id:'s56',name:'Topi Forclaz',price:5000,cat:'Topi / Kupluk'},
  {id:'s57',name:'Topi Rimba Credifox',price:5000,cat:'Topi / Kupluk'},
  {id:'s58',name:'Topi Rimba Avtech',price:5000,cat:'Topi / Kupluk'},
  {id:'s59',name:'Topi Rimba Humblezing',price:15000,cat:'Topi / Kupluk'},
  {id:'s60',name:'Rubtrack',price:15000,cat:'Sepatu Gunung'},
  {id:'s61',name:'Hitec',price:15000,cat:'Sepatu Gunung'},
  {id:'s62',name:'Lavio',price:15000,cat:'Sepatu Gunung'},
  {id:'s63',name:'Black Yak',price:15000,cat:'Sepatu Gunung'},
  {id:'s64',name:'Treksta',price:15000,cat:'Sepatu Gunung'},
  {id:'s65',name:'Nepa',price:15000,cat:'Sepatu Gunung'},
  {id:'s66',name:'Spotec',price:15000,cat:'Sepatu Gunung'},
  {id:'s67',name:'Aerostreet',price:15000,cat:'Sepatu Gunung'},
  {id:'s68',name:'Ardiles',price:15000,cat:'Sepatu Gunung'},
  {id:'s69',name:'Leedo',price:15000,cat:'Sepatu Gunung'},
  {id:'s70',name:'Caiday',price:15000,cat:'Sepatu Gunung'},
  {id:'s71',name:'Lafuma',price:15000,cat:'Sepatu Gunung'},
  {id:'s72',name:'Lotto',price:15000,cat:'Sepatu Gunung'},
  {id:'s73',name:'Skechers Trail',price:15000,cat:'Sepatu Gunung'},
  {id:'s74',name:'The Red Face',price:15000,cat:'Sepatu Gunung'},
  {id:'s75',name:'The North Face',price:15000,cat:'Sepatu Gunung'},
  {id:'s76',name:'Keen',price:15000,cat:'Sepatu Gunung'},
  {id:'s77',name:'Broadstone',price:15000,cat:'Sepatu Gunung'},
  {id:'s78',name:'Leisure High',price:15000,cat:'Sepatu Gunung'},
  {id:'s79',name:'Trekking Pole Lipat',price:5000,cat:'Aksesoris Pendakian'},
  {id:'s80',name:'Trekking Pole Jepit',price:10000,cat:'Aksesoris Pendakian'},
  {id:'s81',name:'Trekking Pole Forclaz',price:10000,cat:'Aksesoris Pendakian'},
  {id:'s82',name:'Headlamp Pendakian',price:5000,cat:'Aksesoris Pendakian'},
  {id:'s83',name:'Kacamata',price:5000,cat:'Aksesoris Pendakian'},
  {id:'s84',name:'Sarung Tangan Polar',price:5000,cat:'Aksesoris Pendakian'},
  {id:'s85',name:'Masker Gas Respirator',price:10000,cat:'Aksesoris Pendakian'},
  {id:'s86',name:'Sleeping Bag',price:10000,cat:'Perlengkapan Camping'},
  {id:'s87',name:'Matras Foam',price:10000,cat:'Perlengkapan Camping'},
  {id:'s88',name:'Matras Tidur Gulung',price:10000,cat:'Perlengkapan Camping'},
  {id:'s89',name:'Kursi Lipat',price:10000,cat:'Perlengkapan Camping'},
  {id:'s90',name:'Kursi Lipat Jumbo',price:15000,cat:'Perlengkapan Camping'},
  {id:'s91',name:'Kursi Lipat Glamping',price:20000,cat:'Perlengkapan Camping'},
  {id:'s92',name:'Meja Lipat Aluminium',price:15000,cat:'Perlengkapan Camping'},
  {id:'s93',name:'Meja Lipat Kain',price:10000,cat:'Perlengkapan Camping'},
  {id:'s94',name:'Lampu Tenda',price:4000,cat:'Perlengkapan Camping',desc:'Range Rp4.000 - Rp8.000/hari'},
  {id:'s95',name:'Flysheet 2x3',price:10000,cat:'Perlengkapan Camping'},
  {id:'s96',name:'Flysheet 4x5',price:15000,cat:'Perlengkapan Camping'},
  {id:'s97',name:'Tiang Flysheet',price:10000,cat:'Perlengkapan Camping'},
  {id:'s98',name:'Powerbank 10.000mAh',price:10000,cat:'Perlengkapan Camping'},
  {id:'s99',name:'Kompor Koper',price:15000,cat:'Peralatan Masak'},
  {id:'s100',name:'Kompor Bulat',price:10000,cat:'Peralatan Masak'},
  {id:'s101',name:'Nesting / Panci',price:5000,cat:'Peralatan Masak'},
  {id:'s102',name:'Grill Pan Kotak',price:10000,cat:'Peralatan Masak'},
  {id:'s103',name:'Grill Pan Bulat',price:10000,cat:'Peralatan Masak'},
  {id:'s104',name:'Tea Set Picnic',price:10000,cat:'Peralatan Masak'},
  {id:'s105',name:'Teko Kemping',price:5000,cat:'Peralatan Masak'},
  {id:'s106',name:'Cangkir Mini',price:2000,cat:'Peralatan Masak'},
  {id:'s107',name:'Piring Satuan',price:2000,cat:'Peralatan Masak'},
  {id:'s108',name:'Mangkok Sambal',price:2000,cat:'Peralatan Masak'},
  {id:'s109',name:'Water Tank 5L',price:5000,cat:'Peralatan Masak'},
  {id:'s110',name:'Torch Gas',price:5000,cat:'Peralatan Masak'},
  {id:'s111',name:'Gas Portable',price:7000,cat:'Peralatan Masak',desc:'Rp7.000/pcs'},
  {id:'s112',name:'Sumpit Aluminium',price:2000,cat:'Peralatan Masak'},
  {id:'s113',name:'Kuas Grill',price:2000,cat:'Peralatan Masak'},
  {id:'s114',name:'Sendok Pisau 3in1',price:3000,cat:'Peralatan Masak'},
  {id:'s115',name:'Capitan Grill',price:3000,cat:'Peralatan Masak'},
  {id:'s116',name:'Keranjang Besar',price:15000,cat:'Piknik'},
  {id:'s117',name:'Keranjang Kecil',price:10000,cat:'Piknik'},
  {id:'s118',name:'Keranjang Snack',price:2000,cat:'Piknik'},
  {id:'s119',name:'Tas Eceng Gondok',price:10000,cat:'Piknik'},
  {id:'s120',name:'Alas Waterproof',price:5000,cat:'Piknik',desc:'Range Rp5.000 - Rp15.000/hari'},
  {id:'s121',name:'Alas Kanvas Polos',price:10000,cat:'Piknik'},
  {id:'s122',name:'Alas Kotak',price:10000,cat:'Piknik'},
  {id:'s123',name:'Kamera Analog',price:5000,cat:'Piknik'},
  {id:'s124',name:'Koran Vintage',price:3000,cat:'Piknik'},
  {id:'s125',name:'Majalah Palsu',price:3000,cat:'Piknik'},
  {id:'s126',name:'Buku Bacaan Asli',price:5000,cat:'Piknik'},
  {id:'s127',name:'Bunga Palsu',price:5000,cat:'Piknik'},
  {id:'s128',name:'Bunga Tulip',price:5000,cat:'Piknik'},
  {id:'s129',name:'Bunga Edelweis',price:5000,cat:'Piknik'},
  {id:'s130',name:'Cermin Oval',price:5000,cat:'Piknik'},
  {id:'s131',name:'Cermin Love',price:5000,cat:'Piknik'},
  {id:'s132',name:'Piring Kayu',price:2000,cat:'Piknik'},
  {id:'s133',name:'Gelas Kayu',price:2000,cat:'Piknik'},
  {id:'s134',name:'Tatakan Gelas',price:2000,cat:'Piknik'},
  {id:'s135',name:'Payung Aesthetic',price:5000,cat:'Piknik'}
];

const ITEMS_PAKET = [
  {id:'p1',name:'Kemping Ceria 1',price:85000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras Tidur 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs'},
  {id:'p2',name:'Kemping Ceria 2',price:110000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras Tidur 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs, Kursi Lipat 2 pcs, Meja Kain 1 pcs'},
  {id:'p3',name:'Kemping Ceria 3',price:130000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras Tidur 2 pcs, Keril 60L, Sleeping Bag 2 pcs, Headlamp 2 pcs, Kursi Lipat 2 pcs, Meja Kain, Lampu Tenda'},
  {id:'p4',name:'Kemping Rame2',price:250000,cat:'Paket Kemping',desc:'Tenda 4-5P 2 pcs, Kompor + Gas + Nesting, Matras Tidur 4 pcs, Keril 60L 2 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs, Kursi Lipat 4 pcs, Meja Kain 2 pcs, Lampu Tenda 2 pcs'},
  {id:'p5',name:'Kemping Berdua',price:75000,cat:'Paket Kemping',desc:'Tenda 2P, Kompor + Gas + Nesting, Matras Tidur 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs'},
  {id:'p6',name:'Kemping Bertiga',price:100000,cat:'Paket Kemping',desc:'Tenda 3-4P, Kompor + Gas + Nesting, Matras Tidur 3 pcs, Sleeping Bag 3 pcs, Headlamp 3 pcs'},
  {id:'p7',name:'Kemping Berempat',price:120000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras Tidur 4 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs'},
  {id:'p8',name:'Kemping Komplit',price:170000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras Tidur 4 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs, Kursi Lipat 4 pcs, Meja Lipat 2 pcs, Lampu Tenda'},
  {id:'p9',name:'Kemping Ranti Ber-2',price:110000,cat:'Paket Kemping',desc:'Tenda 2P, Kompor + Gas + Nesting, Matras Tidur 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs, Keril 60L, Trekking Pole 2 pcs'},
  {id:'p10',name:'Kemping Ranti Ber-4',price:195000,cat:'Paket Kemping',desc:'Tenda 3-4P, Kompor + Gas + Nesting, Matras Tidur 4 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs, Keril 60L 2 pcs, Trekking Pole 4 pcs, Lampu Tenda'}
];

const ITEMS_PIKNIK = ITEMS_SATUAN
  .filter(item => item.cat === 'Piknik')
  .map(item => ({...item,id:`k_${item.id}`}));

// --- CONSOLIDATED CATALOG FOR DAFTAR HARGA ---
const KATALOG_SECTIONS = (() => {
  const sections = [];
  const catOrder = [
    'Tenda',
    'Carrier / Tas',
    'Hydropack / Daypack',
    'Jaket / Gorpcore',
    'Baselayer',
    'Celana',
    'Topi / Kupluk',
    'Sepatu Gunung',
    'Aksesoris Pendakian',
    'Perlengkapan Camping',
    'Peralatan Masak',
    'Piknik'
  ];
  catOrder.forEach(catName => {
    const items = ITEMS_SATUAN
      .filter(item => item.cat === catName)
      .map(item => ({name:item.name,price:item.price,desc:item.desc||''}));
    if(items.length){
      sections.push({title:`Sewa Satuan - ${catName}`,items});
    }
  });
  sections.push({
    title:'Paket Kemping',
    items:ITEMS_PAKET.map(item=>({name:item.name,price:item.price,desc:item.desc||''}))
  });
  return sections;
})();

// --- STATE ---
let activeTab = 'catalog';
let activecat = 'Semua';
let cart = [];
let allItems = [];
let currentOrderNum = '';
let ordersCache = [];
let lastInvoicePayload = null;
let itemStockMap = {};
let isSubmittingOrder = false;
let catalogShowAll = false;
const CATALOG_INITIAL_ROWS = 5;

const GAS_WEB_APP_URL_KEY = 'PKB_GAS_WEB_APP_URL';
const GAS_WEB_APP_URL_DEFAULT = 'https://script.google.com/macros/s/AKfycbx824RKApDjyfBf4jeI6CPJOupLo2KKYKPh9BYaLDYubVHdLMGYLFCnAEFJJphjfw3w/exec';
function normalizeGasEndpointUrl(url){
  const raw=String(url||'').trim();
  if(!raw)return'';
  if(!/^https?:\/\//i.test(raw))return'';
  if(!raw.includes('/exec') && !raw.includes('/dev'))return'';
  return raw;
}
// Bisa dioverride sementara via:
// localStorage.setItem('PKB_GAS_WEB_APP_URL', 'https://script.google.com/macros/s/AKfycbyj-WiQrBU2BFof8IfvIpfHSOkzjfgRUBhs84yL2v0vCqKNgQzLWe_tvIvBzDRYg6Vr/exec')
const GAS_WEB_APP_URL_OVERRIDE_RAW = localStorage.getItem(GAS_WEB_APP_URL_KEY)||'';
const GAS_WEB_APP_URL_OVERRIDE = normalizeGasEndpointUrl(GAS_WEB_APP_URL_OVERRIDE_RAW);
if(GAS_WEB_APP_URL_OVERRIDE_RAW && !GAS_WEB_APP_URL_OVERRIDE){
  localStorage.removeItem(GAS_WEB_APP_URL_KEY);
}
const GAS_WEB_APP_URL = GAS_WEB_APP_URL_OVERRIDE || GAS_WEB_APP_URL_DEFAULT;
const ADMIN_TOKEN_KEY = 'penak_admin_token';
const ORDER_STATUS = ['Baru','Diproses','Diambil','Selesai','Cancel'];
const STOCK_STATUS = ['tersedia','habis','maintenance'];
const WA_NUMBER_DISPLAY = '081333758178';
const WA_NUMBER_INTERNATIONAL = '6281333758178';

// --- UTILS ---
const fmt = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0}).format(n);
function fmtDateShort(s){if(!s)return'-';const d=new Date(s+'T00:00:00');return d.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}
function toast(msg){const t=document.getElementById('toast');document.getElementById('toastMsg').innerText=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function isGasConfigured(){return !!normalizeGasEndpointUrl(GAS_WEB_APP_URL)}
function toISODate(dateObj){
  if(!dateObj || Number.isNaN(dateObj.getTime()))return'';
  const y=String(dateObj.getFullYear());
  const m=String(dateObj.getMonth()+1).padStart(2,'0');
  const d=String(dateObj.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function getTanggalKembaliISO(tglAmbil,durasi){if(!tglAmbil)return'';const d=new Date(tglAmbil+'T00:00:00');d.setDate(d.getDate()+(parseInt(durasi)||1));return toISODate(d)}
function formatDateForDb(value){
  if(!value)return'';
  const isoOnly=/^\d{4}-\d{2}-\d{2}$/;
  if(isoOnly.test(value))return value;
  const parsed=new Date(value);
  if(Number.isNaN(parsed.getTime()))return value;
  return toISODate(parsed);
}
function formatItemList(){return cart.map(i=>`${i.name} x${i.qty}`).join(', ')}
function isCartSheetOpen(){const s=document.getElementById('cartSheet');return !!(s&&s.classList.contains('open'))}
function getSyncedValue(desktopId,mobileId){
  const desktop=(document.getElementById(desktopId).value||'').trim();
  const mobile=(document.getElementById(mobileId).value||'').trim();
  return isCartSheetOpen() ? (mobile||desktop) : (desktop||mobile);
}
function getNamaPemesan(){return getSyncedValue('namaPemesan','namaPesananM')}
function getWaPemesan(){return getSyncedValue('waPemesan','waPesananM')}
function getJaminanPemesan(){return getSyncedValue('jaminanPemesan','jaminanPesananM')}
function getCatatanPemesan(){return getSyncedValue('catatanPemesan','catatanPesananM')}
function getInputValue(id){const el=document.getElementById(id);return el?String(el.value||''):''}
function setInputValue(id,value){const el=document.getElementById(id);if(el)el.value=String(value||'')}
function syncDesktopToMobileForm(force){
  const forceSync=!!force;
  const pairs=[
    ['namaPemesan','namaPesananM'],
    ['waPemesan','waPesananM'],
    ['jaminanPemesan','jaminanPesananM'],
    ['catatanPemesan','catatanPesananM'],
    ['tglPesan','tglPesanM'],
    ['durasiSewa','durasiM']
  ];
  pairs.forEach(([deskId,mobId])=>{
    const desk=getInputValue(deskId);
    const mob=getInputValue(mobId);
    if(forceSync || !mob){
      setInputValue(mobId,desk);
    }
  });
}
function syncMobileToDesktopForm(){
  const pairs=[
    ['namaPesananM','namaPemesan'],
    ['waPesananM','waPemesan'],
    ['jaminanPesananM','jaminanPemesan'],
    ['catatanPesananM','catatanPemesan'],
    ['tglPesanM','tglPesan'],
    ['durasiM','durasiSewa']
  ];
  pairs.forEach(([mobId,deskId])=>{
    const mob=getInputValue(mobId);
    setInputValue(deskId,mob);
  });
}
function saveOrderDraft(){}
function restoreOrderDraft(){}
function bindOrderDraftAutosave(){}
function resetOrderInputsOnReload(){
  const today=toISODate(new Date());
  try{sessionStorage.removeItem('penak_order_draft_v1')}catch(_err){}
  setInputValue('namaPemesan','');
  setInputValue('waPemesan','');
  setInputValue('jaminanPemesan','');
  setInputValue('catatanPemesan','');
  setInputValue('tglPesan',today);
  setInputValue('durasiSewa','1');
  setInputValue('namaPesananM','');
  setInputValue('waPesananM','');
  setInputValue('jaminanPesananM','');
  setInputValue('catatanPesananM','');
  setInputValue('tglPesanM',today);
  setInputValue('durasiM','1');
  setInputValue('adminUsername','');
  setInputValue('adminPassword','');
  setInputValue('adminStockSearch','');
  setInputValue('adminFilterMode','date');
  setInputValue('adminFilterDate','');
  setInputValue('adminFilterMonth','');
  setInputValue('adminSortMode','date_desc');
  setInputValue('searchInput','');
  const clearBtn=document.getElementById('clearSearch');
  if(clearBtn)clearBtn.classList.remove('show');
  cart=[];
}
function getStockStatusById(id){
  const status=String(itemStockMap[id]||'tersedia').toLowerCase();
  return STOCK_STATUS.includes(status)?status:'tersedia';
}
function isItemAvailable(id){return getStockStatusById(id)==='tersedia'}
function applyStockMap(rawMap){
  itemStockMap={};
  Object.keys(rawMap||{}).forEach(k=>{itemStockMap[k]=String(rawMap[k]||'tersedia').toLowerCase()});
  cart=cart.filter(item=>isItemAvailable(item.id));
  renderTab();
  renderCart();
  hitungTotal();
}
function setSubmitLoading(isLoading){
  const ids=['btnOrderD','btnOrderM'];
  ids.forEach(id=>{
    const btn=document.getElementById(id);
    if(!btn)return;
    btn.disabled=!!isLoading;
    btn.innerHTML=isLoading?'<i class="fas fa-spinner fa-spin"></i> Memproses...':'<i class="fas fa-paper-plane"></i> Lihat Keranjang';
  });
}
function buildCurrentOrderPayload(){
  const nama=getNamaPemesan();
  const wa=getWaPemesan();
  const jaminan=getJaminanPemesan();
  const catatan=getCatatanPemesan();
  const tgl=document.getElementById('tglPesan').value;
  const dur=parseInt(document.getElementById('durasiSewa').value)||1;
  const total=cart.reduce((sum,item)=>sum+(item.price*item.qty*dur),0);
  return {
    noPesanan:'',
    nama,
    whatsapp:wa,
    jaminan,
    catatan,
    tanggalAmbil:formatDateForDb(tgl),
    tanggalKembali:formatDateForDb(getTanggalKembaliISO(tgl,dur)),
    durasi:dur,
    daftarItem:formatItemList(),
    total,
    waktuOrder:new Date().toLocaleDateString('id-ID'),
    status:'Baru'
  };
}


function generateOrderNum(){
  const now=new Date();
  const yy=String(now.getFullYear()).slice(-2);
  const mm=String(now.getMonth()+1).padStart(2,'0');
  const dd=String(now.getDate()).padStart(2,'0');
  const rand=String(Math.floor(1000+Math.random()*9000));
  currentOrderNum='PKB-'+yy+mm+dd+'-'+rand;
  document.getElementById('orderNumD').innerText=currentOrderNum;
  document.getElementById('orderNumM').innerText=currentOrderNum;
  return currentOrderNum;
}

function isLocalDevHost(){
  const h=(location && location.hostname) ? String(location.hostname).toLowerCase() : '';
  return h==='127.0.0.1' || h==='localhost' || h==='::1';
}
async function clearDevServiceWorkerCache(){
  if(!('serviceWorker' in navigator)) return;
  try{
    const regs=await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map(r=>r.unregister()));
  }catch(_err){}
  if(window.caches && typeof window.caches.keys==='function'){
    try{
      const keys=await window.caches.keys();
      await Promise.all(keys.map(k=>window.caches.delete(k)));
    }catch(_err){}
  }
}
function registerServiceWorker(){
  if(!('serviceWorker' in navigator)) return;
  if(isLocalDevHost()){
    clearDevServiceWorkerCache();
    return;
  }
  navigator.serviceWorker.register('./service-worker.js').catch(function(err){
    console.warn('Service worker gagal didaftarkan:',err);
  });
}

window.onload = function(){
  const today = toISODate(new Date());
  registerServiceWorker();
  const hdrWa=document.querySelector('.hdr-wa');
  if(hdrWa)hdrWa.href=`https://wa.me/${WA_NUMBER_INTERNATIONAL}`;
  resetOrderInputsOnReload();
  generateOrderNum();
  hitungKembali();
  renderTab();
  syncDesktopToMobileForm(true);
  renderCart();
  hitungTotal();
  hitungKembali();
  updateAdminAuthButton();
  if(typeof resetAdminForm==='function')resetAdminForm();
  if(typeof loadStockMapFromServer==='function'){
    loadStockMapFromServer();
  }
  if(isAdminLoggedIn()){
    showAdminPanel(true);
    resetAdminForm();
    loadOrdersFromSheet();
  }else{
    showAdminPanel(false);
  }
  document.getElementById('modalAdminLogin').addEventListener('click',function(e){if(e.target===this)closeAdminLoginModal()});
  positionDesktopFooter();
};

function switchTab(tab, el){
  activeTab = tab;
  activecat = 'Semua';
  if(tab==='catalog')catalogShowAll=false;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');

  if(tab==='katalog'){
    window.open('KATALOG.pdf','_blank');
    return;
  }
  document.getElementById('orderView').style.display='block';
  document.getElementById('katalogPage').style.display='none';
  document.getElementById('mobBar').style.display='flex';
  document.getElementById('searchInput').value='';
  document.getElementById('clearSearch').classList.remove('show');
  renderTab();
  positionDesktopFooter();
}

function renderKatalog(){
  const c = document.getElementById('katalogContent');
  const logoSrc = document.querySelector('.logo-img').src;
  let html = `
    <div class="katalog-header">
      <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:10px">
        <img src="${logoSrc}" style="width:44px;height:44px;border-radius:10px;object-fit:cover">
        <div style="text-align:left">
          <div style="font-size:18px;font-weight:800;color:var(--ink)">Penak Kemping BWI</div>
          <div style="font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-4)">Rental Alat Outdoor - Banyuwangi</div>
        </div>
      </div>
      <h2>Katalog & Daftar Harga</h2>
      <p>Semua harga dalam Rupiah per hari - WA: ${WA_NUMBER_DISPLAY} - Perum GGM EF 19, Banyuwangi</p>
    </div>
  `;
  KATALOG_SECTIONS.forEach(sec => {
    html += `<div class="katalog-section"><div class="katalog-section-title">${sec.title}</div>`;
    html += `<table class="katalog-table">`;
    sec.items.forEach((item,i) => {
      html += `<tr>
        <td class="row-num">${i+1}</td>
        <td>${item.name}</td>
        ${item.desc ? `<td class="desc-cell">${item.desc}</td>` : '<td></td>'}
        <td>${fmt(item.price)}<span style="font-size:9px;font-weight:400;color:var(--ink-4)">/hari</span></td>
      </tr>`;
    });
    html += `</table></div>`;
  });
  html += `<div style="text-align:center;padding:16px 0;font-size:11px;color:var(--ink-4);border-top:1px solid var(--line);margin-top:8px">
    Harga dapat berubah sewaktu-waktu. Hubungi kami untuk konfirmasi ketersediaan.
  </div>`;
  c.innerHTML = html;
}

function renderTab(){
  if(activeTab==='catalog') allItems = [...ITEMS_SATUAN].sort((a,b)=>a.name.localeCompare(b.name,'id',{sensitivity:'base'}));
  else if(activeTab==='package') allItems = [...ITEMS_PAKET].sort((a,b)=>a.name.localeCompare(b.name,'id',{sensitivity:'base'}));
  else allItems = [...ITEMS_PIKNIK].sort((a,b)=>a.name.localeCompare(b.name,'id',{sensitivity:'base'}));
  buildCatFilter();
  renderGrid(allItems);
  positionDesktopFooter();
}

function buildCatFilter(){
  const cf = document.getElementById('catFilter');
  if(activeTab!=='catalog'){
    cf.style.display='none';
    cf.innerHTML='';
    activecat='Semua';
    return;
  }
  cf.style.display='flex';
  const cats = ['Semua',...new Set(allItems.map(i=>i.cat))];
  cf.innerHTML = cats.map(c=>`<div class="cf-btn${c===activecat?' active':''}" onclick="selectCat('${c}',this)">${c}</div>`).join('');
}

function selectCat(cat, el){
  activecat = cat;
  catalogShowAll=false;
  document.querySelectorAll('.cf-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  applyFilter(document.getElementById('searchInput').value.toLowerCase());
}

function filterItems(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.getElementById('clearSearch').classList.toggle('show',q.length>0);
  applyFilter(q);
}
function clearSearch(){
  document.getElementById('searchInput').value='';
  document.getElementById('clearSearch').classList.remove('show');
  applyFilter('');
}
function applyFilter(q){
  let filtered = allItems;
  if(activecat!=='Semua') filtered=filtered.filter(i=>i.cat===activecat);
  if(q) filtered=filtered.filter(i=>i.name.toLowerCase().includes(q)||(i.desc||''). toLowerCase().includes(q));
  renderGrid(filtered);
}

function getCatalogPreviewLimit(){
  const grid=document.getElementById('itemGrid');
  const width=(grid && grid.clientWidth) ? grid.clientWidth : window.innerWidth;
  const approxCardWidth=179;
  const col=Math.max(1,Math.floor((width+9)/approxCardWidth));
  return col*CATALOG_INITIAL_ROWS;
}
function renderCatalogExpandAction(totalCount,shownCount){
  const wrap=document.getElementById('catalogExpandWrap');
  if(!wrap)return;
  if(activeTab!=='catalog' || catalogShowAll || shownCount>=totalCount){
    wrap.innerHTML='';
    return;
  }
  wrap.innerHTML='<button class="catalog-expand-btn" type="button" onclick="showAllCatalogItems()">Tampilkan Semua</button>';
}
function showAllCatalogItems(){
  catalogShowAll=true;
  applyFilter((document.getElementById('searchInput').value||'').toLowerCase());
}

function renderGrid(items){
  const g = document.getElementById('itemGrid');
  const rawQuery=(document.getElementById('searchInput').value||'').trim();
  let shownItems=items;
  if(activeTab==='catalog' && !catalogShowAll && !rawQuery){
    shownItems=items.slice(0,getCatalogPreviewLimit());
  }
  if(shownItems.length===0){
    g.innerHTML=`<div class="no-results"><i class="fas fa-magnifying-glass"></i>Tidak ditemukan</div>`;
    renderCatalogExpandAction(items.length,shownItems.length);
    return;
  }
  const isPkg=(activeTab==='package'||activeTab==='picnic');
  g.innerHTML=shownItems.map((item,idx)=>{
    const inCart=cart.find(c=>c.id===item.id);
    const stockStatus=getStockStatusById(item.id);
    const unavailable=stockStatus!=='tersedia';
    const stockTag=stockStatus==='habis'?'Habis':(stockStatus==='maintenance'?'Maintenance':'');
    return `<div class="item-card${inCart?' in-cart':''}${unavailable?' unavailable':''}" onclick="toggleItem('${item.id}')" style="animation-delay:${idx*0.02}s" data-id="${item.id}">
      ${stockTag?`<span class="item-stock-tag ${stockStatus}">${stockTag}</span>`:''}
      <div class="item-cat-badge">${item.cat}</div>
      ${isPkg?'<span class="item-pkg-badge">PAKET</span>':''} 
      <div class="item-name">${item.name}</div>
      ${item.desc?`<div style="font-size:9.5px;color:var(--ink-4);line-height:1.4;margin-top:1px">${item.desc.substring(0,55)}${item.desc.length>55?'...':''}</div>`:''}
      <div class="item-price">${fmt(item.price)}<span class="item-price-sub">/hari</span></div>
    </div>`;
  }).join('');
  renderCatalogExpandAction(items.length,shownItems.length);
}

function toggleItem(id){
  const item=[...ITEMS_SATUAN,...ITEMS_PAKET,...ITEMS_PIKNIK].find(i=>i.id===id);
  if(!item)return;
  const stockStatus=getStockStatusById(id);
  if(stockStatus==='habis'){toast(`${item.name} sedang habis`);return}
  if(stockStatus==='maintenance'){toast(`${item.name} sedang maintenance`);return}
  const idx=cart.findIndex(c=>c.id===id);
  if(idx>=0) cart[idx].qty++;
  else cart.push({...item,qty:1});
  bumpBadge();renderCart();updateGridHighlight();hitungTotal();
  saveOrderDraft();
  toast(`${item.name} ditambahkan`);
}

function changeQty(id,delta){
  const idx=cart.findIndex(c=>c.id===id);
  if(idx<0)return;
  cart[idx].qty+=delta;
  if(cart[idx].qty<=0)cart.splice(idx,1);
  renderCart();updateGridHighlight();hitungTotal();
  saveOrderDraft();
}
function removeItem(id){
  cart=cart.filter(c=>c.id!==id);
  renderCart();updateGridHighlight();hitungTotal();
  saveOrderDraft();
}
function updateGridHighlight(){
  document.querySelectorAll('.item-card').forEach(card=>{
    const id=card.dataset.id;
    card.classList.toggle('in-cart',!!cart.find(c=>c.id===id));
  });
}

function renderCart(){
  const empty=`<div class="cart-empty"><div class="cart-empty-icon"><i class="fas fa-tent"></i></div><p>Keranjang kosong</p><small>Klik item untuk menambah</small></div>`;
  const itemsHTML=cart.length===0?empty:cart.map(item=>`
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price-row"><span class="ci-unit">${fmt(item.price)}/hari</span><span style="color:var(--ink-4)">-</span><span class="ci-sub">${fmt(item.price*item.qty)}/hari</span></div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="changeQty('${item.id}',-1)"><i class="fas fa-minus" style="font-size:7px"></i></button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}',1)"><i class="fas fa-plus" style="font-size:7px"></i></button>
      </div>
      <button class="ci-del" onclick="removeItem('${item.id}')"><i class="fas fa-trash-can"></i></button>
    </div>`).join('');

  document.getElementById('cartListD').innerHTML=itemsHTML;
  document.getElementById('cartListM').innerHTML=cart.length===0?
    `<div class="cart-empty"><div class="cart-empty-icon"><i class="fas fa-tent"></i></div><p>Belum ada item</p></div>`:
    cart.map(item=>`
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price-row"><span class="ci-unit">${fmt(item.price)}/hari</span><span style="color:var(--ink-4)">-</span><span class="ci-sub">${fmt(item.price*item.qty)}/hari</span></div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="changeQty('${item.id}',-1)"><i class="fas fa-minus" style="font-size:7px"></i></button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}',1)"><i class="fas fa-plus" style="font-size:7px"></i></button>
      </div>
      <button class="ci-del" onclick="removeItem('${item.id}')"><i class="fas fa-trash-can"></i></button>
    </div>`).join('');
  positionDesktopFooter();
}

function bumpBadge(){
  const b=document.getElementById('cartBadgeD');
  b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump');
  setTimeout(()=>b.classList.remove('bump'),300);
}

function hitungTotal(){
  let dur=parseInt(document.getElementById('durasiSewa').value)||1;
  if(dur<1)dur=1;
  let subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  let total=subtotal*dur;
  const cnt=cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cartBadgeD').innerText=cnt;
  document.getElementById('cartBadgeMob').innerText=cnt;
  document.getElementById('subtotalD').innerText=fmt(subtotal);
  document.getElementById('totalPerHariD').innerText=fmt(total);
  document.getElementById('grandTotalD').innerText=fmt(total);
  document.getElementById('grandTotalMob').innerText=fmt(total);
  document.getElementById('grandTotalMSheet').innerText=fmt(total);
  document.getElementById('subtotalM').innerText=fmt(subtotal);
  document.getElementById('totalPerHariM').innerText=fmt(total);
  document.getElementById('durInfoD').innerText=dur;
  document.getElementById('durInfoM').innerText=dur;
  positionDesktopFooter();
}

function hitungKembali(){
  const tgl=document.getElementById('tglPesan').value;
  let dur=parseInt(document.getElementById('durasiSewa').value)||1;
  if(dur<1)dur=1;
  if(tgl){
    const d=new Date(tgl+'T00:00:00');
    d.setDate(d.getDate()+dur);
    const str=d.toLocaleDateString('id-ID',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    document.getElementById('tglKembaliD').innerText=str;
    document.getElementById('tglKembaliM').innerText=str;
    document.getElementById('tglPesanM').value=tgl;
    document.getElementById('durasiM').value=dur;
  }
}
function syncFromMobile(){
  const tgl=document.getElementById('tglPesanM').value;
  const durRaw=document.getElementById('durasiM').value;
  document.getElementById('tglPesan').value=tgl;
  if(String(durRaw).trim()===''){
    saveOrderDraft();
    return;
  }
  const dur=Math.max(1,parseInt(durRaw,10)||1);
  document.getElementById('durasiM').value=String(dur);
  document.getElementById('durasiSewa').value=String(dur);
  hitungTotal();hitungKembali();
  saveOrderDraft();
}
function normalizeMobileDuration(){
  const inp=document.getElementById('durasiM');
  if(!inp)return;
  const raw=String(inp.value||'').trim();
  if(!raw){
    inp.value='1';
  }
  const dur=Math.max(1,parseInt(inp.value,10)||1);
  inp.value=String(dur);
  document.getElementById('durasiSewa').value=String(dur);
  hitungTotal();
  hitungKembali();
  saveOrderDraft();
}
function changeMobileDuration(delta){
  const inp=document.getElementById('durasiM');
  if(!inp)return;
  const current=Math.max(1,parseInt(inp.value,10)||1);
  const next=Math.max(1,current+delta);
  inp.value=String(next);
  syncFromMobile();
}
function setDur(n){
  document.getElementById('durasiSewa').value=n;
  document.getElementById('durasiM').value=n;
  hitungTotal();hitungKembali();
  saveOrderDraft();
}

function openCartSheet(){
  document.getElementById('cartSheet').classList.add('open');
  document.getElementById('sheetOv').classList.add('open');
  document.body.style.overflow='hidden';
  syncDesktopToMobileForm(false);
  saveOrderDraft();
}
function handleMobileOrderCTA(){
  const namaReady=!!getNamaPemesan();
  const tglReady=!!document.getElementById('tglPesan').value;
  const cartReady=cart.length>0;
  if(namaReady && tglReady && cartReady){
    tampilRingkasan();
    return;
  }
  openCartSheet();
}
function closeCartSheet(){
  const wasOpen=isCartSheetOpen();
  document.getElementById('cartSheet').classList.remove('open');
  document.getElementById('sheetOv').classList.remove('open');
  document.body.style.overflow='';
  if(wasOpen){
    syncMobileToDesktopForm();
  }
  saveOrderDraft();
}
function positionDesktopFooter(){
  const footer=document.getElementById('panelFooterD');
  if(!footer)return;
  footer.classList.remove('panel-footer-floating');
  footer.style.left='';
  footer.style.width='';
}

async function tampilRingkasan(){
  if(isSubmittingOrder)return;
  const nama=getNamaPemesan();
  const wa=getWaPemesan();
  const jaminan=getJaminanPemesan();
  const catatan=getCatatanPemesan();
  if(!nama){toast('Nama pemesan wajib diisi');return}
  if(cart.length===0){toast('Pilih minimal 1 item terlebih dahulu');return}
  isSubmittingOrder=true;
  setSubmitLoading(true);
  try{
    closeCartSheet();

    const tgl=document.getElementById('tglPesan').value;
    const dur=parseInt(document.getElementById('durasiSewa').value)||1;
    const kembali=document.getElementById('tglKembaliD').innerText;

    document.getElementById('rcptDate').innerText=new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
    document.getElementById('rcptNama').innerText=nama;
    document.getElementById('rcptWA').innerText=wa||'-';
    document.getElementById('rcptJaminan').innerText=jaminan||'-';
    const rcptNote=document.getElementById('rcptCatatan');
    if(rcptNote)rcptNote.innerText=catatan||'-';
    document.getElementById('rcptAmbil').innerText=fmtDateShort(tgl);
    document.getElementById('rcptKembali').innerText=kembali;
    document.getElementById('rcptDurasi').innerText=dur;
    document.getElementById('rcptDurRow').innerText=dur;

    const tbody=document.getElementById('rcptTbody');
    tbody.innerHTML='';
    let subtotal=0;
    cart.forEach(item=>{
      const sub=item.price*item.qty*dur;
      subtotal+=sub;
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${item.name}</td><td>${fmt(item.price)}</td><td>${item.qty}</td><td>${fmt(sub)}</td>`;
      tbody.appendChild(tr);
    });
    const perHari=cart.reduce((s,i)=>s+i.price*i.qty,0);
    document.getElementById('rcptSubtotal').innerText=fmt(perHari);
    document.getElementById('rcptHariTotal').innerText=fmt(subtotal);
    document.getElementById('rcptGrandTotal').innerText=fmt(subtotal);
    document.getElementById('modalRingkasan').classList.add('show');
    document.body.style.overflow='hidden';

    const payload=buildCurrentOrderPayload();
    lastInvoicePayload=payload;
    updateInvoiceDbButton();
    saveOrderDraft();
  }finally{
    isSubmittingOrder=false;
    setSubmitLoading(false);
  }
}

function tutupModal(){
  document.getElementById('modalRingkasan').classList.remove('show');
  document.body.style.overflow='';
}
document.getElementById('modalRingkasan').addEventListener('click',function(e){if(e.target===this)tutupModal()});

function kirimWA(){
  const nama=getNamaPemesan();
  const wa=getWaPemesan();
  const jaminan=getJaminanPemesan();
  const catatan=getCatatanPemesan();
  const tgl=document.getElementById('tglPesan').value;
  const dur=parseInt(document.getElementById('durasiSewa').value)||1;
  const kembali=document.getElementById('tglKembaliD').innerText;

  let t=`*PESAN ALAT - PENAK KEMPING BWI*\n==============================\n`;
  t+=`*Nama:* ${nama||'-'}\n`;
  t+=`*WhatsApp:* ${wa||'-'}\n`;
  t+=`*Jaminan:* ${jaminan||'-'}\n`;
  if(catatan){t+=`*Catatan:* ${catatan}\n`;}
  t+=`*Tgl Ambil:* ${fmtDateShort(tgl)}\n`;
  t+=`*Tgl Kembali:* ${kembali}\n`;
  t+=`*Durasi:* ${dur} Hari\n\n`;
  t+=`*Daftar Pesanan:*\n`;
  cart.forEach(item=>{t+=`- ${item.name} x${item.qty} - ${fmt(item.price*item.qty)}/hari\n`});
  const perHari=cart.reduce((s,i)=>s+i.price*i.qty,0);
  t+=`\n*Total Semua:* ${fmt(perHari*dur)}\n`;
  t+=`(${fmt(perHari)}/hari x ${dur} hari)\n\n`;
  t+=`Mohon konfirmasinya, terima kasih.`;
  window.open(`https://wa.me/${WA_NUMBER_INTERNATIONAL}?text=${encodeURIComponent(t)}`,'_blank');
}

document.addEventListener('keydown',e=>{if(e.key==='Escape'){tutupModal();closeCartSheet();closeAdminLoginModal()}});
window.addEventListener('resize',()=>{
  if(activeTab==='catalog' && !catalogShowAll){
    applyFilter((document.getElementById('searchInput').value||'').toLowerCase());
  }
});
