import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients and shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-app-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-app-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium text-app-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Available for new projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] bg-[length:200%_auto] animate-gradient">
              Sutantu Dutta.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-lg md:text-xl text-app-muted font-light max-w-lg leading-relaxed"
          >
            I build fast, interactive and user-focused digital experiences.
            <br className="my-2" />
            Passionate about learning, building, and turning ideas into real-world solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="flex items-center space-x-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-full font-medium transition-colors border border-transparent"
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="flex items-center space-x-2 bg-transparent border border-[#3B82F6] text-white px-6 py-3 rounded-full font-medium hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow"
            >
              <span>Contact Me</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Illustration / Code Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/20 to-transparent rounded-2xl blur-xl" />
          <div className="relative bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-[#0B1120] border-b border-[#1F2937]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-app-muted font-mono flex items-center justify-center space-x-2">
                <Terminal size={12} />
                <span>portfolio.ts</span>
              </div>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto text-app-muted leading-relaxed">
              <span className="text-pink-400">const</span> developer <span className="text-app-primary">=</span> {'{'} <br />
              &nbsp;&nbsp;name: <span className="text-green-300">'Sutantu Dutta'</span>,<br />
              &nbsp;&nbsp;role: <span className="text-green-300">'Student Developer & AI Enthusiast'</span>,<br />
              &nbsp;&nbsp;stats: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;projectsBuilt: <span className="text-orange-400">500</span><span className="text-app-muted">+</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;certifications: [<span className="text-green-300">'SOF'</span>, <span className="text-green-300">'MyGov'</span>],<br />
              &nbsp;&nbsp;&nbsp;&nbsp;activeOn: [<span className="text-green-300">'CodePen'</span>, <span className="text-green-300">'GitHub'</span>]<br />
              &nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;mission: <span className="text-green-300">'Build tools that matter.'</span><br />
              {'}'};<br />
              <br />
              <span className="text-pink-400">export default</span> developer;
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-app-muted"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-app-muted to-transparent" />
      </motion.div>
    </section>
  );
}
