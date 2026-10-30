# 04. Design System & Component Library

## 1. Overview & Architectural Philosophy

The Sor Connect website employs a **custom, lightweight design system** built entirely on CSS Custom Properties (CSS variables) without relying on heavy third-party CSS frameworks like Bootstrap or Tailwind on the public frontend. This architecture ensures instantaneous rendering, zero unused CSS bloat, and unified brand aesthetics across all screen resolutions.

The design language conveys **engineering precision, sustainability, corporate stability, and renewable energy leadership**.

---

## 2. Color Palette & Tokens

### 2.1 Public Website Color Palette (`css/style.css`)

```css
:root {
  --ink:          #161D19; /* Primary deep charcoal text color */
  --ink-soft:     #4A554F; /* Muted secondary body and subtitle text */
  --forest:       #173F31; /* Brand primary dark emerald green */
  --forest-deep:  #0E2C22; /* High-contrast header and dark section background */
  --leaf:         #3E8F5C; /* Accent vibrant green for highlights and badges */
  --leaf-bright:  #4FAE71; /* Hover state for primary buttons and interactive links */
  --gold:         #C99A45; /* Warm metallic gold for premium badges and key stats */
  --canvas:       #FFFFFF; /* Pure white page background */
  --canvas-dim:   #F9F9F9; /* Subtle off-white for alternating card and section fills */
  --sage:         #E7EDE6; /* Soft pastel green for tinted pill badges and borders */
  --sage-line:    #CFDACB; /* Subtle structural divider line color */
  --white:        #FFFFFF; /* Standard crisp white */
}
```

#### Color Usage Guidelines:
| Color Token | Hex Code | Primary Purpose & Semantic Meaning |
|---|---|---|
| `--forest-deep` | `#0E2C22` | Hero sections, primary headings (`h1`, `h2`), and sticky header text. Conveys authority and corporate longevity. |
| `--forest` | `#173F31` | Primary CTA buttons, footer background, and strong visual anchors. |
| `--leaf` | `#3E8F5C` | Eyebrow badges (`.hero-badge`, `.sec-badge`), active navigation indicators, and checkmark icons. |
| `--leaf-bright` | `#4FAE71` | Interactive hover states on buttons and focus rings. |
| `--gold` | `#C99A45` | High-impact numerical stats, star ratings, and certified badges. |
| `--ink` | `#161D19` | High-legibility standard paragraph and table text. |
| `--ink-soft` | `#4A554F` | Card descriptions, metadata labels, and footer copyright text. |
| `--sage-line` | `#CFDACB` | Card borders, table cell dividers, and input field boundaries. |

---

### 2.2 Admin Portal Color Palette (`admin_styles.js`)

The administrative portal utilizes a specialized **Shadcn/UI-inspired design token system** engineered for high-density administrative productivity:

```css
:root {
  --background:           #f8fafc; /* Crisp slate-50 canvas */
  --foreground:           #0f172a; /* Slate-900 high contrast text */
  --card:                 #ffffff; /* Elevated card surface */
  --card-foreground:      #0f172a;
  --primary:              #15803d; /* Tailwind Green-700 primary action */
  --primary-hover:        #166534; /* Green-800 interactive hover */
  --primary-foreground:   #ffffff;
  --secondary:            #f1f5f9; /* Slate-100 secondary buttons */
  --secondary-foreground: #0f172a;
  --muted:                #f1f5f9;
  --muted-foreground:     #64748b; /* Slate-500 helper text */
  --destructive:          #ef4444; /* Red-500 danger action / delete button */
  --destructive-foreground: #ffffff;
  --border:               #e2e8f0; /* Slate-200 table and input borders */
  --radius:               8px;     /* Modern rounded corner geometry */
  --sidebar-w:            260px;   /* Fixed navigation sidebar width */
}
```

---

## 3. Typography Scale & Font Architecture

The platform loads web fonts directly from Google Fonts with preconnected DNS lookups:
- **`Montserrat` (600, 700, 800):** Display headings, hero titles, stat figures, and high-impact CTAs.
- **`Roboto` (300, 400, 500, 700):** Highly legible, neutral body copy and tabular data.
- **`DM Sans` (400, 500, 600, 700):** Form labels, metadata tags, and UI component microcopy.
- **`Inter` (300, 400, 500, 600, 700):** Admin portal interface font.

```css
:root {
  --heading: "Montserrat", "Roboto", sans-serif;
  --body:    "Roboto", sans-serif;
  --label:   "DM Sans", "Roboto", sans-serif;
}
```

### Typography Scale Matrix

| HTML Element / Class | Font Family | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `.hero-title` (`h1`) | Montserrat | `54px` | `34px` | 800 | `1.15` | `-0.02em` |
| Section Headings (`h2`) | Montserrat | `38px` | `28px` | 700 | `1.25` | `-0.01em` |
| Card Headings (`h3`) | Montserrat | `22px` | `19px` | 600 | `1.35` | `normal` |
| Subheadings (`h4`) | Montserrat | `18px` | `16px` | 600 | `1.4` | `normal` |
| Eyebrow Badge (`.sec-badge`) | DM Sans | `13px` | `12px` | 700 | `1.0` | `0.08em (Uppercase)` |
| Lead Body Text (`.hero-desc`) | Roboto | `18px` | `15px` | 400 | `1.65` | `normal` |
| Standard Body Text (`p`) | Roboto | `15px` | `14px` | 400 | `1.6` | `normal` |
| Form Labels (`label`) | DM Sans | `13px` | `13px` | 600 | `1.2` | `0.02em` |
| Primary Buttons (`.btn-primary`) | Montserrat | `14px` | `14px` | 700 | `1.0` | `0.04em (Uppercase)` |

---

## 4. Spacing Scale & Layout Geometry

```css
:root {
  --container: 1300px; /* Maximum content container boundary */
  --radius:    3px;    /* Subtle, clean architectural edge radius */
  --ease:      cubic-bezier(0.4, 0, 0.2, 1); /* Natural cubic acceleration */
  --dur:       0.3s;   /* Standard interface transition duration */
}
```

### Breakpoints & Responsive Grid System
- **Desktop Wide:** `> 1200px` (Full 1300px constrained container with 24px edge padding).
- **Desktop / Laptop:** `992px - 1199px` (Standard 3-column and 4-column card layouts).
- **Tablet:** `768px - 991px` (2-column grids, collapsed navigation bar with slide-out drawer).
- **Mobile Handset:** `< 768px` (Single-column linear layouts, touch-friendly 44px min tap targets).

---

## 5. UI Component Catalog

### 5.1 Buttons & Interactive Actions

```html
<!-- Primary Brand CTA with Arrow Icon -->
<a href="/contact" class="btn btn-primary">
  <span>Schedule Site Assessment</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</a>

<!-- Secondary Outline Button -->
<a href="/projects" class="btn btn-outline">
  <span>Explore Executed Projects</span>
</a>
```
- **Styling Rules:** High-contrast solid fill (`--forest`), transition on hover to `--leaf` with a subtle `translateY(-2px)` elevation shift.
- **Magnetic Effect:** Script `js/main.js` attaches a physics-based magnetic pull to `.btn-primary` elements on desktop cursor approach.

---

### 5.2 Badges & Status Indicators
- **Eyebrow Badge (`.sec-badge`):** Pastel background (`--sage`), dark green text (`--forest`), uppercase, rounded pill shape.
- **Gold Numerical Badge (`.stat-badge`):** Metallic gold accent (`--gold`) highlighting capacity achievements (`150+ MW`).

---

### 5.3 Interactive EPC Process Slider
- **DOM Container:** `#process-slider`
- **Structure:** 5 navigational tab buttons (`.proc-tab`) mapped to 5 layered slides (`.proc-slide`) and stacked background images.
- **Behavior:** Autoplays on a 4.5-second interval using an animated CSS progress bar. Clicking any step halts autoplay, updates the active tab, and instantly swaps the visible visual layer with zero layout lag.

---

### 5.4 Lead Capture & Modal System
- **Quick Quote / Feasibility Modal (`#quote-modal-overlay`):** Injected globally by `js/main.js`. Features smooth backdrop blur (`backdrop-filter: blur(8px)`), ESC key dismissal, click-outside dismissal, and autofocus on the first input.
- **Careers Modal (`#careers-modal-overlay`):** Full multi-field recruitment form with drag-and-drop resume attachment dropzone (`#career-dropzone`).

---

### 5.5 Floating Contact "Biscuit"
- **Element:** `.floating-contact-biscuit`
- **Location:** Fixed to the right viewport margin (`right: 0`, `top: 50%`, `transform: translateY(-50%)`).
- **Functionality:** Provides a persistent, vertical 1-click trigger allowing visitors anywhere on the site to launch the feasibility modal without scrolling back to the header or footer.

---

## 6. Motion, Transitions & Animation Framework

- **GSAP (GreenSock) Engine:** Powers high-performance scroll triggers.
- **Count-Up Tickers:** Statistics (`150+ MW`, `130+ Engineers`, `100% Timely Delivery`) animate smoothly from zero as soon as the element enters the viewport.
- **IntersectionObserver Fallback:** If the external GSAP CDN script fails to load, `js/main.js` contains a native browser `IntersectionObserver` fallback that automatically reveals hidden `.will-fade` content blocks without disrupting layout.
