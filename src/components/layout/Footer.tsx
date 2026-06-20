import React from 'react';
import { Github, Codepen, ArrowUpRight, CheckCircle2, ChevronRight, Activity, Award, BookOpen, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';
import { SiGithub, SiCodepen } from 'react-icons/si';
import { TOOLS } from '../../data';

export default function Footer() {
  return (
    <footer className="relative bg-[#020817] pt-32 pb-12 overflow-hidden border-t border-[#3B82F6]/15">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(59,130,246,0.12)' }} />
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(139,92,246,0.08)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent opacity-50" />
      
      {/* Animated Top Border Line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent origin-left"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24"
        >
          
          {/* Branding Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#home" className="inline-block text-2xl font-display font-bold tracking-tight text-white group mb-6 hover:opacity-80 transition-opacity">
              Sutantu Dutta
            </a>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium text-app-muted mb-8 hover:bg-white/10 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Currently Building</span>
            </div>

            <p className="text-white text-sm font-medium mb-3">
              Student Developer <span className="mx-2 text-white/20">•</span> AI Enthusiast <span className="mx-2 text-white/20">•</span> Creative Builder
            </p>
            
            <p className="text-app-muted font-light text-sm max-w-sm leading-relaxed border-l-2 border-white/10 pl-4 py-1">
              "Built with curiosity, creativity, and continuous learning." <br />
              <span className="text-white/40 mt-2 block">— Sutantu Dutta</span>
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-semibold mb-8 uppercase tracking-wider text-xs flex items-center space-x-2">
              <ChevronRight size={14} className="text-app-primary" />
              <span>Quick Links</span>
            </h4>
            <nav className="flex flex-col space-y-4">
              {['Home', 'About', 'Projects', 'Tools', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="group flex items-center text-app-muted hover:text-white transition-colors w-fit text-sm">
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-app-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all text-app-primary" />
                </a>
              ))}
            </nav>
          </div>

          {/* Profiles Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-8 uppercase tracking-wider text-xs flex items-center space-x-2">
              <Fingerprint size={14} className="text-app-primary" />
              <span>Profiles</span>
            </h4>
            <div className="flex flex-col space-y-4">
              <a 
                href="https://github.com/Sdm940" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors text-app-muted hover:text-white w-fit"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-[#2dba4e]/10 group-hover:border-[#2dba4e]/30 group-hover:text-[#2dba4e] transition-colors">
                  <SiGithub size={16} />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://codepen.io/SDM-TECH-KNOW" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors text-app-muted hover:text-white w-fit"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 group-hover:text-white transition-colors">
                  <SiCodepen size={16} />
                </div>
                <span className="text-sm font-medium">CodePen</span>
              </a>
            </div>
          </div>

          {/* Portfolio Statistics */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-8 uppercase tracking-wider text-xs flex items-center space-x-2">
              <Activity size={14} className="text-app-primary" />
              <span>Impact</span>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-2xl font-display font-bold text-white mb-1">500+</p>
                <p className="text-[10px] text-app-muted uppercase tracking-wider font-semibold">Projects Built</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-2xl font-display font-bold text-white mb-1">SOF</p>
                <p className="text-[10px] text-app-muted uppercase tracking-wider font-semibold">Participant</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-2xl font-display font-bold text-white mb-1 flex items-center space-x-1">
                  <Award size={20} className="text-app-primary" />
                  <span>MyGov</span>
                </p>
                <p className="text-[10px] text-app-muted uppercase tracking-wider font-semibold">Certified</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-2xl font-display font-bold text-white mb-1 flex items-center">
                  <BookOpen size={20} className="text-app-primary" />
                </p>
                <p className="text-[10px] text-app-muted uppercase tracking-wider font-semibold">AI & Web<br />Explorer</p>
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
          className="mb-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs whitespace-nowrap">Tech Stack</h4>
            <div className="flex flex-wrap gap-3 w-full">
              {TOOLS.flatMap(category => category.items).map((tool) => (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-app-muted hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 group relative"
                  style={{ '--hover-color': tool.color || '#fff' } as React.CSSProperties}
                  title={tool.name}
                >
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" 
                    style={{ backgroundColor: 'var(--hover-color)' }}
                  />
                  <div className="group-hover:scale-110 transition-transform relative z-10" style={{ color: 'inherit' }}>
                    <tool.icon size={18} />
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
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          <p className="text-white/40 text-xs md:text-sm order-3 md:order-1 text-center md:text-left">
            &copy; 2026 Sutantu Dutta. All Rights Reserved.
          </p>
          <p className="text-white/40 text-[10px] md:text-xs order-1 md:order-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            Made with HTML, CSS & JavaScript
          </p>
          <p className="text-white/40 text-xs md:text-sm order-2 md:order-3 text-center md:text-right">
            Designed and developed for the modern web.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
