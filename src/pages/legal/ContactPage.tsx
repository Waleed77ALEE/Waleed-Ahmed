import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { Building2, Shield, MapPin, Mail, Phone, Briefcase, Clock, FileText, User } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const toc: LegalTocItem[] = [
    { id: 'c-1', title: '1. Corporate Headquarters' },
    { id: 'c-2', title: '2. Support & Communication Channels' },
    { id: 'c-3', title: '3. Operating Hours' },
    { id: 'c-4', title: '4. Legal & Compliance Department' },
    { id: 'c-5', title: '5. Business Inquiries' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/contact-info',
    url: 'https://waleedkhanafridi.online/contact-info',
    name: 'Contact & Merchant Information | Waleed Khan Afridi Digital Agency',
    description: 'Official corporate contact information, support channels, and legal department routing for Waleed Khan Afridi Digital Agency.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Contact & Merchant Info"
      subtitle="Official Corporate Directory, Support Channels, and Legal Department Contact Information."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="contact"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/contact-info"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 via-slate-900 to-slate-900 border border-teal-500/30 text-teal-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-teal-400 text-sm">
          <Building2 className="w-5 h-5" />
          <span>WALEED KHAN AFRIDI DIGITAL AGENCY</span>
        </div>
        <p>
          We operate as a fully remote, global digital agency headquartered in Islamabad, Pakistan, serving commercial clients worldwide. Below is our official merchant contact information for client communications, technical support, and legal notices.
        </p>
      </div>

      {/* Section 1 */}
      <section id="c-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-teal-400">1.</span> Corporate Headquarters
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency</p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>Office 4B, Sector F-11 Markaz</span>
          </div>
          <div className="flex items-center gap-2 ml-6">
            <span>Islamabad, 44000</span>
          </div>
          <div className="flex items-center gap-2 ml-6">
            <span>Pakistan</span>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="c-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-teal-400">2.</span> Support &amp; Communication Channels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold flex items-center gap-2 text-cyan-400 text-sm">
              <Mail className="w-4 h-4" />
              <span>General &amp; Technical Support</span>
            </div>
            <p className="text-slate-400">For account issues, software license replacements, or bug reports.</p>
            <p className="text-slate-300">
              Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-cyan-400 font-mono underline">waleedkhanafridi7@gmail.com</a>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold flex items-center gap-2 text-emerald-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>Direct Client WhatsApp</span>
            </div>
            <p className="text-slate-400">For premium contract negotiations, direct API handovers, and urgent queries.</p>
            <p className="text-slate-300">
              WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a>
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="c-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-teal-400">3.</span> Operating Hours
        </h2>
        <p>Our standard engineering and client support hours are:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Monday - Friday:</strong> 09:00 AM - 06:00 PM (PKT - Pakistan Standard Time)</li>
          <li><strong>Saturday - Sunday:</strong> Priority Urgent Support Only (for enterprise tier retainers).</li>
        </ul>
        <p className="text-xs text-slate-400 italic">Automated digital asset delivery and checkout pipelines remain functional 24/7/365.</p>
      </section>

      {/* Section 4 */}
      <section id="c-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-teal-400">4.</span> Legal &amp; Compliance Department
        </h2>
        <p>
          For formal legal notices, DMCA takedown requests, GDPR/CCPA data deletion requests, or law enforcement inquiries:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-white">Legal &amp; Data Protection Officer</span>
          </div>
          <p className="text-xs mt-1">Please include &quot;LEGAL NOTICE&quot; in the subject line of your email for prioritized routing.</p>
          <p className="text-xs">
            Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-purple-400 font-mono underline">waleedkhanafridi7@gmail.com</a>
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section id="c-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-teal-400">5.</span> Business &amp; Partnership Inquiries
        </h2>
        <p>
          For enterprise software contracts, agency white-labeling, investment queries, or B2B collaborations, please contact our administrative desk directly via email or WhatsApp.
        </p>
      </section>
    </LegalLayout>
  );
};
