/* fsdbg/parser.js — Parser para logs fsdbg de almacenamiento
 * Formatos: m0_history (storage), u_history (UIC), ulc_history (ULC), us_history (US)
 * Expone: window.FSDBG.parse(text), window.FSDBG.summarize(parsed), window.FSDBG.detectType(text)
 */
(function (global) {
  'use strict';

  var FLAGS = ['GE','CC','ECC','WP','OOR','CRC','TMO','HALT','CQEN','RPMB'];

  function detectType(text) {
    var t = String(text || '').trim();
    if (!t) return 'unknown';
    if (/^H4sIAAAAAAAAA/.test(t)) return 'raw';
    if (/^type\s*:\s*err/m.test(t)) return 'm0';
    if (/"OPERR"/.test(t)) return 'u';
    if (/"MEDIUM"/.test(t)) return 'us';
    if (/\[\d+\]\s*-\s*fsdbg\s*:[\s\S]*?\n\s*\d+\s*$/m.test(t)) return 'ulc';
    return 'unknown';
  }

  function splitBlocks(text) {
    var lines = String(text || '').split(/\r?\n/);
    var blocks = [];
    var cur = null;
    for (var i = 0; i < lines.length; i++) {
      var m = lines[i].match(/^\[(\d+)\]\s*-\s*fsdbg\s*:\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
      if (m) {
        if (cur) blocks.push(cur);
        cur = { index: parseInt(m[1], 10), timestamp: m[2], lines: [] };
      } else if (cur) {
        cur.lines.push(lines[i]);
      }
    }
    if (cur) blocks.push(cur);
    return blocks;
  }

  function parseM0(block) {
    var ev = { index: block.index, timestamp: block.timestamp, type: 'm0', flags: {}, errors: [] };
    var text = block.lines.join('\n');
    var reData = /^\s*(\w+)\s*:?\s*(-?\d+)\s+(0x[0-9a-fA-F]+)\s+(\d+),\s+(\d+),\s+(\d+)/gm;
    var m;
    while ((m = reData.exec(text)) !== null) {
      var count = parseInt(m[6], 10);
      if (count > 0) {
        ev.errors.push({
          kind: m[1],
          code: parseInt(m[2], 10),
          status: m[3],
          first: parseInt(m[4], 10),
          last: parseInt(m[5], 10),
          count: count
        });
      }
    }
    var fm = /^GE:(\d+),CC:(\d+),ECC:(\d+),WP:(\d+),OOR:(\d+),CRC:(\d+),TMO:(\d+),HALT:(\d+),CQEN:(\d+),RPMB:(\d+)/m.exec(text);
    if (fm) {
      for (var i = 0; i < FLAGS.length; i++) ev.flags[FLAGS[i]] = parseInt(fm[i + 1], 10);
    }
    return ev;
  }

  function parseKV(block, type) {
    var ev = { index: block.index, timestamp: block.timestamp, type: type, data: {} };
    var text = block.lines.join('\n');
    var re = /"([A-Z]+)":"(\d+)"/g;
    var m;
    while ((m = re.exec(text)) !== null) ev.data[m[1]] = parseInt(m[2], 10);
    return ev;
  }

  function parseULC(block) {
    var ev = { index: block.index, timestamp: block.timestamp, type: 'ulc', value: null };
    for (var i = 0; i < block.lines.length; i++) {
      var v = block.lines[i].trim();
      if (/^-?\d+$/.test(v)) { ev.value = parseInt(v, 10); break; }
    }
    return ev;
  }

  function parse(text) {
    var type = detectType(text);
    var blocks = splitBlocks(text);
    var events = [];
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (type === 'm0') events.push(parseM0(b));
      else if (type === 'u') events.push(parseKV(b, 'u'));
      else if (type === 'us') events.push(parseKV(b, 'us'));
      else if (type === 'ulc') events.push(parseULC(b));
      else events.push({ index: b.index, timestamp: b.timestamp, type: type });
    }
    return { type: type, events: events };
  }

  function summarize(parsed) {
    var s = { type: parsed.type, total: parsed.events.length, anomalous: 0, flagTotals: {}, first: null, last: null };
    for (var i = 0; i < parsed.events.length; i++) {
      var e = parsed.events[i];
      if (!s.first) s.first = e.timestamp;
      s.last = e.timestamp;
      var bad = false;
      if (e.type === 'm0') {
        for (var k in e.flags) {
          s.flagTotals[k] = (s.flagTotals[k] || 0) + e.flags[k];
          if (e.flags[k] > 0) bad = true;
        }
        if (e.errors.length) bad = true;
      } else if (e.type === 'u' || e.type === 'us') {
        for (var k2 in e.data) if (e.data[k2] > 0) bad = true;
      } else if (e.type === 'ulc') {
        if (e.value && e.value > 0) bad = true;
      }
      if (bad) s.anomalous++;
    }
    return s;
  }

  global.FSDBG = {
    parse: parse,
    summarize: summarize,
    detectType: detectType,
    FLAGS: FLAGS
  };
})(typeof window !== 'undefined' ? window : this);