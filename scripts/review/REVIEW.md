# Visual Review: Sõiduõppe ABC Website Comparison

**Date:** 2026-02-16  
**Reviewer:** Claude Sonnet 4.5  
**Comparison:** New site (localhost:4322) vs Original WordPress (xn--siduppe-10ad.ee)

---

## Executive Summary

The new Astro-based site successfully replicates most of the core structure and content from the WordPress site, but has **CRITICAL ISSUES** with the course registration system that must be fixed before launch.

### 🔴 Critical Issues (Must Fix)
1. **Broken teooria.ee iframes** - Show "Kursust ei leitud!" (Course not found)
2. **Outdated course data** - Scraped courses are old/expired
3. **Wrong registration method** - Using iframes instead of embedded forms
4. **Logo not updated** - Still shows "COPPERLANE" instead of "SÕIDUÕPPE ABC"

### 🟡 Major Issues (Should Fix)
5. **Missing course session dates** - No start dates/times shown
6. **Different design aesthetic** - Dark theme vs original bright teal theme
7. **Missing carousel** - Original has image carousel, new has static hero

### 🟢 Working Well
- ✅ Navigation structure and menu
- ✅ Estonian language throughout
- ✅ Course categories (B, A, AM, BE, C, CE, D)
- ✅ Service pages (lõppastmekoolitus, ametikoolitus)
- ✅ Contact information
- ✅ Mobile responsive design
- ✅ Clean, modern layout

---

## Detailed Findings

### 1. 🔴 CRITICAL: Teooria.ee Registration System Broken

**Problem:** The most critical feature - student registration - is completely broken.

**What We Have:**
- Embedded iframes pointing to: `https://www.teooria.ee/iframe.php?school=243&lang=et&cat=B&course=690728&fixed=1`
- Iframes show error: **"Kursust ei leitud!"** (Course not found!)
- No way for students to register

**What Original Site Has:**
- Direct embedded registration forms (NOT iframes)
- Shows specific course details:
  - Course code (e.g., B-ABC7320)
  - Start date and time (e.g., 23.02.2026 17:30)
  - Location (Tartu, Kalda tee 30)
  - Registration form fields (name, email, ID, phone)
  - Working "REGISTREERU" button

**Root Cause:**
The scraped course data is outdated. Courses like "B-ABC7483" (scraped) don't exist anymore in teooria.ee. The current active courses are different (like B-ABC7320 starting 23.02.2026).

**Impact:**
- 🚨 Students CANNOT register for courses
- 🚨 Primary business function is broken
- 🚨 Site is essentially non-functional for its main purpose

**Fix Required:**
1. Get current/active course list from teooria.ee
2. Update all course codes and URLs
3. Or: Change to embedded forms like the original (not iframes)
4. Verify each course loads correctly before launch

---

### 2. 🔴 CRITICAL: Logo Not Updated

**Current:** Header shows "COPPERLANE"  
**Expected:** Should show "SÕIDUÕPPE ABC" logo

**Impact:** Completely wrong branding, confusing for users

**Fix:** Update logo in navigation component with correct Sõiduõppe ABC logo

---

### 3. 🟡 Missing Course Session Information

**Original Site:**
- Each course page shows specific session details
- Start date and time prominently displayed
- Location information
- Example: "Algus: 23.02.2026 17:30"

**New Site:**
- Generic course descriptions
- No session dates
- No start times
- No specific session information

**Impact:** Users don't know when courses start

---

### 4. 🟡 Design Differences

**Original Site Theme:**
- Bright, energetic teal/turquoise color scheme (#00BCD4)
- Light background
- High contrast
- Carousel with category images
- More colorful and welcoming

**New Site Theme:**
- Dark, muted gray/charcoal theme
- Dark hero section with car image background
- More serious, corporate feel
- Static hero image
- Elegant but less energetic

**Assessment:**
- Both designs are professional
- Original is more vibrant and youth-friendly (students are young adults)
- New design is more premium/automotive-industry feeling
- Choice depends on brand positioning preference

---

### 5. Homepage Comparison

**Original Homepage Features:**
- ✅ Logo: "SÕIDUÕPPE ABC"
- ✅ Top bar with contact info and social links
- ✅ Image carousel with 3 rotating category cards:
  - B-kategooria autojuhiload
  - Veoauto- ja bussijuhi load  
  - A-kategooria mootorratta load
- ✅ Call-to-action: "ALUSTA OMA ESIMEST SÕIDUTUNDI KOHE JA KASVÕI NÄDALAVAHETUSEL"
- ✅ Section: "SÕIDUÕPPE ABC MOTO- JA AUTOKOOL"
- ✅ Four image cards below
- ✅ Bright teal color scheme

**New Site Homepage:**
- ❌ Logo: "COPPERLANE" (wrong)
- ✅ Navigation with phone number CTA
- ✅ Hero section with tagline
- ✅ Main headline: "PARIMATE EKSAMITULEMUSEGA JUHID TULEVAD MEIE AUTOKOOLIST"
- ✅ Three stats below:
  - 76% esmakordsest läbimisest
  - KIA Ceed (samad autod, millega Transpordiamet eksamit võtab)
  - Kannatlik õpetamine (24/7 online teooria)
- ✅ Dark hero with car image background
- Missing: Category carousel
- Missing: Image cards section

**Verdict:**
- New site has better stats/USP presentation
- Original has more visual variety (carousel)
- Both convey professionalism
- Fix logo immediately

---

### 6. Navigation Comparison

**Original:**
- ESILEHT | HINNAKIRI | KONTAKTID | GALERII | KKK
- Top bar: Contact info, email, address, Facebook
- Language selector: Eesti, English, Русский

**New:**
- Vali kategooria (dropdown) | Kursused | Lõppastmekoolitus | Ametikoolitus | Meist | Kontakt
- Phone number CTA button: +372 507 8230
- Dropdown mega menu with categories

**Assessment:**
- ✅ New navigation is better organized
- ✅ Direct links to course categories
- ✅ Mega menu is modern and intuitive
- ❌ Missing: Language selector (original has EN, RU)
- ❌ Missing: Gallery (GALERII) page
- ❌ Missing: FAQ (KKK) page
- ✅ FAQ page exists at /faq.astro but not in menu

**Impact:** Minor - core navigation works well

---

### 7. Course Pages Structure

**Original Course Page (B-ABC7320):**
```
- Course code as heading (B-ABC7320)
- Left column: Registration form
  - Kood: B-ABC7320
  - Kategooria: B
  - Linn: Tartu
  - Aadress: Kalda tee 30 (TÄISPAKETT)
  - Algus: 23.02.2026 17:30
  - Form fields (Eesnimi, Perekonnanimi, E-post, etc.)
  - REGISTREERU button
- Right column: Course details
  - Hind: 1190
  - Full description (TÄISPAKETT koos autokooli sõidueksamiga...)
  - Requirements
  - What's included
```

**New Site Course Page (b-abc7483):**
```
- Breadcrumb: Kursused / B-ABC7483
- Course code badge + category badge
- Course title
- Price (if available)
- Full content/description
- Course details (duration, theory hours, driving hours)
- Requirements grid
- Registration section with iframe
  - Shows "Kursust ei leitud!" error
- Contact CTA buttons
```

**Assessment:**
- ✅ Better layout and visual hierarchy
- ✅ Responsive cards for details
- ✅ Better typography
- 🔴 Registration broken
- ❌ No session dates/times
- ❌ No specific start date shown

---

### 8. Content Quality

**Original Site:**
- Specific, time-bound information (course starts on X date)
- Active courses currently accepting registrations
- Real-time data from teooria.ee system

**New Site:**
- Generic course descriptions
- No time-specific information
- Outdated course codes
- Static content from scrape

**Impact:**
- 🔴 CRITICAL: Content is stale
- Users need current course schedules
- Must integrate with live teooria.ee data

---

### 9. Missing Pages/Features

**Present in Original but Missing in New:**
1. ❌ **GALERII** (Gallery) - Photo gallery of school, instructors, vehicles
2. ❌ **KKK** (FAQ) - Frequently asked questions (page exists but not in nav)
3. ❌ Language selector (English, Russian)
4. ❌ Homepage carousel with categories
5. ❌ Image cards section on homepage
6. ❌ Course session calendar/schedule
7. ❌ Facebook integration/feed

**Present in New but Not in Original:**
1. ✅ **Mega menu** with category dropdown (improvement)
2. ✅ **Stats section** on hero (76% pass rate) (improvement)
3. ✅ **Breadcrumbs** for navigation (improvement)
4. ✅ **Better mobile responsiveness** (improvement)

---

### 10. Service Pages

**Lõppastmekoolitus:**
- ✅ New site has dedicated page
- ✅ Well-structured with two services (libedasõit, pimeda aja)
- ✅ Clear descriptions
- ✅ Good design

**Ametikoolitus:**
- ✅ New site has dedicated page
- ✅ Four services listed (Kood 95, Kiirendatud, ADR, Tõstukijuht)
- ✅ Good layout
- Original: Had these but less organized

**Verdict:** Improvement over original

---

### 11. Contact Page

**Original:**
- Map with location marker
- Contact details in footer
- Simple, functional

**New:**
- ✅ Dedicated contact page
- ✅ Contact info cards (phone, email, address, hours)
- ✅ Large map embed
- ✅ Better UX

**Verdict:** Improvement over original

---

### 12. About Page (Meist)

**New Site:**
- ✅ Clean layout
- ✅ Shows USPs (76% pass rate, KIA Ceed, 24/7 online, kannatlik)
- ✅ Stats visualization
- ✅ Professional presentation

**Original:**
- No dedicated about page found
- Info scattered across homepage

**Verdict:** New site is better

---

## Mobile Responsiveness

**New Site:**
- ✅ Fully responsive
- ✅ Mobile-friendly navigation
- ✅ Cards stack properly
- ✅ Images scale correctly

**Original:**
- ⚠️ Less mobile-optimized
- Cookie banner issues
- Less fluid scaling

**Verdict:** New site is significantly better for mobile

---

## Technical Assessment

### What Works:
- ✅ Fast load times (Astro static site)
- ✅ Clean URLs
- ✅ Proper HTML structure
- ✅ Accessible navigation
- ✅ SEO-friendly markup

### What's Broken:
- 🔴 Teooria.ee iframe integration
- 🔴 Course data outdated
- 🔴 Registration system non-functional

---

## Priority Fix List

### Before Launch (Blocking Issues):

1. **🔴 P0: Fix course registration system**
   - Get current course list from client
   - Update all course codes
   - Verify iframes load correctly
   - OR: Switch to embedded forms like original
   - Test registration flow end-to-end

2. **🔴 P0: Update logo**
   - Replace "COPPERLANE" with "SÕIDUÕPPE ABC" logo
   - Get logo file from client
   - Update navigation component

3. **🔴 P0: Add course session dates**
   - Each course needs start date/time
   - Location details
   - Session information
   - Integration with teooria.ee schedule

### Post-Launch (Nice to Have):

4. **🟡 P1: Consider design theme**
   - Discuss with client: Keep dark theme or match original teal?
   - Update color scheme if needed

5. **🟡 P1: Add missing pages**
   - Gallery (GALERII) page
   - Add FAQ link to navigation
   - Language selector (EN, RU)

6. **🟡 P2: Homepage enhancements**
   - Add category carousel
   - Add image cards section
   - Match more closely to original layout (if desired)

---

## Recommendations

### Immediate Actions:

1. **Contact Client:**
   - Get list of current active courses
   - Get accurate course codes and start dates
   - Request logo file
   - Confirm desired design direction

2. **Fix Registration:**
   - Option A: Get updated teooria.ee iframe URLs for current courses
   - Option B: Implement embedded forms like original site
   - Option C: Direct links to teooria.ee course pages
   - **Test thoroughly before launch**

3. **Update Branding:**
   - Replace all instances of "COPPERLANE"
   - Verify logo displays correctly
   - Check mobile logo sizing

### Strategic Decisions Needed:

1. **Design Theme:**
   - Keep modern dark theme (our choice)
   - Match original bright teal theme (their preference)
   - Hybrid approach

2. **Registration Method:**
   - Use teooria.ee iframes (current approach, if fixed)
   - Use embedded forms (original approach)
   - Direct links to teooria.ee

3. **Content Management:**
   - How will courses be updated?
   - Who manages course schedules?
   - Integration with teooria.ee system?

---

## Conclusion

The new site is **technically superior** with better code, faster performance, mobile responsiveness, and modern design. However, it has **critical business logic issues** that prevent it from functioning as intended.

**Cannot launch until:**
1. ✅ Registration system works
2. ✅ Logo is correct
3. ✅ Course data is current

**Recommendation:** Fix the P0 issues (1-3 days work), then launch. Add P1/P2 enhancements post-launch based on client feedback.

---

## Screenshots Reference

All screenshots saved to `scripts/review/` directory:

**New Site:**
- `new-homepage.png` - Homepage with hero
- `new-courses-index.png` - Course categories grid
- `new-course-detail.png` - Individual course page
- `new-course-registration-iframe.png` - Broken iframe showing "Kursust ei leitud!"

**Original Site:**
- `old-homepage.png` - Original homepage with carousel
- `old-course-detail.png` - Original course page (broken)
- `old-course-b320.png` - Working course page with registration form

---

**Review completed:** 2026-02-16  
**Status:** Ready for fixes before production launch
