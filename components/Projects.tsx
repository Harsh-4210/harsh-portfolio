"use client";
import { motion } from "framer-motion";

const projects = [
  { 
    title: "Multi-Agent Governance", 
    tech: "Reinforcement Learning (PPO), Python", 
    link: "https://github.com/Harsh-4210/Self_Evolving_Multi_Agent_Governance",
    color: "from-purple-500 to-indigo-600"
  },
  { 
    title: "ClimateX Platform", 
    tech: "React, Python, Data Analytics", 
    link: "https://github.com/Viraj281105/ClimateX",
    color: "from-emerald-400 to-teal-500"
  },
  { 
    title: "FloatChat (RAG AI)", 
    tech: "RAG (LLM), NLP, React", 
    link: "https://github.com/Viraj281105/FloatChat",
    color: "from-orange-400 to-red-500"
  },
  { 
    title: "SO₂ Emission Prediction", 
    tech: "XGBoost, Optuna, FastAPI", 
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
            className="portfolio-card flex flex-col items-center text-center group"
          >
            {/* Colorful Image Placeholder */}
            <div className={`w-full h-48 bg-gradient-to-br ${p.color} rounded-xl mb-6 flex items-center justify-center shadow-md group-hover:scale-[1.02] transition-transform duration-500`}>
               <span className="text-white font-bold text-lg drop-shadow-md">
                 {p.title}
               </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{p.title}</h3>
            <p className="text-gray-500 mb-6 font-medium">{p.tech}</p>
            
            <a 
              href={p.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-gray-900 rounded-full text-sm font-bold text-gray-900 hover:bg-black hover:text-white transition-all"
            >
              View GitHub
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}