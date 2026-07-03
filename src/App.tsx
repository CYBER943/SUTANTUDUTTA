import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import About from './components/sections/About';

import Projects from './components/sections/Projects';

import Tools from './components/sections/Tools';
import Blog from './components/sections/Blog';

import Contact from './components/sections/Contact';

import CustomCursor from './components/ui/CustomCursor';
import { SectionReveal } from './components/ui/SectionReveal';
import { Toaster } from 'sonner';
import { motion, useScroll } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen selection:bg-app-primary/30 selection:text-white bg-app-bg w-full overflow-hidden">
      <CustomCursor />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-app-primary origin-left z-[9999]"
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
        </div>

        {/* Blog */}
        <SectionReveal direction="up">
          <Blog />
        </SectionReveal>

        {/* 5. Contact */}
        <SectionReveal direction="up">
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}

