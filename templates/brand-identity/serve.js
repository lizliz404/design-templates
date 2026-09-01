const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname;
const PORT = Number(process.argv[2] || 8321);
const MIME = { '.svg': 'image/svg+xml', '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.js': 'text/javascript', '.md': 'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  const f = path.join(ROOT, rel === '/' ? 'probe.html' : rel.slice(1));
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
}).listen(PORT, () => console.log('up on ' + PORT));
