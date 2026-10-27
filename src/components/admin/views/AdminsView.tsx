import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  UserCheck, 
  UserX, 
  Lock, 
  Crown, 
  Key, 
  Mail, 
  User, 
  AlertCircle, 
  Check, 
  Copy, 
  Loader2,
  Shield,
  Clock
} from 'lucide-react';
import { adminApi, AdminUserRecord, AdminRole } from '../../../services/adminApi';
import { toast } from 'sonner';

interface AdminsViewProps {
  currentAdmin: any;
}

export default function AdminsView({ currentAdmin }: AdminsViewProps) {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states for adding secondary admin
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('admin');
  const [newNotes, setNewNotes] = useState('');
  const [createdRecoveryKey, setCreatedRecoveryKey] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const list = await adminApi.getUsers();
      setUsers(list);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load administrator accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newEmail.trim() || !newPassword) {
      toast.error('Username, email, and password are required');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setActionLoading(true);
    try {
      const res = await adminApi.createUser({
        username: newUsername.trim(),
        email: newEmail.trim(),
        displayName: newDisplayName.trim() || newUsername.trim(),
        password: newPassword,
        role: newRole,
        notes: newNotes.trim()
      });

      if (res.ok) {
        toast.success(`Administrator account created for ${newDisplayName || newUsername}`);
        if (res.recoveryKey) {
          setCreatedRecoveryKey(res.recoveryKey);
        } else {
          setShowAddModal(false);
        }
        fetchUsers();
        // Reset inputs
        setNewUsername('');
        setNewEmail('');
        setNewDisplayName('');
        setNewPassword('');
        setNewRole('admin');
        setNewNotes('');
      } else {
        toast.error(res.error || 'Failed to create administrator account');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error creating account');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (user: AdminUserRecord) => {
    if (user.isSuperAdmin || user.email.toLowerCase() === 'sutantudutta@outlook.com') {
      toast.error('Action blocked: Sutantu Dutta is the Permanent Super Admin and cannot be suspended.');
      return;
    }

    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await adminApi.updateUser(user.id, { status: nextStatus });
      if (res.ok) {
        toast.success(`Account status changed to ${nextStatus}`);
        fetchUsers();
      } else {
        toast.error(res.error || 'Failed to update account status');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error updating account status');
    }
  };

  const handleRoleChange = async (user: AdminUserRecord, nextRole: AdminRole) => {
    if (user.isSuperAdmin || user.email.toLowerCase() === 'sutantudutta@outlook.com') {
      toast.error('Action blocked: Sutantu Dutta is the Permanent Super Admin and cannot be demoted.');
      return;
    }

    try {
      const res = await adminApi.updateUser(user.id, { role: nextRole });
      if (res.ok) {
        toast.success(`Role updated to ${nextRole}`);
        fetchUsers();
      } else {
        toast.error(res.error || 'Failed to update role');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error updating role');
    }
  };

  const handleDeleteUser = async (user: AdminUserRecord) => {
    if (user.isSuperAdmin || user.email.toLowerCase() === 'sutantudutta@outlook.com') {
      toast.error('Action rejected: Sutantu Dutta is the Permanent Super Admin and cannot be removed.');
      return;
    }

    if (!confirm(`Are you sure you want to permanently revoke access for ${user.displayName || user.username}?`)) {
      return;
    }

    try {
      const res = await adminApi.deleteUser(user.id);
      if (res.ok) {
        toast.success(`Administrator ${user.displayName || user.username} removed.`);
        fetchUsers();
      } else {
        toast.error(res.error || 'Failed to remove user');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error deleting account');
    }
  };

  const sutantu = users.find(u => u.isSuperAdmin || u.email.toLowerCase() === 'sutantudutta@outlook.com');
  const secondaryAdmins = users.filter(u => !u.isSuperAdmin && u.email.toLowerCase() !== 'sutantudutta@outlook.com');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-accent-secondary uppercase tracking-widest mb-1">
            <ShieldCheck size={14} />
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Administrator Accounts
          </h1>
          <p className="text-text-secondary text-xs mt-1">
            Permanent root ownership and delegation management for Sutantu Dutta's portfolio.
          </p>
        </div>

        <button
          onClick={() => {
            setCreatedRecoveryKey(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent-primary hover:bg-accent-hover text-white text-xs font-mono font-medium tracking-wide shadow-lg shadow-accent-primary/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <UserPlus size={15} />
          <span>Provision Sub-Admin</span>
        </button>
      </div>

      {/* Permanent Super Admin Highlight Box */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-primary/20 via-card-bg to-purple-950/20 border-2 border-accent-primary/40 p-6 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Crown size={120} className="text-accent-bright" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-accent-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-accent-primary/30 shrink-0">
              <Crown size={28} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-accent-primary text-white font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={12} />
                  <span>PERMANENT SUPER ADMIN</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-status-success/20 text-status-success border border-status-success/30 font-mono text-[10px] font-bold tracking-widest uppercase">
                  IMMUTABLE ROOT
                </span>
              </div>

              <h2 className="text-xl font-display font-bold text-text-primary">
                {sutantu?.displayName || 'Sutantu Dutta'}
              </h2>
              <div className="flex items-center space-x-3 text-xs font-mono text-text-secondary mt-1">
                <span className="flex items-center gap-1">
                  <Mail size={13} className="text-accent-secondary" />
                  <span className="text-accent-bright font-semibold">
                    {sutantu?.email || 'sutantudutta@outlook.com'}
                  </span>
                </span>
                <span>•</span>
                <span>User ID: <code className="text-text-primary">{sutantu?.id || 'superadmin_sutantu_dutta'}</code></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-surface-elevated/70 border border-border/80 backdrop-blur-sm rounded-xl p-4">
            <div className="text-xs">
              <div className="font-mono text-text-muted text-[10px] uppercase">Super Admin Invariant</div>
              <div className="text-text-primary font-medium mt-0.5">Full Unrestricted Authorization</div>
              <div className="text-[11px] text-text-secondary">Protected against deletion, demotion, or lockout.</div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/30 text-accent-bright font-mono text-xs font-bold shrink-0">
              <Lock size={13} />
              <span>Root Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Administrators Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-display font-bold text-text-primary flex items-center gap-2">
            <span>Delegated Administrators & Roles</span>
            <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-xs font-mono text-text-secondary">
              {secondaryAdmins.length}
            </span>
          </h3>
        </div>

        {loading ? (
          <div className="p-12 text-center bg-card-bg border border-border rounded-2xl">
            <Loader2 size={24} className="animate-spin text-accent-primary mx-auto mb-2" />
            <span className="text-xs font-mono text-text-muted">Loading administrator directory...</span>
          </div>
        ) : secondaryAdmins.length === 0 ? (
          <div className="p-8 text-center bg-card-bg border border-dashed border-border rounded-2xl">
            <Shield size={32} className="text-text-muted mx-auto mb-3 opacity-60" />
            <h4 className="text-sm font-display font-semibold text-text-primary">No Secondary Administrators</h4>
            <p className="text-xs text-text-secondary mt-1 max-w-md mx-auto">
              Sutantu Dutta is currently the sole administrator. You can provision secondary administrators with tailored roles (Admin, Editor, or Viewer).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondaryAdmins.map((user) => (
              <div
                key={user.id}
                className="bg-card-bg border border-border rounded-2xl p-5 hover:border-accent-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-display font-bold text-text-primary text-sm">
                        {user.displayName || user.username}
                      </h4>
                      <div className="text-xs font-mono text-text-secondary mt-0.5">
                        {user.email}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold ${
                        user.role === 'admin' 
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' 
                          : user.role === 'editor'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/30'
                      }`}>
                        {user.role}
                      </span>

                      <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold ${
                        user.status === 'active'
                          ? 'bg-status-success/10 text-status-success border border-status-success/30'
                          : 'bg-status-error/10 text-status-error border border-status-error/30'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>

                  {user.notes && (
                    <p className="text-xs text-text-muted mb-4 bg-surface-elevated p-2 rounded-lg border border-border">
                      {user.notes}
                    </p>
                  )}

                  <div className="text-[11px] font-mono text-text-muted space-y-1 mb-4">
                    <div>Created: {new Date(user.createdAt).toLocaleDateString()}</div>
                    {user.lastLoginAt && <div>Last Active: {new Date(user.lastLoginAt).toLocaleString()}</div>}
                  </div>
                </div>

                {/* Role Switcher & Actions */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-mono text-text-muted">Role:</span>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value as AdminRole)}
                      className="bg-surface-elevated border border-border rounded-lg text-xs font-mono text-text-primary px-2 py-1 focus:outline-none focus:border-accent-primary"
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      title={user.status === 'active' ? 'Suspend access' : 'Activate access'}
                      className="p-1.5 rounded-lg bg-surface-elevated hover:bg-card-bg text-text-secondary hover:text-text-primary border border-border transition-colors text-xs font-mono flex items-center gap-1"
                    >
                      {user.status === 'active' ? <UserX size={14} className="text-status-warning" /> : <UserCheck size={14} className="text-status-success" />}
                      <span className="hidden sm:inline">{user.status === 'active' ? 'Suspend' : 'Activate'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user)}
                      title="Permanently remove account"
                      className="p-1.5 rounded-lg bg-status-error/10 hover:bg-status-error/20 text-status-error border border-status-error/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Permission Matrix Guide */}
      <div className="bg-card-bg border border-border rounded-2xl p-6">
        <h3 className="font-display font-bold text-sm text-text-primary mb-3">
          Role-Based Access Control (RBAC) Permissions Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-border text-text-muted font-mono uppercase text-[10px]">
                <th className="py-2 pr-4">Permission / Capability</th>
                <th className="py-2 px-3 text-accent-bright font-bold">Super Admin (Sutantu)</th>
                <th className="py-2 px-3">Admin</th>
                <th className="py-2 px-3">Editor</th>
                <th className="py-2 px-3">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-text-secondary">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-text-primary">Permanent Ownership & Non-removable status</td>
                <td className="py-2.5 px-3 text-status-success font-mono font-bold">✓ Full Permanent</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-text-primary">Manage Other Administrators (Create, Role, Delete)</td>
                <td className="py-2.5 px-3 text-status-success font-mono font-bold">✓ Yes</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-text-primary">Projects & Articles: Create, Edit & Delete</td>
                <td className="py-2.5 px-3 text-status-success font-mono font-bold">✓ Yes</td>
                <td className="py-2.5 px-3 text-status-success font-mono">✓ Yes</td>
                <td className="py-2.5 px-3 text-status-warning font-mono">✓ Create & Edit</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">Read Only</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-text-primary">Broadcast Announcements & Site Settings</td>
                <td className="py-2.5 px-3 text-status-success font-mono font-bold">✓ Yes</td>
                <td className="py-2.5 px-3 text-status-success font-mono">✓ Yes</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">Read Only</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-text-primary">Contact Messages Inbox & Starred Inquiries</td>
                <td className="py-2.5 px-3 text-status-success font-mono font-bold">✓ Yes</td>
                <td className="py-2.5 px-3 text-status-success font-mono">✓ Yes</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
                <td className="py-2.5 px-3 text-text-muted font-mono">—</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-text-primary">Security Audit Trail</td>
                <td className="py-2.5 px-3 text-status-success font-mono font-bold">✓ Full Access</td>
                <td className="py-2.5 px-3 text-status-success font-mono">✓ View</td>
                <td className="py-2.5 px-3 text-status-success font-mono">✓ View</td>
                <td className="py-2.5 px-3 text-status-success font-mono">✓ View</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Provision Sub-Admin */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-6 shadow-2xl relative">
            {createdRecoveryKey ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-status-success/10 text-status-success flex items-center justify-center mx-auto mb-3">
                    <Check size={24} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-text-primary">Sub-Admin Provisioned</h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Provide the emergency recovery key to the new user.
                  </p>
                </div>

                <div className="p-3 bg-surface-elevated border border-border rounded-xl">
                  <div className="text-[10px] font-mono text-text-muted mb-1">EMERGENCY RECOVERY KEY</div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono font-bold text-accent-bright break-all">
                      {createdRecoveryKey}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(createdRecoveryKey);
                        toast.success('Recovery key copied');
                      }}
                      className="p-1.5 rounded-lg bg-card-bg border border-border text-xs font-mono hover:border-accent-primary"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-2.5 rounded-xl bg-accent-primary text-white text-xs font-mono font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-display font-bold text-text-primary flex items-center gap-2">
                    <UserPlus size={18} className="text-accent-primary" />
                    <span>Provision Secondary Administrator</span>
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-text-muted hover:text-text-primary text-sm font-mono"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-text-secondary uppercase mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g. alex_editor"
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-secondary uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-secondary uppercase mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-secondary uppercase mb-1">
                      Assigned Role *
                    </label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as AdminRole)}
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                    >
                      <option value="admin">Admin — Content & Settings Management</option>
                      <option value="editor">Editor — Create & Edit Articles/Projects</option>
                      <option value="viewer">Viewer — Read-Only Analytics & Logs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-secondary uppercase mb-1">
                      Initial Password * (min 8 chars)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-secondary uppercase mb-1">
                      Notes / Scope
                    </label>
                    <input
                      type="text"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="e.g. Guest editor for technical articles"
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-xl border border-border text-text-secondary hover:text-text-primary text-xs font-mono transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-hover text-white text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
                    >
                      {actionLoading && <Loader2 size={13} className="animate-spin" />}
                      <span>Create Account</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
