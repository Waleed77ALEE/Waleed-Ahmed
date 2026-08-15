import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { generateImageAltText } from '../../lib/seo';

const CATEGORIES = [
  { id: 'ai', name: 'AI Subscriptions', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500&auto=format&fit=crop' },
  { id: 'web', name: 'Web Development', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop' },
  { id: 'seo', name: 'SEO Optimization', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop' },
  { id: 'design', name: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop' },
  { id: 'software', name: 'Custom Software', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop' },
  { id: 'mobile', name: 'Mobile Apps', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop' },
];

export const PopularGames: React.FC = () => {
  return (
    <section className="py-20 bg-[#0b0e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white tracking-tight">Trending Categories</h2>
          <Link to="/gaming-market" className="text-cyan-400 hover:text-cyan-300 font-bold text-sm flex items-center gap-1 transition-colors uppercase tracking-wider">
            View All Categories &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((game, idx) => (
            <Link key={game.id} to="/gaming-market">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#11161d] border border-[#1c232e] hover:border-cyan-500/50 transition-colors shadow-lg hover:shadow-cyan-500/10"
              >
                <img 
                  src={game.image} 
                  alt={generateImageAltText(game.name, 'Game Keys & Assets')}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm text-center group-hover:text-cyan-400 transition-colors leading-tight">
                    {game.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
