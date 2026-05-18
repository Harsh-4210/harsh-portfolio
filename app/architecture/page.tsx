"use client";

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

const systems = [
  {
    title: "ConflictBench — RL Training Pipeline",
    description:
      "Distributed RL environment designed to train LLMs to resolve contradictory authority-hierarchy business instructions. 400 scenario dataset, deterministic 5-rubric reward function (no LLM judge), GRPO + LoRA (r=32) fine-tuning on A100 48GB. Composite reward lifted 0.14 → 0.50 (+257%).",
    tags: ["GRPO", "Qwen2.5-3B", "LoRA", "TRL"],
    layers: [
      {
        icon: "dataset",
        title: "Scenario Dataset",
        desc: "400 conflict scenarios spanning 8–28 directives with 2–6 embedded conflict pairs.",
        details: { "Scenarios": "400", "Directives": "8–28 per ep." },
      },
      {
        icon: "functions",
        title: "Reward Function",
        desc: "5-rubric deterministic scoring: correctness, contradiction-freedom, F1, efficiency, JSON schema.",
        details: { "Rubrics": "5", "Type": "Deterministic" },
      },
      {
        icon: "model_training",
        title: "GRPO Fine-tuning",
        desc: "Group Relative Policy Optimisation with LoRA adapters (r=32) on A100 48GB over 2 epochs.",
        details: { "GPU": "A100 48GB", "Epochs": "2" },
      },
    ],
  },
  {
    title: "ARMS RACE — Adversarial Oversight Arena",
    description:
      "Zero-sum two-agent adversarial loop. Red Agent generates semantically plausible hallucinations; Blue Agent produces structured JSON verdicts. Expert Correction Training (ECT) converts failed RL steps into supervised updates, preventing policy collapse.",
    tags: ["PPO", "LoRA", "PEFT", "REINFORCE", "SFT"],
    layers: [
      {
        icon: "person",
        title: "Red Agent",
        desc: "Generates silent-failure hallucinations designed to fool the gatekeeper.",
        details: { "Strategy": "Adversarial", "Output": "Hallucinations" },
      },
      {
        icon: "shield",
        title: "Blue Agent",
        desc: "Factual gatekeeper producing Pass / Flag / Probe JSON verdicts.",
        details: { "Detection": "100%", "False Alarm": "4%" },
      },
      {
        icon: "psychology_alt",
        title: "ECT Training",
        desc: "Expert Correction Training injects perfect responses on Blue failure, preventing collapse.",
        details: { "OOD Gen": "96%", "Asymmetry": "TP +0.6 / FP -2.0" },
      },
    ],
  },
  {
    title: "TraceLink — Manufacturing Traceability",
    description:
      "Production-deployed traceability system covering 6 entity types. Forward and backward trace across dispatch orders, production batches, QC inspections, and raw material lots. Single Docker image (Bun frontend + FastAPI backend) on Render.",
    tags: ["FastAPI", "React", "Firebase Auth", "SQLite", "Docker"],
    layers: [
      {
        icon: "verified_user",
        title: "RBAC Layer",
        desc: "6-role Firebase ID-token RBAC: operator → admin. Full audit trail on every action.",
        details: { "Roles": "6", "Auth": "Firebase" },
      },
      {
        icon: "account_tree",
        title: "Trace Engine",
        desc: "Bi-directional tracing across 6 entity types. CSV ingestion with full rollback support.",
        details: { "Entities": "6", "Ingest": "CSV + rollback" },
      },
      {
        icon: "cloud_upload",
        title: "Deployment",
        desc: "Single Docker image, auto-deploy from main branch on Render. OpenAPI docs at /api/docs.",
        details: { "Platform": "Render", "Runtime": "Bun + FastAPI" },
      },
    ],
  },
  {
    title: "Arivon — Adaptive Learning Platform",
    description:
      "Detects metacognitive miscalibration and dynamically adjusts learning paths via Bloom's taxonomy engine. Voice exam (Groq Whisper), RAG study mentor (Haystack), React Flow concept graph. Backed by PostgreSQL / MongoDB / Redis stack.",
    tags: ["Next.js 15", "FastAPI", "Groq Whisper", "Haystack RAG", "MongoDB", "Redis"],
    layers: [
      {
        icon: "mic",
        title: "Voice Interface",
        desc: "Groq Whisper-powered voice exam with real-time transcription and confidence scoring.",
        details: { "Model": "Groq Whisper", "Mode": "Real-time" },
      },
      {
        icon: "psychology",
        title: "RAG Mentor",
        desc: "Haystack RAG pipeline serving study recommendations based on concept graph embeddings.",
        details: { "Pipeline": "Haystack", "Storage": "MongoDB" },
      },
      {
        icon: "storage",
        title: "Data Layer",
        desc: "PostgreSQL for sessions, MongoDB for embeddings, Redis for low-latency caching.",
        details: { "Cache": "Redis", "DB": "PG + Mongo" },
      },
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--on-surface)" }}>
      <main
        className="flex flex-col"
        style={{ gap: "96px", paddingTop: "120px", paddingBottom: "96px" }}
      >
        {/* Header */}
        <section
          className="text-center"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}
        >
          <div
            className="inline-flex items-center"
            style={{
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              marginBottom: "32px",
            }}
          >
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>architecture</span>
            <span
              className="font-code-label text-code-label"
              style={{ color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              System Design Deep-Dive
            </span>
          </div>
          <h1
            className="text-gradient"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(40px, 6vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              display: "block",
            }}
          >
            Architecting Scale &amp; Precision
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--on-surface-variant)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Exploring the structural foundation, data flows, and infrastructural choices that
            power high-performance ML systems. Built for resilience and engineered for the future.
          </p>
        </section>

        {/* Systems */}
        {systems.map((system, sIdx) => (
          <section
            key={system.title}
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}
          >
            <div
              className="bento-card"
              style={{
                borderRadius: "24px",
                padding: "48px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    sIdx % 2 === 0
                      ? "radial-gradient(circle at top left, rgba(124,58,237,0.06) 0%, transparent 60%)"
                      : "radial-gradient(circle at top right, rgba(170,2,102,0.06) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* System header */}
                <div
                  className="flex flex-col md:flex-row md:items-start justify-between"
                  style={{ gap: "24px", marginBottom: "48px" }}
                >
                  <div style={{ maxWidth: "640px" }}>
                    <h2
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(24px, 4vw, 36px)",
                        fontWeight: 800,
                        color: "var(--on-surface)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        marginBottom: "16px",
                      }}
                    >
                      {system.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "var(--on-surface-variant)",
                      }}
                    >
                      {system.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap" style={{ gap: "8px", flexShrink: 0 }}>
                    {system.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="font-code-label text-code-label"
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          border: i < 2 ? "1px solid rgba(210,187,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                          background: i < 2 ? "rgba(210,187,255,0.1)" : "rgba(255,255,255,0.03)",
                          color: i < 2 ? "var(--primary)" : "var(--on-surface-variant)",
                          fontSize: "11px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture layers */}
                <div
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "32px",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                    }}
                  >
                    {system.layers.map((layer, lIdx) => (
                      <div key={layer.title}>
                        {/* Layer row */}
                        <div
                          className="flex items-start"
                          style={{
                            gap: "24px",
                            padding: "24px 0",
                            position: "relative",
                          }}
                        >
                          {/* Icon + connector */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0",
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                border: "1px solid rgba(210,187,255,0.2)",
                                background: "rgba(210,187,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <span
                                className="material-symbols-outlined text-primary"
                                style={{ fontSize: "22px" }}
                              >
                                {layer.icon}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1 }}>
                            <h3
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "var(--on-surface)",
                                marginBottom: "8px",
                              }}
                            >
                              {layer.title}
                            </h3>
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "13px",
                                lineHeight: 1.6,
                                color: "var(--on-surface-variant)",
                                marginBottom: "16px",
                              }}
                            >
                              {layer.desc}
                            </p>
                            <div className="flex flex-wrap" style={{ gap: "32px" }}>
                              {Object.entries(layer.details).map(([k, v]) => (
                                <div key={k}>
                                  <div
                                    className="font-code-label text-code-label"
                                    style={{
                                      color: "var(--on-surface-variant)",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.1em",
                                      fontSize: "9px",
                                      marginBottom: "4px",
                                    }}
                                  >
                                    {k}
                                  </div>
                                  <div
                                    className="font-code-label text-code-label"
                                    style={{
                                      color: "var(--primary)",
                                      fontWeight: 700,
                                      fontSize: "13px",
                                    }}
                                  >
                                    {v}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Connector line */}
                        {lIdx < system.layers.length - 1 && (
                          <div
                            style={{
                              marginLeft: "23px",
                              height: "24px",
                              borderLeft: "2px dashed rgba(74,68,85,0.6)",
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: "16px",
                            }}
                          >
                            <div
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "var(--outline-variant)",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Status bar */}
                  <div
                    className="flex justify-between items-center"
                    style={{
                      marginTop: "24px",
                      paddingTop: "24px",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-center" style={{ gap: "8px" }}>
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#22c55e",
                          boxShadow: "0 0 8px #22c55e",
                        }}
                      />
                      <span
                        className="font-code-label text-code-label"
                        style={{
                          color: "var(--on-surface-variant)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontSize: "10px",
                        }}
                      >
                        System Architecture &nbsp;::&nbsp; Documented
                      </span>
                    </div>
                    <a
                      href="https://github.com/Harsh-4210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center font-code-label text-code-label"
                      style={{
                        gap: "6px",
                        color: "var(--on-surface-variant)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface-variant)")}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>open_in_new</span>
                      View Full Spec
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Hackathons */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--on-surface)",
              marginBottom: "32px",
              letterSpacing: "-0.01em",
            }}
          >
            Hackathons &amp; Awards
          </h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {[
              {
                title: "Finalist",
                event: "Meta × PyTorch × HuggingFace OpenEnv Hackathon",
                location: "Bangalore",
                project: "ConflictBench",
                icon: "emoji_events",
              },
              {
                title: "Top 100",
                event: "Scaler School of Technology OpenEnv Pre-Selection",
                location: "India",
                project: "ConflictBench",
                icon: "military_tech",
              },
              {
                title: "3rd Place",
                event: "Pragyantra",
                location: "PES Modern College of Engineering",
                project: "Arivon",
                icon: "workspace_premium",
              },
            ].map((award) => (
              <div
                key={award.title}
                className="bento-card"
                style={{
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    border: "1px solid rgba(210,187,255,0.2)",
                    background: "rgba(210,187,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "22px" }}>
                    {award.icon}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {award.title}
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--on-surface)", fontWeight: 600 }}>
                    {award.event}
                  </p>
                  <p className="font-code-label text-code-label" style={{ color: "var(--on-surface-variant)", marginTop: "4px" }}>
                    {award.location} · {award.project}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
