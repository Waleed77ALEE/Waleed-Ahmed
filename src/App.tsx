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
import { SeoSchemas } from './components/SeoSchemas';
import { ServiceItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Direct WhatsApp contact number for Waleed Khan Afridi
  const whatsappNumber = '923000000000';

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic SEO JSON-LD Schemas */}
      <SeoSchemas />

      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        whatsappNumber={whatsappNumber}
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
        <Contact whatsappNumber={whatsappNumber} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} whatsappNumber={whatsappNumber} />

      {/* Service Details Modal */}
      <ServiceDetailsModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        whatsappNumber={whatsappNumber}
        onContactClick={() => scrollToSection('contact')}
      />
    </div>
  );
}
