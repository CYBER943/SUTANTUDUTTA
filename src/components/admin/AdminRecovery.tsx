import React, { useState } from 'react';
import { KeyRound, Lock, ArrowLeft, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface AdminRecoveryProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
  onNavigateToPublic: () => void;
}

export default function AdminRecovery({ onSuccess, onNavigateToLogin, onNavigateToPublic }: AdminRecoveryProps) {
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGeneratedKey, setNewGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!recoveryKey.trim()) {
      setError('Please enter your emergency recovery key.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminApi.recover({
        recoveryKey: recoveryKey.trim(),
        newPassword
      });

      if (res.success && res.newRecoveryKey) {
        setNewGeneratedKey(res.newRecoveryKey);
      } else {
        setError(res.error || 'Failed to verify recovery key.');
      }
    } catch (err: any) {
      setError(err.message || 'Recovery process encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    if (!newGeneratedKey) return;
    navigator.clipboard.writeText(newGeneratedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (newGeneratedKey) {
    return (
      <div className="min-h-screen w-full bg-bg-primary flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
        <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-status-success/10 border border-status-success/30 text-status-success mb-4 shadow-lg">
              <CheckCircle2 size={24} />
            </div>
            <h1 className="text-xl font-display font-bold text-text-primary tracking-tight">
              Password Reset Complete
            </h1>
            <p className="text-text-secondary text-xs mt-1.5 font-mono">
              SAVE YOUR NEW EMERGENCY RECOVERY KEY
            </p>
          </div>

          <div className="p-4 bg-surface-elevated border border-border rounded-xl mb-6">
            <div className="text-[11px] font-mono text-text-muted mb-2">NEW RECOVERY KEY</div>
            <div className="flex items-center justify-between gap-2 bg-bg-primary p-2.5 rounded-lg border border-border">
              <code className="text-xs font-mono font-bold text-accent-bright tracking-wider">
                {newGeneratedKey}
              </code>
              <button
                type="button"
                onClick={handleCopyKey}
                className="p-1.5 rounded-md bg-card-bg border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary transition-all flex items-center gap-1 text-[11px] font-mono"
              >
                {copied ? <Check size={12} className="text-status-success" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onSuccess}
            className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-95 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Sign In with New Password</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-bg-primary flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onNavigateToLogin}
          className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/30 text-accent-primary mb-4 shadow-lg">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Account Recovery
          </h1>
          <p className="text-text-secondary text-xs mt-1.5 font-mono tracking-wide">
            ENTER EMERGENCY KEY TO RESET PASSWORD
          </p>
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
              Emergency Recovery Key
            </label>
            <input
              type="text"
              required
              value={recoveryKey}
              onChange={(e) => setRecoveryKey(e.target.value)}
              placeholder="e.g. SD-A1B2-C3D4-E5F6"
              className="w-full font-mono bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2.5 px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
              New Master Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-95 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying Recovery Key...</span>
              </>
            ) : (
              <>
                <KeyRound size={16} />
                <span>Reset Master Password</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
