import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Terminal, FileCode2, FileType2, Palette, GitCommit, CheckCircle2 } from 'lucide-react';

const HTML_CODE = `<section class="hero">
  <div class="glow"></div>
  <h1>Build Amazing Things</h1>
  <p>Interactive experiences</p>
</section>`;

const CSS_CODE = `.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  background: #050505;
}

.glow {
  position: absolute;
  filter: blur(80px);
  background: rgba(220, 38, 38, 0.15);
}`;

const JS_CODE = `import { gsap } from "gsap";

const init = () => {
  gsap.from(".hero h1", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  });
};

window.addEventListener("load", init);`;

const TERMINAL_CODE = `$ npm run dev

> portfolio@1.0.0 dev
> vite

VITE v4.4.9  ready in 245 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose

$ git add .
$ git commit -m "Update hero"
[main 3a4f8b2] Update hero
 3 files changed, 45 insertions(+)
$ git push origin main
Deploying to Vercel...
Build Successful ✓`;

const useTypingEffect = (text: string, speed: number = 30, delay: number = 0) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let isDeleting = false;
    let isActive = true;

    const type = () => {
      if (!isActive) return;

      if (!isDeleting) {
        if (currentIndex <= text.length) {
          setDisplayed(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, speed + Math.random() * 20);
        } else {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 4000);
        }
      } else {
        const deleteTo = Math.floor(text.length * 0.5);
        if (currentIndex > deleteTo) {
          setDisplayed(text.slice(0, currentIndex));
          currentIndex--;
          timeout = setTimeout(type, speed / 2);
        } else {
          isDeleting = false;
          timeout = setTimeout(type, 1000);
        }
      }
    };

    timeout = setTimeout(type, delay);
    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);

  return { displayed };
};

const highlightCode = (code: string, lang: string) => {
  let h = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (lang === 'html') {
    h = h.replace(/(&lt;\/?)([a-zA-Z0-9]+)(.*?)(&gt;)/g, '$1##TAG##$2##END##$3$4');
    h = h.replace(/([a-zA-Z-]+)=/g, '##ATTR##$1##END##=');
    h = h.replace(/(".*?")/g, '##STR##$1##END##');
  } else if (lang === 'css') {
    h = h.replace(/([a-zA-Z0-9.-]+)\s*\{/g, '##SEL##$1##END## {');
    h = h.replace(/([a-zA-Z-]+):/g, '##PROP##$1##END##:');
    h = h.replace(/:\s*([^;]+);/g, ': ##VAL##$1##END##;');
  } else if (lang === 'js') {
    h = h.replace(/\b(import|from|const|let|var|function|return|window)\b/g, '##KW##$1##END##');
    h = h.replace(/\b(document|gsap|addEventListener)\b/g, '##OBJ##$1##END##');
    h = h.replace(/(".*?"|'.*?'|`.*?`)/g, '##STR##$1##END##');
    h = h.replace(/\b(\d+)\b/g, '##NUM##$1##END##');
    h = h.replace(/([a-zA-Z0-9_]+)\s*\(/g, '##FUNC##$1##END##(');
  } else if (lang === 'bash') {
    h = h.replace(/^\$\s(.*)$/gm, '##PROMPT##$##END## ##CMD##$1##END##');
    h = h.replace(/^&gt;\s(.*)$/gm, '##MUTED##&gt; $1##END##');
    h = h.replace(/✓/g, '##SUCCESS##✓##END##');
    h = h.replace(/VITE v.*/g, '##VITE##$&##END##');
    h = h.replace(/➜/g, '##SUCCESS##➜##END##');
  }

  h = h.replace(/##TAG##(.*?)##END##/g, '<span class="text-blue-400">$1</span>');
  h = h.replace(/##ATTR##(.*?)##END##/g, '<span class="text-sky-300">$1</span>');
  h = h.replace(/##STR##(.*?)##END##/g, '<span class="text-orange-300">$1</span>');
  h = h.replace(/##SEL##(.*?)##END##/g, '<span class="text-yellow-300">$1</span>');
  h = h.replace(/##PROP##(.*?)##END##/g, '<span class="text-sky-300">$1</span>');
  h = h.replace(/##VAL##(.*?)##END##/g, '<span class="text-orange-300">$1</span>');
  h = h.replace(/##KW##(.*?)##END##/g, '<span class="text-purple-400">$1</span>');
  h = h.replace(/##OBJ##(.*?)##END##/g, '<span class="text-blue-400">$1</span>');
  h = h.replace(/##NUM##(.*?)##END##/g, '<span class="text-green-400">$1</span>');
  h = h.replace(/##FUNC##(.*?)##END##/g, '<span class="text-yellow-300">$1</span>');
  h = h.replace(/##PROMPT##(.*?)##END##/g, '<span class="text-green-400">$1</span>');
  h = h.replace(/##CMD##(.*?)##END##/g, '<span class="text-blue-300">$1</span>');
  h = h.replace(/##MUTED##(.*?)##END##/g, '<span class="text-gray-400">$1</span>');
  h = h.replace(/##SUCCESS##(.*?)##END##/g, '<span class="text-green-500">$1</span>');
  h = h.replace(/##VITE##(.*?)##END##/g, '<span class="text-cyan-400">$1</span>');

  return h;
};

const EditorWindow = ({ title, icon: Icon, lang, code, delay = 0, className = "" }: { title: string, icon: any, lang: string, code: string, delay?: number, className?: string }) => {
  const { displayed } = useTypingEffect(code, 30, delay);
  const highlighted = highlightCode(displayed, lang);
  const lines = displayed.split('\n');

  return (
    <div className={`group flex flex-col bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:border-white/20 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors" />
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors">
          <Icon size={14} />
          <span>{title}</span>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-hidden relative">
        {lang !== 'bash' && (
          <div className="absolute left-0 top-4 bottom-4 w-10 flex flex-col items-center text-xs text-white/20 font-mono select-none border-r border-white/5">
            {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <div className={`font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${lang !== 'bash' ? 'ml-10' : ''}`}>
           <span dangerouslySetInnerHTML={{ __html: highlighted }} />
           <span className="inline-block w-2 h-4 ml-1 bg-white/70 animate-pulse align-middle" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default function FloatingCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [toast, setToast] = useState<{message: string, icon: any} | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const toasts = [
        { message: 'Auto-saved', icon: CheckCircle2 },
        { message: 'Git commit created', icon: GitCommit },
        { message: 'Build successful', icon: Terminal }
      ];
      setToast(toasts[Math.floor(Math.random() * toasts.length)]);
      setTimeout(() => setToast(null), 3000);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const moveX1 = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  
  const moveX2 = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [15, -15]);
  
  const moveX3 = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const moveY3 = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  
  const moveX4 = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const moveY4 = useTransform(springY, [-0.5, 0.5], [25, -25]);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full h-[500px] lg:h-[650px] rounded-[2rem] overflow-visible perspective-1000 group">
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none rounded-[2rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
       
       <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-app-primary rounded-full shadow-[0_0_15px_var(--color-app-primary)] animate-pulse" />
       <div className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e] animate-pulse" style={{ animationDelay: '1s' }} />
       
       <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
         <path d="M 100 150 Q 250 50 400 250" stroke="var(--color-app-primary)" fill="none" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
       </svg>

       <div className="absolute inset-0 z-50 pointer-events-none flex justify-center">
         <AnimatePresence>
           {toast && (
             <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 20, scale: 1 }}
                exit={{ opacity: 0, y: 0, scale: 0.9 }}
                className="absolute bg-[#111] border border-white/10 rounded-full px-4 py-2 flex items-center space-x-2 text-xs text-white shadow-xl"
             >
                <toast.icon size={14} className="text-app-primary" />
                <span>{toast.message}</span>
             </motion.div>
           )}
         </AnimatePresence>
       </div>

       <motion.div style={{ x: moveX1, y: moveY1 }} className="absolute top-[5%] left-[0%] w-[80%] md:w-[320px] z-10 hidden lg:block">
         <motion.div animate={{ y: [0, -10, 0], rotate: [-2, -1, -2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
           <EditorWindow title="index.html" icon={FileType2} lang="html" code={HTML_CODE} delay={0} />
         </motion.div>
       </motion.div>

       <motion.div style={{ x: moveX3, y: moveY3 }} className="absolute top-[10%] md:top-[15%] left-[10%] md:left-auto md:right-[5%] w-[90%] sm:w-[80%] md:w-[380px] z-30">
         <motion.div animate={{ y: [0, -15, 0], rotate: [1, 2, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
           <EditorWindow title="script.js" icon={FileCode2} lang="js" code={JS_CODE} delay={1000} />
         </motion.div>
       </motion.div>

       <motion.div style={{ x: moveX2, y: moveY2 }} className="absolute bottom-[20%] left-[5%] w-[340px] z-20 hidden md:block">
         <motion.div animate={{ y: [0, -12, 0], rotate: [-1, 0, -1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
           <EditorWindow title="styles.css" icon={Palette} lang="css" code={CSS_CODE} delay={500} />
         </motion.div>
       </motion.div>

       <motion.div style={{ x: moveX4, y: moveY4 }} className="absolute bottom-[5%] right-[10%] w-[320px] z-40 hidden lg:block">
         <motion.div animate={{ y: [0, -8, 0], rotate: [2, 1, 2] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
           <EditorWindow title="Terminal" icon={Terminal} lang="bash" code={TERMINAL_CODE} delay={2000} />
         </motion.div>
       </motion.div>
    </div>
  );
}
