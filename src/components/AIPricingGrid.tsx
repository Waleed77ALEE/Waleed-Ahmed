import React, { useState } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { InstantBuyModal, InstantBuyProduct } from './InstantBuyModal';

const products = [
  {
    id: 1,
    platform: 'Grok xAI',
    tier: 'SuperGrok Heavy (4-Mo)',
    price: '120.00',
    duration: '/ 4 months',
    description: 'Featured Deal: Heavy computing power, Grok 3 & Grok 2 deep reasoning, zero-lag access.',
    features: ['4 Months Guaranteed Access', 'SuperGrok Heavy Max Limits', 'Grok 3 Reasoning & Vision', 'Instant Auto-Delivery'],
    highlighted: true,
    badge: 'Exclusive Offer',
  },
  {
    id: 2,
    platform: 'HeyGen Video',
    tier: 'Creator Plan Key',
    price: '22.00',
    duration: '/month',
    description: 'Generate AI video from images. Official activation key sent instantly.',
    features: ['600 video credits', '1080p export quality', 'No watermarks', 'Full platform access'],
    highlighted: false,
  },
  {
    id: 3,
    platform: 'ChatGPT Shared',
    tier: 'Pro (5x) Access',
    price: '35.00',
    duration: '/month',
    description: 'Perfect for power users needing flagship models without the $100 price tag.',
    features: ['Access to Sol, Terra, Luna', '5x standard usage limits', 'Agent Mode enabled', 'Instant auto-delivery'],
    highlighted: false,
  }
];

export default function AIPricingGrid() {
  const [selectedProduct, setSelectedProduct] = useState<InstantBuyProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = (prod: typeof products[0]) => {
    setSelectedProduct({
      id: String(prod.id),
      title: `${prod.platform} - ${prod.tier}`,
      price: `$${prod.price}`,
      subscriptionPeriod: prod.duration.replace('/', '').trim(),
      features: prod.features,
    });
    setIsModalOpen(true);
  };

  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Premium AI Accounts &amp; Tools
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Instant delivery. Verified access. Unbeatable pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative flex flex-col p-8 rounded-2xl ${
                product.highlighted
                  ? 'bg-slate-900 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-900 border border-slate-800'
              }`}
            >
              {product.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <Zap size={14} />
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
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
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  product.highlighted
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg hover:shadow-emerald-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Instant Buy
              </button>
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
