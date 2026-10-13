import re
import csv
from datetime import datetime
from pathlib import Path

# Patrones del log
RE_TS = re.compile(r'^\[(\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+)\]')
RE_GOOD = re.compile(r'Good Link.*RSSI:(-?\d+).*AP:(##:##:##:##:[0-9a-f:]+)')
RE_POOR = re.compile(r'Poor Link.*RSSI:(-?\d+)\s+AP:(##:##:##:##:[0-9a-f:]+)')
RE_CONN = re.compile(r'Connecting event.*new AP:(##:##:##:##:[0-9a-f:]+)')
RE_DISCONN = re.compile(r'Auto Disconnection.*RSSI=(-?\d+).*Old AP=(##:##:##:##:[0-9a-f:]+)')
RE_FOREGROUND = re.compile(r'Foreground package,:\s+(\S+)')
RE_QTAB = re.compile(r'Qtable Dump: < (##:##:##:##:[0-9a-f:]+) - ([\d.]+) ([\d.]+) ([\d.]+) >')
RE_QTAB_ACTION = re.compile(r'Q-Table: \[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+);.*Action Taken: (\d+)')

def parse_line(line):
    ts_match = RE_TS.match(line)
    if not ts_match:
        return None
    ts = ts_match.group(1)
    rest = line[ts_match.end():].strip()

    if m := RE_GOOD.search(rest):
        return {"ts": ts, "type": "good_link", "rssi": int(m.group(1)), "bssid": m.group(2)}
    if m := RE_POOR.search(rest):
        return {"ts": ts, "type": "poor_link", "rssi": int(m.group(1)), "bssid": m.group(2)}
    if m := RE_CONN.search(rest):
        return {"ts": ts, "type": "connect", "bssid": m.group(1)}
    if m := RE_DISCONN.search(rest):
        return {"ts": ts, "type": "disconnect", "rssi": int(m.group(1)), "bssid": m.group(2)}
    if m := RE_FOREGROUND.search(rest):
        return {"ts": ts, "type": "app", "app": m.group(1)}
    if m := RE_QTAB.search(rest):
        return {"ts": ts, "type": "qtable", "bssid": m.group(1),
                "q0": float(m.group(2)), "q1": float(m.group(3)), "q2": float(m.group(4))}
    return None

def parse_file(path):
    events = []
    with open(path, encoding='utf-8', errors='ignore') as f:
        for line in f:
            ev = parse_line(line)
            if ev:
                events.append(ev)
    return events

if __name__ == "__main__":
    all_events = []
    for p in Path("data/raw").glob("*.txt"):
        all_events.extend(parse_file(p))

    out = Path("data/processed/events.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    keys = ["ts", "type", "bssid", "rssi", "app", "q0", "q1", "q2"]
    with out.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore')
        w.writeheader()
        w.writerows(all_events)

    print(f"OK: {len(all_events)} eventos → {out}")