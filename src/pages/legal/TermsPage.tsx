import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { Shield, FileText, CheckCircle2, AlertTriangle, Scale, Lock, RefreshCw, Award, Globe, Building2, User, CreditCard, ShoppingBag, Terminal, Server, HelpCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
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

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/terms-and-conditions',
    url: 'https://waleedkhanafridi.online/terms-and-conditions',
    name: 'Terms and Conditions | Waleed Khan Afridi Digital Agency',
    description: 'Master Terms and Conditions governing website engineering services, software sales, digital marketplace, AI subscriptions, and referral programs for Waleed Khan Afridi Digital Agency.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Master Service Agreement, Digital Goods License Terms, and Acceptable Use Policy for Waleed Khan Afridi Digital Agency (waleedkhanafridi.online)."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="terms"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/terms-and-conditions"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
          <Scale className="w-5 h-5" />
          <span>IMPORTANT LEGAL NOTICE &amp; BINDING CONTRACT</span>
        </div>
        <p>
          Please read these Terms &amp; Conditions carefully before accessing our website, placing an order for custom web development, purchasing digital items, or joining our ReferralPro partner network. By accessing <strong>https://waleedkhanafridi.online</strong> or using any associated services, you agree to be bound by all terms detailed herein.
        </p>
      </div>

      {/* Section 1 */}
      <section id="sec-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">1.</span> Introduction &amp; Business Overview
        </h2>
        <p>
          Welcome to <strong>Waleed Khan Afridi Digital Agency</strong> (&quot;Agency&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated under the primary commercial web domain <strong>waleedkhanafridi.online</strong>. We specialize in enterprise website design and full-stack engineering (React, Next.js, Node.js), WordPress &amp; WooCommerce custom e-commerce builds, technical SEO audits and Core Web Vitals optimization, graphic design, verified software sales, AI subscription accounts marketplace, digital downloadable products, and an integrated referral partner portal.
        </p>
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern all visitors, clients, software purchasers, and affiliate partners who access our web platforms, mobile applications, APIs, or customer support channels.
        </p>
      </section>

      {/* Section 2 */}
      <section id="sec-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">2.</span> Acceptance of Terms
        </h2>
        <p>
          By creating an account, clicking &quot;I Agree&quot;, submitting an order invoice, executing a custom client contract, or accessing any digital tool on this domain, you confirm that you have read, understood, and agreed to these Terms and our integrated <a href="/privacy-policy" className="text-cyan-400 underline font-semibold">Privacy Policy</a> and <a href="/refund-policy" className="text-emerald-400 underline font-semibold">Refund Policy</a>.
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
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">5.</span> Scope of Services &amp; Digital Marketplace
        </h2>
        <p>
          Waleed Khan Afridi Digital Agency provides a comprehensive spectrum of technical and digital services:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>1. Custom Web &amp; Software Engineering</span>
            </h4>
            <p className="text-xs text-slate-400">
              Bespoke frontend/backend development, React/Next.js web apps, REST &amp; GraphQL API development, Supabase/PostgreSQL database architecture, and cloud deployment on Vercel or Cloud Run.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide text-amber-400 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>2. WordPress &amp; WooCommerce</span>
            </h4>
            <p className="text-xs text-slate-400">
              Custom theme design, WooCommerce payment gateway integration, speed optimization, security hardening, plugin customization, and full e-commerce store setups.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>3. Technical SEO &amp; Performance</span>
            </h4>
            <p className="text-xs text-slate-400">
              Technical site audits, JSON-LD Schema markup, Core Web Vitals speed optimization, Google Search Console indexing, and organic growth strategy execution.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide text-purple-400 flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>4. AI Marketplace &amp; Digital Assets</span>
            </h4>
            <p className="text-xs text-slate-400">
              Verified OpenAI API keys, HeyGen, Kling AI, Grok, ChatGPT Plus access credentials, verified software licenses, graphic design templates, and digital source code packs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section id="sec-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">6.</span> Pricing, Payments &amp; Taxes
        </h2>
        <p>
          All service prices and digital product rates displayed on <em>waleedkhanafridi.online</em> are quoted in United States Dollars (USD) or localized Pakistani Rupees (PKR), unless explicitly stated otherwise.
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Accepted Payment Gateways:</strong> We accept payments via Stripe (Credit/Debit cards), JazzCash Mobile Wallet, Binance Pay / Crypto (USDT TRC20/BEP20), Payoneer direct transfer, and direct bank wire.</li>
          <li><strong>Custom Project Invoicing:</strong> Custom engineering projects require a minimum 50% upfront deposit before project kickoff, with the remaining 50% due upon final staging sign-off and before source code transfer.</li>
          <li><strong>Taxes &amp; Duties:</strong> Users are solely responsible for any sales taxes, VAT, GST, or bank transfer fees imposed by their local jurisdiction or financial institutions.</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="sec-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">7.</span> Digital Product Delivery
        </h2>
        <p>
          All items sold on our platform are 100% digital goods and remote engineering services. Zero physical shipping charges apply. Digital goods (license keys, API credentials, account handovers, source code zip files) are delivered electronically within <strong>1 to 60 minutes</strong> via:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>Encrypted Digital Vault inside your User Client Dashboard.</li>
          <li>Automated transactional delivery email sent to your registered email address.</li>
          <li>Direct WhatsApp instant handover (+92 341 6860077) for setup assistance.</li>
        </ul>
      </section>

      {/* Section 8 */}
      <section id="sec-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">8.</span> Subscriptions &amp; AI Tool Licenses
        </h2>
        <p>
          Subscriptions for digital software tools, recurring SEO maintenance packages, or AI API access pass keys remain active for the duration of the purchased period (e.g. 30 days, 90 days, or 1 year). Recurring subscriptions renew automatically unless canceled at least 24 hours prior to the billing date.
        </p>
      </section>

      {/* Section 9 */}
      <section id="sec-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">9.</span> Shared Account &amp; Usage Rules
        </h2>
        <p>
          Where AI tool subscription slots or shared access accounts are purchased through our marketplace:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li>Users must not alter master account passwords, billing credentials, or recovery security options.</li>
          <li>Access credentials must not be shared with third parties, re-sold, or embedded in public web tools.</li>
          <li>Violating shared account usage rules will result in instant account revocation without refund eligibility.</li>
        </ul>
      </section>

      {/* Section 10 */}
      <section id="sec-10" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">10.</span> Referral &amp; Partner Program Terms
        </h2>
        <p>
          Participation in the <strong>ReferralPro Partner Program</strong> allows registered users to earn up to <strong>25% recurring commission</strong> on qualifying purchases referred through their unique affiliate link. Full program guidelines, fraud prevention clauses, and payout thresholds are governed by our dedicated <a href="/referral-terms" className="text-amber-400 underline font-bold">Referral Program Terms</a>.
        </p>
      </section>

      {/* Section 11 */}
      <section id="sec-11" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">11.</span> Acceptable Use Policy &amp; Prohibited Activities
        </h2>
        <p>
          You agree not to engage in any of the following prohibited behaviors:
        </p>
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span>STRICTLY PROHIBITED CONDUCT</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Attempting to breach, test vulnerability, or bypass authentication of our website infrastructure or server APIs.</li>
            <li>Distributing malicious code, viruses, trojans, ransomware, or engaging in distributed denial-of-service (DDoS) attacks.</li>
            <li>Using provided custom web applications or AI tools for illegal activities, phishing, spamming, or fraudulent impersonation.</li>
            <li>Scraping, reverse engineering, decompiling, or stealing proprietary source code from this domain.</li>
            <li>Filing fraudulent credit card chargebacks or PayPal/Stripe payment claims after receiving valid digital goods.</li>
          </ul>
        </div>
      </section>

      {/* Section 12 */}
      <section id="sec-12" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">12.</span> Intellectual Property Rights
        </h2>
        <p>
          All website designs, source code, graphics, branding logos, articles, video tutorials, and interactive tools published on <strong>waleedkhanafridi.online</strong> remain the exclusive intellectual property of Waleed Khan Afridi Digital Agency.
        </p>
        <p>
          For custom engineering clients: Upon full payment settlement of agreed contract fees, client receives full operational ownership and perpetual license to the custom codebase developed specifically for their project.
        </p>
      </section>

      {/* Section 13 */}
      <section id="sec-13" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">13.</span> Copyright &amp; DMCA Policy
        </h2>
        <p>
          We respect intellectual property rights. If you believe any material on our website infringes upon your copyrighted work, submit a formal DMCA take-down request to <strong>waleedkhanafridi7@gmail.com</strong> including proof of ownership, exact URL location, and contact information. Valid notices will be processed within 48 hours.
        </p>
      </section>

      {/* Section 14 */}
      <section id="sec-14" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">14.</span> Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, Waleed Khan Afridi Digital Agency, its founder, employees, or contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages—including lost profits, lost data, business interruption, or server downtime—arising out of or related to your use of our services or digital marketplace.
        </p>
        <p>
          In no event shall our total aggregate liability for all claims exceed the total amount actually paid by you to the Agency in the twelve (12) months preceding the claim event.
        </p>
      </section>

      {/* Section 15 */}
      <section id="sec-15" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">15.</span> Disclaimer of Warranties
        </h2>
        <p>
          All digital goods, tools, and services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied, including fitness for a particular purpose, merchantability, or non-infringement.
        </p>
      </section>

      {/* Section 16 */}
      <section id="sec-16" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">16.</span> Third-Party Services &amp; Links
        </h2>
        <p>
          Our platform may integrate with third-party software, payment processors (Stripe, JazzCash, Binance Pay), or external APIs (OpenAI, Google, Supabase, Vercel). We do not control or accept responsibility for third-party service availability, API changes, or terms of service updates.
        </p>
      </section>

      {/* Section 17 */}
      <section id="sec-17" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">17.</span> Account Suspension &amp; Termination
        </h2>
        <p>
          We reserve the right to suspend or terminate user accounts, block IP addresses, or refuse service immediately without prior notice if you breach these Terms, commit payment fraud, engage in abusive support communications, or violate laws.
        </p>
      </section>

      {/* Section 18 */}
      <section id="sec-18" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">18.</span> Indemnification
        </h2>
        <p>
          You agree to defend, indemnify, and hold harmless Waleed Khan Afridi Digital Agency from any claims, liabilities, costs, damages, or legal fees resulting from your misuse of our services, violation of these Terms, or infringement of third-party rights.
        </p>
      </section>

      {/* Section 19 */}
      <section id="sec-19" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">19.</span> Governing Law &amp; Jurisdiction
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the commercial laws of Pakistan and applicable international merchant standards, without regard to conflict of law principles. (Note: Jurisdiction remains configurable for international corporate clients by written addendum).
        </p>
      </section>

      {/* Section 20 */}
      <section id="sec-20" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">20.</span> Dispute Resolution
        </h2>
        <p>
          In the event of any dispute or claim, parties agree to first attempt informal resolution in good faith by contacting our compliance director at <strong>waleedkhanafridi7@gmail.com</strong>. Unresolved disputes shall be submitted to binding commercial arbitration.
        </p>
      </section>

      {/* Section 21 */}
      <section id="sec-21" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">21.</span> Modifications to Terms
        </h2>
        <p>
          We reserve the right to modify these Terms at any time. Updated versions will be posted with an updated &quot;Last Updated&quot; timestamp. Continued use of our platform constitutes acceptance of modified Terms.
        </p>
      </section>

      {/* Section 22 */}
      <section id="sec-22" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">22.</span> Contact &amp; Official Legal Notices
        </h2>
        <p>
          For formal legal inquiries, contract sign-offs, or compliance questions:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-cyan-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct Phone / WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
