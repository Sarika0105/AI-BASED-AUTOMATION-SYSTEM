import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  FileText, 
  Settings, 
  Bell, 
  LogOut,
  Zap,
  Clock,
  Shield,
  MessageSquare,
  Bot,
  BarChart3,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  department?: string;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, department }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'pipeline', label: 'Automation Pipeline', icon: Zap },
    { id: 'analysis', label: 'AI Analysis', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'logs', label: 'Activity Logs', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white h-screen flex flex-col sticky top-0 border-r border-slate-200 z-50 overflow-hidden group/sidebar transition-all duration-300">
      {/* Brand Section */}
      <div className="p-10 flex flex-col gap-1 border-b border-slate-100 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-brand-primary p-2.5 rounded-2xl shadow-xl shadow-indigo-100 group-hover/sidebar:rotate-6 transition-transform duration-500">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 font-bold tracking-tight text-sm leading-none uppercase tracking-widest">AI Automation</h1>
            <p className="text-[10px] text-brand-primary font-bold mt-1.5 uppercase tracking-widest opacity-60">System Dashboard</p>
          </div>
        </div>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto custom-scrollbar py-8">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Main Navigation</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group/item relative overflow-hidden active:scale-95",
                isActive 
                  ? "bg-brand-primary text-white shadow-lg shadow-indigo-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover/item:scale-110", isActive ? "text-white" : "text-slate-400 group-hover/item:text-brand-primary")} />
              <span className="uppercase tracking-widest text-[11px]">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-8 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[94%] transition-all duration-1000" />
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[11px] font-bold text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group/logout uppercase tracking-widest active:scale-95"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover/logout:-translate-x-1" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
