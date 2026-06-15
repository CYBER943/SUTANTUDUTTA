import { motion } from 'motion/react';
import { Award, Code, BookOpen, Layers } from 'lucide-react';

const STATS = [
  { id: 1, label: 'Projects Built', value: '500+', icon: Layers },
  { id: 2, label: 'Experience', value: 'Class 10', icon: BookOpen },
  { id: 3, label: 'Designation', value: 'Full Stack', icon: Code },
  { id: 4, label: 'Awards', value: '2+', icon: Award },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            About Me.
          </h2>
          <div className="w-24 h-1 bg-app-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-app-muted font-light text-lg leading-relaxed"
          >
            <p>
              My journey into technology started with a simple curiosity about how things work on the internet. Since then, it has evolved into a deep-seated passion for web development, design, and artificial intelligence.
            </p>
            <p>
              As a Class 10 student, balancing academics and coding has been a thrilling challenge. I embrace a constant learning mindset—approaching every new framework or tool as a puzzle waiting to be solved.
            </p>
            <p>
              I take pride in writing clean, scalable code and designing interfaces that feel intuitive and premium. From participating in SOF competitions to earning MyGov certifications, my goal is always to push the boundaries of my knowledge and build tools that genuinely help people.
            </p>
          </motion.div>

          {/* Achievement Grid (Bento style) */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="bg-app-card border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-app-primary/10 rounded-xl flex items-center justify-center text-app-primary mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={20} />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-1 group-hover:text-app-primary transition-colors">
                  {stat.value}
                </h3>
                <p className="text-sm text-app-muted">{stat.label}</p>
              </motion.div>
            ))}
            
            {/* Certifications Card spanning full width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-2 bg-gradient-to-br from-app-card to-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between"
            >
              <div>
                <h4 className="text-white font-medium mb-1">Certifications & Honors</h4>
                <p className="text-sm text-app-muted">Recognized by SOF & MyGov India</p>
              </div>
              <div className="w-12 h-12 bg-app-secondary/20 rounded-full flex items-center justify-center text-app-secondary">
                <Award size={24} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
