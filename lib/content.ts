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
    "I build training environments and evaluation harnesses for language models, evidence-backed AI applications, and tools for reviewing coding agents.",
  focus:
    "My recent work spans ConflictBench, InsureClear and Drishya: making model decisions checkable, appeal drafts reviewable, and agent work visible.",
  availability:
    "Final-year B.E. student in AI & Data Science. Open to ML engineering internships and 2027 full-time roles.",
  headline: "I train small models to make decisions you can verify.",
  bio: [
    "I'm a final-year AI & Data Science student at Savitribai Phule Pune University. Most of what I build sits where research meets shipping: an environment and reward function on one side, an API someone can actually call on the other.",
    "Lately that has meant redesigning ConflictBench around deterministic evaluation, building evidence and human approval into InsureClear, and creating Drishya to watch coding agents and review their changes locally.",
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
    "slug": "drishya",
    "title": "Drishya",
    "tagline": "A local workspace to watch coding agents live, replay their sessions, and review the code they change.",
    "year": "2026",
    "role": "Creator",
    "kind": "Developer tools · Agent observability",
    "highlight": "Live activity, session replay, branch and PR review across Claude Code, Codex and Antigravity",
    "pipeline": [
      "Agent sessions",
      "Local capture",
      "Secret redaction",
      "Live workspace",
      "Review + replay"
    ],
    "stack": [
      "TypeScript",
      "Node.js 24",
      "React",
      "Vite",
      "CodeMirror",
      "SQLite",
      "Vitest",
      "Playwright"
    ],
    "problem": "Coding agents read files, run commands and edit code across separate tools. A final summary leaves out the evidence needed to understand their decisions and review the result.",
    "approach": [
      "Capture reads, searches, commands, tests and edits as they happen, showing actual files, output and diffs beside the repository.",
      "Bring Claude Code, Codex and Antigravity sessions into one Home with replay and search over opened sessions. Show when reasoning was not recorded rather than inventing it.",
      "Keep Workspace, branch and pull-request Changes, and the Git graph next to the session, with attribution showing which agent touched each file.",
      "Let users answer questions and approvals and send follow-up prompts to Claude Code and Codex. Antigravity currently supports live view and replay.",
      "Run locally with no telemetry and redact secrets before storage. Separate capture, ingestion, projection, privacy and agent adapters into workspace packages."
    ],
    "result": "A working local review workspace with live agent activity, session history, code review and a packaged CLI. The public website shows the product and its review workflow.",
    "limitations": [
      "Antigravity does not support sending prompts; T3 Code and Hermes Agent are exploratory integrations.",
      "Session visibility depends on what each agent records. Missing reasoning is explicitly labelled."
    ],
    "next": [
      "Expand agent integrations while preserving accurate capture and local privacy boundaries."
    ],
    "links": [
      {
        "label": "Source",
        "href": "https://github.com/drishya-dev/drishya"
      },
      {
        "label": "Website",
        "href": "https://drishya-dev.github.io/drishya/"
      }
    ]
  },
  {
    "slug": "conflictbench",
    "title": "ConflictBench",
    "tagline": "An RL environment and GRPO pipeline for resolving conflicting business instructions by authority.",
    "year": "2026",
    "role": "Solo · Top 100 finalist, Meta × PyTorch × Hugging Face OpenEnv Hackathon",
    "kind": "RL environment · Deterministic evaluation",
    "highlight": "Redesigned reward, six authority rules and a fixed 600-scenario held-out test set",
    "pipeline": [
      "Business instructions",
      "JSON plan",
      "Deterministic resolver",
      "Verifier",
      "GRPO + LoRA"
    ],
    "stack": [
      "Python",
      "TRL (GRPO)",
      "Unsloth",
      "LoRA",
      "Qwen2.5-3B",
      "OpenEnv",
      "Gradio"
    ],
    "problem": "When business instructions clash, a model must identify the real conflict, apply the right authority rule and return an executable plan. A weak reward can instead reward shortcuts, empty plans or superficial keyword matching.",
    "approach": [
      "Audit the original task and reward, then redesign the default generator with hidden job-title hierarchy, balanced winners, distractors and disjoint train, validation and test wording.",
      "Use one deterministic resolver for seniority, scoped standing rules, delegation, dated supersession, conditional instructions and dependency chains. No LLM judge is used.",
      "Score final-state correctness (45%), conflict identification (30%) and consistency (25%), multiplied by a JSON format gate. Penalize invented IDs, overlapping decisions and empty plans.",
      "Commit a fixed, SHA-256-tracked test set of 600 scenarios across three difficulty levels. Record task, scorer, protocol and scenario-selection provenance so incompatible runs are not ranked together.",
      "Provide CPU rule-based and cheat baselines, an OpenEnv server, a Gradio demo and GRPO/LoRA training configurations for future model evaluation."
    ],
    "result": "The redesigned task and verifier have CPU test coverage and measured rule-based and cheat baselines. No GPU training or model evaluation has been run on the new task; the historical hackathon adapter has not been re-scored.",
    "limitations": [
      "Historical training reward scores do not establish performance on the redesigned task.",
      "Each episode is one prompt and one JSON answer; multi-turn, long-horizon evaluation is future work.",
      "The scenarios are synthetic business instructions. Real-document transfer remains unmeasured."
    ],
    "next": [
      "Evaluate the base model and historical adapter on the fixed test set with the same scorer and protocol.",
      "Run fresh GRPO training and publish reproducible model results."
    ],
    "links": [
      {
        "label": "Source",
        "href": "https://github.com/Harsh-4210/Conflict_Bench"
      },
      {
        "label": "Live demo",
        "href": "https://huggingface.co/spaces/Harsh-9209/Conflict_Bench"
      },
      {
        "label": "Evaluation record",
        "href": "https://github.com/Harsh-4210/Conflict_Bench/tree/main/results"
      }
    ]
  },
  {
    "slug": "insureclear",
    "title": "InsureClear",
    "tagline": "Turn an Indian health-insurance denial and policy into an evidence-backed appeal draft for human review.",
    "year": "2026",
    "role": "Solo",
    "kind": "Multi-agent LLM pipeline · Review workspace",
    "highlight": "Versioned evidence, named accounts and exports bound to the exact human-approved revision",
    "pipeline": [
      "Denial + policy",
      "Extraction",
      "Policy + regulation",
      "Appeal draft",
      "Human review",
      "Approved export"
    ],
    "stack": [
      "Python",
      "Groq",
      "FastAPI",
      "React",
      "SQLite",
      "Docker",
      "pytest"
    ],
    "problem": "A denial letter mixes claim facts, policy clauses and conclusions. Preparing an appeal requires checking source evidence and regulatory applicability, then ensuring the exported letter is the version a qualified reviewer actually approved.",
    "approach": [
      "Accept a fictional demo, paired text or paired PDFs and track extraction, policy analysis, regulatory checking, drafting and model review in a React workspace.",
      "Attach exact policy excerpts, source offsets, versioned regulatory references and coverage limits to the case so a reviewer can inspect the evidence behind the draft.",
      "Keep draft revisions and reviewer decisions separate. Reviewers record facts, coverage and legal-applicability checks; later edits invalidate approval, and approved export serves only the reviewed version.",
      "Use named accounts, organization and ownership boundaries, HTTP-only sessions, Origin and CSRF checks, bounded uploads and private no-store responses.",
      "Run cases through a SQLite-backed queue with checkpoints, progress, bounded admission, cooperative cancellation, confined deletion and readiness checks. Groq is the documented provider; Gemini needs separate migration and qualification."
    ],
    "result": "A local MVP with an end-to-end case workspace and human approval workflow. The repository records 278 passing backend tests (one platform-dependent skip), 16 frontend tests and a successful production build. Private pilot acceptance remains open.",
    "limitations": [
      "The historical ten-case Groq baseline is a small synthetic cohort, not evidence of real appeal outcomes or final release qualification.",
      "Final pilot acceptance still needs two fresh passing runs on the release candidate, qualified review and environment, backup and capacity checks.",
      "The Vercel preview contains the landing page only. Connected pilot hosting and environment acceptance remain open."
    ],
    "next": [
      "Complete final-candidate regression runs and qualified review on representative cases.",
      "Verify persistent hosting, HTTPS, retention, backup recovery and pilot capacity."
    ],
    "links": [
      {
        "label": "Source",
        "href": "https://github.com/Harsh-4210/Insureclear"
      },
      {
        "label": "Pilot status",
        "href": "https://github.com/Harsh-4210/Insureclear/blob/main/docs/PILOT_ACCEPTANCE.md"
      }
    ]
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
      "Built ConflictBench solo for the hackathon. The task and deterministic verifier have since been redesigned; the historical adapter still needs evaluation on the new benchmark.",
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
