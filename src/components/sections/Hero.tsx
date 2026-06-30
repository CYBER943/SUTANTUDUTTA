import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronRight, Terminal, GitBranch, Cpu, Code2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TextReveal } from '../ui/TextReveal';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [greeting, setGreeting] = useState('Welcome');
  const [typedText, setTypedText] = useState('');
  const fullText = "Self-taught developer and design engineer.";
  
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
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[var(--color-app-bg)]">
      {/* Premium subtle background glow */}
      <motion.div style={{ top: glowY }} className="absolute inset-x-0 h-screen pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-r from-[#4F46E5]/20 via-[#06B6D4]/20 to-[#8B5CF6]/20 rounded-full blur-[150px] animate-gradient bg-[length:200%_auto]" />
      </motion.div>

      {/* Floating Particles / Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ y: particlesY1 }}
          className="absolute top-[20%] left-[10%] p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[#06B6D4]"
        >
          <Code2 size={24} />
        </motion.div>
        
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
          style={{ y: particlesY2 }}
          className="absolute top-[60%] left-[15%] p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[#8B5CF6]"
        >
          <Terminal size={24} />
        </motion.div>
        
        <motion.div
          animate={{ y: [-15, 15, -15], x: [15, -15, 15], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2 }}
          style={{ y: particlesY1 }}
          className="absolute top-[25%] right-[12%] p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[#3B82F6]"
        >
          <GitBranch size={24} />
        </motion.div>
        
        <motion.div
          animate={{ y: [15, -15, 15], x: [-15, 15, -15], rotate: [0, -25, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 0.5 }}
          style={{ y: particlesY2 }}
          className="absolute top-[65%] right-[10%] p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[#EC4899]"
        >
          <Cpu size={24} />
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 z-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div style={{ y: textY }} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2 text-sm font-medium text-[#CBD5E1] mb-8 hover:border-[#3B82F6]/50 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]"></span>
            </span>
            <span>{isMounted ? greeting : 'Welcome'}</span>
          </motion.div>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 leading-[1.1] mb-6"
          >
            <TextReveal text="Sutantu Dutta" delay={0.1} />
          </h1>

          <div
            className="text-lg sm:text-xl text-[#94A3B8] font-light max-w-xl leading-relaxed tracking-tight mb-10 text-balance min-h-[60px]"
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
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>View Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center space-x-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[rgba(255,255,255,0.08)] backdrop-blur-md transition-colors group"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10">Start a Conversation</span>
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Spline Developer Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex-1 w-full h-[400px] lg:h-[600px] relative mt-10 lg:mt-0 perspective-1000"
        >
          {isMounted && (
            <div className="w-full h-full absolute inset-0 pointer-events-auto mix-blend-screen scale-110 lg:scale-125 origin-center">
              <iframe src='https://my.spline.design/deskscenecopy-6d2c4ebc0a6bda4501a4dbfa95293466/' frameBorder='0' width='100%' height='100%'></iframe>
            </div>
          )}
          
          {/* Soft vignette to blend 3D scene edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-app-bg)_100%)] pointer-events-none z-10" />
        </motion.div>
      </div>
    </section>
  );
}
