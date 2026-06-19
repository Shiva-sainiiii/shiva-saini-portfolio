import http from 'http';
import { default as handler } from './api/ask.js';

const PORT = 3001;
const HOST = '0.0.0.0';

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/ask') {
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
    const mockRes = {
      _status: 200,
      _headers: {},
      status(code) { this._status = code; return this; },
      setHeader(k, v) { this._headers[k] = v; },
      json(data) {
        res.writeHead(this._status, {
          'Content-Type': 'application/json',
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
});

server.listen(PORT, HOST, () => {
  console.log(`API server running at http://${HOST}:${PORT}`);
});
