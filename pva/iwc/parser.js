/* iwc/parser.js — Parser de logs WiFi IWC
 * Expone: window.IWC.parseLog(text), window.IWC.summarize(events)
 */
(function (global) {
  'use strict';

  var TS_RE = /\[(\d+)\]\s*-\s*fsdbg\s*:\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
  var KV_RE = /([a-z_]+)\s*[=:]\s*(-?[\w:.]+)/gi;

  function parseKV(line) {
    var data = {};
    var m;
    KV_RE.lastIndex = 0;
    while ((m = KV_RE.exec(line)) !== null) {
      var k = m[1].toLowerCase();
      var v = m[2];
      if (/^-?\d+(\.\d+)?$/.test(v)) data[k] = parseFloat(v);
      else data[k] = v;
    }
    return data;
  }

  function parseLog(text) {
    var lines = String(text || '').split(/\r?\n/);
    var events = [];
    var currentTs = null;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;

      var ts = line.match(TS_RE);
      if (ts) { currentTs = ts[2]; continue; }

      var low = line.toLowerCase();
      var kind = 'other';
      if (low.indexOf('good_link') === 0) kind = 'good_link';
      else if (low.indexOf('poor_link') === 0) kind = 'poor_link';
      else if (low.indexOf('net_disconnect') === 0) kind = 'net_disconnect';
      else if (low.indexOf('disconnect') === 0) kind = 'disconnect';
      else if (low.indexOf('connect') === 0) kind = 'connect';
      else if (low.indexOf('app ') === 0) kind = 'app';
      else if (low.indexOf('qtable') === 0) kind = 'qtable';
      else if (low.indexOf('qaction') === 0) kind = 'qaction';

      var ev = { ts: currentTs, kind: kind, raw: line, data: parseKV(line) };
      if (kind === 'app' && !ev.data.app) ev.data.app = line.slice(4).trim();
      events.push(ev);
    }
    return events;
  }

  function summarize(events) {
    var s = { total: events.length, byKind: {}, aps: [], apps: {}, hours: {} };
    var rssiMap = {};
    for (var i = 0; i < events.length; i++) {
      var e = events[i];
      s.byKind[e.kind] = (s.byKind[e.kind] || 0) + 1;
      if (e.data.rssi !== undefined) {
        var bssid = e.data.bssid || 'desconocido';
        if (!rssiMap[bssid]) rssiMap[bssid] = { bssid: bssid, samples: [], min: Infinity, max: -Infinity };
        rssiMap[bssid].samples.push(e.data.rssi);
        if (e.data.rssi < rssiMap[bssid].min) rssiMap[bssid].min = e.data.rssi;
        if (e.data.rssi > rssiMap[bssid].max) rssiMap[bssid].max = e.data.rssi;
      }
      if (e.kind === 'app' && e.data.app) {
        s.apps[e.data.app] = (s.apps[e.data.app] || 0) + 1;
      }
      if (e.ts) {
        var h = e.ts.slice(11, 13);
        s.hours[h] = (s.hours[h] || 0) + 1;
      }
    }
    Object.keys(rssiMap).forEach(function (b) {
      var a = rssiMap[b];
      var avg = a.samples.reduce(function (x, y) { return x + y; }, 0) / a.samples.length;
      s.aps.push({ bssid: a.bssid, avg: Math.round(avg * 10) / 10, min: a.min, max: a.max, samples: a.samples.length });
    });
    s.aps.sort(function (a, b) { return b.avg - a.avg; });
    return s;
  }

  global.IWC = { parseLog: parseLog, summarize: summarize };

})(typeof window !== 'undefined' ? window : this);