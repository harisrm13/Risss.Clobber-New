import { Router } from 'express';
import { query } from '../db.js';
import { asyncRoute, validateBody } from '../middleware.js';
import { normalizeEmail } from '../utils.js';

export const publicRouter = Router();

publicRouter.post('/newsletter', validateBody(['email']), asyncRoute(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  await query('INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [email]);
  res.status(201).json({ message: 'Email berhasil berlangganan newsletter.' });
}));

publicRouter.post('/contact', validateBody(['fullName', 'email', 'message']), asyncRoute(async (req, res) => {
  const result = await query(`INSERT INTO contact_inquiries (full_name, email, subject, message)
    VALUES ($1, $2, $3, $4) RETURNING id, created_at`, [req.body.fullName.trim(), normalizeEmail(req.body.email), req.body.subject?.trim() || null, req.body.message.trim()]);
  res.status(201).json({ message: 'Pesan berhasil dikirim.', data: result.rows[0] });
}));
