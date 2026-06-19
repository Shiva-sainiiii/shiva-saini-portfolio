import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const HOST = '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webp': 'image/webp',
};

async function handleApiAsk(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed.' }));
    return;
  }

  let body = '';
  await new Promise((resolve) => {
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', resolve);
  });

  try {
    const reqBody = JSON.parse(body || '{}');
    const { default: handler } = await import('./api/ask.js');

    const mockRes = {
      _status: 200,
      _headers: {},
      status(code) { this._status = code; return this; },
      setHeader(k, v) { this._headers[k] = v; },
      json(data) {
        res.writeHead(this._status, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          ...this._headers,
        });
        res.end(JSON.stringify(data));
      },
      end() {
        res.writeHead(this._status, this._headers);
        res.end();
      }
    };

    await handler({ method: req.method, body: reqBody }, mockRes);
  } catch (err) {
    console.error('API error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server error: ' + err.message }));
  }
}

const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/api/ask') {
    return handleApiAsk(req, res);
  }

  const distDir = path.join(__dirname, 'dist');
  let filePath = path.join(distDir, url === '/' ? 'index.html' : url);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Portfolio server running at http://${HOST}:${PORT}`);
});
