"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, CheckCircle, Copy } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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

        {/* Email + Socials cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-16"
        >
          {/* Email Card */}
          <div className="portfolio-card p-6 flex-1">
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

          {/* Socials Card */}
          <div className="portfolio-card p-6 flex-1">
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
