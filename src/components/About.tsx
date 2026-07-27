import React from 'react';
import { User, CheckCircle2, Award, Terminal, Cpu, Globe, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const skills = [
    { name: 'React / Next.js / TypeScript', level: 98 },
    { name: 'Node.js / Express / REST APIs', level: 95 },
    { name: 'Technical SEO & PageSpeed', level: 96 },
    { name: 'UI/UX Design & Tailwind CSS', level: 94 },
    { name: 'Database Architecture (SQL & NoSQL)', level: 90 },
    { name: 'AI API Integration (OpenAI, Claude, Gemini)', level: 95 }
  ];

  const highlights = [
    '5+ Years of Full-Stack Web Development',
    'Top-Rated Merchant on Digital Marketplaces',
    'Guaranteed 100% Non-Drop Social Media Services',
    'Expertise in Custom SaaS & E-Commerce Platforms',
    'Official Authorized Digital Subscription Reseller',
    '24/7 Dedicated Client Support via WhatsApp'
  ];

  return (
    <div className="py-20 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About Waleed Khan Afridi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bridging Software Engineering & Digital Growth
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Dedicated Full Stack Engineer, UI Designer, and Digital Service Merchant based online. I build resilient software and provide instant digital assets to propel individuals and organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-cyan-400">
                  WKA
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Waleed Khan Afridi</h3>
                <p className="text-sm text-cyan-400 font-medium">Founder & Principal Engineer</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>waleedkhanafridi.online</span>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              I specialize in crafting custom high-speed web interfaces, server-side APIs, and automated digital workflows. Simultaneously, through my digital marketplace services, I provide verified access to cutting-edge AI subscriptions, social growth packages, and aged accounts for creators, marketers, and developers worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Core Technical Competencies</span>
            </h3>

            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-200">{skill.name}</span>
                    <span className="text-xs font-bold text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
