# Changelog

## 2026-04-01 — v1.0.0 — Initial Launch

### Added
- Complete AI news aggregator web app (index.html, style.css, main.js)
- Dark theme with gradient accent colors and modern typography (Inter font)
- Mobile-first responsive layout: 1-col mobile, 2-col tablet (640px+), 3-col desktop (960px+)
- Category filter pills: All, Models, Hardware, Research, Tools, Industry
- Featured/Breaking story section with accent border glow
- Dedicated Hardware Spotlight section
- Real-time keyword search across titles, summaries, sources, and categories
- 21 real AI news articles sourced from current reporting (March-April 2026)
- "Last updated" timestamp
- Auto-update stub (fetchLatestArticles) ready for API integration
- All content center-aligned on mobile per AGENT-RULES
- Sticky category navigation bar
- Cards link to original source articles

## 2026-04-01 — v1.1.0 — Category Accent Bars

### Added (Spark)
- Category-colored left accent bars on all news cards (models=purple, hardware=green, research=orange, tools=blue, industry=pink)
- Subtle card depth shadow for a more polished, professional feel
- Cards now carry data-category attribute for CSS-driven styling

## 2026-04-01 — v1.2.0 — Fresh Stories + Back to Top

### Added (Builder)
- 8 new AI news articles (IDs 22-29) from real sources covering the last 24-48 hours:
  - GPT-5.4 native computer-use launch (OpenAI)
  - Claude Mythos 5 with 10T parameters (Anthropic)
  - Gemini 3.1 Flash Live real-time voice (Google DeepMind)
  - Huawei 950PR AI inference chip (Hardware)
  - Together AI Aurora RL framework (Tools)
  - Liquid AI LFM2.5-350M tiny agentic model (Models)
  - Q1 2026 AI venture funding record $297B (Industry)
  - Rebellions $400M raise for Korean AI chips (Hardware)
- Floating "Back to Top" button (Scout recommendation: Section 4 - Infinite Scroll UX)
  - Appears after scrolling 2+ screens
  - Smooth-scrolls to top on tap
  - 48x48px touch target per mobile-first guidelines
  - Fade + slide animation on show/hide

## 2026-04-01 — Mobile Audit (Pixel)

### Fixed
- Category pills enlarged to 44px min-height tap targets (was ~32px, flagged by Nigel)
- Category pill font bumped from 0.8rem to 0.875rem for readability
- Search input font-size raised to 1rem (16px) to prevent iOS auto-zoom on focus
- Card tag font-size bumped from 0.65rem to 0.7rem with better padding
- Featured label font-size bumped from 0.65rem to 0.7rem
- Card meta font-size raised from 0.72rem to 0.75rem
- Added overflow-x:hidden and overflow-wrap:break-word on body to prevent horizontal scroll at 375px

## 2026-04-01 — v1.1.0 — Refiner: Visual & Accessibility Polish

### Added
- Category-themed gradient thumbnail images with emoji icons on every card (models, hardware, research, tools, industry)
- Search clear button (x) to quickly reset search input
- Live result count display below search bar (e.g. "5 results found")
- `aria-pressed` attribute on all category pill buttons, toggled on selection
- `role="status"` on no-results message for screen reader announcements
- Visible focus indicators (`focus-visible`) on all interactive elements (buttons, links, inputs)
- Search input icon (magnifying glass)

### Fixed
- Muted text color bumped from #8b949e to #9ca3af to pass WCAG AA contrast ratio on dark background
- Search input now has proper padding for icon and clear button

## [0.5.0] — 2026-04-01 (Spark)

### Added
- Alternating hero card layout: every 5th card in the grid uses a horizontal thumbnail-left/content-right layout that spans the full grid width, breaking visual monotony and creating rhythm in the feed
- Hero cards scale gracefully across breakpoints (stacked on very small screens, side-by-side on 380px+, wider thumbnails on tablet/desktop)

### Fixed
- Muted text contrast bumped from #9ca3af to #adb5bd for stronger WCAG AA compliance on dark backgrounds (addresses Audit recommendation #3)
- Muted text color adjusted to #9ca3af for improved WCAG contrast ratio

## [0.6.0] — 2026-04-01 (Builder — Cycle 2)

### Added
- 8 new AI news stories (IDs 30-37): NVIDIA $1T forecast, Apple Siri overhaul, Oracle layoffs for AI, Amazon exascale campus, AI midterm politics, GTC agentic shift, Gemini Flash-Lite, Texas TRAIGA Act
- All new stories sourced from real URLs published March 31 – April 1, 2026

### Fixed
- Back-to-top button: footer now has `position: relative; z-index: 1` so the fixed button (z-index: 1000) is no longer blocked by footer pointer events on mobile

## [0.6.1] — 2026-04-01 (Pixel — Mobile Audit)

### Fixed
- Hero cards (every 5th) now stack vertically and center-align on viewports under 480px (was 379px), fixing left-aligned layout on standard 375px iPhones
- Hero card category tag now `justify-self: center` in stacked mobile view
- Search clear button tap target enlarged to 44x44px minimum (was ~20px), meets mobile accessibility guidelines
- Search clear button displays as flex to properly center the X icon
