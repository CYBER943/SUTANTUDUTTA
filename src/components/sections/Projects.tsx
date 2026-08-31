import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../data';
import { Project } from '../../types';

const FeaturedProject = ({ project, index }: { project: Project; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col lg:flex-row gap-8 lg:gap-12 bg-app-card rounded-[2rem] border border-app-border p-6 lg:p-8 hover:border-app-primary/30 hover:shadow-[0_8px_30px_rgba(234,88,12,0.05)] active:scale-[0.98] transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-app-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Side */}
      <div className="w-full lg:w-3/5 rounded-2xl overflow-hidden relative bg-app-bg aspect-video border border-app-border z-10">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-app-elevated text-app-muted">
            No Preview Available
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono tracking-[0.2em] text-app-primary uppercase font-semibold">
            Featured Project
          </span>
          <span className="w-1 h-1 rounded-full bg-app-border" />
          <span className="text-xs font-mono tracking-[0.2em] text-app-text-secondary uppercase">
            0{index + 1}
          </span>
        </div>

        <h3 className="text-3xl lg:text-4xl font-display font-bold text-app-text mb-2 group-hover:text-app-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm font-mono text-app-text-secondary mb-6 tracking-wide uppercase opacity-80">
          {project.category}
        </p>

        <p className="text-app-text-secondary leading-relaxed mb-8">
          {project.description}
          {project.problem && <span className="block mt-2">{project.problem}</span>}
          {project.lessonsLearned && <span className="block mt-2 text-app-muted italic">Learned: {project.lessonsLearned}</span>}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, idx) => (
            <span key={idx} className="text-xs font-mono tracking-wider font-medium text-app-muted bg-app-bg px-3 py-1.5 rounded-full border border-app-border">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4">
          {(project.link || project.codepen) && (
            <a
              href={project.link || project.codepen}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-app-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-app-primary-hover hover:-translate-y-0.5 transition-all shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] group/btn"
              aria-label={`Live Demo of ${project.title}`}
            >
              Live Demo
              <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-app-text bg-app-bg border border-app-border hover:bg-app-elevated hover:border-app-text-secondary hover:-translate-y-0.5 transition-all group/source"
              aria-label={`Source code of ${project.title}`}
            >
              <Github size={16} />
              Source <ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover/source:opacity-100 group-hover/source:ml-0 transition-all text-app-muted" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-app-card rounded-3xl border border-app-border hover:border-app-primary/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,88,12,0.05)] active:scale-[0.98] transition-all duration-500 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-app-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      {/* Image Area */}
      <div className="w-full aspect-video overflow-hidden border-b border-app-border relative z-10 bg-app-bg">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-app-elevated text-app-muted">
            No Preview
          </div>
        )}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-[10px] font-mono tracking-[0.2em] text-app-bg bg-app-text px-2.5 py-1 rounded-full uppercase font-bold shadow-md">
            0{index + 1}
          </span>
          {project.category.includes('AI') && (
            <span className="text-[10px] font-mono tracking-[0.2em] text-app-bg bg-app-primary px-2.5 py-1 rounded-full uppercase font-bold shadow-md">
              AI
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow z-10">
        <p className="text-xs font-mono text-app-primary tracking-[0.2em] uppercase mb-2 font-semibold">
          {project.category}
        </p>
        
        <h3 className="text-xl font-display font-bold text-app-text mb-3 group-hover:text-app-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-app-text-secondary leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tech.slice(0, 3).map((t, idx) => (
            <span key={idx} className="text-[10px] font-mono tracking-[0.2em] font-medium text-app-muted bg-app-bg px-2.5 py-1 rounded-full border border-app-border">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] font-mono tracking-[0.2em] font-medium text-app-muted bg-app-bg px-2.5 py-1 rounded-full border border-app-border">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="pt-5 border-t border-app-border flex items-center gap-4">
          {(project.link || project.codepen) && (
            <a
              href={project.link || project.codepen}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-app-text hover:text-app-primary transition-colors flex items-center gap-1.5 group/link"
              aria-label={`Live Demo of ${project.title}`}
            >
              Demo <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-app-muted hover:text-app-text transition-colors flex items-center gap-1.5"
              aria-label={`Source code of ${project.title}`}
            >
              <Github size={14} /> Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const prefersReducedMotion = useReducedMotion();
  const featuredProject = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  return (
    <section id="projects" className="py-24 relative z-10 bg-app-bg">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono tracking-[0.2em] text-app-primary uppercase font-semibold">
              01 / PROJECTS
            </span>
            <div className="h-px bg-app-border flex-grow max-w-[100px]" />
          </div>
          
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold text-app-text tracking-tight leading-[1.1] mb-6">
            Selected Projects
          </h2>
          
          <p className="text-lg md:text-xl text-app-text-secondary max-w-2xl font-light leading-relaxed">
            Things I've built, experimented with, and learned from.
          </p>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-8 md:mb-12">
            <FeaturedProject project={featuredProject} index={0} />
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {gridProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 md:mt-32 pt-12 border-t border-app-border flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-app-primary animate-pulse" />
            <p className="text-app-text-secondary text-sm font-mono tracking-widest uppercase">Want to see more?</p>
          </div>
          <a
            href="https://github.com/Sdm940"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-app-text font-display font-bold text-lg md:text-xl hover:text-app-primary transition-colors"
          >
            Explore all projects
            <div className="w-10 h-10 rounded-full border border-app-border flex items-center justify-center group-hover:border-app-primary group-hover:bg-app-primary/10 transition-all">
              <ExternalLink size={16} className="group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Projects;
