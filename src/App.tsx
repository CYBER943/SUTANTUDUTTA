import React, { Suspense, useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { ArrowRight } from 'lucide-react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import CustomCursor from './components/ui/CustomCursor';
import { SectionReveal } from './components/ui/SectionReveal';
import CommandPalette from './components/ui/CommandPalette';
import AdminRoot from './components/admin/AdminRoot';

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
    <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [siteData, setSiteData] = useState<{ settings?: any; announcement?: any }>({});

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    fetch('/api/public/data')
      .then(res => res.json())
      .then(data => {
        if (data) setSiteData(data);
      })
      .catch(() => {});
  }, [currentPath]);

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

  // Route: Admin Control Center (/admin, /admin/login, /admin/setup, /admin/dashboard, etc.)
  if (currentPath.startsWith('/admin')) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-primary/30 selection:text-white">
        <Toaster theme="dark" toastOptions={{ style: { background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' } }} />
        <AdminRoot
          onNavigateToPublic={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />
      </div>
    );
  }

  // Route: Public Portfolio Website
  const announcement = siteData?.announcement;
  const settings = siteData?.settings;

  return (
    <div className="min-h-screen selection:bg-accent-primary/30 selection:text-white bg-bg-primary w-full overflow-x-hidden flex flex-col">
      <CustomCursor />
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent-primary origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      <Toaster theme="dark" toastOptions={{ style: { background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' } }} />
      
      {/* Dynamic Announcement Banner if enabled */}
      {announcement?.enabled && (
        <div className="relative z-[9998] w-full bg-gradient-to-r from-accent-primary/20 via-purple-600/20 to-accent-primary/20 border-b border-border py-2 px-4 flex flex-wrap items-center justify-center gap-3 text-xs backdrop-blur-md">
          <span className="px-2 py-0.5 rounded-md bg-accent-primary text-white font-mono text-[10px] font-bold tracking-wider">
            {announcement.badge || 'NEW'}
          </span>
          <span className="text-text-primary font-medium text-center">
            {announcement.message}
          </span>
          {announcement.linkText && (
            <a
              href={announcement.linkUrl || '#projects'}
              className="text-accent-bright hover:underline font-semibold flex items-center gap-1"
            >
              <span>{announcement.linkText}</span>
              <ArrowRight size={12} />
            </a>
          )}
        </div>
      )}

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
      <Footer
        statusText={settings?.statusText}
        statusAvailable={settings?.statusAvailable}
      />
      <Analytics />
    </div>
  );
}
