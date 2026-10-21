import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Star, 
  Trash2, 
  CheckCheck, 
  Download, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Monitor, 
  Globe, 
  User, 
  X, 
  Reply,
  AlertTriangle
} from 'lucide-react';
import { adminApi } from '../../../services/adminApi';
import { toast } from 'sonner';

interface MessagesViewProps {
  messages: any[];
  onRefresh: () => void;
}

export default function MessagesView({ messages, onRefresh }: MessagesViewProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleToggleRead = async (msg: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await adminApi.updateMessageStatus(msg.id, { read: !msg.read });
      if (selectedMessage && selectedMessage.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, read: !msg.read });
      }
      onRefresh();
    } catch {
      toast.error('Failed to update message status.');
    }
  };

  const handleToggleStar = async (msg: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await adminApi.updateMessageStatus(msg.id, { starred: !msg.starred });
      if (selectedMessage && selectedMessage.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, starred: !msg.starred });
      }
      onRefresh();
    } catch {
      toast.error('Failed to star message.');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await adminApi.markAllMessagesRead();
      toast.success('All messages marked as read.');
      onRefresh();
    } catch {
      toast.error('Failed to mark all as read.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminApi.deleteMessage(id);
      toast.success('Message deleted.');
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      setDeleteConfirmId(null);
      onRefresh();
    } catch {
      toast.error('Failed to delete message.');
    }
  };

  const handleSelectMessage = (msg: any) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      adminApi.updateMessageStatus(msg.id, { read: true }).then(() => {
        onRefresh();
      });
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `messages_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Exported messages to JSON.');
  };

  const filtered = messages.filter(m => {
    if (filter === 'unread' && m.read) return false;
    if (filter === 'starred' && !m.starred) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) ||
           m.email.toLowerCase().includes(q) ||
           m.message.toLowerCase().includes(q);
  });

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Contact Inbox
          </h1>
          <p className="text-xs text-text-secondary font-mono mt-1">
            SUBMISSIONS SENT VIA PORTFOLIO ({messages.length} TOTAL · {unreadCount} UNREAD)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3 py-2 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <CheckCheck size={14} />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'unread', 'starred'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all ${
                filter === tab
                  ? 'bg-accent-primary text-white shadow-sm'
                  : 'bg-card-bg border border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab === 'all' && `All (${messages.length})`}
              {tab === 'unread' && `Unread (${unreadCount})`}
              {tab === 'starred' && `Starred (${messages.filter(m => m.starred).length})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender or text..."
            className="w-full bg-card-bg border border-border focus:border-accent-primary rounded-xl py-2 pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Inbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Message List */}
        <div className={`${selectedMessage ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-3`}>
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-text-muted font-mono text-xs border border-dashed border-border rounded-2xl bg-card-bg">
              No messages found matching your criteria.
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  selectedMessage?.id === msg.id
                    ? 'bg-accent-primary/10 border-accent-primary shadow-sm'
                    : !msg.read
                    ? 'bg-card-bg border-accent-primary/40 hover:border-accent-primary/70'
                    : 'bg-card-bg border-border hover:border-border-strong opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => handleToggleStar(msg, e)}
                      className={`p-1 rounded transition-colors ${
                        msg.starred ? 'text-amber-400' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Star size={14} className={msg.starred ? 'fill-amber-400' : ''} />
                    </button>

                    <span className="font-semibold text-sm text-text-primary truncate">
                      {msg.name}
                    </span>

                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-accent-primary shrink-0" />
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-text-muted shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="text-xs text-text-muted font-mono truncate mb-2">
                  {msg.email}
                </div>

                <p className="text-xs text-text-secondary line-clamp-2 font-light leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail Drawer */}
        {selectedMessage && (
          <div className="lg:col-span-7 bg-card-bg border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between pb-6 border-b border-border">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h2 className="text-xl font-display font-bold text-text-primary">
                      {selectedMessage.name}
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleToggleStar(selectedMessage)}
                      className={`p-1 rounded transition-colors ${
                        selectedMessage.starred ? 'text-amber-400' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Star size={16} className={selectedMessage.starred ? 'fill-amber-400' : ''} />
                    </button>
                  </div>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs font-mono text-accent-bright hover:underline flex items-center gap-1.5"
                  >
                    <span>{selectedMessage.email}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleRead(selectedMessage)}
                    className="p-2 rounded-xl bg-surface-elevated border border-border text-text-muted hover:text-text-primary text-xs font-mono transition-colors"
                    title={selectedMessage.read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    <CheckCheck size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(selectedMessage.id)}
                    className="p-2 rounded-xl bg-surface-elevated border border-border text-text-muted hover:text-status-error text-xs font-mono transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 rounded-xl bg-surface-elevated border border-border text-text-muted hover:text-text-primary text-xs font-mono transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="py-4 border-b border-border flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-accent-primary" />
                  <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>
                {selectedMessage.browser && (
                  <div className="flex items-center gap-1.5">
                    <Globe size={13} className="text-accent-secondary" />
                    <span>{selectedMessage.browser}</span>
                  </div>
                )}
                {selectedMessage.os && (
                  <div className="flex items-center gap-1.5">
                    <Monitor size={13} className="text-purple-400" />
                    <span>{selectedMessage.os}</span>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="py-6">
                <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            {/* Quick Reply Footer */}
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted">
                Sent from Sutantu Dutta's Contact Form
              </span>

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: Inquiry on your portfolio website&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0ABest regards,%0D%0ASutantu Dutta`}
                className="px-5 py-2.5 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-md shadow-accent-primary/20 flex items-center gap-2"
              >
                <Reply size={14} />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-status-error mb-4">
              <AlertTriangle size={22} />
              <h3 className="text-base font-display font-bold text-text-primary">
                Delete Message
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-6 font-light">
              Are you sure you want to delete this contact submission?
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-surface-elevated border border-border text-text-secondary text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-status-error hover:bg-status-error/90 text-white text-xs font-mono tracking-wider uppercase font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
