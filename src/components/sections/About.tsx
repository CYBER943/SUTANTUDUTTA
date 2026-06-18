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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-6 text-app-muted font-light text-lg leading-relaxed"
          >
            <p>
              I am a student developer who enjoys creating websites, experimenting with technology, and learning through hands-on projects.
            </p>
            <p>
              My journey into technology started with a simple curiosity about how things work on the internet. Since then, it has evolved into a deep-seated passion—focusing on web development, artificial intelligence, user experience design, and creative problem-solving.
            </p>
            <p>
              As a Class 10 student, balancing academics and coding has been a thrilling challenge. I embrace a constant learning mindset—approaching every new framework or tool as a puzzle waiting to be solved.
            </p>
            <p>
              Through continuous experimentation and project building, I have developed hundreds of interactive applications, UI concepts, and educational tools. I take pride in writing clean, scalable code and designing interfaces that feel intuitive and premium. From participating in SOF competitions to earning MyGov certifications, my goal is always to push the boundaries of my knowledge and build tools that genuinely help people.
            </p>
          </motion.div>

          {/* Achievement Grid (Bento style) */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + idx * 0.1 }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
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

        {/* Professional Profiles Integration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center md:text-left">
            Developer Profiles.
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* CodePen Card */}
            <div className="group relative bg-app-card border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-colors pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-white/10 transition-colors">
                  <svg viewBox="0 0 138 26" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M15 8a7 7 0 100 10m0-10v10M15 8l-7 5 7 5M15 8l7 5-7 5"></path>
                  </svg>
                </div>
                <a href="https://codepen.io/SDM-TECH-KNOW" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
                  <span>Visit Profile</span>
                  <BookOpen size={14} className="hidden sm:block" />
                </a>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-1">CodePen</h4>
                <p className="text-sm text-app-muted mb-6">@SDM-TECH-KNOW</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-2xl font-display font-bold text-white">500+</p>
                    <p className="text-xs text-app-muted uppercase tracking-wider">Pens & Projects</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-display font-bold text-white">Active</p>
                    <p className="text-xs text-app-muted uppercase tracking-wider">Creator</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="group relative bg-app-card border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 blur-3xl rounded-full group-hover:bg-white/20 transition-colors pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-white/10 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                </div>
                <a href="https://github.com/Sdm940" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
                  <span>Visit Profile</span>
                  <Code size={14} className="hidden sm:block" />
                </a>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-1">GitHub</h4>
                <p className="text-sm text-app-muted mb-6">@Sdm940</p>
                
                {/* GitHub Contribution style graph */}
                <div className="flex gap-1 mb-4">
                  {[...Array(7)].map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-1">
                      {[...Array(4)].map((_, rowIndex) => (
                        <div 
                          key={rowIndex} 
                          className={`w-3 h-3 rounded-sm ${Math.random() > 0.6 ? 'bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : Math.random() > 0.3 ? 'bg-green-500/40' : 'bg-white/5'}`} 
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-app-muted flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse" />
                  <span>Actively Contributing</span>
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
