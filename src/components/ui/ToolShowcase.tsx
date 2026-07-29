import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring, useInView } from 'motion/react';

const TOOLS = [
  { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC' },
  { name: 'GitHub', slug: 'github', color: 'FFFFFF' },
  { name: 'Copilot', slug: 'githubcopilot', color: 'FFFFFF' },
  { name: 'ChatGPT', slug: 'openai', color: 'FFFFFF' },
  { name: 'Gemini', slug: 'googlegemini', color: '8E75B2' },
  { name: 'AI Studio', slug: 'google', color: '4285F4' },
  { name: 'Grok', slug: 'x', color: 'FFFFFF' },
  { name: 'NoteGPT', slug: 'googledocs', color: 'FFFFFF' },
  { name: 'Dropbox', slug: 'dropbox', color: '0061FF' },
  { name: 'Claude', slug: 'claude', color: 'D97757' },
  { name: 'Todoist', slug: 'todoist', color: 'E44332' },
  { name: 'Vercel', slug: 'vercel', color: 'FFFFFF' },
];

const POSITIONS = [
  // Elegant, balanced floating arrangement
  { x: -38, y: -42, z: 10, scale: 0.95 }, 
  { x: 32, y: -45, z: -5, scale: 0.9 },
  { x: -12, y: -25, z: 20, scale: 1.15 },
  { x: 45, y: -15, z: -15, scale: 0.85 },
  { x: -48, y: 5, z: -10, scale: 0.85 },
  { x: 18, y: 10, z: 25, scale: 1.1 },
  { x: -28, y: 35, z: 5, scale: 1.05 },
  { x: 38, y: 35, z: 15, scale: 0.95 },
  { x: -10, y: 52, z: -20, scale: 0.85 },
  { x: -55, y: -18, z: -25, scale: 0.8 },
  { x: 55, y: 12, z: 0, scale: 0.9 },
  { x: 8, y: -50, z: -10, scale: 0.95 },
];

export function ToolShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "0px 0px 200px 0px", once: false });
  const prefersReducedMotion = useReducedMotion();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setWindowWidth(window.innerWidth), 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const visibleTools = TOOLS;
  
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !containerRef.current || !isInView || windowWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawMouseX.set(x);
    rawMouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative flex items-center justify-center -mt-8 md:mt-0 perspective-[1000px] transform-gpu"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Tools I Use"
    >
      {windowWidth < 768 ? (
        <div className="grid grid-cols-2 gap-4 w-full px-2 max-w-md mx-auto">
          {visibleTools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex items-center gap-3 p-3 md:p-4 rounded-[20px] bg-app-card backdrop-blur-xl border border-app-border hover:bg-app-elevated hover:border-white/20 transition-all shadow-lg"
            >
              <img 
                src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`} 
                alt={tool.name} 
                className="w-6 h-6 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 transition-opacity" 
                loading="lazy"
                decoding="async"
                width={32}
                height={32}
              />
              <span className="text-app-text-secondary font-medium text-sm md:text-base group-hover:text-app-text transition-colors">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0">
          {visibleTools.map((tool, idx) => (
            <DesktopToolItem 
              key={tool.name} 
              tool={tool} 
              index={idx} 
              mouseX={mouseX} 
              mouseY={mouseY} 
              prefersReducedMotion={prefersReducedMotion} 
              isInView={isInView}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function DesktopToolItem({ tool, index, mouseX, mouseY, prefersReducedMotion, isInView }: any) {
  const pos = POSITIONS[index % POSITIONS.length];
  
  const parallaxFactor = (pos.z + 50) / 100;
  
  const xOffset = useTransform(mouseX, [-1, 1], [-40 * parallaxFactor, 40 * parallaxFactor]);
  const yOffset = useTransform(mouseY, [-1, 1], [-40 * parallaxFactor, 40 * parallaxFactor]);
  const rotateX = useTransform(mouseY, [-1, 1], [10 * parallaxFactor, -10 * parallaxFactor]);
  const rotateY = useTransform(mouseX, [-1, 1], [-10 * parallaxFactor, 10 * parallaxFactor]);

  const bobY = (!prefersReducedMotion && isInView) ? {
    y: [0, -10, 0],
    transition: {
      duration: 3.5 + (index % 4),
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.15
    }
  } : { y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: pos.scale } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.8, delay: index * 0.04, type: "spring", bounce: 0.4 }}
      className="absolute flex items-center justify-center group z-10 hover:z-50 will-change-transform"
      style={{
        left: `calc(50% + ${pos.x}%)`,
        top: `calc(50% + ${pos.y}%)`,
        x: '-50%',
        y: '-50%',
      }}
    >
      <motion.div
        style={{
          x: prefersReducedMotion ? 0 : xOffset,
          y: prefersReducedMotion ? 0 : yOffset,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
        className="relative perspective-1000 transform-gpu"
      >
        <motion.div
          animate={bobY}
          className="relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-[24px] bg-app-card backdrop-blur-xl border border-app-border shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.08] hover:bg-app-elevated hover:border-white/20 cursor-pointer transform-gpu group-hover:-translate-y-2"
        >
          <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 20px rgba(255,255,255,0.03)` }} />
          
          <img 
            src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`} 
            alt={tool.name} 
            className="w-6 h-6 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 transition-all duration-500 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transform-gpu group-hover:scale-110" 
            loading="lazy"
            decoding="async"
            width={32}
            height={32}
          />
          <span className="text-app-text-secondary font-medium text-sm md:text-base whitespace-nowrap group-hover:text-app-text transition-colors duration-500">
            {tool.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
