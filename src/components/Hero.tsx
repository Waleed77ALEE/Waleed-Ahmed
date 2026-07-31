import React from 'react';
import { ArrowRight, Sparkles, FolderGit2, Mail, CheckCircle, Code, Star, Trophy, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAndroidApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {

  const stats = [
    { value: '150+', label: 'Projects Completed', icon: FolderGit2, color: 'text-amber-400' },
    { value: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-cyan-400' },
    { value: '24/7', label: 'Support Available', icon: ShieldCheck, color: 'text-emerald-400' },
    { value: '9+', label: 'Years Experience', icon: Trophy, color: 'text-indigo-400' }
  ];

  const techPills = ['React', 'Next.js', 'TypeScript', 'Node.js'];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-950">
      {/* Background Soft Luxury Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/15 to-indigo-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Subtle Top Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs text-slate-200 backdrop-blur-2xl mb-8 shadow-xl hover:border-amber-500/60 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="font-semibold text-slate-300">Waleed Khan Afridi</span>
            <span className="text-slate-700">•</span>
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Available for Hire & Consultations
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              Building Premium Websites, AI Solutions &amp; Digital Products
            </span>
          </motion.h1>

          {/* Subheading (Max 2 lines) */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            Helping businesses grow with modern web development, AI-powered automation, SEO, and premium digital products.
          </motion.p>

          {/* 4 Technology Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {techPills.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-xl shadow-md flex items-center gap-1.5"
              >
                <span className="text-cyan-400 font-black">•</span>
                <span>{tech}</span>
              </span>
            ))}
          </motion.div>

          {/* Three Premium CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full max-w-2xl mx-auto">
            {/* Hire Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('contact')}
              className="w-full sm:flex-1 px-6 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 hover:from-amber-300 hover:to-cyan-300 shadow-xl shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-950" />
              <span>Hire</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </motion.button>

            {/* Products Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('software-services')}
              className="w-full sm:flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Products</span>
            </motion.button>

            {/* Portfolio Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('projects')}
              className="w-full sm:flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Portfolio</span>
            </motion.button>
          </motion.div>

          {/* Clean Metrics Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center p-3 text-center transition-all group"
                >
                  <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 mb-3 group-hover:scale-110 transition-transform ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

