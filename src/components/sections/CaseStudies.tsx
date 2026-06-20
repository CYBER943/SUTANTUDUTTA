import { motion } from 'motion/react';
import { CASE_STUDIES } from '../../data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-[#3B82F6]">Case Studies.</span>
          </h2>
          <p className="text-lg text-app-muted max-w-2xl mx-auto font-light leading-relaxed">
            Deep dives into specific problems, the architectural choices made, and the engineering challenges overcome.
          </p>
        </motion.div>

        <div className="space-y-16">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
              className="bg-[#111827] border border-[#1F2937] hover:border-[#8B5CF6]/40 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 flex flex-col group relative"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/5 blur-3xl rounded-full" />

              <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
                <div className="flex-1 space-y-8 relative z-10">
                  <div>
                    <span className="inline-block text-xs font-semibold text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1 rounded-full border border-[#06B6D4]/20 mb-4">
                      {study.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-[#8B5CF6] transition-colors">{study.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>The Problem</h4>
                      <p className="text-app-muted leading-relaxed font-light">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></span>The Solution</h4>
                      <p className="text-app-muted leading-relaxed font-light">{study.solution}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#1F2937]/50">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map(tech => (
                        <span key={tech} className="text-xs text-app-muted bg-[#1E293B]/50 border border-[#1F2937] px-3 py-1.5 rounded-lg group-hover:border-[#3B82F6]/30 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-8 bg-[#0B1120] p-8 rounded-2xl border border-[#1F2937] relative z-10 lg:mt-8">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Challenges Faced</h4>
                    <p className="text-app-muted leading-relaxed font-light text-sm">{study.challenges}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Key Learnings</h4>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-[#10B981] mr-3 mt-0.5 shrink-0" size={18} />
                      <p className="text-app-muted leading-relaxed font-light text-sm">{study.learnings}</p>
                    </div>
                  </div>
                  <button className="mt-8 text-[#3B82F6] hover:text-[#06B6D4] text-sm font-medium transition-colors flex items-center">
                    Read detailed breakdown <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
