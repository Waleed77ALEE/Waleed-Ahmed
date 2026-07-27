import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, CheckCircle, Code, Star, Trophy, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const stats = [
    { value: '500+', label: 'Digital Orders Completed', icon: ShoppingBag, color: 'text-cyan-400' },
    { value: '99.8%', label: 'Positive Feedback Rate', icon: Star, color: 'text-amber-400' },
    { value: '5+ Yrs', label: 'Development Experience', icon: Trophy, color: 'text-indigo-400' },
    { value: 'Instant', label: 'Average Service Delivery', icon: ShieldCheck, color: 'text-emerald-400' }
  ];

  const techBadges = ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Technical SEO', 'AI APIs', 'G2G Services'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 backdrop-blur-md mb-6 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">waleedkhanafridi.online</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400 font-medium">Digital Services & Marketplace Active</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Senior Full Stack Developer,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              UI/UX Designer
            </span>{' '}
            & SEO Specialist
          </motion.h1>

          {/* Subheading Description */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            Building high-performance web applications, engineering robust digital architectures, and delivering premium AI subscriptions, social growth services, and verified accounts with instant 24/7 delivery.
          </motion.p>

          {/* Tech Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {techBadges.map((badge, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.08, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('digital-services')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Explore Digital Services Marketplace</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Hire Me for Web Development</span>
            </motion.button>
          </motion.div>

          {/* Key Metric Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center p-3 text-center transition-all"
                >
                  <div className={`p-2.5 rounded-xl bg-slate-800/60 mb-2.5 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
