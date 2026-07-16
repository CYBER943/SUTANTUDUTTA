import { motion, useScroll, useTransform } from 'motion/react';
import { Award, Code, BookOpen, Layers, ChevronRight, Fingerprint, Activity, Globe, Compass } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';
import { TIMELINE_EVENTS, CURRENT_INTERESTS } from '../../data';
import { useRef } from 'react';

const STATS = [
  { id: 1, label: 'Projects Built', value: '500+', icon: Layers, desc: 'Interactive prototypes and apps' },
  { id: 2, label: 'Experience', value: 'Class 10', icon: BookOpen, desc: 'Continuous learner' },
  { id: 3, label: 'Designation', value: 'Full Stack', icon: Code, desc: 'End-to-end architecture' },
  { id: 4, label: 'Awards', value: '2+', icon: Award, desc: 'National level recognition' },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-32 relative bg-[#020817] overflow-hidden" id="about">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-red-600/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 flex flex-col items-start"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Fingerprint className="text-app-primary" size={24} />
            <span className="text-app-primary font-mono text-sm tracking-widest uppercase">Identity</span>
          </div>
          <h2 className="text-[clamp(3rem,8vw,5rem)] font-display font-bold tracking-tight text-white leading-[1.1]">
            <TextReveal text="Driven by curiosity." />
            <br />
            <span className="text-white/30"><TextReveal text="Defined by craft." /></span>
          </h2>
        </motion.div>

        {/* Editorial Story Section */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32 items-start mb-40">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-32"
          >
            <h3 className="text-3xl font-display font-medium text-white leading-tight mb-8">
              "I believe the best products live at the intersection of rigorous engineering and thoughtful design."
            </h3>
            
            <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
              <p>
                I started coding out of a simple curiosity to understand how the internet works. That curiosity quickly evolved into an obsession with building digital tools that don't just function, but feel great to use.
              </p>
              <p>
                Though I am currently a Class 10 student, my approach to development is entirely professional. I am deeply passionate about <strong>AI</strong>, <strong>Web Development</strong>, and <strong>Cybersecurity</strong>. 
              </p>
            </div>
          </motion.div>

          {/* Premium Bento Stats Grid */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white/[0.02] border border-white/10 p-8 rounded-3xl overflow-hidden hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 mb-12 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <stat.icon size={20} strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-4xl font-display font-bold text-white mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {stat.value}
                  </h4>
                  <p className="text-white/80 font-medium mb-1">{stat.label}</p>
                  <p className="text-sm text-white/40">{stat.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Certifications Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="sm:col-span-2 group relative bg-gradient-to-br from-red-900/20 to-orange-900/10 border border-red-500/20 p-8 rounded-3xl overflow-hidden hover:border-red-500/40 transition-all duration-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
              
              <div className="relative z-10">
                <h4 className="text-2xl font-display font-bold text-white mb-2">Honors & Certifications</h4>
                <p className="text-white/60">Officially recognized by SOF & MyGov India for excellence.</p>
              </div>
              
              <div className="relative z-10 w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                <Award size={28} strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interests & Skills - Cinematic Grid */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <Activity className="text-app-primary mb-4" size={24} />
            <h3 className="text-3xl font-display font-bold tracking-tight text-white mb-4">
              Current Focus
            </h3>
            <p className="text-white/50 text-lg">What I'm exploring and actively mastering right now.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CURRENT_INTERESTS.map((interest, idx) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 text-center hover:border-app-primary/50 hover:bg-white/[0.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-app-primary/0 to-app-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 mb-6 group-hover:bg-app-primary/20 group-hover:text-app-primary group-hover:scale-110 transition-all duration-500 shadow-xl">
                  <interest.icon size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-white font-medium text-base mb-2 relative z-10">{interest.title}</h4>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-medium text-app-primary relative z-10">
                  {interest.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Timeline */}
        <div className="mb-40" ref={timelineRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-20"
          >
            <Compass className="text-app-primary mb-4" size={24} />
            <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight text-white mb-4">
              The Journey
            </h3>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              A chronological map of my evolution as a developer.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated Timeline Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-500 via-orange-500 to-red-500"
                style={{ height: "100%", scaleY: pathLength, transformOrigin: "top" }}
              />
            </div>
            
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start mb-16 md:mb-24 group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-[#020817] border-2 border-white/20 md:-translate-x-1/2 mt-1.5 z-10 group-hover:border-red-500 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-500" />
                
                {/* Content */}
                <div className={`pl-16 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                  <span className="inline-block text-app-primary text-sm font-mono tracking-widest font-semibold uppercase mb-4 py-1 px-3 bg-red-500/10 rounded-full border border-red-500/20">{event.year}</span>
                  <h4 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-red-400 transition-colors">{event.title}</h4>
                  <p className="text-white/50 text-base leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Profiles - Immersive Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex flex-col items-center text-center mb-16">
            <Globe className="text-app-primary mb-4" size={24} />
            <h3 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold tracking-tight text-white mb-4">
              Explore My Code
            </h3>
            <p className="text-white/50 text-lg">Deep dive into my open source work and experiments.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CodePen Card */}
            <motion.a 
              href="https://codepen.io/SDM-TECH-KNOW" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -10 }}
              className="group relative bg-[#0A0A0A] border border-white/10 p-10 md:p-12 rounded-[3rem] overflow-hidden hover:border-white/30 transition-all duration-500 block shadow-2xl"
            >
              {/* Animated abstract background */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-colors duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg viewBox="0 0 138 26" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M15 8a7 7 0 100 10m0-10v10M15 8l-7 5 7 5M15 8l7 5-7 5"></path>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:-rotate-45 transition-all duration-500">
                  <ChevronRight size={18} />
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm font-mono text-white/40 mb-3">@SDM-TECH-KNOW</p>
                <h4 className="text-4xl font-display font-bold text-white mb-10">CodePen</h4>
                
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium">500+ Pens</div>
                  <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium flex items-center gap-2">
                    <Activity size={14} /> Active Creator
                  </div>
                </div>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a 
              href="https://github.com/Sdm940" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -10 }}
              className="group relative bg-[#0A0A0A] border border-white/10 p-10 md:p-12 rounded-[3rem] overflow-hidden hover:border-white/30 transition-all duration-500 block shadow-2xl"
            >
              {/* Animated abstract background */}
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:-rotate-45 transition-all duration-500">
                  <ChevronRight size={18} />
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm font-mono text-white/40 mb-3">@Sdm940</p>
                <h4 className="text-4xl font-display font-bold text-white mb-10">GitHub</h4>
                
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                    {[...Array(6)].map((_, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-1.5">
                        {[...Array(3)].map((_, rowIndex) => (
                          <div 
                            key={rowIndex} 
                            className={`w-2.5 h-2.5 rounded-sm ${Math.random() > 0.6 ? 'bg-green-500/60' : Math.random() > 0.3 ? 'bg-green-500/30' : 'bg-white/5'}`} 
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
