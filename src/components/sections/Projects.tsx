import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Github, Codepen } from 'lucide-react';
import { PROJECTS } from '../../data';
import { Project } from '../../types';

const ProjectCard = ({ project, index }: { project: Project; index: number; key?: string | number }) => {
  const prefersReducedMotion = useReducedMotion();
  const isCodePen = project.link?.includes('codepen.io');

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-card-bg rounded-3xl border border-border overflow-hidden hover:border-border-strong transition-all duration-500 hover:shadow-lg"
    >
      {/* Project Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated border-b border-border">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <Codepen size={48} className="opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Project Details */}
      <div className="flex flex-col flex-1 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono tracking-[0.2em] text-accent-primary uppercase">
            {project.category || 'Experiment'}
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1 font-light">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech?.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-bg-primary border border-border rounded-full text-xs text-text-secondary transition-colors group-hover:border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent-primary transition-colors"
            >
              <span>{isCodePen ? 'View Pen' : 'Live Demo'}</span>
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <Github size={16} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects: propProjects }: ProjectsProps = {}) {
  const prefersReducedMotion = useReducedMotion();
  const [projectList, setProjectList] = React.useState<Project[]>(propProjects || PROJECTS);

  React.useEffect(() => {
    if (propProjects) {
      setProjectList(propProjects);
      return;
    }
    fetch('/api/public/data')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(data.projects);
        }
      })
      .catch(() => {});
  }, [propProjects]);

  return (
    <section className="py-24 md:py-32 relative bg-bg-primary overflow-hidden border-t border-border" id="projects">
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight text-text-primary leading-none mb-4">
              Selected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-secondary to-text-muted">
                Work.
              </span>
            </h2>
            <p className="text-text-secondary text-lg max-w-md font-light">
              A collection of digital experiments, interactive web applications, and creative coding projects.
            </p>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
