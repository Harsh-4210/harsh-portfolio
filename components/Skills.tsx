"use client";
import { motion } from "framer-motion";

export default function Skills() {
  const categories = [
    {
      title: "Machine Learning",
      skills: ["XGBoost", "Scikit-Learn", "FastAPI", "Optuna", "TensorFlow", "PyTorch"]
    },
    {
      title: "Advanced AI",
      skills: ["RLlib", "PPO", "RAG Pipelines", "NLP", "LangChain", "Vector DBs"]
    },
    {
      title: "Engineering",
      skills: ["Python", "Docker", "PostgreSQL", "Git", "React", "REST APIs"]
    },
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
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 text-sm font-medium bg-gray-700 border border-gray-600 rounded-lg hover:bg-purple-900 hover:border-purple-400 transition-colors cursor-default"
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