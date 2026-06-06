'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(redirect);
      } else {
        setAttempts((a) => a + 1);
        setError('Incorrect PIN. Please try again.');
        setPin('');
      }
    } catch {
      setError('Connection error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-extrabold text-white text-2xl shadow-xl shadow-blue-500/20 mx-auto mb-4">
            T
          </div>
          <h1 className="text-2xl font-black text-[var(--foreground)] tracking-wide">TEC Automation Hub</h1>
          <p className="text-xs text-[var(--muted-foreground)] font-semibold mt-1 tracking-widest uppercase">Secure Admin Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">Protected Dashboard</p>
              <p className="text-xs text-[var(--muted-foreground)]">Enter your admin PIN to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-widest">Admin PIN</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  autoFocus
                  autoComplete="current-password"
                  className="w-full bg-[var(--background)] border border-[var(--input)] pl-11 pr-12 py-3.5 rounded-xl text-sm focus:border-[var(--ring)] focus:outline-none text-[var(--foreground)] font-mono tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{error}</span>
                  {attempts >= 3 && (
                    <span className="text-[10px] text-rose-500 ml-auto font-bold">{attempts} attempts</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || !pin.trim()}
              className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[var(--primary-foreground)]/30 border-t-[var(--primary-foreground)] rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-[var(--muted-foreground)] mt-6 font-semibold">
          TEC INDUSTRIES © {new Date().getFullYear()} — Secured Admin Panel
        </p>
      </motion.div>
    </div>
  );
}

export default function DashboardLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
