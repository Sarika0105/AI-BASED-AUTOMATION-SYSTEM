import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { analyzeMessage } from './lib/gemini';
import LoginPage from './components/LoginPage';
import EnquiryFlow from './components/EnquiryFlow';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ConversationalUI from './components/ConversationalUI';
import AutomationPipeline from './components/AutomationPipeline';
import AIAnalysis from './components/AIAnalysis';
import AnalyticsDetailed from './components/AnalyticsDetailed';
import Reports from './components/Reports';
import ActivityLogs from './components/ActivityLogs';
import Settings from './components/Settings';

export default function App() {
  const [authState, setAuthState] = useState<'login' | 'enquiry' | 'dashboard'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [department, setDepartment] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [scheduled, setScheduled] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    automated: 0,
    escalated: 0,
    pending: 0,
    failed: 0,
    avgResponseTime: 1.2,
    hallucinations: 0,
    sentiment: { positive: 0, neutral: 0, negative: 0 },
    channels: { email: 0, chat: 0 }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [inputMessage, setInputMessage] = useState('');
  const [inputChannel, setInputChannel] = useState<'Email' | 'Chat'>('Chat');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setMessages(data.messages);
      setStats(data.stats);
      setUsers(data.users);
      setScheduled(data.scheduled);
      setAuditLogs(data.auditLogs);
    } catch (e) {
      console.error("Fetch error", e);
    }
  };

  useEffect(() => {
    if (authState === 'dashboard') {
      fetchData();

      // Initialize Socket.io
      const socket = io();

      socket.on('new_message', (msg) => {
        console.log('Real-time: New message received', msg);
        setMessages(prev => [msg, ...prev].slice(0, 50));
      });

      socket.on('stats_update', (newStats) => {
        console.log('Real-time: Stats updated', newStats);
        setStats(newStats);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [authState]);

  const simulateWorkflow = async (e?: React.FormEvent, customMessage?: string, customChannel?: 'Email' | 'Chat') => {
    if (e) e.preventDefault();
    
    const messageToProcess = customMessage || inputMessage;
    const channelToProcess = customChannel || inputChannel;

    if (!messageToProcess.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentStep(0);

    try {
      await new Promise(r => setTimeout(r, 800));
      setCurrentStep(1);
      const analysis = await analyzeMessage(messageToProcess);
      await new Promise(r => setTimeout(r, 1200));
      setCurrentStep(2);
      const status = analysis.shouldEscalate ? 'Sent to Human Agent' : 'Responded';
      await new Promise(r => setTimeout(r, 800));
      setCurrentStep(3);
      await new Promise(r => setTimeout(r, 1000));
      setCurrentStep(4);

      await fetch('/api/simulate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: messageToProcess,
          channel: channelToProcess,
          analysis,
          response: analysis.suggestedResponse,
          status
        })
      });

      await fetchData();
      if (!customMessage) setInputMessage('');
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(-1);
      }, 2000);
    } catch (error) {
      console.error("Workflow error", error);
      setIsProcessing(false);
      setCurrentStep(-1);
    }
  };

  if (authState === 'login') {
    return <LoginPage onLogin={() => setAuthState('enquiry')} />;
  }

  if (authState === 'enquiry') {
    return <EnquiryFlow onComplete={(dept) => {
      setDepartment(dept);
      setAuthState('dashboard');
    }} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-brand-primary selection:text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setAuthState('login')} 
        department={department}
      />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto custom-scrollbar relative">
        {/* Background Ambient Glows - Very Subtle */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto pb-20">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              stats={stats}
              messages={messages}
              isProcessing={isProcessing}
              currentStep={currentStep}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'conversations' && (
            <ConversationalUI 
              messages={messages} 
              fetchData={fetchData}
              isProcessing={isProcessing}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              inputChannel={inputChannel}
              setInputChannel={setInputChannel}
              simulateWorkflow={simulateWorkflow}
            />
          )}
          {activeTab === 'pipeline' && (
            <AutomationPipeline 
              isProcessing={isProcessing}
              currentStep={currentStep}
              inputChannel={inputChannel}
              onManualTrigger={() => simulateWorkflow(undefined, "System Diagnostic: Manual pipeline trigger initiated.", "Chat")}
            />
          )}
          {activeTab === 'analysis' && (
            <AIAnalysis messages={messages} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsDetailed stats={stats} messages={messages} />
          )}
          {activeTab === 'reports' && (
            <Reports stats={stats} messages={messages} />
          )}
          {activeTab === 'logs' && (
            <ActivityLogs messages={messages} />
          )}
          {activeTab === 'settings' && (
            <Settings user={users[0] || { email: 'admin@company.ai' }} />
          )}
        </div>
      </main>
    </div>
  );
}
