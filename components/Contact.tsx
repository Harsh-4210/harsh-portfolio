"use client";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, Send, CheckCircle, Copy } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Harsh-4210",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harsh-jain-853b31341/",
  },
];

const EMAIL = "harshjain0621@gmail.com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Hi Harsh,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_self");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "0.5rem",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <footer id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-subtitle">Contact</p>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <div className="section-divider" />

          <p
            className="max-w-md mx-auto text-base leading-relaxed mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            I&apos;m actively seeking internship opportunities in Machine Learning, AI, and backend-focused data engineering. Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Form + Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-5 gap-8 mb-16"
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 portfolio-card p-6 sm:p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Hi Harsh, I'd like to discuss..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" as const }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full justify-center cursor-pointer"
            >
              {sent ? (
                <>
                  <CheckCircle size={16} />
                  Opening Mail Client...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Sidebar */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Email Card */}
            <div className="portfolio-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} style={{ color: "var(--accent)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Email
                </span>
              </div>
              <p
                className="text-sm font-medium mb-3 break-all"
                style={{ color: "var(--text-primary)" }}
              >
                {EMAIL}
              </p>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200 cursor-pointer"
                style={{
                  color: copied ? "var(--accent)" : "var(--text-muted)",
                  backgroundColor: copied ? "var(--accent-bg)" : "var(--bg-secondary)",
                  border: `1px solid ${copied ? "var(--accent-border)" : "var(--border)"}`,
                }}
              >
                {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>

            {/* Socials */}
            <div className="portfolio-card p-6">
              <p className="text-xs font-medium mb-3" style={{ color: "var(--text-muted)" }}>
                Socials
              </p>
              <div className="flex flex-col gap-2.5">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm font-medium transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    <Icon size={16} />
                    {label}
                    <ArrowUpRight size={12} className="ml-auto" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div
          className="pt-8 text-center text-xs"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>&copy; {new Date().getFullYear()} Harsh Jain. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
