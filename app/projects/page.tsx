"use client";
import { useState } from "react";
import Link from "next/link";

const filters = ["All Projects", "Machine Learning", "Backend", "Data Engineering"];

const projects = [
  {
    id: 1,
    title: "ConflictBench",
    description:
      "RL environment that trains language models to resolve contradictory business instructions by learning an implicit 6-tier authority hierarchy entirely from reward signals. Fine-tuned Qwen2.5-3B with GRPO + LoRA.",
    tags: ["GRPO", "Qwen2.5-3B", "LoRA", "Unsloth", "TRL"],
    stats: [
      { label: "Reward Lift", value: "+257%" },
      { label: "Epochs", value: "2" },
      { label: "GPU", value: "A100" },
    ],
    span: 8,
    accentColor: "primary",
    category: "Machine Learning",
    link: "https://github.com/Harsh-4210",
  },
  {
    id: 2,
    title: "ARMS RACE",
    description:
      "Two-agent adversarial loop where a Red Agent generates hallucinations and a Blue Agent acts as factual gatekeeper. Detection improved from 25% → 100% with Expert Correction Training.",
    tags: ["PPO", "LoRA", "PEFT", "REINFORCE", "SFT"],
    stats: [
      { label: "Detection", value: "100%" },
      { label: "False Alarm", value: "4%" },
      { label: "OOD Gen", value: "96%" },
    ],
    span: 4,
    accentColor: "secondary",
    category: "Machine Learning",
    link: "https://github.com/Harsh-4210",
  },
  {
    id: 3,
    title: "TraceLink",
    description:
      "Production-deployed manufacturing traceability system with 6-role RBAC, CSV ingestion with full rollback, audit trail, and NL query endpoint. Containerised into single Docker image.",
    tags: ["FastAPI", "React", "Firebase Auth", "SQLite", "Docker"],
    stats: [
      { label: "Entity Types", value: "6" },
      { label: "RBAC Roles", value: "6" },
    ],
    span: 6,
    accentColor: "primary",
    category: "Backend",
    link: "https://github.com/Harsh-4210",
  },
  {
    id: 4,
    title: "Arivon — Adaptive Learning",
    description:
      "Adaptive learning platform detecting metacognitive miscalibration. Voice exam via Groq Whisper, RAG study mentor via Haystack, React Flow knowledge graph. 3rd Place Pragyantra.",
    tags: ["Next.js 15", "FastAPI", "Groq Whisper", "Haystack RAG", "MongoDB"],
    stats: [
      { label: "Award", value: "3rd Place" },
      { label: "Event", value: "Pragyantra" },
    ],
    span: 6,
    accentColor: "primary",
    category: "Machine Learning",
    link: "https://github.com/Harsh-4210",
  },
  {
    id: 5,
    title: "SO₂ Emission Prediction",
    description:
      "End-to-end ML pipeline predicting SO₂ emissions from Indian coal power plants. 85% accuracy via cross-validation, Optuna tuning, deployed as containerised FastAPI microservice.",
    tags: ["XGBoost", "FastAPI", "Docker", "PostgreSQL", "Optuna"],
    stats: [
      { label: "Accuracy", value: "85%" },
      { label: "Efficiency", value: "+20%" },
    ],
    span: 6,
    accentColor: "primary",
    category: "Machine Learning",
    link: "https://github.com/PurveshMali/PBL",
  },
  {
    id: 6,
    title: "Multi-Agent Governance",
    description:
      "Decentralized multi-agent RL system for autonomous decision-making using PPO with custom reward shaping. ~30% better convergence rate.",
    tags: ["Python", "Ray RLlib", "FastAPI", "gRPC", "PostgreSQL"],
    stats: [
      { label: "Convergence", value: "+30%" },
    ],
    span: 6,
    accentColor: "secondary",
    category: "Machine Learning",
    link: "https://github.com/Harsh-4210/Self_Evolving_Multi_Agent_Governance",
  },
];

const Footer = () => (
  <footer style={{ background: "var(--bg)", borderTop: "1px solid rgba(74,68,85,0.2)", marginTop: "96px" }}>
    <div
      className="flex flex-col md:flex-row justify-between items-center"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 80px", gap: "16px" }}
    >
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 700, color: "var(--primary)" }}>HJ.</div>
      <p className="font-code-label text-code-label" style={{ color: "var(--secondary)" }}>© 2024 Harsh Jain. Built with Precision.</p>
      <div className="flex items-center" style={{ gap: "24px" }}>
        {[
          { label: "GitHub", href: "https://github.com/Harsh-4210" },
          { label: "LinkedIn", href: "https://linkedin.com/in/harsh-jain0621" },
          { label: "Twitter", href: "#" },
          { label: "Email", href: "mailto:harshjain0621@gmail.com" },
        ].map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            className="font-code-label text-code-label"
            style={{ color: "var(--on-tertiary-fixed-variant)", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-tertiary-fixed-variant)")}
          >{link.label}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filtered = projects.filter(
    (p) => activeFilter === "All Projects" || p.category === activeFilter
  );

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--on-surface)" }}>
      <main className="flex flex-col" style={{ gap: "120px", paddingTop: "48px", paddingBottom: "96px" }}>

        {/* Header */}
        <section className="text-center" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              background: "linear-gradient(135deg, #d2bbff 0%, #ffb0cd 50%, #d2bbff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Engineered Solutions.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", lineHeight: 1.6, color: "var(--on-surface-variant)", maxWidth: "672px", margin: "0 auto" }}>
            A curated selection of RL systems, LLM fine-tuning pipelines, production ML deployments, and scalable backend architectures.
          </p>
        </section>

        {/* Projects Grid */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>

          {/* Filters */}
          <div className="flex flex-wrap justify-center" style={{ gap: "16px", marginBottom: "48px", position: "relative", zIndex: 20 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-code-label text-code-label"
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: activeFilter === f ? "1px solid rgba(210,187,255,0.3)" : "1px solid rgba(255,255,255,0.1)",
                  background: activeFilter === f ? "rgba(210,187,255,0.2)" : "rgba(255,255,255,0.05)",
                  color: activeFilter === f ? "var(--primary)" : "var(--on-surface-variant)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f) (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f) (e.currentTarget as HTMLButtonElement).style.color = "var(--on-surface-variant)";
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Bento Grid */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "24px",
            }}
          >
            {filtered.map((project) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.id}
                className="bento-card group"
                style={{
                  gridColumn: `span ${project.span}`,
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: project.span >= 8 ? "400px" : "350px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* Hover gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.5s",
                    zIndex: 0,
                  }}
                  className="group-hover:opacity-100"
                />

                {/* Stats overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
                    opacity: 0,
                    transition: "all 0.3s",
                    zIndex: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "32px",
                    transform: "translateY(8px)",
                  }}
                  className="group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <div className="flex items-end" style={{ gap: "24px" }}>
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div
                          className="font-code-label"
                          style={{
                            color: "var(--primary)",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontSize: "10px",
                          }}
                        >
                          {stat.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "white",
                          }}
                        >
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    className="flex justify-between items-start"
                    style={{ marginBottom: "24px" }}
                  >
                    <h2
                      className="project-card-title"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: project.span >= 8 ? "32px" : "24px",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        transition: "color 0.3s",
                        maxWidth: "80%",
                      }}
                    >
                      {project.title}
                    </h2>
                    <div
                      style={{ color: "rgba(210,187,255,0.5)", transition: "all 0.3s" }}
                      className="group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_outward</span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: project.span >= 8 ? "18px" : "14px",
                      lineHeight: 1.5,
                      color: "var(--on-surface-variant)",
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap" style={{ gap: "8px", marginTop: "32px", position: "relative", zIndex: 3 }}>
                    {project.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="glass-tag font-code-label text-code-label"
                        style={{
                          padding: "4px 12px",
                          borderRadius: "6px",
                          color: i === 0 ? "var(--primary)" : "var(--on-surface)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Architecture Insight */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>
          <h2
            className="text-gradient text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "32px",
            }}
          >
            System Architecture Insight
          </h2>
          <div
            className="bento-card"
            style={{ borderRadius: "16px", padding: "48px" }}
          >
            <div
              className="grid"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "16px",
                  }}
                >
                  ConflictBench — RL Training Pipeline
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    color: "var(--on-surface-variant)",
                    marginBottom: "24px",
                  }}
                >
                  GRPO fine-tuning loop: 400 scenarios, deterministic reward function (5 rubrics), LoRA adapter (r=32), trained on A100 48GB. Composite reward lifted from 0.14 → 0.50 over zero-shot baseline.
                </p>
                <a
                  href="https://github.com/Harsh-4210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code-label text-code-label"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 32px",
                    background: "var(--primary-container)",
                    color: "var(--on-primary-container)",
                    border: "1px solid rgba(210,187,255,0.5)",
                    borderRadius: "12px",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    boxShadow: "0 0 15px rgba(124,58,237,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 35px rgba(124,58,237,0.8)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary-container)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--on-primary-container)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 15px rgba(124,58,237,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                  }}
                >
                  <span style={{ fontWeight: 700, letterSpacing: "0.05em" }}>View Technical Spec</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_right_alt</span>
                </a>
              </div>

              {/* Diagram */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(14,14,19,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, transparent 100%)",
                  }}
                />
                <div
                  className="flex items-center justify-center"
                  style={{ gap: "32px", position: "relative", zIndex: 1, opacity: 0.7 }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "8px",
                      border: "1px solid rgba(210,187,255,0.5)",
                      background: "rgba(210,187,255,0.2)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-outlined text-primary" style={{ filter: "drop-shadow(0 0 8px rgba(210,187,255,0.8))" }}>psychology</span>
                  </div>
                  <div style={{ width: "96px", height: "1px", borderTop: "1px dashed rgba(74,68,85,1)", position: "relative" }}>
                    <span className="material-symbols-outlined" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "rgba(74,68,85,1)" }}>chevron_right</span>
                  </div>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,176,205,0.5)",
                      background: "rgba(255,176,205,0.2)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-outlined text-secondary" style={{ filter: "drop-shadow(0 0 8px rgba(255,176,205,0.8))" }}>hub</span>
                  </div>
                </div>
                <div
                  className="font-code-label text-code-label text-on-surface-variant"
                  style={{ position: "absolute", bottom: "16px", left: "16px", opacity: 0.7 }}
                >
                  fig 1. GRPO Training Loop — Agent Communication Flow
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
