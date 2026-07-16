import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const CODE_SNIPPETS = [
  {
    language: 'typescript',
    filename: 'useQuantumCore.ts',
    content: `import { useEffect, useRef, useState } from 'react';
import { initializeQuantumState, stabilizeVortex } from '@quantum/core';
import type { QuantumNode, StabilizationMetrics } from '@quantum/types';

/**
 * Hook to manage quantum state synchronization across micro-frontends
 * Guarantees zero-latency state reflection using entanglement bridging.
 */
export function useQuantumCore(nodeId: string, options?: { autoStabilize: boolean }) {
  const [metrics, setMetrics] = useState<StabilizationMetrics | null>(null);
  const nodeRef = useRef<QuantumNode | null>(null);

  useEffect(() => {
    let syncInterval: number;
    
    async function boot() {
      try {
        console.log(\`[QuantumCore] Initializing node: \${nodeId}\`);
        nodeRef.current = await initializeQuantumState({
          id: nodeId,
          coherenceMode: 'high',
          onDesync: (err) => console.error('Coherence lost:', err)
        });

        if (options?.autoStabilize) {
          syncInterval = window.setInterval(async () => {
            if (nodeRef.current) {
               const result = await stabilizeVortex(nodeRef.current);
               setMetrics(result);
            }
          }, 1000 / 60); // 60hz tick
        }
      } catch (err) {
        console.error('Failed to boot quantum node:', err);
      }
    }

    boot();

    return () => {
      clearInterval(syncInterval);
      nodeRef.current?.terminate();
    };
  }, [nodeId, options?.autoStabilize]);

  return { metrics, isReady: !!nodeRef.current };
}`
  },
  {
    language: 'react',
    filename: 'NeuromorphicGrid.tsx',
    content: `import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { generateTopology } from '@/lib/math/topology';

interface GridProps {
  dimensions: [number, number];
  intensity?: number;
  className?: string;
}

export const NeuromorphicGrid: React.FC<GridProps> = ({ 
  dimensions, 
  intensity = 0.5,
  className 
}) => {
  const { scrollY } = useScroll();
  const rotation = useTransform(scrollY, [0, 1000], [0, 360]);
  
  const nodes = useMemo(() => {
    return generateTopology(dimensions[0], dimensions[1], intensity);
  }, [dimensions, intensity]);

  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      <motion.svg 
        style={{ rotate: rotation }}
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: node.opacity, scale: 1 }}
            transition={{ delay: i * 0.01, duration: 0.5 }}
          />
        ))}
      </motion.svg>
    </div>
  );
};`
  },
  {
    language: 'css',
    filename: 'theme-engine.css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-panel {
    @apply bg-white/[0.02] backdrop-blur-xl border border-white/10;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }
  
  .glass-panel-hover {
    @apply hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255,255,255,0.05);
  }
  
  .text-gradient-cosmic {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400;
  }
}

@layer base {
  ::selection {
    @apply bg-white/20 text-white;
  }

  /* Custom Scrollbar for IDE feel */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-white/10 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-white/20;
  }
}`
  }
];

const highlightSyntax = (code: string, language: string) => {
  if (!code) return '';
  
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (language === 'typescript' || language === 'react' || language === 'javascript') {
    highlighted = highlighted
      .replace(/\b(import|export|from|function|const|let|var|return|if|else|for|while|class|interface|type|extends|implements|new|async|await)\b/g, '<span class="text-pink-500 font-semibold">$1</span>')
      .replace(/(['"\`])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500/80 italic">$1</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500/80 italic">$&</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-yellow-200">$1</span>')
      .replace(/\b([a-zA-Z_$][\w$]*)(?=\()/g, '<span class="text-blue-400">$1</span>')
      .replace(/&lt;([A-Z][\w$]*)\b/g, '&lt;<span class="text-cyan-400">$1</span>')
      .replace(/&lt;\/([A-Z][\w$]*)\b/g, '&lt;/<span class="text-cyan-400">$1</span>');
  } else if (language === 'css') {
    highlighted = highlighted
      .replace(/(@\w+)/g, '<span class="text-pink-500 font-semibold">$1</span>')
      .replace(/(\.[a-zA-Z0-9_-]+)/g, '<span class="text-yellow-200">$1</span>')
      .replace(/([\w-]+)(?=\s*:)/g, '<span class="text-cyan-400">$1</span>')
      .replace(/:\s*(.*?)(;|$)/gm, ': <span class="text-green-400">$1</span>$2')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500/80 italic">$&</span>');
  }

  return highlighted;
};

export function BackgroundCode() {
  const codeRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [snippetIndex, setSnippetIndex] = useState(0);

  const snippet = CODE_SNIPPETS[snippetIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      if (codeRef.current && lineNumbersRef.current) {
         codeRef.current.innerHTML = highlightSyntax(snippet.content, snippet.language);
         const linesCount = (snippet.content.match(/\n/g) || []).length + 1;
         lineNumbersRef.current.innerHTML = Array.from({length: linesCount}, (_, i) => i + 1).join('<br/>');
      }
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    const fullText = snippet.content;
    let currentLength = 0;
    let isDeleting = false;
    let lastTime = 0;
    let typingSpeed = 20;

    let rAFId: number;
    let timeoutId: number;
    
    const updateDOM = (text: string) => {
       if (!codeRef.current || !lineNumbersRef.current) return;
       const highlighted = highlightSyntax(text, snippet.language);
       codeRef.current.innerHTML = highlighted;
       
       const linesCount = (text.match(/\n/g) || []).length + 1;
       lineNumbersRef.current.innerHTML = Array.from({length: linesCount}, (_, i) => i + 1).join('<br/>');
    };

    const loop = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;

      if (dt > typingSpeed) {
        lastTime = time;
        if (!isDeleting) {
           if (currentLength < fullText.length) {
              const charsToAdd = Math.random() > 0.8 ? Math.floor(Math.random() * 4) + 1 : 1;
              currentLength = Math.min(fullText.length, currentLength + charsToAdd);
              updateDOM(fullText.slice(0, currentLength));
              
              if (Math.random() > 0.96) {
                 typingSpeed = 400; // pause
              } else {
                 typingSpeed = 15 + Math.random() * 40;
              }
              
              // auto scroll to bottom
              if (containerRef.current) {
                 containerRef.current.scrollTop = containerRef.current.scrollHeight;
              }
           } else {
              timeoutId = window.setTimeout(() => {
                 isDeleting = true;
                 rAFId = requestAnimationFrame(loop);
              }, 4000); // Read time
              return; 
           }
        } else {
           if (currentLength > 0) {
              currentLength = Math.max(0, currentLength - (Math.floor(Math.random() * 8) + 4));
              updateDOM(fullText.slice(0, currentLength));
              typingSpeed = 5; // Fast delete
           } else {
              isDeleting = false;
              setSnippetIndex(prev => (prev + 1) % CODE_SNIPPETS.length);
              return;
           }
        }
      }
      rAFId = requestAnimationFrame(loop);
    };
    
    timeoutId = window.setTimeout(() => {
       rAFId = requestAnimationFrame(loop);
    }, 1000);

    return () => {
      cancelAnimationFrame(rAFId);
      clearTimeout(timeoutId);
    };
  }, [snippetIndex, prefersReducedMotion]);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.25] pointer-events-none select-none overflow-hidden mix-blend-screen" aria-hidden="true">
      {/* Gradient Mask to fade edges */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020817_70%)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020817] via-transparent to-[#020817]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020817] via-transparent to-[#020817]" />
      
      {/* VS Code Window Container */}
      <div className="relative w-[120%] h-[120%] md:w-[110%] md:h-[110%] max-w-[1400px] max-h-[900px] bg-[#0d1117] border border-white/5 rounded-2xl shadow-2xl overflow-hidden blur-[1px] md:blur-[2px] transform-gpu scale-95 origin-center">
        
        {/* Window Header */}
        <div className="h-10 bg-[#161b22] border-b border-white/5 flex items-center px-4 gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          
          {/* File Tabs */}
          <div className="flex items-center h-full gap-1 ml-4 overflow-hidden">
            {CODE_SNIPPETS.map((s, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 px-4 h-full text-xs font-mono ${i === snippetIndex ? 'bg-[#0d1117] text-white/90 border-t border-t-blue-500' : 'text-white/40'}`}
              >
                {s.filename}
              </div>
            ))}
          </div>
        </div>
        
        {/* Editor Body */}
        <div 
          ref={containerRef}
          className="p-6 h-[calc(100%-2.5rem)] overflow-hidden flex font-mono text-[10px] md:text-sm leading-relaxed"
        >
          <div 
            ref={lineNumbersRef}
            className="text-white/20 text-right pr-6 select-none border-r border-white/5 mr-6"
          />
          <div className="relative text-white/80 whitespace-pre font-mono">
            <code ref={codeRef} className="block" />
            {!prefersReducedMotion && (
               <span 
                 ref={cursorRef} 
                 className="inline-block absolute w-2 md:w-2.5 h-4 md:h-5 bg-white/80 animate-pulse align-middle"
               />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
