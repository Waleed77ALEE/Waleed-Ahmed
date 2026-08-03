import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { Award, Shield, CheckCircle2, AlertTriangle, DollarSign, Wallet, RefreshCw, XCircle, Mail, Phone } from 'lucide-react';

export const ReferralTermsPage: React.FC = () => {
  const toc: LegalTocItem[] = [
    { id: 'ref-1', title: '1. Program Overview & ReferralPro Portal' },
    { id: 'ref-2', title: '2. Eligibility & Partner Registration' },
    { id: 'ref-3', title: '3. Unique Tracking Links & 60-Day Cookie' },
    { id: 'ref-4', title: '4. Commission Rates & Earning Rules' },
    { id: 'ref-5', title: '5. Minimum Threshold & Payout Channels' },
    { id: 'ref-6', title: '6. Holding Period & Refund Reversals' },
    { id: 'ref-7', title: '7. Anti-Fraud & Prohibited Conduct' },
    { id: 'ref-8', title: '8. Search Engine & Brand Bidding Rules' },
    { id: 'ref-9', title: '9. Reversal & Audit Rights' },
    { id: 'ref-10', title: '10. Termination & Program Changes' },
    { id: 'ref-11', title: '11. Partner Support Contact' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/referral-terms',
    url: 'https://waleedkhanafridi.online/referral-terms',
    name: 'Referral Program Terms | ReferralPro Partner Network',
    description: 'Official partner agreement and rules for ReferralPro at Waleed Khan Afridi Digital Agency. Learn about 25% commissions, payout thresholds, 60-day tracking, and anti-fraud policies.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Referral Program Terms"
      subtitle="Official Terms, Commission Structures, Anti-Fraud Policies, and Payout Guidelines for the ReferralPro Partner Network."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="referral"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/referral-terms"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-slate-900 to-slate-900 border border-rose-500/30 text-rose-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-rose-400 text-sm">
          <Award className="w-5 h-5" />
          <span>EARN 25% RECURRING COMMISSION WITH REFERRALPRO</span>
        </div>
        <p>
          Welcome to the <strong>ReferralPro Partner Program</strong> operated by <strong>Waleed Khan Afridi Digital Agency</strong>. Partners earn up to <strong>25% recurring commission</strong> on every client or digital product sale referred through their unique affiliate tracking link.
        </p>
      </div>

      {/* Section 1 */}
      <section id="ref-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">1.</span> Program Overview &amp; ReferralPro Portal
        </h2>
        <p>
          These Referral Program Terms (&quot;Referral Terms&quot;) govern all affiliate partners, web influencers, developers, and agency agencies participating in the ReferralPro network on <strong>waleedkhanafridi.online</strong>.
        </p>
        <p>
          By creating an affiliate account or sharing your unique referral tracking link, you agree to comply with these rules.
        </p>
      </section>

      {/* Section 2 */}
      <section id="ref-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">2.</span> Partner Eligibility &amp; Account Setup
        </h2>
        <p>Participation is open to individuals and businesses worldwide, provided that:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li>You are at least eighteen (18) years of age.</li>
          <li>You maintain an active user account in good standing on <em>waleedkhanafridi.online</em>.</li>
          <li>You provide valid payout details (Binance Pay USDT, JazzCash, Payoneer, or Bank Wire).</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section id="ref-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">3.</span> Unique Tracking Links &amp; 60-Day Cookie Window
        </h2>
        <p>
          Upon joining ReferralPro, you will receive a unique tracking link (e.g., <code>https://waleedkhanafridi.online/?ref=YOUR_CODE</code>). When a user clicks your link, a <strong>60-day attribution cookie</strong> is stored in their browser. You receive commission credit for any qualifying purchase completed within 60 days of the initial click.
        </p>
      </section>

      {/* Section 4 */}
      <section id="ref-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">4.</span> Commission Rates &amp; Tiered Structure
        </h2>
        <p>Commissions are calculated based on net completed order values:</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase">Web Development</span>
            <p className="text-2xl font-black text-rose-400">25%</p>
            <p className="text-[11px] text-slate-500">Custom Engineering &amp; WordPress</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase">AI &amp; Digital Marketplace</span>
            <p className="text-2xl font-black text-amber-400">20%</p>
            <p className="text-[11px] text-slate-500">Software Keys &amp; AI Passes</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase">Technical SEO &amp; Growth</span>
            <p className="text-2xl font-black text-emerald-400">15%</p>
            <p className="text-[11px] text-slate-500">SEO Audits &amp; Speed Packages</p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="ref-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">5.</span> Minimum Payout Threshold &amp; Withdrawal Options
        </h2>
        <p>
          The minimum withdrawal threshold is <strong>$20 USD</strong> (or PKR equivalent). Withdrawals can be requested at any time once approved earnings reach $20 through:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Binance Pay / Crypto (USDT TRC20 or BEP20)</strong> — Zero network fee option.</li>
          <li><strong>JazzCash Mobile Wallet</strong> — Instant local payout in Pakistan.</li>
          <li><strong>Payoneer / Direct Bank Wire</strong> — Processed within 2 business days.</li>
          <li><strong>Store Credit Discount Coupon</strong> — Instant 10% bonus value for agency services.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="ref-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">6.</span> Holding Period &amp; Refund Reversals
        </h2>
        <p>
          Pending referral commissions are subject to a standard <strong>14-day clearance hold</strong> to account for potential order refunds or client cancellations. If a referred order is refunded under our 30-Day Refund Policy, the corresponding referral commission is reversed.
        </p>
      </section>

      {/* Section 7 */}
      <section id="ref-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">7.</span> Anti-Fraud Policy &amp; Prohibited Referral Conduct
        </h2>
        <p>To preserve program integrity, the following activities are strictly prohibited:</p>
        
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span>STRICTLY PROHIBITED AFFILIATE TACTICS</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Self-Referrals:</strong> Purchasing services or digital items through your own referral tracking link to gain a discount.</li>
            <li><strong>Cookie Stuffing &amp; Pop-Unders:</strong> Injecting tracking cookies without active user intent or consent.</li>
            <li><strong>Spamming &amp; Unsolicited Messaging:</strong> Mass emailing or spamming social media groups with affiliate links.</li>
            <li><strong>Deceptive Marketing:</strong> Promising fake discounts, unauthorized coupons, or false guarantees not listed on our official site.</li>
          </ul>
        </div>
      </section>

      {/* Section 8 */}
      <section id="ref-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">8.</span> Brand Bidding &amp; Search Advertising Rules
        </h2>
        <p>
          Affiliates are strictly prohibited from bidding on trademarked search terms (such as &quot;Waleed Khan Afridi&quot;, &quot;waleedkhanafridi.online&quot;, &quot;ReferralPro&quot;) in Google Ads, Bing Ads, or Meta Ads. Violating trademark search rules will result in immediate forfeiture of unpaid balances and permanent referral ban.
        </p>
      </section>

      {/* Section 9 */}
      <section id="ref-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">9.</span> Reversal &amp; Audit Rights
        </h2>
        <p>
          We reserve the right to audit referral traffic logs and reverse any commissions generated through fraudulent traffic, bot scripts, or self-referral loops.
        </p>
      </section>

      {/* Section 10 */}
      <section id="ref-10" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">10.</span> Account Termination &amp; Program Changes
        </h2>
        <p>
          We reserve the right to modify commission rates, payout thresholds, or terminate referral accounts at any time. Partners will receive email notice of any structural changes.
        </p>
      </section>

      {/* Section 11 */}
      <section id="ref-11" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-rose-400">11.</span> Partner Support Contact
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency — ReferralPro Desk</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-rose-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
