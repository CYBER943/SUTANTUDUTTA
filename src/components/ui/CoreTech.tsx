import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const TECH_CATEGORIES = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90, color: 'bg-accent-primary' },
      { name: 'TypeScript', level: 85, color: 'bg-accent-primary' },
    ]
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 80, color: 'bg-accent-primary' },
    ]
  },
  {
    name: 'AI/ML',
    skills: [
      { name: 'Python', level: 75, color: 'bg-accent-primary' },
      { name: 'Claude API', level: 85, color: 'bg-accent-primary' },
    ]
  }
];

export function CoreTech() {
  const handleTechClick = (techName: string) => {
    // Dispatch custom event for Projects component to catch
    window.dispatchEvent(new CustomEvent('filter-tech', { detail: techName }));
    // Navigate to projects section
    window.location.hash = '#projects';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="w-full mt-14 pt-8 border-t border-border"
    >
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <span className="text-sm font-medium text-text-muted uppercase tracking-widest">Core Tech</span>
        <a href="#tools" className="text-xs font-medium text-accent-primary hover:text-accent-secondary transition-colors flex items-center gap-1 group">
          Learn more <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {TECH_CATEGORIES.map((category, catIdx) => (
          <motion.div 
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + (catIdx * 0.1) }}
            className="flex flex-col md:flex-row md:items-center gap-3"
          >
            <div className="w-24 shrink-0">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{category.name}</span>
            </div>
            <div className="flex flex-wrap gap-3 flex-1">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + (catIdx * 0.1) + (skillIdx * 0.1) }}
                  onClick={() => handleTechClick(skill.name)}
                  className="group relative cursor-pointer flex flex-col gap-1.5 p-3 rounded-xl border border-border bg-card-bg hover:bg-surface-elevated hover:border-border transition-all w-[140px]"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-primary font-medium group-hover:text-accent-primary transition-colors">{skill.name}</span>
                    <span className="text-text-muted font-mono text-[10px]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 + (catIdx * 0.1) + (skillIdx * 0.1), ease: "easeOut" }}
                      className={`h-full ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
