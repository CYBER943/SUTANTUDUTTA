import { motion } from 'motion/react';
import { Github, Star, GitBranch, Terminal } from 'lucide-react';

export default function GithubDashboard() {
  return (
    <section id="github" className="py-24 relative overflow-hidden bg-[#020817]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-3 mb-6 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
            <Github className="text-white" size={20} />
            <span className="text-white font-medium">@SUDANTU-HOLDINGS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]">Activity.</span>
          </h2>
          <p className="text-lg text-app-muted max-w-2xl mx-auto font-light leading-relaxed">
            A snapshot of my contributions, repositories, and continuous code output.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-3xl flex items-center justify-between group hover:border-[#10B981]/50 transition-colors">
              <div>
                <p className="text-app-muted text-sm font-medium mb-1">Repositories</p>
                <p className="text-3xl font-bold text-white">42</p>
              </div>
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                <Terminal size={24} />
              </div>
            </div>
            
            <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-3xl flex items-center justify-between group hover:border-[#F59E0B]/50 transition-colors">
              <div>
                <p className="text-app-muted text-sm font-medium mb-1">Stars Earned</p>
                <p className="text-3xl font-bold text-white">128</p>
              </div>
              <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-full flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                <Star size={24} />
              </div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-3xl flex items-center justify-between group hover:border-[#8B5CF6]/50 transition-colors">
              <div>
                <p className="text-app-muted text-sm font-medium mb-1">Total Contributions</p>
                <p className="text-3xl font-bold text-white">1,342</p>
              </div>
              <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 transition-transform">
                <GitBranch size={24} />
              </div>
            </div>
          </div>

          {/* Activity Graph Simulation */}
          <div className="lg:col-span-2 bg-[#111827] border border-[#1F2937] p-8 rounded-3xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/5 blur-3xl rounded-full pointer-events-none" />
            
            <div className="mb-8 z-10">
              <h3 className="text-xl font-bold text-white mb-2">Contribution Graph</h3>
              <p className="text-sm text-app-muted">1,342 contributions in the last year</p>
            </div>
            
            <div className="flex-1 w-full max-w-full overflow-x-auto overflow-y-hidden z-10 pb-4">
              <div className="flex gap-1.5 w-max">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1.5">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const rand = Math.random();
                      let bgClass = "bg-[#1F2937]/50"; // No contribution
                      if (rand > 0.9) bgClass = "bg-[#10B981]"; // High
                      else if (rand > 0.7) bgClass = "bg-[#10B981]/70"; // Med
                      else if (rand > 0.4) bgClass = "bg-[#10B981]/40"; // Low
                      
                      return (
                        <div 
                          key={dayIndex} 
                          className={`w-3 h-3 rounded-sm ${bgClass} hover:ring-1 hover:ring-white transition-all`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
