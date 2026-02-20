"use client";
import { motion } from "framer-motion";

export default function Skills() {
  const categories = [
    {
      title: "Core ML & Backend",
      skills: ["Machine Learning", "Feature Engineering", "FastAPI", "REST APIs", "XGBoost", "Optuna"]
    },
    {
      title: "Data & Deployment",
      skills: ["Docker", "PostgreSQL", "MongoDB", "ETL Pipelines", "Git"]
    },
    {
      title: "Additional Exposure",
      skills: ["Deep Learning", "Reinforcement Learning (PPO)", "RAG Pipelines", "NLP", "React"]
    }
  ];

  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="section-subtitle">My Expertise</p>
        <h2 className="section-title">Skills</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="portfolio-card text-center"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-4">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {cat.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-2 text-sm font-medium bg-gray-700 border border-gray-600 rounded-lg"
                >
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