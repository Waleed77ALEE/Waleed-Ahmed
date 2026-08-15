import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { FolderGit2, ExternalLink, Github, ArrowUpRight, Code, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { Project } from '../types';
import { generateImageAltText } from '../lib/seo';

interface ProjectsProps {
  onNavigateContact?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigateContact }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack & Web', 'AI Apps', 'SEO & Tools', 'Automation & APIs'];

  const filteredProjects = filter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden bg-grid-pattern">
      {/* Background Accent Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Portfolio Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <FolderGit2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 shrink-0" />
            <span>Handcrafted Software &amp; Web Platforms</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Selected engineering case studies demonstrating full-stack architecture, AI SDK integration, and technical SEO performance optimization.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`relative px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                className="group bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-xl cursor-pointer"
                onClick={() => setSelectedCaseStudy(project)}
              >
                <div>
                  {/* Project Image Container */}
                  <div className="relative h-60 overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={generateImageAltText(project.title, project.category)}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {project.metrics && (
                      <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md text-xs font-bold text-cyan-300 flex items-center gap-1.5 shadow-xl">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{project.metrics}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-7">
                    <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-widest block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-[11px] font-semibold rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="px-7 pb-6 pt-3 flex items-center justify-between border-t border-slate-800/80">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCaseStudy(project);
                    }}
                    className="text-xs text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Detailed Case Study</span>
                  </button>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 text-slate-300 hover:text-white rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-md"
                        title="GitHub Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Details Modal */}
      <ProjectDetailsModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onContactClick={onNavigateContact}
      />
    </div>
  );
};
