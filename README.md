# Ride Dispatchers — Website Documentation

**Live site:** [www.ridedispatchers.com](https://www.ridedispatchers.com)
**Hosted on:** Vercel (migrated from Cloudflare Pages, August 2026)
**Canonical host:** `www.ridedispatchers.com` — apex redirects to www
**Last updated:** 14 August 2026

> Working on SEO? Read **[SEO-PROGRESS.md](SEO-PROGRESS.md)** first — it is the living tracker
> of what is done, what is next, and which actions are yours vs the code's.

---

## Project Overview

Static website for **Ride Dispatchers** — a 24/7 outsourced taxi dispatch call center and BPO
based in Lahore, Pakistan, serving taxi and private-hire fleets in the UK, Ireland and North America.

No frameworks, no build step — plain HTML, CSS and vanilla JavaScript. Deployed straight from
this repo by Vercel on every push to `main`.

---

## File Structure

```
/
├── index.html                              → Homepage
├── about.html                              → About
├── services.html                           → Services
├── contact.html                            → Contact
├── taxi-dispatch-call-center-pakistan.html → Primary SEO landing page
├── privacy.html  terms.html                → Legal
├── gdpr.html     cookies.html              → Legal
├── 404.html                                → Not-found page (Vercel serves automatically)
│
├── blog/
│   ├── index.html                              → Blog index
│   ├── best-taxi-dispatch-software-2026.html
│   ├── outsource-taxi-dispatch-to-pakistan-cost.html
│   ├── taxi-dispatch-call-center-vs-in-house.html
│   ├── cabica-vs-autocab-vs-icabbi.html
│   ├── why-uk-fleets-outsource-dispatch-to-lahore.html
│   └── 24-7-taxi-dispatch-night-shift.html
│
├── vercel.json         → cleanUrls, cache headers, redirects
├── robots.txt          → Crawl rules + sitemap pointer
├── sitemap.xml         → All 16 indexable URLs
├── llms.txt            → Structured summary for AI assistants
│
├── css/style.css       → Design system, layout, responsive, v3 components
├── js/main.js          → Loader, navbar, reveals, counters, FAQ, forms, modal
│
└── img/
    ├── MainLogo.png  favicon.ico
    ├── hero-call-center.jpg / .webp
    ├── agents-working.jpg   / .webp
    ├── team-group.jpg       / .webp
    ├── architecture.jpg     / .webp
    └── Logos/  Cabica.jpg  Autocab.jpg  Cordic.jpg  Icabbi.jpg
```

---

## URLs — clean, no `.html`

`vercel.json` sets `"cleanUrls": true`. That means:

| File | Public URL | `.html` version |
|---|---|---|
| `index.html` | `/` | `/index.html` → 308 → `/` |
| `about.html` | `/about` | `/about.html` → 308 → `/about` |
| `blog/index.html` | `/blog` | — |
| `blog/foo.html` | `/blog/foo` | `/blog/foo.html` → 308 → `/blog/foo` |

**All internal links and asset paths are root-absolute** (`/about`, `/css/style.css`) so they
resolve identically from any directory depth. Consequence: opening an HTML file directly with
`file://` will not load CSS. To preview locally, run a server from the repo root:

```bash
python -m http.server 8000     # then visit http://localhost:8000
```

(Note: the plain Python server does not do clean URLs, so use `/about.html` when previewing locally.)

---

## Pages

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hero + quote form, features, services, Lahore dispatch section, CTA |
| Dispatch Center | `/taxi-dispatch-call-center-pakistan` | **Primary ranking target.** Coverage models, comparison table, 10-question FAQ |
| Services | `/services` | 6 services, 4-step onboarding |
| Blog | `/blog` | 6 long-form guides |
| About | `/about` | Story, values, benchmarks |
| Contact | `/contact` | Contact cards, form, map |
| Legal | `/privacy` `/terms` `/gdpr` `/cookies` | Full legal set |

---

## SEO implementation

Every page carries:

- Unique `<title>` and `<meta name="description">`
- `<link rel="canonical">` on the `www` host
- Open Graph + Twitter Card tags with a real image
- JSON-LD `@graph`: `Organization`/`ProfessionalService` + `WebSite` + `BreadcrumbList`
  (plus `Service` + `FAQPage` on the landing page, `BlogPosting` on posts, `ContactPage` on contact)
- Exactly one `<h1>`
- `<main id="main">` landmark and a skip link
- Microsoft Clarity (`y1vebz69rt`)

**To add a blog post:** copy an existing file in `blog/`, change the head block, body and
JSON-LD, then add the URL to `sitemap.xml` and a card to `blog/index.html`.

---

## Design System

### Fonts
Inter (UI/body) + Roboto (headings), loaded from Google Fonts **non-render-blocking** via
`media="print" onload="this.media='all'"` with a `<noscript>` fallback.

### Colors
| Token | Value | Usage |
|---|---|---|
| `--rd-primary` | `#0E5FCB` | Brand blue — buttons, links, accents |
| `--rd-primary-dark` | `#0A4499` | Hover state |
| `--rd-primary-light` | `#2D7FF9` | Hero accent text |
| `--bg-dark` | `#0B1530` | Navbar, footer, dark sections |
| `--bg-soft` | `#F5F7FA` | Alternating off-white sections |
| `--bg-light` | `#FFFFFF` | Standard white sections |

Sections alternate `sec-light` → `sec-soft` → `sec-dark` to avoid a flat one-colour feel.

---

## Forms

Both forms submit to **Formspree** via AJAX — no redirect, success modal on completion.

- **Endpoint:** `https://formspree.io/f/mpqbrgny`
- **Form IDs:** `hero-form` (homepage), `contact-form` (contact page)
- Marked with `data-ajax`; handled generically in `js/main.js`
- **Cabica is the first and pre-selected option** in the "Platform you run" dropdown on both forms

---

## JavaScript (`js/main.js`)

| Feature | Notes |
|---|---|
| Page loader | Navy splash with logo + spinner, shown on load and between page transitions |
| Link interception | Resolves URLs properly — handles clean URLs, skips assets, external links, modifier-clicks |
| Navbar | Fixed pill; mobile hamburger toggles `aria-expanded` |
| Scroll reveals | IntersectionObserver |
| Stat counters | Animated hero numbers |
| FAQ accordion | Grid-rows transition, `aria-expanded` toggling |
| AJAX forms | `form[data-ajax]` → Formspree → success modal |
| Success modal | Backdrop click, Escape key, focus-safe `hidden` attribute |
| Copy buttons | `[data-copy]` writes to clipboard |
| Dynamic year | Footer copyright |

---

## Images

All hero images were resized and re-encoded in August 2026 — **5.38 MB → 0.79 MB** (85% smaller):

| Image | Before | After (JPEG) | WebP | Dimensions |
|---|---|---|---|---|
| `hero-call-center` | 1193 KB | 178 KB | 58 KB | 1920×1280 |
| `architecture` | 1674 KB | 366 KB | 198 KB | 1920×1440 |
| `agents-working` | 1090 KB | 72 KB | 32 KB | 1200×800 |
| `team-group` | 1551 KB | 190 KB | 93 KB | 1600×1067 |

`<img>` tags use `<picture>` with a WebP `<source>` and a JPEG fallback. CSS backgrounds use
the JPEG. Originals are recoverable from git history (commit `c6b3a2c` and earlier).

**If you add an image:** resize to no more than 1920px wide, save at quality ~80, and add
`width`, `height`, `loading="lazy"` and `decoding="async"` to the tag.

---

## Hosting — Vercel

Vercel is connected to this GitHub repo. **Every push to `main` deploys automatically.**
There is no build step; Vercel serves the files as static assets.

### `vercel.json`

| Setting | Effect |
|---|---|
| `cleanUrls: true` | Serves `/about` from `about.html`; 308-redirects `/about.html` → `/about` |
| `trailingSlash: false` | `/about/` → `/about` |
| `headers` | 1-year immutable cache on `/img/*`, 7 days on `/css/*` and `/js/*`, correct content types on `robots.txt` / `sitemap.xml` / `llms.txt`, plus security headers |
| `redirects` | `/careers` → `/contact`, and a few legacy-path 301s |

`404.html` is picked up automatically by Vercel and served with a real HTTP 404.

---

## Contact Details (on-site)

| Field | Value |
|---|---|
| Primary email | info@ridedispatchers.com |
| Secondary email | ridedispatchers@gmail.com |
| Phone / WhatsApp | +44 7367 063688 |
| Address | Latif Center, Office # 60, 2nd Floor, Block D1, Gulberg III, Lahore, 54000 |
| Facebook | facebook.com/profile.php?id=61564512964273 |
| Instagram | instagram.com/ridedispatchers |
| Google Business | Ride Dispatchers BPO |

The nav and footer markup is duplicated across every page (normal for a static site). To change
a contact detail, search-and-replace the old value across all HTML files.

---

## Browser Support

Chrome / Edge / Firefox / Safari, desktop and mobile. Uses `backdrop-filter`, CSS custom
properties, `clamp()`, `aspect-ratio` and `<picture>`. IE is not supported.
