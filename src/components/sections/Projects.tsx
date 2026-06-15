import { PROJECTS, CATEGORIES } from '../../data';
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
    <section id="projects" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              My Work.
            </h2>
            <p className="text-app-primary font-medium tracking-wide">
              500+ PROJECTS BUILT
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-app-muted" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-app-card border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-app-muted focus:outline-none focus:border-app-primary transition-colors"
            />
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-app-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white/5 text-app-muted hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {category}
            </button>
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
                className="group flex flex-col bg-app-card border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Visual Placeholder for Project Image */}
                <div className="h-48 bg-white/5 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-app-card to-transparent z-10" />
                   {/* Abstract pattern to make it look premium without an image */}
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-app-primary via-transparent to-transparent blur-xl group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-app-secondary bg-app-secondary/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <a href={project.link} className="text-app-muted hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-app-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-app-muted text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-xs text-app-muted bg-white/5 px-2 py-1 rounded">
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
              className="mt-4 text-app-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
