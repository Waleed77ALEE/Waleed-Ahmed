import React, { useEffect, useState } from 'react';
import { getServiceBySlug } from '../../data/servicesData';
import { ServiceBreadcrumbs } from '../../components/services/ServiceBreadcrumbs';
import { ServiceHero } from '../../components/services/ServiceHero';
import { ServiceFeatures } from '../../components/services/ServiceFeatures';
import { ServiceProcess } from '../../components/services/ServiceProcess';
import { ServicePricing } from '../../components/services/ServicePricing';
import { ServiceFaq } from '../../components/services/ServiceFaq';
import { RelatedServices } from '../../components/services/RelatedServices';
import { ServiceCta } from '../../components/services/ServiceCta';
import { setDocumentSeo } from '../../utils/setDocumentSeo';
import { Link } from 'react-router-dom';
import { SingleServiceSkeleton } from '../../components/SkeletonLoader';
import { motion } from 'motion/react';

interface SingleServicePageProps {
  slug: string;
  onOpenContact: () => void;
}

export const SingleServicePage: React.FC<SingleServicePageProps> = ({ slug, onOpenContact }) => {
  const service = getServiceBySlug(slug);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (service) {
      const canonicalUrl = `https://waleedkhanafridi.online/services/${service.slug}`;
      const techKeywords = service.techStack.map((t) => t.name).join(', ');
      const keywords = `${service.title}, ${service.slug}, Waleed Khan Afridi, ${techKeywords}, ${service.subtitle}, Pakistan Web Developer, Freelance Engineer`;

      setDocumentSeo({
        title: service.metaTitle,
        description: service.metaDescription,
        url: canonicalUrl,
        image: service.ogImage || 'https://waleedkhanafridi.online/brand-logo.jpg',
        imageAlt: `${service.title} - Waleed Khan Afridi Digital Services`,
        type: 'service',
        siteName: 'Waleed Khan Afridi Digital Services',
        twitterCard: 'summary_large_image',
        twitterCreator: '@waleedkhanafridi',
        keywords
      });

      // Inject rich dynamic JSON-LD Service Schema for social and search crawlers
      const serviceSchemaData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: service.title,
        serviceType: service.subtitle,
        description: service.shortDescription,
        url: canonicalUrl,
        provider: {
          '@type': 'Person',
          name: 'Waleed Khan Afridi',
          url: 'https://waleedkhanafridi.online',
          jobTitle: 'Senior Full Stack Developer, UI/UX Designer & SEO Specialist'
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Worldwide'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: service.title,
          itemListElement: service.pricingPackages.map((pkg, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: pkg.name,
              description: pkg.description
            },
            price: pkg.price.replace(/[^0-9.]/g, '') || '0',
            priceCurrency: 'USD'
          }))
        }
      };

      let script = document.getElementById('single-service-jsonld') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'single-service-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(serviceSchemaData);
    } else {
      setDocumentSeo({
        title: 'Service Not Found | Waleed Khan Afridi',
        description: 'The requested service page does not exist or has been relocated.'
      });
    }

    window.scrollTo(0, 0);

    // Keep skeleton visible for a clean 550ms transition
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);

    return () => {
      clearTimeout(timer);
      const existingScript = document.getElementById('single-service-jsonld');
      if (existingScript) existingScript.remove();
    };
  }, [slug, service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
        <p className="text-slate-400 mb-6">The service page you are looking for does not exist or has been moved.</p>
        <Link to="/services" className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-16">
      {/* Requirement 7: Breadcrumbs (Home > Services > Service Name) */}
      <ServiceBreadcrumbs currentServiceName={service.title} />

      {isLoading ? (
        <SingleServiceSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {/* Hero Section */}
          <ServiceHero service={service} onOpenContact={onOpenContact} />

          {/* Detailed Features & Benefits */}
          <ServiceFeatures service={service} />

          {/* 5-Step Development Process */}
          <ServiceProcess service={service} />

          {/* Pricing Section or Request Quote */}
          <ServicePricing service={service} onOpenContact={onOpenContact} />

          {/* Frequently Asked Questions */}
          <ServiceFaq service={service} />

          {/* Requirement 8: Related Services Internal Navigation */}
          <RelatedServices currentSlug={service.slug} relatedSlugs={service.relatedServicesSlugs} />

          {/* Call to Action & Contact */}
          <ServiceCta service={service} onOpenContact={onOpenContact} />
        </motion.div>
      )}
    </div>
  );
};
