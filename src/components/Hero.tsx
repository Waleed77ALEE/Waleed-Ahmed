import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, CheckCircle, Code, Star, Trophy, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const stats = [
    { value: '500+', label: 'Digital Orders Completed', icon: ShoppingBag, color: 'text-cyan-400' },
    { value: '99.8%', label: 'Positive Feedback Rate', icon: Star, color: 'text-amber-400' },
    { value: '5+ Yrs', label: 'Development Experience', icon: Trophy, color: 'text-indigo-400' },
    { value: 'Instant', label: 'Average Service Delivery', icon: ShieldCheck, color: 'text-emerald-400' }
  ];

  const techBadges = ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Technical SEO', 'AI APIs', 'G2G Services'];

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 backdrop-blur-md mb-6 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">waleedkhanafridi.online</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400 font-medium">Digital Services & Marketplace Active</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Senior Full Stack Developer,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              UI/UX Designer
            </span>{' '}
            & SEO Specialist
          </h1>

          {/* Subheading Description */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            Building high-performance web applications, engineering robust digital architectures, and delivering premium AI subscriptions, social growth services, and verified accounts with instant 24/7 delivery.
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {techBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate('digital-services')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Explore Digital Services Marketplace</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Hire Me for Web Development</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center p-3 text-center">
                  <div className={`p-2.5 rounded-xl bg-slate-800/60 mb-2.5 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
