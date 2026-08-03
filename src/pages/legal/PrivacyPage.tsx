import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { Lock, Shield, CheckCircle2, Globe, Database, Eye, Bell, Trash2, Mail, Phone, FileText, Server, AlertCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const toc: LegalTocItem[] = [
    { id: 'p-1', title: '1. Privacy Commitment & Scope' },
    { id: 'p-2', title: '2. Information We Collect' },
    { id: 'p-3', title: '3. Technical & Cookie Data' },
    { id: 'p-4', title: '4. How We Use Your Information' },
    { id: 'p-5', title: '5. Legal Basis for Processing (GDPR)' },
    { id: 'p-6', title: '6. Third-Party Data Sharing' },
    { id: 'p-7', title: '7. Payment Processors & Gateways' },
    { id: 'p-8', title: '8. Analytics & Ad Pixels' },
    { id: 'p-9', title: '9. Data Security & Encryption' },
    { id: 'p-10', title: '10. Data Retention Policy' },
    { id: 'p-11', title: '11. Children’s Privacy (COPPA)' },
    { id: 'p-12', title: '12. International Data Transfers' },
    { id: 'p-13', title: '13. Your Privacy Rights (GDPR & CCPA)' },
    { id: 'p-14', title: '14. How to Delete Your Data' },
    { id: 'p-[15]', title: '15. Cookie Preferences & Controls' },
    { id: 'p-16', title: '16. Privacy Updates & Contact' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/privacy-policy',
    url: 'https://waleedkhanafridi.online/privacy-policy',
    name: 'Privacy Policy | Waleed Khan Afridi Digital Agency',
    description: 'GDPR & CCPA compliant Privacy Policy for Waleed Khan Afridi Digital Agency detailing data collection, processing, third-party analytics, user rights, and data deletion procedures.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Complete Data Protection, Privacy Practices, GDPR & CCPA Compliance Disclosures for Waleed Khan Afridi Digital Agency (waleedkhanafridi.online)."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="privacy"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/privacy-policy"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-900 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-cyan-400 text-sm">
          <Lock className="w-5 h-5" />
          <span>ZERO DATA SELLING &amp; MAXIMUM ENCRYPTION GUARANTEE</span>
        </div>
        <p>
          At <strong>Waleed Khan Afridi Digital Agency</strong>, we respect your right to privacy. We strictly <strong>DO NOT sell, rent, or trade</strong> your personal data to third-party ad brokers. Data collected is strictly used to fulfill client development contracts, process secure order transactions, and deliver digital software assets.
        </p>
      </div>

      {/* Section 1 */}
      <section id="p-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">1.</span> Privacy Commitment &amp; Scope
        </h2>
        <p>
          This Privacy Policy explains how <strong>Waleed Khan Afridi Digital Agency</strong> (&quot;Agency&quot;, &quot;we&quot;, &quot;us&quot;) collects, processes, stores, and safeguards personal data when you visit <strong>https://waleedkhanafridi.online</strong>, purchase services or software tools, use our mobile application, or communicate with our support team.
        </p>
        <p>
          We adhere to global data protection laws, including the European Union General Data Protection Regulation (GDPR), California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA), and international merchant compliance standards.
        </p>
      </section>

      {/* Section 2 */}
      <section id="p-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">2.</span> Information We Collect
        </h2>
        <p>We collect several categories of information to provide seamless digital agency services:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide text-cyan-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Personal Identification Data</span>
            </h4>
            <p className="text-xs text-slate-400">
              Full name, email address, WhatsApp/mobile phone number, company name, billing address, country of residence, and profile preferences provided during registration or order checkout.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Billing &amp; Transaction Records</span>
            </h4>
            <p className="text-xs text-slate-400">
              Order history, purchase IDs, license key serial numbers, invoice records, payment method type (Card, JazzCash, Binance Pay, Payoneer), and crypto transaction hashes. <em>Note: Raw payment card numbers are processed directly by Stripe/JazzCash and are never stored on our servers.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="p-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">3.</span> Technical, Log &amp; Cookie Data
        </h2>
        <p>
          When accessing our website, our servers automatically record standard web telemetry logs:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Device &amp; Browser Information:</strong> IP address, user-agent string, operating system version, screen resolution, browser type, and preferred language.</li>
          <li><strong>Log Files &amp; Session Metrics:</strong> Time stamps, referring URLs, pages viewed, click patterns, and page load durations.</li>
          <li><strong>Cookies &amp; Local Storage:</strong> Session tokens, shopping cart contents, theme preference state, and authentication tokens.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="p-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">4.</span> How We Use Your Information
        </h2>
        <p>Data collected is utilized strictly for legitimate operational purposes:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>Delivering web development projects, delivering digital software keys, and issuing invoices.</li>
          <li>Processing secure payments, preventing fraudulent card transactions, and verifying accounts.</li>
          <li>Providing 24/7 technical support, warranty key replacements, and client assistance.</li>
          <li>Tracking referral partner commissions in our ReferralPro system.</li>
          <li>Sending critical transactional updates, service renewal alerts, or legal policy notices.</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section id="p-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">5.</span> Legal Basis for Processing (GDPR)
        </h2>
        <p>Under European Union GDPR Article 6, we process data based on the following legal grounds:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Contractual Necessity:</strong> Data processing required to fulfill our development contracts or deliver purchased digital goods.</li>
          <li><strong>Legitimate Business Interest:</strong> Ensuring security, fraud prevention, site speed optimization, and service improvements.</li>
          <li><strong>Legal Obligation:</strong> Complying with accounting regulations, tax audits, and anti-fraud mandates.</li>
          <li><strong>Consent:</strong> Sending optional promotional newsletters or optional marketing cookies (which you may withdraw at any time).</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="p-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">6.</span> Third-Party Data Sharing &amp; Disclosures
        </h2>
        <p>
          We do NOT sell user data. Data is shared only with verified infrastructure providers strictly required to operate our digital agency:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Cloud Database &amp; Hosting:</strong> Supabase PostgreSQL, Google Cloud Platform, Vercel infrastructure.</li>
          <li><strong>Transactional Communication:</strong> Automated SMTP email gateways and WhatsApp API integrations.</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="p-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">7.</span> Payment Processors &amp; Security Gateways
        </h2>
        <p>
          Transactions are processed securely through PCI-DSS compliant payment gateways:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Stripe:</strong> Subject to Stripe&apos;s Privacy Policy for card transactions.</li>
          <li><strong>JazzCash:</strong> Mobile wallet payments processed via official JazzCash merchant endpoints in Pakistan.</li>
          <li><strong>Binance Pay / Crypto:</strong> Cryptographic wallet verifications performed on blockchain networks (USDT TRC20/BEP20).</li>
          <li><strong>Payoneer:</strong> Bank transfers and merchant invoice settlements.</li>
        </ul>
      </section>

      {/* Section 8 */}
      <section id="p-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">8.</span> Analytics &amp; Advertising Partners
        </h2>
        <p>
          We utilize standard industry web analytics tools to monitor site performance:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Google Analytics 4 &amp; Search Console:</strong> Measure page traffic, Core Web Vitals performance, and search indexing metrics.</li>
          <li><strong>Google Ads &amp; Meta Pixel:</strong> Measure ad conversion effectiveness for agency service promotions.</li>
          <li><strong>Microsoft Clarity:</strong> Analyze user navigation heatmaps to improve UI/UX layout accessibility.</li>
        </ul>
      </section>

      {/* Section 9 */}
      <section id="p-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">9.</span> Data Security &amp; Encryption Measures
        </h2>
        <p>
          We implement multi-layered physical, technical, and administrative security protections:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>256-Bit SSL/TLS Encryption:</strong> All browser-to-server data transmissions are protected using TLS 1.3 protocol.</li>
          <li><strong>Database Encryption at Rest:</strong> Sensitive user tokens and license keys are encrypted in Supabase database vaults.</li>
          <li><strong>Role-Based Access Control:</strong> Strict permission limits ensuring only authorized agency administrators can view order details.</li>
        </ul>
      </section>

      {/* Section 10 */}
      <section id="p-10" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">10.</span> Data Retention Policy
        </h2>
        <p>
          We retain personal data only for as long as necessary to fulfill service agreements or comply with statutory requirements:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Active Client Accounts:</strong> Retained while the account remains active or until requested deletion.</li>
          <li><strong>Invoices &amp; Tax Records:</strong> Preserved for seven (7) years to satisfy international tax compliance.</li>
          <li><strong>Support Communication Logs:</strong> Retained for 24 months to assist with warranty key replacements.</li>
        </ul>
      </section>

      {/* Section 11 */}
      <section id="p-11" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">11.</span> Children’s Privacy Protection (COPPA)
        </h2>
        <p>
          Our platform is strictly directed to adults and commercial clients. We do not knowingly collect personal data from children under thirteen (13) or sixteen (16) years of age. If a parent discovers a minor has provided data, contact us immediately at <strong>waleedkhanafridi7@gmail.com</strong> for swift record removal.
        </p>
      </section>

      {/* Section 12 */}
      <section id="p-12" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">12.</span> International Data Transfers
        </h2>
        <p>
          As an international software development agency serving global clients, your data may be stored and processed on secure cloud servers located in the United States, Europe, or Asia, protected by Standard Contractual Clauses (SCCs).
        </p>
      </section>

      {/* Section 13 */}
      <section id="p-13" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">13.</span> Your Privacy Rights (GDPR &amp; CCPA)
        </h2>
        <p>Depending on your location, you hold statutory rights regarding your personal data:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <h5 className="font-bold text-cyan-400 mb-1">Right to Access &amp; Portability</h5>
            <p className="text-slate-400">Request a complete JSON/CSV copy of all personal records held under your account.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <h5 className="font-bold text-amber-400 mb-1">Right to Rectification</h5>
            <p className="text-slate-400">Update or correct inaccurate profile details inside your client account settings.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <h5 className="font-bold text-rose-400 mb-1">Right to Erasure (&quot;Right to Be Forgotten&quot;)</h5>
            <p className="text-slate-400">Request complete permanent deletion of your account and personal history.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <h5 className="font-bold text-emerald-400 mb-1">Right to Opt-Out (CCPA/CPRA)</h5>
            <p className="text-slate-400">Opt-out of any third-party marketing cookies or ad tracking pixels.</p>
          </div>
        </div>
      </section>

      {/* Section 14 */}
      <section id="p-14" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">14.</span> How to Request Account &amp; Data Deletion
        </h2>
        <p>
          To exercise your right to erasure and delete all personal data from our servers:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <p className="font-bold text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Data Deletion Procedure:</span>
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-300">
            <li>Email our Privacy Officer at <strong>waleedkhanafridi7@gmail.com</strong> with the subject line <strong>&quot;Data Deletion Request&quot;</strong>.</li>
            <li>Include your registered Email Address and User ID.</li>
            <li>Our team will verify your identity and purge your personal records from our database within <strong>forty-eight (48) hours</strong>, sending confirmation upon completion.</li>
          </ol>
        </div>
      </section>

      {/* Section 15 */}
      <section id="p-15" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">15.</span> Cookie Preferences &amp; Browser Controls
        </h2>
        <p>
          You can modify or disable cookies directly in your browser settings (Chrome, Firefox, Safari, Edge). For detailed information on specific cookie lifespans and audit logs, consult our dedicated <a href="/cookie-policy" className="text-purple-400 underline font-bold">Cookie Policy</a>.
        </p>
      </section>

      {/* Section 16 */}
      <section id="p-16" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">16.</span> Privacy Policy Updates &amp; Contact Information
        </h2>
        <p>
          We may update this Privacy Policy periodically. For questions, data requests, or compliance inquiries:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency — Data Protection Officer</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-cyan-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
