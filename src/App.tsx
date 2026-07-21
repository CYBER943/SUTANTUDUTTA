import React, { Suspense, useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import CustomCursor from './components/ui/CustomCursor';
import { SectionReveal } from './components/ui/SectionReveal';
import CommandPalette from './components/ui/CommandPalette';

// Utility function to handle chunk load errors (e.g. after a new deployment)
function lazyWithRetry(componentImport: () => Promise<any>) {
  return React.lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );
    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        // Return a promise that never resolves while the page is reloading
        return new Promise(() => {});
      }
      throw error;
    }
  });
}

const About = lazyWithRetry(() => import('./components/sections/About'));
const Projects = lazyWithRetry(() => import('./components/sections/Projects'));
const Tools = lazyWithRetry(() => import('./components/sections/Tools'));
const Blog = lazyWithRetry(() => import('./components/sections/Blog'));
const Contact = lazyWithRetry(() => import('./components/sections/Contact'));

const FallbackLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-app-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Fade out the global preloader that is in index.html
      const preloader = document.getElementById('global-preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.filter = 'blur(10px)';
        preloader.style.transform = 'scale(1.05)';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }
    };

    if (document.readyState === 'complete') {
      // Small delay for smooth transition if it loads too fast
      setTimeout(handleLoad, 500);
    } else {
      window.addEventListener('load', handleLoad);
      const fallback = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

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
      <Analytics />
    </div>
  );
}

