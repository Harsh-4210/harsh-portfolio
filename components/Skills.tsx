"use client";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Core ML & AI",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Reinforcement Learning",
      "NLP",
      "Feature Engineering",
      "XGBoost",
      "Optuna",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "gRPC",
      "Docker",
      "Git",
    ],
  },
  {
    title: "Data & Infrastructure",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "ETL Pipelines",
      "RAG Pipelines",
      "React",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="section-subtitle">Technical Expertise</p>
        <h2 className="section-title">Skills</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-5"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
            }}
          >
            <h3
              className="text-sm font-semibold mb-4 pb-3"
              style={{
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
