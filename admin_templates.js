// admin_templates.js - HTML sections for admprtl.html

module.exports = {
  getLoginView: () => `
  <!-- ==================== 1. LOGIN SCREEN ==================== -->
  <div id="login-view" class="admin-login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">
          <img src="assets/logo.png" alt="Sor Connect Logo">
          <span>SOR CONNECT</span>
        </div>
        <div class="login-badge">Portal Control Center</div>
        <h2>Sign in to Dashboard</h2>
        <p>Access turnkey leads, website CMS, portfolio, and settings</p>
      </div>

      <div id="login-error-msg" class="login-error">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span id="login-error-text">Invalid credentials. Access denied.</span>
      </div>

      <form id="admin-login-form" class="login-form">
        <div class="form-group">
          <label for="admin-user-input">Admin Username</label>
          <input type="text" id="admin-user-input" required autocomplete="username" placeholder="Enter Admin Username" value="">
        </div>

        <div class="form-group">
          <label for="admin-password-input">Security Password</label>
          <div class="login-input-wrap">
            <input type="password" id="admin-password-input" required autocomplete="current-password" placeholder="••••••••••••">
            <button type="button" class="password-toggle-btn" id="toggle-pwd-btn" aria-label="Toggle password visibility">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>

        <button type="submit" class="login-btn" id="login-submit-btn">
          <span>Sign In to Admin Portal</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>
  </div>
  `,

  getDashboardShell: (panelsHtml) => `
  <!-- ==================== 2. MAIN DASHBOARD SHELL ==================== -->
  <div id="dashboard-view" class="admin-dashboard">
    <div class="admin-layout">
      
      <!-- Modern Sidebar (shadcn/ui style) -->
      <aside class="admin-sidebar">
        <div class="admin-sidebar-header">
          <a href="/home" class="admin-sidebar-brand" target="_blank" title="View Public Website">
            <img src="assets/logo.png" alt="Logo">
            <span>Sor Connect</span>
          </a>
          <span class="admin-sidebar-tag">v2.0 CMS</span>
        </div>

        <div class="admin-sidebar-scroll">
          <div class="admin-nav-group-label">Lead Management</div>
          <button type="button" class="admin-tab-btn active" data-tab="submissions-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Form Submissions</span>
            <span class="tab-badge" id="submissions-count-badge">0</span>
          </button>

          <!-- Job Applications / Careers (NEW) -->
          <button type="button" class="admin-tab-btn" data-tab="careers-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Job Applications</span>
            <span class="tab-badge" id="careers-count-badge">0</span>
          </button>

          <div class="admin-nav-group-label" style="margin-top: 14px;">Website CMS</div>
          
          <!-- Site Content & Visuals CMS (NEW) -->
          <button type="button" class="admin-tab-btn" data-tab="content-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            <span>Site Content &amp; Visuals</span>
            <span class="tab-badge" id="content-count-badge">50</span>
          </button>

          <!-- Services Page CMS (NEW) -->
          <button type="button" class="admin-tab-btn" data-tab="services-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
            <span>Services Page CMS</span>
            <span class="tab-badge" id="services-count-badge">0</span>
          </button>

          <!-- Partners CMS (NEW) -->
          <button type="button" class="admin-tab-btn" data-tab="partners-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Partners &amp; Alliances</span>
            <span class="tab-badge" id="partners-count-badge">0</span>
          </button>

          <!-- Projects Portfolio -->
          <button type="button" class="admin-tab-btn" data-tab="projects-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            <span>Projects Portfolio</span>
            <span class="tab-badge" id="projects-count-badge">0</span>
          </button>

          <!-- Categories Management -->
          <button type="button" class="admin-tab-btn" data-tab="categories-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>Project Categories</span>
            <span class="tab-badge" id="categories-count-badge">0</span>
          </button>

          <!-- Website Statistics CMS (NEW) -->
          <button type="button" class="admin-tab-btn" data-tab="stats-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            <span>Key Stats &amp; Metrics</span>
            <span class="tab-badge" id="stats-count-badge">0</span>
          </button>

          <div class="admin-nav-group-label" style="margin-top: 14px;">Media &amp; Proof</div>

          <!-- About Us Carousel -->
          <button type="button" class="admin-tab-btn" data-tab="carousel-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>About Us Carousel</span>
            <span class="tab-badge" id="carousel-count-badge">0</span>
          </button>

          <!-- Awards & Recognitions -->
          <button type="button" class="admin-tab-btn" data-tab="awards-panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            <span>Awards &amp; Recognitions</span>
            <span class="tab-badge" id="awards-count-badge">0</span>
          </button>
        </div>

        <!-- Sidebar Footer Controls -->
        <div class="admin-sidebar-footer">
          <div class="admin-status-pill" id="live-db-status" title="Database Connection Status">
            <span class="admin-status-dot"></span>
            <span id="db-status-text">Supabase Live</span>
          </div>

          <button type="button" class="btn-sidebar-action" id="btn-sync-supabase" onclick="syncWithSupabase()" title="Pull latest records from Supabase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            <span>Sync Supabase</span>
          </button>

          <a href="/home" target="_blank" class="btn-sidebar-action" title="View Public Website">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            <span>View Live Site</span>
          </a>

          <div class="admin-user-row">
            <div class="admin-user-meta">
              <div class="admin-avatar">SC</div>
              <span class="admin-user-info" id="active-user-name">sorconnect</span>
            </div>
            <button type="button" class="btn-logout-icon" id="admin-logout-btn" title="Sign Out">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="admin-workspace">
        <header class="admin-topbar">
          <div class="admin-topbar-title">
            <h1 id="active-topbar-title">Form Submissions</h1>
            <p id="active-topbar-subtitle">Inbound customer inquiries and turnkey consultation leads</p>
          </div>
          <div class="admin-topbar-actions" id="topbar-actions-container">
            <!-- Dynamic context actions populated based on active tab -->
          </div>
        </header>

        <div class="admin-content">
          ${panelsHtml}
        </div>
      </main>

    </div>
  </div>
  `,

  getSubmissionsPanel: () => `
  <!-- ==================== TAB 1: SUBMISSIONS ==================== -->
  <section id="submissions-panel" class="admin-tab-panel active">
    <!-- Metrics -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div>
          <div class="metric-label">Total Submissions</div>
          <div class="metric-value" id="sub-stat-total">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#f0fdf4; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">New / Uncontacted</div>
          <div class="metric-value" id="sub-stat-new" style="color: #2563eb;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#eff6ff; color:#2563eb;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">High-Value Leads (&gt;₹4,000)</div>
          <div class="metric-value" id="sub-stat-high" style="color: #d97706;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#fffbeb; color:#d97706;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>
    </div>

    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="submissions-search" placeholder="Search by name, WhatsApp, PIN, or notes...">
        </div>

        <select id="submissions-filter-status" class="filter-select">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <select id="submissions-filter-bill" class="filter-select">
          <option value="">All Bill Ranges</option>
          <option value="less-1500">&lt; ₹1,500</option>
          <option value="1500-2500">₹1,500 - ₹2,500</option>
          <option value="2500-4000">₹2,500 - ₹4,000</option>
          <option value="more-4000">&gt; ₹4,000</option>
        </select>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-outline" id="btn-export-csv">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          <span>Export CSV</span>
        </button>
        <button type="button" class="btn-shadcn-outline" id="btn-refresh-submissions" title="Refresh leads table">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          <span>Refresh</span>
        </button>
      </div>
    </div>

    <!-- Submissions Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 130px;">Received</th>
              <th>Customer Name</th>
              <th>WhatsApp / Contact</th>
              <th>Electricity Bill</th>
              <th>PIN / Location</th>
              <th>Status</th>
              <th style="text-align: right; width: 140px;">Actions</th>
            </tr>
          </thead>
          <tbody id="submissions-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="submissions-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <h4>No submissions found</h4>
        <p>No customer inquiries match your current search filters.</p>
      </div>
      <div id="submissions-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load submissions</h4>
        <p id="submissions-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchSubmissions()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getCareersPanel: () => `
  <!-- ==================== TAB 1B: JOB APPLICATIONS & CAREERS ==================== -->
  <section id="careers-panel" class="admin-tab-panel">
    <!-- Metrics -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div>
          <div class="metric-label">Total Applications</div>
          <div class="metric-value" id="careers-stat-total">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#f0fdf4; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">New / Unreviewed</div>
          <div class="metric-value" id="careers-stat-new" style="color: #2563eb;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#eff6ff; color:#2563eb;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Shortlisted Candidates</div>
          <div class="metric-value" id="careers-stat-shortlisted" style="color: #15803d;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#f0fdf4; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Contacted / Interviewing</div>
          <div class="metric-value" id="careers-stat-contacted" style="color: #d97706;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#fffbeb; color:#d97706;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 22 16.92z"/></svg>
        </div>
      </div>
    </div>

    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="careers-search" placeholder="Search by candidate name, position, location, email, or notes...">
        </div>

        <select id="careers-filter-position" class="filter-select">
          <option value="">All Positions</option>
          <option value="Solar Design & PVsyst Engineer">Solar Design &amp; PVsyst Engineer</option>
          <option value="Solar Site Electrical & Commissioning Engineer">Solar Site Electrical &amp; Commissioning Engineer</option>
          <option value="Industrial Solar Project Manager">Industrial Solar Project Manager</option>
          <option value="Business Development Executive — Commercial Solar">Business Development Executive</option>
          <option value="Solar O&M & SCADA Telemetry Specialist">Solar O&amp;M Specialist</option>
          <option value="Open Application / General">Open Application</option>
        </select>

        <select id="careers-filter-status" class="filter-select">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Contacted">Contacted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-outline" id="careers-export-btn" title="Export applications to CSV">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Export CSV</span>
        </button>
        <button type="button" class="btn-shadcn-outline" id="careers-refresh-btn" title="Refresh Applications">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          <span>Refresh</span>
        </button>
      </div>
    </div>

    <!-- Applications Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 120px;">Applied Date</th>
              <th>Applicant</th>
              <th>Position &amp; Experience</th>
              <th>Contact Details</th>
              <th>Location &amp; Notice</th>
              <th>Resume / Portfolio</th>
              <th>Status</th>
              <th style="text-align: right; width: 140px;">Actions</th>
            </tr>
          </thead>
          <tbody id="careers-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="careers-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <h4>No applications found</h4>
        <p>No job applications match your current search or filter criteria.</p>
      </div>
      <div id="careers-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load career applications</h4>
        <p id="careers-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchCareers()">Retry</button>
      </div>
    </div>
  </section>
  `,

  getServicesPanel: () => `
  <!-- ==================== TAB 2: SERVICES PAGE CMS (NEW) ==================== -->
  <section id="services-panel" class="admin-tab-panel">
    <!-- Metrics -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div>
          <div class="metric-label">Total Services Configured</div>
          <div class="metric-value" id="svc-stat-total">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#f0fdf4; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Active on Public Page</div>
          <div class="metric-value" id="svc-stat-active" style="color: #15803d;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#ecfdf5; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Total Offerings &amp; Pointers</div>
          <div class="metric-value" id="svc-stat-offers" style="color: #2563eb;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#eff6ff; color:#2563eb;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Total FAQs Defined</div>
          <div class="metric-value" id="svc-stat-faqs" style="color: #7c3aed;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#faf5ff; color:#7c3aed;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
      </div>
    </div>

    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="services-search" placeholder="Search services by title, badge, or slug...">
        </div>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-primary" id="btn-open-create-service">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add New Service Section</span>
        </button>
      </div>
    </div>

    <!-- Services Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 70px;">Visual</th>
              <th>Service Title &amp; Badge</th>
              <th>Slug / Nav Label</th>
              <th>Content Pointers</th>
              <th>FAQs</th>
              <th style="width: 90px;">Display Order</th>
              <th style="width: 90px;">Status</th>
              <th style="text-align: right; width: 140px;">Actions</th>
            </tr>
          </thead>
          <tbody id="services-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="services-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
        <h4>No services configured</h4>
        <p>Click "Add New Service Section" above to publish your first service offering.</p>
      </div>
      <div id="services-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load services</h4>
        <p id="services-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchServices()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getPartnersPanel: () => `
  <!-- ==================== TAB 3: PARTNERS CMS (NEW) ==================== -->
  <section id="partners-panel" class="admin-tab-panel">
    <!-- Metrics -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div>
          <div class="metric-label">Total Partners Configured</div>
          <div class="metric-value" id="partners-stat-total">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#f0fdf4; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Active on Home &amp; About</div>
          <div class="metric-value" id="partners-stat-active" style="color: #15803d;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#ecfdf5; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-label">Feature Highlights</div>
          <div class="metric-value" id="partners-stat-features" style="color: #2563eb;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#eff6ff; color:#2563eb;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
      </div>
    </div>

    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="partners-search" placeholder="Search partners by name, badge, or specialization...">
        </div>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-primary" id="btn-open-create-partner">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add New Partner</span>
        </button>
      </div>
    </div>

    <!-- Partners Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 75px;">Brand Logo</th>
              <th>Partner Name</th>
              <th>Tier Badge</th>
              <th>Strategic Role / Domain</th>
              <th style="width: 80px;">Showcase</th>
              <th>Key Highlights</th>
              <th style="width: 90px;">Display Order</th>
              <th style="width: 90px;">Status</th>
              <th style="text-align: right; width: 140px;">Actions</th>
            </tr>
          </thead>
          <tbody id="partners-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="partners-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <h4>No partners configured</h4>
        <p>Click "Add New Partner" above to register an OEM, distributor, or channel partner.</p>
      </div>
      <div id="partners-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load partners</h4>
        <p id="partners-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchPartners()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getProjectsPanel: () => `
  <!-- ==================== TAB 4: PROJECTS ==================== -->
  <section id="projects-panel" class="admin-tab-panel">
    <!-- Metrics -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div>
          <div class="metric-label">Total Portfolio Projects</div>
          <div class="metric-value" id="proj-stat-total">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#f0fdf4; color:#15803d;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        </div>
      </div>
      <div class="metric-card">
        <div>
          <div class="metric-label">EPC Turnkey Plants</div>
          <div class="metric-value" id="proj-stat-epc" style="color: #2563eb;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#eff6ff; color:#2563eb;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
      </div>
      <div class="metric-card">
        <div>
          <div class="metric-label">I&amp;C and O&amp;M Deployments</div>
          <div class="metric-value" id="proj-stat-icom" style="color: #7c3aed;">0</div>
        </div>
        <div class="metric-icon-wrap" style="background:#faf5ff; color:#7c3aed;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </div>
      </div>
    </div>

    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="projects-search" placeholder="Search by client, location, capacity, or sector...">
        </div>

        <select id="projects-filter-category" class="filter-select">
          <option value="">All Categories</option>
          <!-- Populated by JS -->
        </select>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-primary" id="btn-open-create-project">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add New Project</span>
        </button>
      </div>
    </div>

    <!-- Projects Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>Client / Entity</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Sector / Type</th>
              <th>Category</th>
              <th style="text-align: right; width: 120px;">Actions</th>
            </tr>
          </thead>
          <tbody id="projects-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="projects-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        <h4>No projects found</h4>
        <p>Click "Add New Project" above to create your first portfolio entry.</p>
      </div>
      <div id="projects-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load projects</h4>
        <p id="projects-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchProjects()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getCategoriesPanel: () => `
  <!-- ==================== TAB 5: CATEGORIES ==================== -->
  <section id="categories-panel" class="admin-tab-panel">
    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="categories-search" placeholder="Search categories by name, slug, or description...">
        </div>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-primary" id="btn-open-create-category">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add New Category</span>
        </button>
      </div>
    </div>

    <!-- Categories Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>Category Name</th>
              <th>Slug / Identifier</th>
              <th>Eyebrow / Subtitle</th>
              <th>Description</th>
              <th style="width: 90px;">Projects</th>
              <th style="text-align: right; width: 120px;">Actions</th>
            </tr>
          </thead>
          <tbody id="categories-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="categories-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <h4>No categories found</h4>
        <p>Click "Add New Category" above to group your portfolio projects.</p>
      </div>
      <div id="categories-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load categories</h4>
        <p id="categories-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchCategories()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getCarouselPanel: () => `
  <!-- ==================== TAB 6: ABOUT US CAROUSEL ==================== -->
  <section id="carousel-panel" class="admin-tab-panel">
    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="carousel-search" placeholder="Search slides by title, subtitle, or location...">
        </div>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-primary" id="btn-open-create-slide">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add Carousel Slide</span>
        </button>
      </div>
    </div>

    <!-- Carousel Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 80px;">Visual</th>
              <th>Slide Title &amp; Subtitle</th>
              <th>Badge</th>
              <th>Location</th>
              <th>Description</th>
              <th style="width: 70px;">Order</th>
              <th style="text-align: right; width: 110px;">Actions</th>
            </tr>
          </thead>
          <tbody id="carousel-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="carousel-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <h4>No carousel slides found</h4>
        <p>Click "Add Carousel Slide" above to feature your plants on the About Us page.</p>
      </div>
      <div id="carousel-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load carousel slides</h4>
        <p id="carousel-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchCarouselSlides()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getAwardsPanel: () => `
  <!-- ==================== TAB 7: AWARDS & RECOGNITIONS ==================== -->
  <section id="awards-panel" class="admin-tab-panel">
    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="awards-search" placeholder="Search awards by title, badge, or description...">
        </div>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-primary" id="btn-open-create-award">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add New Award</span>
        </button>
      </div>
    </div>

    <!-- Awards Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 80px;">Visual</th>
              <th>Award / Recognition Title</th>
              <th>Badge Pill</th>
              <th>Description / Significance</th>
              <th style="width: 70px;">Order</th>
              <th style="text-align: right; width: 110px;">Actions</th>
            </tr>
          </thead>
          <tbody id="awards-tbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
      <div id="awards-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
        <h4>No awards or recognitions found</h4>
        <p>Click "Add New Award" above to create one.</p>
      </div>
      <div id="awards-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load awards</h4>
        <p id="awards-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchAwards()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getStatsPanel: () => `
  <!-- ==================== TAB 9: WEBSITE STATISTICS ==================== -->
  <section id="stats-panel" class="admin-tab-panel">
    <!-- Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="stats-search" placeholder="Search stats by label, value, or section...">
        </div>
      </div>

      <div class="control-bar-right">
        <button type="button" class="btn-shadcn-outline" onclick="fetchStats()" title="Refresh stats from database">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          <span>Refresh Stats</span>
        </button>
      </div>
    </div>

    <!-- Stats Table Card -->
    <div class="admin-card-table">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 170px;">Placement Section</th>
              <th style="width: 140px;">Live Metric</th>
              <th>Headline Label</th>
              <th>Subtitle / Narrative Details</th>
              <th style="width: 70px;">Order</th>
              <th style="text-align: right; width: 100px;">Actions</th>
            </tr>
          </thead>
          <tbody id="stats-tbody">
            <!-- Populated dynamically by JS -->
          </tbody>
        </table>
      </div>
      <div id="stats-empty" class="admin-empty-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
        <h4>No statistics records found</h4>
        <p>Click "Refresh Stats" to load records from database.</p>
      </div>
      <div id="stats-error" class="admin-error-state" style="display: none;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h4>Failed to load statistics</h4>
        <p id="stats-error-msg">Could not connect to database.</p>
        <button type="button" class="btn-shadcn-outline" onclick="fetchStats()">Retry Fetch</button>
      </div>
    </div>
  </section>
  `,

  getContentPanel: () => `
  <!-- ==================== TAB 10: SITE CONTENT & VISUALS CMS ==================== -->
  <section id="content-panel" class="admin-tab-panel">
    <!-- Header / Intro Banner -->
    <div style="background: linear-gradient(135deg, #052e16 0%, #14532d 100%); color: #ffffff; padding: 24px 28px; border-radius: var(--radius); margin-bottom: 24px; box-shadow: 0 4px 14px rgba(5, 46, 22, 0.2);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; color: #86efac; display: block; margin-bottom: 4px;">Universal Content Manager</span>
          <h2 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">Site-Wide Copy, Text &amp; Visuals CMS</h2>
          <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #bbf7d0; max-width: 680px; line-height: 1.5;">
            Manage and edit all headlines, descriptions, button labels, roadmap steps, story paragraphs, and background imagery across the public website. Every update syncs directly with Supabase and applies live instantly.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="button" class="btn-shadcn-primary" onclick="fetchSiteContent()" style="background: #ffffff; color: #14532d; font-weight: 700; border: none;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            <span>Refresh Content</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Sub-navigation Pills -->
    <div class="content-subnav-strip">
      <button type="button" class="content-subnav-btn active" data-filter="all" onclick="filterContentSection('all')">
        <span>🌐 All Content</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="home_hero" onclick="filterContentSection('home_hero')">
        <span>🏠 Homepage Hero</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="home_services" onclick="filterContentSection('home_services')">
        <span>⚡ What We Do (4 Cards)</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="home_about" onclick="filterContentSection('home_about')">
        <span>ℹ️ About Snapshot &amp; Pillars</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="process_steps" onclick="filterContentSection('process_steps')">
        <span>🛣️ 5-Step Process Roadmap</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="about_page" onclick="filterContentSection('about_page')">
        <span>🏢 About Us Page &amp; Vision</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="contact_global" onclick="filterContentSection('contact_global')">
        <span>📞 Contact &amp; Global Info</span>
      </button>
      <button type="button" class="content-subnav-btn" data-filter="cta_strip" onclick="filterContentSection('cta_strip')">
        <span>🎯 Call To Action</span>
      </button>
    </div>

    <!-- Search & Control Bar -->
    <div class="admin-control-bar">
      <div class="control-bar-left">
        <div class="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="content-search-input" placeholder="Search by text, label, key ID, or description..." oninput="filterContentSearch()">
        </div>
      </div>
      <div class="control-bar-right">
        <span id="content-items-counter" style="font-size: 13px; font-weight: 600; color: #64748b;">Showing 41 items</span>
      </div>
    </div>

    <!-- Content Items Grid Container -->
    <div id="content-card-grid" class="content-card-grid">
      <!-- Populated dynamically by JS -->
    </div>

    <div id="content-empty" class="admin-empty-state" style="display: none;">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      <h4>No content elements found matching your search</h4>
      <p>Try clearing your search term or select "All Content" above.</p>
    </div>

    <div id="content-error" class="admin-error-state" style="display: none;">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <h4>Failed to load site content</h4>
      <p id="content-error-msg">Could not connect to database.</p>
      <button type="button" class="btn-shadcn-outline" onclick="fetchSiteContent()">Retry Fetch</button>
    </div>
  </section>
  `,

  getAllModals: () => `
  <!-- ==================== MODAL: VIEW SUBMISSION ==================== -->
  <div id="view-submission-modal" class="admin-modal-overlay">
    <div class="admin-modal-box">
      <div class="admin-modal-header">
        <div>
          <h3>Submission Lead Details</h3>
          <p style="margin:2px 0 0 0; font-size:12px; color:#64748b;">Turnkey consultation customer inquiry</p>
        </div>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('view-submission-modal')">&times;</button>
      </div>
      <div class="admin-modal-body">
        <div id="submission-modal-error" class="modal-error-alert" style="display: none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span class="msg-text"></span>
        </div>
        <div class="detail-key-value-list">
          <div class="detail-row">
            <span class="detail-key">Customer Name</span>
            <span class="detail-val" id="modal-sub-name" style="font-weight: 700; font-size: 16px;"></span>
          </div>
          <div class="detail-row">
            <span class="detail-key">WhatsApp Number</span>
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 2px;">
              <span class="detail-val" id="modal-sub-whatsapp" style="font-weight: 600;"></span>
              <a href="#" id="modal-sub-wa-btn" target="_blank" class="whatsapp-link-btn">
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
          <div class="detail-row">
            <span class="detail-key">Monthly Electricity Bill</span>
            <span class="detail-val"><span id="modal-sub-bill" class="badge badge-amber"></span></span>
          </div>
          <div class="detail-row">
            <span class="detail-key">PIN Code / Location</span>
            <span class="detail-val" id="modal-sub-pin"></span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Additional Note / Project Details</span>
            <span class="detail-val" id="modal-sub-note" style="white-space: pre-wrap; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;"></span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Submission Date &amp; Time</span>
            <span class="detail-val" id="modal-sub-time"></span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Source Page</span>
            <span class="detail-val" id="modal-sub-source"></span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Lead Status</span>
            <div style="margin-top: 4px;">
              <select id="modal-sub-status-select" class="filter-select" style="width: 100%;">
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('view-submission-modal')">Close</button>
        <button type="button" class="btn-shadcn-primary" id="btn-save-sub-status">
          <span>Save Status</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== MODAL: SERVICE CREATE / EDIT (NEW) ==================== -->
  <div id="service-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box large">
      <div class="admin-modal-header">
        <div>
          <h3 id="service-modal-title">Edit Service Section</h3>
          <p style="margin:2px 0 0 0; font-size:12px; color:#64748b;">Configure titles, text, images, pointers, standout features, FAQs &amp; form</p>
        </div>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('service-edit-modal')">&times;</button>
      </div>

      <form id="service-form">
        <input type="hidden" id="service-form-id" name="id">
        <input type="hidden" id="service-form-old-slug" name="old_slug">

        <div class="admin-modal-body">
          <div id="service-modal-error" class="modal-error-alert" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="msg-text"></span>
          </div>

          <!-- Sub-Tabs for clean section navigation -->
          <div class="modal-subtabs">
            <button type="button" class="modal-subtab-btn active" data-subtab="svc-tab-meta">1. Basic &amp; Meta</button>
            <button type="button" class="modal-subtab-btn" data-subtab="svc-tab-story">2. Story &amp; Headings</button>
            <button type="button" class="modal-subtab-btn" data-subtab="svc-tab-media">3. Visual Media</button>
            <button type="button" class="modal-subtab-btn" data-subtab="svc-tab-offers">4. What We Offer (<span id="count-svc-offers">0</span>)</button>
            <button type="button" class="modal-subtab-btn" data-subtab="svc-tab-standouts">5. Why Choose Us (<span id="count-svc-standouts">0</span>)</button>
            <button type="button" class="modal-subtab-btn" data-subtab="svc-tab-faqs">6. FAQs (<span id="count-svc-faqs">0</span>)</button>
            <button type="button" class="modal-subtab-btn" data-subtab="svc-tab-form">7. Quote Form</button>
          </div>

          <!-- SUBTAB 1: Basic & Meta -->
          <div id="svc-tab-meta" class="modal-subpanel active">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="modal-form-group">
                <label for="svc-title">Service Page Heading <span style="color:red;">*</span></label>
                <input type="text" id="svc-title" name="title" required placeholder="e.g. Solar EPC Services">
                <div class="modal-form-hint">Full prominent title at top of service panel.</div>
              </div>

              <div class="modal-form-group">
                <label for="svc-nav-title">Navigation Tab Label <span style="color:red;">*</span></label>
                <input type="text" id="svc-nav-title" name="nav_title" required placeholder="e.g. EPC Services">
                <div class="modal-form-hint">Short label in services sidebar navigation.</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="modal-form-group">
                <label for="svc-slug">URL Slug / Anchor ID <span style="color:red;">*</span></label>
                <input type="text" id="svc-slug" name="slug" required placeholder="e.g. epc or commercial-solar">
                <div class="modal-form-hint">Lowercase identifier, e.g. <code>#epc</code>.</div>
              </div>

              <div class="modal-form-group">
                <label for="svc-badge">Badge Pill Text</label>
                <input type="text" id="svc-badge" name="badge" placeholder="e.g. Turnkey Solutions or Rooftop &amp; Ground">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="modal-form-group">
                <label for="svc-order">Display Sequence Order</label>
                <input type="number" id="svc-order" name="display_order" min="1" max="99" value="1">
              </div>

              <div class="modal-form-group" style="display: flex; align-items: center; gap: 8px; margin-top: 26px;">
                <input type="checkbox" id="svc-is-active" name="is_active" checked style="width: 18px; height: 18px; cursor: pointer;">
                <label for="svc-is-active" style="margin: 0; cursor: pointer;">Published &amp; Active on Website</label>
              </div>
            </div>
          </div>

          <!-- SUBTAB 2: Story & Headings -->
          <div id="svc-tab-story" class="modal-subpanel">
            <div class="modal-form-group">
              <label for="svc-subtitle">Hero Subtitle / Tagline <span style="color:red;">*</span></label>
              <input type="text" id="svc-subtitle" name="subtitle" required placeholder="e.g. End-to-end solar engineering, procurement, and construction...">
            </div>

            <div class="modal-form-group">
              <label for="svc-description">Main Description / Story <span style="color:red;">*</span></label>
              <textarea id="svc-description" name="description" rows="4" required placeholder="Comprehensive description of the service..."></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="modal-form-group">
                <label for="svc-offers-heading">"What We Offer" Section Heading</label>
                <input type="text" id="svc-offers-heading" name="offers_heading" placeholder="What We Offer">
              </div>

              <div class="modal-form-group">
                <label for="svc-standout-heading">"Why Choose Us" Section Heading</label>
                <input type="text" id="svc-standout-heading" name="standout_heading" placeholder="Why Our Services Stand Out">
              </div>
            </div>
          </div>

          <!-- SUBTAB 3: Visual Media (Direct Upload & Preview) -->
          <div id="svc-tab-media" class="modal-subpanel">
            <!-- Media Upload Card 1 (Primary) -->
            <div class="media-upload-card">
              <div class="media-upload-header">
                <div class="media-title-group">
                  <span class="media-label">Primary Section Image</span>
                  <span class="badge badge-emerald" id="svc-image-1-status">Active Media</span>
                </div>
                <div class="media-action-buttons">
                  <label class="btn-shadcn-primary" style="cursor: pointer; height: 32px; font-size: 12px; margin: 0;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <span>Upload Image</span>
                    <input type="file" id="svc-file-1" accept="image/*" style="display: none;">
                  </label>
                  <button type="button" class="btn-action-icon danger" id="btn-remove-svc-img1" title="Clear image">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                  </button>
                </div>
              </div>

              <!-- Drag & Drop / Preview Box -->
              <div class="media-dropzone" id="svc-dropzone-1">
                <div class="media-dropzone-preview" id="svc-image-1-preview">
                  <span class="image-preview-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <span class="drop-title">Click to upload media or drag and drop</span>
                    <span class="drop-sub">PNG, JPG, WebP, or SVG up to 5MB</span>
                  </span>
                </div>
                <div class="media-dropzone-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span>Click or Drop New Image to Replace</span>
                </div>
              </div>

              <!-- Hidden input holding actual URL/data -->
              <input type="hidden" id="svc-image-1" name="image_1" value="assets/svc-epc-1.jpg">

              <!-- Caption -->
              <div style="margin-top: 10px;">
                <label for="svc-image-1-caption" style="font-size: 12px; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">Image 1 Caption / Description</label>
                <input type="text" id="svc-image-1-caption" name="image_1_caption" placeholder="e.g. Turnkey Solar Engineering &amp; Ground Mount" style="width: 100%; padding: 7px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;">
              </div>

              <!-- Quick Gallery Presets -->
              <div style="margin-top: 10px;">
                <span style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">Or pick from existing plant gallery:</span>
                <div class="asset-options-grid" style="margin-top: 4px;">
                  <button type="button" class="asset-option-btn svc-img1-preset" data-src="assets/svc-epc-1.jpg"><img src="assets/svc-epc-1.jpg"> EPC 1</button>
                  <button type="button" class="asset-option-btn svc-img1-preset" data-src="assets/svc-inst-1.jpg"><img src="assets/svc-inst-1.jpg"> Inst 1</button>
                  <button type="button" class="asset-option-btn svc-img1-preset" data-src="assets/svc-om-1.jpg"><img src="assets/svc-om-1.jpg"> O&amp;M 1</button>
                  <button type="button" class="asset-option-btn svc-img1-preset" data-src="assets/svc-design-1.jpg"><img src="assets/svc-design-1.jpg"> Design 1</button>
                  <button type="button" class="asset-option-btn svc-img1-preset" data-src="assets/svc-kusum-1.jpg"><img src="assets/svc-kusum-1.jpg"> KUSUM 1</button>
                  <button type="button" class="asset-option-btn svc-img1-preset" data-src="assets/hero-bg.jpg"><img src="assets/hero-bg.jpg"> Hero Plant</button>
                </div>
              </div>
            </div>

            <!-- Media Upload Card 2 (Secondary) -->
            <div class="media-upload-card">
              <div class="media-upload-header">
                <div class="media-title-group">
                  <span class="media-label">Secondary Section Image</span>
                  <span class="badge badge-emerald" id="svc-image-2-status">Active Media</span>
                </div>
                <div class="media-action-buttons">
                  <label class="btn-shadcn-primary" style="cursor: pointer; height: 32px; font-size: 12px; margin: 0;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <span>Upload Image</span>
                    <input type="file" id="svc-file-2" accept="image/*" style="display: none;">
                  </label>
                  <button type="button" class="btn-action-icon danger" id="btn-remove-svc-img2" title="Clear image">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                  </button>
                </div>
              </div>

              <!-- Drag & Drop / Preview Box -->
              <div class="media-dropzone" id="svc-dropzone-2">
                <div class="media-dropzone-preview" id="svc-image-2-preview">
                  <span class="image-preview-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <span class="drop-title">Click to upload media or drag and drop</span>
                    <span class="drop-sub">PNG, JPG, WebP, or SVG up to 5MB</span>
                  </span>
                </div>
                <div class="media-dropzone-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span>Click or Drop New Image to Replace</span>
                </div>
              </div>

              <!-- Hidden input holding actual URL/data -->
              <input type="hidden" id="svc-image-2" name="image_2" value="assets/svc-epc-2.jpg">

              <!-- Caption -->
              <div style="margin-top: 10px;">
                <label for="svc-image-2-caption" style="font-size: 12px; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">Image 2 Caption / Description</label>
                <input type="text" id="svc-image-2-caption" name="image_2_caption" placeholder="e.g. Precision Rooftop Setup &amp; Inverter Integration" style="width: 100%; padding: 7px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;">
              </div>

              <!-- Quick Gallery Presets -->
              <div style="margin-top: 10px;">
                <span style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">Or pick from existing plant gallery:</span>
                <div class="asset-options-grid" style="margin-top: 4px;">
                  <button type="button" class="asset-option-btn svc-img2-preset" data-src="assets/svc-epc-2.jpg"><img src="assets/svc-epc-2.jpg"> EPC 2</button>
                  <button type="button" class="asset-option-btn svc-img2-preset" data-src="assets/svc-inst-2.jpg"><img src="assets/svc-inst-2.jpg"> Inst 2</button>
                  <button type="button" class="asset-option-btn svc-img2-preset" data-src="assets/svc-om-2.jpg"><img src="assets/svc-om-2.jpg"> O&amp;M 2</button>
                  <button type="button" class="asset-option-btn svc-img2-preset" data-src="assets/svc-design-2.jpg"><img src="assets/svc-design-2.jpg"> Design 2</button>
                  <button type="button" class="asset-option-btn svc-img2-preset" data-src="assets/svc-kusum-2.jpg"><img src="assets/svc-kusum-2.jpg"> KUSUM 2</button>
                  <button type="button" class="asset-option-btn svc-img2-preset" data-src="assets/our-team.jpg"><img src="assets/our-team.jpg"> Our Team</button>
                </div>
              </div>
            </div>
          </div>

          <!-- SUBTAB 4: What We Offer (Dynamic Repeater) -->
          <div id="svc-tab-offers" class="modal-subpanel">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 600; color: #1e293b;">Pointers &amp; Deliverables List</span>
              <button type="button" class="btn-shadcn-outline" id="btn-add-svc-offer" style="height: 30px; font-size: 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Pointer Item</span>
              </button>
            </div>
            <div id="svc-offers-container">
              <!-- Dynamically rendered by JS -->
            </div>
          </div>

          <!-- SUBTAB 5: Why Choose Us (Dynamic Repeater) -->
          <div id="svc-tab-standouts" class="modal-subpanel">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 600; color: #1e293b;">Standout Features / Highlights</span>
              <button type="button" class="btn-shadcn-outline" id="btn-add-svc-standout" style="height: 30px; font-size: 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Standout Point</span>
              </button>
            </div>
            <div id="svc-standouts-container">
              <!-- Dynamically rendered by JS -->
            </div>
          </div>

          <!-- SUBTAB 6: FAQs (Dynamic Repeater) -->
          <div id="svc-tab-faqs" class="modal-subpanel">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 600; color: #1e293b;">Frequently Asked Questions (Accordion)</span>
              <button type="button" class="btn-shadcn-outline" id="btn-add-svc-faq" style="height: 30px; font-size: 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add FAQ Item</span>
              </button>
            </div>
            <div id="svc-faqs-container">
              <!-- Dynamically rendered by JS -->
            </div>
          </div>

          <!-- SUBTAB 7: Quote Form Copy -->
          <div id="svc-tab-form" class="modal-subpanel">
            <div class="modal-form-group">
              <label for="svc-form-sub">Form Eyebrow / Subheading</label>
              <input type="text" id="svc-form-sub" name="form_sub" placeholder="e.g. Turnkey EPC Consultation">
            </div>

            <div class="modal-form-group">
              <label for="svc-form-title">Form Main Heading</label>
              <input type="text" id="svc-form-title" name="form_title" placeholder="e.g. Get a Turnkey Quote for Your Project">
            </div>

            <div class="modal-form-group">
              <label for="svc-form-desc">Form Helper Description</label>
              <textarea id="svc-form-desc" name="form_desc" rows="3" placeholder="Submit your site requirements and contact details. Our engineering division will share a custom quote within 24 hours."></textarea>
            </div>

            <div class="modal-form-group">
              <label for="svc-form-btn">Submit Button CTA Text</label>
              <input type="text" id="svc-form-btn" name="form_btn" placeholder="e.g. Request EPC Quotation">
            </div>
          </div>

        </div>

        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('service-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-service">
            <span>Save Service Changes</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: PARTNER CREATE / EDIT (NEW) ==================== -->
  <div id="partner-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box">
      <div class="admin-modal-header">
        <div>
          <h3 id="partner-modal-title">Edit Strategic Partner</h3>
          <p style="margin:2px 0 0 0; font-size:12px; color:#64748b;">Manage brand logo, tier label, showcase image, and bullet points</p>
        </div>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('partner-edit-modal')">&times;</button>
      </div>

      <form id="partner-form">
        <input type="hidden" id="partner-form-id" name="id">

        <div class="admin-modal-body">
          <div id="partner-modal-error" class="modal-error-alert" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="msg-text"></span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="modal-form-group">
              <label for="partner-name">Partner Company Name <span style="color:red;">*</span></label>
              <input type="text" id="partner-name" name="name" required placeholder="e.g. Hitachi Energy">
            </div>

            <div class="modal-form-group">
              <label for="partner-tier-badge">Tier Badge / Label <span style="color:red;">*</span></label>
              <input type="text" id="partner-tier-badge" name="tier_badge" required placeholder="e.g. Distributor, Channel Partner">
              <div class="modal-form-hint">Shown as prominent pill (e.g. "Distributor").</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="modal-form-group">
              <label for="partner-role">Role / Specialization <span style="color:red;">*</span></label>
              <input type="text" id="partner-role" name="role" required placeholder="e.g. Inverter &amp; Power Systems">
            </div>

            <div class="modal-form-group">
              <label for="partner-order">Display Sequence Order</label>
              <input type="number" id="partner-order" name="display_order" min="1" max="99" value="1">
            </div>
          </div>

          <!-- Logo Field -->
          <div class="modal-form-group">
            <label for="partner-logo">Logo Image Path / URL <span style="color:red;">*</span></label>
            <input type="text" id="partner-logo" name="logo" required placeholder="assets/hitachi-logo.jpeg">
            
            <div class="asset-options-grid">
              <button type="button" class="asset-option-btn partner-logo-preset" data-src="assets/hitachi-logo.jpeg"><img src="assets/hitachi-logo.jpeg"> Hitachi Logo</button>
              <button type="button" class="asset-option-btn partner-logo-preset" data-src="assets/reliance-logo.jpeg"><img src="assets/reliance-logo.jpeg"> Reliance Logo</button>
              <button type="button" class="asset-option-btn partner-logo-preset" data-src="assets/sungrow-logo.png"><img src="assets/sungrow-logo.png"> Sungrow Logo</button>
              <button type="button" class="asset-option-btn partner-logo-preset" data-src="assets/logo.png"><img src="assets/logo.png"> Sor Connect Logo</button>
            </div>

            <div class="image-preview-box" id="partner-logo-preview" style="height: 60px; margin-top: 6px;">
              <span class="image-preview-placeholder">Logo preview</span>
            </div>
          </div>

          <!-- Preview / Showcase Image Field -->
          <div class="modal-form-group">
            <label for="partner-preview-image">Showcase / Plant Image Path or URL</label>
            <input type="text" id="partner-preview-image" name="preview_image" placeholder="assets/award-hitachi.jpg">
            
            <div class="asset-options-grid">
              <button type="button" class="asset-option-btn partner-prev-preset" data-src="assets/award-hitachi.jpg"><img src="assets/award-hitachi.jpg"> Hitachi Certificate</button>
              <button type="button" class="asset-option-btn partner-prev-preset" data-src="assets/partner-reliance-expo.jpg"><img src="assets/partner-reliance-expo.jpg"> Reliance Expo</button>
              <button type="button" class="asset-option-btn partner-prev-preset" data-src="assets/partner-sungrow-expo.jpg"><img src="assets/partner-sungrow-expo.jpg"> Sungrow Expo</button>
              <button type="button" class="asset-option-btn partner-prev-preset" data-src="assets/hero-bg.jpg"><img src="assets/hero-bg.jpg"> Solar Field</button>
            </div>

            <div class="image-preview-box" id="partner-preview-img-box" style="height: 80px; margin-top: 6px;">
              <span class="image-preview-placeholder">Showcase preview</span>
            </div>
          </div>

          <!-- Description -->
          <div class="modal-form-group">
            <label for="partner-description">Partner Description / Overview <span style="color:red;">*</span></label>
            <textarea id="partner-description" name="description" rows="3" required placeholder="Describe the strategic partnership, certifications, product guarantees, and regional distribution..."></textarea>
          </div>

          <!-- Dynamic Feature Highlights Repeater -->
          <div class="modal-form-group">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <label style="margin: 0;">Key Feature Highlights / Bullet Points</label>
              <button type="button" class="btn-shadcn-outline" id="btn-add-partner-feature" style="height: 28px; font-size: 11.5px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Bullet Point</span>
              </button>
            </div>
            <div id="partner-features-container">
              <!-- Dynamically populated by JS -->
            </div>
          </div>

          <div class="modal-form-group" style="display: flex; align-items: center; gap: 8px; margin-top: 14px;">
            <input type="checkbox" id="partner-is-active" name="is_active" checked style="width: 18px; height: 18px; cursor: pointer;">
            <label for="partner-is-active" style="margin: 0; cursor: pointer;">Display on Public Home &amp; About Pages</label>
          </div>
        </div>

        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('partner-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-partner">
            <span>Save Partner</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: PROJECT CREATE/EDIT ==================== -->
  <div id="project-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box">
      <div class="admin-modal-header">
        <h3 id="project-modal-title">Add New Project</h3>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('project-edit-modal')">&times;</button>
      </div>
      <form id="project-form">
        <input type="hidden" id="project-form-id" name="id">
        <div class="admin-modal-body">
          <div id="project-modal-error" class="modal-error-alert" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="msg-text"></span>
          </div>

          <div class="modal-form-group">
            <label for="proj-client">Client / Company Name <span style="color:red;">*</span></label>
            <input type="text" id="proj-client" name="client" required placeholder="e.g. Vishwaraj Environment Ltd">
          </div>

          <div class="modal-form-group">
            <label for="proj-location">Location <span style="color:red;">*</span></label>
            <input type="text" id="proj-location" name="location" required placeholder="e.g. Agra, Uttar Pradesh / Kishangarh, Ajmer">
          </div>

          <div class="modal-form-group">
            <label for="proj-capacity">Capacity <span style="color:red;">*</span></label>
            <input type="text" id="proj-capacity" name="capacity" required placeholder="e.g. 2315 KW or 1.5 MW">
          </div>

          <div class="modal-form-group">
            <label for="proj-sector">Sector or Type <span style="color:red;">*</span></label>
            <input type="text" id="proj-sector" name="sector_or_type" required placeholder="e.g. STP / Marble / Diamond / I&amp;C / O&amp;M / Automotive">
          </div>

          <div class="modal-form-group">
            <label for="proj-category">Category <span style="color:red;">*</span></label>
            <select id="proj-category" name="category_slug" required>
              <!-- Populated by JS -->
            </select>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('project-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-project">
            <span>Save Project</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: CATEGORY CREATE/EDIT ==================== -->
  <div id="category-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box">
      <div class="admin-modal-header">
        <h3 id="category-modal-title">Add New Category</h3>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('category-edit-modal')">&times;</button>
      </div>
      <form id="category-form">
        <input type="hidden" id="category-form-id" name="id">
        <input type="hidden" id="category-form-old-slug" name="old_slug">
        <div class="admin-modal-body">
          <div id="category-modal-error" class="modal-error-alert" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="msg-text"></span>
          </div>

          <div class="modal-form-group">
            <label for="cat-name">Category Name <span style="color:red;">*</span></label>
            <input type="text" id="cat-name" name="name" required placeholder="e.g. Commercial Rooftop Projects">
            <div class="modal-form-hint">Display name for the category portfolio.</div>
          </div>

          <div class="modal-form-group">
            <label for="cat-slug">Category Slug (URL / Table ID) <span style="color:red;">*</span></label>
            <input type="text" id="cat-slug" name="slug" required placeholder="e.g. commercial_rooftop">
            <div class="modal-form-hint">Unique identifier using letters, numbers, and underscores (e.g. <code>commercial_rooftop</code>).</div>
          </div>

          <div class="modal-form-group">
            <label for="cat-eyebrow">Eyebrow / Subtitle</label>
            <input type="text" id="cat-eyebrow" name="eyebrow" placeholder="e.g. Commercial Rooftop Portfolio">
          </div>

          <div class="modal-form-group">
            <label for="cat-desc">Description</label>
            <textarea id="cat-desc" name="description" rows="3" placeholder="Brief summary of projects in this category..."></textarea>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('category-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-category">
            <span>Save Category</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: CAROUSEL CREATE/EDIT ==================== -->
  <div id="carousel-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box" style="max-width: 640px;">
      <div class="admin-modal-header">
        <h3 id="carousel-modal-title">Add Carousel Slide</h3>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('carousel-edit-modal')">&times;</button>
      </div>
      <form id="carousel-form">
        <input type="hidden" id="carousel-form-id" name="id">
        <div class="admin-modal-body">
          <div id="carousel-modal-error" class="modal-error-alert" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="msg-text"></span>
          </div>

          <div class="modal-form-group">
            <label for="slide-title">Slide Title <span style="color:red;">*</span></label>
            <input type="text" id="slide-title" name="title" required placeholder="e.g. Industrial Rooftop Solar EPC Plant">
          </div>

          <div class="modal-form-group">
            <label for="slide-subtitle">Subtitle / Capacity Specification</label>
            <input type="text" id="slide-subtitle" name="subtitle" placeholder="e.g. 2,315 kW Turnkey Industrial Installation">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="modal-form-group">
              <label for="slide-badge">Badge / Category Tag</label>
              <input type="text" id="slide-badge" name="badge" placeholder="e.g. Turnkey EPC, PM-KUSUM, I&amp;C">
            </div>

            <div class="modal-form-group">
              <label for="slide-location">Location / State</label>
              <input type="text" id="slide-location" name="location" placeholder="e.g. Kishangarh, Rajasthan">
            </div>
          </div>

          <div class="modal-form-group">
            <label for="slide-desc">Description / Story Summary <span style="color:red;">*</span></label>
            <textarea id="slide-desc" name="description" rows="3" required placeholder="Provide an informative overview of the project, technology used, or milestone..."></textarea>
          </div>

          <div class="media-upload-card" style="margin-bottom: 14px;">
            <div class="media-upload-header">
              <div class="media-title-group">
                <span class="media-label">Slide Visual Image <span style="color:red;">*</span></span>
                <span class="badge badge-emerald" id="slide-image-status">Active Media</span>
              </div>
              <div class="media-action-buttons">
                <label class="btn-shadcn-primary" style="cursor: pointer; height: 32px; font-size: 12px; margin: 0;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span>Upload Image</span>
                  <input type="file" id="slide-file" accept="image/*" style="display: none;">
                </label>
                <button type="button" class="btn-action-icon danger" id="btn-remove-slide-img" title="Clear image">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                </button>
              </div>
            </div>

            <!-- Drag & Drop / Preview Box -->
            <div class="media-dropzone" id="slide-dropzone">
              <div class="media-dropzone-preview" id="slide-image-preview">
                <span class="image-preview-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span class="drop-title">Click to upload image or drag and drop</span>
                  <span class="drop-sub">PNG, JPG, WebP up to 8MB</span>
                </span>
              </div>
              <div class="media-dropzone-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                <span>Click or Drop New Image to Replace</span>
              </div>
            </div>

            <!-- Hidden input holding actual URL/data -->
            <input type="hidden" id="slide-image" name="image" value="assets/svc-epc-1.jpg">

            <div style="margin-top: 10px; font-size: 11.5px; font-weight: 600; color: #64748b;">
              Or select from verified library:
            </div>
            <div class="asset-options-grid" style="margin-top: 6px;">
              <button type="button" class="asset-option-btn slide-preset-btn" data-src="assets/svc-epc-1.jpg"><img src="assets/svc-epc-1.jpg"> EPC 1</button>
              <button type="button" class="asset-option-btn slide-preset-btn" data-src="assets/svc-epc-2.jpg"><img src="assets/svc-epc-2.jpg"> EPC 2</button>
              <button type="button" class="asset-option-btn slide-preset-btn" data-src="assets/svc-inst-1.jpg"><img src="assets/svc-inst-1.jpg"> I&amp;C 1</button>
              <button type="button" class="asset-option-btn slide-preset-btn" data-src="assets/svc-om-1.jpg"><img src="assets/svc-om-1.jpg"> O&amp;M 1</button>
              <button type="button" class="asset-option-btn slide-preset-btn" data-src="assets/hero-bg.jpg"><img src="assets/hero-bg.jpg"> Hero Solar</button>
              <button type="button" class="asset-option-btn slide-preset-btn" data-src="assets/our-team.jpg"><img src="assets/our-team.jpg"> Our Team</button>
            </div>
          </div>

          <div class="modal-form-group">
            <label for="slide-order">Display Sequence Order</label>
            <input type="number" id="slide-order" name="order" min="1" max="99" value="1" style="width: 120px;">
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('carousel-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-carousel-slide">
            <span>Save Slide</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: ADD / EDIT AWARD ==================== -->
  <div id="award-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box" style="max-width: 640px;">
      <div class="admin-modal-header">
        <h3 id="award-modal-title">Add Award / Recognition</h3>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('award-edit-modal')">&times;</button>
      </div>
      <form id="award-form">
        <div class="admin-modal-body">
          <div id="award-modal-error" class="modal-error-alert" style="display: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="msg-text"></span>
          </div>

          <input type="hidden" id="award-form-id" name="id">

          <div class="modal-form-group">
            <label for="award-title">Award / Recognition Title <span style="color:red;">*</span></label>
            <input type="text" id="award-title" name="title" required placeholder="e.g. SolarQuarter Top Contractors 2025">
          </div>

          <div class="modal-form-group">
            <label for="award-badge">Badge Pill Text <span style="color:red;">*</span></label>
            <input type="text" id="award-badge" name="badge" required placeholder="e.g. Company of the Year, Official Alliance">
          </div>

          <div class="modal-form-group">
            <label for="award-desc">Description / Significance <span style="color:red;">*</span></label>
            <textarea id="award-desc" name="description" rows="3" required placeholder="Brief description of the award or accreditation..."></textarea>
          </div>

          <div class="media-upload-card" style="margin-bottom: 14px;">
            <div class="media-upload-header">
              <div class="media-title-group">
                <span class="media-label">Award / Recognition Photo <span style="color:red;">*</span></span>
                <span class="badge badge-emerald" id="award-image-status">Active Media</span>
              </div>
              <div class="media-action-buttons">
                <label class="btn-shadcn-primary" style="cursor: pointer; height: 32px; font-size: 12px; margin: 0;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span>Upload Image</span>
                  <input type="file" id="award-file" accept="image/*" style="display: none;">
                </label>
                <button type="button" class="btn-action-icon danger" id="btn-remove-award-img" title="Clear image">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                </button>
              </div>
            </div>

            <!-- Drag & Drop / Preview Box -->
            <div class="media-dropzone" id="award-dropzone">
              <div class="media-dropzone-preview" id="award-image-preview">
                <span class="image-preview-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span class="drop-title">Click to upload award photo or drag and drop</span>
                  <span class="drop-sub">PNG, JPG, WebP up to 8MB</span>
                </span>
              </div>
              <div class="media-dropzone-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                <span>Click or Drop New Image to Replace</span>
              </div>
            </div>

            <!-- Hidden input holding actual URL/data -->
            <input type="hidden" id="award-image" name="image" value="assets/award-solarquarter-2025-stage.jpg">

            <div style="margin-top: 10px; font-size: 11.5px; font-weight: 600; color: #64748b;">
              Or select from verified library:
            </div>
            <div class="asset-options-grid" style="margin-top: 6px;">
              <button type="button" class="asset-option-btn award-preset-btn" data-src="assets/award-solarquarter-2025-stage.jpg"><img src="assets/award-solarquarter-2025-stage.jpg"> SQ Stage</button>
              <button type="button" class="asset-option-btn award-preset-btn" data-src="assets/award-bharat-renewable-2026.jpg"><img src="assets/award-bharat-renewable-2026.jpg"> Bharat Renewable</button>
              <button type="button" class="asset-option-btn award-preset-btn" data-src="assets/award-reliance.jpg"><img src="assets/award-reliance.jpg"> Reliance</button>
              <button type="button" class="asset-option-btn award-preset-btn" data-src="assets/award-hitachi.jpg"><img src="assets/award-hitachi.jpg"> Hitachi</button>
              <button type="button" class="asset-option-btn award-preset-btn" data-src="assets/award-solarquarter-2024-trophy.jpg"><img src="assets/award-solarquarter-2024-trophy.jpg"> SQ Trophy</button>
              <button type="button" class="asset-option-btn award-preset-btn" data-src="assets/award-eps-agra-trophy.jpg"><img src="assets/award-eps-agra-trophy.jpg"> EPS Agra</button>
            </div>
          </div>

          <div class="modal-form-group">
            <label for="award-order">Display Sequence Order</label>
            <input type="number" id="award-order" name="order" min="1" max="99" value="1" style="width: 120px;">
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('award-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-award">
            <span>Save Award</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Candidate Application Detail Modal -->
  <div id="career-detail-modal" class="admin-modal-overlay">
    <div class="admin-modal-box" style="max-width: 680px;">
      <div class="admin-modal-header">
        <h3 id="career-modal-title">Candidate Application Details</h3>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('career-detail-modal')">&times;</button>
      </div>
      <div class="admin-modal-body" id="career-modal-content">
        <!-- Rendered dynamically -->
      </div>
      <div class="admin-modal-footer" style="justify-content: space-between;">
        <button type="button" class="btn-shadcn-danger" id="career-modal-delete-btn">Delete Application</button>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('career-detail-modal')">Close</button>
          <a id="career-modal-resume-btn" href="#" target="_blank" download class="btn-shadcn-primary" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Website Metric / Stat Edit Modal -->
  <div id="stat-edit-modal" class="admin-modal-overlay">
    <div class="admin-modal-box" style="max-width: 540px;">
      <div class="admin-modal-header">
        <h3 id="stat-modal-title">Edit Metric</h3>
        <button type="button" class="admin-modal-close" onclick="closeAdminModal('stat-edit-modal')">&times;</button>
      </div>
      <form id="stat-form">
        <div class="admin-modal-body">
          <div id="stat-modal-error" class="modal-error-box" style="display: none;"></div>
          <input type="hidden" id="stat-form-id" name="id">
          
          <div class="modal-form-group">
            <label>Website Placement Section</label>
            <input type="text" id="stat-section-name" readonly style="background: #f1f5f9; cursor: not-allowed; font-weight: 500;">
          </div>

          <div class="modal-form-row">
            <div class="modal-form-group" style="flex: 1;">
              <label for="stat-value">Metric Value / Number <span class="req">*</span></label>
              <input type="text" id="stat-value" name="stat_value" required placeholder="e.g. 150 or 10k" style="font-weight: 700; font-size: 16px;">
            </div>
            <div class="modal-form-group" style="flex: 1;">
              <label for="stat-suffix">Suffix Badge</label>
              <input type="text" id="stat-suffix" name="stat_suffix" placeholder="e.g. + MW or % or +" style="font-weight: 700; font-size: 16px;">
            </div>
          </div>

          <div class="modal-form-group">
            <label for="stat-label">Headline Label / Title <span class="req">*</span></label>
            <input type="text" id="stat-label" name="label" required placeholder="e.g. Solar capacity managed">
          </div>

          <div class="modal-form-group" id="stat-desc-group">
            <label for="stat-description">Supporting Subtitle / Narrative Description</label>
            <textarea id="stat-description" name="description" rows="3" placeholder="Short description displayed beneath the metric..."></textarea>
          </div>

          <div class="modal-form-group">
            <label for="stat-order">Sequence Order</label>
            <input type="number" id="stat-order" name="order" min="1" max="99" value="1" style="width: 120px;">
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn-shadcn-outline" onclick="closeAdminModal('stat-edit-modal')">Cancel</button>
          <button type="submit" class="btn-shadcn-primary" id="btn-save-stat">
            <span>Save Metric</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast Container -->
  <div id="admin-toast-container" class="admin-toast-container"></div>
  `
};
