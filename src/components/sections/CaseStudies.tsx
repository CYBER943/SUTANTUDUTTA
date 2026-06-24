import { motion } from 'motion/react';
import { CASE_STUDIES } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  if (!CASE_STUDIES || CASE_STUDIES.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-app-bg">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
              Case Studies
            </h2>
            <p className="text-lg text-app-text-secondary max-w-2xl font-light leading-relaxed">
              Deep dives into complex challenges and the technical strategies used to overcome them.
            </p>
          </div>
        </motion.div>

        <div className="space-y-16">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="bg-app-card border border-app-border rounded-[2rem] p-8 md:p-12 group hover:bg-app-elevated transition-colors relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-app-text-secondary mb-3 block">
                      {study.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-white mb-6">
                      {study.title}
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white/50">The Challenge</h4>
                      <p className="text-sm text-app-text-secondary leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white/50">My Thinking</h4>
                      <p className="text-sm text-app-text-secondary leading-relaxed">{study.thinking}</p>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white/50">The Approach</h4>
                      <p className="text-sm text-app-text-secondary leading-relaxed">{study.approach}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[320px] flex flex-col justify-between p-6 bg-white/5 border border-white/10 rounded-[1.5rem]">
                  <div className="space-y-4">
                    <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white/50">Outcome</h4>
                    <p className="text-sm text-white leading-relaxed font-medium">
                      "{study.outcome}"
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-[11px] uppercase tracking-wider font-semibold text-white/50 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] font-medium text-app-muted bg-white/5 px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
