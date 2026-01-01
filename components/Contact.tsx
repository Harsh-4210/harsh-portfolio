"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="py-24 max-w-4xl mx-auto px-6 text-center border-t border-gray-800 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Let's Work Together
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg">
          Open to internships and ML engineering roles. Let's build something amazing!
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="mailto:harshjain0621@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Mail size={20} />
            Email Me
          </a>
          <a
            href="https://github.com/Harsh-4210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-full font-medium hover:border-purple-400 transition-all"
          >
            <Github size={20} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-jain-853b31341/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-full font-medium hover:border-purple-400 transition-all"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>

        <p className="mt-16 text-gray-400 text-sm">
          © {new Date().getFullYear()} Harsh Jain. Built with React & Tailwind CSS
        </p>
      </motion.div>
    </footer>
  );
}