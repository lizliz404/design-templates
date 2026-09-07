#!/usr/bin/env python3
"""Verify pinned files/import closure; optionally compare live Copy code payloads."""
import argparse, hashlib, json, re, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def digest(data):
    return hashlib.sha256(data).hexdigest()
def run(live=False):
    manifest = json.loads((ROOT / 'manifest.json').read_text())
    snapshot = ROOT / manifest['snapshot']
    actual = {str(p.relative_to(snapshot)) for p in snapshot.rglob('*') if p.is_file()}
    assert actual == set(manifest['files']), 'snapshot file inventory changed'
    for file, expected in manifest['files'].items():
        assert digest((snapshot / file).read_bytes()) == expected, file
    for asset in manifest['external_assets']:
        assert digest((ROOT / asset['path']).read_bytes()) == asset['sha256'], asset['path']
    components = manifest['components']
    assert len(components) == len({x['id'] for x in components}) == 21
    meta = (snapshot / 'lib/meta.ts').read_text()
    assert re.findall(r'    id: "([^"]+)"', meta) == [x['id'] for x in components]
    package = json.loads((snapshot / 'package.json').read_text())
    npm = set(package['dependencies']) | set(package['devDependencies'])
    for file in [*snapshot.rglob('*.tsx'), *snapshot.rglob('*.ts')]:
        for spec in re.findall(r'^import\s+(?:[\s\S]*?\sfrom\s+)?[\"\x27]([^\"\x27]+)[\"\x27]', file.read_text(), re.M):
            if spec.startswith('node:'): continue
            if spec.startswith(('@/', '.')):
                base = snapshot / spec[2:] if spec.startswith('@/') else file.parent / spec
                assert any(p.is_file() for p in [base, Path(str(base)+'.ts'), Path(str(base)+'.tsx'), Path(str(base)+'.js'), base/'index.ts', base/'index.tsx']), (file, spec)
            else:
                name = '/'.join(spec.split('/')[:2]) if spec.startswith('@') else spec.split('/')[0]
                assert name in npm, (file, spec)
    if live:
        html = urllib.request.urlopen('https://www.beautifului.dev/', timeout=30).read().decode()
        chunks = [json.loads(m[1]) for m in re.finditer(r'self\.__next_f\.push\((\[.*?\])\)</script>', html)]
        flight = ''.join(x[1] for x in chunks if x[0] == 1).encode()
        mapping = json.loads(re.search(rb'"sources":(\{[^}]+\})', flight)[1])
        assert set(mapping) == {x['id'] for x in components}, 'live inventory changed'
        for component in components:
            ref = mapping[component['id']][1:].encode()
            record = re.search(rb'(?:^|\n)' + ref + rb':T([0-9a-f]+),', flight)
            assert record, component['id']
            source = flight[record.end():record.end()+int(record[1], 16)]
            assert source == (ROOT / component['path']).read_bytes(), component['id']
    print(f"PASS: {len(manifest['files'])} pinned files, 21/21 primitives, local imports and npm declarations, {len(manifest['external_assets'])} external assets" + ('; 21/21 live Copy code payloads match' if live else ''))
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--live', action='store_true')
    run(parser.parse_args().live)
