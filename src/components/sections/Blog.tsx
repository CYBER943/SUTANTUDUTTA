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

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const recentPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <section id="blog" className="py-32 relative overflow-hidden bg-[#020817] border-t border-white/[0.05]">
      {/* Background Ambience */}
      <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-orange-500/5 blur-[200px] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32 flex flex-col items-start"
        >
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="text-app-primary" size={24} />
            <span className="text-app-primary font-mono text-sm tracking-widest uppercase">Journal</span>
          </div>
          <h2 className="text-[clamp(3rem,8vw,5rem)] font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
            <TextReveal text="Thoughts &" />
            <br />
            <span className="text-white/30"><TextReveal text="Discoveries." /></span>
          </h2>
        </motion.div>

        {/* Filters and Search - Premium Floating Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-20 bg-white/[0.02] border border-white/10 p-4 rounded-3xl backdrop-blur-xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-all"
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
              className="space-y-16"
            >
              {/* Featured Post - Magazine Style */}
              {featuredPost && (
                <div className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                  <div className="w-full lg:w-3/5 h-[400px] lg:h-[600px] relative overflow-hidden rounded-[3rem] bg-[#0A0A0A] border border-white/10">
                    {/* Abstract placeholder visual for featured post */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/5 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute bottom-10 left-10 right-10 top-10 border border-white/10 rounded-[2rem] pointer-events-none" />
                  </div>
                  
                  <div className="w-full lg:w-2/5 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-8">
                      <span className="text-xs font-mono font-medium text-red-400 bg-red-400/10 px-4 py-1.5 rounded-full border border-red-400/20 uppercase tracking-widest">
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight group-hover:text-red-400 transition-colors duration-500">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-white/50 text-lg leading-relaxed mb-10">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
                       <div className="flex items-center space-x-6 text-sm text-white/40 font-mono">
                        <span className="flex items-center"><Calendar size={14} className="mr-2" />{featuredPost.date}</span>
                        <span className="flex items-center"><Clock size={14} className="mr-2" />{featuredPost.readTime}</span>
                      </div>
                      <button className="group/btn flex items-center text-sm font-medium text-white hover:text-red-400 transition-colors">
                        Read Article 
                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center ml-3 group-hover/btn:border-red-400 group-hover/btn:bg-red-400/10 transition-all">
                          <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Recent Posts - Editorial Minimalist */}
              {recentPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pt-20 border-t border-white/5">
                  {recentPosts.map((post, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      key={post.id}
                      className="group flex flex-col"
                    >
                      <div className="h-64 mb-8 relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">
                            {post.category}
                          </span>
                        </div>
                        
                        <h4 className="text-2xl font-display font-bold text-white mb-4 leading-tight group-hover:text-red-400 transition-colors">
                          {post.title}
                        </h4>
                        
                        <p className="text-base text-white/50 leading-relaxed line-clamp-3 mb-8 flex-grow">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                           <div className="flex items-center space-x-3 text-xs text-white/40 font-mono">
                            <span className="flex items-center">{post.date}</span>
                          </div>
                          <span className="text-sm font-medium text-white flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Read <ArrowRight size={14} className="ml-1" />
                          </span>
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
              className="text-center py-32 bg-[#0A0A0A] border border-white/10 rounded-[3rem]"
            >
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white/30">
                <Search size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">No articles found</h3>
              <p className="text-white/50 text-lg mb-8">We couldn't find anything matching "{searchQuery}" in {activeCategory}.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="text-white font-medium bg-white/10 px-8 py-3 rounded-full hover:bg-white/20 transition-colors"
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
