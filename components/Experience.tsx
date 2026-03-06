"use client";
import { motion } from "framer-motion";
import { GraduationCap, Code, Calendar, MapPin, Award } from "lucide-react";

const items = [
  {
    type: "education",
    icon: GraduationCap,
    title: "Bachelor of Engineering — AI & Data Science",
    org: "Savitribai Phule Pune University",
    date: "Aug 2023 — May 2027",
    location: "Pune, India",
    badge: "GPA: 8.75 / 10",
    points: [
      "Machine Learning & Deep Learning",
      "Data Structures & Algorithms",
      "Natural Language Processing",
      "Database Management & Software Engineering",
    ],
  },
  {
    type: "project",
    icon: Code,
    title: "Multi-Agent Governance System",
    org: "Personal Project · Python, Ray RLlib, FastAPI, gRPC",
    date: "2025",
    points: [
      "Engineered decentralized multi-agent RL system using PPO",
      "Improved convergence rate by ~30% through reward tuning",
      "Built backend services and real-time monitoring dashboards",
    ],
  },
  {
    type: "project",
    icon: Code,
    title: "FloatChat — AI Data Explorer",
    org: "Team Project · Python, FastAPI, RAG, Supabase",
    date: "2024",
    points: [
      "Built RAG system for querying 10K+ records",
      "Reduced response time by ~35% via caching & query optimization",
      "Designed scalable REST API layer",
    ],
  },
  {
    type: "project",
    icon: Code,
    title: "SO\u2082 Emission Prediction System",
    org: "Team Project · Python, FastAPI, XGBoost, Docker",
    date: "2024",
    points: [
      "Developed end-to-end ML pipeline with feature engineering",
      "Achieved ~85% test accuracy with Optuna-based tuning",
      "Deployed Dockerized FastAPI service for inference",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="section-subtitle">My Journey</p>
        <h2 className="section-title">Experience & Education</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="relative ml-4">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-2 bottom-2 w-px"
          style={{ backgroundColor: "var(--border)" }}
        />

        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative pl-10 pb-12 last:pb-0"
          >
            {/* Dot */}
            <div
              className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2"
              style={{
                borderColor: "var(--accent)",
                backgroundColor: "var(--bg)",
              }}
            />

            {/* Meta */}
            <div
              className="flex flex-wrap items-center gap-3 text-xs mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {item.date}
              </span>
              {item.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {item.location}
                </span>
              )}
              {item.badge && (
                <span
                  className="flex items-center gap-1 font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  <Award size={12} />
                  {item.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-base font-semibold mb-0.5"
              style={{ color: "var(--text-primary)" }}
            >
              {item.title}
            </h3>
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
              {item.org}
            </p>

            {/* Points */}
            <ul className="space-y-1.5">
              {item.points.map((p, idx) => (
                <li
                  key={idx}
                  className="text-sm flex items-start gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-2 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
