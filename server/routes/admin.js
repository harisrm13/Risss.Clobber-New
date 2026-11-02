import { Router } from 'express';
import { pool, query } from '../db.js';
import { asyncRoute, authenticate, requireAdmin, validateBody } from '../middleware.js';
import { numeric, publicProduct } from '../utils.js';

export const adminRouter = Router();

adminRouter.use(authenticate, requireAdmin);

adminRouter.get('/metrics', asyncRoute(async (_req, res) => {
  const [revenue, orders, products, lowStock] = await Promise.all([
    query("SELECT COALESCE(SUM(total_amount), 0) AS total_revenue FROM orders WHERE order_status != 'Cancelled'"),
    query('SELECT COUNT(*) AS total_orders FROM orders'),
    query('SELECT COUNT(*) AS total_products FROM products'),
    query('SELECT COUNT(*) AS low_stock_count FROM products WHERE total_stock <= 5')
  ]);

  res.json({
    data: {
      revenue: Number(revenue.rows[0].total_revenue),
      orders: Number(orders.rows[0].total_orders),
      products: Number(products.rows[0].total_products),
      lowStock: Number(lowStock.rows[0].low_stock_count)
    }
  });
}));

adminRouter.get('/orders', asyncRoute(async (req, res) => {
  const { status, search } = req.query;
  const conditions = [];
  const params = [];

  if (status) {
    params.push(status);
    conditions.push(`order_status = $${params.length}`);
  }
  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    conditions.push(`(LOWER(order_number) LIKE $${params.length} OR LOWER(customer_name) LIKE $${params.length} OR LOWER(customer_email) LIKE $${params.length})`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await query(`SELECT * FROM orders ${whereClause} ORDER BY created_at DESC`, params);
  res.json({ data: result.rows });
}));

adminRouter.put('/orders/:id/status', validateBody(['status']), asyncRoute(async (req, res) => {
  const valid = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!valid.includes(req.body.status)) {
    return res.status(400).json({ error: `Status harus salah satu dari: ${valid.join(', ')}.` });
  }

  const result = await query(
    `UPDATE orders SET order_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [req.body.status, req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
  res.json({ message: 'Status pesanan berhasil diupdate.', data: result.rows[0] });
}));

adminRouter.post('/products', validateBody(['id', 'name', 'brandId', 'categoryId', 'price', 'primaryColor', 'description', 'imageUrl']), asyncRoute(async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { id, name, brandId, categoryId, price, discountPrice = 0, primaryColor, description, imageUrl, isNewArrival = false, isBestSeller = false, sizes = [] } = req.body;

    const totalStock = sizes.reduce((sum, s) => sum + numeric(s.stock, 0), 0);

    const insert = await client.query(`
      INSERT INTO products (id, name, brand_id, category_id, price, discount_price, primary_color, description, image_url, is_new_arrival, is_best_seller, total_stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [id, name, brandId, categoryId, price, discountPrice, primaryColor, description, imageUrl, isNewArrival, isBestSeller, totalStock]
    );

    for (const item of sizes) {
      if (item.size && item.stock !== undefined) {
        await client.query(`INSERT INTO product_sizes (product_id, size_label, stock) VALUES ($1, $2, $3)`, [id, item.size, numeric(item.stock, 0)]);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Produk berhasil ditambahkan.', data: insert.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}));

adminRouter.delete('/products/:id', asyncRoute(async (req, res) => {
  const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows.length) return res.status(404).json({ error: 'Produk tidak ditemukan.' });
  res.status(204).send();
}));

adminRouter.get('/contacts', asyncRoute(async (_req, res) => {
  const result = await query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
  res.json({ data: result.rows });
}));

adminRouter.get('/subscribers', asyncRoute(async (_req, res) => {
  const result = await query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
  res.json({ data: result.rows });
}));
