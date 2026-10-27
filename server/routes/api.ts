import { Router, Request, Response } from 'express';
import { 
  db, 
  ProjectItem, 
  BlogPostItem, 
  ContactMessageItem, 
  SiteSettings, 
  AdminUser, 
  AdminRole,
  PERMANENT_SUPER_ADMIN_EMAIL,
  PERMANENT_SUPER_ADMIN_USERNAME,
  PERMANENT_SUPER_ADMIN_NAME,
  PERMANENT_SUPER_ADMIN_ID
} from '../db';
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
  requireRole,
  requireSuperAdmin,
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
  const publishedBlog = data.blog.filter(b => b.published !== false);
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
  
  // Sutantu Dutta is the permanent Super Admin
  const sutantu = data.admins.find(
    a => a.email.toLowerCase() === PERMANENT_SUPER_ADMIN_EMAIL.toLowerCase() || a.id === PERMANENT_SUPER_ADMIN_ID
  ) || data.admin;

  const isActivated = !!(sutantu && sutantu.isActivated && sutantu.passwordHash);

  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.cookies?.admin_token) {
    token = req.cookies.admin_token;
  }

  let isAuthenticated = false;
  let userPayload: any = null;

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      const matched = data.admins.find(a => a.id === payload.adminId);
      if (matched && matched.status !== 'suspended') {
        isAuthenticated = true;
        userPayload = {
          id: matched.id,
          username: matched.username,
          email: matched.email,
          displayName: matched.displayName || matched.username,
          role: matched.role,
          isSuperAdmin: matched.isSuperAdmin
        };
      }
    }
  }

  res.json({
    isSetup: isActivated,
    isActivated,
    isAuthenticated,
    superAdminEmail: PERMANENT_SUPER_ADMIN_EMAIL,
    superAdminName: PERMANENT_SUPER_ADMIN_NAME,
    user: userPayload,
    username: userPayload?.username
  });
});

// POST /api/admin/auth/setup - First-time Super Admin Master Password Activation for Sutantu Dutta
router.post('/admin/auth/setup', async (req: Request, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);

  let sutantu = data.admins.find(
    a => a.email.toLowerCase() === PERMANENT_SUPER_ADMIN_EMAIL.toLowerCase() || a.id === PERMANENT_SUPER_ADMIN_ID
  );

  if (!sutantu) {
    sutantu = {
      id: PERMANENT_SUPER_ADMIN_ID,
      username: PERMANENT_SUPER_ADMIN_USERNAME,
      email: PERMANENT_SUPER_ADMIN_EMAIL,
      displayName: PERMANENT_SUPER_ADMIN_NAME,
      role: 'superadmin',
      isSuperAdmin: true,
      isActivated: false,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    data.admins.unshift(sutantu);
  }

  // If already activated, lock setup endpoint
  if (sutantu.isActivated && sutantu.passwordHash) {
    res.status(403).json({ 
      error: 'Activation locked: Permanent Super Admin Sutantu Dutta has already established a master password. Please use standard login or security key recovery.' 
    });
    return;
  }

  const { password, confirmPassword } = req.body;

  if (!password || typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ error: 'Master password must be at least 8 characters long.' });
    return;
  }

  if (confirmPassword && password !== confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match.' });
    return;
  }

  try {
    const passwordHash = await hashPassword(password);
    const rawRecoveryKey = generateRecoveryKey();
    const recoveryKeyHash = hashRecoveryKey(rawRecoveryKey);

    sutantu.passwordHash = passwordHash;
    sutantu.recoveryKeyHash = recoveryKeyHash;
    sutantu.isActivated = true;
    sutantu.role = 'superadmin';
    sutantu.isSuperAdmin = true;
    sutantu.status = 'active';
    sutantu.lastLoginAt = new Date().toISOString();

    data.admin = sutantu;
    db.write(data);
    db.logAudit('SUPERADMIN_ACTIVATED', `Super Admin master password activated for ${PERMANENT_SUPER_ADMIN_NAME} (${PERMANENT_SUPER_ADMIN_EMAIL})`, ip);

    const token = generateToken({
      adminId: sutantu.id,
      username: sutantu.username,
      email: sutantu.email,
      displayName: sutantu.displayName,
      role: 'superadmin',
      isSuperAdmin: true
    }, true);

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      token,
      recoveryKey: rawRecoveryKey,
      admin: {
        id: sutantu.id,
        username: sutantu.username,
        email: sutantu.email,
        displayName: sutantu.displayName,
        role: sutantu.role,
        isSuperAdmin: true
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: `Setup activation failed: ${err.message}` });
  }
});

// POST /api/admin/auth/login - Administrator login with brute-force rate limiting & RBAC
router.post('/admin/auth/login', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const data = db.get();

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

  // Find user in admins list
  const matchedUser = data.admins.find(
    a => a.username.toLowerCase() === target || a.email.toLowerCase() === target
  );

  if (!matchedUser) {
    const rateResult = recordFailedLogin(ip);
    db.logAudit('FAILED_LOGIN_ATTEMPT', `Failed login attempt: Identifier '${usernameOrEmail}' not found`, ip);

    if (rateResult.locked) {
      res.status(429).json({ error: 'Too many failed login attempts. Gateway locked for 15 minutes.' });
      return;
    }

    res.status(401).json({
      error: `Invalid credentials. (${rateResult.remainingAttempts} attempts remaining before temporary lockout)`
    });
    return;
  }

  // Check if account is not yet activated
  if (!matchedUser.isActivated || !matchedUser.passwordHash) {
    res.status(400).json({
      error: 'Super Admin master password has not been activated yet. Please complete initial setup.'
    });
    return;
  }

  // Check if suspended
  if (matchedUser.status === 'suspended') {
    res.status(403).json({ error: 'Account suspended: Please contact Super Admin Sutantu Dutta.' });
    return;
  }

  // Verify bcrypt password hash
  const isMatch = await verifyPassword(password, matchedUser.passwordHash);

  if (!isMatch) {
    const rateResult = recordFailedLogin(ip);
    db.logAudit('FAILED_LOGIN_ATTEMPT', `Failed login attempt for account '${matchedUser.email}'`, ip);

    if (rateResult.locked) {
      res.status(429).json({ error: 'Too many failed login attempts. Gateway locked for 15 minutes.' });
      return;
    }

    res.status(401).json({
      error: `Invalid credentials. (${rateResult.remainingAttempts} attempts remaining before temporary lockout)`
    });
    return;
  }

  // Successful login: reset rate limiter and record timestamp
  resetFailedLogin(ip);
  matchedUser.lastLoginAt = new Date().toISOString();
  db.write(data);
  db.logAudit('ADMIN_LOGIN_SUCCESS', `Administrator ${matchedUser.displayName || matchedUser.username} (${matchedUser.role}) logged in successfully`, ip);

  const token = generateToken({
    adminId: matchedUser.id,
    username: matchedUser.username,
    email: matchedUser.email,
    displayName: matchedUser.displayName,
    role: matchedUser.role,
    isSuperAdmin: matchedUser.isSuperAdmin || matchedUser.role === 'superadmin'
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
      id: matchedUser.id,
      username: matchedUser.username,
      email: matchedUser.email,
      displayName: matchedUser.displayName || matchedUser.username,
      role: matchedUser.role,
      isSuperAdmin: matchedUser.isSuperAdmin,
      lastLoginAt: matchedUser.lastLoginAt
    }
  });
});

// POST /api/admin/auth/recover - Password reset using recovery key
router.post('/admin/auth/recover', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const data = db.get();

  const { recoveryKey, newPassword, email } = req.body;

  if (!recoveryKey || typeof recoveryKey !== 'string') {
    res.status(400).json({ error: 'Recovery key is required.' });
    return;
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  // Find target admin (default to Sutantu Dutta if not provided)
  const targetEmail = email ? String(email).trim().toLowerCase() : PERMANENT_SUPER_ADMIN_EMAIL.toLowerCase();
  const targetAdmin = data.admins.find(a => a.email.toLowerCase() === targetEmail);

  if (!targetAdmin || !targetAdmin.recoveryKeyHash) {
    res.status(400).json({ error: 'No recovery key registered for this account.' });
    return;
  }

  const isKeyValid = verifyRecoveryKey(recoveryKey, targetAdmin.recoveryKeyHash);
  if (!isKeyValid) {
    db.logAudit('RECOVERY_KEY_FAILURE', `Invalid recovery key attempted for ${targetEmail}`, ip);
    res.status(401).json({ error: 'Invalid recovery key.' });
    return;
  }

  const newPasswordHash = await hashPassword(newPassword);
  const newRecoveryKey = generateRecoveryKey();
  const newRecoveryKeyHash = hashRecoveryKey(newRecoveryKey);

  targetAdmin.passwordHash = newPasswordHash;
  targetAdmin.recoveryKeyHash = newRecoveryKeyHash;
  targetAdmin.isActivated = true;
  db.write(data);
  db.logAudit('ADMIN_PASSWORD_RECOVERED', `Password reset successfully via recovery key for ${targetAdmin.email}`, ip);

  res.json({
    success: true,
    message: 'Master password successfully reset. A new emergency recovery key has been generated.',
    newRecoveryKey
  });
});

// POST /api/admin/auth/logout - Log out
router.post('/admin/auth/logout', (req: Request, res: Response) => {
  const ip = getClientIp(req);
  res.clearCookie('admin_token');
  db.logAudit('ADMIN_LOGOUT', 'Administrator session terminated', ip);
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

  const user = data.admins.find(a => a.id === req.admin!.adminId);
  if (!user || !user.passwordHash) {
    res.status(404).json({ error: 'User account not found.' });
    return;
  }

  const isMatch = await verifyPassword(currentPassword, user.passwordHash);
  if (!isMatch) {
    res.status(401).json({ error: 'Current password is incorrect.' });
    return;
  }

  user.passwordHash = await hashPassword(newPassword);
  db.write(data);
  db.logAudit('PASSWORD_CHANGED', `Password changed for user ${user.username}`, ip);

  res.json({ success: true, message: 'Password changed successfully.' });
});

// Regenerate Recovery Key
router.post('/admin/auth/regenerate-recovery-key', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);

  const user = data.admins.find(a => a.id === req.admin!.adminId);
  if (!user) {
    res.status(404).json({ error: 'User account not found.' });
    return;
  }

  const rawRecoveryKey = generateRecoveryKey();
  user.recoveryKeyHash = hashRecoveryKey(rawRecoveryKey);
  db.write(data);
  db.logAudit('RECOVERY_KEY_REGENERATED', `Security recovery key regenerated for ${user.username}`, ip);

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
  const totalAdmins = data.admins.length;

  const sutantu = data.admins.find(
    a => a.email.toLowerCase() === PERMANENT_SUPER_ADMIN_EMAIL.toLowerCase() || a.id === PERMANENT_SUPER_ADMIN_ID
  );

  res.json({
    metrics: {
      totalProjects,
      totalBlog,
      publishedBlog,
      totalMessages,
      unreadMessages,
      starredMessages,
      totalAdmins,
      lastLoginAt: sutantu?.lastLoginAt
    },
    recentAuditLogs: data.auditLogs.slice(0, 10),
    recentMessages: data.messages.slice(0, 5),
    settings: data.settings
  });
});

/* -------------------------------------------------------------
 * 4. RBAC: ADMIN USERS MANAGEMENT (Super Admin Only for modifications)
 * ------------------------------------------------------------- */

// GET /api/admin/users - List administrators
router.get('/admin/users', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  // Strip passwordHash and recoveryKeyHash
  const safeUsers = data.admins.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    displayName: u.displayName || u.username,
    role: u.role,
    isSuperAdmin: u.isSuperAdmin,
    isActivated: u.isActivated,
    status: u.status,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    notes: u.notes
  }));
  res.json(safeUsers);
});

// POST /api/admin/users - Create new secondary administrator (Super Admin only)
router.post('/admin/users', requireSuperAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const { username, email, displayName, password, role, notes } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email, and password are required.' });
    return;
  }

  const validRoles: AdminRole[] = ['admin', 'editor', 'viewer'];
  const assignedRole: AdminRole = validRoles.includes(role) ? role : 'editor';

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanUsername = String(username).trim().toLowerCase();

  // Prevent duplicate username/email
  const exists = data.admins.some(
    a => a.email.toLowerCase() === cleanEmail || a.username.toLowerCase() === cleanUsername
  );
  if (exists) {
    res.status(400).json({ error: 'An administrator with this email or username already exists.' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    return;
  }

  const passwordHash = await hashPassword(password);
  const rawRecoveryKey = generateRecoveryKey();
  const recoveryKeyHash = hashRecoveryKey(rawRecoveryKey);

  const newUser: AdminUser = {
    id: `admin_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    username: cleanUsername,
    email: cleanEmail,
    displayName: displayName ? String(displayName).trim() : cleanUsername,
    role: assignedRole,
    isSuperAdmin: false,
    isActivated: true,
    passwordHash,
    recoveryKeyHash,
    createdAt: new Date().toISOString(),
    status: 'active',
    notes: notes ? String(notes).trim() : undefined
  };

  data.admins.push(newUser);
  db.write(data);
  db.logAudit('USER_CREATED', `Super Admin created new ${newUser.role}: "${newUser.displayName}" (${newUser.email})`, ip);

  res.status(201).json({
    success: true,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role,
      isSuperAdmin: newUser.isSuperAdmin,
      status: newUser.status,
      createdAt: newUser.createdAt
    },
    recoveryKey: rawRecoveryKey
  });
});

// PUT /api/admin/users/:id - Update administrator role/status (Super Admin only)
router.put('/admin/users/:id', requireSuperAdmin, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = req.params.id;
  const { role, status, displayName, notes } = req.body;

  const user = data.admins.find(a => a.id === id);
  if (!user) {
    res.status(404).json({ error: 'Administrator account not found.' });
    return;
  }

  // IMMUTABLE SUPER ADMIN PROTECTION: Sutantu Dutta
  const isTargetSutantu = (
    user.id === PERMANENT_SUPER_ADMIN_ID ||
    user.email.toLowerCase() === PERMANENT_SUPER_ADMIN_EMAIL.toLowerCase() ||
    user.isSuperAdmin
  );

  if (isTargetSutantu) {
    if (role && role !== 'superadmin') {
      res.status(403).json({ 
        error: 'Forbidden: Sutantu Dutta is the Permanent Super Admin. Super Admin role cannot be demoted or modified.' 
      });
      return;
    }
    if (status && status !== 'active') {
      res.status(403).json({ 
        error: 'Forbidden: Sutantu Dutta is the Permanent Super Admin and cannot be suspended or deactivated.' 
      });
      return;
    }
  }

  if (displayName !== undefined) user.displayName = String(displayName).trim();
  if (notes !== undefined) user.notes = String(notes).trim();

  if (role && !isTargetSutantu) {
    const validRoles: AdminRole[] = ['admin', 'editor', 'viewer'];
    if (validRoles.includes(role)) {
      user.role = role;
    }
  }

  if (status && !isTargetSutantu) {
    if (status === 'active' || status === 'suspended') {
      user.status = status;
    }
  }

  db.write(data);
  db.logAudit('USER_UPDATED', `Updated administrator ${user.displayName || user.username} (${user.email})`, ip);

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    isSuperAdmin: user.isSuperAdmin,
    status: user.status
  });
});

// DELETE /api/admin/users/:id - Delete administrator account (Super Admin only)
router.delete('/admin/users/:id', requireSuperAdmin, (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);
  const id = req.params.id;

  const idx = data.admins.findIndex(a => a.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Administrator account not found.' });
    return;
  }

  const target = data.admins[idx];

  // IMMUTABLE SUPER ADMIN PROTECTION: SUTANTU DUTTA CAN NEVER BE DELETED
  if (
    target.id === PERMANENT_SUPER_ADMIN_ID ||
    target.email.toLowerCase() === PERMANENT_SUPER_ADMIN_EMAIL.toLowerCase() ||
    target.isSuperAdmin
  ) {
    res.status(403).json({
      error: 'Action Rejected: Sutantu Dutta is the permanent, immutable Super Admin of this portfolio and can never be removed or deleted.'
    });
    return;
  }

  const [removed] = data.admins.splice(idx, 1);
  db.write(data);
  db.logAudit('USER_DELETED', `Deleted administrator "${removed.displayName || removed.username}" (${removed.email})`, ip);

  res.json({ success: true, removed: { id: removed.id, email: removed.email, username: removed.username } });
});

/* -------------------------------------------------------------
 * 5. PROJECTS MANAGEMENT (RBAC: Admin, Editor, Superadmin)
 * ------------------------------------------------------------- */

router.get('/admin/projects', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const sorted = [...data.projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  res.json(sorted);
});

router.post('/admin/projects', requireRole(['admin', 'editor', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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

router.put('/admin/projects/:id', requireRole(['admin', 'editor', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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

router.delete('/admin/projects/:id', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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

router.post('/admin/projects/reorder', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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
 * 6. BLOG / ARTICLES MANAGEMENT (RBAC)
 * ------------------------------------------------------------- */

router.get('/admin/blog', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.blog);
});

router.post('/admin/blog', requireRole(['admin', 'editor', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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

router.put('/admin/blog/:id', requireRole(['admin', 'editor', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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

router.delete('/admin/blog/:id', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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
 * 7. CONTACT MESSAGES INBOX (RBAC)
 * ------------------------------------------------------------- */

router.get('/admin/messages', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.messages);
});

router.patch('/admin/messages/:id', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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

router.post('/admin/messages/mark-all-read', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  const ip = getClientIp(req);

  data.messages.forEach(m => { m.read = true; });
  db.write(data);
  db.logAudit('MESSAGES_MARK_ALL_READ', 'Marked all messages as read', ip);

  res.json({ success: true, count: data.messages.length });
});

router.delete('/admin/messages/:id', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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
 * 8. SETTINGS & ANNOUNCEMENTS
 * ------------------------------------------------------------- */

router.get('/admin/settings', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.settings);
});

router.put('/admin/settings', requireRole(['admin', 'superadmin']), (req: AuthenticatedRequest, res: Response) => {
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
 * 9. SECURITY AUDIT LOGS
 * ------------------------------------------------------------- */

router.get('/admin/audit-logs', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.get();
  res.json(data.auditLogs);
});

/* -------------------------------------------------------------
 * 10. API 404 FALLBACK HANDLER (Never return HTML for /api)
 * ------------------------------------------------------------- */

router.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: 'The requested API route does not exist or has been relocated.'
  });
});

export default router;
