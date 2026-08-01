import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle2, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { supabase, upsertProfile } from '../lib/supabase';
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

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('Initializing Google OAuth login...');
    setLoading(true);

    try {
      // 1. Verify Supabase Environment Credentials
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

      // 2. Construct production-ready redirect URL preserving current path
      const currentOrigin = window.location.origin;
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      const redirectUrl = `${currentOrigin}${window.location.pathname}`;

      console.log('🚀 Initiating Google Sign-In via Supabase Auth...');
      console.log('📌 Current Origin:', currentOrigin);
      console.log('📌 Target Redirect URL:', redirectUrl);
      console.log('📌 Pre-login return path saved:', currentPath);

      try {
        localStorage.setItem('auth_redirect_after_login', currentPath);
      } catch (e) {
        console.warn('Unable to write auth_redirect_after_login to localStorage:', e);
      }

      // 3. Initiate Google OAuth flow with skipBrowserRedirect: true first to obtain URL
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
        setErrorMsg(`Google OAuth Error: ${error.message || 'Authentication request failed'}`);
        setLoading(false);
        return;
      }

      if (data?.url) {
        console.log('✅ Google OAuth Authorization URL generated successfully:', data.url);
        setSuccessMsg('Redirecting to Google Account Login...');

        const isIframe = window.self !== window.top;

        if (isIframe) {
          console.log('ℹ️ Running inside iframe context (AI Studio preview). Opening Google OAuth in popup / top window...');
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
          // Direct browser tab (Desktop & Mobile browsers)
          console.log('➡️ Direct browser tab detected. Navigating immediately to Google OAuth page...');
          window.location.href = data.url;
        }
      } else {
        // Fallback: standard redirect
        console.log('ℹ️ Calling standard signInWithOAuth redirect fallback...');
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
      setErrorMsg(err?.message || 'Failed to initiate Google Sign-In.');
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
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              whatsapp: whatsapp
            }
          }
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.user) {
          // Sync profile to userStore and Supabase database profiles table
          await recordUserSignup({
            id: data.user.id,
            email: data.user.email || email,
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
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.user) {
          // Record signin profile
          await recordUserSignup({
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            whatsapp: data.user.user_metadata?.whatsapp || '',
            provider: 'Email'
          });

          setSuccessMsg('Signed in successfully!');
          setTimeout(() => {
            if (onAuthSuccess) onAuthSuccess();
            onClose();
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'signin'
              ? 'Sign in to access your saved orders, cart, and profile details.'
              : 'Register to manage orders, saved digital keys, and order history.'}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Connect to Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-slate-950 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/90 text-white font-bold text-xs transition-all flex items-center justify-center gap-3 shadow-md mb-4 group cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Connect with Google</span>
        </button>

        {/* Divider */}
        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-slate-900 px-3 text-slate-500 font-bold tracking-wider">
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
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Waleed Khan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">WhatsApp Number (For Order Delivery)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-xs hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 mt-2"
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

        <p className="text-[11px] text-center text-slate-500 mt-6">
          Powered by Supabase Auth & Row-Level Security
        </p>
      </div>
    </div>
  );
};
