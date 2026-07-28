import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, CheckCircle, Code, Star, Trophy, Users, Smartphone, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAndroidApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAndroidApp }) => {

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
    <div className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-radial-luxury bg-grid-pattern">
      {/* Background Glows & Ambient Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-amber-500/10 to-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-5 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Floating Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs text-slate-200 backdrop-blur-2xl mb-8 shadow-xl shadow-amber-500/5 hover:border-amber-500/60 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span className="font-bold text-white tracking-wide">waleedkhanafridi.online</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300 font-bold tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Verified Digital Marketplace & Web Engineering
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Senior Full Stack Engineer,{' '}
            <span className="text-gradient-gold-cyan drop-shadow-lg">
              UI/UX Architect
            </span>{' '}
            & Technical SEO Expert
          </motion.h1>

          {/* Subheading Description */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            Crafting high-performance web systems, engineering resilient enterprise software, and delivering verified AI subscriptions, social media growth, and digital assets with instant 24/7 delivery.
          </motion.p>

          {/* Tech Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {techBadges.map((badge, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.08, borderColor: 'rgba(245, 158, 11, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-amber-300 transition-all shadow-md cursor-default backdrop-blur-xl"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('digital-services')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 hover:from-amber-300 hover:to-cyan-300 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Explore Digital Marketplace</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {onOpenAndroidApp && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenAndroidApp}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-extrabold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 hover:border-emerald-500/70 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/10 backdrop-blur-md cursor-pointer group"
              >
                <Smartphone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform animate-pulse" />
                <span>Android App (APK)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                  v2.4
                </span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg backdrop-blur-md cursor-pointer"
            >
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Hire Me</span>
            </motion.button>
          </motion.div>

          {/* Key Metric Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-2xl shadow-2xl glow-box-amber"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center p-3 text-center transition-all group"
                >
                  <div className={`p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-3 group-hover:scale-110 transition-transform ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
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
