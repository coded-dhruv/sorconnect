# 08. API & Third-Party Integrations

## 1. Overview of Platform Integrations

The Sor Connect platform connects four external and internal service interfaces:
1. **Internal Node.js REST API (`server.js`):** Lightweight, zero-dependency JSON micro-services handling form submissions, careers file uploads, admin authentication, and local JSON failover.
2. **Supabase Cloud PostgREST API:** Direct client-side and server-side REST interface to PostgreSQL tables.
3. **Supabase Object Storage API:** S3-compatible cloud bucket for media and resume documents.
4. **WhatsApp Business Click-to-Chat Gateway:** Deep-link messaging gateway for rapid mobile lead conversion.
5. **Vercel Web Analytics:** Privacy-compliant web vitals and visitor traffic telemetry.

---

## 2. Internal Node.js API Contract (`server.js`)

All internal API endpoints support CORS (`Access-Control-Allow-Origin: *`) and accept/return `application/json; charset=utf-8`.

---

### 2.1 Lead & Inquiry Endpoints

#### `POST /api/contact`
*Submits an inquiry from the public website contact form or quick quote modal.*
- **Authentication:** Public (No auth required)
- **Request Headers:** `Content-Type: application/json`
- **Request Body Payload:**
  ```json
  {
    "name": "Arjun Patel",
    "whatsapp": "9876543210",
    "monthly_bill": "₹1,20,000",
    "pincode": "302021",
    "note": "Looking for 100 kW rooftop setup for plastic molding factory.",
    "subject": "Commercial Rooftop Inquiry"
  }
  ```
- **Success Response (HTTP 200):**
  ```json
  {
    "success": true,
    "message": "Your request has been submitted successfully."
  }
  ```
- **Backend Execution:** Appends record to `submissions.json` and issues an asynchronous `POST` to Supabase `submissions` table.

---

### 2.2 Careers & Recruitment Endpoints

#### `POST /api/careers/apply`
*Submits a candidate application and uploads an attached resume to cloud storage.*
- **Authentication:** Public
- **Request Structure:** Accepts JSON or Multipart Form with Base64/Buffer attachment.
- **Request Fields:** `name`, `phone`, `email`, `location`, `position`, `experience`, `availability`, `portfolio`, `cover_note`, `file` (optional base64 payload).
- **Success Response (HTTP 200):**
  ```json
  {
    "success": true,
    "message": "Application submitted successfully",
    "applicationId": 1730291823901,
    "resume_url": "https://<SUPABASE_URL>/storage/v1/object/public/uploads/resumes/1730291823901_resume.pdf"
  }
  ```

#### `GET /api/careers`
*Retrieves all received applications (used by Admin Portal).*
- **Authentication:** Administrator token
- **Response (HTTP 200):** Array of candidate application objects.

---

### 2.3 Media Upload Endpoint

#### `POST /api/upload`
*Uploads an image or document directly to the Supabase `uploads` bucket.*
- **Request Payload:**
  ```json
  {
    "filename": "factory_rooftop_1mw.jpg",
    "fileData": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "folder": "projects"
  }
  ```
- **Success Response (HTTP 200):**
  ```json
  {
    "success": true,
    "url": "https://<SUPABASE_URL>/storage/v1/object/public/uploads/projects/1730291823901_factory_rooftop_1mw.jpg",
    "filename": "factory_rooftop_1mw.jpg"
  }
  ```

---

### 2.4 Administrative Sync & Authentication

#### `POST /api/admin/login`
*Validates administrative credentials and returns a session token.*
- **Request Body:** `{ "username": "admin", "password": "[REDACTED]" }`
- **Success Response (HTTP 200):**
  ```json
  {
    "success": true,
    "message": "Authentication successful",
    "user": { "id": "admin", "name": "Sor Connect Administrator" },
    "token": "sorconnect_auth_token_1730291823901_abc123"
  }
  ```
- **Failure Response (HTTP 401):**
  ```json
  {
    "success": false,
    "message": "Invalid credentials. Access denied."
  }
  ```

#### `GET /api/sync/supabase`
*Initiates a complete sync cycle, downloading current Supabase cloud tables and updating local JSON files.*
- **Success Response (HTTP 200):** `{ "success": true, "syncedTables": 9, "timestamp": "..." }`

---

### 2.5 Website Statistics Endpoints

#### `GET /api/stats`
*Retrieves all live website metrics from local failover storage (`stats.json`).*
- **Success Response (HTTP 200):** Array of 7 statistic objects.

#### `POST /api/stats/update`
*Updates a specific metric in both `stats.json` and Supabase `website_stats` table.*
- **Request Body Payload:**
  ```json
  {
    "id": "hero_capacity",
    "stat_value": "180",
    "stat_suffix": "+ MW",
    "label": "Solar capacity managed",
    "description": "",
    "display_order": 1
  }
  ```
- **Success Response (HTTP 200):**
  ```json
  {
    "success": true,
    "stat": { ... },
    "message": "Statistic updated successfully"
  }
  ```

---

## 3. Supabase Cloud PostgREST API Integration

Public client scripts (`js/main.js` and `admin_client.js`) query the Supabase REST gateway directly using HTTPS GET/POST requests:

- **Base URL:** `https://<SUPABASE_URL>/rest/v1`
- **Required Request Headers:**
  ```http
  apikey: <SUPABASE_ANON_KEY>
  Authorization: Bearer <SUPABASE_ANON_KEY>
  Content-Type: application/json
  Prefer: return=representation
  ```

### Standard Query Patterns:
- **Fetch Projects with Category Relationship:**
  `GET /rest/v1/projects?select=*,categories(*)&order=id.asc`
- **Fetch About Us Carousel Slides:**
  `GET /rest/v1/about_gallery?select=*&order=display_order.asc`
- **Update Lead Status:**
  `PATCH /rest/v1/submissions?id=eq.123` with body `{ "status": "Contacted" }`

---

## 4. WhatsApp Business Click-to-Chat Integration

To maximize mobile conversion rates across India's industrial sector, the platform integrates direct WhatsApp deep-links:

- **Official Business Number:** `+91-9119119098` (Clean format: `919119119098`)
- **Protocol Schema:** `https://wa.me/919119119098?text=<URL_ENCODED_MESSAGE>`
- **Standard Pre-Filled Message:**
  `"Hello Sor Connect team, I am interested in exploring solar installation for my industrial / commercial facility. Please share feasibility details."`
- **Lead Follow-Up Trigger:** When a customer completes a form submission on the site, a one-click button immediately allows them to open WhatsApp with their submission details pre-filled.

---

## 5. Vercel Web Analytics Integration

- **Package:** `@vercel/analytics` (v2.0.1)
- **Implementation:** Embedded at the edge to monitor visitor telemetry, top geographic regions (Jaipur, Delhi NCR, Agra, Ahmedabad), and device distributions without placing tracking cookies on customer browsers.

---

## 6. Failure Modes & Graceful Degradation

| Failure Event | Impact on Platform | Graceful Degradation Mechanism |
|---|---|---|
| **Supabase Cloud Outage** | Dynamic live fetching fails. | Frontend catches error immediately and renders hardcoded static verified HTML without displaying an error to visitors. |
| **Storage Bucket Rate Limit** | Image uploads temporarily fail. | Server falls back to saving uploaded images locally in `/assets/images/` and returning local relative URLs. |
| **Slow Mobile Connection** | GSAP animation CDN delayed. | Native `IntersectionObserver` fallback immediately un-hides all content blocks, preventing invisible text. |
