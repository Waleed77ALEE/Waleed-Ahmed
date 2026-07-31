import React from 'react';
import { DetailedServicePageData } from '../../data/servicesData';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Server, Layout, Smartphone, Search, Code2, Database } from 'lucide-react';

interface ServiceFeaturesProps {
  service: DetailedServicePageData;
}

const renderFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layout': return <Layout className="w-6 h-6 text-cyan-400" />;
    case 'Server': return <Server className="w-6 h-6 text-cyan-400" />;
    case 'Smartphone': return <Smartphone className="w-6 h-6 text-cyan-400" />;
    case 'Search': return <Search className="w-6 h-6 text-cyan-400" />;
    case 'Zap': return <Zap className="w-6 h-6 text-cyan-400" />;
    case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
    case 'Database': return <Database className="w-6 h-6 text-cyan-400" />;
    default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
  }
};

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ service }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Key Features Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Key Capabilities & Features
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Speed, Scale & User Conversion
          </p>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Every build is engineered to the highest standards with modern architecture and zero compromises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {service.keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                {renderFeatureIcon(feat.icon)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Why Partner With Me for {service.title}?
            </h3>
            <p className="text-slate-400 text-sm">
              Direct engineering partnership ensuring clean execution, transparent timelines, and measurable return on investment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-slate-200">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
