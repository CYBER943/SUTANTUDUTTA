import React from 'react';
import { Github, Codepen, Linkedin, Mail, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

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
  return (
    <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none opacity-40 mix-blend-screen overflow-hidden flex items-end">
      {/* Wave 1 */}
      <motion.svg 
        animate={{ translateX: ["0%", "-33.333%"] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
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
        animate={{ translateX: ["-40%", "0%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute w-[300%] min-w-[2000px] h-full bottom-0 left-0 opacity-60" 
        viewBox="0 0 3000 600" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <path d="M -1200 450 Q -900 550 -600 450 T 0 450 T 600 450 T 1200 450 T 1800 450 T 2400 450 T 3000 450" stroke="#c084fc" strokeWidth="4" filter="url(#blur-md-footer)" />
        <path d="M -1200 450 Q -900 550 -600 450 T 0 450 T 600 450 T 1200 450 T 1800 450 T 2400 450 T 3000 450" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      </motion.svg>

      {/* Wave 3 */}
      <motion.svg 
        animate={{ translateX: ["0%", "-25%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute w-[300%] min-w-[2000px] h-full bottom-0 left-0 opacity-80" 
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
    <footer className="relative bg-[#05050A] pt-24 pb-12 overflow-hidden font-sans border-t border-purple-500/10">
      
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
          className="flex flex-col lg:flex-row pb-16"
        >
          
          {/* Column 1: Brand */}
          <div className="w-full lg:w-[32%] lg:pr-12 lg:border-r border-white/[0.08] mb-12 lg:mb-0 flex flex-col">
            <a href="#home" className="inline-block group mb-2">
              <h2 className="text-3xl font-display font-bold text-white tracking-tight group-hover:text-white/90 transition-colors">
                Sutantu Dutta<span className="text-purple-500">.</span>
              </h2>
            </a>
            <h3 className="text-[13px] text-purple-400 font-mono tracking-widest uppercase mb-6 font-semibold">
              AI Developer
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-sm">
              Building scalable, high-performance AI-powered applications and modern digital experiences.
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/Sdm940" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all group backdrop-blur-sm shadow-lg">
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://codepen.io/SDM-TECH-KNOW" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all group backdrop-blur-sm shadow-lg">
                <Codepen size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 hover:-translate-y-1 transition-all group backdrop-blur-sm shadow-lg">
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="w-full lg:w-[18%] lg:px-12 lg:border-r border-white/[0.08] mb-12 lg:mb-0 flex flex-col">
            <h4 className="font-mono text-[13px] font-semibold text-white tracking-[0.2em] uppercase mb-8">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className="group flex items-center text-white/50 hover:text-purple-400 transition-colors w-fit text-[15px]">
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Tech Stack */}
          <div className="w-full lg:w-[25%] lg:px-12 lg:border-r border-white/[0.08] mb-12 lg:mb-0 flex flex-col">
            <h4 className="font-mono text-[13px] font-semibold text-white tracking-[0.2em] uppercase mb-8">
              Tech Stack
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {TECH_STACK.map((tech) => (
                <li key={tech} className="flex items-center space-x-3 text-white/50 hover:text-white transition-colors cursor-default text-[15px] group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0)] group-hover:bg-purple-500/80 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="w-full lg:w-[25%] lg:pl-12 flex flex-col">
            <h4 className="font-mono text-[13px] font-semibold text-white tracking-[0.2em] uppercase mb-8">
              Get In Touch
            </h4>
            <div className="flex flex-col space-y-6">
              <a href="mailto:sutantudutta@outlook.com" className="group flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all shadow-lg shrink-0">
                  <Mail size={18} />
                </div>
                <span className="text-[15px] text-white/60 group-hover:text-white transition-colors break-all">
                  sutantudutta@outlook.com
                </span>
              </a>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 shadow-lg shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-[15px] text-white/60">India</span>
              </div>

              <div className="flex items-center space-x-4 group mt-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 relative overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0">
                  <div className="absolute inset-0 bg-purple-500/20 animate-pulse" />
                  <Calendar size={18} className="relative z-10" />
                </div>
                <span className="text-[12px] font-mono tracking-widest text-purple-400 uppercase font-semibold leading-snug">
                  Available for<br/>Collaborations
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
          className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/40 text-[13px] font-medium order-2 md:order-1">
            &copy; {new Date().getFullYear()} Sutantu Dutta. All Rights Reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center space-x-3 text-white/40 hover:text-white text-[13px] font-mono tracking-widest uppercase font-semibold transition-colors order-1 md:order-2"
          >
            <span>Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all">
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </motion.div>

      </div>
    </footer>
  );
}

