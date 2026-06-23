import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Knowledge from './components/sections/Knowledge';
import Projects from './components/sections/Projects';
import Tools from './components/sections/Tools';
import Contact from './components/sections/Contact';
import GithubDashboard from './components/sections/GithubDashboard';
import CustomCursor from './components/ui/CustomCursor';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[#3B82F6]/30 selection:text-white bg-[#020817] w-full overflow-hidden">
      <CustomCursor />
      <Toaster theme="dark" toastOptions={{ style: { background: '#111827', border: '1px solid #1F2937', color: '#F8FAFC' } }} />
      <Navbar />
      <main style={{ paddingTop: 'calc(72px + env(safe-area-inset-top))' }}>
        <Hero />
        <About />
        <Projects />
        <Tools />
        <Knowledge />
        <GithubDashboard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

