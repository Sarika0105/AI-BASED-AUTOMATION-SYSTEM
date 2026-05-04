import React, { useState } from 'react';
import { Building2, Phone, MapPin, Users, ArrowRight, ChevronRight, CheckCircle2, Briefcase, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface EnquiryFlowProps {
  onComplete: (data: any) => void;
}

export default function EnquiryFlow({ onComplete }: EnquiryFlowProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    place: '',
    size: '1-10',
    department: ''
  });

  const departments = [
    { id: 'food', label: 'Food & Beverage', icon: '🍎' },
    { id: 'software', label: 'Software & Tech', icon: '💻' },
    { id: 'hospitals', label: 'Healthcare & Hospitals', icon: '🏥' },
    { id: 'finance', label: 'Finance & Banking', icon: '💰' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'manufacturing', label: 'Manufacturing', icon: '🏭' }
  ];

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleNext = () => {
    setError('');
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid business email.');
      return;
    }
    setStep(2);
  };

  const handleFinish = () => {
    const dept = departments.find(d => d.id === formData.department);
    onComplete(dept?.label || formData.department);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in duration-700">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Info */}
          <div className="w-full md:w-1/3 bg-brand-primary p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-48 h-48 text-white" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-10 uppercase tracking-widest">System Setup</h2>
              <div className="space-y-12">
                <div className={cn("flex gap-5 items-start transition-all duration-500", step >= 1 ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4")}>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xs font-bold border border-white/30 shadow-lg">01</div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest">Identity</p>
                    <p className="text-white/60 text-[10px] font-bold mt-1.5 leading-relaxed uppercase tracking-widest opacity-80">Define your organization.</p>
                  </div>
                </div>
                <div className={cn("flex gap-5 items-start transition-all duration-500", step >= 2 ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4")}>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xs font-bold border border-white/30 shadow-lg">02</div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest">Company Name</p>
                    <p className="text-white/60 text-[10px] font-bold mt-1.5 leading-relaxed uppercase tracking-widest opacity-80">Sector specific tuning.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Enterprise Protocol v4.2</span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 p-12 bg-white">
            {step === 1 ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Company Identity</h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">We'll tailor the AI automation to your specific needs.</p>
                </div>

                {error && (
                  <div className="p-5 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-2xl text-center animate-bounce">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                    <div className="relative group">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input 
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-primary/30 text-slate-900 text-sm font-bold transition-all shadow-inner"
                        placeholder="e.g. Cyberdyne Systems"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Business Email</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-primary/30 text-slate-900 text-sm font-bold transition-all shadow-inner"
                        placeholder="admin@cyberdyne.io"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Phone</label>
                      <div className="relative group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <input 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-primary/30 text-slate-900 text-sm font-bold transition-all shadow-inner"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Geospatial</label>
                      <div className="relative group">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <input 
                          value={formData.place}
                          onChange={e => setFormData({...formData, place: e.target.value})}
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-primary/30 text-slate-900 text-sm font-bold transition-all shadow-inner"
                          placeholder="Neo Tokyo, JP"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Team Size</label>
                    <div className="grid grid-cols-4 gap-4">
                      {['1-10', '11-50', '51-200', '201+'].map(size => (
                        <button
                          key={size}
                          onClick={() => setFormData({...formData, size})}
                          className={cn(
                            "py-3 rounded-2xl text-[10px] font-bold border transition-all uppercase tracking-widest active:scale-95",
                            formData.size === size ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-indigo-100" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-brand-primary/20 hover:text-brand-primary"
                          )}
                        >{size}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!formData.companyName || !formData.phone || !formData.email}
                  className="w-full mt-12 bg-brand-primary hover:bg-brand-secondary disabled:bg-slate-100 disabled:text-slate-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-100 active:scale-95 uppercase text-[11px] tracking-widest"
                >
                  Next Phase
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Sector Setup</h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Configure the AI engine to your specific business context.</p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {departments.map(dept => (
                    <button
                      key={dept.id}
                      onClick={() => setFormData({...formData, department: dept.id})}
                      className={cn(
                        "p-8 rounded-[2.5rem] border-2 text-left transition-all flex flex-col gap-5 group relative overflow-hidden active:scale-95",
                        formData.department === dept.id ? "border-brand-primary bg-indigo-50/50 shadow-lg shadow-indigo-50" : "border-slate-100 bg-slate-50 hover:border-brand-primary/20"
                      )}
                    >
                      <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{dept.icon}</span>
                      <span className={cn("text-[11px] font-bold uppercase tracking-widest", formData.department === dept.id ? "text-brand-primary" : "text-slate-400")}>
                        {dept.label}
                      </span>
                      {formData.department === dept.id && (
                        <div className="absolute top-6 right-6">
                          <CheckCircle2 className="w-6 h-6 text-brand-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-5 mt-12">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl transition-all border border-slate-200 uppercase text-[10px] tracking-widest active:scale-95"
                  >Back</button>
                  <button 
                    onClick={handleFinish}
                    disabled={!formData.department}
                    className="flex-[2] bg-brand-primary hover:bg-brand-secondary disabled:bg-slate-100 disabled:text-slate-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-100 active:scale-95 uppercase text-[11px] tracking-widest"
                  >
                    Complete Setup
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
