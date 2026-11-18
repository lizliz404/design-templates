#!/usr/bin/env python3
import json,base64,sys,os
name=sys.argv[1]
d=json.load(open(f'out-{name}.json'))
n=d.get('normalized_result',{})
os.makedirs(f'shots-{name}',exist_ok=True)
def save_artifacts(prefix, arts):
    if not isinstance(arts,dict): return
    for kind,a in arts.items():
        if not isinstance(a,dict): continue
        v=a.get('value')
        if kind=='screenshot' and isinstance(v,dict) and v.get('data_base64'):
            open(f'{prefix}.png','wb').write(base64.b64decode(v['data_base64']))
        elif kind in ('accessibility','dom') and isinstance(v,(dict,)):
            t=v.get('text') or v.get('html')
            if t: open(f'{prefix}.{kind}.txt','w').write(t)
        elif kind=='url' and isinstance(v,dict):
            open(f'{prefix}.url.txt','w').write(str(v.get('url')))
for s in n.get('steps',[]):
    sid=s.get('step_id')
    save_artifacts(f'shots-{name}/{sid}', s.get('artifacts'))
    print(sid,'arts:',list((s.get('artifacts') or {}).keys()),'state:',{k:v.get('state') for k,v in (s.get('artifacts') or {}).items() if isinstance(v,dict)})
# scenario-level final artifacts
for key in ('final','at_end','end_state'):
    v=n.get(key)
    if isinstance(v,dict):
        print('FINAL block keys:',list(v.keys()))
        if 'artifacts' in v: save_artifacts(f'shots-{name}/_final', v['artifacts'])
