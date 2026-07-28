import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles, MessageSquare, ArrowUpRight, User, KeyRound, Database, ShieldCheck, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../lib/supabase';
import brandLogoImg from '../assets/images/brand_logo_1785031049165.jpg';

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
  onOpenAndroidApp
}) => {

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: 'services', label: 'Web & SEO' },
    { id: 'digital-services', label: 'Digital Marketplace', badge: 'Instant Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'about-me', label: 'About Me' },
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
          ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/90 shadow-2xl shadow-slate-950/80 py-3.5'
          : 'bg-transparent py-5'
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
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-cyan-400 p-[1.5px] shadow-xl shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300 overflow-hidden">
                <img
                  src={brandLogoImg}
                  alt="Waleed Khan Afridi Logo"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  loading="eager"
                  className="w-full h-full object-cover rounded-[14px] group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-950 p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-emerald-400 animate-pulse" title="Available for Freelance & Digital Orders" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-black tracking-wider text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent group-hover:to-amber-300 transition-colors">
                  WALEED KHAN AFRIDI
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-[9px] font-extrabold text-amber-300 uppercase tracking-widest shadow-sm">
                  PRO
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-semibold tracking-wide flex items-center gap-1.5">
                <span className="text-cyan-400">Senior Software Architect</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300">SEO & Growth Expert</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-xl shadow-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 flex items-center gap-1.5 z-10 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-cyan-500/20 to-amber-500/30 border border-amber-500/50 rounded-full shadow-lg shadow-amber-500/15 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.badge && (
                    <span className="relative z-10 px-1.5 py-0.5 text-[9px] font-black rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 tracking-wider uppercase shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Android App Button */}
            {onOpenAndroidApp && (
              <button
                onClick={onOpenAndroidApp}
                className="px-3 py-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 rounded-xl transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
                title="Download Official Android App (APK / PWA)"
              >
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                <span className="hidden md:inline">Android App</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-extrabold uppercase">
                  APK
                </span>
              </button>
            )}

            {/* Supabase Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Marketplace Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-cyan-400 text-slate-950 font-mono shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Supabase Account / Auth Button */}
            {user ? (
              <button
                onClick={onOpenAccount}
                className="px-3 py-2 text-xs font-bold text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all flex items-center gap-2 shadow-md"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-extrabold">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden md:inline max-w-[100px] truncate">{profile?.full_name || 'Account'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-2 text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-xl transition-all flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Sign In / Register</span>
              </button>
            )}

            {/* Binance Pay Button */}
            {onOpenBinancePay && (
              <button
                onClick={onOpenBinancePay}
                className="px-3 py-2 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 rounded-xl transition-all flex items-center gap-1.5 shadow-md shrink-0"
                title="Binance Pay & Crypto Payment"
              >
                <svg className="w-3.5 h-3.5 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2L6.5 7.5L9.3 10.3L12 7.6L14.7 10.3L17.5 7.5L12 2ZM4.8 9.2L2 12L4.8 14.8L7.6 12L4.8 9.2ZM19.2 9.2L16.4 12L19.2 14.8L22 12L19.2 9.2ZM12 12L9.3 14.7L12 17.4L14.7 14.7L12 12ZM12 22L17.5 16.5L14.7 13.7L12 16.4L9.3 13.7L6.5 16.5L12 22Z" />
                </svg>
                <span className="hidden md:inline">Binance Pay</span>
              </button>
            )}

            {/* Supabase SQL Helper */}
            <button
              onClick={onOpenSql}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors hidden lg:flex items-center gap-1"
              title="Supabase SQL Schema"
            >
              <Database className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors hidden lg:flex items-center gap-1"
                title="Admin Product & Store Management Portal (Ctrl+Shift+A)"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </button>
            )}

            {/* WhatsApp Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 items-center gap-1.5 group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-100 group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
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
    </header>
  );
};

