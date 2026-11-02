import jwt from 'jsonwebtoken';

function tokenFromRequest(req) {
  const authorization = req.headers.authorization || '';
  return authorization.startsWith('Bearer ') ? authorization.slice(7) : req.cookies?.access_token;
}

export function authenticate(req, res, next) {
  const token = tokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Autentikasi diperlukan.' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: 'Sesi tidak valid atau sudah kedaluwarsa.' });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Akses admin diperlukan.' });
  return next();
}

export function validateBody(fields) {
  return (req, res, next) => {
    const missing = fields.filter((field) => req.body?.[field] === undefined || req.body[field] === null || String(req.body[field]).trim() === '');
    if (missing.length) return res.status(400).json({ error: `Field wajib: ${missing.join(', ')}.` });
    return next();
  };
}

export function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}
