"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const sections = ["about", "experience", "projects", "skills", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setMobileOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled ? `1px solid var(--nav-border)` : "1px solid transparent",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="font-semibold text-lg tracking-tight flex items-center gap-2.5"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              H
            </span>
            <span className="hidden sm:inline">Harsh Jain</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => handleNavClick(s)}
                className="relative px-3.5 py-1.5 text-[13px] font-medium capitalize rounded-md transition-colors duration-200"
                style={{
                  color: active === s ? "var(--accent)" : "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (active !== s)
                    e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (active !== s)
                    e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {s}
                {active === s && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-md transition-colors duration-200"
              style={{
                color: "var(--text-muted)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-bg)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Resume */}
            <a
              href="/New_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ml-2 !py-1.5 !px-4 !text-xs"
            >
              Resume
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md"
              style={{ color: "var(--text-muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--text-primary)" }}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: theme === "dark" ? "rgba(11,15,26,0.95)" : "rgba(255,255,255,0.95)" }}
          >
            {sections.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleNavClick(s)}
                className="text-xl font-medium capitalize"
                style={{
                  color: active === s ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                {s}
              </motion.button>
            ))}
            <a
              href="/New_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
