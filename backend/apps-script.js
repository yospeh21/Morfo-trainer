/**
 * MORFO-TRAINER — backend en Google Apps Script (v6, agrega listProfiles)
 */

var PERFILES_HEADERS = ['code','name','progress','timers','saved','updated_at'];
var RESULTADOS_HEADERS = ['code','name','timestamp','overall','totalCorrect','totalQ','rows','boss'];
var ESTUDIANTES_HEADERS = ['code','name'];

// 🔒 Tu clave de monitor (conserva la misma que ya tenías)
var MONITOR_PASSWORD = 'cambia-esta-clave';

function doGet(e) {
  try {
    var action = e.parameter.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === 'ping') {
      return jsonOut({ ok: true, message: 'MORFO-TRAINER backend activo' });
    }
    if (action === 'lookupName') {
      var esheet = getOrCreateSheet(ss, 'Estudiantes', ESTUDIANTES_HEADERS);
      var erow = findRowByCode(esheet, e.parameter.code || '');
      return jsonOut({ ok: true, name: erow ? erow.name : null });
    }
    if (action === 'getProfile') {
      var sheet = getOrCreateSheet(ss, 'Perfiles', PERFILES_HEADERS);
      var row = findRowByCode(sheet, e.parameter.code || '');
      return jsonOut({ ok: true, profile: row });
    }
    if (action === 'listResults') {
      if ((e.parameter.pass || '') !== MONITOR_PASSWORD) {
        return jsonOut({ ok: false, error: 'Clave de monitor incorrecta.' });
      }
      var sheet2 = getOrCreateSheet(ss, 'Resultados', RESULTADOS_HEADERS);
      return jsonOut({ ok: true, results: allRows(sheet2) });
    }
    if (action === 'listProfiles') {
      if ((e.parameter.pass || '') !== MONITOR_PASSWORD) {
        return jsonOut({ ok: false, error: 'Clave de monitor incorrecta.' });
      }
      var sheet3 = getOrCreateSheet(ss, 'Perfiles', PERFILES_HEADERS);
      return jsonOut({ ok: true, profiles: allRows(sheet3) });
    }
    return jsonOut({ ok: false, error: 'acción GET no reconocida: ' + action });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (body.action === 'saveProfile') {
      var sheet = getOrCreateSheet(ss, 'Perfiles', PERFILES_HEADERS);
      upsertByCode(sheet, PERFILES_HEADERS, {
        code: body.code, name: body.name,
        progress: JSON.stringify(body.progress || {}),
        timers: JSON.stringify(body.timers || {}),
        saved: body.saved ? 'TRUE' : 'FALSE',
        updated_at: new Date().toISOString()
      });
      return jsonOut({ ok: true });
    }
    if (body.action === 'saveResult') {
      var sheet2 = getOrCreateSheet(ss, 'Resultados', RESULTADOS_HEADERS);
      upsertByCode(sheet2, RESULTADOS_HEADERS, {
        code: body.code, name: body.name, timestamp: body.timestamp,
        overall: body.overall, totalCorrect: body.totalCorrect, totalQ: body.totalQ,
        rows: JSON.stringify(body.rows || []),
        boss: JSON.stringify(body.boss || null)
      });
      return jsonOut({ ok: true });
    }
    return jsonOut({ ok: false, error: 'acción POST no reconocida: ' + body.action });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) { sheet = ss.insertSheet(name); sheet.appendRow(headers); return sheet; }
  if (sheet.getLastRow() === 0) { sheet.appendRow(headers); return sheet; }
  var width = Math.max(sheet.getLastColumn(), headers.length);
  var current = sheet.getRange(1, 1, 1, width).getValues()[0];
  var matches = headers.every(function(h, i){ return current[i] === h; });
  if (!matches) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}
function findRowByCode(sheet, code) {
  if (sheet.getLastRow() < 2) return null;
  var data = sheet.getDataRange().getValues();
  var headers = data[0], codeIdx = headers.indexOf('code');
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][codeIdx]) === String(code)) {
      var obj = {}; headers.forEach(function(h, idx){ obj[h] = data[i][idx]; });
      return obj;
    }
  }
  return null;
}
function allRows(sheet) {
  if (sheet.getLastRow() < 2) return [];
  var data = sheet.getDataRange().getValues(), headers = data[0], out = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {}; headers.forEach(function(h, idx){ obj[h] = data[i][idx]; });
    out.push(obj);
  }
  return out;
}
function upsertByCode(sheet, headers, dataObj) {
  var rowValues = headers.map(function(h){ return dataObj[h] !== undefined ? dataObj[h] : ''; });
  if (sheet.getLastRow() < 2) { sheet.appendRow(rowValues); return; }
  var data = sheet.getDataRange().getValues();
  var codeIdx = headers.indexOf('code'), rowIdx = -1;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][codeIdx]) === String(dataObj.code)) { rowIdx = i + 1; break; }
  }
  if (rowIdx === -1) sheet.appendRow(rowValues);
  else sheet.getRange(rowIdx, 1, 1, rowValues.length).setValues([rowValues]);
}
function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
