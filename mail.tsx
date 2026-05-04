import React from 'react';
import { 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  Bot, 
  Activity,
  Mail,
  MessageSquare,
  RefreshCw,
  ChevronRight,
  Send,
  Database,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface AutomationPipelineProps {
  isProcessing: boolean;
  currentStep: number;
  inputChannel: 'Email' | 'Chat';
  onManualTrigger?: () => void;
}

interface WorkflowStepProps {
  key?: string;
  icon: any;
  label: string;
  status: 'pending' | 'active' | 'completed';
  active?: boolean;
  description: string;
}

const WorkflowStep = ({ icon: Icon, label, status, active, description }: WorkflowStepProps) => (
  <div className={cn(
    "flex flex-col items-center gap-5 transition-all duration-700 flex-1",
    status === 'pending' ? "opacity-30 grayscale" : "opacity-100 grayscale-0",
    active ? "scale-105" : "scale-100"
  )}>
    <div className={cn(
      "w-20 h-20 rounded-[1.5rem] flex items-center justify-center border-2 transition-all relative overflow-hidden shadow-sm",
      status === 'active' ? "border-brand-primary bg-brand-primary text-white shadow-xl shadow-indigo-100" : 
      status === 'completed' ? "border-emerald-100 bg-emerald-50 text-emerald-600" : 
      "border-slate-100 bg-slate-50 text-slate-400"
    )}>
      {status === 'active' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      )}
      <Icon className={cn("w-8 h-8 relative z-10", active && "animate-pulse")} />
    </div>
    <div className="text-center space-y-2">
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-widest",
        status === 'active' ? "text-brand-primary" : "text-slate-500"
      )}>{label}</span>
      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest max-w-[140px] mx-auto line-clamp-2 leading-relaxed opacity-80">{description}</p>
    </div>
  </div>
);

export default function AutomationPipeline({ isProcessing, currentStep, inputChannel, onManualTrigger }: AutomationPipelineProps) {
  const steps = [
    { icon: Database, label: "Data Ingestion", description: "Receiving communication from " + inputChannel + " source." },
    { icon: BarChart3, label: "AI Analysis", description: "Analyzing intent, sentiment, and business context." },
    { icon: Bot, label: "Automation", description: "Generating automated response or escalation path." },
    { icon: Send, label: "Response", description: "Transmitting finalized output to destination." }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Automation Pipeline</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Real-time monitoring of AI processing workflows.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-bold border border-emerald-100 shadow-sm uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            System Integrity Active
          </div>
          <button 
            onClick={onManualTrigger}
            disabled={isProcessing}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2.5 shadow-lg active:scale-95 group",
              isProcessing 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                : "bg-brand-primary text-white hover:bg-brand-secondary shadow-indigo-100"
            )}
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            )}
            {isProcessing ? "Processing..." : "Trigger Pipeline"}
          </button>
        </div>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
          <Zap className="w-64 h-64 text-brand-primary" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative px-8 gap-8 md:gap-0">
          <div className="absolute top-1/2 left-24 right-24 h-0.5 bg-slate-100 -z-0 hidden md:block -translate-y-1/2 rounded-full" />
          {steps.map((step, i) => (
            <WorkflowStep 
              key={step.label}
              icon={step.icon} 
              label={step.label} 
              description={step.description}
              status={currentStep >= i ? (currentStep === i ? 'active' : 'completed') : 'pending'} 
              active={currentStep === i} 
            />
          ))}
        </div>

        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 min-h-[200px] flex flex-col justify-center relative overflow-hidden shadow-inner transition-all duration-700">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Activity className="w-32 h-32 text-slate-300" />
          </div>
          <AnimatePresence mode="wait">
            {currentStep === -1 ? (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse" />
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Pipeline Idle</p>
                </div>
                <p className="text-slate-400 text-lg font-bold tracking-tight max-w-lg mx-auto leading-relaxed uppercase tracking-widest opacity-60">Awaiting communication streams for processing...</p>
              </motion.div>
            ) : (
              <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5 px-4 py-1.5 bg-brand-primary text-white rounded-lg shadow-lg shadow-indigo-100 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                    <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                    Step 0{currentStep + 1}: {steps[currentStep]?.label}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Operation</p>
                    <p className="text-xl text-slate-800 leading-relaxed font-bold tracking-tight">
                      {currentStep === 0 && "Ingesting data from communication source and verifying security protocols..."}
                      {currentStep === 1 && "AI engine is analyzing intent, sentiment, and extracting key business entities..."}
                      {currentStep === 2 && "Synthesizing automated response based on enterprise knowledge base..."}
                      {currentStep === 3 && "Finalizing output transmission and updating system audit logs."}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm font-mono relative overflow-hidden group/logs">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System Logs</p>
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        <BarChart3 className="w-3 h-3 text-brand-primary" />
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Live Audit</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-[10px] text-slate-600 relative z-10 font-bold uppercase tracking-widest opacity-80">
                      <p className="flex items-center gap-2.5"><span className="text-slate-300">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> <span className="text-emerald-600">POST</span> /api/ingest <span className="text-slate-400">201 OK</span></p>
                      <p className="flex items-center gap-2.5"><span className="text-slate-300">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> <span className="text-brand-primary">INFO</span> Payload: 1.2kb <span className="text-slate-200">|</span> AES-256</p>
                      <p className="flex items-center gap-2.5"><span className="text-slate-300">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> <span className="text-slate-500">MODEL</span> GPT-4o <span className="text-slate-200">|</span> 128k Context</p>
                      <p className="flex items-center gap-2.5 animate-pulse"><span className="text-slate-300">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> <span className="text-brand-primary">SYNC</span> Updating state...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Latency", value: "42ms", trend: "↑ 12% faster", color: "text-emerald-600", icon: Database, bg: "bg-emerald-50" },
          { label: "AI Accuracy", value: "98.2%", trend: "Calibrated", color: "text-brand-primary", icon: Bot, bg: "bg-indigo-50" },
          { label: "Security", value: "Active", trend: "AES-256", color: "text-brand-primary", icon: ShieldCheck, bg: "bg-indigo-50" }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <div className={cn("p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 shadow-sm", stat.bg)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight relative z-10">{stat.value}</p>
            <p className={cn("text-[9px] font-bold mt-2 uppercase tracking-widest relative z-10", stat.color)}>{stat.trend}</p>
            <div className="absolute -right-3 -bottom-3 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
              <stat.icon className="w-24 h-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
