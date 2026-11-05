import json, base64, sys, os, re

src, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
d = json.load(open(src))
steps = d['normalized_result']['steps']
manifest = []
for s in steps:
    sid = s['step_id']
    arts = s.get('artifacts', {})
    url = (s.get('after_url') or {}).get('url', '')
    entry = {'step_id': sid, 'url': url}
    for kind, art in arts.items():
        if not isinstance(art, dict): continue
        v = art.get('value')
        st = art.get('state')
        if st != 'captured' or v is None: 
            entry[kind] = st; continue
        if kind == 'screenshot' and isinstance(v, dict) and 'data_base64' in v:
            fn = f'{sid}.png'
            open(os.path.join(outdir, fn), 'wb').write(base64.b64decode(v['data_base64']))
            entry[kind] = fn
        elif kind == 'dom' and isinstance(v, dict):
            # guess structure
            txt = v.get('html') or v.get('text') or json.dumps(v)
            fn = f'{sid}-dom.html'
            open(os.path.join(outdir, fn), 'w').write(txt if isinstance(txt, str) else json.dumps(txt))
            entry[kind] = fn
        elif kind == 'accessibility':
            fn = f'{sid}-a11y.json'
            open(os.path.join(outdir, fn), 'w').write(json.dumps(v, indent=1) if not isinstance(v, str) else v)
            entry[kind] = fn
        elif kind == 'url':
            entry[kind] = v
        else:
            fn = f'{sid}-{kind}.json'
            open(os.path.join(outdir, fn), 'w').write(json.dumps(v, indent=1) if not isinstance(v, str) else v)
            entry[kind] = fn
    manifest.append(entry)
json.dump(manifest, open(os.path.join(outdir, 'manifest.json'), 'w'), indent=1)
print('extracted', len(manifest), 'steps to', outdir)
