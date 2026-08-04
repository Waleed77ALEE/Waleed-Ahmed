import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, CheckCircle2, Shield, Star, Download, Monitor, Zap } from 'lucide-react';
import { SOFTWARE_PRODUCTS, SoftwareProduct } from '../../data/softwareData';
import { SoftwareOrderModal } from '../../components/SoftwareOrderModal';

interface SingleProductPageProps {
  user?: any;
  profile?: any;
  onOpenAccount: () => void;
}

export const SingleProductPage: React.FC<SingleProductPageProps> = ({ user, profile, onOpenAccount }) => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [product, setProduct] = useState<SoftwareProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Find the product by slug
    const foundProduct = SOFTWARE_PRODUCTS.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-3xl font-black text-white mb-4">Product Not Found</h1>
        <p className="text-slate-400 mb-8">The digital product or software license you are looking for does not exist.</p>
        <Link to="/market" className="px-6 py-3 rounded-full bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/market" className="hover:text-cyan-400 transition-colors">Marketplace</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="capitalize">{category?.replace(/-/g, ' ')}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left: Product Visuals */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="glass-premium rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="w-32 h-32 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center relative z-10">
              <Monitor className="w-16 h-16 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        {/* Right: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {product.badge && (
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {product.badge}
              </span>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">In Stock</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Instant Delivery</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-sm text-slate-300">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 font-mono font-bold text-white">5.0</span>
              <span className="text-slate-500">(Verified Reviews)</span>
            </div>
          </div>

          <p className="text-base text-slate-400 mb-8 leading-relaxed font-normal">
            {product.description}
          </p>

          <div className="glass-premium-gold rounded-2xl p-6 mb-8 flex items-end gap-4">
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Lifetime License</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white font-mono">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-500 line-through font-mono mb-1">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-4 px-8 rounded-xl bg-cyan-500 text-slate-950 font-black tracking-wide hover:bg-cyan-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Zap className="w-5 h-5" />
              <span>Instant Buy</span>
            </button>
            <button className="flex-1 py-4 px-8 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-all">
              Contact Sales
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Genuine Verified License</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Email Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Official Download Link</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>24/7 Setup Support</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Section */}
      <div className="mt-20 border-t border-slate-800 pt-16">
        <h2 className="text-2xl font-black text-white mb-8">Included Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((feature, idx) => (
            <div key={idx} className="glass-premium rounded-2xl p-6 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="font-bold text-white text-sm leading-snug">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instant Checkout Modal */}
      <SoftwareOrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        user={user}
        profile={profile}
        onOpenAccount={onOpenAccount}
      />
    </div>
  );
};
