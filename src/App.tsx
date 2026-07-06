import React, { Suspense, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';

const About = React.lazy(() => import('./components/sections/About'));
const Projects = React.lazy(() => import('./components/sections/Projects'));
const Tools = React.lazy(() => import('./components/sections/Tools'));
const Blog = React.lazy(() => import('./components/sections/Blog'));
const Contact = React.lazy(() => import('./components/sections/Contact'));

import CustomCursor from './components/ui/CustomCursor';
import { SectionReveal } from './components/ui/SectionReveal';
import CommandPalette from './components/ui/CommandPalette';
import { Toaster } from 'sonner';
import { motion, useScroll } from 'motion/react';

const FallbackLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-app-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-app-primary/30 selection:text-white bg-app-bg w-full overflow-hidden">
      <CustomCursor />
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-app-primary origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      <Toaster theme="dark" toastOptions={{ style: { background: '#111827', border: '1px solid #1F2937', color: '#F8FAFC' } }} />
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <main style={{ paddingTop: 'calc(72px + env(safe-area-inset-top))' }}>
        {/* 1. Home */}
        <Hero />
        
        <Suspense fallback={<FallbackLoader />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

