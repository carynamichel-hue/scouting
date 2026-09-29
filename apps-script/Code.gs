/**
 * Scout Report — the Google Apps Script that connects your Google Sheet to
 * the Scout Report phone app.
 *
 * WHAT IT DOES
 *   · Phones send scouting reports here; each pest on a report becomes one row
 *     on the "Reports" tab (one visit = one Report ID across its rows).
 *   · Photos are saved to a "Scouting photos" folder next to this sheet, and
 *     the row gets a link to each one.
 *   · The farms, locations, crops, pests and dropdown choices live on the
 *     "Setup" tab. The app's Setup page writes them here — or edit that tab
 *     by hand; phones pick up the change the next time they open the app.
 *
 * HOW TO INSTALL (once per sheet — the app's Setup page walks through it)
 *   1. In the sheet: Extensions → Apps Script. Delete what is there, paste
 *      this whole file, click Save.
 *   2. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Click Deploy, allow the permissions Google asks for, and copy the
 *      "Web app URL" (it ends in /exec). Paste it into the app's Setup page.
 *   "Anyone" is what lets scouts send reports without a Google sign-in.
 *   Anyone holding the link can add reports and read the Setup lists; only
 *   someone with the setup password can change the lists.
 *
 * SETUP PASSWORD: the first time the app saves the lists, the password typed
 * there becomes the setup password. To reset it: Project Settings (gear) →
 * Script properties → delete SETUP_KEY.
 *
 * After editing this code, publish the change with Deploy → Manage
 * deployments → edit (pencil) → Version: New version → Deploy. The URL stays
 * the same.
 */

var REPORTS = 'Reports';
var SETUP = 'Setup';
var PHOTOS_FOLDER = 'Scouting photos';

var REPORT_HEADERS = ['Received', 'Reported at', 'Report ID', 'Scout', 'Farm', 'Location',
  'Crop / plant', 'Pest', 'Severity', 'Distribution', 'Notes', 'Latitude', 'Longitude', 'Photos'];

// Setup tab: one column (or pair of columns) per list, a blank column between.
var SETUP_COLS = { farm: 1, location: 2, crop: 4, pest: 6, severity: 8, distribution: 10, setting: 12, value: 13 };
var SETUP_HEADERS = { 1: 'Farm', 2: 'Location', 4: 'Crop / plant', 6: 'Pest', 8: 'Severity', 10: 'Distribution', 12: 'Setting', 13: 'Value' };
var SETTINGS = [
  ['title', 'Title'], ['showCrop', 'Show crop'], ['showPhotos', 'Show photos'],
  ['showGps', 'Show GPS'], ['showNotes', 'Show notes'],
];
var DEFAULT_SEVERITY = ['None', 'Low', 'Moderate', 'High'];
var DEFAULT_DISTRIBUTION = ['Single plant', 'Scattered', 'Patches', 'Throughout'];
var NONE_FOUND = '(none found)';

/* ── web app entry points ─────────────────────────────────────────────── */

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === 'ping') return json_({ ok: true });
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    return json_({ ok: true, sheetName: ss.getName(), config: readSetup_(ss), hasSetupKey: !!getKey_() });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    lock.waitLock(25000);   // two scouts sending at once must not interleave rows
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (body.action === 'report') return json_(saveReport_(ss, body.report));
    if (body.action === 'setup') return json_(saveSetup_(ss, body.key, body.config));
    if (body.action === 'checkKey') return json_(checkKey_(body.key));
    return json_({ ok: false, error: 'Unknown action.' });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) { /* never acquired */ }
  }
}

/* ── reports ──────────────────────────────────────────────────────────── */

function saveReport_(ss, report) {
  if (!report || !report.id) return { ok: false, error: 'A report needs an id.' };
  var sheet = ensureSheet_(ss, REPORTS, REPORT_HEADERS);
  // A phone that lost its connection mid-send tries again later; the same
  // Report ID must never be written twice.
  if (sheet.getLastRow() > 1) {
    var hit = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).createTextFinder(String(report.id)).matchEntireCell(true).findNext();
    if (hit) return { ok: true, duplicate: true, id: report.id };
  }
  var links = savePhotos_(ss, report);
  var rows = reportRows(report, new Date(), links);
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, REPORT_HEADERS.length).setValues(rows);
  return { ok: true, id: report.id, rows: rows.length, photos: links.length };
}

// Pure: one row per pest line; a visit with nothing found is still one row.
function reportRows(report, received, photoLinks) {
  var lines = (report.lines && report.lines.length) ? report.lines : [{ pest: NONE_FOUND, severity: '', distribution: '' }];
  var at = report.at ? new Date(report.at) : received;
  var photos = (photoLinks || []).join('\n');
  return lines.map(function (l) {
    return [received, at, safe_(report.id), safe_(report.scout), safe_(report.farm), safe_(report.location),
      safe_(report.crop), safe_(l.pest), safe_(l.severity), safe_(l.distribution), safe_(report.notes),
      num_(report.lat), num_(report.lng), photos];
  });
}

function savePhotos_(ss, report) {
  var photos = report.photos || [];
  if (!photos.length) return [];
  var folder = photoFolder_(ss);
  var stamp = String(report.at || '').slice(0, 10);
  return photos.map(function (ph, i) {
    var name = [stamp, report.farm, report.location, report.id + '-' + (i + 1)].filter(function (x) { return x; }).join(' ') + '.jpg';
    var blob = Utilities.newBlob(Utilities.base64Decode(String(ph.data || '')), ph.type || 'image/jpeg', name);
    return folder.createFile(blob).getUrl();
  });
}

function photoFolder_(ss) {
  var parents = DriveApp.getFileById(ss.getId()).getParents();
  var parent = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  var found = parent.getFoldersByName(PHOTOS_FOLDER);
  return found.hasNext() ? found.next() : parent.createFolder(PHOTOS_FOLDER);
}

/* ── setup lists ──────────────────────────────────────────────────────── */

function readSetup_(ss) {
  var sheet = ss.getSheetByName(SETUP);
  if (!sheet || sheet.getLastRow() < 2) return null;
  return setupFromValues(sheet.getRange(1, 1, sheet.getLastRow(), 13).getValues());
}

function saveSetup_(ss, key, config) {
  var check = checkKey_(key);
  if (!check.ok) return check;
  if (!getKey_()) setKey_(String(key));   // the first save sets the password
  var values = setupToValues(config || {});
  var sheet = ensureSheet_(ss, SETUP, null);
  sheet.clear();
  sheet.getRange(1, 1, values.length, 13).setValues(values);
  sheet.setFrozenRows(1);
  return { ok: true, config: setupFromValues(values) };
}

function checkKey_(key) {
  key = String(key || '');
  if (key.length < 4) return { ok: false, error: 'The setup password needs at least 4 characters.' };
  var stored = getKey_();
  if (stored && stored !== key) return { ok: false, error: 'That is not the setup password for this sheet.' };
  return { ok: true, first: !stored };
}

// Pure: the Setup tab's grid → the app's config.
function setupFromValues(values) {
  var cfg = { title: '', farms: [], crops: [], pests: [], severity: [], distribution: [],
    showCrop: true, showPhotos: true, showGps: true, showNotes: true };
  var farmIx = {};
  var col = function (row, c) { return String(row[c - 1] == null ? '' : row[c - 1]).trim(); };
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var farm = col(row, SETUP_COLS.farm), loc = col(row, SETUP_COLS.location);
    if (farm) {
      if (!(farm in farmIx)) { farmIx[farm] = cfg.farms.length; cfg.farms.push({ name: farm, locations: [] }); }
      if (loc && cfg.farms[farmIx[farm]].locations.indexOf(loc) < 0) cfg.farms[farmIx[farm]].locations.push(loc);
    }
    pushUnique_(cfg.crops, col(row, SETUP_COLS.crop));
    pushUnique_(cfg.pests, col(row, SETUP_COLS.pest));
    pushUnique_(cfg.severity, col(row, SETUP_COLS.severity));
    pushUnique_(cfg.distribution, col(row, SETUP_COLS.distribution));
    var s = col(row, SETUP_COLS.setting).toLowerCase(), v = col(row, SETUP_COLS.value);
    for (var i = 0; i < SETTINGS.length; i++) {
      if (s !== SETTINGS[i][1].toLowerCase()) continue;
      if (SETTINGS[i][0] === 'title') cfg.title = v;
      else cfg[SETTINGS[i][0]] = !/^(no|false|off|0)$/i.test(v);
    }
  }
  if (!cfg.severity.length) cfg.severity = DEFAULT_SEVERITY.slice();
  if (!cfg.distribution.length) cfg.distribution = DEFAULT_DISTRIBUTION.slice();
  return cfg;
}

// Pure: the app's config → the Setup tab's grid (13 columns, header row first).
function setupToValues(cfg) {
  var farmRows = [];
  (cfg.farms || []).forEach(function (f) {
    var locs = (f.locations && f.locations.length) ? f.locations : [''];
    locs.forEach(function (l) { farmRows.push([f.name, l]); });
  });
  var settings = SETTINGS.map(function (s) {
    var v = cfg[s[0]];
    return [s[1], s[0] === 'title' ? (v || '') : (v === false ? 'No' : 'Yes')];
  });
  var lists = {};
  lists[SETUP_COLS.crop] = cfg.crops || [];
  lists[SETUP_COLS.pest] = cfg.pests || [];
  lists[SETUP_COLS.severity] = (cfg.severity && cfg.severity.length) ? cfg.severity : DEFAULT_SEVERITY;
  lists[SETUP_COLS.distribution] = (cfg.distribution && cfg.distribution.length) ? cfg.distribution : DEFAULT_DISTRIBUTION;
  var n = Math.max(farmRows.length, settings.length, lists[4].length, lists[6].length, lists[8].length, lists[10].length);
  var out = [];
  var head = [];
  for (var c = 1; c <= 13; c++) head.push(SETUP_HEADERS[c] || '');
  out.push(head);
  for (var r = 0; r < n; r++) {
    var row = [];
    for (var k = 0; k < 13; k++) row.push('');
    if (farmRows[r]) { row[0] = safe_(farmRows[r][0]); row[1] = safe_(farmRows[r][1]); }
    [4, 6, 8, 10].forEach(function (cc) { if (lists[cc][r] != null) row[cc - 1] = safe_(lists[cc][r]); });
    if (settings[r]) { row[11] = settings[r][0]; row[12] = safe_(settings[r][1]); }
    out.push(row);
  }
  return out;
}

/* ── small helpers ────────────────────────────────────────────────────── */

function ensureSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

// Anything typed that starts like a formula is written as text, never run.
function safe_(v) {
  var s = v == null ? '' : String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
function num_(v) { var n = Number(v); return (v === '' || v == null || isNaN(n)) ? '' : n; }
function pushUnique_(list, v) { if (v && list.indexOf(v) < 0) list.push(v); }
function getKey_() { return PropertiesService.getScriptProperties().getProperty('SETUP_KEY') || ''; }
function setKey_(k) { PropertiesService.getScriptProperties().setProperty('SETUP_KEY', k); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
