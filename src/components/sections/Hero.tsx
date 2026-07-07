import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Github, Codepen, Mail, Download } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TextReveal } from '../ui/TextReveal';
import FloatingCodeEditor from '../ui/FloatingCodeEditor';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-24 lg:pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Background System */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
         {/* Subtle Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
         
         {/* Ambient Lighting & Mesh Gradient */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-app-primary/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
         
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 z-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Left Column - Content (45%) */}
        <motion.div 
          style={{ y: textY, opacity }} 
          className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span>{greeting}, I'm Sutantu</span>
            </div>
          </motion.div>

          <h1 className="font-display font-bold tracking-tight text-white leading-[1.05] mb-6 text-[clamp(2.5rem,6vw,4.5rem)]">
            <TextReveal text="Crafting digital" delay={0.1} />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-app-primary">
               experiences.
            </span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.125rem)] text-white/60 font-light max-w-lg leading-relaxed tracking-wide mb-10 text-balance">
            Student developer & AI enthusiast. I build polished applications focusing on performance, interaction, and premium user experiences.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-7 py-3.5 rounded-full font-medium transition-all hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>View Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a
              href="#contact"
              className="group relative overflow-hidden flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-white px-6 py-3.5 rounded-full font-medium hover:bg-white/10 backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
               <Mail size={16} className="text-white/70 group-hover:text-white" />
              <span className="relative z-10">Contact</span>
            </a>

            <div className="flex items-center gap-3 sm:ml-2">
               <a
                 href="/resume.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-xl transition-all hover:scale-[1.05] active:scale-[0.95]"
                 aria-label="Resume"
               >
                 <Download size={18} />
               </a>
               <a
                 href="https://github.com/Sdm940"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-xl transition-all hover:scale-[1.05] active:scale-[0.95]"
                 aria-label="GitHub"
               >
                 <Github size={18} />
               </a>
               <a
                 href="https://codepen.io/SDM-TECH-KNOW"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-xl transition-all hover:scale-[1.05] active:scale-[0.95]"
                 aria-label="CodePen"
               >
                 <Codepen size={18} />
               </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-12 pt-8 border-t border-white/10 w-full md:w-fit"
          >
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Core Tech</span>
            <div className="flex items-center gap-4">
              {['React', 'TypeScript', 'Node.js', 'Python'].map((tech) => (
                <span key={tech} className="text-sm font-medium text-white/70">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Floating Editors (55%) */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full md:w-[55%] h-[400px] sm:h-[500px] md:h-[650px] relative mt-12 md:mt-0 perspective-1000"
        >
          {isMounted && <FloatingCodeEditor />}
        </motion.div>
      </div>
    </section>
  );
}
