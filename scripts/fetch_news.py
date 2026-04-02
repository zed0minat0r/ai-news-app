#!/usr/bin/env python3
"""
AI Pulse — RSS Feed Fetcher
Fetches AI news from 12+ RSS sources, deduplicates, categorizes,
and writes the 50 most recent articles to news.json.

Uses only Python standard library — no pip installs needed.
"""

import json
import os
import re
import ssl
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import unescape

# ── RSS Sources ──────────────────────────────────────────────
FEEDS = [
    {"url": "https://openai.com/blog/rss.xml",                                    "name": "OpenAI Blog"},
    {"url": "https://www.anthropic.com/feed",                                      "name": "Anthropic Blog"},
    {"url": "https://blog.google/technology/ai/rss/",                              "name": "Google AI Blog"},
    {"url": "https://blogs.nvidia.com/feed/",                                      "name": "NVIDIA Blog"},
    {"url": "https://feeds.arstechnica.com/arstechnica/technology-lab",            "name": "Ars Technica"},
    {"url": "https://www.tomshardware.com/feeds/all",                              "name": "Tom's Hardware"},
    {"url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",   "name": "The Verge"},
    {"url": "https://techcrunch.com/category/artificial-intelligence/feed/",        "name": "TechCrunch"},
    {"url": "https://venturebeat.com/category/ai/feed/",                           "name": "VentureBeat"},
    {"url": "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT",                        "name": "Hacker News"},
    {"url": "https://www.technologyreview.com/feed/",                              "name": "MIT Tech Review"},
    {"url": "https://www.wired.com/feed/tag/ai/latest/rss",                        "name": "Wired"},
    # Research-focused feeds (improve Research category balance)
    {"url": "https://rss.arxiv.org/rss/cs.AI",                                    "name": "arXiv cs.AI"},
    {"url": "https://rss.arxiv.org/rss/cs.CL",                                    "name": "arXiv cs.CL"},
    {"url": "https://rss.arxiv.org/rss/cs.CV",                                    "name": "arXiv cs.CV"},
    {"url": "https://paperswithcode.com/latest.rss",                               "name": "Papers With Code"},
    # Tools-focused feeds (improve Tools category balance)
    {"url": "https://huggingface.co/blog/feed.xml",                                "name": "Hugging Face Blog"},
    {"url": "https://www.producthunt.com/feed?category=ai",                        "name": "Product Hunt AI"},
]

# ── Category Keywords ────────────────────────────────────────
CATEGORY_KEYWORDS = {
    "models": [
        "gpt", "claude", "gemini", "llama", "mistral", "llm", "language model",
        "model release", "fine-tune", "fine-tun", "open-source model", "open-weight",
        "parameters", "benchmark", "pre-train", "training run", "deepseek", "qwen",
        "phi-", "mixtral", "grok", "opus", "sonnet", "haiku", "foundation model",
        "multimodal", "vision model", "diffusion", "transformer", "token window",
        "context window", "weights", "rlhf", "instruct", "chat model",
    ],
    "hardware": [
        "gpu", "chip", "nvidia", "amd", "intel", "tpu", "semiconductor", "silicon",
        "data center", "datacenter", "server", "cpu", "accelerator", "asic", "fpga",
        "memory", "hbm", "cooling", "power consumption", "tdp", "blackwell", "rubin",
        "groq", "cerebras", "gaudi", "rack", "cluster", "supercomputer", "h100",
        "b200", "inference chip", "wafer",
    ],
    "research": [
        "paper", "arxiv", "research", "study", "breakthrough", "algorithm",
        "reinforcement learning", "alignment", "safety", "interpretab", "emergent",
        "scaling law", "synthetic data", "evaluation", "benchmark", "hallucin",
        "reasoning", "chain-of-thought", "rag", "retrieval augmented", "embedding",
        "attention mechanism", "sparse", "moe", "mixture of experts", "distill",
    ],
    "tools": [
        "api", "sdk", "developer", "framework", "library", "open source", "tool",
        "plugin", "extension", "copilot", "code assist", "cursor", "vscode",
        "agent framework", "langchain", "llamaindex", "hugging face", "platform",
        "playground", "deployment", "inference endpoint", "fine-tuning service",
    ],
    "industry": [
        "funding", "acquisition", "ipo", "revenue", "valuation", "layoff", "hire",
        "regulation", "policy", "government", "lawsuit", "copyright", "privacy",
        "partnership", "investment", "billion", "million", "market", "stock",
        "enterprise", "startup", "ceo", "executive", "competition", "antitrust",
        "ban", "congress", "senate", "eu ai act", "compliance",
    ],
}

# ── Helpers ───────────────────────────────────────────────────

def strip_html(text):
    """Remove HTML tags and decode entities."""
    if not text:
        return ""
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# Keywords that confirm an article is AI-related (must match at least one)
AI_RELEVANCE_KEYWORDS = [
    "artificial intelligence", "machine learning", "deep learning",
    "neural network", "large language model", "llm", "gpt", "claude",
    "gemini", "chatbot", "generative ai", "diffusion model", "transformer model",
    "openai", "anthropic", "deepmind", "hugging face", "mistral",
    "autonomous vehicle", "self-driving", "computer vision", "ai model",
    "natural language processing", "reinforcement learning", "training data",
    "ai inference", "ai chip", "ai accelerator", "copilot", "ai agent",
    "ai startup", "ai regulation", "ai safety", "ai alignment",
    "ai-powered", "ai tool", "ai assistant", "ai image", "ai video",
    "ai coding", "ai search", "ai hardware",
    " ai ", "ai,", "ai.", "ai:", "ai-",  # "ai" as standalone word
]

# Negative keywords — articles matching these are NOT AI news
NEGATIVE_KEYWORDS = [
    "gaming deal", "ssd review", "motherboard review", "monitor review",
    "keyboard review", "mouse review", "headset review", "speaker review",
    "printer review", "router review", "wifi review", "best buy deal",
    "amazon deal", "black friday", "cyber monday", "coupon", "promo code",
    "denuvo", "drm bypass", "game pass", "steam sale", "playstation",
    "xbox", "nintendo", "fortnite", "minecraft", "artemis", "moon mission",
    "space station", "mars rover", "satellite imagery", "forest map",
    "google vids", "google docs", "google sheets", "outlook bug",
    "cryptocurrency", "bitcoin", "ethereum", "nft", "blockchain",
    "recipe", "cooking", "workout", "fitness tracker",
]


def is_ai_related(title, summary):
    """Check if an article is actually about AI and not off-topic."""
    combined = (" " + title + " " + summary + " ").lower()
    # Reject if negative keywords match
    if any(neg in combined for neg in NEGATIVE_KEYWORDS):
        return False
    return any(kw in combined for kw in AI_RELEVANCE_KEYWORDS)


def categorize(title, summary):
    """Auto-categorize an article using keyword matching. Returns None if not AI-related."""
    combined = (title + " " + summary).lower()
    scores = {}
    for cat, keywords in CATEGORY_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in combined)
        if score > 0:
            scores[cat] = score
    total_score = sum(scores.values()) if scores else 0
    if not scores or total_score < 2:
        # Low or no keyword match — must pass strict AI relevance check
        if is_ai_related(title, summary):
            if scores:
                return max(scores, key=scores.get)
            return "industry"
        return None  # Not AI-related — filter it out
    return max(scores, key=scores.get)


def parse_date(date_str):
    """Parse RSS date string into ISO format (YYYY-MM-DD)."""
    if not date_str:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")
    # Try RFC 2822 (most RSS feeds)
    try:
        dt = parsedate_to_datetime(date_str)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        pass
    # Try ISO 8601 variants
    for fmt in ["%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d"]:
        try:
            dt = datetime.strptime(date_str.strip(), fmt)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass
    # Try partial ISO
    match = re.search(r"(\d{4}-\d{2}-\d{2})", date_str)
    if match:
        return match.group(1)
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def fetch_feed(feed_info):
    """Fetch and parse a single RSS feed. Returns list of article dicts."""
    articles = []
    url = feed_info["url"]
    source = feed_info["name"]

    # Create SSL context that doesn't verify (some feeds have cert issues)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "AI-Pulse-RSS-Fetcher/1.0 (+https://github.com/zed0minat0r/ai-news-app)"
        })
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            data = resp.read()
    except Exception as e:
        print(f"  [WARN] Failed to fetch {source}: {e}", file=sys.stderr)
        return articles

    try:
        root = ET.fromstring(data)
    except ET.ParseError as e:
        print(f"  [WARN] Failed to parse {source}: {e}", file=sys.stderr)
        return articles

    # Handle both RSS 2.0 and Atom feeds
    ns = {"atom": "http://www.w3.org/2005/Atom"}

    # RSS 2.0: //channel/item
    items = root.findall(".//item")
    if items:
        for item in items:
            title = (item.findtext("title") or "").strip()
            link = (item.findtext("link") or "").strip()
            pub_date = item.findtext("pubDate") or item.findtext("dc:date") or ""
            description = strip_html(item.findtext("description") or "")
            if not title or not link:
                continue
            cat = categorize(title, description)
            if cat is None:
                continue  # Not AI-related — skip
            articles.append({
                "title": title,
                "url": link,
                "source": source,
                "date": parse_date(pub_date),
                "summary": description[:200] + ("..." if len(description) > 200 else ""),
                "category": cat,
            })
    else:
        # Atom: //entry
        entries = root.findall(".//atom:entry", ns) or root.findall(".//entry")
        for entry in entries:
            title = (entry.findtext("atom:title", "", ns) or entry.findtext("title") or "").strip()
            link_el = entry.find("atom:link[@rel='alternate']", ns) or entry.find("atom:link", ns) or entry.find("link")
            link = ""
            if link_el is not None:
                link = link_el.get("href", "").strip()
                if not link:
                    link = (link_el.text or "").strip()
            updated = entry.findtext("atom:updated", "", ns) or entry.findtext("updated") or entry.findtext("atom:published", "", ns) or entry.findtext("published") or ""
            summary_el = entry.findtext("atom:summary", "", ns) or entry.findtext("summary") or entry.findtext("atom:content", "", ns) or entry.findtext("content") or ""
            description = strip_html(summary_el)
            if not title or not link:
                continue
            cat = categorize(title, description)
            if cat is None:
                continue  # Not AI-related — skip
            articles.append({
                "title": title,
                "url": link,
                "source": source,
                "date": parse_date(updated),
                "summary": description[:200] + ("..." if len(description) > 200 else ""),
                "category": cat,
            })

    print(f"  [OK] {source}: {len(articles)} articles", file=sys.stderr)
    return articles


def main():
    print("AI Pulse — Fetching RSS feeds...", file=sys.stderr)
    all_articles = []

    for feed in FEEDS:
        all_articles.extend(fetch_feed(feed))

    # Deduplicate by URL
    seen_urls = set()
    unique = []
    for article in all_articles:
        normalized = article["url"].rstrip("/").lower()
        if normalized not in seen_urls:
            seen_urls.add(normalized)
            unique.append(article)

    # Sort by date (newest first)
    unique.sort(key=lambda a: a["date"], reverse=True)

    # Keep top 50
    top50 = unique[:50]

    # Add IDs
    for i, article in enumerate(top50):
        article["id"] = i + 1
        # Mark the newest article as featured
        if i == 0:
            article["featured"] = True

    # Output path
    out_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(out_dir, "news.json")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(top50, f, indent=2, ensure_ascii=False)

    print(f"\nWrote {len(top50)} articles to {out_path}", file=sys.stderr)
    print(f"Sources fetched: {len(FEEDS)}", file=sys.stderr)
    print(f"Total before dedup: {len(all_articles)}", file=sys.stderr)
    print(f"Unique articles: {len(unique)}", file=sys.stderr)


if __name__ == "__main__":
    main()
