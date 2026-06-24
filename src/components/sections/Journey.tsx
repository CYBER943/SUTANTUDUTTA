import { motion } from 'motion/react';
import { TIMELINE_EVENTS } from '../../data';

export default function Journey() {
  return (
    <section className="py-24 relative overflow-hidden bg-app-bg-secondary">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            The <span className="text-white/60">Journey</span>
          </h2>
          <p className="text-lg text-app-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            The timeline of my growth, the milestones I've hit, and the path to building 500+ projects.
          </p>
        </motion.div>

        <div className="relative border-l border-app-border ml-4 md:ml-12 pl-8 md:pl-16 space-y-16">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[73px] top-6 w-5 h-5 rounded-full bg-app-card border-2 border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300 z-10"></div>
              
              {/* Content Card */}
              <div className="bg-app-card border border-app-border p-8 rounded-3xl group-hover:bg-app-elevated transition-all duration-500 relative overflow-hidden">
                <span className="text-[11px] font-semibold text-white/50 tracking-wider uppercase mb-3 block">{event.year}</span>
                <h3 className="text-2xl font-display font-semibold tracking-tight text-white mb-3">{event.title}</h3>
                <p className="text-app-text-secondary leading-relaxed font-light">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
