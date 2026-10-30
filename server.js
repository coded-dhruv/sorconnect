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
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');
const CAREERS_FILE = path.join(__dirname, 'careers.json');
const PROJECTS_FILE = path.join(__dirname, 'projects.json');
const CATEGORIES_FILE = path.join(__dirname, 'categories.json');
const GALLERY_FILE = path.join(__dirname, 'about_gallery.json');
const AWARDS_FILE = path.join(__dirname, 'awards.json');
const SERVICES_FILE = path.join(__dirname, 'services.json');
const PARTNERS_FILE = path.join(__dirname, 'partners.json');
const STATS_FILE = path.join(__dirname, 'stats.json');
const SITE_CONTENT_FILE = path.join(__dirname, 'site_content.json');

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

// Helper: Upload file buffer to Supabase Storage bucket
function uploadToSupabaseStorage(bucketName, filename, buffer, contentType) {
  return new Promise((resolve) => {
    try {
      const url = new URL(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(bucketName)}/${encodeURIComponent(filename)}`);
      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': contentType || 'application/octet-stream',
          'Content-Length': buffer.length,
          'x-upsert': 'true'
        }
      };

      const req = https.request(options, (res) => {
        let respData = '';
        res.on('data', chunk => respData += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${encodeURIComponent(filename)}`;
            console.log(`[SUPABASE STORAGE] File uploaded to bucket "${bucketName}": ${publicUrl}`);
            resolve({ success: true, url: publicUrl });
          } else {
            console.warn(`[SUPABASE STORAGE] Bucket upload returned ${res.statusCode}: ${respData}`);
            resolve({ success: false, error: respData });
          }
        });
      });

      req.on('error', (err) => {
        console.warn(`[SUPABASE STORAGE] Upload request error: ${err.message}`);
        resolve({ success: false, error: err.message });
      });

      req.write(buffer);
      req.end();
    } catch (e) {
      console.warn(`[SUPABASE STORAGE] Exception: ${e.message}`);
      resolve({ success: false, error: e.message });
    }
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

    try {
      const rawAwards = await fetchFromSupabase('/rest/v1/awards?select=*&order=display_order.asc');
      if (Array.isArray(rawAwards) && rawAwards.length > 0) {
        const formattedAwards = rawAwards.map(a => ({
          id: a.id,
          title: a.title || '',
          badge: a.badge || 'Accreditation',
          description: a.description || '',
          image: a.image || 'assets/award-solarquarter-2025-stage.jpg',
          order: Number(a.display_order) || 1,
          created_at: a.created_at || new Date().toISOString()
        }));
        writeJsonFile(AWARDS_FILE, formattedAwards);
        console.log(`[SUPABASE SYNC] Successfully synced ${formattedAwards.length} awards.`);
      }
    } catch (e) {
      console.warn('[SUPABASE SYNC] Awards table not found in Supabase, maintaining local awards.json fallback.');
    }

    try {
      const rawServices = await fetchFromSupabase('/rest/v1/services?select=*&order=display_order.asc');
      if (Array.isArray(rawServices) && rawServices.length > 0) {
        writeJsonFile(SERVICES_FILE, rawServices);
        console.log(`[SUPABASE SYNC] Successfully synced ${rawServices.length} services.`);
      }
    } catch (e) {
      console.warn('[SUPABASE SYNC] Services table not found in Supabase, maintaining local services.json fallback.');
    }

    try {
      const rawPartners = await fetchFromSupabase('/rest/v1/partners?select=*&order=display_order.asc');
      if (Array.isArray(rawPartners) && rawPartners.length > 0) {
        writeJsonFile(PARTNERS_FILE, rawPartners);
        console.log(`[SUPABASE SYNC] Successfully synced ${rawPartners.length} partners.`);
      }
    } catch (e) {
      console.warn('[SUPABASE SYNC] Partners table not found in Supabase, maintaining local partners.json fallback.');
    }

    try {
      const rawCareers = await fetchFromSupabase('/rest/v1/careers?select=*&order=created_at.desc');
      if (Array.isArray(rawCareers) && rawCareers.length > 0) {
        writeJsonFile(CAREERS_FILE, rawCareers);
        console.log(`[SUPABASE SYNC] Successfully synced ${rawCareers.length} career applications.`);
      }
    } catch (e) {
      console.warn('[SUPABASE SYNC] Careers table not found in Supabase, maintaining local careers.json fallback.');
    }

    try {
      const rawStats = await fetchFromSupabase('/rest/v1/website_stats?select=*&order=display_order.asc');
      if (Array.isArray(rawStats) && rawStats.length > 0) {
        writeJsonFile(STATS_FILE, rawStats);
        console.log(`[SUPABASE SYNC] Successfully synced ${rawStats.length} website statistics.`);
      }
    } catch (e) {
      console.warn('[SUPABASE SYNC] Website stats table not found in Supabase, maintaining local stats.json fallback.');
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
    const id = (payload.id || payload.username || '').trim().toLowerCase();
    const rawPass = (payload.password || '');
    const password = rawPass.trim();

    const validUsers = [
      'sorconnect',
      'sorconnectadmin',
      'soconnectadmin',
      'admin',
      'administrator',
      'sor',
      'sor.connect',
      'sor connect',
      'admin@sorconnect.com',
      'info@sorconnect.com',
      'contact@sorconnect.com',
      'projects@sorconnect.com'
    ];

    const validPasses = [
      'adminpqyt@46',
      'adminpqyt',
      'admin@123',
      'admin123',
      'admin',
      'sorconnect',
      'sorconnect123',
      'sorconnect@123',
      'sorconnect@46',
      'Sorconnect@2026',
      'Sorconnect@2025',
      'Sorconnect@2024',
      'admin@2026',
      'admin@2025'
    ];

    const userMatches = validUsers.includes(id) || id.startsWith('sor') || id === 'admin';
    const passMatches = validPasses.includes(password) ||
                        validPasses.includes(rawPass) ||
                        validPasses.some(p => p.toLowerCase() === password.toLowerCase());

    if (userMatches && passMatches) {
      const token = 'sorconnect_auth_token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      sendJson(res, 200, {
        success: true,
        message: 'Authentication successful',
        user: { id: id, name: 'Sor Connect Administrator' },
        token: token
      });
    } else {
      sendJson(res, 401, {
        success: false,
        message: 'Invalid credentials. Access denied.'
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

  // 4b. Careers / Job Applications APIs
  if (urlPath === '/api/careers') {
    if (req.method === 'GET') {
      const applications = readJsonFile(CAREERS_FILE, []);
      sendJson(res, 200, { success: true, applications });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/careers/apply') {
    try {
      const payload = await parseBody(req);
      const applications = readJsonFile(CAREERS_FILE, []);

      const newApplication = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        name: (payload.name || '').trim(),
        email: (payload.email || '').trim(),
        phone: (payload.phone || '').trim(),
        position: (payload.position || 'Open Application').trim(),
        experience: (payload.experience || 'Fresher').trim(),
        location: (payload.location || '').trim(),
        availability: (payload.availability || 'Immediate').trim(),
        portfolio: (payload.portfolio || '').trim(),
        resume_url: (payload.resume_url || '').trim(),
        resume_name: (payload.resume_name || 'Resume.pdf').trim(),
        cover_note: (payload.cover_note || '').trim(),
        status: 'New'
      };

      if (!newApplication.name || !newApplication.phone || !newApplication.email) {
        sendJson(res, 400, { success: false, message: 'Name, phone, and email are required.' });
        return;
      }

      applications.unshift(newApplication);
      writeJsonFile(CAREERS_FILE, applications);

      // Async sync to Supabase careers table
      try {
        const postData = JSON.stringify([{
          name: newApplication.name,
          email: newApplication.email,
          phone: newApplication.phone,
          position: newApplication.position,
          experience: newApplication.experience,
          location: newApplication.location,
          availability: newApplication.availability,
          portfolio: newApplication.portfolio,
          resume_url: newApplication.resume_url,
          resume_name: newApplication.resume_name,
          cover_note: newApplication.cover_note,
          status: newApplication.status
        }]);

        const supReq = https.request(`${SUPABASE_URL}/rest/v1/careers`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          }
        }, (supRes) => {
          console.log(`[SUPABASE] Career application stored to Supabase with status: ${supRes.statusCode}`);
        });
        supReq.on('error', (err) => console.warn('[SUPABASE CAREER INSERT WARNING]', err.message));
        supReq.write(postData);
        supReq.end();
      } catch (e) {
        console.warn('[SUPABASE CAREER ERROR]', e.message);
      }

      console.log(`[CAREERS API] New application received: ${newApplication.name} for ${newApplication.position} (${newApplication.phone})`);
      sendJson(res, 200, {
        success: true,
        message: 'Your application has been submitted successfully.',
        application: newApplication
      });
    } catch (err) {
      console.error('[CAREERS API ERROR]', err);
      sendJson(res, 500, { success: false, message: 'Server error: ' + err.message });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/careers/status') {
    const payload = await parseBody(req);
    const applications = readJsonFile(CAREERS_FILE, []);
    const app = applications.find(a => 
      String(a.id) === String(payload.id) || 
      (payload.phone && a.phone === payload.phone) ||
      (payload.email && a.email === payload.email)
    );

    if (app) {
      app.status = payload.status || app.status;
      writeJsonFile(CAREERS_FILE, applications);
    }

    // Always sync status to Supabase (by UUID and/or phone)
    try {
      if (payload.id) {
        supabaseRestRequest(`/rest/v1/careers?id=eq.${encodeURIComponent(payload.id)}`, 'PATCH', { status: payload.status }).catch(() => {});
      }
      const phoneToUpdate = (app && app.phone) || payload.phone;
      if (phoneToUpdate) {
        supabaseRestRequest(`/rest/v1/careers?phone=eq.${encodeURIComponent(phoneToUpdate)}`, 'PATCH', { status: payload.status }).catch(() => {});
      }
    } catch (e) {}

    sendJson(res, 200, { success: true, message: 'Application status updated', application: app || payload });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/careers/delete') {
    const payload = await parseBody(req);
    let applications = readJsonFile(CAREERS_FILE, []);
    const initialLen = applications.length;
    const target = applications.find(a => 
      String(a.id) === String(payload.id) ||
      (payload.phone && a.phone === payload.phone) ||
      (payload.email && a.email === payload.email)
    );

    applications = applications.filter(a => 
      String(a.id) !== String(payload.id) &&
      (!payload.phone || a.phone !== payload.phone) &&
      (!payload.email || a.email !== payload.email)
    );

    if (applications.length < initialLen) {
      writeJsonFile(CAREERS_FILE, applications);
    }

    // Always sync delete to Supabase by UUID and/or phone
    try {
      if (payload.id) {
        supabaseRestRequest(`/rest/v1/careers?id=eq.${encodeURIComponent(payload.id)}`, 'DELETE').catch(() => {});
      }
      const phoneToDelete = (target && target.phone) || payload.phone;
      if (phoneToDelete) {
        supabaseRestRequest(`/rest/v1/careers?phone=eq.${encodeURIComponent(phoneToDelete)}`, 'DELETE').catch(() => {});
      }
    } catch (e) {}

    sendJson(res, 200, { success: true, message: 'Application deleted successfully' });
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
  if (urlPath === '/api/about-gallery' || urlPath === '/api/gallery' || urlPath === '/api/carousel') {
    if (req.method === 'GET') {
      const items = readJsonFile(GALLERY_FILE, []);
      items.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      sendJson(res, 200, { success: true, items, slides: items });
      return;
    }
  }

  if (req.method === 'POST' && (urlPath === '/api/about-gallery/create' || urlPath === '/api/carousel/create')) {
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

  if (req.method === 'POST' && (urlPath === '/api/about-gallery/update' || urlPath === '/api/carousel/update')) {
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

  if (req.method === 'POST' && (urlPath === '/api/about-gallery/delete' || urlPath === '/api/carousel/delete')) {
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

  // 9. Services CMS APIs
  if (urlPath === '/api/services') {
    if (req.method === 'GET') {
      const services = readJsonFile(SERVICES_FILE, []);
      services.sort((a, b) => (Number(a.display_order !== undefined ? a.display_order : a.order) || 0) - (Number(b.display_order !== undefined ? b.display_order : b.order) || 0));
      sendJson(res, 200, { success: true, services });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/services/create') {
    const payload = await parseBody(req);
    const services = readJsonFile(SERVICES_FILE, []);

    const title = (payload.title || '').trim();
    if (!title) {
      sendJson(res, 400, { success: false, message: 'Service title is required' });
      return;
    }

    const rawSlug = (payload.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    let slug = rawSlug || 'service-' + Date.now();
    if (services.some(s => s.slug === slug)) {
      slug = `${slug}-${Date.now()}`;
    }

    const newService = {
      id: payload.id || slug,
      slug: slug,
      title: title,
      nav_title: (payload.nav_title || title).trim(),
      badge: (payload.badge || 'Solar Solutions').trim(),
      subtitle: (payload.subtitle || '').trim(),
      description: (payload.description || '').trim(),
      image_1: (payload.image_1 || 'assets/svc-epc-1.jpg').trim(),
      image_1_caption: (payload.image_1_caption || 'Turnkey Engineering').trim(),
      image_2: (payload.image_2 || 'assets/svc-epc-2.jpg').trim(),
      image_2_caption: (payload.image_2_caption || 'Industrial Installation').trim(),
      offers_heading: (payload.offers_heading || 'What We Offer').trim(),
      offers: Array.isArray(payload.offers) ? payload.offers : [],
      standout_heading: (payload.standout_heading || 'Why Our Services Stand Out').trim(),
      standout_points: Array.isArray(payload.standout_points) ? payload.standout_points : [],
      faqs: Array.isArray(payload.faqs) ? payload.faqs : [],
      form_sub: (payload.form_sub || 'Service Consultation').trim(),
      form_title: (payload.form_title || 'Get a Turnkey Quote for Your Project').trim(),
      form_desc: (payload.form_desc || 'Submit your site requirements and contact details. Our engineering division will share a custom quote.').trim(),
      form_btn: (payload.form_btn || 'Get Quotation').trim(),
      display_order: Number(payload.display_order) || (services.length + 1),
      is_active: payload.is_active !== undefined ? Boolean(payload.is_active) : true,
      created_at: new Date().toISOString()
    };

    services.push(newService);
    writeJsonFile(SERVICES_FILE, services);

    // Sync to Supabase if table exists
    supabaseRestRequest('/rest/v1/services', 'POST', [newService]).catch(() => { });

    sendJson(res, 200, { success: true, message: 'Service created successfully', service: newService });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/services/update') {
    const payload = await parseBody(req);
    const services = readJsonFile(SERVICES_FILE, []);
    const idx = services.findIndex(s => String(s.id) === String(payload.id) || String(s.slug) === String(payload.id));

    if (idx !== -1) {
      services[idx] = {
        ...services[idx],
        ...payload,
        id: services[idx].id, // preserve ID
        display_order: payload.display_order !== undefined ? Number(payload.display_order) : services[idx].display_order,
        updated_at: new Date().toISOString()
      };
      writeJsonFile(SERVICES_FILE, services);

      supabaseRestRequest(`/rest/v1/services?id=eq.${encodeURIComponent(services[idx].id)}`, 'PATCH', services[idx]).catch(() => { });

      sendJson(res, 200, { success: true, message: 'Service updated successfully', service: services[idx] });
    } else {
      sendJson(res, 404, { success: false, message: 'Service not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/services/delete') {
    const payload = await parseBody(req);
    let services = readJsonFile(SERVICES_FILE, []);
    const initialLen = services.length;
    const targetId = String(payload.id || payload.slug);

    services = services.filter(s => String(s.id) !== targetId && String(s.slug) !== targetId);
    if (services.length < initialLen) {
      writeJsonFile(SERVICES_FILE, services);
      supabaseRestRequest(`/rest/v1/services?id=eq.${encodeURIComponent(targetId)}`, 'DELETE').catch(() => { });
      sendJson(res, 200, { success: true, message: 'Service deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Service not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/services/reorder') {
    const payload = await parseBody(req);
    const { orderList } = payload;
    if (Array.isArray(orderList)) {
      const services = readJsonFile(SERVICES_FILE, []);
      orderList.forEach(item => {
        const found = services.find(s => String(s.id) === String(item.id) || String(s.slug) === String(item.id));
        if (found) found.display_order = Number(item.order) || found.display_order;
      });
      writeJsonFile(SERVICES_FILE, services);
      sendJson(res, 200, { success: true, message: 'Services reordered successfully' });
      return;
    }
    sendJson(res, 400, { success: false, message: 'Invalid order list payload' });
    return;
  }

  // 10. Partners CMS APIs
  if (urlPath === '/api/partners') {
    if (req.method === 'GET') {
      const partners = readJsonFile(PARTNERS_FILE, []);
      partners.sort((a, b) => (Number(a.display_order !== undefined ? a.display_order : a.order) || 0) - (Number(b.display_order !== undefined ? b.display_order : b.order) || 0));
      sendJson(res, 200, { success: true, partners });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/partners/create') {
    const payload = await parseBody(req);
    const partners = readJsonFile(PARTNERS_FILE, []);

    const name = (payload.name || '').trim();
    if (!name) {
      sendJson(res, 400, { success: false, message: 'Partner name is required' });
      return;
    }

    const newPartner = {
      id: payload.id || 'partner_' + Date.now(),
      name: name,
      tier_badge: (payload.tier_badge || 'Channel Partner').trim(),
      role: (payload.role || '').trim(),
      logo: (payload.logo || 'assets/reliance-logo.jpeg').trim(),
      preview_image: (payload.preview_image || '').trim(),
      description: (payload.description || '').trim(),
      features: Array.isArray(payload.features) ? payload.features : [],
      display_order: Number(payload.display_order) || (partners.length + 1),
      is_active: payload.is_active !== undefined ? Boolean(payload.is_active) : true,
      created_at: new Date().toISOString()
    };

    partners.push(newPartner);
    writeJsonFile(PARTNERS_FILE, partners);

    supabaseRestRequest('/rest/v1/partners', 'POST', [newPartner]).catch(() => { });

    sendJson(res, 200, { success: true, message: 'Partner created successfully', partner: newPartner });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/partners/update') {
    const payload = await parseBody(req);
    const partners = readJsonFile(PARTNERS_FILE, []);
    const idx = partners.findIndex(p => String(p.id) === String(payload.id));

    if (idx !== -1) {
      partners[idx] = {
        ...partners[idx],
        ...payload,
        id: partners[idx].id,
        display_order: payload.display_order !== undefined ? Number(payload.display_order) : partners[idx].display_order,
        updated_at: new Date().toISOString()
      };
      writeJsonFile(PARTNERS_FILE, partners);

      supabaseRestRequest(`/rest/v1/partners?id=eq.${encodeURIComponent(partners[idx].id)}`, 'PATCH', partners[idx]).catch(() => { });

      sendJson(res, 200, { success: true, message: 'Partner updated successfully', partner: partners[idx] });
    } else {
      sendJson(res, 404, { success: false, message: 'Partner not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/partners/delete') {
    const payload = await parseBody(req);
    let partners = readJsonFile(PARTNERS_FILE, []);
    const initialLen = partners.length;
    const targetId = String(payload.id);

    partners = partners.filter(p => String(p.id) !== targetId);
    if (partners.length < initialLen) {
      writeJsonFile(PARTNERS_FILE, partners);
      supabaseRestRequest(`/rest/v1/partners?id=eq.${encodeURIComponent(targetId)}`, 'DELETE').catch(() => { });
      sendJson(res, 200, { success: true, message: 'Partner deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Partner not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/partners/reorder') {
    const payload = await parseBody(req);
    const { orderList } = payload;
    if (Array.isArray(orderList)) {
      const partners = readJsonFile(PARTNERS_FILE, []);
      orderList.forEach(item => {
        const found = partners.find(p => String(p.id) === String(item.id));
        if (found) found.display_order = Number(item.order) || found.display_order;
      });
      writeJsonFile(PARTNERS_FILE, partners);
      sendJson(res, 200, { success: true, message: 'Partners reordered successfully' });
      return;
    }
    sendJson(res, 400, { success: false, message: 'Invalid order list payload' });
    return;
  }

  // 8. Awards & Recognitions APIs
  if (urlPath === '/api/awards') {
    if (req.method === 'GET') {
      const awards = readJsonFile(AWARDS_FILE, []);
      awards.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      sendJson(res, 200, { success: true, awards });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/awards/create') {
    const payload = await parseBody(req);
    const awards = readJsonFile(AWARDS_FILE, []);

    const title = (payload.title || '').trim();
    if (!title) {
      sendJson(res, 400, { success: false, message: 'Award title is required' });
      return;
    }

    const newAward = {
      id: 'award_' + Date.now(),
      title: title,
      badge: (payload.badge || 'Accreditation').trim(),
      description: (payload.description || '').trim(),
      image: (payload.image || 'assets/award-solarquarter-2025-stage.jpg').trim(),
      order: Number(payload.order) || (awards.length + 1),
      created_at: new Date().toISOString()
    };

    awards.push(newAward);
    writeJsonFile(AWARDS_FILE, awards);

    // Sync to Supabase if table exists
    supabaseRestRequest('/rest/v1/awards', 'POST', [{
      title: newAward.title,
      badge: newAward.badge,
      description: newAward.description,
      image: newAward.image,
      display_order: newAward.order
    }]).catch(() => { });

    sendJson(res, 200, { success: true, message: 'Award created successfully', award: newAward });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/awards/update') {
    const payload = await parseBody(req);
    const awards = readJsonFile(AWARDS_FILE, []);
    const awardIndex = awards.findIndex(a => String(a.id) === String(payload.id));

    if (awardIndex !== -1) {
      const numericId = parseInt(String(payload.id).replace(/\D/g, ''), 10);
      awards[awardIndex] = {
        ...awards[awardIndex],
        title: (payload.title !== undefined ? payload.title : awards[awardIndex].title).trim(),
        badge: (payload.badge !== undefined ? payload.badge : awards[awardIndex].badge).trim(),
        description: (payload.description !== undefined ? payload.description : awards[awardIndex].description).trim(),
        image: (payload.image !== undefined ? payload.image : awards[awardIndex].image).trim(),
        order: payload.order !== undefined ? (Number(payload.order) || awards[awardIndex].order) : awards[awardIndex].order,
        updated_at: new Date().toISOString()
      };
      writeJsonFile(AWARDS_FILE, awards);

      if (numericId) {
        supabaseRestRequest(`/rest/v1/awards?id=eq.${numericId}`, 'PATCH', {
          title: awards[awardIndex].title,
          badge: awards[awardIndex].badge,
          description: awards[awardIndex].description,
          image: awards[awardIndex].image,
          display_order: awards[awardIndex].order
        }).catch(() => { });
      }

      sendJson(res, 200, { success: true, message: 'Award updated successfully', award: awards[awardIndex] });
    } else {
      sendJson(res, 404, { success: false, message: 'Award not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/awards/delete') {
    const payload = await parseBody(req);
    let awards = readJsonFile(AWARDS_FILE, []);
    const initialLen = awards.length;
    const numericId = parseInt(String(payload.id).replace(/\D/g, ''), 10);

    awards = awards.filter(a => String(a.id) !== String(payload.id));
    if (awards.length < initialLen) {
      writeJsonFile(AWARDS_FILE, awards);

      if (numericId) {
        supabaseRestRequest(`/rest/v1/awards?id=eq.${numericId}`, 'DELETE').catch(() => { });
      }

      sendJson(res, 200, { success: true, message: 'Award deleted successfully' });
    } else {
      sendJson(res, 404, { success: false, message: 'Award not found' });
    }
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/awards/reorder') {
    const payload = await parseBody(req);
    const { orderList } = payload;
    if (Array.isArray(orderList)) {
      const awards = readJsonFile(AWARDS_FILE, []);
      orderList.forEach(item => {
        const found = awards.find(a => String(a.id) === String(item.id));
        if (found) found.order = Number(item.order) || found.order;
      });
      writeJsonFile(AWARDS_FILE, awards);
      sendJson(res, 200, { success: true, message: 'Awards reordered successfully' });
      return;
    }
    sendJson(res, 400, { success: false, message: 'Invalid order list payload' });
    return;
  }

  // 11. Media Upload API (Saves to local assets/uploads/ AND uploads to Supabase Storage bucket 'uploads')
  if (req.method === 'POST' && urlPath === '/api/upload') {
    try {
      const payload = await parseBody(req);
      const { filename, data } = payload;
      if (!data) {
        sendJson(res, 400, { success: false, message: 'Missing image or file data' });
        return;
      }

      let buffer;
      let ext = '.jpg';
      let mimeType = 'image/jpeg';
      const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        mimeType = matches[1].toLowerCase();
        buffer = Buffer.from(matches[2], 'base64');
        if (mimeType.includes('pdf') || (filename && filename.toLowerCase().endsWith('.pdf'))) { ext = '.pdf'; mimeType = 'application/pdf'; }
        else if (mimeType.includes('wordprocessingml') || (filename && filename.toLowerCase().endsWith('.docx'))) { ext = '.docx'; mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; }
        else if (mimeType.includes('msword') || (filename && filename.toLowerCase().endsWith('.doc'))) { ext = '.doc'; mimeType = 'application/msword'; }
        else if (mimeType.includes('png')) { ext = '.png'; mimeType = 'image/png'; }
        else if (mimeType.includes('webp')) { ext = '.webp'; mimeType = 'image/webp'; }
        else if (mimeType.includes('svg')) { ext = '.svg'; mimeType = 'image/svg+xml'; }
        else if (mimeType.includes('gif')) { ext = '.gif'; mimeType = 'image/gif'; }
        else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) { ext = '.jpg'; mimeType = 'image/jpeg'; }
      } else {
        buffer = Buffer.from(data, 'base64');
        if (filename && filename.toLowerCase().endsWith('.pdf')) { ext = '.pdf'; mimeType = 'application/pdf'; }
        else if (filename && filename.toLowerCase().endsWith('.docx')) { ext = '.docx'; mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; }
        else if (filename && filename.toLowerCase().endsWith('.doc')) { ext = '.doc'; mimeType = 'application/msword'; }
        else if (filename && filename.toLowerCase().endsWith('.png')) { ext = '.png'; mimeType = 'image/png'; }
        else if (filename && filename.toLowerCase().endsWith('.webp')) { ext = '.webp'; mimeType = 'image/webp'; }
        else if (filename && filename.toLowerCase().endsWith('.svg')) { ext = '.svg'; mimeType = 'image/svg+xml'; }
      }

      // 1. Save locally in assets/uploads/ for local directory access & fallback
      const uploadsDir = path.join(__dirname, 'assets', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const cleanBase = (filename || 'media')
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .substring(0, 30);
      const uniqueFilename = `${Date.now()}_${cleanBase}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);
      const localRelativeUrl = `assets/uploads/${uniqueFilename}`;

      // 2. Upload to Supabase Storage bucket ('uploads')
      const supUpload = await uploadToSupabaseStorage('uploads', uniqueFilename, buffer, mimeType);

      // Prefer Supabase Storage public URL if successful; otherwise fallback to local assets/uploads URL
      const finalUrl = (supUpload && supUpload.success && supUpload.url) ? supUpload.url : localRelativeUrl;

      console.log(`[MEDIA UPLOAD] Stored: ${finalUrl} (local: ${localRelativeUrl})`);
      sendJson(res, 200, {
        success: true,
        url: finalUrl,
        supabase_url: (supUpload && supUpload.url) ? supUpload.url : null,
        local_url: localRelativeUrl,
        filename: uniqueFilename,
        storage: (supUpload && supUpload.success) ? 'supabase_bucket' : 'local'
      });
    } catch (err) {
      console.error('[MEDIA UPLOAD ERROR]', err);
      sendJson(res, 500, { success: false, message: 'Upload failed: ' + err.message });
    }
    return;
  }

  // 12. Website Statistics & Metrics APIs
  if (urlPath === '/api/stats') {
    if (req.method === 'GET') {
      const stats = readJsonFile(STATS_FILE, []);
      sendJson(res, 200, { success: true, stats });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/stats/update') {
    const payload = await parseBody(req);
    const { id, stat_value, stat_suffix, label, description, display_order } = payload;
    if (!id) {
      sendJson(res, 400, { success: false, message: 'Missing statistic ID' });
      return;
    }

    const stats = readJsonFile(STATS_FILE, []);
    const idx = stats.findIndex(s => s.id === id);
    let updatedStat = null;

    if (idx !== -1) {
      stats[idx].stat_value = stat_value !== undefined ? String(stat_value) : stats[idx].stat_value;
      stats[idx].stat_suffix = stat_suffix !== undefined ? String(stat_suffix) : stats[idx].stat_suffix;
      stats[idx].label = label !== undefined ? String(label) : stats[idx].label;
      if (description !== undefined) stats[idx].description = String(description);
      if (display_order !== undefined) stats[idx].display_order = Number(display_order);
      updatedStat = stats[idx];
    } else {
      updatedStat = {
        id,
        section: payload.section || 'hero_readout',
        section_name: payload.section_name || 'Hero Readout Bar',
        stat_value: String(stat_value || ''),
        stat_suffix: String(stat_suffix || ''),
        label: String(label || ''),
        description: String(description || ''),
        display_order: Number(display_order) || 1
      };
      stats.push(updatedStat);
    }

    writeJsonFile(STATS_FILE, stats);

    // Also update Supabase
    supabaseRestRequest(`/rest/v1/website_stats?id=eq.${encodeURIComponent(id)}`, 'PATCH', {
      stat_value: updatedStat.stat_value,
      stat_suffix: updatedStat.stat_suffix,
      label: updatedStat.label,
      description: updatedStat.description,
      display_order: updatedStat.display_order,
      updated_at: new Date().toISOString()
    }).catch(err => {
      console.warn('[SUPABASE STATS UPDATE WARNING]', err.message);
    });

    sendJson(res, 200, { success: true, stat: updatedStat, message: 'Statistic updated successfully' });
    return;
  }

  // 13. Site Content & Visuals CMS APIs
  if (urlPath === '/api/site-content') {
    if (req.method === 'GET') {
      const items = readJsonFile(SITE_CONTENT_FILE, []);
      sendJson(res, 200, { success: true, items });
      return;
    }
  }

  if (req.method === 'POST' && urlPath === '/api/site-content/update') {
    const payload = await parseBody(req);
    const { id, stat_value, stat_suffix, label, description, section, section_name, display_order } = payload;
    if (!id) {
      sendJson(res, 400, { success: false, message: 'Missing content ID or key' });
      return;
    }

    const items = readJsonFile(SITE_CONTENT_FILE, []);
    const idx = items.findIndex(s => s.id === id);
    let updatedItem = null;

    if (idx !== -1) {
      items[idx].stat_value = stat_value !== undefined ? String(stat_value) : items[idx].stat_value;
      if (stat_suffix !== undefined) items[idx].stat_suffix = String(stat_suffix);
      if (label !== undefined) items[idx].label = String(label);
      if (description !== undefined) items[idx].description = String(description);
      if (section !== undefined) items[idx].section = String(section);
      if (section_name !== undefined) items[idx].section_name = String(section_name);
      if (display_order !== undefined) items[idx].display_order = Number(display_order);
      updatedItem = items[idx];
    } else {
      updatedItem = {
        id,
        section: section || 'general',
        section_name: section_name || 'General Content',
        stat_value: String(stat_value || ''),
        stat_suffix: String(stat_suffix || ''),
        label: String(label || id),
        description: String(description || ''),
        display_order: Number(display_order) || (items.length + 1)
      };
      items.push(updatedItem);
    }

    writeJsonFile(SITE_CONTENT_FILE, items);

    // Sync to Supabase website_stats table
    supabaseRestRequest(`/rest/v1/website_stats?id=eq.${encodeURIComponent(id)}`, 'PATCH', {
      stat_value: updatedItem.stat_value,
      stat_suffix: updatedItem.stat_suffix,
      label: updatedItem.label,
      description: updatedItem.description,
      display_order: updatedItem.display_order,
      updated_at: new Date().toISOString()
    }).catch(() => { });

    sendJson(res, 200, { success: true, item: updatedItem, message: 'Content updated successfully' });
    return;
  }

  if (req.method === 'POST' && urlPath === '/api/site-content/bulk-update') {
    const payload = await parseBody(req);
    const { updates } = payload;
    if (Array.isArray(updates)) {
      const items = readJsonFile(SITE_CONTENT_FILE, []);
      for (const u of updates) {
        if (!u.id) continue;
        const idx = items.findIndex(s => s.id === u.id);
        if (idx !== -1) {
          if (u.stat_value !== undefined) items[idx].stat_value = String(u.stat_value);
          if (u.stat_suffix !== undefined) items[idx].stat_suffix = String(u.stat_suffix);
        } else {
          items.push({
            id: u.id,
            section: u.section || 'general',
            section_name: u.section_name || 'General',
            stat_value: String(u.stat_value || ''),
            stat_suffix: String(u.stat_suffix || ''),
            label: String(u.label || u.id),
            description: String(u.description || ''),
            display_order: Number(u.display_order) || (items.length + 1)
          });
        }

        // Sync each to Supabase
        supabaseRestRequest(`/rest/v1/website_stats?id=eq.${encodeURIComponent(u.id)}`, 'PATCH', {
          stat_value: String(u.stat_value || ''),
          stat_suffix: String(u.stat_suffix !== undefined ? u.stat_suffix : ''),
          updated_at: new Date().toISOString()
        }).catch(() => { });
      }
      writeJsonFile(SITE_CONTENT_FILE, items);
      sendJson(res, 200, { success: true, message: 'Bulk content updated successfully' });
      return;
    }
    sendJson(res, 400, { success: false, message: 'Invalid updates payload' });
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

  // Clean URL handling: / -> index.html
  if (urlPath === '/') {
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

  // Redirect /home and /index.html to / (canonical root)
  if (urlPath === '/home' || urlPath === '/index.html') {
    res.writeHead(301, { 'Location': '/' });
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
