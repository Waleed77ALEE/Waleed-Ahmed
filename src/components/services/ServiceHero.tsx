import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, MessageSquare, Sparkles, Shield, Code2, Smartphone, Palette, Search, ShoppingBag, Cpu } from 'lucide-react';
import { DetailedServicePageData } from '../../data/servicesData';

interface ServiceHeroProps {
  service: DetailedServicePageData;
  onOpenContact: () => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-8 h-8 text-cyan-400" />;
    case 'Smartphone': return <Smartphone className="w-8 h-8 text-cyan-400" />;
    case 'Palette': return <Palette className="w-8 h-8 text-cyan-400" />;
    case 'Search': return <Search className="w-8 h-8 text-cyan-400" />;
    case 'ShoppingBag': return <ShoppingBag className="w-8 h-8 text-cyan-400" />;
    case 'Cpu': return <Cpu className="w-8 h-8 text-cyan-400" />;
    case 'Shield': return <Shield className="w-8 h-8 text-cyan-400" />;
    default: return <Sparkles className="w-8 h-8 text-cyan-400" />;
  }
};

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service, onOpenContact }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-12 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border-b border-slate-800/80">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              {getIcon(service.icon)}
              <span className="ml-1.5">{service.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-lg text-cyan-300 font-medium leading-relaxed">
              {service.subtitle}
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {service.detailedDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <span>Request Free Consultation</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-all duration-200"
              >
                <span>View Pricing Plans</span>
              </a>
            </div>

            {/* Guarantee Pills */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 font-medium">
              <span className="inline-flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" />
                100% Satisfaction Guarantee
              </span>
              <span className="inline-flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" />
                Transparent Milestone Pricing
              </span>
              <span className="inline-flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" />
                Direct Senior Engineer Access
              </span>
            </div>
          </div>

          {/* Hero Right Metrics Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-cyan-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                Verified Benchmark
              </div>

              <h3 className="text-slate-200 text-sm font-semibold uppercase tracking-wider mb-6 border-b border-slate-800 pb-3">
                Service Performance Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {service.heroStats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="text-xs text-slate-400 font-medium mb-3">Core Tech Stack:</div>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.slice(0, 6).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 font-mono"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
