import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { Cookie, Shield, CheckCircle2, Sliders, Globe, Eye, Lock, Mail, Phone } from 'lucide-react';

export const CookiePage: React.FC = () => {
  const toc: LegalTocItem[] = [
    { id: 'c-1', title: '1. What Are Cookies?' },
    { id: 'c-2', title: '2. Categories of Cookies We Use' },
    { id: 'c-3', title: '3. Essential & Session Cookies' },
    { id: 'c-4', title: '4. Preference & Functional Cookies' },
    { id: 'c-5', title: '5. Analytics & Performance Cookies' },
    { id: 'c-6', title: '6. Advertising & Pixel Cookies' },
    { id: 'c-7', title: '7. Third-Party Cookies' },
    { id: 'c-8', title: '8. Comprehensive Cookie Audit Table' },
    { id: 'c-9', title: '9. How to Control & Disable Cookies' },
    { id: 'c-10', title: '10. Impact of Disabling Cookies' },
    { id: 'c-11', title: '11. Updates & Contact Information' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/cookie-policy',
    url: 'https://waleedkhanafridi.online/cookie-policy',
    name: 'Cookie Policy | Waleed Khan Afridi Digital Agency',
    description: 'Comprehensive Cookie Policy detailing essential local storage, analytics trackers, ad pixels, third-party cookies, and browser controls for waleedkhanafridi.online.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="Detailed Information on Cookies, Local Storage Technologies, Analytics Trackers, and Browser Controls on waleedkhanafridi.online."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="cookie"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/cookie-policy"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-slate-900 to-slate-900 border border-purple-500/30 text-purple-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-purple-400 text-sm">
          <Cookie className="w-5 h-5" />
          <span>TRANSPARENT COOKIE &amp; LOCAL STORAGE DISCLOSURE</span>
        </div>
        <p>
          This Cookie Policy explains how <strong>Waleed Khan Afridi Digital Agency</strong> uses cookies, browser local storage, and similar web tracking technologies to operate our website, maintain shopping cart state, analyze traffic, and support ad conversion measurement.
        </p>
      </div>

      {/* Section 1 */}
      <section id="c-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">1.</span> What Are Cookies &amp; Local Storage?
        </h2>
        <p>
          Cookies are small text files placed on your computer, smartphone, or tablet by websites you visit. Local storage (HTML5 Web Storage) allows web applications to store data locally within your browser without expiry data transmission.
        </p>
        <p>
          These technologies help websites recognize your device, remember authentication states, preserve shopping cart items, and optimize site speed.
        </p>
      </section>

      {/* Section 2 */}
      <section id="c-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">2.</span> Categories of Cookies We Use
        </h2>
        <p>We classify the cookies utilized on <em>waleedkhanafridi.online</em> into four distinct categories:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h5 className="font-bold text-cyan-400 text-xs">1. Strictly Necessary / Essential</h5>
            <p className="text-xs text-slate-400">
              Required for basic site navigation, security verifications, shopping cart persistence, and user session login.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h5 className="font-bold text-amber-400 text-xs">2. Preference / Functional</h5>
            <p className="text-xs text-slate-400">
              Remember custom UI configurations, theme selection (Dark/Light mode), and selected currency settings.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h5 className="font-bold text-emerald-400 text-xs">3. Analytics &amp; Performance</h5>
            <p className="text-xs text-slate-400">
              Gather anonymous site usage telemetry, page load speeds, and Core Web Vitals performance metrics.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h5 className="font-bold text-purple-400 text-xs">4. Advertising &amp; Targeting</h5>
            <p className="text-xs text-slate-400">
              Help measure the conversion efficiency of our official Google and Meta ad campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="c-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">3.</span> Essential &amp; Session Cookies
        </h2>
        <p>
          Essential cookies are strictly required for our web application to function. Disabling these cookies in browser settings will prevent you from placing orders or logging into your user client dashboard.
        </p>
      </section>

      {/* Section 4 */}
      <section id="c-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">4.</span> Preference &amp; Functional Cookies
        </h2>
        <p>
          Functional cookies allow our web app to remember your choices (such as your active currency view or referral code attribution) to provide a personalized user experience.
        </p>
      </section>

      {/* Section 5 */}
      <section id="c-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">5.</span> Analytics &amp; Performance Trackers
        </h2>
        <p>
          We utilize <strong>Google Analytics 4</strong> and <strong>Microsoft Clarity</strong> to analyze aggregated visitor movement. These tools use anonymized IP addresses to help us detect slow pages and optimize site navigation.
        </p>
      </section>

      {/* Section 6 */}
      <section id="c-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">6.</span> Advertising &amp; Ad Pixel Cookies
        </h2>
        <p>
          We use Google Ads and Meta Pixel conversion tags to evaluate the performance of our agency ad campaigns. These tags measure whether visitors complete a contact form or purchase a service.
        </p>
      </section>

      {/* Section 7 */}
      <section id="c-7" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">7.</span> Third-Party Embedded Cookies
        </h2>
        <p>
          Certain pages may include embedded third-party widgets, such as Stripe payment elements, Binance Pay checkout QR frames, or YouTube video embeds. These third parties set independent cookies subject to their privacy policies.
        </p>
      </section>

      {/* Section 8: Audit Table */}
      <section id="c-8" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">8.</span> Comprehensive Cookie Audit Table
        </h2>
        <p>The table below lists the primary cookies and local storage tokens used on our domain:</p>

        <div className="overflow-x-auto my-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                <th className="py-2.5 px-3">Cookie Name</th>
                <th className="py-2.5 px-3">Provider</th>
                <th className="py-2.5 px-3">Purpose &amp; Description</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">sb-auth-token</td>
                <td className="py-2.5 px-3">Supabase</td>
                <td className="py-2.5 px-3">User login session &amp; JWT authentication token</td>
                <td className="py-2.5 px-3">Session / 30 Days</td>
                <td className="py-2.5 px-3 text-cyan-300 font-semibold">Essential</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">wka_cart_state</td>
                <td className="py-2.5 px-3">waleedkhanafridi.online</td>
                <td className="py-2.5 px-3">Stores current shopping cart items locally</td>
                <td className="py-2.5 px-3">30 Days</td>
                <td className="py-2.5 px-3 text-cyan-300 font-semibold">Essential</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">referral_code</td>
                <td className="py-2.5 px-3">ReferralPro</td>
                <td className="py-2.5 px-3">Tracks affiliate partner referral tracking link</td>
                <td className="py-2.5 px-3">60 Days</td>
                <td className="py-2.5 px-3 text-amber-300 font-semibold">Functional</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">_ga / _ga_*</td>
                <td className="py-2.5 px-3">Google Analytics</td>
                <td className="py-2.5 px-3">Distinguishes unique users and session metrics</td>
                <td className="py-2.5 px-3">2 Years</td>
                <td className="py-2.5 px-3 text-emerald-300 font-semibold">Analytics</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-purple-400">_fbp</td>
                <td className="py-2.5 px-3">Meta / Facebook</td>
                <td className="py-2.5 px-3">Measures ad conversion effectiveness</td>
                <td className="py-2.5 px-3">90 Days</td>
                <td className="py-2.5 px-3 text-purple-300 font-semibold">Advertising</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 9 */}
      <section id="c-9" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">9.</span> How to Control &amp; Disable Cookies
        </h2>
        <p>You can manage cookie settings directly in your web browser preferences:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies.</li>
          <li><strong>Mozilla Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection.</li>
          <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies.</li>
          <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions.</li>
        </ul>
      </section>

      {/* Section 10 */}
      <section id="c-10" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">10.</span> Impact of Disabling Cookies
        </h2>
        <p>
          If you block essential cookies, shopping cart functions, user account access, and automated checkout clearance may not perform properly.
        </p>
      </section>

      {/* Section 11 */}
      <section id="c-11" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-purple-400">11.</span> Policy Updates &amp; Contact Information
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency — Cookie Compliance Desk</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-purple-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
