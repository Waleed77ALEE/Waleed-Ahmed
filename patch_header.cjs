const fs = require('fs');
let data = fs.readFileSync('src/components/Header.tsx', 'utf-8');

data = data.replace(
  "import { HeaderSearchModal } from './HeaderSearchModal';",
  "import { HeaderSearchModal } from './HeaderSearchModal';\nimport { GlobalSearchBar } from './GlobalSearchBar';"
);

// We need to replace the specific block:
//             {/* Global Search Trigger Button */}
//             <button
//               onClick={() => {
//                 setInitialSearchQuery('');
//                 setIsSearchOpen(true);
//               }}
//               className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center gap-1.5 cursor-pointer shadow-sm group"
//               title="Global Search (Ctrl + K)"
//             >
//               <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
//               <span className="hidden lg:inline text-[12px] text-slate-400 group-hover:text-slate-200">Search...</span>
//               <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800/90 border border-slate-700/80 text-slate-400 group-hover:text-cyan-300 rounded-md">
//                 Ctrl K
//               </kbd>
//             </button>

data = data.replace(
  /\{\/\* Global Search Trigger Button \*\/\}[\s\S]*?<\/button>/m,
  "<GlobalSearchBar onNavigate={onNavigate} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />"
);

fs.writeFileSync('src/components/Header.tsx', data);
