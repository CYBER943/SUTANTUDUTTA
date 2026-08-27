import React from 'react';
import { Github, Codepen, Linkedin, Mail, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const TECH_STACK = [
  'Artificial Intelligence',
  'Python',
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'HTML',
  'CSS',
  'TypeScript',
  'Tailwind CSS',
  'Visual Studio Code'
];

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

const GlowingWaves = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none opacity-30 overflow-hidden flex items-end z-0">
      {/* Wave 1 */}
      <motion.svg 
        animate={prefersReducedMotion ? {} : { translateX: ["0%", "-33.333%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute w-[300%] min-w-[2000px] h-full bottom-0 left-0" 
        viewBox="0 0 3000 600" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <path d="M 0 400 Q 250 200 500 400 T 1000 400 T 1500 400 T 2000 400 T 2500 400 T 3000 400" stroke="#8b5cf6" strokeWidth="2" filter="url(#blur-sm-footer)" />
        <path d="M 0 400 Q 250 200 500 400 T 1000 400 T 1500 400 T 2000 400 T 2500 400 T 3000 400" stroke="#8b5cf6" strokeWidth="1" />
      </motion.svg>
      
      {/* Wave 2 */}
      <motion.svg 
        animate={prefersReducedMotion ? {} : { translateX: ["-40%", "0%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="absolute w-[300%] min-w-[2000px] h-full bottom-0 left-0 opacity-50" 
        viewBox="0 0 3000 600" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <path d="M -1200 450 Q -900 550 -600 450 T 0 450 T 600 450 T 1200 450 T 1800 450 T 2400 450 T 3000 450" stroke="#c084fc" strokeWidth="4" filter="url(#blur-md-footer)" />
        <path d="M -1200 450 Q -900 550 -600 450 T 0 450 T 600 450 T 1200 450 T 1800 450 T 2400 450 T 3000 450" stroke="var(--color-app-border)" strokeWidth="1" opacity="0.4" />
      </motion.svg>

      {/* Wave 3 */}
      <motion.svg 
        animate={prefersReducedMotion ? {} : { translateX: ["0%", "-25%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute w-[300%] min-w-[2000px] h-full bottom-0 left-0 opacity-60" 
        viewBox="0 0 3200 600" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <path d="M 0 300 Q 200 500 400 300 T 800 300 T 1200 300 T 1600 300 T 2000 300 T 2400 300 T 2800 300 T 3200 300" stroke="#d946ef" strokeWidth="2" filter="url(#blur-sm-footer)" />
      </motion.svg>

      <svg className="hidden">
        <defs>
          <filter id="blur-sm-footer" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="blur-md-footer" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="relative bg-app-bg pt-24 pb-12 overflow-hidden font-sans border-t border-purple-500/10">
      
      {/* Top Animated Border */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-left"
      />

      {/* Radial Depth Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.12)_0%,rgba(5,5,10,1)_70%)] pointer-events-none" />
      
      <GlowingWaves />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-0 pb-16"
        >
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 lg:pr-12 lg:border-r border-app-border flex flex-col">
            <a href="#home" className="inline-block group mb-2">
              <h2 className="text-3xl font-display font-bold text-app-text tracking-tight group-hover:text-app-text transition-colors">
                Sutantu Dutta<span className="text-purple-500">.</span>
              </h2>
            </a>
            <h3 className="text-[13px] text-purple-400 font-mono tracking-widest uppercase mb-2 font-semibold">
              AI Developer
            </h3>
            <p className="text-[12px] text-app-text-secondary font-mono tracking-wider mb-6 opacity-80 uppercase">
              Learning. Building. Experimenting.
            </p>
            <p className="text-app-text-secondary text-[15px] leading-relaxed mb-8 max-w-sm">
              Building scalable, high-performance AI-powered applications and modern digital experiences.
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/Sdm940" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary hover:text-app-text hover:bg-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all group backdrop-blur-sm shadow-lg" aria-label="GitHub">
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://codepen.io/SDM-TECH-KNOW" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary hover:text-app-text hover:bg-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all group backdrop-blur-sm shadow-lg" aria-label="CodePen">
                <Codepen size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/sutantu-dutta-176a2442a/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 hover:-translate-y-1 transition-all group backdrop-blur-sm shadow-lg" aria-label="LinkedIn">
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 lg:px-12 lg:border-r border-app-border flex flex-col">
            <h4 className="font-mono text-[13px] font-semibold text-app-text tracking-[0.2em] uppercase mb-8">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className="group flex items-center text-app-text-secondary hover:text-purple-400 transition-colors w-fit text-[15px]">
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Tech Stack */}
          <div className="lg:col-span-3 lg:px-12 lg:border-r border-app-border flex flex-col">
            <h4 className="font-mono text-[13px] font-semibold text-app-text tracking-[0.2em] uppercase mb-8">
              Tech Stack
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {TECH_STACK.map((tech) => (
                <li key={tech} className="flex items-center space-x-3 text-app-text-secondary hover:text-app-text transition-colors cursor-default text-[15px] group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0)] group-hover:bg-purple-500/80 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="lg:col-span-3 lg:pl-12 flex flex-col">
            <h4 className="font-mono text-[13px] font-semibold text-app-text tracking-[0.2em] uppercase mb-8">
              Get In Touch
            </h4>
            <div className="flex flex-col space-y-6">
              <a href="mailto:sutantudutta@outlook.com" className="group flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all shadow-lg shrink-0">
                  <Mail size={18} />
                </div>
                <span className="text-[15px] text-app-text-secondary group-hover:text-app-text transition-colors break-all">
                  sutantudutta@outlook.com
                </span>
              </a>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary shadow-lg shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-[15px] text-app-text-secondary">India</span>
              </div>

              <div className="flex items-center space-x-4 group mt-2 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-app-success/10 border border-app-success/20 flex items-center justify-center text-app-success shadow-[0_0_15px_rgba(34,197,94,0.15)] shrink-0">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-app-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-app-success"></span>
                  </div>
                </div>
                <span className="text-[12px] font-mono tracking-widest text-app-success uppercase font-semibold leading-snug">
                  Open to<br/>Collaborations
                </span>
              </div>
            </div>
          </div>
          
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-8 border-t border-app-border flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-app-muted text-[13px] font-medium order-2 md:order-1">
            &copy; 2026 Sutantu Dutta. All Rights Reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center space-x-3 text-app-muted hover:text-app-text text-[13px] font-mono tracking-widest uppercase font-semibold transition-colors order-1 md:order-2"
          >
            <span>Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-app-card border border-app-border flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all">
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* Personal Signature */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pb-4 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default"
        >
          <span className="font-display font-bold tracking-[0.2em] uppercase text-app-text text-[11px] md:text-sm">
            SUTANTU DUTTA — AI DEVELOPER
          </span>
          <span className="font-mono text-[10px] md:text-xs mt-2 tracking-widest text-app-text-secondary uppercase">
            LEARNING. BUILDING. EXPERIMENTING.
          </span>
        </motion.div>

      </div>
    </footer>
  );
}

