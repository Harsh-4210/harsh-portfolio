"use client";
import { motion } from "framer-motion";
import { Brain, Server, Database, Rocket } from "lucide-react";

const highlights = [
  { icon: Brain, title: "Machine Learning", desc: "End-to-end ML pipelines, feature engineering, and model optimization" },
  { icon: Server, title: "Backend Systems", desc: "Production-quality APIs with FastAPI, scalable architecture design" },
  { icon: Database, title: "Data Engineering", desc: "ETL pipelines, dual-database architectures, large-scale processing" },
  { icon: Rocket, title: "Deployment", desc: "Dockerized services, monitoring, and production-ready delivery" },
];

export default function About() {
  return (
    <section id="about" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="section-subtitle">About</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="section-divider" />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Text */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I&apos;m an Applied Machine Learning and AI student at Savitribai Phule
              Pune University with hands-on experience building end-to-end ML systems
              and production-ready backend services. I focus on developing ML pipelines,
              optimizing models, and deploying scalable APIs.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Through project-based work, I&apos;ve built systems spanning emissions
              prediction, climate data analytics, intelligent data exploration, and
              distributed ML workflows. My strengths lie in clean system design,
              feature engineering, and performance optimization for real-world use cases.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Currently maintaining a{" "}
              <span className="font-semibold" style={{ color: "var(--accent)" }}>GPA of 8.75/10</span>,
              I actively collaborate on engineering projects and enjoy working in
              structured, team-oriented development environments.
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-6">
              {[
                { value: "4+", label: "Projects" },
                { value: "8.75", label: "GPA" },
                { value: "10+", label: "Technologies" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</div>
                  <div className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competency cards */}
          <div className="lg:col-span-2 grid gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3.5 p-3.5 rounded-lg transition-colors duration-200"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-border)";
                  e.currentTarget.style.backgroundColor = "var(--accent-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "var(--bg-card)";
                }}
              >
                <div
                  className="p-2 rounded-md shrink-0 h-fit"
                  style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)" }}
                >
                  <h.icon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {h.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {h.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
