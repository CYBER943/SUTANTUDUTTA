import React from 'react';
import { Github, Codepen, ArrowUpRight, CheckCircle2, ChevronRight, Activity, Award, BookOpen, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';
import { SiGithub, SiCodepen } from 'react-icons/si';
import { TOOLS } from '../../data';

export default function Footer() {
  return (
    <footer className="relative bg-app-bg pt-32 pb-12 overflow-hidden border-t border-app-border">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      
      {/* Animated Top Border Line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
      />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24"
        >
          
          {/* Branding Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#home" className="inline-block text-2xl font-display font-bold tracking-tight text-white group mb-6 hover:text-white/80 transition-colors">
              Sutantu Dutta
            </a>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium text-app-text-secondary mb-8 hover:bg-white/10 transition-colors cursor-default">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span>Available for Work</span>
            </div>

            <p className="text-white text-sm font-medium mb-3">
              Student Developer <span className="mx-2 text-white/20">•</span> AI Enthusiast <span className="mx-2 text-white/20">•</span> Creative Builder
            </p>
            
            <p className="text-app-text-secondary font-light text-sm max-w-sm leading-relaxed border-l-2 border-white/10 pl-4 py-1">
              "Built with curiosity, creativity, and continuous learning." <br />
              <span className="text-white/40 mt-2 block">— Sutantu Dutta</span>
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-semibold mb-8 uppercase tracking-wider text-[11px] flex items-center space-x-2">
              <span>Quick Links</span>
            </h4>
            <nav className="flex flex-col space-y-4">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Tools', href: '#tools' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <a key={link.name} href={link.href} className="group flex items-center text-app-text-secondary hover:text-white transition-colors w-fit text-sm font-medium">
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all text-white/50" />
                </a>
              ))}
            </nav>
          </div>

          {/* Profiles Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-8 uppercase tracking-wider text-[11px] flex items-center space-x-2">
              <span>Profiles</span>
            </h4>
            <div className="flex flex-col space-y-4">
              <a 
                href="https://github.com/Sdm940" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors text-app-text-secondary hover:text-white w-fit"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-colors">
                  <SiGithub size={16} />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://codepen.io/SDM-TECH-KNOW" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors text-app-text-secondary hover:text-white w-fit"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-colors">
                  <SiCodepen size={16} />
                </div>
                <span className="text-sm font-medium">CodePen</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors text-app-text-secondary hover:text-[#0077b5] w-fit"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-[#0077b5]/10 group-hover:border-[#0077b5]/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a 
                href="mailto:sutantudutta@outlook.com" 
                className="group flex items-center space-x-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors text-app-text-secondary hover:text-white w-fit"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>
          </div>

          {/* Portfolio Statistics */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-8 uppercase tracking-wider text-[11px] flex items-center space-x-2">
              <span>Impact</span>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-app-card border border-app-border rounded-[1.25rem] p-5 hover:bg-app-elevated transition-colors cursor-default">
                <p className="text-2xl font-display font-semibold tracking-tight text-white mb-1">500+</p>
                <p className="text-[10px] text-app-text-secondary uppercase tracking-wider font-medium">Projects Built</p>
              </div>
              <div className="bg-app-card border border-app-border rounded-[1.25rem] p-5 hover:bg-app-elevated transition-colors cursor-default">
                <p className="text-2xl font-display font-semibold tracking-tight text-white mb-1">SOF</p>
                <p className="text-[10px] text-app-text-secondary uppercase tracking-wider font-medium">Participant</p>
              </div>
              <div className="bg-app-card border border-app-border rounded-[1.25rem] p-5 hover:bg-app-elevated transition-colors cursor-default">
                <p className="text-2xl font-display font-semibold tracking-tight text-white mb-1 flex items-center space-x-1">
                  <span>MyGov</span>
                </p>
                <p className="text-[10px] text-app-text-secondary uppercase tracking-wider font-medium">Certified</p>
              </div>
              <div className="bg-app-card border border-app-border rounded-[1.25rem] p-5 hover:bg-app-elevated transition-colors cursor-default">
                <p className="text-2xl font-display font-semibold tracking-tight text-white mb-1 flex items-center">
                  <BookOpen size={20} strokeWidth={1.5} className="text-white/70" />
                </p>
                <p className="text-[10px] text-app-text-secondary uppercase tracking-wider font-medium">Explorer</p>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Tools Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-16 pt-8 border-t border-app-border"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">Tech Stack</h4>
            <div className="flex flex-wrap gap-3 w-full">
              {TOOLS.map((tool) => (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary hover:text-white hover:bg-app-elevated hover:border-white/20 transition-all hover:-translate-y-1 group relative"
                  title={tool.name}
                >
                  <div className="group-hover:scale-110 transition-transform relative z-10" style={{ color: 'inherit' }}>
                    <tool.icon size={18} strokeWidth={1.5} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-8 border-t border-app-border flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          <p className="text-app-text-secondary text-xs font-medium order-3 md:order-1 text-center md:text-left">
            &copy; 2026 Sutantu Dutta. All Rights Reserved.
          </p>
          <p className="text-white/60 font-medium tracking-wide text-[10px] uppercase order-1 md:order-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            React • Tailwind • Motion
          </p>
          <p className="text-app-text-secondary text-xs font-medium order-2 md:order-3 text-center md:text-right">
            Crafted for the modern web.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
