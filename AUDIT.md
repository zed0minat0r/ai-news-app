# AI Pulse — Audit Report v4

**Auditor:** Nigel (Strict Auditor)
**Date:** 2026-04-01
**Perspective:** Mobile user (375px viewport)
**Live Site:** https://zed0minat0r.github.io/ai-news-app/
**Previous Audits:** v1 — 6.0, v2 — 6.5, v3 — 7.0

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

### 1. Content Quality — 7.0 / 10 (v3: 7.5, -0.5)

**What improved:**
- AI relevance filter added in `fetch_news.py`: `is_ai_related()` with 30+ AI-specific keywords. Articles must either score 2+ on category keywords OR pass a strict AI relevance check. Articles scoring 0 on all keyword lists with no AI relevance are now rejected (`return None`). This directly addresses v3 Rec #1.
- The filter catches some obvious misses — pure gaming deals, SSD reviews, and DRM stories that plagued v3.
- The `categorize()` function now returns `None` instead of defaulting to "industry," which is the correct structural fix.

**What still falls short:**
- The filter is not aggressive enough. Current news.json still contains clearly non-AI articles that slipped through: "Amazing $490 Newegg combo" (a CPU/RAM deal, not AI), "Modders use jumper wires to save a damaged RTX 4090" (GPU repair, not AI), "DRAM prices predicted to jump 63%" (memory market, not AI), "PC makers report surging prices" (PC market, not AI), "Gigabyte X870E Aorus Xtreme AI Top motherboard review" (motherboard review — the word "AI" in the product name tricks the filter).
- By my count, ~10 of 50 articles (20%) are not genuinely AI-related. Down from 28% in v3, but still too high.
- Category distribution is badly skewed: Industry 18, Hardware 16, Models 12, Tools 3, Research 1. Research and Tools are starved. Only 1 research article in the entire feed is alarming.
- The featured article is "Create, edit and share videos at no cost in Google Vids" — categorized as "industry." This is a Google Workspace product update, not AI news. The "featured = newest" heuristic continues to surface weak stories as the hero.
- Hacker News "Show HN:" posts still leak through (3 in current feed). These are fine individually but dilute the curated feel.
- Summary truncation at 200 chars still creates abrupt cutoffs.

**Verdict:** The AI relevance filter is the right structural fix and addresses v3 Rec #1 directly. But execution is insufficient — the keyword list is too easily fooled by product names containing "AI" and generic hardware terms. Dropping to 7.0 because the current featured article being off-topic is worse than v3 (where the featured article was at least tech-adjacent). The filter improvement is real but doesn't clear the bar for the 7.5 it held in v3 given the current state of news.json.

---

### 2. Visual Design — 7.5 / 10 (v3: 7.0, +0.5)

**What improved:**
- The layout rebuild from infinite card feed to organized homepage is a significant visual upgrade. Hero banner at top, trending bar, then 5 category sections each with 3 cards — this creates visual hierarchy that the flat infinite scroll never had.
- Gradient accent underlines on section titles (`section-title::after` with gradient from `--accent` to `#a371f7`) add subtle polish.
- Category accent bars on card left borders (3px solid in category color) provide instant visual categorization. Color-coding per category (models=purple, hardware=green, research=orange, tools=blue, industry=pink) is consistent throughout trending chips, card tags, and thumbnails.
- Card depth improved: `box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)` with inner shadow on thumbnails plus a subtle highlight overlay (`::after` gradient). Cards now have a sense of material depth.
- Trending bar as a contained section with dark background, rounded corners, and horizontal scroll chips is visually distinct from the card grid. Good information density.
- Category sections with headers + "See all" buttons create a structured, magazine-style layout.

**What hasn't changed:**
- Still emoji-on-gradient thumbnails, not real images. This remains the single biggest visual gap vs. competitors (Particle, SmartNews, Techpresso all use real article images).
- Lightning bolt logo is still generic.
- No hero image on the featured card despite visual upgrades.

**Verdict:** The layout rebuild is the single biggest visual improvement since the project began. Moving from a flat infinite feed to an organized homepage with hero + trending + category sections creates a sense of editorial curation. This is the kind of layout a real news app uses. The gradient accents, card depth, and color-coded categories are all additive. Bumped to 7.5 — visually, this now resembles a real news app rather than a card dump. Still capped because no real images.

---

### 3. Mobile UX (375px) — 7.5 / 10 (v3: 7.0, +0.5)

**What improved:**
- Homepage layout works well at 375px. Hero card is full-width with centered text, trending bar scrolls horizontally with snap points (`scroll-snap-type: x mandatory`), category sections stack naturally as single-column grids.
- Trending chips are 240px wide at mobile, creating a natural 1.5-visible pattern that invites horizontal swiping. Scrollbar hidden via `-webkit-scrollbar: display: none` and `scrollbar-width: none`.
- "See all" buttons on category sections provide clear navigation intent — tap to drill into a category. These have 44px min-height for proper tap targets.
- List view (triggered by category selection or search) shows 12 cards + "Load more" button with remaining count. This solves the v3 problem of the page getting too long with 50 articles. Load More button has 44px min-height.
- Sort toggle ("Newest first" / "Oldest first") gives users control in list view. Proper 36px min-height button.
- Cards have `:active` state (`transform: scale(0.98)` + accent border) providing immediate tap feedback.
- Category nav is sticky (`position: sticky; top: 0; z-index: 100`) with horizontal overflow scroll — always accessible.

**What still falls short:**
- No pull-to-refresh, no swipe gestures. Still doesn't feel native on mobile.
- No loading state / skeleton when `loadArticles()` fetches news.json. Fallback articles render first, then get replaced — content shift is still present.
- Search is still top-of-page only — no persistent search while scrolling.
- Trending bar has no visual scroll indicators (dots, arrows, or fade edges) to signal more content is available beyond the visible area.
- Back-to-top appears after 2 screen heights of scrolling — this threshold may be too high on the new homepage layout where most content is above that point.

**Verdict:** The homepage layout with hero + trending + category sections is a much better mobile experience than an infinite card feed. The horizontal trending scroll, "See all" navigation, and load-more pagination all show mobile-aware thinking. Bumped to 7.5. Still not at 8.0 because no pull-to-refresh, no loading states, and no scroll indicators on the trending bar.

---

### 4. Search / Filter — 7.0 / 10 (v3: 6.5, +0.5)

**What improved:**
- Switching to a category (or searching) now transitions from homepage view to list view. This is a meaningful UX improvement: the homepage is for browsing, the list view is for finding. The two modes serve different user intents.
- Sort toggle added: users can switch between "Newest first" and "Oldest first" in list view. Simple but useful — the first time users have any control over article ordering.
- Load More pagination (12 articles per page + button showing remaining count) prevents overwhelming long lists. This was a v3 concern.
- List view title dynamically changes: "Search Results" when searching, "Latest in [Category]" when filtering. Good context.

**What still falls short:**
- No search highlighting in results.
- No debounce on search input (fires every keystroke).
- No deep linking (`?category=hardware&q=nvidia`) — can't share filtered views.
- No date range filter (Today / This Week / This Month).
- No combined filter indicator showing active filters.
- Sort only available in list view, not on homepage.

**Verdict:** The sort toggle and view-mode switching are real functional additions. Combined with Load More pagination, search/filter now feels structured rather than just "type and filter." Bumped to 7.0. Still needs deep linking and date filtering to reach 7.5.

---

### 5. Navigation — 7.5 / 10 (v3: 6.5, +1.0)

**What improved:**
- The homepage-to-list-view transition creates a proper navigation model. "All" = homepage with hero/trending/sections. Any category = filtered list view. Search = search results list. Back to "All" = homepage again. This is how news apps work.
- "See all" buttons on each category section create clear drill-down navigation from homepage to category list. This is the biggest nav improvement — users can scan headlines across all categories and drill into any one.
- Sticky category nav bar means users always have category access. Combined with the homepage layout, this creates a two-level navigation: browse (homepage) and drill (list view).
- Smooth scroll to top on category change (`window.scrollTo({ top: 0, behavior: "smooth" })`) prevents disorientation.

**What still falls short:**
- No "Saved" / "Read Later" / bookmarking.
- No date filter (Today / This Week / This Month).
- No deep linking / URL query parameters.
- Footer is still just a credit line — no useful navigation.
- No breadcrumb or back button when in list view (have to tap "All" pill to return to homepage).
- Trending section is still just "newest 5" — not actually trending by engagement.

**Verdict:** The homepage-to-list-view navigation model is a proper app-level improvement. "See all" drill-downs, sticky category bar, and view-mode switching give users clear paths through the content. This is the biggest jump of any section this cycle. Bumped to 7.5.

---

### 6. Performance — 7.0 / 10 (v3: 7.0, +0.0)

**What changed:**
- Homepage now renders a smaller initial set: 1 hero + 5 trending chips + 15 cards (3 per category) = ~21 DOM elements vs. the previous 50-card dump. This is a meaningful reduction in initial DOM complexity.
- List view caps at 12 cards + Load More, so even when drilling into a category, the DOM stays manageable.

**What hasn't changed:**
- Still zero external JS dependencies. Single HTML + CSS + JS files. Google Fonts the only external resource.
- No service worker, no PWA manifest, no lazy loading.
- No minification or bundling.
- Cache-busting `?t=Date.now()` on every news.json fetch — no browser cache benefit.

**Verdict:** The smaller initial DOM is a subtle performance win, but fundamentally the app is the same weight. Holds at 7.0.

---

### 7. Accessibility — 7.5 / 10 (v3: 7.0, +0.5)

**What improved:**
- Cards restructured as `<article>` elements with links only on the `<h3>` title (via `.card-link` class). Share buttons are now siblings inside `.card-footer`, NOT nested inside anchors. This fixes the v3 Rec #3 invalid-HTML issue (button-inside-anchor). The `card-link::after` pseudo-element stretches over the card for click area. Correct implementation.
- Hero card is an `<article>` with `aria-labelledby="hero-title"`. The link is only on the `<h2>` title text. Share button is a sibling in `.hero-footer`. Same correct pattern.
- Semantic sections in HTML: `<section id="hero-section" role="region" aria-label="Featured story">`, `<section id="trending-bar" role="region" aria-labelledby="trending-title">`, `<section id="news-section" role="region" aria-labelledby="news-title">`. These were specifically called out in v3 Rec #3.
- Category sections generated by JS use `role="region"` and `aria-label="Latest in [Category]"` on each `<section>`. Good dynamic accessibility.
- Skip-to-content link now targets `#main-content` (the `<main>` element). Correct target.

**What still falls short:**
- Trending chips are still `<a>` tags wrapping all content (tag + title + meta). No `aria-labelledby` pointing to just the title. Screen readers read everything as one long link.
- Trending bar has no `<ol>` structure despite being a ranked/ordered list of top headlines.
- Category section card grids (`cat-card-grid`) have no list semantics.
- `estimateReadTime()` calculates read time from the 200-char summary, multiplied by 5 — this is a rough heuristic that may produce inaccurate estimates. Not an a11y issue per se, but misleading information.
- Sort toggle does not announce the new sort order to screen readers (no `aria-live` or announcement).

**Verdict:** The button-inside-anchor fix and semantic sections directly address v3 Rec #3. Cards are now proper `<article>` elements with link-on-title pattern. This is a genuine structural improvement. Bumped to 7.5. Trending chips still need work.

---

### 8. Category System — 7.0 / 10 (v3: 7.0, +0.0)

**What improved:**
- Each category now has a dedicated section on the homepage with icon, label, 3 cards, and "See all" button. Categories are visually differentiated by color throughout (pills, tags, card borders, thumbnails). This is the first time categories feel like first-class navigation.
- "See all" triggers filtered list view for that category. Proper drill-down.

**What still falls short:**
- Distribution is still heavily skewed: Industry 18, Hardware 16, Models 12, Tools 3, Research 1. The Research section shows just 1 card. Tools shows 3. Both feel anemic compared to Industry's 18.
- Auto-categorization accuracy is still questionable. "Modders save a damaged RTX 4090" is "hardware" but has nothing to do with AI. "Casanova invents an LLM as a grift in the 18th century" is categorized as "models" — it's a historical curiosity, not an AI model story. "Live and Let AI: Former CIA officer" is "models" — it mentions LLM but is really an industry opinion piece.
- No multi-tagging — articles belong to exactly one category.
- The "default to industry" fallback is gone (good) but the AI relevance filter is too loose, so industry and hardware still get inflated.

**Verdict:** The homepage category sections are a great visual and navigational improvement. But the underlying categorization accuracy hasn't meaningfully improved — the same types of misclassified articles persist. Holds at 7.0. The presentation is better; the data quality is not.

---

### 9. Featured Section — 7.0 / 10 (v3: 6.5, +0.5)

**What improved:**
- The hero banner is now a proper full-width section at the top of the homepage with distinctive styling: gradient background (`linear-gradient(135deg, #1a1f2e, #1e2640, #1a1f2e)`), accent border, glow shadow (`box-shadow: 0 0 30px var(--accent-glow)`), gradient top bar, large emoji icon, and "Breaking" label. It commands attention.
- Hero card uses `<article>` with `aria-labelledby="hero-title"`, link on title only. Semantically correct.
- Reading time estimate added.
- Visually, the hero is now genuinely distinct from regular cards — different background, different layout, different scale. On a phone, it reads as the lead story.

**What still falls short:**
- Current featured article is "Create, edit and share videos at no cost in Google Vids" — a Google Workspace update, not AI news. The "featured = newest" heuristic selects the most recent article from news.json regardless of quality or relevance.
- Still says "Breaking" for every featured article, even when it's days-old or a routine product update.
- No editor's pick or quality signal — purely recency-based.
- No rotation within a session.

**Verdict:** The hero banner is now visually impressive and structurally sound. On a phone, it looks like the lead story of a real news app. Bumped to 7.0. Still hampered by the fact that the "featured" article might not be worth featuring. The hero is a great container with mediocre content selection.

---

### 10. Hardware Coverage — 7.0 / 10 (v3: 7.0, +0.0)

**What changed:**
- Hardware has 16 articles (up from 15 in v3). Sources include NVIDIA Blog, Tom's Hardware, and Hacker News. Genuine AI hardware stories like NVIDIA/Marvell partnership, AI chip export rules, Chinese chip suppliers filling NVIDIA gaps, Cognichip AI chip design.
- The homepage hardware section shows the 3 newest hardware stories with "See all" to view all 16.

**What still falls short:**
- Several hardware articles are not AI-hardware: "Amazing $490 Newegg combo" (gaming PC deal), "Modders save RTX 4090" (GPU repair), "DRAM prices predicted to jump 63%" (memory market), "PC makers report surging prices" (PC market), "Nvidia App adds auto shader compilation" (gaming feature).
- No specs, benchmarks, comparison features, or hardware-specific filtering (by GPU gen, manufacturer, etc.).

**Verdict:** Same structural issues. Hardware Spotlight was removed in favor of the category section approach, which is cleaner. But the content quality within hardware remains mixed. Holds at 7.0.

---

### 11. Overall App Feel — 7.5 / 10 (v3: 7.0, +0.5)

**What a real user would think on their phone today:**

Opening AI Pulse on a phone now feels meaningfully different from v3. Instead of a flat wall of cards, you see a hero story at top, then a trending bar you can swipe through, then organized sections for each category — Models, Hardware, Research, Tools, Industry — each showing 3 cards with a "See all" button. This is a proper news homepage layout. It looks like SmartNews or Apple News in structure, even if the visual fidelity (emoji thumbnails vs. real images) is still a tier below.

Tapping a category pill switches to a filtered list with sort options and Load More pagination. This is a proper two-mode app: browse on the homepage, drill into categories for depth. The navigation feels intentional.

The content quality is the weak link. A user expecting AI news will see "Amazing $490 Newegg combo" in the Hardware section and "Create, edit and share videos at no cost in Google Vids" as the hero — neither is AI news. The Research section has just 1 article. These gaps erode the curated feel that the layout works hard to create.

Compared to v3's infinite card feed, this is a meaningful step toward feeling like a real news product. Compared to Techpresso (curated newsletter with real images) or Particle (multi-source clustering), this is still behind on content quality and visuals. But the structural gap has narrowed considerably.

**Verdict:** The layout rebuild from infinite feed to organized homepage is the most impactful UX change since the RSS pipeline in v3. A user would recognize this as a news app layout, not a dev project. Bumped to 7.5. To reach 8.0, needs real article images and better content filtering.

---

## Score Summary

| Area | v1 Score | v2 Score | v3 Score | v4 Score | v3->v4 Change |
|------|----------|----------|----------|----------|---------------|
| Content Quality | 6.0 | 6.5 | 7.5 | 7.0 | **-0.5** |
| Visual Design | 6.5 | 7.0 | 7.0 | 7.5 | **+0.5** |
| Mobile UX (375px) | 6.0 | 6.5 | 7.0 | 7.5 | **+0.5** |
| Search / Filter | 5.5 | 6.5 | 6.5 | 7.0 | **+0.5** |
| Navigation | 5.5 | 5.5 | 6.5 | 7.5 | **+1.0** |
| Performance | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Accessibility | 5.0 | 6.5 | 7.0 | 7.5 | **+0.5** |
| Category System | 6.5 | 6.5 | 7.0 | 7.0 | +0.0 |
| Featured Section | 6.0 | 6.0 | 6.5 | 7.0 | **+0.5** |
| Hardware Coverage | 7.0 | 7.0 | 7.0 | 7.0 | +0.0 |
| Overall App Feel | 5.5 | 6.0 | 7.0 | 7.5 | **+0.5** |
| **OVERALL** | **6.0** | **6.5** | **7.0** | **7.2** | **+0.2** |

---

## Top 3 Priority Recommendations

### 1. CRITICAL — Real Article Images via Open Graph

Still the single biggest visual gap and now the #1 priority since the layout rebuild makes it more obvious. The organized homepage with hero + category sections is screaming for real images. Every competitor uses them.

**Fixes:**
- In `fetch_news.py`, after fetching RSS, make a GET request to each article URL and extract the `og:image` meta tag. Store it as an `image` field in news.json.
- In `buildCard()` and `buildHeroCard()`, if `article.image` exists, render an `<img>` tag with `loading="lazy"` and `aspect-ratio: 16/9` instead of the emoji.
- Keep emoji gradient as fallback when no OG image is available.
- Add a hero image to the featured card — the full-width hero banner is the perfect place for a real image.
- This would push Visual Design from 7.5 toward 8.5 and Overall App Feel toward 8.0.

### 2. CRITICAL — Tighten Content Filtering (AI Relevance Still Leaking)

The AI relevance filter was the right structural fix but needs refinement. ~20% of articles are still not AI-related.

**Fixes:**
- Add a negative keyword list that rejects articles matching common false positives: "gaming deal," "SSD review," "PC build," "motherboard review," "game list," "price drop," "bundle deal," "modding," "overclock." If an article matches a negative keyword AND has a low AI-relevance score (< 2), reject it.
- Raise the category keyword threshold from 2 to 3 for general tech sources (Tom's Hardware, Ars Technica) where false positives are most common.
- The featured article heuristic needs a quality gate: only mark an article as featured if it scores 3+ on AI keyword relevance. Otherwise skip to the next-newest.
- Fix the Research/Tools drought: consider adding AI-specific research feeds (arXiv AI, Semantic Scholar trending, Papers With Code).
- This would push Content Quality back to 7.5+ and improve Category System balance.

### 3. HIGH — Loading States and Scroll Indicators

The app now has enough structure that missing polish moments are noticeable.

**Fixes:**
- Add a skeleton loading state for the homepage: gray placeholder boxes for hero, trending chips, and category cards. Show while `loadArticles()` is in flight. This prevents the content shift from fallback to live data.
- Add fade edges or dot indicators on the trending bar to signal horizontal scroll availability. Without them, users may not realize there are more chips to swipe.
- Add an `aria-live` announcement when sort order changes.
- Consider a subtle progress bar or spinner when fetching news.json.
- This would push Mobile UX from 7.5 toward 8.0.

---

## What Went Well This Cycle

The layout rebuild is the defining change of v4. Credit where due:

- The transition from infinite card feed to organized homepage (hero + trending + category sections + list view) is a proper product-level improvement. This is the kind of layout SmartNews, Apple News, and Google News use.
- Cards restructured as `<article>` elements with link-on-title pattern fixes the v3 button-inside-anchor issue. Semantic HTML with `role="region"` and `aria-labelledby` on all sections.
- Sort toggle, Load More pagination, and "See all" drill-downs add real user control.
- AI relevance filter in the RSS fetcher, while imperfect, is the right approach.
- Category accent bars, gradient section dividers, and card depth polish raise visual quality.
- Reading time estimates on cards add useful metadata.

The overall +0.2 (7.0 to 7.2) is modest because the gains in layout/navigation are offset by a content quality regression (the featured article being off-topic, skewed category distribution, and still-leaky filtering). The app looks and navigates significantly better; the data feeding it needs more work.

Navigation (+1.0) is the biggest mover — the homepage-to-list-view model with "See all" drill-downs is a genuine app-level navigation pattern. Visual Design, Mobile UX, Search/Filter, Accessibility, and Featured Section all gained +0.5.

To reach 7.5+ overall, the team needs real article images (Rec #1) and tighter content filtering (Rec #2). To reach 8.0, add those plus loading states, deep linking, and a PWA manifest.

---

*Audit completed by Nigel on 2026-04-01. v4.*
