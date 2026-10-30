# 03. Complete File & Folder Structure

## 1. Directory Tree Map

```text
sorconnect/
├── .vscode/
│   └── launch.json                # VS Code debugging configurations
├── assets/
│   ├── favicon/                   # Multi-resolution favicons, webmanifest & touch icons
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── site.webmanifest
│   ├── images/                    # Raw project imagery and photographic media
│   ├── award-*.jpg                # Industry recognition badges and certificates
│   ├── hero-solar-*.webp/.jpg     # Homepage and subpage hero backgrounds
│   ├── partner-*.png/.jpg         # Partner, client, and vendor corporate logos
│   ├── process-*.jpg              # 5-stage turnkey EPC workflow visuals
│   ├── project-*.jpg              # Commercial, industrial, and ground-mount portfolio photos
│   └── svc-*.jpg/.webp            # Service offering featured imagery
├── css/
│   └── style.css                  # Global design system, typography, animations & responsive styles
├── js/
│   └── main.js                    # Global client-side interactivity, GSAP, forms & Supabase hydration
├── docs/                          # Comprehensive technical and handover documentation
├── node_modules/                  # Node.js third-party package dependencies
├── .gitignore                     # Git tracking exclusions
├── about.html                     # "About Us" company profile, leadership & gallery
├── about_gallery.json             # Local JSON fallback for About Us plant slider
├── admin_client.js                # Client-side JavaScript controller for Admin Portal
├── admin_styles.js                # CSS styling rules module for Admin Portal
├── admin_templates.js             # HTML template string builder module for Admin Portal
├── admprtl.html                   # Compiled production Admin Portal (built by build_admprtl.js)
├── awards.json                    # Local JSON fallback for Awards & Recognitions
├── build_admprtl.js               # Node.js build script compiling admin modules into admprtl.html
├── careers.json                   # Local JSON store/backup for received job applications
├── categories.json                # Local JSON store for project categories
├── contact.html                   # "Contact Us" branch offices, map & inquiry form
├── index.html                     # Corporate homepage & primary conversion hub
├── package.json                   # Project manifest, npm scripts, and dependencies
├── package-lock.json              # Deterministic npm dependency lockfile
├── partners.json                  # Local JSON store for strategic partners & clients
├── privacy.html                   # Privacy policy & data protection terms
├── projects.html                  # Filterable commercial & industrial projects portfolio
├── projects.json                  # Local JSON store for portfolio installations
├── README.md                      # Basic repository overview
├── robots.txt                     # Search engine crawler permissions & sitemap directives
├── schema.sql                     # Master PostgreSQL database schema & RLS policies
├── server.js                      # Custom Node.js HTTP/HTTPS server & REST API
├── services.html                  # Detailed breakdown of solar EPC, I&C, O&M & subsidy services
├── services.json                  # Local JSON store for service offerings
├── sitemap.xml                    # XML sitemap with canonical URLs and lastmod timestamps
├── submissions.json               # Local JSON store for contact form leads
├── terms.html                     # Terms of use and legal conditions
└── vercel.json                    # Vercel Edge configuration (clean URLs, 301 redirects)
```

---

## 2. Core File Catalog & Responsibilities

### 2.1 Public Frontend Webpages

| File | Purpose & Responsibilities | Key Dependencies | When to Modify |
|---|---|---|---|
| `index.html` | Corporate homepage. Features hero value proposition, stats counter, interactive EPC process slider, featured projects, benefits, and contact drawer. | `css/style.css`, `js/main.js`, GSAP CDN | When changing homepage copy, stats, hero images, or headline marketing messages. |
| `services.html` | Comprehensive breakdown of commercial rooftop, industrial ground-mount, O&M, and PM-KUSUM services with inquiry triggers. | `css/style.css`, `js/main.js` | When adding new service lines or updating engineering specifications. |
| `projects.html` | Interactive, filterable portfolio displaying executed installations by category (Turnkey EPC, I&C, O&M). | `css/style.css`, `js/main.js`, Supabase DB | When updating static portfolio fallbacks or changing project card layouts. |
| `about.html` | Company history, executive leadership, 150+ MW track record, interactive plant gallery, and awards. | `css/style.css`, `js/main.js` | When updating executive team profiles, company milestones, or brand story. |
| `contact.html` | Regional office addresses (Jaipur HQ, Agra branch), Google Maps coordinates, direct phone links, and main contact form. | `css/style.css`, `js/main.js`, `/api/contact` | When office locations, direct phone numbers, or branch contacts change. |
| `terms.html` | Standard terms of service, warranty scopes, and legal conditions governing engineering proposals. | `css/style.css` | When corporate legal counsel updates customer contractual terms. |
| `privacy.html` | Data privacy disclosures, customer consent disclosures, and compliance statements. | `css/style.css` | When privacy regulations (e.g. DPDP Act) require updated disclosures. |

---

### 2.2 Server & Build Infrastructure

| File | Purpose & Responsibilities | Key Dependencies | When to Modify |
|---|---|---|---|
| `server.js` | Node.js HTTP/HTTPS runtime. Implements REST endpoints (`/api/*`), file upload handlers, dual-tier Supabase syncing, and static file serving with proper MIME headers. | `http`, `https`, `fs`, `path` | When creating new API routes, adjusting file upload size limits, or altering server-side sync logic. |
| `build_admprtl.js` | Compiler script that reads `admin_templates.js`, `admin_client.js`, and `admin_styles.js` and outputs a compiled, zero-dependency `admprtl.html`. | `fs`, `path`, admin modules | Execute whenever any `admin_*.js` module is altered to recompile the production admin console. |
| `admin_client.js` | Front-end controller logic for the admin dashboard. Handles authentication tokens, modal operations, CRUD REST calls to Supabase, and dynamic DOM rendering. | Supabase REST, browser DOM | When adding new admin dashboard panels, table columns, or modifying client validation rules. |
| `admin_templates.js` | HTML string generators for all 8 administrative management panels and modals. | None (pure JS functions) | When modifying the layout, inputs, or structure of admin dashboard forms and tables. |
| `admin_styles.js` | CSS design system tokens and styling rules for the administrative dashboard (Shadcn-inspired UI). | None (exports CSS string) | When tweaking admin panel colors, sidebar width, or modal geometries. |
| `admprtl.html` | Compiled standalone admin dashboard containing complete UI, scripts, and styles in a single distributable file. | None (self-contained) | **Do not edit directly.** Always modify source `admin_*.js` files and run `node build_admprtl.js`. |

---

### 2.3 Database & Local Persistence

| File | Purpose & Responsibilities | Key Dependencies | When to Modify |
|---|---|---|---|
| `schema.sql` | Authoritative PostgreSQL database schema script. Creates 8 core tables, default indexes, Row-Level Security policies, and Storage bucket permissions. | PostgreSQL / Supabase | When provisioning a new Supabase database instance or adding new relational columns. |
| `submissions.json` | Local backup store for customer inquiries submitted via `/api/contact`. | `server.js` | Automatically managed by the server. |
| `careers.json` | Local backup store for candidate applications received via `/api/careers/apply`. | `server.js` | Automatically managed by the server. |
| `projects.json` | Local fallback datastore for projects portfolio. | `server.js`, `js/main.js` | Synchronized automatically via `/api/sync/supabase` or updated manually. |
| `categories.json` | Local fallback datastore for project categories. | `server.js`, `js/main.js` | Synchronized automatically via `/api/sync/supabase`. |
| `services.json` | Local fallback datastore for solar services. | `server.js`, `js/main.js` | Synchronized automatically via `/api/sync/supabase`. |
| `partners.json` | Local fallback datastore for strategic technology partners. | `server.js`, `js/main.js` | Synchronized automatically via `/api/sync/supabase`. |
| `about_gallery.json` | Local fallback datastore for the About Us plant showcase slider. | `server.js`, `js/main.js` | Synchronized automatically via `/api/sync/supabase`. |
| `awards.json` | Local fallback datastore for company awards and certifications. | `server.js`, `js/main.js` | Synchronized automatically via `/api/sync/supabase`. |

---

### 2.4 Configuration & SEO Files

| File | Purpose & Responsibilities | Key Dependencies | When to Modify |
|---|---|---|---|
| `package.json` | Defines project metadata, start scripts (`npm start`, `npm run dev`), and dependencies (`@vercel/analytics`). | npm | When adding new build tools or updating production packages. |
| `vercel.json` | Configures Vercel Edge routing: enables `cleanUrls: true` (strips `.html`), disables trailing slashes, and enforces permanent 301 redirects from `/home` to `/`. | Vercel Platform | When modifying edge routing rules or setting up custom domain redirects. |
| `robots.txt` | Directs search engine web crawlers: allows indexing of all public pages, blocks `/admprtl` and `/api/`, and points to `sitemap.xml`. | Search Crawlers | When restricting crawler access to specific future internal directories. |
| `sitemap.xml` | Search engine sitemap specifying canonical URLs, change frequencies, priorities, and lastmod timestamps for all public pages. | Search Engines | Whenever new public pages are created or major content overhauls are published. |
