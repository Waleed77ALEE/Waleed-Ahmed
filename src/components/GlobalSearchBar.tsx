import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Code, 
  FolderGit2, 
  X, 
  ChevronRight, 
  Zap, 
  Sparkles, 
  Bot, 
  Laptop, 
  Gamepad2, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Layers, 
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  CreditCard,
  ListTodo
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CORE_SERVICES, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { SERVICES_LIST } from '../data/servicesData';
import { INITIAL_AI_SUBSCRIPTIONS } from '../data/aiSubscriptionsData';
import { SOFTWARE_PRODUCTS } from '../data/softwareData';
import { MOCK_GAMING_PRODUCTS } from '../data/gamingMarketData';
import { ServiceItem } from '../types';
import { generateImageAltText } from '../lib/seo';
import { useSoundEffects } from '../hooks/useSoundEffects';

export type SearchCategoryType = 'all' | 'ai' | 'software' | 'gaming' | 'services' | 'pages';

export interface SearchResultItem {
  id: string;
  type: 'ai' | 'software' | 'gaming' | 'service' | 'project' | 'page';
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  price?: number | string;
  badge?: string;
  image?: string;
  link: string;
  isExternal?: boolean;
  actionType?: 'navigate' | 'modal' | 'anchor';
  modalName?: string;
  tags?: string[];
}

interface GlobalSearchBarProps {
  onNavigate: (sectionId: string) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onBuyNow?: (service: ServiceItem) => void;
  onOpenArchitecture?: () => void;
  onOpenTodos?: () => void;
  onOpenBinancePay?: () => void;
  onOpenSeoManager?: () => void;
  isMobileModalOpen?: boolean;
  onCloseMobileModal?: () => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ 
  onNavigate,
  onOpenArchitecture,
  onOpenTodos,
  onOpenBinancePay,
  onOpenSeoManager,
  isMobileModalOpen = false,
  onCloseMobileModal
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryType>('all');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const { playClick, playHover, playTab } = useSoundEffects();

  // 1. Compile Comprehensive Search Index
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // A. AI Accounts & Subscriptions
    INITIAL_AI_SUBSCRIPTIONS.forEach((ai) => {
      const startingPrice = ai.prices?.Monthly || Object.values(ai.prices || {})[0] || 0;
      items.push({
        id: `ai-${ai.id}`,
        type: 'ai',
        title: ai.planName,
        subtitle: ai.platformName,
        description: ai.shortDescription || ai.detailedDescription,
        category: ai.category || 'AI Subscriptions',
        price: startingPrice ? `$${startingPrice}/mo` : 'Special Offer',
        badge: ai.badge || 'Verified Account',
        link: ai.id === 'claude-max-3mo' ? '/claude-max' : ai.id === 'supergrok-1yr' ? '/supergrok' : '/ai-subscriptions',
        actionType: 'navigate',
        tags: [ai.platformName, ai.platformKey, ...(ai.features || [])]
      });
    });

    // B. Software Products & OS / Licenses
    SOFTWARE_PRODUCTS.forEach((sw) => {
      items.push({
        id: `sw-${sw.id}`,
        type: 'software',
        title: sw.name,
        subtitle: `${sw.category} • ${sw.version}`,
        description: sw.description,
        category: sw.category,
        price: `$${sw.price}`,
        badge: sw.badge || sw.licenseType || 'Instant Delivery',
        image: sw.image,
        link: `/products/${sw.category.toLowerCase().replace(/ /g, '-')}/${sw.slug}`,
        actionType: 'navigate',
        tags: [sw.platform, sw.licenseType, ...(sw.features || [])]
      });
    });

    // C. Gaming Marketplace Goods
    MOCK_GAMING_PRODUCTS.forEach((g) => {
      items.push({
        id: `game-${g.id}`,
        type: 'gaming',
        title: g.title,
        subtitle: `${g.gameName} • ${g.category}`,
        description: g.description,
        category: 'Gaming Market',
        price: `$${g.price}`,
        badge: g.deliveryTime === 'Instant' ? 'Instant Key' : `${g.deliveryTime} Delivery`,
        link: '/gaming-market',
        actionType: 'navigate',
        tags: [g.gameName, g.category, g.gameId, 'Gaming', 'Steam', 'Keys']
      });
    });

    // D. Core Professional Services
    SERVICES_LIST.forEach((s) => {
      items.push({
        id: `srv-${s.slug}`,
        type: 'service',
        title: s.title,
        subtitle: s.subtitle,
        description: s.shortDescription,
        category: 'Services',
        badge: s.badge || 'Professional Service',
        link: `/services/${s.slug}`,
        actionType: 'navigate',
        tags: [s.slug, 'Development', 'Agency', ...(s.techStack?.map(t => t.name) || [])]
      });
    });

    // Also include CORE_SERVICES for quick anchor scrolls
    CORE_SERVICES.forEach((cs) => {
      // Check if already covered
      if (!items.some(i => i.title.toLowerCase() === cs.title.toLowerCase())) {
        items.push({
          id: `core-${cs.id}`,
          type: 'service',
          title: cs.title,
          subtitle: `Starting at ${cs.startingPrice}`,
          description: cs.description,
          category: 'Services',
          price: cs.startingPrice,
          badge: cs.turnaround,
          link: 'services',
          actionType: 'anchor',
          tags: ['Development', 'Freelance', 'Agency', ...(cs.deliverables || [])]
        });
      }
    });

    // E. Portfolio Case Studies
    PORTFOLIO_PROJECTS.forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        type: 'project',
        title: p.title,
        subtitle: p.category,
        description: p.description,
        category: 'Portfolio',
        image: p.image,
        link: 'portfolio',
        actionType: 'anchor',
        tags: [...(p.tags || []), 'Case Study', 'Client Work']
      });
    });

    // F. Key Site Pages, Hubs & Utility Tools
    const staticPages: SearchResultItem[] = [
      {
        id: 'page-market-ai',
        type: 'page',
        title: 'AI Subscriptions Marketplace',
        subtitle: 'Claude, ChatGPT, Grok, Midjourney & AI Tools',
        description: 'Browse all verified AI subscriptions with full warranty and instant access.',
        category: 'Marketplace Pages',
        badge: 'Storefront',
        link: '/ai-subscriptions',
        actionType: 'navigate'
      },
      {
        id: 'page-market-soft',
        type: 'page',
        title: 'Software & Developer License Store',
        subtitle: 'Windows 11, Office 2024, Adobe & Utilities',
        description: 'Instant genuine software keys and utility activations.',
        category: 'Marketplace Pages',
        badge: 'Storefront',
        link: '/software-services',
        actionType: 'navigate'
      },
      {
        id: 'page-market-gaming',
        type: 'page',
        title: 'Gaming Marketplace & Digital Keys',
        subtitle: 'Accounts, In-Game Currency & Steam Keys',
        description: 'Buy and trade virtual gaming assets with 100% escrow protection.',
        category: 'Marketplace Pages',
        badge: 'Storefront',
        link: '/gaming-market',
        actionType: 'navigate'
      },
      {
        id: 'page-claude-max',
        type: 'page',
        title: 'Claude Max (3 Months Deal)',
        subtitle: 'Anthropic Claude 3.7 Sonnet & Opus - 20x Limits',
        description: 'Limited-time special discount deal for 3 months guaranteed Claude Max.',
        category: 'Special Deals',
        badge: '$180 Deal',
        link: '/claude-max',
        actionType: 'navigate'
      },
      {
        id: 'page-supergrok',
        type: 'page',
        title: 'SuperGrok (1 Year Deal)',
        subtitle: 'xAI Grok 3 Reasoning & DeepSearch',
        description: 'Annual full warranty subscription for SuperGrok platform.',
        category: 'Special Deals',
        badge: '$190/yr Deal',
        link: '/supergrok',
        actionType: 'navigate'
      },
      {
        id: 'page-referrals',
        type: 'page',
        title: 'Referral Pro Partner Program',
        subtitle: 'Earn 15% Lifetime Commissions',
        description: 'Join Waleed Khan Afridi referral program and earn USDT/JazzCash on sales.',
        category: 'Partnership',
        badge: '15% Commission',
        link: '/referrals',
        actionType: 'navigate'
      },
      {
        id: 'page-jazzcash',
        type: 'page',
        title: 'JazzCash Direct Payment Portal',
        subtitle: 'Instant Pakistani Rupees (PKR) Checkout',
        description: 'Verify instant mobile wallet transactions via 03416860077 with QR scan.',
        category: 'Payment Methods',
        badge: 'PKR Instant',
        link: '/payment/jazzcash',
        actionType: 'navigate'
      },
      {
        id: 'page-ai-seo',
        type: 'page',
        title: 'Autonomous AI SEO Manager',
        subtitle: 'Rank Tracking, Schema Generation & Audit',
        description: 'Launch the AI SEO engine for live keyword and metadata optimization.',
        category: 'Interactive Tools',
        badge: 'AI Engine',
        link: 'ai-seo',
        actionType: 'modal',
        modalName: 'seo-manager'
      },
      {
        id: 'page-architecture',
        type: 'page',
        title: 'Master Architecture & Engineering Pillars',
        subtitle: 'React 19, Supabase, Firestore & Web Audio',
        description: 'Inspect full-stack architecture diagrams, schemas, and security model.',
        category: 'Interactive Tools',
        badge: 'Tech Docs',
        link: 'architecture',
        actionType: 'modal',
        modalName: 'architecture'
      },
      {
        id: 'page-todos',
        type: 'page',
        title: 'Supabase Todo & Task Manager',
        subtitle: 'Live Cloud State Synchronization',
        description: 'Access the interactive real-time task manager powered by Supabase.',
        category: 'Interactive Tools',
        badge: 'Cloud Sync',
        link: 'todos',
        actionType: 'modal',
        modalName: 'todos'
      },
      {
        id: 'page-binance',
        type: 'page',
        title: 'Binance Pay & Crypto Gateway',
        subtitle: 'USDT / BUSD Zero Fee Settlement',
        description: 'Pay securely using Binance Pay ID 1092558661 or BEP20 QR.',
        category: 'Payment Methods',
        badge: 'Crypto',
        link: 'binance-pay',
        actionType: 'modal',
        modalName: 'binance'
      },
      {
        id: 'page-about',
        type: 'page',
        title: 'About Waleed Khan Afridi',
        subtitle: 'Senior Full-Stack & Marketplace Engineer',
        description: 'Bio, background, certifications, technical skillsets, and achievements.',
        category: 'Profile & Bio',
        badge: 'Lead Developer',
        link: 'about',
        actionType: 'anchor'
      },
      {
        id: 'page-pricing',
        type: 'page',
        title: 'Service Packages & Pricing Calculator',
        subtitle: 'Custom quotes for Web, SEO & AI projects',
        description: 'Transparent pricing breakdown for custom engineering packages.',
        category: 'Services',
        badge: 'Transparent',
        link: 'pricing',
        actionType: 'anchor'
      },
      {
        id: 'page-reviews',
        type: 'page',
        title: 'Client Reviews & Verified Testimonials',
        subtitle: '5-Star Feedback from Global Clients',
        description: 'Read real verified client reviews across Upwork, Fiverr, and direct contracts.',
        category: 'Trust & Reputation',
        badge: '5.0 ★ Rated',
        link: 'reviews',
        actionType: 'anchor'
      },
      {
        id: 'page-faq',
        type: 'page',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: 'Orders, Warranties, Delivery & Support',
        description: 'Answers to all common questions about account delivery and custom development.',
        category: 'Support',
        badge: '24/7 Support',
        link: 'faq',
        actionType: 'anchor'
      },
      {
        id: 'page-contact',
        type: 'page',
        title: 'Direct WhatsApp & Inquiry Contact',
        subtitle: '+92 341 6860077 • Immediate Response',
        description: 'Connect directly with Waleed Khan Afridi for custom quotes and instant support.',
        category: 'Support',
        badge: 'Fast Reply',
        link: 'contact',
        actionType: 'anchor'
      },
      {
        id: 'page-terms',
        type: 'page',
        title: 'Terms of Service',
        subtitle: 'Legal usage, escrow & delivery policies',
        description: 'Official terms and conditions for marketplace and engineering contracts.',
        category: 'Legal',
        badge: 'Policy',
        link: '/terms',
        actionType: 'navigate'
      },
      {
        id: 'page-privacy',
        type: 'page',
        title: 'Privacy Policy',
        subtitle: 'GDPR / CCPA data protection guidelines',
        description: 'How your user information and credentials are encrypted and protected.',
        category: 'Legal',
        badge: 'Security',
        link: '/privacy',
        actionType: 'navigate'
      },
      {
        id: 'page-refund',
        type: 'page',
        title: 'Refund & Warranty Policy',
        subtitle: '100% Replacement Warranty Guidelines',
        description: 'Transparent 7 to 30 days replacement warranty terms on all digital goods.',
        category: 'Legal',
        badge: 'Guarantee',
        link: '/refund',
        actionType: 'navigate'
      }
    ];

    items.push(...staticPages);
    return items;
  }, []);

  // 2. Global Keyboard Shortcut (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playClick();
        setIsOpen(true);
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 50);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        if (onCloseMobileModal) onCloseMobileModal();
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playClick, onCloseMobileModal]);

  // Handle Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus mobile input when mobile modal opens
  useEffect(() => {
    if (isMobileModalOpen) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 100);
    }
  }, [isMobileModalOpen]);

  // 3. Filtered Results Calculation
  const q = query.toLowerCase().trim();

  const filteredItems = useMemo(() => {
    let list = allSearchItems;

    // Filter by category tab
    if (selectedCategory === 'ai') {
      list = list.filter(i => i.type === 'ai');
    } else if (selectedCategory === 'software') {
      list = list.filter(i => i.type === 'software');
    } else if (selectedCategory === 'gaming') {
      list = list.filter(i => i.type === 'gaming');
    } else if (selectedCategory === 'services') {
      list = list.filter(i => i.type === 'service');
    } else if (selectedCategory === 'pages') {
      list = list.filter(i => i.type === 'page' || i.type === 'project');
    }

    if (!q) {
      // Return top featured recommendations if no query
      return list.slice(0, 8);
    }

    // Scoring and Relevance matching
    return list
      .map(item => {
        let score = 0;
        const title = item.title.toLowerCase();
        const subtitle = (item.subtitle || '').toLowerCase();
        const desc = item.description.toLowerCase();
        const cat = item.category.toLowerCase();
        const tags = (item.tags || []).map(t => t.toLowerCase());

        if (title === q) score += 100;
        else if (title.startsWith(q)) score += 60;
        else if (title.includes(q)) score += 40;

        if (subtitle.includes(q)) score += 25;
        if (cat.includes(q)) score += 20;
        if (tags.some(t => t.includes(q))) score += 20;
        if (desc.includes(q)) score += 10;

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)
      .slice(0, 10);
  }, [allSearchItems, selectedCategory, q]);

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(filteredItems.length > 0 ? 0 : -1);
  }, [filteredItems]);

  // 4. Handle Item Selection / Navigation
  const handleSelectItem = (item: SearchResultItem) => {
    playClick();
    setIsOpen(false);
    setQuery('');
    if (onCloseMobileModal) onCloseMobileModal();

    if (item.actionType === 'modal') {
      if (item.modalName === 'architecture' && onOpenArchitecture) {
        onOpenArchitecture();
      } else if (item.modalName === 'todos' && onOpenTodos) {
        onOpenTodos();
      } else if (item.modalName === 'binance' && onOpenBinancePay) {
        onOpenBinancePay();
      } else if (item.modalName === 'seo-manager' && onOpenSeoManager) {
        onOpenSeoManager();
      } else {
        onNavigate(item.link);
      }
      return;
    }

    if (item.actionType === 'anchor') {
      onNavigate(item.link);
      return;
    }

    if (item.link.startsWith('/')) {
      navigate(item.link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(item.link);
    }
  };

  // Keyboard navigation within the dropdown
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key === 'ArrowDown') {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playHover(0.5);
      setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playHover(0.5);
      setActiveIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filteredItems[activeIndex]) {
        handleSelectItem(filteredItems[activeIndex]);
      }
    }
  };

  const trendingTags = [
    'Claude Max',
    'Windows 11 Pro',
    'SuperGrok',
    'SEO Services',
    'Office 2024',
    'Gaming Keys',
    'Web Development',
    'JazzCash Pay'
  ];

  const categoryTabs: { key: SearchCategoryType; label: string; icon: any }[] = [
    { key: 'all', label: 'All', icon: Sparkles },
    { key: 'ai', label: 'AI Accounts', icon: Bot },
    { key: 'software', label: 'Software', icon: Laptop },
    { key: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { key: 'services', label: 'Services', icon: Code },
    { key: 'pages', label: 'Pages & Tools', icon: Layers }
  ];

  const getItemIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'ai': return <Bot className="w-4 h-4 text-cyan-400" />;
      case 'software': return <Laptop className="w-4 h-4 text-blue-400" />;
      case 'gaming': return <Gamepad2 className="w-4 h-4 text-red-400" />;
      case 'service': return <Code className="w-4 h-4 text-amber-400" />;
      case 'project': return <FolderGit2 className="w-4 h-4 text-indigo-400" />;
      case 'page': return <FileText className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Render the search results list (shared between desktop dropdown & mobile modal)
  const renderResultsList = (isMobileView = false) => (
    <div className="space-y-3">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 px-3 scrollbar-none border-b border-slate-800/60">
        {categoryTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                playTab();
                setSelectedCategory(tab.key);
              }}
              onMouseEnter={() => playHover(0.4)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Query Suggestions / Trending when query is short */}
      {!q && (
        <div className="px-3 pt-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span>Trending Searches</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {trendingTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  playClick();
                  setQuery(tag);
                }}
                onMouseEnter={() => playHover(0.4)}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors border border-slate-700/50 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      <div 
        ref={resultsContainerRef}
        className={`${isMobileView ? 'max-h-[60vh]' : 'max-h-[380px]'} overflow-y-auto overscroll-contain px-2 space-y-1.5`}
      >
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Search className="w-8 h-8 text-slate-600 mb-1" />
            <p className="text-sm font-bold text-slate-200">No results found for "{query}"</p>
            <p className="text-xs text-slate-500 max-w-xs">
              Try searching for terms like <span className="text-cyan-400">Claude</span>, <span className="text-blue-400">Windows</span>, <span className="text-amber-400">SEO</span>, or <span className="text-red-400">Gaming</span>.
            </p>
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectItem(item)}
                onMouseEnter={() => {
                  playHover(0.4);
                  setActiveIndex(idx);
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all group flex items-start gap-3 cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-800/95 border-cyan-500/40 shadow-md shadow-cyan-500/5'
                    : 'bg-slate-900/40 border-transparent hover:bg-slate-800/60 hover:border-slate-800'
                }`}
              >
                {/* Visual Icon / Thumbnail */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={generateImageAltText(item.title, item.category)}
                    className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-700 mt-0.5"
                  />
                ) : (
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                    item.type === 'ai' ? 'bg-cyan-500/10 border-cyan-500/30' :
                    item.type === 'software' ? 'bg-blue-500/10 border-blue-500/30' :
                    item.type === 'gaming' ? 'bg-red-500/10 border-red-500/30' :
                    item.type === 'service' ? 'bg-amber-500/10 border-amber-500/30' :
                    item.type === 'project' ? 'bg-indigo-500/10 border-indigo-500/30' :
                    'bg-emerald-500/10 border-emerald-500/30'
                  }`}>
                    {getItemIcon(item.type)}
                  </div>
                )}

                {/* Info & Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <h4 className={`text-xs font-bold truncate ${
                        isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700/80 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.price && (
                      <span className="text-xs font-black font-mono text-emerald-400 shrink-0">
                        {item.price}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 group-hover:text-slate-300">
                    {item.subtitle ? <span className="text-slate-300 font-semibold">{item.subtitle} • </span> : null}
                    {item.description}
                  </p>
                </div>

                {/* Action Arrow */}
                <div className="self-center shrink-0 pl-1">
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Search Footer Status */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 rounded-b-2xl flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>{filteredItems.length} instant results across catalog</span>
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] font-mono text-slate-400">↑</kbd>
          <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] font-mono text-slate-400">↓</kbd>
          <span className="mx-1">navigate</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] font-mono text-slate-400">Enter</kbd>
          <span>select</span>
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Search Input */}
      <div ref={wrapperRef} className="relative hidden md:block z-50">
        <div className="relative group flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, services, tools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => {
              playClick();
              setIsOpen(true);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-48 lg:w-64 xl:w-80 pl-9 pr-14 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 focus:border-cyan-500/50 focus:bg-slate-900 text-slate-200 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 placeholder:text-slate-500 shadow-sm"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 p-0.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-2.5 pointer-events-none">
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-400 rounded-md shadow-xs">
                Ctrl K
              </kbd>
            </div>
          )}
        </div>

        {/* Desktop Instant Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-2 right-0 w-[420px] lg:w-[480px] bg-slate-900/95 backdrop-blur-2xl border border-slate-800/90 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 pt-2"
            >
              {renderResultsList(false)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Mobile Full-Screen Search Modal Overlay */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl md:hidden flex flex-col p-4 pt-3"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1 group flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 pointer-events-none" />
                <input
                  ref={mobileInputRef}
                  type="text"
                  placeholder="Search products, services, accounts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      mobileInputRef.current?.focus();
                    }}
                    className="absolute right-3 p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  if (onCloseMobileModal) onCloseMobileModal();
                }}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer shrink-0"
              >
                Close
              </button>
            </div>

            {/* Mobile Results Body */}
            <div className="flex-1 bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl pt-2 flex flex-col justify-between">
              {renderResultsList(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
