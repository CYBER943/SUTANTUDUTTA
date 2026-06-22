import { motion } from 'motion/react';
import { CURRENT_INTERESTS, LEARNING_SKILLS } from '../../data';

export default function Knowledge() {
  return (
    <section id="knowledge" className="py-24 relative overflow-hidden bg-[#0B1120]">
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Currently Building */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center space-x-3 mb-10 border-b border-[#1F2937] pb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
            </span>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">Currently Building</h2>
          </div>

          <div className="space-y-4">
            {CURRENT_INTERESTS.map((interest, idx) => (
              <motion.div 
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-[#3B82F6]/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all group cursor-default"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 transition-transform">
                    <interest.icon size={20} />
                  </div>
                  <span className="font-medium text-white group-hover:text-[#3B82F6] transition-colors">{interest.title}</span>
                </div>
                <span className="text-xs font-semibold text-app-muted bg-[#1E293B] px-3 py-1 rounded-full uppercase tracking-wide">
                  {interest.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Now */}
        <motion.div
           initial={{ opacity: 0, x: 40 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-10 border-b border-[#1F2937] pb-4">
            <span className="w-3 h-3 rounded-sm bg-[#8B5CF6]" />
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">Learning Now</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LEARNING_SKILLS.map((skill, idx) => (
              <motion.div 
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-[#8B5CF6]/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                    <skill.icon size={20} />
                  </div>
                </div>
                <h3 className="font-medium text-white mb-2">{skill.title}</h3>
                
                {/* Progress bar visual (abstract representation of skill level) */}
                <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden mt-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
