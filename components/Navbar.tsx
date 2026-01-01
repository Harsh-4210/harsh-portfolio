"use client";
import { useState, useEffect } from "react";

const sections = ["about", "experience", "projects", "skills", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 200) {
          setActive(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/70 backdrop-blur-lg border-b border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-sm font-medium">
        <span className="text-xl font-bold tracking-tight text-white">
          Harsh Jain
        </span>

        <div className="flex gap-8 text-gray-400 items-center">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={`transition-colors duration-300 capitalize ${
                active === s
                  ? "text-purple-400 font-bold"
                  : "hover:text-white"
              }`}
            >
              {s}
            </a>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-700 rounded-full text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}