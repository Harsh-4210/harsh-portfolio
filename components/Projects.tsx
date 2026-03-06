"use client";
import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Multi-Agent Governance System",
    tech: ["Python", "Ray RLlib", "FastAPI", "gRPC", "PostgreSQL"],
    description:
      "Decentralized multi-agent RL system for autonomous decision-making using PPO with custom reward shaping.",
    highlights: [
      "Improved convergence rate by ~30%",
      "Built backend services for agent coordination",
      "Real-time monitoring dashboards",
    ],
    link: "https://github.com/Harsh-4210/Self_Evolving_Multi_Agent_Governance",
  },
  {
    title: "ClimateX — Climate Intelligence Platform",
    tech: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "ETL"],
    description:
      "Backend platform for climate data ingestion & analytics with dual-database architecture.",
    highlights: [
      "Processed 100K+ climate records",
      "Dual-database architecture",
      "Automated ETL pipelines",
    ],
    link: "https://github.com/Viraj281105/ClimateX",
  },
  {
    title: "FloatChat — AI Data Explorer",
    tech: ["Python", "FastAPI", "RAG", "Supabase"],
    description:
      "Natural-language interface for large-scale data exploration powered by a RAG pipeline.",
    highlights: [
      "RAG pipeline for 10K+ records",
      "Reduced API response time by ~35%",
      "Scalable REST API design",
    ],
    link: "https://github.com/Viraj281105/FloatChat",
  },
  {
    title: "SO\u2082 Emission Prediction",
    tech: ["Python", "FastAPI", "XGBoost", "Optuna", "Docker"],
    description:
      "ML system for predicting SO\u2082 emissions from power plants with hyperparameter optimization.",
    highlights: [
      "~85% test accuracy",
      "Optuna-based hyperparameter tuning",
      "Dockerized ML API deployment",
    ],
    link: "https://github.com/PurveshMali/PBL",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="section-subtitle">Featured Work</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-xl p-5 flex flex-col transition-all duration-200"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-border)";
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3
                className="text-base font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {p.title}
              </h3>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md shrink-0 transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.backgroundColor = "var(--accent-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label={`View ${p.title} on GitHub`}
              >
                <ArrowUpRight size={16} />
              </a>
            </div>

            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              {p.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-1.5 mb-5 flex-1">
              {p.highlights.map((h, idx) => (
                <li
                  key={idx}
                  className="text-sm flex items-start gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tech + Link */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="skill-tag !py-0.5 !px-2 !text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Github size={13} />
                Source
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
