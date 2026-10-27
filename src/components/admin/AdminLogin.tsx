import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, ArrowLeft, ShieldCheck, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface AdminLoginProps {
  onSuccess: (admin: any) => void;
  onNavigateToSetup?: () => void;
  onNavigateToRecovery?: () => void;
  onNavigateToPublic?: () => void;
}

export default function AdminLogin({
  onSuccess,
  onNavigateToSetup,
  onNavigateToRecovery,
  onNavigateToPublic
}: AdminLoginProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier.trim() || !password) {
      setError('Please provide both username/email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminApi.login({
        usernameOrEmail: identifier.trim(),
        password,
        rememberMe
      });

      if (res.success && res.admin) {
        onSuccess(res.admin);
      } else {
        setError(res.error || 'Invalid credentials. Access denied.');
      }
    } catch (err: any) {
      setError(err.message || 'Connection to authentication service failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg-primary flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top return link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onNavigateToPublic || (() => { window.location.href = '/'; })}
          className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Portfolio</span>
        </button>

        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-accent-primary" />
          <span>Encrypted Gateway</span>
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/30 text-accent-primary mb-4 shadow-lg">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Admin Control Center
          </h1>
          <p className="text-text-secondary text-xs mt-1.5 font-mono tracking-wide">
            SUTANTU DUTTA — SECURE MANAGEMENT
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-status-error/10 border border-status-error/30 rounded-xl flex flex-col space-y-2 text-status-error text-xs">
            <div className="flex items-start space-x-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed font-sans">{error}</span>
            </div>
            {error.includes('activated') && onNavigateToSetup && (
              <button
                type="button"
                onClick={onNavigateToSetup}
                className="self-start text-[11px] font-mono font-bold text-accent-bright underline hover:text-accent-secondary mt-1"
              >
                Activate Super Admin Master Key Now →
              </button>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username / Email */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
              Administrator Username / Email
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                required
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="sutantudutta or email"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary">
                Master Password
              </label>
              {onNavigateToRecovery && (
                <button
                  type="button"
                  onClick={onNavigateToRecovery}
                  className="text-[11px] font-mono text-accent-secondary hover:text-accent-bright transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-3 pl-10 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2.5 text-xs text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-surface-elevated border-border text-accent-primary focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Remember session (30 days)</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-95 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound size={16} />
                <span>Unlock Control Center</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[11px] text-text-muted leading-relaxed">
            Strict rate limiting enforced. Repeated unauthorized attempts will be permanently logged and throttled.
          </p>
        </div>
      </div>
    </div>
  );
}
