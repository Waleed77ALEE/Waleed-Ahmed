import React from 'react';

export const TrustBanner: React.FC = () => {
  return (
    <div className="border-y border-slate-800/50 bg-[#0b0e14]/50 backdrop-blur-sm py-8 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
          Trusted by over 10,000+ professionals and gamers worldwide
        </p>
        <div className="flex justify-center items-center flex-wrap gap-8 md:gap-16 opacity-50 grayscale">
          {/* Mock logos using text/icons for demo */}
          <div className="flex items-center gap-2 font-black text-xl text-slate-300">
             <div className="w-6 h-6 rounded bg-slate-300" /> VERTEX
          </div>
          <div className="flex items-center gap-2 font-black text-xl text-slate-300">
             <div className="w-6 h-6 rounded-full border-4 border-slate-300" /> QUANTUM
          </div>
          <div className="flex items-center gap-2 font-black text-xl text-slate-300">
             <div className="w-6 h-6 rotate-45 bg-slate-300" /> NEXUS
          </div>
          <div className="flex items-center gap-2 font-black text-xl text-slate-300">
             <svg className="w-6 h-6 fill-slate-300" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg> APEX
          </div>
        </div>
      </div>
    </div>
  );
};
