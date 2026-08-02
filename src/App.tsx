import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { CartModal } from './components/CartModal';
import { SeoSchemas } from './components/SeoSchemas';
import { ServiceItem } from './types';

// Eager Main Entry Page
import { HomePage } from './pages/HomePage';

// Lazy Loaded Secondary Pages
const MarketplacePage = lazy(() => import('./pages/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const ServicesOverviewPage = lazy(() => import('./pages/services/ServicesOverviewPage').then(m => ({ default: m.ServicesOverviewPage })));
const WebDevelopmentPage = lazy(() => import('./pages/services/WebDevelopmentPage').then(m => ({ default: m.WebDevelopmentPage })));
const MobileAppDevelopmentPage = lazy(() => import('./pages/services/MobileAppDevelopmentPage').then(m => ({ default: m.MobileAppDevelopmentPage })));
const UiUxDesignPage = lazy(() => import('./pages/services/UiUxDesignPage').then(m => ({ default: m.UiUxDesignPage })));
const SeoPage = lazy(() => import('./pages/services/SeoPage').then(m => ({ default: m.SeoPage })));
const EcommerceDevelopmentPage = lazy(() => import('./pages/services/EcommerceDevelopmentPage').then(m => ({ default: m.EcommerceDevelopmentPage })));
const AiAutomationPage = lazy(() => import('./pages/services/AiAutomationPage').then(m => ({ default: m.AiAutomationPage })));
const WebsiteMaintenancePage = lazy(() => import('./pages/services/WebsiteMaintenancePage').then(m => ({ default: m.WebsiteMaintenancePage })));
const SingleServicePage = lazy(() => import('./pages/services/SingleServicePage').then(m => ({ default: m.SingleServicePage })));
const ReferralProPage = lazy(() => import('./pages/ReferralProPage').then(m => ({ default: m.ReferralProPage })));
const JazzCashPaymentPage = lazy(() => import('./pages/JazzCashPaymentPage').then(m => ({ default: m.JazzCashPaymentPage })));
const AiSeoManagerPage = lazy(() => import('./pages/AiSeoManagerPage').then(m => ({ default: m.AiSeoManagerPage })));

// Lazy Loaded Modals
const SupabaseSqlModal = lazy(() => import('./components/SupabaseSqlModal').then(m => ({ default: m.SupabaseSqlModal })));
const BinancePayModal = lazy(() => import('./components/BinancePayModal').then(m => ({ default: m.BinancePayModal })));
const AdminPanelModal = lazy(() => import('./components/AdminPanelModal').then(m => ({ default: m.AdminPanelModal })));
const AndroidAppModal = lazy(() => import('./components/AndroidAppModal').then(m => ({ default: m.AndroidAppModal })));
const LegalPagesModal = lazy(() => import('./components/LegalPagesModal').then(m => ({ default: m.LegalPagesModal })));
import type { LegalTabType } from './components/LegalPagesModal';

import {
  supabase,
  UserProfile,
  SupabaseCartItem,
  getProfile,
  upsertProfile,
  fetchCart,
  addToCartDB,
  updateCartQtyDB,
  removeFromCartDB,
  clearCartDB
} from './lib/supabase';
import { recordUserSignup } from './services/userStore';
import { trackReferralFromUrl } from './services/referralStore';

const DynamicServiceRoute: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const { slug } = useParams<{ slug: string }>();
  return <SingleServicePage slug={slug || ''} onOpenContact={onOpenContact} />;
};

const LoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-16 text-center">
    <div className="w-10 h-10 border-3 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-3" />
    <p className="text-xs text-slate-400 font-medium tracking-wide">Loading content...</p>
  </div>
);

export default function App() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedServiceForPayment, setSelectedServiceForPayment] = useState<ServiceItem | null>(null);

  // Supabase State
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<SupabaseCartItem[]>([]);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [isBinanceModalOpen, setIsBinanceModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAndroidAppModalOpen, setIsAndroidAppModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalActiveTab, setLegalActiveTab] = useState<LegalTabType>('privacy');

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Direct WhatsApp contact number for Waleed Khan Afridi
  const whatsappNumber = '+923416860077';

  const loadUserProfile = async (userId: string, authUserParam?: any) => {
    try {
      const prof = await getProfile(userId);
      const targetUser = authUserParam || user;

      if (prof) {
        setProfile(prof);
        recordUserSignup({
          id: prof.id,
          email: prof.email,
          fullName: prof.full_name,
          whatsapp: prof.whatsapp,
          provider: targetUser?.app_metadata?.provider === 'google' ? 'Google' : 'Email',
          createdAt: prof.created_at
        });
      } else if (targetUser) {
        // Automatic profile creation on first login (e.g. Google OAuth)
        const email = targetUser.email || '';
        const fullName =
          targetUser.user_metadata?.full_name ||
          targetUser.user_metadata?.name ||
          email.split('@')[0] ||
          'Member';
        const whatsapp = targetUser.user_metadata?.whatsapp || '';

        const newProf: UserProfile = {
          id: userId,
          email,
          full_name: fullName,
          whatsapp,
          created_at: new Date().toISOString()
        };

        console.log('👤 Creating automatic profile record for first-time Google sign-in user:', newProf);
        await upsertProfile(newProf);
        setProfile(newProf);

        recordUserSignup({
          id: userId,
          email,
          fullName,
          whatsapp,
          provider: targetUser.app_metadata?.provider === 'google' ? 'Google' : 'Email',
          createdAt: targetUser.created_at || new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('loadUserProfile error:', err);
    }
  };

  const loadCart = async (userId: string | null) => {
    const items = await fetchCart(userId || 'guest');
    setCart(items);
  };

  useEffect(() => {
    // PWA beforeinstallprompt event listener for 1-click Android installation
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 1. Initial Supabase Auth Check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ Supabase getSession error:', error.message);
      }
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        console.log('✅ Active Supabase user session detected:', currentUser.email);
        loadUserProfile(currentUser.id, currentUser);
        loadCart(currentUser.id);
      } else {
        loadCart(null);
      }
    });

    // 2. Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`🔔 Supabase Auth Event [${event}]:`, session?.user?.email || 'No user session');
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        await loadUserProfile(currentUser.id, currentUser);
        loadCart(currentUser.id);

        // Redirect user back to page they came from after successful Google or Email login
        try {
          const savedReturnPath = localStorage.getItem('auth_redirect_after_login');
          if (savedReturnPath) {
            localStorage.removeItem('auth_redirect_after_login');
            const currentFullPath = window.location.pathname + window.location.search + window.location.hash;
            if (savedReturnPath && savedReturnPath !== currentFullPath) {
              console.log('↪️ Restoring pre-login return path:', savedReturnPath);
              window.history.replaceState(null, '', savedReturnPath);
            }
          }
        } catch (e) {
          console.warn('Unable to restore auth_redirect_after_login:', e);
        }
      } else {
        setProfile(null);
        loadCart(null);
      }
    });

    // Check hash for #admin or #apk or #privacy or #terms
    if (window.location.hash === '#admin') {
      setIsAdminModalOpen(true);
    } else if (window.location.hash === '#apk' || window.location.hash === '#android') {
      setIsAndroidAppModalOpen(true);
    } else if (window.location.hash === '#privacy') {
      setLegalActiveTab('privacy');
      setIsLegalModalOpen(true);
    } else if (window.location.hash === '#terms') {
      setLegalActiveTab('terms');
      setIsLegalModalOpen(true);
    }

    // Keyboard shortcut (Ctrl+Shift+A) to open Admin Portal
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Track deep link referral parameters on route or query change
  useEffect(() => {
    trackReferralFromUrl();
  }, [location.pathname, location.search]);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted Android PWA app installation');
        }
        setDeferredPrompt(null);
      });
    } else {
      alert('To install on Android: Open in Google Chrome, tap the 3 dots menu (⋮) in the top right, and select "Install app" or "Add to Home screen".');
    }
  };

  const handleAddToCart = async (service: ServiceItem) => {
    const updatedCart = await addToCartDB(user?.id || null, {
      service_id: service.id,
      title: service.title,
      category: service.category,
      price: service.price,
      quantity: 1,
      delivery: service.delivery
    });
    setCart(updatedCart);
    setIsCartModalOpen(true);
  };

  const handleUpdateCartQty = async (cartItemId: string, qty: number) => {
    const updated = await updateCartQtyDB(user?.id || null, cartItemId, qty);
    setCart(updated);
  };

  const handleRemoveCartItem = async (cartItemId: string) => {
    const updated = await removeFromCartDB(user?.id || null, cartItemId);
    setCart(updated);
  };

  const handleClearCart = async () => {
    await clearCartDB(user?.id || null);
    setCart([]);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    loadCart(null);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Switch page/tab and scroll to section or top of the page elegantly
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const openLegalModal = (tab: LegalTabType = 'privacy') => {
    setLegalActiveTab(tab);
    setIsLegalModalOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuyNow = (service: ServiceItem) => {
    setSelectedServiceForPayment(service);
    setIsBinanceModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden relative bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic SEO JSON-LD Schemas */}
      <SeoSchemas />

      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        whatsappNumber={whatsappNumber}
        user={user}
        profile={profile}
        cartCount={totalCartCount}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onOpenCart={() => setIsCartModalOpen(true)}
        onOpenSql={() => setIsSqlModalOpen(true)}
        onOpenBinancePay={() => setIsBinanceModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenAndroidApp={() => setIsAndroidAppModalOpen(true)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Main Content Sections */}
      <main className="w-full max-w-full overflow-x-hidden relative pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location}>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <HomePage
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    user={user}
                    profile={profile}
                    onOpenAccount={() => setIsAccountModalOpen(true)}
                    onSelectService={(service) => setSelectedService(service)}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    whatsappNumber={whatsappNumber}
                    onOpenAndroidApp={() => setIsAndroidAppModalOpen(true)}
                  />
                }
              />

              {/* Marketplace Subpage */}
              <Route
                path="/market"
                element={
                  <MarketplacePage
                    user={user}
                    profile={profile}
                    onOpenAccount={() => setIsAccountModalOpen(true)}
                    whatsappNumber={whatsappNumber}
                  />
                }
              />

              {/* Requirement 2: Services Overview Route */}
              <Route
                path="/services"
                element={
                  <ServicesOverviewPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />

              {/* Requirement 2 & 3: Individual Service Page Routes */}
              <Route
                path="/services/web-development"
                element={
                  <WebDevelopmentPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />
              <Route
                path="/services/mobile-app-development"
                element={
                  <MobileAppDevelopmentPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />
              <Route
                path="/services/ui-ux-design"
                element={
                  <UiUxDesignPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />
              <Route
                path="/services/seo"
                element={
                  <SeoPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />
              <Route
                path="/services/ecommerce-development"
                element={
                  <EcommerceDevelopmentPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />
              <Route
                path="/services/ai-automation"
                element={
                  <AiAutomationPage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />
              <Route
                path="/services/website-maintenance"
                element={
                  <WebsiteMaintenancePage
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />

              {/* Dynamic Fallback Service Slug */}
              <Route
                path="/services/:slug"
                element={
                  <DynamicServiceRoute
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />

              {/* Requirement: ReferralPro Affiliate Portal Route */}
              <Route
                path="/referralpro"
                element={
                  <ReferralProPage
                    user={user}
                    profile={profile}
                    onOpenAuth={() => setIsAuthModalOpen(true)}
                    whatsappNumber={whatsappNumber}
                    onOpenContact={() => scrollToSection('contact')}
                  />
                }
              />

              {/* Dedicated JazzCash Payment Route */}
              <Route path="/jazzcash" element={<JazzCashPaymentPage />} />
              <Route path="/pay-jazzcash" element={<JazzCashPaymentPage />} />

              {/* Dedicated Autonomous AI SEO Agent Platform Route */}
              <Route path="/seo-agent" element={<AiSeoManagerPage />} />
              <Route path="/ai-seo-manager" element={<AiSeoManagerPage />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        whatsappNumber={whatsappNumber}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenAndroidApp={() => setIsAndroidAppModalOpen(true)}
        onOpenLegal={openLegalModal}
      />

      {/* Service Details Modal */}
      <ServiceDetailsModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        whatsappNumber={whatsappNumber}
        onContactClick={() => scrollToSection('contact')}
        onBuyNow={handleBuyNow}
      />

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          if (user?.id) {
            loadUserProfile(user.id);
            loadCart(user.id);
          }
        }}
      />

      {/* Supabase Account & Orders Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        user={user}
        profile={profile}
        onProfileUpdate={() => user?.id && loadUserProfile(user.id)}
        onSignOut={handleSignOut}
        whatsappNumber={whatsappNumber}
      />

      {/* Supabase Cart & Checkout Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        user={user}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        whatsappNumber={whatsappNumber}
        onOrderCompleted={() => {
          if (user?.id) loadCart(user.id);
        }}
      />

      <Suspense fallback={null}>
        {/* Supabase SQL Schema Viewer Modal */}
        <SupabaseSqlModal
          isOpen={isSqlModalOpen}
          onClose={() => setIsSqlModalOpen(false)}
        />

        {/* Binance Pay & Payment Proof Modal */}
        <BinancePayModal
          isOpen={isBinanceModalOpen}
          onClose={() => setIsBinanceModalOpen(false)}
          whatsappNumber={whatsappNumber}
          totalAmount={selectedServiceForPayment ? selectedServiceForPayment.price : 0}
          serviceTitle={selectedServiceForPayment ? selectedServiceForPayment.title : ''}
        />

        {/* Admin Product & Store Management Portal Modal */}
        <AdminPanelModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />

        {/* Android APK & PWA App Download Portal Modal */}
        <AndroidAppModal
          isOpen={isAndroidAppModalOpen}
          onClose={() => setIsAndroidAppModalOpen(false)}
          deferredPrompt={deferredPrompt}
          onInstallPWA={handleInstallPWA}
        />

        {/* Merchant Legal Policies & Compliance Modal */}
        <LegalPagesModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
          defaultTab={legalActiveTab}
        />
      </Suspense>
    </div>
  );
}

