import AnimatedSection from "./AnimatedSection";

export default function About() {
  return (
    <AnimatedSection>
      <section id="about" className="max-w-4xl mx-auto px-6 py-24">
        <p className="section-subtitle">About</p>
        <h2 className="section-title">Who I Am</h2>

        <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-lg">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            I'm a results-driven third-year Artificial Intelligence and Data Science student at 
            Savitribai Phule Pune University with a strong passion for building intelligent systems 
            that solve real-world problems. With hands-on experience in Python, C++, and web 
            development, I specialize in architecting scalable Machine Learning applications and 
            deploying production-ready AI solutions.
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            My journey in AI/ML has led me to work on cutting-edge projects including multi-agent 
            reinforcement learning systems, RAG-powered conversational interfaces, and optimized ML 
            pipelines for emission prediction. I thrive on tackling complex technical challenges—from 
            implementing PPO algorithms from scratch to optimizing model performance by 20-35% through 
            feature engineering and hyperparameter tuning.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Currently maintaining an 8.75 GPA while actively contributing to collaborative projects 
            using Agile methodology. I'm passionate about leveraging cutting-edge AI and Data Science 
            technologies in scalable software engineering environments, and I'm actively seeking 
            opportunities to work with innovative teams building the next generation of intelligent 
            systems.
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}
