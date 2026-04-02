# AI Pulse — Audit Report v6

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audits:** v1 — 6.0, v2 — 6.5, v3 — 7.0, v4 — 7.2, v5 — 7.3

---

## Scoring Calibration

- 5.0 = average/basic, nothing special
- 5.5 = functional but generic
- 6.0 = generic template you'd find online
- 7.0 = genuinely better than most — HIGH bar
- 8.0 = a user would choose this over competitors
- 9.0 = award-worthy

---

## Changes Audited Since v5

Reported improvements: Newsletter signup via Formspree (header bar + full section), Firebase Auth scaffolding (placeholder config, Google sign-in UI), staggered entrance animations (CSS-only, reduced-motion safe), card depth/shadow polish, 515 lines of dead CSS removed, deep linking via URLSearchParams (category, search, sort params), search debounce (250ms) + search highlight (<mark>), 6 new RSS feeds (arXiv cs.AI/cs.CL/cs.CV, Papers With Code, Hugging Face Blog, Product Hunt AI), card accent bars fixed (border-top on mobile, border-left on desktop), section header centering, font size bumps, chip contrast improvements, favicon (inline SVG data URI), RSS pipeline reduced to every 3h, content filter negative keywords.

---

## Section-by-Section Audit

### 1. Content Quality — 7.5 / 10 (v5: 7.0, +0.5)

**What improved:**
- Category distribution is dramatically better: Industry 17, Hardware 12, Research 10, Models 9, Tools 2. Research jumped from 1 to 10 articles thanks to arXiv cs.AI feed. This was v5 Rec #2 and it has been meaningfully addressed.
- Non-AI article count dropped further. Only 1 clearly off-topic article remains (Newegg combo deal). Down from 4 in v5 and ~10 in v4. The negative keyword filter + better feed selection are working.
- Source diversity improved: arXiv cs.AI (12), Hacker News (20), Tom's Hardware (8), Wired (4), plus official blogs (OpenAI, Google AI, NVIDIA). 8 distinct sources vs. fewer before.
- Featured article ("OpenAI acquires TBPN") remains genuinely AI-related.

**What still falls short:**
- Tools category has only 2 articles — still starved despite adding Hugging Face Blog and Product Hunt feeds. Those feeds may not be producing enough AI-specific content that passes the relevance filter.
- Hacker News dominates at 40% of articles (20/50). Over-reliance on a single source.
- arXiv abstracts as summaries are poor for casual mobile readers. "arXiv:2604.00005v1 Announce Type: new Abstract:" is not user-friendly copy. Needs truncation and cleanup.
- Still no OG images, no editor's pick logic, no quality scoring for featured selection.

**Verdict:** Research going from 1 to 10 articles is a structural fix that makes the app feel like it actually covers AI comprehensively. The 1 remaining off-topic article (down from 4) shows the filter is working. Bumped to 7.5. Tools starvation (2 articles) and raw arXiv abstracts prevent 8.0.

---

### 2. Visual Design — 7.5 / 10 (v5: 7.5, +0.0)

**What improved:**
- Card depth improved with `box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)` — subtle but adds dimensionality.
- 515 lines of dead CSS removed (30% reduction from 1706 to 1191 lines). Cleaner stylesheet, though this is maintenance rather than visual improvement.
- Accent bars properly positioned: `border-top` on mobile (centered alignment), `border-left` on desktop. Correct responsive behavior.
- Chip tag contrast improved with 0.28 alpha backgrounds and lighter text colors (#e8d4ff, #b8f5be, etc.).

**What hasn't changed:**
- Still emoji-on-gradient thumbnails, not real images. This remains THE blocker for 8.0.
- No hero image. The hero card is text-only.
- Newsletter section gradient is pleasant but the overall visual identity still lacks distinctive character.
- Some font sizes are very small: 0.65rem appears 3 times (chip tags, meta text). At 16px base, that's 10.4px — borderline for mobile readability.

**Verdict:** Incremental polish improvements (shadows, accent bars, dead CSS cleanup) but nothing that changes the visual impression for a user. The card shadows are nice. The dead CSS removal is good engineering but invisible to users. Still waiting on real images to break through 7.5. Holds at 7.5.

---

### 3. Mobile UX (375px) — 7.5 / 10 (v5: 7.5, +0.0)

**What improved:**
- Newsletter header signup form is well-implemented for mobile: flex layout, 44px min-height inputs, 1rem font-size (no iOS zoom). The inline header bar is a smart pattern — compact without being intrusive.
- Firebase auth button positioned in header top-right. Clean icon-only button at mobile width.
- Deep linking means users can now share filtered views and bookmark categories — this improves the mobile sharing workflow.

**What still falls short:**
- Firebase Auth is a placeholder (YOUR_API_KEY, YOUR_PROJECT). It will throw console errors on load. This is scaffolding, not a feature. A user tapping the auth button gets a Firebase initialization error, not a login flow. This is a regression in UX — a button that doesn't work is worse than no button.
- Still no `scrollIntoView` for nav pills. Not found in code despite being reported previously.
- Still no pull-to-refresh gesture.
- No loading state when switching categories (skeleton is initial-load only).
- The 0.65rem font sizes (10.4px) on chip tags and some meta text are too small for comfortable mobile reading.

**Verdict:** Newsletter signup is a genuine feature addition for mobile users. Deep linking helps shareability. But the broken Firebase auth button is a negative — it adds a non-functional interactive element to the header. Net effect is neutral. Holds at 7.5.

---

### 4. Search / Filter — 7.5 / 10 (v5: 7.0, +0.5)

**What improved:**
- Search debounce implemented at 250ms (`clearTimeout`/`setTimeout` pattern). Correct implementation. This was v5 Rec #3.
- Search highlighting via `<mark>` tags. The `highlightText()` function properly escapes regex special characters and wraps matches. This was v5 Rec #3.
- Deep linking: `?category=hardware&q=nvidia&sort=oldest` is now fully supported. `readURLParams()` on load, `updateURLParams()` on state change, `popstate` listener for back/forward. URL uses `replaceState` for filter changes and `pushState` for category navigation. This was v5 Rec #3.

**What still falls short:**
- No date range filter.
- No combined filter indicator (e.g., "Showing 5 results for 'nvidia' in Hardware").
- Search doesn't persist while scrolling — still top-of-page only.
- No autocomplete or search suggestions.

**Verdict:** All three v5 Rec #3 items (debounce, highlighting, deep linking) have been implemented correctly. These are real functional improvements that a user would notice. Debounce prevents janky re-renders on fast typing. Highlighting helps users find their query in results. Deep linking enables sharing filtered views. Bumped to 7.5.

---

### 5. Navigation — 7.5 / 10 (v5: 7.5, +0.0)

**What improved:**
- Deep linking adds URL-based navigation state. Back/forward buttons now work correctly via `popstate` listener. This was noted as missing in v5.
- `pushState` used for category changes means browser history tracks navigation through categories.

**What still falls short:**
- Still no breadcrumb or "back to home" button in list view.
- No bookmarking / saved articles (Firebase auth is placeholder only).
- Footer is still just a credit line — no useful links, categories, or about page.
- Nav pill scroll centering still missing (`scrollIntoView` not found in code).

**Verdict:** Deep linking is a meaningful navigation improvement, but I already scored it in Search/Filter since the implementation lives there. The navigation structure itself (pills, homepage vs. list view, hero) is unchanged. The footer remains bare. Holds at 7.5.

---

### 6. Performance — 7.0 / 10 (v5: 7.0, +0.0)

**What improved:**
- 515 lines of dead CSS removed — 30% smaller stylesheet means faster parse time. Real but marginal improvement.
- RSS pipeline reduced from every 30min to every 3h — reduces server-side resource usage (not user-facing performance, but good practice).

**What still falls short:**
- Firebase SDK loaded from CDN on every page load (~40KB gzipped for auth module alone) even though it's placeholder config and will fail. This is wasted bandwidth for every mobile user.
- No service worker, no PWA manifest, no offline support.
- No minification or bundling (main.js is 1075 lines, style.css is 1191 lines — not huge, but not optimized).
- Cache-busting `?t=Date.now()` still prevents browser caching of news.json.
- No `loading="lazy"` anywhere.

**Verdict:** The dead CSS removal is real performance improvement. But the Firebase SDK loading for no functional benefit is a new performance cost. Net effect is roughly neutral. Holds at 7.0.

---

### 7. Accessibility — 8.0 / 10 (v5: 8.0, +0.0)

**What improved:**
- Newsletter forms have proper `<label>` elements with `.sr-only` class and `for` attributes linking to inputs. `aria-live="polite"` on success messages.
- Auth button has `aria-label="Sign in with Google"`.

**What hasn't changed:**
- All v5 accessibility features remain: aria-live sort announcements, WCAG AA tag contrast, 44px tap targets, reduced-motion media query.
- Trending chips still lack `aria-labelledby` and list semantics.

**Verdict:** Newsletter accessibility is correctly implemented. Auth button has proper labeling. No regression. But no significant new accessibility ground broken. Holds at 8.0.

---

### 8. Category System — 7.5 / 10 (v5: 7.0, +0.5)

**What improved:**
- Research: 10 articles (up from 1 in v5). This is the single biggest improvement this cycle. The arXiv cs.AI feed is producing relevant content. A user browsing the Research section now sees a full, populated category instead of a lonely single card.
- Distribution is healthier: Industry 17, Hardware 12, Research 10, Models 9, Tools 2. Three categories are now in double digits.
- 6 new RSS feeds added targeting the two weakest categories.

**What still falls short:**
- Tools still has only 2 articles. The Hugging Face Blog and Product Hunt AI feeds are not producing enough content that passes the relevance filter. This section still looks empty.
- No multi-tagging (an article about an AI tool built on a new model could be both Tools and Models).
- arXiv articles dominate Research but have raw abstract formatting that doesn't match the editorial tone of other categories.

**Verdict:** Research going from 1 to 10 articles is a major fix. The category system now has 4 of 5 categories with meaningful content. Tools remains the weak link at 2. Bumped to 7.5.

---

### 9. Featured Section — 7.5 / 10 (v5: 7.5, +0.0)

**What changed:**
- No structural changes to the featured section. Still "Breaking" label, still recency-based, still no hero image.
- Featured article ("OpenAI acquires TBPN") is genuinely AI-related — same quality as v5.

**What still falls short:**
- "Breaking" on every featured article regardless of age.
- No rotation within a session.
- No quality scoring or editor's pick logic.
- No hero image.

**Verdict:** No changes. Holds at 7.5.

---

### 10. Hardware Coverage — 7.0 / 10 (v5: 7.0, +0.0)

**What changed:**
- 12 hardware articles (down from 16 in v5, but article count fluctuates with the feed cycle).
- Non-AI hardware reduced to 1 (Newegg combo deal).
- Genuine AI hardware present: NVIDIA/Spark, chip export rules, AI laptops.

**What still falls short:**
- No specs, benchmarks, or hardware-specific filtering.
- No dedicated hardware feeds (AnandTech AI, ServeTheHome).
- 1 off-topic article persists.

**Verdict:** Marginal improvement in quality (fewer off-topic), but the same structural limitations. Holds at 7.0.

---

### 11. Overall App Feel — 7.5 / 10 (v5: 7.5, +0.0)

**What a real user would think on their phone today:**

The app now has a newsletter signup that makes it feel like a real product, not just a demo. The search highlights your query, deep links let you share a filtered view, and the Research section actually has content. These are real user-facing improvements.

However, the Firebase auth button that does nothing is a misstep — it adds visual complexity without function. Tapping it produces an error. The arXiv abstracts look like raw database output on a phone. And the core visual gap — emoji thumbnails instead of real images — remains the elephant in the room.

Compared to Techpresso: still behind on curation, real images, and editorial voice. Techpresso's emails feel hand-curated; this feels algorithmically assembled. Compared to Particle: behind on source clustering, imagery, and native feel. Compared to SmartNews: behind on personalization, offline reading, and visual richness.

The gap is narrowing on functionality (deep linking, search, newsletter) but the content presentation gap (no images, raw abstracts, emoji thumbnails) keeps this from feeling like an app a user would choose over competitors.

**Verdict:** The functional improvements (newsletter, deep linking, search polish, category balance) are real and correct. But they don't change the fundamental mobile experience enough to push past 7.5. The Firebase placeholder is a minor negative. Real images remain the gate to 8.0. Holds at 7.5.

---

## Score Summary

| Area | v1 | v2 | v3 | v4 | v5 | v6 | v5->v6 |
|------|-----|-----|-----|-----|-----|-----|--------|
| Content Quality | 6.0 | 6.5 | 7.5 | 7.0 | 7.0 | 7.5 | **+0.5** |
| Visual Design | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Mobile UX (375px) | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Search / Filter | 5.5 | 6.5 | 6.5 | 7.0 | 7.0 | 7.5 | **+0.5** |
| Navigation | 5.5 | 5.5 | 6.5 | 7.5 | 7.5 | 7.5 | +0.0 |
| Performance | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Accessibility | 5.0 | 6.5 | 7.0 | 7.5 | 8.0 | 8.0 | +0.0 |
| Category System | 6.5 | 6.5 | 7.0 | 7.0 | 7.0 | 7.5 | **+0.5** |
| Featured Section | 6.0 | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | +0.0 |
| Hardware Coverage | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| **OVERALL** | **6.0** | **6.5** | **7.0** | **7.2** | **7.3** | **7.5** | **+0.2** |

---

## Top 3 Priority Recommendations

### 1. CRITICAL — Real Article Images via Open Graph (carried from v5, v4)

Third audit cycle carrying this recommendation. Still the #1 blocker for reaching 8.0. The newsletter, deep linking, and animations are all polish on top of emoji thumbnails. Every single competitor uses real images.

**Fixes:**
- In `fetch_news.py`, after fetching RSS, make a HEAD/GET request to each article URL and extract the `og:image` meta tag. Store as `image` field in news.json.
- In `buildCard()` and `buildHeroCard()`, render `<img>` with `loading="lazy"`, `aspect-ratio: 16/9`, and `object-fit: cover` when `article.image` exists. Keep emoji gradient as fallback.
- Add a hero image to the featured card — the full-width hero is the perfect place for a real photograph.
- **Impact:** Would push Visual Design toward 8.0+, Overall App Feel toward 8.0.

### 2. HIGH — Fix or Remove Firebase Auth Placeholder

The Firebase SDK is loaded with placeholder config (YOUR_API_KEY, YOUR_PROJECT). This causes: (a) console errors on every page load, (b) ~40KB wasted bandwidth for non-functional auth module, (c) a user-facing auth button that does nothing when tapped. A broken feature is worse than no feature.

**Fixes — pick one:**
- **Option A (ship it):** Configure real Firebase project, connect Google sign-in, implement bookmarks/saved articles behind auth. This makes the auth button functional and unlocks personalization.
- **Option B (remove it):** Strip the Firebase SDK, auth button, and avatar element until the feature is ready. Remove the ~40KB load penalty. Re-add when config is real.
- **Do not** leave placeholder config in production. It is a negative UX signal.
- **Impact:** Option A would push Navigation to 8.0 (bookmarks, personalization). Option B would improve Performance slightly and remove a broken UI element.

### 3. HIGH — Clean Up arXiv Abstracts + Fix Tools Category

arXiv articles show raw abstracts starting with "arXiv:2604.00005v1 Announce Type: new Abstract:" — this is not suitable for a mobile news app. And Tools still only has 2 articles.

**Fixes:**
- In `fetch_news.py`, add a post-processing step for arXiv entries: strip the "arXiv:XXXX Announce Type: new Abstract:" prefix. Truncate abstracts to 2-3 sentences max. This makes Research articles match the editorial quality of other categories.
- For Tools category: add more tool-focused RSS feeds (GitHub Trending AI, LangChain blog, Weights & Biases blog). Consider lowering the relevance threshold for articles from tool-specific feeds, since the source context implies tool relevance.
- If Tools consistently has fewer than 3 articles, hide the section on the homepage to avoid showing a nearly-empty category.
- **Impact:** Would push Content Quality to 8.0 and make Research content actually readable on mobile.

---

## What Went Well This Cycle

The team addressed 2 of 3 v5 recommendations directly:

**Rec #2 (Category Balance):** Research went from 1 to 10 articles via arXiv feeds. This is the biggest single content improvement across all 6 audits. The category system now has 4 of 5 categories with 9+ articles. Execution was precise — the right feeds were added and they're producing relevant content.

**Rec #3 (Deep Linking + Search Polish):** All three items delivered — debounce (250ms), highlighting (<mark>), and deep linking (URLSearchParams + pushState + popstate). The implementation is clean: URL params are read on load, updated on state change, and browser back/forward works. This is solid engineering.

**Newsletter signup** is an unplanned but welcome addition. Two placement points (compact header bar + full section below content) with proper Formspree integration, accessible labels, and success states. This makes the app feel like a real product with a growth channel.

**Dead CSS removal** (515 lines, 30% reduction) is good maintenance hygiene. The stylesheet is now tighter and easier to work with.

The overall +0.2 (7.3 to 7.5) reflects that this was a mixed cycle: strong functional improvements (deep linking, search, category balance, newsletter) offset by a misstep (placeholder Firebase auth) and the continued absence of real images. The functional foundation is increasingly solid — the app now has search with debounce/highlight, deep linking, newsletter signup, 8 source feeds, and proper accessibility. What it lacks is visual richness (images) and content polish (arXiv cleanup). Those are the gates to 8.0.

---

*Audit completed by Nigel on 2026-04-01. v6.*
