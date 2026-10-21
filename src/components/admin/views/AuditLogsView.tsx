import React, { useState } from 'react';
import { ShieldCheck, Search, Clock, Activity, Download, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface AuditLogsViewProps {
  logs: any[];
}

export default function AuditLogsView({ logs }: AuditLogsViewProps) {
  const [search, setSearch] = useState('');

  const handleExportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `audit_trail_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Audit logs exported.');
  };

  const filtered = logs.filter(l => 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase()) ||
    (l.ip && l.ip.includes(search))
  );

  const getActionBadge = (action: string) => {
    if (action.includes('LOGIN') || action.includes('BOOTSTRAP')) {
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
    if (action.includes('DELETED')) {
      return 'bg-status-error/10 text-status-error border-status-error/20';
    }
    if (action.includes('CREATED') || action.includes('SUCCESS')) {
      return 'bg-status-success/10 text-status-success border-status-success/20';
    }
    if (action.includes('PASSWORD') || action.includes('RECOVERY')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
    return 'bg-accent-primary/10 text-accent-bright border-accent-primary/20';
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Security & Audit Trail
          </h1>
          <p className="text-xs text-text-secondary font-mono mt-1">
            IMMUTABLE EVENT LOGS FOR COMPLIANCE & MONITORING ({logs.length} TOTAL)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event logs..."
              className="w-full bg-card-bg border border-border focus:border-accent-primary rounded-xl py-2 pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleExportLogs}
            className="shrink-0 px-3 py-2 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-card-bg border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated/70 border-b border-border text-text-muted uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4 text-right">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getActionBadge(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-primary font-sans text-xs">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 text-right text-text-muted whitespace-nowrap">
                    {log.ip || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
