import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Code2, Globe, ShieldCheck, MessageSquare, Smartphone, FileText, BookOpen, Shield, RefreshCw, Truck, Building2, Lock } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { LegalTabType } from './LegalPagesModal';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  whatsappNumber: string;
  onOpenAdmin?: () => void;
  onOpenAndroidApp?: () => void;
  onOpenLegal?: (tab?: LegalTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  whatsappNumber,
  onOpenAdmin,
  onOpenAndroidApp,
  onOpenLegal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Merchant Headquarter */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">WALEED KHAN AFRIDI</span>
            </div>

            <p className="text-slate-400 max-w-md leading-relaxed">
              Senior Full Stack Developer, UI/UX Designer &amp; Digital Growth Agency. Creator of waleedkhanafridi.online offering bespoke web solutions, technical engineering articles, and verified digital services.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1 text-slate-300">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Waleed Khan Afridi Digital Agency</span>
              </div>
              <p className="text-slate-400">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
              <div className="flex items-center gap-3 text-slate-400 pt-0.5 flex-wrap">
                <span>Phone: <strong className="text-white font-mono">+92 341 6860077</strong></span>
                <span>•</span>
                <span>Email: <strong className="text-cyan-300 font-mono">waleedkhanafridi7@gmail.com</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors font-semibold text-cyan-300 cursor-pointer">
                  About Waleed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-cyan-400 transition-colors text-amber-300 font-bold flex items-center gap-1 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Blog &amp; Knowledge Center</span>
                </button>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors cursor-pointer text-slate-300">
                  Services Catalog &amp; Solutions
                </Link>
              </li>
              <li>
                <button onClick={() => onNavigate('digital-services')} className="hover:text-cyan-400 transition-colors text-emerald-400 cursor-pointer">
                  Digital Marketplace
                </button>
              </li>
              <li>
                <Link to="/referralpro" className="hover:text-amber-300 transition-colors text-amber-400 font-bold flex items-center gap-1 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>ReferralPro Partner Portal (Earn 25%)</span>
                </Link>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Portfolio Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Contact &amp; Direct Support
                </button>
              </li>
              {onOpenAndroidApp && (
                <li>
                  <button onClick={onOpenAndroidApp} className="hover:text-emerald-300 transition-colors text-emerald-400 font-bold flex items-center gap-1 cursor-pointer">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Download Android App (APK)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Legal & Payment Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Merchant Compliance &amp; Policies</h4>
            <ul className="space-y-2 mb-4">
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('privacy')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('terms')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('refund')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Refund &amp; Return Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('shipping')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Truck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Shipping &amp; Delivery Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('contact')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Contact &amp; Merchant Info</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('disclaimer')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Disclaimer</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('cookies')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cookie Policy</span>
                </button>
              </li>
            </ul>

            <div className="pt-1">
              <h5 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Connect with Waleed</h5>
              <SocialLinks variant="compact" whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </div>

        {/* Merchant Payment Badges & SSL Compliance Bar */}
        <div className="py-4 my-6 border-y border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400 bg-slate-950/60 rounded-2xl px-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">256-Bit SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-bold text-white text-[10px]">STRIPE VERIFIED</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-bold text-cyan-400 text-[10px]">VISA / MASTERCARD</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-bold text-amber-400 text-[10px]">BINANCE PAY</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-bold text-emerald-400 text-[10px]">PAYONEER / CRYPTO</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 font-bold text-emerald-400 text-[10px]">30-DAY GUARANTEE</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} Waleed Khan Afridi (waleedkhanafridi.online). All Rights Reserved. Merchant &amp; Payment Processor Compliant.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
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

