import { TOOLS } from '../../data';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useState } from 'react';
import { ToolItem } from '../../types';

function TiltCard({ item, index }: { item: ToolItem; index: number; key?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col items-center justify-center p-8 rounded-[2rem] bg-app-card border border-app-border hover:bg-app-elevated transition-all cursor-pointer w-full h-full"
    >
      <div 
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: item.color || '#ffffff' }}
      />
      <div
        style={{ transform: "translateZ(30px)" }}
        className="flex flex-col items-center gap-5 relative z-10 group-hover:-translate-y-2 transition-transform duration-500"
      >
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 bg-white/5 border border-white/10 group-hover:scale-110"
          style={{ 
            color: isHovered ? (item.color || '#ffffff') : 'var(--color-app-muted)',
            filter: isHovered ? `drop-shadow(0 0 10px ${item.color || '#ffffff'}60)` : 'none',
            borderColor: isHovered ? `${item.color || '#ffffff'}30` : 'rgba(255,255,255,0.05)'
          }}
        >
          <item.icon size={28} strokeWidth={1.5} className="transition-all duration-300" />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <span className="font-medium text-white tracking-tight transition-colors duration-300" style={{ color: isHovered ? (item.color || '#ffffff') : '#ffffff' }}>
            {item.name}
          </span>
          {item.description && (
            <p className="text-xs text-app-text-secondary max-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden text-balance">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.a>
  );
}

export default function Tools() {
  return (
    <section className="py-32 relative overflow-hidden bg-app-bg">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
            Tools I Use
          </h2>
          <p className="text-app-text-secondary text-lg max-w-2xl mx-auto font-light leading-relaxed mb-16">
            The tools, platforms, and technologies that support my learning, creativity, development workflow, and productivity.
          </p>

          {/* Animated Marquee */}
          <div className="relative flex overflow-hidden mb-24 select-none mask-image-fade">
            <div className="absolute top-0 left-0 w-24 md:w-32 h-full bg-gradient-to-r from-app-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 md:w-32 h-full bg-gradient-to-l from-app-bg to-transparent z-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex items-center space-x-12 md:space-x-20 w-max"
            >
              {[...TOOLS, ...TOOLS].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-app-muted hover:text-white transition-colors">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon size={32} />
                  </motion.div>
                  <span className="text-lg font-display font-bold">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 relative z-20">
          {TOOLS.map((item, idx) => (
            <TiltCard key={item.name} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
