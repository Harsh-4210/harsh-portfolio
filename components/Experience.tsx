"use client";
import { motion } from "framer-motion";
import { GraduationCap, Code, Calendar, MapPin, Award } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="section-subtitle">My Journey</p>
        <h2 className="section-title">Experience & Education</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="portfolio-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-900 rounded-lg">
                <GraduationCap className="text-purple-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-purple-400 pl-6">
                <h4 className="text-xl font-bold mb-2 text-white">
                  Bachelor of Engineering
                </h4>
                <p className="text-lg text-purple-300 mb-2">
                  Artificial Intelligence and Data Science
                </p>
                <p className="text-gray-400 mb-2">
                  Savitribai Phule Pune University
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    Aug 2023 - May 2027
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    Pune, India
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">GPA: 8.75/10</span>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Machine Learning & Deep Learning</li>
                  <li>• Data Structures & Algorithms</li>
                  <li>• Natural Language Processing</li>
                  <li>• Database Management & Software Engineering</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Project Experience */}
          <div className="portfolio-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-900 rounded-lg">
                <Code className="text-blue-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Experience</h3>
            </div>

            <div className="space-y-6">
              {/* Multi-Agent Project */}
              <div className="border-l-2 border-blue-400 pl-6">
                <h4 className="text-lg font-bold mb-1 text-white">
                  Multi-Agent Governance System
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Python, Ray RLlib, gRPC, Dash, PostgreSQL
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar size={14} />
                  Sep 2024 - Dec 2024
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Built decentralized multi-agent RL system with PPO algorithm</li>
                  <li>• Achieved 30% higher convergence rate vs baseline</li>
                  <li>• Developed real-time monitoring dashboards with FastAPI</li>
                </ul>
              </div>

              {/* FloatChat Project */}
              <div className="border-l-2 border-green-400 pl-6">
                <h4 className="text-lg font-bold mb-1 text-white">
                  FloatChat - AI Data Explorer
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  React, TypeScript, FastAPI, RAG, Supabase
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar size={14} />
                  Jun 2024 - Aug 2024
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Built RAG pipeline for 10K+ oceanographic data points</li>
                  <li>• Improved response time by 35% through optimization</li>
                  <li>• Full-stack TypeScript with RESTful API design</li>
                </ul>
              </div>

              {/* Emission Prediction */}
              <div className="border-l-2 border-orange-400 pl-6">
                <h4 className="text-lg font-bold mb-1 text-white">
                  SO₂ Emission Prediction
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Python, FastAPI, XGBoost, Optuna, Docker
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar size={14} />
                  Mar 2024 - May 2024
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Architected end-to-end ML pipeline (85% accuracy)</li>
                  <li>• Enhanced prediction efficiency by 20%</li>
                  <li>• Deployed containerized FastAPI microservice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="portfolio-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-yellow-400" size={24} />
              <h4 className="text-lg font-bold text-white">Certifications</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-white">Machine Learning Specialization</p>
                <p className="text-sm text-gray-400">Andrew Ng, Coursera • Jan 2024</p>
                <p className="text-xs text-gray-500 mt-1">
                  Supervised/unsupervised learning, neural networks, model evaluation
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Python Zero to Hero</p>
                <p className="text-sm text-gray-400">Udemy • Nov 2023</p>
                <p className="text-xs text-gray-500 mt-1">
                  Advanced Python, OOP, automation, professional development
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="portfolio-card bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30"
          >
            <div className="text-center py-4">
              <h4 className="text-xl font-bold text-white mb-3">Open for Opportunities</h4>
              <p className="text-gray-300 mb-4">
                Seeking internships and full-time roles in ML Engineering, AI Development, and Data Science
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">Machine Learning</span>
                <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Deep Learning</span>
                <span className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full">MLOps</span>
                <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">AI Research</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}