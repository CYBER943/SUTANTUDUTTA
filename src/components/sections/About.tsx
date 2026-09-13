import { motion, useReducedMotion } from 'motion/react';
import { Fingerprint, ArrowRight } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';

const FOCUS_AREAS = [
  "Vibe Coding",
  "Academics",
  "Learning",
  "Reading Books",
  "Artificial Intelligence",
  "Web Development",
  "Creative Building"
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 relative bg-app-bg overflow-hidden border-t border-app-border-light" id="about">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-app-primary/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-16">
          <Fingerprint className="text-app-primary" size={24} />
          <span className="text-app-text-secondary font-mono text-sm tracking-widest uppercase">My Journey</span>
        </div>

        {/* Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Large Typography */}
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,4vw,3.5rem)] font-display font-bold tracking-tight text-app-text leading-[1.1] mb-6"
            >
              Class 10 Student <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-primary to-orange-300">
                AI Developer
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-app-text-secondary text-lg leading-relaxed font-light mb-8"
            >
              I believe the best way to learn technology is by building things. Experimenting, making mistakes, and continuously improving is at the core of my journey as a student developer.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#projects" className="inline-flex items-center space-x-2 text-app-text hover:text-app-primary transition-colors font-medium group">
                <span>See what I'm building</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Focus Areas & Narrative */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg prose-invert max-w-none text-app-text-secondary font-light leading-relaxed"
            >
              <p>
                My passion lies at the intersection of Artificial Intelligence and modern web development. While balancing academics, I spend my time exploring new concepts, reading books, and turning ambitious ideas into working digital projects.
              </p>
              <p>
                Whether it's crafting a smooth user interface, leveraging 'vibe coding' to accelerate development, or integrating smart AI features, I love the entire process of bringing concepts to life through code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-sm font-mono text-app-text tracking-widest uppercase mb-6">Current Focus Areas</h3>
              <div className="flex flex-wrap gap-3">
                {FOCUS_AREAS.map((area, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full bg-app-card border border-app-border text-app-text-secondary text-sm font-medium transition-colors hover:border-app-primary/50 hover:text-app-text"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
