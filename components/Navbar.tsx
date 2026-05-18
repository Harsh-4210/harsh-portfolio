"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Stack", href: "/stack" },
  { label: "Architecture", href: "/architecture" },
  { label: "Contact", href: "/contact" },
];

function BookCallModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(12px)",
        }}
      />
      {/* Modal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          background: "var(--surface)",
          border: "1px solid var(--card-border)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "var(--on-surface-variant)",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>close</span>
        </button>

        <div className="flex items-center" style={{ gap: "12px", marginBottom: "8px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--primary-container)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--on-primary-container)" }}>calendar_month</span>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--on-surface)" }}>
              Book a Call
            </h2>
            <p className="font-code-label" style={{ color: "var(--on-surface-variant)", marginTop: "2px" }}>
              Harsh Jain · Pune, IN · IST (UTC+5:30)
            </p>
          </div>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--on-surface-variant)", marginBottom: "28px", marginTop: "16px" }}>
          Open to internship opportunities, project collaborations, and research conversations in ML, RL, and production AI systems.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Calendly */}
          <a
            href="https://calendly.com/harshjain0621"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background: "var(--primary-container)",
              color: "var(--on-primary-container)",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 35px rgba(124,58,237,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.01)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>event</span>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600 }}>Schedule via Calendly</div>
              <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>calendly.com/harshjain0621</div>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: "16px", marginLeft: "auto" }}>arrow_outward</span>
          </a>

          {/* Email */}
          <a
            href="mailto:harshjain0621@gmail.com?subject=Collaboration%20Inquiry&body=Hi%20Harsh%2C%0A%0AI%20wanted%20to%20connect%20about..."
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--on-surface)",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--primary)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--glass-hover-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--glass-border)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--glass-bg)";
            }}
          >
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>mail</span>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600 }}>Send an Email</div>
              <div className="font-code-label" style={{ color: "var(--on-surface-variant)", marginTop: "2px" }}>harshjain0621@gmail.com</div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "16px", marginLeft: "auto" }}>arrow_outward</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/harsh-jain0621"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--on-surface)",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--primary)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--glass-hover-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--glass-border)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--glass-bg)";
            }}
          >
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>work</span>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600 }}>Connect on LinkedIn</div>
              <div className="font-code-label" style={{ color: "var(--on-surface-variant)", marginTop: "2px" }}>linkedin.com/in/harsh-jain0621</div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "16px", marginLeft: "auto" }}>arrow_outward</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBookCall, setShowBookCall] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showBookCall && <BookCallModal onClose={() => setShowBookCall(false)} />}

      {/* Desktop Nav */}
      <nav
        className="fixed top-0 w-full z-50 hidden md:block"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="flex justify-between items-center mx-auto"
          style={{ maxWidth: "1200px", padding: "16px 80px" }}
        >
          <Link href="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 900, color: "var(--on-surface)", textDecoration: "none" }}>
            HJ
          </Link>

          <div className="flex items-center" style={{ gap: "28px" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                  color: pathname === link.href ? "var(--primary)" : "var(--on-surface-variant)",
                  textDecoration: "none",
                  borderBottom: pathname === link.href ? "2px solid var(--primary)" : "2px solid transparent",
                  paddingBottom: "3px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { if (pathname !== link.href) (e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface)"; }}
                onMouseLeave={(e) => { if (pathname !== link.href) (e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface-variant)"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center" style={{ gap: "12px" }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--on-surface-variant)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--on-surface-variant)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--glass-border)";
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Book a Call */}
            <button
              onClick={() => setShowBookCall(true)}
              className="btn-primary"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.05em" }}
            >
              Book a Call
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav
        className="fixed top-0 w-full z-50 md:hidden"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--nav-border)",
        }}
      >
        <div className="flex justify-between items-center" style={{ padding: "14px 20px" }}>
          <Link href="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 900, color: "var(--on-surface)", textDecoration: "none" }}>HJ</Link>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <button
              onClick={toggleTheme}
              style={{ background: "none", border: "none", color: "var(--on-surface-variant)", cursor: "pointer", padding: "4px" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", color: "var(--on-surface)", cursor: "pointer" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div style={{ padding: "12px 20px 20px", borderTop: "1px solid var(--nav-border)", display: "flex", flexDirection: "column", gap: "14px" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: pathname === link.href ? "var(--primary)" : "var(--on-surface-variant)", textDecoration: "none" }}
              >{link.label}</Link>
            ))}
            <button onClick={() => { setMobileOpen(false); setShowBookCall(true); }} className="btn-primary" style={{ marginTop: "8px", justifyContent: "center" }}>
              Book a Call
            </button>
          </div>
        )}
      </nav>
    </>
  );
}