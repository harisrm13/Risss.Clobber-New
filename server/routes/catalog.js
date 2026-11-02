import { Router } from 'express';
import { query } from '../db.js';
import { asyncRoute, requireAdmin } from '../middleware.js';
import { publicProduct } from '../utils.js';

export const catalogRouter = Router();

catalogRouter.get('/brands', asyncRoute(async (_req, res) => {
  const result = await query('SELECT id, slug, name, country, description FROM brands ORDER BY name ASC');
  res.json({ data: result.rows });
}));

catalogRouter.get('/categories', asyncRoute(async (_req, res) => {
  const result = await query('SELECT id, slug, name, description FROM categories ORDER BY name ASC');
  res.json({ data: result.rows });
}));

catalogRouter.get('/products', asyncRoute(async (req, res) => {
  const { search = '', brand = '', category = '', sort = 'newest' } = req.query;

  const conditions = [];
  const params = [];

  if (search.trim()) {
    params.push(`%${search.trim().toLowerCase()}%`);
    conditions.push(`(LOWER(p.name) LIKE $${params.length} OR LOWER(p.description) LIKE $${params.length})`);
  }
  if (brand.trim()) {
    params.push(brand.trim());
    conditions.push(`b.slug = $${params.length}`);
  }
  if (category.trim()) {
    params.push(category.trim());
    conditions.push(`c.slug = $${params.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  let orderBy = 'p.created_at DESC';
  if (sort === 'price-low') orderBy = 'p.price ASC';
  else if (sort === 'price-high') orderBy = 'p.price DESC';
  else if (sort === 'name-asc') orderBy = 'p.name ASC';
  else if (sort === 'name-desc') orderBy = 'p.name DESC';

  const sql = `
    SELECT
      p.*,
      b.name AS brand_name,
      c.name AS category_name,
      COALESCE(
        json_agg(
          json_build_object('size', ps.size_label, 'stock', ps.stock)
          ORDER BY ps.id ASC
        ) FILTER (WHERE ps.id IS NOT NULL),
        '[]'
      ) AS sizes
    FROM products p
    JOIN brands b ON b.id = p.brand_id
    JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_sizes ps ON ps.product_id = p.id
    ${whereClause}
    GROUP BY p.id, b.name, c.name
    ORDER BY ${orderBy}
  `;

  const result = await query(sql, params);
  res.json({ data: result.rows.map(publicProduct) });
}));

catalogRouter.get('/products/:id', asyncRoute(async (req, res) => {
  const sql = `
    SELECT
      p.*,
      b.name AS brand_name,
      c.name AS category_name,
      COALESCE(
        json_agg(
          json_build_object('size', ps.size_label, 'stock', ps.stock)
          ORDER BY ps.id ASC
        ) FILTER (WHERE ps.id IS NOT NULL),
        '[]'
      ) AS sizes
    FROM products p
    JOIN brands b ON b.id = p.brand_id
    JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_sizes ps ON ps.product_id = p.id
    WHERE p.id = $1
    GROUP BY p.id, b.name, c.name
  `;
  const result = await query(sql, [req.params.id]);
  if (!result.rows.length) return res.status(404).json({ error: 'Produk tidak ditemukan.' });
  res.json({ data: publicProduct(result.rows[0]) });
}));
