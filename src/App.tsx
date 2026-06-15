import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Tools from './components/sections/Tools';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-app-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

