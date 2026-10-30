// admin_styles.js - Complete shadcn/ui CSS design tokens and styles

module.exports = {
  cssStyles: `
/* ==================== SHADCN / UI DESIGN SYSTEM ==================== */
:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;
  --primary: #15803d;
  --primary-hover: #166534;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f8fafc;
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --border-subtle: #f1f5f9;
  --input: #e2e8f0;
  --ring: #15803d;
  --radius: 8px;
  --sidebar-w: 260px;
}

* {
  box-sizing: border-box;
}

body.admin-body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* Auth / Login View */
.admin-login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: radial-gradient(circle at 50% 30%, #14532d 0%, #052e16 100%);
  position: relative;
  overflow: hidden;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  padding: 36px 32px;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.login-logo img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.login-logo span {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 21px;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.login-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: #ecfdf5;
  color: #15803d;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid #bbf7d0;
  margin-bottom: 8px;
}

.login-header h2 {
  font-size: 19px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px 0;
}

.login-header p {
  color: #64748b;
  font-size: 13.5px;
  margin: 0;
}

.login-form .form-group {
  margin-bottom: 18px;
}

.login-form label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.login-input-wrap {
  position: relative;
}

.login-form input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.15s ease;
  background: #ffffff;
  color: #0f172a;
}

.login-form input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.2);
}

.password-toggle-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 4px;
  display: flex;
  align-items: center;
}

.login-btn {
  width: 100%;
  height: 42px;
  background: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover {
  background: var(--primary-hover);
}

.login-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 16px;
  display: none;
  align-items: center;
  gap: 8px;
}

/* ==================== DASHBOARD SHELL ==================== */
.admin-dashboard {
  display: none;
  min-height: 100vh;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
}

/* Left Sidebar */
.admin-sidebar {
  width: var(--sidebar-w);
  background: #ffffff;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 50;
  flex-shrink: 0;
}

.admin-sidebar-header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.admin-sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.admin-sidebar-brand img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.admin-sidebar-brand span {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.admin-sidebar-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  background: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
}

.admin-sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
}

.admin-nav-group-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  padding: 10px 12px 6px 12px;
  margin: 0;
}

.admin-tab-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 500;
  color: #475569;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 2px;
  text-align: left;
}

.admin-tab-btn:hover {
  background: #f8fafc;
  color: #0f172a;
}

.admin-tab-btn.active {
  background: #ecfdf5;
  color: #15803d;
  font-weight: 600;
  border-color: #bbf7d0;
}

.admin-tab-btn svg {
  flex-shrink: 0;
  color: #64748b;
  transition: color 0.15s ease;
}

.admin-tab-btn:hover svg {
  color: #0f172a;
}

.admin-tab-btn.active svg {
  color: #15803d;
}

.admin-tab-btn .tab-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #475569;
}

.admin-tab-btn.active .tab-badge {
  background: #15803d;
  color: #ffffff;
}

.admin-sidebar-footer {
  border-top: 1px solid var(--border);
  padding: 14px 16px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 500;
  color: #15803d;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 4px 10px;
  border-radius: 20px;
}

.admin-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.admin-status-pill.syncing .admin-status-dot {
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

.btn-sidebar-action {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #ffffff;
  color: #334155;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}

.btn-sidebar-action:hover {
  background: #f8fafc;
  color: #0f172a;
}

.admin-user-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  border-top: 1px solid #f1f5f9;
}

.admin-user-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #15803d;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.admin-user-info {
  font-size: 12.5px;
  font-weight: 600;
  color: #0f172a;
}

.btn-logout-icon {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s;
}

.btn-logout-icon:hover {
  color: #ef4444;
  background: #fef2f2;
}

/* Main Workspace */
.admin-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--background);
}

.admin-topbar {
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid var(--border);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 40;
}

.admin-topbar-title {
  display: flex;
  flex-direction: column;
}

.admin-topbar-title h1 {
  font-size: 17px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.admin-topbar-title p {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.admin-topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-content {
  padding: 28px 32px 48px 32px;
  flex: 1;
}

.admin-tab-panel {
  display: none;
}

.admin-tab-panel.active {
  display: block;
}

/* ==================== SHADCN COMPONENTS ==================== */
/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.metric-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.metric-label {
  font-size: 12.5px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
}

.metric-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #475569;
}

/* Control & Filter Bar */
.admin-control-bar {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
}

.control-bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 280px;
  flex-wrap: wrap;
}

.control-bar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.search-box svg {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.search-box input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 36px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13.5px;
  font-family: inherit;
  background: #ffffff;
  color: #0f172a;
  transition: all 0.15s;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.15);
}

.filter-select {
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 12px;
  font-size: 13px;
  font-family: inherit;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

/* Buttons */
.btn-shadcn-primary {
  height: 36px;
  padding: 0 14px;
  background: var(--primary);
  color: #ffffff;
  border: 1px solid var(--primary);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  white-space: nowrap;
}

.btn-shadcn-primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-shadcn-dark {
  height: 36px;
  padding: 0 14px;
  background: #0f172a;
  color: #ffffff;
  border: 1px solid #0f172a;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  white-space: nowrap;
}

.btn-shadcn-dark:hover {
  background: #1e293b;
}

.btn-shadcn-outline {
  height: 36px;
  padding: 0 14px;
  background: #ffffff;
  color: #334155;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  white-space: nowrap;
}

.btn-shadcn-outline:hover {
  background: #f8fafc;
  color: #0f172a;
}

.btn-action-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-action-icon:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.btn-action-icon.danger:hover {
  background: #fef2f2;
  color: #ef4444;
  border-color: #fecaca;
}

/* Data Tables */
.admin-card-table {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
  text-align: left;
}

table.admin-table thead th {
  background: #f8fafc;
  padding: 11px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

table.admin-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
  color: #1e293b;
}

table.admin-table tbody tr:hover {
  background-color: #f8fafc;
}

table.admin-table tbody tr:last-child td {
  border-bottom: none;
}

/* Pill Badges */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 9999px;
  white-space: nowrap;
}

.badge-emerald {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.badge-blue {
  background: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.badge-amber {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

.badge-slate {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.badge-rose {
  background: #fff1f2;
  color: #9f1239;
  border: 1px solid #fecdd3;
}

.badge-purple {
  background: #faf5ff;
  color: #6b21a8;
  border: 1px solid #e9d5ff;
}

/* Image Thumbnails */
.table-thumb {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid var(--border);
  background: #f1f5f9;
  display: block;
}

.table-logo-thumb {
  width: 56px;
  height: 38px;
  border-radius: 6px;
  object-fit: contain;
  border: 1px solid var(--border);
  background: #ffffff;
  padding: 2px;
  display: block;
}

/* Empty / Error States */
.admin-empty-state, .admin-error-state {
  text-align: center;
  padding: 48px 24px;
}

.admin-empty-state svg, .admin-error-state svg {
  color: #94a3b8;
  margin-bottom: 12px;
}

.admin-empty-state h4, .admin-error-state h4 {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 6px 0;
}

.admin-empty-state p, .admin-error-state p {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 16px 0;
}

/* Skeleton Loading */
.table-skeleton-row td {
  padding: 16px;
}

.skeleton-bar {
  height: 16px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* ==================== MODALS / DIALOGS ==================== */
.admin-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: none;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.admin-modal-overlay.active {
  display: flex;
}

.admin-modal-box {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 100%;
  max-width: 760px;
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  margin: auto 0;
}

.admin-modal-box form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.admin-modal-box.large {
  max-width: 880px;
}

.admin-modal-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  flex-shrink: 0;
}

.admin-modal-header h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #0f172a;
}

.admin-modal-close {
  background: none;
  border: none;
  font-size: 22px;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.15s;
}

.admin-modal-close:hover {
  color: #0f172a;
}

.admin-modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}

.admin-modal-body::-webkit-scrollbar {
  width: 6px;
}

.admin-modal-body::-webkit-scrollbar-track {
  background: #f8fafc;
}

.admin-modal-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.admin-modal-body::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.admin-modal-footer {
  padding: 14px 24px;
  border-top: 1px solid var(--border);
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.modal-form-group {
  margin-bottom: 18px;
}

.modal-form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.modal-form-group input[type="text"],
.modal-form-group input[type="number"],
.modal-form-group select,
.modal-form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13.5px;
  font-family: inherit;
  color: #0f172a;
  background: #ffffff;
  transition: all 0.15s;
}

.modal-form-group input:focus,
.modal-form-group select:focus,
.modal-form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.15);
}

.modal-form-hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.modal-error-alert {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Modal Sub-Tabs (e.g. for Services CMS) */
.modal-subtabs {
  display: flex;
  gap: 6px;
  border-bottom: 1px solid var(--border);
  margin: -24px -24px 20px -24px;
  padding: 14px 24px 10px 24px;
  overflow-x: auto;
  position: sticky;
  top: -24px;
  background: #ffffff;
  z-index: 20;
}

.modal-subtab-btn {
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  padding: 7px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.modal-subtab-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.modal-subtab-btn.active {
  background: #ecfdf5;
  color: #15803d;
  font-weight: 600;
}

.modal-subpanel {
  display: none;
}

.modal-subpanel.active {
  display: block;
}

/* Dynamic Repeater Items */
.repeater-item-card {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 12px;
  position: relative;
}

.repeater-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.repeater-item-num {
  font-size: 12px;
  font-weight: 700;
  color: #15803d;
  text-transform: uppercase;
}

.btn-remove-repeater {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.btn-remove-repeater:hover {
  background: #fef2f2;
}

/* Image Preview */
.image-preview-box {
  width: 100%;
  height: 150px;
  border: 1.5px dashed var(--border);
  border-radius: 6px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  overflow: hidden;
}

.image-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 12.5px;
}

/* Preset Asset Pills */
.asset-options-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.asset-option-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 11.5px;
  color: #334155;
  cursor: pointer;
  transition: all 0.15s;
}

.asset-option-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.asset-option-btn img {
  width: 18px;
  height: 18px;
  border-radius: 2px;
  object-fit: cover;
}

/* Toast Container */
.admin-toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.admin-toast {
  pointer-events: auto;
  min-width: 280px;
  max-width: 420px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  animation: toast-in 0.2s ease-out;
}

.admin-toast.success {
  background: #ffffff;
  color: #065f46;
  border: 1px solid #bbf7d0;
  border-left: 4px solid #10b981;
}

.admin-toast.error {
  background: #ffffff;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-left: 4px solid #ef4444;
}

.admin-toast.info {
  background: #ffffff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
  border-left: 4px solid #3b82f6;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Submission Lead Modal Details */
.detail-key-value-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-subtle);
}

.detail-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.detail-key {
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.04em;
}

.detail-val {
  font-size: 14px;
  color: #0f172a;
}

.whatsapp-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  background: #25d366;
  color: #ffffff;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.15s;
}

.whatsapp-link-btn:hover {
  opacity: 0.9;
}

/* Media Upload Card & Dropzone */
.media-upload-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 18px;
}

.media-upload-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.media-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.media-label {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.media-action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.media-dropzone {
  position: relative;
  width: 100%;
  height: 190px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
}

.media-dropzone:hover, .media-dropzone.dragover {
  border-color: var(--primary);
  background: #f0fdf4;
}

.media-dropzone-preview {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-dropzone-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.media-dropzone-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.media-dropzone:hover .media-dropzone-overlay {
  opacity: 1;
}

.media-dropzone-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #64748b;
  text-align: center;
  padding: 16px;
}

.media-dropzone-placeholder svg {
  color: #94a3b8;
}

.media-dropzone-placeholder .drop-title {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.media-dropzone-placeholder .drop-sub {
  font-size: 11.5px;
  color: #94a3b8;
}

.media-upload-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: var(--primary);
  transition: width 0.3s;
}

/* ==================== SITE CONTENT & PAGES CMS STYLES ==================== */
.content-subnav-strip {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
  padding: 6px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.content-subnav-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.content-subnav-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.content-subnav-btn.active {
  background: #15803d;
  color: #ffffff;
}

.content-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .content-card-grid {
    grid-template-columns: 1fr;
  }
}

.content-item-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.content-item-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.content-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
}

.content-card-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.content-card-label {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.content-card-key {
  font-family: monospace;
  font-size: 11.5px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.content-field-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.content-field-row label {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.content-field-row textarea,
.content-field-row input[type="text"] {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: #0f172a;
  background: #ffffff;
  font-family: inherit;
  transition: border-color 0.2s;
}

.content-field-row textarea:focus,
.content-field-row input[type="text"]:focus {
  outline: none;
  border-color: #15803d;
  box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.15);
}

.content-img-preview-box {
  width: 100%;
  height: 140px;
  border-radius: 6px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.content-img-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}
`
};
