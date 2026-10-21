import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { db } from './db';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SECRET_FILE = path.join(DATA_DIR, '.jwt-secret');

// Ensure a persistent JWT secret exists across server restarts
function getJwtSecret(): string {
  if (process.env.ADMIN_JWT_SECRET) {
    return process.env.ADMIN_JWT_SECRET;
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (fs.existsSync(SECRET_FILE)) {
    return fs.readFileSync(SECRET_FILE, 'utf-8').trim();
  }
  const newSecret = crypto.randomBytes(48).toString('hex');
  fs.writeFileSync(SECRET_FILE, newSecret, { encoding: 'utf-8', mode: 0o600 });
  return newSecret;
}

const JWT_SECRET = getJwtSecret();

// IP-based Login Rate Limiter
interface RateLimitRecord {
  failedAttempts: number;
  lockoutUntil: number | null;
}

const loginRateLimiter = new Map<string, RateLimitRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
  const record = loginRateLimiter.get(ip);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockoutUntil && record.lockoutUntil > now) {
    const waitSeconds = Math.ceil((record.lockoutUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  if (record.lockoutUntil && record.lockoutUntil <= now) {
    // Reset lockout window
    loginRateLimiter.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): { locked: boolean; remainingAttempts: number; waitSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimiter.get(ip) || { failedAttempts: 0, lockoutUntil: null };
  record.failedAttempts += 1;

  if (record.failedAttempts >= MAX_ATTEMPTS) {
    record.lockoutUntil = now + LOCKOUT_DURATION_MS;
    loginRateLimiter.set(ip, record);
    return {
      locked: true,
      remainingAttempts: 0,
      waitSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000)
    };
  }

  loginRateLimiter.set(ip, record);
  return {
    locked: false,
    remainingAttempts: MAX_ATTEMPTS - record.failedAttempts
  };
}

export function resetFailedLogin(ip: string): void {
  loginRateLimiter.delete(ip);
}

// Password hashing
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Token generation and verification
export interface AdminTokenPayload {
  adminId: string;
  username: string;
  email: string;
  role: 'superadmin';
  iat?: number;
  exp?: number;
}

export function generateToken(payload: Omit<AdminTokenPayload, 'iat' | 'exp'>, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? '30d' : '12h';
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

// Generate secure one-time recovery key
export function generateRecoveryKey(): string {
  const part1 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const part2 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const part3 = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `SD-${part1}-${part2}-${part3}`;
}

export function hashRecoveryKey(key: string): string {
  const normalized = key.trim().toUpperCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

export function verifyRecoveryKey(providedKey: string, storedHash: string): boolean {
  const providedHash = hashRecoveryKey(providedKey);
  try {
    return crypto.timingSafeEqual(Buffer.from(providedHash), Buffer.from(storedHash));
  } catch {
    return false;
  }
}

// Express Auth Middleware
export interface AuthenticatedRequest extends Request {
  admin?: AdminTokenPayload;
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check Authorization header or cookie
  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Authentication required.' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: 'Unauthorized: Session invalid or expired. Please sign in again.' });
    return;
  }

  // Ensure admin still exists in db
  const database = db.get();
  if (!database.admin || database.admin.id !== payload.adminId) {
    res.status(401).json({ error: 'Unauthorized: Administrator account not found.' });
    return;
  }

  req.admin = payload;
  next();
}
