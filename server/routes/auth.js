import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { asyncRoute, authenticate, validateBody } from '../middleware.js';
import { normalizeEmail } from '../utils.js';

export const authRouter = Router();

function sendAuthCookie(res, token) {
  const isSecure = process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production';
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function clearAuthCookie(res) {
  res.clearCookie('access_token', { httpOnly: true, sameSite: 'lax' });
}

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.full_name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

authRouter.post('/register', validateBody(['fullName', 'email', 'password']), asyncRoute(async (req, res) => {
  const fullName = req.body.fullName.trim();
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password);
  const phone = req.body.phone?.trim() || null;

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password minimal 6 karakter.' });
  }

  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length) {
    return res.status(409).json({ error: 'Email sudah terdaftar. Silakan login.' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const insert = await query(
    `INSERT INTO users (full_name, email, password_hash, phone, role)
     VALUES ($1, $2, $3, $4, 'customer')
     RETURNING id, full_name, email, phone, role, created_at`,
    [fullName, email, passwordHash, phone]
  );

  const user = insert.rows[0];
  const token = createToken(user);
  sendAuthCookie(res, token);

  res.status(201).json({
    message: 'Registrasi berhasil.',
    token,
    user: { id: user.id, fullName: user.full_name, email: user.email, phone: user.phone, role: user.role }
  });
}));

authRouter.post('/login', validateBody(['email', 'password']), asyncRoute(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password);

  const result = await query(
    'SELECT id, full_name, email, password_hash, phone, role FROM users WHERE email = $1',
    [email]
  );

  if (!result.rows.length) {
    return res.status(401).json({ error: 'Email atau password salah.' });
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ error: 'Email atau password salah.' });
  }

  const token = createToken(user);
  sendAuthCookie(res, token);

  res.json({
    message: 'Login berhasil.',
    token,
    user: { id: user.id, fullName: user.full_name, email: user.email, phone: user.phone, role: user.role }
  });
}));

authRouter.post('/logout', (_req, res) => {
  clearAuthCookie(res);
  res.json({ message: 'Logout berhasil.' });
});

authRouter.get('/me', authenticate, asyncRoute(async (req, res) => {
  const result = await query(
    'SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1',
    [req.user.id]
  );
  if (!result.rows.length) return res.status(404).json({ error: 'User tidak ditemukan.' });

  const user = result.rows[0];
  res.json({
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.created_at
    }
  });
}));

authRouter.put('/profile', authenticate, asyncRoute(async (req, res) => {
  const fullName = req.body.fullName?.trim();
  const phone = req.body.phone?.trim() || null;

  if (!fullName) return res.status(400).json({ error: 'Nama lengkap wajib diisi.' });

  const result = await query(
    `UPDATE users
     SET full_name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, full_name, email, phone, role`,
    [fullName, phone, req.user.id]
  );

  res.json({
    message: 'Profil berhasil diperbarui.',
    user: result.rows[0]
  });
}));
