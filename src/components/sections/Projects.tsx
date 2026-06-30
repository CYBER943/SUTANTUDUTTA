import { PROJECTS, CATEGORIES, PROJECT_CATEGORIES_DATA } from '../../data';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
              <TextReveal text="Experiments & Archive" />
            </h2>
            <p className="text-app-text-secondary text-lg font-light">
              A curated collection of UI concepts, micro-interactions, and functional prototypes.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16"
        >
          {PROJECT_CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
                <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className={`group flex flex-col bg-app-card rounded-3xl overflow-hidden relative cursor-pointer ${
                  project.featured 
                    ? 'border border-transparent bg-clip-border before:absolute before:inset-0 before:z-[-1] before:rounded-3xl before:bg-gradient-to-r before:from-[#3B82F6] before:to-[#8B5CF6] before:p-[1px] before:content-[""] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                    : 'border border-app-border hover:border-[#3B82F6] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                }`}
              >
                {/* Gradient sweep overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Visual Placeholder for Project Image */}
                <div className="h-56 relative overflow-hidden bg-app-bg border-b border-app-border">
                  {project.link.includes('codepen.io') ? (
                    <iframe 
                      src={project.link.replace('/pen/', '/embed/preview/') + '?default-tab=result&theme-id=dark'} 
                      title={project.title}
                      loading="lazy"
                      className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ border: 'none' }}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:scale-110 group-hover:text-white/60 transition-all duration-500">
                        <ExternalLink size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-transparent z-20" /> {/* Prevents iframe stealing click */}
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold tracking-tight text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-app-text-secondary text-sm leading-relaxed mb-8 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto mb-8">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[11px] uppercase tracking-wider font-medium text-app-muted bg-white/5 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-2 text-sm font-medium text-white hover:text-white/80 transition-colors group/link relative w-fit"
                  >
                    <span>View Project</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white group-hover/link:w-full transition-all duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-24 bg-app-card border border-app-border rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6 relative z-10">
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
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-app-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-app-primary-hover shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:scale-105 active:scale-95 transition-all"
            >
              <ExternalLink size={16} />
              <span>Visit CodePen</span>
            </a>
            
            <a
              href="https://github.com/Sdm940"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent border border-[#3B82F6] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#3B82F6]/10 transition-colors"
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
