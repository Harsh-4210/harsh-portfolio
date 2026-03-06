"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "harshjain0621@gmail.com",
    href: "mailto:harshjain0621@gmail.com",
    external: false,
  },
  {
    icon: Github,
    label: "github.com/Harsh-4210",
    href: "https://github.com/Harsh-4210",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harsh-jain-853b31341/",
    external: true,
  },
];

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Contact</p>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <div className="section-divider" />

          <p
            className="max-w-md mx-auto text-base leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            I&apos;m actively seeking internship opportunities in Machine Learning, AI, and backend-focused data engineering. Feel free to reach out.
          </p>

          {/* Primary CTA */}
          <a href="mailto:harshjain0621@gmail.com" className="btn-primary inline-flex mb-10">
            <Mail size={16} />
            Send an Email
          </a>

          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            {links.map(({ icon: Icon, label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-border)";
                  e.currentTarget.style.backgroundColor = "var(--accent-bg)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <Icon size={16} />
                {label}
                {external && <ArrowUpRight size={12} />}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div
          className="pt-8 text-xs"
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
