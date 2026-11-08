const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const ROOT_DIR = __dirname;

// Comprehensive MIME Type Registry
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.flac': 'audio/flac',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

// Global Enterprise Security Headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' https: data: blob:; media-src 'self' https: data: blob:; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self';",
  'Server': 'AURA-Secure-Gateway/2026.1',
  'Access-Control-Allow-Origin': '*'
};

// In-Memory IP Rate Limiter (Sliding 60-second window, max 200 reqs/min per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 200;

// Periodic cleanup of stale rate-limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.resetTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip) {
  const now = Date.now();
  let record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(ip, record);
    return true;
  }
  record.count++;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  return true;
}

const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Apply Rate Limiting
  if (!checkRateLimit(clientIp)) {
    res.writeHead(429, Object.assign({}, SECURITY_HEADERS, {
      'Content-Type': 'application/json; charset=utf-8',
      'Retry-After': '60'
    }));
    res.end(JSON.stringify({
      error: '429 Too Many Requests',
      message: 'Lưu lượng truy cập vượt quá giới hạn an toàn. Vui lòng thử lại sau 60 giây.',
      status: 'BLOCKED_BY_RATE_LIMITER'
    }));
    return;
  }

  // Normalize URL
  let parsedUrl = req.url.split('?')[0];
  if (parsedUrl === '/' || parsedUrl === '') {
    parsedUrl = '/index.html';
  }

  // Block hidden/sensitive paths (.git, .env, .system_generated, etc.)
  if (parsedUrl.includes('/.') || parsedUrl.includes('\\.')) {
    res.writeHead(403, Object.assign({}, SECURITY_HEADERS, { 'Content-Type': 'text/plain; charset=utf-8' }));
    res.end('403 Forbidden: Truy cập tệp ẩn bị từ chối');
    return;
  }

  const filePath = path.resolve(ROOT_DIR, '.' + decodeURIComponent(parsedUrl));

  // Security: prevent path traversal attacks
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, Object.assign({}, SECURITY_HEADERS, { 'Content-Type': 'text/plain; charset=utf-8' }));
    res.end('403 Forbidden: Phát hiện vi phạm đường dẫn');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client-side hash routes if needed
      fs.readFile(path.join(ROOT_DIR, 'index.html'), (e, fallbackContent) => {
        if (!e) {
          res.writeHead(200, Object.assign({}, SECURITY_HEADERS, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache'
          }));
          res.end(fallbackContent);
        } else {
          res.writeHead(404, Object.assign({}, SECURITY_HEADERS, { 'Content-Type': 'text/plain; charset=utf-8' }));
          res.end('404 Not Found');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, Object.assign({}, SECURITY_HEADERS, { 'Content-Type': 'text/plain; charset=utf-8' }));
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, Object.assign({}, SECURITY_HEADERS, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
      }));
      res.end(content);
    });
  });
});

let currentPort = parseInt(process.env.PORT, 10) || 3000;

function startServer(port) {
  server.listen(port, '127.0.0.1', () => {
    const url = `http://localhost:${port}`;
    console.log(`====================================================`);
    console.log(`🚀 AURA ONE 3D Enterprise Server running at: ${url}`);
    console.log(`🛡️  Security Headers & Rate Limiting: ACTIVE`);
    console.log(`====================================================`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${currentPort} is in use, trying next port ${currentPort + 1}...`);
    currentPort++;
    startServer(currentPort);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);