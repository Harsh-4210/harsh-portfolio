"use client";
import { useState, useEffect } from "react";

const sections = ["projects", "skills", "contact"];

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
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-sm font-medium">
        <span className="text-xl font-bold tracking-tight text-gray-900">Harsh Jain</span>

        <div className="flex gap-8 text-gray-500 items-center">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={`transition-colors duration-300 capitalize ${
                active === s ? "text-black font-bold" : "hover:text-black"
              }`}
            >
              {s}
            </a>
          ))}
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}