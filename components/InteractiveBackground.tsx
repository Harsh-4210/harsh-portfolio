"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Neural-constellation background.
 *
 * Softly floating particles connected by lines when nearby — evokes the
 * "connected network / neural pathway" aesthetic fitting for an AI/ML
 * engineer portfolio. Fully transparent canvas; particles and edges use
 * the purple accent colour at low opacity so they never fight content.
 *
 * Mouse interaction: particles within a radius are gently pushed away,
 * creating a living, responsive feel.
 */

/* ---- tuning knobs ---- */
const PARTICLE_COUNT = 80;          // total particles
const CONNECT_DIST = 150;           // max px distance to draw an edge
const MOUSE_RADIUS = 160;           // cursor repulsion radius
const MOUSE_FORCE = 0.035;          // repulsion strength
const BASE_SPEED = 0.3;             // max drift speed per axis
const PARTICLE_MIN_R = 1.2;         // radius range
const PARTICLE_MAX_R = 2.8;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;          // visual radius
  baseAlpha: number;  // 0.15 – 0.5
}

function createParticles(w: number, h: number): Particle[] {
  const arr: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * BASE_SPEED * 2,
      vy: (Math.random() - 0.5) * BASE_SPEED * 2,
      r: PARTICLE_MIN_R + Math.random() * (PARTICLE_MAX_R - PARTICLE_MIN_R),
      baseAlpha: 0.15 + Math.random() * 0.35,
    });
  }
  return arr;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;

    /* ---- sizing ---- */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-create particles when viewport changes substantially
      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(W, H);
      } else {
        // keep existing, just clamp positions in bounds
        for (const p of particlesRef.current) {
          if (p.x > W) p.x = W - 10;
          if (p.y > H) p.y = H - 10;
        }
      }
    };

    /* ---- mouse ---- */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    /* ---- animation loop ---- */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = themeRef.current === "dark";
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Accent colour channels
      const cR = isDark ? 139 : 109;
      const cG = isDark ? 92 : 40;
      const cB = isDark ? 246 : 217;

      /* ---- update positions ---- */
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Drift with friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > BASE_SPEED * 3) {
          p.vx *= (BASE_SPEED * 3) / speed;
          p.vy *= (BASE_SPEED * 3) / speed;
        }

        // Wrap edges
        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;
      }

      /* ---- draw edges ---- */
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;

          const alpha = (1 - dist / CONNECT_DIST) * (isDark ? 0.12 : 0.08);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${cR},${cG},${cB},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      /* ---- draw particles ---- */
      for (const p of particles) {
        // Glow near mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = dist < MOUSE_RADIUS ? 1 - dist / MOUSE_RADIUS : 0;
        const alpha = p.baseAlpha + proximity * 0.35;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + proximity * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cR},${cG},${cB},${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[-1]"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
