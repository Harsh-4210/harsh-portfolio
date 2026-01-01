import AnimatedSection from "./AnimatedSection";

export default function About() {
  return (
    <AnimatedSection>
      <section className="max-w-4xl mx-auto px-6 py-32 text-gray-400">
        <p className="section-subtitle">About</p>
        <h2 className="section-title">Who I Am</h2>
        <p className="max-w-3xl mx-auto text-center">
          AI & Data Science engineering student focused on building production-ready
          machine learning systems, reinforcement learning models, and scalable APIs.
        </p>
      </section>
    </AnimatedSection>
  );
}
