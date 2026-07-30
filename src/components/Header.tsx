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
    { id: 'software-services', label: 'Software Services' },
    { id: 'ai-subscriptions', label: 'AI Subscriptions' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'about', label: 'About' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-cyan-400 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300 overflow-hidden">
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
              <div className="text-sm font-extrabold tracking-wider text-white">
                WALEED KHAN AFRIDI
              </div>
              <div className="text-[11px] text-slate-400 font-medium tracking-wide">
                Full Stack Engineer
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-slate-800 rounded-full border border-slate-700 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Global Search Trigger Button */}
            <button
              onClick={() => {
                setInitialSearchQuery('');
                setIsSearchOpen(true);
              }}
              className="p-2 px-2.5 sm:px-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm group"
              title="Global Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-slate-400 group-hover:text-slate-200">Search...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-400 rounded-md">
                Ctrl K
              </kbd>
            </button>

            {/* Wallet Balance Button - Shown when user is logged in or has active balance */}
            {(user || wallet.balance > 0 || wallet.userId !== 'guest') && (
              <button
                onClick={onOpenAccount}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer ${
                  balanceHighlight
                    ? 'bg-emerald-400 text-slate-950 scale-110 shadow-lg shadow-emerald-400/40 ring-2 ring-emerald-300 font-black animate-pulse'
                    : 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                }`}
                title="Click to view Wallet & Top-Up"
              >
                <Wallet className={`w-3.5 h-3.5 ${balanceHighlight ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="font-mono">${wallet.balance.toFixed(2)}</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all flex items-center justify-center cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-cyan-400 text-slate-950 font-mono shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Profile Icon Button */}
            <button
              onClick={user ? onOpenAccount : onOpenAuth}
              className="p-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              title={user ? 'Account Settings' : 'Sign In'}
            >
              <User className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{user ? (profile?.full_name || 'Account') : 'Sign In'}</span>
            </button>

            {/* Admin Portal (Subtle) */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors hidden xl:flex items-center justify-center"
                title="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="xl:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-xl p-4 shadow-2xl z-40"
          >
            <div className="flex flex-col gap-2">
              {/* Mobile Drawer Search Bar */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInitialSearchQuery('');
                  setIsSearchOpen(true);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white text-xs font-medium flex items-center justify-between transition-all"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>Search services, portfolio, marketplace...</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-slate-400">
                  Search
                </span>
              </button>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-3 text-left text-sm font-semibold rounded-xl flex items-center justify-between transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}

              {onOpenAndroidApp && (
                <button
                  onClick={() => { onOpenAndroidApp(); setMobileMenuOpen(false); }}
                  className="w-full px-4 py-3 text-left text-xs font-bold rounded-xl text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
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
                  className="w-full px-4 py-3 text-left text-xs font-bold rounded-xl text-amber-300 bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2L6.5 7.5L9.3 10.3L12 7.6L14.7 10.3L17.5 7.5L12 2ZM4.8 9.2L2 12L4.8 14.8L7.6 12L4.8 9.2ZM19.2 9.2L16.4 12L19.2 14.8L22 12L19.2 9.2ZM12 12L9.3 14.7L12 17.4L14.7 14.7L12 12ZM12 22L17.5 16.5L14.7 13.7L12 16.4L9.3 13.7L6.5 16.5L12 22Z" />
                    </svg>
                    <span>Binance Pay & USDT QR Scanner</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[9px]">
                    Zero Fee
                  </span>
                </button>
              )}

              <button
                onClick={() => { onOpenSql(); setMobileMenuOpen(false); }}
                className="w-full px-4 py-3 text-left text-xs font-semibold rounded-xl text-slate-400 bg-slate-900 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Supabase SQL Tables Schema</span>
                </span>
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                  className="w-full px-4 py-3 text-left text-xs font-bold rounded-xl text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between"
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

              <div className="pt-3 border-t border-slate-800/80 mt-2 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
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

