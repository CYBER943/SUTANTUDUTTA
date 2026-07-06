import { motion } from 'motion/react';
import { Award, Code, BookOpen, Layers, ChevronRight } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';
import { TIMELINE_EVENTS, CURRENT_INTERESTS } from '../../data';

const STATS = [
  { id: 1, label: 'Projects Built', value: '500+', icon: Layers },
  { id: 2, label: 'Experience', value: 'Class 10', icon: BookOpen },
  { id: 3, label: 'Designation', value: 'Full Stack', icon: Code },
  { id: 4, label: 'Awards', value: '2+', icon: Award },
];

export default function About() {
  return (
    <section className="py-24 relative bg-app-bg" id="about">
      <div className="w-full max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-display font-bold tracking-tight text-white mb-4">
            <TextReveal text="About Me" />
          </h2>
          <p className="text-app-text-secondary text-lg max-w-2xl font-light">
            A glimpse into my journey, mindset, and the milestones I've achieved so far.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-32">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-6 text-app-text-secondary font-light text-[17px] leading-relaxed"
          >
            <div className="text-white text-xl font-medium tracking-tight">
              <TextReveal text="I believe the best products live at the intersection of rigorous engineering and thoughtful design." />
            </div>
            <p>
              I started coding out of a simple curiosity to understand how the internet works. That curiosity quickly evolved into an obsession with building digital tools that don't just function, but feel great to use.
            </p>
            <p>
              Though I am currently a Class 10 student, my approach to development is entirely professional. I am deeply passionate about <strong>AI</strong>, <strong>Web Development</strong>, and <strong>Cybersecurity</strong>. Beyond the screen, I find balance and focus through <strong>Cycling</strong>, which fuels my mindset for <strong>Continuous Learning</strong>.
            </p>
            <p>
              I treat every project—whether it's a UI concept or a full-stack application—as an opportunity to push my boundaries in architecture, performance, and interaction design. My focus is on creating premium, accessible, and highly interactive experiences.
            </p>
          </motion.div>

          {/* Achievement Grid (Bento style) */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + idx * 0.1 }}
                className="bg-app-card border border-app-border p-6 rounded-2xl hover:bg-app-elevated hover:border-app-primary transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-8 group-hover:scale-105 group-hover:bg-app-primary/10 group-hover:text-app-primary transition-all">
                  <stat.icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold tracking-tight text-white mb-1 group-hover:text-app-primary transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-app-text-secondary">{stat.label}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Certifications Card spanning full width */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="col-span-2 bg-app-card border border-app-border p-6 rounded-2xl flex items-center justify-between hover:bg-app-elevated hover:border-app-primary transition-all duration-300 group"
            >
              <div>
                <h4 className="text-white font-medium mb-1 group-hover:text-app-primary transition-colors">Certifications & Honors</h4>
                <p className="text-sm text-app-text-secondary">Recognized by SOF & MyGov India</p>
              </div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-app-primary/10 group-hover:text-app-primary transition-all">
                <Award size={20} strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interests & Continuous Learning */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-12"
          >
            <h3 className="text-2xl font-display font-bold tracking-tight text-white mb-2">
              Current Interests
            </h3>
            <p className="text-app-text-secondary">What I'm exploring and actively learning.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CURRENT_INTERESTS.map((interest, idx) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-app-card border border-app-border rounded-2xl p-6 text-center hover:bg-app-elevated hover:border-app-primary hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white mb-4 group-hover:bg-app-primary/20 group-hover:text-app-primary transition-colors">
                  <interest.icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{interest.title}</h4>
                <p className="text-[10px] uppercase tracking-widest font-medium text-app-primary">{interest.status}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h3 className="text-2xl font-display font-bold tracking-tight text-white mb-2">
              The Journey So Far
            </h3>
            <p className="text-app-text-secondary">A timeline of consistent growth and exploration.</p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start mb-12 group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 rounded-full bg-app-bg border-2 border-app-primary md:-translate-x-[5px] mt-1.5 z-10 group-hover:bg-app-primary group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300" />
                
                <div className={`pl-8 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <span className="text-app-primary text-xs font-mono tracking-wider font-semibold uppercase mb-2 block">{event.year}</span>
                  <h4 className="text-white text-lg font-medium tracking-tight mb-2">{event.title}</h4>
                  <p className="text-app-text-secondary text-sm leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Profiles Integration */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h3 className="text-2xl font-display font-bold tracking-tight text-white mb-2">
              Developer Profiles
            </h3>
            <p className="text-app-text-secondary">Where I share my code and experiments.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* CodePen Card */}
            <motion.a 
              href="https://codepen.io/SDM-TECH-KNOW" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-app-card border border-app-border p-8 rounded-[2rem] overflow-hidden hover:border-app-primary hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300 block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-red-500/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:text-app-primary group-hover:border-app-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 138 26" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M15 8a7 7 0 100 10m0-10v10M15 8l-7 5 7 5M15 8l7 5-7 5"></path>
                  </svg>
                </div>
                <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                  <span>Visit Profile</span>
                  <ChevronRight size={14} />
                </div>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-medium tracking-tight text-white mb-1 group-hover:text-app-primary transition-colors">CodePen</h4>
                <p className="text-sm text-app-text-secondary mb-8">@SDM-TECH-KNOW</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-display font-semibold tracking-tight text-white">500+</p>
                    <p className="text-xs text-app-text-secondary mt-1">Pens & Projects</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-display font-semibold tracking-tight text-white">Active</p>
                    <p className="text-xs text-app-text-secondary mt-1">Creator</p>
                  </div>
                </div>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a 
              href="https://github.com/Sdm940" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-app-card border border-app-border p-8 rounded-[2rem] overflow-hidden hover:border-app-primary hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300 block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-red-500/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:text-app-primary group-hover:border-app-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                </div>
                <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                  <span>Visit Profile</span>
                  <ChevronRight size={14} />
                </div>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-medium tracking-tight text-white mb-1 group-hover:text-app-primary transition-colors">GitHub</h4>
                <p className="text-sm text-app-text-secondary mb-8">@Sdm940</p>
                
                {/* GitHub Contribution style graph */}
                <div className="flex gap-1.5 mb-4">
                  {[...Array(8)].map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-1.5">
                      {[...Array(4)].map((_, rowIndex) => (
                        <div 
                          key={rowIndex} 
                          className={`w-3 h-3 rounded-sm ${Math.random() > 0.6 ? 'bg-white/40' : Math.random() > 0.3 ? 'bg-white/20' : 'bg-white/5'}`} 
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-app-text-secondary flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-app-primary animate-pulse" />
                  <span className="group-hover:text-white transition-colors">Actively Contributing</span>
                </p>
              </div>
            </motion.a>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
