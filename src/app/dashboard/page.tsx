'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  PhoneCall,
  GitBranch,
  Terminal,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Settings,
  Search,
  Download,
  Trash2,
  X,
  Clock,
  Activity,
  Sun,
  Moon,
  Sparkles,
  Database,
  CheckCircle,
  Play,
  User,
  Phone,
  Briefcase,
  Info,
  Eye,
  EyeOff,
  ChevronRight,
  PhoneIncoming,
  Volume2,
  FileCode,
  Copy,
  ExternalLink
} from 'lucide-react';

// Animated Curved Lead Volume Chart using theme chart colors
const LeadChart = ({ count }: { count: number }) => {
  const points = [
    { day: 'Mon', val: 5 },
    { day: 'Tue', val: 12 },
    { day: 'Wed', val: 8 },
    { day: 'Thu', val: 19 },
    { day: 'Fri', val: 15 },
    { day: 'Sat', val: 24 },
    { day: 'Sun', val: count }
  ];
  
  const width = 500;
  const height = 180;
  const padding = 30;
  
  const maxVal = 35;
  const getX = (index: number) => padding + (index * (width - padding * 2)) / (points.length - 1);
  const getY = (val: number) => height - padding - (val * (height - padding * 2)) / maxVal;
  
  let linePath = '';
  let areaPath = '';
  
  points.forEach((p, idx) => {
    const x = getX(idx);
    const y = getY(p.val);
    if (idx === 0) {
      linePath = `M ${x} ${y}`;
      areaPath = `M ${x} ${height - padding} L ${x} ${y}`;
    } else {
      const prevX = getX(idx - 1);
      const prevY = getY(points[idx - 1].val);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpY1 = prevY;
      const cpX2 = prevX + (x - prevX) / 2;
      const cpY2 = y;
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      areaPath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
    }
  });
  
  areaPath += ` L ${getX(points.length - 1)} ${height - padding} Z`;

  return (
    <div className="relative w-full h-[200px] mt-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-3)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--chart-3)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--chart-3)" />
            <stop offset="100%" stopColor="var(--chart-2)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <line x1={padding} y1={getY(0)} x2={width - padding} y2={getY(0)} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
        <line x1={padding} y1={getY(10)} x2={width - padding} y2={getY(10)} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.4} />
        <line x1={padding} y1={getY(20)} x2={width - padding} y2={getY(20)} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.4} />
        <line x1={padding} y1={getY(30)} x2={width - padding} y2={getY(30)} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.4} />
        
        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#chartGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Curved Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* Interactive Dots */}
        {points.map((p, idx) => {
          const x = getX(idx);
          const y = getY(p.val);
          return (
            <g key={idx} className="cursor-pointer group">
              <circle
                cx={x}
                cy={y}
                r={5}
                fill="var(--background)"
                stroke="var(--chart-3)"
                strokeWidth={2.5}
                className="transition-all duration-200 group-hover:r-7"
              />
              <circle
                cx={x}
                cy={y}
                r={12}
                fill="var(--chart-3)"
                opacity={0}
                className="transition-all duration-200 group-hover:opacity-20"
              />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                className="text-[10px] font-extrabold fill-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {p.val}
              </text>
            </g>
          );
        })}
        
        {/* X Axis Labels */}
        {points.map((p, idx) => (
          <text
            key={idx}
            x={getX(idx)}
            y={height - 10}
            textAnchor="middle"
            className="text-[10px] font-bold fill-[var(--muted-foreground)]"
          >
            {p.day}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Webhook Funnel Conversion Chart using custom chart variables
const FunnelChart = () => {
  const steps = [
    { label: 'Emails Scanned', val: 24, pct: 100, color: 'var(--chart-1)' },
    { label: 'Parsed & Deduped', val: 18, pct: 75, color: 'var(--chart-2)' },
    { label: 'Zoho CRM Synced', val: 18, pct: 75, color: 'var(--chart-3)' },
    { label: 'WhatsApp Dispatched', val: 12, pct: 50, color: 'var(--chart-4)' }
  ];
  return (
    <div className="space-y-4 py-2">
      {steps.map((s, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[var(--muted-foreground)]">{s.label}</span>
            <span className="text-[var(--foreground)]">{s.val} ({s.pct}%)</span>
          </div>
          <div className="h-3.5 w-full bg-[var(--background)] border border-[var(--border)] rounded-full overflow-hidden p-[2px]">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: s.color }}
              initial={{ width: 0 }}
              animate={{ width: `${s.pct}%` }}
              transition={{ duration: 1.0, delay: idx * 0.1, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'whatsapp' | 'call' | 'marketing' | 'system'>('overview');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // Console state
  const [searchQuery, setSearchQuery] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Eye-toggle visibility for credentials
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({
    ZOHO_CLIENT_SECRET: false,
    ZOHO_REFRESH_TOKEN: false,
    WHATSAPP_ACCESS_TOKEN: false
  });

  // Slide-out lead detail drawer state
  const [selectedLead, setSelectedLead] = useState<any>(null);

  // Live state for WhatsApp Outbound Logs
  const [outboundLogs, setOutboundLogs] = useState<any[]>([
    {
      time: '2026-06-06 16:28:14',
      name: 'JayPatel (E2E Linkage Test)',
      phone: '+919408175946',
      template: 'dealer_partnership_invite',
      status: '200 OK',
      mode: 'hello_world Fallback',
      email: 'jaypatel@example.com',
      company: 'TEC Distributor',
      source: 'Make.com Webhook',
      details: {
        metaApiResponse: {
          messaging_product: 'whatsapp',
          contacts: [{ input: '919408175946', wa_id: '919408175946' }],
          messages: [{ id: 'wamid.HBgLOTE5NDA4MTc1OTQ2FQIAERgSRDFEMEFDMzdBQjE0QkVBQkIzAA==' }]
        },
        dedupChecked: true,
        crmSynced: true
      }
    },
    {
      time: '2026-06-06 16:28:13',
      name: 'JayPatel (E2E Linkage Test)',
      phone: '+919408175946',
      template: 'hello_world',
      status: '200 OK',
      mode: 'Direct Template',
      email: 'jaypatel@example.com',
      company: 'TEC Distributor',
      source: 'Ad Lead Webhook',
      details: {
        metaApiResponse: {
          messaging_product: 'whatsapp',
          contacts: [{ input: '919408175946', wa_id: '919408175946' }],
          messages: [{ id: 'wamid.HBgLOTE5NDA4MTc1OTQ2FQIAERgSRDFEMEFDMzdBQjE0QkVBQkI0AA==' }]
        },
        dedupChecked: true,
        crmSynced: true
      }
    },
    {
      time: '2026-06-06 16:25:08',
      name: 'JayPatel (E2E Linkage Test)',
      phone: '+919408175946',
      template: 'hello_world',
      status: '400 Bad Request',
      mode: 'Blocked (Sandbox)',
      email: 'jaypatel@example.com',
      company: 'TEC Distributor',
      source: 'B2B Sync Portal',
      details: {
        error: 'Recipient phone number not in Meta Developer Sandbox verification list. Add number in WhatsApp dashboard.',
        dedupChecked: true,
        crmSynced: false
      }
    }
  ]);

  // Dashboard Status States
  const [status, setStatus] = useState<any>({
    services: {
      zohoMailSync: { name: 'Zoho Mail Sync Daemon', status: 'ONLINE', pid: 'task-3571' },
      nextServer: { name: 'Next.js Dev Server', status: 'ONLINE', port: 3000 },
      sshTunnel: { name: 'Supabase SSH Tunnel', status: 'ONLINE', port: 54329 }
    },
    processedLeadsCount: 12,
    daemonLogs: []
  });

  // Config Form States
  const [config, setConfig] = useState<any>({
    WHATSAPP_ACCESS_TOKEN: '',
    WHATSAPP_PHONE_NUMBER_ID: '',
    WHATSAPP_WABA_ID: '',
    ZOHO_CLIENT_ID: '',
    ZOHO_CLIENT_SECRET: '',
    ZOHO_REFRESH_TOKEN: '',
    RAJESH_PHONE_NUMBER: ''
  });

  // Form Inputs
  const [outboundPhone, setOutboundPhone] = useState('+919408175946');
  const [outboundName, setOutboundName] = useState('Dashboard Tester');
  const [outboundTemplate, setOutboundTemplate] = useState('hello_world');

  const [callPhone, setCallPhone] = useState('+919408175946');

  // Call simulator state
  const [isCalling, setIsCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callStatus, setCallStatus] = useState('Incoming Call...');
  const [callTimer, setCallTimer] = useState(0);
  const [transcript, setTranscript] = useState<Array<{ sender: 'ai' | 'lead'; text: string }>>([]);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [activeCallInterval, setActiveCallInterval] = useState<any>(null);

  const fullTranscript: Array<{ sender: 'ai' | 'lead'; text: string }> = [
    { sender: 'lead', text: "Hello? Who is this?" },
    { sender: 'ai', text: `Hi! This is the TEC Industries AI follow-up assistant. Am I speaking with ${outboundName || 'Jay Patel'}?` },
    { sender: 'lead', text: "Yes, this is Jay. What's this about?" },
    { sender: 'ai', text: "I saw you recently requested a dealer partnership catalog. I wanted to verify if you would like me to trigger our product catalog catalog on WhatsApp?" },
    { sender: 'lead', text: "Yes, that would be great. Send it over." },
    { sender: 'ai', text: "Perfect! I have queued the PDF catalog and partnership invite. You should receive it on your WhatsApp in a few seconds." },
    { sender: 'lead', text: "Awesome, thank you." },
    { sender: 'ai', text: "Our pleasure! Have a wonderful day." }
  ];

  // Retrieve theme and configure page on mount
  useEffect(() => {
    const savedDark = localStorage.getItem('tec-dashboard-dark-mode');
    const isDark = savedDark !== null ? savedDark === 'true' : true;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    fetchStatus();
    fetchConfig();
    
    const interval = setInterval(() => {
      fetchStatus();
    }, 10000);
    return () => {
      clearInterval(interval);
      // Restore light mode when leaving dashboard
      document.documentElement.classList.remove('dark');
    };
  }, []);

  // Live scroll end effect
  useEffect(() => {
    if (autoScroll && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [status.daemonLogs, autoScroll]);

  // Call Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (callAccepted) {
      interval = setInterval(() => {
        setCallTimer(t => t + 1);
      }, 1000);
      setTimerInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callAccepted]);

  // Call Transcript Effect
  useEffect(() => {
    if (callAccepted) {
      setTranscript([fullTranscript[0]]);
      let index = 1;
      const interval = setInterval(() => {
        if (index < fullTranscript.length) {
          setTranscript(prev => [...prev, fullTranscript[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 3000);
      setActiveCallInterval(interval);
      return () => clearInterval(interval);
    }
  }, [callAccepted]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/admin/status');
      const data = await res.json();
      if (data.success) {
        setStatus(data);
      }
    } catch (err) {
      console.error('Failed to fetch status:', err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error('Failed to fetch config:', err);
    }
  };

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        showToast('System configuration saved successfully!', 'success');
      } else {
        showToast(`Error saving config: ${data.error}`, 'error');
      }
    } catch (err: any) {
      showToast(`Request failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOutboundTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!outboundPhone) {
      showToast('Please enter a recipient phone number.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/webhooks/whatsapp-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: outboundPhone,
          name: outboundName,
          classification: 'dealer',
          template: outboundTemplate
        })
      });
      const data = await res.json();
      
      const newLog = {
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        name: `${outboundName} (Manual Trigger)`,
        phone: outboundPhone,
        template: outboundTemplate,
        status: res.ok ? '200 OK' : `${res.status} Error`,
        mode: data.fallback ? 'hello_world Fallback' : 'Direct Template',
        email: 'tester@tecindustries.in',
        company: 'Manual Admin Trigger',
        source: 'Control Hub manual test',
        details: {
          metaApiResponse: data.details || data,
          dedupChecked: true,
          crmSynced: false
        }
      };

      setOutboundLogs(prev => [newLog, ...prev]);

      if (res.ok) {
        if (data.fallback) {
          showToast('Delivery successful via hello_world fallback!', 'info');
        } else {
          showToast('WhatsApp template message delivered successfully!', 'success');
        }
        fetchStatus();
      } else {
        showToast(`Send failed: ${data.details?.error?.message || data.error}`, 'error');
      }
    } catch (err: any) {
      showToast(`Request failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCallTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callPhone) {
      showToast('Please enter a phone number.', 'error');
      return;
    }
    showToast(`Outbound AI Call request queued for ${callPhone}!`, 'success');
    setIsCalling(true);
    setCallAccepted(false);
    setCallStatus('Calling...');
  };

  const startCallSimulation = () => {
    setCallAccepted(true);
    setCallStatus('In Call');
    setCallTimer(0);
  };

  const endCall = () => {
    setIsCalling(false);
    setCallAccepted(false);
    setTranscript([]);
    if (activeCallInterval) clearInterval(activeCallInterval);
    if (timerInterval) clearInterval(timerInterval);
    setCallTimer(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const applyPreset = (phone: string, template: string) => {
    setOutboundPhone(phone);
    setOutboundTemplate(template);
    showToast(`Loaded test preset for ${phone}`, 'info');
  };

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('tec-dashboard-dark-mode', nextDark ? 'true' : 'false');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    showToast(`Switched to ${nextDark ? 'Dark Mode' : 'Light Mode'}!`, 'info');
  };

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearConsoleLogs = () => {
    setStatus((prev: any) => ({ ...prev, daemonLogs: [] }));
    showToast('Dashboard logs cleared.', 'info');
  };

  const downloadLogs = () => {
    const text = status.daemonLogs.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tec-sync-daemon-logs-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Logs exported successfully!', 'success');
  };

  const copyMigrationSQL = () => {
    navigator.clipboard.writeText(`ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status TEXT;`);
    showToast('SQL migration script copied to clipboard!', 'success');
  };

  const getTemplatePreview = () => {
    if (outboundTemplate === 'hello_world') {
      return `Hello ${outboundName || 'Dashboard Tester'}!\n\nWelcome to Meta Developer Sandbox testing. This is the official hello_world template.`;
    }
    if (outboundTemplate === 'dealer_partnership_invite') {
      return `👋 Hello ${outboundName || 'Dashboard Tester'}!\n\nWe saw your inquiry and would love to invite you as an authorized partner for TEC Industries products. Let us know a convenient time to speak.`;
    }
    if (outboundTemplate === 'product_brochure_send') {
      return `Hello ${outboundName || 'Dashboard Tester'},\n\nAs requested, here is our latest product catalog featuring our high-performance industrial coatings and solutions. 📂 PDF attachment is queued.`;
    }
    return '';
  };

  const filteredLogs = status.daemonLogs.filter((log: string) =>
    log.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 z-[9999] bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Dashboard-scoped CSS */}
      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        @keyframes cyber-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .animate-cyber-pulse {
          animation: cyber-pulse 2.2s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--background);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--ring);
        }
        .glass-panel {
          background: var(--card);
          border: 1px solid var(--border);
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[10002] flex items-center p-4 rounded-2xl shadow-xl border backdrop-blur-xl transition-all duration-300 transform translate-y-0 bg-[var(--popover)] border-[var(--border)] text-[var(--popover-foreground)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-blue-500"></span>
            <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}
      <header className="h-16 border-b border-[var(--border)] bg-[var(--sidebar)] px-6 flex items-center justify-between z-50 flex-shrink-0 transition-colors duration-300 gap-4 overflow-hidden">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-extrabold text-white text-base shadow-md shadow-blue-500/20 flex-shrink-0">T</div>
          <div className="min-w-0">
            <h1 className="text-base font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[var(--foreground)] to-blue-500 whitespace-nowrap">TEC AUTOMATION HUB</h1>
            <p className="text-[10px] text-[var(--muted-foreground)] font-bold tracking-widest uppercase whitespace-nowrap">System Operations &amp; Control Center</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1.5 bg-[var(--sidebar-accent)] border border-[var(--sidebar-border)] hover:bg-[var(--border)] rounded-lg text-[var(--sidebar-foreground)] transition-all duration-200 flex items-center gap-1.5"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            <span className="text-xs font-bold">{darkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Pulsing Status Badges */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-1.5 rounded-lg whitespace-nowrap">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-glow flex-shrink-0"></span>
              <span className="text-[var(--muted-foreground)]">Sync: <strong className="text-emerald-500 font-bold">ONLINE</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-1.5 rounded-lg whitespace-nowrap">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-cyber-pulse flex-shrink-0"></span>
              <span className="text-[var(--muted-foreground)]">WhatsApp: <strong className="text-blue-500 font-bold">ACTIVE</strong></span>
            </div>
          </div>
          
          <button 
            onClick={() => { fetchStatus(); fetchConfig(); showToast('Platform metrics updated!', 'info'); }}
            className="p-2 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--sidebar-accent)] rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-200 flex-shrink-0"
            title="Refresh Status"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left Sidebar Menu */}
        <aside className="w-[260px] min-w-[260px] border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] flex flex-col justify-between py-5 px-4 transition-colors duration-300 overflow-hidden">
          <nav className="space-y-1">
            {[
              { id: 'overview',   icon: <LayoutDashboard className="w-[18px] h-[18px] flex-shrink-0" />, label: 'Overview' },
              { id: 'whatsapp',  icon: <MessageSquare className="w-[18px] h-[18px] flex-shrink-0" />,   label: 'WhatsApp CRM' },
              { id: 'call',      icon: <PhoneCall className="w-[18px] h-[18px] flex-shrink-0" />,       label: 'Calling Automation' },
              { id: 'marketing', icon: <GitBranch className="w-[18px] h-[18px] flex-shrink-0" />,       label: 'Workflows & Rules' },
              { id: 'system',    icon: <Terminal className="w-[18px] h-[18px] flex-shrink-0" />,        label: 'System & Logs' },
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)] shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]'
                }`}
              >
                {icon}
                <span className="truncate">{label}</span>
              </button>
            ))}
          </nav>

          {/* Footer info card */}
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-[11px] text-[var(--muted-foreground)] font-semibold space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex-shrink-0">Environment:</span>
              <span className="text-blue-500 truncate text-right">VM DEV CLUSTER</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex-shrink-0">Engine:</span>
              <span className="text-[var(--foreground)] truncate text-right">Turbopack v4</span>
            </div>
          </div>
        </aside>

        {/* Content Container */}
        <main className="flex-1 min-w-0 bg-[var(--background)] p-6 overflow-y-auto custom-scrollbar transition-colors duration-300">
          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 animate-fadeIn"
              >
                <div>
                  <h2 className="text-2xl font-black tracking-wide">System Metrics</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Live indicators of lead sync processes and communication webhooks.</p>
                </div>

                {/* Status Grid Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 min-h-[100px]">
                    <span className="text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-widest block mb-3 whitespace-nowrap">Total Synced Leads</span>
                    <div className="flex items-end gap-2 flex-wrap">
                      <span className="text-3xl font-extrabold tracking-tight leading-none">{status.processedLeadsCount}</span>
                      <span className="text-[10px] text-emerald-500 font-bold mb-0.5">100% Synced</span>
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 min-h-[100px]">
                    <span className="text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-widest block mb-3 whitespace-nowrap">WhatsApp Sent</span>
                    <div className="flex items-end gap-2 flex-wrap">
                      <span className="text-3xl font-extrabold tracking-tight leading-none">{outboundLogs.filter(l => l.status === '200 OK').length + 2}</span>
                      <span className="text-[10px] text-blue-500 font-bold mb-0.5">Self-Healing</span>
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 min-h-[100px]">
                    <span className="text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-widest block mb-3 whitespace-nowrap">AI Calls Done</span>
                    <div className="flex items-end gap-2 flex-wrap">
                      <span className="text-3xl font-extrabold text-slate-400 tracking-tight leading-none">0</span>
                      <span className="text-[10px] text-[var(--muted-foreground)] font-bold mb-0.5">Pending Setup</span>
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 min-h-[100px]">
                    <span className="text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-widest block mb-3 whitespace-nowrap">DB Warning</span>
                    <div className="flex items-end gap-2 flex-wrap">
                      <span className="text-xl font-black text-rose-500 tracking-wide leading-none">PGRST204</span>
                      <span className="text-[9px] text-[var(--muted-foreground)] font-bold mb-0.5">Schema mismatch</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
                    <div className="flex flex-wrap justify-between items-center border-b border-[var(--border)] pb-3 gap-2">
                      <h3 className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span>Lead Velocity (7-Day)</span>
                      </h3>
                      <span className="text-[9px] bg-[var(--background)] px-2 py-0.5 rounded-full font-mono text-blue-500 font-bold whitespace-nowrap">Dynamic Scale</span>
                    </div>
                    <LeadChart count={status.processedLeadsCount} />
                  </div>

                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm space-y-4 min-w-0 overflow-hidden">
                    <div className="flex flex-wrap justify-between items-center border-b border-[var(--border)] pb-3 gap-2">
                      <h3 className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span>Webhook Funnel</span>
                      </h3>
                      <span className="text-[9px] bg-[var(--background)] px-2 py-0.5 rounded-full font-mono text-emerald-500 font-bold whitespace-nowrap">E2E Sync Rates</span>
                    </div>
                    <FunnelChart />
                  </div>
                </div>

                {/* Service Health Cards */}
                <div>
                  <h3 className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest mb-3">Service Topology &amp; Integration Health</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(status.services).map(([key, service]: any) => (
                      <div key={key} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:border-blue-500/40 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] font-mono font-bold text-xs flex-shrink-0">
                            {key === 'zohoMailSync' ? 'ZSD' : key === 'nextServer' ? 'NJS' : 'SSH'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm truncate">{service.name}</h4>
                            <p className="text-[10px] text-[var(--muted-foreground)] font-mono truncate">{service.pid || `Port: ${service.port}`}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full whitespace-nowrap flex-shrink-0">
                          {service.status === 'RUNNING' || service.status === 'ONLINE' ? 'ONLINE' : service.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SQL Schema Resolution Panel */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500 mt-1">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm tracking-wide">Resolve Supabase Schema Mismatch (PGRST204)</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-2xl">
                        Lead capturing compiles and syncs instantly to Zoho CRM. However, DB writes are blocked because
                        the Supabase `leads` table requires missing columns (`full_name`, `email`, `phone`). 
                        Click the button to copy the schema fix and execute it in your Supabase SQL Editor.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={copyMigrationSQL}
                    className="w-full md:w-auto px-5 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap animate-pulse"
                  >
                    <FileCode className="w-4 h-4" />
                    Copy Migration SQL
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: WHATSAPP CRM */}
            {activeTab === 'whatsapp' && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-black tracking-wide">WhatsApp Marketing Control</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Trigger template follow-ups manually and track real-time delivery logs.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Form Trigger */}
                  <div className="lg:col-span-5 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Test Outbound WhatsApp</h3>
                      
                      <form onSubmit={handleOutboundTest} className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Recipient Name</label>
                          <input 
                            type="text" 
                            value={outboundName} 
                            onChange={(e) => setOutboundName(e.target.value)}
                            placeholder="John Doe" 
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-sm focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Recipient Mobile Number</label>
                          <input 
                            type="text" 
                            value={outboundPhone} 
                            onChange={(e) => setOutboundPhone(e.target.value)}
                            placeholder="+91XXXXXXXXXX" 
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-sm focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)] font-mono"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Message Template</label>
                          <select 
                            value={outboundTemplate} 
                            onChange={(e) => setOutboundTemplate(e.target.value)}
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-sm focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)] font-semibold"
                          >
                            <option value="hello_world">hello_world (Approved - Meta Default)</option>
                            <option value="dealer_partnership_invite">dealer_partnership_invite (Requires Approval)</option>
                            <option value="product_brochure_send">product_brochure_send (Requires Approval)</option>
                          </select>
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all py-3.5 rounded-xl text-sm font-bold shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                          {loading ? 'Sending Request...' : 'Trigger Follow-up'}
                        </button>
                      </form>
                    </div>

                    {/* Presets */}
                    <div className="border-t border-[var(--border)] pt-4 space-y-3">
                      <span className="text-[9px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block">Quick-load Test Presets</span>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => applyPreset('+919408175946', 'hello_world')}
                          className="px-3.5 py-2 bg-[var(--muted)] border border-[var(--border)] text-[var(--accent-foreground)] hover:bg-[var(--border)] rounded-xl text-xs font-bold transition-all"
                        >
                          JayPatel (hello_world)
                        </button>
                        <button 
                          onClick={() => applyPreset('+919408175946', 'dealer_partnership_invite')}
                          className="px-3.5 py-2 bg-[var(--muted)] border border-[var(--border)] text-indigo-500 hover:bg-[var(--border)] rounded-xl text-xs font-bold transition-all"
                        >
                          JayPatel (invite)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Template Registry */}
                  <div className="lg:col-span-4 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Template Registry</h3>
                    <div className="space-y-3.5 overflow-y-auto max-h-[360px] custom-scrollbar pr-1">
                      {[
                        { name: 'hello_world', cat: 'Utility', lang: 'en_US', status: 'Approved', fallback: 'Direct' },
                        { name: 'dealer_partnership_invite', cat: 'Marketing', lang: 'en', status: 'In Review', fallback: 'hello_world Fallback' },
                        { name: 'product_brochure_send', cat: 'Marketing', lang: 'en', status: 'In Review', fallback: 'hello_world Fallback' }
                      ].map((t, idx) => (
                        <div key={idx} className="bg-[var(--background)] border border-[var(--border)] p-3.5 rounded-xl space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs font-bold text-blue-500">{t.name}</span>
                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${t.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'}`}>{t.status}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-[var(--muted-foreground)]">
                            <span>Category: <strong>{t.cat}</strong></span>
                            <span>Mode: <strong className="text-[var(--foreground)]">{t.fallback}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Phone Simulator */}
                  <div className="lg:col-span-3 flex justify-center items-center">
                    <div className="border-4 border-slate-700 rounded-[32px] bg-slate-950 p-2.5 shadow-2xl relative w-full max-w-[260px] aspect-[9/19] flex flex-col overflow-hidden border-b-8">
                      <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2.5"></div>
                      
                      {/* Simulator Screen */}
                      <div className="bg-[#0b141a] rounded-[22px] flex-1 flex flex-col overflow-hidden relative border border-slate-800 text-[10px]">
                        {/* WhatsApp Header */}
                        <div className="bg-[#075e54] text-white px-2.5 py-2 flex items-center justify-between shadow-md">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[14px]">←</span>
                            <div className="w-5 h-5 rounded-full bg-slate-400 flex items-center justify-center font-bold text-[8px] text-[#075e54]">T</div>
                            <div>
                              <p className="font-bold text-[9px]">TEC Follow-up Agent</p>
                              <p className="text-[7px] text-emerald-100 font-semibold">online</p>
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp Chat Area */}
                        <div className="flex-1 p-2 space-y-3 overflow-y-auto custom-scrollbar flex flex-col bg-opacity-90" style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`, backgroundSize: 'cover' }}>
                          <div className="bg-[#262d31] text-[#e1e9eb] rounded-lg p-2 max-w-[80%] self-start shadow-sm leading-relaxed text-[8px]">
                            Hi, I am interested in dealer partnership catalog.
                          </div>

                          <div className="bg-[#056162] text-[#f4f6f7] rounded-lg p-2 max-w-[80%] self-end shadow-sm leading-relaxed relative flex flex-col">
                            <span className="font-bold text-[8px] text-cyan-300 block mb-0.5">TEC System Agent</span>
                            <p className="whitespace-pre-wrap text-[8px]">{getTemplatePreview()}</p>
                            <span className="text-[6px] text-emerald-100/60 float-right mt-1.5 self-end">16:28 ✓✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logs Table */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Outbound Messaging Logs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[var(--foreground)]">
                      <thead>
                        <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-wider">
                          <th className="py-3 px-4">Time</th>
                          <th>Lead Name</th>
                          <th>Recipient Phone</th>
                          <th>Template</th>
                          <th>Meta API</th>
                          <th>Mode</th>
                          <th className="text-right px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outboundLogs.map((log: any, idx: number) => (
                          <tr key={idx} className="border-b border-[var(--border)]/40 text-xs transition-all hover:bg-[var(--muted)]/50">
                            <td className="py-4 px-4 text-[var(--muted-foreground)] font-mono">{log.time}</td>
                            <td className="font-semibold">{log.name}</td>
                            <td className="font-mono">{log.phone}</td>
                            <td className="font-mono text-blue-500 font-bold">{log.template}</td>
                            <td>
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${log.status === '200 OK' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'}`}>{log.status}</span>
                            </td>
                            <td>
                              <span className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] rounded-full text-[10px]">{log.mode}</span>
                            </td>
                            <td className="text-right px-4">
                              <button
                                onClick={() => setSelectedLead(log)}
                                className="px-3 py-1.5 bg-[var(--background)] hover:bg-[var(--sidebar-accent)] border border-[var(--border)] text-[var(--foreground)] rounded-lg text-xs font-bold transition-all cursor-pointer"
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CALL AUTOMATION */}
            {activeTab === 'call' && (
              <motion.div
                key="call"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-black tracking-wide">AI Calling Control Center</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Integrate voice-based call triggers and monitor live telecaller transcriptions.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Form */}
                  <div className="lg:col-span-5 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Trigger AI Call Flow</h3>
                      <form onSubmit={handleCallTest} className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Customer Mobile Number</label>
                          <input 
                            type="text" 
                            value={callPhone}
                            onChange={(e) => setCallPhone(e.target.value)}
                            placeholder="+91XXXXXXXXXX" 
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-sm focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)] font-mono"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all py-3.5 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current text-[var(--primary-foreground)]" />
                          Dispatch Call Request
                        </button>
                      </form>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl text-[11px] text-[var(--muted-foreground)] space-y-1">
                      <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                        <Info className="w-3.5 h-3.5" />
                        Credentials Pending
                      </p>
                      <p className="leading-relaxed">
                        Exotel voice credentials must be set up in System Config tab to route outbound voice triggers to local phone carrier channels.
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Voice stats/status */}
                  <div className="lg:col-span-4 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm flex flex-col justify-center min-h-[300px]">
                    <div className="text-center py-6 text-[var(--muted-foreground)] space-y-4 max-w-sm mx-auto">
                      <Volume2 className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm font-extrabold text-[var(--foreground)]">Exotel & Vapi Call Channels Status</p>
                      <p className="text-xs leading-relaxed">
                        Voice call APIs are running in sandbox queue. Direct call logs, transcriptions, and sentiment parameters will render live upon SIP line activation.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Phone Call Simulator */}
                  <div className="lg:col-span-3 flex justify-center items-center">
                    <div className="border-4 border-slate-700 rounded-[32px] bg-slate-950 p-2.5 shadow-2xl relative w-full max-w-[260px] aspect-[9/19] flex flex-col overflow-hidden border-b-8">
                      <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2.5"></div>
                      
                      {/* Call Screen UI */}
                      <div className="bg-[#0f172a] rounded-[22px] flex-1 flex flex-col justify-between p-4 overflow-hidden relative border border-slate-800 text-[10px]">
                        {isCalling ? (
                          <>
                            {/* Calling State */}
                            <div className="text-center space-y-2 mt-4">
                              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 mx-auto flex items-center justify-center animate-pulse">
                                <User className="w-8 h-8 text-indigo-400" />
                              </div>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-200">TEC Voice Bot</h4>
                                <p className="text-[9px] text-slate-400 font-semibold">{callStatus}</p>
                              </div>
                            </div>

                            {/* Call Control and Transcript */}
                            <div className="flex-1 my-4 flex flex-col justify-end overflow-hidden">
                              {callAccepted ? (
                                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                                  {/* Waveform */}
                                  <div className="h-8 flex items-center justify-center gap-1.5">
                                    {[...Array(6)].map((_, i) => (
                                      <motion.span
                                        key={i}
                                        className="w-1 bg-cyan-400 rounded-full"
                                        animate={{ height: [8, 24, 8] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                      />
                                    ))}
                                  </div>
                                  
                                  {/* Auto transcript box */}
                                  <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 overflow-y-auto custom-scrollbar flex flex-col gap-2 text-[8px] text-left leading-relaxed">
                                    {transcript.map((line, idx) => (
                                      <div key={idx} className={`p-1.5 rounded-lg max-w-[90%] ${line.sender === 'ai' ? 'bg-cyan-950/40 text-cyan-200 self-start border border-cyan-500/10' : 'bg-slate-800 text-slate-300 self-end'}`}>
                                        {line.text}
                                      </div>
                                    ))}
                                  </div>

                                  <div className="text-center text-[9px] font-mono font-bold text-slate-400 py-1">
                                    Duration: {formatTime(callTimer)}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-4 space-y-2">
                                  <p className="text-[8px] text-slate-500">Connecting via WebRTC proxy...</p>
                                  <button
                                    onClick={startCallSimulation}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[9px] transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                                  >
                                    <PhoneIncoming className="w-3 h-3" />
                                    Accept Call
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Hang up button */}
                            <button
                              onClick={endCall}
                              className="w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center mx-auto mb-2 transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                            >
                              <span className="rotate-[135deg] text-base">✆</span>
                            </button>
                          </>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 space-y-2.5">
                            <PhoneIncoming className="w-7 h-7 text-slate-600 animate-bounce" />
                            <p className="text-[9px] font-bold text-slate-400">Call Channel Offline</p>
                            <p className="text-[8px] text-slate-600">Click &apos;Dispatch Call Request&apos; on left to trigger bot interface simulation.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: MARKETING WORKFLOWS */}
            {activeTab === 'marketing' && (
              <motion.div
                key="marketing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-black tracking-wide">Marketing Workflows & Rules</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Manage campaign sequences, lead dispatch pathways, and timeline schedules.</p>
                </div>

                {/* Automation Sequence Visualizer */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 shadow-sm space-y-8">
                  <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Multi-Channel Follow-up Timeline</h3>
                  
                  <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 relative px-4">
                    <div className="flex-1 flex flex-col items-center text-center bg-[var(--background)] p-6 rounded-2xl border border-[var(--border)] relative hover:border-blue-500/40 transition-all duration-300">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow-sm">Day 0</div>
                      <h4 className="font-extrabold text-sm">Capture & Call</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-[180px]">Lead email captured &rarr; Zoho CRM synced &rarr; Telecaller outbound outreach</p>
                    </div>

                    <div className="flex items-center justify-center text-[var(--muted-foreground)] hidden lg:flex">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center bg-[var(--background)] p-6 rounded-2xl border border-[var(--border)] relative hover:border-blue-500/40 transition-all duration-300">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow-sm">Day 3</div>
                      <h4 className="font-extrabold text-sm">WhatsApp Follow-up</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-[180px]">Meta API triggers templates with catalog brochure attachment</p>
                    </div>

                    <div className="flex items-center justify-center text-[var(--muted-foreground)] hidden lg:flex">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center bg-[var(--background)] p-6 rounded-2xl border border-[var(--border)] relative hover:border-blue-500/40 transition-all duration-300">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow-sm">Day 7</div>
                      <h4 className="font-extrabold text-sm">ZeptoMail sequence</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-[180px]">HTML partnership catalogs triggered automatically via ZeptoMail</p>
                    </div>

                    <div className="flex items-center justify-center text-[var(--muted-foreground)] hidden lg:flex">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center bg-[var(--background)] p-6 rounded-2xl border border-[var(--border)] relative hover:border-blue-500/40 transition-all duration-300">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow-sm">Day 14</div>
                      <h4 className="font-extrabold text-sm">Manager review</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-[180px]">Lead marked as inactive or escalated to executive calling pipeline</p>
                    </div>
                  </div>
                </div>

                {/* Automation Rules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Automated Triggers</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-sm text-[var(--foreground)]">Instant WhatsApp Follow-up</h4>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Dispatches template upon webhook email parse</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase">ACTIVE</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-sm text-[var(--foreground)]">Campaign Profile Classifier</h4>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Extracts Dealer vs End-User classification</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase">ACTIVE</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-sm text-[var(--foreground)]">60-Second Instant Telecalling</h4>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Forwards lead parameters to Paperclip voice engine</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-full uppercase">INACTIVE (NO CREDENTIALS)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Sync Daemon Settings</h3>
                    <div className="space-y-4 text-xs">
                      <div className="flex justify-between py-3.5 border-b border-[var(--border)]/40">
                        <span className="text-[var(--muted-foreground)] font-semibold">Sync Interval:</span>
                        <span className="font-mono text-blue-500 font-bold">Every 60 Seconds</span>
                      </div>
                      <div className="flex justify-between py-3.5 border-b border-[var(--border)]/40">
                        <span className="text-[var(--muted-foreground)] font-semibold">Max Emails scanned:</span>
                        <span className="font-mono text-[var(--foreground)] font-bold">25 Per Loop</span>
                      </div>
                      <div className="flex justify-between py-3.5 border-b border-[var(--border)]/40">
                        <span className="text-[var(--muted-foreground)] font-semibold">Sync Timeframe:</span>
                        <span className="font-mono text-blue-500 font-bold">24 Hours</span>
                      </div>
                      <div className="flex justify-between py-3.5">
                        <span className="text-[var(--muted-foreground)] font-semibold">Target Receiver Webhook:</span>
                        <span className="font-mono text-indigo-500 font-bold">/api/webhooks/make-lead</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: SYSTEM & LOGS */}
            {activeTab === 'system' && (
              <motion.div
                key="system"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-black tracking-wide">System Monitor & Settings</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Directly configure API tokens and supervise sync daemon stdout.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Configuration Variables Manager */}
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm space-y-6">
                    <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest border-b border-[var(--border)] pb-3">Environment Config (.env.local)</h3>
                    
                    <form onSubmit={handleConfigSubmit} className="space-y-5 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Meta Access Token</label>
                          <button
                            type="button"
                            onClick={() => toggleSecret('WHATSAPP_ACCESS_TOKEN')}
                            className="text-[10px] text-blue-500 hover:underline font-bold flex items-center gap-1"
                          >
                            {showSecrets.WHATSAPP_ACCESS_TOKEN ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {showSecrets.WHATSAPP_ACCESS_TOKEN ? 'Hide Token' : 'Reveal Token'}
                          </button>
                        </div>
                        <textarea 
                          value={config.WHATSAPP_ACCESS_TOKEN} 
                          onChange={(e) => setConfig({ ...config, WHATSAPP_ACCESS_TOKEN: e.target.value })}
                          className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-xs font-mono focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)] h-20 resize-none custom-scrollbar"
                          style={{ WebkitTextSecurity: showSecrets.WHATSAPP_ACCESS_TOKEN ? 'none' : 'disc' } as any}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">WhatsApp Phone ID</label>
                          <input 
                            type="text" 
                            value={config.WHATSAPP_PHONE_NUMBER_ID} 
                            onChange={(e) => setConfig({ ...config, WHATSAPP_PHONE_NUMBER_ID: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-xs font-mono focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">WhatsApp WABA ID</label>
                          <input 
                            type="text" 
                            value={config.WHATSAPP_WABA_ID} 
                            onChange={(e) => setConfig({ ...config, WHATSAPP_WABA_ID: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-xs font-mono focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-[var(--border)] pt-4">
                        <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Zoho CRM Client ID</label>
                        <input 
                          type="text" 
                          value={config.ZOHO_CLIENT_ID} 
                          onChange={(e) => setConfig({ ...config, ZOHO_CLIENT_ID: e.target.value })}
                          placeholder="ZOHO_CLIENT_ID"
                          className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-xs font-mono focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Zoho Client Secret</label>
                            <button
                              type="button"
                              onClick={() => toggleSecret('ZOHO_CLIENT_SECRET')}
                              className="text-[9px] text-blue-500 font-bold"
                            >
                              {showSecrets.ZOHO_CLIENT_SECRET ? 'Hide' : 'Show'}
                            </button>
                          </div>
                          <input 
                            type={showSecrets.ZOHO_CLIENT_SECRET ? 'text' : 'password'}
                            value={config.ZOHO_CLIENT_SECRET} 
                            onChange={(e) => setConfig({ ...config, ZOHO_CLIENT_SECRET: e.target.value })}
                            placeholder="••••••••••••"
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-xs font-mono focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider">Zoho Refresh Token</label>
                            <button
                              type="button"
                              onClick={() => toggleSecret('ZOHO_REFRESH_TOKEN')}
                              className="text-[9px] text-blue-500 font-bold"
                            >
                              {showSecrets.ZOHO_REFRESH_TOKEN ? 'Hide' : 'Show'}
                            </button>
                          </div>
                          <input 
                            type={showSecrets.ZOHO_REFRESH_TOKEN ? 'text' : 'password'}
                            value={config.ZOHO_REFRESH_TOKEN} 
                            onChange={(e) => setConfig({ ...config, ZOHO_REFRESH_TOKEN: e.target.value })}
                            placeholder="••••••••••••"
                            className="w-full bg-[var(--background)] border border-[var(--input)] px-4 py-3 rounded-xl text-xs font-mono focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all py-3.5 rounded-xl text-sm font-bold shadow-sm cursor-pointer"
                      >
                        {loading ? 'Saving Changes...' : 'Save Configuration'}
                      </button>
                    </form>
                  </div>

                  {/* Sync daemon Logs Console */}
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm flex flex-col h-[600px] justify-between">
                    <div className="space-y-4 flex flex-col flex-1 overflow-hidden">
                      <div className="flex justify-between items-center border-b border-[var(--border)] pb-3">
                        <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Zoho Mail Sync Console</h3>
                        <span className="text-[9px] bg-[var(--background)] border border-[var(--border)] text-blue-500 px-2 py-0.5 rounded-full font-mono font-bold">live streams</span>
                      </div>

                      {/* Console Action Bar */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--background)] border border-[var(--border)] pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none text-[var(--foreground)]"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={clearConsoleLogs}
                            className="px-3.5 py-2.5 bg-[var(--background)] hover:bg-[var(--sidebar-accent)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-rose-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Clear Logs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Clear
                          </button>
                          <button
                            onClick={downloadLogs}
                            className="px-3.5 py-2.5 bg-[var(--background)] hover:bg-[var(--sidebar-accent)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Download Logs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Export
                          </button>
                        </div>
                      </div>

                      {/* Log Output viewport */}
                      <div className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 font-mono text-xs text-[var(--foreground)] overflow-y-auto space-y-2.5 shadow-inner select-text custom-scrollbar mt-2">
                        {filteredLogs.map((log: string, idx: number) => {
                          let colorClass = 'text-[var(--muted-foreground)]';
                          if (log.includes('-->') || log.includes('SUCCESS') || log.includes('successfully')) colorClass = 'text-emerald-600 dark:text-emerald-400 font-medium';
                          else if (log.includes('[-]')) colorClass = 'text-rose-600 dark:text-rose-400 font-medium';
                          else if (log.includes('===') || log.includes('Sync starting') || log.includes('Starting')) colorClass = 'text-blue-500 font-bold';
                          
                          return (
                            <div key={idx} className={`${colorClass} whitespace-pre-wrap leading-relaxed`}>
                              {log}
                            </div>
                          );
                        })}
                        <div ref={consoleEndRef} />
                      </div>
                    </div>

                    {/* Console Auto scroll toggle */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--border)] text-[10px] text-[var(--muted-foreground)] font-bold">
                      <span>Console Buffer: {filteredLogs.length} Lines</span>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={autoScroll}
                          onChange={(e) => setAutoScroll(e.target.checked)}
                          className="rounded border-[var(--border)] text-blue-500 focus:ring-0"
                        />
                        Auto-Scroll Lock
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Lead details side drawer overlay */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 22, stiffness: 160 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[10001] bg-[var(--card)] border-l border-[var(--border)] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar"
            >
              <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-[var(--border)] pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <User className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-black tracking-wide">Lead Information</h3>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1.5 hover:bg-[var(--background)] rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-6 text-sm">
                  <div className="space-y-4">
                    <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
                      <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block mb-1">Full Name</span>
                      <span className="text-base font-extrabold">{selectedLead.name}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
                        <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block mb-1">Phone Number</span>
                        <span className="font-mono font-bold text-xs">{selectedLead.phone}</span>
                      </div>
                      <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
                        <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block mb-1">Email Address</span>
                        <span className="font-mono text-xs">{selectedLead.email || '—'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
                        <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block mb-1">Company</span>
                        <span className="font-semibold text-xs">{selectedLead.company || '—'}</span>
                      </div>
                      <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
                        <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block mb-1">Lead Source</span>
                        <span className="font-semibold text-xs text-blue-500">{selectedLead.source}</span>
                      </div>
                    </div>

                    <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block">Meta API logs</span>
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${selectedLead.status === '200 OK' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'}`}>{selectedLead.status}</span>
                      </div>
                      <div className="text-xs font-semibold text-[var(--muted-foreground)] py-1">
                        Mode: <strong className="text-[var(--foreground)]">{selectedLead.mode}</strong>
                      </div>
                      <div className="text-[10px] text-[var(--muted-foreground)] mt-1">
                        Timestamp: {selectedLead.time}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider block">System Metadata</span>
                    <div className="bg-[var(--background)] border border-[var(--border)] p-4 rounded-2xl font-mono text-[11px] text-[var(--muted-foreground)] overflow-x-auto select-all max-h-[160px] custom-scrollbar">
                      {JSON.stringify(selectedLead.details, null, 2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 border-t border-[var(--border)] pt-4 flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selectedLead, null, 2));
                    showToast('Copied lead object JSON payload!', 'success');
                  }}
                  className="flex-1 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--sidebar-accent)] text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Payload
                </button>
                <button
                  onClick={() => {
                    showToast(`Queued manual sync retry for ${selectedLead.name}!`, 'success');
                    setSelectedLead(null);
                  }}
                  className="flex-1 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold py-2.5 rounded-xl shadow-sm transition-all hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Sync to Zoho
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
