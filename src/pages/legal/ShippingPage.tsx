import React from 'react';
import { LegalLayout, LegalTocItem } from './LegalLayout';
import { Truck, Shield, Clock, Zap, Download, Globe, Mail, Phone, Server } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  const toc: LegalTocItem[] = [
    { id: 's-1', title: '1. Overview of Digital Delivery' },
    { id: 's-2', title: '2. Delivery Timelines' },
    { id: 's-3', title: '3. Delivery Methods' },
    { id: 's-4', title: '4. Android App (APK) Delivery' },
    { id: 's-5', title: '5. Missing or Delayed Deliveries' },
    { id: 's-6', title: '6. Contact Support' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://waleedkhanafridi.online/shipping-policy',
    url: 'https://waleedkhanafridi.online/shipping-policy',
    name: 'Shipping & Delivery Policy | Waleed Khan Afridi Digital Agency',
    description: 'Information regarding the instant digital delivery of software, services, and APKs at Waleed Khan Afridi Digital Agency.',
    publisher: {
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online'
    }
  };

  return (
    <LegalLayout
      title="Shipping & Delivery Policy"
      subtitle="Delivery Information for Digital Marketplace Items, Service Solutions, and Android App (APK) Downloads."
      lastUpdated="August 3, 2026"
      effectiveDate="January 1, 2026"
      documentType="shipping"
      toc={toc}
      canonicalUrl="https://waleedkhanafridi.online/shipping-policy"
      schemaJson={schemaJson}
    >
      {/* Intro Highlight Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 via-slate-900 to-slate-900 border border-sky-500/30 text-sky-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-black text-sky-400 text-sm">
          <Zap className="w-5 h-5" />
          <span>100% DIGITAL DELIVERY &amp; ZERO SHIPPING FEES</span>
        </div>
        <p>
          At <strong>Waleed Khan Afridi Digital Agency</strong>, all products and services offered—including digital marketplace items, service catalog solutions, and Android App (APK) downloads—are strictly digital. We do not ship physical goods, which means zero shipping fees and instant or rapid delivery worldwide.
        </p>
      </div>

      {/* Section 1 */}
      <section id="s-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-sky-400">1.</span> Overview of Digital Delivery
        </h2>
        <p>
          This Shipping &amp; Delivery Policy applies to all purchases made through <strong>waleedkhanafridi.online</strong>. Because our inventory consists exclusively of software licenses, web engineering services, and digital assets, physical shipping addresses are collected solely for billing and fraud prevention purposes, not for physical fulfillment.
        </p>
      </section>

      {/* Section 2 */}
      <section id="s-2" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-sky-400">2.</span> Delivery Timelines
        </h2>
        <p>Delivery timeframes depend on the type of digital product or service purchased:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
          <li><strong>Digital Marketplace Items (Software Keys, AI Passes):</strong> Delivered instantly or within 1 to 60 minutes after payment confirmation.</li>
          <li><strong>Android App (APK) Downloads:</strong> Available for instant download immediately upon successful checkout.</li>
          <li><strong>Services &amp; Solutions (Web Development, SEO):</strong> Delivery timelines are defined by the specific project milestone agreement established during the client onboarding phase.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section id="s-3" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-sky-400">3.</span> Delivery Methods
        </h2>
        <p>
          Once your payment is successfully processed via our secure 256-Bit SSL gateways (Stripe, Binance Pay, Payoneer, Crypto), your digital goods will be delivered via:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li><strong>Email Delivery:</strong> A secure download link or license key sent to your registered email address.</li>
          <li><strong>Account Dashboard:</strong> Direct access from within your secure user client area on our platform.</li>
          <li><strong>WhatsApp (Optional):</strong> Direct handover and setup assistance for premium clients.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section id="s-4" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-sky-400">4.</span> Android App (APK) Delivery
        </h2>
        <p>
          Purchased or free Android App (APK) files are hosted on our secure, high-speed servers. Upon acquisition, users are granted a direct, encrypted download link. It is the user&apos;s responsibility to ensure their device permits the installation of applications from &quot;Unknown Sources&quot; as per standard Android security settings.
        </p>
      </section>

      {/* Section 5 */}
      <section id="s-5" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-sky-400">5.</span> Missing or Delayed Deliveries
        </h2>
        <p>
          In rare circumstances, aggressive spam filters or network delays may affect email delivery. If you have not received your digital goods within 60 minutes of payment confirmation, please:
        </p>
        <ul className="list-decimal pl-6 space-y-1 text-slate-300">
          <li>Check your email Spam or Promotions folders.</li>
          <li>Verify that the email address provided during checkout was correct.</li>
          <li>Log into your account dashboard to view purchase history.</li>
          <li>Contact our support team immediately with your Order ID.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="s-6" className="space-y-3 pt-4 border-t border-slate-800/60">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span className="text-sky-400">6.</span> Contact Support
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <p className="font-extrabold text-white text-sm">Waleed Khan Afridi Digital Agency — Delivery Support</p>
          <p className="text-slate-300">Office 4B, Sector F-11 Markaz, Islamabad, 44000, Pakistan</p>
          <p className="text-slate-300">Email: <a href="mailto:waleedkhanafridi7@gmail.com" className="text-sky-400 font-mono underline">waleedkhanafridi7@gmail.com</a></p>
          <p className="text-slate-300">Direct WhatsApp: <a href="https://wa.me/923416860077" className="text-emerald-400 font-mono underline">+92 341 6860077</a></p>
        </div>
      </section>
    </LegalLayout>
  );
};
