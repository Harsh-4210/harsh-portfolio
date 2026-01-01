"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      
      {/* 1. ANIMATED PROFILE PHOTO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-white shadow-xl">
          {/* UPDATED: Checks for 'profile.jpeg' now */}
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs"
      >
        Hello, I'm
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter text-gray-900"
      >
        Harsh Jain
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl text-gray-600 font-medium mb-10"
      >
        AI Engineer & ML Developer
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex space-x-4"
      >
        {/* Black Primary Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          className="px-8 py-3 bg-gray-900 text-white border-2 border-gray-900 rounded-full font-bold hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-xl"
        >
          Download CV
        </a>
        
        {/* White Secondary Button */}
        <a
          href="#contact"
          className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-bold hover:border-black transition-all shadow-sm hover:shadow-md"
        >
          Contact Info
        </a>
      </motion.div>
    </section>
  );
}