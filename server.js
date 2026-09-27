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
const PROJECTS_FILE = path.join(__dirname, 'projects.json');
const CATEGORIES_FILE = path.join(__dirname, 'categories.json');

// Helper to safely read JSON files
function readJsonFile(filePath, defaultVal = []) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content || '[]');
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return defaultVal;
}

// Helper to safely write JSON files
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper to parse POST request body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
          resolve(JSON.parse(body || '{}'));
        } else {
          const params = new URLSearchParams(body);
          const obj = {};
          for (const [k, v] of params.entries()) { obj[k] = v; }
          resolve(obj);
        }
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const urlParts = req.url.split('?');
  const urlPath = urlParts[0].split('#')[0];

  // ==========================================
  // API ENDPOINTS
  // ==========================================

  // 1. Contact submission endpoint (No mail relay - stored directly to database)
  if (req.method === 'POST' && urlPath === '/api/contact') {
    const payload = await parseBody(req);
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: (payload.name || '').trim(),
      whatsapp: (payload.whatsapp || payload.mobile || '').trim(),
      monthly_bill: (payload.monthly_bill || payload.bill || '').trim(),
      pincode: (payload.pincode || payload.pin || '').trim(),
      note: (payload.note || payload.message || '').trim(),
      status: 'New',
      subject: payload.subject || 'Solar Inquiry',
      source_url: req.headers.referer || 'Sor Connect Website'
    };

    const submissions = readJsonFile(SUBMISSIONS_FILE, []);
    submissions.unshift(submission);
    writeJsonFile(SUBMISSIONS_FILE, submissions);

    console.log(`[CONTACT API] New submission saved: ${submission.name} (WA: ${submission.whatsapp}, Bill: ${submission.monthly_bill}, PIN: ${submission.pincode})`);
    sendJson(res, 200, { success: true, message: 'Your request has been submitted successfully.' });
    return;
  }

  // 2. Admin Login endpoint
  if (req.method === 'POST' && urlPath === '/api/admin/login') {
    const payload = await parseBody(req);
    const id = (payload.id || payload.username || '').trim();
    const password = (payload.password || '').trim();

    if (id === 'soconnectadmin' && password === 'adminpqyt@46') {
      const token = 'sorconnect_auth_token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      sendJson(res, 200, {
        success: true,
        message: 'Authentication successful',
        user: { id: 'soconnectadmin', name: 'Sor Connect Administrator' },
        token: token
      });
    } else {
      sendJson(res, 401, {
        success: false,
        message: 'Invalid ID or Password. Please check your credentials.'
      });
    }
    return;
  }

  // 3. Submissions APIs
  if (urlPath === '/api/submissions') {
    if (req.method === 'GET') {
      const submissions = readJsonFile(SUBMISSIONS_FILE, []);
      sendJson(res, 200, { success: true, submissions });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/submissions/status') {
    const payload = await parseBody(req);
    const submissions = readJsonFile(SUBMISSIONS_FILE, []);
    const sub = submissions.find(s => String(s.id) === String(payload.id));
    if (sub) {
      sub.status = payload.status || sub.status;
      writeJsonFile(SUBMISSIONS_FILE, submissions);
      sendJson(res, 200, { success: true, message: 'Status updated', submission: sub });
    } else {
      sendJson(res, 404, { success: false, message: 'Submission not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/submissions/delete') {
    const payload = await parseBody(req);
    let submissions = readJsonFile(SUBMISSIONS_FILE, []);
    const initialLen = submissions.length;
    submissions = submissions.filter(s => String(s.id) !== String(payload.id));
    if (submissions.length < initialLen) {
      writeJsonFile(SUBMISSIONS_FILE, submissions);
      sendJson(res, 200, { success: true, message: 'Submission deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Submission not found' });
    }
    return;
  }

  // 4. Projects APIs
  if (urlPath === '/api/projects') {
    if (req.method === 'GET') {
      const projects = readJsonFile(PROJECTS_FILE, []);
      sendJson(res, 200, { success: true, projects });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/projects/create') {
    const payload = await parseBody(req);
    const projects = readJsonFile(PROJECTS_FILE, []);
    const newProject = {
      id: 'proj_' + Date.now(),
      client: (payload.client || '').trim(),
      location: (payload.location || '').trim(),
      capacity: (payload.capacity || '').trim(),
      sector_or_type: (payload.sector_or_type || payload.type || '').trim(),
      category_slug: (payload.category_slug || payload.category || 'epc').trim(),
      created_at: new Date().toISOString()
    };
    projects.push(newProject);
    writeJsonFile(PROJECTS_FILE, projects);
    sendJson(res, 200, { success: true, message: 'Project created successfully', project: newProject });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/projects/update') {
    const payload = await parseBody(req);
    const projects = readJsonFile(PROJECTS_FILE, []);
    const projIndex = projects.findIndex(p => String(p.id) === String(payload.id));
    if (projIndex !== -1) {
      projects[projIndex] = {
        ...projects[projIndex],
        client: (payload.client !== undefined ? payload.client : projects[projIndex].client).trim(),
        location: (payload.location !== undefined ? payload.location : projects[projIndex].location).trim(),
        capacity: (payload.capacity !== undefined ? payload.capacity : projects[projIndex].capacity).trim(),
        sector_or_type: (payload.sector_or_type !== undefined ? payload.sector_or_type : projects[projIndex].sector_or_type).trim(),
        category_slug: (payload.category_slug !== undefined ? payload.category_slug : projects[projIndex].category_slug).trim(),
        updated_at: new Date().toISOString()
      };
      writeJsonFile(PROJECTS_FILE, projects);
      sendJson(res, 200, { success: true, message: 'Project updated successfully', project: projects[projIndex] });
    } else {
      sendJson(res, 404, { success: false, message: 'Project not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/projects/delete') {
    const payload = await parseBody(req);
    let projects = readJsonFile(PROJECTS_FILE, []);
    const initialLen = projects.length;
    projects = projects.filter(p => String(p.id) !== String(payload.id));
    if (projects.length < initialLen) {
      writeJsonFile(PROJECTS_FILE, projects);
      sendJson(res, 200, { success: true, message: 'Project deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Project not found' });
    }
    return;
  }

  // 5. Categories APIs
  if (urlPath === '/api/categories') {
    if (req.method === 'GET') {
      const categories = readJsonFile(CATEGORIES_FILE, []);
      sendJson(res, 200, { success: true, categories });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/categories/create') {
    const payload = await parseBody(req);
    const categories = readJsonFile(CATEGORIES_FILE, []);
    const name = (payload.name || '').trim();
    const slug = (payload.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')).trim();
    
    if (!name || !slug) {
      sendJson(res, 400, { success: false, message: 'Name and slug are required' });
      return;
    }

    if (categories.some(c => c.slug === slug)) {
      sendJson(res, 400, { success: false, message: 'A category with this slug already exists' });
      return;
    }

    const newCategory = {
      id: 'cat_' + Date.now(),
      name: name,
      slug: slug,
      eyebrow: (payload.eyebrow || name + ' Portfolio').trim(),
      description: (payload.description || 'Projects under ' + name).trim(),
      table_id: slug.replace(/_/g, '-') + '-projects-list',
      order: categories.length + 1
    };

    categories.push(newCategory);
    writeJsonFile(CATEGORIES_FILE, categories);
    sendJson(res, 200, { success: true, message: 'Category created successfully', category: newCategory });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/categories/update') {
    const payload = await parseBody(req);
    const categories = readJsonFile(CATEGORIES_FILE, []);
    const catIndex = categories.findIndex(c => String(c.id) === String(payload.id) || String(c.slug) === String(payload.old_slug));
    
    if (catIndex !== -1) {
      const oldSlug = categories[catIndex].slug;
      const newSlug = payload.slug ? payload.slug.trim() : oldSlug;

      categories[catIndex] = {
        ...categories[catIndex],
        name: payload.name !== undefined ? payload.name.trim() : categories[catIndex].name,
        slug: newSlug,
        eyebrow: payload.eyebrow !== undefined ? payload.eyebrow.trim() : categories[catIndex].eyebrow,
        description: payload.description !== undefined ? payload.description.trim() : categories[catIndex].description
      };
      writeJsonFile(CATEGORIES_FILE, categories);

      // If slug changed, update all associated projects
      if (oldSlug !== newSlug) {
        const projects = readJsonFile(PROJECTS_FILE, []);
        let updated = false;
        projects.forEach(p => {
          if (p.category_slug === oldSlug) {
            p.category_slug = newSlug;
            updated = true;
          }
        });
        if (updated) writeJsonFile(PROJECTS_FILE, projects);
      }

      sendJson(res, 200, { success: true, message: 'Category updated successfully', category: categories[catIndex] });
    } else {
      sendJson(res, 404, { success: false, message: 'Category not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/categories/delete') {
    const payload = await parseBody(req);
    let categories = readJsonFile(CATEGORIES_FILE, []);
    const catToDelete = categories.find(c => String(c.id) === String(payload.id) || String(c.slug) === String(payload.slug));
    
    if (catToDelete) {
      categories = categories.filter(c => c.id !== catToDelete.id);
      writeJsonFile(CATEGORIES_FILE, categories);

      // Optionally cleanup projects or reassign them
      let projects = readJsonFile(PROJECTS_FILE, []);
      if (payload.delete_projects) {
        projects = projects.filter(p => p.category_slug !== catToDelete.slug);
        writeJsonFile(PROJECTS_FILE, projects);
      }

      sendJson(res, 200, { success: true, message: 'Category deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Category not found' });
    }
    return;
  }

  // ==========================================
  // PAGE ROUTING & STATIC FILE SERVING
  // ==========================================

  // Admin Portal URL: /admprtl
  if (urlPath === '/admprtl' || urlPath === '/admprtl.html' || urlPath === '/admin') {
    const adminPath = path.join(__dirname, 'admprtl.html');
    fs.readFile(adminPath, (err, content) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Admin portal page not found</h1>', 'utf-8');
      }
    });
    return;
  }

  // Clean URL handling: /home or / -> index.html
  if (urlPath === '/' || urlPath === '/home') {
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, (err, content) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      }
    });
    return;
  }

  // Redirect /index.html to /home
  if (urlPath === '/index.html') {
    res.writeHead(301, { 'Location': '/home' });
    res.end();
    return;
  }

  // Redirect *.html to clean route (e.g. /about.html -> /about)
  if (urlPath.endsWith('.html') && urlPath !== '/admprtl.html') {
    const cleanUrl = urlPath.slice(0, -5);
    res.writeHead(301, { 'Location': cleanUrl });
    res.end();
    return;
  }

  let filePath = path.join(__dirname, urlPath);

  // If path is a directory, look for index.html
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          // Clean URL fallback: try appending .html (e.g. /about -> about.html)
          if (!path.extname(filePath)) {
            const fallbackPath = filePath + '.html';
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sor Connect Server running at http://localhost:${PORT}/`);
  console.log(`Admin Portal available at http://localhost:${PORT}/admprtl`);
});
