"use client";
import { useState } from "react";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";

const focusModes = {
  Research: {
    summary: "Exploring reward design, evaluation harnesses, and alignment strategies.",
    items: [
      { label: "RL fine-tuning", value: "GRPO / PPO" },
      { label: "Eval harness", value: "Contradiction suites" },
      { label: "Alignment", value: "Reward modeling" },
    ],
  },
  Build: {
    summary: "Shipping production-ready ML services with clean API boundaries.",
    items: [
      { label: "APIs", value: "FastAPI + Next.js" },
      { label: "RAG systems", value: "Retrieval + guardrails" },
      { label: "Infra", value: "Dockerized deploys" },
    ],
  },
  Ship: {
    summary: "Hardening systems for real users, performance, and reliability.",
    items: [
      { label: "Observability", value: "Metrics + tracing" },
      { label: "Quality", value: "Tests + CI" },
      { label: "Latency", value: "Perf budgets" },
    ],
  },
} as const;

const signalConsole = [
  { label: "Availability", value: "Open for internships", color: "var(--ok-color)" },
  { label: "Timezone", value: "IST (UTC+5:30)", color: "var(--on-surface-variant)" },
  { label: "Response", value: "Usually < 24h", color: "var(--primary)" },
  { label: "Preferred", value: "Email / Calendly", color: "var(--secondary)" },
];

type FocusMode = keyof typeof focusModes;

export default function HomePage() {
  const [focusMode, setFocusMode] = useState<FocusMode>("Research");
  const focusData = focusModes[focusMode];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{ paddingTop: "192px", paddingBottom: "80px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            color: "var(--on-surface)",
          }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Harsh Jain</span>
        </h1>

        {/* Glass card */}
        <div
          className="glass-card"
          style={{
            borderRadius: "16px",
            width: "100%",
            maxWidth: "672px",
            padding: "48px",
            marginTop: "32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "32px",
              color: "var(--on-surface-variant)",
            }}
          >
            Ask me anything about Harsh...
          </h2>
          <ChatWidget />
        </div>

        {/* Scroll hint */}
        <div
          className="flex flex-col items-center"
          style={{ marginTop: "64px", opacity: 0.5 }}
        >
          <span
            className="font-code-label text-code-label"
            style={{ marginBottom: "8px" }}
          >
            Scroll to explore
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: "20px", animation: "float 2s ease-in-out infinite" }}>
            arrow_downward
          </span>
        </div>
      </section>

      {/* Bento Grid — About */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          paddingLeft: "clamp(20px, 6.5vw, 80px)",
          paddingRight: "clamp(20px, 6.5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        id="about"
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "24px",
          }}
        >
          {/* Mindset Card */}
          <div
            className="glass-card animate-float"
            style={{
              gridColumn: "span 12",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                alignItems: "stretch",
              }}
            >
              {/* Left: Mindset */}
              <div
                className="glass-card"
                style={{
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "340px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "32px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: "16px",
                      color: "var(--on-surface)",
                    }}
                  >
                    Mindset
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "var(--on-surface-variant)",
                    }}
                  >
                    Building end-to-end{" "}
                    <strong style={{ color: "var(--on-surface)" }}>ML systems</strong>.
                    My passions provide the{" "}
                    <strong style={{ color: "var(--on-surface)" }}>
                      discipline and focus
                    </strong>{" "}
                    I need to grow.
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "32px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    height: "192px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 50%, #16213e 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "16px",
                  }}
                >
                  {/* Code visual placeholder */}
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "rgba(210,187,255,0.5)",
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ color: "rgba(52,211,153,0.7)" }}>def train_policy(env, agent):</div>
                    <div style={{ paddingLeft: "16px", color: "rgba(255,255,255,0.3)" }}>  state = env.reset()</div>
                    <div style={{ paddingLeft: "16px", color: "rgba(255,255,255,0.3)" }}>  reward = agent.step(state)</div>
                    <div style={{ paddingLeft: "16px", color: "rgba(210,187,255,0.6)" }}>  return optimize(reward)</div>
                  </div>
                  <div
                    className="font-code-label text-code-label"
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(8px)",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "10px",
                      color: "var(--on-surface-variant)",
                    }}
                  >
                    Engineering
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "var(--on-surface-variant)",
                    marginTop: "16px",
                  }}
                >
                  Mastering complex logic is my path to{" "}
                  <strong style={{ color: "var(--on-surface)" }}>excellence</strong>.
                </p>
              </div>

              {/* Center: Profile + Location */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Profile Image */}
                <div
                  className="glass-card"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    flex: 1,
                    minHeight: "240px",
                    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0d1117)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.05)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src="/profile.jpeg"
                      alt="Harsh Jain"
                      fill
                      priority
                      style={{
                        objectFit: "cover",
                        objectPosition: "center 20%",
                      }}
                    />
                  </div>
                </div>

                {/* Location */}
                <div
                  className="glass-card"
                  style={{
                    borderRadius: "16px",
                    padding: "24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "var(--on-surface)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      PUNE, INDIA
                    </h4>
                    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <p
                        className="font-code-label text-code-label"
                        style={{ color: "var(--primary)", fontWeight: 700 }}
                      >
                        18.5204° N, 73.8567° E
                      </p>
                      <p
                        className="font-code-label text-code-label text-on-surface-variant"
                        style={{ display: "flex", alignItems: "center", gap: "8px" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                          schedule
                        </span>
                        IST (UTC+5:30)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Craft Card */}
              <div
                className="glass-card animate-float-delayed"
                style={{
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "340px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "32px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: "16px",
                      color: "var(--on-surface)",
                    }}
                  >
                    Craft
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
                    Building scalable{" "}
                    <strong style={{ color: "var(--on-surface)" }}>
                      RL systems, LLM fine-tuning pipelines, and production-ready deployments
                    </strong>
                    .
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "var(--on-surface-variant)",
                    }}
                  >
                    I understand what advantages modern ML can provide, helping me architect solutions that actually work in production.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap" style={{ gap: "8px", marginTop: "32px" }}>
                    {[
                      { icon: "code", label: "PYTHON" },
                      { icon: "api", label: "FASTAPI" },
                      { icon: "terminal", label: "DOCKER" },
                    ].map((tech) => (
                      <span
                        key={tech.label}
                        className="glass-tag font-code-label text-code-label text-tertiary"
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "border-color 0.2s",
                          cursor: "default",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                          {tech.icon}
                        </span>
                        {tech.label}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "24px",
                      paddingTop: "24px",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "var(--on-surface-variant)",
                      }}
                    >
                      Applied ML Student & AI Engineer. Feel free to invite me to collaborate.
                    </p>
                    <div
                      style={{
                        marginTop: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.2)",
                        borderRadius: "999px",
                        padding: "6px 12px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        color: "#22c55e",
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#22c55e",
                          boxShadow: "0 0 10px #22c55e",
                          animation: "float 2s ease-in-out infinite",
                        }}
                      />
                      Open to collaboration
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Radar */}
        <div
          className="glass-card"
          style={{
            gridColumn: "span 7",
            borderRadius: "16px",
            padding: "28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.16) 0%, rgba(6,182,212,0.12) 100%)",
              opacity: 0.35,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
              <div>
                <div
                  className="font-code-label text-code-label"
                  style={{
                    color: "var(--on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontSize: "10px",
                    marginBottom: "6px",
                  }}
                >
                  Focus Radar
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Current Focus
                </h3>
              </div>
              <div className="flex" style={{ gap: "8px" }}>
                {(Object.keys(focusModes) as FocusMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFocusMode(mode)}
                    className="font-code-label text-code-label"
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      border:
                        focusMode === mode
                          ? "1px solid rgba(210,187,255,0.5)"
                          : "1px solid rgba(255,255,255,0.1)",
                      background:
                        focusMode === mode
                          ? "rgba(210,187,255,0.18)"
                          : "rgba(255,255,255,0.04)",
                      color: focusMode === mode ? "var(--primary)" : "var(--on-surface-variant)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontSize: "10px",
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--on-surface-variant)",
              }}
            >
              {focusData.summary}
            </p>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {focusData.items.map((item) => (
                <div
                  key={item.label}
                  className="glass-card"
                  style={{ borderRadius: "12px", padding: "12px 14px" }}
                >
                  <div
                    className="font-code-label text-code-label"
                    style={{
                      color: "var(--on-surface-variant)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--on-surface)",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signal Console */}
        <div
          className="glass-card"
          style={{
            gridColumn: "span 5",
            borderRadius: "16px",
            padding: "28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 20% 20%, rgba(210,187,255,0.2) 0%, transparent 55%)",
              opacity: 0.4,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
              <div>
                <div
                  className="font-code-label text-code-label"
                  style={{
                    color: "var(--on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontSize: "10px",
                    marginBottom: "6px",
                  }}
                >
                  Signal Console
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Live Status
                </h3>
              </div>
              <span
                className="font-code-label text-code-label"
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(34,197,94,0.3)",
                  background: "rgba(34,197,94,0.12)",
                  color: "#22c55e",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                }}
              >
                LIVE
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {signalConsole.map((item) => (
                <div
                  key={item.label}
                  className="glass-card"
                  style={{
                    borderRadius: "12px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="font-code-label text-code-label"
                    style={{
                      color: "var(--on-surface-variant)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "10px",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="btn-secondary"
              style={{ marginTop: "18px", textDecoration: "none" }}
            >
              Open Contact Terminal
            </a>
          </div>
        </div>
      </section>

      {/* Featured Project Preview */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "80px",
          paddingLeft: "clamp(20px, 6.5vw, 80px)",
          paddingRight: "clamp(20px, 6.5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          className="glass-card"
          style={{
            borderRadius: "24px",
            padding: "64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.2) 100%)",
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "var(--on-surface)",
                  lineHeight: 1.2,
                  marginBottom: "24px",
                }}
              >
                ConflictBench
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px",
                  lineHeight: 1.6,
                  color: "var(--on-surface-variant)",
                  marginBottom: "32px",
                  maxWidth: "560px",
                }}
              >
                RL environment that trains language models to resolve contradictory business instructions by learning an implicit 6-tier authority hierarchy entirely from reward signals.
              </p>
              <div className="flex flex-wrap" style={{ gap: "12px" }}>
                {["GRPO", "Qwen2.5-3B", "LoRA", "Unsloth", "TRL"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-tag font-code-label text-code-label"
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      color: "var(--on-surface)",
                      border: "1px solid var(--outline)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                maxWidth: "560px",
                background: "rgba(0,0,0,0.5)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src="/Screenshot 2026-05-16 161133.png"
                alt="ConflictBench"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "16px",
                  color: "var(--on-surface-variant)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  background: "var(--surface)",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                }}
              >
                Reward: 0.14 → 0.50 (+257%)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--outline)",
          backdropFilter: "blur(20px)",
          marginTop: "80px",
        }}
      >
        <div
          className="flex flex-col md:flex-row justify-between items-center"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "48px 80px",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 900,
              color: "var(--on-surface)",
            }}
          >
            HJ
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "var(--on-surface-variant)",
            }}
          >
            © 2024 Harsh Jain. Built with Precision.
          </p>
          <div className="flex items-center" style={{ gap: "24px" }}>
            {[
              { label: "GitHub", href: "https://github.com/Harsh-4210" },
              { label: "LinkedIn", href: "https://linkedin.com/in/harsh-jain0621" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-code-label text-code-label text-on-surface-variant"
                style={{
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface-variant)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
