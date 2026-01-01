"use client";

export default function Contact() {
  return (
    <footer id="contact" className="py-24 max-w-4xl mx-auto px-6 text-center border-t border-gray-100 mt-12">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
        Let's work together.
      </h2>
      <p className="text-gray-500 mb-12 max-w-xl mx-auto text-lg">
        Open to internships and ML engineering roles.
      </p>

      <div className="flex justify-center gap-8">
        <a href="mailto:harshjain0621@gmail.com" className="text-gray-500 hover:text-black transition-colors text-lg font-medium">
          Email
        </a>
        <a href="https://github.com/Harsh-4210" target="_blank" className="text-gray-500 hover:text-black transition-colors text-lg font-medium">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/harsh-jain-853b31341/" target="_blank" className="text-gray-500 hover:text-black transition-colors text-lg font-medium">
          LinkedIn
        </a>
      </div>

      <p className="mt-24 text-gray-400 text-sm">
        © {new Date().getFullYear()} Harsh Jain.
      </p>
    </footer>
  );
}