import React, { useState } from 'react';
import { Lock, AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, Mail, KeyRound } from 'lucide-react';
import { PomegranEmblem, PomegranWordmark } from './PomegranLogo';
import { useAuth } from '../context/AuthContext';
import { LOBS } from '../data/content';

export const LoginPage: React.FC = () => {
  const { user, signIn, loginWithEmail, signOutUser, authError, isAuthorizedDomain, clearAuthError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn();
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsSigningIn(true);
    try {
      await loginWithEmail(emailInput, nameInput);
    } finally {
      setIsSigningIn(false);
    }
  };

  const isInvalidEmailDomain = user && !isAuthorizedDomain;

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FDE2E5] selection:text-[#BA3142]">
      {/* Main Login Card Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand & Portal Highlights */}
          <div className="lg:col-span-7 space-y-6 pr-0 lg:pr-4">
            {/* Logo Lockup */}
            <div className="flex items-center gap-3">
              <PomegranEmblem size={52} color="#BA1E38" />
              <div>
                <PomegranWordmark height={30} color="#BA1E38" />
                <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mt-0.5">
                  Agent Hub · Training Portal
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Welcome to the <span className="text-[#BA1E38]">Pomegran</span> Agent Hub
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                The central training, scenarios, and practice ecosystem built exclusively for Intelcia customer service, technical support, and sales agents on the Pomegran Account.
              </p>
            </div>

            {/* Covered Queues Badges */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Covered Lines of Business (LOBs)
              </span>
              <div className="flex flex-wrap gap-2">
                {LOBS.map((lob) => (
                  <span
                    key={lob.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-800 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lob.accent.primary }} />
                    {lob.name} · {lob.fullName}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-medium text-stone-700 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5-LOB Hot Topics & Quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interactive Customer Scenarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soft Skills & De-escalation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Microlearning Video Library</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl relative overflow-hidden">
              
              {/* Card Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100/50 to-transparent rounded-bl-full pointer-events-none" />

              <div className="space-y-5 relative z-10">
                <div className="text-center space-y-1.5">
                  <div className="inline-flex p-3 rounded-2xl bg-rose-50 text-[#BA1E38] border border-rose-100 mb-1">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900">Agent Sign In</h2>
                  <p className="text-xs text-stone-500">
                    Sign in with your official <strong className="text-stone-700">@intelcia.com</strong> email
                  </p>
                </div>

                {/* Unauthorized Domain Warning */}
                {isInvalidEmailDomain && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 text-xs text-amber-900">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-bold text-amber-950 block">Unauthorized Account</span>
                        <p>
                          Logged in as <strong className="font-semibold underline">{user.email}</strong>. Access is restricted to authorized <span className="font-bold text-amber-950">@intelcia.com</span> accounts.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={signOutUser}
                      className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors cursor-pointer text-center text-xs"
                    >
                      Sign Out & Switch Account
                    </button>
                  </div>
                )}

                {/* Auth Error Message */}
                {authError && !isInvalidEmailDomain && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#BA1E38] shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                    <button
                      onClick={clearAuthError}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold shrink-0 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Sign In Options */}
                {!isInvalidEmailDomain && (
                  <div className="space-y-4">
                    
                    {/* Direct Intelcia Email Authentication Form */}
                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Intelcia Email Address <span className="text-[#BA1E38]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            required
                            placeholder="name@intelcia.com"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#BA1E38] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSigningIn || !emailInput.trim()}
                        className="w-full py-3 px-4 rounded-xl bg-[#BA1E38] hover:bg-[#A0172E] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span>{isSigningIn ? 'Authenticating Agent...' : 'Sign In with Intelcia Email'}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                      </button>
                    </form>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-stone-200"></div>
                      <span className="flex-shrink mx-3 text-[11px] font-semibold text-stone-400 uppercase">Or</span>
                      <div className="flex-grow border-t border-stone-200"></div>
                    </div>

                    {/* Google SSO Button */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSigningIn}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.25 21.3 7.31 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.42l4-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span>Sign in with Google (@intelcia.com)</span>
                    </button>

                  </div>
                )}

                {/* Help Note */}
                <div className="pt-3 border-t border-stone-100 text-center text-xs text-stone-500 space-y-1">
                  <p className="flex items-center justify-center gap-1 font-medium text-stone-700">
                    <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                    Need assistance logging in?
                  </p>
                  <p>
                    Contact Sandrine Aziz at{' '}
                    <a href="mailto:Sandreen.aziz@intelcia.com" className="text-[#BA1E38] font-semibold hover:underline">
                      Sandreen.aziz@intelcia.com
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200/80 py-4 px-6 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-medium text-stone-700">
          <PomegranEmblem size={18} color="#BA1E38" />
          <span>Pomegran Account – Agent Hub</span>
        </div>
        <div>
          Authored by <strong className="text-stone-800">Sandrine Aziz</strong> · Intelcia Pomegran Training & Quality
        </div>
      </footer>
    </div>
  );
};
