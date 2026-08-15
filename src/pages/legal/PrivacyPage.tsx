import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { 
  Lock, Shield, CheckCircle2, Globe, Database, Eye, Bell, 
  Trash2, Mail, Phone, FileText, Server, AlertCircle, 
  Copy, Check, ExternalLink, ChevronRight, Bookmark, ArrowUpRight
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { subsection } = useParams<{ subsection?: string }>();
  const location = useLocation();
  const [copiedSublink, setCopiedSublink] = useState<string | null>(null);

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
    { id: 'p-15', title: '15. Cookie Preferences & Controls' },
    { id: 'p-16', title: '16. Privacy Updates & Contact' }
  ];

  // Quick sublinks list
  const sublinks = [
    { id: 'data-collection', target: 'p-2', label: 'Data Collection', slug: 'data-collection' },
    { id: 'cookies', target: 'p-3', label: 'Cookie Data', slug: 'cookies' },
    { id: 'gdpr-rights', target: 'p-13', label: 'GDPR / CCPA Rights', slug: 'gdpr' },
    { id: 'data-deletion', target: 'p-14', label: 'Data Erasure Request', slug: 'data-deletion' },
    { id: 'security', target: 'p-9', label: 'Security & Encryption', slug: 'security' },
    { id: 'contact', target: 'p-16', label: 'DPO Contact Info', slug: 'contact' }
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
    const baseUrl = 'https://waleedkhanafridi.online/privacypolicy';
    const fullUrl = subPath ? `${baseUrl}#${subPath}` : baseUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSublink(subPath || 'main');
    setTimeout(() => setCopiedSublink(null), 2200);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/privacypolicy',
    url: 'https://waleedkhanafridi.online/privacypolicy',
    name: 'Privacy Policy | WALEEDKHANAFRIDI.ONLINE by Waleed Khan Afridi',
    description: 'GDPR & CCPA compliant Privacy Policy for WALEEDKHANAFRIDI.ONLINE by Waleed Khan Afridi Digital Agency (waleedkhanafridi.online/privacypolicy) detailing data collection, Google OAuth data usage, and user rights.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Complete Data Protection, Privacy Practices, GDPR & CCPA Compliance Disclosures for WALEEDKHANAFRIDI.ONLINE by Waleed Khan Afridi Digital Agency (waleedkhanafridi.online/privacypolicy)."
      lastUpdated="August 15, 2026"
      effectiveDate="January 1, 2026"
      documentType="privacy"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/privacypolicy"
      schemaJson={schemaJson}
    >
      {/* Canonical Sublink & Quick Subpage Navigator Card */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono font-bold border border-cyan-500/20">
              Canonical Subpage
            </span>
            <span className="font-mono text-slate-300 font-semibold text-[13px]">
              waleedkhanafridi.online/privacypolicy
            </span>
          </div>

          <button
            onClick={() => copyUrl('')}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer shrink-0"
          >
            {copiedSublink === 'main' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedSublink === 'main' ? 'Copied Subpage Link!' : 'Copy Privacy URL'}</span>
          </button>
        </div>

        {/* Sublink Deep-Jump Chips */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Sublinks &amp; Section Anchors:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {sublinks.map((sub) => (
              <div key={sub.id} className="inline-flex items-center rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 overflow-hidden">
                <a
                  href={`#${sub.target}`}
                  className="px-2.5 py-1 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors font-medium"
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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-900 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-cyan-400 text-sm">
          <Lock className="w-5 h-5" />
          <span>ZERO DATA SELLING &amp; MAXIMUM ENCRYPTION GUARANTEE</span>
        </div>
        <p>
          At <strong>WALEEDKHANAFRIDI.ONLINE</strong> (operated by <strong>Waleed Khan Afridi Digital Agency</strong>), we respect your right to privacy. We strictly <strong>DO NOT sell, rent, or trade</strong> your personal data to third-party ad brokers. Data collected is strictly used to fulfill client development contracts, process secure order transactions, and deliver digital software assets.
        </p>
      </div>

      {/* Section 1 */}
      <section id="p-1" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">1.</span> Privacy Commitment &amp; Scope
          </h2>
          <button
            onClick={() => copyUrl('scope')}
            title="Copy sublink to this section"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          This Privacy Policy governs the manner in which <strong>Waleed Khan Afridi Digital Agency</strong> collects, uses, maintains, and discloses information gathered from users across our website (<a href="https://waleedkhanafridi.online" className="text-cyan-400 font-mono underline">https://waleedkhanafridi.online</a>) and related subpages including <a href="https://waleedkhanafridi.online/privacypolicy" className="text-cyan-400 font-mono underline">waleedkhanafridi.online/privacypolicy</a>.
        </p>
      </section>

      {/* Section 2 */}
      <section id="p-2" data-sublink="data-collection" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="data-collection" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">2.</span> Information We Collect
          </h2>
          <button
            onClick={() => copyUrl('data-collection')}
            title="Copy sublink to Data Collection"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>We only collect personal information that is directly necessary to provide our digital engineering and software services:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Identity &amp; Contact Details</span>
            </h4>
            <p className="text-slate-400">Full Name, Email Address, WhatsApp/Phone Number provided during user registration, custom inquiries, or order placement.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payment &amp; Transaction Details</span>
            </h4>
            <p className="text-slate-400">Transaction IDs, Binance Pay order references, JazzCash/EasyPaisa transaction IDs, and receipt screenshots. We never store raw credit card numbers.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Client Project Briefs</span>
            </h4>
            <p className="text-slate-400">Technical specifications, wireframes, domain access credentials (when required for deployment), and GitHub repository identifiers.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Feedback &amp; Reviews</span>
            </h4>
            <p className="text-slate-400">Ratings, verified service reviews, and client satisfaction testimonials submitted directly on our digital marketplace.</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="p-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="cookies" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">3.</span> Technical &amp; Cookie Data
          </h2>
          <button
            onClick={() => copyUrl('cookies')}
            title="Copy sublink to Cookie Data"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>
          When you browse our marketplace, our web servers automatically log non-personally identifiable technical telemetry to safeguard against DDoS attacks and optimize layout responsiveness:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>IP address (anonymized for GDPR compliance).</li>
          <li>Browser user-agent, operating system, and display screen resolution.</li>
          <li>Pages visited, duration per service page, and referral source URLs.</li>
          <li>Essential session cookies for shopping cart persistence and authenticated user tokens.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="p-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">4.</span> How We Use Your Information
        </h2>
        <p>We use the data we collect solely for lawful, transparent business purposes:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Digital Service Delivery:</strong> To design, build, deploy, and maintain custom web, mobile, and AI software applications.</li>
          <li><strong>Instant License Key Dispatch:</strong> To automatically deliver AI subscription credentials and software activation keys to your verified email.</li>
          <li><strong>Transaction Verification:</strong> To reconcile crypto Binance Pay transfers and Pakistani JazzCash payment references.</li>
          <li><strong>Customer Support:</strong> To assist you 24/7 via WhatsApp and direct live support ticketing.</li>
          <li><strong>Legal &amp; Tax Compliance:</strong> To generate valid merchant invoices and maintain regulatory audit logs.</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section id="p-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">5.</span> Legal Basis for Processing (GDPR)
        </h2>
        <p>
          Under the General Data Protection Regulation (EU GDPR), we process your personal data under the following lawful bases:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Contractual Necessity:</strong> Processing required to fulfill orders and contracts placed through our platform.</li>
          <li><strong>Legitimate Interests:</strong> Securing our digital store against fraud and cyber threats.</li>
          <li><strong>Legal Obligation:</strong> Retaining financial transaction ledgers for international trade regulations.</li>
          <li><strong>Explicit Consent:</strong> Provided when you sign up for updates or submit voluntary client reviews.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="p-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">6.</span> Third-Party Data Sharing Disclosures
        </h2>
        <p>
          We do not sell personal data. We only share necessary data fragments with trusted infrastructure partners bound by strict non-disclosure agreements:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Database &amp; Cloud Hosting:</strong> Supabase (PostgreSQL) and Google Cloud Platform for encrypted data storage.</li>
          <li><strong>Email Dispatch Infrastructure:</strong> Resend and SendGrid for automated order confirmation receipts.</li>
          <li><strong>Direct Messaging:</strong> Meta WhatsApp API for instant client milestone updates.</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="p-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">7.</span> Payment Processors &amp; Gateways
        </h2>
        <p>
          We utilize secure third-party payment gateways for financial transactions:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Binance Pay (Cryptocurrency):</strong> Decentralized peer-to-peer crypto transactions; wallet transactions are governed by Binance Privacy Policy.</li>
          <li><strong>JazzCash &amp; EasyPaisa:</strong> Direct mobile account transfers processed through registered Pakistani microfinance banks.</li>
        </ul>
      </section>

      {/* Section 8 */}
      <section id="p-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-cyan-400">8.</span> Analytics &amp; Advertising Pixels
        </h2>
        <p>
          We may deploy privacy-preserving analytics (e.g. Google Analytics 4 with IP Anonymization) to analyze traffic funnels and improve site speed. You can opt out at any time using standard browser ad-blockers or DNT (Do Not Track) headers.
        </p>
      </section>

      {/* Section 9 */}
      <section id="p-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="security" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">9.</span> Data Security &amp; Encryption Measures
          </h2>
          <button
            onClick={() => copyUrl('security')}
            title="Copy sublink to Data Security"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>We implement multi-layered physical, technical, and administrative security protections:</p>
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
        <p>We retain personal data only for as long as necessary to fulfill service agreements or comply with statutory requirements:</p>
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
        <div id="gdpr" />
        <div id="gdpr-rights" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">13.</span> Your Privacy Rights (GDPR &amp; CCPA)
          </h2>
          <button
            onClick={() => copyUrl('gdpr')}
            title="Copy sublink to GDPR & CCPA Rights"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
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
        <div id="data-deletion" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">14.</span> How to Request Account &amp; Data Deletion
          </h2>
          <button
            onClick={() => copyUrl('data-deletion')}
            title="Copy sublink to Data Deletion"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>To exercise your right to erasure and delete all personal data from our servers:</p>
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
          You can modify or disable cookies directly in your browser settings (Chrome, Firefox, Safari, Edge). For detailed information on specific cookie lifespans and audit logs, consult our dedicated <Link to="/cookie-policy" className="text-purple-400 underline font-bold">Cookie Policy</Link>.
        </p>
      </section>

      {/* Section 16 */}
      <section id="p-16" className="space-y-3 pt-4 border-t border-slate-800/60">
        <div id="contact" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-cyan-400">16.</span> Privacy Policy Updates &amp; Contact Information
          </h2>
          <button
            onClick={() => copyUrl('contact')}
            title="Copy sublink to Contact Info"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>We may update this Privacy Policy periodically. For questions, data requests, or compliance inquiries:</p>
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
