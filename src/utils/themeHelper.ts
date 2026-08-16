export const getButtonColorClasses = (colorName: string): string => {
  switch (colorName?.toLowerCase()) {
    case 'blue':
    case 'indigo':
      return 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20';
    case 'emerald':
    case 'green':
      return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20';
    case 'purple':
    case 'violet':
      return 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20';
    case 'amber':
    case 'yellow':
      return 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-amber-500/20';
    case 'red':
    case 'rose':
    default:
      return 'bg-red-600 hover:bg-red-500 text-white shadow-red-500/20';
  }
};
