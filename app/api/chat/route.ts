import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_MODEL_CHAIN = [
  "baidu/cobuddy:free",
  "poolside/laguna-xs.2:free",
  "openrouter/owl-alpha",
  "poolside/laguna-m.1:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "openrouter/free",
] as const;

const CHAT_TIMEOUT_MS = 5_000;
const HISTORY_LIMIT = 4;
const MAX_TOKENS = 220;

class OpenRouterError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
    readonly retryAfter: string | null
  ) {
    super(`OpenRouter ${status}: ${body}`);
  }
}

const SYSTEM_PROMPT = `You are the AI assistant embedded in Harsh Jain's portfolio website.
Answer visitor questions about Harsh Jain using only the facts below.

FORMAT RULES:
1. Reply in 3 to 5 numbered points.
2. Keep each point to one short sentence.
3. Start directly with the answer.
4. Do not use markdown symbols, headings, bullets, or long paragraphs.
5. If the question is about contact, include the email.
6. For project or skill summaries, give the top 3 unless the visitor asks for all.

ABOUT:
Harsh Jain is an Applied ML and AI student at Savitribai Phule Pune University, Pune.
He is pursuing B.E. in Artificial Intelligence and Data Science from Aug 2022 to May 2027.
GPA: 8.75/10.
Email: harshjain0621@gmail.com.
GitHub: github.com/Harsh-4210.
LinkedIn: linkedin.com/in/harsh-jain0621.
He is open to internships in Machine Learning, AI, and backend engineering.

SKILLS:
Python, SQL, JavaScript, TypeScript, FastAPI, Next.js 15, React.
PyTorch, GRPO, PPO, LoRA, QLoRA, TRL, Unsloth, HuggingFace Transformers, PEFT, Ray RLlib, XGBoost, Optuna.
YOLOv8, ONNX Runtime, OpenCV, Albumentations.
Docker, GitHub Actions, Google Cloud, PostgreSQL, MongoDB, Redis.
RAG pipelines, RLHF, adversarial RL, agentic AI, Haystack.

PROJECTS:
ConflictBench: RL environment for resolving contradictory business instructions using a 6-tier authority hierarchy. Fine-tuned Qwen2.5-3B with GRPO and LoRA on 400 enterprise conflict scenarios. Composite reward improved from 0.14 to 0.50, a 257% lift. Finalist at Meta x PyTorch x HuggingFace OpenEnv Hackathon.
ARMS RACE: Two-agent adversarial oversight arena where a Red Agent generates hallucinations and a Blue Agent flags them. Hallucination detection improved from 25% to 100% with a 4% false-alarm rate.
TraceLink: Production manufacturing traceability system with 6 entity types, bi-directional trace, 6-role RBAC, Firebase ID-token verification, CSV rollback, audit trails, and an AI query endpoint.
Arivon: Adaptive learning platform that detects metacognitive miscalibration and adjusts learning paths with a Bloom's taxonomy engine. Uses Groq Whisper, Haystack RAG, React Flow, PostgreSQL, MongoDB, and Redis. Won 3rd place at Pragyantra.
SO2 Emission Prediction System: FastAPI ML service predicting SO2 emissions from Indian coal power plants with XGBoost and Optuna, reaching 85% accuracy.

AWARDS:
Finalist at Meta x PyTorch x HuggingFace OpenEnv Hackathon for ConflictBench.
Top 100 at Scaler School of Technology OpenEnv pre-selection for ConflictBench.
3rd place at Pragyantra Hackathon, PES Modern College of Engineering, for Arivon.

CERTIFICATIONS:
Deep Learning Specialization by Andrew Ng.
Machine Learning Specialization by Andrew Ng.
Generative AI with LLMs by AWS and Coursera.
Building RAG Systems with LangChain by deeplearning.ai.
LLM Fundamentals by Hugging Face.
100 Days of Code: The Complete Python Pro Bootcamp by Udemy.`;

type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

async function callOpenRouter(
  messages: OpenRouterMessage[],
  apiKey: string,
  model: string
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://harsh-portfolio.vercel.app",
        "X-Title": "Harsh Jain Portfolio",
      },
      body: JSON.stringify({
        model,
        provider: {
          allow_fallbacks: true,
          sort: "latency",
        },
        messages,
        temperature: 0.35,
        max_tokens: MAX_TOKENS,
        top_p: 0.85,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new OpenRouterError(res.status, err, res.headers.get("Retry-After"));
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } finally {
    clearTimeout(timeout);
  }
}

function cleanReply(reply: string) {
  return reply
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getInstantReply(message: string) {
  const query = message.toLowerCase();
  const wantsAll = /\ball\b|\bevery\b|\bfull\b/.test(query);

  if (/\b(hi|hello|hey|greetings|howdy|sup)\b/.test(query) && query.length < 20) {
    return [
      "1. Hello! I'm Harsh's AI assistant.",
      "2. I can tell you about his projects, skills, or how to contact him.",
      "3. What would you like to know?"
    ].join("\n");
  }

  if (/\b(how are you|how do you do|what's up|hows it going)\b/.test(query)) {
    return [
      "1. I'm doing great, thanks for asking!",
      "2. I'm here to help you learn more about Harsh and his work.",
      "3. Ask me about his ML projects or engineering skills."
    ].join("\n");
  }

  if (/\bproject|work|built|build|portfolio\b/.test(query)) {
    const topProjects = [
      "1. ConflictBench trains LLMs to resolve contradictory business instructions with GRPO and LoRA, improving reward from 0.14 to 0.50.",
      "2. ARMS RACE is a two-agent adversarial oversight arena that improved hallucination detection from 25% to 100%.",
      "3. TraceLink is a production manufacturing traceability system with RBAC, audit trails, CSV rollback, and an AI query endpoint.",
    ];
    const extraProjects = [
      "4. Arivon is an adaptive learning platform using Groq Whisper, Haystack RAG, React Flow, PostgreSQL, MongoDB, and Redis.",
      "5. The SO2 Emission Prediction System is a FastAPI and XGBoost service that reached 85% accuracy.",
    ];

    return [...topProjects, ...(wantsAll ? extraProjects : [])].join("\n");
  }

  if (/\bskill|stack|tech|technology|tools?\b/.test(query)) {
    return [
      "1. Harsh works with Python, SQL, JavaScript, TypeScript, FastAPI, Next.js, and React.",
      "2. His ML stack includes PyTorch, GRPO, PPO, LoRA, QLoRA, TRL, Unsloth, HuggingFace Transformers, and XGBoost.",
      "3. His infrastructure experience includes Docker, GitHub Actions, Google Cloud, PostgreSQL, MongoDB, and Redis.",
    ].join("\n");
  }

  if (/\bcontact|email|reach|hire|internship|available|availability\b/.test(query)) {
    return [
      "1. Harsh is open to internships in Machine Learning, AI, and backend engineering.",
      "2. You can email him directly at harshjain0621@gmail.com.",
      "3. You can also connect through GitHub at github.com/Harsh-4210 or LinkedIn at linkedin.com/in/harsh-jain0621.",
    ].join("\n");
  }

  if (/\bwho|about|intro|introduction|harsh\b/.test(query)) {
    return [
      "1. Harsh Jain is an Applied ML and AI student at Savitribai Phule Pune University, Pune.",
      "2. He is pursuing B.E. in Artificial Intelligence and Data Science with a GPA of 8.75/10.",
      "3. His work focuses on ML systems, reinforcement learning, LLM fine-tuning, backend APIs, and production deployments.",
    ].join("\n");
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const instantReply = getInstantReply(message);

    if (instantReply) {
      return NextResponse.json({ reply: instantReply });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "1. The chat is temporarily offline.\n2. Please email harshjain0621@gmail.com directly." },
        { status: 200 }
      );
    }

    const pastMessages = Array.isArray(history) ? history : [];

    const messages: OpenRouterMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...pastMessages
        .slice(-HISTORY_LIMIT)
        .map((item: { role?: string; content?: string }) => ({
          role: item.role === "assistant" ? "assistant" as const : "user" as const,
          content: String(item.content ?? "").slice(0, 600),
        }))
        .filter((item) => item.content.trim().length > 0),
      { role: "user", content: message.trim().slice(0, 600) },
    ];

    let reply: string | null = null;

    for (const model of OPENROUTER_MODEL_CHAIN) {
      try {
        reply = await callOpenRouter(messages, apiKey, model);
        if (reply) break;
      } catch (error) {
        if (error instanceof OpenRouterError) {
          const retryMessage = error.retryAfter ? ` Retry-After: ${error.retryAfter}s.` : "";
          console.warn(`OpenRouter model failed (${model}) with ${error.status}.${retryMessage}`, error.body);
        } else {
          console.warn(`OpenRouter model failed (${model}):`, error);
        }
      }
    }

    if (!reply) {
      return NextResponse.json(
        { reply: "1. I am having trouble connecting right now.\n2. Please email harshjain0621@gmail.com directly." },
        { status: 200 }
      );
    }

    return NextResponse.json({ reply: cleanReply(reply) });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { reply: "1. Something went wrong.\n2. Please reach out at harshjain0621@gmail.com." },
      { status: 200 }
    );
  }
}
