import React from 'react';

interface SoftwareBrandLogoProps {
  slug: string;
  category: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SoftwareBrandLogo: React.FC<SoftwareBrandLogoProps> = ({
  slug,
  category,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  }[size];

  // ADOBE LOGOS (High-definition vector app badges)
  if (slug.includes('photoshop')) {
    return (
      <div className={`${sizeClasses} bg-[#001E36] border border-[#31A8FF]/40 rounded-2xl flex items-center justify-center font-black text-[#31A8FF] shadow-lg shadow-[#31A8FF]/10 shrink-0 ${className}`}>
        <span className="tracking-tighter">Ps</span>
      </div>
    );
  }
  if (slug.includes('illustrator')) {
    return (
      <div className={`${sizeClasses} bg-[#330000] border border-[#FF9A00]/40 rounded-2xl flex items-center justify-center font-black text-[#FF9A00] shadow-lg shadow-[#FF9A00]/10 shrink-0 ${className}`}>
        <span className="tracking-tighter">Ai</span>
      </div>
    );
  }
  if (slug.includes('premiere')) {
    return (
      <div className={`${sizeClasses} bg-[#00005B] border border-[#9999FF]/40 rounded-2xl flex items-center justify-center font-black text-[#9999FF] shadow-lg shadow-[#9999FF]/10 shrink-0 ${className}`}>
        <span className="tracking-tighter">Pr</span>
      </div>
    );
  }
  if (slug.includes('after-effects')) {
    return (
      <div className={`${sizeClasses} bg-[#00005B] border border-[#D291FF]/40 rounded-2xl flex items-center justify-center font-black text-[#D291FF] shadow-lg shadow-[#D291FF]/10 shrink-0 ${className}`}>
        <span className="tracking-tighter">Ae</span>
      </div>
    );
  }
  if (slug.includes('lightroom')) {
    return (
      <div className={`${sizeClasses} bg-[#001E36] border border-[#31A8FF]/40 rounded-2xl flex items-center justify-center font-black text-[#80C8FF] shadow-lg shadow-[#31A8FF]/10 shrink-0 ${className}`}>
        <span className="tracking-tighter">Lr</span>
      </div>
    );
  }
  if (slug.includes('acrobat')) {
    return (
      <div className={`${sizeClasses} bg-[#330000] border border-red-500/40 rounded-2xl flex items-center justify-center font-black text-red-500 shadow-lg shadow-red-500/10 shrink-0 ${className}`}>
        <svg className="w-2/3 h-2/3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.36 10.04c-.33-.31-.76-.49-1.21-.49h-3.12v-1.1c0-1.89-1.54-3.43-3.43-3.43h-.42c-1.89 0-3.43 1.54-3.43 3.43v1.1H4.63c-.45 0-.88.18-1.21.49-.33.31-.51.74-.51 1.2v7.7c0 .45.18.89.51 1.2.33.31.76.49 1.21.49h14.73c.45 0 .88-.18 1.21-.49.33-.31.51-.74.51-1.2v-7.7c0-.46-.18-.89-.51-1.2zM9.18 8.45c0-.9.73-1.63 1.63-1.63h.42c.9 0 1.63.73 1.63 1.63v1.1H9.18v-1.1zm9.47 10.49H5.35v-6.1h13.3v6.1z"/>
        </svg>
      </div>
    );
  }
  if (slug.includes('creative-cloud')) {
    return (
      <div className={`${sizeClasses} bg-gradient-to-tr from-red-600 via-pink-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-pink-500/20 shrink-0 ${className}`}>
        <span className="tracking-tight text-xs uppercase font-extrabold">CC</span>
      </div>
    );
  }

  // MICROSOFT LOGOS
  if (slug.includes('microsoft-365') || slug.includes('office')) {
    return (
      <div className={`${sizeClasses} bg-slate-900 border border-rose-500/40 rounded-2xl flex items-center justify-center p-2 shadow-lg shadow-rose-500/10 shrink-0 ${className}`}>
        <svg className="w-full h-full text-rose-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.17 3.25L13.12 1v22l8.05-2.25V3.25zM11.5 2.62L2.83 5.38v13.24l8.67 2.76V2.62zM9.5 16.5l-2.5-.8V8.3l2.5-.8v9z"/>
        </svg>
      </div>
    );
  }
  if (slug.includes('windows')) {
    return (
      <div className={`${sizeClasses} bg-[#002050] border border-[#00A4EF]/40 rounded-2xl flex items-center justify-center p-2.5 shadow-lg shadow-[#00A4EF]/20 shrink-0 ${className}`}>
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          <div className="bg-[#00A4EF] rounded-xs"></div>
          <div className="bg-[#00A4EF] rounded-xs"></div>
          <div className="bg-[#00A4EF] rounded-xs"></div>
          <div className="bg-[#00A4EF] rounded-xs"></div>
        </div>
      </div>
    );
  }
  if (slug.includes('visual-studio')) {
    return (
      <div className={`${sizeClasses} bg-[#1D0C33] border border-[#B17EFF]/40 rounded-2xl flex items-center justify-center text-[#B17EFF] font-black shadow-lg shadow-[#B17EFF]/20 shrink-0 ${className}`}>
        <svg className="w-2/3 h-2/3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 2L6 11l-3.5-3L0 10l4.5 4L0 18l2.5 2L6 17l11.5 9L24 21.5V4.5L17.5 2zm2.5 16.5l-6-4.5 6-4.5v9z"/>
        </svg>
      </div>
    );
  }

  // AUTODESK LOGOS
  if (slug.includes('autocad') || slug.includes('autodesk') || slug.includes('maya') || slug.includes('3ds')) {
    return (
      <div className={`${sizeClasses} bg-[#001D21] border border-[#00C0E8]/40 rounded-2xl flex items-center justify-center font-black text-[#00C0E8] shadow-lg shadow-[#00C0E8]/10 shrink-0 ${className}`}>
        <span className="tracking-tighter font-serif italic text-lg">A</span>
      </div>
    );
  }

  // VIDEO EDITING LOGOS
  if (slug.includes('davinci')) {
    return (
      <div className={`${sizeClasses} bg-slate-900 border border-amber-500/40 rounded-2xl flex items-center justify-center p-2 shadow-lg shadow-amber-500/10 shrink-0 ${className}`}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-4 h-4 rounded-full bg-red-500 opacity-80 -translate-x-1.5 -translate-y-1"></div>
          <div className="absolute w-4 h-4 rounded-full bg-emerald-500 opacity-80 translate-x-1.5 -translate-y-1"></div>
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 opacity-80 translate-y-1.5"></div>
        </div>
      </div>
    );
  }
  if (slug.includes('filmora')) {
    return (
      <div className={`${sizeClasses} bg-[#002B2A] border border-[#00C0B5]/40 rounded-2xl flex items-center justify-center font-black text-[#00C0B5] shadow-lg shadow-[#00C0B5]/10 shrink-0 ${className}`}>
        <span className="font-sans text-base">F</span>
      </div>
    );
  }
  if (slug.includes('camtasia')) {
    return (
      <div className={`${sizeClasses} bg-[#0B2A18] border border-emerald-400/40 rounded-2xl flex items-center justify-center font-black text-emerald-400 shadow-lg shadow-emerald-400/10 shrink-0 ${className}`}>
        <span className="font-sans text-base">C</span>
      </div>
    );
  }

  // MUSIC LOGOS
  if (slug.includes('fl-studio')) {
    return (
      <div className={`${sizeClasses} bg-[#381300] border border-orange-500/40 rounded-2xl flex items-center justify-center text-orange-500 font-black shadow-lg shadow-orange-500/10 shrink-0 ${className}`}>
        <span className="text-lg">🌶️</span>
      </div>
    );
  }
  if (slug.includes('ableton')) {
    return (
      <div className={`${sizeClasses} bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center p-2.5 text-white font-mono shadow-lg shrink-0 ${className}`}>
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          <div className="flex flex-col justify-between">
            <div className="h-0.5 bg-white"></div>
            <div className="h-0.5 bg-white"></div>
            <div className="h-0.5 bg-white"></div>
            <div className="h-0.5 bg-white"></div>
          </div>
          <div className="flex justify-between">
            <div className="w-0.5 bg-white h-full"></div>
            <div className="w-0.5 bg-white h-full"></div>
            <div className="w-0.5 bg-white h-full"></div>
            <div className="w-0.5 bg-white h-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // UTILITIES & SECURITY LOGOS
  if (slug.includes('idm') || slug.includes('internet-download')) {
    return (
      <div className={`${sizeClasses} bg-[#0A2613] border border-emerald-500/40 rounded-2xl flex items-center justify-center font-black text-emerald-400 shadow-lg shadow-emerald-500/10 shrink-0 ${className}`}>
        <span className="text-xs font-mono">IDM</span>
      </div>
    );
  }
  if (slug.includes('winrar')) {
    return (
      <div className={`${sizeClasses} bg-[#1F1700] border border-amber-500/40 rounded-2xl flex items-center justify-center font-black text-amber-400 shadow-lg shadow-amber-500/10 shrink-0 ${className}`}>
        <span className="text-xs font-mono">RAR</span>
      </div>
    );
  }
  if (slug.includes('vmware') || slug.includes('parallels') || slug.includes('easeus') || slug.includes('acronis') || slug.includes('coreldraw')) {
    return (
      <div className={`${sizeClasses} bg-slate-900 border border-cyan-500/40 rounded-2xl flex items-center justify-center font-black text-cyan-400 shadow-lg shadow-cyan-500/10 shrink-0 ${className}`}>
        <span className="text-xs font-mono uppercase">{slug.substring(0, 3)}</span>
      </div>
    );
  }

  // DEFAULT BRAND SECURITY / UTILITY SHIELD
  return (
    <div className={`${sizeClasses} bg-slate-900 border border-indigo-500/40 rounded-2xl flex items-center justify-center font-black text-indigo-400 shadow-lg shadow-indigo-500/10 shrink-0 ${className}`}>
      <span className="text-xs font-mono uppercase">{category.substring(0, 2)}</span>
    </div>
  );
};
