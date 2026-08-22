import { useRemoteConfig } from "../hooks/useRemoteConfig";
import { getButtonColorClasses } from "../utils/themeHelper";
import React, { useState } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { InstantBuyModal, InstantBuyProduct } from './InstantBuyModal';
import { generateImageAltText } from '../lib/seo';
import { useSoundEffects } from '../hooks/useSoundEffects';

const products = [
  {
    id: 1,
    platform: 'Grok xAI',
    tier: 'SuperGrok Heavy (4-Mo)',
    price: '120.00',
    duration: '/ 4 months',
    description: 'Featured Deal: Heavy computing power, Grok 3 & Grok 2 deep reasoning, zero-lag access.',
    features: ['4 Months Guaranteed Access', 'SuperGrok Heavy Max Limits', 'Grok 3 Reasoning & Vision', 'Instant Auto-Delivery'],
    image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=500&auto=format&fit=crop',
    highlighted: true,
    badge: 'Exclusive Offer',
  },
  {
    id: 2,
    platform: 'Anthropic Claude',
    tier: 'Claude Max (3-Mo)',
    price: '180.00',
    duration: '/ 3 months',
    description: 'Featured Deal: 20x higher message capacity on Claude 3.7 Sonnet & Opus with Artifacts.',
    features: ['3 Months Guaranteed Access', 'Claude Max 20x Message Limits', 'Claude 3.7 Sonnet & Opus', 'Instant Auto-Delivery'],
    image: 'https://images.unsplash.com/photo-1678129712739-5095f9d1469e?q=80&w=500&auto=format&fit=crop',
    highlighted: true,
    badge: 'Limited Offer',
  },
  {
    id: 3,
    platform: 'HeyGen Video',
    tier: 'Creator Plan Key',
    price: '22.00',
    duration: '/month',
    description: 'Generate AI video from images. Official activation key sent instantly.',
    features: ['600 video credits', '1080p export quality', 'No watermarks', 'Full platform access'],
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500&auto=format&fit=crop',
    highlighted: false,
  },
  {
    id: 4,
    platform: 'ChatGPT / OpenAI',
    tier: 'ChatGPT 20x',
    price: '42.00',
    duration: '/ 1 month',
    description: 'Private ChatGPT account with 20x limits. Available options: 1 Month ($42), 3 Months ($80) & 1 Year ($160).',
    features: ['Private Account Guarantee', '1 Mo: $42 | 3 Mo: $80 | 1 Yr: $160', 'GPT-4o & o1 Reasoning Models', 'Unmetered 20x Usage Limits'],
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=500&auto=format&fit=crop',
    highlighted: true,
    badge: 'Trending',
  }
];

export default function AIPricingGrid() {
  const ctaColor = useRemoteConfig("cta_button_color", "blue");
  const buttonClasses = getButtonColorClasses(ctaColor);
  const [selectedProduct, setSelectedProduct] = useState<InstantBuyProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playClick, playHover, playModalOpen } = useSoundEffects();

  const navigate = useNavigate();

  const handleBuy = (prod: typeof products[0]) => {
    playClick();
    if (prod.id === 4) {
      navigate('/cgpt20x');
      return;
    }
    
    setSelectedProduct({
      id: String(prod.id),
      title: `${prod.platform} - ${prod.tier}`,
      price: `$${prod.price}`,
      subscriptionPeriod: prod.duration.replace('/', '').trim(),
      features: prod.features,
    });
    playModalOpen();
    setIsModalOpen(true);
  };

  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Enterprise-Grade AI Subscriptions
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Unlock exclusive access to industry-leading AI models. Instant deployment, verified credentials, and unmetered potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative flex flex-col rounded-2xl overflow-hidden ${
                product.highlighted
                  ? 'bg-slate-900 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-900 border border-slate-800'
              }`}
            >
              <div className="h-40 w-full overflow-hidden shrink-0 relative">
                <img src={product.image} alt={generateImageAltText(product.platform, product.tier)} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              </div>
              <div className="p-8 pt-6 flex flex-col flex-1">
              {product.badge && (
                <div className="absolute top-[140px] left-1/2 -translate-x-1/2 z-10 w-full text-center">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide inline-flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                    <Zap size={14} />
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="mb-6 mt-2">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {product.platform}
                </p>
                <h3 className="text-2xl font-bold text-white mb-2">{product.tier}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">${product.price}</span>
                  <span className="text-slate-400">{product.duration}</span>
                </div>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(product)}
                onMouseEnter={() => playHover()}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 cursor-pointer relative z-10 ${
                  product.highlighted
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg hover:shadow-emerald-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Instant Buy
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InstantBuyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
}
