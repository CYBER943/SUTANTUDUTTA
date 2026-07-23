import React from 'react';
import { motion } from 'motion/react';

const TOOLS_DATA = [
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and collaboration.',
    slug: 'notion',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
    hasText: true,
    invert: true,
  },
  {
    name: 'CodePen',
    description: 'Online code editor and front-end web development community.',
    slug: 'codepen',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/CodePen_Logo.svg',
    hasText: true,
    invert: true,
  },
  
  {
    name: 'Todoist',
    description: 'Task management app and to-do list organizer.',
    slug: 'todoist',
    logoUrl: 'https://cdn.simpleicons.org/todoist/E44332',
    hasText: false,
    invert: false,
  },
  {
    name: 'ChatGPT',
    description: 'AI assistant for coding, debugging, brainstorming, and productivity.',
    slug: 'chatgpt',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    hasText: false,
    invert: false,
  },
  {
    name: 'Google Gemini',
    description: 'Advanced multimodal AI for reasoning, research, and creative workflows.',
    slug: 'googlegemini',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    hasText: true,
    invert: false,
  },
  {
    name: 'GitHub',
    description: 'Version control, collaboration, and open-source development.',
    slug: 'github',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg',
    hasText: false,
    invert: true,
  },
  {
    name: 'Vercel',
    description: 'Fast deployment and hosting for modern web applications.',
    slug: 'vercel',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg',
    hasText: true,
    invert: true,
  },
  {
    name: 'Canva',
    description: 'Design platform for graphics, presentations, and social media assets.',
    slug: 'canva',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Canva_logo.svg',
    hasText: true,
    invert: false,
  },
  {
    name: 'Google AI Studio',
    description: 'Platform for building and testing Gemini-powered AI applications.',
    slug: 'google',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_AI_Studio_icon_%28May_2026%29.svg',
    hasText: false,
    invert: false,
  },
  {
    name: 'Visual Studio Code',
    description: 'A powerful, extensible code editor for modern development workflows.',
    slug: 'visualstudiocode',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg',
    hasText: false,
    invert: false,
  },
];

export default function Tools() {
  return (
    <section id="tools" className="relative py-24 lg:py-32 bg-app-bg overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-app-primary/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight text-app-text mb-6">
            Tools I Use
          </h2>
          <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-app-text-secondary font-light leading-relaxed text-balance">
            The tools that power my workflow—from AI-assisted development to deployment and design.
          </p>
        </motion.div>

        {/* Tools Marquee Slider */}
        <div className="relative flex flex-col overflow-hidden py-10 -mx-6 lg:-mx-10 px-6 lg:px-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          
          <div className="flex animate-marquee gap-12 lg:gap-20 w-max hover:[animation-play-state:paused]">
            {[...TOOLS_DATA, ...TOOLS_DATA, ...TOOLS_DATA].map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="group flex items-center gap-4 transition-all duration-300 hover:scale-105 opacity-70 hover:opacity-100 cursor-pointer flex-shrink-0"
              >
                {tool.hasText ? (
                  <img 
                    src={tool.logoUrl} 
                    alt={`${tool.name} logo`}
                    className={`h-8 lg:h-10 w-auto object-contain drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,90,54,0.4)] transition-all duration-300 ${tool.invert ? 'theme-invert' : ''}`}
                    loading="lazy"
                  />
                ) : (
                  <>
                    <img 
                      src={tool.logoUrl} 
                      alt={`${tool.name} logo`}
                      className={`w-10 h-10 lg:w-12 lg:h-12 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,90,54,0.4)] transition-all duration-300 ${tool.invert ? 'theme-invert' : ''}`}
                      loading="lazy"
                    />
                    <span className="text-xl lg:text-2xl font-semibold text-app-text-secondary group-hover:text-app-text transition-colors duration-300 whitespace-nowrap">
                      {tool.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

