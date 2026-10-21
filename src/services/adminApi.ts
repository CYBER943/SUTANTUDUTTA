// API Client for Portfolio and Admin Control Center

export interface AuthStatus {
  isSetup: boolean;
  isAuthenticated: boolean;
  username?: string;
}

export interface LoginResult {
  success: boolean;
  token?: string;
  admin?: {
    id: string;
    username: string;
    email: string;
    lastLoginAt?: string;
  };
  error?: string;
}

export interface SetupResult {
  success: boolean;
  token?: string;
  recoveryKey?: string;
  admin?: {
    id: string;
    username: string;
    email: string;
  };
  error?: string;
}

const TOKEN_KEY = 'sd_admin_token';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY)
};

function getAuthHeaders(): HeadersInit {
  const token = authStorage.getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const adminApi = {
  // Public
  async getPublicData() {
    try {
      const res = await fetch('/api/public/data');
      if (!res.ok) throw new Error('Failed to fetch public data');
      return await res.json();
    } catch (err) {
      console.warn('[API] Could not fetch remote public data, using local fallback:', err);
      return null;
    }
  },

  async submitContactMessage(payload: { name: string; email: string; message: string; browser?: string; os?: string; honeypot?: string }) {
    const res = await fetch('/api/public/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Auth Status & Setup
  async checkStatus(): Promise<AuthStatus> {
    try {
      const res = await fetch('/api/admin/auth/status', {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Status check failed');
      return await res.json();
    } catch {
      return { isSetup: true, isAuthenticated: false };
    }
  },

  async setup(payload: { username: string; email: string; password: string }): Promise<SetupResult> {
    const res = await fetch('/api/admin/auth/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      authStorage.setToken(data.token);
    }
    return { ...data, success: res.ok };
  },

  async login(payload: { usernameOrEmail: string; password: string; rememberMe?: boolean }): Promise<LoginResult> {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      authStorage.setToken(data.token);
    }
    return { ...data, success: res.ok };
  },

  async recover(payload: { recoveryKey: string; newPassword: string }) {
    const res = await fetch('/api/admin/auth/recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async logout() {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.error(err);
    }
    authStorage.clearToken();
  },

  async changePassword(payload: { currentPassword: string; newPassword: string }) {
    const res = await fetch('/api/admin/auth/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async regenerateRecoveryKey() {
    const res = await fetch('/api/admin/auth/regenerate-recovery-key', {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Dashboard Stats
  async getDashboardStats() {
    const res = await fetch('/api/admin/dashboard-stats', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  // Projects
  async getProjects() {
    const res = await fetch('/api/admin/projects', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async createProject(project: any) {
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    return res.json();
  },

  async updateProject(id: number, project: any) {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    return res.json();
  },

  async deleteProject(id: number) {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async reorderProjects(projectIds: number[]) {
    const res = await fetch('/api/admin/projects/reorder', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ projectIds })
    });
    return res.json();
  },

  // Blog
  async getBlogPosts() {
    const res = await fetch('/api/admin/blog', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  },

  async createBlogPost(post: any) {
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(post)
    });
    return res.json();
  },

  async updateBlogPost(id: number, post: any) {
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(post)
    });
    return res.json();
  },

  async deleteBlogPost(id: number) {
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Messages
  async getMessages() {
    const res = await fetch('/api/admin/messages', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  async updateMessageStatus(id: string, updates: { read?: boolean; starred?: boolean }) {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  async markAllMessagesRead() {
    const res = await fetch('/api/admin/messages/mark-all-read', {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async deleteMessage(id: string) {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Settings
  async getSettings() {
    const res = await fetch('/api/admin/settings', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings: any) {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  // Audit Logs
  async getAuditLogs() {
    const res = await fetch('/api/admin/audit-logs', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  }
};
