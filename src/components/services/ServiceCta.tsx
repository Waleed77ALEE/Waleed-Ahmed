import React from 'react';
import { DetailedServicePageData } from '../../data/servicesData';
import { ArrowRight, MessageSquare, PhoneCall, CheckCircle2 } from 'lucide-react';

interface ServiceCtaProps {
  service: DetailedServicePageData;
  onOpenContact: () => void;
}

export const ServiceCta: React.FC<ServiceCtaProps> = ({ service, onOpenContact }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ready to Scale Your Business?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Let’s Build Your {service.title} Project
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Book a free 30-minute technical consultation. We’ll discuss your goals, review architecture options, and provide a detailed timeline and quote.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Contact Waleed Khan Afridi</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          <a
            href="https://wa.me/923416860077"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp Direct (+92 341 6860077)</span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> Fast Response &lt; 2 Hours</span>
          <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> Free Architecture Consultation</span>
          <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> NDA Option Available</span>
        </div>

      </div>
    </section>
  );
};
