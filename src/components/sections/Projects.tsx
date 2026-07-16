import { PROJECTS, CATEGORIES, PROJECT_CATEGORIES_DATA } from '../../data';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Search, ExternalLink, ArrowRight, Github, Codepen, CheckCircle2 } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-32 relative bg-app-bg-secondary">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-display font-bold tracking-tight text-white mb-4">
              <TextReveal text="Experiments & Archive" />
            </h2>
            <p className="text-app-text-secondary text-lg font-light">
              A curated collection of UI concepts, micro-interactions, and functional prototypes.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-muted" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-72 bg-app-bg border border-app-border rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-app-muted focus:outline-none focus:border-white/30 transition-all"
            />
          </motion.div>
        </div>

        {/* Project Categories Grid */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16"
        >
          {PROJECT_CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => { setActiveCategory(cat.title); setSearchQuery(''); }}
              className={`p-4 rounded-2xl border cursor-pointer group transition-all duration-300 ${
                activeCategory === cat.title 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-app-card border-app-border hover:bg-app-elevated'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  activeCategory === cat.title ? 'bg-white text-black' : 'bg-white/5 text-white'
                }`}>
                  <cat.icon size={16} strokeWidth={2} />
                </div>
                <span className="text-xs font-medium text-app-muted">{cat.count}</span>
              </div>
              <h3 className={`font-medium text-sm transition-colors ${activeCategory === cat.title ? 'text-white' : 'text-app-text-secondary'}`}>{cat.title}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Project List */}
        <div className="flex flex-col gap-24">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem] pointer-events-none" />
                  
                  <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10 group-hover:border-white/20 transition-colors shadow-2xl">
                    {project.link.includes('codepen.io') ? (
                      <iframe 
                        src={project.link.replace('/pen/', '/embed/preview/') + '?default-tab=result&theme-id=dark'} 
                        title={project.title}
                        loading="lazy"
                        className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:scale-110 group-hover:text-white transition-all duration-500">
                          <ExternalLink size={32} strokeWidth={1} />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-medium text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                        Featured Case Study
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold tracking-tight text-white mb-6 leading-none">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Case Study Details */}
                  {(project.problem || project.solution) && (
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                      {project.problem && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Challenge
                          </h4>
                          <p className="text-sm text-white/50 leading-relaxed">{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Solution
                          </h4>
                          <p className="text-sm text-white/50 leading-relaxed">{project.solution}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Metrics */}
                  {project.performanceMetrics && (
                    <div className="flex flex-wrap gap-4 mb-8">
                      {project.performanceMetrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-white/80 font-medium">
                          <CheckCircle2 size={16} className="text-green-400" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-xs tracking-wider font-medium text-white/40 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Live Demo</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-2 px-6 py-3 rounded-full font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.codepen && !project.link.includes('codepen.io') && (
                      <a 
                        href={project.codepen} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-2 px-6 py-3 rounded-full font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Codepen size={16} />
                        <span>CodePen</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-app-muted">
            <p>No projects found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-white hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured CodePen / GitHub Banner */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-24 bg-app-card border border-app-border rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <h3 className="text-[clamp(1.75rem,5vw,3rem)] font-display font-bold tracking-tight text-white mb-6 relative z-10">
            Explore 500+ Projects
          </h3>
          <p className="text-app-text-secondary text-lg max-w-2xl mx-auto mb-10 relative z-10 font-light">
            Discover a wide variety of interactive experiments, creative UI concepts, and fully functional mini-applications built from scratch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 w-full sm:w-auto">
            <a
              href="https://codepen.io/SDM-TECH-KNOW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-app-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-app-primary-hover shadow-[0_0_15px_rgba(220,38,38,0.25)] hover:scale-105 active:scale-95 transition-all"
            >
              <ExternalLink size={16} />
              <span>Visit CodePen</span>
            </a>
            
            <a
              href="https://github.com/Sdm940"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent border border-app-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-app-primary/10 transition-colors"
            >
              <ExternalLink size={16} />
              <span>View GitHub</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
