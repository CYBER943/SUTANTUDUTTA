import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Github, Codepen, Mail, Download } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { CodeEditorShowcase } from '../ui/CodeEditorShowcase';
import { BackgroundCode } from '../ui/BackgroundCode';
import { CoreTech } from '../ui/CoreTech';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const prefersReducedMotion = useReducedMotion();

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-24 lg:pt-32 pb-20 overflow-hidden bg-app-bg">
      {/* Background System */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
         <BackgroundCode />
         {/* Subtle Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
         
         {/* Noise Texture */}
         <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

         {/* Ambient Lighting & Mesh Gradient */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-app-primary/10 rounded-full blur-[140px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px] mix-blend-screen" />
         <div className={`absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-app-purple/10 rounded-full blur-[120px] mix-blend-screen ${prefersReducedMotion ? '' : 'animate-pulse'}`} />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-20 flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* Left Column - Content (50%) */}
        <motion.div 
          style={{ y: textY, opacity }} 
          className="w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-app-card border border-app-border rounded-full px-4 py-2 text-sm font-medium text-app-text-secondary backdrop-blur-xl shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-app-success opacity-75 ${prefersReducedMotion ? '' : 'animate-ping'}`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-app-success"></span>
              </span>
              <span>{greeting}, I'm Sutantu</span>
            </div>
          </motion.div>

          <h1 className="font-display font-bold tracking-tighter text-app-text leading-[1.1] md:leading-[1] mb-6 text-[clamp(3rem,7vw,5.5rem)]">
            <TextReveal text="Crafting digital" delay={0.1} />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-primary via-orange-400 to-app-primary bg-[length:200%_auto] animate-gradient">
               experiences.
            </span>
          </h1>

          <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-app-text-secondary font-light max-w-[600px] leading-relaxed tracking-wide mb-12 text-balance">
            Student developer & AI enthusiast. I build polished applications focusing on performance, interaction, and premium user experiences.
          </p>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5 w-full"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden flex items-center justify-center space-x-2 bg-app-primary text-white px-8 py-4 text-base rounded-full font-medium transition-all hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto shadow-[0_0_20px_rgba(255,90,54,0.3)] hover:shadow-[0_0_30px_rgba(255,90,54,0.5)]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>View Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a
              href="#contact"
              className="group relative overflow-hidden flex items-center justify-center space-x-2 bg-app-card border border-app-border text-app-text px-8 py-4 text-base rounded-full font-medium hover:bg-app-elevated backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-lg hover:border-white/20"
            >
               <Mail size={18} className="text-app-text-secondary group-hover:text-app-text transition-colors" />
              <span className="relative z-10">Contact</span>
            </a>

            <div className="flex items-center gap-4 sm:ml-4">
               <a
                 href="/resume.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-4 rounded-full bg-app-card border border-app-border text-app-text-secondary hover:text-app-text hover:bg-app-elevated hover:border-white/20 backdrop-blur-xl transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg"
                 aria-label="Resume"
               >
                 <Download size={20} />
               </a>
               <a
                 href="https://github.com/Sdm940"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-4 rounded-full bg-app-card border border-app-border text-app-text-secondary hover:text-app-text hover:bg-app-elevated hover:border-white/20 backdrop-blur-xl transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg"
                 aria-label="GitHub"
               >
                 <Github size={20} />
               </a>
               <a
                 href="https://codepen.io/SDM-TECH-KNOW"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-4 rounded-full bg-app-card border border-app-border text-app-text-secondary hover:text-app-text hover:bg-app-elevated hover:border-white/20 backdrop-blur-xl transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg"
                 aria-label="CodePen"
               >
                 <Codepen size={20} />
               </a>
            </div>
          </motion.div>

          <CoreTech />
        </motion.div>

        {/* Right Column - Developer Tools Showcase (50%) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full md:w-[50%] relative mt-12 md:mt-0 flex items-center justify-center"
        >
          {isMounted && <CodeEditorShowcase />}
        </motion.div>
      </div>
    </section>
  );
}
