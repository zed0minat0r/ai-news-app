# AI Pulse — Audit Report v10

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audits:** v1 — 6.0, v2 — 6.5, v3 — 7.0, v4 — 7.2, v5 — 7.3, v6 — 7.5, v7 — 7.7, v8 — 7.4 (recalibrated), v9 — 7.5

---

## Scoring Calibration

- 5.0 = average/basic, nothing special
- 5.5 = functional but generic
- 6.0 = generic template you'd find online
- 7.0 = genuinely better than most — HIGH bar
- 8.0 = a user would choose this over competitors
- 9.0 = award-worthy

---

## Changes Since v9

This cycle delivered targeted fixes for v9's top three recommendations (PTR threshold, image coverage, PWA) plus header polish, reading progress indicator, duplicate code cleanup, and 375px spacing refinements.

### Verified Improvements:

1. **Pull-to-refresh threshold bug FIXED** — `main.js:1108` now reads `if (dy > THRESHOLD && window.scrollY === 0)`, correctly gating the visible class on the 80px constant. Accidental refreshes on minor touches are eliminated. This was the #1 critical recommendation from v9. CONFIRMED.

2. **Duplicate bottom nav code ELIMINATED** — The v9 issue of two separate initialization blocks (top-level + IIFE) is gone. Now there is one clean `syncBottomNav()` global function (line 1134) and one `initBottomNav` IIFE (line 1142). No duplicate event listeners. CONFIRMED.

3. **PWA manifest + service worker added** — `manifest.json` with standalone display, theme color, start URL. `sw.js` with network-first strategy, offline cache fallback, old-cache cleanup. Service worker registered in `index.html:177`. `<link rel="manifest">` and `<meta name="theme-color">` present. `<meta name="apple-mobile-web-app-capable">` present. CONFIRMED.

4. **Reading progress indicator** — Fixed bar at top of viewport (`style.css:1554`), gradient colored, scroll-driven width via rAF (`main.js:1171`), `aria-hidden="true"`, `prefers-reduced-motion` respected. Subtle glow effect underneath. CONFIRMED.

5. **Header polish** — Logo `h1` at 2.2rem (up from previous), gradient text (blue-purple-pink), pulsing glow animation on lightning bolt icon (3s infinite), tagline has gradient text effect (static, not animated shimmer). Radial accent background on `#site-header::before`. CONFIRMED — though "shimmer" tagline claim is inaccurate; the gradient is static.

6. **WCAG chip tag contrast** — `.chip-tag` categories all use `color: #ffffff` on colored backgrounds with 0.38 alpha. White on colored backgrounds is a solid fix. CONFIRMED.

7. **375px spacing refinements** — Hero title reduced to 1.25rem, card/main padding tightened to 0.75rem, trending chips narrowed to 190px, bottom nav labels shrunk to 0.55rem at 375px, category nav padding reduced. These are sensible mobile-first tweaks. CONFIRMED.

8. **Skeleton loading states** — Full skeleton UI exists (lines 1165-1255 in CSS) with hero, pills, trending, and card skeletons. Pulse animation with reduced-motion support. CONFIRMED.

9. **Active pill count contrast fix** — `.pill-count` text switches to dark on active blue background. CONFIRMED.

### Issues Found:

- **Image coverage claim FALSE** — The claim was "ALL 50 articles now have real images (zero emoji placeholders)." Reality: 27/50 articles have images (54%). Breakdown:
  - Hardware: 11/11 (100%) — up from 91%
  - Tools: 3/4 (75%) — up from 66%
  - Industry: 8/16 (50%) — roughly same as 47%
  - Models: 4/13 (30%) — up from 25%
  - Research: 1/6 (16%) — unchanged
  Nearly half the feed still shows emoji-gradient placeholders. Models and Research remain weak.

- **PWA manifest incomplete** — Only one SVG icon with `sizes: "any"`. No 192px or 512px PNG icons. No `maskable` purpose icon. Android will not show a proper install prompt without sized PNG icons. iOS will use a screenshot instead of an icon. The PWA is functional for offline caching but the install experience is incomplete.

- **Bottom nav label font** — 0.6rem (9.6px) at default, dropping to 0.55rem (8.8px) at 375px. 8.8px is below any reasonable minimum for readable text. While labels are secondary, a real user will squint.

- **Cache-busting still present** — `news.json?t=Date.now()` (line 548) defeats the service worker cache for the most important dynamic asset. The SW caches the response, but each request has a unique URL, so the cache is never hit for news.json. This undermines offline support for article content.

- **No tagline shimmer** — Claimed "shimmer tagline" is actually a static gradient. No `@keyframes` or `animation` property on `.tagline`. Minor, but the claimed improvement doesn't match the code.

- **Trending chip meta** — 0.75rem (12px) at `style.css:532`. Acceptable now (was 0.7rem / 11.2px in v9). Improved.

---

## Section-by-Section Audit

### 1. Content Quality — 7.5 / 10 (v9: 7.5, +0.0)

**Distribution:** Industry 16, Models 13, Hardware 11, Research 6, Tools 4. 50 articles, 9 sources.

- Tools went from 3 to 4. Models went from 12 to 13. Hardware dropped from 12 to 11. Normal fluctuation.
- Source diversity unchanged at 9. Still Hacker News heavy as a catch-all source.
- No editorial curation, quality scoring, deduplication, or freshness sorting beyond date.
- Many HN articles are low-signal ("Show HN" self-promotions mixed with real news).

**Verdict:** Fundamentally unchanged. The content pipeline works but lacks editorial polish. Holds at 7.5.

---

### 2. Visual Design — 8.0 / 10 (v9: 8.0, +0.0)

**What changed:**
- Header is polished: 2.2rem gradient title, pulsing icon glow, gradient tagline, radial accent background. Clean and distinctive.
- Reading progress bar with glow effect adds a subtle dynamic element.
- 375px spacing refinements improve density without feeling cramped.

**What hasn't changed:**
- Image coverage is still ~54%. Browsing Models shows 9 of 13 cards with emoji placeholders. Research: 5 of 6. The visual experience degrades sharply in these categories.
- Emoji-gradient fallbacks, while aesthetically acceptable, are clearly not real images.

**Verdict:** The header and spacing improvements are nice polish but don't change the fundamental visual impression from v9. The hero still has a real image. Hardware still looks great. Models and Research still look like a template. Holds at 8.0 — first impressions remain strong, but category browsing has not improved.

---

### 3. Mobile UX (375px) — 8.0 / 10 (v9: 7.5, +0.5)

**Improvements:**
- Pull-to-refresh FIXED. Now triggers at 80px threshold — natural, intentional gesture required. No more accidental refreshes.
- Reading progress indicator provides scroll context.
- 375px spacing refinements: tighter padding, smaller trending chips (more visible), optimized bottom nav labels.
- Skeleton loading states provide visual feedback during data fetches.

**Remaining issues:**
- Bottom nav labels at 8.8px on 375px are too small. Functional but straining.
- No haptic feedback patterns.
- Pull-to-refresh has no progressive visual feedback (no rubber-band stretch indicator showing how close you are to triggering).

**Verdict:** The PTR fix alone is a significant UX improvement — it was a regression in v9 that's now resolved. Combined with reading progress, skeleton states, and spacing refinements, the mobile experience now feels intentional and polished. 8.0 — a user on their phone would find this usable and pleasant. Not yet 8.5 because the PTR lacks progressive feedback and nav labels are too small.

---

### 4. Search / Filter — 7.5 / 10 (v9: 7.5, +0.0)

No changes. Debounce, highlighting, deep linking, result count all work. Still lacks date range, combined filter indicator, autocomplete. Holds at 7.5.

---

### 5. Navigation — 7.5 / 10 (v9: 7.5, +0.0)

No structural changes. Bottom nav, top pills, two-way sync, deep linking, popstate all remain solid. Duplicate code cleaned up (code quality improvement, not user-facing). Still no bookmarking or saved articles. Holds at 7.5.

---

### 6. Performance — 7.5 / 10 (v9: 7.5, +0.0)

**Improvements:**
- Service worker added with network-first strategy and offline fallback. This is the right architecture.
- Skeleton loading states improve perceived performance.

**Issues:**
- `news.json?t=Date.now()` cache-busting defeats SW cache for the primary dynamic content. Every request gets a unique URL, so the cached response is never matched. This means offline reading of articles does NOT work — the most valuable offline use case.
- No minification (CSS: 1586 lines, JS: 1186 lines).
- Still no image optimization or lazy-loading thumbnails (lazy on card images exists, but no srcset/sizes).

**Verdict:** The service worker is a step forward architecturally, but the cache-busting bug means the #1 benefit (offline article reading) doesn't actually work. Cannot award more than 7.5 for a feature that's structurally present but functionally broken for its core use case. Holds at 7.5.

---

### 7. Accessibility — 7.5 / 10 (v9: 7.5, +0.0)

**Improvements:**
- Reading progress bar has `aria-hidden="true"`. Correct.
- WCAG chip contrast definitively fixed (white on colored backgrounds).
- Active pill count contrast fixed.

**Remaining gaps:**
- Trending chips still lack list semantics (`<ul>/<li>`).
- Bottom nav labels at 8.8px on 375px may fail WCAG minimum target size adjacent to other targets.
- Hero image and card images all use `alt=""` — screen readers get no image context for news photos.
- Skip link is present and working.

**Verdict:** Incremental improvements. The contrast fixes close real WCAG violations. Holds at 7.5.

---

### 8. Category System — 7.5 / 10 (v9: 7.5, +0.0)

**Distribution:** Industry 16, Models 13, Hardware 11, Research 6, Tools 4.

Tools at 4 (was 3). Marginal. Research still at 6. Bottom nav gives categories first-class visibility. The core issue remains: Research and Tools are thin categories. Holds at 7.5.

---

### 9. Featured Section — 7.5 / 10 (v9: 7.5, +0.0)

No structural changes. Hero card still shows real image with gradient border. "Breaking" label still static. No rotation. No featured carousel. Holds at 7.5.

---

### 10. Hardware Coverage — 7.0 / 10 (v9: 7.0, +0.0)

11 articles, 100% image coverage (up from 91%). Content unchanged. No specs/benchmarks/hardware-specific filtering. The perfect image coverage is notable — Hardware is the visual gold standard. Holds at 7.0 (content depth is the limiter, not presentation).

---

### 11. Overall App Feel — 7.5 / 10 (v9: 7.5, +0.0)

**What a real user would think on their phone today:**

Open the app. Dark theme, polished header with gradient title and glowing icon. Reading progress bar at the very top. Hero card with a real photo. Bottom nav at the bottom. First impression: this looks like a real app, not a weekend project.

Pull down to refresh — now requires a proper 80px pull gesture. Feels intentional. Skeleton states flash during load. Good.

Scroll the feed. About half the cards have real images, half have emoji-gradient placeholders. Tap Hardware in the bottom nav — scroll to top, every card has a photo. Looks great. Tap Models — 9 of 13 cards show emojis. The inconsistency is the single biggest gap a real user would notice.

Try going offline (airplane mode after first load). The app shell loads from SW cache. But the news feed doesn't appear because the cache-busted JSON URL misses. Offline doesn't work for the content that matters.

**Compared to competitors:**
- vs. Techpresso: Header and visual polish are competitive. Behind on consistent imagery, editorial voice, and daily digest format.
- vs. Particle: Bottom nav and category system are comparable. Behind on source clustering, personalization, and image density.
- vs. SmartNews: Behind on offline (theirs works), personalization, and image consistency. Competitive on dark theme and mobile layout.

**Verdict:** The PTR fix and reading progress are welcome quality improvements but don't change the fundamental user impression from v9. The broken offline (cache-bust defeating SW) and inconsistent image coverage remain the two biggest gaps a real user would notice. Holds at 7.5.

---

## Score Summary

| Area | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 | v9->v10 |
|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|---------|
| Content Quality | 6.0 | 6.5 | 7.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 7.5 | 7.5 | +0.0 |
| Visual Design | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | 7.5 | 8.0 | 8.0 | +0.0 |
| Mobile UX (375px) | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | 7.5 | 7.5 | **8.0** | **+0.5** |
| Search / Filter | 5.5 | 6.5 | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 7.5 | 7.5 | +0.0 |
| Navigation | 5.5 | 5.5 | 6.5 | 7.5 | 7.5 | 7.5 | 7.5 | 7.0 | 7.5 | 7.5 | +0.0 |
| Performance | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 7.5 | +0.0 |
| Accessibility | 5.0 | 6.5 | 7.0 | 7.5 | 8.0 | 8.0 | 8.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Category System | 6.5 | 6.5 | 7.0 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 7.5 | 7.5 | +0.0 |
| Featured Section | 6.0 | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | 7.0 | 7.5 | 7.5 | +0.0 |
| Hardware Coverage | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| **OVERALL** | **6.0** | **6.5** | **7.0** | **7.2** | **7.3** | **7.5** | **7.7** | **7.4** | **7.5** | **7.5** | **+0.0** |

**One area gained +0.5:** Mobile UX (PTR fix + reading progress + skeleton states + spacing refinements). The overall score holds at 7.5. This was a quality/polish cycle rather than a feature cycle — the PTR fix resolves a v9 regression, and the PWA adds infrastructure, but the cache-bust bug prevents offline from actually working.

---

## Top 3 Priority Recommendations

### 1. CRITICAL — Fix Cache-Busting Defeating Service Worker

`main.js:548` fetches `news.json?t=Date.now()`. Every request has a unique URL, so the service worker cache never matches on repeat/offline loads. This completely undermines offline article reading — the #1 reason to have a service worker.

**Fix:** Remove `?t=Date.now()` from the fetch URL. Use the service worker's network-first strategy to handle freshness (it already fetches from network first and falls back to cache). If cache-busting is needed for CDN, use `Cache-Control` headers server-side instead.

Also: add proper PWA icons. The manifest needs 192px and 512px PNG icons (or at minimum, properly sized SVGs with `purpose: "maskable any"`) for Android install prompts and iOS home screen icons.

**Impact:** Would make offline reading actually work. Would push Performance toward 8.0 and Overall App Feel toward 8.0. A user who adds this to their home screen and opens it on the subway should see their last-loaded articles.

### 2. HIGH — Image Coverage for Models & Research

Image coverage by category:
| Category | Images | Total | Coverage |
|----------|--------|-------|----------|
| Hardware | 11 | 11 | 100% |
| Tools | 3 | 4 | 75% |
| Industry | 8 | 16 | 50% |
| Models | 4 | 13 | 30% |
| Research | 1 | 6 | 16% |

A user browsing Models sees 9 of 13 cards with emoji placeholders. Research: 5 of 6.

**Fix:**
- Verify the Python scraper is extracting `og:image` from OpenAI Blog, Google AI Blog, and arXiv pages. These sources typically have OG images.
- For articles that truly lack images, consider a category-themed SVG fallback (abstract gradient + subtle icon silhouette) instead of raw emoji. This would look designed rather than placeholder-ish.
- Filter parameter in `fetch_news.py` should require images for at least Models category (the most browsed after All).
- Target: 70%+ image coverage in every category.

**Impact:** Would solidify Visual Design at 8.0+ across all category views. Would push Overall App Feel toward 8.0.

### 3. HIGH — Bottom Nav Label Readability + Progressive PTR Feedback

Two mobile polish items that would push Mobile UX solidly past 8.0:

**Bottom nav labels:** 0.55rem (8.8px) at 375px is too small. Increase to at least 0.65rem (10.4px). If labels clip, abbreviate ("Industry" to "News", "Research" to "Papers") or switch to icon-only with tooltip on long-press.

**Pull-to-refresh progressive feedback:** Currently the indicator is binary (invisible -> visible at 80px). Users expect progressive feedback: a spinner that rotates proportionally to pull distance, or a progress arc that fills as you pull. Show a subtle indicator at 30px, scale it up proportionally, and trigger refresh at 80px. This is the standard pattern in iOS/Android native apps.

**Impact:** Would push Mobile UX from 8.0 to 8.5 — the app would feel native rather than web-approximating-native.

---

## What v10 Means

This was a polish and infrastructure cycle. The PTR threshold fix resolves the most impactful v9 bug. The service worker and manifest add the PWA foundation. The reading progress bar, skeleton states, and spacing refinements add real quality.

However, the cache-busting defeating the SW means the biggest infrastructure investment (offline support) doesn't actually work for content. And image coverage — claimed as "ALL 50 articles" — is actually 27/50. These two gaps prevent the score from moving.

The overall score holds at 7.5. The app is genuinely better than most news aggregators in visual design and mobile layout. It's not yet at the point where a user would choose it over Particle or SmartNews because of inconsistent image density, no working offline mode, and no personalization.

**Path to 8.0:** Fix the cache-bust/SW conflict (offline that works), get image coverage to 70%+ in every category, and fix bottom nav label readability. These three changes would push 3-4 categories to 8.0+ and bring the overall to ~7.8.

---

*Audit completed by Nigel on 2026-04-01. v10.*
