import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import StatsDashboard from './components/sections/StatsDashboard';
import Journey from './components/sections/Journey';
import Philosophy from './components/sections/Philosophy';

import Projects from './components/sections/Projects';

import Tools from './components/sections/Tools';
import Knowledge from './components/sections/Knowledge';
import GithubDashboard from './components/sections/GithubDashboard';

import Contact from './components/sections/Contact';

import CustomCursor from './components/ui/CustomCursor';
import { SectionReveal } from './components/ui/SectionReveal';
import { Toaster } from 'sonner';
import { motion, useScroll } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen selection:bg-[#3B82F6]/30 selection:text-white bg-app-bg w-full overflow-hidden">
      <CustomCursor />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#3B82F6] origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      <Toaster theme="dark" toastOptions={{ style: { background: '#111827', border: '1px solid #1F2937', color: '#F8FAFC' } }} />
      <Navbar />
      <main style={{ paddingTop: 'calc(72px + env(safe-area-inset-top))' }}>
        {/* 1. Home */}
        <Hero />
        
        {/* 2. About Me */}
        <div id="about" className="flex flex-col">
          <SectionReveal direction="up">
            <About />
          </SectionReveal>
          <SectionReveal direction="left">
            <StatsDashboard />
          </SectionReveal>
          <SectionReveal direction="right">
            <Journey />
          </SectionReveal>
          <SectionReveal direction="up">
            <Philosophy />
          </SectionReveal>
        </div>

        {/* 3. Projects */}
        <div id="projects" className="flex flex-col">
          <SectionReveal direction="up">
            <Projects />
          </SectionReveal>
        </div>

        {/* 4. Tools I Use */}
        <div id="tools" className="flex flex-col">
          <SectionReveal direction="left">
            <Tools />
          </SectionReveal>
          <SectionReveal direction="right">
            <Knowledge />
          </SectionReveal>
          <SectionReveal direction="up">
            <GithubDashboard />
          </SectionReveal>
        </div>

        {/* 5. Contact */}
        <SectionReveal direction="up">
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}

