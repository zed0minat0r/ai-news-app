/* =========================================================
   AI Pulse — main.js
   All articles live in the ARTICLES array below.
   Swap this array with fresh data to update the feed.
   ========================================================= */

const ARTICLES = [
  // ── FEATURED / BREAKING ──
  {
    id: 1,
    title: "NVIDIA Launches Rubin Platform — Six New Chips and an AI Supercomputer",
    summary: "NVIDIA's next-gen Rubin platform enters full production with up to 10x cheaper inference tokens and 4x fewer GPUs needed to train MoE models versus Blackwell. Vera Rubin ships H2 2026.",
    source: "NVIDIA Newsroom",
    url: "https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer",
    date: "2026-03-29",
    category: "hardware",
    featured: true
  },
  // ── MODELS ──
  {
    id: 2,
    title: "OpenAI Confirms GPT-5.5 'Spud' Has Finished Pre-Training",
    summary: "Prediction markets expect a Q2 2026 public launch. GPT-5.4 already matches Gemini 3.1 Pro atop the Artificial Analysis Intelligence Index at 57 points.",
    source: "LLM Stats",
    url: "https://llm-stats.com/llm-updates",
    date: "2026-03-31",
    category: "models"
  },
  {
    id: 3,
    title: "Gemini 3.1 Pro Leads 13 of 16 Major Benchmarks at One-Third the API Cost",
    summary: "Google's latest frontier model ties GPT-5.4 Pro on the intelligence index while offering dramatically lower pricing, heating up the cost-performance race.",
    source: "Renovate QR",
    url: "https://renovateqr.com/blog/ai-model-releases-2026",
    date: "2026-03-28",
    category: "models"
  },
  {
    id: 4,
    title: "Claude Opus 4.6 Hits 80.8% on SWE-Bench — Best Coding Score Yet",
    summary: "Anthropic's Claude 4.6 family ships with 1M-token context out of the box. Claude Code now supports multi-agent delegation, spawning sub-agents for frontend and backend tasks.",
    source: "Anthropic",
    url: "https://renovateqr.com/blog/ai-models-april-2026",
    date: "2026-03-25",
    category: "models"
  },
  {
    id: 5,
    title: "Meta Llama 4 Maverick: 400B Parameters, 10M Context, Fully Open",
    summary: "The strongest open-weight model yet runs free on your own infrastructure with a 10-million-token context window, challenging closed-source leaders.",
    source: "Team AI",
    url: "https://teamai.com/blog/large-language-models-llms/claude-vs-chatgpt-vs-gemini-in-2026-giants-challengers-and-the-ai-odel-showdown/",
    date: "2026-03-22",
    category: "models"
  },
  {
    id: 6,
    title: "DeepSeek V4 Proves Open-Source Can Match Frontier Labs at 80-90% Lower Cost",
    summary: "The Chinese open-source model delivers state-of-the-art intelligence without a massive Silicon Valley budget, reshaping the economics of AI.",
    source: "Tool Chamber",
    url: "https://toolchamber.com/top-10-ai-tools-and-updates-that-dominated-early-2026/",
    date: "2026-03-18",
    category: "models"
  },
  // ── HARDWARE ──
  {
    id: 7,
    title: "NVIDIA Moves Beyond GPUs: Groq LPX, Vera CPU Rack & STX Storage Unveiled at GTC",
    summary: "Three new systems launched simultaneously signal NVIDIA's ambition to own the entire AI infrastructure stack — CPUs, GPUs, and LPUs via the Groq acquisition.",
    source: "DigiTimes",
    url: "https://www.digitimes.com/news/a20260331PD205/nvidia-gtc-2026-groq-cpu.html",
    date: "2026-03-31",
    category: "hardware"
  },
  {
    id: 8,
    title: "NVIDIA Announces AI Data Center Hardware for Space Deployment",
    summary: "Jensen Huang reveals plans to extend AI compute infrastructure into orbit, targeting satellite-based inference for latency-sensitive global applications.",
    source: "The Motley Fool",
    url: "https://www.fool.com/investing/2026/03/29/nvidia-just-announced-hardware-for-ai-data-centers/",
    date: "2026-03-29",
    category: "hardware"
  },
  {
    id: 9,
    title: "Vera Rubin GPU Hits 2,300W TDP — Liquid Cooling Now the Only Option",
    summary: "As next-gen GPU power consumption approaches 4kW, traditional air cooling is completely ineffective. The industry pivots hard to liquid cooling solutions.",
    source: "SuperRenders",
    url: "https://superrendersfarm.com/article/gpu-ai-render-trends-2026-neural-rendering-render-farms",
    date: "2026-03-27",
    category: "hardware"
  },
  {
    id: 10,
    title: "CPUs Stage a Comeback: AI Agent Workloads Shift the Compute Balance",
    summary: "Agentic AI is driving a CPU renaissance. Analysts predict CPU market growth could exceed GPU growth by 2028 as multi-step agent workflows demand different compute.",
    source: "CNBC",
    url: "https://www.cnbc.com/2026/03/13/nvidia-gtc-ai-jensen-huang-cpu-gpu.html",
    date: "2026-03-26",
    category: "hardware"
  },
  {
    id: 11,
    title: "2026 AI Servers to Be 'Extremely Expensive' as Demand Outstrips Supply",
    summary: "Enterprise AI server costs are soaring as hyperscalers and corporations compete for limited next-gen GPU allocation in the second half of 2026.",
    source: "36Kr",
    url: "https://eu.36kr.com/en/p/3590983777108229",
    date: "2026-03-24",
    category: "hardware"
  },
  // ── RESEARCH ──
  {
    id: 12,
    title: "Morgan Stanley Warns a Massive AI Breakthrough Is Coming — 'Most of the World Isn't Ready'",
    summary: "An unprecedented accumulation of compute at America's top AI labs is expected to produce a breakthrough in H1 2026, according to Morgan Stanley analysts.",
    source: "Fortune",
    url: "https://fortune.com/2026/03/13/elon-musk-morgan-stanley-ai-leap-2026/",
    date: "2026-03-13",
    category: "research"
  },
  {
    id: 13,
    title: "Context Windows Hit 1 Million Tokens — Entire Codebases in a Single Prompt",
    summary: "Multiple frontier models now process 50-100x more context than a year ago, enabling analysis of entire libraries, years of financial records, or hours of video.",
    source: "Medium",
    url: "https://medium.com/@Micheal-Lanham/what-is-the-next-big-thing-in-ai-as-of-march-2026-07acda2458dc",
    date: "2026-03-20",
    category: "research"
  },
  {
    id: 14,
    title: "The Agentic Shift: 7 AI Breakthroughs Redefining March 2026",
    summary: "Focus moves from passive Q&A to autonomous, goal-oriented digital coworkers that understand objectives, devise plans, and execute multi-step workflows.",
    source: "Switas",
    url: "https://www.switas.com/articles/the-agentic-shift-7-ai-breakthroughs-redefining-march-2026",
    date: "2026-03-19",
    category: "research"
  },
  // ── TOOLS ──
  {
    id: 15,
    title: "95% of Developers Now Use AI Tools Weekly — 75% for Over Half Their Work",
    summary: "A survey of 1,000+ developers confirms AI has shifted from helpful assistant to core collaborator that writes, debugs, tests, and architects code at scale.",
    source: "Cortex",
    url: "https://www.cortex.io/post/the-engineering-leaders-guide-to-ai-tools-for-developers-in-2026",
    date: "2026-03-30",
    category: "tools"
  },
  {
    id: 16,
    title: "OpenAI Codex Security Cuts False Vulnerability Alarms by Over 90%",
    summary: "OpenAI's new security tool uses its latest models to analyze codebases and flag real vulnerabilities, dramatically reducing noise for security teams.",
    source: "Crescendo AI",
    url: "https://www.crescendo.ai/news/latest-ai-news-and-updates",
    date: "2026-03-28",
    category: "tools"
  },
  {
    id: 17,
    title: "GLM-5 Ships Under MIT License — Fully Self-Hostable Frontier Model",
    summary: "Zhipu AI's GLM-5 is a fully open-source frontier model with weights on Hugging Face, giving developers a powerful self-hosted alternative to API-only models.",
    source: "Build Fast with AI",
    url: "https://www.buildfastwithai.com/blogs/ai-tools-developers-march-2026",
    date: "2026-03-15",
    category: "tools"
  },
  // ── INDUSTRY ──
  {
    id: 18,
    title: "OpenAI Hits $2B Monthly Revenue, IPO Could Redefine AI Market Dynamics",
    summary: "OpenAI discontinued the costly Sora video app to refocus on enterprise ChatGPT integrations as it prepares for a blockbuster public offering.",
    source: "AI and News",
    url: "https://www.aiandnews.com/blog/latest-ai-news-public-concerns/",
    date: "2026-03-30",
    category: "industry"
  },
  {
    id: 19,
    title: "Anthropic Addresses Security Breach: Claude Agent Source Code Leaked",
    summary: "One of the most serious AI model security compromises to date as leaked source code from Anthropic's Claude AI agent surfaces online. Investigation underway.",
    source: "Radical Data Science",
    url: "https://radicaldatascience.wordpress.com/2026/04/01/ai-news-briefs-bulletin-board-for-april-2026/",
    date: "2026-03-26",
    category: "industry"
  },
  {
    id: 20,
    title: "AI Startup Seed Rounds Now Hitting $10M at $40-45M Post-Money Valuations",
    summary: "Institutional investors are pouring into ML and NLP startups at unprecedented valuations, signaling continued bullishness despite calls for an AI bubble.",
    source: "HumAI Blog",
    url: "https://www.humai.blog/ai-news-trends-april-2026-complete-monthly-digest/",
    date: "2026-03-25",
    category: "industry"
  },
  {
    id: 21,
    title: "Google Lyria 3 Pro Brings Advanced AI Music Generation to Creators",
    summary: "Google's latest generative music model lets creators produce studio-quality tracks with fine-grained control over instruments, mood, and structure.",
    source: "Google Blog",
    url: "https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-march-2026/",
    date: "2026-03-21",
    category: "tools"
  }
];

/* =========================================================
   DOM REFS
   ========================================================= */
const featuredSection = document.getElementById("featured-section");
const hardwareGrid    = document.getElementById("hardware-grid");
const newsGrid        = document.getElementById("news-grid");
const noResults       = document.getElementById("no-results");
const searchInput     = document.getElementById("search-input");
const categoryBtns    = document.querySelectorAll(".cat-pill");
const lastUpdatedEl   = document.getElementById("last-updated");
const footerYear      = document.getElementById("footer-year");

let activeCategory = "all";

/* =========================================================
   HELPERS
   ========================================================= */
function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr + "T12:00:00");
  const days = Math.round((now - then) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return days + "d ago";
  return formatDate(dateStr);
}

/* =========================================================
   RENDER
   ========================================================= */
function buildFeaturedCard(article) {
  return `
    <a href="${article.url}" target="_blank" rel="noopener" class="featured-card">
      <span class="featured-label">Breaking</span>
      <h2>${article.title}</h2>
      <p class="summary">${article.summary}</p>
      <p class="meta">${article.source} &middot; ${timeAgo(article.date)}</p>
    </a>`;
}

function buildCard(article) {
  return `
    <a href="${article.url}" target="_blank" rel="noopener" class="card" data-category="${article.category}">
      <span class="card-tag ${article.category}">${article.category}</span>
      <h3>${article.title}</h3>
      <p class="summary">${article.summary}</p>
      <p class="meta">${article.source} &middot; ${timeAgo(article.date)}</p>
    </a>`;
}

function render() {
  const query = searchInput.value.toLowerCase().trim();

  // Filter articles
  let filtered = ARTICLES.filter(a => {
    const matchesCat = activeCategory === "all" || a.category === activeCategory;
    const matchesSearch = !query ||
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.source.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  // Featured
  const featured = filtered.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured);

  if (featured && (activeCategory === "all" || activeCategory === featured.category)) {
    featuredSection.innerHTML = buildFeaturedCard(featured);
    featuredSection.classList.remove("hidden");
  } else {
    featuredSection.innerHTML = "";
    featuredSection.classList.add("hidden");
    if (featured) rest.unshift(featured); // show it in the grid instead
  }

  // Hardware spotlight
  const hardwareArticles = rest.filter(a => a.category === "hardware");
  const nonHardware = rest.filter(a => a.category !== "hardware");

  if (activeCategory === "all" && hardwareArticles.length > 0 && !query) {
    hardwareGrid.innerHTML = hardwareArticles.map(buildCard).join("");
    document.getElementById("hardware-spotlight").classList.remove("hidden");
  } else {
    document.getElementById("hardware-spotlight").classList.add("hidden");
    // Put hardware back into main grid if viewing hardware or searching
    nonHardware.push(...hardwareArticles);
    nonHardware.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Main grid
  const mainArticles = activeCategory === "all" && !query ? nonHardware : (activeCategory === "all" ? rest : rest);
  // Sort by date descending
  mainArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  newsGrid.innerHTML = mainArticles.map(buildCard).join("");

  // No results
  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    render();
  });
});

searchInput.addEventListener("input", render);

/* =========================================================
   TIMESTAMP & INIT
   ========================================================= */
function updateTimestamp() {
  const now = new Date();
  const str = now.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true
  });
  lastUpdatedEl.textContent = "Last updated: " + str;
}

footerYear.textContent = new Date().getFullYear();
updateTimestamp();
render();

/* =========================================================
   AUTO-UPDATE STUB
   Future: Replace this with a fetch() call to a news API
   or serverless function that returns fresh ARTICLES JSON.
   ========================================================= */
async function fetchLatestArticles() {
  // Placeholder for future API integration
  // const res = await fetch('/api/articles');
  // const data = await res.json();
  // ARTICLES.length = 0;
  // ARTICLES.push(...data);
  // render();
  // updateTimestamp();
  console.log("[AI Pulse] Auto-update: ready for API integration");
}

// Refresh every 5 minutes (currently logs; swap in real fetch above)
setInterval(fetchLatestArticles, 5 * 60 * 1000);
