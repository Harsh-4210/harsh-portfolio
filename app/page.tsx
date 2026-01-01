import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Harsh Jain | AI Engineer",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {/* The Soft Gradient Background */}
        <div className="bright-mesh-bg"></div>
        
        <main>
          <Navbar />
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </body>
    </html>
  );
}