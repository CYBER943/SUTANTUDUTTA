import React, { useState, useEffect } from 'react';
import { adminApi, AuthStatus } from '../../services/adminApi';
import AdminSetup from './AdminSetup';
import AdminLogin from './AdminLogin';
import AdminRecovery from './AdminRecovery';
import AdminDashboard from './AdminDashboard';
import { Loader2 } from 'lucide-react';

interface AdminRootProps {
  onNavigateToPublic: () => void;
}

export default function AdminRoot({ onNavigateToPublic }: AdminRootProps) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<AuthStatus>({ isSetup: true, isAuthenticated: false });
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [view, setView] = useState<'auto' | 'login' | 'setup' | 'recovery'>('auto');

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await adminApi.checkStatus();
      setStatus(res);
      if (res.isAuthenticated) {
        setCurrentAdmin({ username: res.username });
      }
    } catch {
      setStatus({ isSetup: true, isAuthenticated: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-bg-primary flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
          Verifying Encrypted Admin Gate...
        </span>
      </div>
    );
  }

  // Not yet bootstrapped -> force one-time setup
  if (!status.isSetup || view === 'setup') {
    return (
      <AdminSetup
        onSuccess={(admin) => {
          setStatus({ isSetup: true, isAuthenticated: true, username: admin.username });
          setCurrentAdmin(admin);
          setView('auto');
        }}
        onNavigateToPublic={onNavigateToPublic}
      />
    );
  }

  // Recovery flow
  if (view === 'recovery') {
    return (
      <AdminRecovery
        onSuccess={() => {
          setView('login');
          checkAuth();
        }}
        onNavigateToLogin={() => setView('login')}
        onNavigateToPublic={onNavigateToPublic}
      />
    );
  }

  // Authenticated -> show Dashboard
  if (status.isAuthenticated) {
    return (
      <AdminDashboard
        currentAdmin={currentAdmin}
        onLogout={() => {
          setStatus({ ...status, isAuthenticated: false });
          setView('login');
        }}
        onNavigateToPublic={onNavigateToPublic}
      />
    );
  }

  // Otherwise -> show Login
  return (
    <AdminLogin
      onSuccess={(admin) => {
        setStatus({ isSetup: true, isAuthenticated: true, username: admin.username });
        setCurrentAdmin(admin);
        setView('auto');
      }}
      onNavigateToSetup={!status.isSetup ? () => setView('setup') : undefined}
      onNavigateToRecovery={() => setView('recovery')}
      onNavigateToPublic={onNavigateToPublic}
    />
  );
}
