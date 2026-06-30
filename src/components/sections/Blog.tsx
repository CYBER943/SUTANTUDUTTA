import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../../data';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const recentPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[var(--color-app-bg)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3B82F6]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="inline-flex items-center space-x-2 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full px-4 py-1.5 text-xs font-medium text-[#3B82F6] mb-6">
            <BookOpen size={14} />
            <span>Articles & Insights</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] animate-gradient bg-[length:200%_auto]">Notes & Discoveries.</span>
          </h2>
          <p className="text-lg text-app-muted max-w-2xl font-light leading-relaxed">
            Showcasing my learning journey, project breakdowns, AI insights, productivity systems, and technology experiments.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 text-app-muted hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-app-muted" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-[var(--color-app-card)] backdrop-blur-md border border-[var(--color-app-border)] rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-app-muted focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
            />
          </div>
        </div>

        {/* Blog Content */}
        <AnimatePresence mode='popLayout'>
          {filteredPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Featured Post */}
              {featuredPost && (
                <div className="group flex flex-col lg:flex-row bg-[var(--color-app-card)] backdrop-blur-md border border-[var(--color-app-border)] hover:border-[#3B82F6]/50 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1">
                  <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden bg-[#0B1120]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-app-card)] via-transparent to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--color-app-card)]" />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6] via-transparent to-transparent blur-xl group-hover:scale-110 group-hover:from-[#06B6D4] transition-transform duration-700" />
                  </div>
                  
                  <div className="lg:w-1/2 p-8 md:p-12 pl-8 lg:pl-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-xs font-semibold text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#3B82F6]/20">
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-[#3B82F6] transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-app-muted leading-relaxed mb-8 flex-grow">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--color-app-border)]">
                       <div className="flex items-center space-x-4 text-xs text-app-muted">
                        <span className="flex items-center"><Calendar size={14} className="mr-1.5" />{featuredPost.date}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center"><Clock size={14} className="mr-1.5" />{featuredPost.readTime}</span>
                      </div>
                      <button className="flex items-center text-sm font-medium text-white group-hover:text-[#3B82F6] transition-colors">
                        Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Recent Posts */}
              {recentPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      key={post.id}
                      className="w-full max-w-[400px] md:max-w-none mx-auto overflow-x-hidden group flex flex-col bg-[var(--color-app-card)] backdrop-blur-md border border-[var(--color-app-border)] hover:border-[#3B82F6]/30 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="p-6 md:p-8 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-[10px] font-semibold text-[#8B5CF6] uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-display font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        
                        <p className="text-sm text-app-muted line-clamp-3 mb-6 flex-grow">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--color-app-border)]/50">
                           <div className="flex items-center space-x-3 text-[11px] text-app-muted">
                            <span className="flex items-center"><Calendar size={12} className="mr-1" />{post.date}</span>
                          </div>
                          <span className="text-[11px] font-medium text-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-[var(--color-app-card)] backdrop-blur-md border border-[var(--color-app-border)] rounded-3xl"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-app-muted">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-app-muted">We couldn't find anything matching "{searchQuery}" in {activeCategory}.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-6 text-[#3B82F6] hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
