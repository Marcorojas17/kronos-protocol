#!/usr/bin/env python3
import sys, hashlib, urllib.request, urllib.error
from pathlib import Path

CALENDARS = [
    "https://a.pool.opentimestamps.org",
    "https://b.pool.opentimestamps.org",
    "https://finney.calendar.eternitywall.com",
]

def submit(commit_path: Path) -> Path:
    data = commit_path.read_bytes().strip()
    digest = hashlib.sha256(data).digest()
    for cal in CALENDARS:
        url = f"{cal}/digest"
        req = urllib.request.Request(
            url, data=digest, method="POST",
            headers={"Content-Type": "application/x-www-form-urlencoded",
                     "Accept": "application/vnd.opentimestamps.v1"},
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                proof = r.read()
            out = commit_path.with_suffix(commit_path.suffix + ".ots")
            out.write_bytes(proof)
            print(f"  [OK] {cal}")
            print(f"  proof: {out}")
            return out
        except urllib.error.HTTPError as e:
            print(f"  [--] {cal} → HTTP {e.code}")
        except Exception as e:
            print(f"  [--] {cal} → {e}")
    print("  [XX] ningún calendario respondió")
    sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("uso: ots-http.py <archivo.commit>"); sys.exit(2)
    submit(Path(sys.argv[1]))
