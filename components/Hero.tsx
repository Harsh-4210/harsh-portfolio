"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
      {/* ANIMATED PROFILE PHOTO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-purple-400 shadow-2xl">
          <Image
            src="/profile.jpeg"
            alt="Harsh Jain"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 font-bold mb-4 uppercase tracking-widest text-xs"
      >
        Hello, I'm
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter text-white"
      >
        Harsh Jain
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl text-gray-300 font-medium mb-4"
      >
        AI Engineer & ML Developer
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 max-w-2xl mb-10 text-lg px-4"
      >
        Building production-ready ML systems with expertise in reinforcement learning, 
        RAG pipelines, and scalable APIs
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <a
          href="#contact"
          className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          Get In Touch
        </a>

        <a
          href="/Updated_Resume"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-full font-bold hover:border-purple-400 transition-all shadow-sm hover:shadow-md"
        >
          Download CV
        </a>
      </motion.div>
    </section>
  );
}