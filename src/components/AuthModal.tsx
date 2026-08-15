import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle2, AlertCircle, Loader2, KeyRound, ShieldCheck } from 'lucide-react';
import { supabase, upsertProfile } from '../lib/supabase';
import { auth, googleProvider, facebookProvider } from '../lib/firebase';
import { signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { recordUserSignup } from '../services/userStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  
  const handleFacebookSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('Initializing Facebook Sign-In...');
    setLoading(true);
    try {
      console.log('🚀 Attempting Facebook Sign-In via Firebase Auth...');
      const result = await signInWithPopup(auth, facebookProvider);
      if (result?.user) {
        const fbUser = result.user;
        console.log('✅ Firebase Facebook Auth Success:', fbUser.email);
        
        await upsertProfile({ id: fbUser.uid,
          email: fbUser.email || '',
          full_name: fbUser.displayName || 'Facebook User',
          whatsapp: '',
        });

        setSuccessMsg('Successfully signed in with Facebook!');
        setTimeout(() => {
          onAuthSuccess?.();
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      console.error('❌ Facebook Auth Error:', err);
      setErrorMsg(err.message || 'Failed to sign in with Facebook');
    } finally {
      setLoading(false);
    }
  };

  const handleCWalletSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('Connecting to CWallet...');
    setLoading(true);
    // Mock CWallet Connection logic
    setTimeout(async () => {
      try {
        setSuccessMsg('CWallet Connected Successfully!');
        setTimeout(() => {
          onAuthSuccess?.();
          onClose();
        }, 1000);
      } catch (err: any) {
        setErrorMsg('Failed to connect CWallet');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('Initializing Google Sign-In...');
    setLoading(true);

    try {
      // 1. Try Firebase Auth Google Provider first (fastest popup login)
      try {
        console.log('🚀 Attempting Google Sign-In via Firebase Auth...');
        googleProvider.setCustomParameters({ prompt: 'select_account' });
        const result = await signInWithPopup(auth, googleProvider);
        
        if (result?.user) {
          const fbUser = result.user;
          console.log('✅ Firebase Google Auth Success:', fbUser.email);
          
          const fullName = fbUser.displayName || fbUser.email?.split('@')[0] || 'Google User';
          
          await recordUserSignup({
            id: fbUser.uid,
            email: fbUser.email || '',
            fullName,
            provider: 'Google',
            createdAt: fbUser.metadata?.creationTime || new Date().toISOString()
          });

          await upsertProfile({
            id: fbUser.uid,
            email: fbUser.email || '',
            full_name: fullName,
            whatsapp: '',
            created_at: new Date().toISOString()
          });

          setSuccessMsg(`Welcome, ${fullName}! Google login successful.`);
          setTimeout(() => {
            if (onAuthSuccess) onAuthSuccess();
            onClose();
          }, 1000);
          return;
        }
      } catch (fbErr: any) {
        console.warn('⚠️ Firebase Google Auth Popup notice:', fbErr?.code || fbErr?.message);
        
        // If popup closed by user or cancelled, don't throw an error
        if (fbErr?.code === 'auth/popup-closed-by-user' || fbErr?.code === 'auth/cancelled-popup-request') {
          setErrorMsg('Google Sign-In popup was closed before completing authentication.');
          setLoading(false);
          return;
        }

        // If operation not allowed or popup blocked, attempt Firebase Redirect or Supabase OAuth
        if (fbErr?.code === 'auth/popup-blocked') {
          try {
            console.log('🔄 Trying Firebase Redirect fallback...');
            await signInWithRedirect(auth, googleProvider);
            return;
          } catch (rErr) {
            console.warn('Firebase redirect error:', rErr);
          }
        }
      }

      // 2. Fallback to Supabase OAuth Google Sign-In
      const env = (import.meta as any).env || {};
      const supabaseUrl = env.VITE_SUPABASE_URL || 'https://bspuihgnwkpcfkfvffum.supabase.co';
      const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Y7tDSyXyvW0dNgtfq3AUoQ_z7i_odLs';

      if (!supabaseUrl || !supabaseAnonKey) {
        const missingErr = 'Supabase configuration is missing or incomplete (URL / Anon Key).';
        console.error('Google Auth Error:', missingErr);
        setErrorMsg(missingErr);
        setLoading(false);
        return;
      }

      const currentOrigin = window.location.origin;
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      const redirectUrl = `${currentOrigin}${window.location.pathname}`;

      console.log('🚀 Initiating Google Sign-In via Supabase OAuth...');

      try {
        localStorage.setItem('auth_redirect_after_login', currentPath);
      } catch (e) {
        console.warn('Unable to write auth_redirect_after_login to localStorage:', e);
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline'
          }
        }
      });

      if (error) {
        console.error('❌ Supabase Google OAuth Error:', error);
        setErrorMsg(`Google Provider: ${error.message || 'Please enable Google provider in your Auth settings or check popups.'}`);
        setLoading(false);
        return;
      }

      if (data?.url) {
        console.log('✅ Google OAuth Authorization URL generated successfully:', data.url);
        setSuccessMsg('Redirecting to Google Account Login...');

        const isIframe = window.self !== window.top;

        if (isIframe) {
          console.log('ℹ️ Running inside iframe context. Opening Google OAuth in popup / top window...');
          const width = 600;
          const height = 700;
          const left = Math.max(0, (window.screen.width - width) / 2);
          const top = Math.max(0, (window.screen.height - height) / 2);

          const popup = window.open(
            data.url,
            'google_oauth_popup',
            `width=${width},height=${height},top=${top},left=${left},status=yes,scrollbars=yes,resizable=yes`
          );

          if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            console.warn('⚠️ Popup blocked by browser. Falling back to top-level navigation...');
            if (window.top) {
              window.top.location.href = data.url;
            } else {
              window.location.href = data.url;
            }
          } else {
            popup.focus();
            setSuccessMsg('Google Login window launched! Please complete authentication in the popup.');
          }
        } else {
          console.log('➡️ Direct browser tab detected. Navigating immediately to Google OAuth page...');
          window.location.href = data.url;
        }
      } else {
        const fallbackRes = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              prompt: 'select_account'
            }
          }
        });

        if (fallbackRes.error) {
          console.error('❌ Standard Google OAuth Fallback Error:', fallbackRes.error);
          setErrorMsg(fallbackRes.error.message);
          setLoading(false);
        }
      }
    } catch (err: any) {
      console.error('💥 Google Sign-In Exception:', err);
      setErrorMsg(err?.message || 'Failed to initiate Google Sign-In. Please try email login.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        await updateProfile(fbUser, {
          displayName: fullName
        });

        await upsertProfile({
          id: fbUser.uid,
          email: fbUser.email || email,
          full_name: fullName,
          whatsapp: whatsapp,
          created_at: new Date().toISOString()
        });

        await recordUserSignup({
          id: fbUser.uid,
          email: fbUser.email || email,
          fullName: fullName || email.split('@')[0],
          whatsapp: whatsapp,
          provider: 'Email',
          createdAt: new Date().toISOString()
        });

        setSuccessMsg('Account registered successfully! You are now logged in.');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onClose();
        }, 1200);

      } else {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        // Record signin profile
        await recordUserSignup({
          id: fbUser.uid,
          email: fbUser.email || email,
          fullName: fbUser.displayName || email.split('@')[0],
          whatsapp: '',
          provider: 'Email'
        });

        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-[#333] text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white">
            {mode === 'signin' ? 'Sign in to AleePay' : 'Create AleePay Account'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {mode === 'signin'
              ? 'Sign in to your AleePay account to access your purchased keys, wallet balance, and order history.'
              : 'Register your AleePay account to manage digital software licenses, wallet credits, and order fulfillment.'}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-[#0a0a0a] p-1 rounded-2xl border border-[#333] mb-5">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-red-500 text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-red-500 text-slate-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        
        {/* Social & Wallet Login Buttons */}
        <div className="grid grid-cols-1 gap-2 mb-3">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-red-500 hover:bg-[#222] text-white font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-md group cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-red-500 hover:bg-[#222] text-white font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-md group cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Continue with Facebook</span>
          </button>

          {/* CWallet */}
          <button
            type="button"
            onClick={handleCWalletSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-md group cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Connect CWallet</span>
          </button>
        </div>


        {/* Google Verified Trust Banner */}
        <div className="mb-5 flex items-start sm:items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-sm shadow-red-500/5">
          <div className="p-1.5 rounded-md bg-white shrink-0 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold flex items-center gap-1.5 text-red-300">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              Google Verified
            </span>
            <span className="text-[10px] text-red-300/80 mt-0.5">Sign in with Google to synchronize your AleePay orders, digital keys, and wallet securely.</span>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#1a1a1a] px-3 text-gray-500 font-bold tracking-wider">
              Or {mode === 'signin' ? 'Sign In' : 'Register'} with Email
            </span>
          </div>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Waleed Khan"
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">WhatsApp Number (For Order Delivery)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-600 text-slate-950 font-extrabold text-xs hover:from-red-500 hover:to-red-500 transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Supabase Auth...</span>
              </>
            ) : (
              <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        <p className="text-[11px] text-center text-gray-500 mt-6">
          Powered by Firebase Auth & CWallet Integration
        </p>
      </div>
    </div>
  );
};
