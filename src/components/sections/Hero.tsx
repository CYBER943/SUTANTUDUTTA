import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronRight, Terminal, GitBranch, Cpu, Code2, Github, Codepen } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TextReveal } from '../ui/TextReveal';
import FloatingCodeEditor from '../ui/FloatingCodeEditor';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [greeting, setGreeting] = useState('Welcome');
  const [typedText, setTypedText] = useState('');
  const fullText = "Student Developer • AI Enthusiast • Cybersecurity Learner";
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const particlesY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const particlesY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(intervalId);
    }, 50);
    return () => clearInterval(intervalId);
  }, [isMounted]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-32 lg:pt-48 pb-20 overflow-hidden bg-[var(--color-app-bg)]">
      {/* Premium subtle background glow - simplified on mobile */}
      <motion.div style={{ top: glowY }} className="absolute inset-x-0 h-screen pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] sm:w-[1200px] sm:h-[800px] bg-gradient-to-r from-red-600/10 via-orange-500/5 to-red-900/10 sm:from-red-600/20 sm:via-orange-500/15 sm:to-red-900/20 rounded-full blur-[80px] sm:blur-[120px] animate-gradient bg-[length:200%_auto]" />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 z-20 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        <motion.div style={{ y: textY }} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-4 mb-10"
          >
            <div className="inline-flex items-center space-x-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2 text-sm font-medium text-[#D1D5DB] hover:border-app-primary/50 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Open to Collaborate</span>
            </div>
            <div className="hidden sm:inline-flex items-center space-x-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2 text-sm font-medium text-[#D1D5DB] backdrop-blur-md">
              <Code2 size={14} className="text-app-primary" />
              <span>Currently Building AI Tools</span>
            </div>
          </motion.div>

          <h1
            className="font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 leading-[1.1] mb-8 text-[clamp(2.5rem,8vw,4rem)]"
          >
            <TextReveal text="Sutantu Dutta" delay={0.1} />
          </h1>

          <div
            className="text-[clamp(1.125rem,3vw,1.25rem)] text-[#D1D5DB] font-light max-w-xl leading-relaxed tracking-tight mb-12 text-balance min-h-[60px]"
          >
            {typedText}
            <span className="animate-pulse mr-1">_</span>
            <br className="hidden md:block" />
            <TextReveal delay={2} text="I build polished applications focusing on performance, interaction, and premium user experiences." />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full mt-8"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center space-x-2 bg-gradient-to-r from-app-primary via-red-500 to-app-primary-hover text-white px-8 py-4 min-h-[44px] min-w-[44px] rounded-full font-medium transition-all shadow-none sm:shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:sm:shadow-[0_0_35px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 group border border-white/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-app-primary-hover to-app-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>View Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a
              href="#contact"
              className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-white px-8 py-4 min-h-[44px] min-w-[44px] rounded-full font-medium hover:bg-white/10 hover:border-white/20 backdrop-blur-xl transition-all shadow-none sm:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:sm:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 group"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10">Contact Me</span>
            </a>

            <a
              href="https://github.com/Sdm940"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center space-x-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white px-6 py-4 rounded-full font-medium hover:bg-[rgba(255,255,255,0.06)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Github size={18} className="text-white/80 group-hover:text-white" />
              <span className="relative z-10">GitHub</span>
            </a>

            <a
              href="https://codepen.io/SDM-TECH-KNOW"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center space-x-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white px-6 py-4 rounded-full font-medium hover:bg-[rgba(255,255,255,0.06)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Codepen size={18} className="text-white/80 group-hover:text-white" />
              <span className="relative z-10">CodePen</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Premium Interactive 2D Floating Editor Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex-1 w-full h-[450px] lg:h-[650px] relative mt-10 lg:mt-0"
        >
          {isMounted && (
            <div className="w-full h-full absolute inset-0 pointer-events-auto origin-center">
              <FloatingCodeEditor />
            </div>
          )}
          
          {/* Soft vignette to blend scene edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--color-app-bg)_100%)] pointer-events-none z-10" />
        </motion.div>
      </div>
      
      {/* Scroll indicator & bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-app-bg)] to-transparent pointer-events-none z-30" />
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 text-white/30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto mb-2" />
      </motion.div>
    </section>
  );
}
