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

          {/* Projects */}
          <div className="portfolio-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-900 rounded-lg">
                <Code className="text-blue-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Experience</h3>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-blue-400 pl-6">
                <h4 className="text-lg font-bold text-white">
                  Multi-Agent Governance System
                </h4>
                <p className="text-sm text-gray-400">
                  Python, Ray RLlib, FastAPI, gRPC, PostgreSQL
                </p>
                <ul className="space-y-1 text-sm text-gray-300 mt-2">
                  <li>• Engineered decentralized multi-agent RL system using PPO</li>
                  <li>• Improved convergence rate by ~30% through reward tuning</li>
                  <li>• Built backend services and monitoring dashboards</li>
                </ul>
              </div>

              <div className="border-l-2 border-green-400 pl-6">
                <h4 className="text-lg font-bold text-white">
                  FloatChat – AI Data Explorer
                </h4>
                <p className="text-sm text-gray-400">
                  Python, FastAPI, RAG, Supabase
                </p>
                <ul className="space-y-1 text-sm text-gray-300 mt-2">
                  <li>• Built RAG system for querying 10K+ records</li>
                  <li>• Reduced response time by ~35%</li>
                  <li>• Designed scalable REST APIs</li>
                </ul>
              </div>

              <div className="border-l-2 border-orange-400 pl-6">
                <h4 className="text-lg font-bold text-white">
                  SO₂ Emission Prediction System
                </h4>
                <p className="text-sm text-gray-400">
                  Python, FastAPI, XGBoost, Docker
                </p>
                <ul className="space-y-1 text-sm text-gray-300 mt-2">
                  <li>• Developed end-to-end ML pipeline</li>
                  <li>• Achieved ~85% test accuracy</li>
                  <li>• Deployed Dockerized FastAPI service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}