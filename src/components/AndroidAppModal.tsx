import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, Sparkles, Share2, Layers, Zap, WifiOff, Bell, QrCode, ExternalLink, Info, AlertTriangle } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'install' | 'qr' | 'pwabuilder'>('install');
  const [isAndroidDevice, setIsAndroidDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(ua)) {
        setIsAndroidDevice(true);
      }
    }
  }, []);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://waleedkhanafridi.online';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl + '/#apk')}&color=020617&bgcolor=38bdf8`;

  const handleDownloadAppBundle = () => {
    setDownloading(true);

    // Create a lightweight, valid HTML5 Android WebAPK launcher package JSON / HTML
    const appInfo = {
      appName: "Waleed Khan Afridi - Digital Platform",
      packageId: "online.waleedkhanafridi.app",
      version: "2.4.0",
      appUrl: "https://waleedkhanafridi.online",
      description: "Official Android Standalone Digital Marketplace & Web App",
      developer: "Waleed Khan Afridi",
      installationInstructions: [
        "1. Open https://waleedkhanafridi.online in Android Chrome",
        "2. Tap 'Install Android App' or browser 3-dots menu (⋮)",
        "3. Tap 'Add to Home screen' or 'Install App' for WebAPK integration."
      ]
    };

    const blob = new Blob([JSON.stringify(appInfo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'WKA-Digital-Platform-Android-Config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
    }, 800);
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
      desc: 'Clean Google-verified WebAPK app built with modern web sandbox security.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
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
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-lg" title="Android WebAPK Ready">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Official Android WebAPK
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                    v2.4.0 • Zero Parse Errors
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  WKA Digital Platform Android App
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Install the official standalone app on your Android phone for 1-touch marketplace access, real-time order tracking, and crypto checkout.
                </p>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="px-6 pt-5 bg-slate-900/90 border-b border-slate-800/80 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('install')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'install'
                  ? 'bg-slate-950 text-emerald-400 border-t-2 border-emerald-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>1-Click Android Install</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'qr'
                  ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR Code (Mobile)</span>
            </button>
            <button
              onClick={() => setActiveTab('pwabuilder')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'pwabuilder'
                  ? 'bg-slate-950 text-amber-400 border-t-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>APK Builder Tool</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'install' && (
              <div className="space-y-6">
                {/* Device Notice */}
                {isAndroidDevice && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Android device detected! Tap the button below to install the app on your phone instantly.</span>
                  </div>
                )}

                {/* Primary Installation Card */}
                <div className="bg-gradient-to-br from-slate-950 to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center relative overflow-hidden shadow-xl">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  <h4 className="text-base font-bold text-white mb-1.5 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Install WebAPK App on Android
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Google Chrome / Samsung Internet converts this web platform into a native standalone Android app directly on your phone with full-screen view and app drawer icon.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={onInstallPWA}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 text-slate-950 text-xs sm:text-sm font-black shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                    >
                      <Smartphone className="w-4.5 h-4.5 text-slate-950 group-hover:scale-110 transition-transform" />
                      <span>{deferredPrompt ? 'Tap to Install Native Android App' : 'Launch Android Install Dialog'}</span>
                    </button>
                  </div>
                </div>

                {/* Android Browser Installation Instructions */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5">
                  <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    How to Install on Any Android Phone:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mx-auto mb-2">1</div>
                      <p className="text-slate-300 font-medium">Open in <strong className="text-white">Google Chrome</strong> or <strong className="text-white">Samsung Internet</strong></p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mx-auto mb-2">2</div>
                      <p className="text-slate-300 font-medium">Tap the browser <strong className="text-emerald-400">3 Dots (⋮)</strong> top right</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mx-auto mb-2">3</div>
                      <p className="text-slate-300 font-medium">Select <strong className="text-cyan-300">"Install app"</strong> or <strong className="text-cyan-300">"Add to Home screen"</strong></p>
                    </div>
                  </div>
                </div>

                {/* Explanation about WebAPK vs Raw APK files */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block mb-0.5">Why WebAPK is Better Than Manual APK Files:</strong>
                    Sideloaded `.apk` files often trigger "Parse Error", security warnings, or require turning on "Install Unknown Sources". WebAPK is Google's official Android standard: it installs safely in 1 second, stays automatically updated, and takes less than 3 MB of phone storage.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'qr' && (
              <div className="space-y-6 text-center">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-sm mx-auto">
                  <h4 className="text-sm font-bold text-white mb-2">
                    Scan with Your Android Camera
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Point your Android smartphone camera at this QR code to open the app directly on your phone and tap "Install".
                  </p>

                  <div className="bg-white p-3 rounded-2xl inline-block shadow-2xl mb-3">
                    <img
                      src={qrCodeUrl}
                      alt="Android App Install QR Code"
                      className="w-48 h-48 rounded-lg mx-auto"
                    />
                  </div>

                  <p className="text-[11px] text-cyan-400 font-mono">
                    waleedkhanafridi.online/#apk
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'pwabuilder' && (
              <div className="space-y-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Download className="w-4 h-4 text-amber-400" />
                    PWABuilder / Play Store APK Package Generator
                  </h4>
                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    If you want to generate a signed Android APK or Google Play Store AAB binary package using Microsoft / Google PWABuilder:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleDownloadAppBundle}
                      disabled={downloading}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download App Manifest Config</span>
                    </button>

                    <a
                      href={`https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Open PWABuilder (Generate APK)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {downloadSuccess && (
                    <p className="mt-3 text-xs text-emerald-400 font-medium">
                      ✓ Downloaded WKA-Digital-Platform-Android-Config.json
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* App Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-800/80">
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
              <span>Verified Android WebAPK • waleedkhanafridi.online</span>
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
