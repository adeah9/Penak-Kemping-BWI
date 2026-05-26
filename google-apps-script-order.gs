const SPREADSHEET_ID = '1JJYqwK5ud8KnQDriZaqeyIa6Q_K1F4CM2cbdMfRyQHE';
const SPREADSHEET_ID_FALLBACK = '1JYywk5ud8KnQDriZaqeyla6Q_K1F4CM2cbdMfRyQHE';
const SHEET_ORDERS = 'Orders';
const SHEET_STOCK = 'Stock';
const ORDER_HEADERS = [
  'ID Internal',
  'Kode Pesanan',
  'Nama',
  'WhatsApp',
  'Jaminan',
  'Tanggal Ambil',
  'Tanggal Kembali',
  'Durasi',
  'Daftar Item',
  'Waktu Order',
  'Total',
  'Status',
  'Catatan'
];
const ORDER_IDX = {
  INTERNAL_ID: 0,
  KODE: 1,
  NAMA: 2,
  WHATSAPP: 3,
  JAMINAN: 4,
  TANGGAL_AMBIL: 5,
  TANGGAL_KEMBALI: 6,
  DURASI: 7,
  DAFTAR_ITEM: 8,
  WAKTU_ORDER: 9,
  TOTAL: 10,
  STATUS: 11,
  CATATAN: 12
};
const ORDER_COL = {
  INTERNAL_ID: 1,
  KODE: 2,
  NAMA: 3,
  WHATSAPP: 4,
  JAMINAN: 5,
  TANGGAL_AMBIL: 6,
  TANGGAL_KEMBALI: 7,
  DURASI: 8,
  DAFTAR_ITEM: 9,
  WAKTU_ORDER: 10,
  TOTAL: 11,
  STATUS: 12,
  CATATAN: 13
};
const STOCK_HEADERS = ['Item ID', 'Nama Item', 'Status', 'Updated At'];
const ORDER_STATUS_ALLOWED = ['Baru', 'Diproses', 'Diambil', 'Selesai', 'Cancel'];
const STOCK_STATUS_ALLOWED = ['tersedia', 'habis', 'maintenance'];
const ADMIN_USERNAME_PROP = 'ADMIN_USERNAME';
const ADMIN_PASSWORD_PROP = 'ADMIN_PASSWORD';
const ADMIN_TOKEN_PROP = 'ADMIN_TOKEN';
const ADMIN_TOKEN_EXP_PROP = 'ADMIN_TOKEN_EXPIRES_AT';
const ADMIN_TOKEN_TTL_SEC = 12 * 60 * 60;
const DEBUG_LOG = false;
const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const MONTH_TOKEN_MAP = {
  januari: 1, jan: 1,
  februari: 2, feb: 2,
  maret: 3, mar: 3,
  april: 4, apr: 4,
  mei: 5, may: 5,
  juni: 6, jun: 6,
  juli: 7, jul: 7,
  agustus: 8, ags: 8, agu: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  oktober: 10, okt: 10, oct: 10,
  november: 11, nov: 11,
  desember: 12, des: 12, dec: 12
};

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
  ensureOrdersFilterRange_(sh);
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
  if (sheet.getName && sheet.getName() === SHEET_ORDERS) migrateOrderSheetStructure_(sheet);
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
  const mismatch = headers.some(function (h, i) { return String(current[i] || '') !== h; });
  if (mismatch) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function ensureOrdersFilterRange_(sheet) {
  if (!sheet || !sheet.getName || sheet.getName() !== SHEET_ORDERS) return;
  var totalRows = Math.max(sheet.getMaxRows(), 1);
  var neededCols = ORDER_HEADERS.length; // wajib termasuk Catatan (kolom ke-13)
  if (sheet.getMaxColumns() < neededCols) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), neededCols - sheet.getMaxColumns());
  }
  var expectedRange = sheet.getRange(1, 1, totalRows, neededCols);
  var existing = sheet.getFilter();
  if (!existing) {
    expectedRange.createFilter();
    return;
  }
  var current = existing.getRange();
  var sameShape =
    current.getRow() === 1 &&
    current.getColumn() === 1 &&
    current.getNumRows() === totalRows &&
    current.getNumColumns() === neededCols;
  if (sameShape) return;
  existing.remove();
  expectedRange.createFilter();
}

function isInternalIdHeader_(value) {
  const compact = String(value || '').trim().toLowerCase().replace(/\s+/g, '');
  return compact === 'idinternal' || compact === 'internalid' || compact === 'orderid';
}

function isKodePesananHeader_(value) {
  const compact = String(value || '').trim().toLowerCase().replace(/\s+/g, '');
  return compact === 'kodepesanan' || compact === 'nopesanan' || compact === 'nomorpesanan';
}

function normalizeHeaderToken_(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function buildOrderHeaderIndexMap_(headers) {
  var map = {};
  headers.forEach(function (h, i) {
    var key = normalizeHeaderToken_(h);
    if (!key) return;
    if (typeof map[key] === 'undefined') map[key] = i;
  });
  return map;
}

function getOrderSourceIndex_(headerMap, canonicalHeader) {
  switch (canonicalHeader) {
    case 'ID Internal': {
      var internalAliases = ['idinternal', 'internalid', 'orderid'];
      for (var i = 0; i < internalAliases.length; i++) {
        if (typeof headerMap[internalAliases[i]] !== 'undefined') return headerMap[internalAliases[i]];
      }
      return -1;
    }
    case 'Kode Pesanan': {
      var codeAliases = ['kodepesanan', 'nopesanan', 'nomorpesanan'];
      for (var j = 0; j < codeAliases.length; j++) {
        if (typeof headerMap[codeAliases[j]] !== 'undefined') return headerMap[codeAliases[j]];
      }
      return -1;
    }
    default: {
      var key = normalizeHeaderToken_(canonicalHeader);
      if (typeof headerMap[key] !== 'undefined') return headerMap[key];
      return -1;
    }
  }
}

function getOrderHeaderMapFromSheet_(sheet) {
  var colCount = Math.max(sheet.getLastColumn(), ORDER_HEADERS.length);
  var headers = colCount > 0 ? sheet.getRange(1, 1, 1, colCount).getValues()[0] : [];
  var rawMap = buildOrderHeaderIndexMap_(headers);
  var canonicalMap = {};
  ORDER_HEADERS.forEach(function (header) {
    var idx = getOrderSourceIndex_(rawMap, header);
    if (idx >= 0) canonicalMap[header] = idx;
  });
  return canonicalMap;
}

function getCellByHeader_(row, headerMap, canonicalHeader) {
  var idx = headerMap[canonicalHeader];
  return typeof idx === 'number' && idx >= 0 ? row[idx] : '';
}

function migrateOrderSheetStructure_(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = Math.max(sheet.getLastColumn(), ORDER_HEADERS.length);
  var firstRow = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
  var isEmpty = firstRow.join('').trim() === '';
  if (isEmpty) return;

  var isAlreadyCanonical = ORDER_HEADERS.every(function (h, i) {
    return String(firstRow[i] || '').trim() === h;
  });
  if (isAlreadyCanonical) return;

  var headerMap = buildOrderHeaderIndexMap_(firstRow);
  var hasAnyKnownOrderHeader = ORDER_HEADERS.some(function (h) {
    return getOrderSourceIndex_(headerMap, h) >= 0;
  });
  if (!hasAnyKnownOrderHeader) return;

  var dataRows = [];
  if (lastRow >= 2) {
    dataRows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  }
  var legacyManualRenamePattern =
    isInternalIdHeader_(firstRow[0]) &&
    isKodePesananHeader_(firstRow[1]) &&
    normalizeHeaderToken_(firstRow[2]) === 'whatsapp';
  if (legacyManualRenamePattern) {
    var fixedRows = dataRows.map(function (row) {
      return [
        row[0] || '', // ID Internal
        '',           // Kode Pesanan (akan diisi sanitizer)
        row[1] || '', // Nama
        row[2] || '', // WhatsApp
        row[3] || '', // Jaminan
        row[4] || '', // Tanggal Ambil
        row[5] || '', // Tanggal Kembali
        row[6] || '', // Durasi
        row[7] || '', // Daftar Item
        row[9] || '', // Waktu Order
        row[8] || '', // Total
        row[10] || '', // Status
        row[11] || '' // Catatan
      ];
    });
    if (sheet.getMaxColumns() < ORDER_HEADERS.length) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), ORDER_HEADERS.length - sheet.getMaxColumns());
    }
    sheet.getRange(1, 1, 1, ORDER_HEADERS.length).setValues([ORDER_HEADERS]);
    if (fixedRows.length) {
      sheet.getRange(2, 1, fixedRows.length, ORDER_HEADERS.length).setValues(fixedRows);
    }
    return;
  }
  var realigned = dataRows.map(function (row) {
    return ORDER_HEADERS.map(function (header) {
      var srcIdx = getOrderSourceIndex_(headerMap, header);
      if (srcIdx >= 0) return row[srcIdx];
      return '';
    });
  });

  if (sheet.getMaxColumns() < ORDER_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), ORDER_HEADERS.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, ORDER_HEADERS.length).setValues([ORDER_HEADERS]);
  if (realigned.length) {
    sheet.getRange(2, 1, realigned.length, ORDER_HEADERS.length).setValues(realigned);
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

function monthTokenToNumber_(token) {
  const key = String(token || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  return MONTH_TOKEN_MAP[key] || 0;
}

function parseDateInput_(value) {
  if (value === null || value === undefined || value === '') return null;
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    const y = Number(Utilities.formatDate(value, tz, 'yyyy'));
    const m = Number(Utilities.formatDate(value, tz, 'M'));
    const d = Number(Utilities.formatDate(value, tz, 'd'));
    return new Date(y, m - 1, d);
  }

  const raw = String(value).trim();
  if (!raw) return null;

  // YYYY-MM-DD / YYYY-MM-DDTHH:mm:ss
  let m = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?)?/);
  if (m) {
    const yy = Number(m[1]);
    const mm = Number(m[2]);
    const dd = Number(m[3]);
    const hh = Number(m[4] || 0);
    const mi = Number(m[5] || 0);
    const ss = Number(m[6] || 0);
    return new Date(yy, mm - 1, dd, hh, mi, ss);
  }

  // DD/MM/YYYY (opsional waktu)
  m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,\s*|\s+)?(\d{1,2})?[.:]?(\d{1,2})?[.:]?(\d{1,2})?$/);
  if (m) {
    const dd = Number(m[1]);
    const mm = Number(m[2]);
    const yy = Number(m[3]);
    const hh = Number(m[4] || 0);
    const mi = Number(m[5] || 0);
    const ss = Number(m[6] || 0);
    return new Date(yy, mm - 1, dd, hh, mi, ss);
  }

  // DD NamaBulan YYYY (Indonesia/English) + opsional waktu
  m = raw.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})(?:,\s*|\s+)?(\d{1,2})?[.:]?(\d{1,2})?[.:]?(\d{1,2})?$/);
  if (m) {
    const dd = Number(m[1]);
    const mm = monthTokenToNumber_(m[2]);
    const yy = Number(m[3]);
    const hh = Number(m[4] || 0);
    const mi = Number(m[5] || 0);
    const ss = Number(m[6] || 0);
    if (mm > 0) return new Date(yy, mm - 1, dd, hh, mi, ss);
  }

  // Last fallback for uncommon legacy format.
  const parsed = new Date(raw);
  if (!isNaN(parsed.getTime())) return parsed;
  return null;
}

function toIsoDateFromDate_(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) return '';
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const y = Utilities.formatDate(dateObj, tz, 'yyyy');
  const m = Utilities.formatDate(dateObj, tz, 'MM');
  const d = Utilities.formatDate(dateObj, tz, 'dd');
  return `${y}-${m}-${d}`;
}

function normalizeDateString_(value) {
  const parsed = parseDateInput_(value);
  if (!parsed) return String(value || '').trim();
  return formatIndonesianLongDate_(parsed);
}

function normalizeCellDateToIso_(value) {
  const parsed = parseDateInput_(value);
  if (!parsed) return '';
  return toIsoDateFromDate_(parsed);
}

function normalizeWaktuOrder_(value) {
  if (value === null || value === undefined || value === '') {
    return formatIndonesianLongDate_(new Date());
  }
  const parsed = parseDateInput_(value);
  if (!parsed) return String(value || '').split(',')[0].trim();
  return formatIndonesianLongDate_(parsed);
}

function formatIndonesianLongDate_(dateObj) {
  const normalized = parseDateInput_(dateObj);
  if (!normalized) return '';
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const day = String(Number(Utilities.formatDate(normalized, tz, 'd')));
  const monthIdx = Number(Utilities.formatDate(normalized, tz, 'M')) - 1;
  const month = MONTHS_ID[monthIdx] || '';
  const year = Utilities.formatDate(normalized, tz, 'yyyy');
  return `${day} ${month} ${year}`;
}

function parseIndonesianLongDateToIso_(raw) {
  const text = String(raw || '').trim();
  const m = text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/i);
  if (!m) return '';
  const day = Number(m[1]);
  const month = monthTokenToNumber_(m[2]);
  const year = Number(m[3]);
  if (!day || !month || !year) return '';
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function sanitizeWaktuOrderColumn_(sh) {
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  const range = sh.getRange(2, ORDER_COL.WAKTU_ORDER, lastRow - 1, 1);
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
  [ORDER_COL.TANGGAL_AMBIL, ORDER_COL.TANGGAL_KEMBALI].forEach(function (colIdx) {
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

function sheetDateToSerialNumber_(value) {
  if (Object.prototype.toString.call(value) !== '[object Date]' || isNaN(value.getTime())) return NaN;
  var utc = Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
  var baseUtc = Date.UTC(1899, 11, 30);
  return Math.round((utc - baseUtc) / 86400000);
}

function parseNumericTotal_(value) {
  if (typeof value === 'number' && !isNaN(value)) return value;
  var raw = String(value || '').trim();
  if (!raw) return 0;
  var normalized = raw
    .replace(/rp/ig, '')
    .replace(/\s+/g, '')
    .replace(/[^0-9,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  if (!/[0-9]/.test(normalized)) return 0;
  var num = Number(normalized);
  if (!isNaN(num) && isFinite(num)) return num;
  return 0;
}

function sanitizeTotalColumn_(sh) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  var range = sh.getRange(2, ORDER_COL.TOTAL, lastRow - 1, 1);
  var values = range.getValues();
  var changed = false;
  var next = values.map(function (r) {
    var parsed = parseNumericTotal_(r[0]);
    if (Number(r[0]) !== Number(parsed)) changed = true;
    return [parsed];
  });
  if (changed) range.setValues(next);
}

function looksLikeCurrencyText_(value) {
  if (typeof value === 'number' && isFinite(value)) return true;
  if (Object.prototype.toString.call(value) === '[object Date]') return false;
  var raw = String(value || '').trim();
  if (!raw) return false;
  var compact = raw.replace(/rp/ig, '').replace(/\s+/g, '');
  if (!compact) return false;
  if (/[A-Z]/i.test(compact)) return false;
  if (!/^-?[\d.,]+$/.test(compact)) return false;
  var num = Number(compact.replace(/\./g, '').replace(',', '.'));
  return !isNaN(num) && isFinite(num);
}

function repairLegacyWaktuTotalSwap_(sh) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  var range = sh.getRange(2, 1, lastRow - 1, ORDER_HEADERS.length);
  var rows = range.getValues();
  var changed = false;
  rows.forEach(function (row) {
    var waktuVal = row[ORDER_IDX.WAKTU_ORDER];
    var totalVal = row[ORDER_IDX.TOTAL];
    var totalLooksDate = !!parseDateInput_(totalVal);
    var waktuLooksDate = !!parseDateInput_(waktuVal);
    if (totalLooksDate && !waktuLooksDate && looksLikeCurrencyText_(waktuVal)) {
      row[ORDER_IDX.WAKTU_ORDER] = normalizeWaktuOrder_(totalVal);
      row[ORDER_IDX.TOTAL] = parseNumericTotal_(waktuVal);
      changed = true;
    }
  });
  if (changed) range.setValues(rows);
}

function applyOrderColumnFormats_(sh) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  var rowCount = lastRow - 1;
  sh.getRange(2, ORDER_COL.INTERNAL_ID, rowCount, 1).setNumberFormat('@');
  sh.getRange(2, ORDER_COL.KODE, rowCount, 1).setNumberFormat('@');
  sh.getRange(2, ORDER_COL.WHATSAPP, rowCount, 1).setNumberFormat('@');
  sh.getRange(2, ORDER_COL.TANGGAL_AMBIL, rowCount, 1).setNumberFormat('@');
  sh.getRange(2, ORDER_COL.TANGGAL_KEMBALI, rowCount, 1).setNumberFormat('@');
  sh.getRange(2, ORDER_COL.WAKTU_ORDER, rowCount, 1).setNumberFormat('@');
  sh.getRange(2, ORDER_COL.DURASI, rowCount, 1).setNumberFormat('0');
  sh.getRange(2, ORDER_COL.TOTAL, rowCount, 1).setNumberFormat('#,##0');
}

function isPublicOrderCode_(value) {
  return /^PKB-[0-9A-Z]{3}$/.test(String(value || '').trim().toUpperCase());
}

function normalizeKodePesanan_(value) {
  var raw = String(value || '').trim().toUpperCase();
  if (!raw) return '';
  if (/^ID-\d{3}$/i.test(raw)) raw = raw.replace(/^ID-/i, 'PKB-');
  return isPublicOrderCode_(raw) ? raw : '';
}

function isLegacyInternalOrderCode_(value) {
  var raw = String(value || '').trim().toUpperCase();
  if (!raw) return false;
  if (/^ORD[-_]/.test(raw)) return true;
  if (/^INT[-_]/.test(raw)) return true;
  if (/^[0-9A-F]{8,}$/.test(raw)) return true;
  return false;
}

function lettersToIndex_(letters) {
  var out = 0;
  for (var i = 0; i < letters.length; i++) {
    out = out * 26 + (letters.charCodeAt(i) - 65);
  }
  return out;
}

function indexToLetters_(index, length) {
  var chars = new Array(length);
  for (var i = length - 1; i >= 0; i--) {
    chars[i] = String.fromCharCode(65 + (index % 26));
    index = Math.floor(index / 26);
  }
  return chars.join('');
}

function orderCodeToSequence_(code) {
  var body = String(code || '').trim().toUpperCase().replace(/^PKB-/, '');
  if (/^\d{3}$/.test(body)) {
    var numeric = Number(body);
    return numeric >= 1 && numeric <= 999 ? numeric : 0;
  }
  var m = body.match(/^([A-Z])(\d{2})$/);
  if (m) {
    var num2 = Number(m[2]);
    if (num2 >= 1 && num2 <= 99) return 1000 + ((m[1].charCodeAt(0) - 65) * 99) + (num2 - 1);
  }
  m = body.match(/^([A-Z]{2})(\d)$/);
  if (m) {
    var num1 = Number(m[2]);
    if (num1 >= 1 && num1 <= 9) return 1000 + (26 * 99) + (lettersToIndex_(m[1]) * 9) + (num1 - 1);
  }
  if (/^[A-Z]{3}$/.test(body)) {
    return 1000 + (26 * 99) + (26 * 26 * 9) + lettersToIndex_(body);
  }
  return 0;
}

function sequenceToOrderCode_(seq) {
  var n = Number(seq || 0);
  if (n >= 1 && n <= 999) return 'PKB-' + String(n).padStart(3, '0');
  var rem = n - 1000;
  if (rem >= 0 && rem < 26 * 99) {
    return 'PKB-' + String.fromCharCode(65 + Math.floor(rem / 99)) + String((rem % 99) + 1).padStart(2, '0');
  }
  rem -= 26 * 99;
  if (rem >= 0 && rem < 26 * 26 * 9) {
    return 'PKB-' + indexToLetters_(Math.floor(rem / 9), 2) + String((rem % 9) + 1);
  }
  rem -= 26 * 26 * 9;
  if (rem >= 0 && rem < 26 * 26 * 26) return 'PKB-' + indexToLetters_(rem, 3);
  throw new Error('Kapasitas Kode Pesanan PKB-ZZZ sudah habis.');
}

const MAX_ORDER_SEQUENCE = 999 + (26 * 99) + (26 * 26 * 9) + (26 * 26 * 26);

function collectUsedOrderCodes_(sh) {
  var lastRow = sh.getLastRow();
  var used = {};
  if (lastRow < 2) return used;
  var values = sh.getRange(2, ORDER_COL.KODE, lastRow - 1, 1).getValues();
  values.forEach(function (r) {
    var code = normalizeKodePesanan_(r[0]);
    if (!code) return;
    used[code] = true;
  });
  return used;
}

function nextAvailableKodePesanan_(usedCodes) {
  var used = usedCodes || {};
  for (var seq = 1; seq <= MAX_ORDER_SEQUENCE; seq++) {
    var code = sequenceToOrderCode_(seq);
    if (!used[code]) return code;
  }
  throw new Error('Kapasitas Kode Pesanan PKB-ZZZ sudah habis.');
}

function generateKodePesanan_(sheet) {
  var sh = sheet || getOrdersSheet_();
  var used = collectUsedOrderCodes_(sh);
  return nextAvailableKodePesanan_(used);
}

function generateInternalOrderId_() {
  return 'INT-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
}

function isValidInternalOrderId_(value) {
  return /^INT-[A-Z0-9]{8}$/.test(String(value || '').trim().toUpperCase());
}

function sanitizeOrderIdentityColumns_(sh) {
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  var range = sh.getRange(2, 1, lastRow - 1, ORDER_HEADERS.length);
  var rows = range.getValues();
  var changed = false;
  var usedCodes = {};
  var usedInternal = {};
  var finalCodes = {};

  rows.forEach(function (r) {
    var code = normalizeKodePesanan_(r[ORDER_IDX.KODE]);
    if (!code || usedCodes[code]) return;
    usedCodes[code] = true;
  });

  rows.forEach(function (r) {
    var internalId = String(r[ORDER_IDX.INTERNAL_ID] || '').trim().toUpperCase();
    if (!isValidInternalOrderId_(internalId) || usedInternal[internalId]) {
      internalId = generateInternalOrderId_();
      r[ORDER_IDX.INTERNAL_ID] = internalId;
      changed = true;
    }
    usedInternal[internalId] = true;

    var currentCode = String(r[ORDER_IDX.KODE] || '').trim().toUpperCase();
    var normalized = normalizeKodePesanan_(currentCode);
    if (!normalized || finalCodes[normalized]) {
      normalized = nextAvailableKodePesanan_(usedCodes);
      r[ORDER_IDX.KODE] = normalized;
      changed = true;
    } else if (currentCode !== normalized) {
      r[ORDER_IDX.KODE] = normalized;
      changed = true;
    }
    usedCodes[normalized] = true;
    finalCodes[normalized] = true;
  });

  if (changed) range.setValues(rows);
}

function parseWaktuOrderForSortMs_(value) {
  const parsed = parseDateInput_(value);
  return parsed && !isNaN(parsed.getTime()) ? parsed.getTime() : 0;
}

function sortOrdersSheet_(sh) {
  var sheet = sh || getOrdersSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ensureOrdersFilterRange_(sheet);
    return;
  }
  repairLegacyWaktuTotalSwap_(sheet);
  if (lastRow < 3) {
    sanitizeTanggalColumns_(sheet);
    sanitizeWaktuOrderColumn_(sheet);
    sanitizeTotalColumn_(sheet);
    applyOrderColumnFormats_(sheet);
    ensureOrdersFilterRange_(sheet);
    return;
  }
  var rowCount = lastRow - 1;
  var values = sheet.getRange(2, 1, rowCount, ORDER_HEADERS.length).getValues();
  values = values.map(function (r) {
    var next = r.slice();
    next[ORDER_IDX.TANGGAL_AMBIL] = normalizeDateString_(next[ORDER_IDX.TANGGAL_AMBIL]);
    next[ORDER_IDX.TANGGAL_KEMBALI] = normalizeDateString_(next[ORDER_IDX.TANGGAL_KEMBALI]);
    next[ORDER_IDX.WAKTU_ORDER] = normalizeWaktuOrder_(next[ORDER_IDX.WAKTU_ORDER]);
    return next;
  });
  values.sort(function (a, b) {
    var aAmbilMs = parseWaktuOrderForSortMs_(a[ORDER_IDX.TANGGAL_AMBIL]);
    var bAmbilMs = parseWaktuOrderForSortMs_(b[ORDER_IDX.TANGGAL_AMBIL]);
    if (aAmbilMs !== bAmbilMs) return bAmbilMs - aAmbilMs;
    var aWaktu = parseWaktuOrderForSortMs_(a[ORDER_IDX.WAKTU_ORDER]);
    var bWaktu = parseWaktuOrderForSortMs_(b[ORDER_IDX.WAKTU_ORDER]);
    if (aWaktu !== bWaktu) return bWaktu - aWaktu;
    return String(b[ORDER_IDX.KODE] || '').localeCompare(String(a[ORDER_IDX.KODE] || ''));
  });
  sheet.getRange(2, 1, rowCount, ORDER_HEADERS.length).setValues(values);
  applyOrderColumnFormats_(sheet);
  ensureOrdersFilterRange_(sheet);
}

function validateOrder_(o) {
  if (!o || typeof o !== 'object') throw new Error('Data order tidak valid.');
  if (!o.nama) throw new Error('nama wajib diisi.');
  var totalNum = parseNumericTotal_(o.total);
  if (!isFinite(totalNum) || totalNum < 0) throw new Error('total tidak valid.');
  if (!parseDateInput_(o.tanggalAmbil)) throw new Error('tanggalAmbil tidak valid.');
  if (!parseDateInput_(o.tanggalKembali)) throw new Error('tanggalKembali tidak valid.');
}

function orderToRow_(o) {
  return [
    o.idInternal || '',
    o.kodePesanan || o.noPesanan || '',
    o.nama || '',
    o.whatsapp || '',
    o.jaminan || '',
    normalizeDateString_(o.tanggalAmbil || ''),
    normalizeDateString_(o.tanggalKembali || ''),
    Number(o.durasi || 0),
    o.daftarItem || '',
    normalizeWaktuOrder_(o.waktuOrder),
    parseNumericTotal_(o.total),
    normalizeOrderStatus_(o.status || 'Baru'),
    o.catatan || ''
  ];
}

function rowToOrder_(row, headerMap) {
  var obj = {
    idInternal: String(getCellByHeader_(row, headerMap, 'ID Internal') || '').trim(),
    kodePesanan: normalizeKodePesanan_(getCellByHeader_(row, headerMap, 'Kode Pesanan')),
    nama: String(getCellByHeader_(row, headerMap, 'Nama') || '').trim(),
    whatsapp: String(getCellByHeader_(row, headerMap, 'WhatsApp') || '').trim(),
    jaminan: String(getCellByHeader_(row, headerMap, 'Jaminan') || '').trim(),
    tanggalAmbil: normalizeDateString_(getCellByHeader_(row, headerMap, 'Tanggal Ambil')),
    tanggalKembali: normalizeDateString_(getCellByHeader_(row, headerMap, 'Tanggal Kembali')),
    durasi: Number(getCellByHeader_(row, headerMap, 'Durasi') || 0),
    daftarItem: String(getCellByHeader_(row, headerMap, 'Daftar Item') || '').trim(),
    total: parseNumericTotal_(getCellByHeader_(row, headerMap, 'Total')),
    waktuOrder: normalizeWaktuOrder_(getCellByHeader_(row, headerMap, 'Waktu Order')),
    status: normalizeOrderStatus_(getCellByHeader_(row, headerMap, 'Status')),
    catatan: String(getCellByHeader_(row, headerMap, 'Catatan') || '').trim()
  };
  obj.noPesanan = obj.kodePesanan;
  return obj;
}

function createOrUpsertOrder_(order) {
  validateOrder_(order);
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sh = getOrdersSheet_();
    sanitizeOrderIdentityColumns_(sh);
    sanitizeTanggalColumns_(sh);
    repairLegacyWaktuTotalSwap_(sh);
    sanitizeWaktuOrderColumn_(sh);
    sanitizeTotalColumn_(sh);
    applyOrderColumnFormats_(sh);
    const providedCode = normalizeKodePesanan_(order.kodePesanan || order.noPesanan || order.id || '');
    const targetRow = providedCode ? findRowByOrderRef_(sh, providedCode) : -1;
    const orderCode = targetRow > 0
      ? String(sh.getRange(targetRow, ORDER_COL.KODE).getValue() || providedCode || generateKodePesanan_(sh))
      : (providedCode || generateKodePesanan_(sh));
    const internalId = targetRow > 0
      ? String(sh.getRange(targetRow, ORDER_COL.INTERNAL_ID).getValue() || generateInternalOrderId_())
      : generateInternalOrderId_();
    order.idInternal = internalId;
    order.kodePesanan = orderCode;
    order.noPesanan = orderCode;
    const row = orderToRow_(order);
    if (targetRow > 0) {
      sh.getRange(targetRow, 1, 1, ORDER_HEADERS.length).setValues([row]);
      sortOrdersSheet_(sh);
      return { success: true, duplicate: true, mode: 'updated', message: 'Order sudah ada, data diperbarui.', row: targetRow, kodePesanan: orderCode, noPesanan: orderCode };
    }
    const appendAt = Math.max(sh.getLastRow() + 1, 2);
    sh.getRange(appendAt, 1, 1, ORDER_HEADERS.length).setValues([row]);
    sortOrdersSheet_(sh);
    return { success: true, duplicate: false, mode: 'created', message: 'Order ditambahkan.', row: appendAt, kodePesanan: orderCode, noPesanan: orderCode };
  } finally {
    lock.releaseLock();
  }
}

function listOrders_() {
  const sh = getOrdersSheet_();
  sanitizeOrderIdentityColumns_(sh);
  sanitizeTanggalColumns_(sh);
  repairLegacyWaktuTotalSwap_(sh);
  sanitizeWaktuOrderColumn_(sh);
  sanitizeTotalColumn_(sh);
  applyOrderColumnFormats_(sh);
  sortOrdersSheet_(sh);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return { success: true, data: [] };

  const headerMap = getOrderHeaderMapFromSheet_(sh);
  const values = sh.getRange(2, 1, lastRow - 1, Math.max(sh.getLastColumn(), ORDER_HEADERS.length)).getValues();
  const data = values
    .map(function (r) {
      return rowToOrder_(r, headerMap);
    })
    .filter(function (o) {
      return String(o.kodePesanan || '').trim() !== '' || String(o.nama || '').trim() !== '';
    })
    .map(function (o) {
      return {
        idInternal: o.idInternal,
        kodePesanan: o.kodePesanan,
        noPesanan: o.kodePesanan,
        nama: o.nama,
        whatsapp: o.whatsapp,
        jaminan: o.jaminan,
        tanggalAmbil: o.tanggalAmbil,
        tanggalKembali: o.tanggalKembali,
        durasi: o.durasi,
        daftarItem: o.daftarItem,
        total: o.total,
        waktuOrder: o.waktuOrder,
        status: o.status,
        catatan: o.catatan || ''
      };
    });

  return { success: true, data: data };
}

function updateOrderStatus_(noPesanan, status) {
  if (!noPesanan) throw new Error('id order wajib diisi.');
  const sh = getOrdersSheet_();
  const row = findRowByOrderRef_(sh, noPesanan);
  if (row < 1) throw new Error('Order tidak ditemukan.');
  sh.getRange(row, ORDER_COL.STATUS).setValue(normalizeOrderStatus_(status));
  sortOrdersSheet_(sh);
  return { success: true, message: 'Status berhasil diupdate.', row: row };
}

function deleteOrder_(noPesanan) {
  if (!noPesanan) throw new Error('id order wajib diisi.');
  const sh = getOrdersSheet_();
  const row = findRowByOrderRef_(sh, noPesanan);
  if (row < 1) throw new Error('Order tidak ditemukan.');
  sh.deleteRow(row);
  sortOrdersSheet_(sh);
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
  return findRowByOrderRef_(sheet, noPesanan);
}

function findRowByOrderRef_(sheet, value) {
  var ref = String(value || '').trim();
  if (!ref) return -1;
  var byCode = findRowById_(sheet, ref, ORDER_COL.KODE);
  if (byCode > 0) return byCode;
  return findRowById_(sheet, ref, ORDER_COL.INTERNAL_ID);
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
