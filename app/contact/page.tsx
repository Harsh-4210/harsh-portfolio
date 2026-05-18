"use client";
import { useState, useRef, useEffect } from "react";

type LogLine = { type: string; text: string; isCmd?: boolean };

const BOOT = [
  "[BOOT] Initializing secure connection layer...",
  "[BOOT] Kernel: HJ-OS v1.0.0-generic x86_64",
  "[BOOT] Protocol: SSH-2.0-OpenSSH_9.2p1 (RSA/AES-GCM)",
  "[BOOT] Handshake verified. Welcome back, agent.",
  "[BOOT] Last login: Pune, IN — IST (UTC+5:30)",
];
const WHOAMI = [
  { t: "ok",   m: "Core systems operational (uptime: active)" },
  { t: "info", m: "Accepting internship proposals for 2025" },
  { t: "info", m: "Location: Pune, IN (Lat: 18.5204, Long: 73.8567)" },
  { t: "warn", m: "Build more, learn fast, ship clean." },
];
const STATUS = [
  { t: "ok",   m: "Core systems operational." },
  { t: "info", m: "Currently accepting new project proposals." },
  { t: "info", m: "Location node: Pune, IN." },
];

const HELP_TEXT = [
  { t: "info", m: "Available commands:" },
  { t: "info", m: "  /about      — Who is Harsh?" },
  { t: "info", m: "  /projects   — List projects" },
  { t: "info", m: "  /contact    — Contact channels" },
  { t: "info", m: "  /mail       — Open the contact form" },
  { t: "info", m: "  /resume.pdf — Download resume" },
  { t: "info", m: "  /clear      — Clear terminal" },
];

const CMD_MAP: Record<string, { t: string; m: string }[]> = {
  "/about": [
    { t: "info", m: "Applied ML & AI student at SPPU, Pune, India." },
    { t: "info", m: "GPA: 8.75 / 10 · B.E. AI & Data Science (2022–2027)" },
    { t: "info", m: "Specialising in RL, LLM fine-tuning, production ML." },
    { t: "ok",   m: "Contact: harshjain0621@gmail.com" },
  ],
  "/projects": [
    { t: "info", m: "ConflictBench — GRPO RL (HF Hackathon Finalist)" },
    { t: "info", m: "ARMS RACE     — Adversarial hallucination detection" },
    { t: "info", m: "TraceLink     — Manufacturing traceability (prod.)" },
    { t: "info", m: "Arivon        — Adaptive learning (3rd @ Pragyantra)" },
    { t: "info", m: "SO₂ Predict   — 85% accuracy XGBoost pipeline" },
    { t: "ok",   m: "More at github.com/Harsh-4210" },
  ],
  "/contact": [
    { t: "ok",   m: "Email: harshjain0621@gmail.com" },
    { t: "ok",   m: "GitHub: github.com/Harsh-4210" },
    { t: "ok",   m: "LinkedIn: linkedin.com/in/harsh-jain0621" },
    { t: "info", m: "Use /mail <subject> to send a message directly." },
  ],
  "/help": HELP_TEXT,
};

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

/* ── Contact Form Modal ── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Harsh,%0A%0A${encodeURIComponent(form.message)}%0A%0ABest,%0A${encodeURIComponent(form.name)}`;
    window.open(`mailto:harshjain0621@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${body}`);
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 2000);
  };

  const inp = {
    background: "var(--input-bg)", border: "1px solid var(--input-border)",
    borderRadius: "8px", padding: "10px 14px", color: "var(--on-surface)",
    fontFamily: "'Inter', sans-serif", fontSize: "13px", outline: "none", width: "100%",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: "480px", background: "var(--surface)", border: "1px solid var(--card-border)", borderRadius: "20px", padding: "36px", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", zIndex: 1 }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", background: "none", border: "none", color: "var(--on-surface-variant)", cursor: "pointer" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>close</span>
        </button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--ok-color)", display: "block", marginBottom: "12px" }}>check_circle</span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "var(--on-surface)" }}>Message ready to send!</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--on-surface-variant)", marginTop: "6px" }}>Your email client has been opened.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--on-surface)", marginBottom: "4px" }}>Send a Message</h2>
              <p className="font-code-label" style={{ color: "var(--on-surface-variant)" }}>Direct line to harshjain0621@gmail.com</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--input-border)"; }} />
              <input required type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--input-border)"; }} />
            </div>
            <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inp} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--input-border)"; }} />
            <textarea required placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} style={{ ...inp, resize: "vertical", lineHeight: 1.6 }} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--input-border)"; }} />
            <button type="submit" className="btn-primary" style={{ justifyContent: "center", width: "100%", padding: "12px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>send</span>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Terminal ── */
export default function ContactPage() {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let d = 0;
    BOOT.forEach((b, i) => {
      setTimeout(() => setLines((p) => [...p, { type: "boot", text: b }]), (d += 150 + i * 30));
    });
    setTimeout(() => {
      setLines((p) => [...p, { type: "cmd", text: "~ whoami", isCmd: true }]);
      let d2 = d + 400;
      WHOAMI.forEach(({ t, m }) => { setTimeout(() => setLines((p) => [...p, { type: t, text: m }]), (d2 += 110)); });
      setTimeout(() => {
        setLines((p) => [...p, { type: "cmd", text: "~ cat status.log", isCmd: true }]);
        let d3 = d2 + 400;
        STATUS.forEach(({ t, m }) => { setTimeout(() => setLines((p) => [...p, { type: t, text: m }]), (d3 += 110)); });
        setTimeout(() => setBooted(true), d3 + 200);
      }, d2 + 200);
    }, d + 300);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const runCmd = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setInput("");
    setLines((p) => [...p, { type: "cmd", text: `~ ${raw.trim()}`, isCmd: true }]);

    if (cmd === "/clear") { setLines([]); return; }
    if (cmd === "/resume.pdf") {
      setLines((p) => [...p, { type: "ok", text: "Opening HARSH_JAIN_RESUME.pdf..." }]);
      window.open("/HARSH_JAIN_RESUME.pdf", "_blank");
      return;
    }
    if (cmd.startsWith("/mail") || cmd === "contact me" || cmd === "send message") {
      setLines((p) => [...p, { type: "ok", text: "Opening contact form..." }]);
      setShowForm(true);
      return;
    }
    if (CMD_MAP[cmd]) {
      CMD_MAP[cmd].forEach(({ t, m }, i) => {
        setTimeout(() => setLines((p) => [...p, { type: t, text: m }]), i * 80);
      });
      return;
    }
    setLines((p) => [
      ...p,
      { type: "warn", text: `Command not found: ${cmd}` },
      { type: "info", text: "Type /help to see available commands." },
    ]);
  };

  const lc = (type: string) => {
    if (type === "ok") return "var(--ok-color)";
    if (type === "warn") return "var(--warn-color)";
    if (type === "boot") return "var(--boot-color)";
    return "var(--info-color)";
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {showForm && <ContactModal onClose={() => setShowForm(false)} />}
      <main style={{ paddingTop: "120px", paddingBottom: "96px", display: "flex", flexDirection: "column", gap: "80px" }}>

        {/* Header */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px,6vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--on-surface)", lineHeight: 1.1, marginBottom: "20px" }}>
            Establish Connection.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", lineHeight: 1.65, color: "var(--on-surface-variant)", maxWidth: "520px" }}>
            Ping me directly via the terminal below, send a message through the form, or use the channels on the right.
          </p>
        </section>

        {/* Grid */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", width: "100%" }}>
          <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "20px", alignItems: "start" }}>

            {/* Terminal */}
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid var(--terminal-border)", background: "var(--terminal-bg)", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>
              {/* Titlebar */}
              <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "var(--terminal-header)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "7px" }}>
                  {["#ff5f57","#febc2e","#28c840"].map((c) => <div key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c }} />)}
                </div>
                <span className="font-code-label" style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>harsh@hj.dev:~</span>
                <div style={{ width: "60px" }} />
              </div>

              {/* Output */}
              <div ref={termRef} style={{ padding: "18px", maxHeight: "400px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "3px" }} onClick={() => inputRef.current?.focus()}>
                {lines.map((l, i) => (
                  <div key={i} style={{ lineHeight: 1.65, paddingLeft: l.isCmd ? 0 : "14px", borderLeft: l.isCmd ? "none" : "2px solid rgba(255,255,255,0.04)" }}>
                    {l.isCmd ? (
                      <span>
                        <span style={{ color: "var(--primary)", marginRight: "6px" }}>➜</span>
                        <span style={{ color: "#e2e8f3" }}>{l.text}</span>
                      </span>
                    ) : (
                      <span style={{ color: lc(l.type) }}>{l.text}</span>
                    )}
                  </div>
                ))}
                {booted && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                    <span style={{ color: "var(--primary)" }}>➜</span>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>~</span>
                    <div style={{ position: "relative", flex: 1 }}>
                      <span style={{ color: "#e2e8f3" }}>{input}</span>
                      <span style={{ display: "inline-block", width: "7px", height: "13px", background: "var(--primary)", marginLeft: "1px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
                      <input ref={inputRef} autoFocus value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runCmd(input); }} style={{ position: "absolute", opacity: 0, left: 0, top: 0, width: "100%", height: "100%", cursor: "text" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick commands */}
              <div style={{ padding: "10px 18px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["/about", "/projects", "/contact", "/mail", "/resume.pdf", "/clear"].map((c) => (
                  <button key={c} onClick={() => runCmd(c)} className="font-code-label"
                    style={{ padding: "4px 10px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "10px", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >{c}</button>
                ))}
              </div>

              {/* Mail sender row */}
              <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", display: "flex", gap: "8px", alignItems: "center" }}>
                <span className="font-code-label" style={{ color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>~ mail -s</span>
                <input placeholder='"Your subject"' style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "7px 12px", color: "#e2e8f3", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(210,187,255,0.4)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                />
                <span className="font-code-label" style={{ color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>--to harshjain0621@gmail.com</span>
                <button onClick={() => setShowForm(true)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: "var(--primary-container)", border: "none", color: "var(--on-primary-container)", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.5)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
                >
                  CONNECT ▶
                </button>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Email card */}
              <div className="bento-card" style={{ borderRadius: "14px", padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid var(--outline)", background: "var(--glass-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--on-surface-variant)" }}>mail</span>
                  </div>
                  <span className="font-code-label" style={{ padding: "3px 9px", borderRadius: "999px", border: "1px solid var(--outline)", color: "var(--on-surface-muted)", fontSize: "9px", textTransform: "uppercase" }}>PRIMARY</span>
                </div>
                <p className="font-code-label" style={{ color: "var(--on-surface-muted)", textTransform: "uppercase", fontSize: "9px", marginBottom: "6px" }}>Direct Line</p>
                <a href="mailto:harshjain0621@gmail.com" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--on-surface)", textDecoration: "none", transition: "color 0.2s", display: "block", marginBottom: "12px" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface)")}
                >harshjain0621@gmail.com</a>
                <button onClick={() => setShowForm(true)} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "9px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>edit</span>
                  Write a Message
                </button>
              </div>

              {/* Network status */}
              <div className="bento-card" style={{ borderRadius: "14px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--ok-color)", boxShadow: "0 0 6px var(--ok-color)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <span className="font-code-label" style={{ color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Network Status</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { node: "pune.in.node", ping: "12ms", c: "var(--ok-color)" },
                    { node: "github.com", ping: "Online", c: "var(--ok-color)" },
                    { node: "linkedin.com", ping: "Online", c: "var(--ok-color)" },
                    { node: "huggingface.co", ping: "Active", c: "var(--warn-color)" },
                  ].map((item) => (
                    <div key={item.node} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-code-label" style={{ color: "var(--on-surface-variant)", fontSize: "11px" }}>{item.node}</span>
                      <span className="font-code-label" style={{ color: item.c, fontSize: "11px", fontWeight: 700 }}>{item.ping}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { label: "GitHub", icon: "code", href: "https://github.com/Harsh-4210" },
                  { label: "LinkedIn", icon: "work", href: "https://linkedin.com/in/harsh-jain0621" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="bento-card"
                    style={{ borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--primary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--card-border)"; }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "var(--on-surface-variant)" }}>{s.icon}</span>
                    <span className="font-code-label" style={{ color: "var(--on-surface-variant)", fontSize: "11px" }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
