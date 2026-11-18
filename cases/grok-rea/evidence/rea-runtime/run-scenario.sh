#!/usr/bin/env bash
# Run one scenario, report step statuses + evidence id
set -u
name="$1"
rea capture-browser-scenario "scenarios/$name.json" --format json > "out-$name.json" 2> "err-$name.log" || true
python3 - "$name" <<'PY'
import json,sys
name=sys.argv[1]
try: d=json.load(open(f'out-{name}.json'))
except Exception as e: print(name,'PARSE FAIL',e); sys.exit(0)
if d.get('error'):
    print(name,'ERROR:',str(d.get('error'))[:300]); sys.exit(0)
n=d.get('normalized_result',{})
print(name,'evidence_id:',d.get('evidence_id'))
for s in n.get('steps',[]):
    st=s.get('status'); e=s.get('error')
    print(f"  {s.get('step_id'):24} {st} {str(e)[:120] if e else ''}")
comp=n.get('completeness',{})
print('  completeness:',comp.get('status'),'truncated:',comp.get('truncated_sections'),'unavailable:',comp.get('unavailable_sections'))
PY
