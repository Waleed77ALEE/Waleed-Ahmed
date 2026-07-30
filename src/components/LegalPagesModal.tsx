import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, AlertCircle, Cookie, X, Check, Lock, Globe } from 'lucide-react';

interface LegalPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms' | 'disclaimer' | 'cookies';
  initialTab?: 'privacy' | 'terms' | 'disclaimer' | 'cookies';
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
  initialTab
}) => {
  const targetTab = initialTab || defaultTab;
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms' | 'disclaimer' | 'cookies'>(targetTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(targetTab);
    }
  }, [isOpen, targetTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative my-auto"
          >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Legal Policies &amp; Compliance</h3>
                <p className="text-[11px] text-slate-400">waleedkhanafridi.online • Official Terms &amp; Privacy Standards</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation Bar */}
          <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms &amp; Conditions</span>
            </button>

            <button
              onClick={() => setActiveTab('disclaimer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'disclaimer'
                  ? 'bg-emerald-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Disclaimer</span>
            </button>

            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-purple-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Policy</span>
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white">Privacy Policy</h2>
                <p className="text-slate-400 text-xs">Last Updated: July 2026</p>

                <p>
                  At <strong>Waleed Khan Afridi (waleedkhanafridi.online)</strong>, we are committed to protecting your personal privacy in accordance with global data protection laws (GDPR, CCPA) and Google AdSense publisher policies. This Privacy Policy outlines the types of information we collect, how it is used, and how we keep your data secure.
                </p>

                <h3 className="text-base font-bold text-cyan-300">1. Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Personal Information:</strong> Name, email address, WhatsApp number, or payment verification data when placing orders or submitting contact forms.</li>
                  <li><strong>Log Files & Analytics:</strong> IP addresses, browser type, ISP, referring pages, date/time stamps, and page interaction data collected automatically via Google Analytics and server logs.</li>
                </ul>

                <h3 className="text-base font-bold text-cyan-300">2. How We Use Your Information</h3>
                <p>
                  Your information is utilized solely to provide and verify web engineering services, process marketplace orders, respond to direct inquiries, improve website usability, and fulfill legal compliance requirements. We never sell or rent user data to third parties.
                </p>

                <h3 className="text-base font-bold text-cyan-300">3. Google AdSense &amp; Third-Party Cookies</h3>
                <p>
                  Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
                </p>
                <p>
                  Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Google Ads Settings</a>.
                </p>

                <h3 className="text-base font-bold text-cyan-300">4. Contact Information</h3>
                <p>For any privacy inquiries or data requests, please contact us at: <strong>waleedkhanafridi7@gmail.com</strong> or via WhatsApp at <strong>+923416860077</strong>.</p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white">Terms &amp; Conditions</h2>
                <p className="text-slate-400 text-xs">Last Updated: July 2026</p>

                <p>
                  Welcome to <strong>waleedkhanafridi.online</strong>. By accessing this website or purchasing services from Waleed Khan Afridi, you agree to comply with and be bound by the following Terms and Conditions.
                </p>

                <h3 className="text-base font-bold text-amber-300">1. Services & Digital Products</h3>
                <p>
                  Waleed Khan Afridi provides custom web application development, technical SEO audits, digital product licenses, and growth services. All project deliverables and service scopes are finalized upon order confirmation.
                </p>

                <h3 className="text-base font-bold text-amber-300">2. Payments & Refunds</h3>
                <p>
                  Payments for digital products and services can be completed via Payoneer, Binance Pay ID, or USDT Crypto (TRC20 / BEP20). Due to the nature of digital products and instant account handovers, refunds are subject to our 30-day warranty policy in cases of unfulfilled or defective services.
                </p>

                <h3 className="text-base font-bold text-amber-300">3. Intellectual Property</h3>
                <p>
                  All custom code, brand identity assets, and blog articles published on this domain are intellectual property of Waleed Khan Afridi unless specified otherwise. Unauthorized replication without attribution is prohibited.
                </p>
              </div>
            )}

            {activeTab === 'disclaimer' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white">Disclaimer</h2>
                <p className="text-slate-400 text-xs">Last Updated: July 2026</p>

                <p>
                  All content, tools, and technical guides provided on <strong>waleedkhanafridi.online</strong> are offered for informational and professional web development purposes in good faith.
                </p>

                <h3 className="text-base font-bold text-emerald-300">1. Results Disclaimer</h3>
                <p>
                  While our technical SEO and speed optimization services follow strict industry best practices, individual Google search rankings and e-commerce conversions depend on search engine algorithms, market competition, and external business factors beyond direct control.
                </p>

                <h3 className="text-base font-bold text-emerald-300">2. Third-Party Trademarks</h3>
                <p>
                  All third-party product names, logos, and brands (such as WordPress, WooCommerce, React, Next.js, OpenAI, HeyGen, Google) belong to their respective owners. Use of these names does not imply direct official affiliation or endorsement.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white">Cookie Policy</h2>
                <p className="text-slate-400 text-xs">Last Updated: July 2026</p>

                <p>
                  This Cookie Policy explains how <strong>waleedkhanafridi.online</strong> uses cookies and similar tracking technologies to recognize you when you visit our web application.
                </p>

                <h3 className="text-base font-bold text-purple-300">1. What Are Cookies?</h3>
                <p>
                  Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work efficiently and provide analytical metrics.
                </p>

                <h3 className="text-base font-bold text-purple-300">2. Essential &amp; Advertising Cookies</h3>
                <p>
                  We use essential local storage cookies to remember your cart items, active theme, and session login state. We also utilize third-party cookies (such as Google AdSense and Analytics) for site metrics and relevant ad serving.
                </p>

                <p>
                  You can control or disable cookies directly within your web browser settings.
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close Policy Window
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
