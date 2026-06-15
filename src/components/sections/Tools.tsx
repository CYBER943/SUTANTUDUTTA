import { TOOLS } from '../../data';
import { motion } from 'motion/react';

export default function Tools() {
  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Tools & Stack.
          </h2>
          <p className="text-app-muted max-w-2xl mx-auto">
            The software, frameworks, and AI assistants I use daily to design, build, and ship products at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOOLS.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-app-card border border-white/10 rounded-3xl p-6"
            >
              <h3 className="text-sm font-semibold text-app-muted uppercase tracking-wider mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-default"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-white shadow-sm border border-white/5">
                      <item.icon size={18} />
                    </div>
                    <span className="font-medium text-white">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative bg element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-app-secondary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
