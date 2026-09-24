const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');

const server = http.createServer((req, res) => {
  // Handle API contact endpoint
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        let payload = {};
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
          payload = JSON.parse(body || '{}');
        } else {
          const params = new URLSearchParams(body);
          for (const [k, v] of params.entries()) { payload[k] = v; }
        }

        const submission = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          recipient: 'sorconnect@gmail.com',
          name: payload.name || '',
          mobile: payload.mobile || '',
          email: payload.email || '',
          address: payload.address || '',
          site_size: payload.site_size || '',
          message: payload.message || '',
          subject: payload.subject || 'New Website Inquiry - Sor Connect',
          source_url: req.headers.referer || 'Sor Connect Website'
        };

        // Persist to local submissions log
        let submissions = [];
        if (fs.existsSync(SUBMISSIONS_FILE)) {
          try {
            submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8') || '[]');
          } catch (e) { submissions = []; }
        }
        submissions.push(submission);
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

        console.log(`[CONTACT API] New submission received from ${submission.name} (${submission.mobile}). Persisted to submissions.json.`);

        // Forward to Web3Forms if key is present in env or fallback
        const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
        if (web3Key) {
          const https = require('https');
          const postData = JSON.stringify({
            access_key: web3Key,
            from_name: 'Sor Connect Website',
            subject: submission.subject,
            name: submission.name,
            email: submission.email || 'no-reply@sorconnect.com',
            mobile: submission.mobile,
            message: `Name: ${submission.name}\nMobile: ${submission.mobile}\nEmail: ${submission.email}\nAddress/Size: ${submission.address || submission.site_size}\nMessage: ${submission.message}\nTimestamp: ${submission.timestamp}`
          });

          const postReq = https.request('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          }, (postRes) => {
            console.log(`[CONTACT API] Web3Forms relay status: ${postRes.statusCode}`);
          });
          postReq.on('error', err => console.error('[CONTACT API] Web3Forms relay error:', err.message));
          postReq.write(postData);
          postReq.end();
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: 'Thank you! Your message has been received.' }));
      } catch (err) {
        console.error('[CONTACT API] Error processing submission:', err);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, message: 'Server error processing request.' }));
      }
    });
    return;
  }

  // Strip query parameters and hash anchors
  let urlPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(__dirname, urlPath);

  // If path is a directory, look for index.html
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    console.log(`${req.method} ${req.url} -> Serving: ${filePath}`);

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          // If the file is not found and has no extension, try appending .html
          if (!path.extname(filePath)) {
            const fallbackPath = filePath + '.html';
            console.log(`  File not found. Trying fallback: ${fallbackPath}`);
            fs.readFile(fallbackPath, (fallbackError, fallbackContent) => {
              if (!fallbackError) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(fallbackContent);
              } else {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
              }
            });
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1>', 'utf-8');
          }
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Internal Server Error: ' + error.code);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
