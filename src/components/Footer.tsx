import React from 'react';
import { ArrowUp, Code2, Globe, ShieldCheck, MessageSquare } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  whatsappNumber: string;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, whatsappNumber, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">WALEED KHAN AFRIDI</span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              Senior Full Stack Developer, UI/UX Designer & SEO Specialist. Creator of waleedkhanafridi.online offering bespoke web solutions and verified social media & AI digital marketplace services.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-cyan-400 pt-1">
              <Globe className="w-3.5 h-3.5" />
              <span>waleedkhanafridi.online</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Merchant
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-me')} className="hover:text-cyan-400 transition-colors font-semibold text-cyan-300">
                  About Me
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors">
                  Web & SEO Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('digital-services')} className="hover:text-cyan-400 transition-colors text-emerald-400">
                  Digital Services Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 transition-colors">
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-cyan-400 transition-colors">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">
                  Contact & Orders
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button onClick={onOpenAdmin} className="hover:text-cyan-400 transition-colors text-slate-500 font-mono text-[10px]">
                    ⚙️ Admin Portal
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Direct Support & Social Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Direct Support & Socials</h4>
            <p className="text-slate-400 mb-3 leading-relaxed">
              Instant digital service handover & support available 24/7 on WhatsApp and official social media channels.
            </p>
            <div className="mb-4">
              <a
                href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp Direct</span>
              </a>
            </div>

            <div className="pt-2">
              <h5 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Connect with Waleed</h5>
              <SocialLinks variant="compact" whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} Waleed Khan Afridi (waleedkhanafridi.online). All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
            title="Back to Top"
          >
            <span className="text-[11px] font-semibold">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
