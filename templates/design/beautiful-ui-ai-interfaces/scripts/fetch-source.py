#!/usr/bin/env python3
"""Download the pinned archive into a NEW destination and verify every source hash."""
import argparse, hashlib, io, json, tarfile, urllib.request
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('destination', type=Path)
args = parser.parse_args()
assert not args.destination.exists(), 'destination must not exist; never overwrite the preserved snapshot'
man = json.loads((ROOT/'manifest.json').read_text())
archive = urllib.request.urlopen(man['archive_url'], timeout=45).read()
assert hashlib.sha256(archive).hexdigest() == man['archive_sha256'], 'archive drift; inspect before updating'
with tarfile.open(fileobj=io.BytesIO(archive), mode='r:gz') as tar:
    blobs = {}
    for member in tar.getmembers():
        if not member.isfile(): continue
        path = '/'.join(Path(member.name).parts[1:])
        assert path in man['files'], path
        data = tar.extractfile(member).read()
        assert hashlib.sha256(data).hexdigest() == man['files'][path], path
        blobs[path] = data
    assert set(blobs) == set(man['files'])
    for path, data in blobs.items():
        target = args.destination/path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
print(f"Verified and extracted {len(blobs)} source files from {man['commit']}")
