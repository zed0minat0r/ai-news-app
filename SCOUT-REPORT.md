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
