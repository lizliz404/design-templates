// CDP Runtime.evaluate helper: node cdp-eval.mjs <wsUrl> <exprFile> <outFile>
import { readFileSync, writeFileSync } from 'node:fs';

const [wsUrl, exprFile, outFile] = process.argv.slice(2);
const expr = readFileSync(exprFile, 'utf8');

const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
}
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};
await new Promise((r) => (ws.onopen = r));
await send('Runtime.enable');
const res = await send('Runtime.evaluate', {
  expression: expr,
  returnByValue: true,
  awaitPromise: true,
  timeout: 60000,
});
if (res.exceptionDetails) {
  console.error('EXCEPTION', JSON.stringify(res.exceptionDetails).slice(0, 2000));
  process.exit(1);
}
writeFileSync(outFile, JSON.stringify(res.result.value, null, 1));
console.log('wrote', outFile, typeof res.result.value);
ws.close();
process.exit(0);
