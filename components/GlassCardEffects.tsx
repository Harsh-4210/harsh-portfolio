"use client";
import { useEffect } from "react";

export default function GlassCardEffects() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".glass-card"));
    const handlers = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
      card.addEventListener("mousemove", onMove);
      return { card, onMove };
    });

    return () => {
      handlers.forEach(({ card, onMove }) => {
        card.removeEventListener("mousemove", onMove);
      });
    };
  }, []);

  return null;
}
