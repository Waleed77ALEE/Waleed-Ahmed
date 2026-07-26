import React from 'react';
import { User, CheckCircle2, Globe, ShieldCheck, MessageSquare, Award, Terminal, Code2, Sparkles, Send, ArrowRight } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import profileAvatarImg from '../assets/images/profile_avatar_waleed_1785031698977.jpg';

interface AboutMeEndProps {
  whatsappNumber: string;
  onContactClick?: () => void;
}

export const AboutMeEnd: React.FC<AboutMeEndProps> = ({ whatsappNumber, onContactClick }) => {
  const achievements = [
    { label: 'Full Stack Experience', value: '5+ Years' },
    { label: 'Satisfied Clients Globally', value: '1,000+' },
    { label: 'Marketplace Orders Handled', value: '500+' },
    { label: 'PageSpeed Performance Average', value: '98/100' }
  ];

  const highlights = [
    'Senior Full Stack Web Developer (React, Next.js, Node.js, Express, TypeScript)',
    'UI/UX Interface Designer creating modern high-converting layouts',
    'Technical & Organic SEO Expert driving rank #1 organic performance',
    'Founder & Verified Merchant of waleedkhanafridi.online digital marketplace',
    'Official Reseller of AI Subscriptions (HeyGen, Claude Pro, OpenAI API, Kling AI)',
    '24/7 Instant Order Delivery & Direct WhatsApp Client Support'
  ];

  return (
    <section id="about-me" className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <User className="w-4 h-4" />
            <span>About Waleed Khan Afridi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Meet the Developer & Digital Merchant
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Full Stack Software Engineer, UI Designer, and Creator of <strong className="text-cyan-300 font-semibold">waleedkhanafridi.online</strong> — delivering custom web solutions and instant digital subscription services worldwide.
          </p>
        </div>

        {/* Profile Card & Bio Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Profile Picture & Core Identity Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl backdrop-blur-xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-emerald-500/0 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Picture Container */}
              <div className="relative mb-6 mx-auto lg:mx-0 w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-cyan-500/30 p-1.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-500 shadow-xl shadow-cyan-950/40">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950 relative">
                  <img
                    src={profileAvatarImg}
                    alt="Waleed Khan Afridi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Verified Overlay Badge */}
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-white font-bold tracking-tight">Waleed Khan Afridi</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Domain Info */}
              <div className="space-y-3 text-center lg:text-left">
                <h3 className="text-2xl font-extrabold text-white">Waleed Khan Afridi</h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-semibold flex items-center justify-center lg:justify-start gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Senior Full Stack Developer & UI/UX Designer</span>
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                  <a href="https://www.waleedkhanafridi.online" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors font-mono">
                    www.waleedkhanafridi.online
                  </a>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                  Passionate about building ultra-fast React & Next.js applications, custom REST/GraphQL APIs, and automated digital subscription tools. Serving clients worldwide with guaranteed authenticity and instant WhatsApp support.
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://wa.link/6128mm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Chat on WhatsApp</span>
              </a>

              {onContactClick && (
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Detailed Experience & Key Stats (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 text-center backdrop-blur-md">
                  <p className="text-xl sm:text-2xl font-black font-mono text-cyan-400">{item.value}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Comprehensive Expertise & Services List */}
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span>Technical Expertise & Services Provided</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-indigo-950/40 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">100% Satisfaction & Warranty Guarantee</p>
                    <p className="text-[11px] text-slate-400">All digital orders & web projects include full warranty, source code access, and dedicated support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Connect with Waleed Khan Afridi on Social Media</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Follow my work, check official announcements, or get in touch on any of my official social channels.
              </p>
            </div>

            <a
              href="https://wa.link/6128mm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-400" />
              <span>WhatsApp Direct Link</span>
            </a>
          </div>

          {/* Full Interactive Social Media Matrix */}
          <SocialLinks variant="full" whatsappNumber={whatsappNumber} />
        </div>
      </div>
    </section>
  );
};
