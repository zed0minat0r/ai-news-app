# Scout Report: AI News App Competitive Research

**Date:** 2026-04-01
**Agent:** Scout (Competitive Research)

---

## 1. Top AI News Aggregators — What We're Up Against

### Leading Competitors

| App | Key Strength | Takeaway for Us |
|-----|-------------|-----------------|
| **Google News** | AI-personalized feed from thousands of sources, "Full Coverage" multi-perspective feature | We need multi-source aggregation and story grouping |
| **Techpresso** | 500K+ pro readers, ML-detected hot topics + human curation | Hybrid AI + editorial curation is the gold standard |
| **Feedly + Leo AI** | Power-user RSS management, AI assistant filters/prioritizes | Offer smart filtering without requiring setup complexity |
| **Particle** | Groups coverage, writes summaries, lets users ask follow-ups | AI summaries per story cluster is a killer feature |
| **SmartNews** | Fast loading, minimal data usage, 3000+ sources | Performance matters — our app must be snappy on mobile |
| **Flipboard** | Magazine-style visual layout | Visual card-based UI works well for browsing |

### Actionable Recommendations
- **Story clustering:** Group articles about the same topic (e.g., "Claude 4.5 release") from multiple sources.
- **AI summaries:** Provide 2-3 sentence summaries for each story so users can scan quickly.
- **Speed first:** Optimize for fast load times. SmartNews won Best Mobile App 2025 largely on speed.
- **Curated categories:** Models, Hardware, Research, Tools, Industry News (already in our spec).

---

## 2. Auto-Updating Content — RSS, APIs, and Scraping

### Best Approaches for Our App

**Tier 1 — RSS Feeds (Easiest, Free, Reliable)**
- Most AI news sites provide RSS feeds that can be polled every 15-60 minutes.
- Top AI RSS feeds to integrate:
  - OpenAI Blog, Anthropic Blog, Google AI Blog, Meta AI Blog
  - MIT Technology Review AI, The Verge AI, Ars Technica AI
  - Hugging Face Blog, Papers With Code
  - TechCrunch AI, VentureBeat AI
  - NVIDIA Blog, AMD News
- Tools: Use `fetch` or `node-fetch` to pull RSS XML, parse with a library like `rss-parser`.

**Tier 2 — APIs (Structured, Reliable)**
- **NewsAPI.org** — Free tier: 100 requests/day, searchable by keyword ("artificial intelligence", "GPU", "LLM").
- **Hacker News API** — Free, no auth needed, filter for AI-related posts.
- **Reddit API** — Pull from r/MachineLearning, r/LocalLLaMA, r/artificial.
- **GitHub API** — Track trending AI repos and releases.
- **Hugging Face API** — Track new model uploads and trending models.

**Tier 3 — Web Scraping (For sources without RSS/API)**
- Use n8n or Make.com workflows to scrape and pipe into Markdown.
- Firecrawl API can extract article content as clean Markdown.
- ScrapingBee for RSS-less sites.

### Recommended Architecture
```
RSS Feeds (15-min poll) --> Parse & Deduplicate --> AI Summarize --> Store in JSON/DB --> Serve to Frontend
APIs (hourly poll)      --|
Scrape (daily)          --|
```

**For our GitHub Pages static site:** Use a GitHub Action that runs every 30 minutes, fetches RSS/API data, generates a `news-data.json` file, and commits it. The frontend reads this JSON.

---

## 3. AI Hardware & Equipment News Sources

### Must-Follow Sources

| Source | Coverage | RSS/API Available |
|--------|----------|-------------------|
| **NVIDIA Blog / GTC** | GPUs, CUDA, data center hardware | RSS available |
| **Tom's Hardware** | GPU reviews, laptop benchmarks, AI hardware | RSS available |
| **AnandTech / TechPowerUp** | Deep hardware analysis | RSS available |
| **ServeTheHome** | Server, networking, IT hardware | RSS available |
| **TechTarget SearchDataCenter** | Enterprise AI infrastructure | RSS available |
| **ScienceDaily AI** | Research breakthroughs in AI chips | RSS available |
| **The Register** | IT hardware, data center news | RSS available |
| **Ars Technica** | Technical hardware coverage | RSS available |
| **WCCFTech / VideoCardz** | GPU leaks and announcements | RSS available |

### Hot Hardware Topics to Track (2026)
- NVIDIA Blackwell & upcoming Vera Rubin architecture
- AMD Instinct MI350 series (MI355X — 4x faster than MI300X)
- Apple M5 chip with Neural Accelerators (4x AI compute vs M4)
- Thunderbolt 5 (120 Gbps) and USB4 v2
- Custom AI ASICs from Google (TPU), Amazon (Trainium), Microsoft (Maia)
- AI-enabled networking gear and edge inference devices

### Recommendation
Create a dedicated **"Hardware"** category with subcategories: GPUs, Laptops, Networking, Chips & Silicon. Hardware enthusiasts are underserved by current AI news aggregators — this is our differentiation opportunity.

---

## 4. Mobile News Feed UI — Best Practices

### Card-Based Layout (Recommended)
- Use **card UI** with image thumbnail, headline, source, timestamp, and category tag.
- Cards should be **full-width on mobile** with consistent padding.
- Alternate between **large hero cards** (top stories) and **compact list cards** (regular news).

### Category Filters
- Use a **horizontal scrollable pill/chip bar** pinned at the top (below header).
- Categories: All | Models | Hardware | Research | Tools | Industry
- Active category should have a distinct visual state (filled vs outlined).
- **Sticky positioning** — filters must stay visible during scroll.

### Infinite Scroll Implementation
- Use **Intersection Observer API** to trigger loading of next batch.
- Load **10-15 articles per batch** to balance performance and engagement.
- Show a **skeleton loader** during fetch for perceived speed.
- Include a **"Back to Top" floating button** that appears after scrolling 2+ screens.
- **Save scroll position** when user navigates away and returns.
- Consider **hybrid approach**: auto-load first 3 batches, then show "Load More" button.

### Performance
- **Lazy load images** — only load when card enters viewport.
- **Virtual scrolling** for very long feeds (recycle DOM nodes).
- Keep total DOM nodes under control to prevent memory issues on older phones.

### Key Don'ts
- No hover effects (mobile-first per AGENT-RULES).
- No tiny tap targets — minimum 44x44px for interactive elements.
- No horizontal scrolling on the main feed (only for filter chips).
- No desktop-only layouts.

---

## 5. Free APIs & Data Sources for AI Model Tracking

### Best Free Options

| Source | What It Provides | Free Tier |
|--------|-----------------|-----------|
| **Hugging Face API** | New model uploads, trending models, model cards | Free, generous limits |
| **GitHub API** | AI repo releases, stars, trending | 5,000 requests/hour (authenticated) |
| **Cloudflare Workers AI** | 10,000 free inference requests/day | Good for summarization |
| **Google Gemini API** | 500 requests/day of Gemini 2.5 Flash | For AI-powered features |
| **llm-stats.com** | Real-time LLM news and release timelines | Free to access |
| **Papers With Code API** | Research papers, benchmarks, SOTA results | Free |
| **Hacker News API** | Community-curated tech/AI news | Free, no auth |
| **foorilla/allainews_sources** | Curated list of AI/ML news sources | Open-source on GitHub |

### Model Release Tracking Strategy
1. **Hugging Face trending** — Poll daily for new models with >100 likes.
2. **GitHub releases** — Watch repos: openai, anthropics, meta-llama, mistralai, google-deepmind.
3. **llm-stats.com** — Reference for release timelines and model comparisons.
4. **Blog RSS feeds** — Direct from OpenAI, Anthropic, Google, Meta, Mistral blogs.
5. **Reddit r/LocalLLaMA** — Often first to spot new open-source releases.

---

## 6. Overall Strategic Recommendations

### Our Differentiators (What Competitors Miss)
1. **Hardware + AI Models in one place** — No current aggregator combines both well.
2. **Mobile-first design** — Most AI news sites are desktop-oriented.
3. **Auto-updating via GitHub Actions** — Zero server cost on GitHub Pages.
4. **Clean, center-aligned card UI** — Simple and scannable, not cluttered.
5. **Category-filtered feed** — Quick switching between Models, Hardware, Research, Tools, Industry.

### Technical Architecture for GitHub Pages
```
GitHub Action (every 30 min)
  ├── Fetch RSS feeds (10-15 sources)
  ├── Fetch Hugging Face trending
  ├── Fetch Hacker News top AI stories
  ├── Deduplicate by URL/title similarity
  ├── AI-summarize new articles (optional, via free API)
  ├── Categorize into Models/Hardware/Research/Tools/Industry
  ├── Write to data/news.json
  └── Commit & deploy to GitHub Pages

Frontend (Static HTML/JS)
  ├── Read news.json on load
  ├── Render card-based feed
  ├── Horizontal category filter chips
  ├── Infinite scroll with Intersection Observer
  ├── Lazy-loaded images
  └── "Last updated" timestamp
```

### Priority Order for Builder Agent
1. Set up the card-based mobile UI with category filters (static mock data first).
2. Implement GitHub Action to fetch real RSS data.
3. Add infinite scroll and lazy loading.
4. Integrate Hugging Face + HN APIs for model tracking.
5. Add AI summarization layer (Cloudflare Workers AI or Gemini Flash free tier).

---

*Report generated by Scout on 2026-04-01.*

---

## 7. Competitor Update — April 2, 2026

### New Competitor: GeoBarta

| Feature | Details |
|---------|---------|
| **Product** | AI-powered news aggregator with 60-second briefings |
| **Differentiator** | Ultra-fast AI-summarized news digests; users get caught up in under a minute |
| **Pricing** | Free plan available + affordable Pro plan for power users |
| **Threat Level** | Medium — targets general news, not AI-specific like us |

### Market Trend: Aggregators Overtaking Social Media

Reuters Institute data (April 2026) shows a significant shift:
- **39% of people** now sometimes or often avoid the news entirely
- **Search engines and aggregators (33%)** have surpassed social media as the primary gateway to online news
- This is the first time aggregators have overtaken social platforms for news discovery

### Implications for AI Pulse
1. **Growing market** — News aggregators are becoming the default discovery channel, validating our approach.
2. **Speed matters more than ever** — GeoBarta's 60-second briefing model shows users want ultra-fast consumption. We should prioritize AI summaries.
3. **News fatigue is real** — 39% avoidance rate means we must curate ruthlessly. Quality over quantity. Don't overwhelm users.
4. **AI-specific niche is defensible** — General aggregators (GeoBarta, Google News, Feedly) serve broad audiences. No one owns AI-focused news aggregation on mobile yet.

### MCP Dev Summit (April 2-3, NYC)
The Agentic AI Foundation's first MCP Dev Summit is happening today with 95+ sessions. Key signal: the agentic AI ecosystem is formalizing rapidly around open standards (MCP, AGENTS.md, goose). This is a major content category for our app — enterprise agentic deployments will be a recurring news theme throughout 2026.

*Updated by Scout on 2026-04-02.*

---

## 8. PWA Best Practices for News Apps

**Date:** 2026-04-01

### Why PWA Matters for AI Pulse
As a GitHub Pages-hosted web app, going PWA gives us native-app-like capabilities at zero cost — offline reading, home screen install, and push notifications — without app store friction.

### Service Worker Strategy

| Strategy | Use Case | When to Use |
|----------|----------|-------------|
| **Cache-First** | Static assets (CSS, JS, icons, fonts) | Assets that rarely change |
| **Network-First** | API responses, `news.json` feed data | Dynamic content that must be fresh |
| **Stale-While-Revalidate** | Article images, thumbnails | Instant load + silent background update |

**Implementation priority:**
1. Precache the app shell (HTML, CSS, JS, icons) during SW install — keep it lean to avoid delaying activation.
2. Use network-first for `news.json` so users always see the latest feed when online.
3. Fall back to cached `news.json` when offline so the app still works.
4. Cache article images on demand (runtime caching) with stale-while-revalidate.

### Install Prompt Best Practices
- Provide a complete `manifest.json` with: name, short_name, icons (192px + 512px), display: "standalone", theme_color, background_color, start_url.
- HTTPS is required (GitHub Pages provides this).
- Do NOT show the install prompt immediately — wait until the user has engaged (e.g., visited 3+ times or scrolled the feed).
- Use a custom in-app banner ("Add AI Pulse to your home screen for instant access") instead of relying on the browser's default prompt.

### Push Notifications for News
- Use the Push API + Notifications API via service workers.
- iOS 16.4+ now supports PWA push, but only after the user installs the PWA to their home screen.
- **Permission strategy:** Never ask on first visit. Show a custom pre-prompt explaining value: "Get notified when major AI models drop."
- **Segmentation:** Let users choose notification categories (e.g., "Only Models" or "Only Hardware").
- Track: permission grant rate, open rate, click-through rate, unsubscribe rate.

### Offline Experience
- Show a custom offline page with cached articles instead of the browser's "no internet" error.
- Display a subtle "You're offline — showing cached content" banner.
- Cache the last 20-30 articles for offline reading.

### Actionable Recommendations for Builder
1. Add `manifest.json` and register a service worker.
2. Implement cache-first for app shell, network-first for feed data.
3. Add a custom install banner after 3rd visit.
4. Build an offline fallback page with cached articles.
5. Push notifications can be Phase 2 (requires a push server like web-push npm package).

---

## 9. News App Monetization Strategies (Future Planning)

**Date:** 2026-04-01

### Monetization Models Ranked by Fit for AI Pulse

| Model | Revenue Potential | User Impact | Difficulty | Recommended Phase |
|-------|------------------|-------------|------------|-------------------|
| **Freemium (Free + Premium tier)** | High | Low | Medium | Phase 2 |
| **Sponsored Content / Native Ads** | Medium-High | Medium | Low | Phase 2 |
| **Newsletter Sponsorships** | Medium | Low | Low | Phase 1 |
| **Affiliate Links** | Medium | Low | Low | Phase 1 |
| **Display Ads (Programmatic)** | Low-Medium | High (intrusive) | Low | Avoid early on |
| **Donations / Tip Jar** | Low | None | Very Low | Phase 1 |

### Recommended Approach: Hybrid Freemium

**Free Tier (default):**
- Full news feed access
- All categories
- Ad-supported (native ads, not banner ads)

**Premium Tier ($5-8/month or $50-70/year):**
- Ad-free reading experience
- AI-powered daily briefing email
- Early access to new features
- Exclusive "deep dive" content or weekly AI hardware roundups
- Custom notification preferences

**Key Insight:** The Guardian model works — free ad-supported access with voluntary premium subscriptions. About 60% of The Guardian's revenue comes from this hybrid approach. Annual plans have lower churn than monthly, but monthly plans convert more easily.

### Low-Effort Phase 1 Revenue Streams
1. **Affiliate links** — Link to AI hardware (GPUs, laptops) on Amazon/Newegg with affiliate tags. Hardware articles naturally drive purchase intent.
2. **Newsletter sponsorships** — If we add a weekly AI digest email, sponsors pay $50-500+ per issue depending on list size.
3. **"Buy Me a Coffee" / GitHub Sponsors** — Simple donation link for supporters.

### Sponsored Content Guidelines
- Clearly label all sponsored content as "Sponsored" or "Partner Content."
- Native ads should match the card format but be visually distinct (subtle "Ad" badge).
- Limit to 1 sponsored card per 10 organic cards to maintain trust.
- Personalization can boost ad revenue and subscription conversion by up to 50% (McKinsey data).

### What to Avoid
- Interstitial ads (full-screen pop-ups) — kills mobile UX.
- Paywalling core news content — defeats the purpose of an aggregator.
- Too many ad placements early on — build audience first, monetize later.

---

## 10. Reading Experience Features

**Date:** 2026-04-01

### Must-Have Reading Features for AI Pulse

#### Dark/Light Mode Toggle
- Implement a theme toggle (sun/moon icon) in the header.
- Support three modes: **Light**, **Dark**, and **System** (follow OS preference).
- Use CSS custom properties (variables) for easy theming.
- Persist user preference in `localStorage`.
- Dark mode is not optional in 2026 — Chrome just redesigned its Android reading mode with dark theme support.

#### Text Size Controls
- Offer 3-5 text size presets (Small, Default, Large, Extra Large).
- Use relative units (`rem`) so scaling is consistent.
- Persist preference in `localStorage`.
- Consider a simple A/A+ button in the article view.

#### Reading Time Estimates
- Display estimated reading time on each card (e.g., "3 min read").
- Calculate based on ~200-250 words per minute average.
- Helps users pick articles that fit their available time — a key engagement driver.
- Show reading time alongside the source and timestamp.

#### Save for Later / Bookmarks
- Allow users to bookmark articles with a single tap (bookmark icon on each card).
- Store bookmarks in `localStorage` (no backend needed for Phase 1).
- Add a "Saved" tab or filter to access bookmarked articles.
- Sync across devices would require user accounts (Phase 2).
- Top read-later apps in 2026 (Omnivore, Readwise Reader, Pocket, Instapaper) all emphasize clean, distraction-free reading — we should match that quality.

#### Reader View
- For article detail pages, strip clutter and show clean typography.
- Adjustable line spacing and font family (sans-serif default, serif option).
- Full-width reading area on mobile with generous padding.

### Implementation Priority for Builder
1. Dark/Light/System mode toggle (high impact, moderate effort).
2. Reading time on cards (high impact, low effort — just word count math).
3. Save for Later with localStorage (high impact, moderate effort).
4. Text size controls (medium impact, low effort).
5. Reader view (medium impact, higher effort — Phase 2).

---

## 11. Social & Community Features

**Date:** 2026-04-01

### The 2026 Landscape: Key Trends

- **Comments are declining** on most platforms — TikTok (-24% YoY), Instagram (-20% YoY). Facebook is the exception (+20% YoY).
- **Private communities** are growing — users migrating to niche groups on Discord, Slack, and Facebook Groups.
- **Reactions outperform comments** — lower friction, higher participation rate.
- **Community features boost retention 2.7x** according to engagement research.
- **AI-curated feeds** (like Pinterest's "Boards made for you") are becoming the standard.

### Recommended Social Features for AI Pulse

#### Phase 1 — No Backend Required
| Feature | Implementation | Effort |
|---------|---------------|--------|
| **Share buttons** | Native Web Share API (mobile) + copy link fallback | Low |
| **Reaction emoji** | Quick tap reactions (fire, rocket, mind-blown) stored in localStorage for UI state; actual counts optional | Low |
| **Share count display** | Can use free APIs or estimate from social platforms | Low |
| **"Trending" badge** | Algorithmically tag articles with high click-through as "Trending" | Low |

#### Phase 2 — Requires Backend / Auth
| Feature | Implementation | Effort |
|---------|---------------|--------|
| **Comments** | Use a lightweight embed like Giscus (GitHub Discussions-backed) or Disqus | Medium |
| **Upvote / Downvote** | Hacker News-style voting to surface best articles | Medium |
| **User profiles** | Simple profiles with saved articles and reading history | High |
| **Community curation** | Let users submit AI news links for community voting | High |

#### Phase 3 — Advanced
| Feature | Implementation | Effort |
|---------|---------------|--------|
| **Gamification** | Reading streaks, badges ("Read 7 days straight"), leaderboards | High |
| **Discussion threads** | Threaded conversations per article | High |
| **User-submitted news** | Reddit-style community submissions with moderation | High |

### Share Implementation (Phase 1 Priority)
- Use the **Web Share API** (`navigator.share()`) which provides the native OS share sheet on mobile.
- Fallback: Copy-to-clipboard button for desktop browsers.
- Pre-fill share text: "Check out this AI news on AI Pulse: [title] [url]"
- Track share events for analytics.

### Why NOT to Over-Invest in Comments Early
- Comment systems require moderation (spam, toxicity).
- Low-traffic apps get empty comment sections, which look worse than no comments at all.
- Better to start with reactions (low friction) and add comments once there's an active user base.
- If we do add comments, **Giscus** (free, GitHub Discussions-backed) is ideal for a GitHub Pages app.

### Actionable Recommendations for Builder
1. Add Web Share API share button to each card (Phase 1, easy win).
2. Add quick-tap emoji reactions on cards (Phase 1, fun and engaging).
3. Add a "Trending" badge based on click-through data (Phase 1).
4. Defer full comments to Phase 2 — use Giscus when ready.
5. Consider a Discord community link for deeper discussion (zero development cost).

---

*Report updated by Scout on 2026-04-01 — Sections 8-11 added covering PWA, Monetization, Reading Experience, and Social Features.*
