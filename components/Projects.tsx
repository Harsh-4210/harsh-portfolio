"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const projects = [
  {
    title: "Multi-Agent Governance",
    tech: "Reinforcement Learning (PPO), Python, RLlib",
    description: "Self-evolving multi-agent system using PPO algorithm for complex decision-making scenarios",
    highlights: [
      "Implemented PPO from scratch",
      "Achieved 85% convergence rate",
      "Reduced training time by 40%"
    ],
    link: "https://github.com/Harsh-4210/Self_Evolving_Multi_Agent_Governance",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "ClimateX Platform",
    tech: "React, Python, Data Analytics, Visualization",
    description: "Interactive platform for climate data analysis with real-time visualization and predictive modeling",
    highlights: [
      "Processed 100K+ data points",
      "Built interactive dashboards",
      "Integrated ML forecasting models"
    ],
    link: "https://github.com/Viraj281105/ClimateX",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "FloatChat (RAG AI)",
    tech: "RAG Pipeline, LLM, NLP, React, Vector DB",
    description: "Retrieval-Augmented Generation chatbot with context-aware responses and document processing",
    highlights: [
      "Implemented semantic search",
      "Response time <2 seconds",
      "Supports multiple file formats"
    ],
    link: "https://github.com/Viraj281105/FloatChat",
    color: "from-orange-400 to-red-500"
  },
  {
    title: "SO₂ Emission Prediction",
    tech: "XGBoost, Optuna, FastAPI, Docker",
    description: "ML model for predicting industrial emissions with hyperparameter optimization and API deployment",
    highlights: [
      "92% prediction accuracy",
      "Deployed with FastAPI",
      "Containerized with Docker"
    ],
    link: "https://github.com/PurveshMali/PBL",
    color: "from-cyan-400 to-blue-500"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="section-subtitle">Browse My Recent</p>
        <h2 className="section-title">Projects</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="portfolio-card flex flex-col group"
          >
            {/* Colorful Image Placeholder */}
            <div
              className={`w-full h-48 bg-gradient-to-br ${p.color} rounded-xl mb-6 flex items-center justify-center shadow-md group-hover:scale-[1.02] transition-transform duration-500`}
            >
              <span className="text-white font-bold text-lg drop-shadow-md">
                {p.title}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white">
              {p.title}
            </h3>
            <p className="text-sm text-gray-400 font-medium mb-3">
              {p.tech}
            </p>
            <p className="text-gray-300 mb-4">
              {p.description}
            </p>

            <ul className="space-y-1 mb-6 flex-grow">
              {p.highlights.map((highlight, idx) => (
                <li key={idx} className="text-sm text-gray-400">
                  • {highlight}
                </li>
              ))}
            </ul>

            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-100 rounded-full text-sm font-bold text-white hover:bg-white hover:text-gray-900 transition-all"
            >
              <Github size={16} />
              View GitHub
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}