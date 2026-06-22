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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
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
      className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#111827] border border-[#1F2937] hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all cursor-pointer w-full h-full"
    >
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none" 
        style={{ backgroundColor: item.color || '#ffffff' }}
      />
      <div
        style={{ transform: "translateZ(30px)" }}
        className="flex flex-col items-center gap-5 relative z-10 group-hover:-translate-y-1 transition-transform"
      >
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-white/5 border border-white/10 group-hover:border-transparent group-hover:bg-white/10"
          style={{ 
            color: isHovered ? (item.color || '#ffffff') : '#9ca3af',
            filter: isHovered ? `drop-shadow(0 0 12px ${item.color || '#ffffff'}66)` : 'none'
          }}
        >
          <item.icon size={32} />
        </div>
        <span className="font-medium text-white tracking-wide">{item.name}</span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && item.description && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ transform: "translateZ(50px)" }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-56 p-3 bg-[#1E293B] border border-[#1F2937] rounded-xl shadow-2xl z-[100] text-center pointer-events-none"
          >
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              {item.description}
            </p>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1E293B] border-t border-l border-[#1F2937] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="py-24 relative overflow-visible">
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Technology Stack & Daily Workflow.
          </h2>
          <p className="text-app-muted max-w-2xl mx-auto mb-16">
            I use a combination of AI assistants, development platforms, productivity tools, and communication services to learn faster, build better projects, and stay organized.
          </p>

          {/* Animated Marquee */}
          <div className="relative flex overflow-hidden mb-24 select-none">
            <div className="absolute top-0 left-0 w-24 md:w-32 h-full bg-gradient-to-r from-[#020817] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 md:w-32 h-full bg-gradient-to-l from-[#020817] to-transparent z-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              className="flex items-center space-x-12 md:space-x-20 w-max"
            >
              {[...TOOLS.flatMap(c => c.items), ...TOOLS.flatMap(c => c.items)].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-white/40 hover:text-white transition-colors">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon size={36} />
                  </motion.div>
                  <span className="text-lg font-display font-bold">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-20">
          {TOOLS.map((category, catIdx) => (
            <div key={category.category}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center space-x-4 mb-8"
              >
                <div className="h-px bg-white/10 flex-grow" />
                <h3 className="text-xl font-display font-semibold text-white px-4">
                  {category.category}
                </h3>
                <div className="h-px bg-white/10 flex-grow" />
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 relative z-20">
                {category.items.map((item, idx) => (
                  <TiltCard key={item.name} item={item} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative bg element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-app-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
