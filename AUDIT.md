# AI Pulse — Audit Report v5

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audits:** v1 — 6.0, v2 — 6.5, v3 — 7.0, v4 — 7.2

---

## Scoring Calibration

- 5.0 = average/basic, nothing special
- 5.5 = functional but generic
- 6.0 = generic template you'd find online
- 7.0 = genuinely better than most — HIGH bar
- 8.0 = a user would choose this over competitors
- 9.0 = award-worthy

---

## Changes Audited Since v4

Reported improvements: skeleton loading placeholders, trending scroll fade indicators, aria-live sort announcements, category tag contrast fix (brighter text + more opaque backgrounds), trending chip overflow fix (hidden + max-width), 44px tap targets on article links, staggered entrance animations (CSS-only, reduced-motion safe), search input zoom fix (16px font), nav scroll centering, trending chip sizing, negative keyword content filter.

---

## Section-by-Section Audit

### 1. Content Quality — 7.0 / 10 (v4: 7.0, +0.0)

**What improved:**
- Negative keyword list added to `fetch_news.py` (line 104): 40+ terms including "gaming deal," "ssd review," "motherboard review," "cryptocurrency," "bitcoin," etc. This directly addresses v4 Rec #2.
- The negative keyword filter is a structural improvement — it catches entire classes of off-topic content rather than relying solely on positive keyword scoring.

**What still falls short:**
- 4 clearly non-AI articles still in current news.json (down from ~10 in v4): the Newegg combo deal, RTX 4090 modder repair, DRAM price prediction, and "PC makers report surging prices." These are general hardware/market stories, not AI.
- The negative keywords missed these because they don't match the exact phrases. "DRAM prices predicted to jump" has no negative keyword for generic memory market news. The filter is keyword-exact, not semantic.
- Category distribution remains heavily skewed: Industry 19, Hardware 16, Models 11, Tools 3, Research 1. Research has ONE article. This is unchanged from v4 and remains a core weakness.
- Featured article is "OpenAI acquires TBPN" — categorized as "industry." At least this is genuinely AI-related, which is a notable improvement over v4's Google Vids featured story.
- Still no OG images, no editor's pick logic, no quality scoring for featured selection.

**Verdict:** The negative keyword filter halved the non-AI article count (~20% to ~8%), and the featured article is now genuinely AI-related. Both are real improvements. However, the category skew (Research: 1, Tools: 3) is unchanged, and the filter still misses semantically off-topic articles. Holds at 7.0 — the improvements offset the remaining gaps but don't clear 7.5 because the category balance problem is untouched.

---

### 2. Visual Design — 7.5 / 10 (v4: 7.5, +0.0)

**What improved:**
- Category tag contrast significantly improved. All five tag color combinations now pass WCAG AA with comfortable margins: Models 7.4:1, Hardware 7.8:1, Research 7.7:1, Tools 6.8:1, Industry 6.6:1. Brighter text colors (#e0c6ff, #a8f0b0, #ffcb99, #90c4ff, #faa0cc) on 0.25-alpha backgrounds. This was a v4 concern.
- Staggered entrance animations via `@keyframes card-fade-up` with per-child delays (0.07s increments for category cards, 0.04s for list cards, 0.05s for trending chips). Hero, trending chips, category cards, and category sections all animate independently. Subtle and tasteful — 0.35s duration with ease-out.
- `prefers-reduced-motion: reduce` media query disables all animations. Correct implementation.

**What hasn't changed:**
- Still emoji-on-gradient thumbnails, not real images. This remains the single biggest visual gap vs. every competitor.
- No hero image. The hero banner area is begging for a real photograph.
- Lightning bolt logo unchanged.

**Verdict:** The entrance animations add a layer of polish that makes the app feel more alive on load. Tag contrast fix ensures readability. These are additive improvements but not enough to push past 7.5 — real article images remain the gating factor for 8.0. Holds at 7.5.

---

### 3. Mobile UX (375px) — 7.5 / 10 (v4: 7.5, +0.0)

**What improved:**
- Skeleton loading placeholders now exist in the HTML (line 47-63): hero skeleton, trending label, 3 chip placeholders, and 2 card skeletons. CSS uses `skeleton-pulse` keyframes (1.5s ease-in-out infinite) with opacity 0.15-0.3. Skeleton hides via `.hidden` class when data loads. This directly addresses v4 Rec #3.
- Trending scroll fade indicators implemented: `.trending-scroll-wrapper::before/::after` pseudo-elements with gradient fades (2rem width). JS function `updateScrollIndicators()` dynamically applies `scroll-start`, `scroll-end`, `scroll-middle` classes based on scroll position. Passive scroll listener. This was the other half of v4 Rec #3.
- Search input font-size set to `1rem` (16px) — prevents iOS auto-zoom on focus. Correct fix.
- 44px min-height applied to: search input, category pills, trending chips, see-all buttons, sort toggle, load-more button, share buttons, back-to-top button. Comprehensive tap target coverage.

**What still falls short:**
- No pull-to-refresh. Still no native-feeling touch gestures.
- No nav pill scroll centering in JS (no `scrollIntoView` calls found). The active category pill may be offscreen on narrow viewports with many categories. This was reported as fixed but I cannot find the implementation.
- Skeleton is static HTML — only one set for initial load. If user switches categories, there's no loading state for the transition.
- No persistent search while scrolling (search is top-of-page only).

**Verdict:** Skeleton loading and scroll indicators are genuine UX improvements that address the two biggest v4 Rec #3 items. The 44px tap targets and 16px input font are correct mobile fixes. However, the missing nav scroll centering (reported as fixed but not found in code) and lack of pull-to-refresh keep this at 7.5. The improvements are real but incremental.

---

### 4. Search / Filter — 7.0 / 10 (v4: 7.0, +0.0)

**What changed:**
- No functional changes to search/filter since v4.

**What still falls short:**
- No search debounce (fires every keystroke).
- No search highlighting in results.
- No deep linking (`?category=hardware&q=nvidia`).
- No date range filter.
- No combined filter indicator.

**Verdict:** No changes. Holds at 7.0.

---

### 5. Navigation — 7.5 / 10 (v4: 7.5, +0.0)

**What changed:**
- No structural navigation changes since v4.

**What still falls short:**
- No breadcrumb or back button in list view.
- No deep linking / URL params.
- No bookmarking / saved articles.
- Footer still just a credit line.

**Verdict:** No changes. Holds at 7.5.

---

### 6. Performance — 7.0 / 10 (v4: 7.0, +0.0)

**What changed:**
- Skeleton loading creates perceived performance improvement — the user sees structure immediately rather than a blank page. This is a UX-performance win even though actual load time is unchanged.
- CSS animations are GPU-friendly (opacity + transform only). `will-change` not used, but the keyframes are simple enough.

**What still falls short:**
- No service worker, no PWA manifest, no lazy loading.
- No minification or bundling.
- Cache-busting `?t=Date.now()` still prevents browser caching of news.json.
- No `loading="lazy"` on any resources (there are no images to lazy-load, but if OG images are added this will matter).

**Verdict:** Skeleton loading helps perceived performance. Actual performance unchanged. Holds at 7.0.

---

### 7. Accessibility — 8.0 / 10 (v4: 7.5, +0.5)

**What improved:**
- `aria-live="assertive"` on `#sort-announcement` div with `role="status"` and `.sr-only` class. When sort order changes, JS clears then sets `textContent` via `requestAnimationFrame` to ensure screen readers announce "Sorted by newest first" / "Sorted by oldest first." This directly addresses v4's note about sort not announcing to screen readers.
- `aria-live="polite"` on `#result-count` for search result count updates.
- Tag contrast now all WCAG AA compliant (lowest ratio: Industry at 6.6:1, well above 4.5:1 threshold). This fixes the tag readability concern from v4.
- All interactive elements at 44px min-height/width — meets WCAG 2.5.5 Target Size (Enhanced) at AAA level.
- Reduced-motion media query correctly disables all card/chip/section animations.

**What still falls short:**
- Trending chips are still `<a>` tags wrapping all content with no `aria-labelledby` pointing to just the title.
- Trending bar has no `<ol>` structure despite being an ordered list.
- Category card grids lack list semantics.

**Verdict:** The aria-live sort announcement, WCAG-compliant tag contrast, 44px targets, and reduced-motion support collectively represent a meaningful accessibility upgrade. Three of the four v4 accessibility gaps have been addressed. Bumped to 8.0 — this is now genuinely good accessibility for a small web app. The remaining issues (trending chip semantics, list structure) are refinements, not blockers.

---

### 8. Category System — 7.0 / 10 (v4: 7.0, +0.0)

**What changed:**
- Negative keyword filter helps reduce miscategorized articles, but distribution is still: Industry 19, Hardware 16, Models 11, Tools 3, Research 1.

**What still falls short:**
- Research has 1 article. Tools has 3. Both sections look empty on the homepage.
- No additional RSS feeds targeting research (arXiv, Papers With Code) or tools.
- No multi-tagging.

**Verdict:** No meaningful change. Holds at 7.0.

---

### 9. Featured Section — 7.5 / 10 (v4: 7.0, +0.5)

**What improved:**
- The current featured article is "OpenAI acquires TBPN" — genuinely AI-related industry news. This is a significant improvement over v4's Google Vids story. The negative keyword filter (which includes "google vids") likely helped.
- Entrance animation on the hero card (card-fade-up 0.4s) adds a polished reveal.

**What still falls short:**
- Still "Breaking" label on every featured article regardless of age or significance.
- Still purely recency-based — no quality scoring or editor's pick.
- No hero image.
- No rotation within a session.

**Verdict:** The featured article now being genuinely AI-related is a real improvement in user experience — the first thing a mobile user sees is relevant. The negative keyword filter deserves credit for preventing off-topic stories from reaching hero position. Bumped to 7.5.

---

### 10. Hardware Coverage — 7.0 / 10 (v4: 7.0, +0.0)

**What changed:**
- 16 hardware articles, same count as v4. Still includes the 4 non-AI articles (Newegg combo, RTX 4090 modder, DRAM prices, PC maker prices).
- Genuine AI hardware stories remain: NVIDIA/Spark, chip export rules, Chinese silicon suppliers.

**What still falls short:**
- ~25% of hardware articles are generic tech, not AI-specific.
- No specs, benchmarks, or hardware-specific filtering.

**Verdict:** No meaningful change. Holds at 7.0.

---

### 11. Overall App Feel — 7.5 / 10 (v4: 7.5, +0.0)

**What a real user would think on their phone today:**

The app now loads with a skeleton that transitions into content — no more blank flash. Cards and sections fade in with staggered timing, creating a polished entrance. The trending bar has subtle fade edges that signal scrollability. Category tags are crisp and readable. Tap targets are consistently 44px. The featured story is actual AI news.

These are all quality-of-life improvements that make the app feel more finished. A user picking up their phone would notice the smoother load and better visual polish. However, the core experience — emoji thumbnails, skewed categories, no pull-to-refresh, no real images — is structurally the same as v4.

Compared to Techpresso: still behind on content curation and real images. Compared to Particle: still behind on source clustering and visual richness. Compared to SmartNews: still behind on native app feel and personalization. The gap has narrowed on polish (animations, loading states, accessibility) but the structural gaps remain.

**Verdict:** The improvements this cycle are polish-oriented: skeleton loading, animations, scroll indicators, tag contrast, tap targets, aria-live announcements. These are the right improvements to make after a layout rebuild. But they don't change the fundamental experience enough to push past 7.5. Real images and better content curation remain the gates to 8.0.

---

## Score Summary

| Area | v1 | v2 | v3 | v4 | v5 | v4->v5 |
|------|-----|-----|-----|-----|-----|--------|
| Content Quality | 6.0 | 6.5 | 7.5 | 7.0 | 7.0 | +0.0 |
| Visual Design | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | +0.0 |
| Mobile UX (375px) | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | +0.0 |
| Search / Filter | 5.5 | 6.5 | 6.5 | 7.0 | 7.0 | +0.0 |
| Navigation | 5.5 | 5.5 | 6.5 | 7.5 | 7.5 | +0.0 |
| Performance | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Accessibility | 5.0 | 6.5 | 7.0 | 7.5 | 8.0 | **+0.5** |
| Category System | 6.5 | 6.5 | 7.0 | 7.0 | 7.0 | +0.0 |
| Featured Section | 6.0 | 6.0 | 6.5 | 7.0 | 7.5 | **+0.5** |
| Hardware Coverage | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | 7.0 | 7.5 | 7.5 | +0.0 |
| **OVERALL** | **6.0** | **6.5** | **7.0** | **7.2** | **7.3** | **+0.1** |

---

## Top 3 Priority Recommendations

### 1. CRITICAL — Real Article Images via Open Graph (carried from v4)

Still the #1 blocker for reaching 8.0. The organized homepage layout, hero banner, and polished animations are all screaming for real images. Every competitor uses them.

**Fixes:**
- In `fetch_news.py`, after fetching RSS, make a GET request to each article URL and extract the `og:image` meta tag. Store as `image` field in news.json.
- In `buildCard()` and `buildHeroCard()`, render `<img>` with `loading="lazy"`, `aspect-ratio: 16/9`, and `object-fit: cover` when `article.image` exists. Keep emoji gradient as fallback.
- Add a hero image to the featured card — the full-width hero is the perfect place for a real photograph.
- **Impact:** Would push Visual Design toward 8.5, Overall App Feel toward 8.0.

### 2. HIGH — Fix Category Balance (Research and Tools Starvation)

Research has 1 article. Tools has 3. On the homepage, the Research section shows a single lonely card. This undermines the curated, comprehensive feel the layout creates.

**Fixes:**
- Add research-focused RSS feeds: arXiv AI (cs.AI, cs.CL, cs.CV), Papers With Code trending, Semantic Scholar AI feed, DeepMind blog, Google AI blog.
- Add tools-focused RSS feeds: Product Hunt AI category, GitHub trending ML repos, Hugging Face blog, LangChain blog.
- If a category has fewer than 3 articles after a fetch cycle, flag it in logs so the team can investigate feed health.
- Consider raising the minimum viable article count per category to 5 before displaying the section on the homepage.
- **Impact:** Would push Category System to 7.5+ and Content Quality to 7.5.

### 3. HIGH — Deep Linking and Search Polish

The app has proper navigation (homepage vs. list view, category drill-down) but none of it is URL-addressable. Users cannot share a filtered view or bookmark a category.

**Fixes:**
- Use `URLSearchParams` and `history.pushState` to reflect current state: `?category=hardware`, `?q=nvidia`, `?category=models&sort=oldest`.
- On page load, read URL params and restore the corresponding view.
- Add search debounce (250ms) to prevent firing on every keystroke.
- Add search result highlighting (wrap matches in `<mark>`).
- **Impact:** Would push Search/Filter to 7.5 and Navigation to 8.0.

---

## What Went Well This Cycle

The team addressed the three specific v4 Rec #3 items — skeleton loading, trending scroll indicators, and aria-live sort announcements — plus tag contrast, tap targets, entrance animations, and search input zoom. This is disciplined execution on a punch list.

Accessibility (+0.5 to 8.0) is the standout. The combination of aria-live announcements, WCAG AA tag contrast, 44px tap targets across all interactive elements, and reduced-motion support makes this genuinely good accessibility for a web app of this scale.

Featured Section (+0.5 to 7.5) benefits from both the negative keyword filter (keeping off-topic stories out of hero position) and the entrance animation polish.

The overall +0.1 (7.2 to 7.3) reflects that this was a polish cycle, not a structural one. The v4 layout rebuild was the big structural move; v5 refined its edges. To make the next jump (toward 7.5+ overall), the team needs to tackle the structural blockers: real images (Rec #1) and category balance (Rec #2). Polish alone won't get there.

---

*Audit completed by Nigel on 2026-04-01. v5.*
