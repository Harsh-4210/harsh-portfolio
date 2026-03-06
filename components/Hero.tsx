"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const roles = ["AI Engineer", "ML Developer", "Backend Engineer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((p) => (p + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () =>
          setDisplayText(
            isDeleting
              ? current.slice(0, displayText.length - 1)
              : current.slice(0, displayText.length + 1)
          ),
        isDeleting ? 35 : 70
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-6 pt-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 w-28 h-28 relative"
        >
          <div className="w-full h-full rounded-full overflow-hidden"
            style={{
              boxShadow: "0 0 0 2px var(--border), 0 0 0 4px var(--bg)",
            }}
          >
            <Image
              src="/profile.jpeg"
              alt="Harsh Jain"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
          {/* Online dot */}
          <span
            className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
            style={{
              backgroundColor: "#22c55e",
              borderColor: "var(--bg)",
            }}
          />
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
          style={{
            backgroundColor: "var(--accent-bg)",
            color: "var(--accent)",
            border: "1px solid var(--accent-border)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Harsh Jain
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl font-medium mb-6 h-8"
        >
          <span style={{ color: "var(--text-muted)" }}>I&apos;m a </span>
          <span style={{ color: "var(--accent)" }}>{displayText}</span>
          <span className="animate-pulse" style={{ color: "var(--accent)" }}>
            |
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-lg mx-auto text-base leading-relaxed mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          Building end-to-end ML systems with scalable APIs, model optimization, and production-ready deployment using FastAPI and Docker.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <a href="#contact" className="btn-primary">
            Get In Touch
          </a>
          <a
            href="/New_Resume"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Download CV
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/Harsh-4210", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-jain-853b31341/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:harshjain0621@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-md transition-colors duration-200"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent-border)";
                e.currentTarget.style.backgroundColor = "var(--accent-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ color: "var(--text-muted)" }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
