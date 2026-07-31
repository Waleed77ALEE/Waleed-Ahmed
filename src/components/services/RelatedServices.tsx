import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_LIST, DetailedServicePageData } from '../../data/servicesData';
import { ArrowRight, Code2, Smartphone, Palette, Search, ShoppingBag, Cpu, Shield, Sparkles } from 'lucide-react';

interface RelatedServicesProps {
  currentSlug: string;
  relatedSlugs: string[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
    case 'Smartphone': return <Smartphone className="w-6 h-6 text-cyan-400" />;
    case 'Palette': return <Palette className="w-6 h-6 text-cyan-400" />;
    case 'Search': return <Search className="w-6 h-6 text-cyan-400" />;
    case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-cyan-400" />;
    case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
    case 'Shield': return <Shield className="w-6 h-6 text-cyan-400" />;
    default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
  }
};

export const RelatedServices: React.FC<RelatedServicesProps> = ({ currentSlug, relatedSlugs }) => {
  const relatedServices = SERVICES_LIST.filter(
    (s) => relatedSlugs.includes(s.slug) && s.slug !== currentSlug
  ).slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              Explore More Capabilities
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Related Services & Solutions
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <div
              key={service.slug}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300 pt-4 border-t border-slate-800/80"
              >
                <span>Learn More About {service.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
