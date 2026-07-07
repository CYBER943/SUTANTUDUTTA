import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Terminal, FileCode2, GitCommit, Settings } from 'lucide-react';

const MAIN_SNIPPETS = [
  {
    title: "App.tsx",
    icon: FileCode2,
    lang: "tsx",
    code: `import { motion, AnimatePresence } from 'motion/react';
import { Hero, Projects } from '@/components';
import { initApp } from '@/core';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initApp().then(() => setReady(true));
  }, []);

  return (
    <main className="bg-[#050505] text-white">
      <AnimatePresence>
        {ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
            <Projects />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}`
  }
];

const TERMINAL_SNIPPETS = [
  {
    title: "bash",
    icon: Terminal,
    lang: "bash",
    code: `$ npm run dev

> portfolio@2.0.0 dev
> vite

  VITE v6.0.0  ready in 150 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help`
  }
];

const GIT_SNIPPETS = [
  {
    title: "git",
    icon: GitCommit,
    lang: "bash",
    code: `$ git status
On branch main
Your branch is up to date.

$ git add .
$ git commit -m "feat: redesign hero section"
[main 7f3b1c2] feat: redesign hero section
 2 files changed, 140 insertions(+)

$ git push origin main
Deploying to production...
Success!`
  }
];

const useTypingEffect = (snippets: any[], speed: number = 25, delay: number = 0) => {
  const [displayed, setDisplayed] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActiveLine, setIsActiveLine] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    let isDeleting = false;
    let isActive = true;

    const type = () => {
      if (!isActive) return;
      const currentText = snippets[currentIndex].code;

      if (!isDeleting) {
        if (charIndex <= currentText.length) {
          setDisplayed(currentText.slice(0, charIndex));
          const lines = currentText.slice(0, charIndex).split('\n');
          setIsActiveLine(lines.length - 1);
          charIndex++;
          let delayTime = speed + Math.random() * 15;
          if (charIndex > 0 && charIndex <= currentText.length) {
             const lastChar = currentText[charIndex - 1];
             if (lastChar === '\n') delayTime = speed * 10;
             else if (lastChar === '{' || lastChar === '}') delayTime = speed * 4;
          }
          timeout = setTimeout(type, delayTime);
        } else {
          timeout = setTimeout(() => {
             isDeleting = true;
             type();
          }, 3000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(currentText.slice(0, charIndex));
          const lines = currentText.slice(0, charIndex).split('\n');
          setIsActiveLine(lines.length - 1);
          charIndex -= 4;
          timeout = setTimeout(type, speed / 4);
        } else {
          isDeleting = false;
          setCurrentIndex((prev) => (prev + 1) % snippets.length);
          charIndex = 0;
          timeout = setTimeout(type, 800);
        }
      }
    };

    timeout = setTimeout(type, delay);
    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [snippets, speed, delay, currentIndex]);

  return { displayed, snippet: snippets[currentIndex], activeLine: isActiveLine };
};

const highlightCode = (code: string, lang: string) => {
  let h = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (lang === 'tsx' || lang === 'ts' || lang === 'js') {
    h = h.replace(/\b(import|from|const|let|var|function|return|export|default|async|await|new|if|else|for|while|class|def)\b/g, '##KW##$1##END##');
    h = h.replace(/(&lt;\/?)([a-zA-Z0-9.-]+)/g, '$1##TAG##$2##END##');
    h = h.replace(/([a-zA-Z-]+)=/g, '##ATTR##$1##END##=');
    h = h.replace(/(".*?"|'.*?'|`.*?`)/g, '##STR##$1##END##');
    h = h.replace(/\b(\d+)\b/g, '##NUM##$1##END##');
    h = h.replace(/([a-zA-Z0-9_]+)\s*\(/g, '##FUNC##$1##END##(');
  } else if (lang === 'bash') {
    h = h.replace(/^\$\s(.*)$/gm, '##PROMPT##$##END## ##CMD##$1##END##');
    h = h.replace(/(ready|event|added|Deploying|Build|Compiled|Success|✓)(.*)/gi, '##SUCCESS##$1$2##END##');
    h = h.replace(/➜(.*)/g, '##FUNC##➜$1##END##');
  }
  h = h.replace(/##TAG##(.*?)##END##/g, '<span class="text-[#e06c75]">$1</span>');
  h = h.replace(/##ATTR##(.*?)##END##/g, '<span class="text-[#d19a66]">$1</span>');
  h = h.replace(/##STR##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');
  h = h.replace(/##KW##(.*?)##END##/g, '<span class="text-[#c678dd]">$1</span>');
  h = h.replace(/##NUM##(.*?)##END##/g, '<span class="text-[#d19a66]">$1</span>');
  h = h.replace(/##FUNC##(.*?)##END##/g, '<span class="text-[#61afef]">$1</span>');
  h = h.replace(/##PROMPT##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');
  h = h.replace(/##CMD##(.*?)##END##/g, '<span class="text-[#61afef]">$1</span>');
  h = h.replace(/##SUCCESS##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');
  return h;
};

const EditorWindow = ({ snippets, delay = 0, className = "", animateTyping = true }: { snippets: any[], delay?: number, className?: string, animateTyping?: boolean }) => {
  const { displayed, snippet, activeLine } = animateTyping 
    ? useTypingEffect(snippets, 20, delay) 
    : { displayed: snippets[0].code, snippet: snippets[0], activeLine: -1 };
    
  const highlighted = highlightCode(displayed, snippet.lang);
  const lines = displayed.split('\\n');
  const scrollRef = useRef<HTMLDivElement>(null);
  const Icon = snippet.icon;

  useEffect(() => {
    if (animateTyping && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayed, animateTyping]);

  return (
    <div className={`group flex flex-col bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${className}`}>
      {/* Mac-like header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center absolute left-1/2 -translate-x-1/2">
           <div className="flex items-center space-x-1.5 text-[10px] font-medium text-white/60">
             <Icon size={12} />
             <span>{snippet.title}</span>
           </div>
        </div>
        <div className="flex items-center">
           <Settings size={12} className="text-white/30" />
        </div>
      </div>
      
      {/* Editor Body */}
      <div ref={scrollRef} className="p-3 flex-1 overflow-y-auto scrollbar-hide relative flex font-mono text-[11px] sm:text-[12px] leading-relaxed">
        {snippet.lang !== 'bash' && (
          <div className="flex-none w-6 flex flex-col items-end text-white/20 select-none pr-2 border-r border-white/5 mr-3">
            {lines.map((_, i) => (
              <div key={i} className={`h-5 w-full text-right ${activeLine === i ? 'text-white/50' : ''}`}>
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <div className="flex-1 whitespace-pre-wrap relative text-white/80">
           {snippet.lang !== 'bash' && activeLine >= 0 && (
             <div 
               className="absolute -left-3 -right-3 h-5 bg-white/[0.03] pointer-events-none transition-all duration-100 border-l-[1.5px] border-app-primary" 
               style={{ top: `${activeLine * 20}px` }} 
             />
           )}
           <span dangerouslySetInnerHTML={{ __html: highlighted }} className="relative z-10" />
           {animateTyping && <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-white/70 animate-pulse align-middle relative z-10 -mt-0.5" />}
        </div>
      </div>
    </div>
  );
};

export default function FloatingCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 40, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const moveX1 = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  
  const moveX2 = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [15, -15]);
  
  const moveX3 = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const moveY3 = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full h-full relative flex items-center justify-center pointer-events-auto">
       
       {/* Main Editor (VS Code) */}
       <motion.div style={{ x: moveX1, y: moveY1 }} className="absolute z-30 w-[95%] sm:w-[380px] md:w-[420px]">
         <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}>
           <EditorWindow snippets={MAIN_SNIPPETS} className="h-[260px] sm:h-[300px]" delay={500} />
         </motion.div>
       </motion.div>

       {/* Terminal Window */}
       <motion.div style={{ x: moveX2, y: moveY2 }} className="absolute z-20 w-[85%] sm:w-[300px] md:w-[340px] right-[2%] top-[5%] sm:-right-[5%] sm:top-[10%]">
         <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
           <EditorWindow snippets={TERMINAL_SNIPPETS} className="h-[160px] sm:h-[180px]" delay={2000} />
         </motion.div>
       </motion.div>

       {/* Git Window */}
       <motion.div style={{ x: moveX3, y: moveY3 }} className="absolute z-40 w-[80%] sm:w-[280px] md:w-[320px] left-[5%] bottom-[5%] sm:-left-[10%] sm:bottom-[10%]">
         <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
           <EditorWindow snippets={GIT_SNIPPETS} className="h-[140px] sm:h-[160px]" delay={3500} />
         </motion.div>
       </motion.div>

    </div>
  );
}
