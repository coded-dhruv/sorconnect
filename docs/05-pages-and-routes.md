# 05. Page-by-Page Technical & Content Specifications

## 1. Master Route Inventory

| Route Path | Source File | Canonical URL | Auth Required | Primary Conversion Goal |
|---|---|---|---|---|
| `/` | `index.html` | `https://www.sorconnect.in/` | No | Brand awareness, feasibility inquiry submission, phone/WhatsApp contact. |
| `/services` | `services.html` | `https://www.sorconnect.in/services` | No | Deep-dive service selection, commercial quotation request. |
| `/projects` | `projects.html` | `https://www.sorconnect.in/projects` | No | Portfolio evaluation, technical capacity verification, tender diligence. |
| `/about` | `about.html` | `https://www.sorconnect.in/about` | No | Corporate credibility, leadership assessment, plant showcase exploration. |
| `/contact` | `contact.html` | `https://www.sorconnect.in/contact` | No | Direct lead capture, office visits, careers modal trigger. |
| `/terms` | `terms.html` | `https://www.sorconnect.in/terms` | No | Legal terms and conditions disclosure. |
| `/privacy` | `privacy.html` | `https://www.sorconnect.in/privacy` | No | Data protection and privacy policy disclosure. |
| `/admprtl` | `admprtl.html` | None (`noindex, nofollow`) | Yes | Administrative content and lead management. |

---

## 2. Detailed Page Breakdowns

---

### 2.1 Homepage (`/` -> `index.html`)

- **Primary Objective:** Establish Tier-1 solar engineering authority, present social proof (150+ MW, 130+ engineers), and capture commercial leads.
- **SEO Metadata:**
  - **Title:** `sorconnect | Sor Connect — Solar EPC Company in Jaipur, Rajasthan (150+ MW)`
  - **Meta Description:** `Sor Connect is a premier solar EPC company in Jaipur, Rajasthan with 150+ MW executed. Specializing in commercial rooftop, industrial ground-mount, I&C, O&M & PM-KUSUM.`
  - **Structured Data:** Root `Organization` and `LocalBusiness` schema graphs.

#### Section-by-Section Architecture:
1. **Header & Navigation:** Sticky glassmorphism bar featuring Sor Connect brand logo, desktop navigation links (`Home`, `Services`, `Projects`, `About Us`, `Contact Us`), and "Free Assessment" CTA button. Includes mobile hamburger drawer.
2. **Hero Section (`#hero`):** High-impact solar plant background with progressive fade-in text, trust badges (`Tier-1 Solar EPC`, `150+ MW Deployed`), primary headline, dual CTAs ("Schedule Site Assessment", "Explore Executed Projects"), and client trust logos.
3. **Key Metrics / Stats Ticker (`#stats`):** Rolling GSAP counters displaying `150+ MW` cumulative capacity, `130+` in-house engineers, `50+` commercial deployments, and `100%` on-time delivery record.
4. **Why Choose Sor Connect (`#why-us`):** 4 value proposition cards: Tier-1 Component Sourcing, Complete In-House Engineering, CEIG & Net-Metering Liaisoning, and 25-Year Lifecycle O&M.
5. **Interactive EPC Process Slider (`#process-slider`):** 5-step automated workflow (Feasibility & Design, Procurement, Fabrication, Grid Synchronization, Lifecycle O&M) with progress bars and preloaded image switching.
6. **Featured Projects Showcase (`#projects-preview`):** Filterable grid dynamically hydrated from Supabase `projects` table (fallback to local static cards).
7. **Client Testimonials & Industry Proof:** Quotes and metrics from industrial plant managers and commercial facility executives.
8. **Quick Quote Callout (`#lead-cta`):** Embedded lead capture form asking for Name, WhatsApp Number, Monthly Bill, and Pincode.
9. **Global Footer:** Complete site map, regional office addresses, contact telephone, legal links, and Careers modal trigger link.

---

### 2.2 Services Page (`/services` -> `services.html`)

- **Primary Objective:** Provide technical breakdowns of commercial, industrial, agricultural, and governmental solar offerings.
- **SEO Metadata:**
  - **Title:** `Solar EPC, Industrial Rooftop & PM-KUSUM Services in India | sorconnect`
  - **Meta Description:** `Comprehensive solar EPC, I&C, O&M, and PM-KUSUM Component A/C services across India. Turnkey engineering from Jaipur's leading solar contractor.`
  - **Structured Data:** `Service` and `BreadcrumbList` schema graphs.

#### Section-by-Section Architecture:
1. **Services Hero:** High-contrast banner framing Sor Connect's multi-disciplinary engineering spectrum.
2. **Service 1: Turnkey Commercial & Industrial Solar EPC:** Detailed scope covering site survey, 3D shadow modeling in PVsyst, structural fabrication, high-voltage HT/LT transformer installation, and net-metering.
3. **Service 2: Installation & Commissioning (I&C):** Contractual execution for utility developers, module mounting structures (MMS), cabling, inverter skid placement, and cold/hot commissioning.
4. **Service 3: Comprehensive Operations & Maintenance (O&M):** Robotic panel cleaning, drone-based thermography, SCADA telemetry monitoring, preventive maintenance, and guaranteed plant PR (Performance Ratio).
5. **Service 4: PM-KUSUM & Subsidized Solar Programs:** Turnkey execution under PM-KUSUM Component-A (solar power plants on barren land) and Component-C (feeder-level solarization).
6. **Technical Comparison Table:** Clear matrix contrasting Sor Connect's Tier-1 turnkey delivery with standard unorganized contractors.
7. **Direct Quote Trigger CTA:** Pre-fills the Quote Modal with the selected service name.

---

### 2.3 Projects Portfolio (`/projects` -> `projects.html`)

- **Primary Objective:** Serve as undeniable evidence of scale, safety standards, and engineering excellence across major industrial clients.
- **SEO Metadata:**
  - **Title:** `Solar Projects Portfolio — 150+ MW C&I Deployments | sorconnect`
  - **Meta Description:** `Explore Sor Connect's portfolio of 150+ MW solar installations across India. High-efficiency rooftop solar, ground-mounted MW plants, and industrial installations.`

#### Interactive Functionality:
- **Category Filter Tabs:**
  - `All Projects` (displays cumulative portfolio)
  - `Commercial Rooftop EPC`
  - `Industrial Ground Mount`
  - `PM-KUSUM Feeder Solarization`
  - `Operations & Maintenance (O&M)`
- **Dynamic Supabase Hydration:** Queries `https://znjpzipedsowuyrpotgb.supabase.co/rest/v1/projects?select=*,categories(*)`.
- **Card Content:** Displays project thumbnail image, capacity badge (e.g. `1.2 MW`), client name, location (e.g. `Sitapura Industrial Area, Jaipur`), and completion date.

---

### 2.4 About Us (`/about` -> `about.html`)

- **Primary Objective:** Build personal trust, highlight executive leadership, showcase the engineering workforce, and demonstrate physical infrastructure.
- **SEO Metadata:**
  - **Title:** `About Sor Connect — 130+ Solar Engineers & 150+ MW EPC | sorconnect`
  - **Meta Description:** `Learn about Sor Connect's solar engineering leadership, 150+ MW track record, 130+ technical experts, and Tier-1 execution partners across Rajasthan & North India.`

#### Section-by-Section Architecture:
1. **Leadership & History:** Founding story in 2020 by Vivek Jain, corporate vision, and scaling milestones.
2. **Engineering Fleet Statistics:** Highlights the 130+ technical staff, testing equipment, and zero-accident safety records.
3. **Interactive Plant Showcase (Carousel):** Visual slider highlighting megawatt-scale field installations dynamically loaded from the `about_gallery` table.
4. **Technology Partners Grid:** Brand logos representing official execution relationships with Sungrow, Reliance Solar, Waree, and Schneider Electric.
5. **Awards & Recognitions:** Physical certificates and green energy honors loaded from `awards.json` / `awards` table.

---

### 2.5 Contact Page (`/contact` -> `contact.html`)

- **Primary Objective:** Provide direct, friction-free communication channels for commercial clients and prospective employees.
- **SEO Metadata:**
  - **Title:** `Contact Solar Engineers in Jaipur & Agra — Get Free Feasibility Study | sorconnect`
  - **Meta Description:** `Connect with Sor Connect's solar engineering teams in Jaipur, Rajasthan & Agra, UP. Schedule a zero-cost site feasibility assessment or visit our regional offices.`
  - **Structured Data:** Full `ContactPage` schema featuring geocoordinates for Jaipur and Agra offices.

#### Key Features:
- **Headquarters Card:** Chitrakoot, Vaishali Nagar, Jaipur with direct phone link (`+91-9119119098`), email (`info@sorconnect.com`), and embedded Google Maps link.
- **Branch Office Card:** Sanjay Place, Civil Lines, Agra, Uttar Pradesh.
- **Lead Generation Form:** Posts to `/api/contact` and saves asynchronously to Supabase `submissions` table.
- **Careers Card:** Direct CTA that opens the Global Careers Modal for job seekers.

---

### 2.6 Legal Pages (`/terms` & `/privacy`)

- **Terms of Use (`terms.html`):** Governs quotation validity (30-day quote guarantees), structural feasibility assumptions, payment milestones, and intellectual property.
- **Privacy Policy (`privacy.html`):** Clarifies customer data collection, phone/WhatsApp communication consent, and non-disclosure of industrial site surveys.
