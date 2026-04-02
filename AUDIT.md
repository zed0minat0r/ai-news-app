# AI Pulse — Audit Report v2

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audit:** v1 — Overall 6.0 / 10

---

## Scoring Calibration

- 5.0 = average/basic, nothing special
- 5.5 = functional but generic
- 6.0 = generic template you'd find online
- 7.0 = genuinely better than most — HIGH bar
- 8.0 = a user would choose this over competitors
- 9.0 = award-worthy

---

## Section-by-Section Audit

### 1. Content Quality — 6.5 / 10 (v1: 6.0, +0.5)

**What improved:**
- Article count went from 29 to 37. Eight fresh stories added covering NVIDIA $1T forecast, Apple Siri, Oracle layoffs, Amazon exascale campus, AI midterm politics, GTC agentic shift, Gemini Flash-Lite, and the Texas TRAIGA Act.
- Better category balance. Industry went from 4 to 8 articles. Research from 3 to 4. More variety.
- New stories are properly sourced with real URLs and recent dates (March 31 - April 1 2026).

**What hasn't changed:**
- Still 100% hardcoded in a JS array. The `fetchLatestArticles()` function remains a console.log stub. A user visiting tomorrow sees the exact same 37 articles. This is the single biggest gap preventing this from being a real news app.
- "Last updated" timestamp still generated from the browser clock — still misleading.
- No multi-source clustering or article deduplication.

**Verdict:** More content and better balance, but the fundamental static-data problem remains. The bump is modest because adding 8 hardcoded articles doesn't change the core architecture flaw.

---

### 2. Visual Design — 7.0 / 10 (v1: 6.5, +0.5)

**What improved:**
- Card thumbnails are a significant addition. Each card now has a 120px gradient banner with a category-specific emoji icon (brain for Models, desktop for Hardware, microscope for Research, wrench for Tools, chart for Industry). This breaks the wall-of-text monotony that was the #1 visual complaint in v1.
- Alternating hero card layout every 5th card (`nth-child(5n+1)`) creates visual rhythm. Hero cards get a side-by-side thumbnail+text layout with a thicker left border. Good variety.
- Category accent bars on the left side of every card add color coding at a glance.
- Subtle box-shadow on cards adds depth without being heavy.

**What still falls short:**
- Thumbnails are emoji on gradient — not real images. Competitors use actual article images, which dramatically increases engagement. An emoji on a purple gradient is better than nothing, but it's still obviously placeholder-grade.
- No hero image on the featured card. The most important card is text-only.
- Every non-hero card is still the same height/layout. The 5th-card hero helps, but 4 out of 5 cards are still visually identical.
- The lightning bolt emoji logo is still generic.

**Verdict:** The thumbnails and hero alternation are real improvements that make the feed noticeably less monotonous. Bumped to 7.0 — it now looks like a designed product, not a developer prototype. Still not image-rich enough to compete with SmartNews or Particle.

---

### 3. Mobile UX (375px) — 6.5 / 10 (v1: 6.0, +0.5)

**What improved:**
- Category pills now have `min-height: 44px` with `padding: 0.6rem 1.15rem` and `display: inline-flex; align-items: center; justify-content: center`. This fixes the v1 tap target issue — pills meet the 44x44px minimum.
- `overflow-x: hidden` and `overflow-wrap: break-word` on body prevent horizontal scroll on narrow screens.
- Hero cards stack vertically below 380px (`@media max-width: 379px`) — good responsive fallback.
- Back-to-top button z-index fix (1000) with footer `position: relative; z-index: 1` means the button is no longer blocked by the footer. Confirmed fixed.

**What still falls short:**
- Search is still buried in the header — you must scroll to the top to search. No persistent search access.
- Hardware Spotlight section on "All" view still creates a confusing mental model — hardware articles appear in their own section AND can appear in the main grid when searching.
- No pull-to-refresh, no swipe gestures, no infinite scroll.
- `cursor: pointer` still on pills (irrelevant on mobile, not harmful).
- The hero card layout at 375px with `grid-template-columns: 120px 1fr` leaves only ~210px for text content after padding. Tight but workable.

**Verdict:** The tap target fix was important and the overflow protection is good. Solid mobile improvements. Not yet delightful, but definitely more usable.

---

### 4. Search / Filter — 6.5 / 10 (v1: 5.5, +1.0)

**What improved:**
- Search icon (magnifying glass) is now present, positioned absolutely inside the input with proper `pointer-events: none`. Good visual affordance.
- Clear button ("x") appears when a query is active (`display: block` when query exists), with proper aria-label. Hides when empty. Clean implementation.
- Result count now shows "X results found" via `#result-count` with `aria-live="polite"` for screen reader announcements. This was specifically called out as missing in v1.
- `#no-results` now has `role="status"` — another v1 fix.

**What still falls short:**
- No search highlighting in results.
- No sort options (by date, source, relevance).
- No combined filter indicator ("Models + 'nvidia' = 2 filters active").
- No date range filter.
- No debounce on keystroke search (fires on every `input` event). Fine for 37 articles.
- No deep linking (`?category=hardware&q=nvidia`).

**Verdict:** This is the biggest single-area improvement. The search icon, clear button, and result count transform it from bare-minimum to a properly functional search. +1.0 is earned.

---

### 5. Navigation — 5.5 / 10 (v1: 5.5, +0.0)

**No meaningful changes.** Category pills and back-to-top button remain the only navigation. Still no "Trending", "Saved", "Read Later", sharing, or deep linking. Footer is still just a credit line.

**Verdict:** Unchanged. Navigation remains the weakest area relative to what a news app user expects.

---

### 6. Performance — 7.0 / 10 (v1: 7.0, +0.0)

**No meaningful changes.** Still zero external JS deps, single HTML/CSS/JS files, Google Fonts the only external resource. Now rendering 37 articles from a local array instead of 29 — negligible difference. Still no service worker, no PWA manifest, no lazy loading.

**Verdict:** Still accidentally fast because it's static. The score holds.

---

### 7. Accessibility — 6.5 / 10 (v1: 5.0, +1.5)

**What improved:**
- `aria-pressed` attribute now present on all category pill buttons (confirmed in HTML: `aria-pressed="true"` on active, `aria-pressed="false"` on others). JS correctly toggles these on click. This was a critical v1 gap.
- Focus-visible indicators added globally: `a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`. Category pills also get their own `.cat-pill:focus-visible` rule. Major improvement for keyboard users.
- Muted text color changed from `#8b949e` to `#adb5bd`. On `#161b22` background, `#adb5bd` yields approximately 6.1:1 contrast ratio — passes WCAG AA (4.5:1 required). On `#0d1117` background it's even better at ~7.3:1. Fix confirmed.
- `#result-count` has `aria-live="polite"` for dynamic result count announcements.
- `#no-results` has `role="status"`.
- Search icon has `aria-hidden="true"`, search clear button has `aria-label="Clear search"`.

**What still falls short:**
- No skip-to-content link.
- Card thumbnails use emoji but `aria-hidden="true"` is set — this is correct, good.
- Entire cards are `<a>` tags wrapping all content — this creates very long link text for screen readers (title + summary + meta all read as one link). Should use `aria-labelledby` pointing to just the heading.
- No heading for the featured section (it's just a div with a card inside).

**Verdict:** This is the biggest improvement area (+1.5). The three critical fixes — aria-pressed, contrast, and focus indicators — address the most impactful v1 failures. Well done.

---

### 8. Category System — 6.5 / 10 (v1: 6.5, +0.0)

**Marginal improvement.** Article counts improved: Models 10 (was 8), Hardware 9 (was 7), Research 4 (was 3), Tools 6 (was 5), Industry 8 (was 4). Industry especially is much better balanced now. But no structural changes — still no article counts displayed on pills, no subcategories, no dynamic generation.

**Verdict:** Better content balance but same system. Holds at 6.5.

---

### 9. Featured Section — 6.0 / 10 (v1: 6.0, +0.0)

**No changes.** Still a single hardcoded `featured: true` flag on the NVIDIA Rubin article from March 29. Still says "Breaking" for an article that's 3 days old. No rotation, no per-category featured articles, no expiration logic.

**Verdict:** Unchanged. The featured section is stale.

---

### 10. Hardware Coverage — 7.0 / 10 (v1: 7.0, +0.0)

**What improved:**
- Two new hardware articles: NVIDIA $1T revenue forecast, Amazon exascale campus. Total now 9 hardware articles (was 7).
- Broader coverage: NVIDIA, Huawei, Rebellions (Korean chips), Amazon infrastructure.

**What hasn't changed:**
- Still no hardware subcategories, no specs/benchmarks in cards, no comparison features.
- Hardware Spotlight still only visible on "All" tab.

**Verdict:** More content but same structure. Holds at 7.0.

---

### 11. Overall App Feel — 6.0 / 10 (v1: 5.5, +0.5)

**What a real user would think on their phone today:**

Opening AI Pulse on a phone, the first impression is better than v1. The gradient thumbnail banners with emoji give each card visual identity — you can scan the feed and quickly identify categories by color. The alternating hero layout every 5th card breaks the monotony. The search has a proper icon and clear button, which feels polished. Category pills are properly sized for tapping.

But the user still notices: nothing ever updates. The "Breaking" label on the NVIDIA Rubin article from March 29 feels stale. There are no real images — the emoji thumbnails are creative but obviously not real article imagery. Compared to Techpresso (curated daily newsletter with images), Particle (multi-source clustering with photos), or SmartNews (full article images, personalization), this still feels like a well-made student project rather than a product someone would use daily.

The content is genuinely good and timely. 37 well-curated AI articles with real sources. But "well-curated and hardcoded" still isn't what a news aggregator should be.

**Verdict:** Noticeable improvement in visual polish and UX details. Moved from "prototype" to "polished MVP". But still missing the core dynamic content that makes a news app actually useful day-to-day.

---

## Score Summary

| Area | v1 Score | v2 Score | Change |
|------|----------|----------|--------|
| Content Quality | 6.0 | 6.5 | +0.5 |
| Visual Design | 6.5 | 7.0 | +0.5 |
| Mobile UX (375px) | 6.0 | 6.5 | +0.5 |
| Search / Filter | 5.5 | 6.5 | **+1.0** |
| Navigation | 5.5 | 5.5 | +0.0 |
| Performance | 7.0 | 7.0 | +0.0 |
| Accessibility | 5.0 | 6.5 | **+1.5** |
| Category System | 6.5 | 6.5 | +0.0 |
| Featured Section | 6.0 | 6.0 | +0.0 |
| Hardware Coverage | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | +0.5 |
| **OVERALL** | **6.0** | **6.5** | **+0.5** |

---

## Top 3 Priority Recommendations

### 1. CRITICAL — Implement Live Data Fetching (unchanged from v1)
Still the #1 gap. A news app with 37 hardcoded articles is a demo, not a product. The `fetchLatestArticles()` stub has been there since day one. Implement:
- GitHub Action on a cron (every 6-12 hours minimum)
- Fetch RSS feeds from 10-15 AI news sources (The Verge AI, TechCrunch AI, Ars Technica, ArXiv, Hacker News)
- Write to `data/news.json`, frontend fetches on load
- Add real "Last updated" timestamp from the data file, not the browser clock
- This single change would boost Content Quality, Featured Section, and Overall App Feel by 1-2 points each.

### 2. HIGH — Real Article Images
Emoji gradient thumbnails were a smart intermediate step, but they still look obviously placeholder. Next steps:
- Extract Open Graph images from article URLs during data fetching (pairs with Rec #1)
- Fallback to the current emoji gradient banners when no OG image is available
- Add a hero image to the featured card
- Use `loading="lazy"` and `aspect-ratio` for performance
- This would push Visual Design from 7.0 toward 8.0.

### 3. HIGH — Navigation and Discovery Features
Navigation scored 5.5 in both audits — it's the most stagnant area. A news app needs more than category pills:
- Add article count badges to category pills ("Models (10)")
- Add a "Today" / "This Week" date filter
- Implement URL query parameters for deep linking and sharing (`?category=hardware&q=nvidia`)
- Add a minimal "share" button on cards (Web Share API on mobile)
- Consider a "Top Stories" or "Trending" section based on article recency

---

## What Went Well This Cycle

Credit to the team: the v1 audit identified specific, actionable issues and the agents addressed them systematically.

- **Refiner** delivered the most impactful visual change (card thumbnails) and the most impactful accessibility fixes (aria-pressed, contrast, focus indicators).
- **Spark's** alternating hero layout is a genuinely good design pattern that adds visual variety without complexity.
- **Pixel's** tap target fix (44px pills) and overflow protection were important mobile fundamentals.
- **Builder** kept the content fresh with 8 well-sourced new articles.

The +0.5 overall improvement is real and earned. To reach 7.0+, the app needs to solve the live data problem — everything else is polish on a static page.

---

*Audit completed by Nigel on 2026-04-01. v2.*
