# 11. Complete SEO Architecture & Optimization Strategy

## 1. Executive SEO Strategy & Brand Dominance

The search engine optimization strategy for Sor Connect is engineered to achieve **Position #1 ranking for the exact brand keyword `sorconnect`**, while aggressively ranking for high-intent commercial B2B search terms across Rajasthan, Uttar Pradesh, and Northern India (e.g. *"Solar EPC Company Jaipur"*, *"Commercial Rooftop Solar Rajasthan"*, *"PM-KUSUM Solar Contractor"*).

---

## 2. On-Page Metadata & Title Architecture

To ensure immediate brand recognition by Google's RankBrain and BERT algorithms, **every single page title begins or ends with the exact single-token brand name `sorconnect`**:

| Page Route | Optimized `<title>` Tag | Targeted Primary Keywords |
|---|---|---|
| **`/` (Home)** | `<title>sorconnect \| Sor Connect — Solar EPC Company in Jaipur, Rajasthan (150+ MW)</title>` | `sorconnect`, `Sor Connect`, `Solar EPC Company Jaipur`, `Solar Rajasthan` |
| **`/services`** | `<title>Solar EPC, Industrial Rooftop &amp; PM-KUSUM Services in India \| sorconnect</title>` | `Industrial Rooftop Solar`, `PM KUSUM EPC contractor`, `Solar O&M India` |
| **`/projects`** | `<title>Solar Projects Portfolio — 150+ MW C&amp;I Deployments \| sorconnect</title>` | `Solar project portfolio`, `commercial solar installations Jaipur` |
| **`/about`** | `<title>About Sor Connect — 130+ Solar Engineers &amp; 150+ MW EPC \| sorconnect</title>` | `Sor Connect leadership`, `solar engineers Jaipur`, `Vivek Jain Sor Connect` |
| **`/contact`** | `<title>Contact Solar Engineers in Jaipur &amp; Agra — Get Free Feasibility Study \| sorconnect</title>` | `Solar company contact Jaipur`, `Solar installer Agra`, `feasibility study` |
| **`/terms`** | `<title>Terms of Use \| sorconnect — Legal &amp; Service Terms</title>` | Brand compliance & contractual terms |
| **`/privacy`** | `<title>Privacy Policy \| sorconnect — Data Protection &amp; Customer Privacy</title>` | Brand data compliance |

---

## 3. Canonical URL & Social Graph (Open Graph / Twitter)

Every page enforces a strict, self-referential canonical tag using absolute HTTPS URLs:
```html
<link rel="canonical" href="https://www.sorconnect.in/services">
```

### Social Media Graph Implementation:
- **`og:site_name`:** `sorconnect`
- **`og:type`:** `website`
- **`og:url`:** Full absolute URL (e.g. `https://www.sorconnect.in/projects`)
- **`og:image`:** High-resolution preview image (`https://www.sorconnect.in/assets/hero-solar-rooftop.webp`)
- **`twitter:card`:** `summary_large_image`

---

## 4. Structured Data & JSON-LD Schemas

The website embeds **5 distinct, fully validated JSON-LD schema graphs** to provide search engine bots with unambiguous entity data:

### 4.1 Homepage Schema (`index.html`)
Combines `Organization` and `LocalBusiness`:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.sorconnect.in/#organization",
      "name": "Sor Connect",
      "legalName": "Sor Connect",
      "alternateName": ["sorconnect", "Sor Connect", "SorConnect Solar", "Sor Connect Jaipur"],
      "url": "https://www.sorconnect.in/",
      "logo": "https://www.sorconnect.in/assets/sorconnect-logo.png",
      "founder": {
        "@type": "Person",
        "name": "Vivek Jain",
        "jobTitle": "Managing Director & Founder"
      },
      "foundingDate": "2020",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 130
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.sorconnect.in/#localbusiness",
      "name": "Sor Connect - Solar EPC Division",
      "telephone": "+91-9119119098",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "F-02, P.No. 3/410, Sector 3, Chitrakoot, Vaishali Nagar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302021",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.908054",
        "longitude": "75.744972"
      }
    }
  ]
}
```

### 4.2 Services Schema (`services.html`)
Defines `Service` and `BreadcrumbList`:
- Includes explicit service scopes for Commercial Rooftop EPC, I&C, O&M, and PM-KUSUM.

### 4.3 Contact Schema (`contact.html`)
Defines `ContactPage` with multi-location postal addresses and geocoordinates for both the **Jaipur Headquarters** and the **Agra Regional Office**.

---

## 5. Technical Crawl Directives (`robots.txt` & `sitemap.xml`)

### 5.1 `robots.txt`
```text
User-agent: *
Allow: /
Disallow: /admprtl
Disallow: /admprtl.html
Disallow: /api/

Sitemap: https://www.sorconnect.in/sitemap.xml
```

### 5.2 `sitemap.xml`
Maintains priority hierarchies and last-modified timestamps for all indexable pages:
- `/` (Priority `1.0`, ChangeFreq `weekly`)
- `/services` (Priority `0.9`, ChangeFreq `monthly`)
- `/projects` (Priority `0.9`, ChangeFreq `weekly`)
- `/about` (Priority `0.8`, ChangeFreq `monthly`)
- `/contact` (Priority `0.8`, ChangeFreq `monthly`)
- `/terms` & `/privacy` (Priority `0.3`, ChangeFreq `yearly`)

---

## 6. Resolving Brand Competition from B2B Directories

### Why IndiaMART / SolarTrade Previously Outranked the Site:
1. **Single-Word Token Absence:** The original site used "Sor Connect" (two words separated by space) in all copy. When a user typed the single compound token `sorconnect`, Google prioritized directory profiles that had the single word in their URLs.
2. **"Home" Title Anti-Pattern:** The homepage previously used `<title>Home \| Sor Connect</title>`, wasting valuable title space on the generic word "Home".

### The Fix Implemented:
- The exact keyword `sorconnect` has been placed at the forefront of the homepage title and in every subpage title.
- Alternate names (`"alternateName": ["sorconnect"]`) were embedded in schema markup.
- In Google Search Console, request indexing on `https://www.sorconnect.in/` to immediately reflect these updates.
