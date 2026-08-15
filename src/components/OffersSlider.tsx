import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateImageAltText } from '../lib/seo';

const OFFERS = [
  {
    id: 1,
    title: 'Summer Gaming Sale',
    subtitle: 'Up to 50% Off WoW Gold & Apex Boosts',
    description: 'Level up your game with our exclusive summer discounts on top gaming services. Fast delivery, 100% secure.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    color: 'from-cyan-500 to-blue-600',
    link: '/gaming-market',
    badge: 'Limited Time'
  },
  {
    id: 2,
    title: 'SuperGrok AI Early Access',
    subtitle: 'Heavy Compute Power for $120/4mo',
    description: 'Unlock unprecedented reasoning and vision capabilities with our exclusive SuperGrok AI subscription.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop',
    color: 'from-emerald-500 to-teal-700',
    link: '#ai-accounts',
    badge: 'Exclusive Deal'
  },
  {
    id: 3,
    title: 'Creative Cloud Suite',
    subtitle: 'Full 2026 Edition just $45',
    description: 'Get all Adobe 2026 apps including Photoshop, Premiere, and Illustrator with instant digital delivery.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
    color: 'from-purple-500 to-pink-600',
    link: '#softwares',
    badge: 'Hot Seller'
  }
];

export const OffersSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? OFFERS.length - 1 : prev - 1));

  return (
    <section className="py-8 bg-[#0b0e14] relative z-20 -mt-10 lg:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-cyan-900/20 group">
        <div className="aspect-[21/9] sm:aspect-[21/7] md:aspect-[21/6] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={OFFERS[currentIndex].image} 
                alt={generateImageAltText(OFFERS[currentIndex].title, OFFERS[currentIndex].badge)}
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${OFFERS[currentIndex].color} opacity-20`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent w-2/3" />
              
              <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 w-full md:w-3/4 lg:w-2/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                    <Tag className="w-3 h-3" />
                    {OFFERS[currentIndex].badge}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">
                    {OFFERS[currentIndex].title}
                  </h2>
                  <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4">
                    {OFFERS[currentIndex].subtitle}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-8 line-clamp-2 sm:line-clamp-none">
                    {OFFERS[currentIndex].description}
                  </p>
                  
                  {OFFERS[currentIndex].link.startsWith('#') ? (
                    <a 
                      href={OFFERS[currentIndex].link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-black hover:bg-cyan-400 transition-colors shadow-lg hover:shadow-cyan-400/20"
                    >
                      <span>Claim Offer</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link 
                      to={OFFERS[currentIndex].link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-black hover:bg-cyan-400 transition-colors shadow-lg hover:shadow-cyan-400/20"
                    >
                      <span>Claim Offer</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {OFFERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
