"use client";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    rank: "Finalist",
    event: "Meta × PyTorch × HuggingFace OpenEnv Hackathon",
    location: "Bangalore",
    project: "ConflictBench",
    description:
      "Competed solo. Built a GRPO-based RL environment that fine-tuned Qwen2.5-3B to resolve contradictory business instructions across a 6-tier authority hierarchy from reward signal alone.",
    tags: ["GRPO", "LoRA", "Qwen2.5-3B", "TRL"],
    color: "var(--primary)",
    bg: "rgba(124,58,237,0.1)",
    border: "rgba(124,58,237,0.3)",
  },
  {
    icon: Medal,
    rank: "Top 100",
    event: "Scaler School of Technology — OpenEnv Pre-selection",
    location: "Online",
    project: "ConflictBench",
    description:
      "Selected in the top 100 during Scaler's pre-selection round for the same ConflictBench system, evaluated on code quality, research novelty, and reward design.",
    tags: ["RL", "LLM", "Reward Design"],
    color: "var(--secondary)",
    bg: "rgba(170,2,102,0.1)",
    border: "rgba(170,2,102,0.3)",
  },
  {
    icon: Award,
    rank: "3rd Place",
    event: "Pragyantra — PES Modern College of Engineering",
    location: "Pune",
    project: "Arivon",
    description:
      "Built an adaptive learning platform detecting metacognitive miscalibration with Groq Whisper voice exams, Haystack RAG mentor, and a React Flow knowledge graph.",
    tags: ["Next.js 15", "FastAPI", "Groq", "Haystack RAG"],
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
  },
];

const certs = [
  "Deep Learning Specialization — Andrew Ng / deeplearning.ai",
  "Machine Learning Specialization — Andrew Ng / deeplearning.ai",
  "Building Systems with the ChatGPT API (RAG) — deeplearning.ai",
  "Generative AI with LLMs — AWS / Coursera",
  "LLM Fundamentals — Hugging Face",
  "100 Days of Code: Python Pro Bootcamp — Udemy",
];

export default function Hackathons() {
  return (
    <section id="awards" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="section-label mb-2">Recognition</p>
        <h2
          className="font-black tracking-tight mb-4"
          style={{
            fontSize: "clamp(2rem,5vw,3rem)",
            color: "var(--on-surface)",
            letterSpacing: "-0.02em",
          }}
        >
          Hackathons &amp; Awards
        </h2>
        <div
          className="w-12 h-0.5 rounded-full mb-12"
          style={{ background: "var(--primary-container)", opacity: 0.6 }}
        />
      </motion.div>

      {/* Award cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {awards.map((a, i) => (
          <motion.div
            key={a.event}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Rank badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: a.bg, border: `1px solid ${a.border}` }}
              >
                <a.icon size={13} style={{ color: a.color }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: a.color,
                    letterSpacing: "0.05em",
                  }}
                >
                  {a.rank}
                </span>
              </div>
            </div>

            <h3
              className="font-bold mb-1 leading-tight"
              style={{ fontSize: "0.95rem", color: "var(--on-surface)" }}
            >
              {a.event}
            </h3>
            <p
              className="mb-1"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--outline)",
                letterSpacing: "0.05em",
              }}
            >
              {a.location} · {a.project}
            </p>

            <p
              className="text-xs leading-relaxed mt-3 flex-grow"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {a.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {a.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: a.bg,
                    border: `1px solid ${a.border}`,
                    color: a.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <p
          className="mb-5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--on-surface-variant)",
          }}
        >
          Certifications
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {certs.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-3 rounded-xl transition-colors"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(210,187,255,0.2)";
                e.currentTarget.style.background = "rgba(124,58,237,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--primary)" }}
              />
              <p
                className="text-sm leading-snug"
                style={{ color: "var(--on-surface-variant)" }}
              >
                {c}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}