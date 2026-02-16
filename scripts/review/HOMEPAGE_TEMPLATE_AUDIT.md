# Homepage Template Content Audit

**Date:** 2026-02-16
**Issue:** Homepage (/) contains extensive Copperlane automotive repair shop template content that's completely irrelevant to a driving school.

---

## Executive Summary

Below the Hero section, **100% of the homepage content is unmodified Copperlane template content** for an auto repair shop. This includes:

- ❌ Auto repair shop brand story ("Copperlane is built on skill, grit...")
- ❌ Auto repair services ("Expert Automotive Services")
- ❌ Auto repair features ("ASE-certified mechanics", "OEM parts")
- ❌ Auto repair workflow ("Schedule, Diagnose, Repair, Drive")
- ❌ Auto repair packages ("Comprehensive Care Packages")
- ❌ Auto repair testimonials ("drivers trust Copperlane", "California fleet managers")
- ❌ Auto repair promotion ("Upgrade to a Full Service Package")
- ❌ Auto repair blog ("Latest Expert Advice for Vehicle Owners")

**Impact:** The homepage looks completely wrong after scrolling down - it's advertising an auto repair business, not a driving school.

---

## Detailed Findings

### Current Homepage Structure

File: `src/pages/index.astro`

```astro
<BaseLayout>
  <Hero />                    ✅ Updated with Sõiduõppe content
  <Intro />                   ❌ COPPERLANE TEMPLATE
  <ServicePreview />          ❌ COPPERLANE TEMPLATE
  <Why />                     ❌ COPPERLANE TEMPLATE
  <Process />                 ❌ COPPERLANE TEMPLATE
  <PackagePreview />          ❌ COPPERLANE TEMPLATE
  <CustomerPreview />         ❌ COPPERLANE TEMPLATE
  <Upgrade />                 ❌ COPPERLANE TEMPLATE
  <BlogPreview />             ❌ COPPERLANE TEMPLATE
</BaseLayout>
```

### 1. ❌ Intro Component

**File:** `src/components/landing/Intro.astro`

**Current Content:**
- Heading: "From a humble workshop to a trusted destination — **Copperlane** is built on skill, grit, and genuine care for every driver we serve."
- Subheading: "Meet the people who keep **Copperlane** running..."
- Four cards:
  1. "Precision First" - "Every diagnosis starts with data, not guesses. Our techs use calibrated tools..."
  2. "Work That Holds Up" - "Repairs are done with the long game in mind..."
  3. "Straightforward Service" - "We tell you what matters, what can wait..."
  4. "A Team That Gives a Damn" - "**Copperlane** is built by people..."

**Problem:** This is an auto repair shop's brand story. Nothing about driving education.

**Recommendation:**
- **REMOVE** this section entirely, OR
- **REPLACE** with driving school-specific intro, like:
  - "Miks valida Sõiduõppe ABC?"
  - Cards showing: "Parim eksamitulemus", "Kannatlikud õpetajad", "KIA Ceed autod", "24/7 teooria"

---

### 2. ❌ ServicePreview Component

**File:** `src/components/landing/ServicePreview.astro`

**Current Content:**
- Heading: "Expert Automotive Services"
- Button: "View All Services" → links to `/services` (doesn't exist!)
- Tries to load from `services` content collection
- Shows "featured" services (there aren't any)

**Problem:**
- Shows nothing (no services collection data for driving school)
- Links to non-existent page
- Title is about automotive repair

**Recommendation:**
- **REMOVE** this section, OR
- **REPLACE** with course categories grid (B, A, AM, BE, C, CE, D)
- Link to `/kursused`

---

### 3. ❌ Why Component

**File:** `src/components/landing/Why.astro`

**Current Content:**
- Heading: "The **Copperlane** Difference"
- Subheading: "We're not just another repair shop. We're automotive enthusiasts..."
- Four features:
  1. "Expert Technicians" - "ASE-certified mechanics with years of experience..."
  2. "Transparent Pricing" - "No hidden fees or surprises..."
  3. "Quality Parts" - "We use only high-quality OEM or equivalent parts..."
  4. "Warranty on Work" - "We stand behind our craftsmanship..."

**Problem:** This is auto repair shop positioning. Nothing relevant to driving school.

**Recommendation:**
- **REMOVE** this section, OR
- **REPLACE** with driving school differentiators:
  - "Miks Sõiduõppe ABC?"
  - "76% esmakordsest läbimisest"
  - "Samad autod kui Transpordiaametil"
  - "Kannatlik ja sõbralik õpetamisviis"
  - "24/7 online teooria"

---

### 4. ❌ Process Component

**File:** `src/components/landing/Process.astro`

**Current Content:**
- Heading: "Fast, Reliable Service Workflow"
- Video: `/videos/car3.mp4` (doesn't exist)
- Four steps:
  1. "Schedule" - "Book online or call us. We'll prepare for your arrival."
  2. "Diagnose" - "Comprehensive inspection and transparent quote..."
  3. "Repair" - "Expert service using premium parts..."
  4. "Drive" - "Final quality check and you're back on the road safely."

**Problem:** This is an auto repair workflow. Driving school process is completely different.

**Recommendation:**
- **REMOVE** this section, OR
- **REPLACE** with driving school learning journey:
  1. "Registreeru" - "Vali kategooria ja registreeru teooria.ee kaudu"
  2. "Teooria" - "Õpi online 24/7 oma tempos"
  3. "Sõidutunnid" - "Õpi sõitma meie KIA Ceed autodega"
  4. "Eksam" - "Soori eksam Transpordiaametis"

---

### 5. ❌ PackagePreview Component

**File:** `src/components/landing/PackagePreview.astro`

**Current Content:**
- Heading: "Comprehensive Care Packages"
- Button: "View All Packages" → links to `/packages` (doesn't exist!)
- Tries to load from `packages` content collection
- Shows "featured" packages (there aren't any)

**Problem:**
- Shows nothing (no packages data)
- Links to non-existent page
- "Care Packages" makes no sense for driving school

**Recommendation:**
- **REMOVE** this section entirely
- Driving schools don't have "packages" in this sense
- If needed, could show "Lõppastmekoolitus" and "Ametikoolitus" services

---

### 6. ❌ CustomerPreview Component

**File:** `src/components/landing/CustomerPreview.astro`

**Current Content:**
- Heading: "Why drivers trust **Copperlane**"
- Subheading: "Real experiences from owners and fleet managers across **California**..."
- Button: "Customer stories" → links to `/customers` (doesn't exist!)
- Tries to load from `customers` content collection
- Shows 1 customer testimonial (there aren't any)

**Problem:**
- Mentions "Copperlane" and "California" (this is an Estonian driving school!)
- Shows nothing (no customers data)
- Links to non-existent page

**Recommendation:**
- **REMOVE** this section, OR
- **REPLACE** with actual student testimonials if available
- Could use Google/Facebook reviews
- Change heading to "Meie õpilaste tagasiside"

---

### 7. ❌ Upgrade Component (CTA)

**File:** `src/components/ctas/Upgrade.astro`

**Current Content:**
- Heading: "Limited Time Offer"
- Main text: "Upgrade to a Full Service Package"
- Description: "Save up to 20% when you bundle services together. Our comprehensive packages include everything your vehicle needs..."
- Buttons:
  - "View Packages" → `/packages` (doesn't exist!)
  - "Book Now" → `/book-appointment` (doesn't exist!)

**Problem:**
- "Limited Time Offer" / "Service Package" / "Save 20%" - this is auto repair promo
- Both buttons link to non-existent pages

**Recommendation:**
- **REMOVE** this section, OR
- **REPLACE** with driving school CTA:
  - "Alusta oma esimest sõidutundi kohe!"
  - Button: "Vali kategooria" → `/kursused`
  - Button: "Helista meile" → `tel:+372 507 8230`

---

### 8. ❌ BlogPreview Component

**File:** `src/components/landing/BlogPreview.astro`

**Current Content:**
- Heading: "Automotive Insights"
- Main text: "Latest Expert Advice for Vehicle Owners"
- Description: "Stay informed with the latest automotive tips, maintenance guides, and industry insights..."
- Button: "View all articles" → `/blog` (doesn't exist!)
- Tries to load from `posts` content collection
- Shows 2 blog posts (there aren't any)

**Problem:**
- Shows nothing (no blog posts)
- Content is about "automotive maintenance guides"
- Links to non-existent blog

**Recommendation:**
- **REMOVE** this section entirely
- Driving schools typically don't have blogs
- If needed later, could add "Kasulikud nõuanded" or "KKK"

---

## Priority Actions

### Immediate (Before Client Review):

1. **SIMPLIFY HOMEPAGE** - Remove 90% of template sections:
   ```astro
   <BaseLayout>
     <Hero />                    ✅ Keep (already updated)
     <!-- REMOVE: Intro -->
     <!-- REMOVE: ServicePreview -->
     <!-- REMOVE: Why -->
     <!-- REMOVE: Process -->
     <!-- REMOVE: PackagePreview -->
     <!-- REMOVE: CustomerPreview -->
     <!-- REMOVE: Upgrade -->
     <!-- REMOVE: BlogPreview -->
   </BaseLayout>
   ```

2. **ADD COURSE CATEGORIES GRID** below Hero:
   - Show 7 main categories (B, A, AM, BE, C, CE, D)
   - Quick links to course pages
   - Use cards from site.json categories data

3. **ADD SIMPLE CTA SECTION**:
   - "Vali kategooria ja alusta õppimist"
   - Button to `/kursused`
   - Phone number CTA

### Optional (Post-Launch):

4. **Add "Miks Sõiduõppe ABC?" section** if client wants it:
   - 4 key differentiators with icons
   - Stats: 76%, KIA Ceed, 24/7 online, kannatlik

5. **Add testimonials section** if client provides reviews:
   - Google/Facebook reviews
   - Student success stories

---

## Recommended New Homepage Structure

```astro
<BaseLayout>
  <Hero />                          ✅ Already updated
  <CourseCategoriesGrid />          🆕 Show B, A, AM, BE, C, CE, D
  <WhySoiduoppeABC />               🆕 4 key USPs (optional)
  <SimpleCTA />                     🆕 "Vali kategooria ja alusta"
</BaseLayout>
```

**Result:** Clean, focused homepage that actually matches the business (driving school, not auto repair).

---

## Files That Need Changes

1. **src/pages/index.astro**
   - Remove 7 template component imports
   - Add course categories grid
   - Add simple CTA

2. **Create: src/components/landing/CourseCategoriesGrid.astro**
   - Use site.json categories data
   - Show 7 cards with category icons
   - Link to /kursused/[slug]

3. **Create: src/components/landing/WhySoiduoppeABC.astro** (optional)
   - 4 USPs from site.json
   - Stats visualization
   - Similar to current Why.astro but with correct content

4. **Create: src/components/landing/SimpleCTA.astro**
   - Single CTA section
   - Phone + course selection buttons
   - Clean, minimal design

---

## Conclusion

The homepage currently shows **0% driving school content** and **100% auto repair template content** below the hero. This must be fixed before client review or launch.

**Recommended approach:** Remove all template sections and build a simple, clean homepage with:
1. Hero (done)
2. Course categories grid
3. Optional: USPs section
4. CTA section

This will take 1-2 hours vs trying to adapt all the template sections.

---

**Audit completed:** 2026-02-16
**Status:** Critical - homepage content completely wrong below fold
