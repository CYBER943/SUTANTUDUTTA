import { PROJECTS, CATEGORIES, PROJECT_CATEGORIES_DATA } from '../../data';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';

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
    <section id="projects" className="py-24 relative bg-[#020817]">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] animate-gradient bg-[length:200%_auto]">Work.</span>
            </h2>
            <p className="text-[#3B82F6] font-medium tracking-wide">
              500+ PROJECTS BUILT
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-app-muted" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-[#111827] border border-[#1F2937] rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-app-muted focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all"
            />
          </motion.div>
        </div>

        {/* Project Categories Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {PROJECT_CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => { setActiveCategory(cat.title); setSearchQuery(''); }}
              className={`p-5 rounded-2xl border cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${
                activeCategory === cat.title 
                  ? 'bg-[#3B82F6]/10 border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                  : 'bg-[#111827] border-[#1F2937] hover:border-[#3B82F6]/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                activeCategory === cat.title ? 'bg-[#3B82F6] text-white' : 'bg-[#1E293B] text-[#3B82F6]'
              }`}>
                <cat.icon size={20} />
              </div>
              <p className="text-2xl font-display font-bold text-white mb-1 group-hover:text-[#3B82F6] transition-colors">{cat.count}</p>
              <h3 className="font-medium text-app-muted text-sm">{cat.title}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="w-full max-w-[400px] md:max-w-none mx-auto overflow-x-hidden group flex flex-col bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Visual Placeholder for Project Image */}
                <div className="h-48 relative overflow-hidden bg-[#0B1120] border-b border-[#1F2937]">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent z-10" />
                   {/* Abstract pattern to make it look premium without an image */}
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3B82F6] via-transparent to-transparent blur-xl group-hover:scale-110 group-hover:from-[#8B5CF6] transition-transform duration-700" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/20">
                      {project.category}
                    </span>
                    <a href={project.link} className="text-app-muted hover:text-[#06B6D4] transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-app-muted text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-xs text-app-muted bg-[#1E293B] border border-[#1F2937] px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
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
              className="mt-4 text-[#3B82F6] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured CodePen / GitHub Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-20 bg-gradient-to-br from-[#111827] to-[#0B1120] border border-[#1F2937] hover:border-[#8B5CF6]/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3B82F6]/10 via-transparent to-transparent pointer-events-none group-hover:from-[#8B5CF6]/10 transition-colors duration-500" />
          
          <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 relative z-10">
            Explore 500+ Projects on My CodePen
          </h3>
          <p className="text-app-muted max-w-2xl mx-auto mb-8 relative z-10">
            Discover a wide variety of interactive experiments, creative UI concepts, and fully functional mini-applications built from scratch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href="https://codepen.io/SDM-TECH-KNOW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#3B82F6] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2563EB] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
            >
              <ExternalLink size={18} />
              <span>Visit CodePen</span>
            </a>
            
            <a
              href="https://github.com/Sdm940"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent border border-[#3B82F6] text-white px-8 py-4 rounded-full font-medium hover:bg-white/5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
            >
              <ExternalLink size={18} />
              <span>View GitHub Repository</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
