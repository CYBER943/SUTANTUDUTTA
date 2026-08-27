import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Fingerprint, Activity, Globe, Compass, Bot, Code, Layout, Sparkles, PenTool, Book, GraduationCap, BookOpen, Lightbulb, Layers } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';
import { TIMELINE_EVENTS, CURRENT_INTERESTS } from '../../data';
import { useRef } from 'react';

const WHAT_I_LOVE_BUILDING = [
  { id: 1, title: 'AI Applications', icon: Bot, desc: 'Intelligent, automated, and context-aware systems.' },
  { id: 2, title: 'Modern Websites', icon: Globe, desc: 'Fast, responsive, and beautifully designed digital spaces.' },
  { id: 3, title: 'Interactive User Interfaces', icon: Layout, desc: 'Engaging, fluid, and intuitive frontend experiences.' },
  { id: 4, title: 'Experimental Projects', icon: Sparkles, desc: 'Pushing boundaries with new tech and creative ideas.' },
  { id: 5, title: 'Creative Digital Experiences', icon: PenTool, desc: 'Blending design and code to craft memorable interactions.' },
];

const SKILLS = [
  "Artificial Intelligence",
  "Web Development",
  "JavaScript",
  "Python",
  "React",
  "Next.js",
  "UI/UX",
  "Creative Coding"
];

const BEYOND_CODE = [
  { id: 1, title: "Reading books", icon: Book },
  { id: 2, title: "Academics", icon: GraduationCap },
  { id: 3, title: "Learning new concepts", icon: BookOpen },
  { id: 4, title: "Exploring new ideas", icon: Lightbulb },
  { id: 5, title: "Creative experimentation", icon: Layers },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-20 md:py-32 relative bg-app-bg overflow-hidden border-t border-app-border-light" id="about">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-red-600/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* 1. INTRODUCTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-start"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Fingerprint className="text-app-primary" size={24} />
            <span className="text-app-primary font-mono text-sm tracking-widest uppercase">About Me</span>
          </div>
          
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold tracking-tight text-app-text leading-[1.15] mb-8">
            <TextReveal text="Hi, I'm SUTANTU DUTTA —" />
            <br />
            <span className="text-app-text-secondary"><TextReveal text="a Class 10 student and AI Developer passionate about building intelligent applications and modern digital experiences." /></span>
          </h2>
          
          <p className="text-app-text-secondary text-xl leading-relaxed max-w-4xl font-light">
            I enjoy experimenting with Artificial Intelligence, developing modern websites, learning cutting-edge technologies, and turning ambitious ideas into working digital projects. Whether it's crafting a smooth user interface or integrating smart AI features, I love the entire process of bringing concepts to life through code.
          </p>
        </motion.div>

        {/* 6. DEVELOPER PHILOSOPHY */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 relative p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-red-900/10 to-orange-900/5 border border-red-500/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="text-[clamp(2rem,6vw,4rem)] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-red-500 mb-6 tracking-tighter italic">
              "Learn. Build. Experiment. Repeat."
            </h3>
            <p className="text-app-text-secondary text-xl max-w-2xl font-light leading-relaxed">
              I believe the best way to learn technology is by actually building things. Experimenting, making mistakes, and continuously improving is at the core of my developer journey.
            </p>
          </div>
        </motion.div>

        {/* 3. WHAT I LOVE BUILDING */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <Code className="text-app-primary" size={32} />
            <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-app-text">
              What I Love Building
            </h3>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_I_LOVE_BUILDING.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-3xl bg-app-bg-secondary border border-app-border hover:bg-app-card hover:border-red-500/30 transition-all duration-500 shadow-xl"
              >
                <div className="w-14 h-14 bg-app-card border border-app-border rounded-2xl flex items-center justify-center text-app-text-secondary mb-6 group-hover:bg-red-500/10 group-hover:text-red-400 group-hover:scale-110 transition-all duration-500">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold font-display text-app-text mb-3 group-hover:text-red-100 transition-colors">{item.title}</h4>
                <p className="text-app-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 7. SKILLS SNAPSHOT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-display font-bold tracking-tight text-app-text mb-8">
            Skills & Technologies I'm Exploring
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map((skill, idx) => (
              <motion.span 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 rounded-full bg-app-card border border-app-border text-app-text-secondary text-sm font-medium hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-100 transition-colors cursor-default shadow-lg"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 4. MY CURRENT FOCUS */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <Activity className="text-app-primary mb-4" size={24} />
            <h3 className="text-3xl font-display font-bold tracking-tight text-app-text mb-4">
              Current Focus
            </h3>
            <p className="text-app-text-secondary text-lg">What I'm exploring and actively mastering right now.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CURRENT_INTERESTS.map((interest, idx) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-app-bg-secondary border border-app-border rounded-3xl p-6 text-center hover:border-app-primary/50 hover:bg-app-card hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-app-primary/0 to-app-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 mx-auto bg-app-card border border-app-border rounded-2xl flex items-center justify-center text-app-text-secondary mb-6 group-hover:bg-app-primary/20 group-hover:text-app-primary group-hover:scale-110 transition-all duration-500 shadow-xl">
                  <interest.icon size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-app-text font-medium text-base mb-2 relative z-10">{interest.title}</h4>
                <div className="inline-block px-3 py-1 rounded-full bg-app-card border border-app-border text-[10px] uppercase tracking-widest font-medium text-app-primary relative z-10">
                  {interest.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. MY DEVELOPER JOURNEY (Timeline) */}
        <div className="mb-40" ref={timelineRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-20"
          >
            <Compass className="text-app-primary mb-4" size={24} />
            <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight text-app-text mb-4">
              My Developer Journey
            </h3>
            <p className="text-app-text-secondary text-lg max-w-xl mx-auto">
              A chronological map of my evolution as a student developer.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated Timeline Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-app-card md:-translate-x-1/2 rounded-full overflow-hidden">
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
                <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-app-bg border-2 border-app-border md:-translate-x-1/2 mt-1.5 z-10 group-hover:border-red-500 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-500" />
                
                {/* Content */}
                <div className={`pl-16 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                  <span className="inline-block text-app-primary text-sm font-mono tracking-widest font-semibold uppercase mb-4 py-1 px-3 bg-red-500/10 rounded-full border border-red-500/20">{event.year}</span>
                  <h4 className="text-2xl font-display font-bold text-app-text mb-4 group-hover:text-red-400 transition-colors">{event.title}</h4>
                  <p className="text-app-text-secondary text-base leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. PERSONAL SIDE (Beyond Code) */}
        <div className="mb-40">
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight text-app-text mb-4">
              Beyond Code
            </h3>
            <p className="text-app-text-secondary text-lg max-w-xl mx-auto">
              What I do when I'm not in front of an IDE.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
             {BEYOND_CODE.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center p-8 bg-app-bg-secondary border border-app-border-light rounded-3xl text-center group hover:bg-app-card hover:border-app-border transition-all duration-500"
                >
                    <item.icon className="w-10 h-10 text-app-muted mb-6 group-hover:text-app-text group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                    <span className="text-sm text-app-text-secondary font-medium">{item.title}</span>
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
        >
          <div className="flex flex-col items-center text-center mb-16">
            <Globe className="text-app-primary mb-4" size={24} />
            <h3 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold tracking-tight text-app-text mb-4">
              Explore My Code
            </h3>
            <p className="text-app-text-secondary text-lg">Deep dive into my open source work and experiments.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CodePen Card */}
            <motion.a 
              href="https://codepen.io/SDM-TECH-KNOW" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -10 }}
              className="group relative bg-app-bg-secondary border border-app-border p-10 md:p-12 rounded-[3rem] overflow-hidden hover:border-app-border transition-all duration-500 block shadow-2xl"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-colors duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-16 h-16 bg-app-card border border-app-border rounded-2xl flex items-center justify-center text-app-text group-hover:scale-110 group-hover:bg-app-text group-hover:text-app-bg transition-all duration-500">
                  <svg viewBox="0 0 138 26" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M15 8a7 7 0 100 10m0-10v10M15 8l-7 5 7 5M15 8l7 5-7 5"></path>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary group-hover:bg-app-text group-hover:text-app-bg group-hover:-rotate-45 transition-all duration-500">
                  <ChevronRight size={18} />
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm font-mono text-app-muted mb-3">@SDM-TECH-KNOW</p>
                <h4 className="text-4xl font-display font-bold text-app-text mb-10">CodePen</h4>
                
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-full bg-app-card border border-app-border text-app-text font-medium">500+ Pens</div>
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
              className="group relative bg-app-bg-secondary border border-app-border p-10 md:p-12 rounded-[3rem] overflow-hidden hover:border-app-border transition-all duration-500 block shadow-2xl"
            >
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-16 h-16 bg-app-card border border-app-border rounded-2xl flex items-center justify-center text-app-text group-hover:scale-110 group-hover:bg-app-text group-hover:text-app-bg transition-all duration-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-app-card border border-app-border flex items-center justify-center text-app-text-secondary group-hover:bg-app-text group-hover:text-app-bg group-hover:-rotate-45 transition-all duration-500">
                  <ChevronRight size={18} />
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm font-mono text-app-muted mb-3">@Sdm940</p>
                <h4 className="text-4xl font-display font-bold text-app-text mb-10">GitHub</h4>
                
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5 p-2 rounded-xl bg-app-card border border-app-border">
                    {[...Array(6)].map((_, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-1.5">
                        {[...Array(3)].map((_, rowIndex) => (
                          <div 
                            key={rowIndex} 
                            className={`w-2.5 h-2.5 rounded-sm ${Math.random() > 0.6 ? 'bg-green-500/60' : Math.random() > 0.3 ? 'bg-green-500/30' : 'bg-app-card'}`} 
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
