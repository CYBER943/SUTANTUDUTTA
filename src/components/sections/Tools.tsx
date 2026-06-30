import { TOOLS } from '../../data';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { TextReveal } from '../ui/TextReveal';

function ToolItem({ item }: { item: typeof TOOLS[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-3 px-10 transition-transform duration-300"
      animate={{ 
        y: [0, -8, 0],
      }}
      transition={{ 
        duration: 4 + Math.random() * 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: Math.random() * 2 
      }}
      style={{
        transform: isHovered ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)'
      }}
    >
      <motion.div 
        className="flex items-center justify-center transition-all duration-300"
        style={{ 
          filter: isHovered ? `drop-shadow(0 0 16px ${item.color}80)` : 'none'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <item.icon 
          size={36} 
          style={{ color: item.color }} 
        />
      </motion.div>
      <span 
        className="text-3xl font-display font-medium whitespace-nowrap transition-colors duration-300"
        style={{ color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.8)' }}
      >
        {item.name}
      </span>
    </motion.a>
  );
}

export default function Tools() {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  return (
    <section className="py-32 relative overflow-hidden bg-[var(--color-app-bg)] border-t border-white/[0.04]">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4F46E5]/10 blur-[120px] rounded-full mix-blend-screen animate-gradient" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-[#06B6D4]/10 blur-[120px] rounded-full mix-blend-screen animate-gradient" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <div className="w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
            <TextReveal text="Tools I Use" />
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto font-light leading-relaxed">
            The technologies, AI assistants, and platforms that power my workflow—from learning and coding to designing, deploying, and managing projects.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Marquee */}
        <div className="relative overflow-hidden group">
          {/* Edge Gradients for Smooth Fade */}
          <div className="absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-[var(--color-app-bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-[var(--color-app-bg)] to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden py-12 cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex backface-hidden touch-pan-y items-center">
              {TOOLS.map((item, idx) => (
                <ToolItem key={`${item.name}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
