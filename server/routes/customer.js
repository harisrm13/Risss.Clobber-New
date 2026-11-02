import { Router } from 'express';
import { query, pool } from '../db.js';
import { asyncRoute, authenticate, validateBody } from '../middleware.js';
import { makeOrderNumber, numeric } from '../utils.js';

export const customerRouter = Router();
customerRouter.use(authenticate);

customerRouter.get('/cart', asyncRoute(async (req, res) => {
  const result = await query(`SELECT ci.product_id, ci.size, ci.quantity, p.name, p.price, p.discount_price, p.image_url, p.primary_color, b.name AS brand_name, ps.stock
    FROM cart_items ci JOIN products p ON p.id=ci.product_id JOIN brands b ON b.id=p.brand_id
    LEFT JOIN product_sizes ps ON ps.product_id=ci.product_id AND ps.size_label=ci.size
    WHERE ci.user_id=$1 ORDER BY ci.created_at DESC`, [req.user.id]);
  res.json({ data: result.rows });
}));

customerRouter.put('/cart', validateBody(['productId', 'size', 'quantity']), asyncRoute(async (req, res) => {
  const { productId, size } = req.body;
  const quantity = Math.floor(numeric(req.body.quantity));
  if (quantity < 1) return res.status(400).json({ error: 'Quantity minimal 1.' });
  const stock = await query('SELECT stock FROM product_sizes WHERE product_id=$1 AND size_label=$2', [productId, size]);
  if (!stock.rows.length) return res.status(404).json({ error: 'Ukuran tidak ditemukan.' });
  if (quantity > stock.rows[0].stock) return res.status(409).json({ error: 'Stok ukuran tidak mencukupi.' });
  await query(`INSERT INTO cart_items (user_id,product_id,size,quantity) VALUES ($1,$2,$3,$4)
    ON CONFLICT (user_id,product_id,size) DO UPDATE SET quantity=EXCLUDED.quantity,updated_at=CURRENT_TIMESTAMP`, [req.user.id, productId, size, quantity]);
  res.json({ message: 'Cart diperbarui.' });
}));

customerRouter.delete('/cart/:productId/:size', asyncRoute(async (req, res) => {
  await query('DELETE FROM cart_items WHERE user_id=$1 AND product_id=$2 AND size=$3', [req.user.id, req.params.productId, req.params.size]);
  res.status(204).send();
}));

customerRouter.get('/wishlist', asyncRoute(async (req, res) => {
  const result = await query(`SELECT w.product_id,p.name,p.price,p.discount_price,p.image_url,p.primary_color
    FROM wishlist_items w JOIN products p ON p.id=w.product_id WHERE w.user_id=$1 ORDER BY w.created_at DESC`, [req.user.id]);
  res.json({ data: result.rows });
}));

customerRouter.put('/wishlist/:productId', asyncRoute(async (req, res) => {
  await query('INSERT INTO wishlist_items (user_id,product_id) VALUES ($1,$2) ON CONFLICT (user_id,product_id) DO NOTHING', [req.user.id, req.params.productId]);
  res.json({ message: 'Produk ditambahkan ke wishlist.' });
}));

customerRouter.delete('/wishlist/:productId', asyncRoute(async (req, res) => {
  await query('DELETE FROM wishlist_items WHERE user_id=$1 AND product_id=$2', [req.user.id, req.params.productId]);
  res.status(204).send();
}));

customerRouter.get('/orders', asyncRoute(async (req, res) => {
  const result = await query('SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [req.user.id]);
  res.json({ data: result.rows });
}));
