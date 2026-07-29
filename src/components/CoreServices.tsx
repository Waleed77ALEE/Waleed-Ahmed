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
    <div className="py-24 bg-slate-950 relative border-t border-slate-900/80 overflow-hidden bg-dots-pattern">
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Code className="w-3.5 h-3.5" />
            <span>Development & SEO Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Custom Software & Engineering Solutions
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
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
              whileHover={{ y: -6 }}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between group shadow-xl backdrop-blur-xl relative"
            >
              <div>
                <div className="p-3.5 w-fit rounded-xl bg-slate-950 border border-slate-800 mb-5 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all shadow-md">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description.split('.')[0]}.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">{service.startingPrice}</span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
