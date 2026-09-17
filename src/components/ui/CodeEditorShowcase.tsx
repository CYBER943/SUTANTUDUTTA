import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Maximize2, Terminal } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

import { useTheme } from '../ThemeProvider';

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

  const { theme } = useTheme();

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
      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)] to-accent-bright rounded-[24px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
      
      {/* Editor Container */}
      <div className="relative flex flex-col w-full h-[400px] sm:h-[450px] md:h-[550px] bg-bg-secondary/95 backdrop-blur-2xl rounded-[20px] border border-border shadow-lg overflow-hidden transition-all duration-500 hover:border-border hover:shadow-lg">
        
        {/* Editor Header */}
        <div className="flex items-center justify-between px-3 md:px-4 py-3 border-b border-border bg-bg-secondary/90 backdrop-blur-md">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-status-error border border-status-error" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-accent-secondary border border-accent-secondary" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-status-success border border-status-success" />
          </div>

          {/* File Tab */}
          <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1 md:py-1.5 bg-card-bg rounded-md border border-border shadow-inner">
            <span className="text-accent-primary font-bold text-[9px] md:text-[11px]">TSX</span>
            <span className="text-[10px] md:text-xs text-text-secondary font-mono tracking-tight hidden sm:inline-block">portfolio.tsx</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="relative text-text-muted hover:text-text-primary transition-colors group flex items-center justify-center"
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
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-elevated backdrop-blur-md text-text-primary text-[10px] rounded border border-border whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <button className="text-text-muted hover:text-text-primary transition-colors ml-2" aria-label="Fullscreen">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div ref={editorRef} className="flex-1 overflow-auto p-5 hide-scrollbar scroll-smooth">
          <Highlight theme={theme === 'dark' ? themes.vsDark : themes.vsLight} code={displayedCode} language="tsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className="text-[11px] sm:text-[12px] md:text-[14px] font-mono leading-loose bg-transparent" style={{ ...style, backgroundColor: 'transparent', fontFamily: '"JetBrains Mono", monospace' }}>
                {tokens.map((line, i) => (
                  <div 
                    key={i} 
                    {...getLineProps({ line })}
                    className="group/line hover:bg-card-bg transition-colors rounded-sm px-2 -mx-2 flex items-start"
                  >
                    {/* Line Number */}
                    <span className="w-8 text-right pr-5 text-text-muted select-none group-hover/line:text-text-secondary transition-colors">
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
                          className="inline-block w-2 h-4 bg-[var(--accent-primary)] ml-1 translate-y-0.5"
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
        <div className="flex items-center justify-between px-3 md:px-4 py-2.5 border-t border-border bg-bg-secondary/90 text-[9px] md:text-[11px] font-mono text-text-muted">
          <div className="flex items-center gap-3 md:gap-5">
            <span className="flex items-center gap-1.5 hover:text-text-secondary cursor-pointer transition-colors">
              <Terminal size={12} className="md:w-3.5 md:h-3.5" />
              <span className="hidden sm:inline-block">TERMINAL</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>TypeScript React</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <span className="hover:text-text-secondary cursor-pointer transition-colors">UTF-8</span>
            <span className="hover:text-text-secondary cursor-pointer transition-colors">Prettier</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
