import React from 'react';
import { Hero } from '../components/Hero';
import { GoogleAd } from '../components/GoogleAd';
import { StatsSection } from '../components/StatsSection';
import { SoftwareServices } from '../components/SoftwareServices';
import { CoreServices } from '../components/CoreServices';
import { DigitalServices } from '../components/DigitalServices';
import { AiSubscriptionMarketplace } from '../components/AiSubscriptionMarketplace';
import { About } from '../components/About';
import { AboutMeEnd } from '../components/AboutMeEnd';
import { Projects } from '../components/Projects';
import { BlogSection } from '../components/BlogSection';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { SectionTransition } from '../components/SectionTransition';
import { ServiceItem } from '../types';
import { UserProfile } from '../lib/supabase';

interface HomePageProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  user: any;
  profile: UserProfile | null;
  onOpenAccount: () => void;
  onSelectService: (service: ServiceItem) => void;
  onAddToCart: (service: ServiceItem) => void;
  onBuyNow: (service: ServiceItem) => void;
  whatsappNumber: string;
  onOpenAndroidApp: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeSection,
  scrollToSection,
  user,
  profile,
  onOpenAccount,
  onSelectService,
  onAddToCart,
  onBuyNow,
  whatsappNumber,
  onOpenAndroidApp,
}) => {
  return (
    <>
      {/* 1. Hero Section */}
      {activeSection === 'hero' && (
        <>
          <SectionTransition id="hero">
            <Hero onNavigate={scrollToSection} onOpenAndroidApp={onOpenAndroidApp} />
          </SectionTransition>

          {/* Google AdSense Responsive Banner */}
          <GoogleAd client="ca-pub-4721034449965472" slot="5355102710" />

          {/* Live Animated Stats Section */}
          <SectionTransition id="stats">
            <StatsSection />
          </SectionTransition>
        </>
      )}

      {/* 2. Unified Services Section Hub */}
      {['services', 'software-services', 'core-services', 'digital-services', 'ai-subscriptions'].includes(activeSection) && (
        <div id="services">
          <SectionTransition id="software-services">
            <SoftwareServices
              user={user}
              profile={profile}
              onOpenAccount={onOpenAccount}
            />
          </SectionTransition>

          <SectionTransition id="core-services">
            <CoreServices onNavigate={scrollToSection} />
          </SectionTransition>

          <SectionTransition id="digital-services">
            <DigitalServices
              onSelectService={onSelectService}
              whatsappNumber={whatsappNumber}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          </SectionTransition>

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

      {/* 5. Knowledge Center & Engineering Blog Section */}
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
    </>
  );
};
