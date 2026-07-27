import React, { useState } from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Share2, Layers, Zap, WifiOff, Bell, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import brandLogoImg from '../assets/images/brand_logo_1785031049165.jpg';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallPWA: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallPWA,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'apk' | 'pwa'>('apk');

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    setDownloading(true);
    // Trigger download of WKA-Digital-Marketplace-v2.4.apk
    const link = document.createElement('a');
    link.href = '/WKA-Digital-Marketplace-v2.4.apk';
    link.download = 'WKA-Digital-Marketplace-v2.4.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
    }, 1200);
  };

  const appFeatures = [
    {
      icon: Zap,
      title: 'Ultra Fast 1-Touch Access',
      desc: 'Launch directly from your Android home screen with sub-second load times.'
    },
    {
      icon: WifiOff,
      title: 'Offline Catalog & Cache',
      desc: 'Browse web packages, social services, and portfolio even without internet.'
    },
    {
      icon: Bell,
      title: 'Order Status Updates',
      desc: 'Receive instant notifications on account handover and project progress.'
    },
    {
      icon: ShieldCheck,
      title: '100% Safe & Ad-Free',
      desc: 'Clean, verified Android package built with modern web sandbox security.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 p-6 sm:p-8 border-b border-slate-800">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-indigo-600 p-[2px] shadow-xl shadow-emerald-500/20 overflow-hidden">
                  <img
                    src={brandLogoImg}
                    alt="WKA App Icon"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-lg" title="Android Compatible">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Official Android Release
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                    v2.4.0 • 2.8 MB
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  WKA Digital Platform APK
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Download the official native Android App for instant access to digital services, custom web ordering, and crypto checkout.
                </p>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="px-6 pt-5 bg-slate-900/90 border-b border-slate-800/80 flex gap-2">
            <button
              onClick={() => setActiveTab('apk')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'apk'
                  ? 'bg-slate-950 text-emerald-400 border-t-2 border-emerald-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Direct APK Download</span>
            </button>
            <button
              onClick={() => setActiveTab('pwa')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pwa'
                  ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>1-Click App Install (PWA)</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'apk' ? (
              <div className="space-y-6">
                {/* Download CTA Box */}
                <div className="bg-gradient-to-br from-slate-950 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  <h4 className="text-base font-bold text-white mb-2">
                    Download APK File for Android
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
                    Direct installation file compatible with Samsung, Xiaomi, Oppo, Vivo, OnePlus, Huawei, Google Pixel & all Android smartphones.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleDownloadApk}
                      disabled={downloading}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 text-slate-950 text-xs sm:text-sm font-extrabold shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5 group cursor-pointer disabled:opacity-50"
                    >
                      {downloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Preparing APK File...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>Download WKA-Digital-v2.4.apk</span>
                        </>
                      )}
                    </button>

                    {deferredPrompt && (
                      <button
                        onClick={onInstallPWA}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs sm:text-sm font-bold border border-cyan-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Instant Chrome Install</span>
                      </button>
                    )}
                  </div>

                  {downloadSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>APK Download Started! Check your browser downloads folder to install.</span>
                    </motion.div>
                  )}
                </div>

                {/* Installation Guide */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5">
                  <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    How to Install APK on Android:
                  </h5>
                  <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                    <li>Tap the green <strong className="text-white">"Download APK"</strong> button above.</li>
                    <li>Once downloaded, open your phone's <strong className="text-white">Downloads</strong> or tap the downloaded notification.</li>
                    <li>If prompted with <strong className="text-slate-200">"Install unknown apps"</strong>, allow permission for your browser.</li>
                    <li>Tap <strong className="text-emerald-400">Install</strong> to add the official app to your Android home screen!</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* PWA Direct Installation */}
                <div className="bg-gradient-to-br from-slate-950 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 text-center">
                  <h4 className="text-base font-bold text-white mb-2">
                    Instant WebApp Install (No File Download Required)
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
                    Install directly through Android Google Chrome, Edge, or Brave without needing unknown app permissions.
                  </p>

                  <button
                    onClick={onInstallPWA}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 text-slate-950 text-xs sm:text-sm font-extrabold shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{deferredPrompt ? 'Trigger Android 1-Click Install' : 'Install App via Chrome Menu'}</span>
                  </button>
                </div>

                {/* Manual Chrome Add to Home Screen Instructions */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5">
                  <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    Chrome & Android Web Browser Guide:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-2">1</div>
                      <p className="text-slate-300 font-medium">Tap the <strong className="text-white">3 Dots (⋮)</strong> in browser top right</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-2">2</div>
                      <p className="text-slate-300 font-medium">Select <strong className="text-cyan-300">"Install app"</strong> or <strong className="text-cyan-300">"Add to Home screen"</strong></p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-2">3</div>
                      <p className="text-slate-300 font-medium">Tap <strong className="text-emerald-400">Install</strong> to launch instantly anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* App Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {appFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-white mb-0.5">{feat.title}</h6>
                      <p className="text-[11px] text-slate-400 leading-tight">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Android APK • waleedkhanafridi.online</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
