import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Copy, Check, ArrowRight, Eye, EyeOff, Lock, User, Mail, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface AdminSetupProps {
  onSuccess: (admin: any) => void;
  onNavigateToPublic?: () => void;
}

export default function AdminSetup({ onSuccess, onNavigateToPublic }: AdminSetupProps) {
  const [username, setUsername] = useState('sutantudutta');
  const [email, setEmail] = useState('sutantudutta@outlook.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recovery Key State after bootstrap
  const [recoveryKey, setRecoveryKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState<any>(null);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 5
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid administrator email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminApi.setup({
        password,
        confirmPassword
      });

      if (res.success && res.recoveryKey && res.admin) {
        setRecoveryKey(res.recoveryKey);
        setCreatedAdmin(res.admin);
      } else {
        setError(res.error || 'Failed to complete initial administrator bootstrap.');
      }
    } catch (err: any) {
      setError(err.message || 'Setup error. Please check server logs.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    if (!recoveryKey) return;
    navigator.clipboard.writeText(recoveryKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  // Step 2: Show generated emergency recovery key
  if (recoveryKey && createdAdmin) {
    return (
      <div className="min-h-screen w-full bg-bg-primary flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-status-success/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-lg bg-card-bg border border-border rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-status-success/10 border border-status-success/30 text-status-success mb-4 shadow-lg">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
              Administrator Initialized
            </h1>
            <p className="text-text-secondary text-xs mt-1.5 font-mono">
              SAVE YOUR ONE-TIME EMERGENCY RECOVERY KEY
            </p>
          </div>

          <div className="p-4 bg-surface-elevated border border-border rounded-xl mb-6">
            <div className="flex items-center justify-between text-xs text-text-muted font-mono mb-2">
              <span>EMERGENCY MASTER RECOVERY KEY</span>
              <span>128-BIT ENTROPY</span>
            </div>
            <div className="flex items-center justify-between gap-3 bg-bg-primary p-3 rounded-lg border border-border">
              <code className="text-sm font-mono font-bold text-accent-bright tracking-widest break-all">
                {recoveryKey}
              </code>
              <button
                type="button"
                onClick={handleCopyKey}
                className="shrink-0 p-2 rounded-lg bg-card-bg border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5 text-xs font-mono"
              >
                {copiedKey ? (
                  <>
                    <Check size={14} className="text-status-success" />
                    <span className="text-status-success">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 bg-status-error/10 border border-status-error/20 rounded-xl mb-6 flex items-start space-x-3 text-xs text-text-secondary">
            <ShieldAlert size={18} className="text-status-error shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Store this recovery key in a secure password manager. If you ever forget your master password, this key is the only cryptographic way to regain administrative control. The initial setup endpoint is now permanently locked.
            </p>
          </div>

          <button
            onClick={() => onSuccess(createdAdmin)}
            className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-95 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center space-x-2"
          >
            <span>Proceed to Admin Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Initial Administrator Form
  return (
    <div className="min-h-screen w-full bg-bg-primary flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top return link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onNavigateToPublic || (() => { window.location.href = '/'; })}
          className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <span>Return to Portfolio</span>
        </button>

        <span className="text-[11px] font-mono text-status-success flex items-center gap-1.5">
          <KeyRound size={14} />
          <span>One-Time Bootstrap Flow</span>
        </span>
      </div>

      <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/30 text-accent-primary mb-4 shadow-lg">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Super Admin Master Key
          </h1>
          <p className="text-text-secondary text-xs mt-1.5 font-mono tracking-wide">
            PERMANENT ROOT ACTIVATION — SUTANTU DUTTA
          </p>
        </div>

        {/* Identity Badge */}
        <div className="p-3.5 bg-surface-elevated border border-accent-primary/30 rounded-xl mb-6">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-accent-secondary mb-1">
            <span>PERMANENT SUPER ADMIN</span>
            <span className="text-status-success font-bold">IMMUTABLE ROOT</span>
          </div>
          <div className="text-sm font-display font-bold text-text-primary">
            Sutantu Dutta
          </div>
          <div className="text-xs font-mono text-text-secondary">
            sutantudutta@outlook.com
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-status-error/10 border border-status-error/30 rounded-xl flex items-start space-x-3 text-status-error text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed font-sans">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
              Strong Master Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2.5 pl-10 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength meter */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength >= 1 ? (strength < 3 ? 'bg-status-error w-1/4' : strength < 4 ? 'bg-amber-500 w-1/4' : 'bg-status-success w-1/4') : 'w-0'}`} />
                  <div className={`h-full transition-all duration-300 ${strength >= 2 ? (strength < 4 ? 'bg-amber-500 w-1/4' : 'bg-status-success w-1/4') : 'w-0'}`} />
                  <div className={`h-full transition-all duration-300 ${strength >= 3 ? (strength < 5 ? 'bg-amber-500 w-1/4' : 'bg-status-success w-1/4') : 'w-0'}`} />
                  <div className={`h-full transition-all duration-300 ${strength >= 4 ? 'bg-status-success w-1/4' : 'w-0'}`} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-text-muted">
                  <span>Strength</span>
                  <span>{strength < 2 ? 'Weak' : strength < 4 ? 'Moderate' : 'Cryptographically Strong'}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
              Confirm Master Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-95 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Initializing Cryptography...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Initialize Administrator</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
