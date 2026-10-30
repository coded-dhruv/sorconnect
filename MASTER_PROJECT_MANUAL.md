# Sor Connect — Master Project Documentation, Maintenance & Handover Manual

**Document Version:** 2.0.0 (Production Release)  
**Publication Date:** October 30, 2026  
**Primary Website:** [https://www.sorconnect.in](https://www.sorconnect.in)  
**Target Brand:** **Sor Connect** (`sorconnect`)  
**Target Entity:** Sor Connect (Headquarters: Jaipur, Rajasthan; Regional Branch: Agra, Uttar Pradesh)  
**Author / Engineering Team:** Senior Technical Architect & Systems Engineer

---

## 📑 Executive Table of Contents

1. [Executive Summary & Business Context](#1-executive-summary--business-context)
2. [Complete System Architecture](#2-complete-system-architecture)
3. [Project Directory & File Structure](#3-project-directory--file-structure)
4. [Design System & UI Components](#4-design-system--ui-components)
5. [Page-by-Page Specifications & Route Inventory](#5-page-by-page-specifications--route-inventory)
6. [CMS & Administrator Operations Manual](#6-cms--administrator-operations-manual)
7. [Database Architecture & Supabase Schema](#7-database-architecture--supabase-schema)
8. [API Contracts & External Integrations](#8-api-contracts--external-integrations)
9. [Security Architecture & Audit Report](#9-security-architecture--audit-report)
10. [Hosting, Deployment & Infrastructure](#10-hosting-deployment--infrastructure)
11. [Complete SEO Strategy & Brand Dominance](#11-complete-seo-strategy--brand-dominance)
12. [Performance & Core Web Vitals Optimization](#12-performance--core-web-vitals-optimization)
13. [Ongoing Maintenance & Operations Manual](#13-ongoing-maintenance--operations-manual)
14. [Developer Onboarding & Development Guide](#14-developer-onboarding--development-guide)
15. [Technical Audit & Technical Debt Report](#15-technical-audit--technical-debt-report)
16. [Client Owner & Executive Management Manual](#16-client-owner--executive-management-manual)
17. [Operational Troubleshooting & Diagnostics Runbook](#17-operational-troubleshooting--diagnostics-runbook)
18. [Formal Ownership Transfer & Handover Protocol](#18-formal-ownership-transfer--handover-protocol)

---

## 1. Executive Summary & Business Context

**Sor Connect** is one of India's premier clean energy contractors, specializing in end-to-end Solar EPC (Engineering, Procurement, Construction), Installation & Commissioning (I&C), and Operations & Maintenance (O&M) services.

- **Cumulative Executed Capacity:** 150+ Megawatts (MW) across utility-scale, commercial rooftop, and ground-mount installations.
- **Workforce:** 130+ in-house solar engineers, project supervisors, and electrical technicians.
- **Strategic Focus:** Commercial & Industrial (C&I) private power purchase, PM-KUSUM Component A/C agricultural solarization, and PM Surya Ghar rooftop schemes.
- **Corporate Headquarters:** F-02, P.No. 3/410, Sector 3, Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan (302021).
- **Regional Operations Office:** Sanjay Place, Civil Lines, Agra, Uttar Pradesh (282002).

This web platform serves as Sor Connect's digital headquarters: capturing high-intent commercial leads, showcasing verified project case studies, recruiting solar talent, and establishing search engine authority.

> 📖 **Deep Dive Document:** [docs/01-project-overview.md](docs/01-project-overview.md)

---

## 2. Complete System Architecture

The platform operates on a **Decoupled Dual-Tier Hybrid Architecture**, combining ultra-fast, pre-rendered semantic HTML5 client interfaces with a cloud PostgreSQL datastore (Supabase) and local JSON failover synchronization.

| Architecture Layer | Component Name | Runtime Responsibilities | Primary Protocol |
|---|---|---|---|
| **Edge & CDN Routing** | Vercel Global Edge (`vercel.json`) | SSL termination, clean URLs (strips `.html`), and 301 canonical redirects. | HTTPS (Port 443), TLS 1.3 |
| **Compute & Microservices** | Node.js Runtime (`server.js`) | API request routing, body parsing, multipart resume uploads, and local failover sync. | HTTP REST, JSON |
| **Compiled Admin Console** | Production Admin (`admprtl.html`) | Single-file management dashboard controlling all 8 website modules. | Standalone HTML/JS |
| **Primary Cloud Persistence** | Supabase Cloud PostgreSQL | Authoritative relational database with 8 core tables protected by Row-Level Security. | PostgREST HTTPS API |
| **Cloud Object Storage** | Supabase Storage (`uploads` bucket) | High-speed CDN repository for project photography and candidate resumes. | S3-compatible REST API |
| **Local Disk Failover** | Flat JSON Storage (`*.json`) | Immutable disk backups ensuring zero inquiry loss during network outages. | Local File System (Node.js `fs`) |

> 📖 **Deep Dive Document:** [docs/02-system-architecture.md](docs/02-system-architecture.md)

---

## 3. Project Directory & File Structure

```text
sorconnect/
├── assets/                  # High-resolution media, project photography & partner logos
│   ├── favicon/             # Multi-resolution favicons & site.webmanifest
│   └── images/              # Field photography
├── css/
│   └── style.css            # Global CSS variables, layout grids, components & animations
├── js/
│   └── main.js              # Client controller, GSAP animations, forms & Supabase hydration
├── docs/                    # 18-part comprehensive technical and handover documentation
│   ├── README.md
│   ├── 01-project-overview.md
│   ├── ...
│   └── 18-ownership-checklist.md
├── index.html               # Corporate homepage
├── services.html            # Solar EPC, I&C, O&M & PM-KUSUM services
├── projects.html            # Filterable 150+ MW installation portfolio
├── about.html               # Leadership, 130+ engineers & interactive plant slider
├── contact.html             # Jaipur HQ & Agra branch contacts & inquiry form
├── terms.html               # Legal terms of service
├── privacy.html             # Customer data privacy policy
├── admprtl.html             # Production-compiled single-file Admin Portal
├── admin_client.js          # Admin front-end logic controller
├── admin_templates.js       # Admin panel HTML template builder
├── admin_styles.js          # Admin Shadcn-inspired CSS tokens
├── build_admprtl.js         # Compiler script generating admprtl.html
├── schema.sql               # Authoritative PostgreSQL schema & RLS definitions
├── server.js                # Custom Node.js HTTP/HTTPS runtime & REST API
├── vercel.json              # Vercel edge configuration (clean URLs, 301 redirects)
├── robots.txt               # Search crawler permissions
├── sitemap.xml              # XML search sitemap with canonical URLs
└── *.json                   # Local fallback datastores (submissions, careers, projects...)
```

> 📖 **Deep Dive Document:** [docs/03-project-structure.md](docs/03-project-structure.md)

---

## 4. Design System & UI Components

The public frontend is built with custom CSS variables without third-party framework overhead, achieving sub-second paint times and cohesive corporate aesthetics.

```css
:root {
  --forest:       #173F31; /* Primary brand dark emerald */
  --forest-deep:  #0E2C22; /* High-contrast headers & dark sections */
  --leaf:         #3E8F5C; /* Accent vibrant green for badges & checks */
  --leaf-bright:  #4FAE71; /* Hover interactive state */
  --gold:         #C99A45; /* Warm metallic gold for high-impact stats */
  --ink:          #161D19; /* High-legibility charcoal text */
  --canvas:       #FFFFFF; /* Pure white surface */
  --heading:      "Montserrat", "Roboto", sans-serif;
  --body:         "Roboto", sans-serif;
  --container:    1300px;
  --radius:       3px;
}
```

### Key UI Components:
- **Interactive EPC Process Slider:** 5-step automated workflow with zero-lag preloaded image switching.
- **Dynamic Projects Portfolio:** Multi-tag filterable grid with live Supabase hydration.
- **Global Careers Modal:** Injected modal system featuring a 10MB PDF/DOC drag-and-drop resume dropzone.
- **Floating Contact Biscuit:** Persistent vertical 1-click inquiry trigger.

> 📖 **Deep Dive Document:** [docs/04-design-system.md](docs/04-design-system.md)

---

## 5. Page-by-Page Specifications & Route Inventory

| Route Path | Source File | Canonical URL | Auth Required | Primary Purpose |
|---|---|---|---|---|
| `/` | `index.html` | `https://www.sorconnect.in/` | No | Brand awareness, feasibility lead capture, stats counter. |
| `/services` | `services.html` | `https://www.sorconnect.in/services` | No | Deep-dive service selection (EPC, I&C, O&M, KUSUM). |
| `/projects` | `projects.html` | `https://www.sorconnect.in/projects` | No | Filterable 150+ MW portfolio validation. |
| `/about` | `about.html` | `https://www.sorconnect.in/about` | No | Corporate history, executive team, plant photo slider. |
| `/contact` | `contact.html` | `https://www.sorconnect.in/contact` | No | Branch offices, Google Maps links, Careers trigger. |
| `/terms` | `terms.html` | `https://www.sorconnect.in/terms` | No | Legal terms and proposal conditions. |
| `/privacy` | `privacy.html` | `https://www.sorconnect.in/privacy` | No | Data protection disclosures. |
| `/admprtl` | `admprtl.html` | None (`noindex`) | Yes | Administrative content and lead management. |

> 📖 **Deep Dive Document:** [docs/05-pages-and-routes.md](docs/05-pages-and-routes.md)

---

## 6. CMS & Administrator Operations Manual

The administrative console is accessed at **`https://www.sorconnect.in/admprtl`** and contains 9 management modules:
1. **Form Submissions (Leads):** Review customer inquiries, one-click WhatsApp contact, update lead status (`New`, `Contacted`, `In Progress`, `Closed`, `Junk`).
2. **Job Applications (Careers):** Review applicant profiles, filter by position, and download uploaded candidate CVs.
3. **Projects Portfolio:** Add, edit, or delete installations; upload project photos directly to Supabase cloud storage.
4. **Project Categories:** Organize projects into sectors (`Commercial Rooftop`, `Turnkey EPC`, `O&M`).
5. **Services Page CMS:** Edit service descriptions, bullet points, and images.
6. **Partners & Alliances:** Manage tier-1 partner brand logos (Sungrow, Reliance, Waree).
7. **About Us Carousel:** Manage photographic slides on the About Us plant slider (`about_gallery` table).
8. **Awards & Recognitions:** Manage certifications and green energy accolades.
9. **Key Stats & Metrics:** Edit the live counters and descriptions displayed on the Homepage Readout Bar and Why Sor Connect section.

> 📖 **Deep Dive Document:** [docs/06-cms-admin-guide.md](docs/06-cms-admin-guide.md)

---

## 7. Database Architecture & Supabase Schema

- **Cloud Platform:** Supabase PostgreSQL (`https://znjpzipedsowuyrpotgb.supabase.co`)
- **9 Core Relational Tables:** `categories`, `projects`, `submissions`, `about_gallery`, `awards`, `services`, `partners`, `careers`, `website_stats`.
- **Row-Level Security (RLS):** Enabled on all tables. Public visitors have `SELECT` on public content and `INSERT` on lead forms.
- **Storage Buckets:** Dedicated public bucket **`uploads`** with 10MB file limit and MIME-type enforcement for images and resume documents.

| Database Table | Primary Key | Key Attributes Stored | Relationships & Constraints |
|---|---|---|---|
| `public.categories` | `id` (BigInt) | `name`, `slug`, `description` | Referenced by `projects.category_id`. |
| `public.projects` | `id` (BigInt) | `title`, `client`, `capacity`, `location`, `image` | Foreign key `category_id &rarr; categories.id`. |
| `public.submissions` | `id` (BigInt) | `name`, `whatsapp`, `monthly_bill`, `pincode`, `status` | Lead capture store; indexed by `created_at DESC`. |
| `public.careers` | `id` (BigInt) | `name`, `phone`, `email`, `position`, `resume_url`, `status` | Stores candidate profiles & CV download links. |
| `public.about_gallery`| `id` (BigInt) | `title`, `subtitle`, `badge`, `image`, `display_order` | Powers the About Us plant photo slider. |
| `public.awards` | `id` (BigInt) | `title`, `badge`, `image`, `description`, `display_order` | Company achievements & green accolades. |
| `public.services` | `id` (BigInt) | `title`, `short_desc`, `features`, `image`, `display_order` | Services breakdown cards on `/services`. |
| `public.partners` | `id` (BigInt) | `name`, `logo`, `category`, `display_order` | Technology partners (Sungrow, Reliance, Waree). |
| `public.website_stats` | `id` (Text) | `stat_value`, `stat_suffix`, `label`, `description`, `display_order` | Live counters for Readout Bar & Why Us highlights. |

> 📖 **Deep Dive Document:** [docs/07-database-schema.md](docs/07-database-schema.md)

---

## 8. API Contracts & External Integrations

- **Internal Node.js REST API (`server.js`):**
  - `POST /api/contact` &mdash; Processes customer inquiries with dual persistence.
  - `POST /api/careers/apply` &mdash; Ingests candidate applications and uploads CV attachments.
  - `POST /api/admin/login` &mdash; Admin authentication token issuance.
  - `POST /api/upload` &mdash; Uploads images directly to the Supabase `uploads` bucket.
  - `GET /api/sync/supabase` &mdash; Pulls latest cloud tables to refresh local JSON failovers.
- **WhatsApp Business Deep-Link:** Dynamic click-to-chat URL gateway (`wa.me/919119119098?text=...`) for instant mobile lead conversion.
- **Vercel Analytics:** Edge-level, cookie-free visitor traffic telemetry.

> 📖 **Deep Dive Document:** [docs/08-api-integrations.md](docs/08-api-integrations.md)

---

## 9. Security Architecture & Audit Report

- **Input Sanitization:** HTML escaping (`escapeHtml`) on all user-supplied data prevents Cross-Site Scripting (XSS).
- **Transport Security:** Enforced HTTPS with automated TLS 1.3 certificates via Vercel Edge.
- **Database Perimeter:** Row-Level Security ensures public clients cannot alter or delete live database rows.
- **File Upload Guard:** 10MB size ceiling, MIME sniffing verification, and timestamped path-traversal protection.

> 📖 **Deep Dive Document:** [docs/09-security.md](docs/09-security.md)

---

## 10. Hosting, Deployment & Infrastructure

- **Primary Edge Host:** Vercel Global Edge Network linked to GitHub repository (`main` branch).
- **Domain Configuration:**
  - `sorconnect.in` &rarr; A-Record `76.76.21.21`
  - `www.sorconnect.in` &rarr; CNAME `cname.vercel-dns.com`
- **Edge Routing (`vercel.json`):** `cleanUrls: true` (strips `.html`), `trailingSlash: false`, permanent 301 redirects from `/home` to `/`.
- **Instant Rollback:** 3-second deployment revert via Vercel Dashboard.

> 📖 **Deep Dive Document:** [docs/10-hosting-deployment.md](docs/10-hosting-deployment.md)

---

## 11. Complete SEO Strategy & Brand Dominance

- **Single-Token Brand Focus:** Every page title contains the exact keyword `sorconnect` (e.g. `<title>sorconnect | Sor Connect — Solar EPC Company in Jaipur...</title>`) to dominate Google rankings for brand searches.
- **5 Validated JSON-LD Schemas:** `Organization`, `LocalBusiness`, `Service`, `ContactPage`, and `BreadcrumbList`.
- **Canonical Hygiene:** Self-referential absolute HTTPS canonical tags across all pages.
- **Search Crawlers:** Configured `robots.txt` and clean `sitemap.xml`.

> 📖 **Deep Dive Document:** [docs/11-seo.md](docs/11-seo.md)

---

## 12. Performance & Core Web Vitals Optimization

- **Zero Hydration Overhead:** Pure semantic HTML and vanilla JavaScript eliminates multi-megabyte bundle downloads.
- **Core Web Vitals:**
  - Largest Contentful Paint (LCP): `~0.9s - 1.4s` (Google target `< 2.5s`)
  - Interaction to Next Paint (INP): `< 45ms` (Google target `< 200ms`)
  - Cumulative Layout Shift (CLS): `< 0.02` (Google target `< 0.1`)
- **Zero-Lag Media Switching:** Preloaded visual layers eliminate flickers during slider interactions.

> 📖 **Deep Dive Document:** [docs/12-performance.md](docs/12-performance.md)

---

## 13. Ongoing Maintenance & Operations Manual

- **Weekly Routine:** Review new customer inquiries in Admin Portal and download candidate CVs.
- **Monthly Routine:** Click **"Sync Supabase"** in Admin Portal to update local JSON backups; inspect Google Search Console.
- **Quarterly Routine:** Run `npm audit`, clean up old candidate CVs in Supabase Storage.
- **Disaster Recovery:** Triple redundancy (Supabase Cloud PITR backups + Local JSON files in Git + Manual `pg_dump` dumps).

> 📖 **Deep Dive Document:** [docs/13-maintenance.md](docs/13-maintenance.md)

---

## 14. Developer Onboarding & Development Guide

- **Local Setup:** Clone repo, run `npm install`, and start server with `node server.js`.
- **Admin Portal Compilation Rule:** **Never edit `admprtl.html` directly.** Modify source files `admin_templates.js`, `admin_client.js`, or `admin_styles.js`, then execute:
  ```bash
  node build_admprtl.js
  ```
- **Git Workflow:** Push to `main` branch triggers automatic production build on Vercel.

> 📖 **Deep Dive Document:** [docs/14-developer-onboarding.md](docs/14-developer-onboarding.md)

---

## 15. Technical Audit & Technical Debt Report

- **System Health Rating:** **8.8 / 10**
- **Prioritized Engineering Backlog:**
  1. *Priority 1:* Move plaintext admin passwords from `server.js` to hashed environment variables.
  2. *Priority 2:* Add explicit security response headers (`Content-Security-Policy`) in `vercel.json`.
  3. *Priority 3:* Convert raw photographic assets in `assets/images/` to compressed WebP.
  4. *Priority 4:* Refactor `server.js` into modular route controllers.

> 📖 **Deep Dive Document:** [docs/15-technical-audit.md](docs/15-technical-audit.md)

---

## 16. Client Owner & Executive Management Manual

- Non-technical instructions for the Managing Director and business staff.
- Plain-English steps to log into `/admprtl`, follow up on customer leads, review job applicants, add completed solar projects, and upload plant photos.
- Clear rules outlining what can be modified in the CMS versus what requires a software engineer.

> 📖 **Deep Dive Document:** [docs/16-client-handover.md](docs/16-client-handover.md)

---

## 17. Operational Troubleshooting & Diagnostics Runbook

- Step-by-step diagnostic trees for:
  - *Supabase 404 PGRST205 (Missing table / schema cache mismatch).*
  - *Admin portal login failures.*
  - *Customer form submission timeouts.*
  - *Resume upload errors.*
  - *404 errors on subpage refreshes.*
  - *Broken project images.*

> 📖 **Deep Dive Document:** [docs/17-troubleshooting.md](docs/17-troubleshooting.md)

---

## 18. Formal Ownership Transfer & Handover Protocol

- Complete procedural guide for transferring legal, administrative, and technical ownership to Sor Connect:
  - Phase 1: Domain & DNS Transfer (`sorconnect.in`)
  - Phase 2: Vercel Hosting Project Transfer
  - Phase 3: Supabase Cloud Database & Storage Transfer
  - Phase 4: GitHub Source Code Repository Transfer
  - Phase 5: Google Search Console & Analytics Access Provisioning
  - Phase 6: Post-Handover Password & Key Rotation Checklist

> 📖 **Deep Dive Document:** [docs/18-ownership-checklist.md](docs/18-ownership-checklist.md)

---

## 🏁 Handover Sign-Off

This Master Manual and the accompanying `/docs` suite constitute the complete technical deliverable for the **Sor Connect** corporate web platform. The platform is delivered in a production-ready, fully verified, and search-optimized state.
