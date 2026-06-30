import { motion } from 'motion/react';
import { CURRENT_INTERESTS, LEARNING_SKILLS } from '../../data';

export default function Knowledge() {
  return (
    <section className="py-32 relative overflow-hidden bg-app-bg-secondary">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Currently Building */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center space-x-4 mb-10 pb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <h2 className="text-3xl font-display font-semibold tracking-tight text-white">Currently Exploring</h2>
          </div>

          <div className="space-y-4">
            {CURRENT_INTERESTS.map((interest, idx) => (
              <motion.div 
                key={interest.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center justify-between p-5 rounded-[1.25rem] bg-app-card border border-app-border hover:bg-app-elevated transition-colors group cursor-default"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:scale-105 transition-all">
                    <interest.icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="font-medium text-white/90 group-hover:text-white transition-colors">{interest.title}</span>
                </div>
                <span className="text-[10px] font-semibold text-app-muted bg-white/5 border border-white/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {interest.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Now */}
        <motion.div
           initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
           whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-10 pb-4">
            <span className="w-2.5 h-2.5 rounded-sm bg-white/60" />
            <h2 className="text-3xl font-display font-semibold tracking-tight text-white">Focus Areas</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LEARNING_SKILLS.map((skill, idx) => (
              <motion.div 
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-[1.25rem] bg-app-card border border-app-border hover:bg-app-elevated transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 flex items-center justify-center group-hover:text-white group-hover:-translate-y-1 transition-all mb-4">
                  <skill.icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-white/90 mb-2 text-sm">{skill.title}</h3>
                <p className="text-xs text-app-text-secondary leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
