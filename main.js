/* =========================================================
   AI Pulse — main.js
   Articles loaded from news.json (auto-updated via GitHub Actions).
   Falls back to the hardcoded FALLBACK_ARTICLES if fetch fails.
   ========================================================= */

let ARTICLES = [];

const FALLBACK_ARTICLES = [
  // ── FEATURED / BREAKING — 2026-04-02 ──
  {
    id: 50,
    title: "Microsoft Launches 3 In-House AI Models — MAI-Transcribe-1, MAI-Voice-1 & MAI-Image-2",
    summary: "Microsoft's superintelligence team ships three foundational models built entirely in-house: MAI-Transcribe-1 (speech-to-text in 25 languages at 2.5x Azure speed), MAI-Voice-1 (60s of natural audio in 1 second), and MAI-Image-2 (top-3 on Arena.ai). Available now via Microsoft Foundry.",
    source: "VentureBeat",
    url: "https://venturebeat.com/technology/microsoft-launches-3-new-ai-models-in-direct-shot-at-openai-and-google",
    date: "2026-04-02",
    category: "models",
    featured: true
  },
  // ── NEW STORIES — 2026-04-02 ──
  {
    id: 49,
    title: "Alibaba Releases Qwen3.6-Plus — Third Proprietary Model in Days",
    summary: "Alibaba's AI lab ships Qwen3.6-Plus, its third major model drop in under a week, as the Chinese tech giant races to fulfill its $100B AI and cloud revenue pledge.",
    source: "LLM Stats",
    url: "https://llm-stats.com/ai-news",
    date: "2026-04-02",
    category: "models"
  },
  {
    id: 48,
    title: "OpenAI Surpasses $25B Annualized Revenue, Eyes Late-2026 IPO",
    summary: "OpenAI is now generating over $2 billion per month in revenue and is taking early steps toward a public listing that could happen as soon as late 2026, potentially the largest AI IPO ever.",
    source: "Fortune",
    url: "https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/",
    date: "2026-04-02",
    category: "industry"
  },
  {
    id: 47,
    title: "Anthropic Nears $19B Annualized Revenue as Claude Sonnet 4.6 Leads Work Evals",
    summary: "Anthropic's revenue approaches $19 billion annualized as Claude Sonnet 4.6 takes the top spot on real-world work evaluations, outperforming GPT-5.4 and Gemini 3.1 Pro on practical tasks.",
    source: "Crescendo AI",
    url: "https://www.crescendo.ai/news/latest-ai-news-and-updates",
    date: "2026-04-02",
    category: "industry"
  },
  {
    id: 46,
    title: "NVIDIA-Marvell Partnership Fuels Semiconductor Rally Amid Trade Tensions",
    summary: "NVIDIA's deepening partnership with Marvell Technology drives broad gains across semiconductor stocks as the AI ecosystem expands, even as US-China trade tensions persist.",
    source: "IndexBox",
    url: "https://www.indexbox.io/blog/semiconductor-stocks-rise-on-nvidia-marvell-ai-partnership/",
    date: "2026-04-02",
    category: "hardware"
  },
  {
    id: 45,
    title: "xAI Debuts Grok 4.20 With Multi-Agent Architecture — A New Paradigm",
    summary: "Elon Musk's xAI introduces a completely new multi-agent architecture with Grok 4.20, enabling swarms of specialized sub-agents that coordinate autonomously on complex tasks.",
    source: "Renovate QR",
    url: "https://renovateqr.com/blog/ai-models-april-2026",
    date: "2026-04-02",
    category: "models"
  },
  {
    id: 44,
    title: "Federal Judge Rules Trump's Ban on Anthropic AI in Government Violates Free Speech",
    summary: "A U.S. federal judge struck down the Trump administration's ban on Anthropic AI models in government systems, ruling it violated First Amendment free-speech protections.",
    source: "AI and News",
    url: "https://www.aiandnews.com/blog/latest-ai-news-public-concerns/",
    date: "2026-04-02",
    category: "industry"
  },
  {
    id: 43,
    title: "Google's New Compression Algorithm Slashes AI Memory Costs by 6x",
    summary: "Google DeepMind unveils a novel compression technique that reduces AI model memory requirements by six times, dramatically lowering inference costs for production deployments.",
    source: "HumAI Blog",
    url: "https://www.humai.blog/ai-news-trends-april-2026-complete-monthly-digest/",
    date: "2026-04-02",
    category: "research"
  },
  {
    id: 42,
    title: "International Fact-Checking Day: AI-Generated Misinformation Hits Unprecedented Levels",
    summary: "Researchers report an unprecedented wave of AI-generated false images since the Feb. 28 Iran conflict, prompting renewed calls for mandatory AI content labeling and detection tools.",
    source: "Click Orlando",
    url: "https://www.clickorlando.com/news/politics/2026/04/02/its-international-fact-checking-day-refresh-your-ai-identification-skills/",
    date: "2026-04-02",
    category: "industry"
  },
  {
    id: 41,
    title: "Meta Smart Glasses Get Competition as Nothing Bets on Design-Forward AI Wearables",
    summary: "Consumer AI hardware moves beyond chatbots and phones into always-on wearables. Nothing is betting there is room for a more design-forward alternative to Meta's smart glasses.",
    source: "Coaio",
    url: "https://coaio.com/news/2026/04/breaking-tech-news-on-april-1-2026-ai-surge-cyber-threats-and-startup-2l4c/",
    date: "2026-04-02",
    category: "hardware"
  },
  {
    id: 40,
    title: "GPT-5.3 and GPT-5.4 Ship in Same Week as OpenAI Accelerates Release Cadence",
    summary: "OpenAI shipped GPT-5.4 the same week as GPT-5.3, signaling an aggressive new release pace. GPT-5.4 matches Gemini 3.1 Pro atop the Artificial Analysis Intelligence Index at 57 points.",
    source: "LLM Stats",
    url: "https://llm-stats.com/llm-updates",
    date: "2026-04-02",
    category: "models"
  },
  {
    id: 39,
    title: "AI Industry Enters 'Phase of Consolidation and Consequence' in April 2026",
    summary: "The optimism of early 2026 is being tested against operational reality as labs shift from shipping demos to sustaining production agentic deployments at enterprise scale.",
    source: "Mean CEO",
    url: "https://blog.mean.ceo/ai-news-april-2026/",
    date: "2026-04-02",
    category: "research"
  },
  {
    id: 38,
    title: "ASIC Accelerators, Chiplets & Quantum-Assisted Optimizers Mature Beyond GPUs",
    summary: "The AI hardware race diversifies as ASIC-based accelerators, chiplet designs, analog inference engines, and quantum-assisted optimizers mature alongside traditional GPU compute.",
    source: "ServeTheHome",
    url: "https://www.servethehome.com/what-retail-ai-and-compute-infrastructure-actually-looks-like-in-2026/",
    date: "2026-04-02",
    category: "hardware"
  },
  // ── PREVIOUS FEATURED ──
  {
    id: 1,
    title: "NVIDIA Launches Rubin Platform — Six New Chips and an AI Supercomputer",
    summary: "NVIDIA's next-gen Rubin platform enters full production with up to 10x cheaper inference tokens and 4x fewer GPUs needed to train MoE models versus Blackwell. Vera Rubin ships H2 2026.",
    source: "NVIDIA Newsroom",
    url: "https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer",
    date: "2026-03-29",
    category: "hardware"
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
  },
  // ── NEW STORIES — 2026-04-01 ──
  {
    id: 22,
    title: "GPT-5.4 Ships With Native Computer-Use — OpenAI's First Agentic General Model",
    summary: "OpenAI's GPT-5.4 is the first general-purpose model with built-in computer-use capabilities, enabling agents to operate desktops and execute complex multi-app workflows autonomously.",
    source: "OpenAI",
    url: "https://releasebot.io/updates/openai",
    date: "2026-04-01",
    category: "models"
  },
  {
    id: 23,
    title: "Anthropic Unveils Claude Mythos 5 — 10 Trillion Parameters for Cybersecurity and Code",
    summary: "Anthropic's largest model ever, Claude Mythos 5 with 10T parameters, targets advanced cybersecurity and coding tasks. Positioned above the Opus tier in a new 'Capybara' class.",
    source: "Mean CEO",
    url: "https://blog.mean.ceo/new-ai-model-releases-news-april-2026/",
    date: "2026-04-01",
    category: "models"
  },
  {
    id: 24,
    title: "Gemini 3.1 Flash Live Redefines Real-Time Voice Assistance",
    summary: "Google DeepMind's Gemini 3.1 adds real-time voice and image analysis with natural conversational rhythm, making hands-free AI engagement seamless on mobile.",
    source: "Google DeepMind",
    url: "https://blog.mean.ceo/google-gemini-latest-model-news-april-2026/",
    date: "2026-04-01",
    category: "models"
  },
  {
    id: 25,
    title: "Huawei 950PR AI Chip Targets Inference — ByteDance and Alibaba Place Large Orders",
    summary: "Huawei's new 950PR chip is designed to excel at inference workloads. Chinese tech giants ByteDance and Alibaba are reportedly among the first major buyers.",
    source: "HumAI Blog",
    url: "https://www.humai.blog/ai-news-trends-april-2026-complete-monthly-digest/",
    date: "2026-03-31",
    category: "hardware"
  },
  {
    id: 26,
    title: "Together AI Launches Aurora — Open-Source RL Framework for Self-Improving Speculative Decoding",
    summary: "Aurora turns speculative decoding from a one-time offline setup into a continuously self-improving system using reinforcement learning. Fully open-source.",
    source: "The Neuron",
    url: "https://www.theneuron.ai/explainer-articles/around-the-horn-digest-everything-that-happened-in-ai-today-monday-march-31-2026/",
    date: "2026-03-31",
    category: "tools"
  },
  {
    id: 27,
    title: "Liquid AI's LFM2.5-350M: Tiny Model, Big Agentic Power on CPUs and Mobile",
    summary: "Liquid AI's 350M-parameter model trained on 28T tokens with scaled RL delivers reliable agentic loops, data extraction, and tool use across CPUs, GPUs, and mobile devices.",
    source: "Labla.org",
    url: "https://www.labla.org/latest-ai-model-releases-past-24-hours/ai-releases-roundup-what-actually-launched-on-march-29-30-and-31-2026/",
    date: "2026-03-30",
    category: "models"
  },
  {
    id: 28,
    title: "Q1 2026 AI Venture Funding Hits $297B — An All-Time Record",
    summary: "AI venture funding shattered records in Q1 2026, reaching $297 billion. OpenAI closed a $122B round at an $852B valuation while investors increasingly bet on Anthropic.",
    source: "Crescendo AI",
    url: "https://www.crescendo.ai/news/latest-ai-news-and-updates",
    date: "2026-03-31",
    category: "industry"
  },
  {
    id: 29,
    title: "Rebellions Raises $400M to Challenge NVIDIA With Korean AI Chips",
    summary: "South Korean AI chip startup Rebellions secured $400 million in new funding as it scales production of custom silicon designed to compete with NVIDIA in inference workloads.",
    source: "AI and News",
    url: "https://www.aiandnews.com/blog/latest-ai-news-march-2026-6/",
    date: "2026-03-31",
    category: "hardware"
  },
  // ── NEW STORIES — 2026-04-01 (Cycle 2) ──
  {
    id: 30,
    title: "NVIDIA Expects $1 Trillion in AI Infrastructure Revenue by 2027",
    summary: "Jensen Huang doubles NVIDIA's cumulative AI infrastructure revenue forecast to $1 trillion across Blackwell and Vera Rubin systems between 2025 and 2027.",
    source: "Financial Content",
    url: "https://markets.financialcontent.com/stocks/article/finterra-2026-4-2-nvidia-nvda-2026-deep-dive-the-sovereign-ai-era-and-the-path-to-4-trillion",
    date: "2026-04-01",
    category: "hardware"
  },
  {
    id: 31,
    title: "Apple's AI-Powered Siri Overhaul Rolling Out With iOS 26.4 This Spring",
    summary: "Apple's reimagined Siri debuts as a context-aware system orchestrator capable of multi-step tasks across apps, powered by a Google Gemini partnership worth $1B/year.",
    source: "Information Age",
    url: "https://ia.acs.org.au/article/2026/apple-reveals-the-ai-behind-siri-s-big-2026-upgrade.html",
    date: "2026-04-01",
    category: "industry"
  },
  {
    id: 32,
    title: "Oracle Lays Off 25,000 to Fund Massive AI Data Center Expansion",
    summary: "Oracle cuts a quarter of its workforce to redirect billions into AI data center infrastructure as the enterprise AI arms race intensifies.",
    source: "Tech Startups",
    url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/",
    date: "2026-04-01",
    category: "industry"
  },
  {
    id: 33,
    title: "Amazon Acquires 1,300 Acres in Oregon for $12B 'Exascale' AI Campus",
    summary: "Amazon plans up to 20 data center buildings near the Columbia River in Boardman, Oregon, with an estimated $8-12 billion investment in exascale AI compute.",
    source: "Tech Startups",
    url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/",
    date: "2026-04-01",
    category: "hardware"
  },
  {
    id: 34,
    title: "AI Industry Goes All-In on 2026 Midterms as Regulation Looms",
    summary: "AI companies are ramping up political spending ahead of the 2026 midterms as lawmakers prepare sweeping new regulations on autonomous systems and data privacy.",
    source: "ABC News",
    url: "https://abcnews.com/Politics/ai-industry-2026-midterms-government-regulations-looming/story?id=131610305",
    date: "2026-04-01",
    category: "industry"
  },
  {
    id: 35,
    title: "GTC 2026 Signals Agentic AI Has Moved From Demo to Production",
    summary: "NVIDIA's GTC 2026 was dominated by enterprise agentic deployments rather than raw benchmarks, signaling autonomous AI agents are now in real-world production at scale.",
    source: "Deeper Insights",
    url: "https://deeperinsights.com/ai-blog/nvidia-gtc-2026-highlights/",
    date: "2026-04-01",
    category: "research"
  },
  {
    id: 36,
    title: "Gemini 3.1 Flash-Lite: Google's Fastest Budget Model at $0.25/M Tokens",
    summary: "Google's new Flash-Lite model delivers 2.5x faster response times and 45% faster output generation than predecessors, targeting high-volume production workloads.",
    source: "Google Blog",
    url: "https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-march-2026/",
    date: "2026-04-01",
    category: "models"
  },
  {
    id: 37,
    title: "Texas TRAIGA Act Takes Effect — First Comprehensive US State AI Governance Law",
    summary: "The Texas Responsible AI Governance Act bans harmful AI uses and requires disclosures when government and healthcare providers deploy AI systems, setting a national precedent.",
    source: "CPO Magazine",
    url: "https://www.cpomagazine.com/data-protection/2026-ai-legal-forecast-from-innovation-to-compliance/",
    date: "2026-04-01",
    category: "industry"
  }
];

// Start with fallback data, then try to load fresh data
ARTICLES = [...FALLBACK_ARTICLES];

async function loadArticles() {
  try {
    const resp = await fetch("news.json?t=" + Date.now());
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();
    if (Array.isArray(data) && data.length > 0) {
      ARTICLES = data;
      console.log("[AI Pulse] Loaded " + data.length + " articles from news.json");
      render();
      updateTimestamp();
    }
  } catch (e) {
    console.log("[AI Pulse] news.json not available, using fallback articles:", e.message);
  }
}

/* =========================================================
   DOM REFS
   ========================================================= */
const featuredSection = document.getElementById("featured-section");
const hardwareGrid    = document.getElementById("hardware-grid");
const newsGrid        = document.getElementById("news-grid");
const noResults       = document.getElementById("no-results");
const searchInput     = document.getElementById("search-input");
const searchClear     = document.getElementById("search-clear");
const resultCount     = document.getElementById("result-count");
const categoryBtns    = document.querySelectorAll(".cat-pill");
const lastUpdatedEl   = document.getElementById("last-updated");
const footerYear      = document.getElementById("footer-year");
const backToTopBtn    = document.getElementById("back-to-top");

const trendingSection = document.getElementById("trending-section");
const trendingGrid    = document.getElementById("trending-grid");

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
function shareArticle(e, title, url) {
  e.preventDefault();
  e.stopPropagation();
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      const btn = e.currentTarget;
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Share"; }, 1500);
    }).catch(() => {});
  }
}

function buildFeaturedCard(article) {
  const icon = CATEGORY_ICONS[article.category] || "\u{1F4F0}";
  return `
    <a href="${article.url}" target="_blank" rel="noopener" class="featured-card">
      <div class="featured-hero-icon" aria-hidden="true">${icon}</div>
      <span class="featured-label">Breaking</span>
      <h2>${article.title}</h2>
      <p class="summary">${article.summary}</p>
      <div class="featured-footer">
        <p class="meta">${article.source} &middot; ${timeAgo(article.date)}</p>
        <button class="share-btn" onclick="shareArticle(event, '${article.title.replace(/'/g, "\\'")}', '${article.url}')" aria-label="Share article">Share</button>
      </div>
    </a>`;
}

const CATEGORY_ICONS = {
  models: "\u{1F9E0}",
  hardware: "\u{1F5A5}\uFE0F",
  research: "\u{1F52C}",
  tools: "\u{1F6E0}\uFE0F",
  industry: "\u{1F4C8}"
};

function buildCard(article) {
  const icon = CATEGORY_ICONS[article.category] || "\u{1F4F0}";
  return `
    <a href="${article.url}" target="_blank" rel="noopener" class="card" data-category="${article.category}">
      <div class="card-thumb ${article.category}" aria-hidden="true">${icon}</div>
      <span class="card-tag ${article.category}">${article.category}</span>
      <h3>${article.title}</h3>
      <p class="summary">${article.summary}</p>
      <div class="card-footer">
        <p class="meta">${article.source} &middot; ${timeAgo(article.date)}</p>
        <button class="share-btn share-btn-sm" onclick="shareArticle(event, '${article.title.replace(/'/g, "\\'")}', '${article.url}')" aria-label="Share article">Share</button>
      </div>
    </a>`;
}

function buildTrendingItem(article, rank) {
  return `
    <a href="${article.url}" target="_blank" rel="noopener" class="trending-item">
      <span class="trending-rank">${rank}</span>
      <div class="trending-info">
        <span class="card-tag ${article.category}">${article.category}</span>
        <h4>${article.title}</h4>
        <p class="meta">${article.source} &middot; ${timeAgo(article.date)}</p>
      </div>
    </a>`;
}

function updatePillCounts() {
  const counts = { all: ARTICLES.length };
  ARTICLES.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
  });
  categoryBtns.forEach(btn => {
    const cat = btn.dataset.category;
    const countEl = btn.querySelector(".pill-count");
    if (countEl) countEl.textContent = "(" + (counts[cat] || 0) + ")";
  });
}

function render() {
  updatePillCounts();
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

  // Trending section — show top 5 newest articles across all categories
  if (activeCategory === "all" && !query) {
    const trending = [...ARTICLES]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    trendingGrid.innerHTML = trending.map((a, i) => buildTrendingItem(a, i + 1)).join("");
    trendingSection.classList.remove("hidden");
  } else {
    trendingSection.classList.add("hidden");
  }

  // No results
  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }

  // Search UX: result count and clear button
  searchClear.style.display = query ? "flex" : "none";
  if (query) {
    resultCount.textContent = filtered.length + " result" + (filtered.length !== 1 ? "s" : "") + " found";
  } else {
    resultCount.textContent = "";
  }
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    activeCategory = btn.dataset.category;
    render();
  });
});

searchInput.addEventListener("input", render);

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  render();
});

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
   AUTO-UPDATE — Loads fresh articles from news.json
   GitHub Actions updates news.json every 30 minutes.
   The browser re-fetches every 5 minutes to pick up changes.
   ========================================================= */
loadArticles();
setInterval(loadArticles, 5 * 60 * 1000);

/* =========================================================
   BACK TO TOP BUTTON
   Shows after scrolling 2+ screens; smooth-scrolls to top.
   ========================================================= */
window.addEventListener("scroll", () => {
  const twoScreens = window.innerHeight * 2;
  if (window.scrollY > twoScreens) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
