import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function CTAHome() {
  const { login, signup, error, setError } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Clear errors when switching tabs
  useEffect(() => {
    setError(null);
    setLocalError(null);
  }, [isLoginView, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setLocalError(null);

    if (isLoginView) {
      if (!email || !password) {
        setLocalError('Please fill in all fields.');
        setFormLoading(false);
        return;
      }
      const result = await login(email, password);
      if (!result.success) {
        setLocalError(result.error);
      }
    } else {
      if (!name || !email || !password) {
        setLocalError('Please fill in all fields.');
        setFormLoading(false);
        return;
      }
      const result = await signup(name, email, password);
      if (!result.success) {
        setLocalError(result.error);
      }
    }
    setFormLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-6 box-border relative font-sans">
      {/* Dynamic Top Radial Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[180px] bg-radial from-brand-purple/20 to-transparent pointer-events-none z-[-1]" />

      {/* Navigation Header */}
      <header className="flex items-center justify-between py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="text-2xl select-none">🪄</div>
          <span className="font-heading text-xl font-bold tracking-tight text-white">
            AI EBook Creator
          </span>
        </div>
        
        <button 
          className="px-5 py-2 text-sm font-semibold rounded-xl bg-slate-900/60 hover:bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all duration-300"
          onClick={() => {
            setIsLoginView(true);
            const formElement = document.getElementById('auth-section');
            if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col gap-28 md:gap-36 pt-16 pb-24">
        <section className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold text-brand-purple tracking-widest uppercase mb-6 inline-block">
            🚀 Empowering Modern Authors
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Unleash AI to Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-purple-400 to-brand-cyan">Breathtaking eBooks</span> in Seconds
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
            Go from a simple concept to a fully-formatted, visually stunning eBook. We generate rich chapters, professional outlines, and beautiful covers—tailored specifically to your vision.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <button 
              className="px-7 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-purple to-purple-600 hover:from-purple-500 hover:to-brand-purple text-white shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setIsLoginView(false);
                const formElement = document.getElementById('auth-section');
                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Creating Free
            </button>
            <a 
              href="#features" 
              className="px-7 py-3.5 text-sm font-semibold rounded-xl bg-slate-900/60 hover:bg-white/5 border border-white/10 hover:border-white/20 text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center"
            >
              Explore Features
            </a>
          </div>

          {/* Dynamic Mockup Container */}
          <div className="w-full max-w-3xl rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl hover:border-brand-purple/30 transition-all duration-500">
            {/* Mock Header */}
            <div className="bg-white/3 py-3 px-4 border-b border-white/5 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <div className="flex-1 text-center text-[10px] text-gray-500 font-mono tracking-wider">
                AI EBook Studio
              </div>
            </div>
            
            {/* Mock Layout */}
            <div className="flex h-[280px] text-left">
              {/* Sidebar */}
              <div className="w-40 bg-white/1 border-r border-white/5 p-4 flex flex-col gap-3">
                <div className="text-[11px] font-bold text-brand-purple bg-brand-purple/10 py-2 px-3 rounded-lg">
                  ✨ Generation Room
                </div>
                <div className="text-[11px] font-semibold text-gray-500 py-2 px-3">
                  📚 Library
                </div>
                <div className="text-[11px] font-semibold text-gray-500 py-2 px-3">
                  👤 Profile
                </div>
              </div>
              
              {/* Workspace */}
              <div className="flex-1 p-6 flex gap-6 items-center">
                {/* 3D Book Layout */}
                <div className="relative w-32 h-44 shrink-0 [perspective:1000px]">
                  <div className="absolute inset-0 bg-brand-purple/30 rounded-r-lg rounded-l-sm [transform:rotateY(-15deg)_translateZ(-6px)] blur-[2px]" />
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-brand-purple rounded-r-lg rounded-l-sm p-4 flex flex-col justify-between shadow-2xl border-l-[3px] border-white/10">
                    <div className="bg-white/15 text-[8px] font-extrabold px-1.5 py-0.5 rounded text-white self-start tracking-wider uppercase">
                      Fiction
                    </div>
                    <h3 className="font-heading text-sm font-extrabold text-white leading-snug">
                      The Quantum Singularity
                    </h3>
                    <span className="text-[8px] text-white/70 font-medium">
                      AI Generated
                    </span>
                  </div>
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-white">
                    Draft Approved • 12 Chapters
                  </h4>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Generating layout typography, setting chapter pages...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section id="features" className="flex flex-col gap-12 text-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Engineered for Visual and Literary Excellence
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              Ditch the writer's block. Let artificial intelligence fuel your publishing pipeline.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-white/5 hover:border-brand-purple/20 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center text-xl">
                🪄
              </div>
              <h3 className="text-lg font-bold text-white">Instant Outlining</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Type any idea, genre, or niche and receive a highly-structured, logical chapter-by-chapter outline ready for details.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-white/5 hover:border-brand-cyan/20 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center text-xl">
                🎨
              </div>
              <h3 className="text-lg font-bold text-white">Breathtaking Covers</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Generate jaw-dropping cover designs that fit standard publication formats, completely designed through customized CSS layout systems.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-white/5 hover:border-emerald-500/20 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">Export Anywhere</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Instantly format your creations for immediate download, reading, or distribution on Kindle, Apple Books, or the Web.
              </p>
            </div>
          </div>
        </section>

        {/* Authentication Card Section */}
        <section id="auth-section" className="w-full max-w-lg mx-auto">
          <div className="p-8 md:p-10 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-brand-purple/15 shadow-2xl shadow-black/40 flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex p-1 bg-slate-950/80 border border-white/5 rounded-xl">
              <button 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  isLoginView 
                    ? 'bg-white/5 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsLoginView(true)}
              >
                Sign In
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  !isLoginView 
                    ? 'bg-white/5 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsLoginView(false)}
              >
                Create Account
              </button>
            </div>

            {/* Labels */}
            <div className="text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                {isLoginView ? 'Welcome Back' : 'Get Started for Free'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                {isLoginView 
                  ? 'Sign in to access your library and generate new stories.' 
                  : 'Set up your free account to unleash your imagination.'
                }
              </p>
            </div>

            {/* Display error alert */}
            {(localError || error) && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm font-semibold text-red-400 flex items-center gap-3">
                <span>⚠️</span>
                <span>{localError || error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {!isLoginView && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold text-white tracking-wider">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 text-sm transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLoginView}
                    disabled={formLoading}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-white tracking-wider">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 text-sm transition-all"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={formLoading}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xs font-semibold text-white tracking-wider">
                  Password
                </label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 text-sm transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={formLoading}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-brand-purple to-purple-600 hover:from-purple-500 hover:to-brand-purple text-white shadow-lg shadow-brand-purple/15 rounded-xl font-semibold text-sm cursor-pointer disabled:opacity-50 transition-all duration-300"
                disabled={formLoading}
              >
                {formLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4.5 h-4.5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>{isLoginView ? 'Sign In to Studio' : 'Create Free Account'}</span>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-xs text-gray-500">
          © 2026 AI EBook Creator. Made for next-generation digital creators.
        </p>
      </footer>
    </div>
  );
}
