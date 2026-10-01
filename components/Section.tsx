"use client";

import { motion } from "motion/react";

/** Page gutter shared by every page. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full px-6 sm:px-12 lg:px-24 xl:px-32 ${className}`}>{children}</div>;
}

/** Large headline that reveals word by word. */
export function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <h1 className={`w-full font-bold text-dark dark:text-light ${className}`} aria-label={text}>
      <motion.span
        className="inline-block"
        aria-hidden
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="mr-[0.25em] inline-block"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}

/** Bordered card with the solid offset block behind it. */
export function OffsetCard({
  children,
  className = "",
  radius = "rounded-3xl",
}: {
  children: React.ReactNode;
  className?: string;
  radius?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className={`absolute inset-0 translate-x-2.5 translate-y-2.5 bg-dark dark:bg-light ${radius}`} />
      <div className={`relative h-full border-2 border-dark bg-light dark:border-light dark:bg-dark ${radius}`}>
        {children}
      </div>
    </div>
  );
}

/** Fade-and-rise on scroll into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
