import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_LIST } from '../../data/servicesData';
import { ServiceBreadcrumbs } from '../../components/services/ServiceBreadcrumbs';
import { setDocumentSeo } from '../../utils/setDocumentSeo';
import { ArrowRight, CheckCircle2, Code2, Smartphone, Palette, Search, ShoppingBag, Cpu, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceOverviewSkeleton } from '../../components/SkeletonLoader';
import { motion } from 'motion/react';

interface ServicesOverviewPageProps {
  onOpenContact: () => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-8 h-8 text-cyan-400" />;
    case 'Smartphone': return <Smartphone className="w-8 h-8 text-cyan-400" />;
    case 'Palette': return <Palette className="w-8 h-8 text-cyan-400" />;
    case 'Search': return <Search className="w-8 h-8 text-cyan-400" />;
    case 'ShoppingBag': return <ShoppingBag className="w-8 h-8 text-cyan-400" />;
    case 'Cpu': return <Cpu className="w-8 h-8 text-cyan-400" />;
    case 'Shield': return <Shield className="w-8 h-8 text-cyan-400" />;
    default: return <Sparkles className="w-8 h-8 text-cyan-400" />;
  }
};

export const ServicesOverviewPage: React.FC<ServicesOverviewPageProps> = ({ onOpenContact }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDocumentSeo({
      title: 'Professional Web & Digital Growth Services | Waleed Khan Afridi',
      description: 'Explore full-stack web development, mobile apps, UI/UX design, technical SEO, e-commerce stores, AI workflow automation, and website maintenance services by Waleed Khan Afridi.',
      url: 'https://waleedkhanafridi.online/services',
      image: 'https://waleedkhanafridi.online/brand-logo.jpg',
      imageAlt: 'Waleed Khan Afridi Digital Services Catalog',
      type: 'website',
      siteName: 'Waleed Khan Afridi Digital Services',
      twitterCard: 'summary_large_image',
      twitterCreator: '@waleedkhanafridi',
      keywords: 'Services, Web Development, Mobile Apps, UI UX Design, Technical SEO, E-Commerce, AI Automation, Website Maintenance, Waleed Khan Afridi'
    });
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20">
      <ServiceBreadcrumbs />

      {isLoading ? (
        <ServiceOverviewSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {/* Hero Header */}
          <section className="relative overflow-hidden py-12 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-900">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full-Stack & Growth Solutions</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Services & Technical Capabilities
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                From high-speed React web applications and mobile apps to technical SEO and AI automations, I deliver end-to-end software solutions designed to scale your business.
              </p>
            </div>
          </section>

          {/* Main Services Grid */}
          <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {SERVICES_LIST.map((service) => (
                <div
                  key={service.slug}
                  className="rounded-2xl p-7 bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                        {getIcon(service.icon)}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs font-medium text-cyan-400 mb-3">
                      {service.subtitle}
                    </p>

                    {/* Short Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Key Points Preview */}
                    <div className="space-y-2 mb-8 border-t border-slate-800/80 pt-4">
                      {service.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" />
                          <span className="truncate">{feat.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center text-sm font-bold text-cyan-400 group-hover:text-cyan-300 hover:underline"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={onOpenContact}
                      className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      Get Quote
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* Global CTA Banner */}
          <section className="py-16 bg-slate-900/60 border-t border-slate-900 text-center px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Have a Specific Project Requirement?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Whether you need a full web platform or a quick technical audit, let's build a solution tailored to your exact budget and timeframe.
              </p>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Schedule Free Consultation</span>
              </button>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
};
