"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const projects = [
  {
    title: "Multi-Agent Governance System",
    tech: "Python, Ray RLlib, FastAPI, gRPC, PostgreSQL",
    description: "Decentralized multi-agent RL system for autonomous decision-making.",
    highlights: [
      "Improved convergence rate by ~30%",
      "Built backend services for agent coordination",
      "Implemented real-time monitoring dashboards"
    ],
    link: "https://github.com/Harsh-4210/Self_Evolving_Multi_Agent_Governance",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "ClimateX – Climate Intelligence Platform",
    tech: "Python, FastAPI, PostgreSQL, MongoDB, ETL",
    description: "Backend platform for climate data ingestion and analytics.",
    highlights: [
      "Processed 100K+ climate records",
      "Designed dual-database architecture",
      "Built ETL pipelines"
    ],
    link: "https://github.com/Viraj281105/ClimateX",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "FloatChat – AI Data Explorer",
    tech: "Python, FastAPI, RAG, Supabase",
    description: "Natural-language interface for large-scale data exploration.",
    highlights: [
      "Implemented RAG pipeline",
      "Reduced API response time by ~35%",
      "Designed scalable REST APIs"
    ],
    link: "https://github.com/Viraj281105/FloatChat",
    color: "from-orange-400 to-red-500"
  },
  {
    title: "SO₂ Emission Prediction System",
    tech: "Python, FastAPI, XGBoost, Optuna, Docker",
    description: "ML system for predicting SO₂ emissions from power plants.",
    highlights: [
      "Achieved ~85% test accuracy",
      "Applied Optuna-based tuning",
      "Deployed Dockerized ML API"
    ],
    link: "https://github.com/PurveshMali/PBL",
    color: "from-cyan-400 to-blue-500"
  }
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
            className="portfolio-card flex flex-col"
          >
            <div className={`w-full h-48 bg-gradient-to-br ${p.color} rounded-xl mb-6 flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">
                {p.title}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white">{p.title}</h3>
            <p className="text-sm text-gray-400 mb-3">{p.tech}</p>
            <p className="text-gray-300 mb-4">{p.description}</p>

            <ul className="space-y-1 mb-6">
              {p.highlights.map((h, idx) => (
                <li key={idx} className="text-sm text-gray-400">• {h}</li>
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