import { motion } from 'motion/react';
import { Activity, Award, BookOpen } from 'lucide-react';

export default function StatsDashboard() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-app-bg border-y border-app-border">
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {/* Dashboard Cards */}
          <div className="bg-app-card border border-app-border hover:bg-app-elevated rounded-3xl p-8 transition-all duration-300 group hover:-translate-y-1">
            <p className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-2 transition-colors">500+</p>
            <p className="text-[11px] uppercase tracking-wider text-app-text-secondary font-medium flex items-center">
              <Activity size={14} className="text-white/50 mr-2" /> Projects Built
            </p>
          </div>
          
          <div className="bg-app-card border border-app-border hover:bg-app-elevated rounded-3xl p-8 transition-all duration-300 group hover:-translate-y-1">
            <p className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-2 transition-colors">SOF</p>
            <p className="text-[11px] uppercase tracking-wider text-app-text-secondary font-medium flex items-center">
              <Award size={14} className="text-white/50 mr-2" /> Participant
            </p>
          </div>
          
          <div className="bg-app-card border border-app-border hover:bg-app-elevated rounded-3xl p-8 transition-all duration-300 group hover:-translate-y-1">
            <p className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-2 transition-colors">MyGov</p>
            <p className="text-[11px] uppercase tracking-wider text-app-text-secondary font-medium flex items-center">
              <span className="w-3.5 h-3.5 rounded border border-white/50 mr-2 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 bg-white/50 rounded-sm" />
              </span> Certified
            </p>
          </div>
          
          <div className="bg-app-card border border-app-border hover:bg-app-elevated rounded-3xl p-8 transition-all duration-300 group hover:-translate-y-1">
            <p className="text-xl md:text-2xl font-display font-medium tracking-tight text-white mb-4 transition-colors leading-tight">AI & Web<br />Explorer</p>
            <p className="text-[11px] uppercase tracking-wider text-app-text-secondary font-medium flex items-center">
              <BookOpen size={14} className="text-white/50 mr-2 mt-auto" /> Continuous Learner
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
