# AI Pulse — Audit Report v7

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audits:** v1 — 6.0, v2 — 6.5, v3 — 7.0, v4 — 7.2, v5 — 7.3, v6 — 7.5

---

## Scoring Calibration

- 5.0 = average/basic, nothing special
- 5.5 = functional but generic
- 6.0 = generic template you'd find online
- 7.0 = genuinely better than most — HIGH bar
- 8.0 = a user would choose this over competitors
- 9.0 = award-worthy

---

## Changes Audited Since v6

Reported improvements: Real article images via OG tags (claimed 28/50, verified 26/50 = 52% coverage), WCAG contrast fixes on all chip/card/pill tags, Firebase placeholder removed (saves ~40KB), arXiv abstract metadata cleanup (regex strip of "arXiv:XXXX Announce Type: new Abstract:" prefix), newsletter signup (Formspree, already in v6), Tools keyword expansion (30+ keywords), nav pill scroll centering via scrollIntoView, 515 lines dead CSS cleaned (already in v6), animated hero border (conic-gradient rotating border), card summary font bump (0.8rem to 0.85rem), narrow-screen form stacking (max-width: 400px breakpoint).

---

## Section-by-Section Audit

### 1. Content Quality — 7.5 / 10 (v6: 7.5, +0.0)

**What improved:**
- arXiv abstracts are now cleaned. All 11 arXiv articles have the "arXiv:XXXX Announce Type: new Abstract:" prefix stripped. Summaries now read like proper editorial copy. This was v6 Rec #3 and it is fully addressed. A mobile user reading Research articles no longer sees raw database metadata.
- Category distribution: Industry 20, Hardware 12, Models 10, Research 6, Tools 2. Models improved from 9 to 10. Research dropped from 10 to 6 (feed cycle fluctuation, not a structural regression).

**What still falls short:**
- Tools still has only 2 articles despite 30+ keywords added to the classifier. The keyword expansion was the right idea but the feeds themselves (Hugging Face Blog, Product Hunt AI) are not producing enough qualifying content. This is now the 3rd cycle with Tools starved.
- Hacker News still dominates at 40% (20/50 articles). Source concentration risk unchanged.
- 9 distinct sources total — marginal improvement over 8 in v6.
- No editorial curation, quality scoring, or editor's pick logic.

**Verdict:** arXiv cleanup is a real content quality improvement — those articles now read like they belong in the app. But the distribution numbers are largely unchanged, and Tools remains at 2. The improvement is in presentation quality, not breadth. Holds at 7.5.

---

### 2. Visual Design — 8.0 / 10 (v6: 7.5, +0.5)

**What improved:**
- Real article images on 26 of 50 cards (52%). This is THE change the audit has been requesting since v4. Cards with images show `<img>` with `loading="lazy"`, `object-fit: cover`, `border-radius: inherit`. The `onerror` fallback gracefully reverts to emoji gradient. On a phone, scrolling through the feed now shows roughly every other card with a real photograph. This fundamentally changes the visual impression.
- Animated hero border: A `conic-gradient` rotating border using `@property --hero-border-angle` and `hero-border-spin` keyframes at 6s linear infinite. The inner `::after` masks the center to reveal a 2px animated border. Tasteful and eye-catching without being garish — aligns with the AGENT-RULES directive for minimal animations.
- WCAG contrast fixes: Chip tag backgrounds lowered from 0.28 to 0.18 alpha, text switched to full-saturation category colors (#f778ba, #d2a8ff, #7ee787, #ffa657, #79b8ff). Card tags same treatment (0.25 to 0.15 alpha). These are now reliably above WCAG 3:1 for non-text elements on dark backgrounds.
- Card summary font bumped from 0.8rem to 0.85rem (13.6px at 16px base). Small but meaningful for mobile readability.

**What still falls short:**
- Hero card still has no image. The featured article uses emoji + text only. With 52% image coverage, the hero is the most prominent card that lacks a photo. This is the obvious next step.
- 48% of cards still show emoji gradients. Coverage needs to reach 70%+ to feel consistently image-rich.
- 0.65rem (10.4px) still appears once in CSS (button padding, not font-size — this is acceptable). The 0.7rem meta font in trending chips (11.2px) is borderline but tolerable.
- No dark/light theme toggle. The dark theme is well-executed but some users prefer light mode.

**Verdict:** Real images on 52% of cards is the single biggest visual upgrade across all 7 audits. The app now looks like a news app, not a template. The animated hero border adds polish. The contrast fixes are correct. This clears the bar for 8.0 — a user scrolling through would see real photos, clean typography, and proper visual hierarchy. Bumped to 8.0.

---

### 3. Mobile UX (375px) — 8.0 / 10 (v6: 7.5, +0.5)

**What improved:**
- Firebase auth button removed. No more broken interactive element in the header. No more console errors on load. No more wasted 40KB. This was v6 Rec #2 (Option B — remove it) and it was executed cleanly. The HTML contains only comments indicating where to re-add with real credentials.
- Nav pill scroll centering: `scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })` called in `activateCategory()`. When a user taps a category, the pill scrolls to center in the horizontal nav bar. This was missing since v5. Verified in main.js line 902.
- Narrow-screen form stacking: `@media (max-width: 400px)` breakpoint stacks newsletter forms vertically with full-width buttons. This prevents cramped input+button combos on small screens (iPhone SE, Galaxy S series).
- Card summary font bump to 0.85rem improves readability on mobile.

**What still falls short:**
- Still no pull-to-refresh gesture. Standard expectation for mobile news apps.
- No loading state when switching categories — skeleton is initial-load only.
- No haptic/visual feedback on card tap beyond the default link behavior.
- No "back to top" button when deep in the feed.

**Verdict:** The Firebase removal is a meaningful UX improvement by subtraction — removing a broken element is better than adding a working one in some cases. Nav pill centering fixes a longstanding usability gap. The narrow-screen stacking shows attention to the smallest viewports. Combined with real images (which improve the visual density of the mobile feed), the mobile experience now feels purposeful and polished. Bumped to 8.0.

---

### 4. Search / Filter — 7.5 / 10 (v6: 7.5, +0.0)

**What changed:**
- No structural changes to search/filter since v6. Debounce, highlighting, and deep linking remain in place and working.

**What still falls short:**
- No date range filter.
- No combined filter indicator ("Showing 5 results for 'nvidia' in Hardware").
- No autocomplete or search suggestions.
- Search doesn't persist while scrolling — top-of-page only.

**Verdict:** No changes. Holds at 7.5.

---

### 5. Navigation — 7.5 / 10 (v6: 7.5, +0.0)

**What improved:**
- Nav pill scroll centering is a navigation improvement, but it's a fix for an existing feature rather than a new capability.
- Firebase auth button removal cleans up the header — one fewer element competing for attention.

**What still falls short:**
- Still no breadcrumb or "back to home" button in list view.
- Footer is still just a credit line — no useful links, categories, or about page.
- No bookmarking / saved articles.
- No bottom navigation bar (standard pattern for mobile news apps).

**Verdict:** The nav pill centering is a genuine usability fix but was already expected functionality. The header cleanup from Firebase removal is positive but minor. The navigation structure is fundamentally unchanged. Holds at 7.5.

---

### 6. Performance — 7.5 / 10 (v6: 7.0, +0.5)

**What improved:**
- Firebase SDK removed: ~40KB gzipped savings on every page load. This was pure waste — a non-functional SDK that loaded, failed, and added latency. Removing it is a direct performance win for every mobile user on cellular.
- `loading="lazy"` on all card images. With 26 images now in the feed, lazy loading prevents them from blocking initial render. Only images in/near the viewport load immediately.
- 0.65rem font-size occurrences reduced from 3 (v6 audit) to 1 (button padding only, not font-size). Cleaner CSS.

**What still falls short:**
- No service worker, no PWA manifest, no offline support. This is a gap for mobile users with spotty connectivity.
- No minification or bundling (main.js is 1079 lines, style.css is 1245 lines). Not critical but not optimized.
- Cache-busting `?t=Date.now()` still prevents browser caching of news.json.
- No image optimization — OG images are loaded at whatever size the source provides. No srcset, no width/height attributes for CLS prevention.

**Verdict:** Firebase removal is measurable performance improvement (~40KB saved). Lazy loading on images is correct implementation for the new image feature. These are real wins. Bumped to 7.5.

---

### 7. Accessibility — 8.0 / 10 (v6: 8.0, +0.0)

**What improved:**
- WCAG contrast fixes on chip tags and card tags. Background alpha reduced, text switched to full-saturation colors. These now reliably meet WCAG 3:1 minimum for non-text UI components.
- Inactive pill count opacity fix: removed stacking `opacity: 0.7` on already-muted text. Now renders at full opacity with `var(--text-muted)` for ~7:1 contrast.

**What hasn't changed:**
- All v6 accessibility features remain: aria-live, sr-only labels, 44px tap targets, reduced-motion.
- Image alt attributes are empty (`alt=""`) with `aria-hidden="true"` on the thumb container — correct for decorative images.

**What still falls short:**
- Trending chips still lack list semantics and `aria-labelledby`.
- No skip-to-content link.
- No focus-visible ring customization (relies on browser default).

**Verdict:** The contrast fixes are genuine accessibility improvements that address specific WCAG criteria. But the scope of change is narrow — fixing colors, not adding new accessibility patterns. The existing 8.0 already accounted for good foundations. Holds at 8.0.

---

### 8. Category System — 7.5 / 10 (v6: 7.5, +0.0)

**What changed:**
- Tools keyword list expanded to 30+ terms (claude code, windsurf, replit, github copilot, tabnine, perplexity, vector database, etc.). The expanded list is comprehensive and well-chosen.
- Current distribution: Industry 20, Hardware 12, Models 10, Research 6, Tools 2.

**What still falls short:**
- Tools still has only 2 articles despite the keyword expansion. The problem is upstream — the feeds don't produce enough tool-specific content. Adding tool-focused feeds (GitHub Trending, LangChain blog) would help more than expanding keywords.
- Research dropped from 10 to 6 (likely feed cycle timing, not a structural issue).
- No multi-tagging capability.

**Verdict:** Keywords were expanded but the output is unchanged (Tools: 2). The fix targeted the classifier when the bottleneck is feed coverage. Holds at 7.5.

---

### 9. Featured Section — 7.5 / 10 (v6: 7.5, +0.0)

**What changed:**
- Animated hero border adds visual distinction to the featured card. The rotating conic-gradient border makes the hero stand out from regular cards — it signals "this is important" without overwhelming.

**What still falls short:**
- No hero image. With 52% of regular cards now having images, the hero card (the most prominent element) still shows only emoji + text. The hero should be the FIRST place to show a real image.
- "Breaking" label on every featured article regardless of recency.
- No rotation within a session.
- No quality scoring for featured selection.

**Verdict:** The animated border is a nice touch but doesn't change the fundamental limitation of no hero image. Holds at 7.5.

---

### 10. Hardware Coverage — 7.0 / 10 (v6: 7.0, +0.0)

**What changed:**
- 12 hardware articles (same as v6). Content quality appears similar.

**What still falls short:**
- No specs, benchmarks, or hardware-specific filtering.
- No dedicated hardware feeds (AnandTech AI, ServeTheHome).
- No hardware comparison features.

**Verdict:** No meaningful changes. Holds at 7.0.

---

### 11. Overall App Feel — 8.0 / 10 (v6: 7.5, +0.5)

**What a real user would think on their phone today:**

This feels like a real news app now. Scrolling through the feed, roughly every other card has a real photograph — not a placeholder emoji. The hero has a subtle animated border that catches the eye. The category tags are legible. The header is clean (no broken auth button). The newsletter signup feels like a real product feature.

The arXiv abstracts read like actual summaries instead of database dumps. The nav pills center when you tap a category. Forms stack properly on a narrow phone.

**Compared to competitors:**
- vs. Techpresso: Still behind on curation and editorial voice, but the visual gap has narrowed significantly with real images. Techpresso's emails are hand-curated; this is algorithmic but now looks professional.
- vs. Particle: Behind on source clustering and native feel, but the web app is now visually competitive for a browser-based experience.
- vs. SmartNews: Behind on personalization and offline reading, but the category system and search are solid.

A user could now open this on their phone and not immediately think "this is a student project." That is a meaningful threshold to cross. The images, the hero animation, the clean header, and the accessible color system all contribute to a cohesive, professional feel.

**What prevents 8.5:** No hero image, Tools category is empty, no pull-to-refresh, no offline support, 48% of cards still use emoji placeholders. The app does one thing (aggregate AI news) and does it well enough that a user might bookmark it — but not well enough to replace their existing news source.

**Verdict:** The combination of real images, Firebase removal, arXiv cleanup, WCAG fixes, and nav pill centering represents the most impactful improvement cycle since v3. Each change individually is modest, but together they transform the feel from "polished template" to "functional news app." Bumped to 8.0.

---

## Score Summary

| Area | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v6->v7 |
|------|-----|-----|-----|-----|-----|-----|-----|--------|
| Content Quality | 6.0 | 6.5 | 7.5 | 7.0 | 7.0 | 7.5 | 7.5 | +0.0 |
| Visual Design | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | **+0.5** |
| Mobile UX (375px) | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | **+0.5** |
| Search / Filter | 5.5 | 6.5 | 6.5 | 7.0 | 7.0 | 7.5 | 7.5 | +0.0 |
| Navigation | 5.5 | 5.5 | 6.5 | 7.5 | 7.5 | 7.5 | 7.5 | +0.0 |
| Performance | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.5 | **+0.5** |
| Accessibility | 5.0 | 6.5 | 7.0 | 7.5 | 8.0 | 8.0 | 8.0 | +0.0 |
| Category System | 6.5 | 6.5 | 7.0 | 7.0 | 7.0 | 7.5 | 7.5 | +0.0 |
| Featured Section | 6.0 | 6.0 | 6.5 | 7.0 | 7.5 | 7.5 | 7.5 | +0.0 |
| Hardware Coverage | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | 7.0 | 7.5 | 7.5 | 7.5 | 8.0 | **+0.5** |
| **OVERALL** | **6.0** | **6.5** | **7.0** | **7.2** | **7.3** | **7.5** | **7.7** | **+0.2** |

---

## Top 3 Priority Recommendations

### 1. HIGH — Hero Image + Increase OG Image Coverage to 70%+

The hero card is now the most visually underwhelming element on the page. Regular cards have real photos; the hero — the most prominent card — still shows emoji + text. This is backwards.

**Fixes:**
- In `buildHeroCard()`, add image rendering when `article.image` exists. Full-width `<img>` with `aspect-ratio: 16/9`, `object-fit: cover`, above the title. This would make the hero the most visually striking element, as it should be.
- Increase OG image coverage beyond 52%. Prioritize sources that commonly have OG images (news sites, blogs) over sources that don't (arXiv, Hacker News text posts). Consider a fallback image service (e.g., placeholder based on category) for articles without OG images.
- Add `width` and `height` attributes to card images to prevent CLS (Cumulative Layout Shift).
- **Impact:** Would push Visual Design toward 8.5, Featured Section toward 8.0, Overall toward 8.5.

### 2. HIGH — Fix Tools Category (Feed Problem, Not Keyword Problem)

Tools has had 2-3 articles for 4 audit cycles. The keyword list is now 30+ terms — the classifier is not the bottleneck. The feeds are. Hugging Face Blog and Product Hunt AI are not producing enough AI-tool-specific content that passes the relevance filter.

**Fixes:**
- Add tool-specific RSS feeds that actually publish regularly: GitHub Trending (filter to AI repos), LangChain Blog, Weights & Biases Blog, Replicate Blog, Vercel AI Blog, Simon Willison's Weblog (prolific AI tool coverage).
- Consider scraping AI tool roundup sources: Ben's Bites, The Rundown AI.
- If Tools consistently has fewer than 3 articles after new feeds, hide the section on the homepage to avoid showing a nearly-empty category.
- **Impact:** Would push Category System to 8.0, Content Quality to 8.0.

### 3. MEDIUM — PWA + Offline Support

The app has no service worker, no manifest, no offline capability. For a mobile news app that users might check on subway/commute, this is a meaningful gap. Competitors like SmartNews work offline.

**Fixes:**
- Add a `manifest.json` with app name, icons, theme color, display: standalone.
- Implement a basic service worker that caches the shell (index.html, style.css, main.js) and serves cached news.json when offline.
- Add an "Add to Home Screen" prompt or banner.
- Consider caching article images for offline reading (service worker cache with size limit).
- **Impact:** Would push Performance to 8.0, Mobile UX to 8.5, Overall toward 8.0+.

---

## What Went Well This Cycle

The team addressed all 3 v6 recommendations:

**Rec #1 (Real Images via OG Tags):** Delivered. `OGImageParser` class extracts `og:image` from article URLs. `buildCard()` renders `<img>` with `loading="lazy"` and `onerror` fallback. 26/50 articles (52%) now have real images. This was THE blocker identified in v4, v5, and v6. After 3 cycles of carrying this recommendation, it is finally implemented and it makes a visible difference.

**Rec #2 (Firebase Removal):** Delivered (Option B). Firebase SDK, auth button, and init script all removed. HTML comments mark where to re-add. FIREBASE-SETUP.md provides instructions for future implementation. ~40KB savings on every page load. No more broken UI elements.

**Rec #3 (arXiv Cleanup + Tools):** Partially delivered. arXiv abstracts are fully cleaned — regex strips metadata prefixes, all 11 arXiv articles have proper summaries. Tools keyword list expanded to 30+ terms. But Tools still has only 2 articles because the bottleneck is feed coverage, not classification. Half credit.

The overall +0.2 (7.5 to 7.7) reflects a cycle where the biggest visual blocker (no images) was finally addressed, a UX regression (broken Firebase) was corrected, and several polish items landed (WCAG contrast, nav centering, form stacking, hero animation). This is the most impactful improvement cycle since v3 (which went from 6.5 to 7.0). The app has crossed the threshold from "polished template" to "functional news app." The next phase is about depth: hero images, content breadth (Tools), and native-app capabilities (PWA/offline).

---

*Audit completed by Nigel on 2026-04-01. v7.*
