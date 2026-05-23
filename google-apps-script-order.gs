const SPREADSHEET_ID = '1JJYqwK5ud8KnQDriZaqeyIa6Q_K1F4CM2cbdMfRyQHE';
const SPREADSHEET_ID_FALLBACK = '1JYywk5ud8KnQDriZaqeyla6Q_K1F4CM2cbdMfRyQHE';
const SHEET_ORDERS = 'Orders';
const SHEET_STOCK = 'Stock';
const ORDER_HEADERS = [
  'ID Internal',
  'Nama',
  'WhatsApp',
  'Jaminan',
  'Tanggal Ambil',
  'Tanggal Kembali',
  'Durasi',
  'Daftar Item',
  'Total',
  'Waktu Order',
  'Status',
  'Catatan'
];
const STOCK_HEADERS = ['Item ID', 'Nama Item', 'Status', 'Updated At'];
const ORDER_STATUS_ALLOWED = ['Baru', 'Diproses', 'Diambil', 'Selesai', 'Cancel'];
const STOCK_STATUS_ALLOWED = ['tersedia', 'habis', 'maintenance'];
const ADMIN_USERNAME_PROP = 'ADMIN_USERNAME';
const ADMIN_PASSWORD_PROP = 'ADMIN_PASSWORD';
const ADMIN_TOKEN_PROP = 'ADMIN_TOKEN';
const ADMIN_TOKEN_EXP_PROP = 'ADMIN_TOKEN_EXPIRES_AT';
const ADMIN_TOKEN_TTL_SEC = 12 * 60 * 60;
const DEBUG_LOG = true;

function doGet(e) {
  return handleRequest_(e || {});
}

function doPost(e) {
  return handleRequest_(e || {});
}

function handleRequest_(e) {
  const callback = (e.parameter && e.parameter.callback) || '';
  try {
    const action = String((e.parameter && e.parameter.action) || '').toLowerCase();
    if (DEBUG_LOG) {
      var safeParams = Object.assign({}, (e && e.parameter) || {});
      if (safeParams.password) safeParams.password = `***len:${String(safeParams.password).length}`;
      Logger.log('handleRequest_: action=%s params=%s hasPostData=%s',
        action || '(empty)',
        JSON.stringify(safeParams),
        !!(e && e.postData && e.postData.contents));
    }
    let result;
    switch (action) {
      case 'login':
        result = loginAdmin_(
          (e.parameter && e.parameter.username) || '',
          (e.parameter && e.parameter.password) || ''
        );
        break;
      case 'logout':
        result = logoutAdmin_((e.parameter && e.parameter.token) || '');
        break;
      case 'list':
        result = listOrders_();
        break;
      case 'create':
        requireAuth_(e);
        result = createOrUpsertOrder_(readPayload_(e));
        break;
      case 'update':
        requireAuth_(e);
        var updateId = (e.parameter && (e.parameter.id || e.parameter.noPesanan)) || '';
        result = updateOrderStatus_(
          updateId,
          (e.parameter && e.parameter.status) || ''
        );
        break;
      case 'delete':
        requireAuth_(e);
        var deleteId = (e.parameter && (e.parameter.id || e.parameter.noPesanan)) || '';
        result = deleteOrder_(deleteId);
        break;
      case 'stocklist':
        result = listStocks_();
        break;
      case 'stockupdate':
        requireAuth_(e);
        result = updateStock_(
          (e.parameter && e.parameter.itemId) || '',
          (e.parameter && e.parameter.itemName) || '',
          (e.parameter && e.parameter.status) || ''
        );
        break;
      default:
        result = { success: false, message: 'Unknown action. Gunakan: login/logout/list/create/update/delete/stockList/stockUpdate.' };
    }
    return output_(result, callback);
  } catch (err) {
    return output_({ success: false, message: String((err && err.message) || err) }, callback);
  }
}

function output_(obj, callback) {
  const text = JSON.stringify(obj);
  if (callback) {
    return ContentService.createTextOutput(`${callback}(${text})`).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (_err) {
    return SpreadsheetApp.openById(SPREADSHEET_ID_FALLBACK);
  }
}

function getOrdersSheet_() {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(SHEET_ORDERS);
  if (!sh) sh = ss.insertSheet(SHEET_ORDERS);
  ensureHeaders_(sh, ORDER_HEADERS);
  return sh;
}

function getStockSheet_() {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(SHEET_STOCK);
  if (!sh) sh = ss.insertSheet(SHEET_STOCK);
  ensureHeaders_(sh, STOCK_HEADERS);
  return sh;
}

function ensureHeaders_(sheet, headers) {
  const maxCol = Math.max(sheet.getLastColumn(), headers.length);
  const firstRow = maxCol > 0 ? sheet.getRange(1, 1, 1, maxCol).getValues()[0] : [];
  const isEmpty = firstRow.join('').trim() === '';
  if (isEmpty && sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const mismatch = headers.some(function (h, i) {
    return String(current[i] || '') !== h;
  });
  if (mismatch) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function readPayload_(e) {
  const payloadText =
    (e.parameter && e.parameter.payload) ||
    (e.postData && e.postData.contents) ||
    '';
  if (!payloadText) throw new Error('Payload kosong.');
  if (DEBUG_LOG) Logger.log('readPayload_: len=%s sample=%s', payloadText.length, payloadText.slice(0, 120));

  try {
    return JSON.parse(payloadText);
  } catch (_err) {
    throw new Error('Payload bukan JSON valid.');
  }
}

function getAdminUsername_() {
  return PropertiesService.getScriptProperties().getProperty(ADMIN_USERNAME_PROP) || 'admin';
}

function getAdminPassword_() {
  return PropertiesService.getScriptProperties().getProperty(ADMIN_PASSWORD_PROP) || 'bismillah';
}

function readTokenFromRequest_(e) {
  return String((e && e.parameter && e.parameter.token) || '').trim();
}

function issueAdminToken_() {
  var raw = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 12);
  return 'adm_' + raw;
}

function loginAdmin_(username, password) {
  var user = String(username || '').trim();
  var pass = String(password || '');
  if (DEBUG_LOG) Logger.log('loginAdmin_: user=%s passLen=%s', user, pass.length);
  if (!user || !pass) {
    return { success: false, message: 'Username / password wajib diisi.' };
  }
  if (user !== getAdminUsername_() || pass !== getAdminPassword_()) {
    return { success: false, message: 'Username / password admin salah.' };
  }
  var token = issueAdminToken_();
  var expiresAt = Date.now() + (ADMIN_TOKEN_TTL_SEC * 1000);
  var toSave = {};
  toSave[ADMIN_TOKEN_PROP] = token;
  toSave[ADMIN_TOKEN_EXP_PROP] = String(expiresAt);
  PropertiesService.getScriptProperties().setProperties(toSave, true);
  if (DEBUG_LOG) Logger.log('loginAdmin_: success tokenPrefix=%s exp=%s', token.slice(0, 10), expiresAt);
  return { success: true, token: token, expiresAt: expiresAt, message: 'Login berhasil.' };
}

function isValidAdminToken_(token) {
  var t = String(token || '').trim();
  if (!t) return false;
  var props = PropertiesService.getScriptProperties();
  var current = String(props.getProperty(ADMIN_TOKEN_PROP) || '').trim();
  var expRaw = String(props.getProperty(ADMIN_TOKEN_EXP_PROP) || '0').trim();
  var exp = Number(expRaw || 0);
  if (!current || t !== current) return false;
  if (!exp || exp <= Date.now()) return false;
  return true;
}

function requireAuth_(e) {
  var token = readTokenFromRequest_(e);
  if (DEBUG_LOG) Logger.log('requireAuth_: tokenPresent=%s tokenPrefix=%s', !!token, token ? token.slice(0, 10) : '-');
  if (!isValidAdminToken_(token)) {
    throw new Error('Token admin tidak valid atau sudah expired. Silakan login ulang.');
  }
  return token;
}

function logoutAdmin_(token) {
  var t = String(token || '').trim();
  var props = PropertiesService.getScriptProperties();
  var current = String(props.getProperty(ADMIN_TOKEN_PROP) || '').trim();
  if (!t || !current || t !== current) {
    return { success: true, message: 'Logout selesai.' };
  }
  props.deleteProperty(ADMIN_TOKEN_PROP);
  props.deleteProperty(ADMIN_TOKEN_EXP_PROP);
  return { success: true, message: 'Logout selesai.' };
}

function normalizeOrderStatus_(value) {
  const v = String(value || '').trim();
  if (ORDER_STATUS_ALLOWED.indexOf(v) >= 0) return v;
  return 'Baru';
}

function normalizeStockStatus_(value) {
  const v = String(value || '').trim().toLowerCase();
  if (STOCK_STATUS_ALLOWED.indexOf(v) >= 0) return v;
  return 'tersedia';
}

function normalizeDateString_(value) {
  if (value === null || value === undefined || value === '') return '';
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return formatIndonesianLongDate_(value);
  }
  const raw = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const dIso = new Date(raw + 'T00:00:00');
    if (!isNaN(dIso.getTime())) return formatIndonesianLongDate_(dIso);
  }
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    const dIso = new Date(raw);
    if (!isNaN(dIso.getTime())) return formatIndonesianLongDate_(dIso);
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const p = raw.split('/');
    const dLocal = new Date(Number(p[2]), Number(p[1]) - 1, Number(p[0]));
    if (!isNaN(dLocal.getTime())) return formatIndonesianLongDate_(dLocal);
  }
  const parsed = new Date(raw);
  if (!isNaN(parsed.getTime())) return formatIndonesianLongDate_(parsed);
  return raw;
}

function normalizeCellDateToIso_(value) {
  if (value === null || value === undefined || value === '') return '';
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, tz, 'yyyy-MM-dd');
  }
  const raw = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const p = raw.split('/');
    return `${p[2]}-${p[1]}-${p[0]}`;
  }
  const idLongIso = parseIndonesianLongDateToIso_(raw);
  if (idLongIso) return idLongIso;
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return Utilities.formatDate(d, tz, 'yyyy-MM-dd');
  }
  return raw;
}

function normalizeWaktuOrder_(value) {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  if (value === null || value === undefined || value === '') {
    return formatIndonesianLongDate_(new Date());
  }
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return formatIndonesianLongDate_(value);
  }
  const raw = String(value).trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const p = raw.split('/');
    const d = new Date(Number(p[2]), Number(p[1]) - 1, Number(p[0]));
    if (!isNaN(d.getTime())) return formatIndonesianLongDate_(d);
  }

  const idLike = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,\s*|\s+)?(\d{1,2})?[.:]?(\d{1,2})?[.:]?(\d{1,2})?$/);
  if (idLike) {
    const day = Number(idLike[1]);
    const month = Number(idLike[2]);
    const year = Number(idLike[3]);
    const d = new Date(year, month - 1, day);
    if (!isNaN(d.getTime())) return formatIndonesianLongDate_(d);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const dIso = new Date(raw + 'T00:00:00');
    if (!isNaN(dIso.getTime())) return formatIndonesianLongDate_(dIso);
  }
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    const dIso2 = new Date(raw);
    if (!isNaN(dIso2.getTime())) return formatIndonesianLongDate_(dIso2);
  }
  const idLongIso = parseIndonesianLongDateToIso_(raw);
  if (idLongIso) {
    const dId = new Date(idLongIso + 'T00:00:00');
    if (!isNaN(dId.getTime())) return formatIndonesianLongDate_(dId);
  }

  const parsed = new Date(raw);
  if (!isNaN(parsed.getTime())) return formatIndonesianLongDate_(parsed);
  return raw.split(',')[0].trim();
}

function formatIndonesianLongDate_(dateObj) {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const day = String(Number(Utilities.formatDate(dateObj, tz, 'd')));
  const month = Utilities.formatDate(dateObj, tz, 'MMMM');
  const year = Utilities.formatDate(dateObj, tz, 'yyyy');
  return `${day} ${month} ${year}`;
}

function parseIndonesianLongDateToIso_(raw) {
  const text = String(raw || '').trim().toLowerCase();
  const m = text.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i);
  if (!m) return '';
  const monthMap = {
    januari: 1, februari: 2, maret: 3, april: 4, mei: 5, juni: 6,
    juli: 7, agustus: 8, september: 9, oktober: 10, november: 11, desember: 12
  };
  const day = Number(m[1]);
  const month = monthMap[m[2]];
  const year = Number(m[3]);
  if (!day || !month || !year) return '';
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function sanitizeWaktuOrderColumn_(sh) {
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  const range = sh.getRange(2, 10, lastRow - 1, 1);
  const values = range.getValues();
  let changed = false;
  const next = values.map(function (r) {
    const current = r[0];
    const normalized = normalizeWaktuOrder_(current);
    if (String(current || '') !== String(normalized || '')) changed = true;
    return [normalized];
  });
  if (changed) range.setValues(next);
}

function sanitizeTanggalColumns_(sh) {
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  [5, 6].forEach(function (colIdx) {
    const range = sh.getRange(2, colIdx, lastRow - 1, 1);
    const values = range.getValues();
    let changed = false;
    const next = values.map(function (r) {
      const current = r[0];
      const normalized = normalizeDateString_(current);
      if (String(current || '') !== String(normalized || '')) changed = true;
      return [normalized];
    });
    if (changed) range.setValues(next);
  });
}

function isSimpleOrderCode_(value) {
  return /^ID-\d{3,}$/i.test(String(value || '').trim());
}

function normalizeInternalOrderId_(value) {
  var raw = String(value || '').trim().toUpperCase();
  if (!raw) return '';
  if (isSimpleOrderCode_(raw)) return raw;
  return '';
}

function generateInternalOrderId_(sheet) {
  var sh = sheet || getOrdersSheet_();
  var lastRow = sh.getLastRow();
  var maxNum = 0;
  if (lastRow >= 2) {
    var values = sh.getRange(2, 1, lastRow - 1, 1).getValues();
    values.forEach(function (r) {
      var code = String(r[0] || '').trim().toUpperCase();
      var match = code.match(/^ID-(\d+)$/);
      if (!match) return;
      var num = Number(match[1]);
      if (num > maxNum) maxNum = num;
    });
  }
  var next = maxNum + 1;
  return 'ID-' + String(next).padStart(3, '0');
}

function sanitizeInternalIdColumn_(sh) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  var range = sh.getRange(2, 1, lastRow - 1, 1);
  var values = range.getValues();
  var changed = false;
  var used = {};
  var maxNum = 0;
  values.forEach(function (r) {
    var current = String(r[0] || '').trim().toUpperCase();
    var match = current.match(/^ID-(\d+)$/);
    if (!match) return;
    var num = Number(match[1]);
    if (!num) return;
    used[num] = true;
    if (num > maxNum) maxNum = num;
  });
  var nextNum = maxNum + 1;
  var next = values.map(function (r) {
    var current = String(r[0] || '').trim().toUpperCase();
    var normalized = normalizeInternalOrderId_(current);
    if (!normalized) {
      while (used[nextNum]) nextNum++;
      normalized = 'ID-' + String(nextNum).padStart(3, '0');
      used[nextNum] = true;
      nextNum++;
    }
    if (current !== normalized) changed = true;
    return [normalized];
  });
  if (changed) range.setValues(next);
}

function validateOrder_(o) {
  if (!o || typeof o !== 'object') throw new Error('Data order tidak valid.');
  if (!o.nama) throw new Error('nama wajib diisi.');
}

function orderToRow_(o) {
  return [
    o.noPesanan || '',
    o.nama || '',
    o.whatsapp || '',
    o.jaminan || '',
    normalizeDateString_(o.tanggalAmbil || ''),
    normalizeDateString_(o.tanggalKembali || ''),
    Number(o.durasi || 0),
    o.daftarItem || '',
    Number(o.total || 0),
    normalizeWaktuOrder_(o.waktuOrder),
    normalizeOrderStatus_(o.status || 'Baru'),
    o.catatan || ''
  ];
}

function createOrUpsertOrder_(order) {
  validateOrder_(order);
  const sh = getOrdersSheet_();
  sanitizeInternalIdColumn_(sh);
  sanitizeTanggalColumns_(sh);
  const providedId = normalizeInternalOrderId_(order.noPesanan || order.id || '');
  const targetRow = providedId ? findRowByNoPesanan_(sh, providedId) : -1;
  const internalId = targetRow > 0
    ? String(sh.getRange(targetRow, 1).getValue() || providedId || generateInternalOrderId_(sh))
    : (providedId || generateInternalOrderId_(sh));
  order.noPesanan = internalId;
  const row = orderToRow_(order);
  if (targetRow > 0) {
    sh.getRange(targetRow, 1, 1, ORDER_HEADERS.length).setValues([row]);
    return { success: true, duplicate: true, mode: 'updated', message: 'Order sudah ada, data diperbarui.', row: targetRow };
  }
  const appendAt = Math.max(sh.getLastRow() + 1, 2);
  sh.getRange(appendAt, 1, 1, ORDER_HEADERS.length).setValues([row]);
  return { success: true, duplicate: false, mode: 'created', message: 'Order ditambahkan.', row: appendAt };
}

function listOrders_() {
  const sh = getOrdersSheet_();
  sanitizeInternalIdColumn_(sh);
  sanitizeTanggalColumns_(sh);
  sanitizeWaktuOrderColumn_(sh);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return { success: true, data: [] };

  const values = sh.getRange(2, 1, lastRow - 1, ORDER_HEADERS.length).getValues();
  const data = values
    .filter(function (r) {
      return String(r[0] || '').trim() !== '';
    })
    .map(function (r) {
      return {
        noPesanan: r[0],
        nama: r[1],
        whatsapp: r[2],
        jaminan: r[3],
        tanggalAmbil: normalizeCellDateToIso_(r[4]),
        tanggalKembali: normalizeCellDateToIso_(r[5]),
        durasi: r[6],
        daftarItem: r[7],
        total: r[8],
        waktuOrder: normalizeWaktuOrder_(r[9]),
        status: normalizeOrderStatus_(r[10]),
        catatan: r[11] || ''
      };
    });

  return { success: true, data: data };
}

function updateOrderStatus_(noPesanan, status) {
  if (!noPesanan) throw new Error('id order wajib diisi.');
  const sh = getOrdersSheet_();
  const row = findRowByNoPesanan_(sh, noPesanan);
  if (row < 1) throw new Error('Order tidak ditemukan.');
  sh.getRange(row, 11).setValue(normalizeOrderStatus_(status));
  return { success: true, message: 'Status berhasil diupdate.', row: row };
}

function deleteOrder_(noPesanan) {
  if (!noPesanan) throw new Error('id order wajib diisi.');
  const sh = getOrdersSheet_();
  const row = findRowByNoPesanan_(sh, noPesanan);
  if (row < 1) throw new Error('Order tidak ditemukan.');
  sh.deleteRow(row);
  return { success: true, message: 'Order berhasil dihapus.' };
}

function listStocks_() {
  const sh = getStockSheet_();
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return { success: true, data: {} };
  const values = sh.getRange(2, 1, lastRow - 1, STOCK_HEADERS.length).getValues();
  const map = {};
  values.forEach(function (r) {
    const id = String(r[0] || '').trim();
    if (!id) return;
    map[id] = normalizeStockStatus_(r[2] || 'tersedia');
  });
  return { success: true, data: map };
}

function updateStock_(itemId, itemName, status) {
  const id = String(itemId || '').trim();
  if (!id) throw new Error('itemId wajib diisi.');

  const sh = getStockSheet_();
  const row = findRowById_(sh, id, 1);
  const normalized = normalizeStockStatus_(status);
  const nowText = formatIndonesianLongDate_(new Date());

  if (row > 0) {
    sh.getRange(row, 1, 1, STOCK_HEADERS.length).setValues([[id, itemName || '', normalized, nowText]]);
    return { success: true, message: 'Stok diperbarui.', row: row };
  }

  const appendAt = Math.max(sh.getLastRow() + 1, 2);
  sh.getRange(appendAt, 1, 1, STOCK_HEADERS.length).setValues([[id, itemName || '', normalized, nowText]]);
  return { success: true, message: 'Stok ditambahkan.', row: appendAt };
}

function findRowByNoPesanan_(sheet, noPesanan) {
  return findRowById_(sheet, noPesanan, 1);
}

function findRowById_(sheet, value, colIndex) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const data = sheet.getRange(2, colIndex, lastRow - 1, 1).getValues();
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][0]) === String(value)) {
      return i + 2;
    }
  }
  return -1;
}
