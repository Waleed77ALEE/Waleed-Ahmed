import React, { useState } from 'react';
import { FAQS } from '../data/portfolioData';
import { MessageSquare, Mail, Send, Check, Copy, ChevronDown, ChevronUp, Clock, Globe, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { submitContactMessageDB } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  whatsappNumber: string;
  user?: any;
}

export const Contact: React.FC<ContactProps> = ({ whatsappNumber, user }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Digital Services / Subscriptions',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const officialEmail = 'waleedkhanafridi7@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Record message into Supabase contact_messages table
    await submitContactMessageDB({
      user_id: user?.id || null,
      name: formData.name,
      email: formData.email,
      whatsapp: '',
      service_requested: formData.serviceType,
      message: formData.message,
      status: 'New'
    });

    // Direct WhatsApp link
    const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${waClean}`;

    setFormSubmitted(true);
    window.open(waUrl, '_blank');
  };


  return (
    <div className="py-20 bg-slate-900/60 relative border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Client Support & Orders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch & Place Your Order
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Have questions about digital services, need custom web development, or want instant account handover? Connect directly via WhatsApp or Email.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Left Column: Direct Info & Quick Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Instant WhatsApp Support</h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                For fastest response, order confirmation, and instant digital account credentials delivery, message me directly on WhatsApp.
              </p>

              <a
                href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5 mb-4"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>Open WhatsApp Direct Chat</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Average Response Time: <strong>&lt; 15 Minutes</strong></span>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" /> Official Email Contact
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                For formal quotes, custom web development agreements, or business inquiries.
              </p>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono text-cyan-300 truncate flex-1 pl-2">
                  {officialEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Website & Operating Details */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span>Official Portfolio Domain:</span>
                <strong className="text-white">waleedkhanafridi.online</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Services Delivery:</span>
                <strong className="text-emerald-400">24/7 Instant Delivery</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Options:</span>
                <strong className="text-slate-300">Crypto, Bank, GCash, Wise</strong>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">All Social Media Channels</h4>
              <SocialLinks variant="compact" whatsappNumber={whatsappNumber} />
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Send an Order or Project Inquiry</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the form below and it will automatically prepare your order inquiry with instant WhatsApp backup.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-800 text-center">
                <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Inquiry Prepared!</h4>
                <p className="text-xs text-slate-300 mb-4">
                  WhatsApp has opened with your inquiry details. If it did not open automatically, click below:
                </p>
                <a
                  href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Continue on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Interest</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Digital Services / Subscriptions">AI Subscriptions & Digital Services</option>
                    <option value="Social Media Growth">Social Media Growth (IG, YT, FB)</option>
                    <option value="Aged Accounts & Gift Cards">Aged Accounts & Gift Cards</option>
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="UI/UX & SEO Audit">UI/UX Design & SEO Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Order Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Specify service name, quantity, or web project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry via WhatsApp</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-slate-800">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400 mt-1">Everything you need to know about placing digital service orders and web projects.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left text-sm font-semibold text-white flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
