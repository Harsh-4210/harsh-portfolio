// Single source of truth for the site. Every claim here should be
// checkable against a public repo or a training log. If a number
// cannot be reproduced, it does not go in.

export type Link = { label: string; href: string };

export type Metric = {
  label: string;
  start: string;
  best: string;
  end: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  kind: string;
  highlight: string;
  pipeline: string[];
  stack: string[];
  problem: string;
  approach: string[];
  result: string;
  metrics?: { caption: string; columns: [string, string, string]; rows: Metric[] };
  limitations: string[];
  next?: string[];
  links: Link[];
};

export type Entry = {
  title: string;
  year: string;
  description: string;
  context: string;
  tags: string;
  href: string;
};

export const profile = {
  name: "Harsh Jain",
  role: "Machine learning engineer",
  location: "Pune, India",
  email: "harshjain0621@gmail.com",
  intro:
    "I build training environments, reward functions, and evaluation harnesses for language models, and the backend services that put them in front of users.",
  focus:
    "Most of my recent work comes back to one question: how do you get a small model to make a decision that a program can check?",
  availability:
    "Final-year B.E. student in AI & Data Science. Open to ML engineering internships and 2027 full-time roles.",
  headline: "I train small models to make decisions you can verify.",
  bio: [
    "I'm a final-year AI & Data Science student at Savitribai Phule Pune University. Most of what I build sits where research meets shipping: an environment and reward function on one side, an API someone can actually call on the other.",
    "Lately that has meant post-training language models with GRPO and LoRA, designing deterministic verifiers so the reward cannot be gamed by an LLM judge, and building multi-agent pipelines with a quality gate before anything reaches a user.",
    "I care about evaluation more than demos. Every number on this site comes from a public repo, a training log or a live demo, and each case study ends with what did not work.",
  ],
  stats: [
    { value: 8.75, decimals: 2, suffix: "", label: "GPA out of 10" },
    { value: 20, decimals: 0, suffix: "+", label: "Projects built" },
    { value: 2, decimals: 0, suffix: "", label: "Hackathon results" },
  ],
  links: {
    github: "https://github.com/Harsh-4210",
    huggingface: "https://huggingface.co/Harsh-9209",
    linkedin: "https://www.linkedin.com/in/harsh-jain0621/",
    resume: "/HARSH_JAIN_RESUME.pdf",
  },
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "conflictbench",
    title: "ConflictBench",
    tagline:
      "An RL environment that trains a 3B language model to resolve contradictory business instructions.",
    year: "2026",
    role: "Solo · Top 100 finalist, Meta × PyTorch × Hugging Face OpenEnv Hackathon",
    kind: "RL environment · LLM post-training",
    highlight: "Composite reward 0.14 → 0.50 on a deterministic, five-rubric verifier",
    pipeline: ["Conflicting directives", "JSON plan", "Deterministic verifier", "Reward", "GRPO + LoRA"],
    stack: ["Python", "TRL (GRPO)", "Unsloth", "LoRA", "Qwen2.5-3B", "OpenEnv", "FastAPI", "Gradio", "W&B"],
    problem:
      "Legal, executives, VPs and team leads routinely send instructions that contradict each other. Asked to plan from such a document, language models trust the latest or longest message, try to satisfy both sides of a contradiction, or return prose that no program can execute.",
    approach: [
      "A scenario generator builds documents of 6–16 directives with 2–6 embedded conflict pairs across ten business domains (hiring, deployments, budgets and others), each with a ground-truth resolution.",
      "A deterministic verifier, with no LLM judge, scores each plan on five rubrics: final-state correctness (0.35), freedom from contradictions (0.25), conflict-pair F1 (0.20), efficiency (0.10) and JSON-schema compliance (0.10).",
      "The authority ranking is stated in the prompt. What the model has to learn is applying it across a messy document and returning one executable JSON plan.",
      "Trained Qwen2.5-3B (4-bit, Unsloth) with GRPO and LoRA on 400 scenarios for two epochs. The environment is served over the OpenEnv HTTP interface (/reset, /step, /state).",
    ],
    result:
      "Composite reward rose from 0.14 for the untouched base model to 0.50 at the best checkpoint. The largest gains were in following the correct instructions and naming the conflicts.",
    metrics: {
      caption: "Verifier scores (0–1) on held-out scenarios from the same generator. Base: untouched model. Best: published checkpoint. Final: last step of the run.",
      columns: ["Base", "Best", "Final"],
      rows: [
        { label: "Composite", start: "0.14", best: "0.50", end: "0.48" },
        { label: "Follows the right instructions", start: "0.11", best: "0.48", end: "0.46" },
        { label: "No contradictions", start: "0.31", best: "0.74", end: "0.71" },
        { label: "Finds the conflicts", start: "0.08", best: "0.39", end: "0.37" },
        { label: "Plan efficiency", start: "0.62", best: "0.71", end: "0.70" },
        { label: "Valid JSON", start: "0.65", best: "0.88", end: "0.89" },
      ],
    },
    limitations: [
      "One training run. Evaluation scenarios come from the same ten templates as training, so this measures in-distribution skill, not transfer to real company documents.",
      "Conflict detection peaks at 0.39: the model still misses most conflicts.",
      "The KL penalty was loose. Reward peaked near step 250 and then drifted, so the published adapter is the peak checkpoint, not the last one.",
      "The 0.50 run resumed from an earlier short run that already scored about 0.37; 0.14 is the untouched base model.",
    ],
    next: [
      "Hold out entire conflict domains to measure transfer.",
      "Remove the ranking from the prompt and test whether the model can recover it from reward alone.",
    ],
    links: [
      { label: "Source", href: "https://github.com/Harsh-4210/Conflict_Bench" },
      { label: "Live demo", href: "https://huggingface.co/spaces/Harsh-9209/Conflict_Bench" },
      { label: "LoRA adapter", href: "https://huggingface.co/Harsh-9209/conflictbench-qwen2.5-3b-grpo-lora" },
    ],
  },
  {
    slug: "insureclear",
    title: "InsureClear",
    tagline:
      "A multi-agent pipeline that turns a rejected Indian health-insurance claim into a reviewable appeal.",
    year: "2026",
    role: "Solo",
    kind: "Multi-agent LLM pipeline",
    highlight: "Five agents, a judge gate at 0.75, up to two revisions, restart-safe job queue",
    pipeline: ["Denial + policy", "Auditor", "Policy analyst", "IRDAI checker", "Writer", "Judge ≥ 0.75"],
    stack: ["Python", "Gemini", "FastAPI", "React", "SQLite", "Docker", "pytest"],
    problem:
      "A claim-denial letter mixes facts, policy clauses and conclusions. Challenging one means reading the policy against IRDAI regulations and knowing the escalation path, which most claimants cannot do on their own.",
    approach: [
      "Five agents run in sequence: an Auditor extracts a structured case snapshot; a Policy Analyst looks for exclusions, limits, waiting periods and counter-arguments; an IRDAI Checker attaches regulatory leads; an Appeal Writer drafts; a Judge scores.",
      "If the Judge scores a draft below 0.75, it returns concrete changes and the writer revises, up to two times, before the package is produced.",
      "A FastAPI job API (POST /api/analyze, GET /api/jobs/{id}) runs on a SQLite-backed queue with checkpoints, so named cases survive a restart. The React client shows per-agent progress, the judge scorecard and the revision state.",
      "Uploaded PDFs are deleted after processing. Every regulatory citation carries a manual-verification flag, and the letter is meant to be reviewed by a person before it is sent.",
    ],
    result:
      "End-to-end from PDF or text input to an appeal letter and a JSON report, with a CLI demo, a web UI and a Docker deployment path.",
    limitations: [
      "No labelled set of real appeal outcomes yet, so there is no accuracy number. The Judge is an LLM grading LLM output.",
      "Regulatory knowledge is a curated module of regulations, circulars and precedents, not retrieval over the full IRDAI corpus.",
    ],
    next: [
      "Build a small graded set of real denials and compare judge scores with human review.",
      "Replace the curated module with retrieval over versioned official circulars.",
    ],
    links: [{ label: "Source", href: "https://github.com/Harsh-4210/Insureclear" }],
  },
  {
    slug: "dealflow360",
    title: "DealFlow360",
    tagline:
      "B2B quote-to-cash on one PostgreSQL database: catalog, quote, approval, customer portal, fulfilment and billing.",
    year: "2026",
    role: "Team of four · top committer; built the customer portal, payment recording, catalog search and the seed dataset",
    kind: "Full-stack system · team of four",
    highlight: "Optimistic concurrency, idempotent writes, CI against a real Postgres 16",
    pipeline: ["Catalog", "Quote", "Approval", "Portal", "Fulfilment", "Billing"],
    stack: ["TypeScript", "Next.js 16", "React 19", "PostgreSQL 16", "Prisma 7", "Vitest", "GitHub Actions"],
    problem:
      "In small B2B sellers, a quote is edited in one tool, approved over chat, accepted by email and invoiced somewhere else. Each handoff is a chance to bill the wrong price or reserve stock twice.",
    approach: [
      "Quotes are revisioned and the customer can accept only the current revision. A write against an outdated revision is rejected with 409 STALE_REVISION.",
      "Mutating endpoints for fulfilment, portal confirmation and payments take idempotency keys, so a retried request cannot allocate stock or record a payment twice.",
      "An approval policy decides whether a quote needs manager or finance sign-off. Customer price lists are tiered.",
      "CI runs against a real Postgres 16 service: schema validation, migrations, seeding twice to prove the seed is idempotent, then typecheck, lint, 43 test files and a production build.",
    ],
    result:
      "The whole path from catalog to reports runs on one database, and CI checks it on every pull request.",
    limitations: [
      "Stripe, email and carrier integrations return 503 until keys are configured.",
      "Academic project with a demo tenant, not used by real customers.",
    ],
    links: [{ label: "Source", href: "https://github.com/orion-catchers/dealflow" }],
  },
];

export const otherWork: Entry[] = [
  {
    title: "Inquisitor",
    tags: "LLM · RL",
    year: "2026",
    description:
      "Red/blue self-play for hallucination detection. One model writes plausible wrong answers, another passes, flags or probes them, and both train with GRPO.",
    context: "In progress",
    href: "https://github.com/Harsh-4210/Inquisitor",
  },
  {
    title: "SilentFailureDetector",
    tags: "RL environment",
    year: "2026",
    description:
      "OpenEnv environment that rewards an agent for flagging answers that are confident and wrong, while leaving correct and hedged answers alone.",
    context: "Solo · HF Space",
    href: "https://huggingface.co/spaces/Harsh-9209/silent-failure-detector",
  },
  {
    title: "TraceLink",
    tags: "Full-stack · data",
    year: "2026",
    description:
      "Manufacturing traceability: backward and forward lot tracing, recall blast radius, CSV import with SHA-256 de-duplication and rollback.",
    context: "Team of three · MCCIA program",
    href: "https://github.com/ruxir-ig/mccia-tracelink",
  },
  {
    title: "Arivon",
    tags: "EdTech · RAG",
    year: "2026",
    description:
      "Adaptive learning that treats “sure and wrong” differently from “unsure and wrong”: knowledge graph, voice answers, document-grounded tutor.",
    context: "Team · 3rd place, Pragyantra",
    href: "https://github.com/nishtha911/Pragyantra-ED14-ET-3",
  },
  {
    title: "AssetFlow",
    tags: "Full-stack",
    year: "2026",
    description:
      "Asset allocation, bookings, maintenance and audits, with overlap-safe bookings and atomic transfers.",
    context: "Team · Odoo Hackathon",
    href: "https://github.com/Harsh-4210/Team-Artemis-",
  },
  {
    title: "Batwa",
    tags: "Payments API",
    year: "2026",
    description:
      "Assisted payments with a printed QR card and PIN for agents and merchants. I built the core FastAPI service.",
    context: "Team · Cognizant simulation",
    href: "https://github.com/BuildItPratik/Batwa",
  },
  {
    title: "AutoStream",
    tags: "LLM agent",
    year: "2026",
    description:
      "LangGraph agent with intent routing, retrieval over FAISS and slot-filling lead capture behind a controlled tool call.",
    context: "Solo",
    href: "https://github.com/Harsh-4210/Autostream-Langgraph-agent",
  },
  {
    title: "Self-Evolving Governance",
    tags: "Multi-agent RL",
    year: "2025",
    description:
      "Multi-agent RL (RLlib PPO, PettingZoo) in which market agents trade and vote on tax rules.",
    context: "Team · Fusion Hackathon",
    href: "https://github.com/Harsh-4210/Self_Evolving_Multi_Agent_Governance",
  },
];

export const experience = [
  {
    role: "Machine Learning Intern",
    org: "Prodigy InfoTech",
    period: "Nov 2025 – Jan 2026",
    detail:
      "Five scoped ML tasks: house-price regression, K-Means customer segmentation, SVM image classification, CNN hand-gesture recognition, and food recognition with calorie estimation.",
    href: "https://github.com/Harsh-4210/PRODIGY_ML_PROJECTS",
  },
];

export const education = {
  school: "Savitribai Phule Pune University",
  degree: "B.E. Artificial Intelligence & Data Science",
  period: "2022 – 2027",
  grade: "GPA 8.75 / 10",
};

export const recognition = [
  { title: "Top 100 finalist", event: "Meta × PyTorch × Hugging Face OpenEnv Hackathon", year: "2026", for: "ConflictBench" },
  { title: "3rd place", event: "Pragyantra, PES Modern College of Engineering", year: "2026", for: "Arivon" },
];

export const toolkit = [
  { area: "Modelling", items: "PyTorch, Hugging Face Transformers, TRL, PEFT / LoRA, Unsloth, scikit-learn" },
  { area: "RL & evaluation", items: "GRPO, PPO (RLlib), OpenEnv, reward design, W&B" },
  { area: "LLM applications", items: "Multi-agent pipelines, LangGraph, RAG (FAISS), structured output" },
  { area: "Backend & data", items: "Python, FastAPI, TypeScript, Next.js, PostgreSQL, Prisma, SQLite, MongoDB" },
  { area: "Shipping", items: "Docker, GitHub Actions, Hugging Face Spaces, Render" },
];

// Radial skills layout on /about: x/y are offsets from the centre in vw.
export const skills = [
  { name: "PyTorch", x: -20, y: 2 },
  { name: "TRL / GRPO", x: -5, y: -10 },
  { name: "LoRA", x: 20, y: 6 },
  { name: "Transformers", x: 0, y: 12 },
  { name: "FastAPI", x: -20, y: -15 },
  { name: "LangGraph", x: 15, y: -12 },
  { name: "PostgreSQL", x: 32, y: -5 },
  { name: "Docker", x: 0, y: -20 },
  { name: "TypeScript", x: -25, y: 18 },
  { name: "Unsloth", x: 18, y: 18 },
  { name: "Next.js", x: -34, y: -4 },
];

// Timeline on /about, newest first.
export const journey = [
  {
    title: "Top 100 finalist",
    org: "Meta × PyTorch × Hugging Face OpenEnv Hackathon",
    href: "https://huggingface.co/spaces/Harsh-9209/Conflict_Bench",
    time: "Apr 2026",
    detail:
      "Built ConflictBench solo: an RL environment, a deterministic five-rubric verifier, and a GRPO-trained Qwen2.5-3B adapter published on Hugging Face.",
  },
  {
    title: "3rd place",
    org: "Pragyantra, PES Modern College of Engineering",
    href: "https://github.com/nishtha911/Pragyantra-ED14-ET-3",
    time: "Apr 2026",
    detail:
      "Team project Arivon: an adaptive learning platform that treats confident mistakes differently from unsure ones, with a knowledge graph and a document-grounded tutor.",
  },
  {
    title: "Industry program",
    org: "MCCIA Industrial Innovation Program",
    href: "https://github.com/ruxir-ig/mccia-tracelink",
    time: "Apr – Jun 2026",
    detail:
      "One of three engineers on TraceLink, a lot-traceability system for an auto-parts manufacturer: backward and forward tracing, recall blast radius, and CSV import with rollback.",
  },
  {
    title: "Machine Learning Intern",
    org: "Prodigy InfoTech",
    href: "https://github.com/Harsh-4210/PRODIGY_ML_PROJECTS",
    time: "Nov 2025 – Jan 2026",
    detail:
      "Five scoped ML tasks: house-price regression, K-Means customer segmentation, SVM image classification, CNN hand-gesture recognition, and food recognition with calorie estimation.",
  },
];
