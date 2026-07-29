import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle2, Users, Award, Clock, Sparkles } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  endValue: number;
  suffix: string;
  label: string;
  description: string;
  delay: number;
}

const StatCounter: React.FC<StatItemProps> = ({ icon, endValue, suffix, label, description, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out expo
      const current = Math.floor(endValue * (1 - Math.pow(2, -10 * progress)));
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, endValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-xl group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/10">
          {icon}
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            {count}
            <span className="text-emerald-400">{suffix}</span>
          </div>
          <div className="text-xs font-bold text-slate-300 mt-0.5">{label}</div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      endValue: 150,
      suffix: '+',
      label: 'Completed Projects',
      description: 'Full-stack web apps, e-commerce stores, and high-performance AI integrations delivered successfully.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      endValue: 120,
      suffix: '+',
      label: 'Happy Global Clients',
      description: 'Satisfied founders, enterprises, and creators across USA, UK, Europe, UAE, and Pakistan.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      endValue: 5,
      suffix: '+',
      label: 'Years of Experience',
      description: 'Specialized expertise in React, TypeScript, Node.js, AI subscriptions, and modern cloud architecture.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      endValue: 99,
      suffix: '%',
      label: 'Client Satisfaction Rate',
      description: 'Consistent 5-star ratings, on-time delivery, and 24/7 dedicated WhatsApp technical support.'
    }
  ];

  return (
    <section className="py-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              icon={stat.icon}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
