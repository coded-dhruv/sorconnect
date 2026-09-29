const http = require('http');
const https = require('https');
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
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');
const PROJECTS_FILE = path.join(__dirname, 'projects.json');
const CATEGORIES_FILE = path.join(__dirname, 'categories.json');
const GALLERY_FILE = path.join(__dirname, 'about_gallery.json');

const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

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

// Helper to query Supabase REST API (GET)
function fetchFromSupabase(endpoint) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${SUPABASE_URL}${endpoint}`;
    https.get(fullUrl, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data || '[]'));
          } catch (e) {
            resolve([]);
          }
        } else {
          reject(new Error(`Supabase request failed: ${res.statusCode} ${data}`));
        }
      });
    }).on('error', (err) => reject(err));
  });
}

// Helper to perform Supabase REST write operations (POST, PATCH, DELETE)
function supabaseRestRequest(endpoint, method = 'POST', body = null) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${SUPABASE_URL}${endpoint}`;
    const req = https.request(fullUrl, {
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data || '[]'));
          } catch (e) {
            resolve([]);
          }
        } else {
          console.warn(`[SUPABASE REST WARNING] ${method} ${endpoint} returned status ${res.statusCode}: ${data}`);
          resolve(null);
        }
      });
    });
    req.on('error', (err) => {
      console.warn(`[SUPABASE REST ERROR] ${method} ${endpoint}:`, err.message);
      resolve(null);
    });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Sync Projects and Categories from Supabase
async function syncFromSupabase() {
  try {
    console.log('[SUPABASE SYNC] Fetching categories and projects from Supabase...');
    const [rawCategories, rawProjects] = await Promise.all([
      fetchFromSupabase('/rest/v1/categories?select=*&order=id.asc'),
      fetchFromSupabase('/rest/v1/projects?select=*,categories(*)&order=id.asc')
    ]);

    if (Array.isArray(rawCategories) && rawCategories.length > 0) {
      const formattedCategories = rawCategories.map((c, idx) => ({
        id: 'cat_' + c.id,
        name: c.name || (c.slug === 'epc' ? 'EPC Projects' : 'I&C / O&M Projects'),
        slug: c.slug || (c.id === 1 ? 'epc' : 'ic_om'),
        eyebrow: (c.name || '').includes('Portfolio') ? c.name : (c.name || 'Portfolio'),
        description: c.description || (c.slug === 'epc'
          ? 'A snapshot of Engineering, Procurement & Construction projects completed for industrial clients across multiple sectors.'
          : 'Industrial & Commercial installations and ongoing operation & maintenance accounts currently managed by our field teams.'),
        table_id: (c.slug || 'category').replace(/_/g, '-') + '-projects-list',
        order: idx + 1
      }));
      writeJsonFile(CATEGORIES_FILE, formattedCategories);
      console.log(`[SUPABASE SYNC] Successfully synced ${formattedCategories.length} categories.`);
    }

    if (Array.isArray(rawProjects) && rawProjects.length > 0) {
      const formattedProjects = rawProjects.map(p => ({
        id: 'proj_' + p.id,
        client: p.client || '',
        location: p.location || '',
        capacity: p.capacity || '',
        sector_or_type: p.sector_or_type || '',
        category_slug: (p.categories && p.categories.slug) ? p.categories.slug : (p.category_id === 1 ? 'epc' : 'ic_om'),
        created_at: p.created_at || new Date().toISOString()
      }));
      writeJsonFile(PROJECTS_FILE, formattedProjects);
      console.log(`[SUPABASE SYNC] Successfully synced ${formattedProjects.length} projects.`);
    }

    return {
      success: true,
      synced_categories: rawCategories.length,
      synced_projects: rawProjects.length,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('[SUPABASE SYNC ERROR]', err.message);
    return {
      success: false,
      message: err.message
    };
  }
}

// Initial Sync check on startup
(async () => {
  const existingProjects = readJsonFile(PROJECTS_FILE, []);
  const existingCategories = readJsonFile(CATEGORIES_FILE, []);
  if (existingProjects.length === 0 || existingCategories.length === 0) {
    await syncFromSupabase();
  }
})();

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

  // 1. Supabase Sync Endpoint
  if (urlPath === '/api/sync/supabase' || urlPath === '/api/sync') {
    const result = await syncFromSupabase();
    sendJson(res, result.success ? 200 : 500, result);
    return;
  }

  // 2. Contact submission endpoint (Saved to database, no email relay)
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

    // Also save asynchronously to Supabase submissions table
    try {
      const postData = JSON.stringify([{
        name: submission.name,
        whatsapp: submission.whatsapp,
        monthly_bill: submission.monthly_bill,
        pincode: submission.pincode,
        note: submission.note,
        status: submission.status,
        subject: submission.subject,
        source_url: submission.source_url
      }]);

      const supReq = https.request(`${SUPABASE_URL}/rest/v1/submissions`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        }
      }, (supRes) => {
        console.log(`[SUPABASE] Contact submission stored to Supabase with status: ${supRes.statusCode}`);
      });
      supReq.on('error', (err) => console.warn('[SUPABASE INSERT WARNING]', err.message));
      supReq.write(postData);
      supReq.end();
    } catch (e) {
      console.warn('[SUPABASE SUBMISSION ERROR]', e.message);
    }

    console.log(`[CONTACT API] New submission saved: ${submission.name} (WA: ${submission.whatsapp}, Bill: ${submission.monthly_bill}, PIN: ${submission.pincode})`);
    sendJson(res, 200, { success: true, message: 'Your request has been submitted successfully.' });
    return;
  }

  // 3. Admin Login endpoint
  if (req.method === 'POST' && urlPath === '/api/admin/login') {
    const payload = await parseBody(req);
    const id = (payload.id || payload.username || '').trim();
    const password = (payload.password || '').trim();

    if (id === 'sorconnect' && password === 'adminpqyt@46') {
      const token = 'sorconnect_auth_token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      sendJson(res, 200, {
        success: true,
        message: 'Authentication successful',
        user: { id: 'sorconnect', name: 'Sor Connect Administrator' },
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

  // 4. Submissions APIs
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

  // 5. Projects APIs
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
    const categories = readJsonFile(CATEGORIES_FILE, []);
    const catSlug = (payload.category_slug || payload.category || 'epc').trim();
    const catObj = categories.find(c => c.slug === catSlug);
    const category_id = catObj ? (parseInt(String(catObj.id).replace('cat_', ''), 10) || 1) : 1;

    const newProject = {
      id: 'proj_' + Date.now(),
      client: (payload.client || '').trim(),
      location: (payload.location || '').trim(),
      capacity: (payload.capacity || '').trim(),
      sector_or_type: (payload.sector_or_type || payload.type || '').trim(),
      category_slug: catSlug,
      created_at: new Date().toISOString()
    };
    projects.push(newProject);
    writeJsonFile(PROJECTS_FILE, projects);

    // Sync to Supabase
    supabaseRestRequest('/rest/v1/projects', 'POST', [{
      client: newProject.client,
      location: newProject.location,
      capacity: newProject.capacity,
      sector_or_type: newProject.sector_or_type,
      category_id: category_id
    }]).catch(() => { });

    sendJson(res, 200, { success: true, message: 'Project created successfully', project: newProject });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/projects/update') {
    const payload = await parseBody(req);
    const projects = readJsonFile(PROJECTS_FILE, []);
    const projIndex = projects.findIndex(p => String(p.id) === String(payload.id));
    if (projIndex !== -1) {
      const numericId = parseInt(String(payload.id).replace('proj_', ''), 10);
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

      if (numericId) {
        supabaseRestRequest(`/rest/v1/projects?id=eq.${numericId}`, 'PATCH', {
          client: projects[projIndex].client,
          location: projects[projIndex].location,
          capacity: projects[projIndex].capacity,
          sector_or_type: projects[projIndex].sector_or_type
        }).catch(() => { });
      }

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
    const numericId = parseInt(String(payload.id).replace('proj_', ''), 10);

    projects = projects.filter(p => String(p.id) !== String(payload.id));
    if (projects.length < initialLen) {
      writeJsonFile(PROJECTS_FILE, projects);

      if (numericId) {
        supabaseRestRequest(`/rest/v1/projects?id=eq.${numericId}`, 'DELETE').catch(() => { });
      }

      sendJson(res, 200, { success: true, message: 'Project deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Project not found' });
    }
    return;
  }

  // 6. Categories APIs
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

    // Sync to Supabase
    supabaseRestRequest('/rest/v1/categories', 'POST', [{ name, slug }]).catch(() => { });

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
      const numericId = parseInt(String(categories[catIndex].id).replace('cat_', ''), 10);

      categories[catIndex] = {
        ...categories[catIndex],
        name: payload.name !== undefined ? payload.name.trim() : categories[catIndex].name,
        slug: newSlug,
        eyebrow: payload.eyebrow !== undefined ? payload.eyebrow.trim() : categories[catIndex].eyebrow,
        description: payload.description !== undefined ? payload.description.trim() : categories[catIndex].description
      };
      writeJsonFile(CATEGORIES_FILE, categories);

      if (numericId) {
        supabaseRestRequest(`/rest/v1/categories?id=eq.${numericId}`, 'PATCH', { name: categories[catIndex].name, slug: newSlug }).catch(() => { });
      }

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
      const numericId = parseInt(String(catToDelete.id).replace('cat_', ''), 10);
      categories = categories.filter(c => c.id !== catToDelete.id);
      writeJsonFile(CATEGORIES_FILE, categories);

      if (numericId) {
        supabaseRestRequest(`/rest/v1/categories?id=eq.${numericId}`, 'DELETE').catch(() => { });
      }

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

  // 7. About Us Gallery Carousel APIs
  if (urlPath === '/api/about-gallery' || urlPath === '/api/gallery') {
    if (req.method === 'GET') {
      const items = readJsonFile(GALLERY_FILE, []);
      items.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      sendJson(res, 200, { success: true, items });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/about-gallery/create') {
    const payload = await parseBody(req);
    const items = readJsonFile(GALLERY_FILE, []);

    const title = (payload.title || '').trim();
    if (!title) {
      sendJson(res, 400, { success: false, message: 'Slide title is required' });
      return;
    }

    const newSlide = {
      id: 'slide_' + Date.now(),
      title: title,
      subtitle: (payload.subtitle || '').trim(),
      badge: (payload.badge || 'Field Showcase').trim(),
      description: (payload.description || '').trim(),
      location: (payload.location || '').trim(),
      image: (payload.image || 'assets/svc-epc-1.jpg').trim(),
      order: Number(payload.order) || (items.length + 1),
      created_at: new Date().toISOString()
    };

    items.push(newSlide);
    writeJsonFile(GALLERY_FILE, items);
    sendJson(res, 200, { success: true, message: 'Carousel slide created successfully', slide: newSlide });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/about-gallery/update') {
    const payload = await parseBody(req);
    const items = readJsonFile(GALLERY_FILE, []);
    const slideIndex = items.findIndex(s => String(s.id) === String(payload.id));

    if (slideIndex !== -1) {
      items[slideIndex] = {
        ...items[slideIndex],
        title: (payload.title !== undefined ? payload.title : items[slideIndex].title).trim(),
        subtitle: (payload.subtitle !== undefined ? payload.subtitle : items[slideIndex].subtitle).trim(),
        badge: (payload.badge !== undefined ? payload.badge : items[slideIndex].badge).trim(),
        description: (payload.description !== undefined ? payload.description : items[slideIndex].description).trim(),
        location: (payload.location !== undefined ? payload.location : items[slideIndex].location).trim(),
        image: (payload.image !== undefined ? payload.image : items[slideIndex].image).trim(),
        order: payload.order !== undefined ? (Number(payload.order) || items[slideIndex].order) : items[slideIndex].order,
        updated_at: new Date().toISOString()
      };
      writeJsonFile(GALLERY_FILE, items);
      sendJson(res, 200, { success: true, message: 'Carousel slide updated successfully', slide: items[slideIndex] });
    } else {
      sendJson(res, 404, { success: false, message: 'Carousel slide not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/about-gallery/delete') {
    const payload = await parseBody(req);
    let items = readJsonFile(GALLERY_FILE, []);
    const initialLen = items.length;

    items = items.filter(s => String(s.id) !== String(payload.id));
    if (items.length < initialLen) {
      writeJsonFile(GALLERY_FILE, items);
      sendJson(res, 200, { success: true, message: 'Carousel slide deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Carousel slide not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/about-gallery/reorder') {
    const payload = await parseBody(req);
    const { orderList } = payload; // Array of { id, order }
    if (Array.isArray(orderList)) {
      const items = readJsonFile(GALLERY_FILE, []);
      orderList.forEach(item => {
        const found = items.find(s => String(s.id) === String(item.id));
        if (found) found.order = Number(item.order) || found.order;
      });
      writeJsonFile(GALLERY_FILE, items);
      sendJson(res, 200, { success: true, message: 'Slides reordered successfully' });
      return;
    }
    sendJson(res, 400, { success: false, message: 'Invalid order list payload' });
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
