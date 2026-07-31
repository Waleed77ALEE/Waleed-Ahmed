import React from 'react';
import { DetailedServicePageData } from '../../data/servicesData';
import { ArrowRight } from 'lucide-react';

interface ServiceProcessProps {
  service: DetailedServicePageData;
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ service }) => {
  return (
    <section className="py-16 bg-slate-900/40 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Structured Workflow
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our 5-Step Development Process
          </p>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            From initial concept to production launch, every milestone is structured for total transparency and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {service.developmentProcess.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="text-3xl font-black text-cyan-500/30 group-hover:text-cyan-400 transition-colors mb-3">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < service.developmentProcess.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-700">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
