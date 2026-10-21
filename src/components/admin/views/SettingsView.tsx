import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  KeyRound, 
  Globe, 
  Github, 
  Codepen, 
  Linkedin, 
  Mail, 
  MapPin, 
  Save, 
  ShieldCheck, 
  Loader2, 
  Download, 
  Copy, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { adminApi } from '../../../services/adminApi';
import { toast } from 'sonner';

interface SettingsViewProps {
  settings: any;
  onRefresh: () => void;
}

export default function SettingsView({ settings, onRefresh }: SettingsViewProps) {
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState(false);

  // Settings State
  const [name, setName] = useState(settings?.name || 'Sutantu Dutta');
  const [role, setRole] = useState(settings?.role || 'AI DEVELOPER');
  const [tagline, setTagline] = useState(settings?.tagline || 'LEARNING. BUILDING. EXPERIMENTING.');
  const [bio, setBio] = useState(settings?.bio || '');
  const [location, setLocation] = useState(settings?.location || 'India');
  const [email, setEmail] = useState(settings?.email || 'sutantudutta@outlook.com');
  const [github, setGithub] = useState(settings?.github || 'https://github.com/Sdm940');
  const [codepen, setCodepen] = useState(settings?.codepen || 'https://codepen.io/SDM-TECH-KNOW');
  const [linkedin, setLinkedin] = useState(settings?.linkedin || 'https://www.linkedin.com/in/sutantu-dutta-176a2442a/');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Generated Key
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await adminApi.updateSettings({
        name: name.trim(),
        role: role.trim(),
        tagline: tagline.trim(),
        bio: bio.trim(),
        location: location.trim(),
        email: email.trim(),
        github: github.trim(),
        codepen: codepen.trim(),
        linkedin: linkedin.trim()
      });
      toast.success('Portfolio profile updated successfully.');
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Current password and new password are required.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await adminApi.changePassword({
        currentPassword,
        newPassword
      });
      if (res.success) {
        toast.success('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res.error || 'Failed to change password.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Password update error.');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleRegenerateKey = async () => {
    if (!window.confirm('Regenerating your recovery key will invalidate the previous one. Do you want to proceed?')) {
      return;
    }

    setRegeneratingKey(true);
    try {
      const res = await adminApi.regenerateRecoveryKey();
      if (res.success && res.recoveryKey) {
        setNewKey(res.recoveryKey);
        toast.success('New recovery key generated.');
      } else {
        toast.error('Failed to regenerate recovery key.');
      }
    } catch {
      toast.error('Error generating recovery key.');
    } finally {
      setRegeneratingKey(false);
    }
  };

  const handleCopyNewKey = () => {
    if (!newKey) return;
    navigator.clipboard.writeText(newKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
          Portfolio & Security Settings
        </h1>
        <p className="text-xs text-text-secondary font-mono mt-1">
          CONFIGURE PERSONAL BRAND, SOCIAL LINKS & MASTER AUTHENTICATION
        </p>
      </div>

      {/* 1. Profile & Bio Information */}
      <form onSubmit={handleSaveProfile} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-border space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
            <User size={18} />
          </div>
          <div>
            <h2 className="text-base font-display font-bold text-text-primary">
              Personal Brand & Metadata
            </h2>
            <p className="text-xs text-text-secondary font-light">
              Controls branding, titles, and public contact information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Role / Subtitle
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Footer Signature Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Public Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-border space-y-4">
          <span className="block text-xs font-mono uppercase text-text-secondary">
            Verified Social Profiles
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1 flex items-center gap-1">
                <Github size={12} />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1 flex items-center gap-1">
                <Codepen size={12} />
                <span>CodePen URL</span>
              </label>
              <input
                type="url"
                value={codepen}
                onChange={(e) => setCodepen(e.target.value)}
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1 flex items-center gap-1">
                <Linkedin size={12} />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingSettings}
            className="px-5 py-2.5 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-md shadow-accent-primary/20 flex items-center gap-2"
          >
            {savingSettings ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>

      {/* 2. Security & Password Change */}
      <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-border space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-status-success/10 border border-status-success/20 flex items-center justify-center text-status-success">
            <Lock size={18} />
          </div>
          <div>
            <h2 className="text-base font-display font-bold text-text-primary">
              Master Authentication Credentials
            </h2>
            <p className="text-xs text-text-secondary font-light">
              Update password with BCrypt 12-round salted hashing
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current master password"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="px-5 py-2.5 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-primary text-xs font-mono tracking-wider uppercase font-semibold transition-all flex items-center gap-2"
            >
              {savingPassword ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              <span>Update Password</span>
            </button>
          </div>
        </form>

        {/* Emergency Recovery Key */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-text-primary font-bold">
                <KeyRound size={14} className="text-accent-primary" />
                <span>Emergency Recovery Key</span>
              </div>
              <p className="text-xs text-text-secondary font-light mt-0.5">
                Generate a fresh 128-bit key in case you ever lose your credentials.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRegenerateKey}
              disabled={regeneratingKey}
              className="px-4 py-2 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary text-xs font-mono transition-all flex items-center gap-2"
            >
              {regeneratingKey && <Loader2 size={12} className="animate-spin" />}
              <span>Regenerate Key</span>
            </button>
          </div>

          {newKey && (
            <div className="mt-4 p-4 bg-surface-elevated border border-border rounded-xl">
              <span className="block text-[11px] font-mono text-text-muted mb-2">
                NEW EMERGENCY RECOVERY KEY (SAVE SAFELY):
              </span>
              <div className="flex items-center justify-between gap-3 bg-bg-primary p-2.5 rounded-lg border border-border">
                <code className="text-xs font-mono font-bold text-accent-bright">
                  {newKey}
                </code>
                <button
                  type="button"
                  onClick={handleCopyNewKey}
                  className="px-2.5 py-1 rounded bg-card-bg border border-border hover:border-accent-primary text-xs font-mono flex items-center gap-1 text-text-secondary hover:text-text-primary"
                >
                  {copiedKey ? <Check size={12} className="text-status-success" /> : <Copy size={12} />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
