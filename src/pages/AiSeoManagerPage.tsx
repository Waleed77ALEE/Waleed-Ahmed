import React from 'react';
import { AiSeoManagerModal } from '../components/AiSeoManagerModal';
import { useNavigate } from 'react-router-dom';

export const AiSeoManagerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Autonomous AI SEO Agent Platform
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live crawler, on-page optimizer, schema generator, rank tracker &amp; GitHub PR automation for waleedkhanafridi.online
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            ← Back to Main Site
          </button>
        </div>

        {/* Embedded Full Dashboard Container */}
        <div className="w-full">
          <AiSeoManagerModal isOpen={true} onClose={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};

export default AiSeoManagerPage;
