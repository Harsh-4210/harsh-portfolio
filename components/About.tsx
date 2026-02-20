import AnimatedSection from "./AnimatedSection";

export default function About() {
  return (
    <AnimatedSection>
      <section id="about" className="max-w-4xl mx-auto px-6 py-24">
        <p className="section-subtitle">About</p>
        <h2 className="section-title">Who I Am</h2>

        <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-lg">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            I’m an Applied Machine Learning and AI student at Savitribai Phule Pune University with
            hands-on experience building end-to-end ML systems and production-ready backend services.
            I focus on developing ML pipelines, optimizing models, and deploying scalable APIs using
            FastAPI and Docker.
          </p>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Through project-based work, I’ve built systems spanning emissions prediction, climate
            data analytics, intelligent data exploration, and distributed ML workflows. My strengths
            lie in clean system design, feature engineering, model evaluation, and performance
            optimization for real-world use cases.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            Currently maintaining a GPA of 8.75/10, I actively collaborate on engineering projects
            and enjoy working in structured, team-oriented development environments. I’m seeking
            internship opportunities in Machine Learning, AI, and backend-focused data engineering
            roles where I can contribute to practical, scalable systems.
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}