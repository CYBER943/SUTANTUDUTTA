import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Maximize2, Terminal } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

const codeString = `import { Developer } from "./profile";

const developer = {
  name: "SUTANTU DUTTA",
  role: "AI Developer",
  specialization: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Development",
    "Modern Web Applications"
  ],
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion"
  ],
  mission:
    "Crafting intelligent digital experiences through AI and modern web technologies."
};

developer.buildFuture();`;

export const CodeEditorShowcase = () => {
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const editorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      // Type faster
      index += Math.floor(Math.random() * 5) + 3;
      if (index > codeString.length) {
        setDisplayedCode(codeString);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedCode(codeString.substring(0, index));
      }
      
      // Auto-scroll
      if (editorRef.current) {
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[650px] mx-auto md:mr-0 z-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D4D] via-[#FF6B35] to-app-purple rounded-[24px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
      
      {/* Editor Container */}
      <div className="relative flex flex-col w-full h-[550px] bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-[20px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_80px_rgba(255,77,77,0.2)]">
        
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111111]/90 backdrop-blur-md">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          {/* File Tab */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/[0.05] rounded-md border border-white/5 shadow-inner">
            <span className="text-[#3178C6] font-bold text-[11px]">TSX</span>
            <span className="text-xs text-white/80 font-mono tracking-tight">portfolio.tsx</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="relative text-white/40 hover:text-white transition-colors group flex items-center justify-center"
              aria-label="Copy code"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Check size={16} className="text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Copy size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Tooltip */}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] rounded border border-white/10 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <button className="text-white/40 hover:text-white transition-colors ml-2" aria-label="Fullscreen">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div ref={editorRef} className="flex-1 overflow-auto p-5 hide-scrollbar scroll-smooth">
          <Highlight theme={themes.vsDark} code={displayedCode} language="tsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className="text-[14px] font-mono leading-loose bg-transparent" style={{ ...style, backgroundColor: 'transparent', fontFamily: '"JetBrains Mono", monospace' }}>
                {tokens.map((line, i) => (
                  <div 
                    key={i} 
                    {...getLineProps({ line })}
                    className="group/line hover:bg-white/[0.04] transition-colors rounded-sm px-2 -mx-2 flex items-start"
                  >
                    {/* Line Number */}
                    <span className="w-8 text-right pr-5 text-white/20 select-none group-hover/line:text-white/50 transition-colors">
                      {i + 1}
                    </span>
                    
                    {/* Line Content */}
                    <span className="flex-1 relative">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                      {/* Cursor */}
                      {isTyping && i === tokens.length - 1 && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-2 h-4 bg-[#FF6B35] ml-1 translate-y-0.5"
                        />
                      )}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>

        {/* Editor Footer / Status Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 bg-[#111111]/90 text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-white/80 cursor-pointer transition-colors">
              <Terminal size={14} />
              <span>TERMINAL</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-pulse" />
              <span>TypeScript React</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hover:text-white/80 cursor-pointer transition-colors">UTF-8</span>
            <span className="hover:text-white/80 cursor-pointer transition-colors">Prettier</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
