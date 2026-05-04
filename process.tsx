import React from 'react';
import { Shield, Lock, Eye, FileCheck, AlertCircle, History, User, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface PrivacyAuditProps {
  auditLogs: any[];
}

export default function PrivacyAudit({ auditLogs }: PrivacyAuditProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Compliance</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">Advanced security and integrity protocols for AI automation.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Integrity Monitoring Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Compliance Vector', val: 'Compliant', icon: Shield, color: 'text-brand-primary', bg: 'bg-indigo-50' },
          { label: 'AI Encryption', val: 'AES-256', icon: Lock, color: 'text-brand-primary', bg: 'bg-indigo-50' },
          { label: 'Audit Certified', val: 'SOC 2 Type II', icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'AI Access Control', val: 'Active', icon: Eye, color: 'text-brand-primary', bg: 'bg-indigo-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-default">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm", item.bg)}>
              <item.icon className={cn("w-6 h-6", item.color)} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">{item.label}</p>
            <p className="text-lg font-bold text-slate-900 tracking-tight mt-2">{item.val}</p>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-4">
            <History className="w-5 h-5 text-brand-primary" /> Compliance Audit Trail
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Live Stream</span>
          </div>
        </div>
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto custom-scrollbar">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-8 flex items-start justify-between hover:bg-slate-50 transition-all duration-500 group">
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-brand-primary group-hover:bg-white transition-all duration-500 shadow-inner border border-slate-100 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900 tracking-tight">{log.action}</p>
                  <p className="text-xs text-slate-500 mt-2 font-bold leading-relaxed opacity-60 uppercase tracking-widest">{log.details}</p>
                  <div className="flex items-center gap-8 mt-5">
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.user}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 p-10 rounded-[2.5rem] flex gap-8 items-start shadow-2xl shadow-slate-200 group transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <Shield className="w-64 h-64 text-white" />
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 relative z-10">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Integrity Protocol</h4>
          <p className="text-xs text-white/60 leading-relaxed mt-4 font-bold uppercase tracking-widest opacity-80 max-w-3xl">
            All AI processing is performed on encrypted data streams. Identity shields automatically protect sensitive information before analysis to ensure strict adherence to security compliance standards.
          </p>
        </div>
      </div>
    </div>
  );
}
