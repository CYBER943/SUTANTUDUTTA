import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import StatsDashboard from './components/sections/StatsDashboard';
import About from './components/sections/About';
import Knowledge from './components/sections/Knowledge';
import Journey from './components/sections/Journey';
import Projects from './components/sections/Projects';
import CaseStudies from './components/sections/CaseStudies';
import Blog from './components/sections/Blog';
import Tools from './components/sections/Tools';
import Philosophy from './components/sections/Philosophy';
import Contact from './components/sections/Contact';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[#3B82F6]/30 selection:text-white bg-[#020817]">
      <Toaster theme="dark" toastOptions={{ style: { background: '#111827', border: '1px solid #1F2937', color: '#F8FAFC' } }} />
      <Navbar />
      <main>
        <Hero />
        <StatsDashboard />
        <About />
        <Knowledge />
        <Journey />
        <Projects />
        <CaseStudies />
        <Blog />
        <Tools />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

