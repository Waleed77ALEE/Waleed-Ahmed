import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GoogleAd } from './components/GoogleAd';
import { About } from './components/About';
import { AboutMeEnd } from './components/AboutMeEnd';
import { CoreServices } from './components/CoreServices';
import { DigitalServices } from './components/DigitalServices';
import { AiSubscriptionMarketplace } from './components/AiSubscriptionMarketplace';
import { SoftwareServices } from './components/SoftwareServices';
import { StatsSection } from './components/StatsSection';
import { Projects } from './components/Projects';
import { BlogSection } from './components/BlogSection';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { CartModal } from './components/CartModal';
import { SupabaseSqlModal } from './components/SupabaseSqlModal';
import { BinancePayModal } from './components/BinancePayModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AndroidAppModal } from './components/AndroidAppModal';
import { LegalPagesModal, LegalTabType } from './components/LegalPagesModal';
import { SeoSchemas } from './components/SeoSchemas';
import { SectionTransition } from './components/SectionTransition';
import { ServiceItem } from './types';
import {
  supabase,
  UserProfile,
  SupabaseCartItem,
  getProfile,
  fetchCart,
  addToCartDB,
  updateCartQtyDB,
  removeFromCartDB,
  clearCartDB
} from './lib/supabase';
import { recordUserSignup } from './services/userStore';

export default function App() {
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

  useEffect(() => {
    // PWA beforeinstallprompt event listener for 1-click Android installation
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 1. Initial Supabase Auth Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        loadUserProfile(currentUser.id);
        loadCart(currentUser.id);
      } else {
        loadCart(null);
      }
    });

    // 2. Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        loadUserProfile(currentUser.id);
        loadCart(currentUser.id);
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

  const loadUserProfile = async (userId: string) => {
    const prof = await getProfile(userId);
    if (prof) {
      setProfile(prof);
      recordUserSignup({
        id: prof.id,
        email: prof.email,
        fullName: prof.full_name,
        whatsapp: prof.whatsapp,
        createdAt: prof.created_at
      });
    } else if (user) {
      // Fallback for user without explicit profile row yet
      const email = user.email || '';
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0] || 'Member';
      recordUserSignup({
        id: user.id,
        email,
        fullName,
        whatsapp: user.user_metadata?.whatsapp || '',
        provider: user.app_metadata?.provider === 'google' ? 'Google' : 'Email',
        createdAt: user.created_at
      });
    }
  };

  const loadCart = async (userId: string | null) => {
    const items = await fetchCart(userId || 'guest');
    setCart(items);
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
        {/* 1. Hero Section */}
        {activeSection === 'hero' && (
          <>
            <SectionTransition id="hero">
              <Hero onNavigate={scrollToSection} onOpenAndroidApp={() => setIsAndroidAppModalOpen(true)} />
            </SectionTransition>

            {/* Google AdSense Responsive Banner */}
            <GoogleAd client="ca-pub-4721034449965472" slot="5355102710" />

            {/* Live Animated Stats Section */}
            <SectionTransition id="stats">
              <StatsSection />
            </SectionTransition>
          </>
        )}

        {/* 2. Unified Services Section Hub (Software, Core Web, Digital Services & AI Subscriptions) */}
        {['services', 'software-services', 'core-services', 'digital-services', 'ai-subscriptions'].includes(activeSection) && (
          <div id="services">
            {/* Professional Software Licenses & Digital Products Section */}
            <SectionTransition id="software-services">
              <SoftwareServices
                user={user}
                profile={profile}
                onOpenAccount={() => setIsAccountModalOpen(true)}
              />
            </SectionTransition>

            {/* Core Web & SEO Services Section */}
            <SectionTransition id="core-services">
              <CoreServices onNavigate={scrollToSection} />
            </SectionTransition>

            {/* Social Media & Digital Services Marketplace Section */}
            <SectionTransition id="digital-services">
              <DigitalServices
                onSelectService={(service) => setSelectedService(service)}
                whatsappNumber={whatsappNumber}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </SectionTransition>

            {/* Official AI Subscriptions Marketplace */}
            <SectionTransition id="ai-subscriptions">
              <AiSubscriptionMarketplace whatsappNumber={whatsappNumber} />
            </SectionTransition>
          </div>
        )}

        {/* 3. Overview About Section */}
        {activeSection === 'about' && (
          <SectionTransition id="about">
            <About />
            <AboutMeEnd whatsappNumber={whatsappNumber} onContactClick={() => scrollToSection('contact')} />
          </SectionTransition>
        )}

        {/* 4. Featured Portfolio Projects Section */}
        {activeSection === 'projects' && (
          <SectionTransition id="projects">
            <Projects onNavigateContact={() => scrollToSection('contact')} />
          </SectionTransition>
        )}

        {/* 5. Knowledge Center & Engineering Blog Section (SEO Content Depth) */}
        {activeSection === 'blog' && (
          <SectionTransition id="blog">
            <BlogSection onContactClick={() => scrollToSection('contact')} />
          </SectionTransition>
        )}

        {/* 6. Testimonials & Client Reviews Section */}
        {activeSection === 'testimonials' && (
          <SectionTransition id="testimonials">
            <Testimonials />
          </SectionTransition>
        )}

        {/* 7. Contact & Direct Order Section */}
        {activeSection === 'contact' && (
          <SectionTransition id="contact">
            <Contact whatsappNumber={whatsappNumber} user={user} />
          </SectionTransition>
        )}
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

      {/* Legal Pages Modal (Privacy, Terms, Disclaimer, Cookie Policy) */}
      <LegalPagesModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalActiveTab}
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
    </div>
  );
}

