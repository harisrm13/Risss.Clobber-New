import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { query } from './db.js';
import { catalogRouter } from './routes/catalog.js';
import { authRouter } from './routes/auth.js';
import { customerRouter } from './routes/customer.js';
import { ordersRouter } from './routes/orders.js';
import { adminRouter } from './routes/admin.js';
import { publicRouter } from './routes/public.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static frontend files directly
app.use(express.static(rootDir));

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    const dbRes = await query('SELECT NOW() AS now');
    res.json({
      status: 'ok',
      service: 'risss-clobber-api',
      timestamp: dbRes.rows[0].now,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'risss-clobber-api',
      message: 'Database unreachable',
      ...(process.env.NODE_ENV === 'development' ? { details: error.message } : {})
    });
  }
});

// API Routes
app.use('/api', catalogRouter);
app.use('/api', publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/customer', customerRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);

// 404 for API endpoints
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `Endpoint ${req.method} ${req.path} tidak ditemukan.` });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error('[API Error]:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Terjadi kesalahan pada server.',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
});

app.listen(PORT, () => {
  console.log(`[Risss.clobber] Server berjalan di http://localhost:${PORT}`);
  console.log(`[Risss.clobber] API health check: http://localhost:${PORT}/api/health`);
});

export default app;
