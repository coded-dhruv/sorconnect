# 02. System Architecture

## 1. Architectural Blueprint

The Sor Connect platform employs a **Hybrid Dual-Tier Decoupled Architecture**. It pairs pre-rendered, high-performance static HTML5 client interfaces with an asynchronous cloud datastore (Supabase PostgreSQL & Object Storage) and a self-healing local failover engine.

| Architectural Tier | Primary Components | Functional Responsibilities | Communication Protocol |
|---|---|---|---|
| **Edge & Routing Tier** | Vercel Global Edge & Router (`vercel.json`) | Serves pre-compressed static assets, strips `.html` extensions via clean URLs, and executes 301 canonical redirects. | HTTPS (Port 443), TLS 1.3 |
| **Compute & API Tier** | Node.js Runtime (`server.js`) | Lightweight REST endpoints (`/api/*`), body parsing, multipart resume streaming, and local disk synchronization. | HTTP/HTTPS REST, JSON |
| **Primary Cloud Datastore** | Supabase Cloud (PostgreSQL 15+) | Authoritative relational database hosting 8 production tables protected by PostgreSQL Row-Level Security (RLS). | PostgREST HTTPS API (`/rest/v1/*`) |
| **Primary Cloud Media** | Supabase Storage (`uploads` bucket) | Object storage repository for candidate PDF resumes, high-res project photography, and partner logos. | Supabase S3-compatible Storage API |
| **Secondary Local Failover** | Local Flat JSON Files (`*.json`) | Immutable disk backups (`submissions.json`, `careers.json`, etc.) that ingest leads and applications if cloud connectivity is interrupted. | Local File System (Node.js `fs`) |

---

## 2. Dual-Tier Storage & Resilience Model

To eliminate the single-point-of-failure risk typical of cloud databases, the system maintains a dual-tier persistence strategy:

1. **Tier 1 (Cloud Primary - Supabase):** 
   - All dynamic content (projects, services, categories, gallery slides, awards, customer leads, and career resumes) lives primarily in Supabase PostgreSQL tables and Storage buckets.
   - Accessed directly by both the client-side browser via PostgREST (`/rest/v1/*`) and the backend `server.js` via HTTPS.
2. **Tier 2 (Local Failover - Flat JSON Storage):**
   - Every entity has a corresponding JSON file in the project root (`projects.json`, `services.json`, `categories.json`, `submissions.json`, `careers.json`, `about_gallery.json`, `awards.json`).
   - If Supabase is unreachable, experiences latency, or returns a 404/500 error, both `js/main.js` and `server.js` automatically fail over to the local JSON file.
   - When administrators invoke the `/api/sync/supabase` endpoint, the system reads all current Supabase tables and refreshes the local JSON snapshots, ensuring local files never become stale.

---

## 3. Data Flow & Sequence Diagrams

### 3.1 Contact Form & Lead Capture Flow

| Step # | Origin | Destination | Action & Payload Details | Failure Handling / Resilience |
|---|---|---|---|---|
| **1** | Website Visitor | Browser Client | Fills Contact form or Quick Quote Modal with name, phone, bill, pincode, and note. | Browser validates 10-digit phone pattern and required fields. |
| **2** | Browser Client | Node.js Backend (`server.js`) | Submits `POST /api/contact` with JSON body payload. | Returns HTTP 200 immediately once accepted into processing queue. |
| **3** | Node.js Backend | Local Disk (`submissions.json`) | Reads existing JSON, unshifts new submission, writes synchronously to disk. | Guarantees lead is safely captured on local server disk first. |
| **4** | Node.js Backend | Supabase PostgreSQL (`submissions`) | Asynchronously dispatches `POST /rest/v1/submissions` via HTTPS using Supabase REST API. | If Supabase is slow or unreachable, error is logged without blocking the user. |
| **5** | Browser Client | Website Visitor | Displays green success toast and initiates optional one-click WhatsApp handoff. | Visitor sees instant confirmation with zero screen reload. |

### 3.2 Careers Application & Resume Upload Flow

| Step # | Origin | Destination | Action & Payload Details | Validation & Safeguards |
|---|---|---|---|---|
| **1** | Job Candidate | Browser Client | Selects PDF/DOC resume (<10MB) and fills target position, experience, and contact info. | Client validates file extension, file size, and mandatory contact fields. |
| **2** | Browser Client | Node.js Backend (`server.js`) | Submits `POST /api/careers/apply` with multipart or base64 payload. | Validates payload integrity and extracts resume buffer. |
| **3** | Node.js Backend | Supabase Storage (`uploads`) | Streams file buffer to `/storage/v1/object/uploads/resumes/{timestamp}_{filename}`. | Enforces 10MB limit and generates public HTTPS download URL. |
| **4** | Node.js Backend | Supabase PostgreSQL (`careers`) | Executes `INSERT INTO careers` storing applicant details and generated `resume_url`. | Record indexed by creation date for rapid admin retrieval. |
| **5** | Node.js Backend | Local Disk (`careers.json`) | Appends complete application object to local backup file. | Preserves offline backup copy of candidate record. |
| **6** | Node.js Backend | Browser Client | Returns HTTP 200 `{ success: true, applicationId: ... }`. | Candidate receives confirmation toast and modal closes. |

---

## 4. Client-Side Hydration & Static Fallback Mechanics

The frontend utilizes a **progressive enhancement model**:

1. **Pre-rendered HTML Backbone:** All critical SEO text, initial hero sections, service lists, and project tables are hardcoded inside the HTML files (`index.html`, `services.html`, `projects.html`, `about.html`).
2. **Client-Side Live Hydration (`js/main.js`):**
   - Upon `DOMContentLoaded`, the client issues an asynchronous fetch to `SUPABASE_PROJECTS_URL` and `SUPABASE_CATEGORIES_URL`.
   - If the fetch returns HTTP 200 and an array of objects, the script clears the container and re-renders the cards dynamically using modern semantic HTML templates.
   - If the network request fails, times out, or returns an error, the catch block triggers:
     ```javascript
     catch (err) {
       console.warn('[PROJECTS FETCH WARNING] Could not load live projects from Supabase. Falling back to local data/static HTML...', err);
       // Static verified Supabase HTML fallback remains displayed with zero layout shift
     }
     ```
   - This ensures **zero white-screen errors** under degraded network conditions.

---

## 5. Security Boundaries & Network Architecture

| Security Zone | Boundary Component | Network Policy & Access Controls | Threat Mitigation |
|---|---|---|---|
| **Public Zone (Untrusted)** | Web Visitor Browser | HTTPS on Port 443 only. All HTTP traffic auto-upgraded to TLS 1.3 at edge. | Prevents packet sniffing and man-in-the-middle tampering. |
| **Edge Boundary (DMZ)** | Vercel Global Edge & Clean URL Engine | Edge-level routing, DDoS absorption, and request normalization. | Blocks malformed URL attacks and isolates backend compute. |
| **Application Server** | Node.js Runtime (`server.js`) | Localhost execution, memory stream limits on file uploads, and session token verification on `/admprtl`. | Prevents unauthorized admin execution and denial of service. |
| **Protected Data Perimeter** | Supabase PostgreSQL & Cloud Storage | PostgreSQL Row-Level Security (RLS) policies; public client possesses only `anon` role keys; direct table modification denied. | Prevents unauthorized database tampering or private record access. |
| **Internal Disk Perimeter** | Local Server File System (`*.json`) | Read/write strictly restricted to the Node.js process user; never exposed directly via public web roots. | Protects local inquiry backups from public enumeration. |

### Security Isolation Layers:
- **Client-to-Database:** Client browsers never receive service-role database keys. All direct client queries use the public `anon` JWT key, strictly limited by PostgreSQL Row-Level Security policies.
- **Admin Interface:** The admin interface (`/admprtl`) is decoupled from the main website bundle and requires token-based authentication verified against internal server checks before executing administrative write operations.
