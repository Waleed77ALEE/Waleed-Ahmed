import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { 
  Shield, FileText, CheckCircle2, AlertTriangle, Scale, Lock, 
  RefreshCw, Award, Globe, Building2, User, CreditCard, ShoppingBag, 
  Terminal, Server, HelpCircle, Copy, Check, Bookmark, ExternalLink,
  ChevronRight, Sparkles, Send, Phone, Mail
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { subsection } = useParams<{ subsection?: string }>();
  const location = useLocation();
  const [copiedSublink, setCopiedSublink] = useState<string | null>(null);

  const toc: LegalTocItem[] = [
    { id: 'sec-1', title: '1. Introduction & Overview' },
    { id: 'sec-2', title: '2. Acceptance of Terms' },
    { id: 'sec-3', title: '3. User Eligibility & Capacity' },
    { id: 'sec-4', title: '4. Account Registration & Security' },
    { id: 'sec-5', title: '5. Services & Software Marketplace' },
    { id: 'sec-6', title: '6. Pricing, Payments & Tax' },
    { id: 'sec-7', title: '7. Digital Product Delivery' },
    { id: 'sec-8', title: '8. Subscriptions & AI Licenses' },
    { id: 'sec-9', title: '9. Shared Account & Usage Rules' },
    { id: 'sec-10', title: '10. Referral & Partner Program' },
    { id: 'sec-11', title: '11. Acceptable Use Policy' },
    { id: 'sec-12', title: '12. Intellectual Property Rights' },
    { id: 'sec-13', title: '13. Copyright & DMCA Policy' },
    { id: 'sec-14', title: '14. Limitation of Liability' },
    { id: 'sec-15', title: '15. Disclaimer of Warranties' },
    { id: 'sec-16', title: '16. Third-Party Services & Links' },
    { id: 'sec-17', title: '17. Suspension & Termination' },
    { id: 'sec-18', title: '18. Indemnification' },
    { id: 'sec-19', title: '19. Governing Law & Jurisdiction' },
    { id: 'sec-20', title: '20. Dispute Resolution' },
    { id: 'sec-21', title: '21. Modifications to Terms' },
    { id: 'sec-22', title: '22. Contact & Legal Notices' }
  ];

  // Quick sublinks list
  const sublinks = [
    { id: 'marketplace', target: 'sec-5', label: 'Software Marketplace', slug: 'marketplace' },
    { id: 'payments', target: 'sec-6', label: 'Payments & Tax', slug: 'payments' },
    { id: 'delivery', target: 'sec-7', label: 'Digital Delivery', slug: 'delivery' },
    { id: 'licenses', target: 'sec-8', label: 'AI Subscriptions & Keys', slug: 'licenses' },
    { id: 'referrals', target: 'sec-10', label: 'Referral Program', slug: 'referrals' },
    { id: 'acceptable-use', target: 'sec-11', label: 'Acceptable Use', slug: 'acceptable-use' },
    { id: 'liability', target: 'sec-14', label: 'Liability Limits', slug: 'liability' },
    { id: 'disputes', target: 'sec-20', label: 'Dispute Resolution', slug: 'disputes' },
    { id: 'contact', target: 'sec-22', label: 'Legal Contact', slug: 'contact' }
  ];

  // Auto-scroll when subsection parameter or hash changes
  useEffect(() => {
    const hash = location.hash ? location.hash.replace('#', '') : '';
    const target = subsection || hash;

    if (target) {
      const mapped = sublinks.find(s => s.slug === target || s.id === target)?.target || target;
      const elem = document.getElementById(mapped) || document.getElementById(target);
      if (elem) {
        setTimeout(() => {
          const yOffset = -110;
          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [subsection, location.hash]);

  const copyUrl = (subPath: string) => {
    const baseUrl = 'https://waleedkhanafridi.online/tos';
    const fullUrl = subPath ? `${baseUrl}#${subPath}` : baseUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSublink(subPath || 'main');
    setTimeout(() => setCopiedSublink(null), 2200);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/tos',
    url: 'https://waleedkhanafridi.online/tos',
    name: 'Terms of Service | Waleed Khan Afridi Digital Agency',
    description: 'Master Terms of Service governing website engineering services, software marketplace, digital assets, AI subscriptions, and referral programs for Waleed Khan Afridi Digital Agency (waleedkhanafridi.online/tos).',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Master Service Agreement, Digital Goods License Terms, and Acceptable Use Policy for Waleed Khan Afridi Digital Agency (waleedkhanafridi.online/tos)."
      lastUpdated="August 15, 2026"
      effectiveDate="January 1, 2026"
      documentType="terms"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/tos"
      schemaJson={schemaJson}
    >
      {/* Canonical Sublink & Quick Subpage Navigator Card */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold border border-amber-500/20">
              Public Terms of Service
            </span>
            <span className="font-mono text-slate-300 font-semibold text-[13px]">
              waleedkhanafridi.online/tos
            </span>
          </div>

          <button
            onClick={() => copyUrl('')}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer shrink-0"
          >
            {copiedSublink === 'main' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedSublink === 'main' ? 'Copied Terms URL!' : 'Copy ToS Link'}</span>
          </button>
        </div>

        {/* Sublink Deep-Jump Chips */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Terms Sections &amp; Anchors:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {sublinks.map((sub) => (
              <div key={sub.id} className="inline-flex items-center rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 overflow-hidden">
                <a
                  href={`#${sub.target}`}
                  className="px-2.5 py-1 hover:text-amber-400 hover:bg-slate-800/80 transition-colors font-medium"
                >
                  {sub.label}
                </a>
                <button
                  onClick={() => copyUrl(sub.slug)}
                  title={`Copy sublink for ${sub.label}`}
                  className="p-1 px-1.5 border-l border-slate-800 hover:bg-slate-800 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedSublink === sub.slug ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
          <Scale className="w-5 h-5" />
          <span>IMPORTANT LEGAL NOTICE &amp; BINDING CONTRACT</span>
        </div>
        <p>
          Please read these Terms of Service carefully before accessing our website, placing an order for custom web engineering, purchasing digital items, or joining our ReferralPro partner network. By accessing <strong>https://waleedkhanafridi.online</strong>, <strong>https://waleedkhanafridi.online/tos</strong>, or using any associated services, you agree to be bound by all terms detailed herein.
        </p>
      </div>

      {/* Section 1 */}
      <section id="sec-1" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">1.</span> Introduction &amp; Business Overview
          </h2>
          <button
            onClick={() => copyUrl('intro')}
            title="Copy sublink to Introduction"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          Welcome to <strong>Waleed Khan Afridi Digital Agency</strong> (&quot;Agency&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated under the primary commercial web domain <strong>waleedkhanafridi.online</strong> and canonical public terms subpage <a href="https://waleedkhanafridi.online/tos" className="text-amber-400 font-mono underline">waleedkhanafridi.online/tos</a>. We specialize in enterprise website design and full-stack engineering (React, Next.js, Node.js), WordPress &amp; WooCommerce custom e-commerce builds, technical SEO audits and Core Web Vitals optimization, graphic design, verified software sales, AI subscription accounts marketplace, digital downloadable products, and an integrated referral partner portal.
        </p>
        <p>
          These Terms of Service (&quot;Terms&quot;, &quot;ToS&quot;) govern all visitors, clients, software purchasers, and affiliate partners who access our web platforms, mobile applications, APIs, or customer support channels.
        </p>
      </section>

      {/* Section 2 */}
      <section id="sec-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">2.</span> Acceptance of Terms
          </h2>
          <button
            onClick={() => copyUrl('acceptance')}
            title="Copy sublink to Acceptance"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          By creating an account, clicking &quot;I Agree&quot;, submitting an order invoice, executing a custom client contract, or accessing any digital tool on this domain, you confirm that you have read, understood, and agreed to these Terms and our integrated <Link to="/privacypolicy" className="text-cyan-400 underline font-semibold">Privacy Policy</Link> and <Link to="/refund-policy" className="text-emerald-400 underline font-semibold">Refund Policy</Link>.
        </p>
        <p>
          If you do not accept these Terms in their entirety, you are strictly prohibited from using our services, making purchases, or downloading any software assets from our platform.
        </p>
      </section>

      {/* Section 3 */}
      <section id="sec-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">3.</span> User Eligibility &amp; Capacity
        </h2>
        <p>
          Our services are strictly intended for individuals who are at least eighteen (18) years of age, or the applicable legal age of majority in their jurisdiction. By registering or executing transactions, you represent and warrant that:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li>You possess full legal capacity and authorization to enter into binding legal agreements.</li>
          <li>If acting on behalf of a corporation, LLC, or organization, you possess valid authority to legally bind that entity to these Terms.</li>
          <li>You are not located in any embargoed region or sanctioned territory barred by international trade regulations.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="sec-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">4.</span> User Accounts, Registration &amp; Security
        </h2>
        <p>
          To access certain features, download purchased source code, track orders, or participate in the ReferralPro program, users must establish an account. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>Provide accurate, truthful, and up-to-date registration details (Name, Email, WhatsApp Phone Number, Billing Address).</li>
          <li>Maintain the confidentiality of your account password and API authentication tokens.</li>
          <li>Accept full responsibility for all activities, purchases, and data transfers occurring under your account credentials.</li>
          <li>Notify our security team immediately at <strong>waleedkhanafridi7@gmail.com</strong> upon detecting any unauthorized access or breach of security.</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section id="sec-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="marketplace" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">5.</span> Digital Services &amp; Software Marketplace
          </h2>
          <button
            onClick={() => copyUrl('marketplace')}
            title="Copy sublink to Marketplace Terms"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>Our platform facilitates two distinct categories of commercial digital offerings:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>1. Custom Software Engineering Services</span>
            </h4>
            <p className="text-slate-400">Bespoke full-stack web applications, mobile apps, UI/UX design systems, and SEO retainers executed according to written milestone project agreements.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>2. Instant Digital Goods &amp; AI Subscriptions</span>
            </h4>
            <p className="text-slate-400">Verified gaming CD keys, productivity software license keys, Super Grok AI accounts, Claude 3.5 Sonnet / Claude Max passes, and website starter source code templates.</p>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section id="sec-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="payments" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">6.</span> Pricing, Payments, Currency &amp; Taxes
          </h2>
          <button
            onClick={() => copyUrl('payments')}
            title="Copy sublink to Payments & Tax"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>All pricing listed across our store is displayed in <strong>USD ($)</strong> or local <strong>PKR (Rs)</strong> equivalents:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Accepted Payment Methods:</strong> Binance Pay (USDT/USDC/BTC crypto transactions), Pakistani JazzCash &amp; EasyPaisa mobile account transfers, and direct IBAN bank wires.</li>
          <li><strong>Price Modifications:</strong> We reserve the right to alter software prices, AI subscription fees, and development hourly rates without prior notice. Active client contracts remain fixed at agreed rates.</li>
          <li><strong>Tax Obligations:</strong> Clients are responsible for any applicable local sales taxes, VAT, or withholding duties assessed by their jurisdiction.</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="sec-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="delivery" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">7.</span> Digital Product Instant Delivery
          </h2>
          <button
            onClick={() => copyUrl('delivery')}
            title="Copy sublink to Digital Delivery"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          All digital keys, software license tokens, and AI subscription login credentials are delivered electronically via your registered account dashboard and confirmation email within seconds of payment clearance. Physical shipping is not required for digital software assets.
        </p>
      </section>

      {/* Section 8 */}
      <section id="sec-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="licenses" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">8.</span> Subscriptions, License Keys &amp; Warranties
          </h2>
          <button
            onClick={() => copyUrl('licenses')}
            title="Copy sublink to Subscriptions & Licenses"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          Digital license keys and AI access passes come with our standard <strong>30-Day Key Replacement Warranty</strong>. If an activation token encounters an issue due to vendor changes during the active warranty period, our team provides an immediate replacement upon verifying purchase details.
        </p>
      </section>

      {/* Section 9 */}
      <section id="sec-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">9.</span> Shared Account &amp; Usage Rules
        </h2>
        <p>
          For digital accounts and shared tools, users must adhere to single-user device rules. Reselling, sub-licensing, or publicly posting credential keys on third-party forums results in immediate credential termination without refund.
        </p>
      </section>

      {/* Section 10 */}
      <section id="sec-10" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="referrals" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">10.</span> ReferralPro Partner Program Rules
          </h2>
          <button
            onClick={() => copyUrl('referrals')}
            title="Copy sublink to Referral Program"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          Affiliates earn competitive commissions on verified client conversions. Self-referrals, spam email campaigns, and misleading advertisements are strictly forbidden. For full commission structures, consult our <Link to="/referral-terms" className="text-rose-400 font-bold underline">Referral Program Terms</Link>.
        </p>
      </section>

      {/* Section 11 */}
      <section id="sec-11" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="acceptable-use" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">11.</span> Acceptable Use Policy
          </h2>
          <button
            onClick={() => copyUrl('acceptable-use')}
            title="Copy sublink to Acceptable Use"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>You agree not to misuse our digital platforms or services, including but not limited to:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>Attempting to probe, scan, or breach system vulnerabilities or database servers.</li>
          <li>Transmitting malicious code, ransomware, or engaging in distributed denial of service (DDoS) attacks.</li>
          <li>Utilizing automated bots or scraping tools without express written permission.</li>
          <li>Using purchased software assets to facilitate fraudulent or unlawful activities.</li>
        </ul>
      </section>

      {/* Section 12 */}
      <section id="sec-12" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">12.</span> Intellectual Property Rights
        </h2>
        <p>
          All proprietary source code, trademarks, visual UI designs, and brand logos on <strong>waleedkhanafridi.online</strong> belong exclusively to Waleed Khan Afridi Digital Agency. For bespoke client projects, full copyright and intellectual property transfer to the client upon final invoice settlement.
        </p>
      </section>

      {/* Section 13 */}
      <section id="sec-13" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">13.</span> Copyright &amp; DMCA Takedown Policy
        </h2>
        <p>
          We respect intellectual property rights. If you believe your copyrighted work is reproduced on our platform without authorization, submit a formal DMCA notice to <strong>waleedkhanafridi7@gmail.com</strong> with complete ownership proof for expedited review.
        </p>
      </section>

      {/* Section 14 */}
      <section id="sec-14" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="liability" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">14.</span> Limitation of Liability
          </h2>
          <button
            onClick={() => copyUrl('liability')}
            title="Copy sublink to Liability Limits"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          To the maximum extent permitted by law, Waleed Khan Afridi Digital Agency shall not be liable for indirect, incidental, special, or consequential damages resulting from third-party vendor downtime or network interruptions. In all events, total aggregate liability is capped at the amount paid by you in the thirty (30) days preceding the claim.
        </p>
      </section>

      {/* Section 15 */}
      <section id="sec-15" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">15.</span> Disclaimer of Warranties
        </h2>
        <p>
          Digital marketplace products are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, backed by our stated 30-day key replacement policy. We do not warrant that third-party AI platforms (OpenAI, Anthropic, xAI) will maintain unchanged API policies.
        </p>
      </section>

      {/* Section 16 */}
      <section id="sec-16" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">16.</span> Third-Party Services &amp; External Links
        </h2>
        <p>
          Our platform may feature links to external payment gateways, cloud hosting providers, and third-party tools. We do not control or assume responsibility for external website terms or privacy practices.
        </p>
      </section>

      {/* Section 17 */}
      <section id="sec-17" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">17.</span> Account Suspension &amp; Termination
        </h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate our acceptable use policy, engage in payment chargebacks, or attempt fraudulent activities without prior notice.
        </p>
      </section>

      {/* Section 18 */}
      <section id="sec-18" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">18.</span> Indemnification
        </h2>
        <p>
          You agree to defend, indemnify, and hold harmless Waleed Khan Afridi Digital Agency against any claims, losses, or expenses arising from your violation of these Terms or unauthorized use of our digital assets.
        </p>
      </section>

      {/* Section 19 */}
      <section id="sec-19" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">19.</span> Governing Law &amp; Jurisdiction
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles. Commercial disputes shall be subject to the exclusive jurisdiction of the competent courts in Islamabad, Pakistan.
        </p>
      </section>

      {/* Section 20 */}
      <section id="sec-20" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="disputes" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">20.</span> Dispute Resolution &amp; Friendly Negotiation
          </h2>
          <button
            onClick={() => copyUrl('disputes')}
            title="Copy sublink to Dispute Resolution"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          Prior to initiating any formal legal proceedings, parties agree to attempt informal amicable resolution by contacting our executive legal team at <strong>waleedkhanafridi7@gmail.com</strong> or via WhatsApp at <strong>+92 341 6860077</strong> for a period of at least thirty (30) days.
        </p>
      </section>

      {/* Section 21 */}
      <section id="sec-21" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">21.</span> Modifications to Terms
        </h2>
        <p>
          We reserve the right to amend these Terms periodically. Updates take effect immediately upon posting to <strong>waleedkhanafridi.online/tos</strong>. Continued use of our services following revisions constitutes acceptance of the modified Terms.
        </p>
      </section>

      {/* Section 22 */}
      <section id="sec-22" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="contact" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">22.</span> Legal Notices &amp; Contact Information
          </h2>
          <button
            onClick={() => copyUrl('contact')}
            title="Copy sublink to Contact Info"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>For legal notices, contract inquiries, or Terms clarification:</p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency — Legal Department</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-amber-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
