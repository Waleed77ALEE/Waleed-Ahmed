import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, AlertCircle, Cookie, X, Check, Lock, Globe, RefreshCw, Truck, Phone, Mail, MapPin, Clock, Building2, CreditCard } from 'lucide-react';

export type LegalTabType = 'privacy' | 'terms' | 'refund' | 'shipping' | 'contact' | 'disclaimer' | 'cookies';

interface LegalPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: LegalTabType;
  initialTab?: LegalTabType;
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
  initialTab
}) => {
  const targetTab = initialTab || defaultTab;
  const [activeTab, setActiveTab] = useState<LegalTabType>(targetTab);

  useEffect(() => {
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
                <h3 className="text-base font-extrabold text-white">Merchant Legal &amp; Compliance Portal</h3>
                <p className="text-[11px] text-slate-400">waleedkhanafridi.online • Payment Processor Compliant (Stripe / Paddle / 2Checkout)</p>
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
          <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms &amp; Conditions</span>
            </button>

            <button
              onClick={() => setActiveTab('refund')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'refund'
                  ? 'bg-emerald-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refund &amp; Return Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'shipping'
                  ? 'bg-sky-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Shipping &amp; Delivery</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-teal-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={() => setActiveTab('disclaimer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'disclaimer'
                  ? 'bg-indigo-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Disclaimer</span>
            </button>

            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
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
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <span>Privacy Policy</span>
                </h2>
                <p className="text-slate-400 text-xs">Effective Date: January 1, 2026 | Last Updated: July 2026</p>

                <p>
                  At <strong>Waleed Khan Afridi Digital Agency (waleedkhanafridi.online)</strong>, operating as an international digital software development agency and digital service provider, we hold your privacy and data security in the highest regard. This Privacy Policy details our practices regarding the collection, storage, protection, and processing of personal data in compliance with General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and global merchant payment processor policies (Stripe, Paddle, 2Checkout).
                </p>

                <h3 className="text-base font-bold text-cyan-300">1. Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Account & Contact Information:</strong> Full name, email address, phone/WhatsApp number, billing address, and country of residence provided during order placement or account registration.</li>
                  <li><strong>Payment & Transaction Records:</strong> Order identification, purchased digital service/license IDs, transaction timestamps, payment method type (Credit Card, Payoneer, Binance Pay, USDT), and transaction verification hashes. <em>Note: We never store full credit card numbers or sensitive financial credentials on our servers.</em></li>
                  <li><strong>Technical & System Logs:</strong> IP addresses, browser specifications, operating system, referring URL, date/time stamps, and session metrics collected via server logs and Google Analytics.</li>
                </ul>

                <h3 className="text-base font-bold text-cyan-300">2. Purpose of Data Processing</h3>
                <p>
                  We collect and use your data strictly for legitimate business purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fulfilling custom web development agreements and issuing digital product keys or account credentials.</li>
                  <li>Processing payments securely and preventing fraudulent or unauthorized transactions.</li>
                  <li>Providing customer support, warranty replacements, and technical assistance.</li>
                  <li>Complying with accounting, tax, legal, and payment processor verification requirements.</li>
                </ul>

                <h3 className="text-base font-bold text-cyan-300">3. Data Sharing & Third-Party Service Providers</h3>
                <p>
                  We strictly do NOT sell, rent, or trade your personal information. Data is only shared with trusted partners essential to operating our digital agency:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Payment Gateways:</strong> Stripe, Payoneer, Binance Pay, and merchant banking networks to authorize and process payments.</li>
                  <li><strong>Cloud Infrastructure & Database Services:</strong> Supabase PostgreSQL, Google Cloud, and encrypted storage vaults for secure order delivery.</li>
                  <li><strong>Analytics & Advertising:</strong> Google Analytics and Google AdSense for site operational metrics and ad compliance.</li>
                </ul>

                <h3 className="text-base font-bold text-cyan-300">4. Data Rights & Protection</h3>
                <p>
                  Under international privacy laws, you possess the right to access, rectify, request erasure, or restrict the processing of your personal data. To exercise any data protection request, email us at <strong>waleedkhanafridi7@gmail.com</strong>.
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Terms &amp; Conditions</span>
                </h2>
                <p className="text-slate-400 text-xs">Effective Date: January 1, 2026 | Last Updated: July 2026</p>

                <p>
                  Welcome to <strong>waleedkhanafridi.online</strong>. These Terms and Conditions constitute a legally binding agreement between you ("Client" or "User") and <strong>Waleed Khan Afridi Digital Agency</strong> regarding your use of our website, web development services, software licenses, and digital account handovers.
                </p>

                <h3 className="text-base font-bold text-amber-300">1. Scope of Digital Services</h3>
                <p>
                  Waleed Khan Afridi offers custom web software engineering, UI/UX design, technical SEO audits, digital growth services, verified AI tool accounts, and genuine software license keys. All project deliverables and service parameters are explicitly outlined on service detail pages and order receipts.
                </p>

                <h3 className="text-base font-bold text-amber-300">2. Order Acceptance &amp; Payment Terms</h3>
                <p>
                  Orders placed through our website or direct channels are accepted upon payment authorization. Prices are displayed in USD (US Dollars) or equivalent local currency. By submitting an order, you warrant that you are authorized to use the chosen payment method and that all provided information is truthful and accurate.
                </p>

                <h3 className="text-base font-bold text-amber-300">3. Client Obligations &amp; Acceptable Use</h3>
                <p>
                  Clients must refrain from using provided software applications, API keys, or digital accounts for unlawful activities, spamming, reverse engineering, or breaching third-party provider terms of service.
                </p>

                <h3 className="text-base font-bold text-amber-300">4. Intellectual Property Rights</h3>
                <p>
                  For custom web application development, upon final payment settlement, clients receive full operational rights and license to the custom codebase as defined in the scope of work. All proprietary branding, design templates, and website content on this domain remain the intellectual property of Waleed Khan Afridi.
                </p>

                <h3 className="text-base font-bold text-amber-300">5. Limitation of Liability &amp; Governing Law</h3>
                <p>
                  In no event shall Waleed Khan Afridi Digital Agency be liable for indirect, incidental, or consequential damages exceeding the amount paid by the client for the specific service rendered. These terms shall be governed by and construed in accordance with applicable international commercial laws.
                </p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-emerald-400" />
                  <span>Refund &amp; Return Policy</span>
                </h2>
                <p className="text-slate-400 text-xs">Merchant Compliance Policy | 30-Day Money Back &amp; Replacement Guarantee</p>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-2">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>30-Day Money Back &amp; Replacement Assurance</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    At Waleed Khan Afridi Digital Agency, customer satisfaction is our top priority. We offer a transparent, hassle-free 30-day replacement and refund guarantee for unfulfilled digital orders or defective digital assets.
                  </p>
                </div>

                <h3 className="text-base font-bold text-emerald-300">1. Refund Eligibility Conditions</h3>
                <p>You are entitled to a 100% full refund or immediate free replacement under the following circumstances:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Unfulfilled Service/Order:</strong> If we fail to deliver your digital software license, AI account credentials, or initiate your service within the stated delivery timeframe.</li>
                  <li><strong>Defective Digital Asset:</strong> If a delivered account key or license is invalid or non-functional upon delivery and cannot be resolved or replaced within 24 hours.</li>
                  <li><strong>Non-Conformity:</strong> If custom web software development deliverables significantly deviate from agreed scope requirements prior to project acceptance.</li>
                </ul>

                <h3 className="text-base font-bold text-emerald-300">2. Non-Refundable Scenarios</h3>
                <p>Refunds cannot be granted under the following conditions:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Digital keys or accounts that have been successfully redeemed, fully consumed, or altered by the customer.</li>
                  <li>Account suspensions or restrictions caused by customer violation of third-party platform rules post-handover.</li>
                  <li>Custom software engineering projects that have reached final client sign-off and source code handover.</li>
                </ul>

                <h3 className="text-base font-bold text-emerald-300">3. How to Request a Refund</h3>
                <p>
                  To initiate a refund or replacement claim:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Contact our official support team at <strong>waleedkhanafridi7@gmail.com</strong> or via WhatsApp at <strong>+92 341 6860077</strong>.</li>
                  <li>Provide your Order ID, proof of purchase receipt, and a brief description of the issue.</li>
                  <li>Our support team will review your claim within <strong>12 to 24 hours</strong>.</li>
                  <li>Approved refunds will be processed back to your original payment method (Credit Card, Stripe, Payoneer, or Crypto Wallet) within <strong>3 to 5 business days</strong>.</li>
                </ol>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-sky-400" />
                  <span>Shipping &amp; Service Delivery Policy</span>
                </h2>
                <p className="text-slate-400 text-xs">Digital Fulfillment Policy | Zero Physical Shipping Fee</p>

                <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sky-200">
                  <p className="text-xs">
                    <strong>Notice:</strong> All products and services offered on <em>waleedkhanafridi.online</em> are <strong>100% digital</strong>. We do not ship physical packages, paper vouchers, or boxed software. Consequently, there are <strong>$0 shipping fees</strong> charged on any order worldwide.
                  </p>
                </div>

                <h3 className="text-base font-bold text-sky-300">1. Delivery Channels</h3>
                <p>Upon order confirmation and payment clearance, digital goods and services are delivered via:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Instant Client Dashboard:</strong> Encrypted digital vault in your user account portal.</li>
                  <li><strong>Official Email Delivery:</strong> Directly to your registered email address with invoice and access credentials.</li>
                  <li><strong>WhatsApp Instant Handover:</strong> Direct delivery via verified support (+92 341 6860077) for immediate setup assistance.</li>
                </ul>

                <h3 className="text-base font-bold text-sky-300">2. Delivery Timeframes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 pr-4">Service / Product Category</th>
                        <th className="py-2 pr-4">Delivery Timeframe</th>
                        <th className="py-2">Fulfillment Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-white">AI Subscriptions &amp; Licenses</td>
                        <td className="py-2.5 pr-4 text-emerald-400 font-medium">Instant – 60 Minutes</td>
                        <td className="py-2.5">Email / Dashboard / WhatsApp</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-white">Software License Keys</td>
                        <td className="py-2.5 pr-4 text-emerald-400 font-medium">Instant – 1 Hour</td>
                        <td className="py-2.5">Digital Key Vault / Email</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-white">Social Media Growth Services</td>
                        <td className="py-2.5 pr-4 text-amber-300 font-medium">1 – 24 Hours</td>
                        <td className="py-2.5">Drip-Feed Growth Dispatch</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-white">Technical SEO &amp; Speed Optimization</td>
                        <td className="py-2.5 pr-4 text-sky-300 font-medium">1 – 3 Business Days</td>
                        <td className="py-2.5">Audit Report &amp; Live Deployment</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-semibold text-white">Custom Full Stack Web Engineering</td>
                        <td className="py-2.5 pr-4 text-sky-300 font-medium">3 – 7 Business Days</td>
                        <td className="py-2.5">Staging Link &amp; GitHub Handover</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-base font-bold text-sky-300">3. Delivery Delay Guarantee</h3>
                <p>
                  In the rare event that digital service delivery exceeds the stated timeframe by more than 24 hours without prior notice, you may request a 100% full cancellation and refund or elect to receive a complimentary bonus credit upgrade.
                </p>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-400" />
                  <span>Merchant Identity &amp; Contact Details</span>
                </h2>
                <p className="text-slate-400 text-xs">Official Merchant Verification &amp; Business Address</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      <Building2 className="w-4 h-4" />
                      <span>Legal Business Entity</span>
                    </div>
                    <p className="text-sm font-extrabold text-white">Waleed Khan Afridi Digital Agency</p>
                    <p className="text-xs text-slate-400">Registered International Software &amp; Digital Services Agency</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      <span>Local Office &amp; Business Address</span>
                    </div>
                    <p className="text-xs font-semibold text-white leading-relaxed">
                      Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan
                    </p>
                    <p className="text-[11px] text-slate-400">Physical Business Premises &amp; Merchant Hub</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Phone className="w-4 h-4" />
                      <span>Official Contact Phone &amp; WhatsApp</span>
                    </div>
                    <p className="text-sm font-extrabold text-white font-mono">+92 341 6860077</p>
                    <p className="text-xs text-slate-400">Direct Merchant Line &amp; Instant WhatsApp Handover</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                      <Mail className="w-4 h-4" />
                      <span>Professional Email Address</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-cyan-300">waleedkhanafridi7@gmail.com</p>
                    <p className="text-[11px] text-slate-400">Formal Contract Quotes, Orders &amp; Compliance Inquiries</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="font-bold text-white">Business Hours: </span>
                      <span className="text-slate-300">Monday – Saturday: 09:00 AM – 10:00 PM (PKT / UTC+5)</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-[11px]">
                    24/7 Digital Dispatch Active
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'disclaimer' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-indigo-400" />
                  <span>Disclaimer</span>
                </h2>
                <p className="text-slate-400 text-xs">Last Updated: July 2026</p>

                <p>
                  All content, technical guides, software license descriptions, and digital tools provided on <strong>waleedkhanafridi.online</strong> are offered in good faith for informational and professional web development services.
                </p>

                <h3 className="text-base font-bold text-indigo-300">1. Results & Performance Disclaimer</h3>
                <p>
                  While our technical SEO, speed optimization, and custom software builds strictly adhere to modern industry standards, search engine rankings and business conversions depend on market competition, algorithmic updates, and external factors beyond direct human control.
                </p>

                <h3 className="text-base font-bold text-indigo-300">2. Third-Party Trademarks</h3>
                <p>
                  All product names, logos, brands, and registered trademarks (such as React, Next.js, WordPress, WooCommerce, OpenAI, HeyGen, Google, Microsoft) referenced on this website belong to their respective trademark holders. Use of these names does not imply official partnership or endorsement unless explicitly stated.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-purple-400" />
                  <span>Cookie Policy</span>
                </h2>
                <p className="text-slate-400 text-xs">Last Updated: July 2026</p>

                <p>
                  This Cookie Policy outlines how <strong>waleedkhanafridi.online</strong> utilizes cookies and local storage technologies to enhance user experience, preserve cart state, and gather site performance metrics.
                </p>

                <h3 className="text-base font-bold text-purple-300">1. Essential Local Storage</h3>
                <p>
                  We utilize essential local storage and browser session tokens to maintain your shopping cart items, active theme state, currency settings, and user session authentication.
                </p>

                <h3 className="text-base font-bold text-purple-300">2. Advertising & Analytics Cookies</h3>
                <p>
                  Third-party partners, including Google AdSense and Google Analytics, set analytics and advertising cookies to analyze traffic patterns and display relevant ads to visitors. You can adjust your cookie settings at any time in your web browser preferences or visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Google Ad Settings</a>.
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Merchant Policy • SSL Encrypted</span>
            </div>
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

