import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Shield,
  FileText,
  Lock,
  RefreshCw,
  Cookie,
  Award,
  Printer,
  Search,
  ChevronRight,
  HelpCircle,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  Clock,
  Globe,
  X,
  MessageSquare
} from 'lucide-react';

export interface LegalTocItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  effectiveDate: string;
  documentType: 'terms' | 'privacy' | 'refund' | 'cookie' | 'referral' | 'shipping' | 'contact';
  toc: LegalTocItem[];
  canonicalUrl: string;
  schemaJson: object;
  children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  documentType,
  toc,
  canonicalUrl,
  schemaJson,
  children
}) => {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Calculate Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Intersection observer replacement for active section TOC
      for (let i = toc.length - 1; i >= 0; i--) {
        const el = document.getElementById(toc[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(toc[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  // Inject SEO Schema.org JSON-LD Script
  useEffect(() => {
    const scriptId = `schema-legal-${documentType}`;
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = scriptId;
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }
    scriptElem.text = JSON.stringify(schemaJson);

    // Update document head title & meta tags dynamically
    document.title = `${title} | Waleed Khan Afridi Digital Agency`;

    return () => {
      const elem = document.getElementById(scriptId);
      if (elem) elem.remove();
    };
  }, [documentType, title, schemaJson]);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -100;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const legalNavItems = [
    {
      path: '/terms-and-conditions',
      label: 'Terms & Conditions',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      type: 'terms'
    },
    {
      path: '/privacy-policy',
      label: 'Privacy Policy',
      icon: <Lock className="w-4 h-4 text-cyan-400" />,
      type: 'privacy'
    },
    {
      path: '/refund-policy',
      label: 'Refund Policy',
      icon: <RefreshCw className="w-4 h-4 text-emerald-400" />,
      type: 'refund'
    },
    {
      path: '/cookie-policy',
      label: 'Cookie Policy',
      icon: <Cookie className="w-4 h-4 text-purple-400" />,
      type: 'cookie'
    },
    {
      path: '/referral-terms',
      label: 'Referral Program Terms',
      icon: <Award className="w-4 h-4 text-rose-400" />,
      type: 'referral'
    },
    {
      path: '/shipping-policy',
      label: 'Shipping & Delivery Policy',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      type: 'shipping'
    },
    {
      path: '/contact-info',
      label: 'Contact & Merchant Info',
      icon: <Building2 className="w-4 h-4 text-teal-400" />,
      type: 'contact'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 print:bg-white print:text-black">
      {/* 1. Top Reading Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-900/80 z-50 print:hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Hero Section */}
      <div className="relative pt-24 pb-12 overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 print:py-4 print:border-none">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none print:hidden" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none print:hidden" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 print:hidden">
            <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400 font-medium">Legal Compliance Center</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-bold">{title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide uppercase">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Legal &amp; Compliance Policy</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {subtitle}
              </p>

              {/* Policy Badges & Dates */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Last Updated: <strong>{lastUpdated}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Effective Date: <strong>{effectiveDate}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Domain: <strong>waleedkhanafridi.online</strong></span>
                </div>
              </div>
            </div>

            {/* Print & Share Actions */}
            <div className="flex items-center gap-3 print:hidden">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>{isCopied ? 'Link Copied!' : 'Share Document'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Sidebar & Table of Contents */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 print:hidden">
            {/* Legal Directory Navigation */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Legal Directory</span>
              </h3>

              <div className="space-y-1">
                {legalNavItems.map((item) => {
                  const isActive = documentType === item.type;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Table of Contents (TOC) */}
            {toc && toc.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Table of Contents</span>
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">{toc.length} Sections</span>
                </div>

                <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1 no-scrollbar text-xs">
                  {toc.map((item, idx) => {
                    const isSecActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleScrollTo(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] transition-all flex items-center gap-2 cursor-pointer ${
                          isSecActive
                            ? 'bg-cyan-500/20 text-cyan-300 font-extrabold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-500 w-4 text-right">{idx + 1}.</span>
                        <span className="truncate">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact Support Badge Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">Have Legal Questions?</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Our compliance team is available to clarify contractual terms, data rights, or custom service agreements.
                </p>
              </div>

              <div className="pt-1 space-y-2 text-xs">
                <a
                  href="mailto:waleedkhanafridi7@gmail.com"
                  className="flex items-center gap-2 text-cyan-300 font-mono hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>waleedkhanafridi7@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/923416860077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-300 font-mono hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+92 341 6860077</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Document Content */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Real-Time Document Search Filter */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 print:hidden shadow-lg">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                type="text"
                placeholder="Search keywords inside this document (e.g. refunds, GDPR, license, payments)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Render Main Document Body */}
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl space-y-8 print:p-0 print:border-none print:bg-transparent text-slate-300 text-sm leading-relaxed">
              {children}
            </div>

            {/* Bottom Contact Inquiry Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 space-y-4 print:hidden">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Need Further Clarification or Custom Contract Agreement?</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    For enterprise client projects, custom NDA sign-offs, or invoice inquiries, reach out directly to Waleed Khan Afridi.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/923416860077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Legal Inquiry (+92 341 6860077)</span>
                </a>

                <a
                  href="mailto:waleedkhanafridi7@gmail.com"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Email Compliance Team</span>
                </a>
              </div>
            </div>

            {/* Related Legal Pages Grid at Bottom */}
            <div className="pt-6 border-t border-slate-900 print:hidden space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Related Legal Policies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {legalNavItems
                  .filter((item) => item.type !== documentType)
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2 group"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                        <span>Read Policy</span>
                        <ArrowRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
