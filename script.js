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
  {id:'i001',name:'Tenda 2 Layer 4-5P Tendaki Borneo Black',price:40000,cat:'Tenda',desc:'Kapasitas 4-5 orang'},
  {id:'i002',name:'Tenda 2 Layer 4-5P Tendaki Borneo Brown',price:40000,cat:'Tenda',desc:'Kapasitas 4-5 orang'},
  {id:'i003',name:'Tenda 2 Layer 4-5P Tendaki Borneo White Pro',price:40000,cat:'Tenda',desc:'Kapasitas 4-5 orang'},
  {id:'i004',name:'Tenda 2 Layer 4-5P Tendaki Borneo Black Pro',price:40000,cat:'Tenda',desc:'Kapasitas 4-5 orang'},
  {id:'i005',name:'Tenda 2 Layer 3-4P Wildshell Rote',price:35000,cat:'Tenda',desc:'Kapasitas 3-4 orang'},
  {id:'i006',name:'Tenda 2 Layer 2P Quechua MH100',price:30000,cat:'Tenda',desc:'Kapasitas 2 orang'},

  {id:'i007',name:'Carrier Toba 60L',price:25000,cat:'Carrier / Tas',desc:'Keril Arei Toba 60L'},
  {id:'i008',name:'Carrier Sigma AG 60L',price:25000,cat:'Carrier / Tas',desc:'Keril Monte Sigma AG Pro 60L'},
  {id:'i009',name:'Carrier Python 60L',price:25000,cat:'Carrier / Tas',desc:'Keril Reptil Python 60L'},
  {id:'i010',name:'Carrier Horus 40L',price:20000,cat:'Carrier / Tas',desc:'Keril Zarventure Horus 40L'},
  {id:'i011',name:'Carrier Bunglon 45L',price:20000,cat:'Carrier / Tas',desc:'Keril Reptil Bunglon 45L'},
  {id:'i012',name:'Carrier Alpine 48L',price:20000,cat:'Carrier / Tas',desc:'Keril Monte Alpine Trail Red 48L'},
  {id:'i013',name:'Semi Carrier Taipan 25L',price:20000,cat:'Carrier / Tas',desc:'Semi keril kapasitas 25L'},

  {id:'i014',name:'Hydropack Speed Trail 12L',price:15000,cat:'Hydropack / Daypack',desc:'Kapasitas 12L'},
  {id:'i015',name:'Hydropack Vertical Trail 12L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 12L'},
  {id:'i016',name:'Hydropack Zoya 10L',price:15000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i017',name:'Hydropack Penak Black 10L',price:15000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i018',name:'Hydropack Noma White 10L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i019',name:'Hydropack Arvensis Grey 10L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i020',name:'Hydropack Wildshell Evo White 10L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i021',name:'Hydropack Wildshell Evo Pink 10L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i022',name:'Hydropack Quebec Consina 10L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i023',name:'Hydropack Alpha Black 10L',price:15000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i024',name:'Hydropack Alpha White 10L',price:20000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i025',name:'Hydropack Kilimanjaro Grey 10L',price:15000,cat:'Hydropack / Daypack',desc:'Kapasitas 10L'},
  {id:'i026',name:'Daypack Quechua 10L',price:10000,cat:'Hydropack / Daypack',desc:'Kapasitas 7L-10L'},
  {id:'i027',name:'Daypack Mochila',price:15000,cat:'Hydropack / Daypack',desc:''},
  {id:'i028',name:'Daypack Antarestar',price:15000,cat:'Hydropack / Daypack',desc:''},
  {id:'i029',name:'Daypack Aka Adventure Grey 18L',price:15000,cat:'Hydropack / Daypack',desc:'Grey 18L'},
  {id:'i030',name:'Daypack Sapala no Mi Pink 15L',price:15000,cat:'Hydropack / Daypack',desc:'Pink 15L'},

  {id:'i031',name:'Gorpcore Credifox',price:15000,cat:'Jaket / Gorpcore',desc:'Ukuran S sampai XXL'},
  {id:'i032',name:'Credifox Reflective',price:15000,cat:'Jaket / Gorpcore',desc:'Reflective hitam'},
  {id:'i033',name:'Gorpcore Kilimanjaro',price:20000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i034',name:'Gorpcore Jirion',price:15000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i035',name:'Gorpcore Carumby',price:20000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i036',name:'Gorpcore Bogaboo',price:20000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i037',name:'Gorpcore Had',price:20000,cat:'Jaket / Gorpcore',desc:'Rentang harga 15.000 - 20.000/hari'},
  {id:'i038',name:'Gorpcore Wallhike',price:15000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i039',name:'Gorpcore Fearless',price:15000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i040',name:'Gorpcore Polos',price:10000,cat:'Jaket / Gorpcore',desc:''},
  {id:'i041',name:'Puffer Penak',price:20000,cat:'Jaket / Gorpcore',desc:'Rentang harga 15.000 - 20.000/hari'},
  {id:'i042',name:'Puffer Quiksilver',price:15000,cat:'Jaket / Gorpcore',desc:''},

  {id:'i043',name:'Baselayer Wanita',price:10000,cat:'Baselayer',desc:''},
  {id:'i044',name:'Baselayer Pria Maniac',price:15000,cat:'Baselayer',desc:''},
  {id:'i045',name:'Baselayer Pria Monte',price:15000,cat:'Baselayer',desc:''},
  {id:'i046',name:'Baselayer Pria Credifox',price:15000,cat:'Baselayer',desc:''},
  {id:'i047',name:'Baselayer Pria Sapala',price:15000,cat:'Baselayer',desc:''},

  {id:'i048',name:'Celana Cargo Parasut',price:15000,cat:'Celana',desc:''},
  {id:'i049',name:'Cargo Hextstudio',price:15000,cat:'Celana',desc:''},
  {id:'i050',name:'Cargo Turtle Sage',price:15000,cat:'Celana',desc:''},
  {id:'i051',name:'Cargo Freedo Camo',price:15000,cat:'Celana',desc:''},
  {id:'i052',name:'Cargo Baggy Seeking Leopard',price:15000,cat:'Celana',desc:''},
  {id:'i053',name:'UPS Reflective Camo',price:15000,cat:'Celana',desc:''},
  {id:'i054',name:'Celana Credifox',price:15000,cat:'Celana',desc:''},

  {id:'i055',name:'Kupluk Arc’',price:8000,cat:'Topi / Kupluk',desc:''},
  {id:'i056',name:'Kupluk Bintang',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i057',name:'Kupluk Penak Kemping',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i058',name:'Kupluk Spiderman',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i059',name:'Topi Kalcer',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i060',name:'Topi Forclaz',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i061',name:'Topi Rimba Credifox',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i062',name:'Topi Rimba Avtech',price:5000,cat:'Topi / Kupluk',desc:''},
  {id:'i063',name:'Topi Rimba Humblezing',price:15000,cat:'Topi / Kupluk',desc:''},

  {id:'i064',name:'Rubtrack Low / High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i065',name:'Hitec High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i066',name:'Lavio High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i067',name:'Black Yak High / Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i068',name:'Treksta High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i069',name:'Nepa High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i070',name:'Spotec High / Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i071',name:'Aero Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i072',name:'Aerostreet Low / High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i073',name:'Ardiles Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i074',name:'Lotto Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i075',name:'Skechers Trail',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i076',name:'Lafuma Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i077',name:'The Red Face High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i078',name:'The North Face High',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i079',name:'Leedo Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i080',name:'Caiday Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i081',name:'Keen Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i082',name:'Broadstone Low',price:15000,cat:'Sepatu Gunung',desc:''},
  {id:'i083',name:'Leisure High',price:15000,cat:'Sepatu Gunung',desc:''},

  {id:'i084',name:'Trekking Pole Lipat',price:5000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i085',name:'Trekking Pole Seekday Yellow',price:15000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i086',name:'Trekking Pole Jepit',price:10000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i087',name:'Trekking Pole Forclaz',price:10000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i088',name:'Headlamp Pendakian',price:5000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i089',name:'Kacamata Hiking',price:5000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i090',name:'Sarung Tangan Polar',price:5000,cat:'Aksesoris Pendakian',desc:''},
  {id:'i091',name:'Masker Gas Respirator',price:10000,cat:'Aksesoris Pendakian',desc:''},

  {id:'i092',name:'Sleeping Bag',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i093',name:'Matras Foam',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i094',name:'Matras Tidur Gulung',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i095',name:'Kursi Lipat',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i096',name:'Kursi Lipat Jumbo',price:15000,cat:'Perlengkapan Camping',desc:''},
  {id:'i097',name:'Kursi Lipat Glamping',price:20000,cat:'Perlengkapan Camping',desc:''},
  {id:'i098',name:'Meja Box Glamping',price:15000,cat:'Perlengkapan Camping',desc:''},
  {id:'i099',name:'Meja Lipat Aluminium',price:15000,cat:'Perlengkapan Camping',desc:''},
  {id:'i100',name:'Meja Lipat Kain',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i101',name:'Lampu Tenda Baterai',price:4000,cat:'Perlengkapan Camping',desc:''},
  {id:'i102',name:'Lampu Tenda Cas',price:8000,cat:'Perlengkapan Camping',desc:''},
  {id:'i103',name:'Flysheet 2x3',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i104',name:'Flysheet 4x5',price:15000,cat:'Perlengkapan Camping',desc:''},
  {id:'i105',name:'Tiang Flysheet',price:10000,cat:'Perlengkapan Camping',desc:''},
  {id:'i106',name:'Powerbank 10.000mAh',price:10000,cat:'Perlengkapan Camping',desc:''},

  {id:'i107',name:'Kompor Koper',price:15000,cat:'Peralatan Masak',desc:''},
  {id:'i108',name:'Kompor Bulat Windproof',price:10000,cat:'Peralatan Masak',desc:''},
  {id:'i109',name:'Gas Portable',price:7000,cat:'Peralatan Masak',desc:'per pcs'},
  {id:'i110',name:'Nesting / Panci',price:5000,cat:'Peralatan Masak',desc:''},
  {id:'i111',name:'Grill Pan Kotak',price:10000,cat:'Peralatan Masak',desc:''},
  {id:'i112',name:'Grill Pan Bulat',price:10000,cat:'Peralatan Masak',desc:''},
  {id:'i113',name:'Tea Set Picnic',price:10000,cat:'Peralatan Masak',desc:''},
  {id:'i114',name:'Teko Kemping',price:5000,cat:'Peralatan Masak',desc:''},
  {id:'i115',name:'Cangkir Mini',price:2000,cat:'Peralatan Masak',desc:''},
  {id:'i116',name:'Piring Plastik',price:2000,cat:'Peralatan Masak',desc:''},
  {id:'i117',name:'Mangkok Sambal',price:2000,cat:'Peralatan Masak',desc:''},
  {id:'i118',name:'Water Tank 5L',price:5000,cat:'Peralatan Masak',desc:''},
  {id:'i119',name:'Torch Gas',price:5000,cat:'Peralatan Masak',desc:''},
  {id:'i120',name:'Tripod HP / Kamera',price:10000,cat:'Peralatan Masak',desc:''},
  {id:'i121',name:'Tripod Mini',price:5000,cat:'Peralatan Masak',desc:''},
  {id:'i122',name:'Lensa Apexel + Tripod',price:15000,cat:'Peralatan Masak',desc:''},
  {id:'i123',name:'Sumpit Aluminium',price:2000,cat:'Peralatan Masak',desc:''},
  {id:'i124',name:'Kuas Grill',price:2000,cat:'Peralatan Masak',desc:''},
  {id:'i125',name:'Sendok Pisau 3in1',price:3000,cat:'Peralatan Masak',desc:''},
  {id:'i126',name:'Capitan Grill',price:3000,cat:'Peralatan Masak',desc:''},

  {id:'i127',name:'Keranjang Besar',price:15000,cat:'Piknik',desc:''},
  {id:'i128',name:'Keranjang Kecil',price:10000,cat:'Piknik',desc:''},
  {id:'i129',name:'Keranjang Snack',price:2000,cat:'Piknik',desc:''},
  {id:'i130',name:'Tas Eceng Gondok',price:10000,cat:'Piknik',desc:''},
  {id:'i131',name:'Alas Waterproof',price:15000,cat:'Piknik',desc:'Rentang harga 5.000 - 15.000/hari'},
  {id:'i132',name:'Alas Kanvas Polos',price:10000,cat:'Piknik',desc:''},
  {id:'i133',name:'Alas Kotak',price:10000,cat:'Piknik',desc:''},
  {id:'i134',name:'Kamera Analog',price:5000,cat:'Piknik',desc:''},
  {id:'i135',name:'Koran Vintage',price:3000,cat:'Piknik',desc:''},
  {id:'i136',name:'Majalah Palsu',price:3000,cat:'Piknik',desc:''},
  {id:'i137',name:'Buku Bacaan Asli',price:5000,cat:'Piknik',desc:''},
  {id:'i138',name:'Bunga Palsu',price:5000,cat:'Piknik',desc:''},
  {id:'i139',name:'Bunga Tulip',price:5000,cat:'Piknik',desc:''},
  {id:'i140',name:'Bunga Edelweis',price:5000,cat:'Piknik',desc:''},
  {id:'i141',name:'Cermin Oval',price:5000,cat:'Piknik',desc:''},
  {id:'i142',name:'Cermin Love',price:5000,cat:'Piknik',desc:''},
  {id:'i143',name:'Piring Kayu',price:2000,cat:'Piknik',desc:''},
  {id:'i144',name:'Alat Makan Kayu',price:2000,cat:'Piknik',desc:''},
  {id:'i145',name:'Gelas Kayu',price:2000,cat:'Piknik',desc:''},
  {id:'i146',name:'Tatakan Gelas',price:2000,cat:'Piknik',desc:''},
  {id:'i147',name:'Payung Aesthetic',price:5000,cat:'Piknik',desc:''}
];

const ITEMS_PAKET = [
  {id:'p1',name:'Kemping Ceria 1',price:85000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs'},
  {id:'p2',name:'Kemping Ceria 2',price:110000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs, Kursi Lipat 2 pcs, Meja Kain'},
  {id:'p3',name:'Kemping Ceria 3',price:130000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras 2 pcs, Keril 60L, Sleeping Bag 2 pcs, Headlamp 2 pcs, Kursi Lipat 2 pcs, Meja Kain, Lampu Tenda'},
  {id:'p4',name:'Kemping Rame2',price:250000,cat:'Paket Kemping',desc:'Tenda 4-5P 2 pcs, Kompor + Gas + Nesting, Matras 4 pcs, Keril 60L 2 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs, Kursi Lipat 4 pcs, Meja Kain 2 pcs, Lampu Tenda 2 pcs'},
  {id:'p5',name:'Kemping Berdua',price:75000,cat:'Paket Kemping',desc:'Tenda 2P, Kompor + Gas + Nesting, Matras 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs'},
  {id:'p6',name:'Kemping Bertiga',price:100000,cat:'Paket Kemping',desc:'Tenda 3-4P, Kompor + Gas + Nesting, Matras 3 pcs, Sleeping Bag 3 pcs, Headlamp 3 pcs'},
  {id:'p7',name:'Kemping Berempat',price:120000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras 4 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs'},
  {id:'p8',name:'Kemping Komplit',price:170000,cat:'Paket Kemping',desc:'Tenda 4-5P, Kompor + Gas + Nesting, Matras 4 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs, Kursi Lipat 4 pcs, Meja Lipat 2 pcs, Lampu Tenda'},
  {id:'p9',name:'Kemping Ranti Ber-2',price:110000,cat:'Paket Kemping',desc:'Tenda 2P, Kompor + Gas + Nesting, Matras 2 pcs, Sleeping Bag 2 pcs, Headlamp 2 pcs, Keril 60L, Trekking Pole 2 pcs'},
  {id:'p10',name:'Kemping Ranti Ber-4',price:195000,cat:'Paket Kemping',desc:'Tenda 3-4P, Kompor + Gas + Nesting, Matras 4 pcs, Sleeping Bag 4 pcs, Headlamp 4 pcs, Keril 60L 2 pcs, Trekking Pole 4 pcs, Lampu Tenda'},

  {id:'p11',name:'Paket Ijen Basic',price:25000,cat:'Paket Ijen',desc:'Trekking Pole, Masker Gas, Sarung Tangan, Headlamp'},
  {id:'p12',name:'Paket Ijen A',price:35000,cat:'Paket Ijen',desc:'Trekking Pole, Masker Gas, Sarung Tangan, Headlamp, Sepatu'},
  {id:'p13',name:'Paket Ijen B',price:40000,cat:'Paket Ijen',desc:'Trekking Pole, Masker Gas, Sepatu, Sarung Tangan, Headlamp, Jaket'},
  {id:'p14',name:'Paket Ijen Komplit',price:50000,cat:'Paket Ijen',desc:'Trekking Pole, Masker Gas, Sarung Tangan, Headlamp, Jaket, Celana'},

  {id:'p15',name:'Tektok Basic',price:30000,cat:'Paket Tektok',desc:''},
  {id:'p16',name:'Tektok A',price:40000,cat:'Paket Tektok',desc:''},
  {id:'p17',name:'Tektok B',price:50000,cat:'Paket Tektok',desc:''},
  {id:'p18',name:'Tektok Komplit',price:60000,cat:'Paket Tektok',desc:''},

  {id:'p19',name:'Paket Memasak',price:20000,cat:'Paket Masak / Grill',desc:''},
  {id:'p20',name:'Memasak Komplit',price:25000,cat:'Paket Masak / Grill',desc:''},
  {id:'p21',name:'Grill Ceria',price:25000,cat:'Paket Masak / Grill',desc:''},
  {id:'p22',name:'Grill Komplit',price:35000,cat:'Paket Masak / Grill',desc:''},
  {id:'p23',name:'Paket Ceria',price:45000,cat:'Paket Masak / Grill',desc:''},
  {id:'p24',name:'Paket Memengan',price:45000,cat:'Paket Masak / Grill',desc:''},
  {id:'p25',name:'Paket Dolanan',price:40000,cat:'Paket Masak / Grill',desc:''},
  {id:'p26',name:'Paket Bahagia',price:50000,cat:'Paket Masak / Grill',desc:''},

  {id:'p27',name:'2 Kursi XL',price:15000,cat:'Paket Kursi & Meja',desc:'Kursi XL 2 pcs'},
  {id:'p28',name:'4 Kursi XL',price:30000,cat:'Paket Kursi & Meja',desc:'Kursi XL 4 pcs'},
  {id:'p29',name:'6 Kursi XL',price:40000,cat:'Paket Kursi & Meja',desc:'Kursi XL 6 pcs'},
  {id:'p30',name:'8 Kursi XL',price:50000,cat:'Paket Kursi & Meja',desc:'Kursi XL 8 pcs'},
  {id:'p31',name:'2 Kursi XL + 1 Meja Kain',price:25000,cat:'Paket Kursi & Meja',desc:'Kursi XL 2 pcs + Meja Kain 1 pcs'},
  {id:'p32',name:'2 Kursi XL + 1 Meja Aluminium',price:30000,cat:'Paket Kursi & Meja',desc:'Kursi XL 2 pcs + Meja Aluminium 1 pcs'},
  {id:'p33',name:'4 Kursi XL + 2 Meja Kain',price:40000,cat:'Paket Kursi & Meja',desc:'Kursi XL 4 pcs + Meja Kain 2 pcs'},
  {id:'p34',name:'4 Kursi XL + 1 Meja Aluminium',price:40000,cat:'Paket Kursi & Meja',desc:'Kursi XL 4 pcs + Meja Aluminium 1 pcs'},

  {id:'p35',name:'Paket Kencan',price:30000,cat:'Paket Piknik',desc:''},
  {id:'p36',name:'Paket Pasang',price:35000,cat:'Paket Piknik',desc:''},
  {id:'p37',name:'Paket Konco',price:50000,cat:'Paket Piknik',desc:''},
  {id:'p38',name:'Penak Ngeteh',price:25000,cat:'Paket Piknik',desc:''}
];

const ITEMS_PIKNIK = ITEMS_PAKET
  .filter(item => item.cat === 'Paket Piknik')
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
  const packageOrder=['Paket Kemping','Paket Ijen','Paket Tektok','Paket Masak / Grill','Paket Kursi & Meja','Paket Piknik'];
  packageOrder.forEach(catName=>{
    const items=ITEMS_PAKET
      .filter(item=>item.cat===catName)
      .map(item=>({name:item.name,price:item.price,desc:item.desc||''}));
    if(items.length){
      sections.push({title:catName,items});
    }
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
let filterExpanded = false;
const animatedItemIds = new Set();
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
    btn.innerHTML=isLoading?'<i class="fas fa-spinner fa-spin"></i> Memproses...':'<i class="fas fa-shopping-bag"></i> Lihat Keranjang';
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
  catalogShowAll=false;
  filterExpanded=false;
  document.querySelectorAll('.tab-btn[data-tab]').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');

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
  else allItems = [...ITEMS_PAKET].sort((a,b)=>a.name.localeCompare(b.name,'id',{sensitivity:'base'}));
  buildCatFilter();
  renderGrid(allItems);
  positionDesktopFooter();
}

function buildCatFilter(){
  const cf = document.getElementById('catFilter');
  cf.style.display='flex';
  if(activeTab==='catalog'){
    const cats = ['Semua',...new Set(allItems.map(i=>i.cat))];
    cf.innerHTML = cats.map(c=>`<div class="cf-btn${c===activecat?' active':''}" onclick="selectCat('${c}',this)">${c}</div>`).join('');
    updateFilterRowsState();
    return;
  }
  const packageFilters = [
    {label:'Semua',value:'Semua'},
    {label:'Kemping',value:'Paket Kemping'},
    {label:'Ijen',value:'Paket Ijen'},
    {label:'Tektok',value:'Paket Tektok'},
    {label:'Masak / Grill',value:'Paket Masak / Grill'},
    {label:'Piknik',value:'Paket Piknik'},
    {label:'Kursi & Meja',value:'Paket Kursi & Meja'}
  ];
  if(activecat==='Semua'){
    // keep default
  }else if(!packageFilters.some(f=>f.value===activecat)){
    activecat='Semua';
  }
  cf.innerHTML = packageFilters
    .map(f=>`<div class="cf-btn${f.value===activecat?' active':''}" onclick="selectCat('${f.value}',this)">${f.label}</div>`)
    .join('');
  updateFilterRowsState();
}

function selectCat(cat, el){
  activecat = cat;
  catalogShowAll=false;
  document.querySelectorAll('.cf-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  applyFilter(document.getElementById('searchInput').value.toLowerCase());
}

function toggleFilterRows(){
  filterExpanded=!filterExpanded;
  updateFilterRowsState();
}

function updateFilterRowsState(){
  const cf=document.getElementById('catFilter');
  if(!cf)return;
  cf.classList.remove('collapsed','expanded','has-toggle');
  const oldToggle=cf.querySelector('.cf-toggle-btn');
  if(oldToggle)oldToggle.remove();
  const btns=[...cf.querySelectorAll('.cf-btn')];
  if(!btns.length)return;
  const rows=[...new Set(btns.map(b=>b.offsetTop))];
  if(rows.length<=2){
    cf.style.maxHeight='none';
    return;
  }
  const secondRowTop=rows[1];
  const secondRowBtns=btns.filter(b=>b.offsetTop===secondRowTop);
  const secondRowHeight=secondRowBtns.length?Math.max(...secondRowBtns.map(b=>b.offsetHeight)):26;
  const collapsedHeight=secondRowTop+secondRowHeight+2;
  cf.style.setProperty('--cf-collapsed-h',`${collapsedHeight}px`);
  cf.classList.add('has-toggle');
  cf.classList.add(filterExpanded?'expanded':'collapsed');
  cf.style.maxHeight=filterExpanded?`${cf.scrollHeight+6}px`:`${collapsedHeight}px`;
  const toggle=document.createElement('button');
  toggle.type='button';
  toggle.className='cf-toggle-btn';
  if(filterExpanded)toggle.classList.add('expanded');
  toggle.setAttribute('aria-label',filterExpanded?'Tampilkan lebih sedikit filter':'Tampilkan filter lainnya');
  toggle.innerHTML=filterExpanded?'<i class="fas fa-chevron-up"></i>':'<i class="fas fa-chevron-down"></i>';
  toggle.onclick=toggleFilterRows;
  cf.appendChild(toggle);
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
  if((activeTab!=='catalog' && activeTab!=='package')){
    wrap.innerHTML='';
    return;
  }
  const hasMore=shownCount<totalCount;
  if(hasMore){
    wrap.innerHTML='<button class="catalog-expand-btn" type="button" onclick="showAllCatalogItems()">Tampilkan Semua</button>';
    return;
  }
  if(catalogShowAll && totalCount>getCatalogPreviewLimit()){
    wrap.innerHTML='<button class="catalog-expand-btn" type="button" onclick="showLessCatalogItems()">Tampilkan Sedikit</button>';
    return;
  }
  wrap.innerHTML='';
}
function showAllCatalogItems(){
  catalogShowAll=true;
  applyFilter((document.getElementById('searchInput').value||'').toLowerCase());
}
function showLessCatalogItems(){
  catalogShowAll=false;
  applyFilter((document.getElementById('searchInput').value||'').toLowerCase());
}

function renderGrid(items){
  const g = document.getElementById('itemGrid');
  const rawQuery=(document.getElementById('searchInput').value||'').trim();
  let shownItems=items;
  if((activeTab==='catalog' || activeTab==='package') && !catalogShowAll && !rawQuery){
    shownItems=items.slice(0,getCatalogPreviewLimit());
  }
  if(shownItems.length===0){
    g.innerHTML=`<div class="no-results"><i class="fas fa-magnifying-glass"></i>Tidak ditemukan</div>`;
    renderCatalogExpandAction(items.length,shownItems.length);
    return;
  }
  const isPkg=(activeTab==='package');
  g.innerHTML=shownItems.map((item,idx)=>{
    const inCart=cart.find(c=>c.id===item.id);
    const stockStatus=getStockStatusById(item.id);
    const unavailable=stockStatus!=='tersedia';
    const stockTag=stockStatus==='habis'?'Habis':(stockStatus==='maintenance'?'Maintenance':'');
    const isFirstRender=!animatedItemIds.has(item.id);
    if(isFirstRender)animatedItemIds.add(item.id);
    const animClass=isFirstRender?' animate-in':'';
    const animDelay=isFirstRender?` style="animation-delay:${idx*0.02}s"`:'';
    return `<div class="item-card${animClass}${inCart?' in-cart':''}${unavailable?' unavailable':''}" onclick="toggleItem('${item.id}')"${animDelay} data-id="${item.id}">
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
  updateFilterRowsState();
  if((activeTab==='catalog' || activeTab==='package') && !catalogShowAll){
    applyFilter((document.getElementById('searchInput').value||'').toLowerCase());
  }
});



