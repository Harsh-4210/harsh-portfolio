"use client";
import { motion } from "framer-motion";

export default function Skills() {
  const categories = [
    { title: "Machine Learning", skills: ["XGBoost", "Scikit-Learn", "FastAPI", "Optuna"] },
    { title: "Advanced AI", skills: ["RLlib", "PPO", "RAG Pipelines", "NLP"] },
    { title: "Engineering", skills: ["Python", "Docker", "PostgreSQL", "Git"] },
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
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-100 pb-4">{cat.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              {cat.skills.map((skill) => (
                <span key={skill} className="text-gray-600 text-sm font-medium bg-gray-50 border border-gray-100 py-2 rounded-lg">
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