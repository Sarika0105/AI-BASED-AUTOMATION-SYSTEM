import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bot, 
  Mail, 
  Zap, 
  ShieldCheck, 
  Bell, 
  User, 
  Lock, 
  Globe, 
  Database,
  ChevronRight,
  Save,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsProps {
  user: any;
}

export default function Settings({ user }: SettingsProps) {
  const [activeCategory, setActiveCategory] = useState('AI Assistant');
  const [model, setModel] = useState('Gemini 3 Flash');
  const [autoReply, setAutoReply] = useState(true);
  const [tone, setTone] = useState('Professional');
  const [encryption, setEncryption] = useState(true);
  const [isSaving, setIsProcessing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://api.business.com/webhook/v1');

  const handleSave = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleRevoke = () => {
    // Custom modal would be better, but for now keeping logic simple
    setRevoked(true);
  };

  const categories = [
    { icon: Bot, label: 'AI Assistant' },
    { icon: Zap, label: 'Automation Pipelines' },
    { icon: Database, label: 'Integrations' },
    { icon: ShieldCheck, label: 'Security & Compliance' },
    { icon: Bell, label: 'Notifications' },
    { icon: User, label: 'User Profile' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage your system configuration and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-bold transition-all shadow-md uppercase tracking-widest border border-white/10",
            saveSuccess ? "bg-emerald-500 text-white shadow-emerald-100" : "bg-brand-primary text-white shadow-indigo-100 hover:bg-brand-primary/90"
          )}
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : saveSuccess ? "Settings Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Navigation */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            {categories.map(item => (
              <button 
                key={item.label}
                onClick={() => setActiveCategory(item.label)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                  activeCategory === item.label ? "bg-brand-primary text-white shadow-lg shadow-indigo-100" : "hover:bg-slate-50 text-slate-500"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", activeCategory === item.label ? "text-white" : "text-brand-primary")} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
                <ChevronRight className={cn("w-4 h-4 opacity-40 transition-transform group-hover:translate-x-1", activeCategory === item.label ? "text-white" : "")} />
              </button>
            ))}
          </div>

          <div className="bg-brand-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-indigo-100 group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Lock className="w-24 h-24 text-white" />
            </div>
            <h3 className="text-sm font-bold mb-2 uppercase tracking-tight relative z-10">System Security</h3>
            <p className="text-[11px] text-white/80 leading-relaxed font-medium relative z-10">
              Your data is protected by enterprise-grade encryption protocols, ensuring absolute privacy and integrity.
            </p>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[600px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
              <SettingsIcon className="w-64 h-64 text-slate-900" />
            </div>
            
            {activeCategory === 'AI Assistant' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Model Configuration</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Select the AI engine for your communications.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {['Gemini 3 Flash', 'Gemini 3.1 Pro'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setModel(m)}
                      className={cn(
                        "p-8 rounded-3xl border-2 text-left transition-all group relative overflow-hidden",
                        model === m ? "border-brand-primary bg-indigo-50/30 shadow-sm" : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                      )}
                    >
                      <p className={cn("text-sm font-bold tracking-tight", model === m ? "text-brand-primary" : "text-slate-900")}>{m}</p>
                      <p className="text-[11px] text-slate-500 mt-3 font-medium leading-relaxed">
                        {m.includes('Flash') ? "High-speed processing for standard communication streams." : "Advanced reasoning for complex business contexts."}
                      </p>
                      {model === m && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeCategory === 'Automation Pipelines' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Pipeline Parameters</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Configure how automation handles incoming messages.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white transition-all shadow-inner">
                    <div>
                      <p className="text-sm font-bold text-slate-900 tracking-tight">Auto-Response</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">Enable autonomous AI responses for identified inquiries.</p>
                    </div>
                    <button onClick={() => setAutoReply(!autoReply)} className="transition-transform active:scale-90">
                      {autoReply ? <ToggleRight className="w-10 h-10 text-brand-primary" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white transition-all shadow-inner">
                    <div>
                      <p className="text-sm font-bold text-slate-900 tracking-tight">Response Tone</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">Adjust the personality and style of AI outputs.</p>
                    </div>
                    <select 
                      value={tone}
                      onChange={e => setTone(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[11px] font-bold text-brand-primary uppercase tracking-widest outline-none focus:border-brand-primary/30 transition-all cursor-pointer shadow-sm"
                    >
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Concise</option>
                      <option>Empathetic</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'Integrations' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Database className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">API & Webhooks</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Connect the system to your existing tools.</p>
                  </div>
                </div>
                
                <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 space-y-6">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <Globe className="w-5 h-5" />
                    <p className="text-sm font-bold tracking-tight">Incoming Webhook</p>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Use this endpoint to stream external data into the AI Communication System.
                  </p>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Endpoint URL</label>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-[11px] font-mono text-slate-600 break-all shadow-inner">
                        {window.location.origin}/api/v1/webhook
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/api/v1/webhook`);
                        }}
                        className="px-4 py-3 bg-brand-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all whitespace-nowrap active:scale-95 shadow-md shadow-indigo-100"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Zap className="w-5 h-5" />
                    <p className="text-sm font-bold tracking-tight">Outgoing Webhooks</p>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Send processed data and AI insights to your third-party applications.
                  </p>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target URL</label>
                    <input 
                      type="text" 
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[11px] font-mono text-slate-600 outline-none focus:border-brand-primary/30 shadow-inner"
                    />
                  </div>
                  <div className="pt-2">
                    <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                      Test Connection
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'Security & Compliance' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Security Parameters</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Manage data protection and compliance settings.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white transition-all shadow-inner">
                  <div>
                    <p className="text-sm font-bold text-slate-900 tracking-tight">Data Encryption</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">Enforce end-to-end encryption for all communication streams.</p>
                  </div>
                  <button onClick={() => setEncryption(!encryption)} className="transition-transform active:scale-90">
                    {encryption ? <ToggleRight className="w-10 h-10 text-brand-primary" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>
              </div>
            )}

            {activeCategory === 'User Profile' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Profile Settings</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Manage your account and identity.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {!revoked ? (
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white transition-all shadow-inner">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 tracking-tight">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Active Session</p>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={handleRevoke}
                        className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline transition-all"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="p-10 bg-slate-50 text-slate-400 rounded-3xl border border-slate-100 text-[11px] font-bold uppercase tracking-widest text-center shadow-inner">
                      Session has been terminated.
                    </div>
                  )}
                </div>
              </div>
            )}

            {!['AI Assistant', 'Automation Pipelines', 'Integrations', 'Security & Compliance', 'User Profile', 'Notifications'].includes(activeCategory) && (
              <div className="flex flex-col items-center justify-center h-[400px] text-slate-400 relative z-10">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-dashed border-slate-200">
                  <RefreshCw className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">Feature expansion pending.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
