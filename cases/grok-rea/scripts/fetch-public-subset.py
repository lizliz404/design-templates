#!/usr/bin/env python3
"""Re-download the documented public cdn.grok.com subset into evidence/grok-com-app.

Read-only: GET of already-listed immutable static assets. Does not write cookies
or request robots-disallowed paths. Run from the case root:

    python3 scripts/fetch-public-subset.py
"""
from __future__ import annotations

import hashlib
import json
import urllib.request
from pathlib import Path

CASE = Path(__file__).resolve().parents[1]
EV = CASE / "evidence"
LIST = EV / "urlscan" / "subset-urls.txt"
APP = EV / "grok-com-app"
OUT = EV / "urlscan" / "subset-hashes.json"
UA = (
    "Mozilla/5.0 (compatible; design-templates-grok-rea/2026-11-18; "
    "+https://github.com/lizliz404/design-templates)"
)

# Icon sprites are hashed in subset-hashes.json but only optionally vendored.
SKIP_SUBSTRINGS = ("/media/icons-",)


def main() -> None:
    urls = [
        u.strip()
        for u in LIST.read_text().splitlines()
        if u.startswith("https://cdn.grok.com/_")
        and not any(s in u for s in SKIP_SUBSTRINGS)
    ]
    records = []
    for url in urls:
        rel = url.split("https://cdn.grok.com/", 1)[1]
        dest = APP / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
            rec = {
                "url": url,
                "path": str(dest.relative_to(EV)),
                "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(),
                "status": resp.status,
                "content_type": resp.headers.get("Content-Type", ""),
                "last_modified": resp.headers.get("Last-Modified", ""),
                "etag": resp.headers.get("ETag", ""),
            }
        dest.write_bytes(data)
        records.append(rec)
        print(f"OK {rec['bytes']:8} {rec['sha256'][:12]} {rel}")
    OUT.write_text(json.dumps(records, indent=2) + "\n")
    print(f"wrote {len(records)} records to evidence/urlscan/subset-hashes.json")


if __name__ == "__main__":
    main()
