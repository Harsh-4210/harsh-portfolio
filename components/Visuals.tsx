"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll } from "motion/react";
import { profile } from "@/lib/content";

/** Rotating circular label with an email button in the middle (home page). */
export function CircularBadge() {
  const text = "ML Engineer · LLM Post-training · ";
  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-10 hidden h-32 w-32 items-center justify-center xl:flex">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow fill-dark dark:fill-light" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="text-[8.4px] font-semibold uppercase">
          {/* textLength = circumference (2π·38), so the phrase closes the loop exactly. */}
          <textPath href="#badge-circle" textLength="238.7" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <a
        href={`mailto:${profile.email}`}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-dark bg-dark text-[11px] font-semibold text-light shadow-md transition-colors hover:bg-light hover:text-dark dark:border-light dark:bg-light dark:text-dark dark:hover:bg-dark dark:hover:text-light"
      >
        Email me
      </a>
    </div>
  );
}

/** Project cover: the system drawn as a pipeline, used instead of screenshots. */
export function Schematic({ steps, caption }: { steps: string[]; caption?: string }) {
  return (
    <div className="relative flex h-full min-h-56 flex-col justify-between overflow-hidden bg-dark p-6 text-light dark:bg-light dark:text-dark sm:p-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <p className="relative font-mono text-xs uppercase tracking-widest opacity-70">{caption ?? "System"}</p>
      <ol className="relative my-6 flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="rounded-md border border-current/40 px-3 py-1.5 text-sm font-semibold">{s}</span>
            {i < steps.length - 1 && <span aria-hidden className="opacity-60">→</span>}
          </li>
        ))}
      </ol>
      <p className="relative font-mono text-xs opacity-60">{steps.length} stages</p>
    </div>
  );
}

/** Counts up from zero the first time it scrolls into view. */
export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: setShown });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toFixed(decimals)}
    </span>
  );
}

/** Pills that fly out from the centre to fixed positions (about page). */
export function SkillsMap({ skills }: { skills: { name: string; x: number; y: number }[] }) {
  return (
    <>
      <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(27,27,27,0.08)_1.5px,transparent_1.5px)] [background-size:22px_22px] dark:bg-[radial-gradient(circle,rgba(245,245,245,0.1)_1.5px,transparent_1.5px)] md:block">
        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-dark text-lg font-semibold text-light shadow-lg dark:bg-light dark:text-dark">
          ML
        </div>
        {skills.map((s) => (
          <motion.div
            key={s.name}
            className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark px-5 py-2.5 font-semibold text-light shadow-md dark:bg-light dark:text-dark"
            initial={{ left: "50%", top: "50%" }}
            whileInView={{ left: `${50 + s.x * 1.25}%`, top: `${50 + s.y * 2}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
          >
            {s.name}
          </motion.div>
        ))}
      </div>
      <ul className="flex flex-wrap justify-center gap-3 md:hidden">
        {skills.map((s) => (
          <li key={s.name} className="rounded-full bg-dark px-4 py-2 text-sm font-semibold text-light dark:bg-light dark:text-dark">
            {s.name}
          </li>
        ))}
      </ul>
    </>
  );
}

type TimelineItem = { title: string; org?: string; href?: string; time: string; detail: string };

/** Vertical timeline whose line draws itself as you scroll. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-[11px] top-1 h-full w-[3px] origin-top bg-dark dark:bg-light sm:left-[27px]"
      />
      <ul className="flex flex-col gap-12">
        {items.map((it) => (
          <motion.li
            key={it.title + it.time}
            className="relative pl-10 sm:pl-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span
              aria-hidden
              className="absolute left-0 top-1 h-6 w-6 rounded-full border-[3px] border-dark bg-light dark:border-light dark:bg-dark sm:left-4"
            />
            <h3 className="text-xl font-bold sm:text-2xl">
              {it.title}
              {it.org && (
                <>
                  {" "}
                  {it.href ? (
                    <a href={it.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline dark:text-accent-dark">
                      @{it.org}
                    </a>
                  ) : (
                    <span className="text-accent dark:text-accent-dark">@{it.org}</span>
                  )}
                </>
              )}
            </h3>
            <p className="mt-1 font-medium text-dark/70 dark:text-light/60">{it.time}</p>
            <p className="mt-2 max-w-2xl font-medium">{it.detail}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
