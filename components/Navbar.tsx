"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { profile } from "@/lib/content";
import { GithubIcon, HuggingFaceIcon, LinkedInIcon, MailIcon, MoonIcon, SunIcon } from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: profile.links.huggingface, label: "Hugging Face", Icon: HuggingFaceIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const active = isActive(usePathname(), href);
  return (
    <Link href={href} onClick={onClick} className="group relative" aria-current={active ? "page" : undefined}>
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-current transition-[width] duration-300 group-hover:w-full ${
          active ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
}

// The <html> class is the source of truth; the inline script in layout sets it before paint.
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-light transition-transform hover:scale-110 dark:bg-light dark:text-dark"
    >
      {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}

function Socials() {
  return (
    <>
      {socials.map(({ href, label, Icon }) => (
        <motion.a
          key={label}
          href={href}
          aria-label={label}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="block h-6 w-6"
        >
          <Icon className="h-6 w-6" />
        </motion.a>
      ))}
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 flex w-full items-center justify-between px-6 py-7 font-medium sm:px-12 lg:px-24 xl:px-32">
      {/* Mobile menu button */}
      <button
        type="button"
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Desktop */}
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
        {nav.map((n) => (
          <NavLink key={n.href} {...n} />
        ))}
      </nav>

      <Link
        href="/"
        aria-label="Home"
        className="absolute left-1/2 top-3 -translate-x-1/2 lg:top-4"
      >
        <motion.span
          whileHover={{ scale: 1.08 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-dark text-xl font-bold text-light dark:border-2 dark:border-light"
        >
          HJ
        </motion.span>
      </Link>

      <div className="hidden items-center gap-5 lg:flex">
        <Socials />
        <ThemeToggle />
      </div>
      <div className="lg:hidden">
        <ThemeToggle />
      </div>

      {/* Mobile overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed left-1/2 top-1/2 z-30 flex w-[min(90vw,24rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8 rounded-2xl bg-dark/95 px-8 py-14 text-light backdrop-blur-md dark:bg-light/95 dark:text-dark lg:hidden"
        >
          <nav className="flex flex-col items-center gap-5 text-lg" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.href} {...n} onClick={() => setOpen(false)} />
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Socials />
          </div>
        </motion.div>
      )}
    </header>
  );
}
