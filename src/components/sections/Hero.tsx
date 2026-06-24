import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-app-bg">
      {/* Premium subtle background glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <div className="absolute top-[-100%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.05] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2 bg-app-card border border-app-border rounded-full px-3 py-1 text-xs font-medium text-app-text-secondary mb-10 hover:bg-app-elevated transition-colors cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Crafting modern web experiences</span>
          <ChevronRight size={12} className="ml-1 opacity-50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1] mb-6"
        >
          Sutantu Dutta
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-app-text-secondary font-light max-w-2xl leading-relaxed tracking-tight mb-12 text-balance"
        >
          Self-taught developer and design engineer. <br className="hidden md:block" />
          I build polished applications focusing on performance, interaction, and premium user experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black px-8 py-3.5 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <span>View Case Studies</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-app-card border border-app-border text-app-text px-8 py-3.5 rounded-full font-medium hover:bg-app-elevated transition-colors"
          >
            <span>Start a Conversation</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
