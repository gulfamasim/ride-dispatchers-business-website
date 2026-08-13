# SEO Progress — ridedispatchers.com

**Read this file first whenever you work on SEO for this site.**
Plain language, in order, so you never have to re-explain the state.

**Primary goal:** rank #1 for **"taxi dispatch call center in Pakistan"** and its close variants.
**Canonical host:** `https://www.ridedispatchers.com` (apex 301s to www).
**Last session:** 14 August 2026.

---

## Where things stand

The site moved from Cloudflare Pages to Vercel and had a full technical + content SEO pass.
Everything in the "Done" list below is live in the repo. The blocking items are all **yours**,
not code — mostly Search Console, Google Business Profile and DNS.

### The single biggest fix

On Cloudflare, **every URL returned HTTP 200 with the homepage HTML** — including
`/robots.txt`, `/sitemap.xml`, `/careers` and any typo. That is what produced:

- PageSpeed's *"robots.txt is not valid — 437 errors"* (Cloudflare was appending the
  homepage's HTML to its managed robots.txt, and Lighthouse parsed ~437 HTML lines as
  invalid crawl directives)
- Ahrefs *"Duplicate pages without canonical"* — infinite soft-404 duplicates of the homepage
- `sitemap.xml` and `llms.txt` returning HTML instead of their real content

Vercel returns real 404s by default, and there are now real `robots.txt`, `sitemap.xml`,
`llms.txt` and `404.html` files. This is fixed at the root.

---

## Done (code, live in repo)

**Crawl & index**
- `robots.txt` — real file, allows search + AI crawlers, points at the sitemap
- `sitemap.xml` — all 16 indexable URLs with priorities
- `llms.txt` — structured summary for AI assistants (was a PageSpeed failure)
- `404.html` — real not-found page, served by Vercel with a true 404 status
- `vercel.json` — `cleanUrls`, cache headers, security headers, legacy redirects

**Ahrefs errors cleared**
- *Duplicate pages without canonical* → `<link rel="canonical">` on all 17 pages
- *Page has links to broken page* → every `href="#"` replaced with a real page
  (Careers removed entirely; Privacy / Terms / GDPR / Cookies written and linked)
- *Image file size too large* → 5.38 MB → 0.79 MB (85% reduction) + WebP variants
- *3XX redirect / Page has links to redirect* → all internal links now point at clean URLs
  (`/about`, not `/about.html`), so no internal link hits a 308

**PageSpeed items**
- Render-blocking fonts → async load with `<noscript>` fallback
- LCP request discovery → `<link rel="preload" as="image" fetchpriority="high">` per page
- Improve image delivery → resize + re-encode + `<picture>`/WebP + `width`/`height`/lazy
- Efficient cache lifetimes → `vercel.json` headers (1yr immutable on `/img/*`)
- Accessibility tree → `<main>` landmark, skip link, `aria-hidden` on ~200 decorative SVGs,
  every form input labelled with `for`/`id`, `aria-expanded` on nav + FAQ, iframe `title`,
  visible focus rings

**On-page SEO**
- Unique title + meta description on every page
- Open Graph + Twitter Card tags with real images
- JSON-LD `@graph` everywhere: `Organization`/`ProfessionalService`, `WebSite`, `BreadcrumbList`,
  plus `Service` + `FAQPage` (landing page), `BlogPosting` (posts), `ContactPage` (contact)
- One `<h1>` per page, verified

**Content**
- **`/taxi-dispatch-call-center-pakistan`** — the primary ranking target. Exact-match URL,
  title and H1; coverage models; honest in-house vs outsourced comparison table;
  10-question FAQ with schema
- **6 blog posts** — platform comparisons, outsourcing cost, in-house vs call center,
  why Lahore, night-shift design. Cabica is featured throughout (see below)
- Homepage gained a keyword-targeted "taxi dispatch call center in Pakistan" section

**Business details**
- Address updated everywhere → Latif Center, Office # 60, 2nd Floor, Block D1, Gulberg III,
  Lahore, 54000 (nav, footer, contact card, map embed, JSON-LD, legal pages)
- `info@ridedispatchers.com` added alongside `ridedispatchers@gmail.com`
- Google Business Profile linked in footer + `sameAs`
- Microsoft Clarity (`y1vebz69rt`) on all 17 pages

**Cabica placement**
- Logo added to the homepage partner strip, **first position, "Preferred platform" badge**
- **First and pre-selected** option in both platform dropdowns
- Dedicated "preferred platform" callout on the landing page and in 3 blog posts
- Named in `llms.txt`, `knowsAbout` schema, and throughout body copy
- A whole post — `/blog/cabica-vs-autocab-vs-icabbi` — leads with Cabica

---

## Next actions — YOURS (do these in order)

These are the blocking items. The code cannot do them.

1. **Point the domain at Vercel.** See "DNS & domain" below. Nothing else matters until
   `www.ridedispatchers.com` serves from Vercel.
2. **Google Search Console** — add `https://www.ridedispatchers.com`, verify by DNS TXT,
   submit `sitemap.xml`, then "Request indexing" for `/` and
   `/taxi-dispatch-call-center-pakistan`.
3. **Bing Webmaster Tools** — same; you can import the property straight from Search Console.
4. **Google Business Profile** — this is the highest-leverage local SEO action you have:
   - Update the address to Latif Center, Office # 60, 2nd Floor, Block D1, Gulberg III,
     Lahore, 54000 (you said you'd do this)
   - Set the primary category to **Telemarketing service** or **Business to business service**
   - Set hours to **Open 24 hours, 7 days**
   - Add the website link → `https://www.ridedispatchers.com`
   - Add 5–10 photos of the actual office and floor
   - **Get reviews.** For "taxi dispatch call center in Pakistan", the map pack is where the
     clicks are, and review count is the biggest lever on map-pack ranking.
5. **Create the mailboxes** (you have 5 available). Suggested set, in priority order:
   `info@` (primary, already on the site) → `sales@` → `support@` → `ops@` → `careers@`.
   Once `info@` exists, set the Formspree form to forward there.
6. **Local citations** — list the business on Pakistani directories with the *exact* same
   name, address and phone as the GBP. Inconsistent NAP is the most common local-SEO killer.

---

## DNS & domain (Cloudflare → Vercel)

**Recommendation: keep Cloudflare as your DNS provider, but set the Vercel records to
DNS-only (grey cloud). Do not go back to Spaceship nameservers.**

Why: Cloudflare's DNS is fast, free and already configured, and keeping it means your future
MX/SPF/DKIM records for the five mailboxes stay in one place. Moving nameservers to Vercel or
back to Spaceship would mean re-creating all of that for no benefit.

**The critical detail:** the Vercel records must be **grey cloud (DNS only)**, not orange.
Orange-cloud proxying puts Cloudflare's CDN in front of Vercel's CDN, which breaks Vercel's
automatic certificate issuance and commonly causes redirect loops.

### Steps

1. **Vercel** → project → Settings → Domains → add `www.ridedispatchers.com`, then add
   `ridedispatchers.com` and set it to redirect to the www version.
2. **Cloudflare** → DNS → Records. Delete the existing records that point at Cloudflare Pages, then add:

   | Type | Name | Value | Proxy |
   |---|---|---|---|
   | CNAME | `www` | `cname.vercel-dns.com` | **DNS only (grey)** |
   | A | `@` | `216.150.1.1` | **DNS only (grey)** |

   Use whatever target values Vercel shows you in its Domains panel — they are authoritative
   and occasionally change.
3. **Cloudflare** → SSL/TLS → set encryption mode to **Full (strict)**.
4. **Cloudflare** → Rules → delete any Page Rules or Redirect Rules left over from Pages.
5. Wait for Vercel to show "Valid Configuration" on both domains (usually minutes).
6. **Cloudflare** → Workers & Pages → delete or disconnect the old `ride-dispatchers`
   Pages project so nothing can serve stale content.

### After the switch — verify

```bash
curl -sI https://www.ridedispatchers.com/            # 200, server: Vercel
curl -sI https://ridedispatchers.com/                # 308 → https://www.ridedispatchers.com/
curl -sI https://www.ridedispatchers.com/about.html  # 308 → /about
curl -s  https://www.ridedispatchers.com/robots.txt | head -3   # real robots.txt, not HTML
curl -sI https://www.ridedispatchers.com/nope-xyz    # 404, not 200
```

That last one is the check that matters most — it is the bug that was poisoning the whole crawl.

---

## Keyword targets

| Page | Primary term | Supporting terms |
|---|---|---|
| `/taxi-dispatch-call-center-pakistan` | taxi dispatch call center in Pakistan | taxi dispatch call center Lahore, outsourced taxi dispatch Pakistan, taxi BPO Lahore |
| `/` | outsourced taxi dispatch | taxi dispatch call center, taxi dispatch services |
| `/services` | taxi dispatch services | taxi call center services, taxi back office outsourcing |
| `/blog/best-taxi-dispatch-software-2026` | best taxi dispatch software | taxi booking system, taxi dispatch software 2026 |
| `/blog/cabica-vs-autocab-vs-icabbi` | Cabica vs Autocab vs iCabbi | taxi dispatch platform comparison |
| `/blog/outsource-taxi-dispatch-to-pakistan-cost` | outsource taxi dispatch cost | taxi call center cost Pakistan |

**Deliberately not targeted:** bare "call center" or "BPO Pakistan". Those SERPs belong to
national enterprise BPOs and the intent behind them is not taxi dispatch — unwinnable and it
would not convert. Same reasoning as the Cabica site's decision not to chase bare "CRM".

---

## Content queue (next posts, in priority order)

1. `taxi-dispatch-kpis-that-matter` — answer time, abandonment, conversion, repeat-rider rate
2. `how-to-write-taxi-dispatch-sops` — the document set we ask new clients for
3. `taxi-fleet-gdpr-checklist-uk` — pairs with `/gdpr`, strong for compliance-anxious buyers
4. `switching-taxi-dispatch-software-without-downtime` — internal link magnet for Cabica
5. `taxi-call-center-outsourcing-uk` — a UK-market twin of the Pakistan landing page

---

## Rules for this site

- **Never invent metrics.** The site claims sub-15s answer time, 98% answer rate, up to 70%
  cost reduction, founded 2021. Reuse those exact figures; do not add new specific numbers
  without the client confirming them.
- **No prices on the site.** Coverage models say "Custom — quoted on volume". A published
  per-seat rate either overcharges quiet fleets or under-resources busy ones.
- **No fake reviews or `AggregateRating` schema** until real reviews exist. It is a
  manual-action trigger. (Same rule as the Cabica site.)
- **Keep internal links on clean URLs** (`/about`, never `/about.html`) or you reintroduce the
  308-redirect findings Ahrefs flagged.
- **Every new page needs:** canonical, unique title/description, OG tags, JSON-LD, one `<h1>`,
  a `sitemap.xml` entry, and an internal link from at least one existing page.

---

## Gotchas already hit (do not repeat)

- **EXIF orientation on `architecture.jpg`.** It was stored 4032×3024 landscape with an EXIF
  Orientation tag of 6, so browsers displayed it as 3024×4032 portrait. Re-encoding with PIL
  stripped the tag without rotating the pixels, which made every page-header background render
  rotated and zoomed out. Always `ImageOps.exif_transpose()` before resizing.
- **`width`/`height` attributes on logos.** They are presentational hints that set CSS width.
  `.partner-logo` only set `height: 38px`, so the `width="300"` attribute won and every platform
  logo stretched to 300×38. `.partner-logo` now carries `width: auto` — do not remove it.
- **`/favicon.ico` must exist at the repo root**, not only in `/img`. Browsers request the root
  path directly regardless of the `<link rel="icon">` tags.

---

## Session log

**14 August 2026** — Migrated hosting config from Cloudflare Pages to Vercel. Diagnosed and
fixed the soft-404 catch-all that was the root cause of the robots.txt "437 errors" and the
duplicate-content findings. Cleared all 5 Ahrefs error classes. Compressed images 85%. Added
Clarity. Built the Pakistan landing page, 6 blog posts, blog index, 4 legal pages and a 404
page — 12 new pages, 17 total. Added full schema coverage. Updated address and email
throughout. Made Cabica the featured platform site-wide. Verified: all JSON-LD parses, no
broken internal links, one `h1` per page, balanced tags, no console errors, no horizontal
overflow at 390px and 1440px.
