import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Harsh Jain | AI Engineer & ML Developer",
  description:
    "Portfolio of Harsh Jain - AI Engineer specializing in Machine Learning, Reinforcement Learning, and Production ML Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="bright-mesh-bg" />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}