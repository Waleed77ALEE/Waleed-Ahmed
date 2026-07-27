import React from 'react';
import { CORE_SERVICES } from '../data/portfolioData';
import { Code, Palette, Search, Cpu, ShoppingBag, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CoreServicesProps {
  onNavigate: (sectionId: string) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-6 h-6 text-cyan-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-purple-400" />;
      case 'Search': return <Search className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-indigo-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-sky-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      default: return <Code className="w-6 h-6 text-cyan-400" />;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="py-20 bg-slate-900/60 relative border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>Development & SEO Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Custom Software & Engineering Solutions
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            High-caliber web development, pixel-perfect UI designs, and technical SEO architecture engineered for conversion.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CORE_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Starting</span>
                    <span className="text-lg font-extrabold text-white">{service.startingPrice}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Turnaround: <strong className="text-slate-200">{service.turnaround}</strong></span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
