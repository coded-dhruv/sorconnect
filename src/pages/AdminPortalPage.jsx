import React, { useState, useEffect } from 'react';
import { 
  fetchProjectsFromSupabase, 
  fetchCategoriesFromSupabase, 
  fetchSubmissionsFromSupabase 
} from '../utils/supabase';

const VALID_ADMIN_ID = 'sorconnect';
const VALID_ADMIN_PASS = 'adminpqyt@46';
const AUTH_KEY = 'sorconnect_react_admin_token';

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('submissions');

  // Data States
  const [submissions, setSubmissions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Filters
  const [subSearch, setSubSearch] = useState('');
  const [subBillFilter, setSubBillFilter] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState('');

  const [projSearch, setProjSearch] = useState('');
  const [projCatFilter, setProjCatFilter] = useState('');

  // Modals
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [projectModal, setProjectModal] = useState({ open: false, isEdit: false, data: null });
  const [categoryModal, setCategoryModal] = useState({ open: false, isEdit: false, data: null });

  // Check stored auth
  useEffect(() => {
    const token = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
    if (token) {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const showToast = (msg, isErr = false) => {
    setToastMessage(msg);
    setToastError(isErr);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const loadAllData = async () => {
    // 1. Load submissions
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      try {
        const supSubs = await fetchSubmissionsFromSupabase();
        if (supSubs) setSubmissions(supSubs);
      } catch (err) {}
    }

    // 2. Load categories
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      try {
        const supCats = await fetchCategoriesFromSupabase();
        if (supCats) setCategories(supCats);
      } catch (err) {}
    }

    // 3. Load projects
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      try {
        const supProjs = await fetchProjectsFromSupabase();
        if (supProjs) setProjects(supProjs);
      } catch (err) {}
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === VALID_ADMIN_ID && adminPass === VALID_ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, 'sorconnect_auth_session_valid');
      setIsAuthenticated(true);
      setLoginError('');
      loadAllData();
      showToast('Welcome back, Admin!');
    } else {
      setLoginError('Invalid Admin ID or Password. Please retry.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Portal?')) {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
      setIsAuthenticated(false);
      showToast('Logged out successfully.');
    }
  };

  // Sync with Supabase
  const handleSupabaseSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/sync/supabase', { method: 'POST' }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        await loadAllData();
        showToast(`✓ Synced ${data.synced_projects || 0} projects & ${data.synced_categories || 0} categories from Supabase!`);
      } else {
        // Direct client sync
        const [cats, projs, subs] = await Promise.all([
          fetchCategoriesFromSupabase().catch(() => []),
          fetchProjectsFromSupabase().catch(() => []),
          fetchSubmissionsFromSupabase().catch(() => [])
        ]);

        if (cats.length > 0) {
          setCategories(cats.map(c => ({
            id: 'cat_' + c.id,
            name: c.name,
            slug: c.slug,
            eyebrow: c.name,
            description: c.slug === 'epc' ? 'EPC Projects Portfolio' : 'I&C / O&M Portfolio'
          })));
        }

        if (projs.length > 0) {
          setProjects(projs.map(p => ({
            id: 'proj_' + p.id,
            client: p.client,
            location: p.location,
            capacity: p.capacity,
            sector_or_type: p.sector_or_type,
            category_slug: (p.categories && p.categories.slug) ? p.categories.slug : (p.category_id === 1 ? 'epc' : 'ic_om')
          })));
        }

        if (subs.length > 0) {
          setSubmissions(subs);
        }

        showToast(`✓ Synced ${projs.length} projects & ${cats.length} categories from Supabase!`);
      }
    } catch (err) {
      showToast('Sync error: ' + err.message, true);
    } finally {
      setSyncing(false);
    }
  };

  // CSV Export
  const exportCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions available to export.');
      return;
    }
    let csv = 'ID,Date,Name,WhatsApp,Monthly Bill,PIN Code,Note,Status,Source\n';
    submissions.forEach(s => {
      const clean = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;
      csv += `${clean(s.id)},${clean(s.timestamp || s.created_at)},${clean(s.name)},${clean(s.whatsapp)},${clean(s.monthly_bill)},${clean(s.pincode)},${clean(s.note)},${clean(s.status || 'New')},${clean(s.source_url)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorconnect_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Project CRUD Actions
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const data = projectModal.data;
    const isEdit = projectModal.isEdit;
    const endpoint = isEdit ? '/api/projects/update' : '/api/projects/create';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        showToast(isEdit ? 'Project updated successfully!' : 'Project created successfully!');
      }
    } catch (err) {}

    if (isEdit) {
      setProjects(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      setProjects(prev => [...prev, { ...data, id: 'proj_' + Date.now() }]);
    }
    setProjectModal({ open: false, isEdit: false, data: null });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch('/api/projects/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {}
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project deleted.');
  };

  // Category CRUD Actions
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const data = categoryModal.data;
    const isEdit = categoryModal.isEdit;
    const endpoint = isEdit ? '/api/categories/update' : '/api/categories/create';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        showToast(isEdit ? 'Category updated!' : 'Category created!');
      }
    } catch (err) {}

    if (isEdit) {
      setCategories(prev => prev.map(c => c.id === data.id ? data : c));
    } else {
      setCategories(prev => [...prev, { ...data, id: 'cat_' + Date.now() }]);
    }
    setCategoryModal({ open: false, isEdit: false, data: null });
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await fetch('/api/categories/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {}
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted.');
  };

  // ==================== RENDER LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <img src="/assets/logo.png" alt="Sor Connect Logo" />
              <span>Sor Connect</span>
            </div>
            <div><span className="login-badge">Restricted Access</span></div>
            <h2>Admin Authentication</h2>
            <p>Enter your management credentials to access the portal.</p>
          </div>

          {loginError && (
            <div className="login-error" style={{ display: 'flex' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admin-id-field">Admin ID</label>
              <div className="login-input-wrap">
                <input 
                  type="text" 
                  id="admin-id-field"
                  required 
                  autoComplete="username" 
                  placeholder="sorconnect"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="admin-pass-field">Password</label>
              <div className="login-input-wrap">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="admin-pass-field"
                  required 
                  autoComplete="current-password" 
                  placeholder="••••••••••••"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              <span>Sign In to Admin Portal</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== FILTERED LISTS ====================
  const filteredSubmissions = submissions.filter(s => {
    const term = subSearch.toLowerCase();
    const matchesSearch = !term || 
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.whatsapp && s.whatsapp.includes(term)) ||
      (s.pincode && s.pincode.includes(term)) ||
      (s.note && s.note.toLowerCase().includes(term));

    const matchesBill = !subBillFilter || s.monthly_bill === subBillFilter;
    const matchesStatus = !subStatusFilter || (s.status || 'New') === subStatusFilter;

    return matchesSearch && matchesBill && matchesStatus;
  });

  const filteredProjects = projects.filter(p => {
    const term = projSearch.toLowerCase();
    const matchesSearch = !term ||
      (p.client && p.client.toLowerCase().includes(term)) ||
      (p.location && p.location.toLowerCase().includes(term)) ||
      (p.capacity && p.capacity.toLowerCase().includes(term)) ||
      (p.sector_or_type && p.sector_or_type.toLowerCase().includes(term));

    const matchesCat = !projCatFilter || p.category_slug === projCatFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-dashboard" style={{ display: 'flex' }}>
      
      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-nav-container">
          <div className="admin-nav-left">
            <a href="/home" className="admin-brand" target="_blank" rel="noreferrer">
              <img src="/assets/logo.png" alt="Logo" />
              <span className="brand-title">Sor Connect</span>
            </a>
            <span className="admin-portal-tag">Admin Portal</span>
          </div>

          <div className="admin-nav-right">
            <button 
              type="button" 
              className="btn-admin-action"
              onClick={handleSupabaseSync}
              disabled={syncing}
              title="Pull latest data from Supabase"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>{syncing ? 'Syncing...' : 'Sync Supabase'}</span>
            </button>

            <div className="admin-user-chip">
              <div className="admin-user-avatar">SC</div>
              <span>sorconnect</span>
            </div>

            <a href="/home" target="_blank" rel="noreferrer" className="btn-admin-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              <span>Live Site</span>
            </a>

            <button type="button" className="btn-admin-action btn-logout" onClick={handleLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-main-content">
        
        {/* Tab Navigation Bar */}
        <div className="admin-tabs-nav">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span>Form Submissions</span>
            <span className="tab-badge">{submissions.length}</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <span>Projects Management</span>
            <span className="tab-badge">{projects.length}</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Categories Management</span>
            <span className="tab-badge">{categories.length}</span>
          </button>
        </div>

        {/* ============ 1. SUBMISSIONS TAB ============ */}
        {activeTab === 'submissions' && (
          <section className="admin-tab-panel active">
            
            {/* Metric Cards */}
            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-info">
                  <div className="metric-label">Total Submissions</div>
                  <div className="metric-value">{submissions.length}</div>
                </div>
                <div className="metric-icon-box">📊</div>
              </div>

              <div className="metric-card">
                <div className="metric-info">
                  <div className="metric-label">New / Uncontacted</div>
                  <div className="metric-value" style={{ color: '#0066CC' }}>
                    {submissions.filter(s => (s.status || 'New') === 'New').length}
                  </div>
                </div>
                <div className="metric-icon-box" style={{ background: '#E1F0FF' }}>📩</div>
              </div>

              <div className="metric-card">
                <div className="metric-info">
                  <div className="metric-label">High-Value Leads (&gt;₹4k)</div>
                  <div className="metric-value" style={{ color: '#D96B00' }}>
                    {submissions.filter(s => s.monthly_bill === 'More than ₹8000' || s.monthly_bill === '₹4000-₹8000').length}
                  </div>
                </div>
                <div className="metric-icon-box" style={{ background: '#FFF4E5' }}>💰</div>
              </div>
            </div>

            {/* Filter & Actions */}
            <div className="admin-control-bar">
              <div className="control-bar-left">
                <div className="search-input-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search by name, WhatsApp, PIN, or note..." 
                    value={subSearch}
                    onChange={(e) => setSubSearch(e.target.value)}
                  />
                </div>

                <select 
                  className="admin-filter-select"
                  value={subBillFilter}
                  onChange={(e) => setSubBillFilter(e.target.value)}
                >
                  <option value="">All Monthly Bills</option>
                  <option value="Under ₹1500">Under ₹1500</option>
                  <option value="₹1500-₹2000">₹1500 - ₹2000</option>
                  <option value="₹2500-₹4000">₹2500 - ₹4000</option>
                  <option value="₹4000-₹8000">₹4000 - ₹8000</option>
                  <option value="More than ₹8000">More than ₹8000</option>
                </select>

                <select 
                  className="admin-filter-select"
                  value={subStatusFilter}
                  onChange={(e) => setSubStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="control-bar-right">
                <button type="button" className="btn-secondary-admin" onClick={exportCSV}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>Export CSV</span>
                </button>
                <button type="button" className="btn-secondary-admin" onClick={loadAllData}>
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="admin-table-card">
              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date &amp; Time</th>
                      <th>Full Name</th>
                      <th>WhatsApp</th>
                      <th>Monthly Bill</th>
                      <th>PIN Code</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map(sub => {
                        const waDigits = (sub.whatsapp || '').replace(/\D/g, '');
                        const waClean = waDigits.length === 10 ? '91' + waDigits : waDigits;
                        const waLink = `https://wa.me/${waClean}?text=${encodeURIComponent(`Hello ${sub.name}, thank you for reaching out to Sor Connect regarding your solar installation!`)}`;

                        return (
                          <tr key={sub.id}>
                            <td style={{ fontSize: '12.5px', color: 'var(--admin-muted)' }}>
                              {sub.timestamp || sub.created_at ? new Date(sub.timestamp || sub.created_at).toLocaleDateString('en-IN') : 'Recent'}
                            </td>
                            <td style={{ fontWeight: 700 }}>{sub.name}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{sub.whatsapp}</span>
                                {waDigits && (
                                  <a href={waLink} target="_blank" rel="noreferrer" className="whatsapp-link-btn">
                                    Chat
                                  </a>
                                )}
                              </div>
                            </td>
                            <td><span className="bill-badge">{sub.monthly_bill}</span></td>
                            <td><b>{sub.pincode}</b></td>
                            <td><span className={`status-badge status-${(sub.status || 'New').replace(/\s+/g, '')}`}>{sub.status || 'New'}</span></td>
                            <td style={{ textAlign: 'right' }}>
                              <button 
                                type="button" 
                                className="btn-admin-action"
                                onClick={() => setSelectedSubmission(sub)}
                                style={{ padding: '4px 10px', fontSize: '12px' }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--admin-muted)' }}>
                          No form submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* ============ 2. PROJECTS TAB ============ */}
        {activeTab === 'projects' && (
          <section className="admin-tab-panel active">
            <div className="admin-control-bar">
              <div className="control-bar-left">
                <div className="search-input-box">
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={projSearch}
                    onChange={(e) => setProjSearch(e.target.value)}
                  />
                </div>
                <select 
                  className="admin-filter-select"
                  value={projCatFilter}
                  onChange={(e) => setProjCatFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="control-bar-right">
                <button 
                  type="button" 
                  className="btn-primary-admin"
                  onClick={() => setProjectModal({ 
                    open: true, 
                    isEdit: false, 
                    data: { client: '', location: '', capacity: '', sector_or_type: '', category_slug: categories[0]?.slug || 'epc' } 
                  })}
                >
                  ➕ Add New Project
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Location</th>
                      <th>Capacity</th>
                      <th>Sector / Type</th>
                      <th>Category</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map(proj => (
                      <tr key={proj.id}>
                        <td style={{ fontWeight: 700 }}>{proj.client}</td>
                        <td>{proj.location}</td>
                        <td style={{ fontWeight: 800, color: 'var(--leaf)' }}>{proj.capacity}</td>
                        <td><span className="bill-badge">{proj.sector_or_type}</span></td>
                        <td><b>{proj.category_slug}</b></td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            type="button" 
                            className="btn-admin-action" 
                            style={{ marginRight: '6px' }}
                            onClick={() => setProjectModal({ open: true, isEdit: true, data: { ...proj } })}
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            className="btn-admin-action btn-logout"
                            onClick={() => handleDeleteProject(proj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ============ 3. CATEGORIES TAB ============ */}
        {activeTab === 'categories' && (
          <section className="admin-tab-panel active">
            <div className="admin-control-bar">
              <div className="control-bar-left">
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--admin-muted)' }}>
                  Manage portfolio categories for public Projects page.
                </p>
              </div>
              <div className="control-bar-right">
                <button 
                  type="button" 
                  className="btn-primary-admin"
                  onClick={() => setCategoryModal({ 
                    open: true, 
                    isEdit: false, 
                    data: { name: '', slug: '', eyebrow: '', description: '' } 
                  })}
                >
                  ➕ Add New Category
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Slug (ID)</th>
                      <th>Eyebrow</th>
                      <th>Linked Projects</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => {
                      const count = projects.filter(p => p.category_slug === cat.slug).length;
                      return (
                        <tr key={cat.id}>
                          <td style={{ fontWeight: 700 }}>{cat.name}</td>
                          <td><code>{cat.slug}</code></td>
                          <td>{cat.eyebrow}</td>
                          <td><span className="tab-badge">{count} projects</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              type="button" 
                              className="btn-admin-action" 
                              style={{ marginRight: '6px' }}
                              onClick={() => setCategoryModal({ open: true, isEdit: true, data: { ...cat } })}
                            >
                              Edit
                            </button>
                            <button 
                              type="button" 
                              className="btn-admin-action btn-logout"
                              onClick={() => handleDeleteCategory(cat.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ============ SUBMISSION DETAIL MODAL ============ */}
      {selectedSubmission && (
        <div className="admin-modal-overlay active" onClick={() => setSelectedSubmission(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Lead Details: {selectedSubmission.name}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setSelectedSubmission(null)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div className="detail-key-value-list">
                <div className="detail-row">
                  <span className="detail-key">Customer Name</span>
                  <span className="detail-val" style={{ fontWeight: 700, fontSize: '16px' }}>{selectedSubmission.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">WhatsApp Number</span>
                  <span className="detail-val">{selectedSubmission.whatsapp}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Monthly Bill</span>
                  <span className="detail-val"><span className="bill-badge">{selectedSubmission.monthly_bill}</span></span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">PIN Code</span>
                  <span className="detail-val"><b>{selectedSubmission.pincode}</b></span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Note</span>
                  <span className="detail-val" style={{ background: '#F8FAF9', padding: '10px', borderRadius: '6px' }}>
                    {selectedSubmission.note || 'No additional note.'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Status</span>
                  <select 
                    className="admin-filter-select"
                    value={selectedSubmission.status || 'New'}
                    onChange={(e) => {
                      const newSt = e.target.value;
                      setSelectedSubmission(prev => ({ ...prev, status: newSt }));
                      setSubmissions(prev => prev.map(s => s.id === selectedSubmission.id ? { ...s, status: newSt } : s));
                    }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="btn-secondary-admin" onClick={() => setSelectedSubmission(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ PROJECT MODAL ============ */}
      {projectModal.open && (
        <div className="admin-modal-overlay active" onClick={() => setProjectModal({ open: false, isEdit: false, data: null })}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{projectModal.isEdit ? 'Edit Project' : 'Add New Project'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setProjectModal({ open: false, isEdit: false, data: null })}>&times;</button>
            </div>
            <form onSubmit={handleSaveProject}>
              <div className="admin-modal-body">
                <div className="modal-form-group">
                  <label>Client Name</label>
                  <input 
                    type="text" 
                    required 
                    value={projectModal.data.client || ''} 
                    onChange={(e) => setProjectModal(prev => ({ ...prev, data: { ...prev.data, client: e.target.value } }))}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    required 
                    value={projectModal.data.location || ''} 
                    onChange={(e) => setProjectModal(prev => ({ ...prev, data: { ...prev.data, location: e.target.value } }))}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Capacity</label>
                  <input 
                    type="text" 
                    required 
                    value={projectModal.data.capacity || ''} 
                    onChange={(e) => setProjectModal(prev => ({ ...prev, data: { ...prev.data, capacity: e.target.value } }))}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Sector or Type</label>
                  <input 
                    type="text" 
                    required 
                    value={projectModal.data.sector_or_type || ''} 
                    onChange={(e) => setProjectModal(prev => ({ ...prev, data: { ...prev.data, sector_or_type: e.target.value } }))}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Category</label>
                  <select 
                    value={projectModal.data.category_slug || ''}
                    onChange={(e) => setProjectModal(prev => ({ ...prev, data: { ...prev.data, category_slug: e.target.value } }))}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn-secondary-admin" onClick={() => setProjectModal({ open: false, isEdit: false, data: null })}>Cancel</button>
                <button type="submit" className="btn-primary-admin">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ CATEGORY MODAL ============ */}
      {categoryModal.open && (
        <div className="admin-modal-overlay active" onClick={() => setCategoryModal({ open: false, isEdit: false, data: null })}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{categoryModal.isEdit ? 'Edit Category' : 'Add New Category'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setCategoryModal({ open: false, isEdit: false, data: null })}>&times;</button>
            </div>
            <form onSubmit={handleSaveCategory}>
              <div className="admin-modal-body">
                <div className="modal-form-group">
                  <label>Category Name</label>
                  <input 
                    type="text" 
                    required 
                    value={categoryModal.data.name || ''} 
                    onChange={(e) => {
                      const val = e.target.value;
                      const slug = !categoryModal.isEdit ? val.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') : categoryModal.data.slug;
                      setCategoryModal(prev => ({ ...prev, data: { ...prev.data, name: val, slug: slug } }));
                    }}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Category Slug</label>
                  <input 
                    type="text" 
                    required 
                    value={categoryModal.data.slug || ''} 
                    onChange={(e) => setCategoryModal(prev => ({ ...prev, data: { ...prev.data, slug: e.target.value } }))}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Eyebrow / Subtitle</label>
                  <input 
                    type="text" 
                    value={categoryModal.data.eyebrow || ''} 
                    onChange={(e) => setCategoryModal(prev => ({ ...prev, data: { ...prev.data, eyebrow: e.target.value } }))}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Description</label>
                  <textarea 
                    rows="3"
                    value={categoryModal.data.description || ''} 
                    onChange={(e) => setCategoryModal(prev => ({ ...prev, data: { ...prev.data, description: e.target.value } }))}
                  ></textarea>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn-secondary-admin" onClick={() => setCategoryModal({ open: false, isEdit: false, data: null })}>Cancel</button>
                <button type="submit" className="btn-primary-admin">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-container">
          <div className={`admin-toast ${toastError ? 'error' : ''}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
