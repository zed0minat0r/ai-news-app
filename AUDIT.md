# AI Pulse — Audit Report v8

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audits:** v1 — 6.0, v2 — 6.5, v3 — 7.0, v4 — 7.2, v5 — 7.3, v6 — 7.5, v7 — 7.7

---

## Scoring Calibration

- 5.0 = average/basic, nothing special
- 5.5 = functional but generic
- 6.0 = generic template you'd find online
- 7.0 = genuinely better than most — HIGH bar
- 8.0 = a user would choose this over competitors
- 9.0 = award-worthy

---

## Changes Since v7

Only change since the v7 audit commit is an auto-update to news.json (content refresh). No code changes to HTML, CSS, or JS. This audit is therefore a **recalibration** of v7 scores with stricter real-user perspective, checking whether the v7 scores were justified, and flagging issues that may have been overlooked.

Claimed improvements being verified: WCAG contrast on chip/card/pill tags, nav pill scroll centering, animated rotating gradient border on hero, 515 lines dead CSS cleaned.

- **WCAG contrast fixes**: Verified. Chip tags at 0.18 alpha, card tags at 0.15 alpha, full-saturation text colors (#d2a8ff, #7ee787, #ffa657, #79b8ff, #f778ba). Correct.
- **Nav pill scroll centering**: Verified. `scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })` at main.js:902. Correct.
- **Animated hero border**: Verified. `@property --hero-border-angle` with `conic-gradient` and `hero-border-spin` keyframes at 6s linear infinite. 2px border via `::before`/`::after` masking. Tasteful.
- **515 lines dead CSS**: Verified by commit history (39e59ec). style.css is now 1245 lines — lean for the feature set.

**No new issues introduced.** The codebase is stable.

---

## Section-by-Section Audit

### 1. Content Quality — 7.5 / 10 (v7: 7.5, +0.0)

**Strengths:**
- 50 articles, 9 distinct sources, arXiv summaries properly cleaned.
- Category distribution: Industry 20, Hardware 12, Models 10, Research 6, Tools 2.

**Weaknesses (unchanged):**
- Tools still starved at 2 articles. This has been the case for 5 audit cycles. The keyword expansion was the right idea but feeds are the bottleneck.
- Hacker News dominance at ~40%. Source concentration risk.
- No editorial curation, quality scoring, or deduplication.
- Research dropped to 6 (from 10 in v6) — likely feed cycle fluctuation.

**Verdict:** Content fundamentals unchanged. Holds at 7.5.

---

### 2. Visual Design — 7.5 / 10 (v7: 8.0, -0.5)

**Recalibration rationale:**

The v7 score of 8.0 ("a user would choose this over competitors") was generous. Reassessing strictly:

- Real images on 26/50 cards (52%) is good, but the distribution is deeply uneven: Hardware 92%, Industry 55%, Models 20%, Research 17%. A user browsing the Models category sees emoji placeholders on 8 of 10 cards. A user browsing Research sees placeholders on 5 of 6. The "every other card has a photo" impression only holds on the All feed, not on individual categories.
- The **hero card has no image**. The most prominent element in the app is still emoji + text. This is the 2nd cycle this has been flagged.
- 0.7rem (11.2px) font sizes still appear in trending chip meta text. 0.72rem on chip tags and card tags. These are small on a real phone screen at 375px — 11.5px is borderline readable.
- The animated hero border is tasteful and well-implemented, but it's polish on a card that still lacks the most impactful visual element (a photo).
- Compared to Techpresso's clean editorial layout or SmartNews's image-rich grid, the emoji-gradient fallback cards still read as "template" rather than "product."

**Verdict:** 52% image coverage with uneven distribution and no hero image does not clear the 8.0 bar when compared to real competitors. Dropping to 7.5 — still a good-looking app, genuinely better than most, but not yet at "choose this over competitors" level.

---

### 3. Mobile UX (375px) — 7.5 / 10 (v7: 8.0, -0.5)

**Recalibration rationale:**

The v7 score of 8.0 was based on Firebase removal (fixing a broken element) and nav pill centering (fixing a missing behavior). These are corrections, not enhancements. At the 8.0 bar, a user should feel "this was built for my phone." Reassessing:

- **Back-to-top button exists** (the v7 audit listed "no back to top" as a shortcoming — this was incorrect; it's been present in the HTML and JS). Good: 48px, fixed position, proper show/hide behavior.
- **Still no pull-to-refresh.** This is table stakes for a mobile news app. Particle, SmartNews, and every native news app has this. A web app can implement it with touch event listeners.
- **No loading state when switching categories.** Skeleton loading is initial-load only. Switching from "All" to "Models" is instant (client-side filter), which is fine, but there's no visual feedback during the filter animation.
- **No haptic or visual feedback on card tap** beyond the brief `:active` scale transform (0.98x). Cards are `<article>` elements with links inside — the tap target is the title link, not the full card. A user tapping the card body outside the link/button gets nothing.
- **Narrow-screen stacking** (max-width: 400px) is correct for forms.
- **No bottom navigation bar.** Standard pattern for mobile news apps that v7 noted but did not penalize enough.

**Verdict:** The UX is clean and functional but lacks the native-feeling interactions (pull-to-refresh, full-card tap targets, bottom nav) that separate a 7.5 from an 8.0. Dropping to 7.5.

---

### 4. Search / Filter — 7.5 / 10 (v7: 7.5, +0.0)

No changes. Debounce, highlighting, deep linking, result count all work. Still lacks date range filter, combined filter indicator, autocomplete. Holds at 7.5.

---

### 5. Navigation — 7.0 / 10 (v7: 7.5, -0.5)

**Recalibration rationale:**

Reassessing against the 7.0 bar ("genuinely better than most"):

- Nav pill horizontal scroll with centering works well. Good category system.
- Skip-to-content link exists (verified in index.html:14). Good.
- Back-to-top button exists and works. Good.
- **But:** No bottom navigation bar. No bookmarking. No saved articles. Footer is just a credit line. No useful footer links. No breadcrumb in list view. These are standard features in competitor apps.
- The navigation is functional but minimal. It does the basics correctly but doesn't offer the depth that would clear 7.5.

**Verdict:** Solid basics but no depth. 7.0 is the right score — genuinely functional, not yet "better than most."

---

### 6. Performance — 7.5 / 10 (v7: 7.5, +0.0)

**Strengths:**
- Firebase removed (~40KB saved). Lazy loading on images. Clean CSS (1245 lines after dead code removal).

**Weaknesses (unchanged):**
- No service worker / PWA / offline support.
- No minification/bundling (main.js 1079 lines, style.css 1245 lines served raw).
- `?t=Date.now()` cache-busting on news.json prevents browser caching.
- No image optimization — no `width`/`height` attributes on card images (CLS risk), no `srcset`, no size constraints on OG images that could be arbitrarily large.

**Verdict:** Holds at 7.5. The performance is reasonable for a GitHub Pages app but lacks optimization.

---

### 7. Accessibility — 7.5 / 10 (v7: 8.0, -0.5)

**Recalibration rationale:**

The v7 score of 8.0 was generous. Reassessing:

- **Good foundations:** aria-live on result count and newsletter success, sr-only labels, skip-to-content link, aria-pressed on nav pills, aria-label on search/buttons, reduced-motion support, proper aria-hidden on decorative elements.
- **WCAG contrast fixes** on chips/tags are correct and verified.
- **But:** Trending chips still lack list semantics (`<ul>`/`<li>`) and `aria-labelledby`. Category sections in the homepage are `<div>` containers built by JS without proper heading hierarchy. The card images use `alt=""` with `aria-hidden="true"` on the container, which is correct for decorative images but means screen reader users get no image context at all.
- No focus-visible ring customization (relies on browser default, which is often insufficient on dark backgrounds).
- No landmark for the trending section beyond `role="region"` with `aria-labelledby`.

**Verdict:** The accessibility work is good but not exceptional. 7.5 is the right bar — solid compliance, some gaps in semantics. 8.0 requires comprehensive semantic HTML and custom focus management.

---

### 8. Category System — 7.5 / 10 (v7: 7.5, +0.0)

**Distribution:** Industry 20, Hardware 12, Models 10, Research 6, Tools 2.

Tools at 2 articles for 5 consecutive audits. Keyword expansion done, feed problem persists. No multi-tagging. No sub-categories. The system works correctly for what it does. Holds at 7.5.

---

### 9. Featured Section — 7.0 / 10 (v7: 7.5, -0.5)

**Recalibration rationale:**

- The hero card currently features "OpenAI acquires TBPN" with NO image. The animated gradient border draws attention to a card that shows only an emoji and text. This is counterproductive — the border says "look here!" and the content disappoints.
- "Breaking" label on every featured article regardless of age or significance.
- No rotation within a session. No quality scoring for featured selection.
- Featured selection is based on a `featured` flag in news.json — manual/algorithmic curation, not user engagement.

**Verdict:** The animated border is nice polish but the hero still lacks an image, which is the #1 visual gap in the entire app. A featured section without a featured image is below the 7.5 bar. Dropping to 7.0.

---

### 10. Hardware Coverage — 7.0 / 10 (v7: 7.0, +0.0)

12 hardware articles with 92% image coverage (best of any category). Content quality is fine. Still no specs, benchmarks, or hardware-specific filtering. Holds at 7.0.

---

### 11. Overall App Feel — 7.5 / 10 (v7: 8.0, -0.5)

**What a real user would think on their phone today:**

Open the app. Dark theme, clean header, animated hero card with a spinning gradient border. The hero shows an emoji and a headline — no photo. Scroll down. Trending chips with category tags. Then cards: roughly half have real photos (hardware and industry articles), half show colored emoji gradients (most models and research articles).

Tap "Models" — 8 of 10 cards are emoji placeholders. The promise of "real article images" largely vanishes outside the hardware/industry categories.

The app is clean, loads fast, has working search and category filtering. The newsletter signup is professional. The nav pills center nicely. It feels like a well-built side project.

**Compared to competitors:**
- vs. Techpresso: Behind on curation, editorial voice, and consistent visual density. Techpresso's every article has an image.
- vs. Particle: Behind on source clustering, personalization, and native feel. Particle has full-bleed images on every card.
- vs. SmartNews: Behind on personalization, offline reading, and image consistency.

The v7 score of 8.0 ("a user would choose this over competitors") was too high. A user might bookmark this, but they would not choose it over Particle or SmartNews. The app does one thing well (aggregate AI news) with a clean UI, but the inconsistent image coverage and lack of native mobile patterns (pull-to-refresh, bottom nav, offline) keep it in the "nice side project" tier rather than the "competitive product" tier.

**Verdict:** 7.5 — genuinely good, better than most template-based projects, but not yet at the "choose over competitors" bar.

---

## Score Summary

| Area | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v7->v8 |
|------|-----|-----|-----|-----|-----|-----|-----|-----|--------|
| Content Quality | 6.0 | 6.5 | 7.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Visual Design | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | 7.5 | **-0.5** |
| Mobile UX (375px) | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | 7.5 | **-0.5** |
| Search / Filter | 5.5 | 6.5 | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Navigation | 5.5 | 5.5 | 6.5 | 7.5 | 7.5 | 7.5 | 7.5 | 7.0 | **-0.5** |
| Performance | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.5 | 7.5 | +0.0 |
| Accessibility | 5.0 | 6.5 | 7.0 | 7.5 | 8.0 | 8.0 | 8.0 | 7.5 | **-0.5** |
| Category System | 6.5 | 6.5 | 7.0 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Featured Section | 6.0 | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | 7.0 | **-0.5** |
| Hardware Coverage | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | 7.5 | **-0.5** |
| **OVERALL** | **6.0** | **6.5** | **7.0** | **7.2** | **7.3** | **7.5** | **7.7** | **7.4** | **-0.3** |

**Note:** The v7->v8 drops are NOT regressions in code quality. They are scoring recalibrations. The v7 audit was the first to score 8.0 in multiple categories and, on reflection, those scores were too generous relative to the calibration scale where 8.0 = "a user would choose this over competitors." The codebase has not degraded — the scores have been corrected.

---

## Top 3 Priority Recommendations

### 1. CRITICAL — Hero Image + Fix Image Coverage Imbalance

The hero card is the most visually prominent element and it has NO image. Meanwhile, image coverage is wildly uneven across categories:

| Category | Images | Total | Coverage |
|----------|--------|-------|----------|
| Hardware | 11 | 12 | 92% |
| Industry | 11 | 20 | 55% |
| Models | 2 | 10 | 20% |
| Research | 1 | 6 | 17% |
| Tools | 1 | 2 | 50% |

A user browsing Models or Research sees mostly emoji placeholders. This undermines the "real news app" feel.

**Fixes:**
- `buildHeroCard()` must render `<img>` when `article.image` exists. Full-width, aspect-ratio 16/9, object-fit cover, above the title.
- Prioritize OG image extraction for Models and Research sources. OpenAI Blog, Google AI Blog, and arXiv all have OG images available — ensure the scraper extracts them.
- Consider a category-themed fallback image (abstract gradient with category icon) for articles without OG images, replacing the current plain emoji.
- Add `width` and `height` attributes to all card images to prevent CLS.
- **Impact:** Would push Visual Design to 8.0, Featured Section to 8.0, Overall App Feel to 8.0.

### 2. HIGH — Fix Tools Category (Add Tool-Focused RSS Feeds)

Tools has been at 2-3 articles for FIVE consecutive audits. The classifier keywords are comprehensive (30+ terms). The bottleneck is upstream — the feeds don't produce enough tool-specific content.

**Fixes:**
- Add RSS feeds that actually publish AI tool content regularly: Simon Willison's Weblog, LangChain Blog, Weights & Biases Blog, Replicate Blog, Vercel AI Blog, GitHub Trending (AI filter).
- If Tools still has fewer than 3 articles after new feeds, consider hiding the Tools pill or merging Tools into a broader "Ecosystem" category.
- **Impact:** Would push Category System to 8.0, Content Quality to 8.0.

### 3. HIGH — Pull-to-Refresh + Full-Card Tap Targets

These are the two most impactful mobile UX improvements that don't require a backend:

**Pull-to-refresh:**
- Add `touchstart`/`touchmove`/`touchend` listeners on the main content area.
- Show a refresh indicator when pulled down past threshold.
- Re-fetch news.json and rebuild the feed.
- This is expected behavior for ANY mobile news app.

**Full-card tap targets:**
- Wrap the entire `<article class="card">` content in an `<a>` tag, or use a JavaScript click handler that navigates to the article URL when any part of the card is tapped (not just the title link).
- Currently tapping the card body, the image area, or the summary does nothing — only the title text is clickable. On a phone, users expect the whole card to be tappable.
- **Impact:** Would push Mobile UX to 8.0.

---

## What the v7->v8 Recalibration Means

The v7 audit awarded 8.0 to four categories (Visual Design, Mobile UX, Accessibility, Overall App Feel). On strict recalibration against real competitors:

- **8.0 = "a user would choose this over competitors."** AI Pulse is not there yet. It's a well-built aggregator with clean design, but inconsistent image coverage, no native mobile patterns, and basic navigation keep it in the 7.5 tier.
- The codebase itself is in good shape. The WCAG fixes, hero animation, skip-link, back-to-top, lazy loading, and clean CSS are all correctly implemented.
- The path from 7.5 to 8.0 is clear: hero image, consistent image coverage across categories, pull-to-refresh, and full-card tap targets. These are achievable in one cycle.

The scores will go back up when the work lands. This recalibration ensures that future 8.0 scores are earned against the real bar.

---

*Audit completed by Nigel on 2026-04-01. v8.*
