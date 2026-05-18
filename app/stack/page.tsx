"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../components/ThemeProvider";

/* ── Globe data ── */
const GLOBE_NODES = [
  { name: "PyTorch", r: 16, cat: "ML" },
  { name: "HuggingFace", r: 14, cat: "ML" },
  { name: "GRPO", r: 13, cat: "ML" },
  { name: "PPO", r: 13, cat: "ML" },
  { name: "LoRA/QLoRA", r: 13, cat: "ML" },
  { name: "TRL", r: 12, cat: "ML" },
  { name: "Unsloth", r: 12, cat: "ML" },
  { name: "Ray RLlib", r: 12, cat: "ML" },
  { name: "XGBoost", r: 12, cat: "ML" },
  { name: "FastAPI", r: 16, cat: "Backend" },
  { name: "Python", r: 17, cat: "Backend" },
  { name: "Docker", r: 15, cat: "Backend" },
  { name: "Next.js 15", r: 13, cat: "Backend" },
  { name: "React", r: 13, cat: "Backend" },
  { name: "TypeScript", r: 12, cat: "Backend" },
  { name: "PostgreSQL", r: 14, cat: "Infra" },
  { name: "MongoDB", r: 13, cat: "Infra" },
  { name: "Redis", r: 12, cat: "Infra" },
  { name: "GitHub Actions", r: 11, cat: "Infra" },
  { name: "YOLOv8", r: 12, cat: "CV" },
  { name: "OpenCV", r: 11, cat: "CV" },
  { name: "ONNX Runtime", r: 11, cat: "CV" },
  { name: "RAG Pipelines", r: 14, cat: "AI" },
  { name: "RLHF", r: 13, cat: "AI" },
  { name: "Agentic AI", r: 13, cat: "AI" },
  { name: "Haystack", r: 11, cat: "AI" },
  { name: "Git", r: 12, cat: "Infra" },
  { name: "Optuna", r: 11, cat: "ML" },
];

const CAT_COLOR_DARK: Record<string, string> = {
  ML:      "#d2bbff",
  Backend: "#ffb0cd",
  Infra:   "#86efac",
  CV:      "#67e8f9",
  AI:      "#fde68a",
};

const CAT_COLOR_LIGHT: Record<string, string> = {
  ML:      "#6d28d9",
  Backend: "#be185d",
  Infra:   "#059669",
  CV:      "#0891b2",
  AI:      "#d97706",
};

/* Spherical layout: distribute nodes on sphere surface */
function sphericalPos(i: number, total: number, radius: number) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.sin(phi) * Math.sin(theta),
    z: radius * Math.cos(phi),
  };
}

function InteractiveGlobe() {
  const { theme } = useTheme();
  const CAT_COLOR = theme === "light" ? CAT_COLOR_LIGHT : CAT_COLOR_DARK;
  const [hovered, setHovered] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 10, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const animRef = useRef<number>(0);
  const rotRef = useRef({ x: 10, y: 0 });

  const SPHERE_R = 170;

  useEffect(() => {
    const tick = () => {
      if (autoRotate && !isDragging) {
        rotRef.current.y += 0.25;
        setRotation({ ...rotRef.current });
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    rotRef.current = { x: rotRef.current.x + dy * 0.3, y: rotRef.current.y + dx * 0.3 };
    setRotation({ ...rotRef.current });
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  const nodes = GLOBE_NODES.map((n, i) => {
    const pos = sphericalPos(i, GLOBE_NODES.length, SPHERE_R);
    // Project with rotation
    const radX = (rotation.x * Math.PI) / 180;
    const radY = (rotation.y * Math.PI) / 180;
    // Rotate around Y axis
    const x1 = pos.x * Math.cos(radY) - pos.z * Math.sin(radY);
    const z1 = pos.x * Math.sin(radY) + pos.z * Math.cos(radY);
    // Rotate around X axis
    const y2 = pos.y * Math.cos(radX) - z1 * Math.sin(radX);
    const z2 = pos.y * Math.sin(radX) + z1 * Math.cos(radX);
    const scale = (z2 + SPHERE_R + 60) / (SPHERE_R * 2 + 60);
    return { ...n, px: x1, py: y2, pz: z2, scale, front: z2 > -30 };
  }).sort((a, b) => a.pz - b.pz);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "420px", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", perspective: "1000px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Volumetric Atmosphere Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: `${SPHERE_R * 2}px`, height: `${SPHERE_R * 2}px`, borderRadius: "50%", background: theme === "light" ? "radial-gradient(circle at 30% 30%, rgba(109,40,217,0.04) 0%, transparent 70%)" : "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.05) 0%, transparent 70%)", boxShadow: "inset -10px -10px 40px rgba(0,0,0,0.02)", pointerEvents: "none" }} />
      {/* 3D Wireframe Skeleton */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          pointerEvents: "none",
        }}
      >
        {/* Latitude Lines */}
        {[-60, -30, 0, 30, 60].map((lat, i) => {
          const r = SPHERE_R * Math.cos((lat * Math.PI) / 180);
          const y = SPHERE_R * Math.sin((lat * Math.PI) / 180);
          const isEquator = lat === 0;
          return (
            <div
              key={`lat-${i}`}
              style={{
                position: "absolute",
                top: -r,
                left: -r,
                width: `${r * 2}px`,
                height: `${r * 2}px`,
                borderRadius: "50%",
                border: `1px solid var(--outline)`,
                opacity: isEquator ? 0.2 : 0.08,
                transform: `translateY(${y}px) rotateX(90deg)`,
              }}
            />
          );
        })}
        {/* Longitude Lines */}
        {[0, 30, 60, 90, 120, 150].map((lon, i) => {
          const isPrime = lon === 0 || lon === 90;
          return (
            <div
              key={`lon-${i}`}
              style={{
                position: "absolute",
                top: -SPHERE_R,
                left: -SPHERE_R,
                width: `${SPHERE_R * 2}px`,
                height: `${SPHERE_R * 2}px`,
                borderRadius: "50%",
                border: `1px solid var(--outline)`,
                opacity: isPrime ? 0.2 : 0.08,
                transform: `rotateY(${lon}deg)`,
              }}
            />
          );
        })}
      </div>

      {nodes.map((n) => {
        const color = CAT_COLOR[n.cat] ?? "#d2bbff";
        const isHov = hovered === n.name;
        const fs = Math.max(9, Math.round(n.r * n.scale * 0.85));
        return (
          <div
            key={n.name}
            onMouseEnter={(e) => { e.stopPropagation(); setHovered(n.name); }}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "absolute",
              left: `calc(50% + ${n.px}px)`,
              top:  `calc(50% + ${n.py}px)`,
              transform: "translate(-50%, -50%)",
              padding: "4px 10px",
              borderRadius: "999px",
              border: `1px solid ${isHov ? color : `${color}35`}`,
              background: isHov ? `${color}25` : `${color}08`,
              color: n.front ? (isHov ? color : `${color}cc`) : `${color}30`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: `${fs}px`,
              fontWeight: 500,
              cursor: "pointer",
              transition: "border 0.15s, background 0.15s, color 0.15s, box-shadow 0.15s",
              whiteSpace: "nowrap",
              boxShadow: isHov ? `0 0 18px ${color}55` : "none",
              zIndex: isHov ? 20 : Math.round(n.pz + 200),
              opacity: n.front ? 1 : 0.35,
              pointerEvents: "auto",
            }}
          >
            {n.name}
          </div>
        );
      })}

      {/* Hover label */}
      {hovered && (
        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", background: "var(--surface)", border: "1px solid var(--card-border)", borderRadius: "8px", padding: "8px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "var(--on-surface)", pointerEvents: "none", zIndex: 50, display: "flex", alignItems: "center", gap: "8px", boxShadow: "var(--card-shadow)", whiteSpace: "nowrap" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: CAT_COLOR[GLOBE_NODES.find(n => n.name === hovered)?.cat ?? "ML"] }} />
          {hovered} · {GLOBE_NODES.find(n => n.name === hovered)?.cat}
        </div>
      )}

      {/* Drag hint */}
      <div style={{ position: "absolute", top: "12px", right: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--on-surface-muted)", display: "flex", alignItems: "center", gap: "4px", pointerEvents: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>drag_pan</span>
        drag to rotate
      </div>
    </div>
  );
}

/* ── Skills (no level labels) ── */
const skillCategories = [
  { name: "ML / RL", icon: "model_training", skills: ["PyTorch", "GRPO", "PPO", "LoRA/QLoRA", "TRL", "Unsloth", "HuggingFace Transformers", "PEFT", "Ray RLlib", "XGBoost", "Optuna"] },
  { name: "Computer Vision", icon: "visibility", skills: ["YOLOv8", "ONNX Runtime", "OpenCV", "Albumentations"] },
  { name: "Languages & APIs", icon: "code", skills: ["Python", "SQL", "JavaScript/TypeScript", "FastAPI", "Next.js 15", "React"] },
  { name: "Infra & Databases", icon: "storage", skills: ["Docker", "GitHub Actions", "Google Cloud", "PostgreSQL", "MongoDB", "Redis"] },
  { name: "AI Pipelines", icon: "hub", skills: ["RAG Pipelines", "RLHF", "Adversarial RL", "Agentic AI", "Haystack", "PEFT"] },
];

const certs = [
  { name: "Deep Learning Specialization", issuer: "Andrew Ng · deeplearning.ai", icon: "verified" },
  { name: "Machine Learning Specialization", issuer: "Andrew Ng · deeplearning.ai", icon: "verified" },
  { name: "Generative AI with LLMs", issuer: "AWS · Coursera", icon: "verified" },
  { name: "Building RAG Systems with LangChain", issuer: "deeplearning.ai", icon: "verified" },
  { name: "LLM Fundamentals", issuer: "Hugging Face", icon: "verified" },
  { name: "100 Days of Code: Python Pro", issuer: "Udemy", icon: "verified" },
];

const Footer = () => (
  <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--outline-variant)", marginTop: "96px" }}>
    <div className="flex flex-col md:flex-row justify-between items-center" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 80px", gap: "16px" }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 900, color: "var(--primary)" }}>HJ.</div>
      <p className="font-code-label" style={{ color: "var(--secondary)" }}>© 2025 Harsh Jain. Built with Precision.</p>
      <div className="flex items-center" style={{ gap: "24px" }}>
        {[{ label: "GitHub", href: "https://github.com/Harsh-4210" }, { label: "LinkedIn", href: "https://linkedin.com/in/harsh-jain0621" }, { label: "Email", href: "mailto:harshjain0621@gmail.com" }].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="font-code-label"
            style={{ color: "var(--on-surface-muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface-muted)")}
          >{l.label}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default function StackPage() {
  const { theme } = useTheme();
  const CAT_COLOR = theme === "light" ? CAT_COLOR_LIGHT : CAT_COLOR_DARK;
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <main style={{ paddingTop: "120px", paddingBottom: "96px", display: "flex", flexDirection: "column", gap: "80px" }}>

        {/* Header */}
        <section className="text-center" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--on-surface)", marginBottom: "16px" }}>The Stack</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", lineHeight: 1.65, color: "var(--on-surface-variant)", maxWidth: "560px", margin: "0 auto" }}>
            Tools and technologies I use to build robust ML pipelines and scalable backend systems.
          </p>
        </section>

        {/* Globe + Profile */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>
          <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
            <div className="bento-card" style={{ borderRadius: "16px", padding: "20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "16px", left: "20px", zIndex: 10 }}>
                <p className="font-code-label" style={{ color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Tech Stack Globe</p>
              </div>
              {/* Legend */}
              <div style={{ position: "absolute", bottom: "16px", left: "20px", zIndex: 10, display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {Object.entries(CAT_COLOR).map(([cat, col]) => (
                  <div key={cat} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: col }} />
                    <span className="font-code-label" style={{ color: "var(--on-surface-muted)", fontSize: "9px" }}>{cat}</span>
                  </div>
                ))}
              </div>
              <InteractiveGlobe />
            </div>

            {/* Profile card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="bento-card" style={{ borderRadius: "16px", padding: "28px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--on-surface-variant)" }}>analytics</span>
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--on-surface)" }}>Tech Philosophy</h2>
                  <span className="font-code-label" style={{ marginLeft: "auto", padding: "3px 8px", borderRadius: "999px", border: "1px solid var(--outline)", color: "var(--on-surface-muted)", fontSize: "9px", textTransform: "uppercase" }}>CORE</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.7, color: "var(--on-surface-variant)", marginBottom: "20px" }}>
                  Clean system design over complex abstractions. Treat ML models as software — observability, reproducibility, and robust APIs are non-negotiable.
                </p>
                <div className="flex flex-wrap" style={{ gap: "8px" }}>
                  {["Observability", "Reproducibility", "Scalability"].map((t) => (
                    <span key={t} className="glass-tag font-code-label" style={{ padding: "5px 12px", borderRadius: "8px" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="bento-card" style={{ borderRadius: "16px", padding: "28px" }}>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "22px", display: "block", marginBottom: "10px" }}>school</span>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--on-surface)", marginBottom: "4px" }}>B.E. AI & Data Science</h3>
                <p className="font-code-label" style={{ color: "var(--on-surface-variant)", marginBottom: "12px" }}>SPPU · Aug 2022 – May 2027</p>
                <div className="flex flex-wrap" style={{ gap: "8px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(210,187,255,0.25)", background: "rgba(210,187,255,0.1)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, color: "var(--primary)" }}>GPA: 8.75</span>
                  <span style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.06)", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--metric-text)" }}>Pune, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Grid — no levels */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 700, color: "var(--on-surface)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Full Skill Matrix</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {skillCategories.map((cat) => (
              <div key={cat.name} className="bento-card" style={{ borderRadius: "12px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--outline-variant)" }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "18px" }}>{cat.icon}</span>
                  <h3 className="font-code-label" style={{ color: "var(--on-surface)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>{cat.name}</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {cat.skills.map((s) => (
                    <span key={s} className="glass-tag font-code-label" style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 700, color: "var(--on-surface)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Certifications</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
            {certs.map((c) => (
              <div key={c.name} className="bento-card" style={{ borderRadius: "10px", padding: "18px 22px", display: "flex", alignItems: "center", gap: "14px" }}>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "22px", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--on-surface)", lineHeight: 1.3 }}>{c.name}</p>
                  <p className="font-code-label" style={{ color: "var(--on-surface-muted)", marginTop: "4px" }}>{c.issuer}</p>
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
