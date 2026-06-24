import { motion } from 'motion/react';
import { Github, Star, GitBranch, Terminal } from 'lucide-react';

export default function GithubDashboard() {
  return (
    <section className="py-32 relative overflow-hidden bg-app-bg">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="mb-16 text-center flex flex-col items-center"
        >
          <a href="https://github.com/Sdm940" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 mb-8 bg-app-card border border-app-border px-4 py-1.5 rounded-full shadow-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
            <Github className="text-white/80" size={16} />
            <span className="text-white/80 text-sm font-medium tracking-wide">@Sdm940</span>
          </a>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
            Open Source
          </h2>
          <p className="text-lg text-app-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            A snapshot of my contributions, repositories, and continuous code output.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-app-card border border-app-border p-6 rounded-[1.5rem] flex items-center justify-between group hover:bg-app-elevated transition-colors">
              <div>
                <p className="text-app-text-secondary text-sm font-medium mb-1">Repositories</p>
                <p className="text-3xl font-display font-bold tracking-tight text-white">42</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                <Terminal size={20} strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="bg-app-card border border-app-border p-6 rounded-[1.5rem] flex items-center justify-between group hover:bg-app-elevated transition-colors">
              <div>
                <p className="text-app-text-secondary text-sm font-medium mb-1">Stars Earned</p>
                <p className="text-3xl font-display font-bold tracking-tight text-white">128</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/70 group-hover:text-yellow-400 transition-colors">
                <Star size={20} strokeWidth={1.5} />
              </div>
            </div>

            <div className="bg-app-card border border-app-border p-6 rounded-[1.5rem] flex items-center justify-between group hover:bg-app-elevated transition-colors">
              <div>
                <p className="text-app-text-secondary text-sm font-medium mb-1">Total Contributions</p>
                <p className="text-3xl font-display font-bold tracking-tight text-white">1,342</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/70 group-hover:text-green-400 transition-colors">
                <GitBranch size={20} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Activity Graph Simulation */}
          <div className="lg:col-span-2 bg-app-card border border-app-border p-8 rounded-[1.5rem] flex flex-col justify-between overflow-hidden relative group hover:bg-app-elevated transition-colors">
            <div className="mb-8 z-10 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white mb-1">Contribution Graph</h3>
                <p className="text-sm text-app-text-secondary">1,342 contributions in the last year</p>
              </div>
              <div className="hidden sm:flex space-x-1.5 items-center text-xs text-app-muted">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-white/5" />
                <div className="w-3 h-3 rounded-sm bg-white/20" />
                <div className="w-3 h-3 rounded-sm bg-white/40" />
                <div className="w-3 h-3 rounded-sm bg-white/80" />
                <span>More</span>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-full overflow-x-auto overflow-y-hidden z-10 pb-4 no-scrollbar opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex gap-1.5 w-max">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1.5">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const rand = Math.random();
                      let bgClass = "bg-white/5"; // No contribution
                      if (rand > 0.9) bgClass = "bg-white/80"; // High
                      else if (rand > 0.7) bgClass = "bg-white/60"; // Med
                      else if (rand > 0.4) bgClass = "bg-white/30"; // Low
                      
                      return (
                        <div 
                          key={dayIndex} 
                          className={`w-[11px] h-[11px] rounded-[2px] ${bgClass} hover:ring-1 hover:ring-white transition-all cursor-crosshair`}
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
