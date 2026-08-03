import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { RefreshCw, Shield, CheckCircle2, XCircle, AlertCircle, Clock, DollarSign, CreditCard, Mail, Phone, FileText } from 'lucide-react';

export const RefundPage: React.FC = () => {
  const toc: LegalTocItem[] = [
    { id: 'r-1', title: '1. Refund & Guarantee Overview' },
    { id: 'r-2', title: '2. Digital Products & License Keys' },
    { id: 'r-3', title: '3. AI Tool Subscriptions' },
    { id: 'r-4', title: '4. Web Engineering & Custom Software' },
    { id: 'r-5', title: '5. Technical SEO Services' },
    { id: 'r-6', title: '6. Graphic Design & UI/UX Services' },
    { id: 'r-7', title: '7. Subscription Renewals & Cancellations' },
    { id: 'r-8', title: '8. Non-Refundable Scenarios' },
    { id: 'r-9', title: '9. Chargeback & Dispute Policy' },
    { id: 'r-10', title: '10. Step-by-Step Refund Process' },
    { id: 'r-11', title: '11. Payout Channels & Timelines' },
    { id: 'r-12', title: '12. Refund Support Contact' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/refund-policy',
    url: 'https://waleedkhanafridi.online/refund-policy',
    name: 'Refund & Return Policy | Waleed Khan Afridi Digital Agency',
    description: 'Merchant compliant 30-Day Money Back & Replacement Policy covering digital software, AI subscriptions, web development projects, technical SEO, and subscription cancellations.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Refund & Return Policy"
      subtitle="Transparent 30-Day Money Back & Replacement Guarantee for Software Sales, AI Subscriptions, Web Engineering, and Digital Services."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="refund"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/refund-policy"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-emerald-400 text-sm">
          <Shield className="w-5 h-5" />
          <span>30-DAY SATISFACTION &amp; INSTANT REPLACEMENT ASSURANCE</span>
        </div>
        <p>
          At <strong>Waleed Khan Afridi Digital Agency</strong>, client trust is our highest priority. We offer a transparent, hassle-free <strong>30-day refund and immediate free key replacement policy</strong> for unfulfilled digital orders, defective keys, or non-conforming service deliverables.
        </p>
      </div>

      {/* Section 1 */}
      <section id="r-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">1.</span> Refund &amp; Guarantee Overview
        </h2>
        <p>
          This Refund Policy establishes clear standards for requesting refunds, key replacements, or project contract cancellations on <strong>waleedkhanafridi.online</strong>.
        </p>
        <p>
          Because we operate as both a bespoke software engineering agency and a digital assets marketplace, our refund rules differentiate between service categories to remain fair, compliant, and merchant gateway approved.
        </p>
      </section>

      {/* Section 2 */}
      <section id="r-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">2.</span> Digital Downloadable Products &amp; License Keys
        </h2>
        <p>For standalone software licenses, source code templates, and downloadable digital assets:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Defective or Invalid Keys:</strong> If a delivered software serial key fails to activate or is non-functional upon delivery, our support team will issue an immediate working replacement key within <strong>12 hours</strong>. If we are unable to replace the key, a <strong>100% full refund</strong> will be processed.</li>
          <li><strong>Unredeemed Keys:</strong> Unredeemed license keys may be refunded within 14 days of purchase upon verification that the key has not been activated.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section id="r-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">3.</span> AI Tool Subscriptions &amp; Marketplace Credentials
        </h2>
        <p>For AI accounts (OpenAI API credits, HeyGen, Kling AI, Grok, ChatGPT Plus):</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Access Guarantee:</strong> If access fails or credentials become invalid during the active warranty period through no fault of the user, we provide immediate free replacement or pro-rated refund.</li>
          <li><strong>Usage Restrictions:</strong> Altering master billing credentials, violating shared usage limits, or attempting unauthorized reselling voids refund eligibility.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="r-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">4.</span> Website Engineering &amp; Custom Development
        </h2>
        <p>For custom web application engineering (React, Next.js, Node.js, WordPress/WooCommerce):</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h5 className="font-bold text-emerald-400 text-xs">Pre-Kickoff Cancellation</h5>
            <p className="text-xs text-slate-400">
              100% full refund if canceled before project research, design mockups, or source code development begins.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h5 className="font-bold text-amber-400 text-xs">Milestone Phase Refund</h5>
            <p className="text-xs text-slate-400">
              If client terminates contract during staging review, deposit covers completed hours; remaining unworked balance is refunded.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="r-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">5.</span> Technical SEO Services &amp; Performance Audits
        </h2>
        <p>
          Technical SEO audits, Core Web Vitals optimizations, and Search Console indexing setups represent direct labor. If technical deliverables (JSON-LD schema, audit PDF, speed score improvement) are delivered as agreed, refunds are not applicable. If our engineering team fails to complete the agreed optimization checklist within the delivery window, a 100% refund is granted.
        </p>
      </section>

      {/* Section 6 */}
      <section id="r-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">6.</span> Graphic Design &amp; UI/UX Design Assets
        </h2>
        <p>
          UI/UX Figma design deliverables include up to two (2) complimentary revision rounds. If initial design concepts fail to meet brief requirements prior to final asset handover, clients may request a 50% deposit refund before source files are transferred.
        </p>
      </section>

      {/* Section 7 */}
      <section id="r-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">7.</span> Subscription Renewals &amp; Cancellation Policy
        </h2>
        <p>
          Clients may cancel recurring subscription packages (e.g. monthly website maintenance, AI API passes) at any time inside their user dashboard or by contacting support.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>Cancellations take effect at the end of the current paid billing cycle.</li>
          <li>Partial-month refunds for mid-cycle cancellations are not issued unless requested within 48 hours of automated renewal.</li>
        </ul>
      </section>

      {/* Section 8 */}
      <section id="r-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">8.</span> Non-Refundable Items &amp; Circumstances
        </h2>
        <p>Refunds cannot be granted under the following circumstances:</p>
        
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-2 text-rose-400">
            <XCircle className="w-4 h-4" />
            <span>NON-REFUNDABLE CONDITIONS</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Digital keys or accounts that have been successfully redeemed, fully consumed, or altered by the user.</li>
            <li>Custom web engineering projects that have reached final client sign-off, staging acceptance, and source code transfer.</li>
            <li>Account bans or service restrictions caused by client violation of third-party platform rules (e.g. spamming OpenAI endpoints).</li>
            <li>Change of mind after source code zip files or digital graphics have been downloaded.</li>
          </ul>
        </div>
      </section>

      {/* Section 9 */}
      <section id="r-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">9.</span> Chargeback &amp; Payment Dispute Policy
        </h2>
        <p>
          We encourage clients to contact our support team directly to resolve any billing issues. Filing an unauthorized or fraudulent credit card chargeback without prior communication constitutes a breach of contract, resulting in immediate account blacklisting, license key revocation, and legal dispute submission.
        </p>
      </section>

      {/* Section 10 */}
      <section id="r-10" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">10.</span> Step-by-Step Refund Request Process
        </h2>
        <p>To request a refund or key replacement, follow these steps:</p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <ol className="list-decimal pl-5 space-y-2 text-slate-300">
            <li>Email <strong>waleedkhanafridi7@gmail.com</strong> or message WhatsApp <strong>+92 341 6860077</strong>.</li>
            <li>Provide your <strong>Order ID / Invoice Number</strong>, registered email, and a brief description of the issue.</li>
            <li>Our support team will review your claim within <strong>12 to 24 hours</strong>.</li>
            <li>Once approved, your refund or key replacement will be dispatched immediately.</li>
          </ol>
        </div>
      </section>

      {/* Section 11 */}
      <section id="r-11" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">11.</span> Payout Channels &amp; Processing Timelines
        </h2>
        <p>Approved refunds are credited back to your original payment method:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Credit / Debit Card (Stripe):</strong> 3 to 5 business days.</li>
          <li><strong>JazzCash Mobile Wallet:</strong> Instant to 24 hours.</li>
          <li><strong>Binance Pay / Crypto (USDT):</strong> Instant to 12 hours.</li>
          <li><strong>Payoneer / Bank Wire:</strong> 1 to 3 business days.</li>
        </ul>
      </section>

      {/* Section 12 */}
      <section id="r-12" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-emerald-400">12.</span> Refund Support Contact
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency — Refund Desk</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-emerald-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
