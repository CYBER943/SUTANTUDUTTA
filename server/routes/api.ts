import { Router, Request, Response } from 'express';
import { db, ProjectItem, BlogPostItem, ContactMessageItem, SiteSettings } from '../db';
import {
  checkLoginRateLimit,
  recordFailedLogin,
  resetFailedLogin,
  hashPassword,
  verifyPassword,
  generateToken,
  generateRecoveryKey,
  hashRecoveryKey,
  verifyRecoveryKey,
  verifyToken,
  requireAdminAuth,
  AuthenticatedRequest
} from '../auth';

const router = Router();

// Helper to get client IP
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
}

/* -------------------------------------------------------------
 * 1. PUBLIC ROUTES (No Auth Required)
 * ------------------------------------------------------------- */

// GET /api/public/data - Get dynamic content for portfolio sections
router.get('/public/data', (_req: Request, res: Response) => {
  const data = db.get();
  // Filter published blog posts for public view
  const publishedBlog = data.blog.filter(b => b.published !== false);
  // Sort projects by order
  const sortedProjects = [...data.projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  res.json({
    settings: data.settings,
    projects: sortedProjects,
    blog: publishedBlog,
    announcement: data.settings.announcement
  });
});

// POST /api/public/messages - Receive contact form messages
router.post('/public/messages', (req: Request, res: Response) => {
  const { name, email, message, honeypot, browser, os } = req.body;

  // Honeypot check for bots
  if (honeypot) {
    res.status(200).json({ success: true, message: 'Message sent.' });
    return;
  }

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required fields.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const ip = getClientIp(req);
  const data = db.get();

  const newMessage: ContactMessageItem = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim().substring(0, 100),
    email: String(email).trim().toLowerCase().substring(0, 150),
    message: String(message).trim().substring(0, 5000),
    createdAt: new Date().toISOString(),
    read: false,
    starred: false,
    browser: browser ? String(browser).substring(0, 50) : undefined,
    os: os ? String(os).substring(0, 50) : undefined,
    ip
  };

  data.messages.unshift(newMessage);
  db.write(data);
  db.logAudit('MESSAGE_RECEIVED', `New message received from ${newMessage.name} (${newMessage.email})`, ip);

  res.status(201).json({ success: true, message: 'Message successfully received by Sutantu Dutta.' });
});

/* -------------------------------------------------------------
 * 2. AUTHENTICATION & SETUP ROUTES
 * ------------------------------------------------------------- */

// GET /api/admin/auth/status - Check if system is bootstrapped and if current user is logged in
router.get('/admin/auth/status', (req: Request, res: Response) => {
  const data = db.get();
  const isSetup = !!data.admin;

  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.cookies?.admin_token) {
    token = req.cookies.admin_token;
  }

  let isAuthenticated = false;
  let username: string | undefined;

  if (token && isSetup) {
    const payload = verifyToken(token);
    if (payload && payload.adminId === data.admin?.id) {
      isAuthenticated = true;
      username = data.admin.username;
    }
  }

  res.json({
    isSetup,
    isAuthenticated,
    username
  });
});

// POST /api/admin/auth/setup - One-time initial administrator bootstrap
router.post('/admin/auth/setup', async (req: Request, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);

  // Strictly enforce one-time setup: disable once created
  if (data.admin) {
    res.status(403).json({ error: 'Setup is locked: An administrator account has already been initialized.' });
    return;
  }

  const { username, email, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    res.status(400).json({ error: 'Username must be at least 3 characters long.' });
    return;
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    return;
  }

  try {
    const passwordHash = await hashPassword(password);
    const rawRecoveryKey = generateRecoveryKey();
    const recoveryKeyHash = hashRecoveryKey(rawRecoveryKey);

    const adminUser = {
      id: `admin_${Date.now()}`,
      username: username.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      recoveryKeyHash,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    data.admin = adminUser;
    db.write(data);
    db.logAudit('ADMIN_BOOTSTRAP', `Administrator account initialized for ${adminUser.username} (${adminUser.email})`, ip);

    const token = generateToken({
      adminId: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      role: 'superadmin'
    }, false);

    // Set secure cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      token,
      recoveryKey: rawRecoveryKey,
      admin: {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: `Setup failed: ${err.message}` });
  }
});

// POST /api/admin/auth/login - Administrator login with brute-force rate limiting
router.post('/admin/auth/login', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const data = db.get();

  if (!data.admin) {
    res.status(400).json({ error: 'Administrator has not been set up yet. Please complete initial setup.' });
    return;
  }

  // Rate limiting check
  const rateCheck = checkLoginRateLimit(ip);
  if (!rateCheck.allowed) {
    res.status(429).json({
      error: `Too many failed login attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`
    });
    return;
  }

  const { usernameOrEmail, password, rememberMe } = req.body;

  if (!usernameOrEmail || !password) {
    res.status(400).json({ error: 'Username/Email and password are required.' });
    return;
  }

  const target = String(usernameOrEmail).trim().toLowerCase();
  const adminMatches = (
    data.admin.username.toLowerCase() === target ||
    data.admin.email.toLowerCase() === target
  );

  let isMatch = false;
  if (adminMatches) {
    isMatch = await verifyPassword(password, data.admin.passwordHash);
  }

  if (!isMatch) {
    const rateResult = recordFailedLogin(ip);
    db.logAudit('FAILED_LOGIN_ATTEMPT', `Failed login attempt for identifier '${usernameOrEmail}'`, ip);

    if (rateResult.locked) {
      res.status(429).json({
        error: `Too many failed login attempts. Account locked for 15 minutes.`
      });
      return;
    }

    res.status(401).json({
      error: `Invalid credentials. (${rateResult.remainingAttempts} attempts remaining before temporary lockout)`
    });
    return;
  }

  // Successful login: reset rate limit and record timestamp
  resetFailedLogin(ip);
  data.admin.lastLoginAt = new Date().toISOString();
  db.write(data);
  db.logAudit('ADMIN_LOGIN_SUCCESS', `Administrator ${data.admin.username} logged in successfully`, ip);

  const token = generateToken({
    adminId: data.admin.id,
    username: data.admin.username,
    email: data.admin.email,
    role: 'superadmin'
  }, !!rememberMe);

  const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000;

  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge
  });

  res.json({
    success: true,
    token,
    admin: {
      id: data.admin.id,
      username: data.admin.username,
      email: data.admin.email,
      lastLoginAt: data.admin.lastLoginAt
    }
  });
});

// POST /api/admin/auth/recover - Password reset using recovery key
router.post('/admin/auth/recover', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const data = db.get();

  if (!data.admin) {
    res.status(400).json({ error: 'Administrator account not set up yet.' });
    return;
  }

  const { recoveryKey, newPassword } = req.body;

  if (!recoveryKey || typeof recoveryKey !== 'string') {
    res.status(400).json({ error: 'Recovery key is required.' });
    return;
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  const isKeyValid = verifyRecoveryKey(recoveryKey, data.admin.recoveryKeyHash);
  if (!isKeyValid) {
    db.logAudit('RECOVERY_KEY_FAILURE', 'Invalid recovery key attempted', ip);
    res.status(401).json({ error: 'Invalid recovery key.' });
    return;
  }

  const newPasswordHash = await hashPassword(newPassword);
  const newRecoveryKey = generateRecoveryKey();
  const newRecoveryKeyHash = hashRecoveryKey(newRecoveryKey);

  data.admin.passwordHash = newPasswordHash;
  data.admin.recoveryKeyHash = newRecoveryKeyHash;
  db.write(data);
  db.logAudit('ADMIN_PASSWORD_RECOVERED', `Password reset successfully via recovery key`, ip);

  res.json({
    success: true,
    message: 'Password successfully reset. A new recovery key has been generated.',
    newRecoveryKey
  });
});

// POST /api/admin/auth/logout - Log out
router.post('/admin/auth/logout', (req: Request, res: Response) => {
  const ip = getClientIp(req);
  res.clearCookie('admin_token');
  db.logAudit('ADMIN_LOGOUT', 'Administrator logged out', ip);
  res.json({ success: true, message: 'Logged out successfully.' });
});

/* -------------------------------------------------------------
 * 3. PROTECTED ADMIN ROUTES (requireAdminAuth)
 * ------------------------------------------------------------- */

// Change Password
router.post('/admin/auth/change-password', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const data = db.get();
  const ip = getClientIp(req);

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Current password and new password are required.' });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  const isMatch = await verifyPassword(currentPassword, data.admin!.passwordHash);
  if (!isMatch) {
    res.status(401).json({ error: 'Current password is incorrect.' });
    return;
  }

  data.admin!.passwordHash = await hashPassword(newPassword);
  db.write(data);
  db.logAudit('PASSWORD_CHANGED', `Administrator password changed`, ip);

  res.json({ success: true, message: 'Password changed successfully.' });
});

// Regenerate Recovery Key
router.post('/admin/auth/regenerate-recovery-key', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);

  const rawRecoveryKey = generateRecoveryKey();
  data.admin!.recoveryKeyHash = hashRecoveryKey(rawRecoveryKey);
  db.write(data);
  db.logAudit('RECOVERY_KEY_REGENERATED', `Security recovery key regenerated`, ip);

  res.json({ success: true, recoveryKey: rawRecoveryKey });
});

// GET /api/admin/dashboard-stats - Overview metrics
router.get('/admin/dashboard-stats', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();

  const totalProjects = data.projects.length;
  const totalBlog = data.blog.length;
  const publishedBlog = data.blog.filter(b => b.published !== false).length;
  const totalMessages = data.messages.length;
  const unreadMessages = data.messages.filter(m => !m.read).length;
  const starredMessages = data.messages.filter(m => m.starred).length;

  res.json({
    metrics: {
      totalProjects,
      totalBlog,
      publishedBlog,
      totalMessages,
      unreadMessages,
      starredMessages,
      lastLoginAt: data.admin?.lastLoginAt
    },
    recentAuditLogs: data.auditLogs.slice(0, 10),
    recentMessages: data.messages.slice(0, 5),
    settings: data.settings
  });
});

/* -------------------------------------------------------------
 * 4. PROJECTS MANAGEMENT
 * ------------------------------------------------------------- */

router.get('/admin/projects', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const sorted = [...data.projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  res.json(sorted);
});

router.post('/admin/projects', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const { title, description, category, tech, link, codepen, github, image, featured } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required.' });
    return;
  }

  const nextId = data.projects.length > 0 ? Math.max(...data.projects.map(p => p.id)) + 1 : 1;
  const nextOrder = data.projects.length > 0 ? Math.max(...data.projects.map(p => p.order ?? 0)) + 1 : 1;

  const newProject: ProjectItem = {
    id: nextId,
    title: String(title).trim(),
    description: String(description).trim(),
    category: category ? String(category).trim() : 'WEB / EXPERIMENT',
    tech: Array.isArray(tech) ? tech.map(t => String(t).trim()).filter(Boolean) : ['HTML', 'CSS', 'JavaScript'],
    link: link ? String(link).trim() : '',
    codepen: codepen ? String(codepen).trim() : undefined,
    github: github ? String(github).trim() : undefined,
    image: image ? String(image).trim() : undefined,
    featured: !!featured,
    order: nextOrder,
    createdAt: new Date().toISOString()
  };

  data.projects.push(newProject);
  db.write(data);
  db.logAudit('PROJECT_CREATED', `Created project: "${newProject.title}" (ID: ${newProject.id})`, ip);

  res.status(201).json(newProject);
});

router.put('/admin/projects/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = parseInt(req.params.id, 10);

  const idx = data.projects.findIndex(p => p.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  const existing = data.projects[idx];
  const { title, description, category, tech, link, codepen, github, image, featured, order } = req.body;

  data.projects[idx] = {
    ...existing,
    title: title !== undefined ? String(title).trim() : existing.title,
    description: description !== undefined ? String(description).trim() : existing.description,
    category: category !== undefined ? String(category).trim() : existing.category,
    tech: Array.isArray(tech) ? tech.map(t => String(t).trim()).filter(Boolean) : existing.tech,
    link: link !== undefined ? String(link).trim() : existing.link,
    codepen: codepen !== undefined ? String(codepen).trim() : existing.codepen,
    github: github !== undefined ? String(github).trim() : existing.github,
    image: image !== undefined ? String(image).trim() : existing.image,
    featured: featured !== undefined ? !!featured : existing.featured,
    order: order !== undefined ? Number(order) : existing.order
  };

  db.write(data);
  db.logAudit('PROJECT_UPDATED', `Updated project: "${data.projects[idx].title}" (ID: ${id})`, ip);

  res.json(data.projects[idx]);
});

router.delete('/admin/projects/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = parseInt(req.params.id, 10);

  const idx = data.projects.findIndex(p => p.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  const [removed] = data.projects.splice(idx, 1);
  db.write(data);
  db.logAudit('PROJECT_DELETED', `Deleted project: "${removed.title}" (ID: ${id})`, ip);

  res.json({ success: true, removed });
});

router.post('/admin/projects/reorder', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const { projectIds } = req.body;

  if (!Array.isArray(projectIds)) {
    res.status(400).json({ error: 'projectIds must be an array of IDs.' });
    return;
  }

  projectIds.forEach((id: number, idx: number) => {
    const proj = data.projects.find(p => p.id === id);
    if (proj) {
      proj.order = idx + 1;
    }
  });

  db.write(data);
  db.logAudit('PROJECTS_REORDERED', `Reordered ${projectIds.length} projects`, ip);

  res.json({ success: true, projects: data.projects });
});

/* -------------------------------------------------------------
 * 5. BLOG / ARTICLES MANAGEMENT
 * ------------------------------------------------------------- */

router.get('/admin/blog', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.blog);
});

router.post('/admin/blog', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const { title, excerpt, content, category, readTime, image, published, date } = req.body;

  if (!title || !excerpt) {
    res.status(400).json({ error: 'Title and excerpt are required.' });
    return;
  }

  const nextId = data.blog.length > 0 ? Math.max(...data.blog.map(b => b.id)) + 1 : 1;
  const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const newPost: BlogPostItem = {
    id: nextId,
    title: String(title).trim(),
    excerpt: String(excerpt).trim(),
    content: content ? String(content).trim() : '',
    category: category ? String(category).trim() : 'AI',
    readTime: readTime ? String(readTime).trim() : '5 min read',
    image: image ? String(image).trim() : 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=800',
    published: published !== false,
    date: date ? String(date).trim() : nowStr,
    createdAt: new Date().toISOString()
  };

  data.blog.unshift(newPost);
  db.write(data);
  db.logAudit('ARTICLE_CREATED', `Created article: "${newPost.title}" (ID: ${newPost.id})`, ip);

  res.status(201).json(newPost);
});

router.put('/admin/blog/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = parseInt(req.params.id, 10);

  const idx = data.blog.findIndex(b => b.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Article not found.' });
    return;
  }

  const existing = data.blog[idx];
  const { title, excerpt, content, category, readTime, image, published, date } = req.body;

  data.blog[idx] = {
    ...existing,
    title: title !== undefined ? String(title).trim() : existing.title,
    excerpt: excerpt !== undefined ? String(excerpt).trim() : existing.excerpt,
    content: content !== undefined ? String(content).trim() : existing.content,
    category: category !== undefined ? String(category).trim() : existing.category,
    readTime: readTime !== undefined ? String(readTime).trim() : existing.readTime,
    image: image !== undefined ? String(image).trim() : existing.image,
    published: published !== undefined ? !!published : existing.published,
    date: date !== undefined ? String(date).trim() : existing.date
  };

  db.write(data);
  db.logAudit('ARTICLE_UPDATED', `Updated article: "${data.blog[idx].title}" (ID: ${id})`, ip);

  res.json(data.blog[idx]);
});

router.delete('/admin/blog/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = parseInt(req.params.id, 10);

  const idx = data.blog.findIndex(b => b.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Article not found.' });
    return;
  }

  const [removed] = data.blog.splice(idx, 1);
  db.write(data);
  db.logAudit('ARTICLE_DELETED', `Deleted article: "${removed.title}" (ID: ${id})`, ip);

  res.json({ success: true, removed });
});

/* -------------------------------------------------------------
 * 6. CONTACT MESSAGES INBOX
 * ------------------------------------------------------------- */

router.get('/admin/messages', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.messages);
});

router.patch('/admin/messages/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const id = req.params.id;
  const { read, starred } = req.body;

  const msg = data.messages.find(m => m.id === id);
  if (!msg) {
    res.status(404).json({ error: 'Message not found.' });
    return;
  }

  if (read !== undefined) msg.read = !!read;
  if (starred !== undefined) msg.starred = !!starred;

  db.write(data);
  res.json(msg);
});

router.post('/admin/messages/mark-all-read', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);

  data.messages.forEach(m => { m.read = true; });
  db.write(data);
  db.logAudit('MESSAGES_MARK_ALL_READ', 'Marked all messages as read', ip);

  res.json({ success: true, count: data.messages.length });
});

router.delete('/admin/messages/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = req.params.id;

  const idx = data.messages.findIndex(m => m.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Message not found.' });
    return;
  }

  const [removed] = data.messages.splice(idx, 1);
  db.write(data);
  db.logAudit('MESSAGE_DELETED', `Deleted message from ${removed.name} (${removed.email})`, ip);

  res.json({ success: true, removed });
});

/* -------------------------------------------------------------
 * 7. SETTINGS & ANNOUNCEMENTS
 * ------------------------------------------------------------- */

router.get('/admin/settings', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.settings);
});

router.put('/admin/settings', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const updates: Partial<SiteSettings> = req.body;

  data.settings = {
    ...data.settings,
    ...updates,
    announcement: {
      ...data.settings.announcement,
      ...(updates.announcement || {})
    }
  };

  db.write(data);
  db.logAudit('SETTINGS_UPDATED', 'Updated portfolio website settings', ip);

  res.json(data.settings);
});

/* -------------------------------------------------------------
 * 8. SECURITY AUDIT LOGS
 * ------------------------------------------------------------- */

router.get('/admin/audit-logs', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.auditLogs);
});

export default router;
