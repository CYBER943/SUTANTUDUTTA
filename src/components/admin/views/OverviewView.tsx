import React from 'react';
import { 
  FolderKanban, 
  FileText, 
  Mail, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Server, 
  Clock, 
  Plus, 
  Radio, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface OverviewViewProps {
  stats: any;
  onNavigateTab: (tab: string) => void;
  onOpenNewProject: () => void;
  onOpenNewPost: () => void;
}

export default function OverviewView({
  stats,
  onNavigateTab,
  onOpenNewProject,
  onOpenNewPost
}: OverviewViewProps) {
  const metrics = stats?.metrics || {
    totalProjects: 7,
    totalBlog: 4,
    publishedBlog: 4,
    totalMessages: 0,
    unreadMessages: 0,
    starredMessages: 0
  };

  const settings = stats?.settings || {};
  const recentMessages = stats?.recentMessages || [];
  const recentLogs = stats?.recentAuditLogs || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card-bg via-surface-elevated to-card-bg border border-border p-6 md:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-bright mb-2">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>SYSTEM SECURED & ONLINE</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              Welcome back, Sutantu
            </h1>
            <p className="text-text-secondary text-sm mt-1 max-w-xl font-light">
              Manage your dynamic projects, articles, inbound messages, and portfolio announcements in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewProject}
              className="px-4 py-2.5 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-lg shadow-accent-primary/20 flex items-center gap-2"
            >
              <Plus size={14} />
              <span>New Project</span>
            </button>
            <button
              onClick={onOpenNewPost}
              className="px-4 py-2.5 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-primary text-xs font-mono tracking-wider uppercase font-semibold transition-all flex items-center gap-2"
            >
              <FileText size={14} />
              <span>Write Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="group cursor-pointer p-5 rounded-2xl bg-card-bg border border-border hover:border-accent-primary/50 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Projects</span>
            <div className="w-9 h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
              <FolderKanban size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-text-primary">
              {metrics.totalProjects}
            </div>
            <div className="text-xs text-text-secondary mt-1 flex items-center gap-1 font-mono">
              <span>Published experiments</span>
              <ArrowUpRight size={12} className="text-accent-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div
          onClick={() => onNavigateTab('blog')}
          className="group cursor-pointer p-5 rounded-2xl bg-card-bg border border-border hover:border-accent-primary/50 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Articles</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <FileText size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-text-primary">
              {metrics.publishedBlog}
            </div>
            <div className="text-xs text-text-secondary mt-1 flex items-center gap-1 font-mono">
              <span>{metrics.totalBlog} Total ({metrics.totalBlog - metrics.publishedBlog} Drafts)</span>
              <ArrowUpRight size={12} className="text-accent-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Inbound Messages */}
        <div
          onClick={() => onNavigateTab('messages')}
          className="group cursor-pointer p-5 rounded-2xl bg-card-bg border border-border hover:border-accent-primary/50 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Contact Messages</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Mail size={18} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-text-primary">
                {metrics.totalMessages}
              </span>
              {metrics.unreadMessages > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-status-error/20 text-status-error border border-status-error/30">
                  {metrics.unreadMessages} NEW
                </span>
              )}
            </div>
            <div className="text-xs text-text-secondary mt-1 flex items-center gap-1 font-mono">
              <span>{metrics.unreadMessages} unread in inbox</span>
              <ArrowUpRight size={12} className="text-accent-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div
          onClick={() => onNavigateTab('announcements')}
          className="group cursor-pointer p-5 rounded-2xl bg-card-bg border border-border hover:border-accent-primary/50 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Collaboration Status</span>
            <div className="w-9 h-9 rounded-xl bg-status-success/10 border border-status-success/20 flex items-center justify-center text-status-success group-hover:scale-110 transition-transform">
              <Radio size={18} className="animate-pulse" />
            </div>
          </div>
          <div>
            <div className="text-sm font-display font-bold text-text-primary truncate">
              {settings.statusText || 'Open to Collaborations'}
            </div>
            <div className="text-xs text-status-success mt-1 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-status-success" />
              <span>{settings.statusAvailable ? 'Available Live' : 'Focus Mode'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Messages & System Security */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-card-bg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2.5">
              <Mail size={18} className="text-accent-primary" />
              <h2 className="text-base font-display font-bold text-text-primary">
                Recent Inbound Messages
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-mono text-accent-secondary hover:text-accent-bright transition-colors flex items-center gap-1"
            >
              <span>View All Inbox</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-12 text-center text-text-muted font-mono text-xs border border-dashed border-border rounded-xl">
              No contact messages received yet. New submissions will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div
                  key={msg.id}
                  onClick={() => onNavigateTab('messages')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    !msg.read
                      ? 'bg-accent-primary/5 border-accent-primary/30 hover:border-accent-primary/60'
                      : 'bg-surface-elevated border-border hover:border-border-strong'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-text-primary">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-accent-primary" />
                      )}
                      <span className="text-xs font-mono text-text-muted">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-text-muted shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System & Security Box (1 col) */}
        <div className="rounded-2xl bg-card-bg border border-border p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <ShieldCheck size={18} className="text-status-success" />
              <h2 className="text-base font-display font-bold text-text-primary">
                Security & Platform
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-surface-elevated border border-border rounded-xl flex items-center justify-between">
                <span className="text-text-secondary">Auth Encryption</span>
                <span className="text-status-success flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>BCrypt + JWT</span>
                </span>
              </div>

              <div className="p-3 bg-surface-elevated border border-border rounded-xl flex items-center justify-between">
                <span className="text-text-secondary">Brute-Force Guard</span>
                <span className="text-accent-bright">Rate-Limited</span>
              </div>

              <div className="p-3 bg-surface-elevated border border-border rounded-xl flex items-center justify-between">
                <span className="text-text-secondary">Database Store</span>
                <span className="text-text-primary">Atomic JSON / ACID</span>
              </div>

              <div className="p-3 bg-surface-elevated border border-border rounded-xl flex items-center justify-between">
                <span className="text-text-secondary">Last Login</span>
                <span className="text-text-muted">
                  {metrics.lastLoginAt ? new Date(metrics.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Current Session'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <button
              onClick={() => onNavigateTab('logs')}
              className="w-full py-2.5 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary text-xs font-mono transition-all flex items-center justify-center gap-2"
            >
              <Clock size={14} />
              <span>Inspect Audit Trail ({recentLogs.length} events)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
