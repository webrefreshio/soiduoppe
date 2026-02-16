# CLAUDE.md — Sõiduõppe ABC Website Rebuild

## Project Overview
Rebuild sõiduõppe.ee (xn--siduppe-10ad.ee) for Sõiduõppe OÜ — Tartu's top-rated motorcycle and driving school. The current site is WordPress. The new site uses Copperlane (Lexington Themes) with all existing content migrated, teooria.ee iframe embeds preserved, and PagesCMS for ongoing editing. All content in Estonian.

## Technology Stack
- **Theme**: Lexington Themes → **Copperlane** (automotive services theme)
- **Framework**: Astro 5 + Tailwind CSS v4
- **CMS**: PagesCMS (`.pages.yaml` config)
- **Hosting**: GitHub Pages → `soiduoppenew.webrefresh.io`
- **Repo**: `webrefreshio/soiduoppe`

## Client Info

### Company
- **Name**: Sõiduõppe OÜ (brand: Sõiduõppe ABC)
- **Tagline**: "Tartu populaarseim moto- ja autokool" / "Parimate eksamitulemustega juhid Eestis"
- **Address**: Kalda tee 30, Tartu
- **Phone**: +372 507 8230
- **Email**: soiduoppe@gmail.com
- **Hours**: T-N 9:00-17:30
- **Facebook**: Has a Facebook page (find link from current site)
- **Website**: https://www.xn--siduppe-10ad.ee/ (sõiduõppe.ee)
- **Logo**: Extract from current WordPress site

### Key Selling Points
- Best exam results in Estonia — 76% first-time pass rate at Transpordiamet
- Patient and friendly teaching method
- KIA Ceed training vehicles — same as Transpordiamet uses for state exams
- Theory learning online via teooria.ee — study when and where you want
- Electronic student tracking app (õpingukaart)
- Wide range of categories: AM, A, A1, A2, B, BE, C, CE, D
- Also: lõppastmekoolitus, ametikoolitus, ADR, tõstukijuht, kood 95

## teooria.ee Integration

### What it is
Teooria.ee is a third-party e-learning and driving school management platform used by many Estonian driving schools. It provides:
- Course registration forms (iframe embeds)
- Online theory e-learning
- Driving lesson booking
- Student management system
- Electronic student progress cards

### How it's embedded
The current WordPress site embeds teooria.ee registration iframes on course pages. Each course has a "Registreeri" (Register) button that either:
1. Opens a teooria.ee iframe/popup with a registration form
2. Links directly to a teooria.ee registration page

### CRITICAL: Phase 1 Task
During the scraping phase, Claude Code MUST:
1. Visit each course page on the current site
2. Find ALL iframe src URLs containing teooria.ee
3. Find ALL links to teooria.ee
4. Document the exact URL pattern for each course
5. Preserve these URLs in the course data so they can be embedded in the new site

The iframe embed format is likely something like:
```html
<iframe src="https://www.teooria.ee/[school-id]/[course-id]/register" ...></iframe>
```
or
```html
<iframe src="https://kool.teooria.ee/..." ...></iframe>
```

The exact URLs must be extracted from the source HTML, not guessed.

## Site Structure

### Navigation
Kursused (dropdown with categories) | Lõppastmekoolitus | Ametikoolitus | Meist | Kontakt

### Pages

#### Homepage (/)
- Hero: "Parimate eksamitulemustega juhid Eestis tulevad just meie autokoolist!"
- Key USPs: 76% pass rate, KIA Ceed vehicles, online theory, friendly teaching
- Course category cards (quick links to each category)
- CTA: "Vali kategooria ja registreeru!"
- Contact info

#### Course Category Pages (/kursused/[category]/)
Each category gets its own page listing available courses:

- **/kursused/b-kategooria/** — B-category car license (most popular)
- **/kursused/a-kategooria/** — A-category motorcycle
- **/kursused/am-kategooria/** — AM moped
- **/kursused/be-kategooria/** — BE (car + trailer)
- **/kursused/c-kategooria/** — C truck
- **/kursused/ce-kategooria/** — CE (truck + trailer)
- **/kursused/d-kategooria/** — D bus

Each category page includes:
- Course description (what you learn, requirements, what's included)
- Price information
- Course details (theory hours, driving hours, etc.)
- teooria.ee registration iframe/link (the "Registreeri" button)
- Requirements (age, health certificate, etc.)

#### Individual Course Pages (/kursused/[category]/[course-code]/)
The current site has individual pages per course session with codes like:
- B-ABC7483, A-ABC7475, CE-ABC7448, etc.

These appear to be specific course sessions/groups. Scrape all of them and their content.

#### Lõppastmekoolitus (/loppastmekoolitus/)
Final stage training — required to convert provisional license to permanent:
- B-kategooria lõppastme koolitus
- Libedasõit (slippery driving)
- Pimeda aja koolitus (night driving)
- Sub-pages as needed from current site content

#### Algastme libedasõit (/algastme-libedakoolitus/)
Initial stage slippery driving training
- Year-round, Thursdays, Tartu
- Registration via website
- At least 16 driving lessons required before

#### Ametikoolitus (/ametikoolitus/)
Professional driver training:
- Kiirendatud ametikoolitus (accelerated)
- Kood 95 täiendkoolitus
- ADR ohtlike ainete koolitus
- Tõstukijuhi koolitus

#### Meist (/meist/)
About page:
- School history and reputation
- Teaching philosophy (patient, friendly)
- Training vehicles (KIA Ceed)
- Exam statistics
- Team/instructors (if info available on current site)

#### Kontakt (/kontakt/)
- Address: Kalda tee 30, Tartu
- Phone: +372 507 8230
- Email: soiduoppe@gmail.com
- Hours: T-N 9:00-17:30
- Google Maps embed
- Contact form

#### Hinnad (/hinnad/) — if separate pricing page exists
Price list for all categories and services

## Phase Execution Plan

### Phase 1: Scrape WordPress, Setup Theme, Discover Iframes
1. Clone Copperlane theme, install dependencies, verify `npm run dev` works
2. **Scrape the entire current WordPress site:**
   - Use Python requests + BeautifulSoup (the site may need headers/cookies to respond)
   - If requests fails, try with curl or playwright/selenium as fallback
   - Start from homepage: https://www.xn--siduppe-10ad.ee/
   - Crawl all internal links recursively
   - For EACH page, extract:
     - Page title
     - All text content
     - All images (download to public/images/)
     - **ALL iframe src URLs** (especially teooria.ee)
     - **ALL external links** (especially teooria.ee)
     - Course codes (e.g., B-ABC7483)
     - Price information
   - Save as JSON manifest (scripts/manifest.json)
3. Download logo and all site images
4. Compress images to .webp (max 1200px, quality 80)
5. Map the full URL/page structure
6. Document all discovered teooria.ee iframe URLs in manifest
7. Strip unnecessary Copperlane demo pages
8. Rebrand with Sõiduõppe ABC branding, Estonian language
9. Commit: "Phase 1: Scraped content, theme setup, iframes documented"

**Important scraping notes:**
- The site uses WordPress with Estonian special characters in domain (IDN: xn--siduppe-10ad.ee = sõiduõppe.ee)
- Current site has an audio file: /wp-content/uploads/2017/03/SÕIDUÕPPE.EE-LOAD.mp3 (download but not critical)
- Course pages have codes like /a-abc7475/, /b-abc7483/, /ce-abc7448/
- Category pages: /category/autokool-autosoit-autojuhi-load/ and subcategories
- Site has cookie consent banner — may need to handle cookies for scraping
- There's also an English version at /en/ — we're only building Estonian

### Phase 2: Build All Pages with Content and Iframes
1. Create Astro content collections:
   - `courses` collection: category, title, description, price, requirements, teooria_iframe_url, course_code
   - `services` collection: lõppastmekoolitus, libedasõit, ametikoolitus items
2. Build all page templates:
   - Homepage with hero, USPs, category grid, CTA
   - Course category listing pages
   - Individual course detail pages with teooria.ee iframes
   - Lõppastmekoolitus page(s)
   - Ametikoolitus page
   - Meist (about) page
   - Kontakt page with map and form
   - Hinnad (pricing) if applicable
3. **Iframe implementation:**
   - Wrap teooria.ee iframes in responsive containers
   - Ensure iframes are properly sized (min-height, width: 100%)
   - Add fallback link: "Registreerimine ei tööta? Ava teooria.ee otse" linking to the iframe src URL
   - Test that iframes load (they should — teooria.ee explicitly supports iframe embedding for driving schools)
4. Navigation: dropdown menu for course categories
5. Mobile responsive throughout
6. Create `src/data/site.json` with editable business info
7. Create `.pages.yaml` for PagesCMS:
   - Site settings (contact info, hours, USPs text)
   - Courses collection (title, description, price, iframe URL, requirements)
   - Services (lõppastme, ametikoolitus items)
8. Contact form (Formspree/Web3Forms)
9. Commit: "Phase 2: All pages, content, and iframes complete"

### Phase 3: Deploy
1. `astro.config.mjs`: `output: 'static'`, `site: 'https://soiduoppenew.webrefresh.io'`
2. `.github/workflows/deploy.yml`: GitHub Actions workflow
3. Git init, push to `webrefreshio/soiduoppe`
4. Enable GitHub Pages (Source: GitHub Actions)
5. DNS: CNAME `soiduoppenew` → `webrefreshio.github.io` (Cloudflare)
6. Verify live site — especially test that teooria.ee iframes load on the deployed domain
7. Test all pages, navigation, mobile, forms
8. Commit: "Phase 3: Deployed"

## Design Notes
- Copperlane is an automotive services theme — perfect fit for a driving school
- Clean, modern, trustworthy design — parents and young adults are the audience
- Prominent "Registreeri" buttons on every course page
- Course categories should be easy to browse and compare
- Pricing should be clear and upfront
- Mobile-first — students browse on phones
- The 76% first-time pass rate is the hero stat — make it prominent
- KIA Ceed vehicle photos should feature prominently (scrape from current site)
- Estonian language throughout, no English version needed

## Content Notes
- Each course session has a unique code (e.g., B-ABC7483) — these may be teooria.ee internal IDs
- The registration iframes may use these codes to identify the course
- Some course pages may have identical content but different session dates/codes
- Group similar course sessions into one category page with a single or multiple registration forms
- Preserve ALL text content from the current site — course descriptions, requirements, what's included, etc.
- The school emphasizes "kannatlik ja sõbralik õpetamisviis" (patient and friendly teaching method)

## PagesCMS Fields
The client should be able to edit via PagesCMS:
- Contact information (phone, email, address, hours)
- Course descriptions and prices
- teooria.ee iframe URLs (when they add new course sessions)
- About page text
- USP text on homepage
- Add/remove course sessions

## File Structure (Expected)
```
soiduoppe/
├── CLAUDE.md
├── .pages.yaml
├── astro.config.mjs
├── package.json
├── scripts/
│   ├── scrape_soiduoppe.py
│   └── manifest.json
├── public/
│   ├── images/
│   │   ├── logo.webp
│   │   ├── hero/
│   │   └── courses/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── CourseCard.astro
│   │   ├── TeooriEmbed.astro    ← iframe wrapper component
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── ContactForm.astro
│   ├── content/
│   │   ├── courses/
│   │   │   ├── b-kategooria.md
│   │   │   ├── a-kategooria.md
│   │   │   └── ...
│   │   └── config.ts
│   ├── data/
│   │   └── site.json
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── kursused/
│       │   ├── index.astro
│       │   └── [category].astro
│       ├── loppastmekoolitus.astro
│       ├── ametikoolitus.astro
│       ├── meist.astro
│       ├── kontakt.astro
│       └── hinnad.astro
├── .github/
│   └── workflows/
│       └── deploy.yml
└── .gitignore
```
