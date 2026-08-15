import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: string;
  user_name: string;
  avatar_url?: string;
  rating: number;
  review_text: string;
  service_purchased?: string;
  created_at: string;
}

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    user_name: 'Sarah J.',
    rating: 5,
    review_text: 'Waleed provided exceptional web development services. The site is incredibly fast and the design is exactly what we wanted.',
    service_purchased: 'Web Development',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_name: 'Mike R.',
    rating: 5,
    review_text: 'The SEO optimization dramatically improved our traffic within just a few weeks. Highly recommended!',
    service_purchased: 'SEO Services',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    user_name: 'David L.',
    rating: 4,
    review_text: 'Great experience buying an AI subscription. The delivery was instant and the support was very helpful.',
    service_purchased: 'AI Subscriptions',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    user_name: 'Emma T.',
    rating: 5,
    review_text: 'Super responsive and talented developer. The custom software solution perfectly fit our business needs.',
    service_purchased: 'Custom Software',
    created_at: new Date().toISOString()
  }
];

export const TestimonialSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error || !data || data.length === 0) {
          console.warn('Could not fetch testimonials from Supabase, falling back to mock data:', error);
          setTestimonials(MOCK_TESTIMONIALS);
        } else {
          setTestimonials(data as Testimonial[]);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setTestimonials(MOCK_TESTIMONIALS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <div className="w-full py-16 bg-[#0b0e14] flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-[#0b0e14] border-t border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Star className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-sm font-bold text-cyan-300 uppercase tracking-widest">Client Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Hundreds</span>
          </h2>
          <p className="text-slate-400 text-lg">
            See what our clients have to say about our digital services and marketplace products.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button
              onClick={prevSlide}
              className="p-2 md:p-3 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all hover:scale-110 focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button
              onClick={nextSlide}
              className="p-2 md:p-3 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all hover:scale-110 focus:outline-none"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="overflow-hidden relative px-4">
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 md:p-10 text-center relative"
                >
                  <Quote className="w-12 h-12 text-slate-800 absolute top-6 left-6 -z-10 opacity-50" />
                  
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 md:w-6 md:h-6 ${i < testimonials[currentIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-8">
                    "{testimonials[currentIndex].review_text}"
                  </p>
                  
                  <div className="flex flex-col items-center justify-center">
                    {testimonials[currentIndex].avatar_url ? (
                      <img
                        src={testimonials[currentIndex].avatar_url}
                        alt={testimonials[currentIndex].user_name}
                        className="w-12 h-12 rounded-full mb-3 object-cover border-2 border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full mb-3 bg-cyan-900/50 border-2 border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-lg">
                        {testimonials[currentIndex].user_name.charAt(0)}
                      </div>
                    )}
                    <h4 className="text-white font-bold text-base">
                      {testimonials[currentIndex].user_name}
                    </h4>
                    {testimonials[currentIndex].service_purchased && (
                      <span className="text-xs font-mono text-cyan-500 mt-1 uppercase tracking-wider">
                        {testimonials[currentIndex].service_purchased}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-cyan-400 w-8' : 'bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
