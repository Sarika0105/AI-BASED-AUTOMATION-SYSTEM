import React, { useState } from 'react';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (email && password) {
      onLogin();
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans selection:bg-brand-primary selection:text-white">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in zoom-in duration-700">
        <div className="bg-brand-primary p-14 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-48 h-48 text-white" />
          </div>
          <div className="bg-white/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-white/20 shadow-xl relative z-10 group hover:scale-105 transition-transform duration-500">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight relative z-10 uppercase tracking-widest">AI Automation</h1>
          <p className="text-white/70 text-[10px] font-bold mt-3 relative z-10 uppercase tracking-[0.3em] opacity-80">Enterprise Communication System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-12 space-y-8 bg-white">
          {error && (
            <div className="p-5 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-2xl text-center animate-pulse">
              {error}
            </div>
          )}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-primary/30 focus:bg-white text-slate-900 text-sm font-bold transition-all shadow-inner"
                placeholder="admin@enterprise.ai"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-primary/30 focus:bg-white text-slate-900 text-sm font-bold transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-xl shadow-indigo-100 active:scale-95 text-[11px] uppercase tracking-widest"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-6 flex flex-col items-center gap-6">
            <button type="button" className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-colors">
              Forgot your password?
            </button>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Secure Access Active</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
