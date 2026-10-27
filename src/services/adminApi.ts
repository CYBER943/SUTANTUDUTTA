// API Client for Portfolio and Admin Control Center
// Robust JSON and HTTP status handling to prevent JSON parse crashes

export type AdminRole = 'superadmin' | 'admin' | 'editor' | 'viewer';

export interface AdminUserRecord {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: AdminRole;
  isSuperAdmin: boolean;
  isActivated: boolean;
  status: 'active' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
  notes?: string;
}

export interface AuthStatus {
  isSetup: boolean;
  isActivated?: boolean;
  isAuthenticated: boolean;
  superAdminEmail?: string;
  superAdminName?: string;
  username?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    role: AdminRole;
    isSuperAdmin: boolean;
  } | null;
}

export interface LoginResult {
  success: boolean;
  token?: string;
  admin?: {
    id: string;
    username: string;
    email: string;
    displayName?: string;
    role: AdminRole;
    isSuperAdmin?: boolean;
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
    displayName?: string;
    role: AdminRole;
    isSuperAdmin?: boolean;
  };
  error?: string;
}

const TOKEN_KEY = 'sd_admin_token';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY)
};

function getAuthHeaders(): Record<string, string> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Resilient API Request Wrapper
 * Checks Content-Type, HTTP status codes, and network exceptions.
 * NEVER allows `Unexpected token 'T', "The page c"... is not valid JSON` to crash the client.
 */
async function safeRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data?: T; error?: string; [key: string]: any }> {
  try {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    const token = authStorage.getToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    const contentType = response.headers.get('content-type') || '';
    let parsedData: any = null;

    if (contentType.includes('application/json')) {
      try {
        parsedData = await response.json();
      } catch (jsonErr: any) {
        return {
          ok: false,
          status: response.status,
          error: `Invalid JSON response received: ${jsonErr.message}`
        };
      }
    } else {
      // Non-JSON response (e.g. HTML 404/500, gateway text, or IIS error)
      const rawText = await response.text();
      let friendlyError = 'The backend server returned an unexpected non-JSON response.';
      if (response.status === 404) {
        friendlyError = 'API endpoint not found (HTTP 404). Please ensure the backend server is running.';
      } else if (response.status === 502 || response.status === 503) {
        friendlyError = 'Backend service is starting or temporarily unavailable. Please try again in a moment.';
      } else if (response.status >= 500) {
        friendlyError = `Server internal error (HTTP ${response.status}).`;
      } else if (rawText && rawText.length < 150 && !rawText.includes('<html')) {
        friendlyError = rawText;
      }

      return {
        ok: false,
        status: response.status,
        error: friendlyError
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: parsedData?.error || parsedData?.message || `Request failed with HTTP ${response.status}`,
        ...parsedData
      };
    }

    return {
      ok: true,
      status: response.status,
      data: parsedData,
      ...parsedData
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      error: `Network error: ${err.message || 'Unable to connect to backend server. Please verify your connection.'}`
    };
  }
}

export const adminApi = {
  // Public
  async getPublicData() {
    try {
      const res = await safeRequest('/api/public/data');
      if (!res.ok) throw new Error(res.error || 'Failed to fetch public data');
      return res.data || res;
    } catch (err) {
      console.warn('[API] Could not fetch remote public data, using local fallback:', err);
      return null;
    }
  },

  async submitContactMessage(payload: { name: string; email: string; message: string; browser?: string; os?: string; honeypot?: string }) {
    return safeRequest('/api/public/messages', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Auth Status & Setup
  async checkStatus(): Promise<AuthStatus> {
    try {
      const res = await safeRequest<AuthStatus>('/api/admin/auth/status');
      if (!res.ok) {
        return { isSetup: true, isAuthenticated: false };
      }
      return {
        isSetup: !!res.isSetup,
        isActivated: res.isActivated,
        isAuthenticated: !!res.isAuthenticated,
        superAdminEmail: res.superAdminEmail,
        superAdminName: res.superAdminName,
        username: res.username || res.user?.username,
        user: res.user
      };
    } catch {
      return { isSetup: true, isAuthenticated: false };
    }
  },

  async setup(payload: { password: string; confirmPassword?: string }): Promise<SetupResult> {
    const res = await safeRequest('/api/admin/auth/setup', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.ok && res.token) {
      authStorage.setToken(res.token);
    }

    return {
      success: res.ok,
      token: res.token,
      recoveryKey: res.recoveryKey,
      admin: res.admin,
      error: res.error
    };
  },

  async login(payload: { usernameOrEmail: string; password: string; rememberMe?: boolean }): Promise<LoginResult> {
    const res = await safeRequest('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.ok && res.token) {
      authStorage.setToken(res.token);
    }

    return {
      success: res.ok,
      token: res.token,
      admin: res.admin,
      error: res.error
    };
  },

  async recover(payload: { recoveryKey: string; newPassword: string; email?: string }) {
    return safeRequest('/api/admin/auth/recover', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async logout() {
    try {
      await safeRequest('/api/admin/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    authStorage.clearToken();
  },

  async changePassword(payload: { currentPassword: string; newPassword: string }) {
    return safeRequest('/api/admin/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async regenerateRecoveryKey() {
    return safeRequest('/api/admin/auth/regenerate-recovery-key', {
      method: 'POST'
    });
  },

  // Dashboard Stats
  async getDashboardStats() {
    const res = await safeRequest('/api/admin/dashboard-stats');
    if (!res.ok) throw new Error(res.error || 'Unauthorized');
    return res.data || res;
  },

  // Projects
  async getProjects() {
    const res = await safeRequest('/api/admin/projects');
    if (!res.ok) throw new Error(res.error || 'Failed to fetch projects');
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  async createProject(project: any) {
    const res = await safeRequest('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
    return res.data || res;
  },

  async updateProject(id: number, project: any) {
    const res = await safeRequest(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
    return res.data || res;
  },

  async deleteProject(id: number) {
    const res = await safeRequest(`/api/admin/projects/${id}`, {
      method: 'DELETE'
    });
    return res.data || res;
  },

  async reorderProjects(projectIds: number[]) {
    const res = await safeRequest('/api/admin/projects/reorder', {
      method: 'POST',
      body: JSON.stringify({ projectIds })
    });
    return res.data || res;
  },

  // Blog
  async getBlogPosts() {
    const res = await safeRequest('/api/admin/blog');
    if (!res.ok) throw new Error(res.error || 'Failed to fetch blog posts');
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  async createBlogPost(post: any) {
    const res = await safeRequest('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify(post)
    });
    return res.data || res;
  },

  async updateBlogPost(id: number, post: any) {
    const res = await safeRequest(`/api/admin/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post)
    });
    return res.data || res;
  },

  async deleteBlogPost(id: number) {
    const res = await safeRequest(`/api/admin/blog/${id}`, {
      method: 'DELETE'
    });
    return res.data || res;
  },

  // Messages
  async getMessages() {
    const res = await safeRequest('/api/admin/messages');
    if (!res.ok) throw new Error(res.error || 'Failed to fetch messages');
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  async updateMessageStatus(id: string, updates: { read?: boolean; starred?: boolean }) {
    const res = await safeRequest(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    return res.data || res;
  },

  async markAllMessagesRead() {
    const res = await safeRequest('/api/admin/messages/mark-all-read', {
      method: 'POST'
    });
    return res.data || res;
  },

  async deleteMessage(id: string) {
    const res = await safeRequest(`/api/admin/messages/${id}`, {
      method: 'DELETE'
    });
    return res.data || res;
  },

  // Settings
  async getSettings() {
    const res = await safeRequest('/api/admin/settings');
    if (!res.ok) throw new Error(res.error || 'Failed to fetch settings');
    return res.data || res;
  },

  async updateSettings(settings: any) {
    const res = await safeRequest('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
    return res.data || res;
  },

  // Audit Logs
  async getAuditLogs() {
    const res = await safeRequest('/api/admin/audit-logs');
    if (!res.ok) throw new Error(res.error || 'Failed to fetch audit logs');
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  // RBAC: Admin Users Management (Super Admin only for create/edit/delete)
  async getUsers(): Promise<AdminUserRecord[]> {
    const res = await safeRequest<AdminUserRecord[]>('/api/admin/users');
    if (!res.ok) throw new Error(res.error || 'Failed to fetch administrator accounts');
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  async createUser(payload: { username: string; email: string; displayName?: string; password: string; role: AdminRole; notes?: string }) {
    return safeRequest('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async updateUser(id: string, payload: { role?: AdminRole; status?: 'active' | 'suspended'; displayName?: string; notes?: string }) {
    return safeRequest(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },

  async deleteUser(id: string) {
    return safeRequest(`/api/admin/users/${id}`, {
      method: 'DELETE'
    });
  }
};
