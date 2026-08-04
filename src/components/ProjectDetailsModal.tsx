import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Zap,
  TrendingUp,
  Search,
  Smartphone,
  Layers,
  Star,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick?: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onContactClick
}) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
          >
          {/* Modal Header Bar */}
          <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-xl px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
              {project.metrics && (
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {project.metrics}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Case Study Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Title & Links */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">{project.title}</h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Main Cover Banner */}
            <div className="rounded-2xl overflow-hidden h-64 sm:h-80 w-full bg-slate-950 border border-slate-800 relative">
              <img 
                src={project.image} 
                alt={project.title} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
                }}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-2">Technologies Used:</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-cyan-300 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 1. Project Overview & Client Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.overview && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Project Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.overview}</p>
                </div>
              )}

              {project.clientGoals && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    Client Goals
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.clientGoals}</p>
                </div>
              )}
            </div>

            {/* 2. Technical Challenges */}
            {project.challenges && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">Technical Challenges</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.challenges}</p>
              </div>
            )}

            {/* 3. Development Process Steps */}
            {project.developmentProcess && project.developmentProcess.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Development Process &amp; Execution Steps
                </h3>
                <div className="space-y-2">
                  {project.developmentProcess.map((step, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Performance Metrics Grid */}
            {project.performanceResults && (
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 p-6 rounded-2xl border border-cyan-500/30 space-y-4">
                <h3 className="text-sm font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Verified Performance Results
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400">{project.performanceResults.lighthouse}/100</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Lighthouse Score</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-cyan-400">{project.performanceResults.loadTime}</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Page Load Time</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">{project.performanceResults.trafficGain}</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Traffic Growth</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-purple-400">{project.performanceResults.conversionBoost}</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Conversion Lift</div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Key Features & SEO Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    Key Platform Features
                  </h3>
                  <ul className="space-y-2">
                    {project.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.seoImprovements && project.seoImprovements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-400" />
                    SEO &amp; Mobile Optimization
                  </h3>
                  <ul className="space-y-2">
                    {project.seoImprovements.map((seo, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{seo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 6. Testimonial Quote */}
            {project.testimonial && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic">"{project.testimonial.quote}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <img 
                    src={project.testimonial.avatar} 
                    alt={project.testimonial.clientName} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.testimonial!.clientName)}&background=0D8ABC&color=fff`;
                    }}
                    className="w-8 h-8 rounded-full border border-cyan-500/40 object-cover" 
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{project.testimonial.clientName}</div>
                    <div className="text-[10px] text-slate-400">{project.testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400 hidden sm:block">Want a custom project built like this?</div>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Close Case Study
              </button>
              {onContactClick && (
                <button
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-500 text-slate-950 text-xs font-extrabold shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  Request Similar Build
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
