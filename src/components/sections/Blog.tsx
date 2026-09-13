import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../../data';
import { TextReveal } from '../ui/TextReveal';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 md:py-32 relative overflow-hidden bg-app-bg border-t border-app-border-light">
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-app-primary/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="text-app-primary" size={24} />
              <span className="text-app-text-secondary font-mono text-sm tracking-widest uppercase">Knowledge Hub</span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold text-app-text tracking-tight leading-none">
              Thoughts & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-text-secondary to-app-muted">
                Insights.
              </span>
            </h2>
          </div>

          <div className="w-full md:w-auto relative max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-muted" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-app-card border border-app-border rounded-full py-3 pl-12 pr-6 text-app-text placeholder:text-app-muted focus:outline-none focus:border-app-primary/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-16">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-app-text text-app-bg'
                  : 'bg-app-card border border-app-border text-app-text-secondary hover:border-app-primary/30 hover:text-app-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  key={post.id}
                  className="group flex flex-col sm:flex-row gap-6 bg-app-card p-4 rounded-3xl border border-app-border hover:border-app-primary/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(255,90,54,0.05)]"
                >
                  <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden relative flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-app-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-center py-2 sm:pr-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-app-primary uppercase mb-3 block">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-app-text mb-3 leading-tight group-hover:text-app-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-app-text-secondary text-sm font-light leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-xs font-mono text-app-muted">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-app-text-secondary"
              >
                No articles found matching "{searchQuery}" in {activeCategory}.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
