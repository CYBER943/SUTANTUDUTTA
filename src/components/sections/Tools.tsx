import React from 'react';
import { motion } from 'motion/react';
import ToolLogo from '../ui/ToolLogo';

const TOOLS_DATA = [
  {
    name: 'Microsoft Copilot',
    description: 'AI-powered coding assistant and productivity companion.',
    slug: 'copilot',
  },
  {
    name: 'GitHub',
    description: 'Version control, collaboration, and open-source development.',
    slug: 'github',
  },
  {
    name: 'Vercel',
    description: 'Fast deployment and hosting for modern web applications.',
    slug: 'vercel',
  },
  {
    name: 'CodePen',
    description: 'Online code editor and front-end web development community.',
    slug: 'codepen',
  },
  {
    name: 'Claude',
    description: 'AI assistant for advanced reasoning, research, and analysis.',
    slug: 'claude',
  },
  {
    name: 'ChatGPT',
    description: 'AI assistant for coding, debugging, brainstorming, and productivity.',
    slug: 'chatgpt',
  },
  {
    name: 'Google Gemini',
    description: 'Advanced multimodal AI for reasoning, research, and creative workflows.',
    slug: 'googlegemini',
  },
  {
    name: 'Google AI Studio',
    description: 'Platform for building and testing Gemini-powered AI applications.',
    slug: 'googleaistudio',
  },
  {
    name: 'Visual Studio Code',
    description: 'A powerful, extensible code editor for modern development workflows.',
    slug: 'visualstudiocode',
  },
  {
    name: 'Canva',
    description: 'Design platform for graphics, presentations, and social media assets.',
    slug: 'canva',
  },
  {
    name: 'Adobe Express',
    description: 'Quick graphic design and layout creation.',
    slug: 'adobeexpress',
  },
  {
    name: 'Todoist',
    description: 'Task management app and to-do list organizer.',
    slug: 'todoist',
  },
];

export default function Tools() {
  return (
    <section id="tools" className="relative py-20 md:py-32 bg-bg-primary overflow-hidden border-t border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-glow blur-[120px] rounded-full" />
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
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight text-text-primary mb-6">
            Tools I Use
          </h2>
          <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-text-secondary font-light leading-relaxed text-balance">
            The tools that power my workflow—from AI-assisted development to deployment and design.
          </p>
        </motion.div>

        {/* Tools Marquee Slider */}
        <div className="relative flex flex-col overflow-hidden py-10 -mx-6 lg:-mx-10 px-6 lg:px-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee gap-12 lg:gap-20 w-max hover:[animation-play-state:paused]">
            {[...TOOLS_DATA, ...TOOLS_DATA, ...TOOLS_DATA].map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="group flex items-center gap-4 transition-all duration-300 hover:scale-105 opacity-80 hover:opacity-100 cursor-pointer flex-shrink-0"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <ToolLogo slug={tool.slug} name={tool.name} className="w-10 h-10 lg:w-12 lg:h-12" />
                </div>
                <span className="text-xl lg:text-2xl font-semibold text-text-secondary group-hover:text-text-primary transition-colors duration-300 whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
