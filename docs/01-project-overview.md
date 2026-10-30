# 01. Project Overview

## 1. Executive Summary

**Project Name:** Sor Connect Corporate Web Platform  
**Production URL:** [https://www.sorconnect.in](https://www.sorconnect.in)  
**Primary Brand Identity:** **Sor Connect** (also addressed as `sorconnect`)  
**Headquarters:** Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan, India (PIN: 302021)  
**Branch Office:** Sanjay Place, Civil Lines, Agra, Uttar Pradesh, India (PIN: 282002)  
**Key Executive Leadership:** Vivek Jain (Managing Director & Founder)  
**Industry Classification:** Clean Energy, Renewable Solar Power EPC (Engineering, Procurement, Construction), Installation & Commissioning (I&C), and Operations & Maintenance (O&M).

---

## 2. Business Context & Organization Profile

Sor Connect is one of Western and Northern India's fastest-growing renewable solar engineering firms. Founded in 2020, the organization has achieved significant commercial traction:

- **150+ MW Cumulative Executed Capacity:** Utility-scale, commercial rooftop, industrial ground-mount, and agricultural solar deployments.
- **130+ In-House Solar Engineers & Technicians:** Specialized teams spanning design, PVsyst simulation, civil/structural fabrication, electrical commissioning, and CEIG regulatory approvals.
- **Strategic Tier-1 Technology Alliances:** Official channel execution and technology partnerships with Sungrow, Reliance Solar, Waree, and top-tier inverter manufacturers.
- **Flagship Government Schemes:** Turnkey implementation under **PM-KUSUM Component-A/C** (feeder-level solarization) and **PM Surya Ghar Muft Bijli Yojana** (subsidized rooftop installations).

---

## 3. Website Objectives

The Sor Connect web platform was engineered to serve four primary business mandates:

1. **High-Ticket Commercial & Industrial Lead Generation:** Convert factory owners, commercial estate developers, and institutions into high-intent inbound inquiries via intuitive feasibility assessment tools and WhatsApp integration.
2. **Authority & Portfolio Demonstration:** Display verified, filterable case studies across EPC, I&C, and O&M domains to validate corporate capabilities during procurement tenders.
3. **Turnkey Recruitment Engine:** Provide an integrated careers portal allowing engineering graduates and experienced solar project managers to submit structured applications and upload resumes directly to cloud storage.
4. **Resilient, Low-Overhead Content Management:** Equip company executives and marketing staff with an intuitive, zero-dependency Admin Portal (`/admprtl`) to manage inquiries, applications, project showcases, and team achievements without requiring code deployments.

---

## 4. Target Audience & User Personas

| Persona | Primary Needs & Intent | Target Conversion Action |
|---|---|---|
| **C&I Business Owners / Plant Heads** | High electricity tariff reduction, payback period calculation, structural roof safety, subsidy eligibility. | Submit "Request Feasibility Study" modal form or initiate instant WhatsApp engineering chat. |
| **Agricultural Developers (PM-KUSUM)** | Land leasing, grid sub-station proximity, DISCOM PPA liaisoning, turnkey EPC execution. | Fill Contact inquiry with monthly bill and pincode. |
| **Solar Engineering Candidates** | Career advancement, site engineering roles, PVsyst design positions, competitive benefits. | Submit Global Careers Application with attached PDF resume. |
| **Utility Tender Committees & Tier-1 Partners** | Verification of past execution track record, certifications, technical safety standards, corporate standing. | Explore Projects portfolio, About Us company statistics, and Awards & Recognitions. |

---

## 5. Major Features & Platform Functionality

1. **Interactive EPC Process Slider:** 5-stage progressive workflow (Feasibility & Design, Procurement, Fabrication, Grid Synchronization, Lifecycle O&M) with 4.5-second autoplay timers, manual step jump, and zero-lag preloaded image switching.
2. **Dynamic Projects Showcase:** Filterable multi-category portfolio (Turnkey EPC, I&C / O&M, Utility Scale) with real-time Supabase database hydration and static HTML fallback.
3. **Dual-Tier Contact & Lead Capture:** High-conversion lead modal and contact form that simultaneously saves records into local disk storage (`submissions.json`) and cloud PostgreSQL (`submissions` table in Supabase).
4. **Integrated Global Careers Portal:** Modal-based application form featuring resume dropzone (PDF/DOCX validation up to 10MB), uploading directly to Supabase Storage (`uploads` bucket) with live tracking in the Admin Dashboard.
5. **Full-Featured Admin Management Portal (`/admprtl`):** Comprehensive backend dashboard with tabbed management of Form Submissions, Job Applications, Services, Partners, Projects, Categories, About Carousel, and Awards.
6. **Optimized SEO Engine:** Pre-rendered semantic HTML, 5 validated JSON-LD schema graphs, absolute Open Graph tags, canonical link integrity, and high-priority brand targeting for `sorconnect`.

---

## 6. Complete Technology Stack

| Architecture Layer | Technology Component | Purpose & Implementation Details |
|---|---|---|
| **Frontend / Client Layer** | Semantic HTML5 | Pure semantic markup ensuring instant rendering and 100% search crawler parseability without SSR overhead. |
| | Custom CSS3 System | Native CSS Custom Properties (`--forest`, `--leaf`, `--ink`) delivering responsive flex/grid layouts. |
| | Vanilla ES6+ Engine (`js/main.js`) | Client interactivity, modal controls, and asynchronous Supabase data fetching with zero framework bloat. |
| | GSAP 3.12.5 + ScrollTrigger | High-performance hardware-accelerated scroll reveals, statistics tickers, and magnetic buttons. |
| **Backend & Edge Layer** | Vercel Edge Platform | Global CDN routing, automated TLS certificates, clean URLs, and permanent 301 redirects. |
| | Node.js Server (`server.js`) | Lightweight HTTP/HTTPS runtime handling REST endpoints, file uploads, and dual-tier sync. |
| | Admin Compiler (`build_admprtl.js`) | Node.js build script compiling modular templates and styles into a standalone `admprtl.html`. |
| **Data & Storage Layer** | Supabase PostgreSQL | Relational cloud database hosting 8 production tables with Row-Level Security (RLS) enforcement. |
| | Supabase Storage (`uploads`) | Public cloud object storage bucket for project photography, partner logos, and candidate CVs. |
| | Local JSON Storage (`*.json`) | Resilient flat-file failover datastores preventing inquiry loss during network interruptions. |

### Detailed Component Inventory:

- **Frontend Core:** Pure Semantic HTML5, Modular CSS3 using native CSS Custom Properties, Vanilla ES6+ JavaScript. **No heavy JavaScript frameworks (React, Vue, Angular, or Next.js)** were used to ensure instantaneous First Contentful Paint (< 0.8s) and 100% search crawler parseability.
- **Animation Framework:** GSAP (GreenSock Animation Platform) v3.12.5 with ScrollTrigger plugin loaded asynchronously via CDN for fluid scroll entrances, count-up statistics, and magnetic button physics.
- **Backend Runtime:** Node.js (v18.x / v20.x compatible) custom HTTP/HTTPS server (`server.js`) providing lightweight REST endpoints, multipart file handling, and cross-tier data synchronization.
- **Database Engine:** Supabase PostgreSQL (PostgREST API v1) with Row-Level Security (RLS) policies, indexed queries, and relational joins.
- **Cloud Object Storage:** Supabase Storage (`uploads` public bucket) for candidate CVs, portfolio imagery, and partner logos.
- **Local Fallback Engine:** Flat-file JSON persistent storage (`submissions.json`, `careers.json`, `projects.json`, `about_gallery.json`, etc.) acting as a resilient failover mechanism if cloud database connections experience latency or network failure.
- **Deployment & Edge Infrastructure:** Vercel Hosting Platform with edge-level clean URL routing (`vercel.json`) and SSL/TLS termination.

---

## 7. Key Architectural Decisions & Rationale

### Decision 1: Pure HTML/JS vs. Next.js / Single Page App (SPA)
* **Rationale:** A corporate industrial website requires maximum SEO crawlability, rock-solid stability, zero dependency vulnerability rot, and immediate page loads on rural or mobile 4G networks. Avoiding complex client-side hydration frameworks ensures the site remains accessible even with JavaScript disabled or constrained.

### Decision 2: Dual-Tier Data Storage Architecture
* **Rationale:** Client-side forms submit to both the cloud Supabase database and local server JSON storage. If Supabase encounters rate limits, schema lockouts, or network interruptions, zero customer inquiries or job applications are ever lost.

### Decision 3: Single-File Compiled Admin Portal (`admprtl.html`)
* **Rationale:** The entire administrative console is compiled from modular components (`admin_templates.js`, `admin_client.js`, `admin_styles.js`) into a unified `admprtl.html` via `node build_admprtl.js`. This allows the admin portal to be hosted either statically or dynamically without managing build dependencies on production servers.

---

## 8. Current Development Status

- **Core Public Pages:** 100% complete, fully responsive across desktop, tablet, and mobile.
- **CMS Admin Capabilities:** All 8 modules (Leads, Careers, Services, Partners, Projects, Categories, Carousel, Awards) fully operational with live Supabase REST synchronization and local JSON fallback.
- **SEO & Search Indexing:** Fully optimized titles (featuring exact keyword `sorconnect`), verified JSON-LD graphs, canonical routing, sitemap, and robots.txt configured.
- **Careers Application Engine:** Live modal with PDF/DOC resume upload to Supabase bucket and administrative review dashboard.

---

## 9. Known Operational Constraints

1. **Shared Supabase Anonymous Role:** The public client fetches projects and categories using Supabase's public `anon` key. Row-Level Security (RLS) is strictly enforced to ensure public clients only have `SELECT` access, preventing unauthorized schema alterations.
2. **Local Storage Ephemerality on Serverless:** On serverless hosting environments like Vercel Edge Functions, the local file system is read-only or ephemeral. Therefore, Supabase is the **authoritative persistent datastore** in production, while local JSON files serve local development and fallback caching.
