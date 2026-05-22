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
  {id:'s1',name:'Tenda 2 Layer (4-5P)',price:40000,cat:'Tenda'},
  {id:'s2',name:'Tenda 2 Layer (3-4P)',price:35000,cat:'Tenda'},
  {id:'s39',name:'Flysheet 2x3',price:10000,cat:'Tenda'},
  {id:'s40',name:'Tiang Flysheet',price:10000,cat:'Tenda'},
  {id:'s41',name:'Tali Flysheet',price:5000,cat:'Tenda'},
  {id:'s3',name:'Carrier Toba 60L',price:20000,cat:'Tas'},
  {id:'s23',name:'Tas Hydropack',price:15000,cat:'Tas'},
  {id:'s48',name:'Daypack',price:10000,cat:'Tas'},
  {id:'s4',name:'Sepatu Gunung',price:15000,cat:'Pakaian'},
  {id:'s5',name:'Jaket Gunung',price:15000,cat:'Pakaian'},
  {id:'s53',name:'Baselayer Pria',price:15000,cat:'Pakaian'},
  {id:'s52',name:'Baselayer Wanita',price:10000,cat:'Pakaian'},
  {id:'s54',name:'Celana Gunung',price:15000,cat:'Pakaian'},
  {id:'s59',name:'Jas Hujan',price:12000,cat:'Pakaian'},
  {id:'s51',name:'Kupluk',price:5000,cat:'Pakaian'},
  {id:'s24',name:'Topi Rimba',price:5000,cat:'Pakaian'},
  {id:'s38',name:'Sarung Tangan',price:5000,cat:'Pakaian'},
  {id:'s58',name:'Bandana',price:15000,cat:'Pakaian'},
  {id:'s55',name:'Kaca Mata',price:5000,cat:'Pakaian'},
  {id:'s9',name:'Kompor Koper',price:15000,cat:'Masak'},
  {id:'s10',name:'Kompor Bulat',price:10000,cat:'Masak'},
  {id:'s11',name:'Kompor Kotak',price:10000,cat:'Masak'},
  {id:'s13',name:'Nesting / Panci',price:5000,cat:'Masak'},
  {id:'s14',name:'Sewa Gas Portable',price:7000,cat:'Masak'},
  {id:'s34',name:'Gas Portable',price:7000,cat:'Masak'},
  {id:'s35',name:'Torch Gas',price:5000,cat:'Masak'},
  {id:'s6',name:'Meja Box Glamping',price:15000,cat:'Furnitur'},
  {id:'s7',name:'Kursi Lipat XL',price:10000,cat:'Furnitur'},
  {id:'s8',name:'Meja Lipat Kain',price:10000,cat:'Furnitur'},
  {id:'s12',name:'Meja Lipat Aluminium',price:15000,cat:'Furnitur'},
  {id:'s17',name:'Sleeping Bag',price:10000,cat:'Tidur'},
  {id:'s21',name:'Matras Tidur',price:5000,cat:'Tidur'},
  {id:'s49',name:'Tikar Waterproof',price:15000,cat:'Tidur'},
  {id:'s50',name:'Alas Kain',price:10000,cat:'Tidur'},
  {id:'s25',name:'Tripod HP / Kamera',price:10000,cat:'Foto'},
  {id:'s26',name:'Tripod Mini Bluetooth',price:5000,cat:'Foto'},
  {id:'s27',name:'Lensa Apexel',price:15000,cat:'Foto'},
  {id:'s44',name:'Kamera Analog',price:5000,cat:'Foto'},
  {id:'s28',name:'Grill Pan Bulat',price:10000,cat:'BBQ'},
  {id:'s31',name:'Grill Pan Kotak',price:10000,cat:'BBQ'},
  {id:'s36',name:'Capitan Grill',price:3000,cat:'BBQ'},
  {id:'s33',name:'Kuas Grill',price:2000,cat:'BBQ'},
  {id:'s18',name:'Headlamp Pendakian',price:5000,cat:'Perlengkapan'},
  {id:'s19',name:'Lampu Tenda Cas',price:8000,cat:'Perlengkapan'},
  {id:'s20',name:'Lampu Tenda',price:5000,cat:'Perlengkapan'},
  {id:'s22',name:'Tracking Pole',price:10000,cat:'Perlengkapan'},
  {id:'s47',name:'Power Bank',price:10000,cat:'Perlengkapan'},
  {id:'s46',name:'Water Tank 5L',price:5000,cat:'Perlengkapan'},
  {id:'s45',name:'Payung',price:5000,cat:'Perlengkapan'},
  {id:'s56',name:'Handwarmer',price:15000,cat:'Perlengkapan'},
  {id:'s57',name:'Emergency Blanket',price:10000,cat:'Perlengkapan'},
  {id:'s37',name:'Masker Gas',price:10000,cat:'Perlengkapan'},
  {id:'s16',name:'Cangkir Mini',price:2000,cat:'Peralatan'},
  {id:'s29',name:'Piring Satuan',price:2000,cat:'Peralatan'},
  {id:'s30',name:'Mangkok Sambal',price:2000,cat:'Peralatan'},
  {id:'s32',name:'Sumpit Sepasang',price:2000,cat:'Peralatan'},
  {id:'s42',name:'Sendok Pisau 3in1',price:3000,cat:'Peralatan'},
  {id:'s43',name:'Sendok Garpu 2in1',price:3000,cat:'Peralatan'},
];

const ITEMS_PAKET = [
  {id:'p1',name:'Kemping Ceria 1',price:80000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor+Gas+Nesting, Matras(2), SB(2), Headlamp(2), Kursi(2)+Meja Kain'},
  {id:'p2',name:'Kemping Ceria 2',price:100000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor+Gas+Nesting, Matras(2), SB(2), Headlamp(2)'},
  {id:'p3',name:'Kemping Ceria 3',price:120000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor+Gas+Nesting, Carrier, Matras(2), SB(2), Headlamp(2), Lampu, Kursi+Meja'},
  {id:'p4',name:'Kemping Rame 2',price:220000,cat:'Paket Kemping',desc:'Tenda(2), Kompor+Gas+Nesting, Carrier(2), Matras(4), SB(4), Headlamp(4), Lampu(2), Kursi(4)+Meja(2)'},
  {id:'p5',name:'Kemping Ranti',price:115000,cat:'Paket Kemping',desc:'Tenda 3-4P, Kompor+Gas+Nesting, Carrier, Matras(2), SB(2), Headlamp(2), Lampu, Pole(2)'},
  {id:'p23',name:'Ranti 2 Orang',price:115000,cat:'Paket Kemping',desc:''},
  {id:'p24',name:'Ranti 4 Orang',price:200000,cat:'Paket Kemping',desc:''},
  {id:'p21',name:'Paket Jumbo',price:30000,cat:'Paket Kemping',desc:''},
  {id:'p6',name:'Paket TekTok',price:30000,cat:'Paket Masak',desc:'Kompor Bulat/Kotak, Gas Portable, Nesting, Cangkir Mini'},
  {id:'p22',name:'TekTok Komplit',price:35000,cat:'Paket Masak',desc:''},
  {id:'p25',name:'Memasak Komplit',price:25000,cat:'Paket Masak',desc:''},
  {id:'p7',name:'Paket Memasak',price:20000,cat:'Paket Masak',desc:'Kursi Lipat Glamping(2), Box Meja'},
  {id:'p15',name:'Grill Ceria',price:25000,cat:'Paket BBQ',desc:'Grill Pan + Kompor Koper + Gas'},
  {id:'p16',name:'Grill Komplit',price:35000,cat:'Paket BBQ',desc:'Grill Pan+Kompor+Gas+Sumpit(2)+Mangkok+Piring(2)+Kuas+Capitan'},
  {id:'p11',name:'Paket Dolanan',price:40000,cat:'Paket Santai',desc:'2 Kursi XL + Meja Kain + Kompor Bulat + Gas + Nesting'},
  {id:'p12',name:'Paket Memengan',price:45000,cat:'Paket Santai',desc:'2 Kursi XL + Meja Aluminium + Kompor Bulat + Gas + Nesting'},
  {id:'p13',name:'Paket Ceria',price:45000,cat:'Paket Santai',desc:'2 Kursi XL + Meja Aluminium + Kompor Koper + Gas + Nesting'},
  {id:'p14',name:'Paket Bahagia',price:50000,cat:'Paket Santai',desc:''},
  {id:'p26',name:'Kursi Hemat A',price:15000,cat:'Paket Furnitur',desc:''},
  {id:'p27',name:'Kursi Hemat B',price:30000,cat:'Paket Furnitur',desc:''},
  {id:'p28',name:'Kursi Hemat C',price:40000,cat:'Paket Furnitur',desc:''},
  {id:'p29',name:'Kursi Hemat D',price:50000,cat:'Paket Furnitur',desc:''},
  {id:'p30',name:'Meja Hemat A',price:25000,cat:'Paket Furnitur',desc:''},
  {id:'p31',name:'Meja Hemat B',price:30000,cat:'Paket Furnitur',desc:''},
  {id:'p32',name:'Meja Hemat C',price:40000,cat:'Paket Furnitur',desc:''},
  {id:'p33',name:'Meja Hemat D',price:40000,cat:'Paket Furnitur',desc:''},
  {id:'p8',name:'Paket Bersantai',price:40000,cat:'Paket Foto',desc:'Lensa Apexel + Tripod Kamera (6 jam)'},
  {id:'p9',name:'Paket Apexel A',price:20000,cat:'Paket Foto',desc:'Lensa Apexel + Tripod Kamera (24 jam)'},
  {id:'p10',name:'Paket Apexel B',price:25000,cat:'Paket Foto',desc:''},
  {id:'p17',name:'Paket Ijen',price:25000,cat:'Paket Ijen',desc:''},
  {id:'p18',name:'Paket Ijen A',price:35000,cat:'Paket Ijen',desc:''},
  {id:'p19',name:'Paket Ijen Komplit',price:50000,cat:'Paket Ijen',desc:''},
  {id:'p20',name:'Paket Ijen B',price:40000,cat:'Paket Ijen',desc:''},
];

const ITEMS_PIKNIK = [
  {id:'k1',name:'Paket Konco',price:50000,cat:'Piknik Foto',desc:'Keranjang Besar, Kain Kotak/Polos, Alas Waterproof, Cermin Oval, Bunga Edelweis, Topi Pantai, Kamera Analog'},
  {id:'k2',name:'Paket Kencan',price:30000,cat:'Piknik Romantic',desc:'Keranjang Snack, Kamera Analog, 2 Tatakan Gelas, 1 Set Alat Makan'},
  {id:'k3',name:'Paket Pasang',price:35000,cat:'Piknik Romantic',desc:'Buku Bacaan Asli, Koran Vintage, 2 Tatakan Gelas, 2 Gelas Kayu, 2 Set Alat Makan'},
  {id:'k4',name:'Penak Ngeteh',price:25000,cat:'Piknik Santai',desc:'1 Tea Set Miniso, Kompor Portable Bulat, Gas Portable, Nesting'},
  {id:'k5',name:'Paket Bersenja Ria',price:55000,cat:'Piknik Santai',desc:'2 Kursi XL, Meja Aluminium, Keranjang Kotak, Alas Renda, Bunga, Kamera Analog'},
  {id:'k6',name:'Paket Glampicnic',price:60000,cat:'Piknik Foto',desc:'Buku, Koran Vintage, Tatakan(2), Gelas Kayu(2), Alat Makan(2), Kursi Glamping(2)'},
];

// --- CONSOLIDATED CATALOG FOR DAFTAR HARGA ---
const KATALOG_SECTIONS = [
  {
    title: 'Sewa Satuan - Tenda & Alas',
    items: [
      {name:'Tenda 2 Layer 4-5 Orang',price:40000},
      {name:'Tenda 2 Layer 3-4 Orang',price:35000},
      {name:'Flysheet 2x3',price:10000},
      {name:'Tiang Flysheet',price:10000},
      {name:'Tali Flysheet',price:5000},
      {name:'Matras Tidur',price:5000},
      {name:'Sleeping Bag',price:10000},
      {name:'Tikar Waterproof',price:15000},
      {name:'Alas Kain',price:10000},
    ]
  },
  {
    title: 'Sewa Satuan - Pakaian & Tas',
    items: [
      {name:'Carrier Toba 60L',price:20000},
      {name:'Daypack',price:10000},
      {name:'Tas Hydropack',price:15000},
      {name:'Sepatu Gunung',price:15000},
      {name:'Jaket Gunung',price:15000},
      {name:'Celana Gunung',price:15000},
      {name:'Baselayer Pria',price:15000},
      {name:'Baselayer Wanita',price:10000},
      {name:'Jas Hujan',price:12000},
      {name:'Kupluk',price:5000},{name:'Topi Rimba',price:5000},{name:'Sarung Tangan',price:5000},{name:'Bandana',price:15000},{name:'Kaca Mata',price:5000},
    ]
  },
  {
    title: 'Sewa Satuan - Masak, Furnitur & Perlengkapan',
    items: [
      {name:'Kompor Koper',price:15000},{name:'Kompor Bulat/Kotak',price:10000},{name:'Nesting / Panci',price:5000},{name:'Gas Portable (sewa)',price:7000},{name:'Torch Gas',price:5000},{name:'Grill Pan Bulat/Kotak',price:10000},
      {name:'Meja Box Glamping',price:15000},{name:'Kursi Lipat XL',price:10000},{name:'Meja Lipat Kain',price:10000},{name:'Meja Lipat Aluminium',price:15000},
      {name:'Headlamp Pendakian',price:5000},{name:'Lampu Tenda Cas',price:8000},{name:'Lampu Tenda',price:5000},{name:'Power Bank',price:10000},{name:'Tracking Pole',price:10000},{name:'Water Tank 5L',price:5000},{name:'Payung',price:5000},{name:'Handwarmer',price:15000},{name:'Emergency Blanket',price:10000},
      {name:'Tripod HP/Kamera',price:10000},{name:'Tripod Mini Bluetooth',price:5000},{name:'Lensa Apexel',price:15000},{name:'Kamera Analog',price:5000},
    ]
  },
  {
    title: 'Paket Kemping',
    items: [
      {name:'Kemping Ceria 1',price:80000,desc:'Tenda 4-5P+Kompor+Gas+Nesting+Matras(2)+SB(2)+Headlamp(2)+Kursi+Meja'},
      {name:'Kemping Ceria 2',price:100000,desc:'Tenda 4-5P+Kompor+Gas+Nesting+Matras(2)+SB(2)+Headlamp(2)'},
      {name:'Kemping Ceria 3',price:120000,desc:'Ceria 2 + Carrier+Lampu+Kursi(2)+Meja'},
      {name:'Kemping Rame 2',price:220000,desc:'2 Tenda+Kompor+Gas+Nesting+Carrier(2)+Matras(4)+SB(4)+Headlamp(4)+Lampu(2)+Kursi(4)+Meja(2)'},
      {name:'Kemping Ranti (2 org)',price:115000,desc:'Tenda 3-4P+Kompor+Gas+Nesting+Carrier+Matras(2)+SB(2)+Headlamp(2)+Lampu+Pole(2)'},
      {name:'Kemping Ranti (4 org)',price:200000,desc:''},
      {name:'Paket Jumbo',price:30000,desc:''},
    ]
  },
  {
    title: 'Paket Masak, Santai & BBQ',
    items: [
      {name:'Paket TekTok',price:30000,desc:'Kompor+Gas+Nesting+Cangkir Mini'},
      {name:'Paket TekTok Komplit',price:35000,desc:''},
      {name:'Paket Memasak',price:20000,desc:'Kursi Glamping(2)+Box Meja'},
      {name:'Paket Memasak Komplit',price:25000,desc:''},
      {name:'Paket Dolanan',price:40000,desc:'2 Kursi+Meja Kain+Kompor Bulat+Gas+Nesting'},
      {name:'Paket Memengan',price:45000,desc:'2 Kursi+Meja Alu+Kompor Bulat+Gas+Nesting'},
      {name:'Paket Ceria',price:45000,desc:'2 Kursi+Meja Alu+Kompor Koper+Gas+Nesting'},
      {name:'Paket Bahagia',price:50000,desc:''},
      {name:'Grill Ceria',price:25000,desc:'Grill Pan+Kompor Koper+Gas'},
      {name:'Grill Komplit',price:35000,desc:'Grill Pan+Kompor+Gas+Sumpit+Mangkok+Piring+Kuas+Capitan'},
    ]
  },
  {
    title: 'Paket Foto & Ijen',
    items: [
      {name:'Paket Apexel A',price:20000,desc:'Lensa Apexel+Tripod (24 jam)'},
      {name:'Paket Apexel B',price:25000,desc:''},
      {name:'Paket Bersantai',price:40000,desc:'Lensa Apexel+Tripod (6 jam)'},
      {name:'Paket Ijen',price:25000,desc:''},
      {name:'Paket Ijen A',price:35000,desc:''},
      {name:'Paket Ijen B',price:40000,desc:''},
      {name:'Paket Ijen Komplit',price:50000,desc:''},
    ]
  },
  {
    title: 'Paket Piknik',
    items: [
      {name:'Paket Kencan',price:30000,desc:'Keranjang Snack+Kamera Analog+Tatakan(2)+Alat Makan'},
      {name:'Paket Pasang',price:35000,desc:'Buku+Koran Vintage+Tatakan(2)+Gelas Kayu(2)+Alat Makan(2)'},
      {name:'Penak Ngeteh',price:25000,desc:'Tea Set+Kompor Bulat+Gas+Nesting'},
      {name:'Paket Konco',price:50000,desc:'Keranjang+Kain+Alas Waterproof+Cermin+Bunga+Topi+Kamera Analog'},
      {name:'Paket Bersenja Ria',price:55000,desc:'2 Kursi+Meja Alu+Keranjang+Bunga+Kamera Analog'},
      {name:'Paket Glampicnic',price:60000,desc:'Buku+Koran+Gelas Kayu+Alat Makan+2 Kursi Glamping'},
    ]
  },
];

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
const ORDER_DRAFT_KEY = 'penak_order_draft_v1';

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
function buildOrderDraftState(){
  return {
    activeTab,
    activecat,
    currentOrderNum,
    cart,
    form:{
      nama:getInputValue('namaPemesan'),
      wa:getInputValue('waPemesan'),
      jaminan:getInputValue('jaminanPemesan'),
      catatan:getInputValue('catatanPemesan'),
      tgl:getInputValue('tglPesan'),
      durasi:getInputValue('durasiSewa')
    }
  };
}
function saveOrderDraft(){
  try{
    sessionStorage.setItem(ORDER_DRAFT_KEY,JSON.stringify(buildOrderDraftState()));
  }catch(_err){}
}
function restoreOrderDraft(){
  let raw='';
  try{
    raw=sessionStorage.getItem(ORDER_DRAFT_KEY)||'';
  }catch(_err){}
  if(!raw)return;
  try{
    const data=JSON.parse(raw);
    if(data && typeof data==='object'){
      if(data.activeTab && ['catalog','package','picnic'].includes(data.activeTab)){
        activeTab=data.activeTab;
        const tabBtns=document.querySelectorAll('.tab-nav .tab-btn');
        tabBtns.forEach(btn=>btn.classList.remove('active'));
        const activeBtn=document.querySelector(`.tab-nav .tab-btn[data-tab="${activeTab}"]`);
        if(activeBtn)activeBtn.classList.add('active');
      }
      if(data.activecat){
        activecat=String(data.activecat);
      }
      if(Array.isArray(data.cart)){
        const all=[...ITEMS_SATUAN,...ITEMS_PAKET,...ITEMS_PIKNIK];
        cart=data.cart
          .map(item=>{
            const master=all.find(m=>m.id===item.id);
            if(!master)return null;
            const qty=Math.max(1,parseInt(item.qty)||1);
            return {...master,qty};
          })
          .filter(Boolean);
      }
      if(data.currentOrderNum){
        currentOrderNum=String(data.currentOrderNum);
        document.getElementById('orderNumD').innerText=currentOrderNum;
        document.getElementById('orderNumM').innerText=currentOrderNum;
      }
      if(data.form && typeof data.form==='object'){
        setInputValue('namaPemesan',data.form.nama||'');
        setInputValue('waPemesan',data.form.wa||'');
        setInputValue('jaminanPemesan',data.form.jaminan||'');
        setInputValue('catatanPemesan',data.form.catatan||'');
        if(data.form.tgl)setInputValue('tglPesan',data.form.tgl);
        if(data.form.durasi)setInputValue('durasiSewa',data.form.durasi);
      }
    }
  }catch(_err){}
}
function bindOrderDraftAutosave(){
  const ids=['namaPemesan','waPemesan','jaminanPemesan','catatanPemesan','tglPesan','durasiSewa','namaPesananM','waPesananM','jaminanPesananM','catatanPesananM','tglPesanM','durasiM'];
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    ['input','change'].forEach(evt=>el.addEventListener(evt,()=>saveOrderDraft()));
  });
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
  document.getElementById('tglPesan').value = today;
  document.getElementById('tglPesanM').value = today;
  registerServiceWorker();
  const hdrWa=document.querySelector('.hdr-wa');
  if(hdrWa)hdrWa.href=`https://wa.me/${WA_NUMBER_INTERNATIONAL}`;
  generateOrderNum();
  hitungKembali();
  renderTab();
  restoreOrderDraft();
  syncDesktopToMobileForm(true);
  renderTab();
  renderCart();
  hitungTotal();
  hitungKembali();
  bindOrderDraftAutosave();
  updateAdminAuthButton();
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
  if(activeTab==='catalog') allItems = ITEMS_SATUAN;
  else if(activeTab==='package') allItems = ITEMS_PAKET;
  else allItems = ITEMS_PIKNIK;
  buildCatFilter();
  renderGrid(allItems);
  positionDesktopFooter();
}

function buildCatFilter(){
  const cats = ['Semua',...new Set(allItems.map(i=>i.cat))];
  const cf = document.getElementById('catFilter');
  cf.innerHTML = cats.map(c=>`<div class="cf-btn${c===activecat?' active':''}" onclick="selectCat('${c}',this)">${c}</div>`).join('');
}

function selectCat(cat, el){
  activecat = cat;
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

function renderGrid(items){
  const g = document.getElementById('itemGrid');
  if(items.length===0){g.innerHTML=`<div class="no-results"><i class="fas fa-magnifying-glass"></i>Tidak ditemukan</div>`;return}
  const isPkg=(activeTab==='package'||activeTab==='picnic');
  g.innerHTML=items.map((item,idx)=>{
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
