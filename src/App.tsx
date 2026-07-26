import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CoreServices } from './components/CoreServices';
import { DigitalServices } from './components/DigitalServices';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { AboutMeEnd } from './components/AboutMeEnd';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { CartModal } from './components/CartModal';
import { SupabaseSqlModal } from './components/SupabaseSqlModal';
import { BinancePayModal } from './components/BinancePayModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { SeoSchemas } from './components/SeoSchemas';
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

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

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

  // Direct WhatsApp contact number for Waleed Khan Afridi
  const whatsappNumber = '923000000000';

  useEffect(() => {
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

    // Check hash for #admin
    if (window.location.hash === '#admin') {
      setIsAdminModalOpen(true);
    }

    // Keyboard shortcut (Ctrl+Shift+A) to open Admin Portal
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    // Scroll Spy Listener
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'digital-services', 'projects', 'testimonials', 'about-me', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const loadUserProfile = async (userId: string) => {
    const prof = await getProfile(userId);
    if (prof) setProfile(prof);
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
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
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onNavigate={scrollToSection} />

        {/* 2. Overview About Section */}
        <About />

        {/* 3. Core Web & SEO Services Section */}
        <CoreServices onNavigate={scrollToSection} />

        {/* 4. Social Media & Digital Services Marketplace Section */}
        <DigitalServices
          onSelectService={(service) => setSelectedService(service)}
          whatsappNumber={whatsappNumber}
          onAddToCart={handleAddToCart}
        />

        {/* 5. Featured Portfolio Projects Section */}
        <Projects />

        {/* 6. Testimonials & Client Reviews Section */}
        <Testimonials />

        {/* 7. Detailed About Me Section at the end */}
        <AboutMeEnd
          whatsappNumber={whatsappNumber}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 8. Contact & Direct Order Section */}
        <Contact whatsappNumber={whatsappNumber} user={user} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        whatsappNumber={whatsappNumber}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Service Details Modal */}
      <ServiceDetailsModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        whatsappNumber={whatsappNumber}
        onContactClick={() => scrollToSection('contact')}
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
      />

      {/* Admin Product & Store Management Portal Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

