import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import StatsDashboard from './components/sections/StatsDashboard';
import Journey from './components/sections/Journey';
import Philosophy from './components/sections/Philosophy';

import CaseStudies from './components/sections/CaseStudies';
import Projects from './components/sections/Projects';

import Tools from './components/sections/Tools';
import Knowledge from './components/sections/Knowledge';
import GithubDashboard from './components/sections/GithubDashboard';

import Contact from './components/sections/Contact';

import CustomCursor from './components/ui/CustomCursor';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[#3B82F6]/30 selection:text-white bg-app-bg w-full overflow-hidden">
      <CustomCursor />
      <Toaster theme="dark" toastOptions={{ style: { background: '#111827', border: '1px solid #1F2937', color: '#F8FAFC' } }} />
      <Navbar />
      <main style={{ paddingTop: 'calc(72px + env(safe-area-inset-top))' }}>
        {/* 1. Home */}
        <Hero />
        
        {/* 2. About Me */}
        <div id="about" className="flex flex-col">
          <About />
          <StatsDashboard />
          <Journey />
          <Philosophy />
        </div>

        {/* 3. Projects */}
        <div id="projects" className="flex flex-col">
          <CaseStudies />
          <Projects />
        </div>

        {/* 4. Tools I Use */}
        <div id="tools" className="flex flex-col">
          <Tools />
          <Knowledge />
          <GithubDashboard />
        </div>

        {/* 5. Contact */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

