import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles, MessageSquare, ArrowUpRight, User, KeyRound, Database, ShieldCheck, Smartphone, Wallet, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../lib/supabase';
import brandLogoImg from '../assets/images/brand_logo_1785031049165.jpg';
import { loadUserWallet, subscribeWallet, UserWallet } from '../services/walletStore';
import { HeaderSearchModal } from './HeaderSearchModal';
import { ServiceItem } from '../types';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  whatsappNumber: string;
  user: any;
  profile: UserProfile | null;
  cartCount: number;
  onOpenAuth: () => void;
  onOpenAccount: () => void;
  onOpenCart: () => void;
  onOpenSql: () => void;
  onOpenBinancePay?: () => void;
  onOpenAdmin?: () => void;
  onOpenAndroidApp?: () => void;
  onAddToCart?: (service: ServiceItem) => void;
  onBuyNow?: (service: ServiceItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  whatsappNumber,
  user,
  profile,
  cartCount,
  onOpenAuth,
  onOpenAccount,
  onOpenCart,
  onOpenSql,
  onOpenBinancePay,
  onOpenAdmin,
  onOpenAndroidApp,
  onAddToCart,
  onBuyNow
}) => {

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [wallet, setWallet] = useState<UserWallet>(() =>
    loadUserWallet(user?.id, user?.email, profile?.full_name)
  );
  const [balanceHighlight, setBalanceHighlight] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const fresh = loadUserWallet(user?.id, user?.email, profile?.full_name);
    setWallet(fresh);
  }, [user, profile]);

  useEffect(() => {
    const handleWalletUpdate = (updatedWallet: UserWallet) => {
      const currentUserId = user?.id || 'guest';
      const currentUserEmail = user?.email || profile?.whatsapp; // email or identifier

      const isMatch =
        updatedWallet.userId === currentUserId ||
        (currentUserEmail && updatedWallet.userEmail?.toLowerCase() === currentUserEmail.toLowerCase());

      if (isMatch || !user?.id) {
        setWallet(updatedWallet);
        setBalanceHighlight(true);
        setTimeout(() => setBalanceHighlight(false), 2500);
      }
    };

    const unsubscribe = subscribeWallet(handleWalletUpdate);
    return unsubscribe;
  }, [user, profile]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Case Studies' },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${waClean}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-2xl border-b border-cyan-500/20 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]'
          : 'bg-slate-950/50 backdrop-blur-md border-b border-white/[0.06] py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-cyan-400 p-[1.5px] shadow-md shadow-amber-500/15 group-hover:scale-105 group-hover:shadow-cyan-400/25 transition-all duration-300 overflow-hidden">
                <img
                  src={brandLogoImg}
                  alt="Waleed Khan Afridi Logo"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  loading="eager"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-[13px] font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                WALEED KHAN AFRIDI
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                Full Stack Engineer
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-900/70 p-1 rounded-full border border-slate-800/80 backdrop-blur-2xl shadow-inner">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.id ||
                (item.id === 'services' &&
                  ['software-services', 'core-services', 'digital-services', 'ai-subscriptions'].includes(activeSection));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-[13px] font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-slate-800 to-amber-500/20 rounded-full border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)] -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Global Search Trigger Button */}
            <button
              onClick={() => {
                setInitialSearchQuery('');
                setIsSearchOpen(true);
              }}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center gap-1.5 cursor-pointer shadow-sm group"
              title="Global Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-[12px] text-slate-400 group-hover:text-slate-200">Search...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800/90 border border-slate-700/80 text-slate-400 group-hover:text-cyan-300 rounded-md">
                Ctrl K
              </kbd>
            </button>

            {/* Wallet Balance Button */}
            {(user || wallet.balance > 0 || wallet.userId !== 'guest') && (
              <button
                onClick={onOpenAccount}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer ${
                  balanceHighlight
                    ? 'bg-emerald-400 text-slate-950 scale-105 shadow-lg shadow-emerald-400/40 ring-2 ring-emerald-300 font-black animate-pulse'
                    : 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                }`}
                title="Click to view Wallet & Top-Up"
              >
                <Wallet className={`w-3.5 h-3.5 ${balanceHighlight ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="font-mono text-[12px]">${wallet.balance.toFixed(2)}</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:px-2.5 sm:py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center cursor-pointer shadow-sm"
              title="Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-mono shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Profile Icon Button */}
            <button
              onClick={user ? onOpenAccount : onOpenAuth}
              className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center gap-1.5 shadow-sm cursor-pointer"
              title={user ? 'Account Settings' : 'Sign In'}
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-[12px]">{user ? (profile?.full_name || 'Account') : 'Sign In'}</span>
            </button>

            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-105 hidden xl:flex items-center justify-center cursor-pointer"
                title="Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden fixed inset-x-0 top-[52px] sm:top-[58px] bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-2xl p-4 rounded-b-3xl shadow-2xl z-40 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {/* Mobile Drawer Search Bar */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInitialSearchQuery('');
                  setIsSearchOpen(true);
                }}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white text-xs font-medium flex items-center justify-between transition-all"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span className="text-[12px]">Search services, portfolio, marketplace...</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-slate-400">
                  Search
                </span>
              </button>

              <div className="py-1 space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    activeSection === item.id ||
                    (item.id === 'services' &&
                      ['software-services', 'core-services', 'digital-services', 'ai-subscriptions'].includes(activeSection));
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/15 via-cyan-500/10 to-transparent text-cyan-300 border border-cyan-500/30 font-bold'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {onOpenAndroidApp && (
                <button
                  onClick={() => { onOpenAndroidApp(); setMobileMenuOpen(false); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold rounded-xl text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Download Official Android App (APK)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[9px] font-extrabold uppercase">
                    v2.4 APK
                  </span>
                </button>
              )}

              {onOpenBinancePay && (
                <button
                  onClick={() => { onOpenBinancePay(); setMobileMenuOpen(false); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold rounded-xl text-amber-300 bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2L6.5 7.5L9.3 10.3L12 7.6L14.7 10.3L17.5 7.5L12 2ZM4.8 9.2L2 12L4.8 14.8L7.6 12L4.8 9.2ZM19.2 9.2L16.4 12L19.2 14.8L22 12L19.2 9.2ZM12 12L9.3 14.7L12 17.4L14.7 14.7L12 12ZM12 22L17.5 16.5L14.7 13.7L12 16.4L9.3 13.7L6.5 16.5L12 22Z" />
                    </svg>
                    <span>Binance Pay &amp; USDT QR Scanner</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[9px]">
                    Zero Fee
                  </span>
                </button>
              )}

              <button
                onClick={() => { onOpenSql(); setMobileMenuOpen(false); }}
                className="w-full px-4 py-2.5 text-left text-xs font-semibold rounded-xl text-slate-400 bg-slate-900 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Supabase SQL Tables Schema</span>
                </span>
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold rounded-xl text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Admin Store Management Portal</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-mono text-[9px]">
                    Ctrl+Shift+A
                  </span>
                </button>
              )}

              <div className="pt-2 border-t border-slate-800/80 mt-1 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-center text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 rounded-full shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  <span>Order via WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <HeaderSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        initialQuery={initialSearchQuery}
      />
    </header>
  );
};

