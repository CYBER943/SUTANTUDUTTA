import { motion } from 'motion/react';
import { Activity, Award, BookOpen } from 'lucide-react';

export default function StatsDashboard() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#020817] border-y border-[#3B82F6]/10">
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {/* Dashboard Cards */}
          <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937] hover:border-[#3B82F6]/50 rounded-3xl p-8 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-300 group hover:-translate-y-1">
            <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors">500+</p>
            <p className="text-sm text-app-muted font-medium flex items-center">
              <Activity size={16} className="text-[#3B82F6] mr-2" /> Projects Built
            </p>
          </div>
          
          <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937] hover:border-[#8B5CF6]/50 rounded-3xl p-8 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300 group hover:-translate-y-1">
            <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors">SOF</p>
            <p className="text-sm text-app-muted font-medium flex items-center">
              <Award size={16} className="text-[#8B5CF6] mr-2" /> Participant
            </p>
          </div>
          
          <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937] hover:border-[#10B981]/50 rounded-3xl p-8 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 group hover:-translate-y-1">
            <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-[#10B981] transition-colors">MyGov</p>
            <p className="text-sm text-app-muted font-medium flex items-center">
              <span className="w-4 h-4 rounded border border-[#10B981] mr-2 flex items-center justify-center shrink-0">
                <span className="w-2 h-2 bg-[#10B981] rounded-sm" />
              </span> Certified
            </p>
          </div>
          
          <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937] hover:border-[#06B6D4]/50 rounded-3xl p-8 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 group hover:-translate-y-1">
            <p className="text-xl md:text-2xl font-display font-medium text-white mb-4 group-hover:text-[#06B6D4] transition-colors leading-tight">AI & Web<br />Explorer</p>
            <p className="text-sm text-app-muted font-medium flex items-center">
              <BookOpen size={16} className="text-[#06B6D4] mr-2 mt-auto" /> Continuous Learner
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
