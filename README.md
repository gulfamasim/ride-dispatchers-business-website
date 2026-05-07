# Ride Dispatchers — Website Documentation

**Live site:** [ridedispatchers.xyz](https://ridedispatchers.xyz)  
**Hosted on:** Cloudflare Pages  
**Last updated:** May 2026

---

## Project Overview

Static website for **Ride Dispatchers** — a taxi fleet outsourcing firm offering dispatch, contact center, virtual assistance, digital marketing, and web services to UK-based taxi operators.

Built from scratch as a custom 2026 redesign. No frameworks, no Bootstrap — pure HTML, CSS, and vanilla JavaScript.

---

## File Structure

```
/
├── index.html          → Homepage
├── about.html          → About page
├── services.html       → Services page
├── contact.html        → Contact page
│
├── css/
│   └── style.css       → All styles (design system, layout, responsive)
│
├── js/
│   └── main.js         → Page loader, navbar, scroll reveals, counters, forms
│
└── img/
    ├── MainLogo.png            → Brand logo (used in navbar + footer)
    ├── favicon.ico             → Browser tab icon
    ├── hero-call-center.jpg    → Hero section background image
    ├── agents-working.jpg      → About section / split image
    ├── team-group.jpg          → Team photo strip (used on all main pages)
    ├── architecture.jpg        → Page header background (About, Services, Contact)
    └── Logos/
        ├── Autocab.jpg         → Partner logo
        ├── Cordic.jpg          → Partner logo
        └── Icabbi.jpg          → Partner logo
```

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero with contact form, features, services, team photo, CTA |
| About | `about.html` | Story, values, stats, team photo |
| Services | `services.html` | 6 services grid, 4-step onboarding process |
| Contact | `contact.html` | Contact cards with action buttons, contact form, map |

---

## Design System

### Fonts
Loaded from Google Fonts (routed via Cloudflare Fonts for performance):
- **Inter** — primary UI font (navigation, body, buttons)
- **Roboto** — fallback / headings

### Colors
| Token | Value | Usage |
|---|---|---|
| `--rd-primary` | `#0E5FCB` | Brand blue — buttons, links, accents |
| `--rd-primary-dark` | `#0A4499` | Hover state |
| `--rd-primary-light` | `#2D7FF9` | Hero accent text |
| `--bg-dark` | `#0B1530` | Navbar, footer, dark sections |
| `--bg-soft` | `#F5F7FA` | Alternating off-white sections |
| `--bg-light` | `#FFFFFF` | Standard white sections |

### Section Alternation Pattern
Pages alternate between section types to avoid a one-colour feel:
- `sec-light` → white background
- `sec-soft` → off-white (#F5F7FA)
- `sec-dark` → dark navy (#0B1530)

---

## Forms

Both forms (homepage hero + contact page) submit to **Formspree** via AJAX — no page redirect on submission.

- **Formspree endpoint:** `https://formspree.io/f/mpqbrgny`
- **Form IDs:** `hero-form` (homepage), `contact-form` (contact page)
- On success: shows a success message inline, resets the form
- On error: shows an error message inline

To change the Formspree endpoint, update the `action` attribute in:
- `index.html` → `<form id="hero-form" action="...">`
- `contact.html` → `<form id="contact-form" action="...">`

---

## JavaScript (`js/main.js`)

| Feature | Description |
|---|---|
| Page loader | Dark navy splash screen with logo + spinner, shown on load and between page transitions |
| Navbar | Fixed pill navbar — transparent over hero, transitions to dark navy on scroll |
| Mobile menu | Hamburger toggle opens dark dropdown with nav links + Get a Quote button |
| Scroll reveals | IntersectionObserver fades elements in as they enter viewport |
| Stat counters | Animated number counters on the hero (70%, 24/7, 98%) |
| Form handling | AJAX Formspree submission with success/error feedback |
| Smooth scroll | Anchor links scroll smoothly |
| Dynamic year | Footer copyright year updates automatically |

---

## Hosting — Cloudflare Pages

**Project name:** `ride-dispatchers`  
**Domain aliases:** `ridedispatchers.xyz`, `www.ridedispatchers.xyz`

### How to deploy an update

1. Make your changes to the files locally
2. Zip the files — **important:** zip the contents directly, not a parent folder. The zip root must contain `index.html`, not a subfolder.

   **Correct zip structure:**
   ```
   index.html        ← at root
   about.html
   contact.html
   services.html
   css/style.css
   js/main.js
   img/...
   ```

3. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → `ride-dispatchers`
4. Click **Create deployment** → **Production** → drag and drop the zip → **Save and deploy**

### Cloudflare settings applied
- **Caching Level:** Standard
- **Browser Cache TTL:** 3 hours
- **Cloudflare Fonts:** ON (serves Google Fonts from Cloudflare edge)
- **Early Hints:** ON (preloads assets for faster paint)

> **After deploying changes:** If the live site still shows old content, go to **Caching → Configuration → Purge Everything** in the Cloudflare dashboard.

---

## Contact Details (on-site)

| Field | Value |
|---|---|
| Email | ridedispatchers@gmail.com |
| Phone | +44 7367 063688 |
| WhatsApp | wa.me/447367063688 |
| Address | Khuzama-1004B, Grand Square Mall, 8-E/3, Main Boulevard, Firdous Market Rd, Block E3, Gulberg III, Lahore |
| Facebook | facebook.com/profile.php?id=61564512964273 |
| Instagram | instagram.com/ridedispatchers |

To update any contact detail, search the HTML files for the current value and replace across all 4 pages (they all share the same footer).

---

## Performance Notes

- Images are the largest assets (hero, team, architecture photos ~1–1.7MB each)
- For best performance, compress images using [squoosh.app](https://squoosh.app) to under 300KB before re-deploying
- After compressing, re-zip and deploy as a new Cloudflare Pages deployment

---

## Browser Support

Tested and working on:
- Chrome / Edge (desktop + mobile)
- Firefox
- Safari (desktop + iOS)

Uses modern CSS (`backdrop-filter`, CSS custom properties, `clamp()`) — IE not supported.
