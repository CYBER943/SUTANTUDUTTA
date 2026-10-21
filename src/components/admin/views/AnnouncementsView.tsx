import React, { useState } from 'react';
import { Megaphone, Radio, Save, Loader2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { adminApi } from '../../../services/adminApi';
import { toast } from 'sonner';

interface AnnouncementsViewProps {
  settings: any;
  onRefresh: () => void;
}

export default function AnnouncementsView({ settings, onRefresh }: AnnouncementsViewProps) {
  const [saving, setSaving] = useState(false);

  // Announcement state
  const [bannerEnabled, setBannerEnabled] = useState(settings?.announcement?.enabled || false);
  const [badge, setBadge] = useState(settings?.announcement?.badge || 'NEW');
  const [message, setMessage] = useState(settings?.announcement?.message || 'Exploring Gemini 2.5 & Vibe Coding experiments on CodePen!');
  const [linkText, setLinkText] = useState(settings?.announcement?.linkText || 'View Experiments');
  const [linkUrl, setLinkUrl] = useState(settings?.announcement?.linkUrl || '#projects');

  // Status state
  const [statusText, setStatusText] = useState(settings?.statusText || 'Open to Collaborations');
  const [statusAvailable, setStatusAvailable] = useState(settings?.statusAvailable !== false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateSettings({
        statusText: statusText.trim(),
        statusAvailable,
        announcement: {
          enabled: bannerEnabled,
          badge: badge.trim(),
          message: message.trim(),
          linkText: linkText.trim(),
          linkUrl: linkUrl.trim()
        }
      });
      toast.success('Announcements & status updated successfully.');
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
          Broadcast & Status Controls
        </h1>
        <p className="text-xs text-text-secondary font-mono mt-1">
          CONFIGURE LIVE ANNOUNCEMENT BANNER & COLLABORATION STATUS
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Global Announcement Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-border space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
                <Megaphone size={18} />
              </div>
              <div>
                <h2 className="text-base font-display font-bold text-text-primary">
                  Global Portfolio Announcement Banner
                </h2>
                <p className="text-xs text-text-secondary font-light">
                  Displays at the very top of your portfolio website
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bannerEnabled}
                onChange={(e) => setBannerEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-elevated border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Badge Label
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. NEW, UPDATE, EVENT"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Just published 3 new interactive experiments on CodePen!"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Action Link Label
              </label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="e.g. View Projects"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Link Target URL
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="e.g. #projects or https://codepen.io/..."
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="pt-4 border-t border-border">
            <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">
              Live Banner Preview on Public Site:
            </span>

            {bannerEnabled ? (
              <div className="w-full bg-gradient-to-r from-accent-primary/20 via-purple-600/20 to-accent-primary/20 border border-accent-primary/30 rounded-xl py-2.5 px-4 flex flex-wrap items-center justify-center gap-3 text-xs shadow-lg">
                <span className="px-2 py-0.5 rounded-md bg-accent-primary text-white font-mono text-[10px] font-bold">
                  {badge || 'NEW'}
                </span>
                <span className="text-text-primary font-medium text-center">
                  {message || 'Your announcement will appear here'}
                </span>
                {linkText && (
                  <span className="text-accent-bright underline font-semibold flex items-center gap-1 cursor-pointer">
                    <span>{linkText}</span>
                    <ArrowRight size={12} />
                  </span>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-surface-elevated border border-dashed border-border text-center text-xs font-mono text-text-muted">
                Banner is currently disabled. Toggle switch above to activate.
              </div>
            )}
          </div>
        </div>

        {/* 2. Collaboration Status */}
        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-border space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-status-success/10 border border-status-success/20 flex items-center justify-center text-status-success">
              <Radio size={18} />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-text-primary">
                Footer Availability Badge
              </h2>
              <p className="text-xs text-text-secondary font-light">
                Updates the live indicator shown in your portfolio footer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Status Badge Label
              </label>
              <input
                type="text"
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
                placeholder="e.g. Open to Collaborations"
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                Pulse State
              </label>
              <select
                value={statusAvailable ? 'available' : 'busy'}
                onChange={(e) => setStatusAvailable(e.target.value === 'available')}
                className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
              >
                <option value="available">Active / Available (Green Pulse)</option>
                <option value="busy">Busy / Academics (Amber Indicator)</option>
              </select>
            </div>
          </div>

          {/* Footer Preview */}
          <div className="pt-4 border-t border-border">
            <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">
              Live Footer Badge Preview:
            </span>
            <div className="inline-flex items-center space-x-4 p-3 bg-surface-elevated border border-border rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
                statusAvailable 
                  ? 'bg-status-success/10 border border-status-success/20 text-status-success' 
                  : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
              }`}>
                <div className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    statusAvailable ? 'bg-status-success' : 'bg-amber-500'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    statusAvailable ? 'bg-status-success' : 'bg-amber-500'
                  }`} />
                </div>
              </div>
              <span className={`text-[12px] font-mono tracking-widest uppercase font-semibold leading-snug ${
                statusAvailable ? 'text-status-success' : 'text-amber-400'
              }`}>
                {statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-md shadow-accent-primary/20 flex items-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>Save All Broadcast Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
