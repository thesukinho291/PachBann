import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, 'dist');

loadEnvFile();

const port = Number(process.env.PORT || 3000);

const apiHandlers = new Map([
  ['/api/admin-login', './api/admin-login.js'],
  ['/api/admin-logout', './api/admin-logout.js'],
  ['/api/admin-me', './api/admin-me.js'],
  ['/api/leads', './api/leads.js'],
  ['/api/site-content', './api/site-content.js'],
]);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/health') {
      return sendJson(res, 200, { ok: true });
    }

    if (apiHandlers.has(url.pathname)) {
      return handleApi(req, res, apiHandlers.get(url.pathname));
    }

    return serveStatic(url.pathname, res);
  } catch (error) {
    console.error('Erro no servidor:', error);
    return sendJson(res, 500, { error: 'Erro interno' });
  }
}).listen(port, () => {
  console.log(`PachBann rodando em http://localhost:${port}`);
});

async function handleApi(req, res, handlerPath) {
  patchResponse(res);
  req.body = await readBody(req);

  const handlerUrl = pathToFileURL(resolve(__dirname, handlerPath)).href;
  const { default: handler } = await import(`${handlerUrl}?t=${Date.now()}`);
  return handler(req, res);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) return undefined;
  const raw = Buffer.concat(chunks).toString('utf8');
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      return {};
    }
  }

  return raw;
}

function patchResponse(res) {
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  res.json = (data) => {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    res.end(JSON.stringify(data));
    return res;
  };
}

async function serveStatic(pathname, res) {
  const requestedPath = pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
  const filePath = resolve(distDir, normalize(requestedPath).replace(/^[/\\]+/, ''));

  if (!filePath.startsWith(distDir)) {
    return sendText(res, 403, 'Forbidden');
  }

  try {
    const content = await readFile(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream');
    res.end(content);
  } catch {
    const fallback = join(distDir, 'index.html');
    if (existsSync(fallback)) {
      const content = await readFile(fallback);
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeTypes['.html']);
      return res.end(content);
    }

    return sendText(res, 404, 'Not found');
  }
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

function sendText(res, statusCode, text) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(text);
}

function loadEnvFile() {
  const envPath = resolve(__dirname, '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}
