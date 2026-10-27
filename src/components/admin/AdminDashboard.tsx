import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  FileText, 
  Mail, 
  Megaphone, 
  Settings, 
  Clock, 
  LayoutDashboard, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  RefreshCw,
  User,
  Radio
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { toast } from 'sonner';

import OverviewView from './views/OverviewView';
import ProjectsView from './views/ProjectsView';
import BlogView from './views/BlogView';
import MessagesView from './views/MessagesView';
import AnnouncementsView from './views/AnnouncementsView';
import SettingsView from './views/SettingsView';
import AuditLogsView from './views/AuditLogsView';
import AdminsView from './views/AdminsView';

interface AdminDashboardProps {
  currentAdmin: any;
  onLogout: () => void;
  onNavigateToPublic: () => void;
}

export default function AdminDashboard({ currentAdmin, onLogout, onNavigateToPublic }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blog' | 'messages' | 'announcements' | 'admins' | 'settings' | 'logs'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [blog, setBlog] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Open creation modal directly when triggered from overview shortcuts
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openBlogModal, setOpenBlogModal] = useState(false);

  const fetchAllData = async () => {
    try {
      const [statsRes, projRes, blogRes, msgRes, settRes, logsRes] = await Promise.all([
        adminApi.getDashboardStats().catch(() => null),
        adminApi.getProjects().catch(() => []),
        adminApi.getBlogPosts().catch(() => []),
        adminApi.getMessages().catch(() => []),
        adminApi.getSettings().catch(() => null),
        adminApi.getAuditLogs().catch(() => [])
      ]);

      if (statsRes) setStats(statsRes);
      if (Array.isArray(projRes)) setProjects(projRes);
      if (Array.isArray(blogRes)) setBlog(blogRes);
      if (Array.isArray(msgRes)) setMessages(msgRes);
      if (settRes) setSettings(settRes);
      if (Array.isArray(logsRes)) setAuditLogs(logsRes);
    } catch (err: any) {
      console.error('[Dashboard] Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = async () => {
    await adminApi.logout();
    toast.success('Administrator logged out safely.');
    onLogout();
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'blog', label: 'Articles', icon: FileText, count: blog.length },
    { id: 'messages', label: 'Messages', icon: Mail, unread: messages.filter(m => !m.read).length },
    { id: 'announcements', label: 'Broadcast & Status', icon: Megaphone },
    { id: 'admins', label: 'Admin Accounts', icon: ShieldCheck },
    { id: 'settings', label: 'Settings & Security', icon: Settings },
    { id: 'logs', label: 'Audit Trail', icon: Clock }
  ];

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-card-bg border-r border-border p-5 shrink-0 select-none">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center space-x-3 px-2 py-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-accent-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-primary/20">
              SD
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight text-text-primary">
                Sutantu Dutta
              </div>
              <div className="text-[10px] font-mono text-accent-secondary tracking-widest uppercase">
                ADMIN CONTROL
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all ${
                    isActive
                      ? 'bg-accent-primary text-white font-semibold shadow-md shadow-accent-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>

                  {item.unread !== undefined && item.unread > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-accent-primary' : 'bg-status-error text-white'
                    }`}>
                      {item.unread}
                    </span>
                  )}
                  {item.count !== undefined && !item.unread && (
                    <span className="text-[10px] opacity-60">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-border">
          <button
            onClick={onNavigateToPublic}
            className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-mono text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all"
          >
            <ExternalLink size={14} />
            <span>Public Portfolio</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-mono text-text-muted hover:text-status-error hover:bg-status-error/10 transition-all"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>

          {/* Admin User Badge */}
          <div className="mt-3 p-3 bg-surface-elevated border border-border rounded-xl flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-accent-primary/20 text-accent-bright flex items-center justify-center text-xs font-mono font-bold">
              <User size={13} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-text-primary truncate">
                {currentAdmin?.username || 'sutantudutta'}
              </div>
              <div className="text-[10px] font-mono text-status-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span>Superadmin</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-text-muted">ADMIN</span>
              <span className="text-text-muted">/</span>
              <span className="text-accent-secondary uppercase font-semibold">
                {activeTab}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAllData}
              className="p-2 rounded-xl bg-surface-elevated border border-border text-text-muted hover:text-text-primary text-xs font-mono transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} />
            </button>

            <button
              onClick={onNavigateToPublic}
              className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary text-xs font-mono transition-all"
            >
              <ExternalLink size={13} />
              <span>View Live Website</span>
            </button>
          </div>
        </header>

        {/* Tab Body */}
        <main className="p-6 md:p-8 flex-1">
          {activeTab === 'overview' && (
            <OverviewView
              stats={stats}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
              onOpenNewProject={() => {
                setActiveTab('projects');
                setOpenProjectModal(true);
              }}
              onOpenNewPost={() => {
                setActiveTab('blog');
                setOpenBlogModal(true);
              }}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              onRefresh={fetchAllData}
              openCreateOnMount={openProjectModal}
            />
          )}

          {activeTab === 'blog' && (
            <BlogView
              posts={blog}
              onRefresh={fetchAllData}
              openCreateOnMount={openBlogModal}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesView
              messages={messages}
              onRefresh={fetchAllData}
            />
          )}

          {activeTab === 'announcements' && (
            <AnnouncementsView
              settings={settings}
              onRefresh={fetchAllData}
            />
          )}

          {activeTab === 'admins' && (
            <AdminsView
              currentAdmin={currentAdmin}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onRefresh={fetchAllData}
            />
          )}

          {activeTab === 'logs' && (
            <AuditLogsView logs={auditLogs} />
          )}
        </main>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-card-bg border-r border-border p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-accent-primary flex items-center justify-center text-white font-bold text-sm">
                    SD
                  </div>
                  <span className="font-display font-bold text-sm text-text-primary">
                    Admin Center
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                        isActive
                          ? 'bg-accent-primary text-white font-semibold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {item.unread !== undefined && item.unread > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-status-error text-white font-bold">
                          {item.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2 pt-6 border-t border-border">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToPublic();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-mono text-text-secondary"
              >
                <ExternalLink size={14} />
                <span>Public Portfolio</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-mono text-status-error"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
