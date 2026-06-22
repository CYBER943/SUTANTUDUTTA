import { motion } from 'motion/react';
import { TIMELINE_EVENTS } from '../../data';

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#020817]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] animate-gradient bg-[length:200%_auto]">Journey.</span>
          </h2>
          <p className="text-lg text-app-muted max-w-2xl mx-auto font-light leading-relaxed">
            The timeline of my growth, the milestones I've hit, and the path to building 500+ projects.
          </p>
        </motion.div>

        <div className="relative border-l border-[#1F2937] ml-4 md:ml-12 pl-8 md:pl-16 space-y-16">
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
              <div className="absolute -left-[41px] md:-left-[73px] top-6 w-5 h-5 rounded-full bg-[#111827] border-2 border-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
              
              {/* Content Card */}
              <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl group-hover:border-[#3B82F6] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <span className="text-sm font-semibold text-[#8B5CF6] tracking-wider uppercase mb-2 block">{event.year}</span>
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors">{event.title}</h3>
                <p className="text-app-muted leading-relaxed font-light">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
